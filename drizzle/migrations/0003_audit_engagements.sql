CREATE TABLE public.audit_engagements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL UNIQUE REFERENCES public.orders(id),
  email text NOT NULL,
  full_name text,
  access_token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(24), 'hex'),
  status text NOT NULL DEFAULT 'intake_pending',
  intake jsonb,
  intake_submitted_at timestamptz,
  document_paths text[] NOT NULL DEFAULT '{}',
  report_path text,
  findings_path text,
  roadmap_path text,
  delivered_at timestamptz,
  meeting_at timestamptz,
  meeting_url text,
  presentation_completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT audit_status_valid CHECK (status IN ('payment_confirmed','intake_pending','intake_completed','audit_in_progress','audit_ready','deliverables_sent','presentation_scheduled','presentation_completed'))
);
GRANT SELECT, UPDATE ON public.audit_engagements TO authenticated;
GRANT ALL ON public.audit_engagements TO service_role;
ALTER TABLE public.audit_engagements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read audits" ON public.audit_engagements FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER audit_engagements_updated BEFORE UPDATE ON public.audit_engagements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.audit_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  engagement_id uuid NOT NULL REFERENCES public.audit_engagements(id) ON DELETE CASCADE,
  status text NOT NULL,
  note text,
  actor_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_status_history TO authenticated;
GRANT ALL ON public.audit_status_history TO service_role;
ALTER TABLE public.audit_status_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read audit history" ON public.audit_status_history FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX audit_status_history_engagement_idx ON public.audit_status_history(engagement_id, created_at);