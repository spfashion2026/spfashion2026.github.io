import { createClient } from '@supabase/supabase-js'

// Public anon key for frontend
export const supabase = createClient(
  'https://cfefmgignrpsnxepguhr.supabase.co',
  'sb_publishable_T7RvISH2KWfNlbL8kKClFw_UrJA4h04'
)
