import { ReactNode, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  children: ReactNode;
  className?: string;
  // 背景色など、LPで頻出するパターンをPropとして定義しても良い
  theme?: "dark" | "light" | "transparent";
}

export function Section({
  children,
  className,
  theme = "transparent",
  ...props
}: SectionProps) {
  // 共通のベーススタイル
  const baseClasses = "relative w-full py-18 md:py-32 overflow-hidden";

  // テーマごとのデフォルトスタイル（必要に応じて拡張）
  const themeClasses = {
    dark: "bg-[#0a1128] text-white",
    light:
      "bg-[linear-gradient(to_bottom,#ECFFF5_0%,#F9FDF2_30%,#F9FDF2_100%)]",
    transparent: "",
  };

  return (
    <section
      className={cn(baseClasses, themeClasses[theme], className)}
      {...props}
    >
      {children}
    </section>
  );
}
