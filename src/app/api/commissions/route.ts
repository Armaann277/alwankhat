import { NextRequest } from "next/server";
import { addCommission, isSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; kind?: string; brief?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return Response.json({ error: "invalid payload" }, { status: 400 });
  }
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const kind = String(body.kind ?? "").trim() || null;
  const brief = String(body.brief ?? "").trim();
  if (!name || !email || !brief) {
    return Response.json({ error: "name, email and brief are required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "invalid email" }, { status: 400 });
  }
  if (!isSupabaseAdmin) return Response.json({ ok: true });
  try {
    await addCommission({ name, email, kind, brief });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "submission failed" }, { status: 500 });
  }
}
