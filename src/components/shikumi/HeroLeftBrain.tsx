// src/components/shikumi/HeroLeftBrain.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

// 1. 放射状の光線の設定
// トロフィー背後の中心から360度ランダムな14本
interface RayConfig {
  id: number;
  angle: number; // 角度 (deg): 0が右、-90が真上、180/-180が左
  width: number; // 光の筋の太さ (px)
  length: string; // 光の筋の長さ
  duration: number; // 1ループの秒数
  delay: number; // 開始ディレイ (秒)
  hasFlare: boolean; // 中心から外側へスーッと流れる強い光塊を表示するか
}

const RADIANT_RAYS: RayConfig[] = [
  // 左下〜左横エリア
  {
    id: 1,
    angle: 152,
    width: 110,
    length: "95vmax",
    duration: 4.4,
    delay: 0.0,
    hasFlare: true,
  },
  {
    id: 2,
    angle: 166,
    width: 75,
    length: "85vmax",
    duration: 5.2,
    delay: 1.4,
    hasFlare: true,
  },
  {
    id: 3,
    angle: -176,
    width: 95,
    length: "90vmax",
    duration: 4.8,
    delay: 0.6,
    hasFlare: true,
  },
  {
    id: 4,
    angle: -160,
    width: 65,
    length: "85vmax",
    duration: 5.8,
    delay: 2.1,
    hasFlare: false,
  },
  // 左斜め上〜真上エリア
  {
    id: 5,
    angle: -142,
    width: 120,
    length: "95vmax",
    duration: 6.2,
    delay: 0.3,
    hasFlare: true,
  },
  {
    id: 6,
    angle: -122,
    width: 55,
    length: "80vmax",
    duration: 4.6,
    delay: 1.7,
    hasFlare: false,
  },
  {
    id: 7,
    angle: -102,
    width: 70,
    length: "80vmax",
    duration: 5.5,
    delay: 0.9,
    hasFlare: false,
  },
  {
    id: 8,
    angle: -78,
    width: 70,
    length: "80vmax",
    duration: 5.1,
    delay: 2.4,
    hasFlare: false,
  },
  {
    id: 9,
    angle: -58,
    width: 60,
    length: "80vmax",
    duration: 4.7,
    delay: 0.4,
    hasFlare: false,
  },
  {
    id: 10,
    angle: -38,
    width: 115,
    length: "95vmax",
    duration: 6.0,
    delay: 1.2,
    hasFlare: true,
  },
  // 右横〜右下エリア
  {
    id: 11,
    angle: -18,
    width: 70,
    length: "85vmax",
    duration: 5.4,
    delay: 2.6,
    hasFlare: false,
  },
  {
    id: 12,
    angle: -4,
    width: 100,
    length: "90vmax",
    duration: 4.5,
    delay: 0.8,
    hasFlare: true,
  },
  {
    id: 13,
    angle: 12,
    width: 85,
    length: "85vmax",
    duration: 5.0,
    delay: 1.9,
    hasFlare: true,
  },
  {
    id: 14,
    angle: 26,
    width: 120,
    length: "95vmax",
    duration: 4.3,
    delay: 0.2,
    hasFlare: true,
  },
];

// 2. 背景の淡い垂直光の柱
const AMBIENT_PILLARS = [
  {
    offset: "18%",
    width: "w-12 md:w-20",
    duration: 4.2,
    delay: 0.2,
    maxOpacity: 0.35,
  },
  {
    offset: "4%",
    width: "w-20 md:w-36",
    duration: 5.5,
    delay: 1.1,
    maxOpacity: 0.45,
  },
];

