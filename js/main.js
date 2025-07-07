
// Protection artwork globale - Sarah-Jane Iffra
function validateArtwork(artwork) {
    if (!artwork) {
        console.warn(' Artwork undefined');
        return {
            src: './images/placeholder.jpg',
            title: 'Untitled',
            technique: 'Mixed Media',
            year: '2024'
        };
    }
    
    // Valider et corriger artwork.src
    if (!artwork.src || artwork.src === 'undefined' || typeof artwork.src !== 'string') {
        console.warn(' artwork.src invalide:', artwork.src, '- correction appliquée');
        artwork.src = './images/placeholder.jpg';
    }
    
    // Valider autres propriétés
    artwork.title = artwork.title || 'Untitled';
    artwork.technique = artwork.technique || 'Mixed Media';
    artwork.year = artwork.year || '2024';
    
    return artwork;
}

// Intercepter tous les appels à displayFilteredArtworks
const originalDisplayFiltered = window.displayFilteredArtworks;
if (typeof originalDisplayFiltered === 'function') {
    window.displayFilteredArtworks = function(artworks) {
        console.log('🛡️ Protection displayFilteredArtworks');
        
        if (!artworks || !Array.isArray(artworks)) {
            console.warn('⚠️ artworks invalide:', artworks);
            return;
        }
        
        // Valider chaque artwork
        const safeArtworks = artworks.map(artwork => validateArtwork(artwork));
        
        return originalDisplayFiltered.call(this, safeArtworks);
    };
}


/**
 * JavaScript principal pour le site de Sarah Jane Iffra
 * Gère la navigation, les animations, la galerie et les fonctionnalités interactives
 */

document.addEventListener('DOMContentLoaded', function() {
    // Navigation mobile
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Chargement artistique de la galerie
    loadArtisticGallery();
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Variables globales pour les effets modernes
let mouseX = 0;
let mouseY = 0;
let particles = [];

/**
 * Gère la soumission du formulaire de contact
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    
    // Validation basique
    if (!formValues.name || !formValues.email || !formValues.message) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }
    
    // Simulation d'envoi (à remplacer par un vrai appel API)
    console.log('Formulaire soumis avec succès:', formValues);
    
    // Afficher un message de succès
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.textContent = 'Votre message a été envoyé avec succès !';
    
    form.reset();
    form.appendChild(successMessage);
    
    // Supprimer le message après 5 secondes
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/**
 * Initialise la navigation principale
 */
function initNavigation() {
    // Fermer le menu mobile lors du clic sur un lien
    const navLinks = document.querySelectorAll('.nav-links a');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
            
            // Désélectionner tous les liens
            navLinks.forEach(l => l.classList.remove('active'));
            // Sélectionner le lien cliqué
            link.classList.add('active');
        });
    });
    
    // Fermer le menu lors du défilement
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (Math.abs(currentScroll - lastScroll) > 50) {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
            lastScroll = currentScroll;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des nouveaux composants
    initModernEffects();
    initCustomCursor();
    initParticleSystem();
    initScrollProgress();
    initCounterAnimations();
    initTypewriterEffect();
    initMusicVisualizer();
    
    // Initialisation des composants existants
    initNavigation();
    // initVideos() corrigé
if (typeof initVideos === 'function') {
    initVideos();
} else {
    console.log(' initVideos pas disponible - crétion locale');
    // Version locale simplifiée
    const videoContainers = document.querySelectorAll('.video-container, video[data-src]');
    videoContainers.forEach(el => {
        if (el.dataset.src && el.tagName === 'VIDEO') {
            el.src = el.dataset.src;
        }
    });
}
    // initGallery() corrigé
if (typeof initGallery === 'function') {
    initGallery();
} else {
    console.log(' initGallery pas disponible - initialisation locale');
    // Version locale simplifiée de la galerie
    try {
        const galleryItems = document.querySelectorAll('.gallery-item, .artwork-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const img = this.querySelector('img');
                if (img && img.src && img.src !== 'undefined') {
                    // Afficher l'image en grand ou action par défaut
                    console.log(' Clic galerie:', img.alt || 'Image');
                }
            });
        });
        console.log('✅ Galerie initialisée localement');
    } catch (error) {
        console.warn('⚠️ Erreur init galerie locale:', error);
    }
}
    initAnimations();
    initBackToTop();
    initContactForm();
    initScrollSpy();
    initLazyLoading();
    initServiceWorker();
});

/**
 * Effets modernes et interactifs
 */
