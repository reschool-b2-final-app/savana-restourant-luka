"use client";

import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";
// CartStatus კომპონენტი არის მარტივი და ეფექტური გზა, რომ მომხმარებლებს აჩვენოს კალათაში არსებული ნივთების რაოდენობა. ის იყენებს useCart კაკალს, რათა მიიღოს კალათის მონაცემები და გამოაჩინოს "კალათა" ტექსტი, რომელსაც მოჰყვება ნივთების რაოდენობა ფრჩხილებში, თუ კალათაში რამე არის. ეს კომპონენტი განთავსებულია აპლიკაციის header-ში, რაც უზრუნველყოფს მუდმივ და ადვილად შესამჩნევ წვდომას კალათის სტატუსზე მთელი ვებ აპლიკაციის განმავლობაში.
export function CartStatus() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition cart-status">
      კალათა{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
