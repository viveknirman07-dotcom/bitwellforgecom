ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_usd numeric;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS access_days integer;
ALTER TABLE public.entitlements ADD COLUMN IF NOT EXISTS expires_at timestamptz;
COMMENT ON COLUMN public.entitlements.expires_at IS 'NULL means lifetime (legacy purchases). New Member Access purchases carry a fixed term.';
CREATE OR REPLACE FUNCTION public.has_entitlement(_user_id uuid, _product_id uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  select exists (
    select 1 from public.entitlements
    where user_id = _user_id and product_id = _product_id and revoked_at is null
      and (expires_at is null or expires_at > now())
  )
$$;