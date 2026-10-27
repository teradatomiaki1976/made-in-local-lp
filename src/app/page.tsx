// src/app/page.tsx
"use client";

import {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import LoadingPhase from "@/components/omoi/LoadingPhase";
import GlobalHeader from "@/components/layouts/GlobalHeader";
import ScrollProgress from "@/components/layouts/ScrollProgress";
import { usePageStore } from "@/store/usePageStore";
import HeroPhase from "@/components/omoi/HeroPhase";
import MapStoryWrapper from "@/components/omoi/MapStoryWrapper";
import StoryPhase from "@/components/omoi/StoryPhase";
import Phase5_6_BirthAndWhy from "@/components/omoi/Phase5_6_BirthAndWhy";
import Phase7_NewStandard from "@/components/omoi/Phase7_NewStandard";
import Phase8_Circulation from "@/components/omoi/Phase8_Circulation";
import Phase9_Finale from "@/components/omoi/Phase9_Finale";
import GlobalFooter from "@/components/layouts/GlobalFooter";

import ShikumiPageWrapper from "@/components/shikumi/ShikumiPageWrapper";

import { cn } from "@/lib/utils";

// SSR時（window未定義）は useEffect にフォールバックし、ブラウザ上では描画前（Paint前）に同期実行させるフック
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Home() {
  const { visited, markVisited } = usePageStore();
  const lenis = useLenis();

  // 1. 初期ページは "shikumi"（仕組みから理解する）
  const [activePage, setActivePage] = useState<"omoi" | "shikumi">("shikumi");

  // 2. サイト全体の初回ローディング状態
  // ★ 重要: 初期値を boolean ではなく "checking"（判定中）にすることで、
  // 記事ページから戻ってきた瞬間に LoadingPhase が1フレームもマウント・描画されるのを完全に防ぐ！
  const [loadingState, setLoadingState] = useState<
    "checking" | "loading" | "done"
  >("checking");

  // 3. 「想い」ページが一度でも開かれたか（HeroPhaseのアニメーション発火管理）
  const [isOmoiMounted, setIsOmoiMounted] = useState<boolean>(false);

  // 4. 初回ローディング中はヘッダーを隠す（FV登場と同時にフェードインさせる）
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // ★ 初回判定が1度だけ走るように管理するRef
  const hasCheckedInitRef = useRef<boolean>(false);
  // ★ 記事からの戻りスクロール位置を保持するRef
  const returnScrollTargetRef = useRef<number | string | null>(null);

  const scrollPosRef = useRef({ omoi: 0, shikumi: 0 });

  const handleShowHeader = useCallback(() => {
    setIsHeaderVisible(true);
  }, []);

  // ① 初回マウント時：記事からの戻り判定とローディングスキップ判定
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || hasCheckedInitRef.current) return;
    hasCheckedInitRef.current = true;
    window.history.scrollRestoration = "manual";

    const savedScrollY = sessionStorage.getItem("shikumi_return_scroll");
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get("tab");

    // 記事ページのヘッダー/フッターから「想いから感じる（/?tab=omoi）」が押された場合
    if (tabParam === "omoi") {
      setLoadingState("done");
      setActivePage("omoi");
      setIsOmoiMounted(true);
      // 初回omoi表示時はHeroPhaseの演出後にヘッダーを出すため一旦false（訪問済みならtrue）
      setIsHeaderVisible(visited.omoi);
      window.scrollTo(0, 0);
      window.history.replaceState(null, "", "/");
      return;
    }

    const isReturnFromArticle =
      savedScrollY !== null ||
      hash === "#section11" ||
      searchParams.get("tab") === "shikumi";

    // A. 記事から戻ってきた場合はローディングを一度も描画せず即座に "done" にする
    if (isReturnFromArticle) {
      setLoadingState("done");
      setIsHeaderVisible(true);

      if (savedScrollY !== null) {
        returnScrollTargetRef.current = parseInt(savedScrollY, 10);
        sessionStorage.removeItem("shikumi_return_scroll");
      } else if (hash === "#section11") {
        returnScrollTargetRef.current = hash;
      } else {
        // 記事末尾の「仕組みを詳しく見る（/?tab=shikumi）」からの遷移時はトップ(0)へ
        returnScrollTargetRef.current = 0;
      }
      window.history.replaceState(null, "", "/");
    } else {
      // B. 通常のアクセス・リロード時（オープニング LoadingPhase を再生）
      if (window.location.search) {
        window.history.replaceState(null, "", "/");
      }
      window.scrollTo(0, 0);
      setLoadingState("loading");
    }
  }, []);

  // ② 記事からの戻り時、DOMとLenisの高さ計算が完了したタイミングでスクロール位置を確実に復元する
  useEffect(() => {
    if (loadingState !== "done" || returnScrollTargetRef.current === null)
      return;
    if (!lenis) return;

    const target = returnScrollTargetRef.current;

    const executeScroll = () => {
      // Lenisの内部ドキュメント高さを最新のDOMに合わせて強制再計算
      lenis.resize();

      if (typeof target === "number") {
        window.scrollTo(0, target);
        lenis.scrollTo(target, { immediate: true, force: true });
      } else if (typeof target === "string") {
        const targetEl = document.querySelector(target) as HTMLElement | null;
        if (targetEl) {
          const top = targetEl.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, top);
          lenis.scrollTo(targetEl, { immediate: true, force: true });
        }
      }
    };

    // 即時(0ms)・DOMマウント直後(50ms)・レイアウト確定後(250ms)の3段構えでチラつきなくピタッと合わせる
    executeScroll();
    const timer1 = setTimeout(executeScroll, 50);
    const timer2 = setTimeout(() => {
      executeScroll();
      returnScrollTargetRef.current = null;
    }, 250);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [loadingState, lenis]);

  // ③ 初回ローディング中のスクロールロック制御
  useEffect(() => {
    if (loadingState === "loading") {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    } else if (loadingState === "done") {
      document.body.style.overflow = "";
      if (lenis && activePage === "shikumi") {
        lenis.start();
      }
    }
  }, [loadingState, lenis, activePage]);

  // ④ LoadingPhase 完了時のコールバック
  const handleLoadingComplete = useCallback(() => {
    window.scrollTo(0, 0);
    setLoadingState("done");
    setIsHeaderVisible(true);
    markVisited("shikumi");
  }, [markVisited]);

  // ⑤ ページ切り替えとトランジションの制御
  const handlePageChange = useCallback(
    (nextPage: "omoi" | "shikumi") => {
      if (activePage === nextPage || isTransitioning || loadingState !== "done")
        return;

      if (lenis) lenis.stop();

      // STEP 1: 幕を下ろす前に「現在のスクロール位置」を保存する
      scrollPosRef.current[activePage] = window.scrollY;
      setIsTransitioning(true);

      // 初回omoi遷移かどうかを判定（まだ一度も「想い」を開いていない状態）
      const isFirstOmoi = nextPage === "omoi" && !isOmoiMounted;

      // 初回omoi遷移時は、幕が下りるタイミングでヘッダーを一度隠す（文字アニメ後に再表示）
      if (isFirstOmoi) {
        setIsHeaderVisible(false);
      }

      // STEP 2: 幕が下りきった裏側（200ms後）でページを切り替える
      setTimeout(() => {
        if (isFirstOmoi) {
          setIsOmoiMounted(true);
        } else {
          setIsHeaderVisible(true);
        }

        setActivePage(nextPage);

        // STEP 3: 保存していた位置へスクロールを復元する
        requestAnimationFrame(() => {
          const targetScroll = scrollPosRef.current[nextPage] || 0;

          if (lenis) {
            lenis.scrollTo(targetScroll, { immediate: true, force: true });

            // 初回omoi遷移時は HeroPhase 側で3秒間スクロールロックするため、それ以外の時のみ lenis.start()
            if (!isFirstOmoi) {
              lenis.start();
            } else {
              // HeroPhaseの3秒ロック解除後にLenisも確実に再開させるフェイルセーフ
              setTimeout(() => {
                lenis.start();
              }, 3000);
            }
          } else {
            window.scrollTo(0, targetScroll);
          }

          if (!visited[nextPage]) markVisited(nextPage);

          // STEP 4: 幕を開ける
          setIsTransitioning(false);
        });
      }, 200);
    },
    [
      activePage,
      isOmoiMounted,
      loadingState,
      lenis,
      visited,
      markVisited,
      isTransitioning,
    ],
  );

  return (
    <main className="flex min-h-screen w-full flex-col bg-creem relative">
      {/* 1. グローバルヘッダー */}
      <GlobalHeader
        isVisible={isHeaderVisible}
        activePage={activePage}
        onPageChange={handlePageChange}
      />

      {/* 2. サイト初回アクセス時のオープニング（LoadingPhase） */}
      {/* ★ loadingState === "loading" が確定した時のみマウントするため、戻り時に一切チラつかない */}
      <AnimatePresence mode="wait">
        {loadingState === "loading" && (
          <LoadingPhase
            key="initial-loading"
            className="bg-midblue"
            onComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>

      {/* 3. タブ切り替え時のトランジション幕 */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-60 bg-creem"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* 4. 「想いから感じる」ページ領域 */}
      <div
        className={cn(
          "w-full relative min-h-screen",
          activePage === "omoi" ? "block" : "hidden",
        )}
        aria-hidden={activePage !== "omoi"}
        {...({ inert: activePage !== "omoi" ? true : undefined } as any)}
      >
        <AnimatePresence mode="wait">
          {isOmoiMounted && (
            <motion.div
              key="hero-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full flex flex-col"
            >
              <ScrollProgress />
              <HeroPhase onShowHeader={handleShowHeader} />
              <MapStoryWrapper />
              <StoryPhase />
              <Phase5_6_BirthAndWhy />
              <Phase7_NewStandard />
              <Phase8_Circulation />
              <Phase9_Finale />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. 「仕組みから理解する」ページ領域 */}
      <div
        className={cn("w-full", activePage === "shikumi" ? "block" : "hidden")}
        aria-hidden={activePage !== "shikumi"}
      >
        <ShikumiPageWrapper />
      </div>

      {/* 6. グローバルフッター */}
      {loadingState === "done" &&
        (activePage === "shikumi" ||
          (activePage === "omoi" && isOmoiMounted)) && (
          <GlobalFooter
            activePage={activePage}
            onPageChange={handlePageChange}
          />
        )}
    </main>
  );
}
