// src/components/omoi/MapTransitionPhase.tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export default function MapTransitionPhase() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 💡 【重要】FVからスクロールした瞬間にアニメーションを開始させる
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // --- 1. 青背景（円）の「下からのせり上がり ＆ 拡大」 (0% 〜 30%) ---
  // 半径を0vwから150vwへ拡大
  const circleRadius = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const circleY = useTransform(scrollYProgress, [0, 0.2], [100, 50]);
  const clipPath = useMotionTemplate`circle(${circleRadius}vw at 50% ${circleY}%)`;

  // --- 2. 第一テキストの出現 (10% 〜 30%) ---
  // 円が少し広がってからテキストをフワッと出す
  const firstTextOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  // テキストは奥から手前にスッと現れるような動き
  const firstTextY = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);

  // --- 3. 幕引き (40% 〜 55%): 全体が上にはける ---
  const coverY = useTransform(scrollYProgress, [0.4, 0.55], ["0%", "-100%"]);

  // --- 4. 白背景セクション (55% 〜 65%): 第二テキスト出現 ---
  const secondTextOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const secondTextY = useTransform(scrollYProgress, [0.55, 0.65], [40, 0]);

  // --- 5. パララックス写真 (40% 〜 100%) ---
  const leftPhotosY = useTransform(scrollYProgress, [0.4, 1], [200, -300]);
  const rightPhotosY = useTransform(scrollYProgress, [0.4, 1], [400, -150]);

  return (
    // 高さを400vhにして、アニメーションの尺（スクロール量）を確保
    <section
      ref={containerRef}
      className="relative w-full h-[500vh] -mt-[100vh]"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* ==========================================
            A. 背面レイヤー（白背景＋パララックス＋第二テキスト）
        ========================================== */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center">
          <motion.div
            style={{ opacity: secondTextOpacity, y: secondTextY }}
            className="absolute z-10 w-full px-4 text-center text-[#003064]"
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-relaxed tracking-wider">
              久しぶりに地元へ帰ると、
              <br />
              昔あった店がなくなっている。
            </h2>
            <p className="mt-8 text-sm md:text-base opacity-80">
              活気のあった商店街にはシャッターが下りている。
              <br />
              変化は、ある日突然ではなく、気づかないほど静かに進んでいる。
            </p>
          </motion.div>

          {/* 両サイドの写真群（パララックス） */}
          <div className="absolute inset-0 z-0 flex justify-between px-4 md:px-8 pointer-events-none">
            <motion.div
              style={{ y: leftPhotosY }}
              className="hidden md:flex flex-col gap-6 w-[22%]"
            >
              <div className="w-full aspect-video bg-gray-200 rounded shadow-lg overflow-hidden">
                <img
                  src="/images/fv-reused-1.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full aspect-video bg-gray-300 rounded shadow-lg overflow-hidden">
                <img
                  src="/images/fv-reused-2.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              style={{ y: rightPhotosY }}
              className="hidden md:flex flex-col gap-6 w-[22%]"
            >
              <div className="w-full aspect-[4/3] bg-gray-300 rounded shadow-lg overflow-hidden">
                <img
                  src="/images/fv-reused-3.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full aspect-video bg-gray-400 rounded shadow-lg overflow-hidden">
                <img
                  src="/images/fv-reused-4.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ==========================================
            B. 前面レイヤー（青いカバー ＆ テキスト）
        ========================================== */}
        <motion.div
          style={{ y: coverY }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {/* 青い背景レイヤー（下から広がる clip-path マスク） */}
          <motion.div
            style={{ clipPath }}
            className="absolute inset-0 bg-[#003064] z-0 flex flex-col items-center justify-center"
          >
            {/* 第一メッセージ（円の内側に存在するため、絶対に隠れない） */}
            <motion.div
              style={{ opacity: firstTextOpacity, y: firstTextY }}
              className="w-full px-4 text-center text-white"
            >
              <h2 className="font-serif text-3xl md:text-5xl font-bold leading-relaxed">
                自分が生まれ育った地域が、
                <br />
                10年後どうなっているか。
              </h2>
              <p className="mt-6 text-sm md:text-base opacity-90">
                具体的に考えたことがあるだろうか。
                <br />
                ずっと変わらないと思っていた故郷も、少しずつ姿を変えている。
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
