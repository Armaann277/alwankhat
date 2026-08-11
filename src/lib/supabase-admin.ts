import { createClient } from "@supabase/supabase-js";

export type PieceRow = {
  slug: string;
  title: string;
  category: "Paintings" | "Calligraphy";
  price: number;
  sold: boolean;
  image: string;
  size?: string | null;
  medium?: string | null;
  year?: string | null;
  story?: string | null;
  featured?: boolean;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseAdmin = Boolean(url && serviceKey);

const adminClient = isSupabaseAdmin
  ? createClient(url as string, serviceKey as string, {
      auth: { persistSession: false },
    })
  : null;

export async function listPieces(): Promise<PieceRow[] | null> {
  if (!adminClient) return null;
  const { data, error } = await adminClient
    .from("pieces")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as unknown as PieceRow[];
}

export async function upsertPiece(piece: PieceRow) {
  if (!adminClient) return;
  const { error } = await adminClient
    .from("pieces")
    .upsert(piece, { onConflict: "slug" });
  if (error) throw error;
}

export async function removePiece(slug: string) {
  if (!adminClient) return;
  const { error } = await adminClient.from("pieces").delete().eq("slug", slug);
  if (error) throw error;
}

export async function addCommission(entry: {
  name: string;
  email: string;
  kind: string | null;
  brief: string;
}) {
  if (!adminClient) return;
  const { error } = await adminClient.from("commissions").insert(entry);
  if (error) throw error;
}
