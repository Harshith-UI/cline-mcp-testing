// Famous People Memes Website JavaScript

// Function to show different meme sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.meme-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update navigation button styles
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Find and highlight the clicked button
    event.target.classList.add('active');
}

// Visitor counter (simulated)
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount = parseInt(visitorCount) + 1;
localStorage.setItem('visitorCount', visitorCount);

// Update visitor count display
document.addEventListener('DOMContentLoaded', function() {
    const countElement = document.getElementById('count');
    if (countElement) {
        // Animate the counter
        animateCounter(countElement, 0, visitorCount, 2000);
    }

    // Add click tracking to meme cards
    const memeCards = document.querySelectorAll('.meme-card');
    memeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a fun click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Track clicks (in a real app, this would send to analytics)
            console.log('Meme clicked:', this.querySelector('h3').textContent);
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        const sections = ['celebrities', 'politicians', 'athletes', 'random'];
        const currentSection = document.querySelector('.meme-section.active');
        const currentIndex = sections.findIndex(id => currentSection && currentSection.id === id);

        if (event.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            showSection(sections[currentIndex + 1]);
        } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
            showSection(sections[currentIndex - 1]);
        }
    });

    // Add random meme generator
    addRandomMemeFeature();
});

// Animated counter function
function animateCounter(element, start, end, duration) {
    if (start === end) return;
    const range = end - start;
    const minTimer = 50;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = stepTime < minTimer ? minTimer : stepTime;

    const startTime = new Date().getTime();
    const endTime = startTime + duration;

    function run() {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * range));
        element.innerHTML = value.toLocaleString();
        if (value == end) {
            clearInterval(timer);
        }
    }

    const timer_id = setInterval(run, timer);
    run();
}

// Random meme feature
function addRandomMemeFeature() {
    // Create a floating "Random Meme" button
    const randomButton = document.createElement('button');
    randomButton.textContent = '🎲 Random Meme';
    randomButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    randomButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    randomButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    randomButton.addEventListener('click', function() {
        const sections = ['celebrities', 'politicians', 'athletes', 'random'];
        const randomSection = sections[Math.floor(Math.random() * sections.length)];
        showSection(randomSection);

        // Add a fun animation
        this.style.animation = 'spin 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });

    document.body.appendChild(randomButton);
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: scale(1.1) rotate(0deg); }
        100% { transform: scale(1.1) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(event) {
    konamiCode.push(event.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow-bg 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);

        // Show a fun message
        const easterEgg = document.createElement('div');
        easterEgg.textContent = '🎉 Konami Code Activated! 🎉';
        easterEgg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-size: 2rem;
            z-index: 1001;
            animation: bounce 1s infinite;
        `;
        document.body.appendChild(easterEgg);
        setTimeout(() => {
            document.body.removeChild(easterEgg);
        }, 3000);
    }
});

// Add rainbow background animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow-bg {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
        40% { transform: translate(-50%, -50%) translateY(-10px); }
        60% { transform: translate(-50%, -50%) translateY(-5px); }
    }
`;
document.head.appendChild(rainbowStyle);

// Performance monitoring (for fun)
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)} milliseconds`);

    // Track meme interactions
    let interactionCount = 0;
    document.addEventListener('click', function(event) {
        if (event.target.closest('.meme-card')) {
            interactionCount++;
            console.log(`Total meme interactions: ${interactionCount}`);
        }
    });
});
