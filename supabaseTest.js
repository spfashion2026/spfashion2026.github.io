import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'; // if using .env

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase.from('your_table_name').select('*').limit(1);
  if (error) console.error('Connection failed:', error.message);
  else console.log('Connection successful! Sample data:', data);
}

testConnection();
