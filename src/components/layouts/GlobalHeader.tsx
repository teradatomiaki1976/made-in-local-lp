// src/components/layouts/GlobalHeader.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHeaderStore } from "@/store/useHeaderStore";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";

type GlobalHeaderProps = {
  isVisible: boolean;
  activePage: "omoi" | "shikumi";
  onPageChange: (page: "omoi" | "shikumi") => void;
};

export default function GlobalHeader({
  isVisible,
  activePage,
  onPageChange,
}: GlobalHeaderProps) {
  const isDarkBg = useHeaderStore((state) => state.isDarkBg);
  const [mounted, setMounted] = useState(false);

  // 新規追加：FVを通過したかどうかを判定するステート
  const [isPastFV, setIsPastFV] = useState(false);
  const { scrollY } = useScroll();

  // スクロール位置の監視（Framer Motionの最適化されたフックを使用）
  useMotionValueEvent(scrollY, "change", (latest) => {
    // 【重要追加】前回のフレームからの移動距離を計算
    const prev = scrollY.getPrevious() || 0;
    const diff = Math.abs(latest - prev);

    // 1フレームで500px以上動くことは人間のスクロールでは不可能。
    // つまりプログラムによるジャンプ（復元）なので、ヘッダーの判定を無視する！
    if (diff > 500) return;

    const fvHeight = typeof window !== "undefined" ? window.innerHeight : 800;
    if (latest > fvHeight * 0.9) {
      setIsPastFV(true);
    } else {
      setIsPastFV(false);
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 backdrop-blur-md transition-colors duration-300 print:hidden",
          mounted && isDarkBg ? "bg-transparent" : "bg-creem/10",
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      >
        {/* 左: ロゴエリア */}
        <div
          className={cn(
            "relative flex items-center justify-center rounded-lg overflow-hidden transition-all duration-300 ease-out",
            isPastFV
              ? "h-10 md:h-14 w-[120px] md:w-[220px] bg-white backdrop-blur-md border border-white/40 shadow-[0_4px_12px_rgba(0,0,0,0.05)] px-3 py-1"
              : "h-14 md:h-20 w-[180px] md:w-[300px] bg-transparent border-transparent shadow-none px-0 py-0",
          )}
          style={{ transformOrigin: "top left" }}
        >
          <div className="relative w-full h-full transition-all duration-300 ease-out">
            <Image
              src="/images/logo/logo_dark.svg"
              alt="100選エンブレム"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* 中央: 切り替えトグル */}
        <div className="flex bg-white/80 rounded-full shadow-sm border border-gray-100 p-1">
          <button
            onClick={() => onPageChange("shikumi")}
            className={cn(
              "flex items-center justify-center rounded-full font-sans font-bold transition-colors cursor-pointer",
              "w-12 h-10 md:w-auto md:h-auto md:px-8 md:py-3 text-sm",
              activePage === "shikumi"
                ? "bg-olive text-white"
                : "text-text hover:bg-gray-50",
            )}
          >
            <span className="md:hidden">理</span>
            <span className="hidden md:inline">仕組みから理解する</span>
          </button>
          <button
            onClick={() => onPageChange("omoi")}
            className={cn(
              "flex items-center justify-center rounded-full font-sans font-bold transition-colors cursor-pointer",
              "w-12 h-10 md:w-auto md:h-auto md:px-8 md:py-3 text-sm",
              activePage === "omoi"
                ? "bg-midblue text-white"
                : "text-text hover:bg-gray-50",
            )}
          >
            <span className="md:hidden">想</span>
            <span className="hidden md:inline">想いから感じる</span>
          </button>
        </div>

        {/* 右: PC版CTAボタン */}
        <a
          href="https://madeinlocal.jp/contact/100selection"
          className="hidden md:flex items-center justify-center gap-1.5 bg-linear-to-b from-[#007a8c] to-[#00535f] font-sans text-white leading-tight px-8 py-3.5 rounded-lg font-bold text-lg shadow-[0_4px_12px_rgba(0,42,92,0.4)] hover:from-[#008396] hover:to-[#005b68] hover:shadow-[0_6px_16px_rgba(0,42,92,0.5)] border border-[#00454f]/30 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          <span className="absolute top-0 left-0 w-full h-px bg-white/20"></span>
          <FiChevronRight
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
          <span className="tracking-wide">選出について相談する</span>
        </a>
      </motion.header>

      {/* スマホ用CTA */}
      <motion.div
        className="md:hidden fixed bottom-0 left-0 w-full z-50 print:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      >
        <a
          href="https://madeinlocal.jp/contact/100selection"
          className="w-full flex items-center justify-center gap-2 bg-linear-to-b from-[#007a8c] to-[#00535f] text-white font-sans font-bold text-lg pt-4 shadow-[0_-4px_12px_rgba(0,42,92,0.3)] active:from-[#008396] active:to-[#005b68] transition-colors duration-300 cursor-pointer group relative overflow-hidden"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
        >
          <span className="absolute top-0 left-0 w-full h-px bg-white/20"></span>
          <FiChevronRight
            className="w-6 h-6 transition-transform duration-300 group-active:translate-x-1"
            aria-hidden="true"
          />
          <span className="tracking-wide">選出について相談する</span>
        </a>
      </motion.div>
    </>
  );
}
