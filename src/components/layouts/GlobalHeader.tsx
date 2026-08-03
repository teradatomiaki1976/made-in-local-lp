// src/components/layouts/GlobalHeader.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  return (
    <>
      {/* -------------------------------------------
          1. ヘッダー部分（PC/スマホ共通上部ナビ）
      ------------------------------------------- */}
      <motion.header
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-base-bright/90 backdrop-blur-md print:hidden"
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
          <div className="font-serif font-bold text-text leading-none">
            <span className="text-[10px] md:text-sm block">地域を代表する</span>
            <span className="text-sm md:text-xl block">企業100選</span>
          </div>
        </div>

        {/* 中央: 切り替えトグル */}
        <div className="flex bg-white rounded-full shadow-sm border border-gray-100 p-1">
          <button
            onClick={() => onPageChange("omoi")}
            className={cn(
              "flex items-center justify-center rounded-full font-bold transition-colors",
              "w-12 h-10 md:w-auto md:h-auto md:px-8 md:py-3 text-sm",
              activePage === "omoi"
                ? "bg-base text-white"
                : "text-text hover:bg-gray-50",
            )}
          >
            <span className="md:hidden">想</span>
            <span className="hidden md:inline">想いから感じる</span>
          </button>
          <button
            onClick={() => onPageChange("shikumi")}
            className={cn(
              "flex items-center justify-center rounded-full font-bold transition-colors",
              "w-12 h-10 md:w-auto md:h-auto md:px-8 md:py-3 text-sm",
              activePage === "shikumi"
                ? "bg-base3 text-white"
                : "text-text hover:bg-gray-50",
            )}
          >
            <span className="md:hidden">理</span>
            <span className="hidden md:inline">仕組みから理解する</span>
          </button>
        </div>

        {/* 右: PC版CTAボタン（スマホでは md:block で非表示） */}
        <button className="hidden md:block bg-[#003064] text-white px-8 py-3 rounded-md font-bold text-sm shadow-md hover:opacity-90 transition-opacity">
          選出について
          <br />
          相談する
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
          className="w-full bg-[#003064] text-white font-bold text-lg pt-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] active:bg-[#002244] transition-colors"
          style={{
            // 👇 iPhoneのホームバー（セーフエリア）対策
            paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)",
          }}
        >
          選出について相談する
        </button>
      </motion.div>
    </>
  );
}
