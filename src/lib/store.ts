import { pieces, type Piece } from "@/data/pieces";

export type { Piece };

export type CartItem = { slug: string; qty: number };

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: string;
};

export type User = { name: string; email: string };

const PIECES_KEY = "alwankhat_pieces";
const CART_KEY = "alwankhat_cart";
const ORDERS_KEY = "alwankhat_orders";
const USER_KEY = "alwankhat_user";
const ADMIN_KEY = "alwankhat_admin";

const PIECE_EVENT = "alwankhat:pieces";

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function subscribePieces(fn: Listener) {
  listeners.add(fn);
  fn();
  return () => {
    listeners.delete(fn);
  };
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const seedPieces: Piece[] = pieces;

export const collection = {
  readExtras(): Piece[] {
    return read<Piece[]>(PIECES_KEY, []);
  },
  all(): Piece[] {
    if (typeof window === "undefined") return seedPieces;
    if (window.localStorage.getItem(PIECES_KEY) === null) return seedPieces;
    return this.readExtras();
  },
  get(slug: string): Piece | undefined {
    return this.all().find((p) => p.slug === slug);
  },
  setAll(pieces: Piece[]) {
    write(PIECES_KEY, pieces);
    emit();
  },
  upsert(piece: Piece) {
    const list = this.all();
    const idx = list.findIndex((p) => p.slug === piece.slug);
    const next =
      idx >= 0 ? list.map((p, i) => (i === idx ? piece : p)) : [piece, ...list];
    write(PIECES_KEY, next);
    emit();
  },
  patch(slug: string, patch: Partial<Piece>) {
    const list = this.all();
    const idx = list.findIndex((p) => p.slug === slug);
    if (idx < 0) return;
    write(
      PIECES_KEY,
      list.map((p, i) => (i === idx ? ({ ...p, ...patch } as Piece) : p)),
    );
    emit();
  },
  remove(slug: string) {
    write(
      PIECES_KEY,
      this.all().filter((p) => p.slug !== slug),
    );
    emit();
  },
};

export const cart = {
  read(): CartItem[] {
    return read<CartItem[]>(CART_KEY, []);
  },
  write(items: CartItem[]) {
    write(CART_KEY, items);
    emit();
  },
};

export const orders = {
  read(): Order[] {
    return read<Order[]>(ORDERS_KEY, []);
  },
  add(order: Order) {
    write(ORDERS_KEY, [order, ...this.read()]);
    emit();
  },
};

export const auth = {
  read(): User | null {
    return read<User | null>(USER_KEY, null);
  },
  signIn(user: User) {
    write(USER_KEY, user);
    emit();
  },
  signOut() {
    window.localStorage.removeItem(USER_KEY);
    emit();
  },
};

export const admin = {
  unlock() {
    if (typeof window !== "undefined") window.sessionStorage.setItem(ADMIN_KEY, "1");
    emit();
  },
  locked() {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem(ADMIN_KEY) !== "1";
  },
};

export function subtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const pieceName = collection.get(item.slug);
    return pieceName ? sum + pieceName.price * item.qty : sum;
  }, 0);
}