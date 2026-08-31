CREATE TABLE IF NOT EXISTS public.affiliate_attributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  user_id uuid,
  affiliate_id uuid NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  code text NOT NULL,
  discount_usd numeric(6,2) NOT NULL CHECK (discount_usd >= 0 AND discount_usd <= 10),
  source text NOT NULL DEFAULT 'affiliate_link',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS affiliate_attributions_email_key
  ON public.affiliate_attributions (lower(email));
CREATE INDEX IF NOT EXISTS affiliate_attributions_affiliate_idx
  ON public.affiliate_attributions (affiliate_id);

GRANT ALL ON public.affiliate_attributions TO service_role;

ALTER TABLE public.affiliate_attributions ENABLE ROW LEVEL SECURITY;