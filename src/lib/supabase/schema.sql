-- Supabase SQL Schema for Official Artist Portal (Mini EP)

-- 1. Tracks Table
CREATE TABLE IF NOT EXISTS public.tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  track_number INT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  artist TEXT NOT NULL DEFAULT 'GUAF1Y',
  album TEXT NOT NULL DEFAULT 'ECHOES IN THE DARK',
  duration INT NOT NULL DEFAULT 0,
  audio_url TEXT NOT NULL,
  cover_url TEXT NOT NULL,
  lyrics TEXT,
  genre TEXT,
  plays_count INT DEFAULT 0,
  likes_count INT DEFAULT 0,
  release_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Fan Messages Table
CREATE TABLE IF NOT EXISTS public.fan_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  message TEXT NOT NULL,
  likes_count INT DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Contact Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'General',
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Gallery Items Table
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'Studio',
  aspect_ratio TEXT DEFAULT 'landscape',
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Tracks" ON public.tracks FOR SELECT USING (true);
CREATE POLICY "Public Read Approved Fan Messages" ON public.fan_messages FOR SELECT USING (is_approved = true);
CREATE POLICY "Public Read Gallery" ON public.gallery_items FOR SELECT USING (true);

-- Public Insert Policies
CREATE POLICY "Public Insert Fan Messages" ON public.fan_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Contact Submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Public Like Increment Functions
CREATE OR REPLACE FUNCTION increment_track_likes(track_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.tracks SET likes_count = likes_count + 1 WHERE id = track_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_fan_message_likes(msg_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.fan_messages SET likes_count = likes_count + 1 WHERE id = msg_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
