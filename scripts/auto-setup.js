#!/usr/bin/env node

/**
 * 🚀 Installation Automatique Complète - Sarah-Jane Website
 *
 * Ce script automatise TOUTE la configuration Firebase en une commande
 * Il détecte ce qui est déjà fait et propose de compléter automatiquement
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Couleurs
const c = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

const log = (msg, color = 'reset') => console.log(`${c[color]}${msg}${c.reset}`);
const question = (prompt) => new Promise(resolve => rl.question(`${c.yellow}${prompt}${c.reset} `, resolve));

// État de la configuration
const state = {
    nodeInstalled: false,
    npmPackagesInstalled: false,
    firebaseConfigured: false,
    firebaseCLIInstalled: false,
    firebaseLoggedIn: false,
    firestoreCreated: false,
    rulesDeployed: false,
    authEnabled: false,
    adminUserExists: false,
    serviceAccountKey: false
};

function header(title) {
    console.log('\n' + '═'.repeat(70));
    log(`  ${title}`, 'cyan');
    console.log('═'.repeat(70) + '\n');
}

function success(msg) {
    log(`✅ ${msg}`, 'green');
}

function error(msg) {
    log(`❌ ${msg}`, 'red');
}

function warning(msg) {
    log(`⚠️  ${msg}`, 'yellow');
}

function info(msg) {
    log(`ℹ️  ${msg}`, 'blue');
}

function step(msg) {
    log(`\n▶️  ${msg}`, 'bright');
}

async function checkEnvironment() {
    header('🔍 Vérification de l\'Environnement');

    // Vérifier Node.js
    try {
        const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
        success(`Node.js installé: ${nodeVersion}`);
        state.nodeInstalled = true;
    } catch (e) {
        error('Node.js n\'est pas installé');
        info('Téléchargez-le depuis: https://nodejs.org/');
        process.exit(1);
    }

    // Vérifier npm
    try {
        const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
        success(`npm installé: v${npmVersion}`);
    } catch (e) {
        error('npm n\'est pas installé');
        process.exit(1);
    }

    // Vérifier les packages npm
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
        if (fs.existsSync(nodeModulesPath)) {
            success('Dépendances npm installées');
            state.npmPackagesInstalled = true;
        } else {
            warning('Dépendances npm non installées');
        }
    }

    // Vérifier firebase-config.js
    const firebaseConfigPath = path.join(__dirname, '..', 'js', 'firebase-config.js');
    if (fs.existsSync(firebaseConfigPath)) {
        const content = fs.readFileSync(firebaseConfigPath, 'utf8');
        if (!content.includes('YOUR_API_KEY') && !content.includes('YOUR_PROJECT_ID')) {
            success('Firebase configuré (js/firebase-config.js existe)');
            state.firebaseConfigured = true;
        } else {
            warning('firebase-config.js existe mais contient des placeholders');
        }
    } else {
        warning('firebase-config.js n\'existe pas');
    }

    // Vérifier Firebase CLI
    try {
        const firebaseVersion = execSync('firebase --version', { encoding: 'utf8' }).trim();
        success(`Firebase CLI installé: ${firebaseVersion}`);
        state.firebaseCLIInstalled = true;
    } catch (e) {
        warning('Firebase CLI non installé');
    }

    // Vérifier la connexion Firebase
    if (state.firebaseCLIInstalled) {
        try {
            execSync('firebase projects:list', { encoding: 'utf8', stdio: 'pipe' });
            success('Connecté à Firebase');
            state.firebaseLoggedIn = true;
        } catch (e) {
            warning('Non connecté à Firebase CLI');
        }
    }

    // Vérifier service-account-key.json
    const serviceAccountPaths = [
        path.join(__dirname, 'service-account-key.json'),
        path.join(__dirname, '..', 'service-account-key.json')
    ];
    for (const p of serviceAccountPaths) {
        if (fs.existsSync(p)) {
            success('Clé de service Firebase Admin trouvée');
            state.serviceAccountKey = true;
            break;
        }
    }

    console.log('');
}

async function displayStatus() {
    header('📊 État de la Configuration');

    const items = [
        { label: 'Node.js & npm', done: state.nodeInstalled, required: true },
        { label: 'Dépendances npm', done: state.npmPackagesInstalled, required: true },
        { label: 'Configuration Firebase', done: state.firebaseConfigured, required: true },
        { label: 'Firebase CLI', done: state.firebaseCLIInstalled, required: true },
        { label: 'Connexion Firebase', done: state.firebaseLoggedIn, required: true },
        { label: 'Règles Firestore déployées', done: state.rulesDeployed, required: true },
        { label: 'Clé Admin Firebase', done: state.serviceAccountKey, required: false }
    ];

    items.forEach(item => {
        const icon = item.done ? '✅' : (item.required ? '❌' : '⚠️');
        const status = item.done ? 'OK' : 'À FAIRE';
        log(`${icon} ${item.label.padEnd(30)} ${status}`, item.done ? 'green' : 'yellow');
    });

    console.log('');
}

async function installNpmPackages() {
    step('Installation des dépendances npm...');

    try {
        info('Exécution: npm install');
        execSync('npm install', {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..')
        });
        success('Dépendances npm installées');
        state.npmPackagesInstalled = true;
    } catch (e) {
        error('Échec de l\'installation des dépendances');
        throw e;
    }
}

async function installFirebaseAdmin() {
    step('Installation de firebase-admin...');

    try {
        info('Exécution: npm install firebase-admin');
        execSync('npm install firebase-admin', {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..')
        });
        success('firebase-admin installé');
    } catch (e) {
        error('Échec de l\'installation de firebase-admin');
        throw e;
    }
}

async function installFirebaseCLI() {
    step('Installation de Firebase CLI...');

    const answer = await question('Installer Firebase CLI globalement? (y/n): ');
    if (answer.toLowerCase() !== 'y') {
        warning('Firebase CLI non installé - vous devrez le faire manuellement');
        return;
    }

    try {
        info('Exécution: npm install -g firebase-tools');
        execSync('npm install -g firebase-tools', { stdio: 'inherit' });
        success('Firebase CLI installé');
        state.firebaseCLIInstalled = true;
    } catch (e) {
        error('Échec de l\'installation de Firebase CLI');
        warning('Essayez manuellement: npm install -g firebase-tools');
    }
}

async function configureFirebase() {
    step('Configuration de Firebase...');

    info('Lancement du script de configuration interactif...');
    console.log('');

    try {
        execSync('node scripts/setup-firebase.js', {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..')
        });
        success('Firebase configuré');
        state.firebaseConfigured = true;
    } catch (e) {
        error('La configuration a été annulée ou a échoué');
        throw e;
    }
}

async function loginFirebase() {
    step('Connexion à Firebase...');

    try {
        info('Exécution: firebase login');
        execSync('firebase login', { stdio: 'inherit' });
        success('Connecté à Firebase');
        state.firebaseLoggedIn = true;
    } catch (e) {
        error('Échec de la connexion Firebase');
        throw e;
    }
}

async function initFirebaseProject() {
    step('Initialisation du projet Firebase...');

    const firebaseJsonPath = path.join(__dirname, '..', 'firebase.json');
    if (fs.existsSync(firebaseJsonPath)) {
        success('firebase.json existe déjà');
        return;
    }

    info('Initialisation interactive de Firebase...');
    info('Choisissez: Firestore, Hosting');
    info('Firestore rules: firestore.rules');
    info('Public directory: . (ou dist)');
    console.log('');

    try {
        execSync('firebase init', {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..')
        });
        success('Projet Firebase initialisé');
    } catch (e) {
        warning('Initialisation annulée ou incomplète');
    }
}

async function deployFirestoreRules() {
    step('Déploiement des règles Firestore...');

    try {
        info('Exécution: firebase deploy --only firestore:rules');
        execSync('firebase deploy --only firestore:rules', {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..')
        });
        success('Règles Firestore déployées');
        state.rulesDeployed = true;
    } catch (e) {
        error('Échec du déploiement des règles');
        warning('Vérifiez que vous êtes connecté et que le projet est initialisé');
    }
}

async function createAdminUser() {
    step('Création d\'un utilisateur administrateur...');

    if (!state.serviceAccountKey) {
        warning('Clé de service Firebase Admin introuvable');
        info('\nPour créer un utilisateur admin:');
        log('1. Allez sur Firebase Console > Project Settings > Service accounts', 'reset');
        log('2. Cliquez "Generate new private key"', 'reset');
        log('3. Sauvegardez comme: scripts/service-account-key.json', 'reset');
        log('4. Relancez ce script ou exécutez:', 'reset');
        log('   node scripts/set-admin.js --list', 'cyan');
        console.log('');
        return;
    }

    info('Listing des utilisateurs Firebase...');
    try {
        execSync('node scripts/set-admin.js --list', {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..')
        });

        const uid = await question('\nEntrez l\'UID de l\'utilisateur à promouvoir admin (ou laissez vide): ');
        if (uid && uid.trim()) {
            execSync(`node scripts/set-admin.js ${uid.trim()}`, {
                stdio: 'inherit',
                cwd: path.join(__dirname, '..')
            });
            success('Utilisateur défini comme admin');
            state.adminUserExists = true;
        }
    } catch (e) {
        error('Impossible de définir l\'utilisateur admin');
        warning('Créez d\'abord un utilisateur dans Firebase Console > Authentication');
    }
}

async function displayFinalInstructions() {
    header('🎉 Installation Terminée!');

    log('Votre site Sarah-Jane est maintenant configuré et sécurisé.\n', 'green');

    log('📝 Actions manuelles restantes:', 'bright');
    console.log('');

    if (!state.authEnabled) {
        log('1️⃣  Activer Authentication dans Firebase Console:', 'yellow');
        log('   → https://console.firebase.google.com/', 'dim');
        log('   → Authentication > Sign-in method', 'dim');
        log('   → Activer "Email/Password"', 'dim');
        console.log('');
    }

    if (!state.firestoreCreated) {
        log('2️⃣  Créer la base Firestore:', 'yellow');
        log('   → Firebase Console > Firestore Database', 'dim');
        log('   → Cliquer "Create database"', 'dim');
        log('   → Région: europe-west1 (Europe)', 'dim');
        console.log('');
    }

    if (!state.adminUserExists) {
        log('3️⃣  Créer votre premier utilisateur admin:', 'yellow');
        log('   → Firebase Console > Authentication > Users', 'dim');
        log('   → Cliquer "Add user"', 'dim');
        log('   → Puis exécuter: node scripts/set-admin.js <UID>', 'dim');
        console.log('');
    }

    log('🚀 Prochaines étapes:', 'bright');
    log('   • Tester le site en local: npx live-server', 'cyan');
    log('   • Se connecter au dashboard: /admin/index.html', 'cyan');
    log('   • Déployer sur Netlify: firebase deploy --only hosting', 'cyan');
    console.log('');

    log('📚 Documentation:', 'bright');
    log('   • SECURITY.md - Guide de sécurité complet', 'cyan');
    log('   • scripts/README.md - Documentation des scripts', 'cyan');
    log('   • FIREBASE-SETUP.md - Guide Firebase détaillé', 'cyan');
    console.log('');

    log('💡 Besoin d\'aide? Consultez la documentation ou relancez ce script.', 'dim');
    console.log('');
}

async function autoSetup() {
    console.clear();

    log('╔═══════════════════════════════════════════════════════════════════╗', 'cyan');
    log('║                                                                   ║', 'cyan');
    log('║        🚀 INSTALLATION AUTOMATIQUE - SARAH-JANE WEBSITE 🚀        ║', 'cyan');
    log('║                                                                   ║', 'cyan');
    log('║           Configuration Firebase complète en une commande         ║', 'cyan');
    log('║                                                                   ║', 'cyan');
    log('╚═══════════════════════════════════════════════════════════════════╝', 'cyan');
    console.log('');

    try {
        // Phase 1: Vérification
        await checkEnvironment();
        await displayStatus();

        // Phase 2: Installation des prérequis
        if (!state.npmPackagesInstalled) {
            await installNpmPackages();
        }

        await installFirebaseAdmin();

        if (!state.firebaseCLIInstalled) {
            await installFirebaseCLI();
        }

        // Phase 3: Configuration Firebase
        if (!state.firebaseConfigured) {
            const answer = await question('\n📝 Configurer Firebase maintenant? (y/n): ');
            if (answer.toLowerCase() === 'y') {
                await configureFirebase();
            } else {
                warning('Configuration Firebase ignorée');
                info('Relancez ce script ou exécutez: node scripts/setup-firebase.js');
                rl.close();
                return;
            }
        }

        // Phase 4: Firebase CLI
        if (!state.firebaseLoggedIn) {
            const answer = await question('\n🔐 Se connecter à Firebase CLI? (y/n): ');
            if (answer.toLowerCase() === 'y') {
                await loginFirebase();
            }
        }

        if (state.firebaseLoggedIn) {
            await initFirebaseProject();

            const answer = await question('\n🚀 Déployer les règles Firestore maintenant? (y/n): ');
            if (answer.toLowerCase() === 'y') {
                await deployFirestoreRules();
            }
        }

        // Phase 5: Utilisateur Admin
        const answer = await question('\n👤 Créer un utilisateur administrateur? (y/n): ');
        if (answer.toLowerCase() === 'y') {
            await createAdminUser();
        }

        // Phase 6: Résumé final
        await displayFinalInstructions();

    } catch (error) {
        console.error('\n');
        error('Une erreur est survenue pendant l\'installation');
        console.error(error.message);
        console.log('');
        warning('Certaines étapes ont échoué. Consultez les messages ci-dessus.');
    } finally {
        rl.close();
    }
}

// Point d'entrée
if (require.main === module) {
    autoSetup().catch(err => {
        console.error('Erreur fatale:', err);
        process.exit(1);
    });
}

module.exports = { autoSetup };
