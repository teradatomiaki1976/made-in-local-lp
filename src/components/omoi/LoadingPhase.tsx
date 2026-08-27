// src/components/omoi/LoadingPhase.tsx
"use client";

import { useState, useEffect, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// 【演出のキモ】各画像の表示時間を配列で定義（ミリ秒）
// ゆっくり始まり → 加速し → 最後（10枚目）で長く「タメる」
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
  useEffect(() => {
    BACKGROUND_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // 2. 可変リズムの画像切り替えロジック
  useEffect(() => {
    // 最後の画像を「タメた」あと、Phase 2へ移行
    if (currentImageIndex >= BACKGROUND_IMAGES.length - 1) {
      const timeout = setTimeout(() => {
        // 👇 状態更新をstartTransitionでラップしてレンダリングの優先度を下げる
        startTransition(() => {
          onComplete();
        });
      }, TIMINGS[currentImageIndex]);
      return () => clearTimeout(timeout);
    }

    // TIMINGS配列で指定した秒数後に、次の画像へインデックスを進める
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
      {/* --- 背景画像の切り替え（スケール＋イージング追加） --- */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentImageIndex}
          src={BACKGROUND_IMAGES[currentImageIndex]}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-screen blur-none",
          )}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{
            opacity: { duration: 0.2 }, // 0.2秒でパッとフェードイン
            scale: { duration: 4, ease: "easeOut" }, // 4秒かけてゆっくり縮小（表示中は常に動き続ける）
          }}
          style={{ willChange: "transform, opacity" }}
        />
      </AnimatePresence>

      {/* --- SVGロゴのフェードイン --- */}
      <motion.div
        className={cn("relative z-10 w-48 md:w-64 drop-shadow-2xl")}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="/images/logo/emblem.png"
          alt="地域を代表する企業100選"
          className="w-full h-auto"
        />
      </motion.div>

      {/* --- ローディングバー（全体の可変時間と同期） --- */}
      <div
        className={cn(
          "relative z-10 w-48 md:w-64 h-px bg-white/20 mt-8 overflow-hidden",
        )}
      >
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          // TOTAL_DURATIONを使って、加速やタメを含めた全体の時間とバーの進行をピッタリ合わせる
          transition={{ duration: TOTAL_DURATION, ease: "easeInOut" }}
        />
      </div>
      <motion.div
        className={cn("absolute inset-0 bg-midblue z-50 pointer-events-none")}
        initial={{ opacity: 0 }}
        exit={{ opacity: 1 }} // コンポーネントが破棄される瞬間にフェードイン（不透明になる）
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
