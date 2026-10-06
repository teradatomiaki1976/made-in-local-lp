// src/components/shikumi/Section4.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";
import { companies, Company } from "@/data/companies";
import CompanyModal from "./CompanyModal"; // ※こちらも後でTailwind化が必要

export default function Section4() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Swiperの等速スクロールを有効にするためのインラインスタイル（Tailwindと併用）
  const swiperStyle = `
    .swiper-continuous .swiper-wrapper {
      transition-timing-function: linear !important;
    }
  `;

  return (
    <section
      id="section4"
      className="relative w-full overflow-hidden bg-[linear-gradient(to_bottom,#ECFFF5_0%,#F9FDF2_30%,#F9FDF2_100%)] py-24 md:py-32"
    >
      <style>{swiperStyle}</style>

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* ラベル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="bg-[linear-gradient(135deg,#003064_32%,#004895_53%,#0052AA_67%,#004289_76%,#003064_88%)] text-white text-xs md:text-sm font-bodoni tracking-widest px-6 py-1.5 shadow-sm">
            There is a reason.
          </span>
        </motion.div>

        {/* メイン見出し */}
        <Heading2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          地域も、業種も、企業規模も違う。
          <br className="hidden md:block" />
          それでも、地域を代表する理由がある。
        </Heading2>

        {/* サブテキスト */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <Text>全国の選出企業から、一部をご紹介。</Text>
        </motion.div>
      </Container>

      {/* スライダーエリア */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-16 md:mt-24 relative w-full flex flex-col items-center"
      >
        {/* 両端のフェードアウト効果 */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#F9FDF2] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#F9FDF2] to-transparent z-10 pointer-events-none" />

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={24}
          slidesPerView="auto"
          loop={true}
          freeMode={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="swiper-continuous w-full pb-4 px-4"
        >
          {companies.map((company, index) => (
            <SwiperSlide
              key={`${company.id}-${index}`}
              style={{ width: "280px" }} // デザインに合わせて幅をスリム化
            >
              <article
                className="group relative bg-white border border-gray-200 rounded p-6 h-[280px] flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out shadow-sm hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:border-[#9a8452]"
                onClick={() => setSelectedCompany(company)}
              >
                {/* 番号とエリア */}
                <div className="flex items-baseline gap-2 text-[#111317]">
                  <span className="font-bodoni text-lg font-bold">
                    {company.no}
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-[#9a8452]">
                    {company.area}
                  </span>
                </div>

                {/* 企業ロゴ（中央配置） */}
                <div className="relative h-20 w-full my-auto flex-1 flex items-center justify-center">
                  {company.logoPath ? (
                    <Image
                      src={company.logoPath}
                      alt={`${company.name}のロゴ`}
                      fill
                      className="object-contain object-center"
                    />
                  ) : (
                    <span className="text-gray-300 text-xs tracking-widest font-bold">
                      LOGO
                    </span>
                  )}
                </div>

                {/* 社名 */}
                <h3 className="text-sm font-bold leading-snug text-[#111317]">
                  {company.name}
                </h3>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* デザインカンプにある下部のナビゲーションUI（ダミー配置） */}
        <div className="mt-8 flex items-center gap-6 z-20">
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-[#9a8452] rounded-full"></div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-gray-500 text-sm">←</span>
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-gray-500 text-sm">→</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* モーダル */}
      <CompanyModal
        company={selectedCompany}
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </section>
  );
}
