"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Piece } from "@/data/pieces";
import { ArtworkCard } from "@/components/ArtworkCard";
import { collection, subscribePieces } from "@/lib/store";

type Filter = "All" | "Paintings" | "Calligraphy";

const filters: Filter[] = ["All", "Paintings", "Calligraphy"];

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

export function CollectionGrid({ pieces }: { pieces: Piece[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [live, setLive] = useState<Piece[]>(pieces);
  const reduce = useReducedMotion();

  useEffect(() => {
    const refresh = () => setLive(collection.all());
    refresh();
    return subscribePieces(refresh);
  }, []);

  const visible = filter === "All" ? live : live.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
        {filters.map((f) => {
          const active = f === filter;
          const count = f === "All" ? live.length : live.filter((p) => p.category === f).length;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-[13.5px] transition-colors duration-200 ease-out ${
                active
                  ? "bg-rose text-cream shadow-[0_8px_18px_-8px_color-mix(in_srgb,var(--rose)_70%,transparent)]"
                  : "border border-hairline bg-white/60 text-inksoft hover:text-ink"
              }`}
            >
              {f}
              <span className={active ? "text-cream/70" : "text-inkfaint"}>&ensp;{count}</span>
            </button>
          );
        })}
      </div>

      <motion.ul
        key={filter}
        variants={reduce ? undefined : gridVariants}
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "show"}
        className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((piece) => (
          <motion.li key={piece.slug} variants={reduce ? undefined : cardVariants}>
            <ArtworkCard piece={piece} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}