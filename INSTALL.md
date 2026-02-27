# 🚀 Installation Automatique

**Configuration complète de Firebase en UNE SEULE COMMANDE !**

---

## 🎯 Installation Ultra-Rapide

### Windows

Double-cliquez sur `install.bat` ou dans un terminal :

```bash
install.bat
```

### Linux / Mac / Git Bash

```bash
chmod +x install.sh
./install.sh
```

### Ou directement avec Node.js (toutes plateformes)

```bash
node scripts/auto-setup.js
```

---

## ✨ Ce que fait le script automatique

Le script `auto-setup.js` effectue **TOUTES** ces étapes automatiquement :

### 1️⃣ Vérification de l'Environnement
- ✅ Vérifie Node.js et npm
- ✅ Vérifie les dépendances installées
- ✅ Vérifie la configuration Firebase existante
- ✅ Vérifie Firebase CLI
- ✅ Affiche un rapport d'état complet

### 2️⃣ Installation des Dépendances
- ✅ `npm install` automatique
- ✅ `npm install firebase-admin` automatique
- ✅ `npm install -g firebase-tools` (optionnel)

### 3️⃣ Configuration Firebase
- ✅ Lance le script interactif `setup-firebase.js`
- ✅ Génère automatiquement `js/firebase-config.js`
- ✅ Crée `.env.local` avec vos variables
- ✅ Met à jour `.gitignore`

### 4️⃣ Configuration Firebase CLI
- ✅ `firebase login` automatique
- ✅ `firebase init` guidé
- ✅ `firebase deploy --only firestore:rules`

### 5️⃣ Création d'un Admin
- ✅ Liste les utilisateurs Firebase existants
- ✅ Définit un utilisateur comme admin via `set-admin.js`

### 6️⃣ Résumé Final
- ✅ Affiche les actions manuelles restantes
- ✅ Donne les prochaines étapes
- ✅ Liens vers la documentation

---

## 🎬 Démo d'Utilisation

```bash
C:\Users\diase\Downloads\Sarah-Jane-website> install.bat

╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║        🚀 INSTALLATION AUTOMATIQUE - SARAH-JANE WEBSITE 🚀        ║
║                                                                   ║
║           Configuration Firebase complète en une commande         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝

🔍 Vérification de l'environnement...

✅ Node.js installé: v18.17.0
✅ npm installé: v9.6.7

📦 Installation des dépendances npm...
✅ Dépendances npm installées

📦 Installation de firebase-admin...
✅ firebase-admin installé

═══════════════════════════════════════════════════════════════════
  🔍 Vérification de l'Environnement
═══════════════════════════════════════════════════════════════════

✅ Node.js installé: v18.17.0
✅ npm installé: v9.6.7
✅ Dépendances npm installées
⚠️  firebase-config.js n'existe pas
✅ Firebase CLI installé: 13.0.1
⚠️  Non connecté à Firebase CLI

═══════════════════════════════════════════════════════════════════
  📊 État de la Configuration
═══════════════════════════════════════════════════════════════════

✅ Node.js & npm               OK
✅ Dépendances npm             OK
❌ Configuration Firebase      À FAIRE
✅ Firebase CLI                OK
❌ Connexion Firebase          À FAIRE
❌ Règles Firestore déployées  À FAIRE
⚠️  Clé Admin Firebase         À FAIRE

▶️  Installation de firebase-admin...
✅ firebase-admin installé

📝 Configurer Firebase maintenant? (y/n): y

▶️  Configuration de Firebase...

🔥 Configuration Firebase - Sarah-Jane Website

═══════════════════════════════════════════════════════════════════
  📋 Étape 1: Informations Firebase
═══════════════════════════════════════════════════════════════════

Allez sur: https://console.firebase.google.com/
1. Créez un nouveau projet ou sélectionnez un projet existant
2. Allez dans Project Settings (⚙️) > General
3. Scrollez vers "Your apps" et cliquez sur "Web" (</>) pour ajouter une app web
4. Copiez les valeurs de configuration ci-dessous

🔑 API Key (AIzaSy...): AIzaSyB_VOTRE_CLE_ICI
🌐 Auth Domain (projet.firebaseapp.com): sarah-jane-website.firebaseapp.com
📦 Project ID: sarah-jane-website
💾 Storage Bucket (projet.appspot.com): sarah-jane-website.appspot.com
📨 Messaging Sender ID: 123456789012
📱 App ID (1:...:web:...): 1:123456789012:web:abc123def456

═══════════════════════════════════════════════════════════════════
  📋 Étape 3: Génération des Fichiers
═══════════════════════════════════════════════════════════════════

✅ Fichier créé: C:\Users\diase\Downloads\Sarah-Jane-website\js\firebase-config.js
✅ Fichier créé: C:\Users\diase\Downloads\Sarah-Jane-website\.env.local
✅ Fichier mis à jour: C:\Users\diase\Downloads\Sarah-Jane-website\.gitignore

🔐 Se connecter à Firebase CLI? (y/n): y

▶️  Connexion à Firebase...
✅ Connecté à Firebase

▶️  Initialisation du projet Firebase...
✅ Projet Firebase initialisé

🚀 Déployer les règles Firestore maintenant? (y/n): y

▶️  Déploiement des règles Firestore...
✅ Règles Firestore déployées

👤 Créer un utilisateur administrateur? (y/n): y

▶️  Création d'un utilisateur administrateur...

📋 Liste des utilisateurs:

1. Email: contact@example.com
   UID: abc123def456ghi789
   Admin: ❌ Non
   Créé: 15/11/2025

Entrez l'UID de l'utilisateur à promouvoir admin: abc123def456ghi789

✅ Succès!
L'utilisateur abc123def456ghi789 est maintenant administrateur.

═══════════════════════════════════════════════════════════════════
  🎉 Installation Terminée!
═══════════════════════════════════════════════════════════════════

Votre site Sarah-Jane est maintenant configuré et sécurisé.

🚀 Prochaines étapes:
   • Tester le site en local: npx live-server
   • Se connecter au dashboard: /admin/index.html
   • Déployer sur Netlify: firebase deploy --only hosting

📚 Documentation:
   • SECURITY.md - Guide de sécurité complet
   • scripts/README.md - Documentation des scripts
   • FIREBASE-SETUP.md - Guide Firebase détaillé
```

