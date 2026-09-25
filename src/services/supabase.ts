import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const TRIP_TOKEN = process.env.NEXT_PUBLIC_TRIP_TOKEN;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY || !TRIP_TOKEN) {
  throw new Error("Configure as variáveis NEXT_PUBLIC_SUPABASE_* e NEXT_PUBLIC_TRIP_TOKEN no .env.local.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  global: { headers: { "x-trip-token": TRIP_TOKEN } },
});
