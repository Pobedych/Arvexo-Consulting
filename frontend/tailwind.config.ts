import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // CSS-variable-based colors — respond to dark mode via :root overrides in globals.css
        bg:            "var(--bg)",
        surface:       "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        ink:           "var(--ink)",
        "ink-2":       "var(--ink-2)",
        muted:         "var(--text-muted)",
        faint:         "var(--text-faint)",
        hairline:      "var(--hairline)",
        "hairline-md": "var(--hairline-md)",
        // Accent/success keep full rgb() form so opacity modifiers like /8 work
        accent:        "rgb(229 64 44 / <alpha-value>)",
        success:       "rgb(31 180 106 / <alpha-value>)",
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
