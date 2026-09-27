/**
 * robots.txt 生成
 *
 * Next.js の Metadata API を使い、/robots.txt を自動生成する。
 * 全ページをクロール許可し、サイトマップの場所を明示する。
 */
import type { MetadataRoute } from "next";

const BASE_URL = "https://100selection-lp.madeinlocal.jp";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
