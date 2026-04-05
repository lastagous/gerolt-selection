/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "gs-gold": "#c8a84b",
        "gs-dark": "#1a1a2e",
        "gs-panel": "#16213e",
        "gs-border": "#2a2a4a",
        "gs-text": "#e0e0e0",
        "gs-muted": "#8888aa",
        "gs-orange": "#f97316",
        "gs-green": "#22c55e",
        "gs-blue": "#3b82f6",
      },
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};
