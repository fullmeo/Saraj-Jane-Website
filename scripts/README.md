# 📜 Scripts - Documentation

Ce dossier contient les scripts utilitaires pour le site Sarah Jane Iffra.

---

## 🤖 auto-setup.js

Script interactif de configuration automatique du projet.

### Usage

```bash
node scripts/auto-setup.js
```

Ou depuis Windows (si Node.js est dans le PATH) :

```bat
node scripts\auto-setup.js
```

### Ce que fait le script

Le script guide l'installation en 5 étapes :

| Étape | Action |
|-------|--------|
| 1 | Vérifie Node.js (>= 16) et npm (>= 7) |
| 2 | Crée `.env` depuis `.env.example` avec option de saisie interactive des clés |
| 3 | Lance `npm install` (avec option de réinstallation) |
| 4 | Exécute `npm audit` et affiche un résumé des vulnérabilités |
| 5 | Affiche un résumé de l'état de l'installation et les commandes disponibles |

### Sortie exemple

```
╔══════════════════════════════════════════╗
║   Sarah Jane Iffra — Auto Setup Script   ║
╚══════════════════════════════════════════╝

──────────────────────────────────────────────────
  1/5 — Vérification de l'environnement
──────────────────────────────────────────────────

✅ Node.js v20.11.0
✅ npm v10.2.4

──────────────────────────────────────────────────
  2/5 — Configuration des variables d'environnement
──────────────────────────────────────────────────

ℹ️  Création de .env depuis .env.example…
✅ .env créé.
Voulez-vous configurer les clés maintenant ? (o/N) :
```

### Comportement interactif

- Si `.env` existe déjà → étape ignorée
- Si `node_modules` existe déjà → propose de réinstaller
- Si `npm install` échoue → propose de réessayer avec `--legacy-peer-deps`
- Si une clé n'est pas renseignée lors de la saisie → conserve la valeur du modèle

### Prérequis

Aucune dépendance externe — utilise uniquement les modules Node.js natifs :
- `fs`
- `path`
- `child_process`
- `readline`

---

## install.bat (racine du projet)

Script Windows (batch) pour une installation rapide en double-cliquant.

### Usage

Double-cliquer sur `install.bat` dans l'explorateur Windows, ou depuis le terminal :

```bat
install.bat
```

### Ce que fait le script

1. Vérifie que Node.js est installé et >= 16
2. Vérifie que npm est installé et >= 7
3. Lance `npm install`
4. Affiche les commandes disponibles en cas de succès

> Pour une configuration complète (clés Firebase, etc.), utiliser `scripts/auto-setup.js` après `install.bat`.

---

## Scripts npm (package.json)

Les scripts suivants sont disponibles via `npm run` :

```bash
npm start                    # Serveur local port 3000
npm run build                # Build complet (CSS + JS + assets)
npm run build:css            # Minification CSS uniquement
npm run build:js             # Minification JS uniquement
npm run copy:assets          # Copie des assets vers dist/
npm run deploy:staging       # Firebase hosting staging
npm run deploy:production    # Firebase hosting production
npm run deploy:all           # Firebase déploiement complet
npm run deploy:rules         # Règles Firestore + Storage
npm run optimize-images      # Optimisation des images
npm run lint                 # ESLint
npm run lint:fix             # ESLint avec correction auto
npm run format               # Prettier
```

---

## Ajouter un nouveau script

Pour ajouter un script utilitaire :

1. Créer le fichier dans ce dossier : `scripts/mon-script.js`
2. Utiliser uniquement des modules natifs Node.js si possible (pas de dépendances)
3. Documenter le script dans ce fichier
4. Si pertinent, ajouter une entrée dans `package.json` sous `"scripts"`

---

## 📚 Documentation liée

- `INSTALL.md` — Guide d'installation complet
- `SECURITY.md` — Sécurité et gestion des secrets
- `FIREBASE-SETUP.md` — Configuration Firebase
- `deployment-guide.md` — Options de déploiement
