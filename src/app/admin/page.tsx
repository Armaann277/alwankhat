"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { admin, collection, seedPieces, subscribePieces, type Piece as StoredPiece } from "@/lib/store";
import { formatINR } from "@/lib/format";

type Piece = {
  slug: string;
  title: string;
  category: string;
  price: number;
  sold: boolean;
  image: string;
  size: string;
  medium: string;
  year: string;
  story: string;
};

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "alwankhat";

const emptyDraft: Piece = {
  slug: "",
  title: "",
  category: "Paintings",
  price: 4999,
  sold: false,
  image: "",
  size: "",
  medium: "",
  year: String(new Date().getFullYear()),
  story: "",
};

const labels: Record<string, string> = {
  slug: "Slug (url)",
  title: "Title",
  category: "Category",
  price: "Price (₹)",
  sold: "Sold",
  image: "Image URL",
  size: "Size",
  medium: "Medium",
  year: "Year",
  story: "Story",
};

function inputCls() {
  return "w-full rounded-xl border border-hairline bg-bg px-3.5 py-2.5 text-[14px] text-ink placeholder:text-inkfaint focus:border-rose focus:outline-none";
}

function inputClsSel(invalid: boolean) {
  return invalid ? "border-dust/70" : "border-hairline";
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(typeof window === "undefined" ? false : !admin.locked());
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [editing, setEditing] = useState<Piece | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<Piece>(emptyDraft);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    if (!unlocked) return;
    const refresh = () => setPieces(collection.all());
    refresh();
    return subscribePieces(refresh);
  }, [unlocked]);

  if (!unlocked) {
    return (
      <section className="mx-auto max-w-[440px] px-5 pb-32 pt-[clamp(7rem,14vw,12rem)] md:px-10">
        <p className="text-[12px] uppercase tracking-[0.24em] text-dust">Studio</p>
        <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] italic tracking-tight text-ink">
          The studio door
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-inksoft">
          This is where pieces are priced, listed, and held. Enter the studio
          PIN to step inside.
        </p>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (pin === ADMIN_PIN) {
              admin.unlock();
              setUnlocked(true);
            } else {
              setPinError(true);
            }
          }}
          className="mt-8 space-y-4"
        >
          <label className="block" htmlFor="pin">
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setPinError(false);
              }}
              className={`w-full rounded-xl border bg-bg px-4 py-3.5 text-[15px] text-ink focus:outline-none ${pinError ? "border-dust/70" : "border-hairline focus:border-rose"}`}
              placeholder="Studio PIN"
              autoComplete="off"
            />
          </label>
          {pinError ? <p className="text-[13px] text-dust">That PIN isn't right.</p> : null}
          <button type="submit" className="btn-pill btn-pill-primary w-full">Enter the studio</button>
        </form>
      </section>
    );
  }

  const extras = collection.readExtras().map((p) => p.slug);
  const isSeed = (s: string) => seedPieces.some((p) => p.slug === s);

  function setField(key: string, value: string | number | boolean) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const slug = draft.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const piece: Piece = {
      ...draft,
      slug,
      title: draft.title.trim() || "Untitled",
      price: Number(draft.price) || 0,
      image: draft.image.trim() || `https://picsum.photos/seed/alwankhat-${slug || "piece"}/900/1125`,
    };
    if (!piece.slug) {
      setSavedMsg("A slug is needed first.");
      return;
    }
    collection.upsert(piece as StoredPiece);
    setShowForm(false);
    setDraft(emptyDraft);
    setEditing(null);
    setSavedMsg("Saved — the catalogue breathes again.");
  }

  function beginEdit(piece: Piece) {
    setDraft(piece);
    setEditing(piece);
    setShowForm(true);
  }

  function toggleSold(slug: string, sold: boolean) {
    collection.patch(slug, { sold });
  }

  function setPrice(slug: string, price: number) {
    collection.patch(slug, { price });
  }

  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-32 pt-[clamp(7rem,14vw,11rem)] md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[12px] uppercase tracking-[0.24em] text-dust">Studio</p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,4rem)] italic tracking-tight text-ink">
            Manage the catalogue
          </h1>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-inksoft">
            {pieces.length} pieces live · {pieces.filter((p) => p.sold).length} sold · prices set the moment you type.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/shop" className="text-[13.5px] text-inksoft underline decoration-inkfaint/50 underline-offset-4 hover:text-ink">View shop</Link>
          <button
            type="button"
            onClick={() => {
              setShowForm(true);
              setEditing(null);
              setDraft(emptyDraft);
            }}
            className="btn-pill btn-pill-primary"
          >
            Add a piece
          </button>
        </div>
      </div>

      {savedMsg ? (
        <p className="mt-8 rounded-xl border border-hairline bg-white/60 px-4 py-3 text-[14px] text-ink">{savedMsg}</p>
      ) : null}

      {showForm ? (
        <form onSubmit={save} className="mt-10 rounded-[24px] border border-white/60 bg-white/70 p-6 shadow-rose backdrop-blur-sm md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl italic text-ink">
              {editing ? `Editing ${editing.title}` : "A new piece"}
            </h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-[13px] text-inksoft underline decoration-inkfaint/50 underline-offset-4 hover:text-dust">
              Close
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {(["title", "slug", "category", "price"] as const).map((field) => (
              <label key={field} className="block">
                <span className="text-[13px] text-ink">{labels[field]}</span>
                <input
                  type={field === "price" ? "number" : "text"}
                  value={String(draft[field])}
                  onChange={(e) => setField(field, field === "price" ? Number(e.target.value) : e.target.value)}
                  className={`mt-1 ${inputCls()} ${inputClsSel(field === "slug" && !draft.slug.trim())}`}
                  placeholder={field === "slug" ? "gulabi-raat" : field === "category" ? "Paintings / Calligraphy" : ""}
                />
              </label>
            ))}
            <label className="block">
              <span className="text-[13px] text-ink">{labels.image}</span>
              <input type="text" value={draft.image} onChange={(e) => setField("image", e.target.value)} className={`mt-1 ${inputCls()}`} placeholder="https://… (optional, auto image if empty)" />
            </label>
            <label className="block">
              <span className="text-[13px] text-ink">{labels.size}</span>
              <input type="text" value={draft.size} onChange={(e) => setField("size", e.target.value)} className={`mt-1 ${inputCls()}`} placeholder="48 × 60 cm" />
            </label>
            <label className="block">
              <span className="text-[13px] text-ink">{labels.medium}</span>
              <input type="text" value={draft.medium} onChange={(e) => setField("medium", e.target.value)} className={`mt-1 ${inputCls()}`} placeholder="Acrylic on canvas" />
            </label>
            <label className="block">
              <span className="text-[13px] text-ink">{labels.year}</span>
              <input type="text" value={draft.year} onChange={(e) => setField("year", e.target.value)} className={`mt-1 ${inputCls()}`} />
            </label>
            <label className="block">
              <span className="text-[13px] text-ink">Sold</span>
              <select value={String(draft.sold)} onChange={(e) => setField("sold", e.target.value === "true")} className={`mt-1 ${inputCls()}`}>
                <option value="false">Available</option>
                <option value="true">Sold</option>
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-[13px] text-ink">{labels.story}</span>
              <textarea rows={3} value={draft.story} onChange={(e) => setField("story", e.target.value)} className={`mt-1 ${inputCls()} resize-y`} />
            </label>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn-pill btn-pill-primary">Save piece</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-pill border border-hairline bg-bg text-ink hover:text-dust">
              Discard
            </button>
          </div>
        </form>
      ) : null}

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-hairline text-[11.5px] uppercase tracking-[0.14em] text-inkfaint">
              <th className="py-3 pr-4 font-normal">Piece</th>
              <th className="py-3 pr-4 font-normal">Category</th>
              <th className="py-3 pr-4 font-normal">Price</th>
              <th className="py-3 pr-4 font-normal">Status</th>
              <th className="py-3 font-normal" />
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {pieces.map((piece) => (
              <tr key={piece.slug} className="align-middle">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <Image src={piece.image} alt="" width={44} height={55} className="aspect-[4/5] w-11 rounded-md object-cover" />
                    <div>
                      <p className="font-display text-lg italic leading-tight text-ink">{piece.title}</p>
                      <p className="text-[12px] text-inkfaint">{piece.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4 text-[14px] text-inksoft">{piece.category}</td>
                <td className="py-3 pr-4">
                  <input
                    type="number"
                    defaultValue={piece.price}
                    onBlur={(e) => setPrice(piece.slug, Number(e.target.value) || 0)}
                    className="w-28 rounded-lg border border-hairline bg-bg px-3 py-1.5 text-[14px] text-ink focus:border-rose focus:outline-none"
                    aria-label={`Price of ${piece.title}`}
                  />
                </td>
                <td className="py-3 pr-4">
                  <button
                    type="button"
                    onClick={() => toggleSold(piece.slug, !piece.sold)}
                    className={`rounded-full px-3 py-1 text-[11.5px] uppercase tracking-[0.12em] transition-colors duration-200 ${piece.sold ? "bg-dust/15 text-dust" : "bg-blush/40 text-ink"}`}
                  >
                    {piece.sold ? "Sold" : "Available"}
                  </button>
                </td>
                <td className="py-3 text-right">
                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => beginEdit(piece)} className="text-[13px] text-inksoft underline decoration-inkfaint/50 underline-offset-4 hover:text-ink">
                      Edit
                    </button>
                    {!isSeed(piece.slug) ? (
                      <button type="button" onClick={() => collection.remove(piece.slug)} className="text-[13px] text-dust underline decoration-dust/40 underline-offset-4 hover:text-ink">
                        Delete
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-[12.5px] text-inkfaint">
          Seed pieces can have their price and status edited, but only studio-added pieces can be deleted. {extras.length} studio-added.
        </p>
      </div>
    </section>
  );
}