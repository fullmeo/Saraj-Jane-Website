/**
 * Gestion de la configuration SEO
 * Ce fichier charge et applique la configuration SEO du site
 */

// Fonction pour charger la configuration SEO
async function loadSeoConfig() {
    try {
        const response = await fetch('/seo.config.json');
        if (!response.ok) {
            throw new Error('Impossible de charger la configuration SEO');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors du chargement de la configuration SEO:', error);
        return getDefaultSeoConfig();
    }
}

// Configuration SEO par défaut (utilisée en cas d'erreur de chargement)
function getDefaultSeoConfig() {
    const siteUrl = window.location.origin;
    return {
        siteUrl,
        siteName: 'Sarah Jane Iffra',
        siteDescription: 'Artiste et musicienne - Découvrez mon univers artistique',
        siteImage: `${siteUrl}/images/og-image.jpg`,
        pages: {
            home: {
                title: 'Sarah Jane Iffra',
                description: 'Artiste et musicienne - Découvrez mon univers artistique',
                url: siteUrl,
                image: `${siteUrl}/images/og-image.jpg`,
                type: 'website'
            }
        }
    };
}

// Fonction pour mettre à jour les balises meta
function updateMetaTags(page = 'home') {
    // Charger la configuration SEO
    loadSeoConfig().then(seoConfig => {
        const pageConfig = seoConfig.pages[page] || seoConfig.pages.home;
        
        // Mettre à jour le titre de la page
        document.title = pageConfig.title;
        
        // Mettre à jour les balises meta existantes
        updateMetaTag('description', pageConfig.description);
        updateMetaTag('og:title', pageConfig.title);
        updateMetaTag('og:description', pageConfig.description);
        updateMetaTag('og:url', pageConfig.url);
        updateMetaTag('og:image', pageConfig.image);
        updateMetaTag('og:type', pageConfig.type);
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', pageConfig.title);
        updateMetaTag('twitter:description', pageConfig.description);
        updateMetaTag('twitter:image', pageConfig.image);
        
        // Mettre à jour le lien canonique
        updateCanonicalLink(pageConfig.url);
    }).catch(error => {
        console.error('Erreur lors de la mise à jour des balises meta:', error);
    });
}

// Fonction utilitaire pour mettre à jour une balise meta
function updateMetaTag(name, content) {
    // Vérifier si la balise meta existe déjà
    let element = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
    
    // Si la balise n'existe pas, la créer
    if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
            element.setAttribute('property', name);
        } else {
            element.setAttribute('name', name);
        }
        document.head.appendChild(element);
    }
    
    // Mettre à jour le contenu
    element.setAttribute('content', content);
}

// Fonction pour mettre à jour le lien canonique
function updateCanonicalLink(url) {
    let link = document.querySelector('link[rel="canonical"]');
    
    if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
    }
    
    link.href = url;
}

// Fonction pour générer le JSON-LD
function generateJsonLd(page = 'home') {
    loadSeoConfig().then(seoConfig => {
        const pageConfig = seoConfig.pages[page] || seoConfig.pages.home;
        
        // Créer le script JSON-LD
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        
        // Données structurées de base
        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": seoConfig.siteName,
            "url": seoConfig.siteUrl,
            "description": seoConfig.siteDescription,
            "potentialAction": {
                "@type": "SearchAction",
                "target": `${seoConfig.siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
            }
        };
        
        // Ajouter des données spécifiques à la page d'accueil
        if (page === 'home') {
            jsonLd["@type"] = ["WebSite", "Organization"];
            jsonLd["logo"] = `${seoConfig.siteUrl}/images/logo.png`;
            jsonLd["sameAs"] = [
                `https://facebook.com/${seoConfig.socialAccounts?.facebook || ''}`,
                `https://instagram.com/${seoConfig.socialAccounts?.instagram || ''}`,
                `https://twitter.com/${seoConfig.socialAccounts?.twitter || ''}`,
                `https://youtube.com/${seoConfig.socialAccounts?.youtube || ''}`
            ];
        }
        
        script.text = JSON.stringify(jsonLd, null, 2);
        
        // Supprimer l'ancien script JSON-LD s'il existe
        const oldScript = document.querySelector('script[type="application/ld+json"]');
        if (oldScript) {
            document.head.removeChild(oldScript);
        }
        
        // Ajouter le nouveau script
        document.head.appendChild(script);
    }).catch(error => {
        console.error('Erreur lors de la génération du JSON-LD:', error);
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Déterminer la page actuelle
    const path = window.location.pathname;
    let currentPage = 'home';
    
    if (path.includes('galerie')) currentPage = 'gallery';
    else if (path.includes('videos')) currentPage = 'videos';
    else if (path.includes('a-propos')) currentPage = 'about';
    else if (path.includes('contact')) currentPage = 'contact';
    
    // Mettre à jour les balises meta et le JSON-LD
    updateMetaTags(currentPage);
    generateJsonLd(currentPage);
});

// Exporter les fonctions pour une utilisation externe si nécessaire
window.SEO = {
    loadSeoConfig,
    updateMetaTags,
    generateJsonLd
};
