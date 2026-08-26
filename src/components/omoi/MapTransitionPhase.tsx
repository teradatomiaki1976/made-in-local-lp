// src/components/omoi/MapTransitionPhase.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MapTransitionPhase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // 💡 修正ポイント：トリガーのタイミングを調整
    // FVの直下に配置されるため、このセクションの頭が画面下部に入った瞬間に開始
    offset: ["start end", "end start"],
  });

  // --- 1. 日本地図のスケール（画面中央から巨大化） ---
  // スクロールの序盤（0〜0.4）で圧倒的な倍率へ
  const svgScale = useTransform(scrollYProgress, [0, 0.4], [0, 300]);

  // --- 2. 隙間防止用の強制塗りつぶしレイヤー ---
  // スケールの拡大が終わる直前（0.35〜0.4）で青にフェードイン
  const blueFillOpacity = useTransform(scrollYProgress, [0.35, 0.4], [0, 1]);

  return (
    <section
      ref={containerRef}
      // 👇 ネガティブマージン (-mt-[100vh]) を完全削除。
      // これによりFVに被らず、FVの下から自然にスクロールインしてくる。
      className="relative w-full h-[400vh]"
    >
      {/* 
         💡 stickyの開始位置を top-0 に設定。
         FVをスクロールしきって、このセクションの頭が画面上端に来たら固定される。
         背景は白（bg-white）で、FVのダークなトーンから切り替わる。
      */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-white flex items-center justify-center">
        {/* =========================================================
            メイン：中央から拡大する日本地図レイヤー
        ========================================================= */}
        <motion.div
          style={{
            scale: svgScale,
            // 💡 中心を絶対に固定
            originX: 0.5,
            originY: 0.5,
            willChange: "transform",
          }}
          // w-[50vw] でPC閲覧時に適切な初期サイズを担保
          className="absolute w-[50vw] max-w-[600px] flex items-center justify-center"
        >
          {/* public/images/section2/japan.svg */}
          <img
            src="/images/section2/japan.svg"
            alt="Japan Map"
            className="w-full h-auto object-contain"
            aria-hidden="true"
          />
        </motion.div>

        {/* =========================================================
            完全な青色塗りつぶしレイヤー（地図の拡大と同時にフェードイン）
        ========================================================= */}
        <motion.div
          style={{ opacity: blueFillOpacity }}
          className="absolute inset-0 bg-midblue pointer-events-none"
        />
      </div>
    </section>
  );
}
