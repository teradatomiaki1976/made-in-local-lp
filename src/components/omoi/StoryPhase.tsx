// src/components/omoi/StoryPhase.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Phase3_LossAndReality from "./Phase3_LossAndReality";
import Phase4_LightOfHope from "./Phase4_LightOfHope";

export default function StoryPhase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 💡 調整: 背景色の切り替えをPhase4の「光」が広がるタイミング(0.8〜1.0)に合わせる
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.8, 1.0],
    ["#003064", "#fefbf1"],
  );

  return (
    <motion.section
      ref={containerRef}
      style={{
        backgroundColor,
        willChange: "background-color",
      }}
      // 💡 調整: 高さを 250vh にし、各フェーズのテキストを読む時間を確保
      className="relative w-full h-[250vh]"
    >
      <div className="sticky top-0 left-0 w-full h-svh overflow-hidden">
        <Phase3_LossAndReality scrollYProgress={scrollYProgress} />
        <Phase4_LightOfHope scrollYProgress={scrollYProgress} />
      </div>
    </motion.section>
  );
}
