import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-work-sans)", "sans-serif"],
      },
      colors: {
        primary: "#2B74F0",
        background: "#FFFFFF",
      },
    },
  },
  plugins: [],
};

export default config;
