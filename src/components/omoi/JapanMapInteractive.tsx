// src/components/omoi/JapanMapInteractive.tsx
"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MAP_PATHS } from "@/lib/mapPaths";
import { REGIONS } from "@/lib/regions";
import { cn } from "@/lib/utils";

interface Props {
  activePrefId: string;
  activeRegionId: string;
}

// 📌 サイズ感を安定させたカメラワーク設定（PC/SP）
const CAMERA_CONFIG: Record<string, { pc: any; sp: any }> = {
  hokkaido: {
    pc: { scale: 2.2, x: "-10%", y: "25%" },
    sp: { scale: 1.8, x: "0%", y: "25%" },
  },
  tohoku: {
    pc: { scale: 2.5, x: "0%", y: "10%" },
    sp: { scale: 2.0, x: "0%", y: "10%" },
  },
  kanto: {
    pc: { scale: 3.2, x: "15%", y: "-10%" },
    sp: { scale: 2.5, x: "0%", y: "-5%" },
  },
  chubu: {
    pc: { scale: 2.8, x: "10%", y: "-15%" },
    sp: { scale: 2.0, x: "0%", y: "-10%" },
  },
  kinki: {
    pc: { scale: 3.0, x: "20%", y: "-25%" },
    sp: { scale: 2.2, x: "5%", y: "-15%" },
  },
  chugoku: {
    pc: { scale: 3.2, x: "30%", y: "-30%" },
    sp: { scale: 2.5, x: "10%", y: "-20%" },
  },
  shikoku: {
    pc: { scale: 3.5, x: "30%", y: "-45%" },
    sp: { scale: 2.8, x: "10%", y: "-30%" },
  },
  kyushu: {
    pc: { scale: 2.8, x: "35%", y: "-50%" },
    sp: { scale: 2.2, x: "15%", y: "-35%" },
  },
};

const JapanMapInteractive = memo(({ activePrefId, activeRegionId }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = CAMERA_CONFIG[activeRegionId] || CAMERA_CONFIG.kanto;
  const targetCamera = isMobile ? config.sp : config.pc;

  // 📌 現在アクティブな地方に属する「都道府県IDのリスト」を取得
  const activeRegion = REGIONS.find((r) => r.id === activeRegionId);
  const activeRegionPrefIds = activeRegion
    ? activeRegion.prefectures.map((p) => p.prefId)
    : [];

  return (
    // 📌 地図全体が暴走しないよう、最大幅と中央配置を制限するインナーコンテナ
    <div className="relative w-full max-w-[300px] md:max-w-[500px] aspect-[3750.8/4260.3] flex items-center justify-center pointer-events-none">
      <motion.div
        animate={targetCamera}
        transition={{ type: "spring", damping: 25, stiffness: 70 }}
        className="w-full h-full origin-center pointer-events-none"
      >
        <svg
          viewBox="0 0 3750.8 4260.3"
          className="w-full h-full drop-shadow-2xl"
          aria-hidden="true"
        >
          {MAP_PATHS.map((pref) => {
            // 📌 3段階の判定ロジック
            const isActivePref = activePrefId === pref.id; // ①ドンピシャの県
            const isActiveRegion = activeRegionPrefIds.includes(pref.id); // ②同じ地方の県

            return (
              <path
                key={pref.id}
                d={pref.d}
                className={cn(
                  "transition-colors duration-500 ease-in-out stroke-[#003064] stroke-[1px]",
                  isActivePref
                    ? "fill-[#B89B5E]" // ① スポット県：ゴールド
                    : isActiveRegion
                      ? "fill-white/60" // ② 同一地方：白
                      : "fill-white/10", // ③ その他：背景に沈ませる薄い白（濃い青に見える）
                )}
              />
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
});

JapanMapInteractive.displayName = "JapanMapInteractive";
export default JapanMapInteractive;
