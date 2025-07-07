// videos.js - Sarah-Jane Iffra Video Manager
// Requis par main.js ligne 130

console.log(' videos.js chargé avec succès');

/**
 * Fonction initVideos() - Appelée par main.js ligne 130
 */
function initVideos() {
    console.log(' Initialisation des vidéos Sarah-Jane...');
    
    try {
        // Rechercher tous les conteneurs vidéo
        const videoContainers = document.querySelectorAll(
            '.video-container, .video-item, .video-section, [data-video], .youtube-embed'
        );
        
        console.log(  conteneurs vidéo trouvés);
        
        if (videoContainers.length === 0) {
            console.log('ℹ Aucune vidéo à initialiser - OK');
            return true;
        }
        
        // Initialiser chaque conteneur
        videoContainers.forEach((container, index) => {
            initVideoContainer(container, index);
        });
        
        // Initialiser les vidéos YouTube intégrées
        initYouTubeVideos();
        
        console.log(' initVideos() terminé avec succès');
        return true;
        
    } catch (error) {
        console.error(' Erreur dans initVideos():', error);
        return false;
    }
}

/**
 * Initialiser un conteneur vidéo individuel
 */
function initVideoContainer(container, index) {
    if (!container) return;
    
    // Ajouter les classes CSS nécessaires
    container.classList.add('video-initialized');
    
    // Gérer les attributs data-video
    const videoSrc = container.getAttribute('data-video');
    const youtubeId = container.getAttribute('data-youtube');
    
    if (youtubeId) {
        createYouTubeEmbed(container, youtubeId);
    } else if (videoSrc) {
        createVideoElement(container, videoSrc);
    } else {
        // Conteneur vide - ajouter placeholder
        if (!container.innerHTML.trim()) {
            container.innerHTML = 
                <div class="video-placeholder">
                    <div class="video-icon">🎬</div>
                    <p>Espace vidéo </p>
                </div>
            ;
        }
    }
    
    console.log(✅ Conteneur vidéo  initialisé);
}

/**
 * Créer un embed YouTube
 */
function createYouTubeEmbed(container, videoId) {
    const iframe = document.createElement('iframe');
    iframe.src = https://www.youtube.com/embed/;
    iframe.width = '100%';
    iframe.height = '315';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    
    container.innerHTML = '';
    container.appendChild(iframe);
    console.log(📺 YouTube embed créé: );
}

/**
 * Créer un élément vidéo HTML5
 */
function createVideoElement(container, videoSrc) {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.controls = true;
    video.style.width = '100%';
    video.style.height = 'auto';
    
    container.innerHTML = '';
    container.appendChild(video);
    console.log( Vidéo HTML5 créée: );
}

/**
 * Initialiser toutes les vidéos YouTube
 */
function initYouTubeVideos() {
    const youtubeElements = document.querySelectorAll('[data-youtube]');
    youtubeElements.forEach(element => {
        const videoId = element.getAttribute('data-youtube');
        if (videoId) {
            createYouTubeEmbed(element, videoId);
        }
    });
    
    if (youtubeElements.length > 0) {
        console.log(  vidéos YouTube initialisées);
    }
}

/**
 * Fonction utilitaire pour charger une vidéo dynamiquement
 */
function loadVideo(containerId, videoSrc) {
    const container = document.getElementById(containerId);
    if (container && videoSrc) {
        createVideoElement(container, videoSrc);
        return true;
    }
    return false;
}

// Rendre les fonctions disponibles globalement
window.initVideos = initVideos;
window.loadVideo = loadVideo;
window.initYouTubeVideos = initYouTubeVideos;

// Auto-initialisation si DOM déjà chargé
if (document.readyState !== 'loading') {
    console.log(' DOM ready - initVideos peut être appelé');
} else {
    console.log(' DOM en cours de chargement...');
}

console.log(' Module videos.js prêt pour main.js ligne 130');
