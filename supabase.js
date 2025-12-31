// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Replace with your Supabase URL and anon key
export const supabase = createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_ANON_KEY'
)