---

## 📋 Scripts Disponibles

| Script | Description | Usage |
|--------|-------------|-------|
| `install.bat` | Installation Windows | Double-clic ou `install.bat` |
| `install.sh` | Installation Linux/Mac | `./install.sh` |
| `scripts/auto-setup.js` | Setup automatique Node.js | `node scripts/auto-setup.js` |
| `scripts/setup-firebase.js` | Configuration Firebase seule | `node scripts/setup-firebase.js` |
| `scripts/set-admin.js` | Créer un admin | `node scripts/set-admin.js <UID>` |

---

## 🔧 Personnalisation

### Mode Silencieux (Non-Interactif)

Pour une installation complètement automatisée (CI/CD), créez un fichier `.env` :

```bash
# .env
FIREBASE_API_KEY=AIzaSyB...
FIREBASE_AUTH_DOMAIN=projet.firebaseapp.com
FIREBASE_PROJECT_ID=sarah-jane-website
# etc...
```

Puis :
```bash
node scripts/auto-setup.js --silent
```

### Sauter Certaines Étapes

```bash
# Sauter l'installation Firebase CLI
node scripts/auto-setup.js --skip-firebase-cli

# Sauter la création d'admin
node scripts/auto-setup.js --skip-admin

# Configuration uniquement (sans déploiement)
node scripts/auto-setup.js --config-only
```

---

## ❓ Résolution de Problèmes

### Erreur: "Node.js n'est pas installé"

**Solution:** Téléchargez et installez Node.js depuis https://nodejs.org/

### Erreur: "Permission denied"

**Windows:**
```bash
# Exécuter en tant qu'administrateur
```

**Linux/Mac:**
```bash
chmod +x install.sh
sudo ./install.sh
```

### Erreur: "Firebase CLI non trouvé"

**Solution:**
```bash
npm install -g firebase-tools
```

### Le script s'arrête pendant la configuration

**Solution:** Relancez simplement le script. Il détectera ce qui est déjà fait et continuera.

---

## 🆘 Support

Si le script automatique échoue :

1. **Consultez les messages d'erreur** (en rouge ❌)
2. **Lisez `scripts/README.md`** pour la configuration manuelle
3. **Vérifiez `SECURITY.md`** pour les détails de sécurité
4. **Relancez le script** (il est idempotent)

---

## 🎓 Comparaison des Méthodes

| Méthode | Temps | Difficulté | Recommandé pour |
|---------|-------|------------|-----------------|
| `install.bat` / `install.sh` | ~2 min | ⭐ Facile | Débutants |
| `auto-setup.js` | ~2 min | ⭐ Facile | Tous |
| `setup-firebase.js` | ~3 min | ⭐⭐ Moyen | Configuration seule |
| Manuel (via docs) | ~15 min | ⭐⭐⭐ Avancé | Personnalisation |

---

## ✅ Checklist Post-Installation

Après avoir exécuté le script, vérifiez :

- [ ] `js/firebase-config.js` existe et contient vos clés
- [ ] `.env.local` existe
- [ ] Firebase CLI est installé (`firebase --version`)
- [ ] Connecté à Firebase (`firebase projects:list`)
- [ ] Règles Firestore déployées (visible dans Firebase Console)
- [ ] Au moins un utilisateur admin existe
- [ ] Le site fonctionne en local (`npx live-server`)
- [ ] Login admin fonctionne (`/admin/index.html`)

---

**Prêt ? Lancez l'installation !** 🚀

```bash
# Windows
install.bat

# Linux/Mac
./install.sh

# Ou directement
node scripts/auto-setup.js
```

---

**Dernière mise à jour:** 2025-11-15
**Version:** 2.0.0 (Automatisation complète)
