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
          dark: "#003064",
          bright: "#FFFCEF",
        },
      },
      fontFamily: {
        // next/font と連携しやすいようにCSS変数として定義
        serif: ["var(--font-noto-serif)", "serif"],
        sans: ["var(--font-noto-sans)", "sans-serif"],
      },
      spacing: {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "48px",
        xl: "80px",
        section: "120px",
      },
      maxWidth: {
        content: "1080px",
      },
    },
  },
  plugins: [],
};

export default config;
