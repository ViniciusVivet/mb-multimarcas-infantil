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
        ink: "#24302f",
        muted: "#657170",
        paper: "#fffaf7",
        mint: "#91d7c5",
        rose: "#f3a6b5",
        coral: "#ee6c5d",
        sun: "#ffd66b",
        line: "#eadfd8"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(36, 48, 47, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
