// Configuration Firebase pour Sarah-Jane Iffra Website
// 
// INSTRUCTIONS DE CONFIGURATION :
// 1. Allez sur https://console.firebase.google.com/
// 2. Créez un nouveau projet : "sarah-jane-iffra-website"
// 3. Activez Firestore Database (mode test)
// 4. Dans Paramètres du projet > Général > Vos applications
// 5. Ajoutez une application Web et copiez la configuration ci-dessous

const firebaseConfig = {
    // ⚠️ REMPLACEZ CES VALEURS PAR CELLES DE VOTRE PROJET FIREBASE
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Exemple de configuration (à remplacer) :
// const firebaseConfig = {
//     apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//     authDomain: "sarah-jane-iffra-website.firebaseapp.com",
//     projectId: "sarah-jane-iffra-website",
//     storageBucket: "sarah-jane-iffra-website.appspot.com",
//     messagingSenderId: "123456789012",
//     appId: "1:123456789012:web:abcdef1234567890"
// };

// Initialisation de Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    
    // Initialisation des services
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();
    
    // Rendre les services disponibles globalement
    window.firebase = firebase;
    window.auth = auth;
    window.db = db;
    window.storage = storage;
    
    console.log('✅ Firebase configuré avec succès');
} else {
    console.warn('⚠️ Firebase SDK non chargé');
}

// Fonction pour vérifier la configuration
function checkFirebaseConfig() {
    if (window.db) {
        console.log('✅ Firestore disponible');
        return true;
    } else {
        console.warn('⚠️ Firestore non disponible - Vérifiez la configuration');
        return false;
    }
}

// Vérification au chargement
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkFirebaseConfig, 1000);
});
