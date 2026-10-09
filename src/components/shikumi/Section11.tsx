// src/components/shikumi/Section11.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";

// --- データ構造 ---
interface VideoItem {
  id: string;
  youtubeId: string;
  company: string;
  title: string;
  thumbnail: string;
}

const videoData: VideoItem[] = [
  {
    id: "1",
    youtubeId: "a3Q5kWeq6NA",
    company: "タカツー株式会社",
    title: "100選選出から2,000万円の新規売上創出、年商の天井を突破する",
    thumbnail: "/images/shikumi/section11/thumb1.webp",
  },
  {
    id: "2",
    youtubeId: "WKaHvHh4FmE",
    company: "株式会社ソフトクリエイター",
    title: "100選選出から20代社員が1年で9倍に、組織の若返りへ",
    thumbnail: "/images/shikumi/section11/thumb2.webp",
  },
  {
    id: "3",
    youtubeId: "kj_UDsBrKxg",
    company: "合同会社HIGH5",
    title:
      "売上・問い合わせ数増加 / 地方の生成AI企業はどう認知を広げたのか【地域を代表する企業100選：選出後の変化】",
    thumbnail: "/images/shikumi/section11/thumb3.webp",
  },
  {
    id: "4",
    youtubeId: "YFNAtQx5i8Q",
    company: "合同会社池田商店",
    title: "市長からも期待！100選選出から社員・求職者・行政の反応が一変！",
    thumbnail: "/images/shikumi/section11/thumb4.webp",
  },
];

export default function Section11() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Escキーでモーダルを閉じるアクセシビリティ対応
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideoId(null);
    };
    if (activeVideoId) {
      window.addEventListener("keydown", handleKeyDown);
      // 背景スクロールロック
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeVideoId]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
      id="section11"
      className="relative w-full bg-[#0a1128] z-20 text-white py-24 md:py-32 overflow-hidden"
    >
      {/* 背景グラデーションとノイズ */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(-160deg,#19324D_0%,#19324D_50%,#00518B_66%,#19324D_78%,#19324D_100%)]">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-12 md:mb-16"
        >
          <motion.div
            variants={itemFadeUp}
            className="flex justify-center items-center mb-8 md:mb-12"
          >
            <span className="bg-[linear-gradient(135deg,#FFFFFF_32%,#DDDDDD_53%,#BABABA_67%,#E2E2E2_76%,#FFFFFF_88%)] text-deepblue text-xs md:text-sm font-bodoni tracking-widest px-6 py-1 shadow-sm">
              After selection
            </span>
          </motion.div>
          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            選出企業が語る
            <br />
            エントリーから選出後の変化。
          </Heading2>
          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            なぜ100選にエントリーしたのか？
            <br className="hidden md:block" />
            選出後、どのように活用したのか、その結果、どんな変化が生まれたのか。
            <br className="hidden md:block" />
            実際の選出企業の言葉から紹介します。
          </Text>
        </motion.div>

        {/* --- 動画カード一覧 (Flex Wrapで中央揃え) --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto"
        >
          {videoData.map((video) => (
            <motion.div
              key={video.id}
              variants={itemFadeUp}
              // 子要素：幅の指定(w-*)を削除。Gridが自動で幅を最適化してくれる。
              className="group cursor-pointer bg-white rounded-md overflow-hidden shadow-lg flex flex-col"
              onClick={() => setActiveVideoId(video.youtubeId)}
            >
              {/* サムネイルエリア */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                <Image
                  src={video.thumbnail}
                  alt={`${video.company}のインタビュー動画`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* 💎 CSSのみで作る再生ボタン（ホバーで少し浮き上がる） */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/10">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                    <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-[#003064] ml-1"></div>
                  </div>
                </div>
              </div>

              {/* テキストエリア */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-deepblue text-sm md:text-base font-bold leading-snug mb-3 text-clamp-2">
                  {video.title}
                </h3>
                <div className="mt-auto text-right border-t border-gray-100 pt-3">
                  <span className="text-gray-500 text-xs font-bold tracking-wider">
                    {video.company}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* --- YouTube モーダル --- */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-10 backdrop-blur-sm"
            onClick={() => setActiveVideoId(null)} // 背景クリックで閉じる
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()} // 中身クリックでは閉じない
            >
              {/* 閉じるボタン */}
              <button
                onClick={() => setActiveVideoId(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="動画を閉じる"
              >
                ✕
              </button>

              {/* YouTube Iframe (開いた時だけレンダリングされる) */}
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
