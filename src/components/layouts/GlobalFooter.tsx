// src/components/layouts/GlobalFooter.tsx
"use client";

import Image from "next/image";

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-midblue py-16 md:py-24 flex flex-col items-center justify-center relative z-50">
      {/* --- ロゴエリア --- */}
      <div className="w-[80vw] max-w-md md:max-w-lg mb-12">
        <Image
          // ※ 画像のパスは実際の配置に合わせて調整してください
          src="/images/logo/logo_white.svg"
          alt="地域を代表する企業100選 Best 100 Companies Selected By Made In Local"
          width={800}
          height={200}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* --- コピーライト --- */}
      <div className="text-white/60 text-xs md:text-sm font-sans tracking-widest text-center px-4">
        © {currentYear} 株式会社IOBI all right reserved
      </div>
    </footer>
  );
}
