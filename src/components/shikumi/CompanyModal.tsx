// src/components/shikumi/CompanyModal.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Company } from "@/data/companies";

interface CompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  // 💎 左右遷移用のPropsを追加
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function CompanyModal({
  company,
  isOpen,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: CompanyModalProps) {
  if (!company) return null;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open: boolean) => !open && onClose()}
    >
      <Dialog.Portal>
        {/* 💎 背景ブラーとZ-indexの強化（ヘッダー被り防止） */}
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-white/70 backdrop-blur-md transition-all duration-500 ease-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />

        {/* モーダル本体（外側にボタンを配置するため overflow-visible にする） */}
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 flex flex-col duration-500 ease-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 outline-none">
          {/* 💎 閉じるボタン（デザイン通り右上外側に配置） */}
          <Dialog.Close className="absolute -top-12 right-0 md:-right-12 md:-top-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9a8452]">
            <X size={20} aria-label="閉じる" />
          </Dialog.Close>

          {/* 💎 左右のArrowボタン（PC時のみ両サイドに展開） */}
          {hasPrev && (
            <button
              onClick={onPrev}
              className="hidden md:flex absolute top-1/2 -left-16 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#9a8452] transition-all shadow-sm focus:outline-none"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          {hasNext && (
            <button
              onClick={onNext}
              className="hidden md:flex absolute top-1/2 -right-16 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#9a8452] transition-all shadow-sm focus:outline-none"
            >
              <ArrowRight size={20} />
            </button>
          )}

          {/* 💎 白いカード部分 */}
          <AnimatePresence mode="wait">
            <motion.div
              // 💎 keyに company.id を渡すことで、企業が変わるたびにアニメーションが発火
              key={company.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-xl shadow-2xl flex flex-col max-h-[85dvh] w-full overflow-hidden relative"
            >
              <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-10">
                {/* ヘッダーエリア */}
                <div className="flex flex-col items-center text-center mb-6 md:mb-8">
                  <div className="text-[11px] font-extrabold tracking-wider text-[#9a8452] mb-3 md:mb-4">
                    {company.no} {company.area}
                  </div>
                  <div className="relative h-10 md:h-12 w-3/4 mx-auto mb-4 md:mb-6">
                    {company.logoPath ? (
                      <Image
                        src={company.logoPath}
                        alt={`${company.name}のロゴ`}
                        fill
                        className="object-contain object-center"
                      />
                    ) : (
                      <span className="text-gray-300 text-xs tracking-widest font-bold flex items-center justify-center h-full">
                        LOGO
                      </span>
                    )}
                  </div>
                  <Dialog.Title className="text-xl md:text-3xl font-bold">
                    {company.name}
                  </Dialog.Title>
                </div>

                {/* メインビジュアル */}
                <div className="relative w-full aspect-[4/2] md:aspect-video bg-gray-100 rounded-md overflow-hidden mb-6 md:mb-8">
                  <Image
                    src={`${company.mainImagePath}`}
                    alt={`${company.name}の現場写真`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                </div>

                {/* 企業説明テキスト */}
                <Dialog.Description className="text-[12px] md:text-[15px] leading-base m-0 pb-4">
                  {company.desc}
                </Dialog.Description>
              </div>

              {/* 💎 CTAボタン＆スマホ用ナビゲーション（shrink-0 で押し潰されないようにし、最下部に固定） */}
              <div className="shrink-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-4 md:p-6 flex flex-col items-center z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <div className="flex justify-center w-full">
                  <a
                    href={`/100sen/companies/${company.id}`}
                    className="w-full md:w-auto inline-flex items-center justify-center bg-[#003064] text-white font-bold text-sm tracking-wider py-4 px-6 md:px-10 rounded-md transition-all hover:bg-[#004895] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#003064] focus:ring-offset-2"
                  >
                    → 100選特設ページを見る
                  </a>
                </div>

                {/* スマホ用：下部の左右ボタン */}
                <div className="flex justify-center gap-4 mt-4 md:hidden w-full">
                  <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="flex-1 h-12 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center disabled:opacity-30"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="flex-1 h-12 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center disabled:opacity-30"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
