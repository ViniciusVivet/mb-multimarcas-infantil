import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient(options: { requireServiceRole?: boolean } = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_KEY?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const key = options.requireServiceRole ? serviceKey : serviceKey ?? anonKey;
  if (!url || !key) return null;
  return createClient(url, key, {
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
