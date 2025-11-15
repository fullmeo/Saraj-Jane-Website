#!/usr/bin/env node

/**
 * Script pour définir un utilisateur comme administrateur
 *
 * Usage: node scripts/set-admin.js <USER_UID>
 *
 * Prérequis:
 * 1. Avoir un compte de service Firebase (service-account-key.json)
 * 2. Installer firebase-admin: npm install firebase-admin
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Couleurs pour le terminal
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function setAdminClaim(uid) {
    try {
        // Définir le custom claim admin
        await admin.auth().setCustomUserClaims(uid, { admin: true });

        log(`\n✅ Succès!`, 'green');
        log(`L'utilisateur ${uid} est maintenant administrateur.`, 'green');
        log(`\n📝 Important:`, 'yellow');
        log(`L'utilisateur doit se déconnecter et se reconnecter pour que les changements prennent effet.`, 'reset');
        log(`Ou actualiser le token avec: firebase.auth().currentUser.getIdToken(true)`, 'cyan');

        // Vérifier le claim
        const user = await admin.auth().getUser(uid);
        log(`\n🔍 Vérification:`, 'bright');
        log(`Email: ${user.email}`, 'reset');
        log(`Admin: ${user.customClaims?.admin === true ? '✅ Oui' : '❌ Non'}`, 'reset');

    } catch (error) {
        log(`\n❌ Erreur lors de la définition du claim admin:`, 'red');
        log(error.message, 'red');

        if (error.code === 'auth/user-not-found') {
            log(`\n💡 L'utilisateur avec l'UID "${uid}" n'existe pas.`, 'yellow');
            log(`Vérifiez l'UID dans Firebase Console > Authentication > Users`, 'yellow');
        }

        process.exit(1);
    }
}

async function listUsers() {
    try {
        log('\n📋 Liste des utilisateurs:', 'bright');
        const listUsersResult = await admin.auth().listUsers(10);

        listUsersResult.users.forEach((user, index) => {
            const isAdmin = user.customClaims?.admin === true;
            log(`\n${index + 1}. Email: ${user.email}`, 'cyan');
            log(`   UID: ${user.uid}`, 'reset');
            log(`   Admin: ${isAdmin ? '✅ Oui' : '❌ Non'}`, isAdmin ? 'green' : 'reset');
            log(`   Créé: ${new Date(user.metadata.creationTime).toLocaleDateString()}`, 'reset');
        });

    } catch (error) {
        log(`\n❌ Erreur lors de la récupération des utilisateurs:`, 'red');
        log(error.message, 'red');
    }
}

async function main() {
    log('\n🔥 Configuration Admin - Sarah-Jane Website\n', 'bright');

    // Chercher le fichier de compte de service
    const serviceAccountPaths = [
        path.join(__dirname, 'service-account-key.json'),
        path.join(__dirname, '..', 'service-account-key.json'),
        path.join(__dirname, '..', 'config', 'service-account-key.json')
    ];

    let serviceAccountPath = null;
    for (const p of serviceAccountPaths) {
        if (fs.existsSync(p)) {
            serviceAccountPath = p;
            break;
        }
    }

    if (!serviceAccountPath) {
        log('❌ Fichier service-account-key.json introuvable!', 'red');
        log('\n📝 Pour obtenir ce fichier:', 'yellow');
        log('1. Allez sur Firebase Console', 'reset');
        log('2. Project Settings (⚙️) > Service accounts', 'reset');
        log('3. Cliquez "Generate new private key"', 'reset');
        log('4. Sauvegardez le fichier JSON téléchargé comme:', 'reset');
        log('   scripts/service-account-key.json', 'cyan');
        log('\n⚠️  IMPORTANT: Ajoutez ce fichier à .gitignore!', 'red');
        log('   Il contient des clés secrètes à ne JAMAIS committer.', 'red');
        process.exit(1);
    }

    // Initialiser Firebase Admin
    try {
        const serviceAccount = require(serviceAccountPath);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        log('✅ Firebase Admin initialisé', 'green');
    } catch (error) {
        log(`❌ Erreur d'initialisation Firebase Admin:`, 'red');
        log(error.message, 'red');
        process.exit(1);
    }

    // Récupérer l'UID depuis les arguments
    const uid = process.argv[2];

    if (!uid || uid === '--list') {
        await listUsers();

        if (!uid) {
            log('\n📝 Usage:', 'yellow');
            log('node scripts/set-admin.js <USER_UID>', 'cyan');
            log('\nOu pour lister les utilisateurs:', 'reset');
            log('node scripts/set-admin.js --list', 'cyan');
        }

        process.exit(0);
    }

    // Définir l'utilisateur comme admin
    await setAdminClaim(uid);

    process.exit(0);
}

// Exécution
main().catch(error => {
    log(`\n❌ Erreur inattendue:`, 'red');
    log(error.message, 'red');
    console.error(error);
    process.exit(1);
});
