// src/components/omoi/Phase8_Circulation.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function Phase8_Circulation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. スクロール領域の監視
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. セクションが画面に入ったかどうかの監視
  // amount: 0.1 は「セクションの10%が画面に入ったらtrue」という意味
  const isInView = useInView(containerRef, { amount: 0.1 });

  // 🚨 3. 画面に入った瞬間に動画を最初から再生する副作用
  useEffect(() => {
    if (isInView && videoRef.current) {
      // 念のため再生位置を0秒に戻す
      videoRef.current.currentTime = 0;
      // 動画の再生を開始（エラーハンドリング付き）
      videoRef.current.play().catch((error) => {
        console.warn("動画の自動再生がブラウザにブロックされました:", error);
      });
    } else if (!isInView && videoRef.current) {
      // 画面外に出たら動画を一時停止（パフォーマンス最適化）
      videoRef.current.pause();
    }
  }, [isInView]);

  // ==========================================
  // テキストのクロスフェード制御
  // ==========================================
  const text1Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.35, 0.45],
    [0, 1, 1, 0],
  );
  const text1Y = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.35, 0.45],
    [30, 0, 0, -30],
  );

  const text2Opacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.7, 0.8],
    [0, 1, 1, 0],
  );
  const text2Y = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.7, 0.8],
    [30, 0, 0, -30],
  );

  const text3Opacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.8, 0.9, 1], [30, 0, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-midblue h-[400vh]"
    >
      <div className="sticky top-0 left-0 w-full h-svh overflow-hidden flex flex-col items-center justify-center">
        {/* --- 1. 背景の動画レイヤー --- */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-100 bg-midblue">
          <video
            ref={videoRef}
            src="/videos/japan-map-circulation.mp4"
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* --- 2. 前面のテキストレイヤー --- */}
        <div className="relative z-10 w-full px-6 flex flex-col items-center text-center text-white font-serif pointer-events-none mt-[40vh] md:mt-[30vh]">
          <motion.div
            style={{ opacity: text1Opacity, y: text1Y }}
            className="absolute flex flex-col items-center justify-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-widest drop-shadow-xl">
              地域から都市へ。
              <br className="md:hidden" />
              都市から地域へ。
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: text2Opacity, y: text2Y }}
            className="absolute flex flex-col items-center justify-center gap-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-widest drop-shadow-xl leading-relaxed">
              人も。情報も。
              <br />
              仕事も。可能性も。
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: text3Opacity, y: text3Y }}
            className="absolute flex flex-col items-center justify-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-widest drop-shadow-xl">
              日本中を巡り続ける社会へ。
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
