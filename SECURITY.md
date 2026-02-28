# 🔐 Guide de Sécurité - Site Sarah-Jane Iffra

## Vue d'ensemble

Ce document décrit les mesures de sécurité mises en place sur le site et comment les configurer correctement.

---

## ✅ Améliorations de Sécurité Implémentées

### 1. **Authentification Admin Sécurisée**

#### ❌ Problèmes Corrigés
- **Credentials hardcodés** (`admin`/`admin123`) - **SUPPRIMÉS**
- **Email hardcodé avec typo** (`ifrasoleil.@gmail.com`) - **CORRIGÉ**
- **localStorage pour l'auth** - **RETIRÉ** (facilement manipulable côté client)
- **Mélange de deux systèmes d'auth** - **NETTOYÉ**

#### ✅ Solution Implémentée
Le site utilise maintenant **uniquement Firebase Authentication** avec vérification de custom claims `admin`.

**Fichier modifié:** `js/admin-auth.js`

```javascript
// Vérifie si l'utilisateur a le claim admin
const tokenResult = await result.user.getIdTokenResult();
if (!tokenResult.claims.admin) {
    await auth.signOut();
    showMessage(messageEl, "Accès non autorisé...", 'error');
    return;
}
```

---

### 2. **Règles Firestore Renforcées**

#### ✅ Nouvelles Fonctionnalités de Sécurité

**Fichier modifié:** `firestore.rules`

##### Fonctions Helper
- `isAdmin()` - Vérifie l'authentification admin
- `isValidString()` - Valide longueur et type des chaînes
- `isValidURL()` - Valide format des URLs
- `isValidTimestamp()` - Empêche les timestamps futurs

##### Collections Sécurisées

**Collection `gallery`:**
- ✅ Lecture publique (site vitrine)
- ✅ Création/Modification/Suppression: Admin uniquement
- ✅ Validation des champs: `url`, `title`, `category`, `createdAt`
- ✅ Protection contre modification du `createdAt`
- ✅ Limites de longueur (title: 200 chars, description: 1000 chars)

**Collection `videos`:**
- ✅ Lecture publique
- ✅ Écriture: Admin uniquement
- ✅ Validation de la plateforme: `youtube`, `vimeo`, `dailymotion`
- ✅ Validation URL et metadata

**Collection `contacts`:** (pour futur formulaire)
- ✅ Lecture: Admin uniquement
- ✅ Création: Publique avec validation stricte
- ✅ Validation email (contient @)
- ✅ Limites: nom (2-100), message (10-5000 chars)
- ✅ Protection contre champs non autorisés

**Collection `settings`:**
- ✅ Lecture publique (paramètres publics seulement)
- ✅ Écriture: Admin uniquement

**Règle par défaut:**
```javascript
// Bloquer tout accès non explicitement défini
match /{document=**} {
  allow read, write: if false;
}
```

---

### 3. **Module de Validation Côté Client**

**Fichier créé:** `js/form-validation.js`

#### Fonctionnalités
- ✅ **Sanitization XSS** - Nettoie les entrées utilisateur
- ✅ **Validation email** - Pattern regex + longueur
- ✅ **Validation nom** - Caractères autorisés, longueur
- ✅ **Validation message** - Longueur min/max
- ✅ **Détection SQL Injection** - Patterns malveillants bloqués
- ✅ **Anti-spam** - Rate limiting (3 soumissions/heure)
- ✅ **Affichage des erreurs** - UX améliorée

#### Patterns de Détection
```javascript
xssPattern: /<script|javascript:|onerror=|onclick=|<iframe/i
sqlInjection: /(\bor\b|\band\b).*[=<>]|union.*select|insert.*into/i
```

**Fichier modifié:** `js/main.js` - Intégration de la validation

---

## 🚀 Configuration Required pour Production

### Étape 1: Configurer Firebase

1. **Créer le projet Firebase**
   ```bash
   # Aller sur https://console.firebase.google.com/
   # Créer un nouveau projet: "sarah-jane-iffra-website"
   ```

2. **Activer Authentication**
   - Aller dans Authentication > Sign-in methods
   - Activer "Email/Password"
   - Activer "Google" (optionnel)

3. **Copier la configuration**
   - Aller dans Project Settings > General
   - Copier la configuration Firebase
   - Mettre à jour `js/firebase-config.js`

4. **Déployer les règles Firestore**
   ```bash
   firebase deploy --only firestore:rules
   ```

---

### Étape 2: Configurer un Utilisateur Admin

**IMPORTANT:** Les custom claims ne peuvent être définis que côté serveur.

#### Option A: Via Cloud Function (Recommandé)

Créer un fichier `functions/index.js`:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Fonction pour définir un utilisateur comme admin
exports.setAdminClaim = functions.https.onCall(async (data, context) => {
  // Sécurité: Vérifier que l'appelant est déjà admin
  // (ou utiliser une clé secrète pour le premier admin)

  const { uid } = data;

  // Définir le custom claim admin
  await admin.auth().setCustomUserClaims(uid, { admin: true });

  return { message: `Utilisateur ${uid} est maintenant admin` };
});
```

Déployer:
```bash
firebase deploy --only functions
```

Appeler depuis la console:
```javascript
firebase.functions().httpsCallable('setAdminClaim')({ uid: 'USER_UID' })
  .then(result => console.log(result.data));
