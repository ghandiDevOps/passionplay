import { createClient } from "@supabase/supabase-js";

// Client Supabase côté serveur (service role — accès complet)
// ⚠️ Server-only — ne jamais importer dans un Client Component
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
