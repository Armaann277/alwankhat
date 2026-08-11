"use client";

import { useState, type FormEvent } from "react";
import { auth, orders } from "@/lib/store";
import { formatINR } from "@/lib/format";

const inputCls =
  "mt-2 w-full rounded-xl border border-hairline bg-bg px-4 py-3.5 text-[15px] text-ink placeholder:text-inkfaint focus:border-rose focus:outline-none";

export default function AccountPage() {
  const [user, setUser] = useState(auth.read());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function signIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim().toLowerCase();
    if (!n || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError("Please add a name and a valid email.");
      return;
    }
    auth.signIn({ name: n, email: em });
    setUser({ name: n, email: em });
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-[520px] px-5 pb-32 pt-[clamp(7rem,14vw,11rem)] md:px-10">
        <p className="text-[12px] uppercase tracking-[0.24em] text-dust">Your account</p>
        <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,4rem)] italic tracking-tight text-ink">
          Sign in, softly
        </h1>
        <p className="mt-6 text-[16px] leading-relaxed text-inksoft">
          No passwords to remember here — just your name and email, so your
          orders and commissions stay in one place.
        </p>
        <form onSubmit={signIn} noValidate className="mt-10 rounded-[24px] border border-white/60 bg-white/70 p-8 shadow-rose backdrop-blur-sm">
          <label className="block text-[13.5px] text-ink" htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} type="text" className={inputCls} placeholder="Your name" />
          <label className="mt-5 block text-[13.5px] text-ink" htmlFor="email">Email</label>
          <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputCls} placeholder="name@example.com" />
          {error ? <p className="mt-3 text-[13px] text-dust">{error}</p> : null}
          <button type="submit" className="btn-pill btn-pill-primary mt-7 w-full">Sign in</button>
        </form>
      </section>
    );
  }

  const myOrders = orders.read();

  return (
    <section className="mx-auto max-w-[900px] px-5 pb-32 pt-[clamp(7rem,14vw,11rem)] md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[12px] uppercase tracking-[0.24em] text-dust">Your account</p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,4rem)] italic tracking-tight text-ink">
            {user.email.charAt(0).toUpperCase()}, welcome back
          </h1>
          <p className="mt-3 text-[15px] text-inksoft">{user.name} · {user.email}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            auth.signOut();
            setUser(null);
          }}
          className="text-[13.5px] text-inksoft underline decoration-inkfaint/50 underline-offset-4 transition-colors duration-200 hover:text-dust"
        >
          Sign out
        </button>
      </div>

      <h2 className="mt-16 font-display text-2xl italic text-ink">Your orders</h2>
      {myOrders.length === 0 ? (
        <div className="mt-6 rounded-[20px] border border-hairline bg-white/60 px-6 py-10 text-[15px] text-inksoft">
          Nothing here yet — pieces you place will rest here, with their story
          and proof of being one of one.
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-hairline">
          {myOrders.map((order) => (
            <li key={order.id} className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-display text-lg italic text-ink">{order.id}</p>
                <p className="text-[13px] text-inksoft">{new Date(order.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <p className="mt-2 text-[14px] text-inksoft">
                {order.items.map((i) => i.qty + " × " + i.slug.replace(/-/g, " ")).join(", ")}
              </p>
              <p className="mt-1 text-[15px] text-dust">{formatINR(order.total)}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-14 rounded-[24px] border border-white/60 bg-blush/30 px-6 py-8">
        <p className="font-script text-3xl leading-[1.15] text-rose">a quieter path</p>
        <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-inksoft">
          For commissioned pieces, your brief and sketches live together with
          us — reach out and the conversation stays here.
        </p>
      </div>
    </section>
  );
}