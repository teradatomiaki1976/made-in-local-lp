// src/app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "地域を代表する企業100選 | Made In Local",
  description:
    "知らない企業から、記憶に残る企業へ。地域から本気で日本を変えたい。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSans.variable} ${notoSerif.variable} h-full antialiased`}
    >
      {/* 👈 text-zinc-900 を text-base-dark に変更し、トンマナを統一 */}
      <body className="min-h-full flex flex-col font-sans bg-white text-base-dark">
        {children}
      </body>
    </html>
  );
}
