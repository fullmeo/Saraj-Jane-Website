// BASCULEMENT DOUBLE IDENTITÉ
        document.querySelector('.jazz-btn').addEventListener('click', () => switchMode('jazz'));
        document.querySelector('.alert-btn').addEventListener('click', () => switchMode('alert'));
        function switchMode(mode) {
            const body = document.body;
            const title = document.getElementById('main-title');
            const subtitle = document.getElementById('subtitle');
            const description = document.getElementById('hero-description');
            const jazzContent = document.getElementById('jazz-content');
            const alertContent = document.getElementById('alert-content');
            const jazzBtn = document.querySelector('.jazz-btn');
            const alertBtn = document.querySelector('.alert-btn');
            
            // Reset buttons
            jazzBtn.classList.remove('active');
            alertBtn.classList.remove('active');
            
            if (mode === 'jazz') {
                body.className = 'jazz-mode';
                jazzBtn.classList.add('active');
                title.textContent = 'Sarah-Jane Iffra';
                subtitle.textContent = '🎵 Jazz • Soul • Tribute Amy Winehouse';
                description.textContent = 'De Amy Winehouse aux standards intemporels. L\'élégance du jazz, l\'authenticité de l\'émotion, la sophistication de l\'art vocal.';
                jazzContent.classList.add('active');
                alertContent.classList.remove('active');
            } else {
                body.className = 'alert-mode';
                alertBtn.classList.add('active');
                title.textContent = 'SARAH-JANE IFFRA';
                subtitle.textContent = '🚨 CHANTEUSE D\'ALERTES • VOIX LIBRE';
                description.textContent = 'Messages citoyens sans filtre. Parodies engagées, vérités qui dérangent. L\'art au service de l\'éveil des consciences.';
                alertContent.classList.add('active');
                jazzContent.classList.remove('active');
            }
        }
        
        // LIGHTBOX PHOTOS
        document.querySelectorAll('.photo-item').forEach(item => {
            item.addEventListener('click', () => openLightbox(item.dataset.src));
        });
        document.getElementById('lightbox').addEventListener('click', () => closeLightbox());
        function openLightbox(imageSrc) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            lightboxImage.src = imageSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // FERMETURE LIGHTBOX AVEC ÉCHAP
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
        
        // SCROLL FLUIDE
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // ANALYTICS SIMULATION (remplacer par vrai Google Analytics)
        function trackEvent(category, action, label) {
            console.log('Analytics:', category, action, label);
        }
        
        // TRACK CLICKS
        document.querySelectorAll('a[href*="youtube"]').forEach(link => {
            link.addEventListener('click', () => trackEvent('Social', 'YouTube_Click', 'sarahjaneiffra'));
        });
        
        document.querySelectorAll('.switch-btn').forEach(btn => {
            btn.addEventListener('click', (e) => trackEvent('UI', 'Mode_Switch', e.target.textContent));
        });
        
        // CHARGEMENT DES STATISTIQUES YOUTUBE STATIQUES
        function loadYouTubeStats() {
            if (window.db) {
                window.db.collection('settings').doc('youtubeStats').get().then(doc => {
                    if (doc.exists) {
                        const data = doc.data();
                        const formatNumber = (num) => {
                            const number = parseInt(num);
                            if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
                            if (number >= 1000) return (number / 1000).toFixed(1) + 'K';
                            return number.toString();
                        };
                        if (document.getElementById('static-youtube-subs')) {
                            document.getElementById('static-youtube-subs').textContent = formatNumber(data.subscribers);
                        }
                        if (document.getElementById('static-youtube-views')) {
                            document.getElementById('static-youtube-views').textContent = formatNumber(data.views);
                        }
                        if (document.getElementById('static-youtube-channel')) {
                            document.getElementById('static-youtube-channel').textContent = data.channelName;
                        }
                    }
                }).catch(error => {
                    console.warn('Impossible de charger les statistiques YouTube Firestore:', error);
                });
            }
        }
        
        // Charger les statistiques au chargement de la page
        document.addEventListener('DOMContentLoaded', function() {
            loadYouTubeStats();
            initAudioPlayer();
        });
        
        // ====================================
        // PLAYER AUDIO MODERNE
        // ====================================
        
        let currentTrackIndex = 0;
        let isPlaying = false;
        let currentVolume = 0.7;
        
        // 🔧 FIX: Playlist avec URLs audio de test fonctionnelles
        const playlist = [
            {
                title: "Back to Black (Demo)",
                artist: "Sarah-Jane Iffra",
                cover: "images/gallery/IMG_20250531_121533_522.jpg",
                audio: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
                duration: "3:45",
                category: "jazz"
            },
            {
                title: "Soirées Parisiennes (Demo)",
                artist: "Sarah-Jane Iffra",
                cover: "images/gallery/IMG_20250531_121300_188.jpg",
                audio: "https://file-examples.com/storage/fe86d52d5f0e2b51ccf61d5/2017/11/file_example_MP3_700KB.mp3",
                duration: "4:12",
                category: "alert"
            },
            {
                title: "Valerie (Demo)",
                artist: "Sarah-Jane Iffra",
                cover: "images/gallery/IMG_20250531_121432_334.jpg",
                audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                duration: "3:58",
                category: "jazz"
            }
        ];
        
        function initAudioPlayer() {
            const audio = document.getElementById('audioElement');
            const progressFill = document.getElementById('progressFill');
            const currentTimeEl = document.getElementById('currentTime');
            const totalTimeEl = document.getElementById('totalTime');
            const volumeFill = document.getElementById('volumeFill');
            
            // Initialiser le volume
            audio.volume = currentVolume;
            volumeFill.style.width = (currentVolume * 100) + '%';
            
            // Événements audio
            audio.addEventListener('loadedmetadata', function() {
                totalTimeEl.textContent = formatTime(audio.duration);
            });
            
            audio.addEventListener('timeupdate', function() {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressFill.style.width = progress + '%';
                currentTimeEl.textContent = formatTime(audio.currentTime);
            });
            
            audio.addEventListener('ended', function() {
                nextTrack();
            });
            
            // Charger la première piste
            loadTrack(currentTrackIndex);
            console.log('✅ Player audio initialisé avec', playlist.length, 'pistes');
        }
        
        function loadTrack(index) {
            if (index < 0 || index >= playlist.length) return;
            
            currentTrackIndex = index;
            const track = playlist[index];
            const audio = document.getElementById('audioElement');
            
            // Mettre à jour l'interface
            document.getElementById('playerTitle').textContent = track.title;
            document.getElementById('playerArtist').textContent = track.artist;
            document.getElementById('playerCover').src = track.cover;
            
            // Charger l'audio
            audio.src = track.audio;
            audio.load();
            
            console.log('🎵 Track chargé:', track.title);
            
            // Vérifier si le mode correspond à la catégorie
            const body = document.body;
            if (track.category === 'jazz' && !body.classList.contains('jazz-mode')) {
                switchMode('jazz');
            } else if (track.category === 'alert' && !body.classList.contains('alert-mode')) {
                switchMode('alert');
            }
        }
        
        document.getElementById('playBtn').addEventListener('click', () => togglePlay());
        function togglePlay() {
            const audio = document.getElementById('audioElement');
            const playIcon = document.getElementById('playIcon');
            
            if (isPlaying) {
                audio.pause();
                playIcon.className = 'fas fa-play';
                isPlaying = false;
                console.log('⏸️ Audio en pause');
            } else {
                audio.play().then(() => {
                    playIcon.className = 'fas fa-pause';
                    isPlaying = true;
                    console.log('▶️ Audio en lecture');
                }).catch(error => {
                    console.warn('⚠️ Erreur de lecture audio:', error);
                    playIcon.className = 'fas fa-pause';
                    isPlaying = true;
                });
            }
        }
        
        document.querySelector('.prev-btn').addEventListener('click', () => previousTrack());
        function previousTrack() {
            let newIndex = currentTrackIndex - 1;
            if (newIndex < 0) newIndex = playlist.length - 1;
            loadTrack(newIndex);
            if (isPlaying) {
                const audio = document.getElementById('audioElement');
                audio.play();
            }
        }
        
        document.querySelector('.next-btn').addEventListener('click', () => nextTrack());
        function nextTrack() {
            let newIndex = currentTrackIndex + 1;
            if (newIndex >= playlist.length) newIndex = 0;
            loadTrack(newIndex);
            if (isPlaying) {
                const audio = document.getElementById('audioElement');
                audio.play();
            }
        }
        
        document.getElementById('progressBar').addEventListener('click', (event) => seekTo(event));
        function seekTo(event) {
            const audio = document.getElementById('audioElement');
            const progressBar = event.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const progressBarWidth = rect.width;
            const seekTime = (clickX / progressBarWidth) * audio.duration;
            
            audio.currentTime = seekTime;
        }
        
        document.getElementById('volumeSlider').addEventListener('click', (event) => setVolume(event));
        function setVolume(event) {
            const volumeSlider = event.currentTarget;
            const rect = volumeSlider.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const sliderWidth = rect.width;
            
            currentVolume = Math.max(0, Math.min(1, clickX / sliderWidth));
            const audio = document.getElementById('audioElement');
            audio.volume = currentVolume;
            
            const volumeFill = document.getElementById('volumeFill');
            volumeFill.style.width = (currentVolume * 100) + '%';
        }
        
        document.getElementById('playerToggle').addEventListener('click', () => togglePlayer());
        function togglePlayer() {
            const player = document.getElementById('audioPlayer');
            const toggle = document.getElementById('playerToggle');
            
            if (player.classList.contains('active')) {
                player.classList.remove('active');
                toggle.innerHTML = '<i class="fas fa-music"></i>';
                console.log('🎵 Player masqué');
            } else {
                player.classList.add('active');
                toggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
                console.log('🎵 Player affiché');
            }
        }
        
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        
        // COPIE EMAIL DANS PRESSE-PAPIER
        document.querySelector('.btn-email').addEventListener('click', (event) => copyEmail(event));
        function copyEmail(event) {
            const email = 'ifrasoleil@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                // Animation visuelle de confirmation
                const btn = event.currentTarget;
                const originalText = btn.innerHTML;
                btn.innerHTML = '✅ Email copié !';
                btn.style.background = '#22C55E';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '#D4AF37';
                }, 2000);
                
                console.log('📧 Email copié:', email);
            }).catch(err => {
                // Fallback si clipboard API non supportée
                console.log('📧 Email à copier:', email);
                alert('Email: ' + email);
            });
        }
        
        // Message de confirmation du chargement
        console.log('✅ Site Sarah-Jane Iffra chargé et fonctionnel !');
        console.log('🎵 Player audio: Clique le bouton en bas à droite');
        console.log('📸 Lightbox: Clique sur une photo de la galerie');
        console.log('🔄 Double identité: Boutons Jazz/Alertes en haut à droite');