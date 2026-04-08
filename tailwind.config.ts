import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shell: "#F4F6F8",
        panel: "#FFFFFF",
        muted: "#4B5563",
        line: "#E5E7EB",
        accent: "#2563EB"
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.1)"
      }
    },
  },
  plugins: [],
};

export default config;
