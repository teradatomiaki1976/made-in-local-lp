// src/components/omoi/HeroPhase.tsx
"use client";
import { cn } from "@/lib/utils";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  Variants,
} from "framer-motion";

type HeroPhaseProps = {
  onShowHeader: () => void;
};

const BASE_IMAGES = [
  {
    src: "/images/loading/scene1.webp",
    className: "top-[5%] left-[5%] w-32 md:w-120",
  },
  {
    src: "/images/loading/scene2.webp",
    className: "top-[35%] left-[20%] w-60 md:w-80",
  },
  {
    src: "/images/loading/scene3.webp",
    className: "top-[15%] right-[10%] w-36 md:w-56",
  },
  {
    src: "/images/loading/scene4.webp",
    className: "top-[40%] right-[15%] w-48 md:w-100",
  },
  {
    src: "/images/loading/scene5.webp",
    className: "top-[60%] left-[4%] w-32 md:w-48",
  },
  {
    src: "/images/loading/scene6.webp",
    className: "top-[75%] left-[10%] w-40 md:w-80",
  },
  {
    src: "/images/loading/scene7.webp",
    className: "top-[55%] right-[8%] w-36 md:w-64",
  },
  {
    src: "/images/loading/scene8.webp",
    className: "top-[85%] right-[20%] w-48 md:w-120",
  },
];

// メインテキストのアニメーション制御（子要素の順番に従って表示）
const wordContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delayStart: number) => ({
    opacity: 1,
    transition: {
      delayChildren: delayStart,
      staggerChildren: 0.1,
    },
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

  // 日本地図の出現タイミングをスクロールに応じて制御するためのフック
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 0.3〜0.75: 地図の移動＆拡大
  // 0.65〜0.8: 青背景で画面を覆い尽くす
  // 0.8〜0.95: テキストのブラーイン
  const svgScale = useTransform(scrollYProgress, [0.1, 0.3, 0.75], [0, 5, 120]);
  const svgY = useTransform(scrollYProgress, [0.25, 0.65], ["40vh", "0vh"]);
  const blueFillOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      onShowHeader();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onShowHeader]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-[150vh] bg-base-creem")}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* --- 1. 背景画像の無限浮遊レイヤー --- */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[200vh] flex flex-col z-0 pointer-events-none"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          style={{ willChange: "transform" }}
        >
          {/* ブロック1 */}
          <div className="relative w-full h-[100vh]">
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
          {/* ブロック2 */}
          <div className="relative w-full h-[100vh]">
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

        {/* --- 2. 中央メッセージテキスト（FVの主役） --- */}
        <motion.div className="relative z-10 flex flex-col items-center text-center pointer-events-none py-48 px-16 rounded-full bg-[radial-gradient(circle,#fefbf1_40%,transparent_80%)]">
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
            transition={{
              delay: 5.5,
              duration: 1.5,
              ease: "easeOut",
            }}
          >
            <span className="font-serif text-xs md:text-lg tracking-widest">
              Scroll
            </span>
            <div className="relative w-px h-12 overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-base/50" />
              <motion.div
                className="absolute w-full h-1/2 bg-base"
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

        {/* =========================================================
            5. 青背景の上のテキストレイヤー
        ========================================================= */}
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
          <p className="text-sm md:text-xl font-serif leading-normal">
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
