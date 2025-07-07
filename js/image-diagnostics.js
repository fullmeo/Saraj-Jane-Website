/**
 * Script de diagnostic pour vérifier les images
 */

document.addEventListener('DOMContentLoaded', function() {
    // Ajouter un bouton de diagnostic
    const diagnosticButton = document.createElement('button');
    diagnosticButton.innerHTML = '🔍 Diagnostic Images';
    diagnosticButton.className = 'diagnostic-button';
    diagnosticButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #ff6b6b;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 9999;
        font-size: 12px;
    `;
    
    diagnosticButton.addEventListener('click', runImageDiagnostic);
    document.body.appendChild(diagnosticButton);
});

async function runImageDiagnostic() {
    const imagePaths = [
        // Ajoutez d'autres variations si nécessaire
    ];
    
    const results = [];
    
    for (const path of imagePaths) {
        const exists = await testImagePath(path);
        results.push({ path, exists });
    }
    
    // Afficher les résultats
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        color: black;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 10000;
        max-width: 80%;
        max-height: 80%;
        overflow-y: auto;
    `;
    
    let html = '<h3>🔍 Diagnostic des Images</h3><ul>';
    results.forEach(result => {
        const status = result.exists ? '✅' : '❌';
        html += `<li>${status} ${result.path}</li>`;
    });
    html += '</ul><button onclick="this.parentElement.remove()">Fermer</button>';
    
    modal.innerHTML = html;
    document.body.appendChild(modal);
}

function testImagePath(path) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = path;
    });
}

