// Confetti Animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b9d', '#ffd700', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 4 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Celebration Button Function
function celebrate() {
    // Clear existing confetti
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';
    
    // Create new burst of confetti
    createConfetti();
    
    // Play celebration animation
    const button = document.querySelector('.celebration-btn');
    button.style.animation = 'none';
    setTimeout(() => {
        button.style.animation = 'pulse 2s infinite';
    }, 10);
    
    // Show alert
    setTimeout(() => {
        showCelebrationMessage();
    }, 500);
}

// Celebration Message
function showCelebrationMessage() {
    const messages = [
        "🎉 Happy Birthday Nancy! You're the best sister! 🎉",
        "✨ Here's to many more years of friendship & siblinghood! ✨",
        "🎊 May your day be as wonderful as you are! 🎊",
        "💖 From school friends to forever siblings! 💖",
        "🌟 Shine bright today and always, Nancy! 🌟",
        "🎂 Best wishes from your brother Anand! 🎂",
        "🎈 You deserve all the happiness in the world! 🎈"
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
        z-index: 1000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        text-align: center;
        animation: zoomIn 0.5s ease-out;
        max-width: 90%;
    `;
    alertDiv.textContent = randomMessage;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 500);
    }, 3000);
}

// Initialize on page load
window.addEventListener('load', () => {
    createConfetti();
    
    // Add interactive effects to memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                card.style.animation = '';
            }, 500);
        });
    });
    
    // Add floating animation to wish cards
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add CSS for fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);
