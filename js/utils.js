/**
 * Utilitaires généraux pour l'application
 * Fonctions d'aide et utilitaires communs
 */

class Utils {
    /**
     * Formate une date au format lisible
     * @param {Date|string|number} date - Date à formater
     * @param {string} locale - Locale (par défaut: 'fr-FR')
     * @returns {string} Date formatée
     */
    static formatDate(date, locale = 'fr-FR') {
        if (!date) return '';
        
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        return new Date(date).toLocaleDateString(locale, options);
    }
    
    /**
     * Formate une taille en octets en une chaîne lisible
     * @param {number} bytes - Taille en octets
     * @param {number} decimals - Nombre de décimales à afficher
     * @returns {string} Taille formatée (ex: "1,5 Mo")
     */
    static formatFileSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Octets';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Octets', 'Ko', 'Mo', 'Go', 'To'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    
    /**
     * Vérifie si une chaîne est un email valide
     * @param {string} email - Adresse email à valider
     * @returns {boolean} True si l'email est valide
     */
    static isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    /**
     * Génère un identifiant unique
     * @param {number} length - Longueur de l'identifiant
     * @returns {string} Identifiant unique
     */
    static generateId(length = 8) {
        return Math.random().toString(36).substring(2, length + 2);
    }
    
    /**
     * Échappe les caractères spéciaux pour les expressions régulières
     * @param {string} string - Chaîne à échapper
     * @returns {string} Chaîne échappée
     */
    static escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    /**
     * Délaye l'exécution d'une fonction
     * @param {number} ms - Délai en millisecondes
     * @returns {Promise} Promesse résolue après le délai
     */
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Limite le taux d'appel d'une fonction
     * @param {Function} func - Fonction à limiter
     * @param {number} limit - Délai minimum entre les appels en ms
     * @returns {Function} Fonction avec limitation de taux
     */
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    /**
     * Débounce une fonction
     * @param {Function} func - Fonction à débouncer
     * @param {number} wait - Délai d'attente en ms
     * @returns {Function} Fonction débouncée
     */
    static debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    /**
     * Copie du texte dans le presse-papier
     * @param {string} text - Texte à copier
     * @returns {Promise<boolean>} True si la copie a réussi
     */
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Erreur lors de la copie dans le presse-papier:', err);
            // Fallback pour les anciens navigateurs
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                return true;
            } catch (err) {
                console.error('Erreur avec la méthode de secours:', err);
                return false;
            }
        }
    }
    
    /**
     * Télécharge un fichier à partir d'un contenu texte
     * @param {string} content - Contenu du fichier
     * @param {string} filename - Nom du fichier
     * @param {string} type - Type MIME du fichier
     */
    static downloadFile(content, filename, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    /**
     * Ouvre une boîte de dialogue de confirmation personnalisée
     * @param {string} message - Message à afficher
     * @param {string} title - Titre de la boîte de dialogue
     * @returns {Promise<boolean>} True si l'utilisateur a confirmé
     */
    static async confirmDialog(message, title = 'Confirmation') {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'custom-dialog';
            modal.innerHTML = `
                <div class="dialog-overlay"></div>
                <div class="dialog-content">
                    <h3>${title}</h3>
                    <p>${message}</p>
                    <div class="dialog-buttons">
                        <button class="btn btn-outline" id="dialog-cancel">Annuler</button>
                        <button class="btn btn-primary" id="dialog-confirm">Confirmer</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            const confirmBtn = document.getElementById('dialog-confirm');
            const cancelBtn = document.getElementById('dialog-cancel');
            
            const cleanup = () => {
                confirmBtn.removeEventListener('click', onConfirm);
                cancelBtn.removeEventListener('click', onCancel);
                document.body.removeChild(modal);
            };
            
            const onConfirm = () => {
                cleanup();
                resolve(true);
            };
            
            const onCancel = () => {
                cleanup();
                resolve(false);
            };
            
            confirmBtn.addEventListener('click', onConfirm);
            cancelBtn.addEventListener('click', onCancel);
        });
    }
    
    /**
     * Affiche une notification à l'utilisateur
     * @param {string} message - Message à afficher
     * @param {string} type - Type de notification (success, error, info, warning)
     * @param {number} duration - Durée d'affichage en ms (0 pour ne pas fermer automatiquement)
     */
    static showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        
        const iconMap = {
            success: '✓',
            error: '✕',
            warning: '!',
            info: 'i'
        };
        
        notification.innerHTML = `
            <span class="notification-icon">${iconMap[type] || ''}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Fermer">&times;</button>
        `;
        
        const close = () => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };
        
        notification.querySelector('.notification-close').addEventListener('click', close);
        
        if (duration > 0) {
            setTimeout(close, duration);
        }
        
        document.body.appendChild(notification);
        
        // Forcer le reflow pour activer la transition
        void notification.offsetWidth;
        notification.classList.add('show');
    }
}

// Exposer les méthodes utilitaires globalement
window.Utils = Utils;

// Exporter pour les modules ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils };
}
