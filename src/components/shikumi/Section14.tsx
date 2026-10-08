// src/components/shikumi/Section14.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";

export default function Section14() {
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
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const rightSlide: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  // Section3に合わせたクロスマークの出現
  const crossPop: Variants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.6, ease: "backOut" },
    },
  };

  return (
    <section
      id="section14"
      className="relative w-full overflow-hidden py-24 md:py-32 bg-[linear-gradient(160deg,#ffffff_65%,#ECECEC_70%,#ffffff_80%,#D0D0D0_85%,#ffffff_100%)]"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* --- 「魅力 × 意志」 タイポグラフィエリア --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.4 } },
          }}
          className="relative w-full max-w-4xl flex flex-row items-center justify-center px-4 md:px-12 mb-12 md:mb-16"
        >
          {/* 左側：知られるべき魅力 */}
          <motion.div variants={leftSlide} className="text-center">
            <div className="text-[#003064] text-center text-lg md:text-4xl font-medium italic leading-relaxed tracking-wider bg-[linear-gradient(160deg,#003064_32%,#004895_53%,#0069DA_67%,#004289_76%,#003064_88%)] bg-clip-text text-transparent">
              知られるべき
              <br />
              <span className="text-4xl md:text-7xl italic tracking-wider font-serif">
                魅力
              </span>
            </div>
          </motion.div>

          {/* クロスマーク（細いライン） */}
          <motion.div
            variants={crossPop}
            className="relative shrink-0 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center mx-4 md:mx-10"
          >
            <div className="absolute w-[1px] h-full bg-text transform -rotate-45"></div>
            <div className="absolute w-[1px] h-[250%] bg-text transform rotate-45"></div>
          </motion.div>

          {/* 右側：未来への意志 */}
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
          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            まずは、私たちにぶつけてください。
          </Heading2>
          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            あなたの会社にある価値と、その先に描いている未来を聞かせてください。
          </Text>
        </motion.div>

        {/* --- 集合写真エリア --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemFadeUp}
          className="w-full max-w-5xl mx-auto relative aspect-[3/1] overflow-hidden"
        >
          <Image
            src="/images/shikumi/section14/team-photo.webp"
            alt="株式会社iobi チームメンバー集合写真"
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover object-center"
            loading="lazy"
          />
        </motion.div>
      </Container>
    </section>
  );
}
