// src/components/omoi/Phase5_BirthOf100.tsx
"use client";

import { motion } from "framer-motion";

export default function Phase5_BirthOf100() {
  return (
    <section className="relative w-full bg-creem pt-16 pb-16 md:pt-24 md:pb-24 flex flex-col items-center justify-center -mt-12 z-40">
      <div className="relative z-10 flex flex-col md:flex-row items-center text-center w-full max-w-6xl px-4">
        {/* ① 先に出現するエンブレムロゴ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px" }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.6 }}
          className="w-70 md:w-90 mb-8 md:mr-24"
        >
          <img
            src="/images/logo/emblem_dark.svg"
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
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col items-center max-md:border-t md:border-l border-midblue/30  pt-8 md:pl-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-olive mb-12 leading-tight">
            <span className="text-midblue block text-lg md:text-2xl">
              そこで、
            </span>
            地域を代表する企業100選
            <span className="text-midblue block">を創設した</span>
          </h2>
          <p className="text-base md:text-xl font-bold leading-relaxed text-midblue/80 font-serif">
            100社上限だからこそ埋もれない新しい地域の旗印になる。
            <br />
            その共通の旗印のもと、地域の企業から意識を変えていく。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
