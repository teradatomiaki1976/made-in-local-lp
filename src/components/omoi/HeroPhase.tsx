// src/components/omoi/HeroPhase.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  Variants,
  useMotionValueEvent,
} from "framer-motion";
import { useHeaderStore } from "@/store/useHeaderStore";
import JapanMapSVG from "./JapanMapSVG";

type HeroPhaseProps = {
  onShowHeader: () => void;
};

const BASE_IMAGES = [
  {
    src: "/images/photo/scene1.webp",
    className: "top-[0%] left-[0%] md:top-[10%] md:left-[0%] w-40 md:w-80",
  },
  {
    src: "/images/photo/scene2.webp",
    className: "top-[20%] left-[-10%] md:top-[40%] md:left-[10%] w-50 md:w-80",
  },
  {
    src: "/images/photo/scene3.webp",
    className: "top-[10%] right-[-5%] md:top-[10%] md:right-[5%] w-36 md:w-64",
  },
  {
    src: "/images/photo/scene4.webp",
    className: "top-[35%] right-[-5%] md:top-[35%] md:right-[15%] w-48 md:w-90",
  },
  {
    src: "/images/photo/scene5.webp",
    className: "top-[50%] left-[0%] md:top-[60%] md:left-[4%] w-42 md:w-56",
  },
  {
    src: "/images/photo/scene6.webp",
    className: "top-[80%] left-[5%] md:top-[80%] md:left-[15%] w-40 md:w-90",
  },
  {
    src: "/images/photo/scene7.webp",
    className: "top-[65%] right-[-5%] md:top-[65%] md:right-[5%] w-40 md:w-64",
  },
  {
    src: "/images/photo/scene8.webp",
    className:
      "top-[85%] right-[-5%] md:top-[85%] md:right-[10%] w-42 md:w-100",
  },
];

const wordContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delayStart: number) => ({
    opacity: 1,
    transition: { delayChildren: delayStart, staggerChildren: 0.1 },
  }),
};
const charVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 5 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
const AnimatedWord = ({ text, delay }: { text: string; delay: number }) => (
  <motion.span
    className="inline-block"
    custom={delay}
    variants={wordContainerVariants}
    initial="hidden"
    animate="visible"
  >
    {text.split("").map((char, index) => (
      <motion.span key={index} variants={charVariants} className="inline-block">
        {char}
      </motion.span>
    ))}
  </motion.span>
);

