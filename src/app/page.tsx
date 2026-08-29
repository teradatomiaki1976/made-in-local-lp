// src/app/page.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import LoadingPhase from "@/components/omoi/LoadingPhase";
import GlobalHeader from "@/components/layouts/GlobalHeader";
import ScrollProgress from "@/components/layouts/ScrollProgress";
import { usePageStore } from "@/store/usePageStore";
import HeroPhase from "@/components/omoi/HeroPhase";
import MapStoryWrapper from "@/components/omoi/MapStoryWrapper";
import StoryPhase from "@/components/omoi/StoryPhase";
import Phase5_6_BirthAndWhy from "@/components/omoi/Phase5_6_BirthAndWhy";
import Phase7_NewStandard from "@/components/omoi/Phase7_NewStandard";
import Phase8_Circulation from "@/components/omoi/Phase8_Circulation";
import Phase9_Finale from "@/components/omoi/Phase9_Finale";
import GlobalFooter from "@/components/layouts/GlobalFooter";
//shikumi
import TeaserPhase from "@/components/shikumi/TeaserPhase";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activePage, setActivePage] = useState<"omoi" | "shikumi">("omoi");
  const [omoiPhase, setOmoiPhase] = useState<"loading" | "hero">("loading");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  // Zustandからスクロール管理用の状態と関数を取得
  const { visited, scrollPos, markVisited, saveScroll } = usePageStore();
  const lenis = useLenis();

  const handleShowHeader = useCallback(() => {
    setIsHeaderVisible(true);
  }, []);

  // リロード時の強制スクロールジャンプを防止
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  // ページ切り替えとスクロール位置復元のロジック（Lenis対応版）
  const handlePageChange = useCallback(
    (nextPage: "omoi" | "shikumi") => {
      if (activePage === nextPage) return;

      // 1. 現在のページのスクロール位置を保存（Lenis非稼働時のフォールバックとしてwindow.scrollYも取得）
      const currentScrollY = lenis ? lenis.scroll : window.scrollY;
      saveScroll(activePage, currentScrollY);

      // 2. ページ表示を切り替え
      setActivePage(nextPage);

      // 3. スクロール位置の復元
      requestAnimationFrame(() => {
        if (!visited[nextPage]) {
          // 初回訪問：一番上へ
          if (lenis) {
            lenis.scrollTo(0, { immediate: true }); // immediate: true でアニメーションなしで瞬間移動
          } else {
            window.scrollTo(0, 0);
          }
          markVisited(nextPage);
        } else {
          // 2回目以降：保存した位置へ復元
          if (lenis) {
            lenis.scrollTo(scrollPos[nextPage], { immediate: true });
          } else {
            window.scrollTo(0, scrollPos[nextPage]);
          }
        }
      });
    },
    [activePage, saveScroll, visited, markVisited, scrollPos, lenis], // 💡 lenisを依存配列に追加
  );

  return (
    <main className="flex min-h-screen w-full flex-col">
      <GlobalHeader
        isVisible={isHeaderVisible}
        activePage={activePage}
        onPageChange={handlePageChange} // ← 拡張した関数を渡す
      />

      {/* --- 想いから感じる（右脳）ページ --- */}
      <div
        className={cn(
          "w-full relative min-h-screen",
          activePage === "omoi" ? "block" : "hidden",
        )}
        aria-hidden={activePage !== "omoi"}
        inert={activePage !== "omoi"}
      >
        <AnimatePresence mode="wait">
          {omoiPhase === "loading" && (
            <LoadingPhase
              key="loading"
              className="bg-midblue"
              onComplete={() => {
                window.scrollTo(0, 0);
                setOmoiPhase("hero");
              }}
            />
          )}

          {omoiPhase === "hero" && (
            <>
              <ScrollProgress />
              <motion.div
                key="hero-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full flex flex-col"
              >
                <HeroPhase onShowHeader={handleShowHeader} />
                <MapStoryWrapper />
                <StoryPhase />
                <Phase5_6_BirthAndWhy />
                <Phase7_NewStandard />
                <Phase8_Circulation />
                <Phase9_Finale />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* --- 仕組みから理解する（左脳）ページ --- */}
      <div
        className={cn("w-full", activePage === "shikumi" ? "block" : "hidden")}
        aria-hidden={activePage !== "shikumi"}
        inert={activePage !== "shikumi"}
      >
        <TeaserPhase />
      </div>
      {(activePage === "shikumi" || omoiPhase === "hero") && (
        <GlobalFooter activePage={activePage} onPageChange={handlePageChange} />
      )}
    </main>
  );
}
