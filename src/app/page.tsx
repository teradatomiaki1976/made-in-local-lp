// src/app/page.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingPhase from "@/components/omoi/LoadingPhase";
import HeroPhase from "@/components/omoi/HeroPhase";
import MessagePhase from "@/components/omoi/MessagePhase";
import GlobalHeader from "@/components/layouts/GlobalHeader";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activePage, setActivePage] = useState<"omoi" | "shikumi">("omoi");
  const [omoiPhase, setOmoiPhase] = useState<"loading" | "hero">("loading");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const handleShowHeader = useCallback(() => {
    setIsHeaderVisible(true);
  }, []);

  // 💡 先回りリスクヘッジ：リロード時の強制スクロールジャンプを防止
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
              className="bg-base-midblue"
              onComplete={() => {
                window.scrollTo(0, 0);
                setOmoiPhase("hero");
              }}
            />
          )}

          {omoiPhase === "hero" && (
            // 👇 修正ポイント：FVとセクション2をひとつのラッパーで包む
            <motion.div
              key="hero-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full flex flex-col"
            >
              {/* FVセクション (100vh) */}
              <HeroPhase onShowHeader={handleShowHeader} />

              {/* FVからスクロールで繋がるセクション2 (500vh) */}
              {/* <MapTransitionPhase /> */}
              <MessagePhase />
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
          <h1 className="font-sans text-4xl font-bold">
            仕組みから理解するページ
          </h1>
        </section>
      </div>
    </main>
  );
}
