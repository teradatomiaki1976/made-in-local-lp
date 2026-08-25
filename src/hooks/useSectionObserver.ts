// src/hooks/useSectionObserver.ts
import { useEffect } from "react";
import { useHeaderStore } from "@/store/useHeaderStore";

export function useSectionObserver(
  sectionRef: React.RefObject<HTMLElement>,
  isDarkSection: boolean,
) {
  const setIsDarkBg = useHeaderStore((state) => state.setIsDarkBg);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // セクションが画面の半分（50%）以上表示されたら状態を更新
        if (entry.isIntersecting) {
          setIsDarkBg(isDarkSection);
        }
      },
      { threshold: 0.5 }, // 50%見えたらトリガー
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionRef, isDarkSection, setIsDarkBg]);
}
