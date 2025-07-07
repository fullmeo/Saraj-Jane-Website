/**
 * Fichier de configuration des variables d'environnement côté client
 * Ce fichier est généré automatiquement à partir des variables d'environnement du serveur
 * Ne pas inclure d'informations sensibles dans ce fichier
 */

// Configuration de base
window.env = {
  // Environnement d'exécution (development, staging, production)
  NODE_ENV: 'development',
  
  // URL de base de l'API
  API_BASE_URL: process.env.VITE_API_BASE_URL || 'https://api.sarahjaneiffra.com',
  
  // URL de base du site
  SITE_URL: process.env.VITE_APP_URL || 'https://sarahjaneiffra.com',
  
  // Configuration Firebase (ces valeurs sont remplacées à la construction)
  FIREBASE_CONFIG: {
    apiKey: process.env.VITE_FIREBASE_API_KEY || 'your-api-key',
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-project-id.firebaseapp.com',
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id',
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'your-project-id.appspot.com',
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'your-messaging-sender-id',
    appId: process.env.VITE_FIREBASE_APP_ID || 'your-app-id',
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX'
  },
  
  // Configuration YouTube Data API
  YOUTUBE_API_KEY: process.env.VITE_YOUTUBE_API_KEY || 'your-youtube-api-key',
  YOUTUBE_CHANNEL_ID: process.env.VITE_YOUTUBE_CHANNEL_ID || 'your-channel-id',
  
  // Configuration des fonctionnalités
  FEATURES: {
    ANALYTICS: process.env.VITE_FEATURE_ANALYTICS === 'true' || false,
    OFFLINE: process.env.VITE_FEATURE_OFFLINE === 'true' || true,
    PUSH_NOTIFICATIONS: process.env.VITE_FEATURE_PUSH_NOTIFICATIONS === 'true' || false,
    SERVICE_WORKER: process.env.VITE_FEATURE_SERVICE_WORKER === 'true' || true
  },
  
  // Configuration des services tiers
  SERVICES: {
    GOOGLE_ANALYTICS_ID: process.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    GOOGLE_TAG_MANAGER_ID: process.env.VITE_GTM_CONTAINER_ID || 'GTM-XXXXXX',
    FACEBOOK_PIXEL_ID: process.env.VITE_FACEBOOK_PIXEL_ID || 'XXXXXXXXXXXXXXX',
    HOTJAR_ID: process.env.VITE_HOTJAR_ID || '1234567',
    HOTJAR_SNIPPET_VERSION: process.env.VITE_HOTJAR_SNIPPET_VERSION || '6'
  },
  
  // Configuration des chemins d'API
  API_ENDPOINTS: {
    GALLERY: '/api/gallery',
    VIDEOS: '/api/videos',
    CONTACT: '/api/contact',
    SUBSCRIBE: '/api/subscribe',
    UPLOAD: '/api/upload'
  },
  
  // Configuration des limites
  LIMITS: {
    UPLOAD_FILE_SIZE: process.env.VITE_UPLOAD_FILE_SIZE || 10 * 1024 * 1024, // 10MB
    UPLOAD_FILE_TYPES: process.env.VITE_UPLOAD_FILE_TYPES || 'image/jpeg,image/png,image/gif,image/webp',
    MAX_IMAGES_PER_UPLOAD: process.env.VITE_MAX_IMAGES_PER_UPLOAD || 10,
    MAX_VIDEOS_PER_PAGE: process.env.VITE_MAX_VIDEOS_PER_PAGE || 12
  },
  
  // Configuration des messages
  MESSAGES: {
    ERROR_DEFAULT: 'Une erreur est survenue. Veuillez réessayer plus tard.',
    UPLOAD_SUCCESS: 'Téléchargement réussi!',
    UPLOAD_ERROR: 'Erreur lors du téléchargement du fichier.',
    FORM_SUCCESS: 'Votre message a été envoyé avec succès!',
    FORM_ERROR: 'Erreur lors de l\'envoi du formulaire.'
  },
  
  // Configuration des thèmes
  THEME: {
    PRIMARY_COLOR: process.env.VITE_THEME_PRIMARY_COLOR || '#4a148c',
    SECONDARY_COLOR: process.env.VITE_THEME_SECONDARY_COLOR || '#7b1fa2',
    FONT_PRIMARY: process.env.VITE_THEME_FONT_PRIMARY || '"Montserrat", sans-serif',
    FONT_SECONDARY: process.env.VITE_THEME_FONT_SECONDARY || '"Playfair Display", serif'
  },
  
  // Version de l'application
  VERSION: process.env.VITE_APP_VERSION || '1.0.0',
  
  // Timestamp de construction
  BUILD_TIMESTAMP: new Date().toISOString(),
  
  // Mode maintenance
  MAINTENANCE_MODE: process.env.VITE_MAINTENANCE_MODE === 'true' || false,
  MAINTENANCE_MESSAGE: process.env.VITE_MAINTENANCE_MESSAGE || 'Le site est actuellement en maintenance. Nous serons de retour bientôt!'
};

// Exporter pour les modules ES si nécessaire
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.env;
}
