// src/components/shikumi/Section2.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";

const SCROLL_IMAGES = [
  "/images/shikumi/section2/scene-1.webp",
  "/images/shikumi/section2/scene-2.webp",
  "/images/shikumi/section2/scene-3.webp",
  "/images/shikumi/section2/scene-4.webp",
  "/images/shikumi/section2/scene-5.webp",
];

// アニメーションをループさせるため、配列を2倍にして連結する
const LOOP_IMAGES = [...SCROLL_IMAGES, ...SCROLL_IMAGES];

export default function Section2() {
  return (
    <section
      id="section2"
      className="relative w-full overflow-hidden bg-[linear-gradient(to_bottom,#ECFFF5_0%,#F9FDF2_30%,#F9FDF2_100%)] py-24 md:py-32"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* ラベル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="bg-[linear-gradient(135deg,#003064_32%,#004895_53%,#0052AA_67%,#004289_76%,#003064_88%)] text-white text-xs md:text-sm font-bodoni tracking-widest px-6 py-1.5 shadow-sm">
            Who makes it?
          </span>
        </motion.div>

        {/* メイン見出し */}
        <Heading2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className=""
        >
          この地域を、誰がつくっているのか。
        </Heading2>

        {/* コピー部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col gap-8"
        >
          <Text className="font-bold">
            地域の未来をつくっているのは、誰もが知っている企業だけではありません。
          </Text>
          <Text>
            長年磨き続けてきた技術。業界の常識を変えるサービス。
            <br className="hidden md:block" />
            地域に欠かせない仕事。次の世代へ残したい文化や産業。
          </Text>
          <Text>
            まだ広く知られていなくても、その地域だからこそ生まれた、価値ある企業がある。
            <br className="hidden md:block" />
            私たちは、そんな企業を見つけたいと考えています。
          </Text>
        </motion.div>
      </Container>

      {/* 無限スクロール（Marquee）エリア */}
      <div className="mt-20 md:mt-28 relative w-full flex overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-[#F9FDF2] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-[#F9FDF2] to-transparent z-10 pointer-events-none" />

        {/* Framer Motion を使った無限スクロール */}
        <motion.div
          // 0% から -50% まで移動させることで、2倍にした配列がシームレスにループする
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 80,
          }}
          className="flex w-max gap-4 md:gap-6 px-2 md:px-3"
        >
          {LOOP_IMAGES.map((src, index) => (
            <div
              key={index}
              className="relative w-[280px] h-[180px] md:w-[400px] md:h-[260px] rounded-md overflow-hidden shadow-sm shrink-0"
            >
              <Image
                src={src}
                alt="地域の現場風景"
                fill
                // 最初の数枚だけpriorityをつける等の最適化もアリ
                className="object-cover"
                sizes="(max-width: 768px) 280px, 400px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
