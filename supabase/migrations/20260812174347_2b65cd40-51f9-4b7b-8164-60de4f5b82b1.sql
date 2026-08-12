REVOKE INSERT, UPDATE ON public.affiliates FROM authenticated;
DROP POLICY IF EXISTS affiliates_insert_own ON public.affiliates;
DROP POLICY IF EXISTS affiliates_update_own ON public.affiliates;