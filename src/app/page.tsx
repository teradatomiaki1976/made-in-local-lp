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
import TeaserPhase from "@/components/shikumi/TeaserPhase";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activePage, setActivePage] = useState<"omoi" | "shikumi">("omoi");
  const [omoiPhase, setOmoiPhase] = useState<"loading" | "hero">("loading");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);

  // 【変更点】saveScroll, scrollPos の呼び出しを削除
  const { visited, markVisited } = usePageStore();
  const lenis = useLenis();

  const handleShowHeader = useCallback(() => {
    setIsHeaderVisible(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  // 1. ページ切り替えとトランジションの制御
  const handlePageChange = useCallback(
    (nextPage: "omoi" | "shikumi") => {
      if (activePage === nextPage || isTransitioning) return;

      if (lenis) lenis.stop();

      // STEP 1: トランジションの「幕」を下ろす
      setIsTransitioning(true);

      // STEP 2: 幕が下りきった裏側（200ms後）でページを切り替える
      setTimeout(() => {
        setActivePage(nextPage);

        // STEP 3: 強制的にページトップへ戻す
        requestAnimationFrame(() => {
          if (lenis) {
            lenis.scrollTo(0, { immediate: true, force: true });
            lenis.start();
          } else {
            window.scrollTo(0, 0);
          }

          if (!visited[nextPage]) markVisited(nextPage);

          // STEP 4: 幕を開ける
          setIsTransitioning(false);
        });
      }, 200);
    },
    [activePage, lenis, visited, markVisited, isTransitioning],
  );

  return (
    <main className="flex min-h-screen w-full flex-col bg-creem relative">
      <GlobalHeader
        isVisible={isHeaderVisible}
        activePage={activePage}
        onPageChange={handlePageChange}
      />

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-creem"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "w-full relative min-h-screen",
          activePage === "omoi" ? "block" : "hidden",
        )}
        aria-hidden={activePage !== "omoi"}
        {...({ inert: activePage !== "omoi" ? true : undefined } as any)}
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

      <div
        className={cn(
          "w-full relative min-h-screen",
          activePage === "shikumi" ? "block" : "hidden",
        )}
        aria-hidden={activePage !== "shikumi"}
        {...({ inert: activePage !== "shikumi" ? true : undefined } as any)}
      >
        <TeaserPhase />
      </div>

      {(activePage === "shikumi" || omoiPhase === "hero") && (
        <GlobalFooter activePage={activePage} onPageChange={handlePageChange} />
      )}
    </main>
  );
}
