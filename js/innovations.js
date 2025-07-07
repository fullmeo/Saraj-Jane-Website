/**
 * Fonctionnalités Innovantes 2025
 * Intelligence Artificielle, Réalité Augmentée, Web3
 */

// Mode IA - Recommandations musicales
function initAIRecommendations() {
    const aiButton = document.createElement('button');
    aiButton.innerHTML = '🤖 IA Musical';
    aiButton.className = 'ai-button';
    aiButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: linear-gradient(45deg, #ff006e, #8bff00);
        border: none;
        color: white;
        padding: 15px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        z-index: 1000;
        animation: pulse 2s infinite;
    `;
    
    aiButton.addEventListener('click', showAIRecommendations);
    document.body.appendChild(aiButton);
}

function showAIRecommendations() {
    const modal = document.createElement('div');
    modal.className = 'ai-modal';
    modal.innerHTML = `
        <div class="ai-content">
            <h3>🎵 Recommandations IA</h3>
            <p>Basées sur vos goûts musicaux...</p>
            <div class="ai-suggestions">
                <div class="suggestion">🎧 "Cosmic Dreams" - Style Électronique</div>
                <div class="suggestion">🎵 "Urban Poetry" - Style Pop/Rock</div>
                <div class="suggestion">🌟 "Stellar Vibes" - Style Ambient</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()">Fermer</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    document.body.appendChild(modal);
}

// Mode AR - Visualisation 3D
function initARMode() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        const arButton = document.createElement('button');
        arButton.innerHTML = '📱 Mode AR';
        arButton.className = 'ar-button';
        arButton.addEventListener('click', activateAR);
        
        // Ajouter à l'interface
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) {
            heroButtons.appendChild(arButton);
        }
    }
}

function activateAR() {
    // Simulation d'activation AR
    const arOverlay = document.createElement('div');
    arOverlay.innerHTML = `
        <div class="ar-interface">
            <div class="ar-scanner"></div>
            <p>Pointez votre appareil vers l'espace pour voir Sarah-Jane en 3D!</p>
            <button onclick="this.parentElement.parentElement.remove()">Désactiver AR</button>
        </div>
    `;
    
    arOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        text-align: center;
    `;
    
    document.body.appendChild(arOverlay);
}

// Web3 Integration - NFT Gallery
function initWeb3Features() {
    const web3Section = document.createElement('section');
    web3Section.innerHTML = `
        <div class="container">
            <h2>🎨 Collection NFT Exclusive</h2>
            <div class="nft-grid">
                <div class="nft-card">
                    <div class="nft-preview">🎵</div>
                    <h4>Music Wave #001</h4>
                    <p>0.5 ETH</p>
                    <button class="mint-button">Mint NFT</button>
                </div>
                <div class="nft-card">
                    <div class="nft-preview">🌟</div>
                    <h4>Stellar Voice #002</h4>
                    <p>0.3 ETH</p>
                    <button class="mint-button">Mint NFT</button>
                </div>
            </div>
        </div>
    `;
    
    // Insérer après la galerie
    const gallery = document.querySelector('#portfolio');
    if (gallery) {
        gallery.after(web3Section);
    }
}

// Voice Control - Contrôle vocal
function initVoiceControl() {
    if ('speechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'fr-FR';
        
        recognition.onresult = function(event) {
            const last = event.results.length - 1;
            const command = event.results[last][0].transcript.toLowerCase();
            
            if (command.includes('galerie')) {
                document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
            } else if (command.includes('vidéo')) {
                document.querySelector('#videos').scrollIntoView({ behavior: 'smooth' });
            } else if (command.includes('contact')) {
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            }
        };
        
        // Bouton d'activation vocal
        const voiceButton = document.createElement('button');
        voiceButton.innerHTML = '🎤 Contrôle Vocal';
        voiceButton.addEventListener('click', () => {
            recognition.start();
            voiceButton.textContent = '🎤 À l\'écoute...';
            setTimeout(() => {
                recognition.stop();
                voiceButton.innerHTML = '🎤 Contrôle Vocal';
            }, 5000);
        });
        
        document.querySelector('.hero-content').appendChild(voiceButton);
    }
}

// PWA - Progressive Web App
function initPWA() {
    // Service Worker pour mode hors ligne
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }
    
    // Installation PWA
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        const installButton = document.createElement('button');
        installButton.innerHTML = '📱 Installer l\'App';
        installButton.className = 'install-button';
        installButton.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA installée');
                }
                deferredPrompt = null;
            });
        });
        
        document.querySelector('.hero-content').appendChild(installButton);
    });
}

// Initialisation de toutes les innovations
document.addEventListener('DOMContentLoaded', function() {
    initAIRecommendations();
    initARMode();
    initWeb3Features();
    initVoiceControl();
    initPWA();
});