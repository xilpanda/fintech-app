/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#0b0f14",
        panel: "#111827",
        accent: "#2563eb"
      }
    }
  },
  plugins: []
};