```

#### Option B: Via Firebase Admin SDK (Script one-time)

Créer un fichier `scripts/set-admin.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = 'YOUR_USER_UID_HERE'; // UID de l'utilisateur à promouvoir

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ Utilisateur ${uid} est maintenant admin`);
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Erreur:', error);
    process.exit(1);
  });
```

Exécuter:
```bash
node scripts/set-admin.js
```

#### Option C: Via Firebase CLI (Plus simple)

```bash
# Installer Firebase CLI si nécessaire
npm install -g firebase-tools

# Se connecter
firebase login

# Définir le custom claim
firebase auth:export users.json
# Éditer users.json pour ajouter customClaims
firebase auth:import users.json --hash-algo=SCRYPT
```

---

### Étape 3: Vérifier la Configuration

1. **Tester l'authentification**
   - Aller sur `/admin/index.html`
   - Se connecter avec l'utilisateur admin
   - Vérifier l'accès au dashboard

2. **Tester les règles Firestore**
   - Dans la console Firebase > Firestore > Rules
   - Utiliser le simulateur pour tester les règles

3. **Vérifier les logs**
   - Console du navigateur (F12)
   - Firebase Console > Functions > Logs (si Cloud Functions)

---

## 🛡️ Bonnes Pratiques de Sécurité

### Variables d'Environnement

**NE JAMAIS** commiter les vraies clés Firebase. Utiliser `.env`:

```bash
# .env (à ajouter au .gitignore)
FIREBASE_API_KEY=your_actual_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# etc...
```

### Headers de Sécurité

**Fichier:** `config/security-headers.js` (déjà configuré)

```javascript
{
  "Content-Security-Policy": "default-src 'self' https:; ...",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
```

Déployé automatiquement sur Netlify via `netlify.toml`.

### Rate Limiting

#### Client-side (déjà implémenté)
- 3 soumissions de formulaire par heure
- Stockage dans `localStorage`

#### Server-side (à implémenter)
Pour une protection renforcée, ajouter Firebase App Check:

```bash
firebase init appcheck
```

---

## 🔍 Audit de Sécurité

### Checklist de Déploiement

- [ ] Clés Firebase configurées (pas de placeholders)
- [ ] Au moins un utilisateur admin configuré
- [ ] Règles Firestore déployées
- [ ] Headers de sécurité actifs (vérifier Netlify)
- [ ] HTTPS activé (automatique sur Netlify)
- [ ] Service Worker cache les bonnes ressources
- [ ] Pas de credentials en clair dans le code
- [ ] `.env` ajouté au `.gitignore`
- [ ] Logs de debug retirés du code production

### Tests de Pénétration Recommandés

1. **XSS (Cross-Site Scripting)**
   ```javascript
   // Tester dans le formulaire de contact
   <script>alert('XSS')</script>
   javascript:alert('XSS')
   ```
   ✅ Devrait être bloqué par la validation

2. **SQL Injection**
   ```sql
   ' OR 1=1 --
   UNION SELECT * FROM users
   ```
   ✅ Devrait être détecté et rejeté

3. **Accès Non Autorisé**
   - Tenter d'accéder au dashboard sans authentification
   - Tenter de modifier Firestore sans être admin
   ✅ Devrait être bloqué par les règles

---

## 📋 Maintenance de Sécurité

### Mensuelle
- [ ] Vérifier les logs Firebase pour activité suspecte
- [ ] Revoir les utilisateurs admin (retirer ceux qui ne le sont plus)
- [ ] Vérifier les mises à jour de dépendances (`npm audit`)

### Trimestrielle
- [ ] Audit complet des règles Firestore
- [ ] Test de pénétration manuel
- [ ] Revoir les headers de sécurité (nouvelles best practices)

### Annuelle
- [ ] Rotation des clés API (si possible)
- [ ] Audit de sécurité professionnel (recommandé)

---

## 🆘 En Cas de Problème

### Utilisateur bloqué de l'admin
```bash
# Vérifier les custom claims
firebase auth:export users.json
# Rechercher l'utilisateur et vérifier customClaims
```

### Règles Firestore qui bloquent tout
1. Aller dans Firebase Console
2. Firestore > Rules
3. Utiliser le simulateur pour debugger
4. Vérifier les logs Firestore

### Module de validation ne fonctionne pas
1. Vérifier que `form-validation.js` est chargé **avant** `main.js`
2. Ouvrir la console: `window.FormValidator` devrait être défini
3. Vérifier les erreurs dans la console

---

## 📚 Ressources

- [Firebase Security Rules Guide](https://firebase.google.com/docs/firestore/security/rules-structure)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

---

## 📝 Changelog de Sécurité

### 2025-11-15 - Renforcement Initial
- ✅ Retrait des credentials hardcodés
- ✅ Migration vers Firebase Auth uniquement
- ✅ Règles Firestore avec validation
- ✅ Module de validation XSS/SQL Injection
- ✅ Anti-spam rate limiting
- ✅ Documentation complète

---

**Dernière mise à jour:** 2025-11-15
**Version:** 1.0.0
**Auteur:** Claude AI Agent