export default function HeroPhase({ onShowHeader }: HeroPhaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setIsDarkBg = useHeaderStore((state) => state.setIsDarkBg);

  // 1. スマホ判定用のStateを追加
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 768px以下をスマホとする
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. スマホとPCでスケール倍率を分岐
  const rawSvgScale = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.8],
    isMobile
      ? [0.9, 5, 12] // スマホ用
      : [0.6, 10, 18], // PC用
  );
  const svgScale = useSpring(rawSvgScale, { stiffness: 100, damping: 30 });

  // 3. (オプション) Y軸の移動量もスマホ用に微調整可能
  const rawSvgY = useTransform(
    scrollYProgress,
    [0.25, 0.65],
    isMobile
      ? ["25vh", "0vh"] // スマホは画面が縦長なので少し調整
      : ["32vh", "0vh"],
  );
  const svgY = useSpring(rawSvgY, { stiffness: 100, damping: 30 });

  const blueFillOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);
  const firstTextOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 1.0],
    [0, 1, 1],
  );
  const textBlurValue = useTransform(
    scrollYProgress,
    [0.4, 0.5, 1.0],
    [10, 0, 0],
  );
  const firstTextFilter = useMotionTemplate`blur(${textBlurValue}px)`;

  // 👇 【最適化版】Framer Motionのイベントを利用した状態更新
  // `useMotionValueEvent` はスクロール値が変化した時だけ発火し、Reactのライフサイクルと相性が良い
  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    const isDark = latestScrollY > 300;

    // 現在のZustandの状態と違う場合のみ更新（無駄なRe-renderを防止）
    if (useHeaderStore.getState().isDarkBg !== isDark) {
      setIsDarkBg(isDark);
    }
  });

  // コンポーネントがアンマウントされる時に状態をリセット
  useEffect(() => {
    return () => setIsDarkBg(false);
  }, [setIsDarkBg]);

  useEffect(() => {
    // 現在のスタイルを保存（他ページからの遷移時などを考慮）
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    // スクロールをロック（iOS Safariのバウンス対策としてtouchActionも無効化）
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // 1. ヘッダーを表示させるタイミング (4.5秒後)
    const headerTimer = setTimeout(() => {
      onShowHeader();
    }, 3000);

    // 2. ヘッダーのインアニメーション(例:0.5秒)完了後にスクロールロックを解除 (合計5.0秒後)
    const unlockTimer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    }, 3500);

    // アンマウント時（途中で別ページへ遷移した際など）に確実にロックを解除するクリーンアップ
    return () => {
      clearTimeout(headerTimer);
      clearTimeout(unlockTimer);
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [onShowHeader]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-creem">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* --- 1. 背景画像の無限浮遊レイヤー --- */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[200vh] flex flex-col z-0 pointer-events-none"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {/* 1セット目 */}
          <div className="relative w-full h-screen">
            {BASE_IMAGES.map((img, index) => (
              <motion.img
                key={`b1-${index}`}
                src={img.src}
                className={`absolute object-cover rounded-md shadow-md ${img.className} will-change-transform`}
                initial={{ opacity: 0, filter: "grayscale(100%) blur(10px)" }}
                animate={{ opacity: 0.8, filter: "grayscale(0%) blur(0px)" }} // ここを統一
                transition={{
                  delay: 4.0 + index * 0.2, // ここを統一
                  duration: 3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
          {/* 2セット目（ループのつなぎ目） */}
          <div className="relative w-full h-screen">
            {BASE_IMAGES.map((img, index) => (
              <motion.img
                key={`b2-${index}`}
                src={img.src}
                className={`absolute object-cover rounded-md shadow-md ${img.className} will-change-transform`}
                initial={{ opacity: 0, filter: "grayscale(100%) blur(10px)" }}
                animate={{ opacity: 0.8, filter: "grayscale(0%) blur(0px)" }} // b1と完全に一致させる
                transition={{
                  delay: 4.0 + index * 0.2, // b1と完全に一致させる
                  duration: 3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* --- 2. 中央メッセージテキスト --- */}
        <motion.div className="relative z-10 flex flex-col items-center text-center pointer-events-none py-80 px-48 rounded-full bg-[radial-gradient(circle,#fefbf1_30%,transparent_60%)]">
          <h1
            className="font-serif font-bold md:font-semibold text-[2.4rem] md:text-8xl leading-tight text-nowrap text-shadow-lg text-shadow-white"
            aria-label="地域から本気で日本を変えたい"
          >
            <span aria-hidden="true">
              <AnimatedWord text="地域から" delay={0.4} />
              <span className="inline-block" />
              <AnimatedWord text="本気で" delay={1.0} />
              <br />
              <AnimatedWord text="日本を変えたい" delay={1.6} />
            </span>
          </h1>
          <motion.div
            className="mt-12 md:mt-16 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 4.5, duration: 1.5, ease: "easeOut" }}
          >
            <span className="font-serif text-xs md:text-lg tracking-widest">
              Scroll
            </span>
            <div className="relative w-px h-20 overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-midblue/50" />
              <motion.div
                className="absolute w-full h-1/2 bg-midblue"
                initial={{ y: "-100%" }}
                animate={{ y: "200%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* --- 3. 日本地図レイヤー --- */}
        <motion.div
          // 初期状態を透明、時間経過でフェードイン
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2.8,
            duration: 2.8,
            ease: "easeOut",
          }}
          style={{
            scale: svgScale,
            y: svgY,
            originX: 0.5, // 今後、フォーカス先（東京など）に合わせて微調整する
            originY: 0.5,
            z: 0, // Framer Motionにおける translateZ(0) の指定
          }}
          className="absolute z-20 w-full max-w-[800px] text-midblue flex items-center justify-center pointer-events-none"
        >
          <JapanMapSVG
            className="w-full h-auto object-contain"
            aria-hidden="true"
          />
        </motion.div>

        {/* --- 4. 完全な青色塗りつぶしレイヤー --- */}
        <motion.div
          style={{ opacity: blueFillOpacity }}
          className="absolute inset-0 z-30 bg-midblue pointer-events-none"
        />

        {/* --- 5. 青背景の上のテキストレイヤー --- */}
        <motion.div
          style={{
            opacity: firstTextOpacity,
            filter: firstTextFilter,
            willChange: "opacity, filter",
          }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center w-full gap-10 px-4 text-center text-white pointer-events-none"
        >
          <h2 className="font-serif text-3xl md:text-7xl font-bold leading-tight">
            自分が生まれ育った
            <br />
            地域が10年後
            <br />
            どうなっているか
          </h2>
          <p className="text-base md:text-2xl leading-normal">
            具体的に考えたことがあるだろうか。
            <br />
            ずっと変わらないと思っていた故郷も、
            <br className="block md:hidden" />
            少しずつ姿を変えている。
          </p>
        </motion.div>
      </div>
    </div>
  );
}
