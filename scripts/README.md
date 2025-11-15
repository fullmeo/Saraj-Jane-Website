# 🛠️ Scripts de Configuration

Ce dossier contient des scripts pour faciliter la configuration de votre site Sarah-Jane.

## 📋 Scripts Disponibles

### 1. `setup-firebase.js` - Configuration Firebase Interactive

**Description:** Guide interactif pour configurer Firebase et générer automatiquement les fichiers de configuration.

**Usage:**
```bash
node scripts/setup-firebase.js
```

**Ce qu'il fait:**
- ✅ Demande vos clés Firebase
- ✅ Génère `js/firebase-config.js` automatiquement
- ✅ Crée `.env.local` avec vos variables d'environnement
- ✅ Met à jour `.gitignore` pour protéger vos clés
- ✅ Affiche les étapes suivantes à effectuer

**Prérequis:**
- Node.js installé
- Projet Firebase créé sur https://console.firebase.google.com/

---

### 2. `set-admin.js` - Définir un Administrateur

**Description:** Script pour définir un utilisateur Firebase comme administrateur (custom claim `admin: true`).

**Usage:**
```bash
# Lister tous les utilisateurs
node scripts/set-admin.js --list

# Définir un utilisateur comme admin
node scripts/set-admin.js <USER_UID>
```

**Exemple:**
```bash
node scripts/set-admin.js abc123def456ghi789
```

**Ce qu'il fait:**
- ✅ Se connecte à Firebase Admin SDK
- ✅ Définit le custom claim `admin: true` sur l'utilisateur
- ✅ Vérifie que le claim a été appliqué
- ✅ Affiche les informations de l'utilisateur

**Prérequis:**
1. Fichier `service-account-key.json` (voir ci-dessous)
2. Installer firebase-admin:
   ```bash
   npm install firebase-admin
   ```

**Obtenir le fichier service-account-key.json:**
1. Allez sur Firebase Console
2. Project Settings (⚙️) > Service accounts
3. Cliquez "Generate new private key"
4. Sauvegardez le fichier comme `scripts/service-account-key.json`
5. ⚠️ **IMPORTANT:** Ajoutez-le à `.gitignore` (déjà fait par setup-firebase.js)

---

## 🚀 Guide de Configuration Rapide

### Première Installation

1. **Installer les dépendances:**
   ```bash
   npm install
   npm install firebase-admin
   ```

2. **Configurer Firebase:**
   ```bash
   node scripts/setup-firebase.js
   ```
   Suivez les instructions à l'écran.

3. **Activer les services Firebase:**
   - Allez sur https://console.firebase.google.com/
   - Activez Authentication (Email/Password)
   - Créez une base Firestore
   - Activez Storage (optionnel)

4. **Créer un utilisateur admin:**

   **Option A - Via Firebase Console:**
   ```bash
   # 1. Créer un utilisateur dans Firebase Console > Authentication
   # 2. Copier son UID
   # 3. Exécuter:
   node scripts/set-admin.js <UID>
   ```

   **Option B - Via script complet:**
   ```bash
   # Lister les utilisateurs existants
   node scripts/set-admin.js --list

   # Définir l'un d'eux comme admin
   node scripts/set-admin.js <UID>
   ```

5. **Déployer les règles Firestore:**
   ```bash
   firebase deploy --only firestore:rules
   ```

6. **Tester:**
   - Ouvrir `/admin/index.html`
   - Se connecter avec l'utilisateur admin
   - Vérifier l'accès au dashboard

---

## 🔒 Sécurité

### Fichiers à NE JAMAIS Committer

Le fichier `.gitignore` a été mis à jour pour ignorer:
- ✅ `js/firebase-config.js` - Configuration Firebase
- ✅ `.env*` - Variables d'environnement
- ✅ `scripts/service-account-key.json` - Clé privée Firebase Admin
- ✅ `.firebase/` - Cache Firebase

### Vérifier avant de Committer

```bash
# Vérifier que les fichiers sensibles ne sont pas trackés
git status

# Si un fichier sensible apparaît:
git reset <fichier>
echo "<fichier>" >> .gitignore
```

---

## 🐛 Dépannage

### Erreur: "Firebase SDK non chargé"

**Problème:** Les scripts Firebase ne sont pas inclus dans le HTML.

**Solution:** Vérifiez que `index.html` contient:
```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js"></script>
<script src="js/firebase-config.js"></script>
```

### Erreur: "service-account-key.json introuvable"

**Problème:** Le fichier de clé privée n'est pas au bon endroit.

**Solution:**
1. Téléchargez le fichier depuis Firebase Console
2. Placez-le dans `scripts/service-account-key.json`
3. Vérifiez qu'il est bien ignoré par git: `git check-ignore scripts/service-account-key.json`

### Erreur: "auth/user-not-found"

**Problème:** L'UID fourni n'existe pas.

**Solution:**
1. Listez les utilisateurs: `node scripts/set-admin.js --list`
2. Ou créez un utilisateur dans Firebase Console > Authentication
3. Utilisez le bon UID

### Erreur: "Permission denied" lors du déploiement

**Problème:** Vous n'êtes pas authentifié avec Firebase CLI.

**Solution:**
```bash
firebase login
firebase use <PROJECT_ID>
firebase deploy --only firestore:rules
```

---

## 📚 Ressources

- [Documentation Firebase](https://firebase.google.com/docs)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Guide de Sécurité](../SECURITY.md)

---

## 💡 Conseils

1. **Sauvegardez votre configuration:**
   ```bash
   cp .env.local .env.local.backup
   ```

2. **Testez en local avant de déployer:**
   ```bash
   firebase emulators:start
   ```

3. **Vérifiez les règles Firestore:**
   - Firebase Console > Firestore > Rules
   - Utilisez le simulateur pour tester

4. **Monitorer les logs:**
   ```bash
   firebase functions:log
   ```

---

**Dernière mise à jour:** 2025-11-15
**Version:** 1.0.0
