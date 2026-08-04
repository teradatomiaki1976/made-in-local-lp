// src/components/omoi/HeroPhase.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type HeroPhaseProps = {
  onShowHeader: () => void;
};

const BASE_IMAGES = [
  {
    src: "/images/loading/scene1.webp",
    className: "top-[5%] left-[5%] w-32 md:w-48",
  },
  {
    src: "/images/loading/scene2.webp",
    className: "top-[25%] left-[10%] w-60 md:w-80",
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
];

export default function HeroPhase({ onShowHeader }: HeroPhaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1つのコンテナ全体でスクロール量を監視（例: 300vh分のスクロール量を持たせる）
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // --- 日本地図のズームアップ連動 ---
  // スクロールの 0.3 〜 0.7 の区間で、地図を巨大化させる
  const svgScale = useTransform(scrollYProgress, [0.3, 0.7], [0, 120]);
  // --- Y軸移動（画面下方の「40vh」の位置から、中央の「0vh」へせり上がらせる） ---
  const svgY = useTransform(scrollYProgress, [0.25, 0.6], ["40vh", "0vh"]);
  // 最後に青色(#003064)で完全に画面を覆い尽くすフェード
  const blueFillOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onShowHeader();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onShowHeader]);

  return (
    // 全体を長めのスクロールコンテナにする（例: 200vh）
    <div ref={containerRef} className="relative w-full h-[160vh] bg-base2">
      {/* 画面に固定（Sticky）されるステージ */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* --- 1. 背景画像の無限浮遊レイヤー（FV要素） --- */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[200vh] flex flex-col z-0 pointer-events-none"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          style={{ willChange: "transform" }}
        >
          <div className="relative w-full h-[100vh]">
            {BASE_IMAGES.map((img, index) => (
              <motion.img
                key={`b1-${index}`}
                src={img.src}
                className={`absolute object-cover rounded-md shadow-md ${img.className}`}
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
          <div className="relative w-full h-[100vh]">
            {BASE_IMAGES.map((img, index) => (
              <motion.img
                key={`b2-${index}`}
                src={img.src}
                className={`absolute object-cover rounded-md shadow-md ${img.className}`}
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

        {/* --- 2. 中央メッセージテキスト（FVの主役） --- */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center pointer-events-none py-48 px-16 rounded-full bg-[radial-gradient(circle,#fefbf1_60%,transparent_100%)]"
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

        {/* --- 3. 中央から拡大する日本地図レイヤー（セクション2へのブリッジ） --- */}
        <motion.div
          style={{
            scale: svgScale,
            y: svgY,
            originX: 0.5,
            originY: 0.5,
            willChange: "transform",
          }}
          className="absolute z-20 w-[50vw] max-w-[600px] flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/section2/japan.svg"
            alt="Japan Map"
            className="w-full h-auto object-contain"
            aria-hidden="true"
          />
        </motion.div>

        {/* --- 4. 完全な青色塗りつぶしレイヤー --- */}
        <motion.div
          style={{ opacity: blueFillOpacity }}
          className="absolute inset-0 z-30 bg-[#003064] pointer-events-none"
        />
      </div>
    </div>
  );
}
