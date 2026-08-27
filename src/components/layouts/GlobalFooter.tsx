// src/components/layouts/GlobalFooter.tsx
"use client";

import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";

type GlobalFooterProps = {
  activePage: "omoi" | "shikumi";
  onPageChange: (page: "omoi" | "shikumi") => void;
};

export default function GlobalFooter({
  activePage,
  onPageChange,
}: GlobalFooterProps) {
  const currentYear = new Date().getFullYear();
  const isOmoi = activePage === "omoi";

  // 左ボタン（ページ遷移）の動的コンテンツ設定
  const switchTarget = isOmoi ? "shikumi" : "omoi";
  const switchLabel = isOmoi
    ? "審査基準や、具体的な仕組みを見る"
    : "100選に込めた想いと物語を読む";
  const switchBtnText = isOmoi ? "仕組みから理解する" : "想いから感じる";

  // 色の出し分け: 仕組みへはOlive(オリーブ/ゴールド)系、想いへはMidblue(青)系
  const switchColorClass = isOmoi
    ? "from-[#695F1F] to-[#49410e] hover:from-[#726722] hover:to-[#564d11] border-[#4f460f]/30"
    : "from-[#00529B] to-[#002A5C] hover:from-[#0062B8] hover:to-[#003370] border-[#001D40]/30";
  // ※右の相談ボタン(濃いネイビー)と同化しないよう、少し明るめのブルーに設定

  // スクロール状態の管理
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full flex flex-col z-50 relative">
      {/* --- CTA領域（全ページ共通配置） --- */}
      <div className="relative z-10 w-full bg-creem text-midblue py-16 md:py-24 px-6 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center">
          {/* 左：ページ遷移ボタン（動的） */}
          <div className="flex-1 w-full text-center flex flex-col items-center border-b md:border-b-0 md:border-r border-midblue/20 pb-8 md:pb-0 md:pr-16">
            <p className="font-bold mb-6 font-sans text-lg">{switchLabel}</p>
            <button
              onClick={() => onPageChange(switchTarget)}
              className={`w-full max-w-sm bg-linear-to-b font-sans text-white py-8 rounded-lg font-bold text-xl shadow-[0_4px_12px_rgba(0,42,92,0.4)] hover:shadow-[0_6px_16px_rgba(0,42,92,0.5)] border transition-all duration-300 cursor-pointer group relative overflow-hidden flex items-center justify-center gap-2 ${switchColorClass}`}
              style={{
                paddingBottom: "calc(env(safe-area-inset-bottom) + 32px)",
              }}
            >
              <span className="absolute top-0 left-0 w-full h-px bg-white/20"></span>
              <FiChevronRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
              <span className="tracking-wide">{switchBtnText}</span>
            </button>
          </div>

          {/* 右：CVボタン（固定） */}
          <div className="flex-1 w-full text-center flex flex-col items-center">
            <p className="font-bold mb-6 font-sans text-lg">
              エントリーのご相談・面談予約はこちら
            </p>
            <button
              className="w-full max-w-sm bg-linear-to-b from-[#007a8c] to-[#00535f] font-sans text-white py-8 rounded-lg font-bold text-xl shadow-[0_4px_12px_rgba(0,42,92,0.4)] hover:from-[#008396] hover:to-[#005b68] hover:shadow-[0_6px_16px_rgba(0,42,92,0.5)] border border-[#00454f]/30 transition-all duration-300 cursor-pointer group relative overflow-hidden flex items-center justify-center gap-2"
              style={{
                paddingBottom: "calc(env(safe-area-inset-bottom) + 32px)",
              }}
            >
              <span className="absolute top-0 left-0 w-full h-px bg-white/20"></span>
              <FiChevronRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
              <span className="tracking-wide">選出について相談する</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- フッター領域 --- */}
      <div className="w-full bg-midblue py-16 md:py-24 flex flex-col items-center justify-center relative">
        <button
          onClick={scrollToTop}
          // z-20を追加して直前のCTA領域（z-10）より前面に表示させる
          className="absolute right-4 md:right-12 top-2 -translate-y-[calc(100%+16px)] z-20 flex flex-col items-center justify-center group cursor-pointer"
          aria-label="ページトップへ戻る"
        >
          <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[22px] border-b-midblue transition-transform duration-300 group-hover:-translate-y-1"></div>
          <span className="text-midblue font-bold text-base mt-1 font-sans tracking-widest">
            PAGE TOP
          </span>
        </button>
        <div className="w-[80vw] max-w-md md:max-w-lg mb-12">
          <Image
            src="/images/logo/logo_white.svg"
            alt="地域を代表する企業100選 Best 100 Companies Selected By Made In Local"
            width={800}
            height={200}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="text-white/60 text-xs md:text-sm font-sans tracking-widest text-center px-4">
          © {currentYear} 株式会社IOBI all right reserved
        </div>
      </div>
    </footer>
  );
}
