// Auto-populate gallery avec les vraies images de Sarah-Jane
const galleryImages = [
    'IMG_20250531_121300_188.jpg',
    'IMG_20250531_121311_304.jpg', 
    'IMG_20250531_121432_334.jpg',
    'IMG_20250531_121451_526.jpg',
    'IMG_20250531_121503_326.jpg',
    'IMG_20250531_121511_344.jpg',
    'IMG_20250531_121521_215.jpg',
    'IMG_20250531_121521_232.jpg',
    'IMG_20250531_121522_972.jpg',
    'IMG_20250531_121533_522.jpg',
    'IMG_20250531_152502_459.jpg'
];

// Populate gallery immediately
function populateGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    gallery.innerHTML = galleryImages.map((img, index) => `
        <div class="gallery-item" data-aos="fade-up" data-aos-delay="${index * 100}">
            <img src="images/gallery/${img}" 
                 alt="Artwork ${index + 1}" 
                 loading="lazy"
                 onclick="openLightbox('images/gallery/${img}')">
            <div class="overlay">
                <h3>Création ${index + 1}</h3>
                <p>Art & Musique</p>
            </div>
        </div>
    `).join('');
}

// Simple lightbox 
function openLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="Artwork">
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    document.body.appendChild(lightbox);
}

// Populate videos YouTube (exemples - remplacer par les vraies)
function populateVideos() {
    const videoContainer = document.getElementById('video-container');
    if (!videoContainer) return;
    
    const videos = [
        { id: 'dQw4w9WgXcQ', title: 'Clip Musical #1', views: '1.2M' },
        { id: 'oHg5SJYRHA0', title: 'Performance Live', views: '890K' },
        { id: 'fJ9rUzIMcZQ', title: 'Studio Session', views: '654K' }
    ];
    
    videoContainer.innerHTML = videos.map(video => `
        <div class="video-item">
            <div class="video-thumbnail" onclick="playVideo('${video.id}')">
                <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" alt="${video.title}">
                <div class="play-button">▶</div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.views} vues</p>
            </div>
        </div>
    `).join('');
}

function playVideo(videoId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.allow = 'autoplay';
    
    const lightbox = document.createElement('div');
    lightbox.className = 'video-lightbox';
    lightbox.innerHTML = `
        <div class="video-lightbox-content">
            ${iframe.outerHTML}
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    document.body.appendChild(lightbox);
}

// Auto-run when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    populateGallery();
    populateVideos();
});

// Also run immediately if DOM already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        populateGallery();
        populateVideos();
    });
} else {
    populateGallery();
    populateVideos();
}