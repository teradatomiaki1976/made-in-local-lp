// src/components/omoi/PrefectureHighlightPhase.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import JapanMapInteractive from "./JapanMapInteractive";
import { REGIONS } from "@/lib/regions";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M4 4l12 6-12 6z" />
  </svg>
);
const PauseIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
  </svg>
);

export default function PrefectureHighlightPhase({ scrollYProgress }: Props) {
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);
  const [activePrefIndex, setActivePrefIndex] = useState(0);
  const [isAutoPlayTriggered, setIsAutoPlayTriggered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const savedCallback = useRef<(() => void) | null>(null);

  const pointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.5 ? "auto" : "none",
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.54, 0.65, 0.7],
    [0, 1, 1, 0],
  );
  const titleY = useTransform(scrollYProgress, [0.5, 0.58], [40, 0]);
  const uiOpacity = useTransform(scrollYProgress, [0.62, 0.7], [0, 1]);

  // 1. スクロール位置による自動再生のトリガー
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.6 && !isAutoPlayTriggered) {
        setIsAutoPlayTriggered(true);
        setIsPlaying(true); // エリアに入ったら再生開始
      } else if (latest < 0.6 && isAutoPlayTriggered) {
        setIsAutoPlayTriggered(false);
        setIsPlaying(false); // エリア外に出たら停止
        setActivePrefIndex(0);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isAutoPlayTriggered]);

  // 2. タイマー処理
  useEffect(() => {
    if (!isAutoPlayTriggered || !isPlaying) return;

    // 最新のコールバックを実行する関数
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, 2500);
    return () => clearInterval(id); // クリーンアップ
  }, [isAutoPlayTriggered, isPlaying]);

  // 3. 手動でタブを切り替えた時のハンドラー
  const handleManualRegionChange = useCallback((idx: number) => {
    setActiveRegionIndex(idx);
    setActivePrefIndex(0);
    setIsPlaying(false);
  }, []);

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
        <h2 className="text-3xl md:text-6xl font-bold text-white tracking-widest drop-shadow-lg">
          都道府県別企業数
        </h2>
        <p className="text-center mt-8 text-white font-sans tracking-wider">
          【2026年7月現在】
        </p>
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
            <span className="w-3/4 text-center text-4xl md:text-6xl text-white font-bold my-3 md:my-4 border-b border-white/60 pb-3 md:pb-4">
              {currentPrefecture.name}
            </span>
            <span className="text-4xl md:text-6xl text-yellow">
              {currentPrefecture.count.toLocaleString()}
              <span className="text-xl md:text-2xl ml-1 text-white">社</span>
            </span>
          </div>

          <div className="mt-6 md:mt-8 flex flex-col items-center justify-center gap-4 md:gap-6 max-w-md md:max-w-full">
            {/* 地方タブ */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-md md:max-w-full">
              {REGIONS.map((region, idx) => (
                <button
                  key={region.id}
                  onClick={() => handleManualRegionChange(idx)}
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

            {/* 再生・停止コントロールボタン */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="font-sans flex items-center gap-2 px-6 py-2 rounded-full border border-white/30 bg-midblue/60 text-white/80 hover:bg-midblue hover:text-white transition-colors text-sm backdrop-blur-sm"
            >
              {isPlaying ? (
                <>
                  <PauseIcon /> <span>自動再生を停止</span>
                </>
              ) : (
                <>
                  <PlayIcon /> <span>自動再生を開始</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
