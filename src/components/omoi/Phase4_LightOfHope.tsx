// src/components/omoi/Phase4_LightOfHope.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image"; // 💡 Next.jsのImageコンポーネントを利用

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Phase4_LightOfHope({ scrollYProgress }: Props) {
  // 💡 テキストのアニメーション（既存）
  const textOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.55, 0.75, 0.8],
    [0, 1, 1, 0],
  );
  const textY = useTransform(scrollYProgress, [0.5, 0.55], [30, 0]);

  // 🚨 光のアニメーション（既存）
  const glowScale = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 15, 15]);
  const glowOpacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);

  // 🌟 追加：100選ロゴ（エンブレム）のアニメーション
  // 0.85（光が白く覆い始める頃）からフェードイン＆拡大開始。
  // 0.95で最大・くっきり表示され、1.0（セクション終わり）に向けてフェードアウト。
  const logoOpacity = useTransform(
    scrollYProgress,
    [0.75, 0.8, 0.9, 1],
    [0, 1, 0.8, 0],
  );
  const logoScale = useTransform(
    scrollYProgress,
    [0.85, 0.95],
    [0.4, 1.8], // 小さい状態から少し大きくなるように調整（好みで1.5とかにしてもOK）
  );

  return (
    <div className="absolute inset-0 w-full h-full z-30 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* 逆光・フレアのエフェクトレイヤー */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="w-[40vw] aspect-square rounded-full bg-creem blur-[80px]" />
      </motion.div>

      {/* 🌟 追加：エンブレムロゴレイヤー */}
      <motion.div
        style={{ opacity: logoOpacity, scale: logoScale }}
        className="absolute inset-0 flex items-center justify-center z-20"
      >
        <div className="relative w-48 md:w-64 aspect-3/4 drop-shadow-2xl">
          {/* public/ 配下に emblem_dark.png を配置している想定 */}
          <Image
            src="/images/logo/emblem_dark.svg"
            alt="地域を代表する企業100選"
            fill
            className="object-contain"
            priority // 💡 演出のキモになる画像なので、事前読み込みを推奨
          />
        </div>
      </motion.div>

      {/* テキストレイヤー */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-30 w-full max-w-5xl px-6 flex flex-col items-center justify-between gap-12 text-white"
      >
        <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight flex-1 drop-shadow-lg">
          まだ知られていない価値を届ける
        </h2>
        <div className="flex-1 flex flex-col gap-6 text-base md:text-xl leading-relaxed opacity-90 drop-shadow-md">
          <p>
            すでに知られているものを、追いかけるためのメディアではない。大切にしてきた価値を、次の世代へつなぐ。そのために、私たちはメディアという方法を選んだ。
          </p>
        </div>
      </motion.div>
    </div>
  );
}
