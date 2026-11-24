DROP POLICY IF EXISTS updates_public_read ON public.product_updates;
CREATE POLICY "Entitled buyers and admins read updates" ON public.product_updates FOR SELECT TO authenticated
USING (public.has_entitlement(auth.uid(), product_id) OR public.has_role(auth.uid(), 'admin'));
REVOKE SELECT ON public.product_updates FROM anon;

CREATE OR REPLACE FUNCTION public.lock_profile_email()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
begin
  if new.email is distinct from old.email and auth.role() is distinct from 'service_role' then
    new.email := old.email;
  end if;
  return new;
end; $$;
DROP TRIGGER IF EXISTS profiles_lock_email ON public.profiles;
CREATE TRIGGER profiles_lock_email BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.lock_profile_email();