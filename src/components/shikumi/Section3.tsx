// src/components/shikumi/Section3.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";

export default function Section3() {
  // --- アニメーションの定義（variants） ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
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

  const leftSlide: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const rightSlide: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  // 【修正】左右が中央に近づいたタイミング（0.6秒後）で「×」を出現させる
  const crossPop: Variants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.6, ease: "backOut" },
    },
  };

  // 【新規追加】下部カード専用のVariant。「×」が出た後（1.2秒後）にフェードイン
  const cardsFadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section
      id="section3"
      className="relative w-full bg-[#0a1128] z-20 text-white py-24 md:py-32 overflow-hidden"
    >
      {/* 背景グラデーションとノイズ */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(-160deg,#19324D_0%,#19324D_50%,#00518B_66%,#19324D_78%,#19324D_100%)]">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* コンテンツレイヤー */}
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-12 md:mb-16"
        >
          <motion.div variants={itemFadeUp} className="mb-8 md:mb-12">
            <span className="bg-[linear-gradient(135deg,#FFFFFF_32%,#DDDDDD_53%,#BABABA_67%,#E2E2E2_76%,#FFFFFF_88%)] text-[#19324D] text-xs md:text-sm font-bodoni tracking-widest px-6 py-1 shadow-sm">
              What determines it?
            </span>
          </motion.div>
          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            何をもって、地域を代表とするのか？
          </Heading2>
          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            その審査基準は
          </Text>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.6 } },
          }}
          className="relative w-full max-w-4xl flex flex-col items-center justify-center"
        >
          <div className="relative w-full flex flex-row items-center justify-center px-4 md:px-12 mb-12 md:mb-16 z-20">
            <motion.div variants={leftSlide} className="text-center -mt-10">
              <div className="text-[#FFD666] text-center text-xl md:text-5xl font-medium italic leading-relaxed tracking-wider">
                知られるべき
                <br />
                <span className="text-5xl md:text-7xl italic tracking-wider bg-gradient-to-b from-[#FFD666] to-[#C3A800] bg-clip-text text-transparent">
                  魅力
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={crossPop}
              className="relative shrink-0 w-10 h-10 md:w-20 md:h-20 flex items-center justify-center mx-2 md:mx-10 opacity-80"
            >
              <div className="absolute w-[1px] h-full bg-white transform -rotate-45"></div>
              <div className="absolute w-[1px] h-[250%] bg-white transform rotate-45"></div>
            </motion.div>

            <motion.div
              variants={rightSlide}
              className="text-center pt-15 -ml-1 md:pt-20 md:ml-0"
            >
              <div className="text-[#FFD666] text-center text-xl md:text-5xl font-medium italic leading-relaxed tracking-wider">
                未来への
                <br />
                <span className="text-5xl md:text-7xl italic tracking-wider bg-gradient-to-b from-[#FFD666] to-[#C3A800] bg-clip-text text-transparent">
                  意志
                </span>
              </div>
            </motion.div>
          </div>

          {/* --- 解説カード --- */}
          <motion.div
            variants={cardsFadeUp}
            className="w-full flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-10 z-10"
          >
            {/* 左カード */}
            <div className="flex-1 rounded-md p-3 md:p-5 shadow-lg text-text flex flex-col text-left bg-[linear-gradient(160deg,#ffffff_0%,#ffffff_29%,#ececec_47%,#ffffff_62%,#bcbcbc_80%,#ececec_100%)]">
              <h3 className="text-3xl md:text-4xl leading-tight font-bold mb-4 text-center bg-[linear-gradient(160deg,#003064_32%,#004895_53%,#0069DA_67%,#004289_76%,#003064_88%)] bg-clip-text text-transparent">
                企業独自の
                <br />
                魅力を見る
              </h3>
              <div className="flex flex-col items-center justify-center gap-4 bg-white p-2 md:p-4">
                <p className="text-base md:text-lg font-bold text-center">
                  その企業ならではの
                  <br />
                  もっと知られるべき価値
                </p>
                <p className="text-xs md:text-sm font-sans leading-relaxed">
                  企業が独自に保有している技術や、製品・サービスの革新性、独自のビジネスモデル、事業の社会的意義などを見て、「地域を代表する企業100選」にふさわしい企業かを判断します。
                </p>
              </div>
            </div>

            {/* 右カード */}
            <div className="flex-1 rounded-md p-3 md:p-5 shadow-lg text-text flex flex-col text-left bg-[linear-gradient(160deg,#ffffff_0%,#ffffff_29%,#ececec_47%,#ffffff_62%,#bcbcbc_80%,#ececec_100%)]">
              <h3 className="text-3xl md:text-4xl leading-tight font-bold mb-4 text-center bg-[linear-gradient(160deg,#003064_32%,#004895_53%,#0069DA_67%,#004289_76%,#003064_88%)] bg-clip-text text-transparent">
                地域の未来
                <br />
                への意志を見る
              </h3>
              <div className="flex flex-col items-center justify-center gap-4 bg-white p-2 md:p-4">
                <p className="text-base md:text-lg font-bold text-center mb-4">
                  その価値を地域の未来に
                  <br />
                  どう繋げようとしているか
                </p>
                <p className="text-xs md:text-sm font-sans leading-relaxed">
                  地域をより良くしたいという想い、経営者が描く未来像、その実現に向けた意志などを見て、「地域を代表する企業100選」にふさわしい企業かを判断します。
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
