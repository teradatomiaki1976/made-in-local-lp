// src/components/omoi/MessagePhase.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// FVの画像を流用し、高さを変えてリズムを持たせた配列
const LEFT_IMAGES = [
  { src: "/images/section3/scene1.webp", height: "h-[400px]" },
  { src: "/images/section3/scene2.webp", height: "h-[400px]" },
  { src: "/images/section3/scene3.webp", height: "h-[400px]" },
  { src: "/images/section3/scene4.webp", height: "h-[400px]" },
];

const RIGHT_IMAGES = [
  { src: "/images/section3/scene4.webp", height: "h-[400px]" },
  { src: "/images/section3/scene3.webp", height: "h-[400px]" },
  { src: "/images/section3/scene2.webp", height: "h-[400px]" },
  { src: "/images/section3/scene1.webp", height: "h-[400px]" },
];

export default function MessagePhase() {
  const containerRef = useRef<HTMLDivElement>(null);

  // コンテナのスクロール進行度を取得
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 左右のカラムでスクロール速度（移動量）を変えてパララックスを演出も可
  const leftColumnY = useTransform(scrollYProgress, [0, 1], ["5%", "-20%"]);
  const rightColumnY = useTransform(scrollYProgress, [0, 1], ["5%", "-20%"]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full min-h-[100svh] overflow-hidden flex flex-col md:flex-row items-center justify-between md:justify-center ",
      )}
    >
      {/* 📸 背景画像とオーバーレイ（最背面 z-0） */}
      <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
        <Image
          src="/images/section3/bg-1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className={cn("absolute inset-0 bg-base/80 mix-blend-multiply")} />
      </div>

      {/* スマホ版: 上部画像（PCでは非表示） */}
      <div
        className="md:hidden w-full h-[30vh] relative mb-1 bg-base"
        aria-hidden="true"
      >
        <Image
          src="/images/loading/scene1.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
      </div>

      {/* PC版: 左側画像カラム */}
      <motion.div
        style={{ y: leftColumnY }}
        className="absolute left-0 top-0 w-[20%] h-[200%] hidden md:flex flex-col gap-8 will-change-transform"
        aria-hidden="true"
      >
        {LEFT_IMAGES.map((img, index) => (
          <div
            key={`left-${index}`}
            className={cn(
              "relative w-full rounded-lg overflow-hidden bg-base",
              img.height,
            )}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="20vw" // 先回りリスクヘッジ: PCの20%幅に最適化
              className="object-cover opacity-80"
            />
          </div>
        ))}
      </motion.div>

      {/* 中央メッセージエリア */}
      <div className="relative z-10 w-full max-w-content px-6 md:px-0 text-center flex flex-col gap-16">
        <motion.h2
          className="font-serif text-4xl md:text-6xl font-bold leading-tight text-white"
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-20%" }} // 画面の下から20%通過した時点で発火
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ willChange: "opacity, filter, transform" }} // 🛡️ 先回りリスクヘッジ
        >
          <span className="font-serif text-xl md:text-4xl leading-relaxed block mb-3">
            久しぶりに地元へ帰ると、
          </span>
          昔あった店が
          <br className="block md:hidden" />
          なくなっている
        </motion.h2>

        {/* 本文のブラー解除アニメーション（見出しより少し遅れて発火） */}
        <motion.p
          className="text-sm md:text-xl font-serif leading-normal text-white"
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }} // 0.3秒遅らせて余韻を出す
          style={{ willChange: "opacity, filter, transform" }}
        >
          活気のあった商店街にはシャッターが下りている。
          <br />
          変化は、ある日突然ではなく、
          <br className="block md:hidden" />
          気づかないほど静かに進んでいる。
        </motion.p>
      </div>

      {/* PC版: 右側画像カラム */}
      <motion.div
        style={{ y: rightColumnY }}
        className="absolute right-0 top-0 w-[20%] h-[200%] hidden md:flex flex-col gap-8 will-change-transform"
        aria-hidden="true"
      >
        {RIGHT_IMAGES.map((img, index) => (
          <div
            key={`right-${index}`}
            className={cn(
              "relative w-full rounded-lg overflow-hidden bg-base",
              img.height,
            )}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="20vw"
              className="object-cover opacity-80"
            />
          </div>
        ))}
      </motion.div>

      {/* スマホ版: 下部画像（PCでは非表示） */}
      <div
        className="md:hidden w-full h-[30vh] relative mt-12 bg-base"
        aria-hidden="true"
      >
        <Image
          src="/images/loading/scene8.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
      </div>
    </section>
  );
}
