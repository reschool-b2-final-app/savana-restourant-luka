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

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "სავანა რესტორანი",
  description: "სწრაფი და სტუმართმოყვარე ქართული და აფრიკული გემოებით გაჯერებული სასადილო გამოცდილება",
};

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
          <header className="border-b border-white/10 bg-zinc-950/90 px-6 py-4 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-lg font-semibold text-white">
                  სავანა
                </Link>
                <Link href="/menu" className="text-sm font-medium text-zinc-300 transition hover:text-white">
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
