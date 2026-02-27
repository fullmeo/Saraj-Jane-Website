@echo off
REM ========================================
REM Installation Automatique - Sarah-Jane Website
REM Script Windows Batch
REM ========================================

echo.
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║                                                                   ║
echo ║        🚀 INSTALLATION AUTOMATIQUE - SARAH-JANE WEBSITE 🚀        ║
echo ║                                                                   ║
echo ║           Configuration Firebase complete en une commande         ║
echo ║                                                                   ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.
echo.

REM Vérifier Node.js
echo 🔍 Verification de l'environnement...
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js n'est pas installe
    echo.
    echo 💡 Telechargez Node.js depuis: https://nodejs.org/
    echo    Puis relancez ce script.
    echo.
    pause
    exit /b 1
)

node --version
echo ✅ Node.js installe
echo.

REM Vérifier npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm n'est pas installe
    pause
    exit /b 1
)

npm --version
echo ✅ npm installe
echo.

REM Aller dans le répertoire du projet
cd /d "%~dp0.."

REM Installer les dépendances
echo 📦 Installation des dependances npm...
echo.
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Echec de l'installation des dependances
    pause
    exit /b 1
)
echo ✅ Dependances npm installees
echo.

REM Installer firebase-admin
echo 📦 Installation de firebase-admin...
echo.
call npm install firebase-admin
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Echec de l'installation de firebase-admin
    echo    Vous pourrez le faire plus tard si necessaire
)
echo ✅ firebase-admin installe
echo.

REM Vérifier si Firebase CLI est installé
where firebase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Firebase CLI n'est pas installe
    echo.
    set /p INSTALL_CLI="📥 Voulez-vous installer Firebase CLI globalement? (y/n): "
    if /i "%INSTALL_CLI%"=="y" (
        echo.
        echo Installation de Firebase CLI...
        call npm install -g firebase-tools
        if %ERRORLEVEL% NEQ 0 (
            echo ❌ Echec de l'installation de Firebase CLI
            echo 💡 Essayez manuellement: npm install -g firebase-tools
        ) else (
            echo ✅ Firebase CLI installe
        )
    )
) else (
    firebase --version
    echo ✅ Firebase CLI installe
)
echo.

REM Lancer le script d'auto-setup
echo 🚀 Lancement de la configuration automatique...
echo.
node scripts/auto-setup.js

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ La configuration automatique a rencontre des erreurs
    echo.
    echo 💡 Vous pouvez:
    echo    • Consulter les messages d'erreur ci-dessus
    echo    • Relancer ce script: install.bat
    echo    • Suivre le guide manuel: scripts/README.md
    echo.
    pause
    exit /b 1
)

echo.
echo ═══════════════════════════════════════════════════════════════════
echo.
echo ✅ Installation terminee avec succes!
echo.
echo 📝 Prochaines etapes:
echo    1. Activer Authentication dans Firebase Console
echo    2. Creer la base Firestore
echo    3. Creer un utilisateur admin
echo    4. Tester: npx live-server
echo.
echo 📚 Documentation complete: SECURITY.md et scripts/README.md
echo.
echo ═══════════════════════════════════════════════════════════════════
echo.
pause
