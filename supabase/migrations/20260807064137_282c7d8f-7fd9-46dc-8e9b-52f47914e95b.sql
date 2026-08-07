
-- ============ ENUMS ============
create type public.app_role as enum ('admin','customer');
create type public.order_status as enum ('pending','processing','paid','failed','expired','refunded');
create type public.payment_provider as enum ('paypal','nowpayments');

-- ============ UTIL ============
create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- ============ PROFILES ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  country_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create trigger profiles_updated_at before update on public.profiles for each row execute function public.update_updated_at_column();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'customer') on conflict do nothing;
  return new;
end; $$;

-- ============ ROLES ============
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "roles_select_own" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- ============ PRODUCTS ============
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text,
  description text,
  price_inr numeric(12,2) not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "products_public_read" on public.products for select to anon, authenticated using (is_active);
create trigger products_updated_at before update on public.products for each row execute function public.update_updated_at_column();

-- ============ ENTITLEMENTS (declared before dependents needing the checker) ============
create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  order_id uuid,
  access_type text not null default 'lifetime',
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);
grant select on public.entitlements to authenticated;
grant all on public.entitlements to service_role;
alter table public.entitlements enable row level security;
create policy "entitlements_select_own" on public.entitlements for select to authenticated using (auth.uid() = user_id);
create trigger entitlements_updated_at before update on public.entitlements for each row execute function public.update_updated_at_column();

create or replace function public.has_entitlement(_user_id uuid, _product_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.entitlements
    where user_id = _user_id and product_id = _product_id and revoked_at is null
  )
$$;

-- ============ PRODUCT DOCUMENTS ============
create table public.product_documents (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  slug text not null unique,
  title text not null,
  subtitle text,
  category text not null,
  summary text,
  storage_path text not null,
  file_size_bytes bigint,
  page_count integer,
  version text not null default '1.0',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.product_documents to authenticated;
grant all on public.product_documents to service_role;
alter table public.product_documents enable row level security;
create policy "documents_entitled_read" on public.product_documents for select to authenticated
  using (is_published and public.has_entitlement(auth.uid(), product_id));
create trigger product_documents_updated_at before update on public.product_documents for each row execute function public.update_updated_at_column();

-- ============ DOCUMENT SECTIONS (navigation / search) ============
create table public.document_sections (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.product_documents(id) on delete cascade,
  slug text not null,
  title text not null,
  part text,
  summary text,
  page_start integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (document_id, slug)
);
grant select on public.document_sections to authenticated;
grant all on public.document_sections to service_role;
alter table public.document_sections enable row level security;
create policy "sections_entitled_read" on public.document_sections for select to authenticated
  using (exists (
    select 1 from public.product_documents d
    where d.id = document_id and public.has_entitlement(auth.uid(), d.product_id)
  ));

-- ============ ORDERS ============
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  full_name text,
  product_id uuid not null references public.products(id),
  amount_inr numeric(12,2) not null,
  display_currency text not null default 'INR',
  display_amount numeric(14,4),
  fx_rate numeric(18,8),
  provider payment_provider not null,
  provider_order_id text,
  status order_status not null default 'pending',
  country_code text,
  metadata jsonb not null default '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index orders_user_idx on public.orders(user_id);
create index orders_email_idx on public.orders(lower(email));
create unique index orders_provider_order_idx on public.orders(provider, provider_order_id) where provider_order_id is not null;
grant select on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "orders_select_own" on public.orders for select to authenticated using (auth.uid() = user_id);
create trigger orders_updated_at before update on public.orders for each row execute function public.update_updated_at_column();

alter table public.entitlements add constraint entitlements_order_fk foreign key (order_id) references public.orders(id) on delete set null;

-- ============ PAYMENTS ============
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider payment_provider not null,
  provider_payment_id text not null,
  amount numeric(18,8) not null,
  currency text not null,
  status text not null,
  verified boolean not null default false,
  raw jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_payment_id)
);
grant select on public.payments to authenticated;
grant all on public.payments to service_role;
alter table public.payments enable row level security;
create policy "payments_select_own" on public.payments for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create trigger payments_updated_at before update on public.payments for each row execute function public.update_updated_at_column();

-- ============ DOWNLOADS ============
create table public.downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_id uuid not null references public.product_documents(id) on delete cascade,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index downloads_user_idx on public.downloads(user_id, created_at desc);
grant select on public.downloads to authenticated;
grant all on public.downloads to service_role;
alter table public.downloads enable row level security;
create policy "downloads_select_own" on public.downloads for select to authenticated using (auth.uid() = user_id);

-- ============ PRODUCT UPDATES ============
create table public.product_updates (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  title text not null,
  body text not null,
  version text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
grant select on public.product_updates to anon, authenticated;
grant all on public.product_updates to service_role;
alter table public.product_updates enable row level security;
create policy "updates_public_read" on public.product_updates for select to anon, authenticated using (true);

-- ============ WEBHOOK EVENTS (server only) ============
create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider payment_provider not null,
  event_id text not null,
  event_type text,
  signature_verified boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'received',
  attempts integer not null default 0,
  error text,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (provider, event_id)
);
grant all on public.webhook_events to service_role;
alter table public.webhook_events enable row level security;

-- ============ ACTIVITY LOGS (server only) ============
create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  ip_address text,
  created_at timestamptz not null default now()
);
grant all on public.activity_logs to service_role;
alter table public.activity_logs enable row level security;

-- ============ EMAIL LOGS (server only) ============
create table public.email_logs (
  id uuid primary key default gen_random_uuid(),
  recipient text not null,
  template text not null,
  subject text,
  status text not null default 'queued',
  provider_message_id text,
  error text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
grant all on public.email_logs to service_role;
alter table public.email_logs enable row level security;

-- ============ RATE LIMIT BUCKET (server only) ============
create table public.rate_limits (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  identifier text not null,
  hits integer not null default 1,
  window_start timestamptz not null default now(),
  unique (bucket, identifier)
);
grant all on public.rate_limits to service_role;
alter table public.rate_limits enable row level security;

-- ============ SEED PRODUCT ============
insert into public.products (slug, name, tagline, description, price_inr)
values (
  'commercial-growth-system',
  'Commercial Growth System™',
  'The complete revenue infrastructure operating standard.',
  'Three proprietary documents that together form the BitwellForge Commercial Growth System: the Blueprint (permanent commercial knowledge base), the Operating System (execution and implementation master protocol), and the Commercial Toolkit (proprietary business asset library).',
  14500.00
);
