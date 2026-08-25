// src/components/omoi/Phase6_Why100.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Phase6_Why100() {
  const containerRef = useRef<HTMLDivElement>(null);

  // セクション全体をスクロール領域（300vh）として監視
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 背景「100」のパララックスとウェイト変化（細:200 → 太:900）
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.4, 1.15]);
  const bgWeight = useTransform(scrollYProgress, [0, 1], [200, 900]);

  // --- テキストブロック 1：「埋もれないために100社」 ---
  // 0.1〜0.2で出現し、0.4〜0.5でクロスフェードして消える
  const text1Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.4, 0.5],
    [0, 1, 1, 0],
  );

  // 💡少しリッチにする工夫：消える時に上にスッと抜ける動き（-30）を追加
  const text1Y = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.4, 0.5],
    [30, 0, 0, -30],
  );

  // --- テキストブロック 2：「100社という上限があるからこそ」 ---
  // 🚨 0.5〜0.6で出現し、最後（1.0）まで消えずに残り続ける！
  const text2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 1], [0, 1, 1]);
  const text2Y = useTransform(scrollYProgress, [0.5, 0.6, 1], [30, 0, 0]);

  return (
    <section ref={containerRef} className="relative w-full bg-creem h-[300vh]">
      <div className="sticky top-0 left-0 w-full h-svh overflow-hidden flex items-center justify-center">
        {/* --- 背景の巨大な「100」 --- */}
        <motion.div
          style={{
            scale: bgScale,
            fontWeight: bgWeight,
            willChange: "transform, font-weight",
          }}
          className="absolute inset-0 flex items-center justify-center text-midblue font-serif select-none pointer-events-none opacity-[0.06]"
        >
          <span className="text-[60vw] md:text-[45vw] leading-none tracking-tighter">
            100
          </span>
        </motion.div>

        {/* --- テキストブロック 1 --- */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-midblue"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-wide">
            埋もれないために100社
          </h2>
          <div className="text-sm md:text-lg leading-loose font-serif opacity-90 text-center">
            <p>全国の地域から、100社ずつ素晴らしい企業を選ぶ。</p>
            <p>数千社の企業がつながり、地域から新しい流れを生み出す。</p>
          </div>
        </motion.div>

        {/* --- テキストブロック 2 --- */}
        <motion.div
          style={{ opacity: text2Opacity, y: text2Y }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-midblue"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-wide">
            100社という上限があるからこそ
          </h2>
          <div className="text-sm md:text-lg leading-loose font-serif opacity-90 text-center">
            <p>全国の地域から、100社ずつ素晴らしい企業を選ぶ。</p>
            <p>数千社の企業がつながり、地域から新しい流れを生み出す。</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
