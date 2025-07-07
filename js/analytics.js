/**
 * Configuration et gestion de l'analyse d'audience
 * Support pour Google Analytics, Facebook Pixel, Hotjar, etc.
 */

// Configuration de base
const analyticsConfig = {
    // Activer/désactiver le mode développement (ne pas envoyer de données en développement)
    debug: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    
    // Configuration Google Analytics (GA4)
    googleAnalytics: {
        enabled: true,
        measurementId: 'G-XXXXXXXXXX', // À remplacer par votre ID de mesure GA4
        anonymizeIp: true,
        trackPageView: true,
        enhancedMeasurement: true
    },
    
    // Configuration Facebook Pixel
    facebookPixel: {
        enabled: true,
        pixelId: 'XXXXXXXXXXXXXXX', // À remplacer par votre ID de pixel Facebook
        trackPageView: true
    },
    
    // Configuration Hotjar
    hotjar: {
        enabled: true,
        hjid: 1234567, // À remplacer par votre ID Hotjar
        hjsv: 6
    },
    
    // Configuration des cookies
    cookies: {
        enabled: true,
        name: 'analytics_consent',
        expires: 365, // jours
        sameSite: 'Lax'
    },
    
    // Paramètres par défaut des événements
    defaults: {
        category: 'general',
        label: null,
        value: null,
        nonInteraction: false
    }
};

// Vérifier le consentement aux cookies
function hasConsent() {
    if (!analyticsConfig.cookies.enabled) return true;
    
    const consent = getCookie(analyticsConfig.cookies.name);
    return consent === 'true';
}

