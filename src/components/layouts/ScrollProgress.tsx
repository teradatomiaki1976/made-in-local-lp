// src/components/layouts/ScrollProgress.tsx
"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // スクロール値にSpringアニメーションを適用
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // HeroPhaseの「Scroll」インジケーター（delay: 4.5）と完全に同期
      transition={{ delay: 4.5, duration: 1.5, ease: "easeOut" }}
      className="fixed top-1/2 -translate-y-1/2 right-3 md:right-6 z-50 pointer-events-none flex flex-col items-center gap-2"
      aria-hidden="true"
      style={{ willChange: "opacity" }} // 先回りのパフォーマンス最適化
    >
      <div className="relative w-[8px] h-[30vh] rounded-full overflow-hidden bg-yellow">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-midblue origin-top"
          style={{ scaleY }}
        />
      </div>
    </motion.div>
  );
}
