CREATE TABLE public.audit_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  engagement_id uuid NOT NULL REFERENCES public.audit_engagements(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  slot_start timestamptz NOT NULL,
  slot_end timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending','confirmed','cancelled')),
  google_event_id text,
  meet_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX audit_bookings_slot_active ON public.audit_bookings(slot_start) WHERE status <> 'cancelled';
CREATE UNIQUE INDEX audit_bookings_engagement_active ON public.audit_bookings(engagement_id) WHERE status <> 'cancelled';
GRANT SELECT ON public.audit_bookings TO authenticated;
GRANT ALL ON public.audit_bookings TO service_role;
ALTER TABLE public.audit_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read bookings" ON public.audit_bookings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER audit_bookings_updated BEFORE UPDATE ON public.audit_bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();