// Obtenir la valeur d'un cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Définir un cookie
function setCookie(name, value, days = 365) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/; SameSite=${analyticsConfig.cookies.sameSite}`;
}

// Google Analytics
function initGoogleAnalytics() {
    if (!analyticsConfig.googleAnalytics.enabled || !hasConsent()) return;
    
    const { measurementId } = analyticsConfig.googleAnalytics;
    
    if (!measurementId) {
        console.warn('Google Analytics: Aucun ID de mesure configuré');
        return;
    }
    
    // Chargement asynchrone de Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    
    gtag('js', new Date());
    gtag('config', measurementId, {
        'anonymize_ip': analyticsConfig.googleAnalytics.anonymizeIp,
        'send_page_view': analyticsConfig.googleAnalytics.trackPageView
    });
    
    // Ajouter le script Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    
    console.log('Google Analytics initialisé avec succès');
}

// Facebook Pixel
function initFacebookPixel() {
    if (!analyticsConfig.facebookPixel.enabled || !hasConsent()) return;
    
    const { pixelId } = analyticsConfig.facebookPixel;
    
    if (!pixelId) {
        console.warn('Facebook Pixel: Aucun ID de pixel configuré');
        return;
    }
    
    // Code d'initialisation du pixel Facebook
    !function(f,b,e,v,n,t,s) {
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
    }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', pixelId);
    
    if (analyticsConfig.facebookPixel.trackPageView) {
        fbq('track', 'PageView');
    }
    
    console.log('Facebook Pixel initialisé avec succès');
}

// Hotjar
function initHotjar() {
    if (!analyticsConfig.hotjar.enabled || !hasConsent()) return;
    
    const { hjid, hjsv } = analyticsConfig.hotjar;
    
    if (!hjid || !hjsv) {
        console.warn('Hotjar: ID ou version non configuré');
        return;
    }
    
    // Code d'initialisation de Hotjar
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:hjid,hjsv:hjsv};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    
    console.log('Hotjar initialisé avec succès');
}

// Suivi des événements
const trackEvent = (function() {
    // Fonction de suivi d'événement générique
    function track(category, action, label, value, nonInteraction) {
        if (!hasConsent()) return;
        
        const eventData = {
            event_category: category || analyticsConfig.defaults.category,
            event_label: label || analyticsConfig.defaults.label,
            value: value || analyticsConfig.defaults.value,
            non_interaction: nonInteraction !== undefined ? nonInteraction : analyticsConfig.defaults.nonInteraction
        };
        
        // Google Analytics
        if (window.gtag) {
            gtag('event', action, eventData);
        }
        
        // Facebook Pixel
        if (window.fbq) {
            fbq('trackCustom', action, {
                category: eventData.event_category,
                label: eventData.event_label,
                value: eventData.value
            });
        }
        
        // Hotjar
        if (window.hj) {
            window.hj('event', action, {
                category: eventData.event_category,
                label: eventData.event_label,
                value: eventData.value
            });
        }
        
        if (analyticsConfig.debug) {
            console.log('Événement suivi:', { action, ...eventData });
        }
    }
    
    // Méthodes utilitaires pour des événements courants
    return {
        // Suivi de page vue
        pageView: function(pagePath, pageTitle) {
            if (window.gtag) {
                gtag('config', analyticsConfig.googleAnalytics.measurementId, {
                    'page_path': pagePath,
                    'page_title': pageTitle || document.title
                });
            }
            
            if (window.fbq && analyticsConfig.facebookPixel.trackPageView) {
                fbq('track', 'PageView');
            }
            
            if (analyticsConfig.debug) {
                console.log('Page vue:', { pagePath, pageTitle: pageTitle || document.title });
            }
        },
        
        // Suivi d'événement personnalisé
        event: track,
        
        // Événements courants
        download: function(fileName) {
            track('download', 'file_download', fileName);
        },
        
        externalLink: function(url) {
            track('external', 'external_link_click', url);
        },
        
        formSubmit: function(formId, formName) {
            track('forms', 'form_submit', formName || formId);
        },
        
        video: {
            play: function(videoTitle) {
                track('video', 'video_play', videoTitle);
            },
            pause: function(videoTitle) {
                track('video', 'video_pause', videoTitle);
            },
            complete: function(videoTitle) {
                track('video', 'video_complete', videoTitle);
            }
        },
        
        social: {
            share: function(platform, contentUrl) {
                track('social', 'share', platform, null, contentUrl);
            },
            like: function(platform, contentUrl) {
                track('social', 'like', platform, null, contentUrl);
            }
        }
    };
})();

// Suivi des erreurs JavaScript
function trackErrors() {
    if (!hasConsent()) return;
    
    window.onerror = function(message, source, lineno, colno, error) {
        const errorData = {
            message: error && error.message ? error.message : message,
            source: source,
            line: lineno,
            column: colno,
            stack: error && error.stack ? error.stack : 'N/A'
        };
        
        if (window.gtag) {
            gtag('event', 'exception', {
                description: JSON.stringify(errorData),
                fatal: true
            });
        }
        
        console.error('Erreur JavaScript:', errorData);
    };
}

// Initialisation des analyses
function initAnalytics() {
    if (analyticsConfig.debug) {
        console.log('Mode débogage activé - Aucune donnée ne sera envoyée');
    }
    
    // Vérifier le consentement
    if (!hasConsent()) {
        console.log('Suivi désactivé - Aucun consentement');
        return;
    }
    
    // Initialiser les services d'analyse
    initGoogleAnalytics();
    initFacebookPixel();
    initHotjar();
    
    // Suivi des erreurs
    trackErrors();
    
    // Suivi des téléchargements
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[download]');
        if (link) {
            const fileName = link.getAttribute('download') || link.href.split('/').pop();
            trackEvent.download(fileName);
        }
    });
    
    // Suivi des liens externes
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="http"]');
        if (link && !link.href.includes(window.location.hostname)) {
            trackEvent.externalLink(link.href);
        }
    });
    
    console.log('Analyse d\'audience initialisée');
}

// Exposer les fonctions pour une utilisation externe
window.Analytics = {
    init: initAnalytics,
    track: trackEvent,
    config: analyticsConfig,
    setConsent: function(granted) {
        setCookie(analyticsConfig.cookies.name, granted, analyticsConfig.cookies.expires);
        if (granted) {
            initAnalytics();
        }
    }
};

// Démarrer l'analyse au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si la gestion du consentement est nécessaire
    const consentBanner = document.getElementById('cookie-consent-banner');
    
    if (consentBanner) {
        // Afficher la bannière de consentement si nécessaire
        if (!hasConsent() && getCookie(analyticsConfig.cookies.name) === null) {
            consentBanner.style.display = 'block';
        }
        
        // Gérer les boutons de consentement
        const acceptBtn = document.querySelector('.cookie-accept');
        const rejectBtn = document.querySelector('.cookie-reject');
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                window.Analytics.setConsent(true);
                consentBanner.style.display = 'none';
            });
        }
        
        if (rejectBtn) {
            rejectBtn.addEventListener('click', function() {
                window.Analytics.setConsent(false);
                consentBanner.style.display = 'none';
            });
        }
    } else if (hasConsent()) {
        // Si pas de bannière et consentement déjà donné, initialiser
        initAnalytics();
    }
});

// Initialisation automatique si le consentement est déjà donné
if (hasConsent()) {
    document.addEventListener('DOMContentLoaded', initAnalytics);
}
