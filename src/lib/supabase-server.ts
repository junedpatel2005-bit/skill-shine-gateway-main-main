import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function trimAndStripQuotes(value: string | undefined): string {
  const trimmed = value?.trim() ?? '';
  const match = trimmed.match(/^"(.*)"$/);
  return match ? match[1] : trimmed;
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseServerClient() {
  if (cachedClient) return cachedClient;

  const url = trimAndStripQuotes(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL);
  const serviceRoleKey = trimAndStripQuotes(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !serviceRoleKey) {
    throw new Error("Missing server-side Supabase environment variables. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel or your local env file.");
  }

  if (!/^https?:\/\//i.test(url)) {
    throw new Error(`Invalid Supabase server URL: ${JSON.stringify(url)}. Must be a valid HTTP or HTTPS URL.`);
  }

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
