import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tkmeduwwvsqyuojxnsco.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrbWVkdXd3dnNxeXVvanhuc2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNDk0NjEsImV4cCI6MjA0NjcyNTQ2MX0.OIz5boOaztrdslamVXrVJsOHYNRBfCuCyh5-FMG2FYg';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);