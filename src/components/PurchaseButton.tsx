"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function PurchaseButton() {
  const [state, setState] = useState<"idle" | "ready">("idle");
  const reduce = useReducedMotion();

  if (state === "ready") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="rounded-2xl border border-hairline bg-surface px-6 py-5"
      >
        <p className="text-[15px] leading-relaxed text-ink">
          Secure Razorpay checkout goes live with the store launch.
        </p>
        <p className="mt-1.5 text-[14px] text-inksoft">
          Until then, DM{" "}
          <a
            href="https://instagram.com/alwankhat"
            target="_blank"
            rel="noreferrer"
            className="text-dust underline decoration-dust/40 underline-offset-4 transition-colors duration-200 ease-out hover:text-ink"
          >
            @alwankhat
          </a>{" "}
          and this piece is held for you.
        </p>
      </motion.div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setState("ready")}
      className="btn-pill btn-pill-primary w-full sm:w-auto"
    >
      Buy this piece
    </button>
  );
}