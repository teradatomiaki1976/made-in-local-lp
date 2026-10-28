// src/components/layouts/ArticleLayoutWrapper.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import GlobalHeader from "@/components/layouts/GlobalHeader";
import GlobalFooter from "@/components/layouts/GlobalFooter";

interface ArticleLayoutWrapperProps {
  children: ReactNode;
}

export default function ArticleLayoutWrapper({
  children,
}: ArticleLayoutWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
    }
  }, [pathname]);

  // 記事ページ上でヘッダー/フッターのトグルが押された際の遷移制御
  const handlePageChange = (targetPage: "omoi" | "shikumi") => {
    if (targetPage === "shikumi") {
      // 「仕組み」を押した時は、保存されているSection11のスクロール位置（なければ#section11）へ戻す
      router.push("/?tab=shikumi#section11");
    } else {
      // 「想い」を押した時は、戻りスクロール位置をクリアして「想い」タブを直接開く
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("shikumi_return_scroll");
      }
      router.push("/?tab=omoi");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-creem text-text relative">
      {/* 共通ヘッダー（記事ページは「仕組み」の派生コンテンツのため activePage="shikumi" とする） */}
      <GlobalHeader
        isVisible={true}
        activePage="shikumi"
        onPageChange={handlePageChange}
      />

      {/* 記事コンテンツ本体 */}
      <main className="flex-1 w-full pb-24">{children}</main>

      {/* 共通フッター */}
      <GlobalFooter activePage="shikumi" onPageChange={handlePageChange} />
    </div>
  );
}
