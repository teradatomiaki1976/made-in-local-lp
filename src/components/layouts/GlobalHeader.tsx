// src/components/layouts/GlobalHeader.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHeaderStore } from "@/store/useHeaderStore";
import { FiChevronRight } from "react-icons/fi";

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

  return (
    <>
      {/* -------------------------------------------
          1. ヘッダー部分（PC/スマホ共通上部ナビ）
      ------------------------------------------- */}
      <motion.header
        className={cn(
          "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 backdrop-blur-md print:hidden transition-colors duration-300",
          isDarkBg ? "bg-transparent" : "bg-creem/10",
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      >
        {/* 左: ロゴエリア */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <img
            src="/images/logo/emblem-mark.png"
            alt="100選エンブレム"
            className="h-10 md:h-16 w-auto"
          />
          {/* 👇 テキスト色を動的に変更 */}
          <div
            className={cn(
              "font-serif font-bold leading-none transition-colors duration-300",
              isDarkBg ? "text-white" : "text-midblue",
            )}
          >
            <span className="text-[10px] md:text-sm block">地域を代表する</span>
            <span className="text-sm md:text-xl block">企業100選</span>
          </div>
        </div>

        {/* 中央: 切り替えトグル */}
        <div className="flex bg-white rounded-full shadow-sm border border-gray-100 p-1">
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

        {/* 右: PC版CTAボタン（スマホでは md:block で非表示） */}
        <button className="hidden md:flex items-center justify-center gap-1.5 bg-midblue font-sans text-white leading-tight px-8 py-4 rounded-md font-bold text-base shadow-md hover:opacity-90 transition-opacity cursor-pointer">
          <FiChevronRight
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
          <span>選出について相談する</span>
        </button>
      </motion.header>

      {/* -------------------------------------------
          2. スマホ専用: 画面下部固定CTA
      ------------------------------------------- */}
      <motion.div
        className="md:hidden fixed bottom-0 left-0 w-full z-50 print:hidden"
        // ヘッダーと同じタイミングで下からフェードインさせる
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      >
        <button
          className="w-full flex items-center justify-center gap-2 bg-midblue text-white font-sans font-bold text-lg pt-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] active:bg-[#002244] transition-colors cursor-pointer"
          style={{
            // 👇 iPhoneのホームバー（セーフエリア）対策
            paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)",
          }}
        >
          <FiChevronRight
            className="w-6 h-6 transition-transform duration-300 group-active:translate-x-1"
            aria-hidden="true"
          />
          <span>選出について相談する</span>
        </button>
      </motion.div>
    </>
  );
}
