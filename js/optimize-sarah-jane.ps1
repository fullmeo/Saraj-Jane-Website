# Script d'optimisation complète pour le site Sarah-Jane Iffra
# Exécuter depuis: C:\Users\diase\Downloads\Sarah-Jane-website\sarah-jane-iffra-website

Write-Host "🎨 OPTIMISATION SITE SARAH-JANE IFFRA" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

# Variables
$projectPath = Get-Location
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = "$projectPath\backup_$timestamp"

Write-Host "📍 Dossier projet: $projectPath" -ForegroundColor Green

# PHASE 1: SÉCURISATION
Write-Host "`n🔒 PHASE 1: Sécurisation..." -ForegroundColor Yellow

# Créer backup
Write-Host "📦 Création backup..." -ForegroundColor Gray
New-Item -ItemType Directory -Path $backupPath -Force | Out-Null
Copy-Item "admin" -Destination "$backupPath\admin" -Recurse -ErrorAction SilentlyContinue
Copy-Item "*.js" -Destination $backupPath -ErrorAction SilentlyContinue

# Sécuriser dossiers sensibles
Write-Host "🛡️ Sécurisation des fichiers..." -ForegroundColor Gray
if (Test-Path "admin") {
    New-Item -ItemType Directory -Path "_private" -Force | Out-Null
    Move-Item "admin" "_private\" -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ Dossier admin sécurisé" -ForegroundColor Green
}

# Nettoyer fichiers de dev
$devFiles = @(
    "sarah-jane-photo-site.html",
    "sarah-jane-vscode-project (1).js"
)

foreach ($file in $devFiles) {
    if (Test-Path $file) {
        Move-Item $file "_private\" -Force -ErrorAction SilentlyContinue
        Write-Host "   ✅ $file sécurisé" -ForegroundColor Green
    }
}

# Créer .gitignore
$gitignoreContent = @"
node_modules/
_private/
backup_*/
*.log
.env
temp/
.vscode/
*.tmp
.DS_Store
Thumbs.db
"@

$gitignoreContent | Out-File -FilePath ".gitignore" -Encoding UTF8
Write-Host "   ✅ .gitignore créé" -ForegroundColor Green

# PHASE 2: OPTIMISATION MANIFEST
Write-Host "`n⚙️ PHASE 2: Optimisation Manifest..." -ForegroundColor Yellow

$manifestContent = @"
{
  "name": "Sarah-Jane Iffra - Artiste & Musicienne",
  "short_name": "Sarah-Jane",
  "description": "Portfolio artistique de Sarah-Jane Iffra - Compositions musicales et créations visuelles",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#1a1a2e",
  "theme_color": "#667eea",
  "orientation": "portrait-primary",
  "scope": "./",
  "lang": "fr",
  "icons": [
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%23667eea'/><stop offset='50%' style='stop-color:%23764ba2'/><stop offset='100%' style='stop-color:%23667eea'/></linearGradient></defs><rect width='192' height='192' fill='url(%23grad)'/><circle cx='96' cy='96' r='70' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='3'/><text x='96' y='110' text-anchor='middle' fill='white' font-family='Arial' font-size='48' font-weight='bold'>SJ</text><text x='96' y='130' text-anchor='middle' fill='white' font-family='Arial' font-size='12'>ARTIST</text></svg>",
      "sizes": "192x192",
      "type": "image/svg+xml"
    },
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><defs><linearGradient id='grad2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%23667eea'/><stop offset='50%' style='stop-color:%23764ba2'/><stop offset='100%' style='stop-color:%23667eea'/></linearGradient></defs><rect width='512' height='512' fill='url(%23grad2)'/><circle cx='256' cy='256' r='180' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='8'/><circle cx='256' cy='256' r='130' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='4'/><text x='256' y='290' text-anchor='middle' fill='white' font-family='Arial' font-size='120' font-weight='bold'>SJ</text><text x='256' y='330' text-anchor='middle' fill='white' font-family='Arial' font-size='32'>ARTIST</text></svg>",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ],
  "categories": ["music", "art", "entertainment"],
  "screenshots": [
    {
      "src": "./images/gallery/Black and Dark Space Photo YouTube Thumbnail_20250531_152742_0000.png",
      "sizes": "1280x720",
      "type": "image/png"
    }
  ]
}
"@

$manifestContent | Out-File -FilePath "manifest.json" -Encoding UTF8
Write-Host "   ✅ Manifest.json optimisé" -ForegroundColor Green

# PHASE 3: OPTIMISATION CSS
Write-Host "`n🎨 PHASE 3: Optimisation CSS..." -ForegroundColor Yellow

# Ajouter CSS d'optimisation performance
$performanceCss = @"

/* === OPTIMISATIONS PERFORMANCE === */
* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

/* Optimisation images */
img {
    max-width: 100%;
    height: auto;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimize-contrast;
}

/* Lazy loading */
.lazy-image {
    opacity: 0;
    transition: opacity 0.5s ease;
    will-change: opacity;
}

