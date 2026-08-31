// src/components/omoi/MessagePhase.tsx
"use client";

import {
  motion,
  MotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ループ用に画像を定義
const SIDE_IMAGES = [
  { src: "/images/section3/scene1.webp", height: "h-[300px]" },
  { src: "/images/section3/scene2.webp", height: "h-[300px]" },
  { src: "/images/section3/scene3.webp", height: "h-[300px]" },
  { src: "/images/section3/scene4.webp", height: "h-[300px]" },
];
const LOOPED_IMAGES = [...SIDE_IMAGES, ...SIDE_IMAGES];

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function MessagePhase({ scrollYProgress }: Props) {
  // ==========================================
  // 前半フェーズのスクロール制御（0.0 ~ 0.5 に圧縮）
  // ==========================================

  // Scene 1: 0%〜17.5%は表示、17.5%〜25%で消える
  const scene1Opacity = useTransform(
    scrollYProgress,
    [0, 0.175, 0.25],
    [1, 1, 0],
  );
  const scene1BlurValue = useTransform(
    scrollYProgress,
    [0, 0.175, 0.25],
    [0, 0, 12],
  );
  const scene1Filter = useMotionTemplate`blur(${scene1BlurValue}px)`;
  const scene1Visibility = useTransform(scrollYProgress, (v) =>
    v > 0.25 ? "hidden" : "visible",
  );

  // Scene 2: 地図を消さずに維持する（0.3以降はずっとopacity 1）
  const scene2Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const scene2BlurValue = useTransform(scrollYProgress, [0.2, 0.3], [12, 0]);
  const scene2Filter = useMotionTemplate`blur(${scene2BlurValue}px)`;
  const scene2Visibility = useTransform(scrollYProgress, (v) =>
    v > 1.0 ? "hidden" : "visible",
  );

  // サイドの無限ループ画像のフェードアウト（0.45〜0.5で消える）
  const sideImagesOpacity = useTransform(scrollYProgress, [0.45, 0.5], [1, 0]);
  const pcLeftX = useTransform(scrollYProgress, [0.45, 0.5], ["0%", "-100%"]);
  const pcRightX = useTransform(scrollYProgress, [0.45, 0.5], ["0%", "100%"]);
  const spTopY = useTransform(scrollYProgress, [0.45, 0.5], ["0%", "-100%"]);
  const spBottomY = useTransform(scrollYProgress, [0.45, 0.5], ["0%", "100%"]);
  const sideImagesVisibility = useTransform(scrollYProgress, (v) =>
    v > 0.5 ? "hidden" : "visible",
  );

  // ==========================================
  // 放射アニメーション（0.25 ~ 0.375 付近で発火）
  // ==========================================

  // 1. 「0社」
  const radialOpacity0 = useTransform(scrollYProgress, [0.25, 0.325], [0, 0.6]);
  const radialScale0 = useTransform(scrollYProgress, [0.25, 0.35], [0.2, 1]);
  const pos0_X = useTransform(scrollYProgress, [0.25, 0.375], ["0vw", "-18vw"]);
  const pos0_Y = useTransform(scrollYProgress, [0.25, 0.375], ["0vh", "22vh"]);

  // 2. 「3社」
  const radialOpacity3 = useTransform(scrollYProgress, [0.25, 0.3], [0, 0.6]);
  const radialScale3 = useTransform(scrollYProgress, [0.25, 0.35], [0.2, 1]);
  const pos3_X = useTransform(scrollYProgress, [0.25, 0.375], ["0vw", "-12vw"]);
  const pos3_Y = useTransform(scrollYProgress, [0.25, 0.375], ["0vh", "-18vh"]);

  // 3. 「10社」
  const radialOpacity10 = useTransform(
    scrollYProgress,
    [0.27, 0.345],
    [0, 0.6],
  );
  const radialScale10 = useTransform(scrollYProgress, [0.27, 0.37], [0.2, 1]);
  const pos10_X = useTransform(scrollYProgress, [0.25, 0.375], ["0vw", "18vw"]);
  const pos10_Y = useTransform(
    scrollYProgress,
    [0.25, 0.375],
    ["0vh", "-12vh"],
  );

  // 4. 「1社」
  const radialOpacity1 = useTransform(scrollYProgress, [0.28, 0.355], [0, 0.6]);
  const radialScale1 = useTransform(scrollYProgress, [0.28, 0.38], [0.2, 1]);
  const pos1_X = useTransform(scrollYProgress, [0.25, 0.375], ["0vw", "12vw"]);
  const pos1_Y = useTransform(scrollYProgress, [0.25, 0.375], ["0vh", "20vh"]);

  // 5. 「5社」
  const radialOpacity5 = useTransform(scrollYProgress, [0.27, 0.325], [0, 0.6]);
  const radialScale5 = useTransform(scrollYProgress, [0.27, 0.34], [0.2, 1]);
  const pos5_Y = useTransform(scrollYProgress, [0.25, 0.375], ["0vh", "30vh"]);

  // 中央テキスト「何社思い浮かべられますか」のフェードアウト
  const centerTextOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.3, 0.45, 0.48],
    [0, 1, 1, 0],
  );
  const centerTextVisibility = useTransform(scrollYProgress, (v) =>
    v < 0.25 || v > 0.48 ? "hidden" : "visible",
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden flex items-center justify-center">
      {/* ==========================================
          背景レイヤー（最背面）
      ========================================== */}
      <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
        {/* Scene 1 背景 */}
        <motion.div
          style={{
            opacity: scene1Opacity,
            filter: scene1Filter,
            willChange: "opacity, filter",
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/section3/bg-1.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </motion.div>

        {/* Scene 2 背景 */}
        <motion.div
          style={{
            opacity: scene2Opacity,
            filter: scene2Filter,
            visibility: scene2Visibility,
            willChange: "opacity, filter",
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/section3/japan47.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-contain opacity-30"
          />
        </motion.div>

        <div className="absolute inset-0 bg-midblue/60 mix-blend-multiply" />
      </div>

      {/* ==========================================
          左右の無限ループ画像（PC版）
      ========================================== */}
      <motion.div
        style={{
          opacity: sideImagesOpacity,
          x: pcLeftX,
          visibility: sideImagesVisibility,
        }}
        className="absolute left-[2%] top-0 w-[18%] hidden md:flex flex-col gap-6 z-10 will-change-transform pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          className="w-full flex flex-col gap-6"
        >
          {LOOPED_IMAGES.map((img, index) => (
            <div
              key={`pc-left-${index}`}
              className={cn(
                "relative w-full rounded-lg overflow-hidden",
                img.height,
              )}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="20vw"
                className="object-cover opacity-70"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        style={{
          opacity: sideImagesOpacity,
          x: pcRightX,
          visibility: sideImagesVisibility,
        }}
        className="absolute right-[2%] top-0 w-[18%] hidden md:flex flex-col gap-6 z-10 will-change-transform pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          className="w-full flex flex-col gap-6"
        >
          {LOOPED_IMAGES.map((img, index) => (
            <div
              key={`pc-right-${index}`}
              className={cn(
                "relative w-full rounded-lg overflow-hidden",
                img.height,
              )}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="20vw"
                className="object-cover opacity-70"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ==========================================
          上下の無限ループ画像（スマホ版）
      ========================================== */}
      <motion.div
        style={{
          opacity: sideImagesOpacity,
          y: spTopY,
          visibility: sideImagesVisibility,
        }}
        className="absolute top-[5%] left-0 h-[18vh] flex md:hidden flex-row gap-4 z-10 will-change-transform pointer-events-none w-max"
        aria-hidden="true"
      >
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          className="h-full flex flex-row gap-4"
        >
          {LOOPED_IMAGES.map((img, index) => (
            <div
              key={`sp-top-${index}`}
              className="relative h-full w-[60vw] rounded-lg overflow-hidden"
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="60vw"
                className="object-cover opacity-70"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        style={{
          opacity: sideImagesOpacity,
          y: spBottomY,
          visibility: sideImagesVisibility,
        }}
        className="absolute bottom-[5%] left-0 h-[18vh] flex md:hidden flex-row gap-4 z-10 will-change-transform pointer-events-none w-max"
        aria-hidden="true"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          className="h-full flex flex-row gap-4"
        >
          {LOOPED_IMAGES.map((img, index) => (
            <div
              key={`sp-bottom-${index}`}
              className="relative h-full w-[60vw] rounded-lg overflow-hidden"
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="60vw"
                className="object-cover opacity-70"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ==========================================
          中央メッセージレイヤー
      ========================================== */}
      <div className="relative z-20 w-full max-w-content px-6 md:px-0 text-center flex flex-col items-center justify-center h-full">
        {/* Scene 1 テキスト */}
        <motion.div
          style={{
            opacity: scene1Opacity,
            filter: scene1Filter,
            visibility: scene1Visibility,
            willChange: "opacity, filter",
          }}
          className="absolute flex flex-col items-center px-6 gap-8 md:gap-16 w-full pointer-events-none"
        >
          <motion.h2
            className="text-3xl md:text-7xl font-bold leading-tight text-white drop-shadow-xl"
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ willChange: "opacity, filter, transform" }}
          >
            <span className="text-lg md:text-3xl leading-relaxed block mb-4 opacity-90">
              久しぶりに地元へ帰ると、
            </span>
            昔あった店が
            <br />
            なくなっている
          </motion.h2>

          <motion.p
            className="text-left text-base md:text-2xl leading-normal text-white/80 drop-shadow-md max-w-3xl"
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            style={{ willChange: "opacity, filter, transform" }}
          >
            活気のあった商店街にはシャッターが下りている。変化は、ある日突然ではなく、
            気づかないほど静かに進んでいる。
          </motion.p>
        </motion.div>

        {/* Scene 2 テキスト */}
        <motion.div
          style={{
            opacity: centerTextOpacity,
            visibility: centerTextVisibility,
            willChange: "opacity",
          }}
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* 0社 */}
            <motion.div
              style={{
                opacity: radialOpacity0,
                scale: radialScale0,
                x: pos0_X,
                y: pos0_Y,
                willChange: "transform, opacity",
              }}
              className="absolute flex items-center justify-center w-32 md:w-48 aspect-square rounded-full border border-white/40 text-white"
            >
              <div className="flex items-end text-2xl">
                <span className="text-4xl md:text-6xl mr-1">0</span>社
              </div>
            </motion.div>
            {/* 3社 */}
            <motion.div
              style={{
                opacity: radialOpacity3,
                scale: radialScale3,
                x: pos3_X,
                y: pos3_Y,
                willChange: "transform, opacity",
              }}
              className="absolute flex items-center justify-center w-28 md:w-40 aspect-square rounded-full border border-white/40 text-2xl text-white"
            >
              <div className="flex items-end text-2xl">
                <span className="text-3xl md:text-7xl mr-1">3</span>社
              </div>
            </motion.div>
            {/* 10社 */}
            <motion.div
              style={{
                opacity: radialOpacity10,
                scale: radialScale10,
                x: pos10_X,
                y: pos10_Y,
                willChange: "transform, opacity",
              }}
              className="absolute flex items-center justify-center w-36 md:w-56 aspect-square rounded-full border border-white/40 text-2xl text-white"
            >
              <div className="flex items-end text-2xl">
                <span className="text-5xl md:text-8xl mr-1">10</span>社
              </div>
            </motion.div>
            {/* 1社 */}
            <motion.div
              style={{
                opacity: radialOpacity1,
                scale: radialScale1,
                x: pos1_X,
                y: pos1_Y,
                willChange: "transform, opacity",
              }}
              className="absolute flex items-center justify-center w-24 md:w-32 aspect-square rounded-full border border-white/40 text-2xl text-white"
            >
              <div className="flex items-end text-2xl">
                <span className="text-3xl md:text-7xl mr-1">1</span>社
              </div>
            </motion.div>
            {/* 5社 */}
            <motion.div
              style={{
                opacity: radialOpacity5,
                scale: radialScale5,
                x: 0,
                y: pos5_Y,
                willChange: "transform, opacity",
              }}
              className="absolute flex items-center justify-center w-28 md:w-36 aspect-square rounded-full border border-white/40 text-2xl text-white"
            >
              <div className="flex items-end text-2xl">
                <span className="text-3xl md:text-7xl mr-1">5</span>社
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 flex flex-col gap-10 w-full items-center">
            <p className="text-xl md:text-3xl text-white opacity-90 drop-shadow-md">
              あなたは、自分の地域の企業を
            </p>
            <h2 className="text-4xl md:text-7xl font-bold leading-tight text-white drop-shadow-xl tracking-wide">
              何社？思い
              <br />
              浮かべられますか
            </h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
