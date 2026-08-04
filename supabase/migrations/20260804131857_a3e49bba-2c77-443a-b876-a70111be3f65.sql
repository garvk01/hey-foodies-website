CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  storage_path text NOT NULL DEFAULT '',
  caption text NOT NULL DEFAULT '',
  tall boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gallery_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read gallery" ON public.gallery_images
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "admins manage gallery" ON public.gallery_images
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER gallery_images_updated
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();