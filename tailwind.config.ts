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
    },
  },
  plugins: [],
} satisfies Config;
