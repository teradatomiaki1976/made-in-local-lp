// src/components/omoi/StoryPhase.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ==========================================
// 1. コンテンツデータの一元管理（保守性担保）
// ==========================================
const STORY_DATA = [
  {
    id: "unknown",
    subtitle: "< Unknown >",
    title: "知られていないだけの企業がある",
    text1: "日本経済を支えてきたのは、\n名前の知られた大企業だけではない。",
    text2:
      "その商品をつくる企業。技術を支える企業。地域の暮らしを守る企業。地域を考え抜き、社員や顧客と誠実に向き合い、社会に必要な価値を生み出している。それでも、若い世代にも、求職者にも、まだ知られていない企業がある。",
    img: "/images/section5/section5.jpg",
  },
  {
    id: "reality",
    subtitle: "< Reality >",
    title: "人知れず消えていく企業",
    text1: "素晴らしい会社なのに、\n知られていない。",
    text2:
      "必要とされている会社なのに、未来へ残れない。人手不足や後継者不足によって、地域を支えてきた企業が、人知れず姿を消していく。そのたびに、雇用が失われる。技術が途絶える。地域の魅力が、またひとつ消えていく。",
    img: "/images/section6/section6.jpg",
  },
  {
    id: "chance",
    subtitle: "< Chance >",
    title: "まだ知られていない価値を届ける",
    text1: "すでに知られているものを、\n追いかけるためのメディアではない。",
    text2:
      "まだ知られていなかった企業と、人々が初めて出会う機会をつくる。今まで光が当たらなかった地域や業界が、誰かの目に留まるきっかけをつくる。大切にしてきた価値を、次の世代へつなぐ。そのために、私たちはメディアという方法を選んだ。",
    img: "/images/section7/section7.jpg",
  },
];

export default function StoryPhase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // コンテナ全体のスクロール進行度（0〜1）
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 現在表示中のインデックスを監視（ドットとa11y用）
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.3) setActiveIndex(0);
    else if (latest < 0.65) setActiveIndex(1);
    else setActiveIndex(2);
  });

  // ==========================================
  // 2. アニメーション制御（PC: 横スライド / SP: 縦スタック）
  // ==========================================

  // 【PC版】全体の横移動（チラ見せのために -66% ではなく -62% 付近でストップ）
  const xTransformPC = useTransform(scrollYProgress, [0, 1], ["0vw", "-170vw"]);

  // 【SP版】カードごとの縦スライドアップ（0番目は固定）
  const yTransformSP1 = useTransform(
    scrollYProgress,
    [0.15, 0.35],
    ["100vh", "0vh"],
  );
  const yTransformSP2 = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    ["100vh", "0vh"],
  );
  const spTransforms = [null, yTransformSP1, yTransformSP2];

  // ==========================================
  // 3. 共通見出しのクロスフェード制御
  // ==========================================

  // ドットクリック時のスムーズスクロール
  const handleDotClick = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollAmount = index * window.innerHeight;
    window.scrollTo({ top: containerTop + scrollAmount, behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-creem">
      {/* ==========================================
          画面固定コンテナ
      ========================================== */}
      <div className="sticky top-0 w-full h-[90svh] overflow-hidden flex flex-col justify-center items-center">
        {/* 共通見出し（前面レイヤー） */}
        <div className="absolute top-[15%] md:top-[20%] left-0 w-full flex justify-center z-50 pointer-events-none">
          {STORY_DATA.map((data, i) => (
            <div
              key={`title-${i}`}
              className={cn(
                // 💡 変更: duration-700 でゆっくりブラーが晴れるように設定
                "absolute text-center flex flex-col items-center drop-shadow-xl transition-all duration-700 ease-in-out",
                activeIndex === i
                  ? "opacity-100 visible translate-y-0 blur-none" // アクティブ：はっきり表示
                  : "opacity-0 invisible -translate-y-4 blur-md", // 非アクティブ：上にズレつつぼやける
              )}
              aria-hidden={activeIndex !== i}
            >
              <span className="text-midblue text-base md:text-2xl tracking-widest mb-4">
                {data.subtitle}
              </span>
              <h2 className="text-midblue text-3xl md:text-5xl font-bold tracking-wide">
                {data.title}
              </h2>
            </div>
          ))}
        </div>

        {/* ==========================================
            【PC版】横スクロール（ホリゾンタル） UI
        ========================================== */}
        <motion.div
          className="absolute left-0 top-[10%] hidden md:flex h-full w-max pl-[7.5vw] will-change-transform"
          style={{ x: xTransformPC }}
        >
          {STORY_DATA.map((data, i) => (
            <div
              key={`pc-wrap-${i}`}
              // 💡 修正: カードの起点を pt-[25vh] lg:pt-[28vh] に引き上げ、上下余白を均等に
              className="w-[85vw] h-full flex justify-center items-start pt-[25vh] lg:pt-[28vh] shrink-0"
            >
              <div
                className={cn(
                  // 💡 変更: transition-opacity を transition-all に変更し、durationを少し長めに
                  "relative flex w-[80vw] max-w-[1080px] h-[45vh] max-h-[480px] shadow-2xl transition-all duration-500",
                  activeIndex !== i
                    ? "pointer-events-none opacity-40 blur-sm scale-[0.98]" // 💡 追加: わずかに縮小(scale)とブラー(blur-sm)で奥行きを出す
                    : "opacity-100 blur-none scale-100",
                )}
                inert={activeIndex !== i}
              >
                {/* 💡 写真エリア：幅を45%に調整 */}
                <div className="relative w-[45%] h-full">
                  <Image
                    src={data.img}
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
                {/* 💡 テキストエリア：幅を55%に広げ、内側の余白(p)を調整。さらにスクロールバーを非表示にしつつスクロール可能に */}
                <div className="w-[55%] h-full bg-white flex flex-col justify-center p-8 lg:p-14 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <h3 className="text-2xl lg:text-4xl font-bold leading-tight text-midblue mb-6 whitespace-pre-wrap">
                    {data.text1}
                  </h3>
                  <p className="text-sm lg:text-base leading-loose text-midblue whitespace-pre-wrap">
                    {data.text2}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ==========================================
            【SP版】縦カードスタック UI
        ========================================== */}
        <div className="flex md:hidden relative w-full h-full pt-[25vh]">
          {STORY_DATA.map((data, i) => (
            <motion.div
              key={`sp-card-${i}`}
              style={
                i === 0
                  ? {}
                  : { y: spTransforms[i] || "0vh", willChange: "transform" }
              }
              className={cn(
                "absolute inset-x-4 top-[30vh] bottom-14 shadow-2xl bg-white flex flex-col transition-all duration-500",
                activeIndex !== i
                  ? "blur-sm opacity-40"
                  : "blur-none opacity-100",
              )}
              inert={activeIndex !== i}
            >
              {/* 写真エリア */}
              <div className="relative w-full h-[40%]">
                <Image
                  src={data.img}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              {/* テキストエリア */}
              <div className="w-full h-[60%] flex flex-col justify-center p-6 overflow-y-auto">
                <h3 className="text-2xl font-bold leading-tight text-midblue mb-4 whitespace-pre-wrap">
                  {data.text1}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {data.text2}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ==========================================
            ドットインジケーター（現在地表示）
        ========================================== */}
        <div className="absolute bottom-4 md:bottom-10 left-0 w-full flex justify-center gap-4 z-50">
          {STORY_DATA.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => handleDotClick(i)}
              aria-label={`${i + 1}枚目のスライドへ移動`}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer",
                activeIndex === i
                  ? "bg-midblue scale-110"
                  : "bg-white hover:bg-midblue/30",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
