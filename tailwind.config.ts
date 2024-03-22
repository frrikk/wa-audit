import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateX(-.5%)" },
          "100%": { opacity: "1", translate: "translateX(0)" },
        },
        grayscale: {
          "0%": { filter: "grayscale(0)" },
          "100%": { filter: "grayscale(100%)" },
        },
      },
      animation: {
        grayscale: "grayscale 5s ease-in-out",
        fadeIn: "fadeIn 0.2s ease-in-out",
        fadeInChildren: "fadeIn .5s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "sans-grotesk": ["Schibsted Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
