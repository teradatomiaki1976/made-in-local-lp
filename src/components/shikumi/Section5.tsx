// src/components/shikumi/Section5.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";

export default function Section5() {
  // --- アニメーションの定義（variants） ---
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
      id="section5"
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
          <motion.div variants={itemFadeUp} className="mb-6 md:mb-8">
            <span className="bg-[linear-gradient(135deg,#FFFFFF_32%,#DDDDDD_53%,#BABABA_67%,#E2E2E2_76%,#FFFFFF_88%)] text-[#19324D] text-xs md:text-sm font-bodoni tracking-widest px-6 py-1 shadow-sm">
              Worthless?
            </span>
          </motion.div>
          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            知られていないことは、
            <br />
            価値がないことではない。
          </Heading2>
        </motion.div>

        {/* 3つの円の図解ブロック */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 mb-16 md:mb-20 w-full max-w-3xl"
          aria-label="プロセス：すでにある価値を見つける、評価する、そして社会に伝える"
        >
          {/* 円1 */}
          <motion.div
            variants={itemFadeUp}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-white/20 bg-white/5 flex flex-col items-center justify-center z-10 -mb-16 md:mb-0 md:-mr-8"
          >
            <p className="text-sm md:text-base leading-relaxed text-center">
              すでにある
              <br />
              <span className="text-lg md:text-xl font-bold">
                「価値を見つける」
              </span>
            </p>
          </motion.div>
          {/* 円2 */}
          <motion.div
            variants={itemFadeUp}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-white/20 bg-white/10 flex flex-col items-center justify-center z-20 shadow-lg"
          >
            <p className="text-lg md:text-xl font-bold text-center">
              「評価する」
            </p>
          </motion.div>
          {/* 円3 */}
          <motion.div
            variants={itemFadeUp}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-white/20 bg-white/5 flex flex-col items-center justify-center z-10 -mt-16 md:mt-0 md:-ml-8"
          >
            <p className="text-sm md:text-base leading-relaxed text-center">
              そして
              <br />
              <span className="text-lg md:text-xl font-bold">
                「社会に伝える」
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* メッセージテキストブロック */}
        <motion.div variants={itemFadeUp}>
          <Text>
            素晴らしい技術があっても。社会に必要なサービスがあっても。
            <br />
            社員が誇りを持って働いていても。地域に大きな貢献をしていても。
          </Text>
          <Text>
            知られていなければ、その価値に出会えない人がいる。
            <br />
            求職者。取引先。顧客。地域の人。
          </Text>
          <Text>
            そして、次の世代。
            <br />
            100選が目指すのは、企業に新しい価値をつくることではありません。
          </Text>
        </motion.div>
      </Container>
    </section>
  );
}
