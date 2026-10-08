// src/components/shikumi/Section8.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";

// --- 型定義 ---
type TabId = "recruit" | "business" | "media";

interface CaseStudy {
  title: React.ReactNode;
  subTitle?: string;
  company: string;
  desc: string;
  img: string;
}

// --- データ構造 ---
const tabData: { id: TabId; label: string; en: string }[] = [
  { id: "recruit", label: "採用で生まれた変化", en: "Recruit" },
  { id: "business", label: "ビジネスで生まれた変化", en: "Business" },
  { id: "media", label: "発信で生まれた変化", en: "Media" },
];

// 💎 エラー原因解消：全タブ分のデータを用意
const caseStudies: Record<TabId, CaseStudy[]> = {
  recruit: [
    {
      title: (
        <>
          応募数が
          <span className="text-4xl md:text-[2.5rem] leading-none mx-1 font-extrabold text-[#003064]">
            30
          </span>
          倍に急増
        </>
      ),
      subTitle: "3か月で1名から1か月で10名へ！",
      company: "兵庫 / 2025年選出 日本エレクトロニクス工業株式会社",
      desc: "選出実績を求人票や会社説明資料などに掲載。応募者との新しい接点が生まれた事例。",
      img: "/images/shikumi/section8/recruit1.webp",
    },
    {
      title: (
        <>
          1時間で
          <span className="text-4xl md:text-[2.5rem] leading-none mx-1 font-extrabold text-[#003064]">
            40
          </span>
          件以上の応募
        </>
      ),
      company: "愛知 / 2024年選出 株式会社HELLObase",
      desc: "100選選出後の採用活動で、Indeed募集に1時間で40件以上の応募が集まった事例。",
      img: "/images/shikumi/section8/recruit2.webp",
    },
    {
      title: (
        <>
          年間1名→
          <span className="text-4xl md:text-[2.5rem] leading-none mx-1 font-extrabold text-[#003064]">
            年間10名
          </span>
          採用へ
        </>
      ),
      company: "群馬 / 2024年選出 サン株式会社",
      desc: "選出実績の発信や合同説明会などでの活用を通じ、学生との接点が増加した事例。",
      img: "/images/shikumi/section8/recruit3.webp",
    },
  ],
  business: [
    {
      title: "仕事の問い合わせが年間10倍以上に",
      company: "堺・泉州 / 2024年選出 株式会社弘進製作所",
      desc: "エンブレムを自社ホームページに掲載。選出前にはほとんどなかった仕事の問い合わせが増加した事例。",
      img: "/images/shikumi/section8/business1.webp",
    },
  ],
  media: [
    {
      title: "選出後メディアを通じて全国へ発信",
      company: "埼玉 / 2024年選出 サンクジャパン株式会社",
      desc: "Yahoo!ニュースのエキスパート記事などで、100選への選出と企業の取り組みが紹介された事例。",
      img: "/images/shikumi/section8/media1.webp",
    },
  ],
};

export default function Section8() {
  const [activeTab, setActiveTab] = useState<TabId>(tabData[0].id);

  const currentStudies = caseStudies[activeTab] ?? [];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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

  return (
    <section
      id="section8"
      className="relative w-full overflow-hidden bg-[linear-gradient(to_bottom,#ECFFF5_0%,#F9FDF2_30%,#F9FDF2_100%)] py-24 md:py-32"
    >
      <Container className="relative z-10 flex flex-col items-center">
        {/* --- ヘッダー部分 --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <motion.div
            variants={itemFadeUp}
            className="flex justify-center items-center mb-6 md:mb-8"
          >
            <span className="bg-[linear-gradient(135deg,#003064_32%,#004895_53%,#0052AA_67%,#004289_76%,#003064_88%)] text-white text-xs md:text-sm font-bodoni tracking-widest px-6 py-1 shadow-sm">
              Results are produced
            </span>
          </motion.div>

          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            企業の価値に、
            <br className="md:hidden" />
            結果が追いついていく。
          </Heading2>

          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            もともとあった価値が伝わることで、新しい接点が生まれ
            <br className="hidden md:block" />
            その接点が新たな結果を生み出します。
          </Text>
        </motion.div>
        {/* --- タブ＆コンテンツエリア --- */}
        <div className="w-full max-w-5xl mt-16 flex flex-col lg:flex-row gap-8 lg:gap-0 relative">
          {/* 左：タブリスト */}
          <div
            role="tablist"
            className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:w-1/3 lg:max-w-[280px] shrink-0 scrollbar-hide relative z-10 lg:-mr-4 lg:pt-4"
          >
            {tabData.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center justify-between p-6 rounded-lg border text-left 
                    transition-all duration-300 ease-out min-w-[240px] lg:min-w-0
                    
                    /* PCホバー時のアクション (大きくして右に被せる) */
                    lg:hover:w-[calc(100%+16px)] lg:hover:scale-[1.02] lg:hover:shadow-lg lg:hover:z-20 lg:hover:bg-white
                    
                    /* スマホホバー時のアクション (色は変えるが大きくしない) */
                    hover:bg-white/80 hover:border-gray-300
                    
                    /* アクティブ状態のスタイル (大きさは通常に戻し、色と影で強調) */
                    ${
                      isActive
                        ? "bg-white shadow-md border-transparent text-text w-full lg:w-full scale-100"
                        : "bg-[#F9FDF2]/80 border-gray-200 text-text w-full lg:w-full scale-100"
                    }
                  `}
                >
                  <div>
                    <span className="text-xs text-[#003064] font-bodoni font-medium tracking-wider">
                      {tab.en}
                    </span>
                    <h3 className="text-base md:text-lg font-bold mt-1 tracking-wide text-text">
                      {tab.label}
                    </h3>
                  </div>
                  <span
                    className={`text-xl transition-transform duration-300 ${
                      isActive
                        ? "translate-x-1 text-[#003064]"
                        : "text-gray-300"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* 右：コンテンツエリア（Framer Motion） */}
          <div className="relative z-0 lg:w-2/3 lg:flex-1 bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10 lg:pl-14 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                role="tabpanel"
                className="flex flex-col gap-10"
              >
                {currentStudies.length > 0 ? (
                  currentStudies.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-10 last:border-0 last:pb-0"
                    >
                      {/* 画像エリア */}
                      <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-gray-50 overflow-hidden relative shrink-0">
                        <Image
                          src={item.img}
                          alt={`${item.company}の事例画像`}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* テキストエリア */}
                      <div className="w-full md:w-2/3 flex flex-col justify-center">
                        <div className="flex flex-wrap items-end gap-3 mb-3">
                          <h4 className="text-xl md:text-2xl font-bold text-text flex items-baseline">
                            {item.title}
                          </h4>
                          {item.subTitle && (
                            <span className="text-xs md:text-sm font-bold text-[#003064] bg-[#003064]/5 px-2 py-1 rounded">
                              / {item.subTitle}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-gray-500 mb-4 tracking-wide">
                          {item.company}
                        </p>
                        <p className="text-sm md:text-base leading-relaxed text-text2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 text-gray-400">
                    現在、準備中です。
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
