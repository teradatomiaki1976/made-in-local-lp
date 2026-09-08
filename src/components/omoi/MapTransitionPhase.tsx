// src/components/omoi/MapTransitionPhase.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MapTransitionPhase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- 1. 日本地図のスケール（画面中央から巨大化） ---
  const svgScale = useTransform(scrollYProgress, [0, 0.4], [0, 300]);

  // --- 2. 隙間防止用の強制塗りつぶしレイヤー ---
  const blueFillOpacity = useTransform(scrollYProgress, [0.35, 0.4], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh]">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-white flex items-center justify-center">
        {/* =========================================================
            メイン：中央から拡大する日本地図レイヤー
        ========================================================= */}
        <motion.div
          style={{
            scale: svgScale,
            originX: 0.5,
            originY: 0.5,
            willChange: "transform",
          }}
          className="absolute w-[50vw] max-w-[600px] flex items-center justify-center"
        >
          <img
            src="/images/section2/japan.svg"
            alt=""
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
