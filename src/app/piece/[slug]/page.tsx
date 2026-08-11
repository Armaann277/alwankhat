import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pieces } from "@/data/pieces";
import { formatINR } from "@/lib/format";
import { PurchaseButton } from "@/components/PurchaseButton";
import { Reveal } from "@/components/Reveal";
import { LivePiece } from "@/components/LivePiece";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pieces.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const piece = pieces.find((p) => p.slug === slug);
  if (!piece) return { title: "Piece not found" };
  return {
    title: piece.title,
    description: `${piece.title} — ${piece.medium}. ${piece.story}`,
  };
}

export default async function PiecePage({ params }: Props) {
  const { slug } = await params;
  const piece = pieces.find((p) => p.slug === slug);

  if (!piece) return <LivePiece slug={slug} />;

  const others = pieces.filter((p) => p.slug !== piece.slug && !p.sold);

  return (
    <>
      <section className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-[clamp(6.5rem,14vw,10rem)] md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[68%]"
          style={{
            background:
              "radial-gradient(45% 55% at 85% 0%, color-mix(in srgb, var(--rose) 26%, transparent) 0%, transparent 72%)",
          }}
        />
        <Link
          href="/shop"
          className="relative inline-flex items-center gap-2 text-[13.5px] text-inksoft transition-colors duration-200 ease-out hover:text-ink"
        >
          ← The collection
        </Link>

        <div className="relative mt-8 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="shadow-rose relative rounded-[22px] bg-white/60 p-3 backdrop-blur-sm">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  width={900}
                  height={1125}
                  priority
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="max-w-md lg:col-span-5">
            <Reveal>
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
                  <span className="ml-2 align-middle text-[13px] text-inksoft">
                    · one of one
                  </span>
                </p>
              )}
            </Reveal>

            <Reveal delay={0.06}>
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 text-[14px]">
                {[
                  ["Medium", piece.medium],
                  ["Size", piece.size],
                  ["Signed & dated", piece.year],
                  ["Edition", "1 of 1 — no prints"],
                ].map(([term, value]) => (
                  <div key={term} className="border-t border-hairline pt-3">
                    <dt className="text-[11.5px] uppercase tracking-[0.14em] text-inkfaint">
                      {term}
                    </dt>
                    <dd className="mt-1 text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 text-[16px] leading-relaxed text-inksoft">
                {piece.story}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10">
                {piece.sold ? (
                  <p className="text-[15px] leading-relaxed text-inksoft">
                    This piece has found its home. If it was made for a moment
                    like yours,{" "}
                    <Link
                      href="/commissions"
                      className="text-dust underline decoration-dust/40 underline-offset-4 transition-colors duration-200 ease-out hover:text-ink"
                    >
                      we can draw one only for you
                    </Link>
                    .
                  </p>
                ) : (
                  <>
                    <PurchaseButton />
                    <p className="mt-4 text-[13px] text-inksoft">
                      Ships across India, sealed and framed-ready. Secure payment
                      via Razorpay.
                    </p>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="mx-auto max-w-[1400px] px-5 pb-32 md:px-10 md:pb-40">
          <Reveal>
            <h2 className="flex items-center gap-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] italic text-ink">
              <span className="fleck" />
              From the collection
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((other, index) => (
              <Reveal key={other.slug} delay={index * 0.07}>
                <PieceTeaser slug={other.slug} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

function PieceTeaser({ slug }: { slug: string }) {
  const piece = pieces.find((p) => p.slug === slug);
  if (!piece) return null;
  return (
    <Link href={`/piece/${piece.slug}`} className="group block">
      <div className="shadow-rose rounded-[16px] bg-white/60 p-2.5">
        <div className="overflow-hidden rounded-[12px]">
          <Image
            src={piece.image}
            alt={piece.title}
            width={900}
            height={1125}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <h3 className="mt-4 px-1 font-display text-lg leading-[1.1] italic text-ink">
        {piece.title}
      </h3>
      <p className="mt-0.5 px-1 text-[13px] text-inksoft">{piece.category}</p>
    </Link>
  );
}