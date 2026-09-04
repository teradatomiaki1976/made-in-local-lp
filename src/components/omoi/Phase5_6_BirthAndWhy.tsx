// src/components/omoi/Phase5_6_BirthAndWhy.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Phase5_6_BirthAndWhy() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 400vhの領域で一つのタイムラインを形成
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Phase5（誕生）のタイムライン設計 ---
  // 💡 出現タイミングを微調整し、キープ（タメ）区間を 0.35 -> 0.4 へ延長
  const phase5Opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.4, 0.5],
    [0, 1, 1, 0],
  );
  // 💡 大→小(1→0.9)から、小→大へのスケールアップに変更
  // 出現時(0.85 -> 1)にフワッと大きくなり、タメ区間(1 -> 1.05)でじわじわ迫ってくる演出
  const phase5Scale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.4, 0.5],
    [0.85, 1, 1.05, 1.1],
  );

  // 背景「100」のパララックス
  const bgScale = useTransform(scrollYProgress, [0.1, 1], [0.4, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0.1, 1], [0, 0.08]);

  // --- Phase6（テキスト統合版）タイムライン設計 ---
  // Phase5のタメ延長に合わせて、出現タイミングを後ろにシフト
  const h2Opacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const h2Y = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.85, 0.95],
    [30, 0, 0, -30],
  );

  const pOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const pY = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.85, 0.95],
    [30, 0, 0, -30],
  );

  return (
    <section ref={containerRef} className="relative w-full bg-creem h-[400vh]">
      <div className="sticky top-0 left-0 w-full h-svh overflow-hidden flex flex-col items-center justify-center">
        {/* 背景の巨大な「100」 */}
        <motion.div
          style={{
            scale: bgScale,
            opacity: bgOpacity,
            willChange: "transform, opacity",
          }}
          className="absolute inset-0 flex items-center justify-center text-midblue select-none pointer-events-none"
        >
          <span className="text-[60vw] md:text-[45vw] leading-none tracking-tighter font-bold">
            100
          </span>
        </motion.div>

        {/* Phase5コンテンツ */}
        <motion.div
          style={{
            opacity: phase5Opacity,
            scale: phase5Scale,
            willChange: "transform, opacity",
          }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 px-6 z-20"
        >
          <img
            src="/images/logo/emblem_dark.svg"
            alt="地域を代表する企業100選"
            className="w-36 md:w-80 drop-shadow-2xl max-md:mb-2 md:mr-16"
          />
          <div className="max-w-3xl flex flex-col items-center md:items-start max-md:border-t md:border-l border-midblue/30  max-md:pt-8 md:pl-16 md:py-8">
            <h2 className="text-center md:text-left text-4xl md:text-5xl font-bold text-olive mb-6">
              <span className="text-midblue block text-xl md:text-3xl mb-2">
                そこで、
              </span>
              地域を代表する
              <br className="block md:hidden" />
              企業100選
              <span className="text-midblue block mt-2 text-xl md:text-3xl">
                を創設した。
              </span>
            </h2>
            <p className="text-base md:text-xl font-bold leading-relaxed text-midblue/80">
              100社上限だからこそ埋もれない新しい地域の旗印になる。
              <br className="hidden md:block" />
              その共通の旗印のもと、地域の企業から意識を変えていく。
            </p>
          </div>
        </motion.div>

        {/* Phase6コンテンツ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 text-midblue z-20 pointer-events-none">
          {/* h2: 先に出現 */}
          <motion.h2
            style={{
              opacity: h2Opacity,
              y: h2Y,
              willChange: "transform, opacity",
            }}
            className="text-2xl md:text-5xl font-bold tracking-normal text-center leading-tight"
          >
            <span className="text-3xl md:text-6xl block leading-tight mb-4">
              埋もれないために、
              <br />
              100社だけ。
            </span>
            100社だから一社一社が新しい
            <br className="hidden md:block" />
            「地域の顔」になれる。
          </motion.h2>

          {/* p: 遅れて出現 */}
          <motion.div
            style={{
              opacity: pOpacity,
              y: pY,
              willChange: "transform, opacity",
            }}
            className="text-base md:text-lg font-bold leading-loose text-left md:text-center"
          >
            <p>
              それは、名実ともに地域を代表するような企業でなくても良い。
              <br className="hidden md:block" />
              大事なのは、自分たちの可能性を信じる想いがあるかだ。
              <br className="hidden md:block" />
              一人から数百人の従業員を抱える企業になるという意志。数百年先も紡いでいこうという意志。
              <br className="hidden md:block" />
              自社技術が世界の舞台で輝けるという自信。過去なんてどうでもいい。未来に向けてどれだけ努力できるか。
              <br className="hidden md:block" />
              努力する意思があるか。 それが、地域企業の新しいシンボルになる。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
