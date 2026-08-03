# 📁 Made In Local LP プロジェクト コンテキスト

## 1. プロジェクト概要

- **プロジェクト名:** 「地域を代表する企業100選」LP制作
- **ターゲット:** 地域貢献やSDGsに熱心な経営者・決裁者。
- **メインCV:** エントリー相談・面談申し込み[cite: 4]。
- **コアコンセプト:** 「体温（想い）」と「論理（仕組み）」の美しい同居[cite: 4]。

## 2. 開発・技術スタック

- **フレームワーク:** Next.js (App Router)
- **言語:** TypeScript (Strict Mode)
- **スタイリング:** Tailwind CSS + CSS Modules
- **アニメーション:** Framer Motion
- **状態管理:** Zustand (推奨: 0秒画面遷移のページ状態保持のため)

## 3. UI/UX・デザイン仕様（仮）

- **アーキテクチャ:** 左右並列SPA構造（0秒画面遷移）。「想い」と「仕組み」の2ページを `display: none / block` で切り替え、スクロール位置をネイティブ保持する[cite: 4]。
- **ナビゲーション:** スクロール連動型「トランスフォーム・ナビ」。
- **フォント戦略:** Noto Serif（明朝体）とNoto Sans（ゴシック体）のハイブリッド[cite: 4]。

## 4. ディレクトリ構造 (src/)

made-in-local-lp/
├── docs/ # プロジェクトのルールやAI用プロンプトを管理（CONTEXT.mdなど）
├── public/ # 画像やファビコンなどの静的ファイル置き場
├── src/ # 開発するコードの心臓部
│ ├── app/ # Next.js (App Router) のルーティングと画面
│ │ ├── favicon.ico
│ │ ├── globals.css # サイト全体のベースCSS・印刷用(@media print)初期設定
│ │ ├── layout.tsx # 全ページ共通レイアウト（Notoフォント設定・ナビゲーション）
│ │ └── page.tsx # 0秒画面遷移のエントリポイント（想い・仕組みの切り替え）
│ │
│ ├── components/ # ページを構成するUIパーツ
│ │ ├── layout/ # トランスフォーム・ナビなどの共通レイアウト要素
│ │ ├── omoi/ # 「想いから感じる」ページ専用コンポーネント（FVアニメ等）
│ │ └── shikumi/ # 「仕組みから理解する」ページ専用コンポーネント（エディトリアルUI）
│ │
│ ├── lib/ # ユーティリティ関数（Tailwindクラス結合など）
│ └── store/ # Zustandを用いたSPA状態管理（スクロール位置・表示ページの保持）
│
├── .gitignore # GitHubに上げないファイルを指定するリスト
├── eslint.config.mjs # コードを綺麗に保つための構文チェック設定
├── package.json # インストールしたライブラリの一覧表
└── tsconfig.json # TypeScriptの設定ファイル

## 5. コーディング・実装ルール

- 複雑なアニメーションは `transform` と `opacity` のみに限定し、レンダリング負荷を抑える。
- `display: none` で非表示のセクションには `aria-hidden="true"` と `inert` を付与し、アクセシビリティ(a11y)を担保する。
- 印刷時 (`@media print`) はJSによるトランスフォームを無効化し、ブロックレイアウトを強制する。
