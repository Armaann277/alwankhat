import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url as string, serviceKey ?? (anonKey as string), {
      auth: { persistSession: true },
    })
  : null;

export const db = {
  async listPieces() {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("pieces")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  async upsertPiece(piece: Record<string, unknown>) {
    if (!supabase) return null;
    const { error } = await supabase.from("pieces").upsert(piece, { onConflict: "slug" });
    if (error) throw error;
  },
  async removePiece(slug: string) {
    if (!supabase) return null;
    const { error } = await supabase.from("pieces").delete().eq("slug", slug);
    if (error) throw error;
  },
  async addCommission(entry: Record<string, unknown>) {
    if (!supabase) return null;
    const { error } = await supabase.from("commissions").insert(entry);
    if (error) throw error;
  },
};

export type { User } from "@supabase/supabase-js";