// src/components/omoi/Phase9_Finale.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export default function Phase9_Finale() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // マウント前はプレースホルダー（高さを維持したセクション）を返す
  if (!mounted) {
    return <section className="relative w-full h-[600vh] bg-yellow" />;
  }

  return <Phase9Content />;
}

// 実際のスクロール＆アニメーション処理を持つ内部コンポーネント
function Phase9Content() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const clipX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 1],
    isMobile ? [50, 10, 10, 0, 0] : [50, 25, 25, 0, 0],
  );

  const clipY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 1],
    isMobile ? [50, 25, 25, 0, 0] : [50, 30, 30, 0, 0],
  );

  const clipPath = useMotionTemplate`inset(${clipY}vh ${clipX}vw)`;

  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 1],
    isMobile ? [0.2, 0.85, 0.85, 1, 1] : [0.1, 0.5, 0.5, 1, 1],
  );

  const img1Opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 1],
    [1, 1, 0, 0],
  );
  const img2Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.2, 0.25, 0.3, 1],
    [0, 1, 1, 0, 0],
  );
  const img3Opacity = useTransform(scrollYProgress, [0.25, 0.3, 1], [0, 1, 1]);

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 1],
    [0, 0.6, 0.6],
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.65, 1],
    [0, 1, 1],
  );
  const titleScale = useTransform(
    scrollYProgress,
    [0.55, 0.65, 0.75, 1],
    [1.3, 1, 0.8, 0.8],
  );
  const titleY = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, -15, -15]);
  const titleX = useTransform(
    scrollYProgress,
    [0.65, 0.75, 1],
    ["0%", "-5%", "-5%"],
  );

  const profileOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.8, 1],
    [0, 1, 1],
  );
  const profileY = useTransform(scrollYProgress, [0.7, 0.8, 1], [30, 0, 0]);
  return (
    // 🚨 親を単なるdivではなくsectionに変更し、背景色を黄色に固定
    <section className="relative w-full bg-yellow">
      {/* --- スクロリテリング（Sticky）領域 --- */}
      <div ref={containerRef} className="relative h-[600vh]">
        <div className="sticky top-0 left-0 w-full h-svh overflow-hidden">
          {/* 写真レイヤー (clip-pathで切り抜き) */}
          <motion.div
            style={{ clipPath, willChange: "clip-path" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black"
          >
            {/* 🚨 画像の親レイヤーにスケールを適用し、見切れを防ぐ */}
            <motion.div
              style={{ scale: imgScale, willChange: "transform" }}
              className="relative w-full h-full"
            >
              <motion.img
                src="/images/phase9/founder-1.webp"
                style={{ opacity: img1Opacity }}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                alt=""
              />
              <motion.img
                src="/images/phase9/founder-2.webp"
                style={{ opacity: img2Opacity }}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                alt=""
              />
              <motion.img
                src="/images/phase9/founder-3.webp"
                style={{ opacity: img3Opacity }}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                alt="発起人 石井智大"
              />
            </motion.div>

            {/* オーバーレイ */}
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent pointer-events-none"
            />
          </motion.div>

          {/* メインコピー＆プロフィール */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-24 pointer-events-none">
            <motion.div
              style={{
                opacity: titleOpacity,
                scale: titleScale,
                x: titleX,
                y: titleY,
                originX: 0,
                originY: 0.5,
              }}
              className="w-full max-w-4xl"
            >
              <h2 className=" px-4 md:px-12 text-yellow font-bold leading-tight drop-shadow-2xl text-6xl md:text-8xl lg:text-[8rem] whitespace-nowrap">
                本気で日本を
                <br />
                変えたい
              </h2>
            </motion.div>

            <motion.div
              style={{ opacity: profileOpacity, y: profileY }}
              className=" text-white font-serif pointer-events-auto"
            >
              <p className="text-[10px] md:text-[12px] tracking-widest mb-6 opacity-80">
                地方には、まだ世の中に知られていない「誇るべき企業」が数多くあります。
                <br className="hidden md:block" />
                高い技術、素晴らしいサービス、社員や地域への深い愛情。
                <br className="hidden md:block" />
                それでも、後継者不足や高齢化を理由に、黒字のまま静かに歴史を閉じていく会社があります。
                <br className="hidden md:block" />
                「こんなに素晴らしい会社が、消えていくなんて絶対にもったいない。」
                <br className="hidden md:block" />
                大学4年生の私はそう感じ、「後継者がいないなら、自分が社長になればいい」と、
                <br className="hidden md:block" />
                全国の企業へ「私を社長にしてください」と何万件もの電話をかけ続けました。
                <br className="hidden md:block" />
                しかし、多くの経営者と出会う中で気づきました。必要なのは、一社を継ぐことではない。
                <br className="hidden md:block" />
                素晴らしい企業が正しく知られ、働く人が誇りを持ち、
                <br className="hidden md:block" />
                「地域の宝」として次の世代へ受け継がれていく仕組みをつくること。
                <br className="hidden md:block" />
                その想いから、「地域を代表する企業100選」を立ち上げました。
              </p>
              <p className="text-xs md:text-sm tracking-widest mb-1 opacity-80">
                地域を代表する企業100選
              </p>
              <p className="text-lg md:text-3xl font-bold mb-6">
                発起人
                <span className="text-3xl md:text-5xl ml-2 md:ml-4 inline">
                  石井智大
                </span>
              </p>
              <p className="text-xs md:text-lg leading-normal opacity-90">
                あなたの会社が、地域のために大切にしてきたこと。
                <br className="hidden md:block" />
                事業に込めてきた想い。これから実現したい未来。
                <span className="text-lg md:text-4xl font-bold block mt-4">
                  あなたの会社の想いを、
                  <br className="hidden md:block" />
                  私たちに聞かせてください。
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
