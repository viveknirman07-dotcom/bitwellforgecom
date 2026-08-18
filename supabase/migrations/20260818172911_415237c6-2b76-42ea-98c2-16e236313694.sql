ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS affiliate_discount_usd numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS original_display_amount numeric,
  ADD COLUMN IF NOT EXISTS discount_display_amount numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS commissionable_amount_usd numeric,
  ADD COLUMN IF NOT EXISTS referral_source text,
  ADD COLUMN IF NOT EXISTS attribution_status text NOT NULL DEFAULT 'none';

ALTER TABLE public.commissions
  ADD COLUMN IF NOT EXISTS commissionable_amount_usd numeric,
  ADD COLUMN IF NOT EXISTS discount_usd numeric NOT NULL DEFAULT 0;

ALTER TABLE public.referral_clicks
  ADD COLUMN IF NOT EXISTS event text NOT NULL DEFAULT 'click';

CREATE UNIQUE INDEX IF NOT EXISTS affiliates_code_upper_key ON public.affiliates ((upper(code)));

CREATE INDEX IF NOT EXISTS referral_clicks_affiliate_event_idx ON public.referral_clicks (affiliate_id, event);
CREATE INDEX IF NOT EXISTS orders_affiliate_idx ON public.orders (affiliate_id) WHERE affiliate_id IS NOT NULL;