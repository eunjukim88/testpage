// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// 환경 변수로부터 Supabase URL과 익명 키를 가져옵니다
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
