// Confetti Animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b9d', '#ffd700', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#ff69b4'];
    
    // Clear existing confetti
    confettiContainer.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Music Toggle (You can add actual audio later)
let musicPlaying = false;

function toggleMusic() {
    const button = document.getElementById('musicToggle');
    musicPlaying = !musicPlaying;
    
    if (musicPlaying) {
        button.classList.add('playing');
        button.innerHTML = '<i class="fas fa-pause"></i>';
        // Add your music play code here
        // const audio = new Audio('birthday-song.mp3');
        // audio.play();
    } else {
        button.classList.remove('playing');
        button.innerHTML = '<i class="fas fa-music"></i>';
        // Pause music here
    }
}

// Cake Candle Blow
document.addEventListener('DOMContentLoaded', function() {
    const cake = document.querySelector('.cake');
    if (cake) {
        cake.addEventListener('click', function() {
            const flames = document.querySelectorAll('.flame');
            flames.forEach(flame => {
                flame.style.opacity = '0';
                flame.style.transform = 'translateX(-50%) scale(0)';
            });
            
            // Show celebration message
            setTimeout(() => {
                showCelebrationMessage();
                createConfetti();
                
                // Relight candles after 3 seconds
                setTimeout(() => {
                    flames.forEach(flame => {
                        flame.style.opacity = '1';
                        flame.style.transform = 'translateX(-50%) scale(1)';
                        flame.style.transition = 'all 0.5s ease';
                    });
                }, 3000);
            }, 500);
        });
    }
});

// Gift Box Function
function openGift() {
    const giftBox = document.querySelector('.gift-box');
    const giftContent = document.getElementById('giftContent');
    
    giftBox.classList.add('open');
    setTimeout(() => {
        giftContent.classList.add('show');
    }, 500);
}

function closeGift() {
    const giftBox = document.querySelector('.gift-box');
    const giftContent = document.getElementById('giftContent');
    
    giftContent.classList.remove('show');
    giftBox.classList.remove('open');
}

// Fun Facts Reveal
function revealFact(card) {
    card.classList.toggle('flipped');
}

// Celebration Button Function
function celebrate() {
    createConfetti();
    
    // Animate button
    const button = document.querySelector('.celebration-btn');
    button.style.animation = 'none';
    setTimeout(() => {
        button.style.animation = 'buttonGlow 3s infinite';
    }, 10);
    
    // Show messages in sequence
    setTimeout(() => {
        showCelebrationMessage();
    }, 500);
    
    setTimeout(() => {
        showCelebrationMessage();
    }, 4000);
    
    setTimeout(() => {
        showCelebrationMessage();
    }, 7500);
}

// Celebration Message
function showCelebrationMessage() {
    const messages = [
        "🎉 Happy Birthday Nancy! You're the best sister ever! 🎉",
        "✨ From chocolates to forever memories! ✨",
        "🎊 May all your dreams come true this year! 🎊",
        "💖 So grateful for our friendship turned siblinghood! 💖",
        "🌟 Shine bright today and always, Nancy! 🌟",
        "🎂 Best wishes from your brother Anand! 🎂",
        "🎈 You deserve all the happiness in the world! 🎈",
        "🍫 Here's to more chocolate exchanges! 🍫",
        "😊 Thank you for being the amazing person you are! 😊",
        "🎁 Wishing you a year full of surprises and joy! 🎁"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create custom alert
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        text-align: center;
        animation: zoomIn 0.5s ease-out;
        max-width: 90%;
        border: 3px solid #ffd700;
    `;
    alertDiv.textContent = randomMessage;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            if (document.body.contains(alertDiv)) {
                document.body.removeChild(alertDiv);
            }
        }, 500);
    }, 3000);
}

// Share Functions
function shareWebsite(platform) {
    const url = window.location.href;
    const text = "🎉 Check out this amazing birthday celebration for Nancy! 🎂";
    
    let shareUrl;
    
    switch(platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
    }
    
    window.open(shareUrl, '_blank');
}

// Initialize on page load
window.addEventListener('load', () => {
    createConfetti();
    
    // Add interactive effects to memory cards
    const memoryCards = document.querySelectorAll('.memory-card, .gallery-item');
    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Animate wish cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.wish-card, .timeline-item, .gallery-item').forEach(el => {
        observer.observe(el);
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Add particle effect on mouse move (optional - looks cool!)
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: particleFade 1s ease-out forwards;
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 1000);
    }
});

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFade {
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);
