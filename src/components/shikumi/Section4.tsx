// src/components/shikumi/Section4.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";
import { companies, Company } from "@/data/companies";
import CompanyModal from "./CompanyModal";

export default function Section4() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  // 💎 カード群を囲むコンテナのRefを追加
  const carouselRef = useRef<HTMLDivElement>(null);
  // 💎 移動すべきピクセル量を格納するState
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 💎 コンテンツの「本当の横幅」から「画面幅」を引いて、移動距離を正確に計算
  useEffect(() => {
    const updateScrollRange = () => {
      if (carouselRef.current) {
        setScrollRange(carouselRef.current.scrollWidth - window.innerWidth);
      }
    };

    updateScrollRange();
    // 画面サイズが変わった時にも再計算する
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, []);

  // 💎 魔法1：スクロール進捗に「物理演算（重さと摩擦）」を付与する
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.2, // 重さ（少しの慣性を残す）
    stiffness: 80, // バネの強さ（低いほど追従がゆったりになる）
    damping: 20, // 摩擦（ピタッと止まらず、スゥッと止まる）
    restDelta: 0.001, // アニメーションの終了判定精度
  });

  // 💎 魔法2：scrollYProgress ではなく smoothProgress を使って横移動を計算
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

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

  return (
    <section
      id="section4"
      ref={sectionRef}
      style={{ height: `calc(100vh + ${scrollRange}px)` }}
      className="relative w-full bg-[linear-gradient(to_bottom,#ECFFF5_0%,#F9FDF2_30%,#F9FDF2_100%)]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-16 md:py-24">
        {/* 見出しエリア */}
        <Container className="relative z-10 flex flex-col items-center text-center shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
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
            地域も、業種も、企業規模も違う。
            <br className="hidden md:block" />
            それでも、地域を代表する理由がある。
          </Heading2>
          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            全国の選出企業から、一部をご紹介。
          </Text>
        </Container>

        {/* スクロール連動エリア */}
        <div className="relative w-full mt-4 md:mt-12 flex flex-col items-start overflow-hidden">
          {/* 両サイドの白フェード */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#F9FDF2] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#F9FDF2] to-transparent z-10 pointer-events-none" />

          {/* 💎 Framer Motionコンテナ */}
          <motion.div
            ref={carouselRef}
            style={{ x }}
            className="flex gap-6 w-max px-12 md:px-[calc(50vw-140px)] py-10"
          >
            {companies.map((company, index) => (
              <div
                key={`${company.id}-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedCompany(company)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setSelectedCompany(company)
                }
                className="group shrink-0 w-[200px] md:w-[280px] h-[200px] md:h-[280px] bg-white/80 border border-white rounded-md p-6 flex flex-col justify-between transition-all duration-300 ease-out shadow-sm hover:scale-[1.03] hover:bg-white/100 hover:shadow-xl hover:border-[#9a8452] outline-none focus-visible:ring-2 focus-visible:ring-[#9a8452] cursor-pointer"
              >
                <div className="flex justify-center items-center gap-2">
                  <span className="font-bodoni text-text2 text-base md:text-2xl">
                    {company.no}
                  </span>
                  <span className="text-xs tracking-wider text-text2 font-sans">
                    {company.area}
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center w-full my-auto pointer-events-none">
                  {/* 💎 内側の箱：ここで画像サイズを厳格にロックする（h-12〜14あたりが上品でおすすめ） */}
                  <div className="relative h-12 w-3/4 mx-auto">
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
                  <h3 className="text-sm md:text-base font-bold ">
                    {company.name}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>

          {/* プログレスバー */}
          <div className="mt-10 w-full flex items-center justify-center z-20 shrink-0">
            <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-[#9a8452] origin-left"
              />
            </div>
          </div>
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
    </section>
  );
}
