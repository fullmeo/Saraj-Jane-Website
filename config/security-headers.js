/**
 * Configuration des en-têtes de sécurité pour le site Sarah Jane Iffra
 * Ces en-têtes sont essentiels pour la sécurité du site
 */

const securityHeaders = {
  // Protection contre le détournement de clics (Clickjacking)
  'X-Frame-Options': 'DENY',
  
  // Protection contre le MIME-sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Protection contre les attaques XSS (en mode bloquant)
  'X-XSS-Protection': '1; mode=block',
  
  // Politique de sécurité du contenu (CSP)
  'Content-Security-Policy': [
    "default-src 'self';",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://apis.google.com;",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
    "img-src 'self' data: https://i.ytimg.com https://img.youtube.com https://www.google-analytics.com https://*.googleapis.com https://*.gstatic.com;",
    "font-src 'self' https://fonts.gstatic.com;",
    "connect-src 'self' https://www.googleapis.com https://firestore.googleapis.com https://*.firebaseio.com https://www.google-analytics.com;",
    "frame-src 'self' https://www.youtube.com https://www.google.com https://www.facebook.com https://web.facebook.com https://www.instagram.com;",
    "media-src 'self' https://*.googlevideo.com https://*.youtube.com;",
    "object-src 'none';",
    "base-uri 'self';",
    "form-action 'self';",
    "frame-ancestors 'none';",
    "block-all-mixed-content;"
  ].join(' '),
  
  // Référenceur (Referrer-Policy)
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy (anciennement Feature Policy)
  'Permissions-Policy': [
    'camera=(),',
    'geolocation=(),',
    'microphone=(),',
    'payment=()'
  ].join(''),
  
  // HSTS (Strict-Transport-Security)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // X-Permitted-Cross-Domain-Policies
  'X-Permitted-Cross-Domain-Policies': 'none',
  
  // X-Download-Options (pour IE8+)
  'X-Download-Options': 'noopen',
  
  // Expect-CT (Certificate Transparency)
  'Expect-CT': 'max-age=86400, enforce',
  
  // Feature Policy (obsolète mais maintenu pour la compatibilité)
  'Feature-Policy': [
    'geolocation "none";',
    'microphone "none";',
    'camera "none";',
    'payment "none"'
  ].join(' ')
};

// Configuration pour les API
const apiSecurityHeaders = {
  ...securityHeaders,
  'Access-Control-Allow-Origin': 'https://sarahjaneiffra.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400'
};

// Configuration pour les fichiers statiques
const staticFilesSecurityHeaders = {
  ...securityHeaders,
  'Cache-Control': 'public, max-age=31536000, immutable'
};

// Configuration pour les pages HTML
const htmlSecurityHeaders = {
  ...securityHeaders,
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

module.exports = {
  securityHeaders,
  apiSecurityHeaders,
  staticFilesSecurityHeaders,
  htmlSecurityHeaders
};
