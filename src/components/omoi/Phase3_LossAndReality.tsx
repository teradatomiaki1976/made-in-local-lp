// src/components/omoi/Phase3_LossAndReality.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Phase3_LossAndReality({ scrollYProgress }: Props) {
  // 💡 0.5 で完全に消えるように再配分
  const phaseOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.05, 0.45, 0.5],
    [0, 1, 1, 0],
  );

  const numberOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.05, 0.15, 0.2],
    [0, 1, 1, 0],
  );
  const numberY = useTransform(scrollYProgress, [0.0, 0.05], [30, 0]);

  const textOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.45, 0.5],
    [0, 1, 1, 0],
  );
  const textY = useTransform(scrollYProgress, [0.2, 0.25], [30, 0]);

  return (
    <motion.div
      style={{ opacity: phaseOpacity, pointerEvents: "none" }}
      className="absolute inset-0 w-full h-full z-20 flex flex-col items-center justify-center text-white"
    >
      {/* 3,000,000社 フェーズ */}
      <motion.div
        style={{ opacity: numberOpacity, y: numberY }}
        className="absolute flex flex-col items-center text-center gap-6"
      >
        <p className="text-xl md:text-2xl font-serif">日本では</p>
        <h2 className="text-6xl md:text-9xl text-yellow font-bold tracking-normal">
          3,000,000
          <span className="text-white text-3xl md:text-5xl ml-2">社</span>
        </h2>
        <p className="text-lg md:text-2xl font-serif mt-4">
          以上の法人が地方経済を支えている
        </p>
      </motion.div>

      {/* 人知れず消えていく企業 フェーズ */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute w-full max-w-5xl px-6 flex flex-col items-center justify-between gap-12"
      >
        <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight flex-1">
          人知れず消えていく企業
        </h2>
        <div className="flex-1 flex flex-col gap-6 text-base md:text-xl leading-relaxed opacity-90">
          <p>
            素晴らしい会社なのに、知られていない。必要とされている会社なのに、未来へ残れない。人手不足や後継者不足によって、地域を支えてきた企業が、人知れず姿を消していく。そのたびに、雇用が失われる。技術が途絶える。地域の魅力が、またひとつ消えていく。
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
