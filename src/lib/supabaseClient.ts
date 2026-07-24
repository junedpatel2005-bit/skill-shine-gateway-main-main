import { createClient } from '@supabase/supabase-js';

function trimAndStripQuotes(value: string | undefined): string {
  const trimmed = value?.trim() ?? '';
  const match = trimmed.match(/^"(.*)"$/);
  return match ? match[1] : trimmed;
}

const supabaseUrl = trimAndStripQuotes(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = trimAndStripQuotes(import.meta.env.VITE_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

if (!/^https?:\/\//i.test(supabaseUrl)) {
  throw new Error(`Invalid VITE_SUPABASE_URL: ${JSON.stringify(supabaseUrl)}. Must be a valid HTTP or HTTPS URL.`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
