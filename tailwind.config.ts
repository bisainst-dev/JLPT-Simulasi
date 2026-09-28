import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#8C0014",
          50: "#FFF1F2",
          100: "#FFE4E6",
          500: "#8C0014",
          600: "#7A0012",
          700: "#66000E",
          800: "#4D000A",
          900: "#330007",
        },
      },
      fontFamily: {
        japanese: ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
