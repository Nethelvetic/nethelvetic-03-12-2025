import type { Config } from "tailwindcss";

module.exports  ={
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      backgroundImage: {
        'bg-gradient': 'linear-gradient(to right, #EB5E57, #4445D2)',
        'bg-gradient2': 'linear-gradient(to right, #000E59, #AF8FF7)',
      },
    },
  },
  plugins: [],
} satisfies Config;
