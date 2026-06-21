import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/components/CartProvider";
import { CartStatus } from "@/app/components/CartStatus";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
// 
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// Geist და Geist_Mono არის Google Fonts-ის ორი შრიფტი, რომლებიც გამოიყენება ამ აპლიკაციაში. ისინი არიან Next.js-ის მიერ შემოთავაზებული ფუნქციები, რომლებიც საშუალებას აძლევენ მარტივად ინტეგრირონ Google Fonts პროექტში. თითოეული შრიფტის კონფიგურაცია მოიცავს variable თვისებას, რომელიც განსაზღვრავს CSS ცვლადს შრიფტის გამოყენებისთვის, და subsets თვისებას, რომელიც მიუთითებს შრიფტის მხარდაჭერილ სიმბოლოების ნაკრებს. ეს შრიფტები გამოიყენება აპლიკაციის სტილში, რათა გაუმჯობესონ ვიზუალური იერსახე და მომხმარებლის გამოცდილება.
export const metadata: Metadata = {
  title: "სავანა რესტორანი",
  description: "სწრაფი და სტუმართმოყვარე ქართული და აფრიკული გემოებით გაჯერებული სასადილო გამოცდილება",
};
// metadata ობიექტი განსაზღვრავს ვებ გვერდის მეტა ინფორმაციას, რომელიც გამოიყენება SEO-სთვის და ბრაუზერის ტაბის დასათაურებლად. title არის გვერდის სათაური, რომელიც გამოჩნდება ბრაუზერის ტაბში და საძიებო სისტემების შედეგებში, ხოლო description არის გვერდის აღწერა, რომელიც ასევე შეიძლება გამოჩნდეს საძიებო სისტემების შედეგებში და ეხმარება მომხმარებლებს გაიგონ, რაზეა ეს გვერდი. ამ კონკრეტულ შემთხვევაში, metadata აღწერს "სავანა რესტორანს" და მის უნიკალურ გემოებს, რაც მიზნად ისახავს მომხმარებლების ყურადღების მიპყრობას და მათი ინტერესის გაღვივებას რესტორნის მიმართ.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ka"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <header className="app-header px-6 py-4 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-lg font-semibold site-title">
                  სავანა
                </Link>
                <Link href="/menu" className="text-sm font-medium nav-link">
                  მენიუ
                </Link>
              </div>
              <CartStatus />
            </div>
          </header>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
