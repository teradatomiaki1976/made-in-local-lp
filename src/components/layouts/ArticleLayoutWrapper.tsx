// src/components/layouts/ArticleLayoutWrapper.tsx
"use client";

import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import GlobalHeader from "@/components/layouts/GlobalHeader";
import GlobalFooter from "@/components/layouts/GlobalFooter";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ArticleLayoutWrapperProps {
  children: ReactNode;
}

export default function ArticleLayoutWrapper({
  children,
}: ArticleLayoutWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  // 🌟 決定版：前ページのスクロールダウン慣性を stop() で完全に断ち切り、確実にトップ(0)から開始する
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";

    const forceTopAndClearMomentum = () => {
      // 1. まずLenisを止めて、前ページからの下向き慣性（Velocity）を完全に破棄する
      if (lenis) {
        lenis.stop();
      }

      // 2. ネイティブのスクロール位置を0に強制リセット
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 3. Lenisの高さを再計算し、座標0へ即座にセットしてから再開する
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.start();
      }
    };

    // 描画前に即時実行
    forceTopAndClearMomentum();

    // トラックパッドの慣性イベント（wheel）が遷移後数十ミリ秒遅れて届くケースも完全に吸収
    const rafId = requestAnimationFrame(forceTopAndClearMomentum);
    const timer1 = setTimeout(forceTopAndClearMomentum, 50);
    const timer2 = setTimeout(forceTopAndClearMomentum, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname, lenis]);

  // 記事ページ上でヘッダー/フッターのトグルが押された際の遷移制御
  const handlePageChange = (targetPage: "omoi" | "shikumi") => {
    if (targetPage === "shikumi") {
      router.push("/?tab=shikumi#section11");
    } else {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("shikumi_return_scroll");
      }
      router.push("/?tab=omoi");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-creem text-text relative">
      {/* 共通ヘッダー */}
      <GlobalHeader
        isVisible={true}
        activePage="shikumi"
        onPageChange={handlePageChange}
      />

      {/* 記事コンテンツ本体 */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 w-full pb-24"
      >
        {children}
      </motion.main>
      {/* 共通フッター */}
      <GlobalFooter activePage="shikumi" onPageChange={handlePageChange} />
    </div>
  );
}
