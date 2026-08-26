// src/components/omoi/PrefectureHighlightPhase.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import JapanMapInteractive from "./JapanMapInteractive";
import { REGIONS } from "@/lib/regions";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function PrefectureHighlightPhase({ scrollYProgress }: Props) {
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);
  const [activePrefIndex, setActivePrefIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const pointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.5 ? "auto" : "none",
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.52, 0.58, 0.65, 0.68],
    [0, 1, 1, 0],
  );
  const titleY = useTransform(scrollYProgress, [0.52, 0.58], [20, 0]);
  const uiOpacity = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.65 && !isAutoPlaying) setIsAutoPlaying(true);
      else if (latest < 0.65 && isAutoPlaying) {
        setIsAutoPlaying(false);
        setActivePrefIndex(0);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isAutoPlaying]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      // 調整は以下の setInterval を丸ごとコメントアウトする
      timer = setInterval(() => {
        setActivePrefIndex((prev) => {
          const currentRegion = REGIONS[activeRegionIndex];
          if (prev + 1 < currentRegion.prefectures.length) return prev + 1;
          setActiveRegionIndex((rPrev) => (rPrev + 1) % REGIONS.length);
          return 0;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeRegionIndex]);

  const currentRegion = REGIONS[activeRegionIndex];
  const currentPrefecture = currentRegion.prefectures[activePrefIndex];

  return (
    <motion.div
      style={{ pointerEvents: pointerEvents as any }}
      className="absolute inset-0 w-full h-full z-20 overflow-hidden flex flex-col items-center justify-center"
    >
      <motion.div
        style={{ opacity: titleOpacity, y: titleY }}
        className="absolute z-30"
      >
        <h2 className="text-3xl md:text-6xl font-serif font-bold text-white tracking-widest drop-shadow-lg">
          都道府県別企業数
        </h2>
      </motion.div>
      <motion.div
        style={{ opacity: uiOpacity }}
        className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-center pt-16 md:pt-0"
      >
        <div className="absolute inset-0 w-full h-full opacity-90 z-10 flex items-center justify-center pointer-events-none px-4 md:px-12">
          <JapanMapInteractive
            activePrefId={currentPrefecture.prefId}
            activeRegionId={currentRegion.id}
          />
        </div>

        <div className="absolute bottom-20 md:bottom-auto flex flex-col items-center justify-end md:justify-center w-full z-30 pointer-events-auto px-4">
          <div className="flex flex-col items-center justify-center w-64 md:w-90 aspect-square rounded-full border border-white/40 text-white bg-white/5 backdrop-blur-md shadow-2xl">
            <span className="text-lg md:text-xl font-serif">
              &lt;{currentRegion.name}&gt;
            </span>
            <span className="w-auto text-4xl md:text-6xl font-serif font-bold my-3 md:my-4 border-b border-white/60 pb-3 md:pb-4">
              {currentPrefecture.name}
            </span>
            <span className="text-5xl md:text-7xl font-serif">
              {currentPrefecture.count}
              <span className="text-2xl md:text-3xl ml-1">社</span>
            </span>
          </div>

          <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-md md:max-w-xl">
            {REGIONS.map((region, idx) => (
              <button
                key={region.id}
                onClick={() => {
                  setActiveRegionIndex(idx);
                  setActivePrefIndex(0);
                }}
                className={`px-4 py-2 md:px-6 md:py-2 text-sm md:text-base rounded-md font-bold transition-all duration-300 cursor-pointer ${
                  activeRegionIndex === idx
                    ? "bg-white text-midblue shadow-lg transform scale-105"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
