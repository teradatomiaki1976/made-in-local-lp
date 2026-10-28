// src/components/layouts/ArticleLayoutWrapper.tsx
"use client";

import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import GlobalHeader from "@/components/layouts/GlobalHeader";
import GlobalFooter from "@/components/layouts/GlobalFooter";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ArticleLayoutWrapperProps {
  children: ReactNode;
}

export default function ArticleLayoutWrapper({
  children,
}: ArticleLayoutWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  // 記事ページがマウントされた瞬間に（画面が描画される前に）トップ(0)へセットしてLenisを再開する
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";

    const forceTopAndClearMomentum = () => {
      if (lenis) {
        lenis.stop();
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      if (lenis) {
        lenis.resize();
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.start();
      }
    };

    forceTopAndClearMomentum();

    const rafId = requestAnimationFrame(forceTopAndClearMomentum);
    const timer1 = setTimeout(forceTopAndClearMomentum, 50);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
    };
  }, [pathname, lenis]);

  // 記事ページ上でヘッダー/フッターのトグルが押された際の遷移制御
  const handlePageChange = (targetPage: "omoi" | "shikumi") => {
    if (targetPage === "shikumi") {
      router.push("/?tab=shikumi#section11");
    } else {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("shikumi_return_scroll");
      }
      router.push("/?tab=omoi");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-creem text-text relative">
      {/* 共通ヘッダー */}
      <GlobalHeader
        isVisible={true}
        activePage="shikumi"
        onPageChange={handlePageChange}
      />

      {/* 記事コンテンツ本体：y移動を外し、チラつきゼロでふわっとフェードイン */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex-1 w-full pb-24"
      >
        {children}
      </motion.main>

      {/* 共通フッター */}
      <GlobalFooter activePage="shikumi" onPageChange={handlePageChange} />
    </div>
  );
}
