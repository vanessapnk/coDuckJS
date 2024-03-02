//import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
<<<<<<< Updated upstream
=======
      colors: {
        "custom-green": "#61C8A4",
        "custom-lilac": "#CFC2FC",
        "custom-yellow": "#F6E174",
        "custom-background-grey": "#F4F5EF",
        "custom-grey": "#D9D9D9"
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
>>>>>>> Stashed changes
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
<<<<<<< Updated upstream
}
=======
};
>>>>>>> Stashed changes
