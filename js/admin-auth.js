// Configuration de l'authentification Firebase
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const loginForm = document.getElementById('loginForm');
    const googleSignInBtn = document.getElementById('googleSignIn');
    const showEmailLoginBtn = document.getElementById('showEmailLogin');
    const togglePassword = document.querySelector('.toggle-password');
    const messageEl = document.getElementById('loginMessage');
    
    // Initialiser Firebase Auth
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    
    // Vérifier l'état d'authentification
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Utilisateur connecté
            if (window.location.pathname.includes('login.html') || 
                window.location.pathname.endsWith('admin/') ||
                window.location.pathname.endsWith('admin')) {
                // Rediriger vers le tableau de bord si déjà connecté
                window.location.href = 'dashboard.html';
            }
        } else {
            // Utilisateur non connecté
            if (!window.location.pathname.includes('login.html') && 
                !window.location.pathname.endsWith('admin/') &&
                !window.location.pathname.endsWith('admin')) {
                // Rediriger vers la page de connexion si non connecté
                window.location.href = 'index.html';
            }
        }
    });
    
    // Gestionnaire de connexion Google
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', signInWithGoogle);
    }
    
    // Afficher le formulaire de connexion par email
    if (showEmailLoginBtn) {
        showEmailLoginBtn.addEventListener('click', function() {
            loginForm.style.display = 'block';
            this.style.display = 'none';
            document.querySelector('.social-login').style.display = 'none';
        });
    }
    
    // Gestionnaire de soumission du formulaire de connexion
    if (loginForm) {
        loginForm.addEventListener('submit', handleEmailPasswordLogin);
    }
    
    // Gestionnaire pour le bouton de déconnexion
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Basculer la visibilité du mot de passe
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // Gestionnaire pour le téléchargement d'images
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        setupFileUpload();
    }
    
    // Fonction de connexion avec Google
    async function signInWithGoogle() {
        try {
            const result = await auth.signInWithPopup(provider);
            // Vérifier si l'email est autorisé
            const allowedEmails = ['ifrasoleil.@gmail.com'];
            if (allowedEmails.length > 0 && !allowedEmails.includes(result.user.email)) {
                await auth.signOut();
                showMessage(messageEl, "Accès non autorisé avec cet email.", 'error');
                return;
            }
            
            // Rediriger vers le tableau de bord après connexion réussie
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Erreur de connexion avec Google:', error);
            showMessage(messageEl, "Échec de la connexion avec Google. Veuillez réessayer.", 'error');
        }
    }
    
    // Fonction de connexion avec email/mot de passe
    async function handleEmailPasswordLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            // Rediriger vers le tableau de bord après connexion réussie
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Erreur de connexion:', error);
            let errorMessage = "Échec de la connexion. Veuillez vérifier vos identifiants.";
            
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = "Email ou mot de passe incorrect.";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Trop de tentatives échouées. Veuillez réessayer plus tard.";
            }
            
            showMessage(messageEl, errorMessage, 'error');
        }
    }
    
    // Fonction de déconnexion
    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            showMessage(messageEl, "Une erreur est survenue lors de la déconnexion.", 'error');
        }
    }
    
    // Fonction utilitaire pour afficher des messages
    function showMessage(element, message, type) {
        if (!element) return;
        
        element.textContent = message;
        element.className = 'message';
        element.classList.add(type);
        element.style.display = 'block';
        
        // Masquer le message après 5 secondes
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
});

// Vérifier le statut d'authentification
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('adminAuthenticated') === 'true';
    const isLoginPage = window.location.pathname.includes('login.html');
    const isAdminPage = window.location.pathname.includes('admin/');
    
    if (isLoggedIn && isLoginPage) {
        // Rediriger vers le tableau de bord si déjà connecté
        window.location.href = 'dashboard.html';
    } else if (!isLoggedIn && isAdminPage && !isLoginPage) {
        // Rediriger vers la page de connexion si non connecté
        window.location.href = 'login.html';
    } else if (isLoggedIn && isAdminPage) {
        // Afficher le tableau de bord
        document.body.classList.add('admin-dashboard');
    }
}

// Gérer la connexion
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('loginMessage');
    
    // Ici, vous devriez remplacer cela par une vérification côté serveur sécurisée
    // Ceci est une solution temporaire pour la démonstration
    if (username === 'admin' && password === 'admin123') {
        // Enregistrer l'état de connexion (dans un environnement de production, utilisez des jetons JWT ou des sessions sécurisées)
        localStorage.setItem('adminAuthenticated', 'true');
        
        // Afficher un message de succès
        showMessage(messageEl, 'Connexion réussie ! Redirection en cours...', 'success');
        
        // Rediriger vers le tableau de bord après un court délai
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        // Afficher un message d'erreur
        showMessage(messageEl, 'Identifiants incorrects. Veuillez réessayer.', 'error');
    }
}

