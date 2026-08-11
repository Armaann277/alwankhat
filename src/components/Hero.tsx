"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.1, staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 52% at 86% 5%, color-mix(in srgb, var(--rose) 42%, transparent) 0%, transparent 70%), radial-gradient(55% 45% at -8% 105%, color-mix(in srgb, var(--blush) 55%, transparent) 0%, transparent 68%), radial-gradient(42% 38% at 112% 88%, color-mix(in srgb, var(--gold) 16%, transparent) 0%, transparent 66%)",
        }}
      />

      {!reduce ? (
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 1, ease: "easeOut" }}
          className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-script text-[clamp(7rem,24vw,20rem)] leading-none text-rose/10"
        >
          Alwankhat
        </motion.span>
      ) : null}

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-16 px-5 pb-24 md:px-10 lg:grid-cols-12 lg:gap-8">
        <motion.div
          className="lg:col-span-7"
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <motion.p
            variants={item}
            className="flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-dust"
          >
            <span className="fleck" />
            Original paintings &amp; calligraphy
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-[clamp(2.6rem,6.4vw,5.75rem)] leading-[1.0] tracking-tight italic text-ink"
          >
            Every line is
            <br />
            <em className="font-medium text-dust">drawn once.</em>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-[38ch] text-[clamp(1rem,1.1vw,1.06rem)] leading-relaxed text-inksoft"
          >
            Original paintings and calligraphy from India. Each piece is drawn
            by hand, signed, and never repeated — the one you love here is the
            only one that will ever exist.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-11 flex flex-wrap items-center gap-9"
          >
            <Link href="/shop" className="btn-pill btn-pill-primary">
              View the collection
            </Link>
            <p className="font-script text-2xl leading-[1.15] text-dust">
              signed &amp; dated, one of one
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative lg:col-span-5"
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            aria-hidden
            className="absolute -left-8 -top-9 hidden w-40 rotate-[5deg] overflow-hidden rounded-2xl ring-1 ring-white/70 shadow-rose sm:block"
          >
            <Image
              src="https://picsum.photos/seed/alwankhat-noor/360/450"
              alt=""
              width={360}
              height={450}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div
            aria-hidden
            className="absolute -bottom-9 -right-3 h-28 w-28 rounded-full blur-2xl"
            style={{
              background: "color-mix(in srgb, var(--rose) 55%, transparent)",
            }}
          />

          <figure className="relative">
            <div className="shadow-rose rounded-[22px] bg-white/70 p-3 backdrop-blur-sm">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="https://picsum.photos/seed/alwankhat-gulabi-raat/900/1125"
                  alt="Gulabi Raat — acrylic on canvas, 48 × 60 cm"
                  width={900}
                  height={1125}
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
            <figcaption className="mt-5 flex items-baseline justify-between px-1">
              <span className="font-display text-lg italic text-ink">
                Gulabi Raat
              </span>
              <span className="text-[13px] text-dust">
                ₹6,200&ensp;·&ensp;One of one
              </span>
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}