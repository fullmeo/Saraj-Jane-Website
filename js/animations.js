/**
 * Animations avancées pour le site de Sarah Jane Iffra
 * Ces animations ajoutent des effets visuels subtils pour améliorer l'expérience utilisateur
 */

// Fonction utilitaire pour le délai
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Animation d'entrée des éléments au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Si l'élément est dans la fenêtre visible
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Animation de l'en-tête au défilement
    const header = document.querySelector('header') || document.querySelector('.site-header');
    let lastScroll = 0;
    
    const handleScroll = debounce(function() {
        const currentScroll = window.pageYOffset;
        
        if (header) {
            // Animation de l'en-tête rétréci au défilement
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Masquer/afficher l'en-tête au défilement
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                lastScroll = currentScroll;
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                // Défilement vers le bas
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                // Défilement vers le haut
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
        }
        
        lastScroll = currentScroll;
        animateOnScroll();
        
        // Parallax effect pour le hero (optimisé)
        const hero = document.querySelector('.hero');
        if (hero && currentScroll < window.innerHeight) {
            const speed = currentScroll * 0.3;
            hero.style.transform = `translateY(${speed}px)`;
        }
        
        // Animation du bouton back-to-top
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            if (currentScroll > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });
    
    window.addEventListener('scroll', handleScroll);
    
    // Animation du bouton de retour en haut
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animation des éléments de la galerie
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Animation séquentielle
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-fadeInUp');
        
        const img = item.querySelector('img');
        if (!img) return;
        
        // Créer l'overlay seulement s'il n'existe pas
        if (!item.querySelector('.gallery-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            
            const title = document.createElement('div');
            title.className = 'gallery-item-title';
            title.textContent = img.alt || 'Voir l\'image';
            
            const zoomIcon = document.createElement('span');
            zoomIcon.className = 'zoom-icon';
            zoomIcon.innerHTML = '🔍';
            
            overlay.appendChild(title);
            overlay.appendChild(zoomIcon);
            item.appendChild(overlay);
        }
        
        // Animation au survol
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) overlay.style.opacity = '1';
            if (img) img.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) overlay.style.opacity = '0';
            if (img) img.style.transform = 'scale(1)';
        });
    });
    
    // Animation des boutons avec effet ripple
    const buttons = document.querySelectorAll('.btn, .social-links a, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 1000);
        });
    });
    
    // Animation du texte hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-fadeInUp');
    }
    
    // Initialisation
    animateOnScroll();
});
