/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#101828",
        navyDark: "#0B1220",
        brandRed: "#A7191C",
        redDark: "#851214",
        orange: "#F59E0B",
        yellow: "#FACC15",
        offWhite: "#F8FAFC",
        mutedText: "#475569",
        border: "#E2E8F0",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 45px rgba(16, 24, 40, 0.08)",
      },
    },
  },
  plugins: [],
};
