// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import Script from "next/script";
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
  // Why: metadataBase を設定することで OG画像等の相対パスが自動で絶対URLに解決される
  metadataBase: new URL("https://100selection-lp.madeinlocal.jp"),
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
    url: "https://100selection-lp.madeinlocal.jp",
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
    canonical: "https://100selection-lp.madeinlocal.jp",
  },
  // Google Search Console 所有権確認用
  verification: {
    google: "QMnkW1azNfV0nrBvGuSKPWEhpzy5WYnqUua4XntUlEM",
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
      {/* Google Analytics (GA4) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TMFN0X1T67"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TMFN0X1T67');
        `}
      </Script>
      <body className="min-h-screen flex flex-col font-sans bg-midblue text-text">
        {/* 構造化データ (JSON-LD): Google検索でのリッチリザルト表示に有効 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "地域を代表する企業100選 | Made In Local",
                  url: "https://100selection-lp.madeinlocal.jp",
                  description:
                    "知らない企業から、記憶に残る企業へ。地域から本気で日本を変えたい。",
                  inLanguage: "ja",
                  publisher: { "@id": "#organization" },
                },
                {
                  "@type": "Organization",
                  "@id": "#organization",
                  name: "Made In Local",
                  url: "https://100selection-lp.madeinlocal.jp",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://100selection-lp.madeinlocal.jp/images/logo/emblem.png",
                  },
                },
              ],
            }),
          }}
        />
        <SmoothScroll>
          <ScrollObserver />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
