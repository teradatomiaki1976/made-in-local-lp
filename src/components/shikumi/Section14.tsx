// src/components/shikumi/Section14.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Section";

export default function Section14() {
  // --- タイムライン設計（秒数） ---
  const COLLAGE_LAYERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 枚数
  const STAGGER_DELAY = 0.4; // 1枚ごとの出現間隔
  const OVERLAY_START_TIME = 0.4;

  // --- アニメーションの定義 ---

  // 1. コラージュ画像の順次出現（擬似ランダム）
  const collageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom * STAGGER_DELAY,
        duration: 1.2,
        ease: "easeOut",
      },
    }),
  };

  // 2. 最終的なオーバーレイ（ブラー）の出現
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: OVERLAY_START_TIME,
        duration: 3.0,
        ease: "easeInOut",
      },
    },
  };

  // 3. タイポグラフィ（知られるべき魅力 × 未来への意志）
  const leftSlide: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: OVERLAY_START_TIME,
        ease: "easeOut",
      },
    },
  };

  const rightSlide: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: OVERLAY_START_TIME,
        ease: "easeOut",
      },
    },
  };

  const crossPop: Variants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: OVERLAY_START_TIME + 0.6, // 文字が出た直後に「×」をポップ
        ease: "backOut",
      },
    },
  };

  // 4. キャッチコピー（まずは、私たちにぶつけてください。）
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: OVERLAY_START_TIME + 0.8, // 「×」が出た後にテキストを出す
        staggerChildren: 0.3,
      },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Section id="section14">
      {/* --- 擬似ランダム画像エリア --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        {COLLAGE_LAYERS.map((layer, index) => (
          <motion.div
            key={layer}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -200px 0px" }}
            variants={collageVariants}
            className="absolute inset-0 w-full h-full will-change-transform will-change-opacity"
          >
            <Image
              src={`/images/shikumi/section14/collage-layer-${layer}.webp`}
              alt={`地方企業の現場写真 ${layer}`}
              fill
              sizes="100vw"
              className="object-cover object-center opacity-80"
              loading="lazy"
              quality={75} // パフォーマンスチューニング
            />
          </motion.div>
        ))}
      </div>

      {/* --- オーバーレイ（すりガラス＆白フェードイン） --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        variants={overlayVariants}
        className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm"
      />

      <Container className="relative z-20 flex flex-col items-center text-center">
        {/* --- 「魅力 × 意志」 タイポグラフィエリア --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full max-w-4xl flex flex-row items-center justify-center md:px-12 mb-12 md:mb-16"
        >
          {/* 左側 */}
          <motion.div variants={leftSlide} className="text-center">
            <div className="text-[#003064] text-center text-lg md:text-4xl font-medium italic leading-relaxed tracking-wider bg-[linear-gradient(160deg,#003064_32%,#004895_53%,#0069DA_67%,#004289_76%,#003064_88%)] bg-clip-text text-transparent">
              知られるべき
              <br />
              <span className="text-4xl md:text-7xl italic tracking-wider font-serif">
                魅力
              </span>
            </div>
          </motion.div>

          {/* クロスマーク */}
          <motion.div
            variants={crossPop}
            className="relative shrink-0 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center mx-4 md:mx-10"
          >
            <div className="absolute w-[1px] h-full bg-text transform -rotate-45"></div>
            <div className="absolute w-[1px] h-[250%] bg-text transform rotate-45"></div>
          </motion.div>

          {/* 右側 */}
          <motion.div
            variants={rightSlide}
            className="text-center pt-8 md:pt-16"
          >
            <div className="text-[#003064] text-center text-lg md:text-4xl font-medium italic leading-relaxed tracking-wider bg-[linear-gradient(160deg,#003064_32%,#004895_53%,#0069DA_67%,#004289_76%,#003064_88%)] bg-clip-text text-transparent">
              未来への
              <br />
              <span className="text-4xl md:text-7xl italic tracking-wider font-serif">
                意志
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* --- キャッチコピーエリア --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mb-12 md:mb-16"
        >
          <motion.div variants={itemFadeUp}>
            <Heading2 className="mb-6">
              まずは、私たちにぶつけてください。
            </Heading2>
          </motion.div>
          <motion.div variants={itemFadeUp}>
            <Text className="font-bold text-lg md:text-xl">
              あなたの会社にある魅力と、その先に描いている未来を聞かせてください。
            </Text>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
