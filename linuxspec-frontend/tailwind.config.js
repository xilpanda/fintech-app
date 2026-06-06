/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#080d14",
        surface: "#0f1724",
        panel: "#151f2e",
        card: "#1a2535",
        border: "#243044",
        accent: "#e63946",
        "accent-hover": "#c1121f",
        teal: "#00b4d8",
        muted: "#8b9cb3",
        heading: "#f0f4f8"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(230,57,70,0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(0,180,216,0.1), transparent)",
        "section-gradient": "linear-gradient(180deg, #080d14 0%, #0f1724 100%)"
      },
      boxShadow: {
        glow: "0 0 40px rgba(230,57,70,0.15)",
        card: "0 8px 32px rgba(0,0,0,0.4)"
      }
    }
  },
  plugins: []
};
