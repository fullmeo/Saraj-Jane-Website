# 🚀 Guide d'Installation - Site Sarah Jane Iffra

## 📋 Prérequis

| Logiciel | Version minimale | Vérification |
|----------|-----------------|--------------|
| Node.js  | >= 16.0.0       | `node -v`    |
| npm      | >= 7.0.0        | `npm -v`     |
| Git      | toute version   | `git --version` |

> Téléchargement Node.js : https://nodejs.org/

---

## ⚡ Installation Rapide (Windows)

Double-cliquez sur **`install.bat`** à la racine du projet.

Le script :
1. Vérifie les versions de Node.js et npm
2. Installe toutes les dépendances (`npm install`)
3. Affiche les commandes disponibles

---

## 🐧 Installation Manuelle (Linux / macOS / Windows)

### 1. Cloner le dépôt

```bash
git clone https://github.com/fullmeo/Saraj-Jane-Website.git
cd Saraj-Jane-Website
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer .env avec vos vraies valeurs
nano .env   # ou tout autre éditeur
```

Variables obligatoires à renseigner :

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_YOUTUBE_API_KEY=...
VITE_YOUTUBE_CHANNEL_ID=...
VITE_ADMIN_EMAILS=votre@email.com
```

> Voir `FIREBASE-SETUP.md` pour obtenir les clés Firebase.

### 4. Lancer le serveur de développement

```bash
npm start
```

Le site est accessible sur **http://localhost:3000**

---

## 📁 Structure du Projet

```
Saraj-Jane-Website/
├── index.html              # Page principale
├── css/
│   ├── style.css           # Styles principaux
│   └── admin.css           # Styles du tableau de bord admin
├── js/
│   ├── main.js             # JavaScript principal
│   └── admin-auth.js       # Authentification admin
├── images/                 # Médias et galerie
├── admin/                  # Interface d'administration
├── pages/                  # Pages secondaires
├── config/                 # Configuration Firebase
├── dist/                   # Fichiers de production (généré)
├── scripts/
│   └── auto-setup.js       # Script de configuration automatique
├── install.bat             # Installateur Windows
├── .env.example            # Modèle de configuration
├── package.json            # Dépendances et scripts npm
├── netlify.toml            # Configuration Netlify
├── firebase.json           # Configuration Firebase
└── firestore.rules         # Règles de sécurité Firestore
```

---

## 🛠️ Scripts Disponibles

```bash
# Développement - serveur local port 3000
npm start

# Production - minification CSS/JS + copie assets
npm run build

# Déploiement staging Firebase
npm run deploy:staging

# Déploiement production Firebase
npm run deploy:production

# Déployer règles Firestore + Storage
npm run deploy:rules

# Optimiser les images
npm run optimize-images

# Linter JavaScript
npm run lint
npm run lint:fix

# Formater le code
npm run format
```

---

## 🔧 Configuration Firebase

1. Créer un projet sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activer **Authentication** (Google + Email)
3. Activer **Firestore Database**
4. Activer **Storage**
5. Activer **Hosting** (staging + production)
6. Copier les clés dans votre fichier `.env`

Voir `FIREBASE-SETUP.md` pour les instructions détaillées.

---

## 🌐 Déploiement

### Netlify (recommandé)

1. Connecter le repo GitHub à Netlify
2. Build command : `npm run build`
3. Publish directory : `dist`
4. Variables d'environnement : copier le contenu de `.env`

### Firebase Hosting

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Connexion
firebase login

# Initialiser (première fois)
firebase init

# Déployer
npm run deploy:production
```

### GitHub Pages

```bash
npm run deploy
```

---

## 🔍 Vérification de l'Installation

- [ ] `npm start` lance sans erreur
- [ ] `http://localhost:3000` affiche le site
- [ ] Console navigateur sans erreur critique
- [ ] `/admin` accessible avec les identifiants configurés
- [ ] Vidéos YouTube chargées (clé API valide)

---

## 🆘 Résolution de Problèmes

### `npm install` échoue

```bash
# Vider le cache npm
npm cache clean --force

# Réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreur Firebase `permission-denied`

Vérifiez que votre email est bien dans `VITE_ADMIN_EMAILS` dans `.env` et que les règles Firestore sont déployées :

```bash
npm run deploy:rules
```

### Port 3000 déjà utilisé

```bash
# Lancer sur un autre port
npx live-server --port=3001 --open="/"
```

### Variables d'environnement non reconnues

Vérifiez que le fichier `.env` existe (et non `.env.example`) et que toutes les clés commencent par `VITE_`.

---

## 📞 Support

- **Documentation** : `README.md`, `FIREBASE-SETUP.md`, `SECURITY.md`
- **Issues** : [github.com/fullmeo/Saraj-Jane-Website/issues](https://github.com/fullmeo/Saraj-Jane-Website/issues)
- **Scripts** : `scripts/README.md`
