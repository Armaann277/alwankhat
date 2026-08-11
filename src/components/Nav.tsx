"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

const links = [
  { href: "/shop", label: "The collection" },
  { href: "/commissions", label: "Commissions" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="chrome fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 md:px-10">
        <Link href="/" className="font-script pb-1.5 text-[1.7rem] leading-[1.15] text-ink transition-colors duration-200 hover:text-dust" aria-label="Alwankhat — home">
          Alwankhat
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-[13px] tracking-[0.03em] text-inksoft transition-colors duration-200 hover:text-ink">
              {link.label}
            </Link>
          ))}
          <Link href="/account" className="text-[13px] tracking-[0.03em] text-inksoft transition-colors duration-200 hover:text-ink">
            Account
          </Link>
          <Link href="https://instagram.com/alwankhat" className="text-[13px] tracking-[0.03em] text-inksoft transition-colors duration-200 hover:text-ink">
            Instagram
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform duration-150 active:scale-[0.92]" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
            <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8h12l-1 11a1.5 1.5 0 0 1-1.5 1.3H8.5A1.5 1.5 0 0 1 7 19l-1-11Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose px-1 text-[10px] font-semibold text-cream">
                {count}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform duration-150 active:scale-[0.92] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`md:hidden ${open ? "block" : "hidden"}`}>
        <nav className="px-5 pb-6 pt-2" aria-label="Mobile">
          {[...links, { href: "/account", label: "Account" }].map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="menu-item block border-t border-hairline py-4 font-display text-2xl italic text-ink transition-colors duration-200 hover:text-dust" style={{ animationDelay: `${index * 60}ms` }}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}