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
        muted: "#7a6070",
        paper: "#fff3f7",
        mint: "#5dcfca",
        rose: "#f3a6b5",
        coral: "#ee6c5d",
        sun: "#ffd66b",
        line: "#f0d5e2"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(30, 32, 64, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
