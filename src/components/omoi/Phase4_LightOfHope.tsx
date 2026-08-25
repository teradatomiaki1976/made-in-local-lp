// src/components/omoi/Phase4_LightOfHope.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Phase4_LightOfHope({ scrollYProgress }: Props) {
  // 💡 0.5からテキスト出現、0.8で消えて光にバトンタッチ
  const textOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.55, 0.75, 0.8],
    [0, 1, 1, 0],
  );
  const textY = useTransform(scrollYProgress, [0.5, 0.55], [30, 0]);

  // 🚨 光は絶対にフェードアウトさせず、画面を白く覆い尽くすまで拡大！
  const glowScale = useTransform(scrollYProgress, [0.8, 1, 1], [0, 15, 15]);
  const glowOpacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);

  return (
    // 🚨 ここの style={{ opacity: phaseOpacity }} を削除し通常の div に変更！
    <div className="absolute inset-0 w-full h-full z-30 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* 逆光・フレアのエフェクトレイヤー */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* 背景色を白（creem）と同化させる */}
        <div className="w-[40vw] aspect-square rounded-full bg-creem blur-[80px]" />
      </motion.div>

      {/* テキストレイヤー */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 w-full max-w-5xl px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 text-white"
      >
        <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight flex-1 drop-shadow-lg">
          まだ知られていない
          <br />
          価値を届ける
        </h2>
        <div className="flex-1 flex flex-col gap-6 text-sm md:text-lg leading-relaxed opacity-90 drop-shadow-md">
          <p>
            すでに知られているものを、
            <br />
            追いかけるためのメディアではない。
          </p>
          <p>
            まだ知られていなかった企業と、
            <br />
            人々が初めて出会う機会をつくる。
          </p>
          <p>
            今まで光が当たらなかった地域や業界が、
            <br />
            誰かの目に留まるきっかけをつくる。
          </p>
          <p>
            大切にしてきた価値を、
            <br />
            次の世代へつなぐ。
          </p>
          <p>
            そのために、
            <br />
            私たちはメディアという方法を選んだ。
          </p>
        </div>
      </motion.div>
    </div>
  );
}
