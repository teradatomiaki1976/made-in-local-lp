// src/components/shikumi/Section12.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";

const initialSteps = [
  { id: 1, title: "担当者との面談" },
  { id: 2, title: "エントリー" },
  { id: 3, title: "審査" },
];

const successSteps = [
  { id: 4, title: "選出企業\n特設ページ制作" },
  { id: 5, title: "エンブレム・額入り\n認定証を贈呈" },
  { id: 6, title: "入稿ミーティング" },
  { id: 7, title: "選出企業\n特設ページ公開" },
];

export default function Section12() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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

  const lineHVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  const lineVVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <section
      id="section12"
      className="relative w-full overflow-hidden bg-[linear-gradient(to_bottom,#ECFFF5_0%,#F9FDF2_30%,#F9FDF2_100%)] py-24 md:py-32"
    >
      <Container className="relative z-10 flex flex-col items-center">
        {/* タイトル周り */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <motion.div
            variants={itemFadeUp}
            className="flex justify-center items-center mb-6 md:mb-8"
          >
            <span className="bg-[linear-gradient(135deg,#003064_32%,#004895_53%,#0052AA_67%,#004289_76%,#003064_88%)] text-white text-xs md:text-sm font-bodoni tracking-widest px-6 py-1 shadow-sm">
              Selection Process
            </span>
          </motion.div>
          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            エントリーから選出後の活用
          </Heading2>

          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            まずは、担当者との面談から。
            <br />
            自社に選出の可能性があるのか。どのような基準で審査されるのか。
            <br />
            選出された場合、どのように活用できるのか。担当者との面談でご案内します。
          </Text>
        </motion.div>

        {/* フロー図本体 */}
        <div className="w-full max-w-[1000px] relative">
          {/* --- PC版レイアウト --- */}
          <div className="hidden md:block relative w-full pt-4 pb-12">
            {/* フェーズ1: Start 〜 審査 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex justify-between items-center relative mb-12 h-[100px]"
            >
              <div className="bg-white border border-[#E0EBEF] w-[180px] h-full rounded shadow-sm text-[32px] font-bodoni text-[#003064] z-10 font-bold flex items-center justify-center">
                Start
              </div>

              <motion.div
                className="absolute top-1/2 -mt-[3px] left-[180px] w-[60px] h-[6px] bg-[#003064] origin-left"
                variants={lineHVariants}
              />
              <motion.div
                className="absolute top-1/2 -mt-[3px] left-[460px] w-[30px] h-[6px] bg-[#003064] origin-left"
                variants={lineHVariants}
              />
              <motion.div
                className="absolute top-1/2 -mt-[3px] left-[710px] w-[30px] h-[6px] bg-[#003064] origin-left"
                variants={lineHVariants}
              />

              {initialSteps.map((step) => (
                <motion.div
                  key={`pc-step-${step.id}`}
                  variants={itemFadeUp}
                  className="bg-white border border-[#E0EBEF] w-[220px] h-full rounded shadow-sm flex items-center justify-center z-10 px-4"
                >
                  <span className="text-[72px] font-bodoni text-[#F0F4F8] mr-4 leading-none select-none">
                    {step.id}
                  </span>
                  <span className="font-bold text-sm text-gray-800">
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* フェーズ2: 分岐（選出 / 非選出） */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex gap-10 relative mb-12 justify-center"
            >
              <motion.div
                variants={itemFadeUp}
                className="relative w-[500px] h-[130px] bg-[#EBB914] rounded-md shadow-md overflow-hidden flex z-10"
              >
                <div className="w-[140px] bg-[#DDA808] flex flex-col justify-center items-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('/images/laurel-wreath.svg')] bg-center bg-no-repeat bg-contain scale-150"></div>
                  <span className="text-5xl font-bodoni text-white/90 z-10 font-bold mb-1">
                    100
                  </span>
                  <span className="text-[9px] text-white/90 font-bold z-10 text-center tracking-widest leading-tight">
                    SELECTION
                    <br />
                    2026-2027
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-center text-left text-gray-900">
                  <h3 className="font-bold text-2xl mb-2">選出された場合</h3>
                  <p className="text-xs font-medium">
                    100選としての発信がここから始まります。
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemFadeUp}
                className="w-[340px] h-[130px] bg-[#F8F9FA] border border-[#E0EBEF] rounded-md text-center flex flex-col justify-center shadow-sm z-10"
              >
                <h3 className="font-bold text-[#003064] mb-3 text-lg">
                  今回は選出に
                  <br />
                  至らなかった場合
                </h3>
                <p className="text-sm font-bold text-gray-600">
                  1年後に再挑戦可能
                </p>
              </motion.div>
            </motion.div>

            {/* フェーズ3: 選出後のフロー */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex justify-between items-center relative h-[100px]"
            >
              <motion.div
                className="absolute -top-[48px] left-[65px] w-[12px] h-[48px] bg-black origin-top z-0"
                variants={lineVVariants}
              />

              <motion.div
                className="absolute top-1/2 -mt-[3px] left-[220px] w-[30px] h-[6px] bg-[#003064] origin-left"
                variants={lineHVariants}
              />
              <motion.div
                className="absolute top-1/2 -mt-[3px] left-[470px] w-[30px] h-[6px] bg-[#003064] origin-left"
                variants={lineHVariants}
              />
              <motion.div
                className="absolute top-1/2 -mt-[3px] left-[720px] w-[30px] h-[6px] bg-[#003064] origin-left"
                variants={lineHVariants}
              />

              {successSteps.map((step) => (
                <motion.div
                  key={`pc-step-${step.id}`}
                  variants={itemFadeUp}
                  className="bg-white border border-[#E0EBEF] w-[220px] h-full rounded shadow-sm flex items-center justify-center z-10 px-2"
                >
                  <span className="text-[72px] font-bodoni text-[#F0F4F8] mr-2 leading-none select-none">
                    {step.id}
                  </span>
                  <span className="font-bold text-xs text-gray-800 whitespace-pre-line leading-relaxed">
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* --- Future セクション --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={itemFadeUp}
            className="mt-16 md:mt-20 w-full relative"
          >
            <div className="text-center mb-8">
              <p className="text-xl md:text-2xl font-bold tracking-widest text-[#003064]">
                選出は、ゴールではありません。
              </p>
            </div>

            {/* Future カード */}
            <div className="bg-[#FCFAEC] border border-[#F0EAD6] rounded-md p-8 md:p-12 shadow-sm relative overflow-hidden group">
              {/* 透かし文字 (A11y対応: aria-hiddenを追加し読み上げを防止) */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-2 text-[100px] md:text-[180px] font-bodoni text-[#DDA808]/10"
              >
                Future
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-8">
                <div>
                  <span className="text-xs text-[#C3A800] font-bodoni block mb-1 tracking-widest">
                    Network
                  </span>
                  <h4 className="text-base md:text-lg font-bold text-gray-900">
                    交流会
                  </h4>
                </div>
                <div>
                  <span className="text-xs text-[#C3A800] font-bodoni block mb-1 tracking-widest">
                    Matching
                  </span>
                  <h4 className="text-base md:text-lg font-bold text-gray-900">
                    企業間マッチング
                  </h4>
                </div>
                <div>
                  <span className="text-xs text-[#C3A800] font-bodoni block mb-1 tracking-widest">
                    Media
                  </span>
                  <h4 className="text-base md:text-lg font-bold text-gray-900">
                    企業ニュース取り組みの継続発信
                  </h4>
                </div>
                <div className="md:col-span-2">
                  <span className="text-xs text-[#C3A800] font-bodoni block mb-1 tracking-widest">
                    Support
                  </span>
                  <h4 className="text-base md:text-lg font-bold text-gray-900">
                    定期的なサポートミーティング
                  </h4>
                </div>
                <div className="flex items-end">
                  <span className="text-lg font-bodoni text-gray-900 font-bold mb-0.5 tracking-widest">
                    etc.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          {/* --- Future セクション ここまで --- */}
        </div>
      </Container>
    </section>
  );
}
