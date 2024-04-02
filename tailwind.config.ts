import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/**/*.{js,ts,jsx,tsx,mdx}",
    ".src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '500px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        hero: "url('/img/encabezado/maquinaria-pesada.webp')",
      },
      backgroundColor: {
        primary: "#f7a813",
        secondary: "#e5e7eb",
        danger: "#dc2626",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
        dark: "#1f2937",
        light: "#f9fafb",
        muted: "#6b7280",
        white: "#ffffff",
        black: "#000000",
      },
      textColor: {
        primary: "#f7a813",
        secondary: "#e5e7eb",
        danger: "#dc2626",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
        dark: "#1f2937",
        light: "#f9fafb",
        muted: "#6b7280",
        white: "#ffffff",
        black: "#000000",
      },
      borderColor: {
        primary: "#f7a813",
        secondary: "#e5e7eb",
        danger: "#dc2626",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
        dark: "#1f2937",
        light: "#f9fafb",
        muted: "#6b7280",
        white: "#ffffff",
        black: "#000000",
      },
      boxShadowColor: {
        primary: "#f7a813",
        secondary: "#e5e7eb",
        danger: "#dc2626",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
        dark: "#1f2937",
        light: "#f9fafb",
        muted: "#6b7280",
        white: "#ffffff",
        black: "#000000",
      },
      fontFamily: {
        title: ["SoccerLeage", "sans-serif"],
        title2: ["SoccerLeageItalic", "sans-serif"],
        paragraph: [" MyriadPro-Regula", "sans-serif"],
        titleVariant: [" Myriad-Variable-Concept", "sans-serif"],
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "120rem",
      },
      fill: {
        primary: "#f7a813",
        secondary: "#e5e7eb",
        danger: "#dc2626",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
        dark: "#1f2937",
        light: "#f9fafb",
        muted: "#6b7280",
        white: "#ffffff",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
export default config;
