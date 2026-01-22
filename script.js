/**
 * ====================================================
 * PORTFOLIO WEBSITE - JAVASCRIPT
 * Dark Mode | Modern & Responsive Design
 * ====================================================
 */

/**
 * PROFILE IMAGE CAROUSEL
 * تحميل وتبديل جميع الصور من مجلد ImagesYoussef تلقائياً
 */
function initializeProfileCarousel() {
    const carousel = document.getElementById('profileCarousel');
    if (!carousel) return;

    // قائمة الصور - تم حذف الصور بالأحرف العربية التي تسبب مشاكل
    const images = [
        '1000022806.jpg',
        '1000022808.jpg',
        '334959766_1550884985396496_7576910837819124137_n.jpg',
        'b1d54022df18ddc06df41ef608d108c7.jpg',
        'FB_IMG_1628348325853.jpg',
        'FB_IMG_1653344742077.jpg',
        'FB_IMG_1653344790675.jpg',
        'IMG-20210513-WA0006.jpg',
        'IMG-20220126-WA0014.jpg',
        'IMG_20220523_224006_477.jpg',
        'youssef2.jpg'
    ];

    // إنشاء عناصر الصور ديناميكياً
    let loadedImages = 0;
    
    images.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = 'ImagesYoussef/' + img;
        imgElement.alt = 'Developer Avatar ' + (index + 1);
        imgElement.className = 'profile-image img-fluid rounded-lg shadow-lg';
        
        // عند تحميل الصورة بنجاح
        imgElement.onload = function() {
            loadedImages++;
        };
        
        // الصورة الأولى تكون active
        if (index === 0) {
            imgElement.classList.add('active');
        }
        
        carousel.appendChild(imgElement);
    });

    // تبديل الصور كل 3 ثوانٍ
    let currentIndex = 0;
    const imgElements = carousel.querySelectorAll('.profile-image');

    if (imgElements.length > 0) {
        setInterval(() => {
            // إزالة active من الصورة الحالية
            imgElements[currentIndex].classList.remove('active');

            // الانتقال للصورة التالية
            currentIndex = (currentIndex + 1) % imgElements.length;

            // إضافة active للصورة الجديدة
            imgElements[currentIndex].classList.add('active');
        }, 10000); // تغيير الصورة كل 10 ثوانٍ
    }
}

/**
 * NAVBAR - Highlight active links on scroll
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeProfileCarousel();
    initializeNav();
    initializeScrollReveal();
    initializeSmoothScroll();
});
function initializeNav() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Close navbar when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
            }
        });
    });
}

/**
 * SMOOTH SCROLL - For internal links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                return;
            }

            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * SCROLL REVEAL ANIMATION
 * Fade in elements as they come into view
 */
function initializeScrollReveal() {
    // Add reveal class to elements that should animate on scroll
    const elementsToReveal = document.querySelectorAll(
        '.skill-card, .project-card, .contact-info-card'
    );
    
    elementsToReveal.forEach(element => {
        element.classList.add('reveal');
    });

    // Intersection Observer for scroll reveal
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    elementsToReveal.forEach(element => {
        revealOnScroll.observe(element);
    });
}

/**
 * EMAIL VALIDATION HELPER
 * Validates email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * DEBOUNCE HELPER
 * Prevents function from being called too often
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * SCROLL TO TOP BUTTON
 * (Optional enhancement - uncomment to enable)
 */
function initializeScrollToTop() {
    // Create button
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scrollToTopBtn';
    scrollButton.className = 'btn btn-primary rounded-circle position-fixed';
    scrollButton.style.bottom = '30px';
    scrollButton.style.right = '30px';
    scrollButton.style.width = '50px';
    scrollButton.style.height = '50px';
    scrollButton.style.display = 'none';
    scrollButton.style.zIndex = '999';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    document.body.appendChild(scrollButton);

    // Show button when scrolled down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'flex';
            scrollButton.style.alignItems = 'center';
            scrollButton.style.justifyContent = 'center';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * LAZY LOAD IMAGES
 * (Optional enhancement - uncomment to enable)
 */
function initializeLazyLoad() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * DARK MODE TOGGLE
 * (Optional enhancement - uncomment to enable)
 */
function initializeDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'btn btn-outline-light position-fixed rounded-circle';
    darkModeToggle.style.bottom = '30px';
    darkModeToggle.style.right = '90px';
    darkModeToggle.style.width = '50px';
    darkModeToggle.style.height = '50px';
    darkModeToggle.style.zIndex = '999';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    document.body.appendChild(darkModeToggle);
}

/**
 * COUNTER ANIMATION
 * (Optional enhancement - for stats section)
 */
function animateCounters(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

/**
 * COPY TO CLIPBOARD
 * (Optional enhancement - for contact info)
 */
function initializeCopyToClipboard() {
    document.querySelectorAll('[data-copy]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.getAttribute('data-copy');
            
            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check me-1"></i>Copied!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });
}

/**
 * CONSOLE MESSAGE
 */
console.log(
    '%c👋 Welcome to my portfolio!',
    'font-size: 20px; font-weight: bold; color: #3b82f6;'
);
console.log(
    '%cBuilt with HTML5, CSS3, JavaScript, Bootstrap 5 & Tailwind CSS',
    'font-size: 14px; color: #9ca3af;'
);
console.log(
    '%cCheck out the source code and feel free to reach out!',
    'font-size: 14px; color: #10b981;'
);

/**
 * OPTIONAL ENHANCEMENTS
 * Uncomment the function calls below to enable additional features
 */

// initializeScrollToTop();
// initializeDarkModeToggle();
// initializeLazyLoad();
// initializeCopyToClipboard();
