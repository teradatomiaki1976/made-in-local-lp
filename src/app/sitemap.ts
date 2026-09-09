/**
 * サイトマップ生成
 *
 * Next.js の Metadata API を使い、ビルド時に /sitemap.xml を自動生成する。
 * 新しいページを追加した場合はここにルートを追記する。
 */
import type { MetadataRoute } from "next";

const BASE_URL = "https://100selection-lp.madeinlocal.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