// Gérer la déconnexion
function handleLogout() {
    // Supprimer l'état de connexion
    localStorage.removeItem('adminAuthenticated');
    
    // Rediriger vers la page de connexion
    window.location.href = 'login.html';
}

// Afficher un message
function showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = 'message';
    element.classList.add(type);
    element.style.display = 'block';
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// Configuration du téléchargement de fichiers
function setupFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Gérer le glisser-déposer
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Effets visuels pour le glisser-déposer
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        uploadArea.classList.add('highlight');
    }
    
    function unhighlight() {
        uploadArea.classList.remove('highlight');
    }
    
    // Gérer le dépôt de fichiers
    uploadArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    // Gérer la sélection de fichiers via le bouton
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    // Charger les images existantes
    loadGalleryImages();
}

// Gérer les fichiers téléchargés
function handleFiles(files) {
    const messageEl = document.getElementById('uploadMessage');
    
    // Vérifier si des fichiers ont été sélectionnés
    if (files.length === 0) {
        showMessage(messageEl, 'Aucun fichier sélectionné.', 'error');
        return;
    }
    
    // Vérifier le type de fichier
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = Array.from(files).filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
        showMessage(messageEl, 'Seuls les fichiers JPG, PNG, GIF et WebP sont acceptés.', 'error');
        return;
    }
    
    // Afficher un message de chargement
    showMessage(messageEl, 'Téléchargement en cours...', 'success');
    
    // Ici, vous devriez envoyer les fichiers au serveur
    // Ceci est une simulation pour la démonstration
    setTimeout(() => {
        showMessage(messageEl, 'Images téléchargées avec succès !', 'success');
        // Recharger la galerie
        loadGalleryImages();
    }, 1500);
}

// Charger les images de la galerie
function loadGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    // Ici, vous devriez récupérer les images depuis le serveur
    // Ceci est une démonstration avec des images statiques
    const images = [
        { id: 1, src: '../images/gallery/IMG_20250531_121259_952.jpg', featured: true },
        { id: 2, src: '../images/gallery/IMG_20250531_121300_188.jpg', featured: false },
        { id: 3, src: '../images/gallery/IMG_20250531_121311_304.jpg', featured: false },
        { id: 4, src: '../images/gallery/IMG_20250531_121432_334.jpg', featured: false },
        { id: 5, src: '../images/gallery/IMG_20250531_121451_526.jpg', featured: false },
        { id: 6, src: '../images/gallery/IMG_20250531_121503_326.jpg', featured: false }
    ];
    
    // Vider la galerie
    galleryGrid.innerHTML = '';
    
    // Ajouter les images à la galerie
    images.forEach(image => {
        const item = createGalleryItem(image);
        galleryGrid.appendChild(item);
    });
}

// Créer un élément de galerie
function createGalleryItem(image) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.id = image.id;
    
    item.innerHTML = `
        <img src="${image.src}" alt="Image ${image.id}" class="gallery-img">
        <div class="gallery-actions">
            <button class="gallery-btn ${image.featured ? 'featured' : ''}" 
                    onclick="toggleFeatured(${image.id})" 
                    title="${image.featured ? 'Mise en avant' : 'Mettre en avant'}">
                <i class="fas fa-star"></i>
            </button>
            <button class="gallery-btn" onclick="deleteImage(${image.id})" title="Supprimer">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return item;
}

// Basculer l'état "à la une" d'une image
function toggleFeatured(imageId) {
    // Ici, vous devriez mettre à jour l'état côté serveur
    const messageEl = document.getElementById('galleryMessage');
    const btn = document.querySelector(`.gallery-item[data-id="${imageId}"] .gallery-btn:first-child`);
    
    if (btn) {
        const isFeatured = btn.classList.contains('featured');
        
        if (isFeatured) {
            btn.classList.remove('featured');
            showMessage(messageEl, 'Image retirée de la mise en avant.', 'success');
        } else {
            // Désactiver la mise en avant des autres images
            document.querySelectorAll('.gallery-btn.featured').forEach(el => {
                el.classList.remove('featured');
            });
            
            btn.classList.add('featured');
            showMessage(messageEl, 'Image mise en avant avec succès !', 'success');
        }
    }
}

// Supprimer une image
function deleteImage(imageId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible.')) {
        // Ici, vous devriez supprimer l'image côté serveur
        const messageEl = document.getElementById('galleryMessage');
        const item = document.querySelector(`.gallery-item[data-id="${imageId}"]`);
        
        if (item) {
            item.style.opacity = '0.5';
            
            // Simuler une requête AJAX
            setTimeout(() => {
                item.remove();
                showMessage(messageEl, 'Image supprimée avec succès.', 'success');
            }, 500);
        }
    }
}

// Exposer les fonctions au scope global pour les appels depuis le HTML
window.toggleFeatured = toggleFeatured;
window.deleteImage = deleteImage;
