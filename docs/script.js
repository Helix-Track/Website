// HelixTrack Core Website - Interactive JavaScript

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================================================
// NAVBAR SCROLL EFFECT
// ============================================================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow when scrolled
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// ============================================================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Add staggered animation for grid items
            if (entry.target.classList.contains('feature-card') ||
                entry.target.classList.contains('doc-card') ||
                entry.target.classList.contains('download-option') ||
                entry.target.classList.contains('stat-card')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                entry.target.style.animationDelay = `${delay}ms`;
            }
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.feature-card, .doc-card, .download-option, .stat-card, .api-section, .stats-section, .contact-section').forEach(el => {
    observer.observe(el);
});

// ============================================================================
// SCROLL INDICATOR (DOWN ARROW)
// ============================================================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = featuresSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });

    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ============================================================================
// CODE COPY FUNCTIONALITY
// ============================================================================

document.querySelectorAll('.code-window pre code').forEach(codeBlock => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerHTML = '📋 Copy';
    button.addEventListener('click', () => {
        const code = codeBlock.textContent;
        navigator.clipboard.writeText(code).then(() => {
            button.innerHTML = '✅ Copied!';
            setTimeout(() => {
                button.innerHTML = '📋 Copy';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            button.innerHTML = '❌ Failed';
            setTimeout(() => {
                button.innerHTML = '📋 Copy';
            }, 2000);
        });
    });

    const codeWindow = codeBlock.closest('.code-window');
    if (codeWindow && !codeWindow.querySelector('.copy-button')) {
        codeWindow.style.position = 'relative';
        codeWindow.appendChild(button);
    }
});

// ============================================================================
// STATISTICS COUNTER ANIMATION
// ============================================================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';

            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const targetValue = parseInt(stat.textContent.replace(/,/g, ''));
                if (!isNaN(targetValue)) {
                    animateCounter(stat, targetValue);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-section').forEach(section => {
    statsObserver.observe(section);
});

// ============================================================================
// DOWNLOAD BUTTON ANALYTICS (PLACEHOLDER)
// ============================================================================

document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const method = button.closest('.download-option').querySelector('h3').textContent;
        console.log(`Download initiated: ${method}`);
        // Add analytics tracking here if needed
    });
});

// ============================================================================
// EXTERNAL LINK HANDLING
// ============================================================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    // Open external links in new tab
    if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================

document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================================================
// LOADING ANIMATION
// ============================================================================

window.addEventListener('load', () => {
    // Initialize theme
    initTheme();

    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        document.querySelector('.hero')?.classList.add('animate-in');
    }, 100);
});

// ============================================================================
// RESIZE HANDLER
// ============================================================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }, 250);
});

// ============================================================================
// THEME TOGGLE FUNCTIONALITY
// ============================================================================

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// Function to get system theme preference
function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update icon
    if (theme === 'dark') {
        themeIcon.innerHTML = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        `;
    } else {
        themeIcon.innerHTML = `
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        `;
    }
}

// Function to toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = getSystemTheme();
    const theme = savedTheme || systemTheme;

    setTheme(theme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ============================================================================
// CONSOLE MESSAGE
// ============================================================================

console.log('%c🚀 HelixTrack Core', 'font-size: 20px; font-weight: bold; color: #22C55E;');
console.log('%cThe Open-Source JIRA Alternative for the Free World', 'font-size: 14px; color: #666;');
console.log('%cGitHub: https://github.com/Helix-Track/Core', 'font-size: 12px; color: #10B981;');
console.log('%c372 API Actions | 100% JIRA + 102% Confluence Parity | 100% Free', 'font-size: 12px; color: #22C55E;');
