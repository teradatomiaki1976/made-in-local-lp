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
      className={`text-3xl md:text-5xl font-bold tracking-tight mb-12 text-left ${className}`}
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
      className={`text-lg md:text-2xl leading-loose text-left ${className}`}
      {...props}
    >
      {children}
    </motion.p>
  );
}
