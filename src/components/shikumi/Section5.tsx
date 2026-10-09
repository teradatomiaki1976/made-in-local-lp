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
          className="mb-4 md:mb-16"
        >
          <motion.div variants={itemFadeUp} className="mb-8 md:mb-12">
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
          // 💡 スマホ時は固定サイズ(280px)でabsoluteの基準とし、PC時はflexで横並びに切り替え
          className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] md:w-full md:h-auto md:max-w-3xl mx-auto flex md:flex-row justify-center items-center mb-16 md:mb-20"
          aria-label="プロセス：すでにある価値を見つける、評価する、そして社会に伝える"
        >
          {/* 円1 (スマホ: 上段中央 / PC: 左) */}
          <motion.div
            variants={itemFadeUp}
            className="absolute top-5 md:top-0 left-0 right-0 mx-auto md:mx-0 md:static w-40 h-40 sm:w-48 sm:h-48 md:w-66 md:h-66 rounded-full border border-white/20 bg-white/5 flex flex-col items-center justify-center z-10 md:mb-0 md:-mr-8"
          >
            <p className="text-sm md:text-xl leading-relaxed text-center">
              すでにある
              <br />
              <span className="text-base md:text-2xl font-bold">
                「価値を見つける」
              </span>
            </p>
          </motion.div>

          {/* 円2 (スマホ: 下段左 / PC: 中央) */}
          <motion.div
            variants={itemFadeUp}
            className="absolute bottom-0 left-0 md:static w-40 h-40 sm:w-48 sm:h-48 md:w-66 md:h-66 rounded-full border border-white/20 bg-white/10 flex flex-col items-center justify-center z-20 shadow-lg"
          >
            <p className="text-lg md:text-2xl font-bold text-center">
              「評価する」
            </p>
          </motion.div>

          {/* 円3 (スマホ: 下段右 / PC: 右) */}
          <motion.div
            variants={itemFadeUp}
            className="absolute bottom-0 right-0 md:static w-40 h-40 sm:w-48 sm:h-48 md:w-66 md:h-66 rounded-full border border-white/20 bg-white/5 flex flex-col items-center justify-center z-10 md:mt-0 md:-ml-8"
          >
            <p className="text-sm md:text-xl leading-relaxed text-center">
              そして
              <br />
              <span className="text-base md:text-2xl font-bold">
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
