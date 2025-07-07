// Optimization simple
class SimpleOptimizer {
    constructor() {
        console.log('Optimization loaded');
    }
    
    createSimpleLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div>Loading...</div>';
        document.body.appendChild(loader);
    }
    
    finishLoading() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.remove();
        }
    }
}

window.optimizer = new SimpleOptimizer();
