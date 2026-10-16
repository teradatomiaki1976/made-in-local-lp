// src/components/shikumi/Section6.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Section";
import { FiExternalLink } from "react-icons/fi";

// 外部API連携を見据えたモックデータ
const mockArticles = [
  {
    id: 1,
    title: "女優「のん」さんがアンバサダー",
    description:
      "「Made In Local」公式アンバサダー[のん]さん継続就任記念「Made In Local×地方創生」特別連携企画を始動。",
    tag: "社会への発信",
    imageUrl: "/images/shikumi/section6/thumb1.webp",
    link: "https://madeinlocal.jp/category/feature/026",
  },
  {
    id: 2,
    title: "経済産業省 近畿経済産業局と連携",
    description:
      "地方創生メディア「Made In Local」が情報発信を強化！経済産業省近畿経済産業局の施策を広く紹介。",
    tag: "行政との接点",
    imageUrl: "/images/shikumi/section6/thumb2.webp",
    link: "https://madeinlocal.jp/category/feature/046",
  },
  {
    id: 3,
    title: "産経新聞主催 地方創生イベント審査員",
    description:
      "株式会社IOBI代表取締役の石井が「地方鉄道×地方創生 ビジネスプランコンテスト」で審査員を務めました。",
    tag: "外部評価の場",
    imageUrl: "/images/shikumi/section6/thumb3.webp",
    link: "https://madeinlocal.jp/category/feature/048",
  },
  {
    id: 4,
    title: "兵庫県西脇市 企業版ふるさと納税アドバイザー",
    description:
      "株式会社IOBI 代表取締役の石井が、兵庫県西脇市の企業版ふるさと納税営業代行・アドバイザーに就任しました！",
    tag: "地域施策",
    imageUrl: "/images/shikumi/section6/thumb4.webp",
    link: "https://madeinlocal.jp/category/feature/061",
  },
  {
    id: 5,
    title: "三重県名張市 公民連携コーディネーター",
    description:
      "三重県名張市の公民連携コーディネーターに株式会社IOBI代表取締役石井が就任しました！",
    tag: "地域施策",
    imageUrl: "/images/shikumi/section6/thumb5.webp",
    link: "https://madeinlocal.jp/category/feature/040",
  },
  {
    id: 6,
    title: "内閣府 地方創生SDGs官民連携PFで分科会設立",
    description:
      "株式会社IOBIが内閣府「地方創生SDGs官民連携プラットフォーム」に分科会を設置しました！",
    tag: "官民連携",
    imageUrl: "/images/shikumi/section6/thumb6.webp",
    link: "https://madeinlocal.jp/category/feature/068",
  },
];

export default function Section6() {
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
    <Section id="section6" theme="light">
      <Container className="relative z-10 flex flex-col items-center">
        {/* ラベル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12"
        >
          <span className="bg-[linear-gradient(135deg,#003064_32%,#004895_53%,#0052AA_67%,#004289_76%,#003064_88%)] text-white text-xs md:text-sm font-bodoni tracking-widest px-6 py-1 shadow-sm">
            madeinlocal.jp
          </span>
        </motion.div>

        {/* 見出し＆ロゴ領域 */}
        <motion.div
          variants={itemFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 md:mb-16 flex flex-col items-center text-center w-full"
        >
          <p className="text-sm md:text-base border border-gray-400 px-6 py-2 mb-8 bg-white inline-block">
            「地域を代表する企業100選」は
          </p>
          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex md:block flex-col items-center"
          >
            地方創生メディア
            <span className="text-text2">『Made In Local』</span>
            <br className="hidden lg:block" />
            が選定しています
          </Heading2>

          <div className="relative w-56 md:w-72 h-12 md:h-16 mx-auto mb-8">
            <Image
              src="/images/shikumi/section6/madeinlocal-logo.svg"
              alt="Made In Localのロゴ"
              fill
              className="object-contain"
            />
          </div>

          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            全国各地の企業や、地域の魅力を発信してきた地方創生メディア「Made In
            Local」
            <br className="hidden md:block" />
            企業一社一社の価値と、その先に描く未来を見つめながら
            <br className="hidden md:block" />
            「地域を代表する企業100選」を選定しています。
            <a
              href="https://madeinlocal.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 text-xs md:text-sm font-sans text-text2 hover:text-text2 transition-colors group mt-1 md:mt-2"
            >
              <span className="border-b border-text2/30 group-hover:border-text2 transition-colors pb-0.5">
                地方創生メディア「Made In Local」公式サイトへ
              </span>
              <FiExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </Text>
        </motion.div>

        {/* 実績バッジ */}
        <motion.div
          variants={itemFadeUp}
          className="flex gap-4 md:gap-16 justify-center items-center w-full max-w-3xl mb-12 md:mb-20"
        >
          {/* バッジ1：SEO No.1 */}
          <div className="relative w-[220px] h-[150px] md:w-[260px] md:h-[260px] flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/shikumi/section6/badge-bg.svg"
                alt="実績バッジ背景"
                fill
                className="object-contain"
              />
            </div>

            {/* テキスト領域（中央配置） */}
            <div className="relative z-10 flex flex-col items-center justify-center pt-5 md:pt-8">
              <p className="text-[10px] md:text-xs font-bold text-text2 mb-1 md:mb-2 tracking-widest">
                〈地方創生メディアSEO〉
              </p>
              <p className="text-lg md:text-2xl font-bold text-text leading-tight">
                4年連続
              </p>
              <p className="text-3xl md:text-5xl font-bold font-serif text-text leading-none">
                No.1
              </p>
            </div>
          </div>

          {/* バッジ2：1,500社超 */}
          <div className="relative w-[220px] h-[150px] md:w-[260px] md:h-[260px] flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/shikumi/section6/badge-bg.svg"
                alt="実績バッジ背景"
                fill
                className="object-contain"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center pt-9 md:pt-15">
              <p className="text-[10px] md:text-xs font-bold text-text2 mb-1 md:mb-2 tracking-widest">
                〈開始から5年で全国〉
              </p>
              <p className="text-lg md:text-2xl font-bold text-text leading-tight">
                選出
              </p>
              <div className="flex flex-col items-center md:gap-1">
                <p className="text-3xl md:text-5xl font-bold font-serif text-text leading-none">
                  1,500
                </p>
                <p className="text-xs md:text-xl font-bold text-text">社超</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 記事一覧領域 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full  grid grid-cols-2 md:grid-cols-3 justify-between gap-4 md:gap-8"
        >
          {mockArticles.map((article) => (
            <motion.div key={article.id} variants={itemFadeUp}>
              <div className="w-full h-full lg:w-[280px] group flex flex-col items-stretch justify-between gap-3 pb-3 md:gap-6 md:pb-6 border-b border-text/30">
                {/* サムネイル画像 */}
                <div className="w-full lg:w-[280px] h-[80px] md:h-[120px] lg:h-[140px] shrink-0 relative overflow-hidden">
                  <div className="absolute z-2 left-0 bottom-0 bg-white px-2 py-1 text-xs font-sans font-bold">
                    {article.tag}
                  </div>
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 記事テキスト */}
                <div className="flex-1 flex flex-col w-full h-full justify-between">
                  <div>
                    <h3 className="text-base md:text-xl font-bold md:mb-3 flex">
                      {article.title}
                    </h3>
                    <p className="hidden md:block text-base text-text font-sans leading-relaxed line-clamp-2 md:line-clamp-none">
                      {article.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
