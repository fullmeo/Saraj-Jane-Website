/**
 * Configuration SEO pour le site Sarah Jane Iffra
 * Ce fichier contient les métadonnées pour le référencement et les réseaux sociaux
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarahjaneiffra.com';
const siteName = 'Sarah Jane Iffra';
const siteDescription = 'Artiste et musicienne - Découvrez mon univers artistique à travers mes œuvres et performances';
const siteImage = `${siteUrl}/images/og-image.jpg`;
/**
 * Mots-clés du site web pour améliorer le référencement SEO
 * @type {string}
 */
const siteKeywords = [
  'sarah jane iffra',
  'artiste',
  'musicienne',
  'chanteuse',
  'compositrice',
  'performances',
  'concerts',
  'expositions',
  'art contemporain',
  'musique indépendante'
].filter(keyword => typeof keyword === 'string').join(', ');

const socialAccounts = {
  twitter: '@sarahjaneiffra',
  facebook: 'sarahjaneiffra',
  instagram: 'sarahjaneiffra',
  youtube: '@sarahjaneiffra',
  spotify: 'sarahjaneiffra',
  soundcloud: 'sarahjaneiffra',
  bandcamp: 'sarahjaneiffra',
  tiktok: '@sarahjaneiffra'
};

const contactInfo = {
  email: 'contact@sarahjaneiffra.com',
  phone: '+33 6 12 34 56 78',
  address: {
    street: '123 Rue de l\'Artiste',
    city: 'Paris',
    postalCode: '75000',
    country: 'France',
    region: 'Île-de-France'
  },
  coordinates: {
    latitude: '48.8566',
    longitude: '2.3522'
  },
  businessHours: 'Mo-Fr 10:00-18:00',
  priceRange: '€€',
  acceptsReservations: 'https://sarahjaneiffra.com/reservation'
};

const organization = {
  name: 'Sarah Jane Iffra',
  legalName: 'Sarah Jane Iffra',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  foundingDate: '2015',
  founders: [{
    '@type': 'Person',
    name: 'Sarah Jane Iffra'
  }],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: contactInfo.phone,
    contactType: 'customer service',
    email: contactInfo.email,
    areaServed: 'FR',
    availableLanguage: ['French', 'English', 'Spanish']
  },
  sameAs: [
    `https://facebook.com/${socialAccounts.facebook}`,
    `https://instagram.com/${socialAccounts.instagram}`,
    `https://twitter.com/${socialAccounts.twitter}`,
    `https://youtube.com/${socialAccounts.youtube}`,
    `https://open.spotify.com/artist/${socialAccounts.spotify}`,
    `https://soundcloud.com/${socialAccounts.soundcloud}`,
    `https://${socialAccounts.bandcamp}.bandcamp.com`,
    `https://tiktok.com/@${socialAccounts.tiktok}`
  ]
};

const defaultSeo = {
  titleTemplate: `%s | ${siteName}`,
  defaultTitle: siteName,
  description: siteDescription,
  canonical: siteUrl,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    site_name: siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: siteName,
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    handle: socialAccounts.twitter,
    site: socialAccounts.twitter,
    cardType: 'summary_large_image'
  },
  additionalMetaTags: [
    { name: 'keywords', content: siteKeywords },
    { name: 'author', content: siteName },
    { name: 'publisher', content: siteName },
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    { name: 'bingbot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:site_name', content: siteName },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_FR' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:image', content: siteImage },
    { name: 'twitter:url', content: siteUrl },
    { name: 'twitter:title', content: siteName },
    { name: 'twitter:description', content: siteDescription }
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico',
      sizes: '32x32'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
      crossOrigin: 'use-credentials'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossOrigin: true
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: true
    }
  ]
};

const pages = {
  home: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    image: siteImage,
    type: 'website'
  },
  about: {
    title: `À Propos | ${siteName}`,
    description: 'Découvrez mon parcours artistique, mes influences et ma démarche créative',
    url: `${siteUrl}/a-propos`,
    image: `${siteUrl}/images/about-og.jpg`,
    type: 'profile'
  },
  gallery: {
    title: `Galerie | ${siteName}`,
    description: 'Explorez mes œuvres visuelles et découvrez mon univers artistique',
    url: `${siteUrl}/galerie`,
    image: `${siteUrl}/images/gallery-og.jpg`,
    type: 'website'
  },
  videos: {
    title: `Vidéos | ${siteName}`,
    description: 'Regardez mes performances en vidéo et découvrez mes clips musicaux',
    url: `${siteUrl}/videos`,
    image: `${siteUrl}/images/videos-og.jpg`,
    type: 'video.other'
  },
  events: {
    title: `Événements | ${siteName}`,
    description: 'Découvrez mes prochains concerts, expositions et performances',
    url: `${siteUrl}/evenements`,
    image: `${siteUrl}/images/events-og.jpg`,
    type: 'event'
  },
  contact: {
    title: `Contact | ${siteName}`,
    description: 'Contactez-moi pour toute demande de collaboration, réservation ou information',
    url: `${siteUrl}/contact`,
    image: siteImage,
    type: 'website'
  },
  press: {
    title: `Presse | ${siteName}`,
    description: 'Dossier de presse, photos haute résolution et informations pour les journalistes',
    url: `${siteUrl}/presse`,
    image: `${siteUrl}/images/press-og.jpg`,
    type: 'website'
  },
  shop: {
    title: `Boutique | ${siteName}`,
    description: 'Découvrez et achetez mes œuvres, albums et produits dérivés',
    url: `${siteUrl}/boutique`,
    image: `${siteUrl}/images/shop-og.jpg`,
    type: 'product'
  },
  blog: {
    title: `Blog | ${siteName}`,
    description: 'Actualités, coulisses de création et articles sur mon univers artistique',
    url: `${siteUrl}/blog`,
    image: `${siteUrl}/images/blog-og.jpg`,
    type: 'blog'
  }
};

const seoConfig = {
  siteUrl,
  siteName,
  siteDescription,
  siteImage,
  siteKeywords,
  contactInfo,
  organization,
  socialAccounts,
  defaultSeo,
  pages
};

// Génération du schéma JSON-LD pour l'organisation
const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: organization.name,
  legalName: organization.legalName,
  url: organization.url,
  logo: organization.logo,
  foundingDate: organization.foundingDate,
  founders: organization.founders,
  contactPoint: organization.contactPoint,
  sameAs: organization.sameAs,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contactInfo.address.street,
    addressLocality: contactInfo.address.city,
    postalCode: contactInfo.address.postalCode,
    addressCountry: contactInfo.address.country,
    addressRegion: contactInfo.address.region
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: contactInfo.coordinates.latitude,
    longitude: contactInfo.coordinates.longitude
  },
  openingHours: contactInfo.businessHours,
  priceRange: contactInfo.priceRange
});

// Génération du schéma JSON-LD pour le site web
const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/recherche?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
});

// Ajout des schémas au config
seoConfig.schemas = {
  organization: generateOrganizationSchema(),
  website: generateWebSiteSchema()
};

module.exports = seoConfig;
