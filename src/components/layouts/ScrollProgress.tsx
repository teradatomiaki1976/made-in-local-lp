// src/components/layouts/ScrollProgress.tsx
"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 4.5, duration: 1.5, ease: "easeOut" }}
      className="fixed top-1/2 -translate-y-1/2 right-1 md:right-6 z-50 pointer-events-none flex flex-col items-center gap-2"
      aria-hidden="true"
      style={{ willChange: "opacity" }}
    >
      {/* 改善ポイント：すりガラス効果のコンテナ（カプセル）を追加 */}
      <div className="relative p-1 rounded-full bg-white/30 backdrop-blur-md shadow-sm">
        <div className="relative w-[8px] h-[40vh] rounded-full overflow-hidden bg-midblue">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-yellow origin-top rounded-full"
            style={{ scaleY }}
          />
        </div>
      </div>
    </motion.div>
  );
}
