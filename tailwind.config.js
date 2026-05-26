/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,html}"],
  theme: {
    extend: {
      colors: {
        // Mediterranean / Menorca inspired premium palette
        ink: "#0d1418",        // near-black, fond sombre premium
        slate: "#1b2730",       // surfaces sombres
        sand: "#f4efe6",        // off-white chaud (fond clair)
        sea: "#1f9a8f",         // turquoise mer (accent principal)
        "sea-dark": "#16766d",
        gold: "#c8a45c",        // accent secondaire premium
        muted: "#6b7884",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      letterSpacing: {
        widest2: "0.3em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};
