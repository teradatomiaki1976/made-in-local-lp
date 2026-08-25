// src/app/page.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingPhase from "@/components/omoi/LoadingPhase";
import GlobalHeader from "@/components/layouts/GlobalHeader";
import HeroPhase from "@/components/omoi/HeroPhase";
import MapStoryWrapper from "@/components/omoi/MapStoryWrapper";
import StoryPhase from "@/components/omoi/StoryPhase";
import Phase5_BirthOf100 from "@/components/omoi/Phase5_BirthOf100";
import Phase6_Why100 from "@/components/omoi/Phase6_Why100";
import Phase7_NewStandard from "@/components/omoi/Phase7_NewStandard";
import Phase8_Circulation from "@/components/omoi/Phase8_Circulation";
import Phase9_Finale from "@/components/omoi/Phase9_Finale";
import GlobalFooter from "@/components/layouts/GlobalFooter";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activePage, setActivePage] = useState<"omoi" | "shikumi">("omoi");
  const [omoiPhase, setOmoiPhase] = useState<"loading" | "hero">("loading");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const handleShowHeader = useCallback(() => {
    setIsHeaderVisible(true);
  }, []);

  // リロード時の強制スクロールジャンプを防止
  useEffect(() => {
    if (typeof window !== "undefined") {
      // ブラウザが勝手に前回のスクロール位置へ戻るのを防ぐ
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col">
      <GlobalHeader
        isVisible={isHeaderVisible}
        activePage={activePage}
        onPageChange={setActivePage}
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
            // FVとセクション2をひとつのラッパーで包む
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
              <Phase5_BirthOf100 />
              <Phase6_Why100 />
              <Phase7_NewStandard />
              <Phase8_Circulation />
              <Phase9_Finale />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- 仕組みから理解する（左脳）ページ --- */}
      <div
        className={cn("w-full", activePage === "shikumi" ? "block" : "hidden")}
        aria-hidden={activePage !== "shikumi"}
        inert={activePage !== "shikumi"}
      >
        <section className="min-h-screen flex items-center justify-center">
          <h1 className="font-sans text-xl md:text-4xl font-bold">
            仕組みから理解するページ
          </h1>
        </section>
      </div>
      <GlobalFooter />
    </main>
  );
}
