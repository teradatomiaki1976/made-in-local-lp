// src/components/omoi/LoadingPhase.tsx
"use client";

import { useState, useEffect, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BACKGROUND_IMAGES = [
  "/images/photo/scene1.webp",
  "/images/photo/scene2.webp",
  "/images/photo/scene3.webp",
  "/images/photo/scene4.webp",
  "/images/photo/scene5.webp",
  "/images/photo/scene6.webp",
  "/images/photo/scene7.webp",
  "/images/photo/scene8.webp",
  "/images/photo/scene9.webp",
  "/images/photo/scene10.webp",
];

const TIMINGS = [800, 600, 400, 200, 150, 150, 150, 200, 300, 1500];

// プログレスバー用に合計時間を計算
const TOTAL_DURATION = TIMINGS.reduce((a, b) => a + b, 0) / 1000;

type LoadingPhaseProps = {
  onComplete: () => void;
  className?: string;
};

export default function LoadingPhase({
  onComplete,
  className,
}: LoadingPhaseProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 1. 画像のプリロード処理（初回のみ）
  // Why: 全10枚（圧縮後でも合計数百KB）を一斉にプリロードすると
  //      ネットワーク帯域を圧迫しLCPが大幅に遅延するため、
  //      1枚目のみ即時ロードし、残りはブラウザのアイドル時間に順次ロードする
  useEffect(() => {
    // 1枚目は即時プリロード（すぐ表示に必要）
    const firstImg = new window.Image();
    firstImg.src = BACKGROUND_IMAGES[0];

    // 残りはアイドル時に順次ロード
    const preloadRemaining = () => {
      BACKGROUND_IMAGES.slice(1).forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    };

    // requestIdleCallback が使える環境では活用、なければ短い遅延で代替
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadRemaining);
      return () => window.cancelIdleCallback(idleId);
    } else {
      const timerId = setTimeout(preloadRemaining, 200);
      return () => clearTimeout(timerId);
    }
  }, []);

  // 2. 可変リズムの画像切り替えロジック
  useEffect(() => {
    if (currentImageIndex >= BACKGROUND_IMAGES.length - 1) {
      const timeout = setTimeout(() => {
        startTransition(() => {
          onComplete();
        });
      }, TIMINGS[currentImageIndex]);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentImageIndex((prev) => prev + 1);
    }, TIMINGS[currentImageIndex]);

    return () => clearTimeout(timeout);
  }, [currentImageIndex, onComplete]);

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[100] w-full bg-midblue overflow-hidden flex flex-col items-center justify-center",
        className,
      )}
      style={{ backgroundColor: "#003064" }}
    >
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentImageIndex}
          src={BACKGROUND_IMAGES[currentImageIndex]}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-screen blur-none",
          )}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 4, ease: "easeOut" },
          }}
          style={{ willChange: "transform, opacity" }}
        />
      </AnimatePresence>

      {/* --- SVGロゴのフェードイン --- */}
      {/* Why: LCP要素のため Next.js <Image priority> で最優先ロードする */}
      <motion.div
        className={cn("relative z-10 w-48 md:w-64 drop-shadow-2xl")}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/logo/emblem.png"
          alt="地域を代表する企業100選 Best 100 Companies Selected By Made In Local"
          width={500}
          height={685}
          priority
          className="w-full h-auto"
        />
      </motion.div>

      {/* --- ローディングバー --- */}
      <div
        className={cn(
          "relative z-10 w-48 md:w-64 h-px bg-white/20 mt-8 overflow-hidden",
        )}
      >
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: TOTAL_DURATION, ease: "easeInOut" }}
        />
      </div>
      <motion.div
        className={cn("absolute inset-0 bg-midblue z-50 pointer-events-none")}
        initial={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

