# 🔒 Guide de Sécurité - Site Sarah Jane Iffra

## Vue d'ensemble

Ce document décrit les mesures de sécurité en place et les bonnes pratiques à suivre pour maintenir le site en sécurité.

---

## 🔑 Gestion des Secrets

### Règle absolue

**Ne jamais committer de secrets dans Git.**

Les fichiers suivants sont dans `.gitignore` et ne doivent JAMAIS être poussés :

```
.env
.env.local
.env.production
firebase-service-account.json
*-service-account.json
```

### Fichier `.env`

```bash
# Copier le modèle
cp .env.example .env

# Éditer avec vos vraies valeurs
# NE JAMAIS partager ce fichier
```

Variables sensibles :

| Variable | Description | Sensibilité |
|----------|-------------|-------------|
| `VITE_FIREBASE_API_KEY` | Clé API Firebase | Haute |
| `VITE_YOUTUBE_API_KEY` | Clé YouTube Data API | Haute |
| `VITE_ADMIN_EMAILS` | Emails autorisés admin | Moyenne |
| `VITE_FIREBASE_APP_ID` | ID application Firebase | Haute |

### Rotation des clés

En cas de fuite suspectée :
1. Aller dans la [console Firebase](https://console.firebase.google.com) → Paramètres du projet
2. Régénérer les clés concernées
3. Mettre à jour `.env` localement
4. Mettre à jour les variables d'environnement sur Netlify/Firebase

---

## 🛡️ En-têtes de Sécurité HTTP

Configurés dans `netlify.toml` pour toutes les pages :

```toml
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
X-XSS-Protection = "1; mode=block"
Referrer-Policy = "strict-origin-when-cross-origin"
Content-Security-Policy = "..."
```

### Content Security Policy (CSP)

La CSP autorise uniquement :

| Source | Autorisations |
|--------|--------------|
| `'self'` | Scripts, styles, images du domaine |
| `youtube.com`, `ytimg.com` | Lecteur et miniatures YouTube |
| `googletagmanager.com`, `google-analytics.com` | Analytics |
| `fonts.googleapis.com`, `fonts.gstatic.com` | Google Fonts |
| `firestore.googleapis.com`, `*.firebaseio.com` | Firebase |

Toute autre source est bloquée par défaut.

---

## 🔐 Authentification Admin

### Accès au tableau de bord

L'interface `/admin` est protégée par Firebase Authentication.

Seules les adresses email listées dans `VITE_ADMIN_EMAILS` peuvent accéder au dashboard.

### Ajouter un administrateur

1. Éditer `.env` :
   ```
   VITE_ADMIN_EMAILS=admin1@example.com,admin2@example.com
   ```
2. Mettre à jour la même variable sur la plateforme d'hébergement
3. Redéployer si nécessaire

### Supprimer un accès

1. Retirer l'email de `VITE_ADMIN_EMAILS`
2. Dans la console Firebase → Authentication → supprimer l'utilisateur
3. Redéployer

---

## 🗄️ Règles Firestore

Fichier : `firestore.rules`

Principes appliqués :
- **Lecture publique** : uniquement pour les collections désignées (contenus du site)
- **Écriture** : réservée aux utilisateurs authentifiés et autorisés
- **Suppression** : réservée aux administrateurs

Pour déployer les règles après modification :

```bash
npm run deploy:rules
```

### Vérification des règles

Utiliser l'émulateur Firebase pour tester sans impacter la production :

```bash
firebase emulators:start --only firestore
```

---

## 📦 Règles Storage

Fichier : `storage.rules`

- Upload autorisé uniquement pour les admins authentifiés
- Taille maximale de fichier définie dans les règles
- Types MIME validés côté règles

---

## 🔄 Dépendances

### Vérification des vulnérabilités

```bash
# Audit de sécurité npm
npm audit

# Corriger automatiquement les vulnérabilités non-breaking
npm audit fix

# Voir le rapport détaillé
npm audit --json
```

### Mise à jour des dépendances

```bash
# Voir les mises à jour disponibles
npm outdated

# Mettre à jour les mises à jour mineures et patches
npm update

# Mise à jour majeure (tester avant de déployer)
npm install firebase@latest
```

Les 3 vulnérabilités critiques identifiées précédemment ont été corrigées :
- Mise à jour Firebase SDK vers `^10.12.0`
- Mise à jour firebase-admin vers `^12.1.0`
- Mise à jour des dépendances de build

---

## 🌐 HTTPS

HTTPS est activé automatiquement sur :
- **Netlify** : certificat Let's Encrypt renouvelé automatiquement
- **Firebase Hosting** : certificat SSL inclus

Toutes les requêtes HTTP sont redirigées vers HTTPS.

---

## 📊 Logs et Monitoring

### Niveau de log

Configurable via `.env` :

```
VITE_LOG_LEVEL=debug    # Développement
VITE_LOG_LEVEL=warn     # Staging
VITE_LOG_LEVEL=error    # Production (recommandé)
VITE_LOG_LEVEL=silent   # Aucun log
```

En production, utiliser `error` ou `silent` pour ne pas exposer d'informations sensibles dans la console.

### Alertes Firebase

Activer les alertes dans la console Firebase :
- Dépassement de quota (Firestore reads/writes)
- Erreurs d'authentification inhabituelles
- Pics de trafic anormaux sur Storage

---

## 🛡️ Bonnes Pratiques de Développement

### Git

```bash
# Vérifier avant chaque commit qu'aucun secret n'est inclus
git diff --staged | grep -i "api_key\|secret\|password\|token"

# Utiliser .gitignore strictement
```

### Variables d'environnement côté client

Les variables `VITE_*` sont embarquées dans le bundle JavaScript et **visibles par le client**. Ne jamais y mettre :
- Clés privées
- Secrets de service
- Mots de passe

Les clés Firebase côté client sont prévues pour être publiques (la sécurité repose sur les règles Firestore/Storage).

### Dépendances tierces

- Préférer des packages maintenus et populaires
- Éviter les dépendances abandonnées
- Lancer `npm audit` avant chaque déploiement en production

---

## 🚨 Signalement de Vulnérabilités

En cas de découverte d'une vulnérabilité de sécurité :

1. **Ne pas créer d'issue publique**
2. Contacter directement via : contact@sarahjaneiffra.com
3. Décrire la vulnérabilité, les étapes de reproduction et l'impact potentiel
4. Laisser 30 jours pour corriger avant divulgation publique

---

## ✅ Checklist Sécurité avant Déploiement

- [ ] `.env` non commité (vérifier `git status`)
- [ ] `npm audit` sans vulnérabilités critiques
- [ ] Règles Firestore et Storage déployées (`npm run deploy:rules`)
- [ ] `VITE_LOG_LEVEL=error` en production
- [ ] En-têtes de sécurité vérifiés (via `securityheaders.com`)
- [ ] HTTPS actif sur le domaine final
- [ ] Admins à jour dans `VITE_ADMIN_EMAILS`
- [ ] Aucune clé API dans le code source (grep)

---

## 📚 Références

- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/fr/docs/Web/HTTP/CSP)
- [Netlify Headers](https://docs.netlify.com/routing/headers/)
