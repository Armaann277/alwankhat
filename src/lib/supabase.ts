import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// The service_role key bypasses RLS, so it must never reach the browser.
// Client bundles get the anon key; the server may use the service key.
const key = typeof window === "undefined" ? serviceKey ?? anonKey : anonKey;

export const supabase = isSupabaseConfigured
  ? createClient(url as string, key as string, {
      auth: { persistSession: false },
    })
  : null;
