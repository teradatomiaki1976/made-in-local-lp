// src/components/layouts/ScrollProgress.tsx
"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // スクロール値にSpringアニメーションを適用（滑らかな追従）
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      // TOP, バー, END を縦に並べて中央揃えにするFlexコンテナ
      className="fixed top-1/2 -translate-y-1/2 right-3 md:right-6 z-50 pointer-events-none flex flex-col items-center gap-2"
      aria-hidden="true" // アクセシビリティ：装飾なのでスクリーンリーダーから隠す
    >
      {/* TOP テキスト */}
      {/* <span
        className="text-[11px] font-bold font-sans text-midblue/60 tracking-widest uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        TOP
      </span> */}

      {/* プログレスバー本体（高さ約1/3） */}
      <div className="relative w-[8px] h-[30vh] rounded-full overflow-hidden bg-yellow">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-midblue origin-top"
          style={{ scaleY }}
        />
      </div>

      {/* END テキスト */}
      {/* <span
        className="text-[11px] font-bold font-sans text-midblue/60 tracking-widest uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        END
      </span> */}
    </div>
  );
}
