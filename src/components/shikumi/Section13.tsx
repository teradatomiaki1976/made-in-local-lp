// src/components/shikumi/Section13.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading2 } from "@/components/ui/Typography";

// --- データ構造 ---
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "q1",
    question: "エントリーすれば必ず選出されますか？",
    answer: "いいえ。所定の審査を通過した企業のみが選出されます。",
  },
  {
    id: "q2",
    question: "選出されなかった場合、再挑戦できますか？",
    answer:
      "はい、可能です。不足していた要素を改善し、翌年以降に再挑戦していただく企業様も多くいらっしゃいます。", // ※ダミーテキスト（適宜変更してね）
  },
  {
    id: "q3",
    question: "企業規模や売上高は関係ありますか？",
    answer:
      "規模や売上高だけが基準ではありません。独自の魅力や地域への貢献意欲など、多角的な視点で審査を行います。", // ※ダミーテキスト
  },
  {
    id: "q4",
    question: "選出後は、どのような活動がありますか？",
    answer:
      "特設ページの公開、認定証の授与のほか、選出企業同士の交流会や定期的なサポートミーティングなどにご参加いただけます。", // ※ダミーテキスト
  },
];

export default function Section13() {
  const [openId, setOpenId] = useState<string | null>("null"); // nullは全て閉じた状態 1つ目を開く場合"q1"

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="section13"
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
        {/* セクションヘッダー */}
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
              Q&A
            </span>
          </motion.div>
          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            よくあるご質問
          </Heading2>
        </motion.div>

        {/* アコーディオンリスト */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="w-full max-w-4xl mx-auto flex flex-col gap-4"
        >
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div key={faq.id} variants={itemFadeUp} className="w-full">
                {/* 質問ボタン */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full flex items-center justify-between bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 rounded-md p-5 md:p-8 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <span className="text-base md:text-lg font-bold pr-4">
                    <span className="mr-2 font-serif">Q.</span>
                    {faq.question}
                  </span>
                  {/* ＋/− アイコン */}
                  <span className="relative flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <span
                      className={`absolute w-4 h-0.5 bg-white transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                    <span
                      className={`absolute w-0.5 h-4 bg-white transition-transform duration-300 ${
                        isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                      }`}
                    />
                  </span>
                </button>

                {/* 回答エリア */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={faq.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white text-text font-sans text-left rounded-b-md p-5 md:p-8 mt-1 text-sm md:text-base leading-relaxed shadow-inner">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
