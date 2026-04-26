import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1e2040",
        muted: "#6b5572",
        paper: "#fef0f6",
        mint: "#3ecfc8",
        rose: "#f5a0c0",
        coral: "#d6366e",
        sun: "#ffd66b",
        line: "#f2d4e8"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(30, 32, 64, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
