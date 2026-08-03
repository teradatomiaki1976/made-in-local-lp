// src/components/layouts/Section.tsx
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  // 背景色違いなどのバリエーションを将来持たせやすくする
  variant?: "default" | "dark" | "light";
};

export default function Section({
  children,
  className,
  variant = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        // 全セクション共通の余白ルール（スマホとPCの揺れをここで吸収）
        "w-full px-5 md:px-10 py-16 md:py-section-md",
        // バリエーションごとのスタイル
        variant === "dark" && "bg-brand-dark text-white",
        variant === "light" && "bg-brand-gray text-brand-dark",
        className, // 呼び出し元からの個別の上書きを許可
      )}
      {...props}
    >
      {/* コンテンツの最大幅もここで制御してしまう */}
      <div className="mx-auto w-full max-w-content">{children}</div>
    </section>
  );
}
