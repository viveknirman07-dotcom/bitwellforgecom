CREATE TABLE public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  service text NOT NULL,
  challenge text NOT NULL,
  email_status text
);

GRANT INSERT ON public.contact_inquiries TO anon, authenticated;
GRANT ALL ON public.contact_inquiries TO service_role;

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
ON public.contact_inquiries FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins read inquiries"
ON public.contact_inquiries FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));