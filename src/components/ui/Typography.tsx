import { ReactNode, ElementType } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

// --- H2 見出し ---
interface Heading2Props extends HTMLMotionProps<"h2"> {
  children: ReactNode;
  className?: string;
}
export function Heading2({
  children,
  className = "",
  ...props
}: Heading2Props) {
  return (
    <motion.h2
      className={`text-2xl md:text-5xl font-bold tracking-tight leading-normal mb-8 md:mb-12 text-left md:text-center ${className}`}
      {...props}
    >
      {children}
    </motion.h2>
  );
}

// --- 本文 (P) ---
interface TextProps extends HTMLMotionProps<"p"> {
  children: ReactNode;
  className?: string;
}
export function Text({ children, className = "", ...props }: TextProps) {
  return (
    <motion.p
      className={`text-lg md:text-2xl leading-loose text-left md:text-center mx-auto ${className}`}
      {...props}
    >
      {children}
    </motion.p>
  );
}
