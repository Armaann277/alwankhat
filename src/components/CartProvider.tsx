"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cart as cartStore, collection, subscribePieces, subtotal, type CartItem } from "@/lib/store";

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const refresh = () => {
      setItems(cartStore.read().filter((item) => Boolean(collection.get(item.slug))));
    };
    refresh();
    return subscribePieces(refresh);
  }, []);

  useEffect(() => {
    const ping = () => setItems((prev) => prev);
    window.addEventListener("storage", ping);
    return () => window.removeEventListener("storage", ping);
  }, []);

  const add = useCallback((slug: string, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === slug);
      const next = found
        ? prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { slug, qty }];
      cartStore.write(next);
      return next;
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.slug !== slug);
      cartStore.write(next);
      return next;
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) => {
      const next =
        qty <= 0
          ? prev.filter((i) => i.slug !== slug)
          : prev.map((i) => (i.slug === slug ? { ...i, qty } : i));
      cartStore.write(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    cartStore.write([]);
  }, []);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const total = useMemo(() => subtotal(items), [items]);

  const value = useMemo(
    () => ({ items, count, total, add, remove, setQty, clear }),
    [items, count, total, add, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}