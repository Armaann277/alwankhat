import type { Metadata } from "next";
import { CommissionForm } from "@/components/CommissionForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Commissions",
  description:
    "Commission a one-of-a-kind painting or calligraphy piece drawn only for you.",
};

export default function CommissionsPage() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-5 pb-32 pt-[clamp(6.5rem,14vw,10rem)] md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[68%]"
        style={{
          background:
            "radial-gradient(50% 55% at 10% 5%, color-mix(in srgb, var(--blush) 48%, transparent) 0%, transparent 70%), radial-gradient(42% 45% at 92% 55%, color-mix(in srgb, var(--rose) 24%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-dust">
              <span className="fleck" />
              Commissions
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.9rem)] leading-[1.0] tracking-tight italic text-ink">
              Drawn only for you
            </h1>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-inksoft">
              <p>
                A name for a newborn, a verse a wedding was built around, a line
                from a poem that has followed your family for generations — we
                draw it once, and it belongs to no one else but you.
              </p>
              <p>
                Commissions are limited, one at a time, and begin with a
                conversation rather than a brief. Share what you can, and we
                will shape the rest together.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <dl className="mt-12 grid gap-0 text-[14px] sm:grid-cols-2">
              {[
                ["Lead time", "2 to 4 weeks"],
                ["Pricing", "from ₹8,000"],
                ["The original", "yours, alone"],
                ["Progress", "we share sketches"],
              ].map(([term, value]) => (
                <div key={term} className="border-t border-hairline py-4 pr-6">
                  <dt className="text-[11.5px] uppercase tracking-[0.14em] text-inkfaint">
                    {term}
                  </dt>
                  <dd className="mt-1 text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.08}>
            <CommissionForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}