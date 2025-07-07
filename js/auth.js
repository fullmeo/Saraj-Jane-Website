/**
 * Gestionnaire d'authentification pour l'administration
 * Version moderne et sécurisée avec gestion des sessions et des erreurs améliorée
 */

// Configuration de l'authentification Firebase
class AuthManager {
    constructor() {
        this.auth = null;
        this.db = null;
        this.provider = null;
        this.initFirebase();
        this.initElements();
        this.bindEvents();
        this.checkAuthState();
    }

    /**
     * Initialise Firebase avec la configuration
     */
    initFirebase() {
        try {
            // Vérifier si Firebase est déjà initialisé
            if (!firebase.apps.length) {
                // La configuration Firebase sera injectée depuis firebase-config.js
                firebase.initializeApp(firebaseConfig);
            }
            
            this.auth = firebase.auth();
            this.db = firebase.firestore();
            this.provider = new firebase.auth.GoogleAuthProvider();
            
            // Configurer les paramètres de l'authentification Google
            this.provider.setCustomParameters({
                prompt: 'select_account',
                hd: 'sarahjaneiffra.com' // Restreindre à un domaine spécifique si nécessaire
            });
            
            // Configurer la persistance de session
            this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            
        } catch (error) {
            console.error('Erreur d\'initialisation de Firebase:', error);
            this.showGlobalError('Erreur d\'initialisation. Veuillez recharger la page.');
        }
    }

    /**
     * Initialise les éléments du DOM
     */
    initElements() {
        this.elements = {
            // Formulaires
            loginForm: document.getElementById('loginForm'),
            resetPasswordForm: document.getElementById('resetPasswordForm'),
            
            // Champs de formulaire
            email: document.getElementById('email'),
            password: document.getElementById('password'),
            resetEmail: document.getElementById('resetEmail'),
            rememberMe: document.getElementById('remember'),
            
            // Boutons
            loginButton: document.getElementById('loginButton'),
            googleSignIn: document.getElementById('googleSignIn'),
            githubSignIn: document.getElementById('githubSignIn'),
            sendResetLink: document.getElementById('sendResetLink'),
            togglePassword: document.querySelector('.toggle-password'),
            
            // Messages
            message: document.getElementById('loginMessage'),
            
            // Modals
            forgotPasswordModal: document.getElementById('forgotPasswordModal'),
            
            // Chargement
            btnText: document.querySelector('.btn-text'),
            btnLoader: document.querySelector('.btn-loader')
        };
    }


