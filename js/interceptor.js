// Intercepteur enhanced - Sarah-Jane Iffra
console.log(' Intercepteur undefined activé (enhanced)');

// Bloquer fetch undefined RENFORCÉ
const originalFetch = window.fetch;
window.fetch = function(url, options) {
    const urlStr = url ? url.toString() : '';
    if (!url || url === 'undefined' || urlStr === 'undefined' || urlStr.includes('undefined') || urlStr === '') {
        console.warn(' Appel fetch undefined bloqué:', url);
        return Promise.resolve(new Response('{}', { status: 200 }));
    }
    return originalFetch.call(this, url, options);
};

// Bloquer navigation undefined RENFORCÉ
const originalAssign = Location.prototype.assign;
Location.prototype.assign = function(url) {
    const urlStr = url ? url.toString() : '';
    if (!url || url === 'undefined' || urlStr === 'undefined' || urlStr.includes('undefined')) {
        console.warn(' Navigation undefined bloquée:', url);
        return;
    }
    return originalAssign.call(this, url);
};

// Intercepter XMLHttpRequest aussi
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, ...args) {
    const urlStr = url ? url.toString() : '';
    if (!url || url === 'undefined' || urlStr === 'undefined' || urlStr.includes('undefined')) {
        console.warn('🚫 XHR undefined bloqué:', url);
        return;
    }
    return originalXHROpen.call(this, method, url, ...args);
};

// Intercepter window.open
const originalOpen = window.open;
window.open = function(url, target, features) {
    const urlStr = url ? url.toString() : '';
    if (!url || url === 'undefined' || urlStr === 'undefined' || urlStr.includes('undefined')) {
        console.warn('🚫 window.open undefined bloqué:', url);
        return null;
    }
    return originalOpen.call(this, url, target, features);
};

// Intercepter les événements click qui pourraient générer undefined
document.addEventListener('click', function(event) {
    const target = event.target;
    const href = target.getAttribute('href');
    
    if (href === 'undefined' || (href && href.includes('undefined'))) {
        console.warn('🚫 Clic vers undefined bloqué:', href);
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}, true);

console.log(' Protection undefined enhanced active');
