// Generateur i18n : 1 template + dictionnaires JSON -> pages statiques par langue.
// Sortie : index.html (EN, racine), es/index.html, fr/index.html, de/index.html
// Lance avant `vite` / `vite build` (voir package.json).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// URL de production (canonical / hreflang / og). A adapter si le domaine change.
const SITE_URL = "https://www.8drones-menorca.com";
// Chemin de deploiement (GitHub Pages projet). Doit matcher `base` dans vite.config.js.
const BASE = "/8drones-menorca/";

// ⚠️ INDEXATION GOOGLE
// false = staging GitHub Pages : on bloque l'indexation pour ne PAS interferer
//         avec le site actuellement en ligne (pas de duplicate content).
// PASSER A true UNIQUEMENT le jour de la migration sur le domaine de prod,
// sinon le site de prod ne sera jamais indexe.
const SITE_INDEXABLE = false;
const robotsMeta = SITE_INDEXABLE
  ? ""
  : '<meta name="robots" content="noindex, nofollow" />';

const locales = [
  { code: "en", short: "EN", label: "English",  dir: "",    ogLocale: "en_US" },
  { code: "es", short: "ES", label: "Español",  dir: "es/", ogLocale: "es_ES" },
  { code: "fr", short: "FR", label: "Français", dir: "fr/", ogLocale: "fr_FR" },
  { code: "de", short: "DE", label: "Deutsch",  dir: "de/", ogLocale: "de_DE" },
];

const template = readFileSync(resolve(root, "src/template.html"), "utf8");

// Acces a une cle imbriquee : get(obj, "a.b.0.c")
const get = (obj, path) =>
  path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

// Bloc hreflang commun a toutes les pages
const hreflang = [
  ...locales.map(
    (l) => `    <link rel="alternate" hreflang="${l.code}" href="${SITE_URL}/${l.dir}" />`
  ),
  `    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
].join("\n");

if (!SITE_INDEXABLE) {
  console.warn(
    "[i18n] ⚠️  noindex ACTIF (staging). Repasser SITE_INDEXABLE=true apres la migration prod."
  );
}

for (const loc of locales) {
  const dict = JSON.parse(
    readFileSync(resolve(root, `src/i18n/${loc.code}.json`), "utf8")
  );
  const canonical = `${SITE_URL}/${loc.dir}`;

  // Selecteur de langue (liens base-relatifs pour fonctionner sous le sous-dossier)
  const switcher = (cls) =>
    locales
      .map((l) => {
        const active = l.code === loc.code;
        return `<a href="${BASE}${l.dir}" hreflang="${l.code}" aria-label="${l.label}" class="${cls} ${
          active ? "text-sand font-semibold" : "text-sand/50 hover:text-sand"
        }"${active ? ' aria-current="true"' : ""}>${l.short}</a>`;
      })
      .join("\n            ");

  let html = template
    .replaceAll("{{lang}}", loc.code)
    .replaceAll("{{ogLocale}}", loc.ogLocale)
    .replaceAll("{{canonical}}", canonical)
    .replaceAll("{{siteUrl}}", SITE_URL)
    .replaceAll("{{robots}}", robotsMeta)
    .replaceAll("{{hreflang}}", hreflang)
    .replaceAll("{{langSwitcherDesktop}}", switcher("text-sm"))
    .replaceAll("{{langSwitcherMobile}}", switcher("text-base"));

  // Remplace les cles de traduction {{a.b.c}}
  html = html.replace(/\{\{([a-zA-Z0-9_.]+)\}\}/g, (_m, key) => {
    const val = get(dict, key);
    if (val == null) {
      throw new Error(`[i18n] Cle manquante "${key}" dans src/i18n/${loc.code}.json`);
    }
    return String(val);
  });

  // Securite : aucun placeholder ne doit subsister
  const leftover = html.match(/\{\{[^}]+\}\}/g);
  if (leftover) {
    throw new Error(`[i18n] Placeholders non resolus (${loc.code}) : ${leftover.join(", ")}`);
  }

  const outPath = resolve(root, `${loc.dir}index.html`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  console.log(`[i18n] OK -> ${loc.dir || ""}index.html (${loc.code})`);
}
