/**
 * Configuration et gestion du partage sur les réseaux sociaux
 */

// Configuration des réseaux sociaux
const socialConfig = {
    // Configuration de base
    siteName: 'Sarah Jane Iffra',
    siteUrl: 'https://sarahjaneiffra.com',
    twitterHandle: '@sarahjaneiffra',
    
    // Chemins par défaut
    defaultImage: '/images/og-image.jpg',
    defaultDescription: 'Découvrez l\'univers artistique de Sarah Jane Iffra',
    
    // Tailles des images partagées
    imageSizes: {
        facebook: '1200x630',
        twitter: '1200x628',
        linkedin: '1200x627',
        pinterest: '1000x1500'
    },
    
    // Paramètres d'URL pour chaque réseau social
    shareUrls: {
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
        twitter: 'https://twitter.com/intent/tweet?text=',
        linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=',
        pinterest: 'https://pinterest.com/pin/create/button/?url=',
        whatsapp: 'https://wa.me/?text=',
        email: 'mailto:?subject=&body='
    }
};

/**
 * Partage une page sur les réseaux sociaux
 * @param {string} platform - Plateforme de partage (facebook, twitter, etc.)
 * @param {Object} options - Options de partage (url, title, text, image)
 */
function shareOnSocial(platform, options = {}) {
    // Récupérer les valeurs par défaut
    const {
        url = window.location.href,
        title = document.title,
        text = socialConfig.defaultDescription,
        image = socialConfig.defaultImage
    } = options;
    
    // Construire l'URL de partage en fonction de la plateforme
    let shareUrl = '';
    
    switch (platform.toLowerCase()) {
        case 'facebook':
            shareUrl = `${socialConfig.shareUrls.facebook}${encodeURIComponent(url)}`;
            break;
            
        case 'twitter':
            const tweetText = `${encodeURIComponent(text)} ${encodeURIComponent(url)} via ${socialConfig.twitterHandle}`;
            shareUrl = `${socialConfig.shareUrls.twitter}${tweetText}`;
            break;
            
        case 'linkedin':
            shareUrl = `${socialConfig.shareUrls.linkedin}${encodeURIComponent(url)}`;
            break;
            
        case 'pinterest':
            const pinterestText = `${encodeURIComponent(text)} ${encodeURIComponent(url)}`;
            shareUrl = `${socialConfig.shareUrls.pinterest}${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${pinterestText}`;
            break;
            
        case 'whatsapp':
            const whatsappText = `${text} ${url}`;
            shareUrl = `${socialConfig.shareUrls.whatsapp}${encodeURIComponent(whatsappText)}`;
            break;
            
        case 'email':
            const emailSubject = title;
            const emailBody = `${text}\n\n${url}`;
            shareUrl = `${socialConfig.shareUrls.email}${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            break;
            
        default:
            console.error('Plateforme de partage non prise en charge:', platform);
            return false;
    }
    
    // Ouvrir la fenêtre de partage
    const width = 600;
    const height = 500;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
        shareUrl,
        'Partager',
        `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,resizable=yes,scrollbars=yes`
    );
    
    return true;
}

/**
 * Initialise les boutons de partage sur la page
 */
function initShareButtons() {
    // Écouter les clics sur les boutons de partage
    document.addEventListener('click', function(event) {
        const shareButton = event.target.closest('[data-share]');
        
        if (shareButton) {
            event.preventDefault();
            
            const platform = shareButton.getAttribute('data-share');
            const card = shareButton.closest('.card, .gallery-item, .video-card');
            
            // Récupérer les données de partage depuis les attributs data-* ou les éléments parents
            const shareData = {
                url: shareButton.getAttribute('data-url') || window.location.href,
                title: shareButton.getAttribute('data-title') || document.title,
                text: shareButton.getAttribute('data-text') || socialConfig.defaultDescription,
                image: shareButton.getAttribute('data-image') || socialConfig.defaultImage
            };
            
            // Si on est dans une carte, essayer de récupérer plus d'informations
            if (card) {
                const cardTitle = card.querySelector('.card-title, h3, [itemprop="name"]');
                const cardText = card.querySelector('.card-text, .description, [itemprop="description"]');
                const cardImage = card.querySelector('img[src]');
                
                if (cardTitle && !shareData.title) {
                    shareData.title = cardTitle.textContent.trim();
                }
                
                if (cardText && !shareData.text) {
                    shareData.text = cardText.textContent.trim();
                }
                
                if (cardImage && !shareData.image) {
                    shareData.image = cardImage.src;
                }
            }
            
            // Lancer le partage
            shareOnSocial(platform, shareData);
        }
    });
    
    // Ajouter le bouton de partage natif si disponible
    initNativeShareButton();
}

/**
 * Initialise le bouton de partage natif (Web Share API)
 */
function initNativeShareButton() {
    const shareButton = document.querySelector('.native-share-button');
    
    if (!shareButton || !navigator.share) {
        return;
    }
    
    shareButton.style.display = 'inline-block';
    
    shareButton.addEventListener('click', async () => {
        try {
            await navigator.share({
                title: document.title,
                text: socialConfig.defaultDescription,
                url: window.location.href
            });
        } catch (err) {
            console.log('Erreur lors du partage:', err);
        }
    });
}

/**
 * Génère les balises meta pour les réseaux sociaux
 * @param {Object} options - Options pour les métadonnées
 */
function generateSocialMetaTags(options = {}) {
    const {
        title = document.title,
        description = socialConfig.defaultDescription,
        url = window.location.href,
        image = socialConfig.defaultImage,
        type = 'website',
        siteName = socialConfig.siteName,
        twitterCard = 'summary_large_image',
        locale = 'fr_FR'
    } = options;
    
    // Tableau pour stocker les balises meta
    const metaTags = [];
    
    // Balises de base
    metaTags.push({ name: 'title', content: title });
    metaTags.push({ name: 'description', content: description });
    
    // Open Graph (Facebook, LinkedIn, etc.)
    metaTags.push({ property: 'og:type', content: type });
    metaTags.push({ property: 'og:url', content: url });
    metaTags.push({ property: 'og:title', content: title });
    metaTags.push({ property: 'og:description', content: description });
    metaTags.push({ property: 'og:image', content: image });
    metaTags.push({ property: 'og:site_name', content: siteName });
    metaTags.push({ property: 'og:locale', content: locale });
    
    // Twitter Card
    metaTags.push({ name: 'twitter:card', content: twitterCard });
    metaTags.push({ name: 'twitter:url', content: url });
    metaTags.push({ name: 'twitter:title', content: title });
    metaTags.push({ name: 'twitter:description', content: description });
    metaTags.push({ name: 'twitter:image', content: image });
    
    if (socialConfig.twitterHandle) {
        metaTags.push({ name: 'twitter:site', content: socialConfig.twitterHandle });
        metaTags.push({ name: 'twitter:creator', content: socialConfig.twitterHandle });
    }
    
    // Mettre à jour ou créer les balises meta dans le head
    metaTags.forEach(tag => {
        let selector = '';
        
        if (tag.property) {
            selector = `meta[property="${tag.property}"]`;
        } else if (tag.name) {
            selector = `meta[name="${tag.name}"]`;
        }
        
        if (selector) {
            let element = document.querySelector(selector);
            
            if (!element) {
                element = document.createElement('meta');
                
                if (tag.property) {
                    element.setAttribute('property', tag.property);
                } else if (tag.name) {
                    element.setAttribute('name', tag.name);
                }
                
                document.head.appendChild(element);
            }
            
            element.setAttribute('content', tag.content);
        }
    });
    
    // Mettre à jour le titre de la page
    document.title = title;
    
    // Mettre à jour le lien canonique
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    
    canonicalLink.href = url;
}

// Exporter les fonctions pour une utilisation externe
window.SocialShare = {
    share: shareOnSocial,
    initButtons: initShareButtons,
    updateMeta: generateSocialMetaTags,
    config: socialConfig
};

// Initialiser automatiquement les boutons de partage au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    initShareButtons();
    
    // Mettre à jour les métadonnées sociales si nécessaire
    if (typeof window.pageMeta === 'object') {
        generateSocialMetaTags(window.pageMeta);
    }
});
