# 8 Drones Menorca — Site vitrine

Site vitrine premium orienté conversion pour une entreprise de photo/vidéo aérienne par drone à Minorque.
Stack légère : **Vite + Tailwind CSS** (HTML/CSS/JS, aucun framework JS).

## Démarrer le projet

```bash
# 1. Installer les dépendances (une seule fois)
npm install

# 2. Lancer le serveur de développement (hot reload)
npm run dev
#   → ouvre http://localhost:5173

# 3. Construire la version de production (dossier /dist)
npm run build

# 4. Prévisualiser le build de production en local
npm run preview
```

## Structure

```
src/
  template.html   → SOURCE de la page (un seul template, design)
  i18n/           → contenu traduit : en.json, es.json, fr.json, de.json
  main.js         → menu mobile, header au scroll, reveal, JS minimal
  style.css       → Tailwind + composants (.btn, .service-card, .eyebrow…)
scripts/
  generate.mjs    → génère index.html (EN) + es/ fr/ de/ depuis template + i18n
tailwind.config.js → palette (ink/sand/sea/gold), typographies, design tokens
vite.config.js    → base GitHub Pages + build multipage (4 langues)
```

> Les fichiers `index.html`, `es/`, `fr/`, `de/` sont **générés** (gitignorés). On ne les édite jamais à la main.

## Multilingue (EN · ES · FR · DE)

URLs : `/` (EN, défaut), `/es/`, `/fr/`, `/de/` — chacune avec ses propres `<title>`, meta, `lang` et balises `hreflang` (bon pour le SEO). Sélecteur de langue dans le header (desktop + mobile).

**Modifier un texte** → éditer le `src/i18n/<langue>.json` concerné, puis `npm run dev` / `npm run build`.
**Modifier le design/la structure** → éditer `src/template.html` (placeholders `{{clé}}`).
**Ajouter une langue** → créer `src/i18n/<code>.json` (mêmes clés) et ajouter la locale dans `scripts/generate.mjs` (`locales`) + l'entrée dans `vite.config.js`.

> La génération échoue avec un message clair si une clé de traduction manque (pas de `{{…}}` publié par erreur).
> Les URLs de prod (`canonical`/`hreflang`) sont définies par `SITE_URL` dans `scripts/generate.mjs`.

## ⚠️ Indexation / mise en prod

Tant que le site est en **staging sur GitHub Pages**, `SITE_INDEXABLE = false` dans `scripts/generate.mjs` → toutes les pages portent `noindex` (Google ne l'indexe pas, **pas de conflit SEO** avec le site actuellement en ligne). Chaque build l'affiche en avertissement.

**Le jour de la migration sur le domaine de prod** : passer `SITE_INDEXABLE = true`, vérifier `SITE_URL`, et brancher le domaine. (SEO complet — sitemap multilingue, données structurées, pages dédiées — à activer à ce moment-là.)

## Médias

Le site est habillé avec des **visuels stock libres de droits (Pexels — usage libre, sans attribution)** servant de placeholders premium :

- `public/video/hero.mp4` (960×540, ~4 Mo) + `hero-mobile.mp4` (640×360, ~1,5 Mo) — vidéo de fond du hero.
- `public/images/*.jpg` — 8 photos aériennes (côte, villas, resorts).

> ⚠️ À **remplacer par les vraies réalisations du client** (photos + showreel) avant mise en ligne. Les fichiers conservent les mêmes noms → remplacement direct, aucun changement de code requis.

## À personnaliser avant mise en ligne

- [ ] Remplacer les visuels stock par les **réalisations réelles** du client (mêmes noms de fichiers).
- [ ] **Showreel** : le bouton « Watch showreel » du hero rejoue la vidéo du hero. Pour le vrai showreel, remplacer `public/video/hero.mp4` (ou adapter le `data-showreel` dans `main.js` pour pointer une autre source).
- [x] **Témoignages** (`testimonials.items`) = **vrais avis Google** (Escapada Menorca, M. Gregori, K. Snider), traduits dans les 4 langues. En ajouter/changer = éditer les JSON.
- [ ] **Stats** (`stats.items`) : « 20+ projets » (réel) ; « 24h / 100% / 4K » à **confirmer** ou retirer.
- [ ] **Logos clients** (section `#trust`) = placeholders « Client 1…5 » → remplacer par les vrais logos.
- [ ] Connecter le **formulaire** : remplacer `action="https://formspree.io/f/your-id"` par un vrai endpoint (Formspree, Netlify Forms, ou backend).
- [ ] Vérifier/confirmer les mentions de **réassurance** (licence AESA, assurance, délais) — ne pas afficher de garanties non réelles.
- [x] `favicon.svg`, `robots.txt`, `sitemap.xml`, Open Graph + image — en place dans `public/`.
- [x] **Réseaux sociaux** (footer) : Instagram, Facebook, YouTube réels câblés.

## Évolutions prévues (plan)

1. Pages SEO dédiées : `/real-estate-drone-menorca`, `/hotels-resorts`, `/villa-rental-video`, `/wedding-events`.
2. ~~Multilingue EN/ES/FR/DE~~ — ✅ en place (traductions à faire relire par un natif).
3. Google Business Profile + données structurées enrichies.
4. Témoignages clients + logos partenaires.
```