function initModernEffects() {
    // Suivi de la souris pour les effets
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        
        // Mise à jour des variables CSS
        document.documentElement.style.setProperty('--mouse-x', mouseX + '%');
        document.documentElement.style.setProperty('--mouse-y', mouseY + '%');
    });
    
    // Parallax moderne
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax notes musicales
        const notes = document.querySelectorAll('.note');
        notes.forEach((note, index) => {
            const speed = (index + 1) * 0.2;
            note.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/**
 * Curseur personnalisé futuriste
 */
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Effets sur hover
    const hoverElements = document.querySelectorAll('a, button, .gallery-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, var(--neon-pink), transparent)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, var(--neon-blue), transparent)';
        });
    });
}

/**
 * Système de particules interactif
 */
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Créer des particules
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // Mouvement des particules
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebond sur les bords
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Attraction vers la souris
            const dx = mouseX * canvas.width / 100 - particle.x;
            const dy = mouseY * canvas.height / 100 - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.vx += dx * 0.0001;
                particle.vy += dy * 0.0001;
            }
            
            // Dessiner la particule
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 245, 255, ${particle.opacity})`;
            ctx.fill();
            
            // Connexions entre particules
            particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 80) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - distance / 80)})`;
                        ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/**
 * Barre de progression du scroll
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
    });
}

/**
 * Animations des compteurs
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const increment = target / 100;
                
                const updateCounter = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Effet machine à écrire
 */
