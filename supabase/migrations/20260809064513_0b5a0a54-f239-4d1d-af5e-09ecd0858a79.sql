-- Restore missing table privileges. RLS policies already exist on these tables
-- but PostgREST also requires explicit GRANTs, which were absent.

-- Backend (edge functions) needs full access everywhere.
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Public catalogue: readable by everyone.
GRANT SELECT ON public.products TO anon, authenticated;
GRANT SELECT ON public.product_documents TO anon, authenticated;
GRANT SELECT ON public.document_sections TO anon, authenticated;
GRANT SELECT ON public.product_updates TO anon, authenticated;
GRANT SELECT ON public.affiliate_resources TO authenticated;

-- Signed-in surfaces, all still gated by their existing RLS policies.
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.orders TO authenticated;
GRANT SELECT ON public.payments TO authenticated;
GRANT SELECT ON public.entitlements TO authenticated;
GRANT SELECT ON public.downloads TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.affiliates TO authenticated;
GRANT SELECT ON public.commissions TO authenticated;
GRANT SELECT ON public.payout_records TO authenticated;
GRANT SELECT ON public.referral_clicks TO authenticated;

-- Future tables keep the same defaults.
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;