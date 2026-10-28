// src/components/shikumi/Section11.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Section";
import { FiChevronDown, FiFileText } from "react-icons/fi";
import { MOCK_INTERVIEWS } from "@/lib/microcms";
import { useLenis } from "lenis/react";

export default function Section11() {
  const lenis = useLenis();
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // 🌟 修正：videoData を MOCK_INTERVIEWS に変更
  const displayedVideos = !isMounted
    ? MOCK_INTERVIEWS.slice(0, 6)
    : isExpanded
      ? MOCK_INTERVIEWS // 展開時は全件
      : isMobile
        ? MOCK_INTERVIEWS.slice(0, 4) // スマホ未展開時は4件
        : MOCK_INTERVIEWS.slice(0, 6); // PC未展開時は6件

  const showMoreContainerClass = isExpanded
    ? "hidden"
    : MOCK_INTERVIEWS.length > 6
      ? "flex"
      : MOCK_INTERVIEWS.length > 4
        ? "flex md:hidden"
        : "hidden";

  return (
    <Section id="section11" theme="dark">
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
            <br className="hidden lg:block" />
            エントリーから選出後の変化。
          </Heading2>
          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            なぜ100選にエントリーしたのか？
            <br className="hidden lg:block" />
            選出後、どのように活用したのか、その結果、どんな変化が生まれたのか。
            <br className="hidden lg:block" />
            実際の選出企業の言葉から紹介します。
          </Text>
        </motion.div>

        {/* --- 動画カード一覧 --- */}
        <motion.div
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full max-w-5xl mx-auto"
        >
          <AnimatePresence>
            {displayedVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-white rounded-md overflow-hidden shadow-lg ${
                  !isMounted && index >= 4
                    ? "hidden md:flex md:flex-col"
                    : "flex flex-col"
                }`}
              >
                {/* サムネイルエリア（クリックで動画モーダル起動） */}
                <div
                  className="group relative aspect-video w-full overflow-hidden bg-gray-200 cursor-pointer"
                  onClick={() => setActiveVideoId(video.youtubeId)}
                >
                  <Image
                    src={video.thumbnail}
                    alt={`${video.company}のインタビュー動画`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/10">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                      <div className="w-0 h-0 border-y-10 border-y-transparent border-l-16 border-l-[#003064] ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* テキストエリア */}
                <div className="p-3 md:p-5 flex flex-col flex-1 w-full bg-white">
                  <h3
                    onClick={() => setActiveVideoId(video.youtubeId)}
                    className="text-text text-left text-sm md:text-base font-bold leading-normal mb-3 cursor-pointer hover:text-midblue transition-colors"
                  >
                    {video.title}
                  </h3>

                  <div className="mt-auto pt-3 border-t border-text2/20 flex flex-col items-center justify-between gap-4">
                    <span className="text-text2 text-xs md:text-sm font-bold truncate">
                      {video.company}
                    </span>

                    <Link
                      href={`/interviews/${video.slug}`}
                      scroll={false} // 🌟 必須：Next.jsの自動スクロール干渉を防止
                      onClick={() => {
                        // ① 記事へ飛ぶ直前のスクロール位置を保存
                        sessionStorage.setItem(
                          "shikumi_return_scroll",
                          String(window.scrollY),
                        );
                        // ② スクロールダウンの慣性をリセット
                        if (lenis) {
                          lenis.stop();
                          lenis.scrollTo(0, { immediate: true, force: true });
                        }
                        window.scrollTo(0, 0);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-text font-sans text-white font-bold text-sm tracking-wider py-3 rounded-md transition-all hover:bg-[#004895] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#003064] focus:ring-offset-2"
                    >
                      <FiFileText className="w-4 h-4" />
                      <span>記事を読む</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- もっと見るボタン --- */}
        <div
          className={`mt-10 md:mt-14 w-full justify-center ${showMoreContainerClass}`}
        >
          <button
            onClick={() => setIsExpanded(true)}
            className="group flex items-center justify-center gap-1 px-6 py-2 md:py-2.5 rounded-full border border-white/40 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm cursor-pointer"
          >
            <span className="tracking-wide text-[11px] md:text-sm font-sans">
              もっと動画を見る
            </span>
            <FiChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>
      </Container>

      {/* --- YouTube モーダル --- */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-10 backdrop-blur-sm"
            onClick={() => setActiveVideoId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideoId(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="動画を閉じる"
              >
                ✕
              </button>
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
    </Section>
  );
}