export default function HeroLeftBrain() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full min-h-[calc(100dvh-72px)] md:min-h-[100dvh] overflow-hidden flex flex-col">
      {/* 1. 最背面背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/shikumi/bg-left_fv.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 2. 背景の淡い垂直ピラー */}
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
        {AMBIENT_PILLARS.map((pillar, index) => (
          <div key={index}>
            {/* 左側 */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? { opacity: pillar.maxOpacity }
                  : {
                      opacity: [0.1, pillar.maxOpacity, 0.1],
                      scaleY: [0.9, 1.1, 0.9],
                    }
              }
              transition={{
                duration: pillar.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pillar.delay,
              }}
              className={`absolute top-0 h-full ${pillar.width} origin-bottom`}
              style={{
                left: pillar.offset,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(225,255,255,0.7) 50%, rgba(255,255,255,0) 100%)",
                willChange: "transform, opacity",
              }}
            />
            {/* 右側 */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? { opacity: pillar.maxOpacity }
                  : {
                      opacity: [0.1, pillar.maxOpacity, 0.1],
                      scaleY: [0.9, 1.1, 0.9],
                    }
              }
              transition={{
                duration: pillar.duration * 1.15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pillar.delay + 0.7,
              }}
              className={`absolute top-0 h-full ${pillar.width} origin-top`}
              style={{
                right: pillar.offset,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(225,255,255,0.7) 50%, rgba(255,255,255,0) 100%)",
                willChange: "transform, opacity",
              }}
            />
          </div>
        ))}
      </div>

      {/* 3. コンテンツエリア（前面） */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full flex-1 px-4 pt-[100px] pb-0 md:pt-[120px] md:pb-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative z-20"
        >
          <h1 className="text-[clamp(1.9rem,9vw,4.5rem)] font-bold leading-snug tracking-tight mb-4 lg:mb-8 text-shadow-sm text-shadow-white">
            もっと知られるべき
            <br />
            日本各地の企業を選出
          </h1>
          <div className="text-sm md:text-xl font-bold">
            ───{" "}
            <span className="px-2 tracking-[2] md:tracking-[6]">
              地域を代表する企業100選
            </span>{" "}
            ───
          </div>
        </motion.div>

        {/* トロフィー画像 ＆ 背後からランダムに放たれる放射光アニメーション */}
        <motion.div
          initial={{ opacity: 0.4, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-14 md:mt-6 lg:mt-16 relative w-56 h-[min(256px,35vh)] md:w-80 md:h-[min(360px,35vh)] shrink-0 z-10"
        >
          {/* ★ 放射光の中心アンカー */}
          <div
            className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            {/* A. ベース全体の淡いコニック（扇状） */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[180vmax] h-[180vmax] mix-blend-screen"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.45) 0deg, rgba(255,255,255,0) 6deg, rgba(255,255,255,0.3) 13deg, rgba(255,255,255,0) 20deg)",
                willChange: "transform, opacity",
              }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.5 }
                  : {
                      scale: [1, 1.05, 1],
                      opacity: [0.4, 0.7, 0.4],
                    }
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* B. トロフィー背後のコア・グロー */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] md:w-[680px] md:h-[680px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 28%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0) 65%)",
                willChange: "transform, opacity",
              }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.9 }
                  : {
                      scale: [0.92, 1.12, 0.92],
                      opacity: [0.85, 1, 0.85],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* C. ランダムに伸縮・明滅するフレア */}
            {RADIANT_RAYS.map((ray) => {
              const flareHeight = ray.width * 0.85;
              const beamTopOffset = (flareHeight - ray.width) / 2;

              return (
                <div
                  key={ray.id}
                  className="absolute top-0 left-0 origin-left"
                  style={{ transform: `rotate(${ray.angle}deg)` }}
                >
                  {/* 光の筋本体 */}
                  <motion.div
                    className="absolute left-0 origin-left"
                    style={{
                      top: `${beamTopOffset}px`,
                      width: ray.length,
                      height: `${ray.width}px`,
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 90%)",
                      WebkitMaskImage:
                        "linear-gradient(180deg, transparent 0%, black 35%, black 65%, transparent 100%)",
                      maskImage:
                        "linear-gradient(180deg, transparent 0%, black 35%, black 65%, transparent 100%)",
                      willChange: "transform, opacity",
                    }}
                    initial={{ opacity: 0.2, scaleX: 0.7, scaleY: 0.8 }}
                    animate={
                      shouldReduceMotion
                        ? { opacity: 0.55, scaleX: 1, scaleY: 1 }
                        : {
                            opacity: [0.15, 0.75, 0.15],
                            scaleX: [0.7, 1.15, 0.7],
                            scaleY: [0.75, 1.3, 0.75],
                          }
                    }
                    transition={{
                      duration: ray.duration,
                      delay: ray.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* 中心から外側へスーッと飛び出す強い光の塊 */}
                  {!shouldReduceMotion && ray.hasFlare && (
                    <motion.div
                      className="absolute top-0 left-0 -translate-y-1/2 rounded-full"
                      style={{
                        width: "35vw",
                        minWidth: "220px",
                        maxWidth: "480px",
                        height: `${flareHeight}px`,
                        background:
                          "radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0) 75%)",
                        willChange: "transform, opacity",
                      }}
                      initial={{ x: "0vw", opacity: 0, scaleX: 0.5 }}
                      animate={{
                        x: ["0vw", "60vw"],
                        opacity: [0, 1, 0],
                        scaleX: [0.5, 1.35, 0.85],
                      }}
                      transition={{
                        duration: ray.duration * 0.85,
                        delay: ray.delay,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* トロフィー本体 */}
          <Image
            src="/images/shikumi/trophy.webp"
            alt="地域を代表する企業100選 トロフィー"
            fill
            priority
            className="object-contain relative z-10"
            sizes="(max-width: 768px) 224px, 320px"
          />
        </motion.div>
      </div>

      {/* 4. 下部アーチ形状 */}
      <div className="absolute bottom-0 left-0 w-full z-30 flex flex-col">
        <div className="w-full h-32 md:h-28 lg:h-36 relative">
          {/* Scrollガイド */}
          <div className="absolute top-18 md:top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
            <span className="text-white text-[10px] md:text-xs tracking-widest font-serif mb-1 md:mb-2 drop-shadow-md">
              Scroll
            </span>
            <div className="w-px h-10 md:h-16 bg-white/20 relative overflow-hidden">
              <motion.div
                animate={
                  shouldReduceMotion ? { y: "0%" } : { y: ["-100%", "100%"] }
                }
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
