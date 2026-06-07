"use client";

import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";

export function CartStatus() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-emerald-300 hover:bg-white/10"
    >
      კალათა{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
