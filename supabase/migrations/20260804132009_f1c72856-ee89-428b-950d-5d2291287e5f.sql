CREATE POLICY "public read gallery files" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'gallery');

CREATE POLICY "admins upload gallery files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admins update gallery files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admins delete gallery files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'::app_role));