-- Create storage bucket for music files
INSERT INTO storage.buckets (id, name, public) VALUES ('music', 'music', true);

-- Create policy for public access to music files
CREATE POLICY "Music files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'music');

CREATE POLICY "Allow upload of music files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'music');