import { NextRequest } from "next/server";
import {
  listPieces,
  upsertPiece,
  removePiece,
  isSupabaseAdmin,
  type PieceRow,
} from "@/lib/supabase-admin";

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "alwankhat";

function authed(req: NextRequest) {
  return req.headers.get("x-admin-pin") === ADMIN_PIN;
}

export async function GET() {
  try {
    const rows = await listPieces();
    return Response.json(rows ?? []);
  } catch {
    return Response.json({ error: "catalogue unavailable" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!isSupabaseAdmin) return Response.json({ ok: true });
  let piece: PieceRow;
  try {
    piece = (await req.json()) as PieceRow;
  } catch {
    return Response.json({ error: "invalid payload" }, { status: 400 });
  }
  if (!piece.slug || !piece.title) {
    return Response.json({ error: "slug and title are required" }, { status: 400 });
  }
  try {
    await upsertPiece(piece);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "save failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  return POST(req);
}

export async function DELETE(req: NextRequest) {
  if (!authed(req)) return Response.json({ error: "unauthorized" }, { status: 401 });
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return Response.json({ error: "slug required" }, { status: 400 });
  if (!isSupabaseAdmin) return Response.json({ ok: true });
  try {
    await removePiece(slug);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "delete failed" }, { status: 500 });
  }
}
