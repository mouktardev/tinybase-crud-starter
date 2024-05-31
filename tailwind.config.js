/*eslint-env node*/

import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        mute: "rgb(var(--mute) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        warningForeground: "rgb(var(--warning-foreground) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        dangerForeground: "rgb(var(--danger-foreground) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        successForeground: "rgb(var(--success-foreground) / <alpha-value>)",
        action: "rgb(var(--action) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0px 6px 24px 0px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        aurora: "aurora 60s linear infinite",
        grid: "grid 15s linear infinite",
        meteor: "meteor 5s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
      },
      fontFamily: {
        almarai: ['"Almarai"', ..._fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
}

