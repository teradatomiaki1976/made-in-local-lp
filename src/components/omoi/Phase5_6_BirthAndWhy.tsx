// src/components/omoi/Phase5_6_BirthAndWhy.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Phase5_6_BirthAndWhy() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 400vhの領域で一つのタイムラインを形成
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- タイムライン設計 ---
  // Phase5（誕生）のテキストとエンブレム
  const phase5Opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2, 0.3],
    [0, 1, 1, 0],
  );
  const phase5Scale = useTransform(scrollYProgress, [0.25, 0.35], [1, 0.9]);

  // 背景「100」のパララックス
  const bgScale = useTransform(scrollYProgress, [0.2, 1], [0.4, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 0.08]);

  // Phase6（テキスト1: 埋もれないために）
  const text1Opacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.6, 0.7],
    [0, 1, 1, 0],
  );
  const text1Y = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.6, 0.7],
    [30, 0, 0, -30],
  );

  // Phase6（テキスト2: 上限があるからこそ）
  const text2Opacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
  const text2Y = useTransform(scrollYProgress, [0.7, 0.8, 1], [30, 0, 0]);

  return (
    <section ref={containerRef} className="relative w-full bg-creem h-[400vh]">
      <div className="sticky top-0 left-0 w-full h-svh overflow-hidden flex flex-col items-center justify-center">
        {/* 背景の巨大な「100」 */}
        <motion.div
          style={{
            scale: bgScale,
            opacity: bgOpacity,
            willChange: "transform, opacity",
          }}
          className="absolute inset-0 flex items-center justify-center text-midblue select-none pointer-events-none"
        >
          <span className="text-[60vw] md:text-[45vw] leading-none tracking-tighter font-bold">
            100
          </span>
        </motion.div>

        {/* Phase5コンテンツ */}
        <motion.div
          style={{ opacity: phase5Opacity, scale: phase5Scale }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 px-6 z-20"
        >
          <img
            src="/images/logo/emblem_dark.svg"
            alt="地域を代表する企業100選"
            className="w-70 md:w-90 drop-shadow-2xl max-md:mb-2 md:mr-16"
          />
          <div className="flex flex-col items-center max-md:border-t md:border-l border-midblue/30  max-md:pt-8 md:pl-16 md:py-8">
            <h2 className="text-3xl md:text-5xl font-bold text-olive mb-6">
              <span className="text-midblue block text-lg md:text-2xl mb-2">
                そこで、
              </span>
              地域を代表する企業100選
              <span className="text-midblue block mt-2">を創設した</span>
            </h2>
            <p className="text-base md:text-xl font-bold leading-relaxed text-midblue/80">
              100社上限だからこそ埋もれない新しい地域の旗印になる。
              <br />
              その共通の旗印のもと、地域の企業から意識を変えていく。
            </p>
          </div>
        </motion.div>

        {/* Phase6コンテンツ（テキスト1） */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-midblue z-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-normal">
            埋もれないために100社
          </h2>
          <div className="text-sm md:text-lg font-bold leading-loose opacity-90 text-center">
            <p>全国の地域から、100社ずつ素晴らしい企業を選ぶ。</p>
            <p>数千社の企業がつながり、地域から新しい流れを生み出す。</p>
          </div>
        </motion.div>

        {/* Phase6コンテンツ（テキスト2） */}
        <motion.div
          style={{ opacity: text2Opacity, y: text2Y }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-midblue z-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            100社という上限があるからこそ
          </h2>
          <div className="text-sm md:text-lg font-bold leading-loose opacity-90 text-center">
            <p>全国の地域から、100社ずつ素晴らしい企業を選ぶ。</p>
            <p>数千社の企業がつながり、地域から新しい流れを生み出す。</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
