// src/components/shikumi/Section10.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  Variants,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";

// 💎 Section9から引用・改良：カンマ区切りに対応したカウントアップ
function CountUp({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 }); // 数字が大きいので少し長めに

  useEffect(() => {
    if (isInView) motionValue.set(to);
  }, [isInView, motionValue, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // カンマ区切りフォーマットを適用
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

export default function Section10() {
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
      id="section10"
      className="relative w-full overflow-hidden bg-[linear-gradient(to_bottom,#ECFFF5_0%,#F9FDF2_30%,#F9FDF2_100%)] py-24 md:py-32"
    >
      <Container className="relative z-10 flex flex-col items-center">
        {/* --- ヘッダー部分 --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <motion.div
            variants={itemFadeUp}
            className="flex justify-center items-center mb-8 md:mb-12"
          >
            <span className="bg-[linear-gradient(135deg,#003064_32%,#004895_53%,#0052AA_67%,#004289_76%,#003064_88%)] text-white text-xs md:text-sm font-bodoni tracking-widest px-6 py-1 shadow-sm">
              Charm and Will
            </span>
          </motion.div>
          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            知られるべき魅力、
            <br />
            未来への意志を持つ企業が、全国で
          </Heading2>

          {/* 実績数値エリア */}
          <motion.div
            variants={itemFadeUp}
            className="mb-10 flex items-baseline justify-center"
            aria-label="1500社超"
          >
            <CountUp
              to={1500}
              className="text-[80px] md:text-[140px] font-serif font-bold text-text2 leading-none tracking-tighter mr-2"
            />
            <span className="text-2xl md:text-4xl font-bold text-text2">
              社超
            </span>
          </motion.div>

          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            同じ基準で、地域を代表する企業として選ばれたからこそ
            <br className="hidden md:block" />
            企業同士の出会いも強いつながりに変わっていく。
          </Text>
        </motion.div>

        {/* --- コンテンツカード --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-5xl bg-white rounded-xl shadow-md border border-gray-100 p-8 md:p-12"
        >
          <div className="flex flex-col lg:flex-row gap-10">
            {/* テキストエリア */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl md:text-4xl font-bold text-midblue leading-normal mb-6">
                地域を超えて
                <br />
                選出企業が繋がる
                <br />
                企業交流会。
              </h3>
              <p className=" text-midblue leading-relaxed">
                「地域を代表する企業100選」の先出企業同士がつながる交流会を、毎月1回以上開催しています。選出企業同士だからこそ、互いに一定の信頼や期待感を持った状態で出会うことができ、初対面でも話が進みやすく、商談や事業連携につながる機会が生まれています。
              </p>
            </div>

            {/* 画像エリア（4枚グリッド） */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-3 md:gap-4">
              {[
                {
                  label: "福岡",
                  src: "/images/shikumi/section10/fukuoka.webp",
                },
                {
                  label: "埼玉",
                  src: "/images/shikumi/section10/saitama.webp",
                },
                {
                  label: "広島",
                  src: "/images/shikumi/section10/hiroshima.webp",
                },
                { label: "愛知", src: "/images/shikumi/section10/aichi.webp" },
              ].map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] overflow-hidden shadow-sm group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={`${img.label}での企業交流会の様子`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-text font-sans text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                    {img.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
