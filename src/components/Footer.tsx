import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 70% at 100% 0%, color-mix(in srgb, var(--rose) 22%, transparent) 0%, transparent 70%), radial-gradient(45% 60% at 0% 100%, color-mix(in srgb, var(--blush) 40%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-script pb-2 text-4xl leading-[1.15] text-dust">
              Alwankhat
            </p>
            <p className="max-w-xs text-[15px] leading-relaxed text-inksoft">
              Handmade paintings and calligraphy from India. Every line drawn
              once — every piece the only one.
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-[15px] md:items-end" aria-label="Footer">
            <Link href="/shop" className="text-ink transition-colors duration-200 ease-out hover:text-dust">
              The collection
            </Link>
            <Link href="/commissions" className="text-ink transition-colors duration-200 ease-out hover:text-dust">
              Commissions
            </Link>
            <a
              href="https://instagram.com/alwankhat"
              target="_blank"
              rel="noreferrer"
              className="text-ink transition-colors duration-200 ease-out hover:text-dust"
            >
              @alwankhat
            </a>
            <Link href="/admin" className="text-inkfaint transition-colors duration-200 ease-out hover:text-dust">
              Studio
            </Link>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-6 text-[12.5px] text-inksoft md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Alwankhat. All pieces are one of one.</p>
          <p>Secure checkout by Razorpay</p>
        </div>
      </div>
    </footer>
  );
}