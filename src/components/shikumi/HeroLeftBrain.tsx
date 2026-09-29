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
    // 【修正】 pt-[100px] md:pt-[120px] を追加し、ヘッダーの高さを考慮
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden flex flex-col items-center justify-center bg-[#f4f7f9] pt-[100px] md:pt-[120px]">
      {/* 1. 最背面背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/shikumi/bg-left-brain.webp"
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
      <div className="relative z-20 flex flex-col items-center text-center">
        {/* エンブレム */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="text-sm font-bold text-[#9a8452] tracking-widest mb-4">
            ── 地域を代表する企業100選 ──
          </div>
        </motion.div>

        {/* キャッチコピー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[#111821] mb-6">
            企業の価値を、
            <br />
            見つけ、選び、社会へ。
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            まだ知られていない、すごい会社を、世の中へ。
          </p>
        </motion.div>

        {/* トロフィー画像 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="mt-12 relative w-64 h-80 md:w-80 md:h-[400px]"
        >
          {/* 【修正】 浮遊アニメーションのラッパー motion.div を削除し、どっしり置く */}
          <Image
            src="/images/shikumi/trophy-shadow.webp"
            alt="100選 トロフィー"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 256px, 320px"
          />
        </motion.div>
      </div>

      {/* 4. 下部アーチ形状 */}
      <div className="absolute bottom-0 left-0 w-full z-30">
        <div
          className="w-full h-24 md:h-32 bg-[#111821]"
          style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
        ></div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <span className="text-white text-xs tracking-widest font-serif mb-2">
            Scroll
          </span>
          <div className="w-px h-16 bg-white/20 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
