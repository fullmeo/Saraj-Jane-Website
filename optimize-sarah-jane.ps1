# Script d'optimisation Sarah-Jane Iffra
Write-Host " OPTIMISATION SITE SARAH-JANE IFFRA" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

$projectPath = Get-Location
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

Write-Host "📍 Dossier projet: $projectPath" -ForegroundColor Green

# PHASE 1: SÉCURISATION
Write-Host "`n🔒 PHASE 1: Sécurisation..." -ForegroundColor Yellow

if (Test-Path "admin") {
    New-Item -ItemType Directory -Path "_private" -Force | Out-Null
    Move-Item "admin" "_private\" -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ Dossier admin sécurisé" -ForegroundColor Green
}

$devFiles = @(
    "sarah-jane-photo-site.html",
    "sarah-jane-vscode-project (1).js"
)

foreach ($file in $devFiles) {
    if (Test-Path $file) {
        if (!(Test-Path "_private")) { New-Item -ItemType Directory -Path "_private" -Force | Out-Null }
        Move-Item $file "_private\" -Force -ErrorAction SilentlyContinue
        Write-Host "    $file sécurisé" -ForegroundColor Green
    }
}

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

$gitignoreContent | Out-File -FilePath ".gitignore" -Encoding UTF8 -Force
Write-Host "    .gitignore créé" -ForegroundColor Green

# PHASE 2: OPTIMISATION MANIFEST
Write-Host "`n PHASE 2: Optimisation Manifest..." -ForegroundColor Yellow

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
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><defs><linearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' style='stop-color:%23667eea'/><stop offset='50%25' style='stop-color:%23764ba2'/><stop offset='100%25' style='stop-color:%23667eea'/></linearGradient></defs><rect width='192' height='192' fill='url(%23grad)'/><circle cx='96' cy='96' r='70' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='3'/><text x='96' y='110' text-anchor='middle' fill='white' font-family='Arial' font-size='48' font-weight='bold'>SJ</text><text x='96' y='130' text-anchor='middle' fill='white' font-family='Arial' font-size='12'>ARTIST</text></svg>",
      "sizes": "192x192",
      "type": "image/svg+xml"
    }
  ]
}
"@

$manifestContent | Out-File -FilePath "manifest.json" -Encoding UTF8 -Force
Write-Host "   ✅ Manifest.json optimisé" -ForegroundColor Green

# PHASE 3: OPTIMISATION CSS
Write-Host "`n🎨 PHASE 3: Optimisation CSS..." -ForegroundColor Yellow

$performanceCss = @"

/* === OPTIMISATIONS PERFORMANCE === */
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
    font-family: Arial, sans-serif;
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

.lazy-image {
    opacity: 0;
    transition: opacity 0.5s ease;
}

.lazy-image.loaded {
    opacity: 1;
}
"@

if (Test-Path "css/style.css") {
    Add-Content -Path "css/style.css" -Value $performanceCss
    Write-Host "    CSS de performance ajouté" -ForegroundColor Green
}

# PHASE 4: JAVASCRIPT D'OPTIMISATION
Write-Host "`n PHASE 4: JavaScript d'optimisation..." -ForegroundColor Yellow

$optimizationJs = @"
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
        const images = document.querySelectorAll('img');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        
        this.totalAssets = images.length + stylesheets.length + 1;

        if (document.readyState === 'complete') {
            this.assetLoaded();
        } else {
            document.addEventListener('DOMContentLoaded', () => this.assetLoaded());
        }

        [...images, ...stylesheets].forEach(asset => {
            if (asset.complete || asset.readyState === 'complete') {
                this.assetLoaded();
            } else {
                asset.addEventListener('load', () => this.assetLoaded());
                asset.addEventListener('error', () => this.assetLoaded());
            }
        });

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
            img.classList.add('loaded');
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SarahJaneUXManager();
    });
} else {
    new SarahJaneUXManager();
}

window.addEventListener('load', function() {
    console.log(' Site Sarah-Jane Iffra chargé avec succès!');
    
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

if (Test-Path "js") {
    $optimizationJs | Out-File -FilePath "js/optimization.js" -Encoding UTF8 -Force
    Write-Host "    JavaScript d'optimisation créé" -ForegroundColor Green
}

# PHASE 5: MISE À JOUR INDEX.HTML
Write-Host "`n PHASE 5: Mise à jour index.html..." -ForegroundColor Yellow

if (Test-Path "index.html") {
    $indexContent = Get-Content "index.html" -Raw
    $scriptTag = '<script src="js/optimization.js"></script>'
    if ($indexContent -notlike "*optimization.js*") {
        $indexContent = $indexContent -replace '</body>', "$scriptTag`n</body>"
        $indexContent | Out-File -FilePath "index.html" -Encoding UTF8 -Force
        Write-Host "    Script d'optimisation ajouté à index.html" -ForegroundColor Green
    }
}

Write-Host "`n OPTIMISATION TERMINÉE!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host " POUR TESTER:" -ForegroundColor Yellow
Write-Host "   http-server -p 9000 --cors" -ForegroundColor Gray
Write-Host "   Puis ouvrir: http://127.0.0.1:9000" -ForegroundColor Gray
Write-Host ""
Write-Host " Site Sarah-Jane Iffra optimisé!" -ForegroundColor Magenta
