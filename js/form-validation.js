/**
 * Module de validation de formulaire avec sécurité renforcée
 * Protège contre XSS, injection, et valide tous les champs
 */

// Expressions régulières pour validation
const VALIDATION_PATTERNS = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    name: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
    phone: /^[\d\s\-\+\(\)]{10,20}$/,
    // Détection de patterns malveillants
    xssPattern: /<script|javascript:|onerror=|onclick=|<iframe/i,
    sqlInjection: /(\bor\b|\band\b).*[=<>]|union.*select|insert.*into|delete.*from|drop.*table/i
};

/**
 * Sanitize user input pour prévenir XSS
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';

    // Créer un élément temporaire pour encoder les HTML entities
    const div = document.createElement('div');
    div.textContent = input;
    let sanitized = div.innerHTML;

    // Nettoyer les caractères dangereux supplémentaires
    sanitized = sanitized
        .replace(/[<>]/g, '') // Retirer les chevrons
        .trim();

    return sanitized;
}

/**
 * Valide une adresse email
 */
function validateEmail(email) {
    const errors = [];

    if (!email || email.trim() === '') {
        errors.push('L\'adresse email est requise.');
        return { valid: false, errors };
    }

    const trimmedEmail = email.trim();

    if (trimmedEmail.length > 254) {
        errors.push('L\'adresse email est trop longue (max 254 caractères).');
    }

    if (!VALIDATION_PATTERNS.email.test(trimmedEmail)) {
        errors.push('L\'adresse email n\'est pas valide.');
    }

    // Vérifier les patterns malveillants
    if (VALIDATION_PATTERNS.xssPattern.test(trimmedEmail)) {
        errors.push('L\'adresse email contient des caractères non autorisés.');
    }

    return {
        valid: errors.length === 0,
        errors,
        sanitized: sanitizeInput(trimmedEmail)
    };
}

/**
 * Valide un nom
 */
function validateName(name, fieldName = 'Nom') {
    const errors = [];

    if (!name || name.trim() === '') {
        errors.push(`${fieldName} est requis.`);
        return { valid: false, errors };
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
        errors.push(`${fieldName} doit contenir au moins 2 caractères.`);
    }

    if (trimmedName.length > 50) {
        errors.push(`${fieldName} est trop long (max 50 caractères).`);
    }

    if (!VALIDATION_PATTERNS.name.test(trimmedName)) {
        errors.push(`${fieldName} contient des caractères non autorisés.`);
    }

    // Vérifier les patterns malveillants
    if (VALIDATION_PATTERNS.xssPattern.test(trimmedName) ||
        VALIDATION_PATTERNS.sqlInjection.test(trimmedName)) {
        errors.push(`${fieldName} contient des caractères non autorisés.`);
    }

    return {
        valid: errors.length === 0,
        errors,
        sanitized: sanitizeInput(trimmedName)
    };
}

/**
 * Valide un message
 */
function validateMessage(message) {
    const errors = [];

    if (!message || message.trim() === '') {
        errors.push('Le message est requis.');
        return { valid: false, errors };
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères.');
    }

    if (trimmedMessage.length > 5000) {
        errors.push('Le message est trop long (max 5000 caractères).');
    }

    // Vérifier les patterns malveillants
    if (VALIDATION_PATTERNS.xssPattern.test(trimmedMessage)) {
        errors.push('Le message contient des caractères non autorisés.');
    }

    return {
        valid: errors.length === 0,
        errors,
        sanitized: sanitizeInput(trimmedMessage)
    };
}

/**
 * Valide un numéro de téléphone (optionnel)
 */
function validatePhone(phone) {
    if (!phone || phone.trim() === '') {
        return { valid: true, errors: [], sanitized: '' }; // Optionnel
    }

    const errors = [];
    const trimmedPhone = phone.trim();

    if (!VALIDATION_PATTERNS.phone.test(trimmedPhone)) {
        errors.push('Le numéro de téléphone n\'est pas valide.');
    }

    // Vérifier les patterns malveillants
    if (VALIDATION_PATTERNS.xssPattern.test(trimmedPhone)) {
        errors.push('Le numéro de téléphone contient des caractères non autorisés.');
    }

    return {
        valid: errors.length === 0,
        errors,
        sanitized: sanitizeInput(trimmedPhone)
    };
}

/**
 * Affiche les erreurs de validation dans le formulaire
 */
function displayValidationErrors(formElement, fieldErrors) {
    // Retirer les erreurs existantes
    formElement.querySelectorAll('.validation-error').forEach(el => el.remove());
    formElement.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));

    // Afficher les nouvelles erreurs
    Object.keys(fieldErrors).forEach(fieldName => {
        const errors = fieldErrors[fieldName];
        if (errors.length === 0) return;

        const field = formElement.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Marquer le champ comme erroné
        field.classList.add('field-error');

        // Créer l'élément d'erreur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = errors.join(' ');

        // Insérer après le champ
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    });
}

/**
 * Valide tout le formulaire de contact
 */
function validateContactForm(formData) {
    const validationResults = {
        name: validateName(formData.name, 'Nom'),
        email: validateEmail(formData.email),
        message: validateMessage(formData.message)
    };

    // Champ téléphone optionnel
    if (formData.phone) {
        validationResults.phone = validatePhone(formData.phone);
    }

    // Vérifier si tous les champs sont valides
    const isValid = Object.values(validationResults).every(result => result.valid);

    // Collecter toutes les erreurs
    const allErrors = {};
    Object.keys(validationResults).forEach(field => {
        if (validationResults[field].errors.length > 0) {
            allErrors[field] = validationResults[field].errors;
        }
    });

    // Créer l'objet sanitizé
    const sanitizedData = {};
    Object.keys(validationResults).forEach(field => {
        if (validationResults[field].sanitized !== undefined) {
            sanitizedData[field] = validationResults[field].sanitized;
        }
    });

    return {
        valid: isValid,
        errors: allErrors,
        sanitizedData
    };
}

/**
 * Protection anti-spam : limite le nombre de soumissions
 */
class FormSubmissionTracker {
    constructor(maxSubmissions = 3, timeWindow = 3600000) { // 1 heure par défaut
        this.maxSubmissions = maxSubmissions;
        this.timeWindow = timeWindow;
        this.storageKey = 'formSubmissions';
    }

    canSubmit() {
        const submissions = this.getSubmissions();
        const now = Date.now();

        // Filtrer les soumissions dans la fenêtre de temps
        const recentSubmissions = submissions.filter(
            timestamp => now - timestamp < this.timeWindow
        );

        return recentSubmissions.length < this.maxSubmissions;
    }

    recordSubmission() {
        const submissions = this.getSubmissions();
        submissions.push(Date.now());

        // Nettoyer les anciennes soumissions
        const now = Date.now();
        const recentSubmissions = submissions.filter(
            timestamp => now - timestamp < this.timeWindow
        );

        localStorage.setItem(this.storageKey, JSON.stringify(recentSubmissions));
    }

    getSubmissions() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    getRemainingTime() {
        const submissions = this.getSubmissions();
        if (submissions.length === 0) return 0;

        const now = Date.now();
        const oldestRecent = Math.min(...submissions.filter(
            timestamp => now - timestamp < this.timeWindow
        ));

        return Math.max(0, this.timeWindow - (now - oldestRecent));
    }
}

// Exporter les fonctions
window.FormValidator = {
    validateContactForm,
    displayValidationErrors,
    sanitizeInput,
    FormSubmissionTracker
};
