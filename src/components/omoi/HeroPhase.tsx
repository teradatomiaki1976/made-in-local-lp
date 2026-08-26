// src/components/omoi/HeroPhase.tsx
"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
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
    className: "top-[5%] left-[5%] w-32 md:w-120",
  },
  {
    src: "/images/photo/scene2.webp",
    className: "top-[35%] left-[20%] w-60 md:w-80",
  },
  {
    src: "/images/photo/scene3.webp",
    className: "top-[15%] right-[10%] w-36 md:w-56",
  },
  {
    src: "/images/photo/scene4.webp",
    className: "top-[40%] right-[15%] w-48 md:w-100",
  },
  {
    src: "/images/photo/scene5.webp",
    className: "top-[60%] left-[4%] w-32 md:w-48",
  },
  {
    src: "/images/photo/scene6.webp",
    className: "top-[75%] left-[10%] w-40 md:w-80",
  },
  {
    src: "/images/photo/scene7.webp",
    className: "top-[55%] right-[8%] w-36 md:w-64",
  },
  {
    src: "/images/photo/scene8.webp",
    className: "top-[85%] right-[20%] w-48 md:w-120",
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
  // Zustandの更新関数のみ取得（state全体を取得しないことで不要な再レンダリングを防ぐ）
  const setIsDarkBg = useHeaderStore((state) => state.setIsDarkBg);

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const svgScale = useTransform(scrollYProgress, [0.1, 0.3, 0.75], [0, 5, 12]);
  const willChange = useTransform(scrollYProgress, (val) =>
    val < 0.7 ? "transform" : "auto",
  );
  const svgY = useTransform(scrollYProgress, [0.25, 0.65], ["40vh", "0vh"]);
  const blueFillOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
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

  // 👇 （あるいは、アニメーションの進行度に合わせて背景が青くなる[0.65~]タイミングで切り替えるならこちら）
  // useMotionValueEvent(scrollYProgress, "change", (latestProgress) => {
  //   const isDark = latestProgress > 0.65; // 背景が青くなり始めるタイミング
  //   if (useHeaderStore.getState().isDarkBg !== isDark) {
  //     setIsDarkBg(isDark);
  //   }
  // });

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
    }, 4000);

    // 2. ヘッダーのインアニメーション(例:0.5秒)完了後にスクロールロックを解除 (合計5.0秒後)
    const unlockTimer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    }, 4500);

    // アンマウント時（途中で別ページへ遷移した際など）に確実にロックを解除するクリーンアップ
    return () => {
      clearTimeout(headerTimer);
      clearTimeout(unlockTimer);
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [onShowHeader]);

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] bg-creem">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* --- 1. 背景画像の無限浮遊レイヤー --- */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[200vh] flex flex-col z-0 pointer-events-none"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          style={{ willChange: "transform" }}
        >
          <div className="relative w-full h-screen">
            {BASE_IMAGES.map((img, index) => (
              <motion.img
                key={`b1-${index}`}
                src={img.src}
                className={`absolute object-cover rounded-md shadow-md ${img.className}`}
                initial={{ opacity: 0, filter: "grayscale(100%) blur(10px)" }}
                animate={{ opacity: 0.8, filter: "grayscale(0%) blur(0px)" }}
                transition={{
                  delay: 4.0 + index * 0.2,
                  duration: 3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
          <div className="relative w-full h-screen">
            {BASE_IMAGES.map((img, index) => (
              <motion.img
                key={`b2-${index}`}
                src={img.src}
                className={`absolute object-cover rounded-md shadow-md ${img.className}`}
                initial={{ opacity: 0, filter: "grayscale(100%) blur(10px)" }}
                animate={{ opacity: 0.6, filter: "grayscale(0%) blur(0px)" }}
                transition={{
                  delay: 5 + index * 0.25,
                  duration: 3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* --- 2. 中央メッセージテキスト --- */}
        <motion.div className="relative z-10 flex flex-col items-center text-center pointer-events-none py-60 px-24 rounded-full bg-[radial-gradient(circle,#fefbf1_30%,transparent_60%)]">
          <h1
            className="font-serif font-bold md:font-semibold text-5xl md:text-8xl leading-tight text-nowrap"
            aria-label="地域から本気で日本を変えたい"
          >
            <span aria-hidden="true">
              <AnimatedWord text="地域から" delay={0.5} />
              <span className="inline-block" />
              <AnimatedWord text="本気で" delay={1.4} />
              <br />
              <AnimatedWord text="日本を変えたい" delay={2.6} />
            </span>
          </h1>
          <motion.div
            className="mt-16 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 5.5, duration: 1.5, ease: "easeOut" }}
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
          style={{
            scale: svgScale,
            y: svgY,
            originX: 0.5,
            originY: 0.5,
            // GPUレンダリングのバグを防ぐ
            // transformPerspective: 1000,
            // translateZ: 0,
            // willChange,
          }}
          className="absolute z-20 w-[500vw] max-w-[1500px] text-midblue flex items-center justify-center pointer-events-none"
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
            自分が生まれ育った地域が
            <br />
            10年後どうなっているか
          </h2>
          <p className="text-sm md:text-xl leading-normal">
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
