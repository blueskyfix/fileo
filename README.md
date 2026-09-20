# Fileo

Hub d'outils de traitement de documents 100% côté client. Fusionner, diviser, convertir et manipuler vos PDF directement dans le navigateur, sans envoyer aucun fichier sur un serveur.

**Site : [fileopdf.com](https://www.fileopdf.com)**

## Pourquoi 100% local

Les documents professionnels (contrats, fiches de paie, bilans, dossiers clients) contiennent des données sensibles. Les convertisseurs PDF classiques uploadent ces fichiers sur un serveur tiers pour les traiter. Fileo fait tout dans le navigateur avec WebAssembly et l'API Canvas : le fichier ne quitte jamais l'appareil de l'utilisateur.

## Outils disponibles

- Fusionner des PDF
- Diviser un PDF
- Supprimer des pages d'un PDF
- Faire pivoter un PDF
- Convertir JPG en PDF et PDF en JPG
- Convertir PDF en Word et Word en PDF
- Compresser une image

Gratuit, sans compte, sans limite de fichiers.

## Stack technique

Next.js 16, React 19, TypeScript, Tailwind CSS v4, Zustand, pdf-lib, pdfjs-dist, react-dropzone, dnd-kit.

## Getting Started (dev local)

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Licence

Code source à but de démonstration technique. Le produit déployé est disponible gratuitement sur [fileopdf.com](https://www.fileopdf.com).