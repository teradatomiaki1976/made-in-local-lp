// src/components/omoi/Phase4_LightOfHope.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Phase4_LightOfHope({ scrollYProgress }: Props) {
  // 💡 追加：背景のクロスフェード制御
  // Phase3が0.45〜0.5で消えゆくのと交差するように、0.45〜0.5で背景をフェードインさせる
  const bgOpacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);

  // 💡 テキストのアニメーション
  const textOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.55, 0.82, 0.88],
    [0, 1, 1, 0],
  );
  const textY = useTransform(scrollYProgress, [0.5, 0.55], [30, 0]);

  // 光のアニメーション
  const glowScale = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 15, 15]);
  const glowOpacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);

  return (
    <div className="absolute inset-0 w-full h-full z-30 flex items-center justify-center overflow-hidden pointer-events-none">
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 w-full h-full -z-20"
      >
        <div className="absolute inset-0 bg-deepblue/40 z-10" />
        <Image
          src="/images/section3/bg-kurayami.jpg"
          alt="暗闇背景"
          fill
          className="object-cover opacity-80"
          priority
        />
      </motion.div>

      {/* 逆光・フレアのエフェクトレイヤー */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="w-[40vw] aspect-square rounded-full bg-creem blur-[80px]" />
      </motion.div>

      {/* テキストレイヤー */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-30 w-full px-6 flex flex-col items-center justify-between gap-6 md:gap-12 text-white"
      >
        <h2 className="text-center text-3xl md:text-6xl font-serif font-bold leading-tight flex-1 drop-shadow-lg">
          日本の宝である
          <br />
          地域の企業に光を
          <br />
          あてないといけない
        </h2>
        <div className="flex-1 flex max-w-4xl flex-col gap-6 text-center text-base md:text-2xl leading-relaxed drop-shadow-md">
          <p>
            地域の企業が元気になれば
            <br />
            必ず世界と戦える日本が戻ってくる。
          </p>
        </div>
      </motion.div>
    </div>
  );
}
