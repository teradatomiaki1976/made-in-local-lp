// src/components/shikumi/Section7.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";

export default function Section7() {
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

  return (
    <section
      id="section7"
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
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-12 md:mb-16"
        >
          <motion.div
            variants={itemFadeUp}
            className="flex justify-center items-center mb-8 md:mb-12"
          >
            <span className="bg-[linear-gradient(135deg,#FFFFFF_32%,#DDDDDD_53%,#BABABA_67%,#E2E2E2_76%,#FFFFFF_88%)] text-[#19324D] text-xs md:text-sm font-bodoni tracking-widest px-6 py-1 shadow-sm">
              If selected
            </span>
          </motion.div>
          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            選出されたら、
            <br />
            胸を張って見せていこう。
          </Heading2>
          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            「知られるべき魅力」と「未来への意志」
            <br />
            その両方を持つ企業として、
            <br />
            「地域を代表する企業100選」に選ばれたその証がこちら。
          </Text>
        </motion.div>

        {/* 円形の証画像エリア */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex gap-4 md:gap-8 justify-center items-center w-full mb-12 md:mb-24"
        >
          {/* エンブレム */}
          <motion.div
            variants={itemFadeUp}
            className="w-36 h-36 md:w-64 md:h-64 rounded-full flex items-center justify-center shadow-xl p-6 md:p-8  bg-[linear-gradient(160deg,#ffffff_0%,#ffffff_29%,#ececec_47%,#ffffff_62%,#bcbcbc_80%,#ececec_100%)]"
          >
            {/* overflow-hiddenを外し、タイポを修正。パディングで安全な余白を確保 */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/shikumi/section7/emblem_dark.svg"
                alt="100選エンブレム"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* 認定証 */}
          <motion.div
            variants={itemFadeUp}
            className="w-36 h-36 md:w-64 md:h-64 rounded-full flex items-center justify-center shadow-xl p-6 md:p-8  bg-[linear-gradient(160deg,#ffffff_0%,#ffffff_29%,#ececec_47%,#ffffff_62%,#bcbcbc_80%,#ececec_100%)]"
          >
            {/* overflow-hiddenを外し、タイポを修正。パディングで安全な余白を確保 */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/shikumi/section7/certificate2.webp"
                alt="100選認定証"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* 下部：白いカードエリア（活用シーン） */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemFadeUp}
          className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-8 md:p-16 text-midblue flex flex-col items-center text-center"
        >
          <div className="mb-12">
            <Heading2>
              選ばれた証を
              <br className="md:hidden" />
              社会との新しい接点へ
            </Heading2>
            <Text className="md:text-left">
              選出されたことを、しまっておく必要はありません。自社サイトでも。採用の場でも。
              営業の場でも。会社説明会でも。名刺でも。オフィスでも。
            </Text>
          </div>

          {/* 活用シーンのグリッド（SP: 1列, PC: 2列） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center overflow-hidden">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text font-bold bg-white/90 py-3 px-5 tracking-wide text-xl z-1 whitespace-nowrap drop-shadow-lg">
                Web・採用の接点で
              </span>
              <Image
                src="/images/shikumi/section7/scene-web.webp"
                alt="Webや採用サイトでのエンブレム活用例"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center overflow-hidden">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text font-bold bg-white/90 py-3 px-5 tracking-wide text-xl z-1 whitespace-nowrap drop-shadow-lg">
                営業・商談の接点で
              </span>
              <Image
                src="/images/shikumi/section7/scene-sales.webp"
                alt="名刺や営業資料でのエンブレム活用例"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full aspect-[4/3] rounded-md border border-gray-200 flex items-center justify-center overflow-hidden">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text font-bold bg-white/90 py-3 px-5 tracking-wide text-xl z-1 whitespace-nowrap drop-shadow-lg">
                会社の空間で
              </span>
              <Image
                src="/images/shikumi/section7/scene-office.webp"
                alt="オフィスでの認定証の掲示例"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center overflow-hidden">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text font-bold bg-white/90 py-3 px-5 tracking-wide text-xl z-1 whitespace-nowrap drop-shadow-lg">
                発信の接点で
              </span>
              <Image
                src="/images/shikumi/section7/scene-pr.webp"
                alt="PRや発信でのエンブレム活用例"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
