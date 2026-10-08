// src/components/shikumi/Section9.tsx
"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  Variants,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading2, Text } from "@/components/ui/Typography";

// カウントアップコンポーネント
function CountUp({
  to,
  decimals = 1,
  className = "",
}: {
  to: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1500, bounce: 0 });

  useEffect(() => {
    if (isInView) motionValue.set(to);
  }, [isInView, motionValue, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals);
      }
    });
  }, [springValue, decimals]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

export default function Section9() {
  // --- 親コンテナ用Variants ---
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

  // ベン図用（円の描画アニメーション）
  const drawCircle: Variants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  // ベン図用（テキストのフェードアップ）
  const fadeText: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="section9"
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
            className="flex justify-center items-center mb-6 md:mb-8"
          >
            <span className="bg-[linear-gradient(135deg,#FFFFFF_32%,#DDDDDD_53%,#BABABA_67%,#E2E2E2_76%,#FFFFFF_88%)] text-deepblue text-xs md:text-sm font-bodoni tracking-widest px-6 py-1 shadow-sm">
              Ask AI
            </span>
          </motion.div>
          <Heading2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            今は、AIに聞く。
          </Heading2>
          <Text
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            企業を知る方法も、変わり始めています。
            <br />
            就職先を探すとき。取引先を調べるとき。商品やサービスを検討するとき。
          </Text>
        </motion.div>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* 左カード：生成AI利用率 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={itemFadeUp}
            className="lg:col-span-2 bg-white rounded-xl shadow-xl overflow-hidden flex flex-col text-deepblue"
          >
            <div className="bg-deepblue text-white font-sans font-bold text-base md:text-xl leading-relaxed m-6 md:m-8 py-1 text-center">
              生成AIを検索手段として利用する割合
            </div>
            <div className="px-6 md:px-8 pb-6 md:pb-8 flex flex-col sm:flex-row items-center gap-8 justify-center h-full">
              {/* 💎 修正: 棒グラフエリア */}
              <div
                className="flex items-end gap-3 md:gap-4 h-full pt-4"
                aria-hidden="true"
              >
                {[
                  { label: "2025.5", value: 21.3, height: "40%" },
                  { label: "2025.10", value: 31.1, height: "60%" },
                  { label: "2026.2", value: 37.0, height: "70%" },
                  {
                    label: "2026.8",
                    value: 52.3,
                    height: "100%",
                    isHighlight: true,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <span
                      className={`text-[10px] md:text-xs font-bold ${item.isHighlight ? "text-[#C3A800]" : "text-gray-500"}`}
                    >
                      {item.value}%
                    </span>
                    {/* 親に h-24 を持たせて計算基準を作る */}
                    <div className="w-8 md:w-10 h-24 flex items-end">
                      <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: item.height }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: idx * 0.1,
                          ease: "easeOut",
                        }}
                        className={`w-full rounded-t-sm ${item.isHighlight ? "bg-[#FFD666]" : "bg-[#FFD666]/40"}`}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-sans tracking-tighter">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block w-px h-32 bg-gray-200"></div>

              {/* 年代別利用率 */}
              <div className="flex flex-col items-center justify-center gap-4">
                <span className="text-xs md:text-sm font-bold text-gray-500">
                  年代別利用率
                </span>
                <div className="text-center">
                  <div className="text-xs font-bold border-b border-deepblue pb-1 mb-1">
                    10代
                  </div>
                  <div className="text-3xl md:text-4xl font-serif font-bold text-deepblue">
                    <CountUp to={80.6} />%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold border-b border-gray-300 pb-1 mb-1 text-gray-500">
                    20代
                  </div>
                  <div className="text-2xl md:text-3xl font-serif font-bold text-gray-600">
                    <CountUp to={60.0} />%
                  </div>
                </div>
              </div>
            </div>
            <div className="sr-only">
              生成AIを検索手段として利用する割合は、2026年8月時点で52.3%に上昇。年代別利用率では10代が80.6%、20代が60.0%となっています。
            </div>
            <div className="px-4 py-2 text-[8px] md:text-[10px] text-gray-400 bg-gray-50 text-right">
              出典：株式会社サイバーエージェント GEO
              Lab「生成AIのユーザー利用実態調査」
            </div>
          </motion.div>

          {/* 右カード：AIの情報ソース */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={itemFadeUp}
            className="lg:col-span-1 bg-white rounded-xl shadow-xl p-6 md:p-8 flex flex-col justify-center items-center text-deepblue"
          >
            <p className="font-bold text-base md:text-xl leading-relaxed mb-8 text-center md:text-left">
              AIは、Web上に存在する
              <br />
              さまざまな情報を元に、
              <br />
              企業について説明します。
            </p>

            <div
              className="relative flex-1 flex items-center justify-center min-h-[160px] md:min-h-[240px]"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 200 200"
                className="w-full max-w-[200px] md:max-w-[240px] h-auto overflow-visible"
              >
                <motion.g
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.25 } }, // 0.25秒間隔で順番に描画
                  }}
                >
                  {/* 線を描画するアニメーション (pathLength) */}
                  <motion.circle
                    variants={drawCircle}
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke="#19324D"
                    strokeWidth="1"
                  />
                  <motion.circle
                    variants={drawCircle}
                    cx="140"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke="#19324D"
                    strokeWidth="1"
                  />
                  <motion.circle
                    variants={drawCircle}
                    cx="60"
                    cy="140"
                    r="45"
                    fill="none"
                    stroke="#19324D"
                    strokeWidth="1"
                  />
                  <motion.circle
                    variants={drawCircle}
                    cx="140"
                    cy="140"
                    r="45"
                    fill="none"
                    stroke="#19324D"
                    strokeWidth="1"
                  />

                  {/* 円が描かれた後にテキストをフェードイン */}
                  <motion.text
                    variants={fadeText}
                    x="60"
                    y="60"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="11"
                    fill="#19324D"
                    fontWeight="bold"
                  >
                    企業サイト
                  </motion.text>
                  <motion.text
                    variants={fadeText}
                    x="140"
                    y="60"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="11"
                    fill="#19324D"
                    fontWeight="bold"
                  >
                    ニュース
                  </motion.text>
                  <motion.text
                    variants={fadeText}
                    x="60"
                    y="140"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="11"
                    fill="#19324D"
                    fontWeight="bold"
                  >
                    記事
                  </motion.text>
                  <motion.text
                    variants={fadeText}
                    x="140"
                    y="140"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="11"
                    fill="#19324D"
                    fontWeight="bold"
                  >
                    <tspan x="140" dy="-6">
                      第三者
                    </tspan>
                    <tspan x="140" dy="14">
                      メディア
                    </tspan>
                  </motion.text>
                </motion.g>
              </svg>
            </div>
            <div className="sr-only">
              AIは企業サイト、ニュース、記事、第三者メディアなどWeb上の様々な情報を組み合わせて企業を説明します。
            </div>
          </motion.div>
        </div>

        {/* 下段：62.2% インパクトカード */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemFadeUp}
          className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col text-deepblue"
        >
          <div className="p-8 md:p-12 text-center flex flex-col items-center">
            <h3 className="text-lg md:text-2xl font-bold leading-relaxed mb-6 md:mb-10">
              「地域を代表する企業100選」選出企業の
              <br className="hidden md:block" />
              特設ページは、すでにAIにも引用されています。
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full">
              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "backOut" }}
                className="text-[72px] md:text-[100px] font-serif font-bold leading-none tracking-tighter"
                style={{
                  background:
                    "linear-gradient(160deg, #5B4A14 0%, #8C752B 50%, #4D3F11 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <CountUp to={62.2} />%
              </motion.div>

              <div className="text-left max-w-sm flex flex-col gap-4">
                <p className="text-sm md:text-base font-bold">
                  選出企業を対象にGoogle AI Modeで調査。
                  <br />
                  Made In
                  Localの引用、または「地域を代表する企業100選」への言及を確認。
                </p>
                <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">
                  ※2026年8月、「地域を代表する企業100選」選出企業を対象にGoogle
                  AI
                  Modeで調査。AI回答を取得できた1,271社のうち791社、62.2%でMade
                  In
                  Localの引用または「地域を代表する企業100選」等への言及を確認。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[linear-gradient(135deg,#003064_32%,#004895_53%,#0052AA_67%,#004289_76%,#003064_88%)] text-white font-sans text-center py-6 font-bold text-base md:text-xl tracking-widest">
            選出後も、企業の取り組みやニュースを継続的に発信できます。
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
