import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:          "#EEEBE3",
        surface:     "#FBFAF7",
        "surface-alt": "#E6E2D8",
        ink:         "#14130F",
        "ink-2":     "#1A1814",
        muted:       "#57534B",
        faint:       "#8A857B",
        hairline:    "rgba(20,19,15,0.10)",
        "hairline-md": "rgba(20,19,15,0.14)",
        accent:      "#E5402C",
        success:     "#1FB46A",
      },
      fontFamily: {
        onest:     ["var(--font-onest)", "ui-sans-serif", "system-ui", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "ui-serif", "Georgia", "serif"],
        mono:      ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        pill:  "100px",
        card:  "16px",
        card2: "22px",
      },
      boxShadow: {
        panel: "0 30px 64px -32px rgba(20,19,15,0.28)",
        soft:  "0 8px 32px rgba(20,19,15,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
