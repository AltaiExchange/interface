import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: { max: "767px" },
      },
      colors: {
        "custom-green": "#40B66B",
        "custom-red": "#FF5F52",
        background: "#131313",
        border: "#2B2B2B",
        aqua: "#38BCF6",
        purple: "#AE22B0",
        "text-passive": "#9B9B9B",
        "upper-background": "#1B1B1B",
      },
      fontSize: {
        "10px": "0.625rem",
      },
      maxWidth: {
        1920: "1920px",
      },
      minWidth: {
        150: "150px",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
