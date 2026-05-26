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
index.html        → page d'accueil (hero, services, portfolio, why, process, contact)
src/
  main.js         → menu mobile, header au scroll, reveal, JS minimal
  style.css       → Tailwind + composants (.btn, .service-card, .eyebrow…)
tailwind.config.js → palette (ink/sand/sea/gold), typographies, design tokens
```

## À personnaliser avant mise en ligne

- [ ] Remplacer les **dégradés placeholder** (hero, services, portfolio) par les vraies photos/vidéos.
- [ ] Ajouter un **showreel** vidéo dans la section Work.
- [ ] Connecter le **formulaire** : remplacer `action="https://formspree.io/f/your-id"` par un vrai endpoint (Formspree, Netlify Forms, ou backend).
- [ ] Vérifier/confirmer les mentions de **réassurance** (licence AESA, assurance, délais) — ne pas afficher de garanties non réelles.
- [ ] Renseigner l'URL réelle dans les balises `canonical` / Open Graph et ajouter une image `og.jpg`.
- [ ] Ajouter `favicon`, `robots.txt`, `sitemap.xml`.

## Évolutions prévues (plan)

1. Pages SEO dédiées : `/real-estate-drone-menorca`, `/hotels-resorts`, `/villa-rental-video`, `/wedding-events`.
2. Multilingue : EN (actuel) → ES, puis DE/FR selon la clientèle.
3. Google Business Profile + données structurées enrichies.
4. Témoignages clients + logos partenaires.
```
