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

  if (!mounted) {
    return <section className="relative w-full h-[700vh] bg-yellow" />;
  }

  return <Phase9Content />;
}

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

  // --- 背景アニメーション ---
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

  // 0.3で画像が定着した後、0.45まで「間」を持たせてから暗転・ブラーを開始
  const imgBlur = useTransform(
    scrollYProgress,
    [0.45, 0.55, 1],
    ["blur(0px)", "blur(12px)", "blur(12px)"],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.65, 1],
    [0, 0.6, 0.85, 0.85],
  );

  // --- 1. エンドロール（タイトル＋長文）のアニメーション ---
  const titleScale = useTransform(scrollYProgress, [0.45, 0.55], [1.3, 1]);

  const textY = useTransform(
    scrollYProgress,
    [0.45, 0.6, 0.75, 0.85],
    isMobile
      ? ["15vh", "0vh", "-60vh", "-100vh"]
      : ["20vh", "0vh", "-50vh", "-80vh"],
  );
  // 文字の出現も0.45から開始
  const textOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.75, 0.85],
    [0, 1, 1, 0],
  );

  // --- 2. 発起人＋CTA ---
  const ctaY = useTransform(
    scrollYProgress,
    [0.85, 0.95, 1],
    ["10vh", "0vh", "0vh"],
  );
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);

  return (
    <section className="relative w-full bg-yellow">
      <div ref={containerRef} className="relative h-[700vh]">
        <div className="sticky top-0 left-0 w-full h-svh overflow-hidden">
          {/* ----- 背景・ブラー・オーバーレイ (z-0) ----- */}
          <motion.div
            style={{ clipPath, willChange: "clip-path" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black z-0"
          >
            <motion.div
              style={{
                scale: imgScale,
                filter: imgBlur,
                willChange: "transform", // 負荷軽減のため filter を除外
              }}
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
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90 pointer-events-none"
            />
          </motion.div>

          {/* ----- コンテンツレイヤー (z-10) ----- */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 px-8 md:px-12">
            {/* 1. タイトル＆エンドロール（上に流れて消える） */}
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="absolute w-full max-w-4xl mx-auto flex flex-col items-start"
            >
              <motion.div
                style={{ scale: titleScale, transformOrigin: "left center" }}
                className="w-full mb-8 md:mb-16"
              >
                <h2 className="text-yellow font-bold leading-tight drop-shadow-2xl text-5xl md:text-8xl lg:text-[8rem] whitespace-nowrap">
                  本気で日本を
                  <br />
                  変えたい
                </h2>
              </motion.div>

              <div className="w-full text-white max-w-3xl flex flex-col">
                <p className="text-base md:text-xl tracking-wide leading-relaxed md:leading-loose">
                  地方には、まだ世の中に知られていない「誇るべき企業」が数多くあります。
                  <br />
                  <br />
                  高い技術、素晴らしいサービス、社員や地域への深い愛情。それでも、後継者不足や高齢化を理由に、黒字のまま静かに歴史を閉じていく会社があります。
                  <br />
                  <br />
                  「こんなに素晴らしい会社が、消えていくなんて絶対にもったいない。」
                  <br />
                  <br />
                  大学4年生の私はそう感じ、「後継者がいないなら、自分が社長になればいい」と、全国の企業へ「私を社長にしてください」と何万件もの電話をかけ続けました。
                  <br />
                  <br />
                  しかし、多くの経営者と出会う中で気づきました。
                  <br />
                  <br />
                  必要なのは、一社を継ぐことではない。素晴らしい企業が正しく知られ、働く人が誇りを持ち、「地域の宝」として次の世代へ受け継がれていく仕組みをつくること。
                  <br />
                  <br />
                  その想いから、「地域を代表する企業100選」を立ち上げました。
                </p>
              </div>
            </motion.div>

            {/* 2. 発起人＋CTA（最後に現れて留まる） */}
            <motion.div
              style={{ y: ctaY, opacity: ctaOpacity }}
              className="absolute w-full max-w-3xl mx-auto flex flex-col pointer-events-auto"
            >
              <div className="mb-6 md:mb-12">
                <p className="text-sm md:text-base tracking-widest mb-0 md:mb-2 text-yellow">
                  地域を代表する企業100選
                </p>
                <p className="text-base md:text-2xl font-bold text-white">
                  発起人
                  <span className="text-3xl md:text-5xl ml-4 inline-block">
                    石井智大
                  </span>
                </p>
              </div>

              <div className="bg-white/5 p-6 md:p-10 rounded-lg md:rounded-xl backdrop-blur-md border border-white/10 shadow-2xl">
                <p className="text-sm md:text-lg leading-normal text-white">
                  あなたの会社が、地域のために大切にしてきたこと。
                  <br className="hidden md:block" />
                  事業に込めてきた想い。これから実現したい未来。
                  <span className="text-xl md:text-3xl font-bold block mt-4 md:mt-6 text-yellow leading-tight">
                    あなたの会社の想いを、私達に聞かせてください。
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
