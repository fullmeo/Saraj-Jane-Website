// ====================================
// SOCIAL FEED AUTOMATIQUE
// Récupération des actualités depuis les réseaux sociaux
// ====================================

class SocialFeedManager {
    constructor() {
        this.youtubeChannelId = 'UCsarahjaneiffra'; // À remplacer par l'ID réel
        this.youtubeApiKey = 'YOUR_YOUTUBE_API_KEY'; // À configurer
        this.cache = new Map();
        this.cacheExpiry = 30 * 60 * 1000; // 30 minutes
    }

    // Initialisation
    async init() {
        try {
            await this.loadYouTubeVideos();
            await this.loadFacebookEvents();
            await this.loadInstagramPosts();
            this.updateBlogSection();
        } catch (error) {
            console.warn('Erreur lors du chargement des réseaux sociaux:', error);
            this.loadFallbackContent();
        }
    }

    // Récupération des vidéos YouTube
    async loadYouTubeVideos() {
        if (!this.youtubeApiKey || this.youtubeApiKey === 'YOUR_YOUTUBE_API_KEY') {
            console.warn('Clé API YouTube non configurée');
            return;
        }

        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?` +
                `part=snippet&channelId=${this.youtubeChannelId}&` +
                `order=date&maxResults=5&key=${this.youtubeApiKey}`
            );

            if (!response.ok) throw new Error('Erreur API YouTube');

            const data = await response.json();
            const videos = data.items.map(item => ({
                title: item.snippet.title,
                description: item.snippet.description,
                publishedAt: new Date(item.snippet.publishedAt),
                thumbnail: item.snippet.thumbnails.medium.url,
                videoId: item.id.videoId,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`
            }));

            this.cache.set('youtube', {
                data: videos,
                timestamp: Date.now()
            });

        } catch (error) {
            console.error('Erreur YouTube API:', error);
        }
    }

    // Récupération des événements Facebook (via Graph API)
    async loadFacebookEvents() {
        // Note: Nécessite une app Facebook et des permissions
        // Pour l'instant, on utilise des données simulées
        const events = [
            {
                title: "Concert Tribute Amy Winehouse",
                date: new Date('2025-07-15'),
                location: "Lyon, France",
                description: "Spectacle tribute Amy Winehouse avec playlist audio",
                url: "https://facebook.com/events/..."
            },
            {
                title: "Coaching Vocal - Session Groupe",
                date: new Date('2025-07-20'),
                location: "Vénissieux, France",
                description: "Atelier technique vocale pour débutants",
                url: "https://facebook.com/events/..."
            }
        ];

        this.cache.set('facebook', {
            data: events,
            timestamp: Date.now()
        });
    }

    // Récupération des posts Instagram (via Basic Display API)
    async loadInstagramPosts() {
        // Note: Nécessite une app Instagram et des permissions
        // Pour l'instant, on utilise des données simulées
        const posts = [
            {
                title: "Backstage du dernier concert",
                description: "Préparation avant le show tribute Amy Winehouse",
                publishedAt: new Date('2025-06-20'),
                image: "images/gallery/IMG_20250531_121533_522.jpg",
                url: "https://instagram.com/p/..."
            },
            {
                title: "Nouveau titre en préparation",
                description: "Enregistrement studio pour le prochain single",
                publishedAt: new Date('2025-06-18'),
                image: "images/gallery/IMG_20250531_121300_188.jpg",
                url: "https://instagram.com/p/..."
            }
        ];

        this.cache.set('instagram', {
            data: posts,
            timestamp: Date.now()
        });
    }

    // Mise à jour de la section blog
    updateBlogSection() {
        const blogContainer = document.getElementById('blog-feed');
        if (!blogContainer) return;

        const allContent = [];
        
        // Ajouter les vidéos YouTube
        const youtubeData = this.cache.get('youtube');
        if (youtubeData && youtubeData.data) {
            youtubeData.data.forEach(video => {
                allContent.push({
                    type: 'youtube',
                    title: video.title,
                    description: video.description.substring(0, 150) + '...',
                    date: video.publishedAt,
                    url: video.url,
                    thumbnail: video.thumbnail,
                    icon: '🎥'
                });
            });
        }

        // Ajouter les événements Facebook
        const facebookData = this.cache.get('facebook');
        if (facebookData && facebookData.data) {
            facebookData.data.forEach(event => {
                allContent.push({
                    type: 'facebook',
                    title: event.title,
                    description: `${event.location} - ${event.description}`,
                    date: event.date,
                    url: event.url,
                    icon: '📅'
                });
            });
        }

        // Ajouter les posts Instagram
        const instagramData = this.cache.get('instagram');
        if (instagramData && instagramData.data) {
            instagramData.data.forEach(post => {
                allContent.push({
                    type: 'instagram',
                    title: post.title,
                    description: post.description,
                    date: post.publishedAt,
                    url: post.url,
                    image: post.image,
                    icon: '📸'
                });
            });
        }

        // Trier par date et afficher
        allContent.sort((a, b) => b.date - a.date);
        this.renderBlogContent(allContent);
    }

    // Rendu du contenu blog
    renderBlogContent(content) {
        const blogContainer = document.getElementById('blog-feed');
        if (!blogContainer) return;

        blogContainer.innerHTML = content.map(item => `
            <article class="blog-post" onclick="window.open('${item.url}', '_blank')">
                <div class="blog-header">
                    <span class="blog-icon">${item.icon}</span>
                    <h3>${item.title}</h3>
                    <span class="blog-date">${this.formatDate(item.date)}</span>
                </div>
                <p>${item.description}</p>
                ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}" loading="lazy">` : ''}
                ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : ''}
            </article>
        `).join('');
    }

    // Formatage des dates
    formatDate(date) {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    }

    // Contenu de fallback
    loadFallbackContent() {
        const fallbackContent = [
            {
                type: 'manual',
                title: 'Prochain concert à Lyon – 15 juillet 2025',
                description: 'Retrouvez-moi sur scène pour un show tribute Amy Winehouse et mes chansons d\'alertes. Réservez vos places dès maintenant !',
                date: new Date('2025-07-15'),
                icon: '🎤'
            },
            {
                type: 'manual',
                title: 'Nouveau titre disponible : "Soirées Parisiennes"',
                description: 'Découvrez mon nouveau morceau engagé, disponible sur YouTube et toutes les plateformes.',
                date: new Date('2025-06-10'),
                icon: '🎶'
            },
            {
                type: 'manual',
                title: 'Astuce coaching vocal : Gérer le trac avant un concert',
                description: 'Quelques conseils pour aborder la scène avec confiance et plaisir. À lire pour tous les chanteurs !',
                date: new Date('2025-06-01'),
                icon: '🎓'
            }
        ];

        this.cache.set('fallback', {
            data: fallbackContent,
            timestamp: Date.now()
        });
    }

    // Rafraîchissement automatique
    startAutoRefresh() {
        setInterval(() => {
            this.init();
        }, this.cacheExpiry);
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const socialFeed = new SocialFeedManager();
    socialFeed.init();
    socialFeed.startAutoRefresh();
});

// Fonction pour forcer le rafraîchissement
function refreshSocialFeed() {
    const socialFeed = new SocialFeedManager();
    socialFeed.init();
} 