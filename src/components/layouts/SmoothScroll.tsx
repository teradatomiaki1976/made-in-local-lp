// src/components/layouts/SmoothScroll.tsx
"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.02, // 0.01〜0.1の間で調整。低いほど「タメ（慣性）」が強くなる
        duration: 2.0,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
