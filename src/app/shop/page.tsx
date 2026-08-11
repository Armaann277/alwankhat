import type { Metadata } from "next";
import { CollectionGrid } from "@/components/CollectionGrid";
import { pieces } from "@/data/pieces";

export const metadata: Metadata = {
  title: "The collection",
  description:
    "Original handmade paintings and calligraphy by Alwankhat. One of one, signed, and never repeated.",
};

export default function ShopPage() {
  const soldCount = pieces.filter((piece) => piece.sold).length;

  return (
    <section className="relative mx-auto max-w-[1400px] px-5 pb-32 pt-[clamp(6.5rem,14vw,10rem)] md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            "radial-gradient(50% 55% at 80% 6%, color-mix(in srgb, var(--rose) 30%, transparent) 0%, transparent 72%), radial-gradient(45% 45% at 8% 88%, color-mix(in srgb, var(--blush) 45%, transparent) 0%, transparent 70%)",
        }}
      />

      <header className="relative max-w-2xl">
        <p className="flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-dust">
          <span className="fleck" />
          One of one
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.0] tracking-tight italic text-ink">
          The collection
        </h1>
        <p className="mt-7 max-w-xl text-[clamp(1rem,1.1vw,1.06rem)] leading-relaxed text-inksoft">
          {pieces.length} originals, each drawn once. {soldCount} have found
          their home and stay on the wall in the gallery; every available piece
          is one of one — no prints, no repeats.
        </p>
      </header>

      <div className="relative mt-[clamp(3rem,6vw,4.5rem)]">
        <CollectionGrid pieces={pieces} />
      </div>
    </section>
  );
}