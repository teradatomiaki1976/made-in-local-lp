// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import ScrollObserver from "@/components/layouts/ScrollObserver";
import SmoothScroll from "@/components/layouts/SmoothScroll";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "地域を代表する企業100選 | Made In Local",
  description:
    "知らない企業から、記憶に残る企業へ。地域から本気で日本を変えたい。",
  icons: {
    icon: "/images/favicon/favicon.ico",
    shortcut: "/images/favicon/favicon-16x16.png",
    apple: "/images/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title: "地域を代表する企業100選 | Made In Local",
    description:
      "知らない企業から、記憶に残る企業へ。地域から本気で日本を変えたい。",
    url: "",
    siteName: "Made In Local",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "地域を代表する企業100選メインビジュアル",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "地域を代表する企業100選 | Made In Local",
    description:
      "知らない企業から、記憶に残る企業へ。地域から本気で日本を変えたい。",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSans.variable} ${notoSerif.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-midblue text-text">
        <SmoothScroll>
          <ScrollObserver />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
