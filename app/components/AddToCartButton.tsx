"use client";

import { useState } from "react";
import { useCart } from "@/app/components/CartProvider";

export default function AddToCartButton({ itemId }: { itemId: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(itemId, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-400 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
    >
      {added ? "დამატებულია" : "კალათაში"}
    </button>
  );
}
