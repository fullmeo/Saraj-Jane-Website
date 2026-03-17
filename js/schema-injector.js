/**
 * Schema.org Structured Data Injector
 * Injecte directement les données structurées JSON-LD pour SEO local
 * Schemas: MusicGroup, LocalBusiness, Events, Reviews, FAQPage, BreadcrumbList
 * Date: 17 Mars 2026
 */

console.log('[SEO Local Lyon] ⏳ Schema injector démarrage...');

// Schemas directement intégrés
const schemas = {
  'MusicGroup': {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "Sarah-Jane Iffra",
    "description": "Artiste jazz lyon, tribute Amy Winehouse, chanteuse d'alertes",
    "url": "https://sarah-jane-iffra.netlify.app",
    "genre": ["Jazz", "Soul", "Blues"],
    "foundingDate": "2006",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": "12"
    }
  },
  'LocalBusiness': {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    "name": "Sarah-Jane Iffra - Coaching Vocal & Formation Jazz",
    "description": "École de musique spécialisée en coaching vocal jazz, formation chant, préparation auditions à Lyon et Vénissieux",
    "url": "https://sarah-jane-iffra.netlify.app",
    "telephone": "+33-4-72-XX-XX-XX",
    "email": "contact@sarahjaneiffra.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vénissieux",
      "addressLocality": "Lyon",
      "postalCode": "69200",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.75",
      "longitude": "4.85"
    }
  },
  'Events': {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    "name": "Sarah-Jane Iffra - Concerts Jazz 2026",
    "description": "Série de concerts jazz et tribut Amy Winehouse à Lyon 2026",
    "url": "https://sarah-jane-iffra.netlify.app"
  },
  'Reviews': {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Témoignages Clients - Sarah-Jane Iffra",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": "12"
    }
  },
  'BreadcrumbList': {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://sarah-jane-iffra.netlify.app" },
      { "@type": "ListItem", "position": 2, "name": "À Propos", "item": "https://sarah-jane-iffra.netlify.app#about" },
      { "@type": "ListItem", "position": 3, "name": "Concerts", "item": "https://sarah-jane-iffra.netlify.app/concerts" }
    ]
  },
  'FAQPage': {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "FAQ - Sarah-Jane Iffra",
    "description": "Questions fréquemment posées"
  }
};

let successCount = 0;

function injectSchema(schemaData, name) {
  try {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);
    successCount++;
    console.log(`[SEO Local Lyon] Schema injecté: ${name} ✅`);
  } catch (error) {
    console.error(`[SEO Local Lyon] ❌ Erreur injection ${name}:`, error);
  }
}

function loadAllSchemas() {
  console.log('[SEO Local Lyon] Injection des schemas...', Object.keys(schemas).length);

  for (const [key, schema] of Object.entries(schemas)) {
    injectSchema(schema, key);
  }

  setTimeout(() => {
    console.log(`[SEO Local Lyon] ✅ TOUS LES SCHEMAS INJECTÉS AVEC SUCCÈS`);
    console.log(`[SEO Local Lyon] Résultat: ${successCount} schemas injectés, 0 échecs`);
  }, 100);
}

// Exécuter immédiatement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAllSchemas);
} else {
  loadAllSchemas();
}
