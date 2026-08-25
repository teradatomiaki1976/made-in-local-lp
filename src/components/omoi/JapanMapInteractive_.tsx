// src/components/omoi/JapanMapInteractive.tsx
"use client";

import { memo } from "react";
import { MAP_PATHS } from "@/lib/mapPaths";
import { cn } from "@/lib/utils";

interface Props {
  activePrefId: string; // 例: "hokkaido", "aomori"
}

const JapanMapInteractive = memo(({ activePrefId }: Props) => {
  return (
    <svg
      viewBox="0 0 3750.8 4260.3" // Illustratorの書き出し時のviewBox値に合わせる
      className="w-full h-auto drop-shadow-2xl"
      aria-hidden="true"
    >
      {MAP_PATHS.map((pref) => {
        const isActive = activePrefId === pref.id;
        return (
          <path
            key={pref.id}
            id={pref.id}
            d={pref.d}
            className={cn(
              "transition-colors duration-500 ease-in-out stroke-[#003064] stroke-[1px]",
              isActive
                ? "fill-[#B89B5E]" // アクティブ時：ブランドカラーのゴールド
                : "fill-white/30", // 非アクティブ時：うっすらとした白
            )}
          />
        );
      })}
    </svg>
  );
});

JapanMapInteractive.displayName = "JapanMapInteractive";
export default JapanMapInteractive;