    /**
     * Lie les événements aux éléments du DOM
     */
    bindEvents() {
        // Événements de formulaire
        if (this.elements.loginForm) {
            this.elements.loginForm.addEventListener('submit', (e) => this.handleEmailPasswordLogin(e));
        }
        
        // Bouton de connexion Google
        if (this.elements.googleSignIn) {
            this.elements.googleSignIn.addEventListener('click', () => this.signInWithGoogle());
        }
        
        // Bouton de connexion GitHub (désactivé pour l'instant)
        if (this.elements.githubSignIn) {
            this.elements.githubSignIn.addEventListener('click', () => {
                this.showMessage('Fonctionnalité à venir', 'info');
            });
        }
        
        // Affichage/masquage du mot de passe
        if (this.elements.togglePassword) {
            this.elements.togglePassword.addEventListener('click', () => this.togglePasswordVisibility());
        }
        
        // Gestion du modal de mot de passe oublié
        const forgotPasswordLinks = document.querySelectorAll('[href="#forgot-password"]');
        const closeButtons = document.querySelectorAll('.close-modal');
        
        forgotPasswordLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showForgotPasswordModal();
            });
        });
        
        closeButtons.forEach(button => {
            button.addEventListener('click', () => this.hideForgotPasswordModal());
        });
        
        // Fermer le modal en cliquant en dehors
        window.addEventListener('click', (e) => {
            if (e.target === this.elements.forgotPasswordModal) {
                this.hideForgotPasswordModal();
            }
        });
        
        // Envoi du formulaire de réinitialisation
        if (this.elements.sendResetLink) {
            this.elements.sendResetLink.addEventListener('click', () => this.sendPasswordResetEmail());
        }
    }
    
    /**
     * Vérifie l'état d'authentification et redirige si nécessaire
     */
    checkAuthState() {
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                // Utilisateur connecté
                this.handleSuccessfulLogin(user);
            } else {
                // Utilisateur non connecté
                this.handleLogout();
            }
        });
    }
    
    /**
     * Gère la connexion avec email/mot de passe
     */
    async handleEmailPasswordLogin(e) {
        e.preventDefault();
        
        const email = this.elements.email.value.trim();
        const password = this.elements.password.value;
        const rememberMe = this.elements.rememberMe ? this.elements.rememberMe.checked : false;
        
        // Validation des champs
        if (!this.validateEmail(email) || !password) {
            this.showMessage('Veuillez saisir un email et un mot de passe valides', 'error');
            return;
        }
        
        this.setLoadingState(true);
        
        try {
            // Définir la persistance en fonction du choix "Se souvenir de moi"
            const persistence = rememberMe 
                ? firebase.auth.Auth.Persistence.LOCAL 
                : firebase.auth.Auth.Persistence.SESSION;
                
            await this.auth.setPersistence(persistence);
            
            // Tenter la connexion
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            
            // Vérifier si l'email est vérifié (optionnel selon vos besoins)
            if (!userCredential.user.emailVerified) {
                // Vous pouvez forcer la vérification d'email ici si nécessaire
                // await userCredential.user.sendEmailVerification();
                // this.showMessage('Veuvez vérifier votre email pour vous connecter', 'info');
                // await this.auth.signOut();
                // return;
            }
            
            this.handleSuccessfulLogin(userCredential.user);
            
        } catch (error) {
            this.handleAuthError(error);
        } finally {
            this.setLoadingState(false);
        }
    }
    
    /**
     * Gère la connexion avec Google
     */
    async signInWithGoogle() {
        try {
            this.setLoadingState(true, 'google');
            
            const result = await this.auth.signInWithPopup(this.provider);
            
            // Vérifier si l'email est autorisé (optionnel)
            // const allowedEmails = ['admin@example.com'];
            // if (allowedEmails.length > 0 && !allowedEmails.includes(result.user.email)) {
            //     await this.auth.signOut();
            //     throw new Error('unauthorized-email');
            // }
            
            this.handleSuccessfulLogin(result.user);
            
        } catch (error) {
            this.handleAuthError(error);
        } finally {
            this.setLoadingState(false, 'google');
        }
    }
    
    /**
     * Envoie un email de réinitialisation de mot de passe
     */
    async sendPasswordResetEmail() {
        const email = this.elements.resetEmail.value.trim();
        
        if (!this.validateEmail(email)) {
            this.showMessage('Veuillez saisir une adresse email valide', 'error', 'forgotPasswordModal');
            return;
        }
        
        try {
            await this.auth.sendPasswordResetEmail(email);
            this.showMessage(
                `Un email de réinitialisation a été envoyé à ${email}. Vérifiez votre boîte de réception.`,
                'success',
                'forgotPasswordModal'
            );
            
            // Cacher le modal après 3 secondes
            setTimeout(() => {
                this.hideForgotPasswordModal();
            }, 3000);
            
        } catch (error) {
            this.handleAuthError(error, 'forgotPasswordModal');
        }
    }
    
    /**
     * Gère la déconnexion
     */
    async logout() {
        try {
            await this.auth.signOut();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            this.showMessage('Une erreur est survenue lors de la déconnexion', 'error');
        }
    }
    
    /**
     * Gère la connexion réussie
     */
    handleSuccessfulLogin(user) {
        // Enregistrer des informations utilisateur dans le stockage local si nécessaire
        // localStorage.setItem('user', JSON.stringify({
        //     uid: user.uid,
        //     email: user.email,
        //     displayName: user.displayName,
        //     photoURL: user.photoURL
        // }));
        
        // Rediriger vers le tableau de bord
        if (!window.location.pathname.includes('dashboard')) {
            window.location.href = 'dashboard.html';
        }
    }
    
    /**
     * Gère la déconnexion
     */
    handleLogout() {
        // Nettoyer le stockage local si nécessaire
        // localStorage.removeItem('user');
        
        // Rediriger vers la page de connexion si sur une page protégée
        if (window.location.pathname.includes('dashboard')) {
            window.location.href = 'index.html';
        }
    }
    
    /**
     * Gère les erreurs d'authentification
     */
    handleAuthError(error, context = 'login') {
        console.error('Erreur d\'authentification:', error);
        
        let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                errorMessage = 'Email ou mot de passe incorrect.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Trop de tentatives échouées. Veuillez réessayer plus tard ou réinitialiser votre mot de passe.';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'Cet email est déjà utilisé par un autre compte.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Adresse email invalide.';
                break;
            case 'auth/unauthorized-domain':
                errorMessage = 'Ce domaine n\'est pas autorisé pour la connexion.';
                break;
            case 'auth/account-exists-with-different-credential':
                errorMessage = 'Un compte existe déjà avec la même adresse email mais avec une autre méthode de connexion.';
                break;
            case 'unauthorized-email':
                errorMessage = 'Vous n\'êtes pas autorisé à vous connecter avec cette adresse email.';
                break;
            default:
                // Pour les erreurs non gérées, afficher le message d'erreur original
                if (error.message) {
                    errorMessage = error.message;
                }
        }
        
        this.showMessage(errorMessage, 'error', context);
    }
    
    /**
     * Affiche un message à l'utilisateur
     */
    showMessage(message, type = 'info', context = 'login') {
        let messageElement;
        
        if (context === 'forgotPasswordModal' && this.elements.forgotPasswordModal) {
            messageElement = this.elements.forgotPasswordModal.querySelector('.message') || 
                           document.createElement('div');
            messageElement.className = `message ${type}`;
            if (!messageElement.parentNode) {
                const modalBody = this.elements.forgotPasswordModal.querySelector('.modal-body');
                if (modalBody) {
                    modalBody.insertBefore(messageElement, modalBody.firstChild);
                }
            }
        } else {
            messageElement = this.elements.message;
        }
        
        if (!messageElement) return;
        
        messageElement.textContent = message;
        messageElement.className = `message ${type} show`;
        messageElement.setAttribute('role', 'alert');
        messageElement.setAttribute('aria-live', 'assertive');
        
        // Masquer le message après 5 secondes
        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => {
            messageElement.classList.remove('show');
        }, 5000);
    }
    
    /**
     * Affiche une erreur globale (hors contexte de formulaire)
     */
    showGlobalError(message) {
        // Créer un élément de message global s'il n'existe pas
        let globalError = document.getElementById('globalError');
        
        if (!globalError) {
            globalError = document.createElement('div');
            globalError.id = 'globalError';
            globalError.className = 'global-error';
            document.body.prepend(globalError);
        }
        
        globalError.textContent = message;
        globalError.style.display = 'block';
        
        // Masquer après 10 secondes
        setTimeout(() => {
            globalError.style.display = 'none';
        }, 10000);
    }
    
    /**
     * Affiche le modal de mot de passe oublié
     */
    showForgotPasswordModal() {
        if (this.elements.forgotPasswordModal) {
            this.elements.forgotPasswordModal.style.display = 'flex';
            this.elements.resetEmail.focus();
        }
    }
    
    /**
     * Cache le modal de mot de passe oublié
     */
    hideForgotPasswordModal() {
        if (this.elements.forgotPasswordModal) {
            this.elements.forgotPasswordModal.style.display = 'none';
            this.elements.resetEmail.value = '';
            
            // Effacer les messages d'erreur
            const messages = this.elements.forgotPasswordModal.querySelectorAll('.message');
            messages.forEach(msg => msg.remove());
        }
    }
    
    /**
     * Bascule la visibilité du mot de passe
     */
    togglePasswordVisibility() {
        const passwordInput = this.elements.password;
        const icon = this.elements.togglePassword.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
        
        passwordInput.focus();
    }
    
    /**
     * Active/désactive l'état de chargement
     */
    setLoadingState(isLoading, context = 'login') {
        if (context === 'login' && this.elements.loginButton) {
            const btn = this.elements.loginButton;
            const btnText = this.elements.btnText;
            const btnLoader = this.elements.btnLoader;
            
            if (isLoading) {
                btn.disabled = true;
                btnText.style.opacity = '0';
                btnLoader.style.display = 'flex';
            } else {
                btn.disabled = false;
                btnText.style.opacity = '1';
                btnLoader.style.display = 'none';
            }
        } else if (context === 'google' && this.elements.googleSignIn) {
            const btn = this.elements.googleSignIn;
            const btnText = btn.querySelector('span');
            
            if (isLoading) {
                btn.disabled = true;
                btnText.textContent = 'Connexion en cours...';
            } else {
                btn.disabled = false;
                btnText.textContent = 'Google';
            }
        }
    }
    
    /**
     * Valide une adresse email
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
}

// Initialiser l'authentification lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si nous sommes sur la page d'administration
    if (window.location.pathname.includes('admin')) {
        // Vérifier si Firebase est chargé
        if (typeof firebase !== 'undefined') {
            // Vérifier si la configuration Firebase est disponible
            if (typeof firebaseConfig !== 'undefined') {
                window.authManager = new AuthManager();
            } else {
                console.error('La configuration Firebase n\'est pas définie.');
                // Essayer de charger la configuration depuis un fichier externe
                const script = document.createElement('script');
                script.src = '/js/firebase-config.js';
                script.onload = () => {
                    if (typeof firebaseConfig !== 'undefined') {
                        window.authManager = new AuthManager();
                    } else {
                        console.error('Impossible de charger la configuration Firebase.');
                    }
                };
                script.onerror = () => {
                    console.error('Erreur lors du chargement de la configuration Firebase.');
                };
                document.head.appendChild(script);
            }
        } else {
            console.error('Firebase n\'est pas chargé.');
        }
    }
});

// Exposer la fonction de déconnexion globalement
window.logout = function() {
    if (window.authManager) {
        window.authManager.logout();
    } else {
        firebase.auth().signOut().then(() => {
            window.location.href = 'index.html';
        });
    }
};
