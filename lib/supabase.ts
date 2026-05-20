import { createClient } from "@supabase/supabase-js";

// Use NEXT_PUBLIC_SUPABASE_ANON_KEY for client-side access
// This is required for browser-based requests to work in production
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);