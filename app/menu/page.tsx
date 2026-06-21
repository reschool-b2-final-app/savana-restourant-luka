import Link from "next/link";
import { menuItems } from "@/lib/data";
import AddToCartButton from "@/app/components/AddToCartButton";

export default function MenuPage() {
  return (
    <main className="min-h-screen app-main px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="p-8 card">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] accent">მენიუ</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight">სავანა რესტორნის საყვარელი კერძები</h1>
            </div>
            <Link href="/" className="inline-flex h-14 items-center justify-center rounded-full btn-ghost px-6 text-sm font-semibold transition">
              უკან მთავარი გვერდზე
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {menuItems.map((item) => (
              <article key={item.id} className="p-6 card transition hover:-translate-y-1">
                <Link href={`/menu/${item.id}`} className="block">
                  <div className="overflow-hidden rounded-3xl image-frame">
                    <img src={item.imageUrl} alt={item.name} className="h-48 w-full object-cover" />
                  </div>
                  <div className="mt-5">
                    <h2 className="text-2xl font-semibold transition hover:accent">{item.name}</h2>
                    <p className="mt-3 muted">{item.description}</p>
                  </div>
                </Link>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xl price">₾{item.price}</p>
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
