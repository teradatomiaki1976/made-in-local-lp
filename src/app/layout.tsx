// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, Libre_Bodoni } from "next/font/google";
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

const libreBodoni = Libre_Bodoni({
  variable: "--font-libre-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  // Why: metadataBase を設定することで OG画像等の相対パスが自動で絶対URLに解決される
  metadataBase: new URL("https://100selection-lp.madeinlocal.jp"),
  title: "【公式】地域を代表する企業100選とは？",
  description:
    "「地域を代表する企業100選」は、地域の企業が持つ知られるべき魅力と未来への意志を見つめ、その価値を社会に届けるブランド認証制度です。各地域で選ばれるのは100社だけ。選出の仕組みから、認定制度が目指す地域の未来、地方創生への想いまでをご紹介します。",
  icons: {
    icon: "/images/favicon/favicon.ico",
    shortcut: "/images/favicon/favicon-16x16.png",
    apple: "/images/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title: "【公式】地域を代表する企業100選とは？",
    description:
      "「地域を代表する企業100選」は、地域の企業が持つ知られるべき魅力と未来への意志を見つめ、その価値を社会に届けるブランド認証制度です。各地域で選ばれるのは100社だけ。選出の仕組みから、認定制度が目指す地域の未来、地方創生への想いまでをご紹介します。",
    url: "https://100selection-lp.madeinlocal.jp",
    siteName: "地域を代表する企業100選 公式サイト",
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
    title: "【公式】地域を代表する企業100選とは？",
    description:
      "「地域を代表する企業100選」は、地域の企業が持つ知られるべき魅力と未来への意志を見つめ、その価値を社会に届けるブランド認証制度です。各地域で選ばれるのは100社だけ。選出の仕組みから、認定制度が目指す地域の未来、地方創生への想いまでをご紹介します。",
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
      className={`${notoSans.variable} ${notoSerif.variable} ${libreBodoni.variable} antialiased`}
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
      {/* Microsoft Clarity（ヒートマップ・セッション録画） */}
      <Script id="clarity-init" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yfmfbho5rr");
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
                  name: "地域を代表する企業100選 公式サイト",
                  url: "https://100selection-lp.madeinlocal.jp",
                  description:
                    "「地域を代表する企業100選」は、地域の企業が持つ知られるべき魅力と未来への意志を見つめ、その価値を社会に届けるブランド認証制度です。各地域で選ばれるのは100社だけ。選出の仕組みから、認定制度が目指す地域の未来、地方創生への想いまでをご紹介します。",
                  inLanguage: "ja",
                  publisher: { "@id": "#organization" },
                },
                {
                  "@type": "Organization",
                  "@id": "#organization",
                  name: "Made In Local",
                  url: "https://madeinlocal.jp/",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://madeinlocal.jp/images/logo.svg",
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
