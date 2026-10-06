CREATE TABLE public.career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  role_id text NOT NULL,
  role_title text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  linkedin_url text NOT NULL,
  audio_url text,
  summary text,
  resume_path text,
  email_status text
);
GRANT SELECT ON public.career_applications TO authenticated;
GRANT ALL ON public.career_applications TO service_role;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read applications" ON public.career_applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));