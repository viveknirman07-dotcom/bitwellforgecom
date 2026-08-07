
create unique index if not exists payments_provider_payment_uniq
  on public.payments (provider, provider_payment_id);
create unique index if not exists webhook_events_provider_event_uniq
  on public.webhook_events (provider, event_id);
create unique index if not exists rate_limits_bucket_identifier_uniq
  on public.rate_limits (bucket, identifier);
create index if not exists orders_email_idx on public.orders (email);
create index if not exists entitlements_user_idx on public.entitlements (user_id);
