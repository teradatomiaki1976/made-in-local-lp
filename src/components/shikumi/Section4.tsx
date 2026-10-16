// src/components/shikumi/Section4.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";
import { companies, Company } from "@/data/companies";
import CompanyModal from "./CompanyModal";
import { Section } from "@/components/ui/Section";

export default function Section4() {
  // --- アニメーションの定義（variants） ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const isModalOpen = useRef(false);

  // 💎 PCマウスドラッグ制御用のRef
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const currentIndex = selectedCompany
    ? companies.findIndex((c) => c.id === selectedCompany.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < companies.length - 1;

  const handlePrev = () => {
    if (hasPrev) setSelectedCompany(companies[currentIndex - 1]);
  };
  const handleNext = () => {
    if (hasNext) setSelectedCompany(companies[currentIndex + 1]);
  };

  useEffect(() => {
    isModalOpen.current = !!selectedCompany;
  }, [selectedCompany]);

  // 💎 マウスドラッグ処理のハンドラー
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isHovered.current = true; // 自動スクロールを停止
    if (carouselRef.current) {
      startX.current = e.pageX - carouselRef.current.offsetLeft;
      scrollLeftPos.current = carouselRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    isHovered.current = false; // 自動スクロール再開
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isHovered.current = false; // 自動スクロール再開
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // スクロール速度の倍率
    carouselRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const CompanyList = () => (
    <div className="flex gap-6 pr-6">
      {companies.map((company, index) => (
        <div
          key={`${company.id}-${index}`}
          role="button"
          tabIndex={0}
          onClick={() => setSelectedCompany(company)}
          onKeyDown={(e) => e.key === "Enter" && setSelectedCompany(company)}
          className="group shrink-0 w-[200px] md:w-[280px] h-[180px] md:h-[220px] bg-white/80 border border-white rounded-md p-6 flex flex-col justify-between transition-all duration-300 ease-out shadow-sm hover:scale-[1.03] hover:bg-white/100 hover:shadow-xl hover:border-[#9a8452] outline-none focus-visible:ring-2 focus-visible:ring-[#9a8452] cursor-pointer"
        >
          <div className="flex justify-center items-center gap-2">
            <span className="text-xs tracking-wider text-text2 font-sans">
              {company.area}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center w-full my-auto pointer-events-none">
            <div className="relative h-10 w-2/4 md:h-12 md:w-3/4 mx-auto">
              {company.logoPath ? (
                <Image
                  src={company.logoPath}
                  alt={`${company.name}のロゴ`}
                  fill
                  className="object-contain object-center"
                />
              ) : (
                <span className="text-gray-300 text-xs tracking-widest font-bold flex items-center justify-center h-full w-full">
                  LOGO
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <h3 className="text-sm md:text-base font-bold ">{company.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let animationFrameId: number;

    const initTimer = setTimeout(() => {
      if (el) el.scrollLeft = el.scrollWidth / 3;
    }, 100);

    const scroll = () => {
      // ホバー・ドラッグしておらず、モーダルも開いていない時だけ流す
      if (!isHovered.current && !isModalOpen.current) {
        el.scrollLeft -= 0.5;

        // ワープ処理
        if (el.scrollLeft <= 0) {
          el.scrollLeft += el.scrollWidth / 3;
        } else if (el.scrollLeft >= (el.scrollWidth / 3) * 2) {
          el.scrollLeft -= el.scrollWidth / 3;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <Section id="section4" theme="light">
      <Container className="relative z-10 flex flex-col items-center text-center shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-12"
        >
          <motion.div variants={itemFadeUp} className="mb-8 md:mb-12">
            <span className="bg-[linear-gradient(135deg,#003064_32%,#004895_53%,#0052AA_67%,#004289_76%,#003064_88%)] text-white text-xs md:text-sm font-bodoni tracking-widest px-6 py-1.5 shadow-sm">
              There is a reason.
            </span>
          </motion.div>

          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            地域も業種も、企業規模も違う。
            <br className="hidden md:block" />
            それでも地域を代表する理由がある。
          </Heading2>
          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            全国の選出企業から、一部をご紹介。
          </Text>
        </motion.div>
      </Container>

      <div className="relative w-full mt-8 md:mt-12 flex flex-col items-center">
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#F9FDF2] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#F9FDF2] to-transparent z-10 pointer-events-none" />

        <div
          ref={carouselRef}
          className="flex w-full overflow-x-auto py-4 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none"
          // タッチイベント（スマホ）
          onTouchStart={() => {
            isHovered.current = true;
          }}
          onTouchEnd={() => {
            isHovered.current = false;
          }}
          // マウスイベント（PCドラッグ）
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="flex w-max pointer-events-auto">
            <CompanyList />
            <CompanyList />
            <CompanyList />
          </div>
        </div>
        <div className="mt-2 md:mt-6 w-full flex justify-center z-10 pointer-events-none">
          <motion.div
            animate={{ x: [-4, 4, -4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/80 text-[#003064] text-[11px] md:text-sm font-bold font-sans px-5 py-2 md:py-2.5 rounded-full shadow-sm border border-[#003064]/10 flex items-center gap-3 backdrop-blur-sm"
          >
            <span>←</span> 横にスクロールして他の企業を見る <span>→</span>
          </motion.div>
        </div>
      </div>

      <CompanyModal
        company={selectedCompany}
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </Section>
  );
}
