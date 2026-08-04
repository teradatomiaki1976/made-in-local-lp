// src/lib/useDarkBgObserver.ts
"use client";
import { useEffect } from "react";
import { useHeaderStore } from "@/store/useHeaderStore"; // 秋の環境に合わせてパスを調整

export function useDarkBgObserver() {
  const setIsDarkBg = useHeaderStore((state) => state.setIsDarkBg);

  useEffect(() => {
    let observer: IntersectionObserver;

    const initObserver = () => {
      // 既存の監視をリセット
      if (observer) observer.disconnect();

      // display: none ではない（現在画面に表示されている）ダークセクションだけを抽出
      const darkSections = Array.from(
        document.querySelectorAll('[data-theme="dark"]'),
      ).filter((el) => window.getComputedStyle(el).display !== "none");

      // ダークセクションが画面に一つもなければ、テキストはデフォルト色（ミッドブルー）に戻す
      if (darkSections.length === 0) {
        setIsDarkBg(false);
        return;
      }

      // 交差判定の初期化（画面上部 0%〜10% のラインに要素が触れたら判定）
      observer = new IntersectionObserver(
        (entries) => {
          const isIntersecting = entries.some((entry) => entry.isIntersecting);
          setIsDarkBg(isIntersecting);
        },
        {
          rootMargin: "-20px 0px -90% 0px",
          threshold: 0,
        },
      );

      darkSections.forEach((section) => observer.observe(section));
    };

    // 1. 初回レンダリング時の実行
    initObserver();

    // 2. SPAのページ切り替え（display: none / block）を検知して監視を再起動
    const mutationObserver = new MutationObserver(() => {
      initObserver();
    });

    // body以下の style や class の変化を監視
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // クリーンアップ関数
    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [setIsDarkBg]);
}
