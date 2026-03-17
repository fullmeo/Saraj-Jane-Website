/**
 * SEO Local Lyon Meta Injector
 * Injecte automatiquement les meta tags pour optimisation SEO locale
 * Géolocalisation: Lyon 45.75°N, 4.85°E
 * Date: 17 Mars 2026
 */

(function injectSEOMetaTags() {
  try {
    const head = document.head;
    const siteConfig = {
      locale: 'fr_FR',
      title: 'Sarah-Jane Iffra - Chanteuse Jazz & Coach Vocal Lyon',
      description: 'Artiste jazz Lyon, coach vocal, tribute Amy Winehouse. 40+ ans expérience. Cours de chant, masterclass, prestations événements. Vénissieux, Lyon.',
      url: 'https://sarah-jane-iffra.netlify.app',
      image: 'https://sarah-jane-iffra.netlify.app/images/sarah-jane-hero.jpg',
      keywords: 'chanteuse jazz Lyon, coaching vocal Lyon, cours de chant Lyon, tribute Amy Winehouse, coach vocal Vénissieux'
    };

    const geoData = {
      region: 'Rhône-Alpes',
      placename: 'Lyon, Vénissieux, France',
      latitude: '45.75',
      longitude: '4.85',
      icbm: '45.75, 4.85'
    };

    // Fonction helper pour créer et injecter meta tags
    function createMetaTag(name, content, isProperty = false) {
      const meta = document.createElement('meta');
      if (isProperty) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      meta.setAttribute('content', content);
      head.appendChild(meta);
      return meta;
    }

    // 1. Meta tags géolocalisation (ICBM, geo, placename, region)
    createMetaTag('geo.region', geoData.region);
    createMetaTag('geo.placename', geoData.placename);
    createMetaTag('geo.position', `${geoData.latitude};${geoData.longitude}`);
    createMetaTag('ICBM', geoData.icbm);
    console.log('[SEO Local Lyon] Meta tags géolocalisation injectés (45.75, 4.85) ✅');

    // 2. Meta tags SEO de base
    createMetaTag('description', siteConfig.description);
    createMetaTag('keywords', siteConfig.keywords);
    createMetaTag('author', 'Sarah-Jane Iffra');
    createMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    createMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    createMetaTag('language', 'French');
    createMetaTag('subject', 'Musique, Jazz, Coaching Vocal, Sarah-Jane Iffra');
    console.log('[SEO Local Lyon] Meta tags SEO de base injectés ✅');

    // 3. Open Graph tags (Facebook, LinkedIn)
    createMetaTag('og:title', siteConfig.title, true);
    createMetaTag('og:description', siteConfig.description, true);
    createMetaTag('og:image', siteConfig.image, true);
    createMetaTag('og:url', siteConfig.url, true);
    createMetaTag('og:type', 'website', true);
    createMetaTag('og:locale', 'fr_FR', true);
    createMetaTag('og:site_name', 'Sarah-Jane Iffra', true);
    console.log('[SEO Local Lyon] Open Graph tags injectés ✅');

    // 4. Twitter Card tags
    createMetaTag('twitter:card', 'summary_large_image');
    createMetaTag('twitter:title', siteConfig.title);
    createMetaTag('twitter:description', siteConfig.description);
    createMetaTag('twitter:image', siteConfig.image);
    createMetaTag('twitter:domain', 'sarah-jane-iffra.netlify.app');
    console.log('[SEO Local Lyon] Twitter Card tags injectés ✅');

    // 5. Canonical URL
    if (!document.querySelector('link[rel="canonical"]')) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = siteConfig.url;
      head.appendChild(canonical);
    }
    console.log('[SEO Local Lyon] Canonical URL injecté ✅');

    // 6. Alternate languages
    const hrefLang = document.createElement('link');
    hrefLang.rel = 'alternate';
    hrefLang.hrefLang = 'fr';
    hrefLang.href = siteConfig.url;
    head.appendChild(hrefLang);

    const hrefLangDefault = document.createElement('link');
    hrefLangDefault.rel = 'alternate';
    hrefLangDefault.hrefLang = 'x-default';
    hrefLangDefault.href = siteConfig.url;
    head.appendChild(hrefLangDefault);
    console.log('[SEO Local Lyon] Alternate languages injectés ✅');

    // 7. Verification tags (optional)
    createMetaTag('google-site-verification', '');
    createMetaTag('msvalidate.01', '');

  } catch (error) {
    console.error('[SEO Local Lyon] Erreur injection meta tags:', error);
  }
})();
