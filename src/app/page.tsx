// src/app/page.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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

import ShikumiPageWrapper from "@/components/shikumi/ShikumiPageWrapper";

import { cn } from "@/lib/utils";

export default function Home() {
  // 変更: 初期ページを "shikumi" に設定
  const [activePage, setActivePage] = useState<"omoi" | "shikumi">("shikumi");

  // ★変更: 裏側で勝手にローディングが走らないよう、初期値を "standby" にする
  const [omoiPhase, setOmoiPhase] = useState<"standby" | "loading" | "hero">(
    "standby",
  );

  // 変更: 初期ページ(shikumi)ではヘッダーを即時表示させるため true を初期値にする
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const { visited, markVisited } = usePageStore();
  const lenis = useLenis();

  const scrollPosRef = useRef({ omoi: 0, shikumi: 0 });

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

      // STEP 1: 幕を下ろす前に「現在のスクロール位置」を保存する
      scrollPosRef.current[activePage] = window.scrollY;
      setIsTransitioning(true);

      // 初回omoi遷移かどうかを判定（まだ一度もローディングしていない状態）
      const isFirstOmoi = nextPage === "omoi" && omoiPhase === "standby";

      // 初回omoi遷移時は、幕が下りるタイミングでヘッダーも隠す
      if (isFirstOmoi) {
        setIsHeaderVisible(false);
      }

      // STEP 2: 幕が下りきった裏側（200ms後）でページを切り替える
      setTimeout(() => {
        // ★ リスクヘッジ1: 幕が下りきって DOM が block になる瞬間に loading をセットし、
        // 最初の200ms分のアニメーションが裏側で消費されるのを防ぐ
        if (isFirstOmoi) {
          setOmoiPhase("loading");
        } else {
          setIsHeaderVisible(true);
        }

        setActivePage(nextPage);

        // STEP 3: 保存していた位置へスクロールを復元する
        requestAnimationFrame(() => {
          const targetScroll = scrollPosRef.current[nextPage] || 0;

          if (lenis) {
            lenis.scrollTo(targetScroll, { immediate: true, force: true });

            // ★ リスクヘッジ2: 初回omoi遷移時は LoadingPhase 〜 HeroPhase(3秒ロック) が続くため、
            // ここでは lenis.start() を呼ばず、HeroPhase 側のロック解除に委ねる
            if (!isFirstOmoi) {
              lenis.start();
            }
          } else {
            window.scrollTo(0, targetScroll);
          }

          if (!visited[nextPage]) markVisited(nextPage);

          // STEP 4: 幕を開ける
          setIsTransitioning(false);
        });
      }, 200);
    },
    [activePage, omoiPhase, lenis, visited, markVisited, isTransitioning],
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
            className="fixed inset-0 z-60 bg-creem"
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

      <AnimatePresence mode="wait">
        {activePage === "shikumi" && <ShikumiPageWrapper key="shikumi-page" />}
      </AnimatePresence>

      {(activePage === "shikumi" || omoiPhase === "hero") && (
        <GlobalFooter activePage={activePage} onPageChange={handlePageChange} />
      )}
    </main>
  );
}
