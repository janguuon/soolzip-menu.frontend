import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        ]
      },
      fontSize: {
        fluid: "clamp(0.65rem, 1.5vw, 1.1rem)",
        "btn-fluid": "clamp(0.6rem, 1.2vw, 0.9rem)"
      }
    }
  },
  plugins: []
};

export default config;
