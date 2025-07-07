# 🔥 Configuration Firebase pour Sarah-Jane Iffra Website

## 📋 Prérequis
- Compte Google
- Accès à [Firebase Console](https://console.firebase.google.com/)

## 🚀 Étapes de Configuration

### 1. Créer un Projet Firebase

1. **Allez sur** [Firebase Console](https://console.firebase.google.com/)
2. **Cliquez** sur "Créer un projet"
3. **Nommez** le projet : `sarah-jane-iffra-website`
4. **Désactivez** Google Analytics (optionnel)
5. **Cliquez** sur "Créer le projet"

### 2. Activer Firestore Database

1. **Dans le menu** → "Firestore Database"
2. **Cliquez** sur "Créer une base de données"
3. **Choisissez** "Mode test" (pour commencer)
4. **Sélectionnez** une région (Europe de l'Ouest recommandée)
5. **Cliquez** sur "Terminé"

### 3. Obtenir la Configuration

1. **Cliquez** sur l'icône ⚙️ (Paramètres) → "Paramètres du projet"
2. **Onglet** "Général" → Section "Vos applications"
3. **Cliquez** sur l'icône Web (</>)
4. **Nommez** l'application : `sarah-jane-iffra-admin`
5. **Copiez** la configuration qui ressemble à :

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "sarah-jane-iffra-website.firebaseapp.com",
    projectId: "sarah-jane-iffra-website",
    storageBucket: "sarah-jane-iffra-website.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};
```

### 4. Mettre à Jour le Fichier de Configuration

1. **Ouvrez** `js/firebase-config.js`
2. **Remplacez** les valeurs `YOUR_*` par vos vraies valeurs
3. **Sauvegardez** le fichier

### 5. Tester la Configuration

1. **Rechargez** la page admin : `http://localhost:8000/admin/`
2. **Ouvrez** la console (F12)
3. **Vérifiez** que vous voyez : `✅ Firebase configuré avec succès`

## 🔧 Règles Firestore (Optionnel)

Pour plus de sécurité, configurez les règles Firestore :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /settings/{document} {
      allow read, write: if true; // Mode test - à restreindre en production
    }
  }
}
```

## 🎯 Fonctionnalités Disponibles

Une fois configuré, vous pourrez :

- ✅ **Modifier** les statistiques YouTube
- ✅ **Sauvegarder** dans Firestore
- ✅ **Voir** les changements en temps réel
- ✅ **Synchroniser** avec le site public

## 🆘 Dépannage

### Erreur "Firebase non configuré"
- Vérifiez que vous avez remplacé toutes les valeurs `YOUR_*`
- Vérifiez la console pour les erreurs

### Erreur "Permission denied"
- Vérifiez que Firestore est en mode test
- Vérifiez les règles Firestore

### Erreur "Network error"
- Vérifiez votre connexion internet
- Vérifiez que le projet Firebase est actif

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur (F12)
2. Consultez la [documentation Firebase](https://firebase.google.com/docs)
3. Vérifiez que tous les fichiers sont bien chargés

---

**🎵 Une fois configuré, votre interface admin sera pleinement fonctionnelle !** 