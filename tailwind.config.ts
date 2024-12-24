import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gladiolenbg: "#FF460D",
        gladiolenfg: "#FFBCE5",
        gladiolentext: "#950F66",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        gladiolenflexa: ["GT-Flexa-Compressed-Black", "sans-serif"],
        gladiolenrandmedium: ["GT-Rand-Medium", "sans-serif"],
        gladiolenrandheavy: ["GT-Rand-Heavy", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
