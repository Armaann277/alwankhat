import Image from "next/image";
import Link from "next/link";
import type { Piece } from "@/data/pieces";
import { formatINR } from "@/lib/format";

export function ArtworkCard({ piece }: { piece: Piece }) {
  return (
    <Link
      href={`/piece/${piece.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      <div className="shadow-rose relative rounded-[18px] bg-white/60 p-3 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <div className="relative overflow-hidden rounded-xl bg-blush/30">
          <Image
            src={piece.image}
            alt={piece.title}
            width={900}
            height={1125}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {piece.sold ? (
            <span className="absolute left-3 top-3 rounded-full bg-cream/85 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-dust backdrop-blur">
              Sold
            </span>
          ) : (
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose shadow-[0_0_0_4px_rgba(255,255,255,0.45)]" />
          )}
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4 px-1 sm:px-3">
        <h3 className="font-display text-xl leading-[1.1] italic text-ink">
          {piece.title}
        </h3>
        <span className="shrink-0 text-[13.5px] text-dust">
          {piece.sold ? "Sold" : formatINR(piece.price)}
        </span>
      </div>
      <p className="mt-1 px-1 text-[13px] text-inksoft sm:px-3">
        {piece.category}
      </p>
    </Link>
  );
}