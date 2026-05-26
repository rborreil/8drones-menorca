import { defineConfig } from "vite";

export default defineConfig({
  base: "/8drones-menorca/",
  // Multi-pages : desactive le fallback SPA pour que /es/, /fr/, /de/
  // servent bien leur propre index.html en dev (et pas la page EN).
  appType: "mpa",
  build: {
    rollupOptions: {
      // Pages generees par scripts/generate.mjs (une par langue)
      input: {
        en: "index.html",
        es: "es/index.html",
        fr: "fr/index.html",
        de: "de/index.html",
      },
    },
  },
});
