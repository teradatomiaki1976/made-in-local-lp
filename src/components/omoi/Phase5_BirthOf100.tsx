// src/components/omoi/Phase5_BirthOf100.tsx
"use client";

import { motion } from "framer-motion";

export default function Phase5_BirthOf100() {
  return (
    // 💡 調整1: pt-32/48 -> pt-16/24 に減らし、-mt-12で上のセクションに少し食い込ませる
    <section className="relative w-full bg-creem pt-16 pb-16 md:pt-24 md:pb-24 flex flex-col items-center justify-center -mt-12 z-40">
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl px-4">
        {/* ① 先に出現するエンブレムロゴ */}
        <motion.div
          // 💡 調整3: scaleを削除し、yの移動を20に抑えて純粋なフェードインを強調
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          // 💡 調整2: 発火タイミングを前倒し（画面に入る少し前に発火開始）
          viewport={{ once: false, margin: "200px" }}
          // durationを少し長め（1.2s）にし、光の中から浮かび上がる高級感を演出
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-60 md:w-120 mb-8"
        >
          <img
            src="/images/logo/emblem_mark.svg"
            alt="地域を代表する企業100選"
            className="w-full h-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* ② 0.4秒遅れて出現するテキスト */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // こちらも発火を少し早くする
          viewport={{ once: false, margin: "0px" }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <p className="text-xl md:text-2xl font-serif text-midblue font-bold mb-4">
            そこで、
          </p>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-olive mb-12 leading-tight">
            地域を代表する企業100選
            <span className="text-midblue block">を創設した</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-midblue/80 font-serif">
            100社上限だからこそ埋もれない新しい地域の旗印(シンボル)になる。
            <br />
            その共通の旗印のもと、地域の企業から意識を変えていく。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
