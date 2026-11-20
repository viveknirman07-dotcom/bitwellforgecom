DROP POLICY IF EXISTS "Anyone can submit an inquiry" ON public.contact_inquiries;
REVOKE INSERT ON public.contact_inquiries FROM anon, authenticated;
GRANT ALL ON public.contact_inquiries TO service_role;