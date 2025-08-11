// JavaScript for HTML version functionality

document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality
    const languageToggle = document.getElementById('languageToggle');
    const html = document.documentElement;
    let currentLanguage = localStorage.getItem('language') || 'ar';

    // Set initial language
    setLanguage(currentLanguage);

    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        setLanguage(currentLanguage);
        localStorage.setItem('language', currentLanguage);
    });

    function setLanguage(lang) {
        if (lang === 'ar') {
            html.setAttribute('lang', 'ar');
            html.setAttribute('dir', 'rtl');
            languageToggle.querySelector('span').textContent = 'EN';
            updateContent('ar');
        } else {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            languageToggle.querySelector('span').textContent = 'عربي';
            updateContent('en');
        }
    }

    function updateContent(lang) {
        const translations = {
            ar: {
                'hero-title-1': 'مستقبلك المهني',
                'hero-title-2': 'في القطاع الصحي',
                'hero-description': 'اكتشف أفضل الفرص الوظيفية في المجال الصحي بالمملكة العربية السعودية. نربطك بأرقى المؤسسات الصحية والعيادات المتخصصة.',
                'search-job': 'ابحث عن وظيفة',
                'register-now': 'سجل الآن',
                'quick-search': 'بحث سريع',
                'specialty-placeholder': 'التخصص أو المسمى الوظيفي',
                'select-city': 'اختر المدينة',
                'search': 'بحث',
                'available-jobs': 'وظيفة متاحة',
                'registered-candidates': 'مرشح مسجل',
                'employers': 'جهة توظيف',
                'successful-placements': 'توظيف ناجح'
            },
            en: {
                'hero-title-1': 'Your Professional Future',
                'hero-title-2': 'in Healthcare',
                'hero-description': 'Discover the best job opportunities in healthcare in Saudi Arabia. We connect you with the finest medical institutions and specialized clinics.',
                'search-job': 'Search for Jobs',
                'register-now': 'Register Now',
                'quick-search': 'Quick Search',
                'specialty-placeholder': 'Specialty or Job Title',
                'select-city': 'Select City',
                'search': 'Search',
                'available-jobs': 'Available Jobs',
                'registered-candidates': 'Registered Candidates',
                'employers': 'Employers',
                'successful-placements': 'Successful Placements'
            }
        };

        // Update text content based on language
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
    }

    // Animated counter for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepDuration = duration / steps;
            let currentStep = 0;

            const interval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                const currentValue = Math.floor(target * progress);
                
                counter.textContent = currentValue.toLocaleString();

                if (currentStep >= steps) {
                    clearInterval(interval);
                    counter.textContent = target.toLocaleString();
                }
            }, stepDuration);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger counter animation when stats section is visible
                if (entry.target.querySelector('[data-count]')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.bg-white, .bg-gray-50 > div');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scrolling for anchor links
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

    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Remove error styling after user starts typing
                    field.addEventListener('input', function() {
                        this.classList.remove('border-red-500');
                    }, { once: true });
                }
            });
            
            if (isValid) {
                // Show success message or redirect
                showNotification('تم إرسال النموذج بنجاح!', 'success');
            } else {
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            }
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Search functionality
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        if (input.placeholder.includes('بحث') || input.placeholder.includes('Search')) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(this.value);
                }
            });
        }
    });

    function performSearch(query) {
        if (query.trim()) {
            // Redirect to jobs page with search query
            window.location.href = `jobs.html?search=${encodeURIComponent(query)}`;
        }
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 pointer-events-none';
    backToTopBtn.setAttribute('aria-label', 'العودة إلى الأعلى');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-xl';
        }
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations here
        }, 10);
    });

    // Initialize tooltips (if needed)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });

    function showTooltip(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg';
        tooltip.textContent = e.target.getAttribute('data-tooltip');
        tooltip.style.top = e.target.offsetTop - 30 + 'px';
        tooltip.style.left = e.target.offsetLeft + 'px';
        e.target.parentNode.appendChild(tooltip);
        e.target.tooltipElement = tooltip;
    }

    function hideTooltip(e) {
        if (e.target.tooltipElement) {
            e.target.parentNode.removeChild(e.target.tooltipElement);
            delete e.target.tooltipElement;
        }
    }

    // Initialize the page
    console.log('HealthCareers Platform initialized successfully');
});

// Utility functions
function formatDate(date) {
    return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function formatNumber(number) {
    return new Intl.NumberFormat('ar-SA').format(number);
}

// Export functions for use in other scripts
window.HealthCareers = {
    formatDate,
    formatNumber,
    showNotification: function(message, type) {
        // This function is defined in the DOMContentLoaded event listener
        // We'll make it available globally if needed
    }
};