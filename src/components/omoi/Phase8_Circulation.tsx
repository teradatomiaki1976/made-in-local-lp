// src/components/omoi/Phase8_Circulation.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Phase8_Circulation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. スクロール領域全体の監視（4画面分の高さ）
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ==========================================
  // テキストのクロスフェード＆Y軸移動制御
  // ==========================================
  // 区間1: 0.00 - 0.25
  const text1Opacity = useTransform(
    scrollYProgress,
    [0.0, 0.1, 0.2, 0.25],
    [0, 1, 1, 0],
  );
  const text1Y = useTransform(
    scrollYProgress,
    [0.0, 0.1, 0.2, 0.25],
    [20, 0, 0, -20],
  );

  // 区間2: 0.25 - 0.50
  const text2Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.45, 0.5],
    [0, 1, 1, 0],
  );
  const text2Y = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.45, 0.5],
    [20, 0, 0, -20],
  );

  // 区間3: 0.50 - 0.75
  const text3Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7, 0.75],
    [0, 1, 1, 0],
  );
  const text3Y = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7, 0.75],
    [20, 0, 0, -20],
  );

  // 区間4: 0.75 - 1.00 (最後は残す)
  const text4Opacity = useTransform(
    scrollYProgress,
    [0.75, 0.85, 1.0],
    [0, 1, 1],
  );
  const text4Y = useTransform(scrollYProgress, [0.75, 0.85, 1.0], [20, 0, 0]);

  // ==========================================
  // 画像のクロスフェード制御（オパシティ・リレー方式）
  // ==========================================
  // 画像1は常に最下層で不透明度1（ベースとして固定）

  // 💡 修正点: 配列の最後に `1.0`（スクロール終端）を追加し、Opacity `1` を明示的に維持させる
  const img2Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.35, 1.0],
    [0, 1, 1],
  );
  const img3Opacity = useTransform(scrollYProgress, [0.4, 0.6, 1.0], [0, 1, 1]);
  const img4Opacity = useTransform(
    scrollYProgress,
    [0.65, 0.85, 1.0],
    [0, 1, 1],
  );

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-creem">
      {/* 画面に固定（sticky）されるコンテナ */}
      <div className="sticky top-0 left-0 w-full h-svh flex flex-col overflow-hidden">
        {/* --- 上部：テキストエリア (高さ約40%) --- */}
        <div className="relative w-full flex-[0.4] flex items-end justify-center bg-creem pb-6 md:pb-12 px-6 z-20">
          <motion.div
            style={{ opacity: text1Opacity, y: text1Y }}
            className="absolute text-center w-full"
          >
            <h2 className="mb-12 text-3xl md:text-4xl lg:text-6xl font-bold tracking-normal text-midblue leading-relaxed">
              一社の光が、
              <br className="block md:hidden" />
              地域を照らす。
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: text2Opacity, y: text2Y }}
            className="absolute text-center w-full"
          >
            <h2 className="mb-12 text-3xl md:text-4xl lg:text-6xl font-bold tracking-normal text-midblue leading-relaxed">
              地域の光が、
              <br className="block md:hidden" />
              日本を照らす。
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: text3Opacity, y: text3Y }}
            className="absolute text-center w-full"
          >
            <h2 className="mb-12 text-2xl md:text-4xl lg:text-5xl font-bold tracking-normal text-midblue leading-normal">
              一社一社の力は微力でも、
              <br />
              私たち全員で立ち向かえば
              <br className="block md:hidden" />
              挑戦できる。
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: text4Opacity, y: text4Y }}
            className="absolute text-center w-full"
          >
            <h2 className="flex flex-col gap-4 md:gap-6 text-4xl md:text-6xl font-bold tracking-normal text-midblue leading-tight">
              <span className="block text-base md:text-3xl leading-normal text-midblue">
                私たちが次世代に紡いでいく日本は
                <br />
                衰退していく日本ではなく
              </span>
              <span className="text-olive block md:inline">
                地域から輝く
                <br className="block md:hidden" />
                世界に誇れる日本
              </span>
              <span className="text-base md:text-5xl">である。</span>
            </h2>
          </motion.div>
        </div>

        {/* --- 下部：画像エリア (高さ約60%) --- */}
        <div className="relative w-full flex-[0.6] bg-midblue overflow-hidden z-10">
          {/* 画像1 (ベース) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/section8/map-1.jpg"
              alt="一社の光"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* 画像2 */}
          <motion.div
            style={{ opacity: img2Opacity, willChange: "opacity" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/section8/map-2.jpg"
              alt="地域の光"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          {/* 画像3 */}
          <motion.div
            style={{ opacity: img3Opacity, willChange: "opacity" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/section8/map-3.jpg"
              alt="つながる光"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          {/* 画像4 */}
          <motion.div
            style={{ opacity: img4Opacity, willChange: "opacity" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/section8/map-4.jpg"
              alt="輝く日本"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
