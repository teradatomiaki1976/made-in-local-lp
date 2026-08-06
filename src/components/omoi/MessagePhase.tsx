// src/components/omoi/MessagePhase.tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ループ用に画像を定義
const SIDE_IMAGES = [
  { src: "/images/section3/scene1.webp", height: "h-[400px]" },
  { src: "/images/section3/scene2.webp", height: "h-[400px]" },
  { src: "/images/section3/scene3.webp", height: "h-[400px]" },
  { src: "/images/section3/scene4.webp", height: "h-[400px]" },
];
// 無限ループさせるために配列を2倍にする
const LOOPED_IMAGES = [...SIDE_IMAGES, ...SIDE_IMAGES];

export default function MessagePhase() {
  const containerRef = useRef<HTMLDivElement>(null);

  // コンテナ全体のスクロール進行度（0〜1）を取得
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ==========================================
  // スクロリーテリングの制御（Scene 1 -> Scene 2）
  // ==========================================
  // Scene 1: 0%〜40%は表示、40%〜60%で消える
  const scene1Opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5],
    [1, 1, 0],
  );
  const scene1BlurValue = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5],
    [0, 0, 12],
  );
  const scene1Filter = useMotionTemplate`blur(${scene1BlurValue}px)`;
  const scene1Visibility = useTransform(scrollYProgress, (v) =>
    v > 0.5 ? "hidden" : "visible",
  );

  // Scene 2: 40%〜60%で現れ、最後まで表示
  const scene2Opacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);
  const scene2BlurValue = useTransform(
    scrollYProgress,
    [0.4, 0.6, 1],
    [12, 0, 0],
  );
  const scene2Filter = useMotionTemplate`blur(${scene2BlurValue}px)`;

  // ==========================================
  // スクロリーテリングの制御（Scene 2 の放射アニメーション追加）
  // ==========================================

  // Scene 2テキストの出現共通
  const radialOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 0.6]);
  const radialScale = useTransform(scrollYProgress, [0.5, 0.75], [0.2, 1]);

  // 1. 「0社」
  const radialOpacity0 = useTransform(scrollYProgress, [0.5, 0.65], [0, 0.6]);
  const radialScale0 = useTransform(scrollYProgress, [0.5, 0.7], [0.2, 1]);
  const pos0_X = useTransform(scrollYProgress, [0.5, 0.75], ["0vw", "-18vw"]);
  const pos0_Y = useTransform(scrollYProgress, [0.5, 0.75], ["0vh", "22vh"]);
  // 2. 「3社」
  const radialOpacity3 = useTransform(scrollYProgress, [0.5, 0.6], [0, 0.6]);
  const radialScale3 = useTransform(scrollYProgress, [0.5, 0.7], [0.2, 1]);
  const pos3_X = useTransform(scrollYProgress, [0.5, 0.75], ["0vw", "-12vw"]);
  const pos3_Y = useTransform(scrollYProgress, [0.5, 0.75], ["0vh", "-18vh"]);
  // 3. 「10社」
  const radialOpacity10 = useTransform(scrollYProgress, [0.54, 0.69], [0, 0.6]);
  const radialScale10 = useTransform(scrollYProgress, [0.54, 0.74], [0.2, 1]);
  const pos10_X = useTransform(scrollYProgress, [0.5, 0.75], ["0vw", "18vw"]);
  const pos10_Y = useTransform(scrollYProgress, [0.5, 0.75], ["0vh", "-12vh"]);
  // 4. 「それ以上」
  const radialOpacityMore = useTransform(
    scrollYProgress,
    [0.56, 0.71],
    [0, 0.6],
  );
  const radialScaleMore = useTransform(scrollYProgress, [0.56, 0.76], [0.2, 1]);
  const posMore_X = useTransform(scrollYProgress, [0.5, 0.75], ["0vw", "20vw"]);
  const posMore_Y = useTransform(scrollYProgress, [0.5, 0.75], ["0vh", "20vh"]);

  return (
    <section
      ref={containerRef}
      // スクロール領域を確保（3画面分の高さ）
      className="relative w-full h-[300vh] bg-midblue"
    >
      {/* 画面に固定（FIX）されるコンテナ */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex items-center justify-center">
        {/* ==========================================
            背景レイヤー（最背面）
        ========================================== */}
        <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
          {/* Scene 1 背景（シャッター街） */}
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

          {/* Scene 2 背景（ネットワーク図など） */}
          <motion.div
            style={{
              opacity: scene2Opacity,
              filter: scene2Filter,
              willChange: "opacity, filter",
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/section3/bg-2.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
          </motion.div>

          {/* 可読性担保のダークオーバーレイ */}
          <div className="absolute inset-0 bg-midblue/60 mix-blend-multiply" />
        </div>

        {/* ==========================================
            左右の無限ループ画像（PC版）
        ========================================== */}
        {/* PC左側: 下から上へ */}
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          // 👇 修正: 誤タップ防止のため pointer-events-none を追加
          className="absolute left-[2%] top-0 w-[20%] hidden md:flex flex-col gap-6 z-10 will-change-transform pointer-events-none"
          aria-hidden="true"
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

        {/* PC右側: 上から下へ */}
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          className="absolute right-[2%] top-0 w-[20%] hidden md:flex flex-col gap-6 z-10 will-change-transform pointer-events-none"
          aria-hidden="true"
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

        {/* ==========================================
            上下の無限ループ画像（スマホ版）
        ========================================== */}
        {/* スマホ上部（元左側）: 左から右へ（-50% から 0% へ移動） */}
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          // 👇 ポイント: flex-row と w-max で横並びの無限領域を確保
          className="absolute top-[5%] left-0 h-[20vh] flex md:hidden flex-row gap-4 z-10 will-change-transform pointer-events-none w-max"
          aria-hidden="true"
        >
          {LOOPED_IMAGES.map((img, index) => (
            <div
              key={`sp-top-${index}`}
              className="relative h-full w-[60vw] rounded-lg overflow-hidden"
            >
              {/* スマホ用に sizes を 60vw に最適化 */}
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

        {/* スマホ下部（元右側）: 右から左へ（0% から -50% へ移動） */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          className="absolute bottom-[5%] left-0 h-[20vh] flex md:hidden flex-row gap-4 z-10 will-change-transform pointer-events-none w-max"
          aria-hidden="true"
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
            className="absolute flex flex-col gap-8 md:gap-16 w-full pointer-events-none"
          >
            {/* 子要素1：見出しの「入室（ブラーイン）」を whileInView で制御 */}
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

            {/* 子要素2：本文の「入室（ブラーイン）」を whileInView で制御（少しディレイ） */}
            <motion.p
              className="text-sm md:text-xl leading-normal text-white/80 drop-shadow-md"
              initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              style={{ willChange: "opacity, filter, transform" }}
            >
              活気のあった商店街にはシャッターが下りている。
              <br />
              変化は、ある日突然ではなく、気づかないほど静かに進んでいる。
            </motion.p>
          </motion.div>

          {/* Scene 2 テキスト（ワイヤーフレーム準拠） */}
          <motion.div
            style={{
              opacity: scene2Opacity,
              filter: scene2Filter,
              willChange: "opacity, filter",
            }}
            className="absolute inset-0 flex flex-col items-center justify-center w-full h-full"
          >
            {/* 📸 放射状に広がる背景要素（テキストの背面に配置） */}
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
                <div className="flex items-end  text-2xl">
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
                <div className="flex items-end  text-2xl">
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
                <div className="flex items-end  text-2xl">
                  <span className="text-5xl md:text-8xl mr-1">10</span>社
                </div>
              </motion.div>

              {/* それ以上 */}
              <motion.div
                style={{
                  opacity: radialOpacityMore,
                  scale: radialScaleMore,
                  x: posMore_X,
                  y: posMore_Y,
                  willChange: "transform, opacity",
                }}
                className="absolute flex items-center justify-center w-24 md:w-32 aspect-square rounded-full border border-white/40 text-2xl text-white flex-col leading-tight"
              >
                <span className="text-lg md:text-3xl">それ</span>
                <span className="text-lg md:text-3xl">以上</span>
              </motion.div>
            </div>

            {/* メインテキスト（前面 z-10） */}
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
    </section>
  );
}
