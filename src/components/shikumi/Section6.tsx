// src/components/shikumi/Section6.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";
import { FaCrown } from "react-icons/fa";

// 外部API連携を見据えたモックデータ
const mockArticles = [
  {
    id: 1,
    title: "女優「のん」さんがアンバサダー",
    description:
      "「Made In Local」公式アンバサダー“のん”さんのアンバサダー継続就任を記念し、「Made In Local×地方創生」の特別連携企画を始動させます。",
    tag: "社会への発信",
    imageUrl:
      "https://madeinlocal.jp/_next/image?url=https%3A%2F%2Fimages.microcms-assets.io%2Fassets%2Fd34e1f3c439b4a3890fb1c321912652d%2F70511acdc06c447e8bbf27820d1b6da2%2FFrame%25204.png&w=2048&q=75",
    link: "https://madeinlocal.jp/category/feature/026",
  },
  {
    id: 2,
    title: "経済産業省 近畿経済産業局と連携",
    description:
      "地方創生メディア「Made In Local」が情報発信を強化！経済産業省近畿経済産業局の施策を広く紹介",
    tag: "行政との接点",
    imageUrl:
      "https://madeinlocal.jp/_next/image?url=https%3A%2F%2Fimages.microcms-assets.io%2Fassets%2Fd34e1f3c439b4a3890fb1c321912652d%2Fa2566b495495461c98b09d637dec392f%2F%25E3%2580%2590MIL%25E3%2580%2591%25E7%25B5%258C%25E6%25B8%2588%25E7%2594%25A3%25E6%25A5%25AD%25E7%259C%2581%25E8%25BF%2591%25E7%2595%25BF%25E7%25B5%258C%25E6%25B8%2588%25E7%2594%25A3%25E6%25A5%25AD%25E5%25B1%2580%25E3%2582%25B3%25E3%2583%25A9%25E3%2583%259B%25E3%2582%2599%25E8%25A8%2598%25E4%25BA%258B.jpg&w=2048&q=75",
    link: "https://madeinlocal.jp/category/feature/046",
  },
  {
    id: 3,
    title: "産経新聞主催 地方創生イベント審査員",
    description:
      "株式会社IOBI代表取締役の石井が「地方鉄道×地方創生 ビジネスプランコンテスト」で審査員を務めました",
    tag: "外部評価の場",
    imageUrl:
      "https://madeinlocal.jp/_next/image?url=https%3A%2F%2Fimages.microcms-assets.io%2Fassets%2Fd34e1f3c439b4a3890fb1c321912652d%2F873798f013a54051ab849ab8a9b4420a%2F%25E3%2580%2590%25E3%2583%25A1%25E3%2582%25A4%25E3%2583%2588%25E3%2582%2599%25E3%2582%25A4%25E3%2583%25B3%25E3%2583%25AD%25E3%2583%25BC%25E3%2582%25AB%25E3%2583%25AB%25E7%2594%25A8%25E3%2580%2591%25E9%2589%2584%25E9%2581%2593%25E3%2582%25A4%25E3%2583%2598%25E3%2582%2599%25E3%2583%25B3%25E3%2583%2588%25E3%2583%258F%25E3%2582%2599%25E3%2583%258A%25E3%2583%25BC.png&w=2048&q=75",
    link: "https://madeinlocal.jp/category/feature/048",
  },
  {
    id: 4,
    title: "兵庫県西脇市 企業版ふるさと納税アドバイザー",
    description:
      "株式会社IOBI 代表取締役の石井が、兵庫県西脇市の企業版ふるさと納税営業代行・アドバイザーに就任しました！",
    tag: "地域施策",
    imageUrl:
      "https://madeinlocal.jp/_next/image?url=https%3A%2F%2Fimages.microcms-assets.io%2Fassets%2Fd34e1f3c439b4a3890fb1c321912652d%2Fa2c2ea9dc4504830ac908c7cbdbdd7df%2F%25E3%2580%2590MIL%25E3%2580%2591%25E8%25A5%25BF%25E8%2584%2587%25E5%25B8%2582%25E4%25BC%2581%25E6%25A5%25AD%25E7%2589%2588%25E3%2581%25B5%25E3%2582%258B%25E3%2581%2595%25E3%2581%25A8%25E7%25B4%258D%25E7%25A8%258E%25E5%2596%25B6%25E6%25A5%25AD%25E4%25BB%25A3%25E8%25A1%258C%25E3%2583%25BB%25E3%2582%25A2%25E3%2583%2588%25E3%2582%2599%25E3%2583%258F%25E3%2582%2599%25E3%2582%25A4%25E3%2582%25B5%25E3%2582%2599%25E3%2583%25BC.jpg&w=2048&q=75",
    link: "https://madeinlocal.jp/category/feature/061",
  },
  {
    id: 5,
    title: "三重県名張市 公民連携コーディネーター",
    description:
      "三重県名張市の公民連携コーディネーターに株式会社IOBI代表取締役石井が就任しました！",
    tag: "地域施策",
    imageUrl:
      "https://madeinlocal.jp/_next/image?url=https%3A%2F%2Fimages.microcms-assets.io%2Fassets%2Fd34e1f3c439b4a3890fb1c321912652d%2F59f6d2fc61a74617aed0f465007b1325%2F%25E3%2580%2590MIL%25E3%2580%2591%25E5%2590%258D%25E5%25BC%25B5%25E5%25B8%2582%25E3%2582%25B3%25E3%2583%25BC%25E3%2583%2586%25E3%2582%2599%25E3%2582%25A3%25E3%2583%258D%25E3%2583%25BC%25E3%2582%25BF%25E3%2583%25BC%25E5%25B0%25B1%25E4%25BB%25BB.jpg&w=2048&q=75",
    link: "https://madeinlocal.jp/category/feature/040",
  },
  {
    id: 6,
    title: "内閣府 地方創生SDGs官民連携PFで分科会設立",
    description:
      "株式会社IOBIが内閣府「地方創生SDGs官民連携プラットフォーム」に分科会を設置しました！",
    tag: "官民連携",
    imageUrl:
      "https://madeinlocal.jp/_next/image?url=https%3A%2F%2Fimages.microcms-assets.io%2Fassets%2Fd34e1f3c439b4a3890fb1c321912652d%2F5e7c92e6ca2b4f31adaee1f299eae5c9%2F%25E3%2580%2590MIL%25E3%2580%2591%25E5%2586%2585%25E9%2596%25A3%25E5%25BA%259C%25E5%2588%2586%25E7%25A7%2591%25E4%25BC%259A%25E3%2583%258F%25E3%2582%2599%25E3%2583%258A%25E3%2583%25BC.jpg&w=2048&q=75",
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
    <section
      id="section6"
      className="relative w-full overflow-hidden bg-[linear-gradient(to_bottom,#ECFFF5_0%,#F9FDF2_30%,#F9FDF2_100%)] py-24 md:py-32"
    >
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
            <br className="hidden md:block" />
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
            <br />
            企業一社一社の価値と、その先に描く未来を見つめながら
            <br />
            「地域を代表する企業100選」を選定しています。
          </Text>
        </motion.div>

        {/* 実績バッジ */}
        <motion.div
          variants={itemFadeUp}
          className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center w-full max-w-3xl mb-12 md:mb-20"
        >
          <div className="flex-1 flex justify-center items-center gap-3 p-6 rounded shadow-md text-center bg-[linear-gradient(160deg,#FFE121_29%,#FFEE65_63%,#F1D41A_83%,#F6D601_100%)]">
            <FaCrown className="text-6xl text-[#000000] mix-blend-overlay inset-shadow-sm" />
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs md:text-sm font-bold text-gray-800 mb-1">
                〈地方創生メディア SEO〉
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                4年連続 No.1
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center gap-3 p-6 rounded shadow-md text-center bg-[linear-gradient(160deg,#FFE121_29%,#FFEE65_63%,#F1D41A_83%,#F6D601_100%)]">
            <FaCrown className="text-6xl text-[#000000] mix-blend-overlay inset-shadow-sm" />
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs md:text-sm font-bold text-gray-800 mb-1">
                〈開始から5年で全国〉
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                選出1,500社超
              </p>
            </div>
          </div>
        </motion.div>

        {/* 記事一覧領域 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full max-w-4xl flex flex-col gap-0 border-t border-gray-300"
        >
          {mockArticles.map((article) => (
            <motion.div
              key={article.id}
              variants={itemFadeUp}
              className="w-full"
            >
              <Link
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row items-center gap-6 py-6 border-b border-gray-300 hover:bg-gray-50 transition-colors duration-300"
              >
                {/* サムネイル画像 */}
                <div className="w-full md:w-[280px] h-[160px] md:h-[140px] shrink-0 relative bg-gray-200 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* 記事テキスト */}
                <div className="flex-1 flex flex-col w-full h-full justify-between py-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-3 flex group-hover:text-[#004895] transition-colors">
                      <span className="hidden md:block border border-text px-2 py-1 text-xs font-sans mr-2">
                        {article.tag}
                      </span>
                      {article.title}
                    </h3>
                    <p className="text-base text-text font-sans leading-relaxed line-clamp-2 md:line-clamp-none">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <span className="inline-flex items-center text-xs font-sans text-white bg-midblue px-4 py-2 hover:bg-[#004895] transition-colors">
                      → 記事を読む
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