function initTypewriterEffect() {
    const texts = ['Artiste', 'Compositrice', 'Créatrice', 'Innovatrice'];
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriter.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

/**
 * Visualiseur musical (simulation)
 */
function initMusicVisualizer() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Créer des barres de visualisation
    const visualizer = document.createElement('div');
    visualizer.className = 'music-visualizer';
    visualizer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    `;
    hero.appendChild(visualizer);
    
    const barCount = 30;
    const bars = [];
    
    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.cssText = `
            position: absolute;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to top, var(--neon-pink), transparent);
            opacity: 0.7;
        `;
        visualizer.appendChild(bar);
        bars.push(bar);
    }
    
    function animateVisualizer() {
        bars.forEach((bar, index) => {
            const height = Math.random() * 100;
            bar.style.height = height + '%';
            bar.style.transform = `translateX(${index * 3}px)`;
        });
        
        requestAnimationFrame(animateVisualizer);
    }
    
    animateVisualizer();
}

/**
 * Charge et affiche la galerie artistique avec filtrage par catégorie
 */
async function loadArtisticGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    // Créer le conteneur de la galerie
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'gallery-grid';
    gallery.innerHTML = '';
    gallery.appendChild(galleryContainer);

    // Données des œuvres avec les chemins d'accès corrects
    const artworks = [
        {
            title: 'Univers Cosmique',
            description: 'Exploration des profondeurs spatiales',
            category: 'digital-art'
        },
        {
            src: './images/gallery/IMG_20250531_121300_188.jpg',
            title: 'Horizons Lointains',
            description: 'Paysages imaginaires',
            category: 'photography'
        },
        {
            src: './images/gallery/IMG_20250531_121432_334.jpg',
            title: 'Abstractions',
            description: 'Formes et couleurs',
            category: 'abstract'
        },
        {
            src: './images/gallery/IMG_20250531_121521_215.jpg',
            title: 'Éléments Naturels',
            description: 'La beauté de la nature',
            category: 'nature'
        },
        {
            src: './images/gallery/IMG_20250531_121311_304.jpg',
            title: 'Horizons Infinis',
            description: 'Paysages oniriques',
            category: 'photography'
        },
        {
            src: './images/gallery/IMG_20250531_121451_526.jpg',
            title: 'Abstractions Colorées',
            description: 'Jeu de couleurs et de formes',
            category: 'abstract'
        },
        {
            src: './images/gallery/IMG_20250531_121503_326.jpg',
            title: 'Nature Sauvage',
            description: 'La beauté à l\'état brut',
            category: 'nature'
        }
    ];

    // Créer les filtres de catégorie
    createCategoryFilters(artworks, galleryContainer);

    // Afficher toutes les œuvres initialement
    displayFilteredArtworks(artworks, galleryContainer, 'all');

    // Animation d'apparition séquentielle
    animateGalleryItems();
}

/**
 * Crée les filtres de catégorie pour la galerie
 */
function createCategoryFilters(artworks, container) {
    // Récupérer toutes les catégories uniques
    const categories = ['all', ...new Set(artworks.map(artwork => artwork.category))];
    
    // Créer le conteneur des filtres
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'gallery-filters';
    
    // Ajouter les boutons de filtre
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `filter-btn ${category === 'all' ? 'active' : ''}`;
        button.textContent = formatCategoryName(category);
        button.dataset.filter = category;
        
        button.addEventListener('click', () => {
            // Mettre à jour les boutons actifs
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Filtrer les œuvres
            displayFilteredArtworks(artworks, container, category);
        });
        
        filtersContainer.appendChild(button);
    });
    
    // Insérer les filtres avant la galerie
    container.parentNode.insertBefore(filtersContainer, container);
}

/**
 * Affiche les œuvres filtrées par catégorie
 */
async function displayFilteredArtworks(artworks, container, category) {
    // Afficher l'état de chargement
    container.innerHTML = '<div class="loading-placeholder"></div>';
    
    // Filtrer les œuvres
    const filteredArtworks = category === 'all' 
        ? artworks 
        : artworks.filter(artwork => artwork.category === category);
    
    // Vider le conteneur
    container.innerHTML = '';
    
    // Charger et afficher les œuvres filtrées
    const loadingPromises = filteredArtworks.map(async (artwork, index) => {
        try {
            const exists = await checkImageExists(artwork.src);
            if (exists) {
                const galleryItem = createArtisticGalleryItem(artwork, index);
                container.appendChild(galleryItem);
            } else {
                const placeholder = createPlaceholderItem(artwork, index);
                container.appendChild(placeholder);
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'image:', artwork.src, error);
            const errorItem = createErrorItem(artwork, index);
            container.appendChild(errorItem);
        }
    });
    
    // Attendre que toutes les images soient chargées
    await Promise.all(loadingPromises);
    
    // Animer les éléments de la galerie
    animateGalleryItems();
}

/**
 * Vérifie si une image existe à l'URL spécifiée
 */
function checkImageExists(path) {
    return new Promise((resolve) => {
        // Vérifier le path avant de créer l'image
        if (!path || path === 'undefined' || typeof path !== 'string') {
            console.warn('🚫 checkImageExists: path invalide:', path);
            resolve(false);
            return;
        }

        console.log('🔍 Vérification image:', path);

        const img = new Image();

        img.onload = () => {
            console.log('✅ Image trouvée:', path);
            resolve(true);
        };

        img.onerror = () => {
            console.warn('❌ Image non trouvée:', path);
            resolve(false);
        };

        // Assigner src en dernier, après les handlers
        img.src = path;
    });
}

/**
 * Crée un élément d'erreur pour une image non chargée
 * ...
 */

function createErrorItem(artwork, index) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'gallery-item error-item';
    errorDiv.style.setProperty('--index', index);
    errorDiv.innerHTML = `
        <div class="error-placeholder">
            <div class="error-content">
                <span class="error-icon">❌</span>
                <p>Erreur de chargement</p>
                <small>${artwork.title || 'Image non disponible'}</small>
            </div>
        </div>
    `;
    return errorDiv;
}

/**
 * Anime les éléments de la galerie avec un délai séquentiel
 */
function animateGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        // Réinitialiser l'animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        // Démarrer l'animation avec un délai
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Formate le nom de la catégorie pour l'affichage
 */
function formatCategoryName(category) {
    if (category === 'all') return 'Tout voir';
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

/**
 * Crée un élément de remplacement pendant le chargement d'une image
 */
/**
 * Crée un élément de remplacement pendant le chargement d'une image
 */
function createPlaceholderItem(artwork) {
    console.log(' createPlaceholderItem appelé avec:', artwork);
    
    // Vérification sécurisée de l'artwork
    if (!artwork) {
        console.warn(' createPlaceholderItem: artwork undefined');
        return document.createElement('div');
    }
    
    // Vérifier artwork.src
    let imageSrc = '';
    if (artwork.src && typeof artwork.src === 'string' && artwork.src !== 'undefined') {
        imageSrc = artwork.src;
        console.log(' Image src valide:', imageSrc);
    } else {
        console.warn(' artwork.src invalide:', artwork.src);
        imageSrc = './images/placeholder.jpg'; // Image par défaut
    }
    
    const placeholderDiv = document.createElement('div');
    placeholderDiv.className = 'gallery-item placeholder-item';
    
    // HTML sécurisé
    placeholderDiv.innerHTML = `
        <div class="artwork-container">
            <img src="${imageSrc}" 
                 alt="${artwork.title || 'Artwork Sarah-Jane Iffra'}" 
                 class="artwork-image"
                 onerror="this.src='./images/placeholder.jpg'; console.warn('Image non trouvée:', this.src);">
            <div class="artwork-info"></div>
        </div>
    `;
    return placeholderDiv;
}







// Auto-populate gallery avec les vraies images
// [Copie tout le contenu du premier artifact ici]
