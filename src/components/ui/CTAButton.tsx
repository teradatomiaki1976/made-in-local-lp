"use client";

import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

interface CTAButtonProps {
  text: string;
  href?: string;
  className?: string;
}

export const CTAButton = ({
  text,
  href = "https://madeinlocal.jp/contact/100selection",
  className = "",
}: CTAButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`mt-10 md:mt-16 flex flex-col items-center w-full max-w-4xl mx-auto z-20 relative ${className}`}
    >
      <a
        href={href}
        className="flex items-center justify-center gap-1.5 bg-[linear-gradient(to_bottom,#007a8c,#00535f)] font-sans text-white leading-tight px-6 md:px-10 py-6 rounded-lg font-bold text-lg md:text-xl shadow-[0_4px_12px_rgba(0,42,92,0.4)] hover:from-[#008396] hover:to-[#005b68] hover:shadow-[0_6px_16px_rgba(0,42,92,0.5)] border border-[#00454f]/30 transition-all duration-300 cursor-pointer group relative overflow-hidden"
      >
        {/* 上部のハイライトライン */}
        <span className="absolute top-0 left-0 w-full h-px bg-white/20"></span>
        <FiChevronRight
          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
        <span className="tracking-wide">{text}</span>
      </a>
    </motion.div>
  );
};
