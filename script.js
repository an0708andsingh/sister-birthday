// Particles Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Load saved theme
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    createParticles();
    initAOS();
});

// Simple AOS (Animate On Scroll) Implementation
function initAOS() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Celebration Modal
function openCelebration() {
    const modal = document.getElementById('celebrationModal');
    modal.classList.add('show');
    createModalConfetti();
    playCelebrationSound();
}

function closeCelebration() {
    const modal = document.getElementById('celebrationModal');
    modal.classList.remove('show');
}

// Start Celebration
function startCelebration() {
    openCelebration();
    createFloatingEmojis();
}

// Modal Confetti
function createModalConfetti() {
    const container = document.getElementById('modalConfetti');
    container.innerHTML = '';
    
    const colors = ['#FF6B9D', '#C06C84', '#4ECDC4', '#FFD700', '#FFA07A'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        container.appendChild(confetti);
    }
}

// Floating Emojis
function createFloatingEmojis() {
    const emojis = ['🎉', '🎊', '🎈', '🎁', '✨', '💝', '🍫', '🎂'];
    
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.top = '100vh';
        emoji.style.fontSize = (Math.random() * 30 + 20) + 'px';
        emoji.style.zIndex = '9999';
        emoji.style.pointerEvents = 'none';
        emoji.style.animation = `floatUp ${Math.random() * 2 + 3}s ease-out forwards`;
        document.body.appendChild(emoji);
        
        setTimeout(() => {
            emoji.remove();
        }, 5000);
    }
}

// Celebration Sound (Visual feedback if no audio)
function playCelebrationSound() {
    // You can add actual audio here
    // const audio = new Audio('celebration.mp3');
    // audio.play();
    
    // Visual feedback
    document.body.style.animation = 'flash 0.5s';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// Smooth scroll for navigation
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            top: 100%;
            transform: translateY(0) rotate(720deg);
        }
    }
    
    @keyframes floatUp {
        to {
            top: -100px;
            opacity: 0;
            transform: translateX(${Math.random() * 200 - 100}px);
        }
    }
    
    @keyframes flash {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2); }
    }
`;
document.head.appendChild(style);

// Close modal on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('celebrationModal');
    if (e.target === modal) {
        closeCelebration();
    }
});

// Cake interaction
document.addEventListener('DOMContentLoaded', () => {
    const cake = document.querySelector('.cake-3d');
    if (cake) {
        cake.addEventListener('click', () => {
            cake.style.animation = 'none';
            setTimeout(() => {
                cake.style.animation = 'cakeRotate 10s linear infinite, bounce 1s ease';
            }, 10);
            createFloatingEmojis();
        });
    }
});