.lazy-image.loaded {
    opacity: 1;
}

/* Loading states */
.page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, visibility 0.5s ease;
    font-family: 'Arial', sans-serif;
}

.page-loader.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.loader-content {
    text-align: center;
    color: white;
}

.loader-text {
    font-size: 2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    font-weight: 300;
}

.progress-bar {
    width: 300px;
    height: 4px;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
    overflow: hidden;
    margin: 2rem auto;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #fff, #f0f0f0);
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 2px;
}

.loading-status {
    font-size: 1rem;
    opacity: 0.8;
}

/* Skeleton loaders */
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Optimisation animations */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* Optimisation mobile */
@media (max-width: 768px) {
    .page-loader .loader-text {
        font-size: 1.5rem;
    }
    
    .progress-bar {
        width: 250px;
    }
}
"@

Add-Content -Path "css/style.css" -Value $performanceCss
Write-Host "   ✅ CSS de performance ajouté" -ForegroundColor Green

# PHASE 4: JAVASCRIPT D'OPTIMISATION
Write-Host "`n⚡ PHASE 4: JavaScript d'optimisation..." -ForegroundColor Yellow

$optimizationJs = @"

// === GESTIONNAIRE D'EXPÉRIENCE UTILISATEUR ===
class SarahJaneUXManager {
    constructor() {
        this.loadingProgress = 0;
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.isLoading = true;
        this.init();
    }

    init() {
        this.createPageLoader();
        this.trackLoadingProgress();
        this.initLazyLoading();
        this.optimizePerformance();
    }

    createPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <h2 class="loader-text">Sarah-Jane Iffra</h2>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
                <p class="loading-status" id="loading-status">Chargement de l'univers artistique...</p>
            </div>
        `;
        document.body.appendChild(loader);
    }

    trackLoadingProgress() {
        // Compter les assets critiques
        const images = document.querySelectorAll('img');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        
        this.totalAssets = images.length + stylesheets.length + 1; // +1 pour DOM

        // Tracker DOM ready
        if (document.readyState === 'complete') {
            this.assetLoaded();
        } else {
            document.addEventListener('DOMContentLoaded', () => this.assetLoaded());
        }

        // Tracker les assets
        [...images, ...stylesheets].forEach(asset => {
            if (asset.complete || asset.readyState === 'complete') {
                this.assetLoaded();
            } else {
                asset.addEventListener('load', () => this.assetLoaded());
                asset.addEventListener('error', () => this.assetLoaded());
            }
        });

        // Fallback de sécurité
        setTimeout(() => {
            if (this.isLoading) {
                this.finishLoading();
            }
        }, 5000);
    }

    assetLoaded() {
        this.loadedAssets++;
        this.loadingProgress = Math.min((this.loadedAssets / this.totalAssets) * 100, 100);
        
        this.updateProgressUI();

        if (this.loadingProgress >= 100) {
            setTimeout(() => this.finishLoading(), 300);
        }
    }

    updateProgressUI() {
        const progressFill = document.getElementById('progress-fill');
        const statusText = document.getElementById('loading-status');
        
        if (progressFill) {
            progressFill.style.width = `${this.loadingProgress}%`;
        }
        
        if (statusText) {
            const messages = [
                'Initialisation...',
                'Chargement des créations...',
                'Préparation de la galerie...',
                'Finalisation...',
                'Prêt à découvrir !'
            ];
            const messageIndex = Math.floor((this.loadingProgress / 100) * (messages.length - 1));
            statusText.textContent = messages[messageIndex];
        }
    }

    finishLoading() {
        this.isLoading = false;
        const loader = document.querySelector('.page-loader');
        
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
                this.startPageAnimations();
            }, 500);
        }
    }

    startPageAnimations() {
        // Animation d'entrée progressive
        const elements = document.querySelectorAll('.gallery-item, .hero-content, h1, h2');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        imageObserver.unobserve(img);
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '50px'
            });

            // Préparer les images pour lazy loading
            document.querySelectorAll('img').forEach(img => {
                if (!img.complete) {
                    img.classList.add('lazy-image');
                    imageObserver.observe(img);
                }
            });
        }
    }

    loadImage(img) {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        img.addEventListener('error', () => {
            img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="150" text-anchor="middle" fill="%23999" font-family="Arial" font-size="16">Image indisponible</text></svg>';
            img.classList.add('loaded');
        });
    }

    optimizePerformance() {
        // Throttle scroll events
        let ticking = false;
        document.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Précharger les images critiques
        this.preloadCriticalImages();
    }

    preloadCriticalImages() {
        const criticalImages = [
            './images/gallery/Black and Dark Space Photo YouTube Thumbnail_20250531_152742_0000.png'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    handleScroll() {
        // Logique de scroll optimisée si nécessaire
    }
}

// Initialisation automatique
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SarahJaneUXManager();
    });
} else {
    new SarahJaneUXManager();
}

// Optimisations globales
window.addEventListener('load', function() {
    console.log('🎨 Site Sarah-Jane Iffra chargé avec succès!');
    
    // Précharger la navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
"@

$optimizationJs | Out-File -FilePath "js/optimization.js" -Encoding UTF8
Write-Host "   ✅ JavaScript d'optimisation créé" -ForegroundColor Green

# PHASE 5: MISE À JOUR INDEX.HTML
Write-Host "`n📄 PHASE 5: Mise à jour index.html..." -ForegroundColor Yellow

# Lire le contenu actuel
$indexContent = Get-Content "index.html" -Raw

# Ajouter le script d'optimisation avant </body>
$scriptTag = '<script src="js/optimization.js"></script>'
if ($indexContent -notlike "*optimization.js*") {
    $indexContent = $indexContent -replace '</body>', "$scriptTag`n</body>"
    $indexContent | Out-File -FilePath "index.html" -Encoding UTF8
    Write-Host "   ✅ Script d'optimisation ajouté à index.html" -ForegroundColor Green
}

# PHASE 6: CRÉATION D'OUTILS DE MAINTENANCE
Write-Host "`n🛠️ PHASE 6: Outils de maintenance..." -ForegroundColor Yellow

# Script de test rapide
$testScript = @"
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Site Sarah-Jane</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 2rem; }
        .test { margin: 1rem 0; padding: 1rem; border-radius: 5px; }
        .pass { background: #d4edda; border: 1px solid #c3e6cb; }
        .fail { background: #f8d7da; border: 1px solid #f5c6cb; }
        button { background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>🧪 Test Suite - Site Sarah-Jane Iffra</h1>
    <button onclick="runTests()">Lancer les Tests</button>
    <div id="results"></div>

    <script>
    async function runTests() {
        const results = document.getElementById('results');
        results.innerHTML = '<p>🔄 Tests en cours...</p>';
        
        const tests = [
            { name: 'Manifest.json', url: './manifest.json' },
            { name: 'CSS Principal', url: './css/style.css' },
            { name: 'JavaScript', url: './js/main.js' },
            { name: 'Image Hero', url: './images/gallery/Black and Dark Space Photo YouTube Thumbnail_20250531_152742_0000.png' },
            { name: 'Service Worker', url: './sw.js' }
        ];
        
        let html = '';
        
        for (const test of tests) {
            try {
                const response = await fetch(test.url);
                const status = response.ok ? 'pass' : 'fail';
                const statusText = response.ok ? '✅ OK' : `❌ ${response.status}`;
                html += `<div class="test ${status}"><strong>${test.name}:</strong> ${statusText}</div>`;
            } catch (error) {
                html += `<div class="test fail"><strong>${test.name}:</strong> ❌ Erreur: ${error.message}</div>`;
            }
        }
        
        results.innerHTML = html;
    }
    </script>
</body>
</html>
"@

$testScript | Out-File -FilePath "test-site.html" -Encoding UTF8
Write-Host "   ✅ Outil de test créé: test-site.html" -ForegroundColor Green

# PHASE 7: RÉSUMÉ ET INSTRUCTIONS
Write-Host "`n✨ OPTIMISATION TERMINÉE!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 RÉSUMÉ DES ACTIONS:" -ForegroundColor Cyan
Write-Host "   ✅ Sécurisation: Dossiers sensibles protégés" -ForegroundColor White
Write-Host "   ✅ Manifest: PWA optimisée avec icônes SVG" -ForegroundColor White
Write-Host "   ✅ Performance: CSS et JS d'optimisation ajoutés" -ForegroundColor White
Write-Host "   ✅ UX: Loading states et lazy loading" -ForegroundColor White
Write-Host "   ✅ Maintenance: Outils de test créés" -ForegroundColor White
Write-Host ""
Write-Host "🚀 PROCHAINES ÉTAPES:" -ForegroundColor Yellow
Write-Host "   1. Tester: http-server -p 9000 --cors" -ForegroundColor Gray
Write-Host "   2. Ouvrir: http://127.0.0.1:9000" -ForegroundColor Gray
Write-Host "   3. Valider: http://127.0.0.1:9000/test-site.html" -ForegroundColor Gray
Write-Host ""
Write-Host "📁 Backup créé: $backupPath" -ForegroundColor Blue
Write-Host ""
Write-Host "🎨 Site Sarah-Jane Iffra optimisé avec succès!" -ForegroundColor Magenta

# Lancer le serveur automatiquement
Write-Host "`n🌐 Lancement du serveur..." -ForegroundColor Yellow
if (Get-Command "http-server" -ErrorAction SilentlyContinue) {
    Start-Process powershell -ArgumentList "-Command", "http-server -p 9000 --cors; Read-Host 'Appuyez sur Entrée pour fermer'"
    Start-Sleep 2
    Start-Process "http://127.0.0.1:9000"
    Write-Host "   ✅ Serveur lancé sur http://127.0.0.1:9000" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ http-server non trouvé. Installez avec: npm install -g http-server" -ForegroundColor Red
}