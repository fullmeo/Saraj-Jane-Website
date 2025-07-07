// Script pour générer les icônes manquantes
// À exécuter dans le navigateur sur la page generate-icons.html

// Taille des icônes à générer (en pixels)
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Fonction pour créer une icône de base
function createIcon(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Fond
    ctx.fillStyle = '#4a148c';
    ctx.fillRect(0, 0, size, size);
    
    // Texte
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Ajuster la taille de la police en fonction de la taille de l'icône
    const fontSize = Math.floor(size * 0.4);
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    
    // Dessiner le texte
    ctx.fillText('SJ', size / 2, size / 2);
    
    return canvas.toDataURL('image/png');
}

// Fonction pour télécharger l'icône
function downloadIcon(size) {
    const link = document.createElement('a');
    link.download = `icon-${size}x${size}.png`;
    link.href = createIcon(size);
    link.click();
}

// Générer toutes les icônes
function generateAllIcons() {
    iconSizes.forEach(size => {
        downloadIcon(size);
    });
    
    // Mettre à jour le manifeste
    updateManifest();
}

// Mettre à jour le fichier manifest.json avec les chemins corrects
function updateManifest() {
    const manifest = {
        name: 'Sarah-Jane Iffra - Artiste & Musicienne',
        short_name: 'Sarah-Jane Iffra',
        description: 'Découvrez l\'univers artistique de Sarah-Jane Iffra à travers ses œuvres visuelles et musicales',
        start_url: '/?source=pwa',
        display: 'standalone',
        background_color: '#1a1a2e',
        theme_color: '#4a148c',
        categories: ['art', 'music', 'entertainment', 'education'],
        icons: iconSizes.map(size => ({
            src: `./images/icons/icon-${size}x${size}.png`,
            sizes: `${size}x${size}`,
            type: 'image/png',
            purpose: 'any maskable'
        })),
        screenshots: [
            {
                src: './images/screenshots/homepage-mobile.jpg',
                sizes: '360x640',
                type: 'image/jpeg',
                form_factor: 'narrow'
            },
            {
                src: './images/screenshots/homepage-desktop.jpg',
                sizes: '1920x1080',
                type: 'image/jpeg',
                form_factor: 'wide'
            }
        ]
    };
    
    // Télécharger le manifeste mis à jour
    const link = document.createElement('a');
    link.download = 'manifest.json';
    link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(manifest, null, 2));
    link.click();
}

// Exposer les fonctions au scope global
window.generateAllIcons = generateAllIcons;
