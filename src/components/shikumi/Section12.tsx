// src/components/shikumi/Section12.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Section";

const initialSteps = [
  { id: 1, title: "担当者\nとの面談" },
  { id: 2, title: "エントリー" },
  { id: 3, title: "審査" },
];

const successSteps = [
  { id: 4, title: "選出企業特設\nページ制作" },
  { id: 5, title: "エンブレム\n認定証贈呈" },
  { id: 6, title: "入稿\nミーティング" },
];

export default function Section12() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Section id="section12" theme="light">
      <Container className="relative z-10 flex flex-col items-center">
        {/* タイトル周り */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16 text-center"
        >
          <div className="flex justify-center items-center mb-6 md:mb-8">
            <span className="bg-[linear-gradient(135deg,#003064_32%,#004895_53%,#0052AA_67%,#004289_76%,#003064_88%)] text-white text-xs md:text-sm font-bodoni tracking-widest px-6 py-1 shadow-md">
              Selection Process
            </span>
          </div>
          <Heading2>エントリーから選出後の活用</Heading2>
          <Text className="mt-4">
            まずは、担当者との面談から。
            <br className="hidden lg:block" />
            自社に選出の可能性があるのか。どのような基準で審査されるのか。
            <br className="hidden lg:block" />
            選出された場合、どのように活用できるのか。担当者との面談でご案内します。
          </Text>
        </motion.div>

        {/* フロー図本体 */}
        <div className="w-full max-w-5xl relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="flex flex-col gap-6 md:gap-8"
          >
            {/* Start と 1〜3のステップ */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-4 items-stretch">
              <motion.div variants={itemFadeUp} className="w-full md:w-1/4">
                <div className="bg-white border border-text/50 h-full py-2 rounded shadow-md text-2xl md:text-4xl font-bodoni text-text font-bold flex items-center justify-center">
                  Start <span className="ml-2 md:ml-4 text-lg">→</span>
                </div>
              </motion.div>

              <div className="w-full md:w-3/4 grid grid-cols-3 gap-2 md:gap-4">
                {initialSteps.map((step) => (
                  <motion.div
                    key={`step-${step.id}`}
                    variants={itemFadeUp}
                    // 💎 step.id が奇数なら #F1FDFF、偶数なら白
                    className={`border border-text/50 rounded shadow-md flex flex-col md:flex-row items-center justify-center p-2 md:p-5 text-center md:text-left gap-1 md:gap-3 ${
                      step.id % 2 !== 0 ? "bg-[#F1FDFF]" : "bg-white"
                    }`}
                  >
                    <span className="text-4xl md:text-7xl font-bodoni text-text/10 leading-none select-none">
                      {step.id}
                    </span>
                    <span className="font-bold font-sans text-sm md:text-xl text-text whitespace-pre-line leading-tight">
                      {step.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 分岐（選出 / 非選出） */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center">
              <motion.div
                variants={itemFadeUp}
                className="w-auto flex-1 bg-[#F2F2F2] border border-text/50 rounded-md text-center flex flex-col md:flex-row items-center justify-center p-4 shadow-md gap-2 mx-4 lg:mx-30"
              >
                <h3 className="font-bold text-text text-xl md:text-2xl">
                  選出に至らなかった場合
                </h3>
                <span className="hidden md:inline text-text">＞</span>
                <p className="text-sm md:text-base font-bold font-sans text-text">
                  1年後に再挑戦可能
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={itemFadeUp}
              className="relative w-auto h-[100px] md:h-[130px] rounded-md shadow-md overflow-hidden flex items-center justify-end mx-4 lg:mx-30 border border-text/50 bg-[linear-gradient(to_right,#E3C500_0%,#FFDD00_60%)]"
            >
              {/* 背景ロゴ（不透明度30%・左側に見切れるように配置） */}
              <div className="absolute -left-12 md:-left-10 top-0 md:-top-6 w-[200px] md:w-[400px] h-[200px] md:h-[400px] opacity-30 pointer-events-none select-none z-0">
                <Image
                  src="/images/logo/emblem_white.svg"
                  alt="100 SELECTION Emblem"
                  fill
                  className="object-contain"
                />
              </div>

              {/* テキスト部分（右側に配置して中央揃え） */}
              <div className="relative z-10 p-2 md:p-6 flex flex-col justify-center text-center text-text w-2/3 md:w-[60%] shrink-0">
                <h3 className="font-bold text-2xl md:text-4xl mb-1 md:mb-2 font-serif tracking-wide">
                  選出された場合
                </h3>
                <p className="text-sm md:text-base font-sans font-medium tracking-wide">
                  100選としての発信がここから始まります。
                </p>
              </div>
            </motion.div>

            {/* 選出後のフロー 4〜6 */}
            <div className="w-full grid grid-cols-3 gap-2 md:gap-4">
              {successSteps.map((step) => (
                <motion.div
                  key={`success-step-${step.id}`}
                  variants={itemFadeUp}
                  // 💎 ここも同様に奇数・偶数で背景色を切り替え
                  className={`border border-text/50 rounded shadow-md flex flex-col md:flex-row items-center justify-center p-2 md:p-5 text-center md:text-left gap-1 md:gap-3 ${
                    step.id % 2 !== 0 ? "bg-[#F1FDFF]" : "bg-white"
                  }`}
                >
                  <span className="text-4xl md:text-7xl font-bodoni text-text/10 leading-none select-none">
                    {step.id}
                  </span>
                  <span className="font-bold font-sans text-sm md:text-xl text-text whitespace-pre-line leading-tight">
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* 選出企業特設ページ公開 */}
            <motion.div
              variants={itemFadeUp}
              className="w-full bg-[#FCFAEC] border border-text2/50 rounded-md p-3 md:p-12 shadow-md flex flex-col items-center mt-2"
            >
              <h3 className="font-bold text-xl md:text-3xl text-text2 tracking-wider mb-6 md:mb-10">
                選出企業特設ページ公開
              </h3>

              {/* サムネイル画像グリッド (PC/SP共通で2x2) */}
              <div className="grid grid-cols-2 gap-2 md:gap-6 w-full max-w-4xl">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={`thumb-${num}`}
                    className="relative aspect-[16/9] w-full overflow-hidden shadow-md"
                  >
                    <Image
                      src={`/images/shikumi/section12/webpage-${num}.webp`}
                      alt={`特設ページ公開例 ${num}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>

              <div className="w-full max-w-4xl text-right mt-1 md:mt-3">
                <p className="text-[10px] md:text-sm text-text2 tracking-wide">
                  公開例：株式会社ユラク
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* --- Future --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemFadeUp}
          className="mt-10 md:mt-20 w-full flex flex-col items-center text-center px-4"
        >
          <Heading2>選出は、ゴールではありません。</Heading2>
          <Text>
            交流会／企業間マッチング／企業ニュース取り 組みの継続発信／
            <br className="hidden lg:block" />
            定期的なサポートミーティング
          </Text>
        </motion.div>
      </Container>
    </Section>
  );
}
