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
const tabData: {
  id: TabId;
  label: string;
  mobileLabels: string[];
  en: string;
}[] = [
  {
    id: "recruit",
    label: "採用で生まれた変化",
    mobileLabels: ["採用で", "生まれた", "変化"],
    en: "Recruit",
  },
  {
    id: "business",
    label: "ビジネスで生まれた変化",
    mobileLabels: ["ビジネスで", "生まれた", "変化"],
    en: "Business",
  },
  {
    id: "media",
    label: "発信で生まれた変化",
    mobileLabels: ["発信で", "生まれた", "変化"],
    en: "Media",
  },
];

const caseStudies: Record<TabId, CaseStudy[]> = {
  recruit: [
    {
      title: (
        <>
          応募数が
          <span className="text-4xl md:text-[2.5rem] leading-none mx-1 font-extrabold text-text">
            30
          </span>
          倍に急増
        </>
      ),
      subTitle: "3か月で1名から1か月で10名へ!",
      company: "兵庫 / 2025年選出 日本エレクトロニクス工業株式会社",
      desc: "選出実績を求人票や会社説明資料などに掲載。応募者との新しい接点が生まれた事例。",
      img: "/images/shikumi/section8/recruit1.webp",
    },
    {
      title: (
        <>
          1時間で
          <span className="text-4xl md:text-[2.5rem] leading-none mx-1 font-extrabold text-text">
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
          年間1名から
          <span className="text-4xl md:text-[2.5rem] leading-none mx-1 font-extrabold text-text">
            10名
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
    {
      title: "「費用は高くても御社に決めます」",
      company: "愛知 / 2024年選出 株式会社中部住器",
      desc: "選出実績を顧客とのコミュニケーションに活用し、企業を判断する材料の一つとして機能した事例。",
      img: "/images/shikumi/section8/business1.webp",
    },
    {
      title: "年間2,000万円の新規売上へ",
      company: "愛知 / 2024年選出 タカツー株式会社",
      desc: "Webサイトで選出実績を発信した後、新規問い合わせが増え、新しい顧客との接点につながった事例。",
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
    {
      title: "100選選出をきっかけにテレビの経済番組で紹介",
      company: "埼玉 / 2024年選出 株式会社埼玉アニメーション",
      desc: "テレビ埼玉「埼玉ビジネスウォッチ」で、企業の取り組みが紹介された事例。",
      img: "/images/shikumi/section8/media1.webp",
    },
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
            className="flex justify-center items-center mb-8 md:mb-12"
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
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-3 lg:gap-0 relative">
          {/* 左：タブリスト */}
          <div
            role="tablist"
            className="grid grid-cols-3 gap-2 md:gap-4 lg:flex lg:flex-col lg:gap-6 lg:overflow-visible lg:w-1/3 lg:max-w-[320px] shrink-0 relative z-10 lg:-mr-4 lg:pt-4"
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
                    relative flex flex-col lg:flex-row bg-white items-center justify-center lg:justify-between px-0 py-6 lg:px-6 lg:py-8 rounded-lg border border-text2/30 
                    transition-all duration-300 ease-out 
                    
                    /* PCホバー時のアクション (大きくして右に被せる) */
                    lg:hover:w-[calc(100%+16px)] lg:hover:scale-[1.1] lg:hover:shadow-lg lg:hover:z-20 lg:hover:bg-[#F9FDF2]
                    
                    /* スマホホバー時のアクション */
                    hover:bg-[#F9FDF2]/80 hover:border-gray-300
                    
                    /* アクティブ状態のスタイル */
                    ${
                      isActive
                        ? "bg-[#F9FDF2] shadow-md text-text w-full scale-100 border-[#003064]/30 lg:border-text2/30"
                        : "bg-white text-text w-full scale-100"
                    }
                  `}
                >
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                    <span className="text-[10px] md:text-xs text-text font-bodoni font-medium tracking-wider px-2 md:px-3 pt-0.5 md:pt-1 border border-text/50 bg-white">
                      {tab.en}
                    </span>
                    <h3 className="text-[13px] md:text-base lg:text-xl font-bold mt-2 md:mt-3 tracking-wide text-text leading-snug lg:leading-normal">
                      <span className="hidden lg:inline">{tab.label}</span>
                      {/* スマホ表示用 */}
                      <span className="lg:hidden">
                        {tab.mobileLabels.map((text, i) => (
                          <span key={i} className="block">
                            {text}
                          </span>
                        ))}
                      </span>
                    </h3>
                  </div>

                  {/* スマホ用アイコン (下矢印) */}
                  <span
                    className={`mt-2 lg:hidden transition-transform duration-300 flex items-center justify-center ${
                      isActive ? "text-text translate-y-1" : "text-gray-300"
                    }`}
                  >
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 1L7 7L13 1" />
                    </svg>
                  </span>

                  {/* PC用アイコン (右矢印) */}
                  <span
                    className={`hidden lg:block text-xl transition-transform duration-300 ${
                      isActive ? "translate-x-1 text-text" : "text-gray-300"
                    }`}
                  >
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 1L7 7L1 13" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>

          {/* 右：コンテンツエリア */}
          <div className="relative z-0 lg:w-2/3 lg:flex-1 bg-white rounded-2xl shadow-md border border-text2/30 p-6 md:p-10 lg:pl-14 min-h-[500px]">
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
                        <div className="flex flex-wrap items-end gap-2 mb-2">
                          <h4 className="text-xl md:text-2xl font-bold text-text flex items-baseline border-b border-text/30 pb-1">
                            {item.title}
                          </h4>
                          {item.subTitle && (
                            <span className="text-xs md:text-sm font-bold text-text bg-text/5 px-2 py-1 rounded">
                              {item.subTitle}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-text2 mb-4 tracking-wide">
                          {item.company}
                        </p>
                        <p className="text-sm md:text-base leading-relaxed text-text font-sans">
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
