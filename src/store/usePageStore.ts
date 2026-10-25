// src/store/usePageStore.ts
import { create } from "zustand";

type PageType = "omoi" | "shikumi";

interface PageState {
  visited: Record<PageType, boolean>;
  scrollPos: Record<PageType, number>;
  markVisited: (page: PageType) => void;
  saveScroll: (page: PageType, y: number) => void;
}

export const usePageStore = create<PageState>((set) => ({
  visited: { omoi: false, shikumi: true }, // 初期表示の方を true
  scrollPos: { omoi: 0, shikumi: 0 },
  markVisited: (page) =>
    set((state) => ({ visited: { ...state.visited, [page]: true } })),
  saveScroll: (page, y) =>
    set((state) => ({ scrollPos: { ...state.scrollPos, [page]: y } })),
}));
