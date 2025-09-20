# maxence.maireaux.fr

Portfolio personnel et blog de Maxence Maireaux.

## 🚀 Technologies

- **Next.js 15** - Framework React avec App Router et export statique
- **React 19** - Bibliothèque UI
- **TypeScript** - Type safety
- **UnoCSS** - Framework CSS atomique
- **MDX** - Markdown enrichi avec support de composants
- **next-intl** - Internationalisation (FR/EN)

## 📦 Installation

```bash
# Installer les dépendances
pnpm install
```

## 🛠️ Développement

```bash
# Lancer le serveur de développement
pnpm dev

# Lancer les tests de linting
pnpm lint

# Corriger automatiquement les problèmes de linting
pnpm lint:fix
```

## 🏗️ Build

```bash
# Créer le build de production
pnpm build

# Prévisualiser le build de production
pnpm start
```

## 📁 Structure du projet

```
src/
├── app/              # Routes Next.js App Router
│   └── [locale]/     # Routes internationalisées
├── components/       # Composants React
├── content/          # Contenu du blog (Markdown/MDX)
│   └── blog/
│       ├── fr/       # Articles en français
│       └── en/       # Articles en anglais
├── messages/         # Fichiers de traduction
│   ├── fr.json
│   └── en.json
├── styles/           # Styles globaux
└── lib/              # Utilitaires et helpers
```

## 🌍 Internationalisation

Le site supporte deux langues :
- **Français** (par défaut) : `/fr/`
- **Anglais** : `/en/`

La détection automatique de la langue du navigateur redirige vers la version appropriée.

## 📝 Écriture d'articles

Les articles de blog sont écrits en Markdown/MDX dans `/src/content/blog/{fr,en}/`.

Format du frontmatter :
```yaml
---
title: "Titre de l'article"
date: "2025-01-20"
description: "Description de l'article"
tags: ["tag1", "tag2"]
published: true
translationKey: "unique-key"
---
```

## 🚀 Déploiement

Le site génère un export statique dans le dossier `/out` qui peut être déployé sur n'importe quel hébergeur statique (Vercel, Netlify, GitHub Pages, etc.).

## 📄 Licence

© 2025 Maxence Maireaux