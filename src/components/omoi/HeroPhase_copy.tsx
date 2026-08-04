// src/components/omoi/HeroPhase.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

type HeroPhaseProps = {
  onShowHeader: () => void;
};

const BASE_IMAGES = [
  {
    src: "/images/loading/scene1.webp",
    className: "top-[5%] left-[5%] w-32 md:w-64",
  },
  {
    src: "/images/loading/scene2.webp",
    className: "top-[25%] left-[10%] w-60 md:w-100",
  },
  {
    src: "/images/loading/scene3.webp",
    className: "top-[15%] right-[10%] w-36 md:w-56",
  },
  {
    src: "/images/loading/scene4.webp",
    className: "top-[40%] right-[15%] w-48 md:w-72",
  },
  {
    src: "/images/loading/scene5.webp",
    className: "top-[60%] left-[8%] w-32 md:w-48",
  },
  {
    src: "/images/loading/scene6.webp",
    className: "top-[75%] left-[25%] w-40 md:w-56",
  },
  {
    src: "/images/loading/scene7.webp",
    className: "top-[55%] right-[8%] w-36 md:w-48",
  },
  {
    src: "/images/loading/scene8.webp",
    className: "top-[85%] right-[20%] w-48 md:w-64",
  },
  // ※ 必要に応じてさらに追加可能
];

export default function HeroPhase({ onShowHeader }: HeroPhaseProps) {
  // 💡 先回り実装：コンポーネントが表示されてから2.5秒後にヘッダーを出す処理
  useEffect(() => {
    const timer = setTimeout(() => {
      onShowHeader(); // 親（page.tsx）の setIsHeaderVisible(true) がここで発火する
    }, 2500);

    // コンポーネントが破棄された時にタイマーを片付ける（メモリリーク防止のベストプラクティス）
    return () => clearTimeout(timer);
  }, [onShowHeader]);
  return (
    <motion.section
      className="relative w-full h-screen bg-base2 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* --- 1. 背景画像の無限浮遊レイヤー --- */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[200vh] flex flex-col z-0"
        // 0% から -50%（つまりちょうど100vh分）までスクロールしたら、一瞬で0に戻る（見た目は全く同じなのでバレない）
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: 40, // 👈 ここで全体の上昇スピードを調整
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ willChange: "transform" }}
      >
        {/* 1つ目のブロック（100vh） */}
        <div className="relative w-full h-[100vh]">
          {BASE_IMAGES.map((img, index) => (
            <motion.img
              key={`block1-${index}`}
              src={img.src}
              className={`absolute object-cover rounded-md shadow-md opacity-0 ${img.className}`}
              // 画像個別のフェードインと彩度変化のアニメーション（ロード時に1回だけ実行）
              initial={{ opacity: 0, filter: "grayscale(100%) blur(10px)" }}
              animate={{ opacity: 0.8, filter: "grayscale(0%) blur(0px)" }}
              transition={{
                delay: 1.0 + Math.random() * 1.5,
                duration: 3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* 2つ目のブロック（100vh）※1つ目と全く同じものを配置してループの切れ目をなくす */}
        <div className="relative w-full h-[100vh]">
          {BASE_IMAGES.map((img, index) => (
            <motion.img
              key={`block2-${index}`}
              src={img.src}
              className={`absolute object-cover rounded-md shadow-md opacity-0 ${img.className}`}
              initial={{ opacity: 0, filter: "grayscale(100%) blur(10px)" }}
              animate={{ opacity: 0.6, filter: "grayscale(0%) blur(0px)" }}
              transition={{
                delay: 1.0 + Math.random() * 1.5,
                duration: 3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* --- 2. 中央メッセージテキストレイヤー（一番手前で固定） --- */}
      <motion.div
        className="relative flex flex-col items-center text-center pointer-events-none py-48 px-16 rounded-full bg-[radial-gradient(circle,#fefbf1_60%,transparent_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="font-serif font-semibold text-5xl md:text-8xl leading-tight">
          地域から本気で
          <br />
          日本を変えたい
        </h1>

        <motion.div
          className="mt-16 flex flex-col items-center gap-2 opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
        >
          <span className="font-serif text-sm tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-[#0d382b]/50 animate-pulse" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
