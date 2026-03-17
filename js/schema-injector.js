/**
 * Schema.org Structured Data Injector
 * Charge et injecte les données structurées (JSON-LD) pour SEO local
 * Schemas: MusicGroup, LocalBusiness, Events, Reviews, FAQPage, BreadcrumbList
 * Date: 17 Mars 2026
 */

(function injectStructuredData() {
  const schemaFiles = [
    { path: 'data/schema-music-group.json', name: 'MusicGroup' },
    { path: 'data/schema-local-business.json', name: 'MusicSchool' },
    { path: 'data/schema-events.json', name: 'EventSeries' },
    { path: 'data/schema-reviews.json', name: 'ItemList' },
    { path: 'data/schema-breadcrumb.json', name: 'BreadcrumbList' },
    { path: 'data/schema-faq-local.json', name: 'FAQPage' }
  ];

  let successCount = 0;
  let errorCount = 0;

  /**
   * Injecte un schema JSON-LD dans le HEAD
   * @param {Object} schemaData - Données du schema
   * @param {String} schemaType - Type de schema (MusicGroup, etc.)
   */
  function injectSchema(schemaData, schemaType) {
    try {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);

      successCount++;
      console.log(`[SEO Local Lyon] Schema injecté: ${schemaFiles.find(f => f.name === schemaType).path} (${schemaType}) ✅`);
      return true;
    } catch (error) {
      errorCount++;
      console.error(`[SEO Local Lyon] Erreur injection schema ${schemaType}:`, error);
      return false;
    }
  }

  /**
   * Charge un fichier JSON et l'injecte en tant que schema
   * @param {String} filePath - Chemin du fichier JSON
   * @param {String} schemaType - Type de schema
   */
  async function loadAndInjectSchema(filePath, schemaType) {
    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const schemaData = await response.json();
      injectSchema(schemaData, schemaType);

    } catch (error) {
      errorCount++;
      console.error(`[SEO Local Lyon] Erreur chargement ${filePath}:`, error);
    }
  }

  /**
   * Charge tous les schemas de manière asynchrone
   */
  async function loadAllSchemas() {
    try {
      // Charger les schemas en parallèle
      const promises = schemaFiles.map(file =>
        loadAndInjectSchema(file.path, file.name)
      );

      await Promise.all(promises);

      // Résumé final
      setTimeout(() => {
        console.log(`[SEO Local Lyon] ✅ TOUS LES SCHEMAS INJECTÉS AVEC SUCCÈS`);
        console.log(`[SEO Local Lyon] Résultat: ${successCount} schemas injectés, ${errorCount} échecs`);

        if (errorCount > 0) {
          console.warn(`[SEO Local Lyon] ⚠️ Vérifiez les chemins des fichiers JSON`);
        }
      }, 100);

    } catch (error) {
      console.error('[SEO Local Lyon] Erreur globale chargement schemas:', error);
    }
  }

  // Commencer le chargement dès que le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllSchemas);
  } else {
    loadAllSchemas();
  }

})();
