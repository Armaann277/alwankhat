"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, subscribePieces, type Piece } from "@/lib/store";
import { formatINR } from "@/lib/format";
import { useCart } from "@/components/CartProvider";

export function LivePiece({ slug }: { slug: string }) {
  const [piece, setPiece] = useState<Piece | undefined>();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const refresh = () => setPiece(collection.get(slug));
    refresh();
    return subscribePieces(refresh);
  }, [slug]);

  if (!piece) {
    return (
      <section className="mx-auto max-w-[1400px] px-5 pb-32 pt-[clamp(7rem,14vw,12rem)] text-center md:px-10">
        <h1 className="font-display text-4xl italic text-ink">This piece isn't on the wall</h1>
        <div className="mt-10">
          <Link href="/shop" className="btn-pill btn-pill-primary">View the collection</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-[clamp(6.5rem,14vw,10rem)] md:px-10">
      <Link href="/shop" className="inline-flex items-center gap-2 text-[13.5px] text-inksoft transition-colors duration-200 hover:text-ink">
        ← The collection
      </Link>

      <div className="mt-8 grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <div className="shadow-rose rounded-[22px] bg-white/60 p-3 backdrop-blur-sm">
            <div className="overflow-hidden rounded-2xl">
              <Image src={piece.image} alt={piece.title} width={900} height={1125} sizes="(max-width: 768px) 100vw, 55vw" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        </div>

        <div className="max-w-md lg:col-span-5">
          <p className="flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-dust">
            <span className="fleck" />
            {piece.category}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.02] tracking-tight italic text-ink">
            {piece.title}
          </h1>

          {piece.sold ? (
            <span className="mt-6 inline-flex rounded-full bg-dust/15 px-4 py-1.5 text-[12px] uppercase tracking-[0.14em] text-dust">
              Sold — one of one, gone for good
            </span>
          ) : (
            <p className="mt-6 text-2xl text-ink">
              {formatINR(piece.price)}
              <span className="ml-2 align-middle text-[13px] text-inksoft">· one of one</span>
            </p>
          )}

          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 text-[14px]">
            {[
              ["Medium", piece.medium],
              ["Size", piece.size],
              ["Signed & dated", piece.year],
              ["Edition", "1 of 1"],
            ].map(([term, value]) => (
              <div key={term} className="border-t border-hairline pt-3">
                <dt className="text-[11.5px] uppercase tracking-[0.14em] text-inkfaint">{term}</dt>
                <dd className="mt-1 text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-[16px] leading-relaxed text-inksoft">{piece.story}</p>

          <div className="mt-10">
            {piece.sold ? (
              <p className="text-[15px] leading-relaxed text-inksoft">
                This piece has found its home. If it was made for a moment like yours,{" "}
                <Link href="/commissions" className="text-dust underline decoration-dust/40 underline-offset-4 hover:text-ink">
                  we can draw one only for you
                </Link>
                .
              </p>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    add(piece.slug);
                    setAdded(true);
                  }}
                  className={`btn-pill w-full sm:w-auto ${added ? "border border-hairline bg-bg text-ink" : "btn-pill-primary"}`}
                >
                  {added ? "Added to cart ✓" : "Add to cart"}
                </button>
                <p className="mt-4 text-[13px] text-inksoft">
                  Ships across India, sealed and framed-ready. Secure payment via Razorpay.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}