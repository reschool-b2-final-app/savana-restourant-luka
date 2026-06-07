"use client";

import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";

export default function CartPage() {
  const { itemsWithDetails, total, count, updateItem, removeItem, clearCart } = useCart();

  return (
    <main className="min-h-screen bg-[#041014] px-6 py-10 text-zinc-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">ონლაინ შეკვეთა</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight">თქვენი კალათა</h1>
            </div>
            <Link
              href="/menu"
              className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-400 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
            >
              გავაგრძელო შერჩევა
            </Link>
          </div>

          {count === 0 ? (
            <div className="mt-12 rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-zinc-300">
              <p className="text-lg font-medium">თქვენი კალათა ჯერ ცარიელია.</p>
              <p className="mt-3">შეარჩიეთ თქვენი საყვარელი კერძები მენიუდან.</p>
            </div>
          ) : (
            <div className="mt-10 space-y-6">
              {itemsWithDetails.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-zinc-950/70 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                      <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:items-end">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                      <button
                        type="button"
                        onClick={() => updateItem(item.id, item.quantity - 1)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-zinc-100 transition hover:bg-white/20"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-base font-semibold text-white">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-zinc-100 transition hover:bg-white/20"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-semibold text-emerald-300">₾{(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-semibold uppercase text-rose-400 transition hover:text-rose-200"
                      >
                        წაშლა
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white shadow-lg shadow-black/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">თანხა</p>
                    <p className="mt-2 text-3xl font-semibold">₾{total.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-semibold text-zinc-100 transition hover:bg-white/10"
                    >
                      კალათის გასუფთავება
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("თქვენი შეკვეთაა მიღებული! შემდგომ ჩვენ შევუკვეთავთ განთლობას.")}
                      className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-400 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
                    >
                      შეკვეთის დადასტურება
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
