/**
 * Gestion du header et de la navigation mobile
 */
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    let lastScroll = 0;

    // Gestion du menu burger
    burger.addEventListener('click', function() {
        // Animation du burger
        burger.classList.toggle('active');
        
        // Affichage du menu
        navLinks.classList.toggle('active');
        
        // Animation des liens
        if (navLinks.classList.contains('active')) {
            // Menu ouvert - animation d'entrée
            navItems.forEach((link, index) => {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
        } else {
            // Menu fermé - réinitialisation de l'animation
            navItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // Fermer le menu quand on clique sur un lien
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Gestion du header au défilement
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Ajout/suppression de la classe 'scrolled' selon la position de défilement
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animation de masquage/affichage du header au défilement
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
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
        
        lastScroll = currentScroll;
    });

    // Fermer le menu si la fenêtre est redimensionnée au-dessus de 768px
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
            navItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // Animation de transition des liens
    const navLinksAll = document.querySelectorAll('.nav-links a');
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            // Animation de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Désactiver le comportement par défaut si c'est un lien d'ancrage
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Ajuster selon la hauteur du header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Ajout de l'animation pour les liens du menu
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
