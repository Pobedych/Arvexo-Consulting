import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FAFAF7",
        paper: "#F7F5F0",
        ink: "#111111",
        muted: "#5F6368",
        line: "#E5E7EB",
        accent: "#1D4ED8",
        indigo: "#4F46E5"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(17, 17, 17, 0.08)",
        card: "0 16px 48px rgba(17, 17, 17, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
