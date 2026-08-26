// src/components/omoi/Phase9_Finale.tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export default function Phase9_Finale() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. スクロール領域の監視 (CTAは外に出したため、純粋なアニメーション領域として監視)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ==========================================
  // 1. クリップパスの拡大 (極小 → 長方形 → 全画面)
  // ==========================================
  // 0.0〜0.1: 点(50vw/vh)から長方形枠へ広がる
  // 0.1〜0.3: 長方形枠をキープ（この間に写真が切り替わる）
  // 0.3〜0.5: 全画面(0vw/vh)へ広がる
  // 最後に「1」を追加して状態をロック
  const clipX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 1],
    [50, 25, 25, 0, 0],
  );
  const clipY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 1],
    [50, 35, 35, 0, 0],
  );
  const clipPath = useMotionTemplate`inset(${clipY}vh ${clipX}vw)`;

  // ==========================================
  // 2. 画像のスケール連動（見切れ防止）
  // ==========================================
  // 枠が小さい時は画像も引いた状態(0.5)にしておき、顔が見切れないようにする
  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 1],
    [0.1, 0.5, 0.5, 1, 1],
  );

  // ==========================================
  // 3. 写真のクロスフェード (0.1 〜 0.3)
  // ==========================================
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

  // 全画面展開後のテキスト用ダークオーバーレイ
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 1],
    [0, 0.6, 0.6],
  );

  // ==========================================
  // 4. 巨大文字とプロフィールの演出
  // ==========================================
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
                src="/images/phase9/founder-1.jpg"
                style={{ opacity: img1Opacity }}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                alt=""
              />
              <motion.img
                src="/images/phase9/founder-2.jpg"
                style={{ opacity: img2Opacity }}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                alt=""
              />
              <motion.img
                src="/images/phase9/founder-3.jpg"
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
              <h2 className=" px-4 md:px-12 text-yellow font-serif font-bold leading-tight drop-shadow-2xl text-6xl md:text-8xl lg:text-[8rem]">
                本気で日本を
                <br />
                変えたい
              </h2>
            </motion.div>

            <motion.div
              style={{ opacity: profileOpacity, y: profileY }}
              className="mt-12 text-white font-serif pointer-events-auto"
            >
              <p className="text-sm md:text-base tracking-widest mb-2 opacity-80">
                地域を代表する企業100選
              </p>
              <p className="text-2xl md:text-4xl font-bold mb-8">
                発起人{" "}
                <span className="text-4xl md:text-6xl ml-4">石井智大</span>
              </p>
              <p className="text-sm md:text-lg leading-loose opacity-90 mb-12">
                あなたの会社が、地域のために大切にしてきたこと。
                <br />
                事業に込めてきた想い。これから実現したい未来。
                <br />
                <br />
                <span className="text-2xl md:text-4xl font-bold block mt-4">
                  あなたの会社の想いを、
                  <br />
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
