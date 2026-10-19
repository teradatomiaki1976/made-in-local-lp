// src/components/shikumi/Section7.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";

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
    <Section id="section7" theme="dark">
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
            <br className="hidden md:block" />
            胸を張って見せていこう。
          </Heading2>
          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            「知られるべき魅力」と「未来への意志」
            <br className="hidden md:block" />
            その両方を持つ企業として、
            <br className="hidden md:block" />
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
          className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-4 md:p-16 text-midblue flex flex-col items-center text-center"
        >
          <div className="mb-6 md:mb-12">
            <Heading2>選ばれた証を社会との新しい接点へ</Heading2>
            <Text>
              選出されたことを、しまっておく必要はありません。
              <br className="hidden md:block" />
              自社サイトでも。採用の場でも。営業の場でも。
              <br className="hidden md:block" />
              会社説明会でも。名刺でも。オフィスでも。
            </Text>
          </div>

          {/* 活用シーンのグリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-3xl">
            <div className="relative w-full aspect-[5/2] md:aspect-[16/9] flex items-center justify-center overflow-hidden">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text font-bold bg-white/90 py-2 md:py-3 px-2 md:px-5 tracking-wide text-xs md:text-lg z-1 whitespace-nowrap drop-shadow-lg">
                Webの接点で
              </span>
              <Image
                src="/images/shikumi/section7/scene-web.webp"
                alt="Webサイトでのエンブレム活用例"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full aspect-[5/2] md:aspect-[16/9] flex items-center justify-center overflow-hidden">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text font-bold bg-white/90 py-2 md:py-3 px-2 md:px-5 tracking-wide text-xs md:text-lg z-1 whitespace-nowrap drop-shadow-lg">
                営業・商談の接点で
              </span>
              <Image
                src="/images/shikumi/section7/scene-sales.webp"
                alt="名刺や営業資料でのエンブレム活用例"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full aspect-[5/2] md:aspect-[16/9] flex items-center justify-center overflow-hidden">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text font-bold bg-white/90 py-2 md:py-3 px-2 md:px-5 tracking-wide text-xs md:text-lg z-1 whitespace-nowrap drop-shadow-lg">
                オフィスの接点で
              </span>
              <Image
                src="/images/shikumi/section7/scene-office.webp"
                alt="オフィスでの認定証の掲示例"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full aspect-[5/2] md:aspect-[16/9] flex items-center justify-center overflow-hidden">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text font-bold bg-white/90 py-2 md:py-3 px-2 md:px-5 tracking-wide text-xs md:text-lg z-1 whitespace-nowrap drop-shadow-lg">
                採用会場の接点で
              </span>
              <Image
                src="/images/shikumi/section7/scene-pr.webp"
                alt="採用会場でのエンブレム活用例"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <CTAButton text="もっと多くの活用事例を聞く" />
        </motion.div>
      </Container>
    </Section>
  );
}
