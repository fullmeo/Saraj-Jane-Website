#!/bin/bash

# ========================================
# Installation Automatique - Sarah-Jane Website
# Script Bash pour Linux/Mac
# ========================================

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                                                                   ║"
echo "║        🚀 INSTALLATION AUTOMATIQUE - SARAH-JANE WEBSITE 🚀        ║"
echo "║                                                                   ║"
echo "║           Configuration Firebase complète en une commande         ║"
echo "║                                                                   ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# Vérifier Node.js
echo -e "${BLUE}🔍 Vérification de l'environnement...${NC}"
echo ""

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo ""
    echo -e "${YELLOW}💡 Installez Node.js depuis: https://nodejs.org/${NC}"
    echo "   Puis relancez ce script."
    echo ""
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js installé: $NODE_VERSION${NC}"
echo ""

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✅ npm installé: v$NPM_VERSION${NC}"
echo ""

# Aller dans le répertoire du script
cd "$(dirname "$0")"

# Installer les dépendances
echo -e "${BLUE}📦 Installation des dépendances npm...${NC}"
echo ""
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ Échec de l'installation des dépendances${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dépendances npm installées${NC}"
echo ""

# Installer firebase-admin
echo -e "${BLUE}📦 Installation de firebase-admin...${NC}"
echo ""
npm install firebase-admin

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ firebase-admin installé${NC}"
else
    echo -e "${YELLOW}⚠️  Échec de l'installation de firebase-admin${NC}"
    echo "   Vous pourrez le faire plus tard si nécessaire"
fi
echo ""

# Vérifier Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}⚠️  Firebase CLI n'est pas installé${NC}"
    echo ""
    read -p "📥 Voulez-vous installer Firebase CLI globalement? (y/n): " INSTALL_CLI

    if [ "$INSTALL_CLI" = "y" ] || [ "$INSTALL_CLI" = "Y" ]; then
        echo ""
        echo "Installation de Firebase CLI..."
        npm install -g firebase-tools

        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Firebase CLI installé${NC}"
        else
            echo -e "${RED}❌ Échec de l'installation de Firebase CLI${NC}"
            echo -e "${YELLOW}💡 Essayez manuellement: npm install -g firebase-tools${NC}"
        fi
    fi
else
    FIREBASE_VERSION=$(firebase --version)
    echo -e "${GREEN}✅ Firebase CLI installé: $FIREBASE_VERSION${NC}"
fi
echo ""

# Lancer le script d'auto-setup
echo -e "${BLUE}🚀 Lancement de la configuration automatique...${NC}"
echo ""
node scripts/auto-setup.js

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ La configuration automatique a rencontré des erreurs${NC}"
    echo ""
    echo -e "${YELLOW}💡 Vous pouvez:${NC}"
    echo "   • Consulter les messages d'erreur ci-dessus"
    echo "   • Relancer ce script: ./install.sh"
    echo "   • Suivre le guide manuel: scripts/README.md"
    echo ""
    exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✅ Installation terminée avec succès!${NC}"
echo ""
echo -e "${YELLOW}📝 Prochaines étapes:${NC}"
echo "   1. Activer Authentication dans Firebase Console"
echo "   2. Créer la base Firestore"
echo "   3. Créer un utilisateur admin"
echo "   4. Tester: npx live-server"
echo ""
echo -e "${CYAN}📚 Documentation complète: SECURITY.md et scripts/README.md${NC}"
echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo ""
