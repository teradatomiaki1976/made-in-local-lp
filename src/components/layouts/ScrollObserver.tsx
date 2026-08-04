// src/components/layouts/ScrollObserver.tsx
"use client";

import { useDarkBgObserver } from "@/lib/useDarkBgObserver";

export default function ScrollObserver() {
  // 画面のスクロールと背景色を監視するフックをここで実行
  useDarkBgObserver();

  // UIとしては何もレンダリングしない
  return null;
}
