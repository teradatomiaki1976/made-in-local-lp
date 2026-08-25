// src/components/omoi/PrefectureHighlightPhase.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import JapanMapInteractive from "./JapanMapInteractive_";

interface Props {
  scrollYProgress: MotionValue<number>;
}

// mapPathsのidと完全一致させる
const REGIONS = [
  {
    id: "hokkaido",
    name: "北海道",
    prefectures: [{ prefId: "hokkaido", name: "北海道", count: 89 }],
  },
  {
    id: "tohoku",
    name: "東北",
    prefectures: [
      { prefId: "aomori", name: "青森県", count: 99 },
      { prefId: "iwate", name: "岩手県", count: 72 },
      { prefId: "miyagi", name: "宮城県", count: 68 },
      { prefId: "akita", name: "秋田県", count: 48 },
      { prefId: "yamagata", name: "山形県", count: 69 },
      { prefId: "fukushima", name: "福島県", count: 33 },
    ],
  },
  {
    id: "kanto",
    name: "関東",
    prefectures: [
      { prefId: "ibaraki", name: "茨城県", count: 12 },
      { prefId: "tochigi", name: "栃木県", count: 55 },
      { prefId: "gunma", name: "群馬県", count: 45 },
      { prefId: "saitama", name: "埼玉県", count: 23 },
      { prefId: "chiba", name: "千葉県", count: 44 },
      { prefId: "tokyo", name: "東京都", count: 66 },
      { prefId: "kanagawa", name: "神奈川県", count: 76 },
    ],
  },
  {
    id: "chubu",
    name: "中部",
    prefectures: [
      { prefId: "niigata", name: "新潟県", count: 34 },
      { prefId: "toyama", name: "富山県", count: 32 },
      { prefId: "ishikawa", name: "石川県", count: 47 },
      { prefId: "fukui", name: "福井県", count: 58 },
      { prefId: "yamanashi", name: "山梨県", count: 15 },
      { prefId: "nagano", name: "長野県", count: 26 },
      { prefId: "gifu", name: "岐阜県", count: 78 },
      { prefId: "shizuoka", name: "静岡県", count: 51 },
      { prefId: "aichi", name: "愛知県", count: 34 },
    ],
  },
  {
    id: "kinki",
    name: "近畿",
    prefectures: [
      { prefId: "niigata", name: "三重県", count: 32 },
      { prefId: "shiga", name: "滋賀県", count: 43 },
      { prefId: "kyoto", name: "京都府", count: 56 },
      { prefId: "osaka", name: "大阪府", count: 99 },
      { prefId: "hyogo", name: "兵庫県", count: 67 },
      { prefId: "nara", name: "奈良県", count: 34 },
      { prefId: "wakayama", name: "和歌山県", count: 41 },
    ],
  },
  {
    id: "chugoku",
    name: "中国",
    prefectures: [
      { prefId: "tottori", name: "鳥取県", count: 34 },
      { prefId: "shimane", name: "島根県", count: 82 },
      { prefId: "okayama", name: "岡山県", count: 53 },
      { prefId: "hiroshima", name: "広島県", count: 45 },
      { prefId: "yamaguchi", name: "山口県", count: 62 },
    ],
  },
  {
    id: "shikoku",
    name: "四国",
    prefectures: [
      { prefId: "tokushima", name: "徳島県", count: 27 },
      { prefId: "kagawa", name: "香川県", count: 49 },
      { prefId: "ehime", name: "愛媛県", count: 72 },
      { prefId: "kochi", name: "高知県", count: 33 },
    ],
  },
  {
    id: "kyushu",
    name: "九州・沖縄",
    prefectures: [
      { prefId: "fukuoka", name: "福岡県", count: 50 },
      { prefId: "saga", name: "佐賀県", count: 62 },
      { prefId: "nagasaki", name: "長崎県", count: 83 },
      { prefId: "kumamoto", name: "熊本県", count: 46 },
      { prefId: "oita", name: "大分県", count: 22 },
      { prefId: "miyazaki", name: "宮崎県", count: 18 },
      { prefId: "kagoshima", name: "鹿児島県", count: 42 },
      { prefId: "okinawa", name: "沖縄県", count: 31 },
    ],
  },
];

export default function PrefectureHighlightPhase({ scrollYProgress }: Props) {
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);
  const [activePrefIndex, setActivePrefIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const pointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.5 ? "auto" : "none",
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0.52, 0.58, 0.65, 0.68],
    [0, 1, 1, 0],
  );
  const titleY = useTransform(scrollYProgress, [0.52, 0.58], [20, 0]);
  const uiOpacity = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.65 && !isAutoPlaying) {
        setIsAutoPlaying(true);
      } else if (latest < 0.65 && isAutoPlaying) {
        setIsAutoPlaying(false);
        setActivePrefIndex(0);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isAutoPlaying]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setActivePrefIndex((prev) => {
          const currentRegion = REGIONS[activeRegionIndex];
          if (prev + 1 < currentRegion.prefectures.length) {
            return prev + 1;
          } else {
            setActiveRegionIndex((rPrev) => (rPrev + 1) % REGIONS.length);
            return 0;
          }
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeRegionIndex]);

  const currentPrefecture =
    REGIONS[activeRegionIndex].prefectures[activePrefIndex];

  return (
    <motion.div
      style={{ pointerEvents: pointerEvents as any }}
      className="absolute inset-0 w-full h-full z-20 flex flex-col items-center justify-center"
    >
      <motion.div
        style={{ opacity: titleOpacity, y: titleY }}
        className="absolute z-30"
      >
        <h2 className="text-3xl md:text-6xl font-serif font-bold text-white tracking-widest drop-shadow-lg">
          都道府県別 100選企業数
        </h2>
      </motion.div>

      <motion.div
        style={{ opacity: uiOpacity }}
        className="relative z-20 w-full h-full flex items-center justify-center"
      >
        {/* 左側：県名と企業数の巨大ポップアップ */}
        <div className="absolute left-[20%] flex flex-col items-center justify-center w-80 aspect-square rounded-full border border-white/40 text-white">
          <span className="text-xl">
            &lt;{REGIONS[activeRegionIndex].name}&gt;
          </span>
          <span className="w-auto text-5xl font-serif font-bold my-4 border-b border-white/60 pb-4">
            {currentPrefecture.name}
          </span>
          <span className="text-6xl font-serif">
            {currentPrefecture.count}
            <span className="text-3xl">社</span>
          </span>
        </div>

        {/* 右側：インタラクティブ日本地図（JapanMapInteractive） */}
        <div className="absolute right-[20%] w-[45%] opacity-90">
          <JapanMapInteractive activePrefId={currentPrefecture.prefId} />
        </div>

        {/* 下部：地方タブ */}
        <div className="absolute bottom-[10%] flex flex-wrap items-center justify-center gap-2 md:gap-4">
          {REGIONS.map((region, idx) => (
            <button
              key={region.id}
              onClick={() => {
                setActiveRegionIndex(idx);
                setActivePrefIndex(0);
              }}
              className={`px-6 py-2 rounded-md font-bold transition-colors cursor-pointer ${
                activeRegionIndex === idx
                  ? "bg-white text-midblue"
                  : "bg-white/20 text-white"
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
