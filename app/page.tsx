import Link from "next/link";
import Image from "next/image";

const features = [
  {
    title: "თბილი და გემრიელი კერძები",
    description: "შერჩეული სიბრტყე ქართული და მსოფლიო გემოებისგან, განსაკუთრებულად შექმნილი შენთვის.",
  },
  {
    title: "სახეზე მზრუნველობა",
    description: "პრომთები სერვისი და კომფორტული სივრცე, რომელიც შენს საღამოს განსაკუთრებულს ხდის.",
  },
  {
    title: "სრული გემო",
    description: "მაგარია მენიუ, რომელიც აერთიანებს ცხარე, მჟავიან და ტკბილ ემოციებს ერთი ხელის ცემით.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),transparent_30%),#041014] text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <header className="mb-10 flex flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-zinc-950/80 px-6 py-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">სავანა რესტორანი</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">გემოები, რომლებიც გრძნობას აღვიძებენ.</h1>
          </div>
          <a
            href="/menu"
            className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-400 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
          >
            მენიუს ნახვა
          </a>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-center">
          <div className="space-y-7">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">დროა გემრიელობაზე საუბარი</p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">გააცოცხლე შენი დიალემა საქართველოში და აფრიკაში შთაგონებული ელემენტებით.</h2>
            <p className="max-w-2xl text-lg leading-8 text-zinc-300">
              ჩვენთან გელით უნიკალური ქართულ-ატლანტიკური კერძები, სულით სავსე სერვისი და სასიამოვნო ატმოსფერო, რომელიც აუცილებლად შეგიყვარდებათ.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/menu"
                className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-400 px-8 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
              >
                მენიუს ნახვა
              </a>
              <a
                href="#contact"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 text-sm font-semibold text-white transition hover:border-emerald-300 hover:bg-white/10"
              >
                დაჯავშნა
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <img
              src="/file.svg"
              alt="სავანა რესტორნის ატმოსფერო"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-lg shadow-black/15 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-zinc-900/90">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">{feature.title}</p>
              <p className="mt-4 text-base leading-7 text-zinc-300">{feature.description}</p>
            </article>
          ))}
        </section>

        <section id="contact" className="mt-16 rounded-[2.5rem] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/25 backdrop-blur-xl">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">დაჯავშნა</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">დაჯავშნე მაგიდა ახლა</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300">
                გეხმარებით მომზადებაში საუკეთესო დახვედრისთვის. დაგვირეკეთ ახლა ან მოგვწერეთ, ჩვენ შემოგთავაზებთ განსაკუთრებულ გამოცდილებას.
              </p>
            </div>
            <div className="rounded-3xl bg-emerald-500/10 p-6 text-emerald-100 ring-1 ring-emerald-400/10">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">კონტაქტი</p>
              <p className="mt-4 text-lg font-semibold">+995 555 55 55 55</p>
              <p className="mt-2 text-sm text-zinc-300">info@savana-restaurant.ge</p>
              <p className="mt-4 text-sm text-zinc-300">მისამართი: სავანა ქუჩა 7, თბილისი</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
