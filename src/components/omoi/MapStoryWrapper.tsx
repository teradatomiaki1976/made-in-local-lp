// src/components/omoi/MapStoryWrapper.tsx
"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import MessagePhase from "./MessagePhase";
import PrefectureHighlightPhase from "./PrefectureHighlightPhase";

export default function MapStoryWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);

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
        <MessagePhase scrollYProgress={scrollYProgress} />
        <PrefectureHighlightPhase scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
