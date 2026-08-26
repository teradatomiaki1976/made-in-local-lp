// src/components/omoi/Phase7_NewStandard.tsx
"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// 24枚程度の異なる画像パスを用意
const DUMMY_IMAGES = Array.from({ length: 24 }).map(
  (_, i) => `/images/photo/scene${(i % 5) + 1}.webp`,
);

export default function Phase7_NewStandard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ==========================================
  // 1. 背景色とグリッド線の色をクロスフェード（0.3 〜 0.4 で暗→明）
  // ==========================================
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.3, 0.4, 1],
    ["#003064", "#fefbf1", "#fefbf1"],
  );

  const gridBorderColor = useTransform(
    scrollYProgress,
    [0.3, 0.4, 1],
    ["rgba(255,255,255,0.15)", "rgba(0,48,100,0.1)", "rgba(0,48,100,0.1)"],
  );

  // ==========================================
  // 2. 中央のロゴとテキストのクロスフェード
  // ==========================================
  // 前半（ダークブルー背景時）: 白ロゴ ＋ 「地域の新しい旗印」
  const darkPhaseOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.35, 1],
    [1, 0, 0],
  );

  // 後半（クリーム背景時）: カラーロゴ ＋ 「未来の旗印」
  const lightPhaseOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 1],
    [0, 1, 1],
  );

  // ==========================================
  // 3. 写真のランダム出現 ＆ 最終的な透明度の引き下げ
  // ==========================================

  const op0 = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.8, 1],
    [0, 0.2, 0.15, 0.06],
  );
  const op1 = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.8, 1],
    [0, 0.2, 0.15, 0.06],
  );
  const op2 = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.8, 1],
    [0, 0.2, 0.15, 0.06],
  );
  const op3 = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.8, 1],
    [0, 0.2, 0.15, 0.06],
  );
  const op4 = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.8, 1],
    [0, 0.2, 0.15, 0.06],
  );
  const op5 = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.8, 1],
    [0, 0.2, 0.15, 0.06],
  );

  // 配列にまとめる
  const opacities = [op0, op1, op2, op3, op4, op5];

  const getGroupOpacity = (index: number) => {
    const group = (index * 13) % 6;
    return opacities[group];
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor, willChange: "background-color" }}
      className="relative w-full h-[400vh]"
    >
      <div className="sticky top-0 left-0 w-full h-svh overflow-hidden flex items-center justify-center">
        {/* --- 背景のグリッド（地方企業の棚） --- */}
        <div className="absolute inset-0 w-full h-full grid grid-cols-4 md:grid-cols-6 grid-rows-6 md:grid-rows-4">
          {DUMMY_IMAGES.map((src, idx) => (
            <motion.div
              key={`grid-cell-${idx}`}
              style={{ borderColor: gridBorderColor }}
              className="relative w-full h-full border-r border-b box-border overflow-hidden"
            >
              <motion.img
                src={src}
                alt=""
                style={{
                  opacity: getGroupOpacity(idx),
                  willChange: "opacity",
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* --- 中央のコンテンツエリア（ロゴとテキスト） --- */}
        <div className="w-screen relative z-10 flex items-center justify-center pointer-events-none">
          {/* 前半（暗い背景）用コンテンツ */}
          <motion.div
            style={{ opacity: darkPhaseOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          >
            <div className="w-48 md:w-64">
              <img
                src="/images/logo/emblem_white.svg"
                alt=""
                className="w-full h-auto drop-shadow-md"
              />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-widest text-white drop-shadow-lg">
              「地域の新しい旗印」
            </h2>
          </motion.div>

          {/* 後半（明るい背景）用コンテンツ */}
          <motion.div
            style={{ opacity: lightPhaseOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          >
            <div className="w-48 md:w-64">
              <img
                src="/images/logo/emblem_dark.svg"
                alt=""
                className="w-full h-auto drop-shadow-xl"
              />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-widest text-midblue">
              「未来の旗印」
            </h2>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
