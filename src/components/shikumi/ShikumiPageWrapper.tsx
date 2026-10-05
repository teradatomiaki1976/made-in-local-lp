"use client";

import { motion } from "framer-motion";
import TeaserPhase from "./TeaserPhase";
import HeroLeftBrain from "./HeroLeftBrain";
import IntroLeftBrain from "./IntroLeftBrain";
import Section2 from "./Section2";
import Section3 from "./Section3";

export default function ShikumiPageWrapper() {
  return (
    // タブが切り替わった瞬間にこのdivがマウントされ、フェードインで表示される
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full flex flex-col bg-white"
    >
      <HeroLeftBrain />
      <IntroLeftBrain />
      <Section2 />
      <Section3 />
    </motion.div>
  );
}
