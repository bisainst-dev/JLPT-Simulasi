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
          50: '#fdf2f3',
          100: '#fce7e8',
          200: '#f9d2d5',
          300: '#f4adb2',
          400: '#eb7b84',
          500: '#dd4d59',
          600: '#c5303e',
          700: '#a5222f',
          800: '#8C0014', // Executive Maroon Core
          900: '#750414',
          950: '#420008',
        },
        gold: {
          400: '#f6c344',
          500: '#e5aa24',
          600: '#c68915',
        },
        hinomaru: '#8C0014',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"San Francisco"',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        japanese: [
          '"Hiragino Sans"',
          '"ヒラギノ角ゴシック"',
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Kaku Gothic Pro"',
          '"Segoe UI"',
          '"Meiryo"',
          '"Yu Gothic"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
export default config;
