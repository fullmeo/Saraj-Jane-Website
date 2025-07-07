/**
 * Chargement différé des images et iframes pour améliorer les performances
 */

// Configuration par défaut
const lazyConfig = {
    // Sélecteur des éléments à charger en différé
    selector: 'img[data-src], iframe[data-src]',
    
    // Classe CSS appliquée pendant le chargement
    loadingClass: 'lazy-loading',
    
    // Classe CSS appliquée après le chargement
    loadedClass: 'lazy-loaded',
    
    // Délai avant d'observer les éléments (ms)
    delay: 0,
    
    // Marge racine (rootMargin) pour l'Intersection Observer
    // Permet de déclencher le chargement avant que l'élément ne soit dans la vue
    rootMargin: '200px 0px',
    
    // Seuil de visibilité (0-1) pour déclencher le chargement
    threshold: 0.01,
    
    // Activer le mode debug
    debug: false
};

/**
 * Vérifie si le navigateur supporte l'API Intersection Observer
 * @returns {boolean}
 */
function supportsIntersectionObserver() {
    return ('IntersectionObserver' in window &&
            'IntersectionObserverEntry' in window &&
            'intersectionRatio' in window.IntersectionObserverEntry.prototype);
}

/**
 * Vérifie si l'élément est dans la fenêtre visible
 * @param {HTMLElement} element - L'élément à vérifier
 * @returns {boolean}
 */
function isInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Charge une image en différé
 * @param {HTMLImageElement|HTMLIFrameElement} element - L'élément à charger
 * @param {Function} callback - Fonction de rappel après le chargement
 */
function lazyLoadElement(element, callback) {
    if (!element) return;
    
    const src = element.getAttribute('data-src');
    const srcset = element.getAttribute('data-srcset');
    const sizes = element.getAttribute('data-sizes');
    
    if (!src) {
        if (lazyConfig.debug) {
            console.warn('Aucune source de données (data-src) trouvée pour l\'élément:', element);
        }
        return;
    }
    
    // Marquer l'élément comme étant en cours de chargement
    element.classList.add(lazyConfig.loadingClass);
    
    // Fonction de chargement terminé
    const onLoad = () => {
        element.classList.remove(lazyConfig.loadingClass);
        element.classList.add(lazyConfig.loadedClass);
        
        // Supprimer les attributs data-* inutiles
        element.removeAttribute('data-src');
        element.removeAttribute('data-srcset');
        element.removeAttribute('data-sizes');
        
        // Appeler le callback si fourni
        if (typeof callback === 'function') {
            callback(element);
        }
        
        // Déclencher un événement personnalisé
        const event = new CustomEvent('lazyloaded', {
            detail: { element }
        });
        document.dispatchEvent(event);
        
        if (lazyConfig.debug) {
            console.log('Élément chargé avec succès:', element);
        }
    };
    
    // Gestion des erreurs de chargement
    const onError = (error) => {
        console.error('Erreur lors du chargement de l\'élément:', { element, error });
        element.classList.remove(lazyConfig.loadingClass);
        element.classList.add('lazy-error');
    };
    
    // Charger l'élément
    if (element.tagName.toLowerCase() === 'img') {
        const img = /** @type {HTMLImageElement} */ (element);
        
        // Créer une nouvelle image pour le préchargement
        const tempImg = new Image();
        
        // Si des dimensions sont définies dans data-width et data-height
        const width = img.getAttribute('data-width');
        const height = img.getAttribute('data-height');
        
        if (width) img.width = parseInt(width, 10);
        if (height) img.height = parseInt(height, 10);
        
        // Gestion du chargement et des erreurs
        tempImg.onload = () => {
            // Mettre à jour la source de l'image réelle
            img.src = src;
            if (srcset) img.srcset = srcset;
            if (sizes) img.sizes = sizes;
            
            // Si l'image est déjà en cache, onload ne se déclenchera pas
            if (img.complete) {
                onLoad();
            } else {
                img.onload = onLoad;
                img.onerror = onError;
            }
        };
        
        tempImg.onerror = onError;
        tempImg.src = src;
        
    } else if (element.tagName.toLowerCase() === 'iframe') {
        // Pour les iframes, on définit simplement la source
        element.onload = onLoad;
        element.onerror = onError;
        element.src = src;
    }
}

/**
 * Initialise le chargement différé avec Intersection Observer
 * @param {Object} options - Options de configuration
 */
function initLazyLoad(options = {}) {
    // Fusionner la configuration
    const config = { ...lazyConfig, ...options };
    
    // Fonction pour traiter un élément
    const processElement = (element) => {
        if (element.getAttribute('data-lazy-loaded') === 'true') return;
        
        // Marquer l'élément comme étant en cours de traitement
        element.setAttribute('data-lazy-loaded', 'true');
        
        // Charger l'élément
        lazyLoadElement(element, (el) => {
            // Supprimer l'observateur après le chargement
            if (observer) {
                observer.unobserve(el);
            }
        });
    };
    
    // Récupérer tous les éléments à charger en différé
    const elements = document.querySelectorAll(config.selector);
    
    if (!elements.length) {
        if (config.debug) {
            console.log('Aucun élément à charger en différé trouvé avec le sélecteur:', config.selector);
        }
        return;
    }
    
    if (config.debug) {
        console.log(`Initialisation du chargement différé pour ${elements.length} éléments`);
    }
    
    let observer;
    
    // Utiliser Intersection Observer si disponible
    if (supportsIntersectionObserver()) {
        const observerOptions = {
            root: null,
            rootMargin: config.rootMargin,
            threshold: config.threshold
        };
        
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    processElement(entry.target);
                }
            });
        }, observerOptions);
        
        // Observer chaque élément
        elements.forEach(element => {
            observer.observe(element);
        });
        
        if (config.debug) {
            console.log('Utilisation de l\'Intersection Observer pour le chargement différé');
        }
    } else {
        // Fallback pour les navigateurs qui ne supportent pas Intersection Observer
        if (config.debug) {
            console.log('Intersection Observer non supporté, utilisation du fallback');
        }
        
        const lazyLoadFallback = () => {
            elements.forEach(element => {
                if (isInViewport(element)) {
                    processElement(element);
                }
            });
        };
        
        // Délai avant la première vérification
        if (config.delay > 0) {
            setTimeout(lazyLoadFallback, config.delay);
        } else {
            lazyLoadFallback();
        }
        
        // Écouter le défilement et le redimensionnement
        const scrollHandler = () => {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(lazyLoadFallback);
            } else {
                setTimeout(lazyLoadFallback, 100);
            }
        };
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
        window.addEventListener('resize', scrollHandler);
        
        // Vérifier également après le chargement complet de la page
        window.addEventListener('load', lazyLoadFallback);
    }
    
    // Exposer une méthode pour forcer le chargement d'un élément
    window.forceLazyLoad = (selector) => {
        const element = typeof selector === 'string' 
            ? document.querySelector(selector) 
            : selector;
            
        if (element && element.matches(lazyConfig.selector)) {
            processElement(element);
            return true;
        }
        
        return false;
    };
    
    // Retourner l'instance de l'observer (peut être utile pour le nettoyage)
    return observer;
}

// Démarrer automatiquement au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    // Délai optionnel pour permettre au reste de la page de se charger
    setTimeout(() => {
        initLazyLoad({
            debug: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        });
    }, 0);
});

// Exposer les fonctions pour une utilisation externe
window.LazyLoad = {
    init: initLazyLoad,
    load: window.forceLazyLoad,
    config: lazyConfig
};
