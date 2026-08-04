// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          white: "#FFFFFF",
          midblue: "#003064",
          creem: "#fefbf1",
        },
        brand: {
          green: "#0d382b",
          gold: "#B89B5E",
        },
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "serif"],
        sans: ["var(--font-noto-sans)", "sans-serif"],
      },
      spacing: {
        // 1rem = 16px 基準
        xs: "0.5rem", // 8px
        sm: "1rem", // 16px
        md: "1.5rem", // 24px
        lg: "3rem", // 48px
        xl: "5rem", // 80px
        section: "7.5rem", // 120px
      },
      maxWidth: {
        content: "1080px", // ページ全体の最大幅
        editorial: "800px", // 雑誌風レイアウト時のテキストブロック最大幅
      },
    },
  },
  plugins: [],
};

export default config;
