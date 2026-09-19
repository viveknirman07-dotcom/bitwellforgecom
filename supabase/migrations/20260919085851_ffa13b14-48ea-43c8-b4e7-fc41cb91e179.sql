DROP POLICY IF EXISTS affiliate_resources_read ON public.affiliate_resources;

CREATE POLICY affiliate_resources_read
ON public.affiliate_resources
FOR SELECT
TO authenticated
USING (
  status = 'PUBLISHED'
  AND EXISTS (
    SELECT 1
    FROM public.affiliates AS affiliate
    WHERE affiliate.user_id = auth.uid()
      AND affiliate.status = 'active'
  )
);