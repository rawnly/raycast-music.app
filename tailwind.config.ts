import type { Config } from "tailwindcss";

export default {
  darkMode: "media",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#E7515D",
      },
    },
  },
  plugins: [],
} satisfies Config;
