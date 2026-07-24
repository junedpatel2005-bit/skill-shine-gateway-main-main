import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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

let cachedClient: SupabaseClient | null = null;

export function getSupabaseServerClient() {
  if (cachedClient) return cachedClient;

  const url = cleanEnvValue(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL);
  const serviceRoleKey = cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !serviceRoleKey) {
    throw new Error("Missing server-side Supabase environment variables. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel or your local env file.");
  }

  validateUrl(url, 'SUPABASE_URL');

  cachedClient = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedClient;
}

export function getSupabaseServerConfig() {
  return {
    url: process.env.SUPABASE_URL ?? null,
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };
}
