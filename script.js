// Global Variables
let currentScreen = 1;
const totalScreens = 9;

// Initialize
window.addEventListener('load', () => {
    updateProgress();
    startTypingEffect();
    initCounters();
    initCake();
});

// Progress Bar
function updateProgress() {
    const progress = (currentScreen / totalScreens) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Navigate Screens
function nextScreen(screenNum) {
    const currentEl = document.getElementById(`screen${currentScreen}`);
    const nextEl = document.getElementById(`screen${screenNum}`);
    
    if (nextEl) {
        currentEl.style.display = 'none';
        nextEl.style.display = 'flex';
        currentScreen = screenNum;
        updateProgress();
        
        // Trigger animations
        if (screenNum === 3) {
            animateCounters();
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Typing Effect
function startTypingEffect() {
    const text = "Dear Nancy, remember our school days?";
    const element = document.getElementById('typingText');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    setTimeout(type, 1000);
}

// Show Full Message
function showFullMessage() {
    document.getElementById('typingText').style.display = 'none';
    document.getElementById('fullMessage').style.display = 'block';
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counter.setAttribute('data-current', '0');
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (target === 1 ? '' : '+');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);
    });
}

// Wish Cards
function revealWish(card) {
    card.classList.toggle('flipped');
}

// Cake Interaction
function initCake() {
    const cake = document.getElementById('cakeModern');
    if (cake) {
        cake.addEventListener('click', blowCandles);
    }
}

function blowCandles() {
    const flames = document.querySelectorAll('.candle-flame');
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.style.opacity = '0';
            flame.style.transform = 'scale(0)';
        }, index * 200);
    });
    
    setTimeout(() => {
        showMessage('🎉 Wish Made! May it come true! ✨');
        createConfetti();
        
        // Relight candles
        setTimeout(() => {
            flames.forEach(flame => {
                flame.style.opacity = '1';
                flame.style.transform = 'scale(1)';
                flame.style.transition = 'all 0.5s';
            });
        }, 3000);
    }, 800);
}

// Celebration
function launchCelebration() {
    createFireworks();
    createConfetti();
    playConfettiAnimation();
    showMessage('🎊 HAPPY BIRTHDAY NANCY! 🎊');
}

// Confetti
function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const colors = ['#FF3366', '#9333FF', '#00D4FF', '#FFD700', '#FF6B9D'];
    
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((c, index) => {
            ctx.beginPath();
            ctx.lineWidth = c.r / 2;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + c.r, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
            ctx.stroke();
            
            c.tiltAngle += c.tiltAngleIncremental;
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.tilt = Math.sin(c.tiltAngle - index / 3) * 15;
            
            if (c.y > canvas.height) {
                confetti[index] = {
                    x: Math.random() * canvas.width,
                    y: -20,
                    r: c.r,
                    d: c.d,
                    color: c.color,
                    tilt: c.tilt,
                    tiltAngleIncremental: c.tiltAngleIncremental,
                    tiltAngle: c.tiltAngle
                };
            }
        });
        
        requestAnimationFrame(draw);
    }
    
    draw();
    
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}

// Fireworks
function createFireworks() {
    const fireworksEl = document.getElementById('fireworks');
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, #FFD700, transparent);
                border-radius: 50%;
                animation: explode 1s ease-out forwards;
            `;
            fireworksEl.appendChild(firework);
            
            setTimeout(() => firework.remove(), 1000);
        }, i * 500);
    }
}

// Confetti Animation
function playConfettiAnimation() {
    const emojis = ['🎉', '🎊', '🎈', '✨', '💝', '🎁', '🍫'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -50px;
                font-size: ${Math.random() * 30 + 20}px;
                z-index: 9999;
                pointer-events: none;
                animation: fall ${Math.random() * 2 + 3}s linear forwards;
            `;
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 5000);
        }, i * 100);
    }
}

// Messages
function showMessage(text) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #FF3366, #9333FF);
        color: white;
        padding: 30px 60px;
        border-radius: 20px;
        font-size: 2rem;
        font-weight: 900;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: popIn 0.5s ease-out;
    `;
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.style.animation = 'popOut 0.5s ease-out';
        setTimeout(() => msg.remove(), 500);
    }, 3000);
}

// Restart Experience
function restartExperience() {
    document.getElementById('screen9').style.display = 'none';
    document.getElementById('screen1').style.display = 'flex';
    currentScreen = 1;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Share Functions
function shareOn(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("🎂 Check out this amazing birthday celebration for Nancy!");
    
    const urls = {
        whatsapp: `https://wa.me/?text=${text}%20${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    };
    
    window.open(urls[platform], '_blank');
}

// Music Toggle
let musicPlaying = false;
function toggleMusic() {
    musicPlaying = !musicPlaying;
    const control = document.querySelector('.music-control');
    
    if (musicPlaying) {
        control.style.animation = 'pulse 1s infinite';
        // Add your music play code here
        // const audio = new Audio('birthday-song.mp3');
        // audio.play();
    } else {
        control.style.animation = '';
    }
}

// Add CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            top: 100vh;
            transform: rotate(720deg);
        }
    }
    
    @keyframes explode {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes popIn {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes popOut {
        to {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize all screens as hidden except first
window.addEventListener('DOMContentLoaded', () => {
    for (let i = 2; i <= totalScreens; i++) {
        const screen = document.getElementById(`screen${i}`);
        if (screen) screen.style.display = 'none';
    }
});
