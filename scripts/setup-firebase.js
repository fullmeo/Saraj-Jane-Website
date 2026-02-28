#!/usr/bin/env node

/**
 * Script de Configuration Firebase pour Sarah-Jane Website
 *
 * Ce script vous guide dans la configuration de Firebase
 * et génère automatiquement les fichiers de configuration nécessaires.
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Couleurs pour le terminal
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(message) {
    console.log('\n' + '='.repeat(60));
    log(message, 'cyan');
    console.log('='.repeat(60) + '\n');
}

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(`${colors.yellow}${prompt}${colors.reset} `, resolve);
    });
}

async function main() {
    log('\n🔥 Configuration Firebase - Sarah-Jane Website\n', 'bright');

    header('📋 Étape 1: Informations Firebase');

    log('Allez sur: https://console.firebase.google.com/', 'blue');
    log('1. Créez un nouveau projet ou sélectionnez un projet existant', 'reset');
    log('2. Allez dans Project Settings (⚙️) > General', 'reset');
    log('3. Scrollez vers "Your apps" et cliquez sur "Web" (</>) pour ajouter une app web', 'reset');
    log('4. Copiez les valeurs de configuration ci-dessous\n', 'reset');

    const config = {};

    config.apiKey = await question('🔑 API Key (AIzaSy...):');
    config.authDomain = await question('🌐 Auth Domain (projet.firebaseapp.com):');
    config.projectId = await question('📦 Project ID:');
    config.storageBucket = await question('💾 Storage Bucket (projet.appspot.com):');
    config.messagingSenderId = await question('📨 Messaging Sender ID:');
    config.appId = await question('📱 App ID (1:...:web:...):');

    // Validation basique
    if (!config.apiKey || !config.projectId) {
        log('\n❌ Erreur: API Key et Project ID sont obligatoires!', 'red');
        process.exit(1);
    }

    header('📋 Étape 2: Configuration Optionnelle');

    const enableAnalytics = await question('Activer Google Analytics? (y/n):');
    if (enableAnalytics.toLowerCase() === 'y') {
        config.measurementId = await question('📊 Measurement ID (G-...):');
    }

    header('📋 Étape 3: Génération des Fichiers');

    // Générer firebase-config.js
    const firebaseConfigPath = path.join(__dirname, '..', 'js', 'firebase-config.js');
    const firebaseConfigContent = generateFirebaseConfig(config);

    fs.writeFileSync(firebaseConfigPath, firebaseConfigContent);
    log(`✅ Fichier créé: ${firebaseConfigPath}`, 'green');

    // Générer .env.local
    const envPath = path.join(__dirname, '..', '.env.local');
    const envContent = generateEnvFile(config);

    fs.writeFileSync(envPath, envContent);
    log(`✅ Fichier créé: ${envPath}`, 'green');

    // Mettre à jour .gitignore
    const gitignorePath = path.join(__dirname, '..', '.gitignore');
    updateGitignore(gitignorePath);
    log(`✅ Fichier mis à jour: ${gitignorePath}`, 'green');

    header('📋 Étape 4: Activation des Services Firebase');

    log('\n📝 Actions à effectuer dans Firebase Console:', 'yellow');
    log('', 'reset');
    log('1️⃣  Authentication:', 'bright');
    log('   - Allez dans Authentication > Sign-in method', 'reset');
    log('   - Activez "Email/Password"', 'reset');
    log('   - (Optionnel) Activez "Google"', 'reset');
    log('', 'reset');
    log('2️⃣  Firestore Database:', 'bright');
    log('   - Allez dans Firestore Database', 'reset');
    log('   - Cliquez "Create database"', 'reset');
    log('   - Choisissez votre région (europe-west1 pour Europe)', 'reset');
    log('   - Démarrez en "production mode"', 'reset');
    log('', 'reset');
    log('3️⃣  Storage:', 'bright');
    log('   - Allez dans Storage', 'reset');
    log('   - Cliquez "Get started"', 'reset');
    log('', 'reset');

    header('📋 Étape 5: Déploiement des Règles Firestore');

    log('\n💻 Commandes à exécuter:', 'yellow');
    log('', 'reset');
    log('# Installer Firebase CLI si nécessaire', 'cyan');
    log('npm install -g firebase-tools', 'reset');
    log('', 'reset');
    log('# Se connecter à Firebase', 'cyan');
    log('firebase login', 'reset');
    log('', 'reset');
    log('# Initialiser le projet (si pas déjà fait)', 'cyan');
    log('firebase init', 'reset');
    log('  → Choisir: Firestore, Hosting', 'reset');
    log(`  → Project: ${config.projectId}`, 'reset');
    log('  → Firestore rules file: firestore.rules', 'reset');
    log('  → Public directory: . (ou dist)', 'reset');
    log('', 'reset');
    log('# Déployer les règles Firestore', 'cyan');
    log('firebase deploy --only firestore:rules', 'reset');
    log('', 'reset');

    header('📋 Étape 6: Créer un Utilisateur Admin');

    log('\n⚠️  IMPORTANT: Sans utilisateur admin, personne ne pourra accéder au dashboard!', 'red');
    log('', 'reset');
    log('Option 1 - Via Firebase Console (Recommandé):', 'bright');
    log('1. Allez dans Authentication > Users', 'reset');
    log('2. Cliquez "Add user"', 'reset');
    log('3. Entrez email et mot de passe', 'reset');
    log('4. Copiez le UID de l\'utilisateur créé', 'reset');
    log('5. Exécutez le script: node scripts/set-admin.js <UID>', 'reset');
    log('', 'reset');
    log('Option 2 - Script automatique:', 'bright');
    log('Le script scripts/set-admin.js a été créé pour vous.', 'reset');
    log('Consultez SECURITY.md pour plus de détails.', 'reset');
    log('', 'reset');

    header('✅ Configuration Terminée!');

    log('\n📝 Résumé:', 'bright');
    log(`  Project ID: ${config.projectId}`, 'green');
    log(`  Auth Domain: ${config.authDomain}`, 'green');
    log(`  Config file: js/firebase-config.js`, 'green');
    log(`  Env file: .env.local`, 'green');
    log('', 'reset');
    log('📚 Documentation:', 'bright');
    log('  - SECURITY.md: Guide de sécurité complet', 'cyan');
    log('  - FIREBASE-SETUP.md: Guide de configuration Firebase', 'cyan');
    log('', 'reset');
    log('🚀 Prochaines étapes:', 'yellow');
    log('  1. Activer Authentication dans Firebase Console', 'reset');
    log('  2. Créer la base Firestore', 'reset');
    log('  3. Déployer les règles: firebase deploy --only firestore:rules', 'reset');
    log('  4. Créer un utilisateur admin', 'reset');
    log('  5. Tester le site!', 'reset');
    log('', 'reset');

    rl.close();
}

function generateFirebaseConfig(config) {
    return `// Configuration Firebase pour Sarah-Jane Iffra Website
// Généré automatiquement le ${new Date().toISOString()}
// ⚠️ NE PAS COMMITTER CE FICHIER AVEC LES VRAIES CLÉS!

const firebaseConfig = {
    apiKey: "${config.apiKey}",
    authDomain: "${config.authDomain}",
    projectId: "${config.projectId}",
    storageBucket: "${config.storageBucket}",
    messagingSenderId: "${config.messagingSenderId}",
    appId: "${config.appId}"${config.measurementId ? `,\n    measurementId: "${config.measurementId}"` : ''}
};

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
    console.log('📦 Project ID:', firebaseConfig.projectId);
} else {
    console.error('❌ Firebase SDK non chargé');
    console.error('Assurez-vous d\\'avoir inclus les scripts Firebase dans votre HTML');
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
`;
}

function generateEnvFile(config) {
    return `# Firebase Configuration
# Généré automatiquement le ${new Date().toISOString()}
# ⚠️ NE PAS COMMITTER CE FICHIER!

FIREBASE_API_KEY=${config.apiKey}
FIREBASE_AUTH_DOMAIN=${config.authDomain}
FIREBASE_PROJECT_ID=${config.projectId}
FIREBASE_STORAGE_BUCKET=${config.storageBucket}
FIREBASE_MESSAGING_SENDER_ID=${config.messagingSenderId}
FIREBASE_APP_ID=${config.appId}
${config.measurementId ? `FIREBASE_MEASUREMENT_ID=${config.measurementId}` : ''}

# Autres variables d'environnement
NODE_ENV=production
`;
}

function updateGitignore(gitignorePath) {
    const gitignoreEntries = [
        '',
        '# Firebase Configuration',
        '.env',
        '.env.local',
        '.env.production',
        'js/firebase-config.js',
        '',
        '# Firebase',
        '.firebase/',
        'firebase-debug.log',
        'firestore-debug.log',
        ''
    ];

    let content = '';
    if (fs.existsSync(gitignorePath)) {
        content = fs.readFileSync(gitignorePath, 'utf8');
    }

    // Ajouter seulement si pas déjà présent
    if (!content.includes('# Firebase Configuration')) {
        fs.appendFileSync(gitignorePath, gitignoreEntries.join('\n'));
    }
}

// Gestion des erreurs
process.on('SIGINT', () => {
    log('\n\n❌ Configuration annulée', 'red');
    rl.close();
    process.exit(0);
});

// Exécution
main().catch(error => {
    log(`\n❌ Erreur: ${error.message}`, 'red');
    process.exit(1);
});
