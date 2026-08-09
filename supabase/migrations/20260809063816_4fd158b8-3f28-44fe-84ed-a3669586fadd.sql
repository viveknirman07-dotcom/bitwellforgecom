REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.has_entitlement(uuid, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.current_affiliate_id() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_entitlement(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_affiliate_id() TO authenticated;

DROP POLICY IF EXISTS "vault documents readable by entitled customers" ON storage.objects;
CREATE POLICY "vault documents readable by entitled customers"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'vault-documents'
  AND EXISTS (
    SELECT 1
    FROM public.product_documents d
    JOIN public.entitlements e ON e.product_id = d.product_id
    WHERE d.storage_path = storage.objects.name
      AND d.is_published = true
      AND e.user_id = auth.uid()
      AND e.revoked_at IS NULL
  )
);

DROP POLICY IF EXISTS "affiliate materials readable by active affiliates" ON storage.objects;
CREATE POLICY "affiliate materials readable by active affiliates"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'affiliate-materials'
  AND EXISTS (
    SELECT 1
    FROM public.affiliate_resources r
    JOIN public.affiliates a ON a.user_id = auth.uid()
    WHERE r.file_path = storage.objects.name
      AND r.status = 'PUBLISHED'
      AND a.status = 'active'
  )
);
