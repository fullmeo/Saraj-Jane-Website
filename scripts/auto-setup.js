#!/usr/bin/env node
/**
 * auto-setup.js - Script de configuration automatique
 * Site Sarah Jane Iffra
 *
 * Usage : node scripts/auto-setup.js
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');
const readline = require('readline');

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function ok(msg) {
  console.log(`${colors.green}✅ ${msg}${colors.reset}`);
}

function err(msg) {
  console.error(`${colors.red}❌ ${msg}${colors.reset}`);
}

function warn(msg) {
  console.warn(`${colors.yellow}⚠️  ${msg}${colors.reset}`);
}

function info(msg) {
  console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`);
}

function title(msg) {
  console.log(`\n${colors.bold}${colors.cyan}${'─'.repeat(50)}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  ${msg}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}${'─'.repeat(50)}${colors.reset}\n`);
}

function run(cmd, opts = {}) {
  try {
    execSync(cmd, { cwd: ROOT, stdio: opts.silent ? 'pipe' : 'inherit', ...opts });
    return true;
  } catch (e) {
    return false;
  }
}

function fileExists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// ─── Checks ──────────────────────────────────────────────────────────────────

function checkNode() {
  title('1/5 — Vérification de l\'environnement');

  const result = spawnSync('node', ['-v'], { encoding: 'utf8' });
  if (result.status !== 0) {
    err('Node.js introuvable. Installez Node.js >= 16 depuis https://nodejs.org/');
    process.exit(1);
  }

  const versionStr = result.stdout.trim().replace('v', '');
  const major = parseInt(versionStr.split('.')[0], 10);

  if (major < 16) {
    err(`Node.js ${versionStr} détecté. Version 16+ requise.`);
    err('Mettez à jour Node.js depuis https://nodejs.org/');
    process.exit(1);
  }
  ok(`Node.js v${versionStr}`);

  const npmResult = spawnSync('npm', ['-v'], { encoding: 'utf8' });
  if (npmResult.status !== 0) {
    err('npm introuvable.');
    process.exit(1);
  }
  const npmVersion = npmResult.stdout.trim();
  const npmMajor = parseInt(npmVersion.split('.')[0], 10);
  if (npmMajor < 7) {
    err(`npm ${npmVersion} détecté. Version 7+ requise.`);
    err('Mettez à jour npm : npm install -g npm');
    process.exit(1);
  }
  ok(`npm v${npmVersion}`);
}

// ─── .env Setup ──────────────────────────────────────────────────────────────

async function setupEnv(rl) {
  title('2/5 — Configuration des variables d\'environnement');

  if (fileExists('.env')) {
    ok('.env déjà présent, étape ignorée.');
    return;
  }

  if (!fileExists('.env.example')) {
    err('.env.example introuvable. Impossible de créer .env.');
    process.exit(1);
  }

  info('Création de .env depuis .env.example…');
  fs.copyFileSync(path.join(ROOT, '.env.example'), path.join(ROOT, '.env'));
  ok('.env créé.');

  const configure = await ask(
    rl,
    `${colors.yellow}Voulez-vous configurer les clés maintenant ? (o/N) : ${colors.reset}`
  );

  if (configure.trim().toLowerCase() !== 'o') {
    warn('Configuration ignorée. Éditez .env manuellement avant de lancer le site.');
    return;
  }

  const fields = [
    { key: 'VITE_FIREBASE_API_KEY',              label: 'Firebase API Key' },
    { key: 'VITE_FIREBASE_AUTH_DOMAIN',          label: 'Firebase Auth Domain (ex: projet.firebaseapp.com)' },
    { key: 'VITE_FIREBASE_PROJECT_ID',           label: 'Firebase Project ID' },
    { key: 'VITE_FIREBASE_STORAGE_BUCKET',       label: 'Firebase Storage Bucket (ex: projet.appspot.com)' },
    { key: 'VITE_FIREBASE_MESSAGING_SENDER_ID',  label: 'Firebase Messaging Sender ID' },
    { key: 'VITE_FIREBASE_APP_ID',               label: 'Firebase App ID' },
    { key: 'VITE_YOUTUBE_API_KEY',               label: 'YouTube Data API Key' },
    { key: 'VITE_YOUTUBE_CHANNEL_ID',            label: 'YouTube Channel ID' },
    { key: 'VITE_ADMIN_EMAILS',                  label: 'Email(s) admin (séparés par des virgules)' },
  ];

  let envContent = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');

  for (const field of fields) {
    const value = await ask(rl, `  ${field.label} : `);
    if (value.trim()) {
      const regex = new RegExp(`^(${field.key}=).*$`, 'm');
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `$1${value.trim()}`);
      } else {
        envContent += `\n${field.key}=${value.trim()}`;
      }
    }
  }

  fs.writeFileSync(path.join(ROOT, '.env'), envContent, 'utf8');
  ok('.env configuré.');
}

// ─── npm install ─────────────────────────────────────────────────────────────

async function installDeps(rl) {
  title('3/5 — Installation des dépendances');

  if (fileExists('node_modules')) {
    const reinstall = await ask(
      rl,
      `${colors.yellow}node_modules existe déjà. Réinstaller ? (o/N) : ${colors.reset}`
    );
    if (reinstall.trim().toLowerCase() !== 'o') {
      ok('Installation ignorée.');
      return;
    }
  }

  info('Exécution de npm install…');
  const success = run('npm install');

  if (!success) {
    err('npm install a échoué. Consultez les erreurs ci-dessus.');
    const retry = await ask(rl, `${colors.yellow}Réessayer avec --legacy-peer-deps ? (o/N) : ${colors.reset}`);
    if (retry.trim().toLowerCase() === 'o') {
      const retrySuccess = run('npm install --legacy-peer-deps');
      if (!retrySuccess) {
        err('Échec de l\'installation. Consultez la documentation ou créez une issue.');
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }

  ok('Dépendances installées.');
}

// ─── Security Audit ──────────────────────────────────────────────────────────

function runAudit() {
  title('4/5 — Audit de sécurité');

  info('Exécution de npm audit…');
  const result = spawnSync('npm', ['audit', '--json'], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  let report;
  try {
    report = JSON.parse(result.stdout);
  } catch {
    warn('Impossible de lire le rapport d\'audit.');
    return;
  }

  const { critical = 0, high = 0, moderate = 0, low = 0 } = report.metadata?.vulnerabilities || {};

  if (critical > 0) {
    err(`${critical} vulnérabilité(s) CRITIQUE(S) détectée(s). Lancez : npm audit fix`);
  } else if (high > 0) {
    warn(`${high} vulnérabilité(s) haute(s). Recommandé : npm audit fix`);
  } else if (moderate + low > 0) {
    warn(`${moderate + low} vulnérabilité(s) faible(s)/modérée(s).`);
  } else {
    ok('Aucune vulnérabilité détectée.');
  }
}

// ─── Summary ─────────────────────────────────────────────────────────────────

function printSummary() {
  title('5/5 — Résumé');

  const checks = [
    [fileExists('.env'),          '.env configuré'],
    [fileExists('node_modules'),  'Dépendances installées'],
    [fileExists('dist'),          'Build de production disponible'],
  ];

  for (const [status, label] of checks) {
    if (status) ok(label);
    else warn(`${label} — à faire`);
  }

  console.log(`
${colors.bold}${colors.green}════════════════════════════════════════${colors.reset}
${colors.bold}${colors.green}  Installation terminée !${colors.reset}
${colors.bold}${colors.green}════════════════════════════════════════${colors.reset}

${colors.cyan}Commandes disponibles :${colors.reset}

  npm start             → Serveur local  http://localhost:3000
  npm run build         → Build production dans dist/
  npm run deploy:staging      → Déployer sur staging Firebase
  npm run deploy:production   → Déployer en production Firebase
  npm run lint          → Vérifier le code JavaScript
  npm audit             → Rapport de sécurité des dépendances

${colors.cyan}Documentation :${colors.reset}
  INSTALL.md    → Guide d'installation complet
  SECURITY.md   → Bonnes pratiques de sécurité
  FIREBASE-SETUP.md → Configuration Firebase
`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`
${colors.bold}${colors.cyan}╔══════════════════════════════════════════╗
║   Sarah Jane Iffra — Auto Setup Script   ║
╚══════════════════════════════════════════╝${colors.reset}
`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    checkNode();
    await setupEnv(rl);
    await installDeps(rl);
    runAudit();
    printSummary();
  } finally {
    rl.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
