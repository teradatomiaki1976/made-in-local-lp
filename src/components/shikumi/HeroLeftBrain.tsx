// src/components/shikumi/HeroLeftBrain.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// 柱のパラメータ設定（左右対称に描画するため、片側分の設定を定義）
// inner (奥/中央寄り) -> outer (手前/外側) の順に太くなる
const PILLARS = [
  {
    offset: "38%",
    width: "w-4 md:w-8",
    duration: 3.2,
    delay: 0.1,
    opacity: 0.5,
  },
  {
    offset: "28%",
    width: "w-8 md:w-16",
    duration: 4.5,
    delay: 0.8,
    opacity: 0.7,
  },
  {
    offset: "15%",
    width: "w-16 md:w-28",
    duration: 3.8,
    delay: 0.3,
    opacity: 0.9,
  },
  {
    offset: "0%",
    width: "w-24 md:w-44",
    duration: 5.1,
    delay: 1.2,
    opacity: 1.0,
  },
];

export default function HeroLeftBrain() {
  return (
    <section className="relative w-full min-h-[calc(100dvh-72px)] md:min-h-[100dvh] overflow-hidden flex flex-col bg-[#f4f7f9]">
      {/* 1. 最背面背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/shikumi/bg-left_fv.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 2. 光の柱（垂直・早いランダム変化・奥行き） */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage:
            "linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        {PILLARS.map((pillar, index) => (
          <div key={index}>
            {/* 左側の柱 */}
            <motion.div
              animate={{ backgroundPosition: ["50% 0%", "50% 100%", "50% 0%"] }}
              transition={{
                duration: pillar.duration,
                repeat: Infinity,
                ease: "linear",
                delay: pillar.delay,
              }}
              className={`absolute top-0 h-full ${pillar.width}`}
              style={{
                left: pillar.offset,
                opacity: pillar.opacity,
                backgroundImage:
                  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
                backgroundSize: "100% 400%",
                boxShadow: "0 0 60px rgba(255, 255, 255, 0.6)",
              }}
            />
            {/* 右側の柱（左側と対称） */}
            <motion.div
              animate={{
                backgroundPosition: ["50% 100%", "50% 0%", "50% 100%"],
              }}
              transition={{
                duration: pillar.duration * 1.1,
                repeat: Infinity,
                ease: "linear",
                delay: pillar.delay + 0.5,
              }}
              className={`absolute top-0 h-full ${pillar.width}`}
              style={{
                right: pillar.offset,
                opacity: pillar.opacity,
                backgroundImage:
                  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
                backgroundSize: "100% 400%",
                boxShadow: "0 0 60px rgba(255, 255, 255, 0.6)",
              }}
            />
          </div>
        ))}
      </div>

      {/* 3. コンテンツエリア（前面） */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full flex-1 px-4 pt-[100px] pb-0 md:pt-[120px] md:pb-[80px]">
        {/* エンブレム */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="text-sm font-bold tracking-[2] mb-2 md:mb-4">
            ── 地域を代表する企業100選 ──
          </div>
        </motion.div>

        {/* キャッチコピー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-[clamp(1.875rem,5vw,4.5rem)] font-bold leading-tight tracking-tight mb-6 text-shadow-sm text-shadow-white">
            企業の価値を
            <br />
            見つけ、選び、社会へ
          </h1>
          <p className="text-base md:text-xl font-medium">
            まだ知られていない、すごい会社を、世の中へ
          </p>
        </motion.div>

        {/* トロフィー画像 */}
        <motion.div
          initial={{ opacity: 0.4, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-12 md:mt-16 relative w-56 h-[min(256px,30vh)] md:w-80 md:h-[min(360px,35vh)] shrink-0"
        >
          <Image
            src="/images/shikumi/trophy.webp"
            alt="地域を代表する企業100選 トロフィー"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 224px, 320px"
          />
        </motion.div>
      </div>

      {/* 4. 下部アーチ形状 */}
      <div className="absolute bottom-0 left-0 w-full z-30 flex flex-col">
        <div className="w-full h-30 md:h-34 relative">
          {/* Scrollガイド */}
          <div className="absolute top-18 md:top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
            <span className="text-white text-[10px] md:text-xs tracking-widest font-serif mb-1 md:mb-2 drop-shadow-md">
              Scroll
            </span>
            <div className="w-px h-10 md:h-16 bg-white/20 relative overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-full bg-white"
              />
            </div>
          </div>

          {/* スマホ用SVG (md:未満で表示) */}
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-full block md:hidden"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="archGradientSp" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1B4A84" />
                <stop offset="100%" stopColor="#19324D" />
              </linearGradient>
              <filter id="archNoiseSp">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.85"
                  numOctaves="3"
                  stitchTiles="stitch"
                  result="noise"
                />
                <feComposite operator="in" in="noise" in2="SourceGraphic" />
              </filter>
            </defs>
            <path
              d="M0,120 L0,80 Q720,40 1440,80 L1440,120 Z"
              fill="url(#archGradientSp)"
            />
            <path
              d="M0,120 L0,80 Q720,40 1440,80 L1440,120 Z"
              fill="white"
              filter="url(#archNoiseSp)"
              style={{ mixBlendMode: "overlay", opacity: 0.15 }}
              pointerEvents="none"
            />
          </svg>

          {/* PC用SVG (md:以上で表示) */}
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-full hidden md:block"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="archGradientPc" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1B4A84" />
                <stop offset="100%" stopColor="#19324D" />
              </linearGradient>
              <filter id="archNoisePc">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.85"
                  numOctaves="3"
                  stitchTiles="stitch"
                  result="noise"
                />
                <feComposite operator="in" in="noise" in2="SourceGraphic" />
              </filter>
            </defs>
            <path
              d="M0,120 L0,80 Q720,-60 1440,80 L1440,120 Z"
              fill="url(#archGradientPc)"
            />
            <path
              d="M0,120 L0,80 Q720,-60 1440,80 L1440,120 Z"
              fill="white"
              filter="url(#archNoisePc)"
              style={{ mixBlendMode: "overlay", opacity: 0.15 }}
              pointerEvents="none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
