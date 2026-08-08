
create table public.affiliates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  code text not null unique,
  full_name text,
  email text not null,
  country_code text,
  status text not null default 'active',
  payout_recipient_name text,
  payout_country text,
  paypal_email text,
  terms_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.affiliates to authenticated;
grant all on public.affiliates to service_role;
alter table public.affiliates enable row level security;
create policy affiliates_select_own on public.affiliates for select to authenticated using (auth.uid() = user_id);
create policy affiliates_insert_own on public.affiliates for insert to authenticated with check (auth.uid() = user_id);
create policy affiliates_update_own on public.affiliates for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create trigger affiliates_updated_at before update on public.affiliates for each row execute function public.update_updated_at_column();
create index affiliates_code_idx on public.affiliates (lower(code));

create or replace function public.current_affiliate_id()
returns uuid language sql stable security definer set search_path = public as $$
  select id from public.affiliates where user_id = auth.uid() limit 1
$$;
revoke execute on function public.current_affiliate_id() from anon;

create table public.referral_clicks (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid references public.affiliates(id) on delete cascade,
  code text not null,
  landing_path text,
  referer text,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);
grant select on public.referral_clicks to authenticated;
grant all on public.referral_clicks to service_role;
alter table public.referral_clicks enable row level security;
create policy referral_clicks_select_own on public.referral_clicks for select to authenticated using (affiliate_id = public.current_affiliate_id());
create index referral_clicks_affiliate_idx on public.referral_clicks (affiliate_id, created_at desc);

alter table public.orders add column if not exists affiliate_id uuid references public.affiliates(id) on delete set null;
alter table public.orders add column if not exists referral_code text;
create index if not exists orders_affiliate_idx on public.orders (affiliate_id);

create table public.payout_batches (
  id uuid primary key default gen_random_uuid(),
  period_month date not null unique,
  status text not null default 'PENDING',
  total_amount_usd numeric not null default 0,
  affiliate_count integer not null default 0,
  notes text,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant all on public.payout_batches to service_role;
alter table public.payout_batches enable row level security;
create trigger payout_batches_updated_at before update on public.payout_batches for each row execute function public.update_updated_at_column();

create table public.payout_records (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references public.payout_batches(id) on delete cascade,
  affiliate_id uuid not null references public.affiliates(id) on delete cascade,
  period_month date not null,
  recipient_name text,
  payout_country text,
  paypal_email text,
  sales_count integer not null default 0,
  amount_usd numeric not null default 0,
  status text not null default 'PENDING',
  paid_at timestamptz,
  failure_reason text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (batch_id, affiliate_id)
);
grant select on public.payout_records to authenticated;
grant all on public.payout_records to service_role;
alter table public.payout_records enable row level security;
create policy payout_records_select_own on public.payout_records for select to authenticated using (affiliate_id = public.current_affiliate_id());
create trigger payout_records_updated_at before update on public.payout_records for each row execute function public.update_updated_at_column();

create table public.commissions (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references public.affiliates(id) on delete cascade,
  order_id uuid not null unique references public.orders(id) on delete cascade,
  payout_record_id uuid references public.payout_records(id) on delete set null,
  amount_usd numeric not null default 50,
  currency text not null default 'USD',
  status text not null default 'pending',
  period_month date not null default date_trunc('month', now())::date,
  void_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.commissions to authenticated;
grant all on public.commissions to service_role;
alter table public.commissions enable row level security;
create policy commissions_select_own on public.commissions for select to authenticated using (affiliate_id = public.current_affiliate_id());
create trigger commissions_updated_at before update on public.commissions for each row execute function public.update_updated_at_column();
create index commissions_affiliate_idx on public.commissions (affiliate_id, created_at desc);

create table public.affiliate_resources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  description text,
  file_path text not null,
  resource_type text not null default 'GUIDE',
  version text not null default '1.0',
  status text not null default 'PUBLISHED',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.affiliate_resources to authenticated;
grant all on public.affiliate_resources to service_role;
alter table public.affiliate_resources enable row level security;
create policy affiliate_resources_read on public.affiliate_resources for select to authenticated
  using (status = 'PUBLISHED' and public.current_affiliate_id() is not null);
create trigger affiliate_resources_updated_at before update on public.affiliate_resources for each row execute function public.update_updated_at_column();

create table public.affiliate_resource_access (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references public.affiliates(id) on delete cascade,
  resource_id uuid not null references public.affiliate_resources(id) on delete cascade,
  resource_version text,
  access_type text not null default 'READ',
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);
grant all on public.affiliate_resource_access to service_role;
alter table public.affiliate_resource_access enable row level security;

create table public.webhook_logs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text not null,
  event_type text,
  payload_hash text,
  signature_status text not null default 'unverified',
  processing_status text not null default 'received',
  error_message text,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  unique (provider, event_id)
);
grant all on public.webhook_logs to service_role;
alter table public.webhook_logs enable row level security;
