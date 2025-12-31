import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const supabase = createClient(
  'https://cfefmgignrpsnxepguhr.supabase.co',   // replace with your Supabase URL
  'sb_publishable_T7RvISH2KWfNlbL8kKClFw_UrJA4h04'                       // replace with your anon/public key
)

