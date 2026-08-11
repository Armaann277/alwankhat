"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { collection, orders } from "@/lib/store";
import { formatINR } from "@/lib/format";

export default function CartPage() {
  const { items, total, count, setQty, remove, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-[1400px] px-5 pb-32 pt-[clamp(7rem,14vw,11rem)] text-center md:px-10">
        <p className="text-[12px] uppercase tracking-[0.24em] text-dust">Your cart</p>
        <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] italic tracking-tight text-ink">
          {placed ? "Order placed" : "So empty, so quiet"}
        </h1>
        <p className="mx-auto mt-7 max-w-[46ch] text-[16px] leading-relaxed text-inksoft">
          {placed
            ? "Thank you — your order is safe in your account. We'll write to you soon."
            : "Every piece here is one of one. When one calls your name, it only ever answers once."}
        </p>
        {!placed ? (
          <div className="mt-11">
            <Link href="/shop" className="btn-pill btn-pill-primary">
              View the collection
            </Link>
          </div>
        ) : null}
      </section>
    );
  }

  function checkout() {
    const order = {
      id: `AK-${Date.now().toString(36).toUpperCase()}`,
      items,
      total,
      placedAt: new Date().toISOString(),
    };
    orders.add(order);
    clear();
    setPlaced(true);
  }

  return (
    <section className="mx-auto max-w-[1100px] px-5 pb-32 pt-[clamp(7rem,14vw,11rem)] md:px-10">
      <p className="text-[12px] uppercase tracking-[0.24em] text-dust">Your cart</p>
      <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,4rem)] italic tracking-tight text-ink">
        {count} piece{count === 1 ? "" : "s"}, chosen
      </h1>

      <ul className="mt-12 divide-y divide-hairline">
        {items.map((item) => {
          const piece = collection.get(item.slug);
          if (!piece) return null;
          return (
            <li key={item.slug} className="flex gap-6 py-8">
              <Link href={`/piece/${item.slug}`} className="shrink-0">
                <div className="w-28 overflow-hidden rounded-xl bg-white/60 p-1.5 ring-1 ring-hairline sm:w-36">
                  <Image src={piece.image} alt={piece.title} width={288} height={360} className="aspect-[4/5] w-full rounded-lg object-cover" />
                </div>
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-4 py-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/piece/${item.slug}`} className="font-display text-2xl italic text-ink transition-colors duration-200 hover:text-dust">
                      {piece.title}
                    </Link>
                    <p className="mt-1 text-[13px] text-inksoft">{piece.category}</p>
                  </div>
                  <p className="text-[15px] text-dust">{formatINR(piece.price)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-hairline">
                    <button type="button" onClick={() => setQty(item.slug, item.qty - 1)} className="flex h-9 w-9 items-center justify-center text-ink transition-transform duration-150 active:scale-[0.9]" aria-label="Decrease quantity">
                      −
                    </button>
                    <span className="w-8 text-center text-[14px] text-ink">{item.qty}</span>
                    <button type="button" onClick={() => setQty(item.slug, item.qty + 1)} className="flex h-9 w-9 items-center justify-center text-ink transition-transform duration-150 active:scale-[0.9]" aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                  <button type="button" onClick={() => remove(item.slug)} className="text-[13px] text-inksoft underline decoration-inkfaint/50 underline-offset-4 transition-colors duration-200 hover:text-dust">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 flex flex-col gap-8 border-t border-hairline pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] uppercase tracking-[0.16em] text-inksoft">Subtotal</p>
          <p className="mt-2 text-3xl text-ink">{formatINR(total)}</p>
          <p className="mt-2 text-[13px] text-inksoft">Shipping calculated at checkout · secure payment via Razorpay</p>
        </div>
        <button type="button" onClick={checkout} className="btn-pill btn-pill-primary w-full sm:w-auto">
          Place order — {formatINR(total)}
        </button>
      </div>
    </section>
  );
}