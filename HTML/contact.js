// Contact page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const quickContactButtons = document.querySelectorAll('.bg-white\\/20, .bg-white.text-blue-600');
    const mapButton = document.querySelector('.bg-green-600');
    
    // Initialize
    setupFormSubmission();
    setupQuickContactButtons();
    setupMapButton();

    function setupFormSubmission() {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>جاري الإرسال...</span>';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Log form data (in real app, send to server)
                console.log('Contact form submitted:', data);
            }, 2000);
        });
    }

    function validateForm(data) {
        const requiredFields = ['name', 'email', 'subject', 'message'];
        let isValid = true;
        
        // Clear previous errors
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.classList.remove('border-red-500');
        });
        
        // Check required fields
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                isValid = false;
                const input = contactForm.querySelector(`[name="${field}"]`);
                if (input) {
                    input.classList.add('border-red-500');
                }
            }
        });
        
        // Validate email format
        if (data.email && !isValidEmail(data.email)) {
            isValid = false;
            const emailInput = contactForm.querySelector('[name="email"]');
            emailInput.classList.add('border-red-500');
            showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
        }
        
        if (!isValid) {
            showNotification('يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'error');
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function setupQuickContactButtons() {
        // Live chat button
        const liveChatBtn = document.querySelector('.bg-white\\/20');
        if (liveChatBtn) {
            liveChatBtn.addEventListener('click', function() {
                showNotification('ميزة المحادثة المباشرة قيد التطوير', 'info');
                // In real app, this would open a chat widget
            });
        }
        
        // Call now button
        const callNowBtn = document.querySelector('.bg-white.text-blue-600');
        if (callNowBtn) {
            callNowBtn.addEventListener('click', function() {
                // Open phone dialer
                window.location.href = 'tel:+966112345678';
            });
        }
    }

    function setupMapButton() {
        if (mapButton) {
            mapButton.addEventListener('click', function() {
                // Open Google Maps with the address
                const address = 'شارع الملك فهد، الرياض، المملكة العربية السعودية';
                const encodedAddress = encodeURIComponent(address);
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                window.open(mapsUrl, '_blank');
                
                showNotification('فتح الخريطة...', 'success');
            });
        }
    }

    // Department contact functionality
    const departmentCards = document.querySelectorAll('.bg-white.rounded-xl.shadow-md');
    departmentCards.forEach(card => {
        const emailLink = card.querySelector('.fa-envelope + span');
        const phoneLink = card.querySelector('.fa-phone + span');
        
        if (emailLink) {
            emailLink.style.cursor = 'pointer';
            emailLink.addEventListener('click', function() {
                const email = this.textContent;
                window.location.href = `mailto:${email}`;
            });
        }
        
        if (phoneLink) {
            phoneLink.style.cursor = 'pointer';
            phoneLink.addEventListener('click', function() {
                const phone = this.textContent;
                window.location.href = `tel:${phone}`;
            });
        }
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.bg-white.rounded-lg.p-6');
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                // Toggle answer visibility
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    question.innerHTML += ' <i class="fas fa-chevron-up text-sm"></i>';
                } else {
                    answer.style.display = 'none';
                    question.innerHTML = question.innerHTML.replace(' <i class="fas fa-chevron-up text-sm"></i>', '');
                }
            });
        }
    });

    // Auto-fill form based on URL parameters
    function autoFillForm() {
        const urlParams = new URLSearchParams(window.location.search);
        const subject = urlParams.get('subject');
        const type = urlParams.get('type');
        
        if (subject) {
            const subjectInput = contactForm.querySelector('[name="subject"]');
            if (subjectInput) {
                subjectInput.value = decodeURIComponent(subject);
            }
        }
        
        if (type) {
            const typeSelect = contactForm.querySelector('[name="inquiryType"]');
            if (typeSelect) {
                typeSelect.value = type;
            }
        }
    }

    // Character counter for message textarea
    function setupCharacterCounter() {
        const messageTextarea = contactForm.querySelector('[name="message"]');
        if (messageTextarea) {
            const maxLength = 1000;
            
            // Create counter element
            const counter = document.createElement('div');
            counter.className = 'text-sm text-gray-500 mt-1 text-left';
            counter.textContent = `0 / ${maxLength}`;
            messageTextarea.parentNode.appendChild(counter);
            
            // Update counter on input
            messageTextarea.addEventListener('input', function() {
                const currentLength = this.value.length;
                counter.textContent = `${currentLength} / ${maxLength}`;
                
                if (currentLength > maxLength * 0.9) {
                    counter.classList.add('text-orange-500');
                } else {
                    counter.classList.remove('text-orange-500');
                }
                
                if (currentLength > maxLength) {
                    counter.classList.add('text-red-500');
                    this.value = this.value.substring(0, maxLength);
                } else {
                    counter.classList.remove('text-red-500');
                }
            });
        }
    }

    // Notification function
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
        
        // Remove after 5 seconds for contact form
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Initialize additional features
    autoFillForm();
    setupCharacterCounter();

    // Export functions for external use
    window.ContactPage = {
        validateForm,
        showNotification,
        autoFillForm
    };
});