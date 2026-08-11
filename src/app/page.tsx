import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ArtworkCard } from "@/components/ArtworkCard";
import { pieces, getPiece } from "@/data/pieces";

export default function HomePage() {
  const featured = pieces.filter((piece) => piece.featured && !piece.sold);
  const splitPiece = getPiece("noor") ?? featured[0];
  const preview = featured.length >= 3 ? featured.slice(0, 3) : [...pieces].slice(0, 3);

  return (
    <>
      <Hero />

      {/* collection — asymmetric editorial preview */}
      <section className="relative mx-auto max-w-[1400px] px-5 py-[clamp(5rem,12vw,9rem)] md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-6 h-[60%]"
          style={{
            background:
              "radial-gradient(45% 55% at 12% 8%, color-mix(in srgb, var(--blush) 35%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-dust">
                  <span className="fleck" />
                  The collection
                </p>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] tracking-tight italic text-ink">
                  A few pieces at home today
                </h2>
              </div>
              <p className="max-w-[44ch] text-[15px] leading-relaxed text-inksoft">
                Sold-out pieces stay in the gallery — once a piece is gone, it
                is gone for good. That is the whole point.
              </p>
            </div>
          </Reveal>

          <div className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <ArtworkCard piece={preview[0]} />
              </Reveal>
            </div>
            <div className="flex flex-col gap-12 lg:col-span-5">
              <Reveal delay={0.1}>
                <ArtworkCard piece={preview[1]} />
              </Reveal>
              <Reveal delay={0.18}>
                <ArtworkCard piece={preview[2]} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* statement — romantic panel */}
      <section className="px-5 md:px-10">
        <Reveal>
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[clamp(1.75rem,4vw,3rem)] bg-blush/40 px-6 py-[clamp(5rem,13vw,9rem)] text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 55% at 15% 15%, color-mix(in srgb, var(--gold) 12%, transparent) 0%, transparent 65%), radial-gradient(50% 60% at 88% 90%, color-mix(in srgb, var(--rose) 30%, transparent) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <Reveal>
                <p className="font-script pb-8 text-[clamp(2.4rem,5vw,4rem)] leading-[1.12] text-rose">
                  colours of the line
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-display text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.06] tracking-tight italic text-ink">
                  Alwan — colours. Khat — the line.
                  <br />
                  Together,{" "}
                  <span className="text-dust">
                    Alwankhat<span className="fleck ml-3" />
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mx-auto mt-10 max-w-[58ch] text-[clamp(1rem,1.1vw,1.08rem)] leading-relaxed text-inksoft">
                  Every piece is drawn by hand and never repeated. When it
                  sells, the original stays original — what you see here today
                  is all that will ever exist. We keep the work up, sold or
                  not, the way a gallery keeps a show.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="divider-dot mx-auto mt-14 max-w-xs" aria-hidden>
                  <span className="fleck fleck-gold" />
                </div>
              </Reveal>
              <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-0 sm:grid-cols-3">
                {[
                  ["1 of 1", "each piece"],
                  ["Handmade in India", "signed &amp; dated"],
                  ["No prints", "ever"],
                ].map(([top, bottom], index) => (
                  <Reveal key={top} delay={0.1 + index * 0.06}>
                    <div className="border-t border-ink/20 px-4 py-6 sm:border-l sm:border-t-0">
                      <p className="font-display text-2xl italic text-ink">
                        {top}
                      </p>
                      <p className="mt-1 text-[13.5px] text-inksoft">{bottom}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* featured piece — split layout */}
      <section className="relative mx-auto max-w-[1400px] px-5 py-[clamp(5rem,12vw,9rem)] md:px-10">
        {splitPiece ? (
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -left-6 -top-6 h-40 w-40 rounded-full blur-3xl"
                  style={{
                    background:
                      "color-mix(in srgb, var(--blush) 60%, transparent)",
                  }}
                />
                <div className="shadow-rose relative rounded-[18px] bg-white/60 p-3 backdrop-blur-sm">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src={splitPiece.image}
                      alt={splitPiece.title}
                      width={900}
                      height={1125}
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="max-w-md">
              <Reveal>
                <p className="flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-dust">
                  <span className="fleck" />
                  From the collection
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.02] tracking-tight italic text-ink">
                  {splitPiece.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-7 text-[16px] leading-relaxed text-inksoft">
                  {splitPiece.story}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 text-[14px]">
                  {[
                    ["Medium", splitPiece.medium],
                    ["Size", splitPiece.size],
                    ["Signed", splitPiece.year],
                    ["Edition", "1 of 1"],
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
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center gap-7">
                  <Link
                    href={`/piece/${splitPiece.slug}`}
                    className="btn-pill btn-pill-primary"
                  >
                    View this piece
                  </Link>
                  <span className="font-script text-xl leading-[1.15] text-dust">
                    {splitPiece.sold ? "sold, one of one" : "available now"}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        ) : null}
      </section>

      {/* commission — one purpose */}
      <section className="mx-auto max-w-[1400px] px-5 pb-[clamp(5rem,12vw,10rem)] md:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[clamp(1.75rem,4vw,3rem)] bg-blush/50 px-6 py-[clamp(5rem,13vw,9rem)] text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 60% at 85% 10%, color-mix(in srgb, var(--rose) 40%, transparent) 0%, transparent 70%), radial-gradient(40% 40% at 5% 95%, color-mix(in srgb, var(--gold) 10%, transparent) 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <p className="font-script text-[clamp(2.4rem,5vw,4rem)] leading-[1.12] text-rose">
                just for you
              </p>
              <h2 className="mx-auto mt-6 max-w-[18ch] font-display text-[clamp(2.1rem,4.8vw,3.8rem)] leading-[1.05] tracking-tight italic text-ink">
                Have a verse, a name, or a feeling in mind?
              </h2>
              <p className="mx-auto mt-7 max-w-[48ch] text-[16px] leading-relaxed text-inksoft">
                A gift, a wedding, a line your family keeps repeating — we
                begin with a conversation, not a shape. One piece, drawn only
                for you.
              </p>
              <div className="mt-11 flex flex-wrap items-center justify-center gap-8">
                <Link href="/commissions" className="btn-pill btn-pill-primary">
                  Commission a piece
                </Link>
                <a
                  href="https://instagram.com/alwankhat"
                  target="_blank"
                  rel="noreferrer"
                  className="font-script text-2xl leading-[1.15] text-dust transition-colors duration-200 ease-out hover:text-ink"
                >
                  @alwankhat
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}