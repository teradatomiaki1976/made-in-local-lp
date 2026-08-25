// src/hooks/useDarkSectionObserver.ts
"use client";

import { useEffect, useRef } from "react";
import { useHeaderStore } from "@/store/useHeaderStore";

export function useDarkSectionObserver() {
  const ref = useRef<HTMLDivElement>(null);
  const setIsDarkBg = useHeaderStore((state) => state.setIsDarkBg);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // ヘッダー領域にセクションが交差しているかだけを判定
        setIsDarkBg(entry.isIntersecting);
      },
      {
        root: null,
        // 👇 【重要】画面の上部 0% 〜 10%（ヘッダー周辺）だけを判定エリアにする
        rootMargin: "0px 0px -90% 0px",
        // 1pxでも判定エリアに入れば即座に発火
        threshold: 0,
      },
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [setIsDarkBg]);

  return ref;
}
