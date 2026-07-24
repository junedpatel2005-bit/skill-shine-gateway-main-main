import { createClient } from '@supabase/supabase-js';

function cleanEnvValue(value: string | undefined): string {
  const cleaned = value?.replace(/[\r\n]/g, '').trim() ?? '';
  const quoted = cleaned.match(/^(['"])(.*)\1$/);
  return quoted ? quoted[2].trim() : cleaned;
}

function validateUrl(url: string, name: string) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw new Error(`${name} must use http:// or https://`);
    }
  } catch (error) {
    throw new Error(`Invalid ${name}: ${JSON.stringify(url)}. Must be a valid HTTP or HTTPS URL.`);
  }
}

const supabaseUrl = cleanEnvValue(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = cleanEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

validateUrl(supabaseUrl, 'VITE_SUPABASE_URL');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
