// src/components/omoi/MapStoryWrapper.tsx
"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import MessagePhase from "./MessagePhase";
import PrefectureHighlightPhase from "./PrefectureHighlightPhase";

export default function MapStoryWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 2つのフェーズを合わせた巨大なスクロール領域（600vh）を監視
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[800vh] bg-midblue"
    >
      {/* 画面に固定（FIX）されるコンテナ。この中で2つのコンポーネントがオーバーラップする */}
      <div className="sticky top-0 left-0 w-full h-svh overflow-hidden">
        {/* 前半（0.0 ~ 0.5）を担当 */}
        <MessagePhase scrollYProgress={scrollYProgress} />

        {/* 後半（0.5 ~ 1.0）を担当 */}
        <PrefectureHighlightPhase scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
