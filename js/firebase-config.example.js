/**
 * Configuration Firebase - Exemple
 * 
 * 1. Copiez ce fichier et renommez-le en `firebase-config.js`
 * 2. Remplacez les valeurs par défaut par vos propres identifiants Firebase
 * 3. Ne versionnez jamais ce fichier avec vos vraies clés API
 */

// Configuration Firebase
const firebaseConfig = {
    apiKey: "VOTRE_CLE_API",
    authDomain: "VOTRE_PROJET.firebaseapp.com",
    projectId: "VOTRE_PROJET_ID",
    storageBucket: "VOTRE_PROJET.appspot.com",
    messagingSenderId: "VOTRE_SENDER_ID",
    appId: "VOTRE_APP_ID",
    measurementId: "G-VOTRE_MESURE_ID"
};

// Ne modifiez pas cette ligne
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { firebaseConfig };
}
