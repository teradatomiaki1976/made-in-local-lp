"use client";

import { motion } from "framer-motion";
import TeaserPhase from "./TeaserPhase";
import HeroLeftBrain from "./HeroLeftBrain";
import IntroLeftBrain from "./IntroLeftBrain";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Section8 from "./Section8";
import Section9 from "./Section9";
import Section10 from "./Section10";
import Section11 from "./Section11";
import Section12 from "./Section12";
import Section13 from "./Section13";
import Section14 from "./Section14";

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
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
      <Section10 />
      <Section11 />
      <Section12 />
      <Section13 />
      <Section14 />
    </motion.div>
  );
}
