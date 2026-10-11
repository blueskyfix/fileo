# FileoPDF

Outils PDF, Word et image gratuits, en français et en anglais. Les outils PDF et image fonctionnent directement dans le navigateur : les fichiers ne sont envoyés à aucun serveur.

**Site : [www.fileopdf.com](https://www.fileopdf.com)**

## Pourquoi le traitement local

Les documents professionnels (contrats, fiches de paie, bilans, dossiers clients) contiennent des données sensibles. Les convertisseurs PDF classiques envoient ces fichiers sur un serveur tiers. FileoPDF traite les PDF et les images dans le navigateur, avec pdf-lib, pdf.js et l'API Canvas : le fichier ne quitte pas l'appareil de l'utilisateur.

**Exception : les conversions Word.** PDF vers Word et Word vers PDF passent par le service de conversion [CloudConvert](https://cloudconvert.com), via une route serveur (`/api/convert-*`) qui garde la clé d'API côté serveur. Le fichier est supprimé du service une fois le résultat généré.

Pas de publicité, pas de cookie de suivi : la mesure d'audience utilise Umami, sans cookie.

## Outils

| Outil | Traitement |
|---|---|
| Fusionner des PDF | Navigateur |
| Diviser un PDF | Navigateur |
| Supprimer des pages d'un PDF | Navigateur |
| Faire pivoter un PDF | Navigateur |
| JPG en PDF, PDF en JPG | Navigateur |
| Compresser une image | Navigateur |
| PDF en Word, Word en PDF | Service tiers (CloudConvert) |

Gratuit, sans compte.

## Stack technique

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- next-intl pour le multilingue (`/fr`, `/en`)
- pdf-lib, pdfjs-dist, react-dropzone, dnd-kit, Zustand
- Sentry (suivi des erreurs), Umami (audience), déploiement sur Vercel

## SEO et GEO

- Métadonnées complètes par page via `buildPageMetadata` (`src/core/seo/metadata.ts`) : canonical, hreflang, Open Graph, Twitter
- Données structurées JSON-LD : WebApplication, BreadcrumbList, Organization, WebSite
- `sitemap.xml` et `robots.txt` générés, avec hreflang
- [`/llms.txt`](https://www.fileopdf.com/llms.txt) pour les moteurs génératifs (fichier `public/llms.txt`)
- En-têtes de sécurité définis dans `next.config.ts`

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Variables d'environnement (`.env.local`) :

| Variable | Rôle |
|---|---|
| `CLOUDCONVERT_API_KEY_LIVE` | Clé CloudConvert utilisée en production |
| `CLOUDCONVERT_API_KEY_SANDBOX` | Clé CloudConvert utilisée hors production |
| `NEXT_PUBLIC_SENTRY_DSN` | DSN Sentry (navigateur) |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Identifiant du site Umami |

Les outils PDF et image fonctionnent sans ces variables. Seules les conversions Word demandent une clé CloudConvert.

Vérifications : `npx tsc --noEmit` et `npx next build`.

## Licence

Code source publié à titre de démonstration technique. Le produit déployé est disponible gratuitement sur [www.fileopdf.com](https://www.fileopdf.com).
