// src/components/shikumi/IntroLeftBrain.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

// --- サブコンポーネント: 1文字ずつのアニメーション制御 ---
const Char = ({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  // 全文字数に対して、この文字が変化し始めるタイミングと終わるタイミングを計算
  const step = 1 / total;
  const start = index * step;
  const end = start + step;

  // スクロール進行度に応じて色を #4990DB から #FFFFFF へ変化
  const color = useTransform(progress, [start, end], ["#4990DB", "#FFFFFF"]);

  // 改行文字の処理（PC時のみ改行など、レスポンシブ対応）
  if (char === "\n") {
    return <br className="hidden md:block" />;
  }

  return <motion.span style={{ color }}>{char}</motion.span>;
};

export default function IntroLeftBrain() {
  const containerRef = useRef<HTMLDivElement>(null);

  // スクロール検知
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // アニメーションの開始・終了位置を調整
    // 画面下部80%から始まり、中央(50%)に到達するまでにテキストが全て白くなる設定
    offset: ["start 80%", "center 50%"],
  });

  // アニメーションさせるテキスト（\n で改行位置を指定）
  const leadText =
    "地域には、まだ十分に知られていないだけで、独自の技術を持つ会社。\n新しい産業をつくる会社。\n地域の暮らしを支える会社。\n未来に残すべき事業を続ける会社があります。\n\n「地域を代表する企業100選」は、売上や知名度だけでは見つけられない、地域の未来をつくる企業を発見し、選出し、その価値を社会へ伝えるプロジェクトです。";
  const characters = Array.from(leadText);

  return (
    <section
      id="introduction"
      className="relative w-full bg-gradient-to-b from-[#19324D] to-[#003E80] text-white py-24 md:py-32 flex flex-col items-center px-6 md:px-8 overflow-hidden"
    >
      {/* 1. 背景ノイズテクスチャ */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. コンテンツ群（ノイズの上に配置するため相対配置 z-10 を追加） */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Introduction ラベル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="bg-[linear-gradient(135deg,#FFFFFF_32%,#DDDDDD_53%,#BABABA_67%,#E2E2E2_76%,#FFFFFF_88%)] text-[#19324D] text-xs md:text-sm font-bodoni tracking-widest px-6 py-1.5 shadow-sm">
            Introduction
          </span>
        </motion.div>

        {/* メイン見出し */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            まだ知られていないだけ
          </h2>
        </motion.div>

        {/* スクロール連動テキストエリア */}
        <div
          ref={containerRef}
          className="max-w-4xl mx-auto w-full flex flex-col gap-8 md:gap-12"
        >
          {/* リードコピー (1文字ずつ色が変化) */}
          <div className="relative text-lg md:text-3xl leading-loose font-medium">
            {/* 【a11y対策】スクリーンリーダー用の不可視テキスト */}
            <p className="sr-only">{leadText.replace(/\n/g, "")}</p>

            {/* 視覚的なアニメーション用テキスト（音声読み上げからは除外） */}
            <p aria-hidden="true">
              {characters.map((char, index) => (
                <Char
                  key={index}
                  char={char}
                  index={index}
                  total={characters.length}
                  progress={scrollYProgress}
                />
              ))}
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-white text-xs border-t border-white/20 pt-6 mt-6 text-right"
            >
              地方創生メディア「Made In Local」が選定
            </motion.p>
          </div>
        </div>

        {/* CTAボタン[cite: 3] */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 md:mt-32 flex flex-col items-center w-full max-w-4xl"
        >
          <a
            href="https://madeinlocal.jp/contact/100selection"
            className="flex items-center justify-center gap-1.5 bg-linear-to-b from-[#007a8c] to-[#00535f] font-sans text-white leading-tight px-6 md:px-8 py-3.5 rounded-lg font-bold text-lg shadow-[0_4px_12px_rgba(0,42,92,0.4)] hover:from-[#008396] hover:to-[#005b68] hover:shadow-[0_6px_16px_rgba(0,42,92,0.5)] border border-[#00454f]/30 transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            <span className="absolute top-0 left-0 w-full h-px bg-white/20"></span>
            <FiChevronRight
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
            <span className="tracking-wide">エントリーについて相談する</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
