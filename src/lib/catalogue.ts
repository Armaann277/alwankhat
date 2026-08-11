import { collection } from "@/lib/store";
import type { Piece } from "@/data/pieces";

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "alwankhat";

export async function fetchCatalogue(): Promise<Piece[] | null> {
  try {
    const res = await fetch("/api/pieces", { cache: "no-store" });
    if (!res.ok) return null;
    const rows = (await res.json()) as Piece[];
    return Array.isArray(rows) ? rows : null;
  } catch {
    return null;
  }
}

export async function syncCatalogue() {
  const rows = await fetchCatalogue();
  if (rows && rows.length > 0) collection.setAll(rows);
}

export async function savePiece(piece: Piece): Promise<boolean> {
  try {
    const res = await fetch("/api/pieces", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-pin": ADMIN_PIN },
      body: JSON.stringify(piece),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function deletePiece(slug: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/pieces?slug=${encodeURIComponent(slug)}`, {
      method: "DELETE",
      headers: { "x-admin-pin": ADMIN_PIN },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function submitCommission(entry: {
  name: string;
  email: string;
  kind: string;
  brief: string;
}): Promise<boolean> {
  try {
    const res = await fetch("/api/commissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    return res.ok;
  } catch {
    return false;
  }
}
