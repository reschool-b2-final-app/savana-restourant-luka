import Link from "next/link";
import { menuItems } from "@/lib/data";
import AddToCartButton from "@/app/components/AddToCartButton";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#041014] px-6 py-10 text-zinc-100">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">მენიუ</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight">სავანა რესტორნის საყვარელი კერძები</h1>
            </div>
            <Link
              href="/"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white/5 px-6 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
            >
              უკან მთავარი გვერდზე
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {menuItems.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.75rem] border border-white/10 bg-zinc-950/70 p-6 transition hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-zinc-900/90"
              >
                <Link href={`/menu/${item.id}`} className="block">
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                    <img src={item.imageUrl} alt={item.name} className="h-48 w-full object-cover" />
                  </div>
                  <div className="mt-5">
                    <h2 className="text-2xl font-semibold text-white transition hover:text-emerald-300">{item.name}</h2>
                    <p className="mt-3 text-zinc-300">{item.description}</p>
                  </div>
                </Link>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xl font-semibold text-emerald-300">₾{item.price}</p>
                  <AddToCartButton itemId={item.id} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
