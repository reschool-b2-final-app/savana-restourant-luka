import Link from "next/link";
import { menuItems } from "@/lib/data";
import AddToCartButton from "@/app/components/AddToCartButton";

export default function MenuItemPage({ params }: { params: { id: string } }) {
  const item = menuItems.find((menuItem) => String(menuItem.id) === params.id);

  if (!item) {
    return (
      <main className="min-h-screen bg-[#041014] px-6 py-10 text-zinc-100">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
          <h1 className="text-3xl font-semibold">ვერ მოიძებნა კერძი</h1>
          <p className="mt-4 text-zinc-300">გთხოვთ დაბრუნდეთ მენიუში და აირჩიეთ სხვა გემრიელი კერძი.</p>
          <Link
            href="/menu"
            className="mt-8 inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
          >
            დაბრუნება მენიუში
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#041014] px-6 py-10 text-zinc-100">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2.5rem] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
          <Link
            href="/menu"
            className="inline-flex rounded-full bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
          >
            ← ისევ მენიუში
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">კერძის აღწერა</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight">{item.name}</h1>
              <p className="mt-5 text-lg leading-8 text-zinc-300">{item.description}</p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-3xl font-semibold text-emerald-300">₾{item.price}</p>
                <AddToCartButton itemId={item.id} />
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full rounded-[1.75rem] object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
