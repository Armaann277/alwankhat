"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export function AddToCartButton({ slug }: { slug: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(slug);
        setAdded(true);
      }}
      className={`btn-pill w-full sm:w-auto ${
        added ? "border border-hairline bg-bg text-ink" : "btn-pill-primary"
      }`}
    >
      {added ? "Added to cart ✓" : "Add to cart"}
    </button>
  );
}
