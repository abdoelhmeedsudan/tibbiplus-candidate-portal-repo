// Login page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Initialize
    setupFormSubmission();
    setupPasswordToggle();
    setupFormValidation();
    loadSavedCredentials();

    function setupFormSubmission() {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(loginForm);
            const loginData = {
                email: formData.get('email'),
                password: formData.get('password'),
                rememberMe: formData.get('rememberMe') === 'on'
            };
            
            // Validate form
            if (!validateLoginForm(loginData)) {
                return;
            }
            
            // Show loading state
            const submitButton = loginForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري تسجيل الدخول...';
            submitButton.disabled = true;
            
            // Simulate login process
            setTimeout(() => {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Save credentials if remember me is checked
                if (loginData.rememberMe) {
                    localStorage.setItem('rememberedEmail', loginData.email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                
                // Show success message
                showNotification('تم تسجيل الدخول بنجاح!', 'success');
                
                // Redirect based on email domain or user type
                setTimeout(() => {
                    if (loginData.email.includes('hospital') || loginData.email.includes('clinic')) {
                        window.location.href = 'dashboard.html';
                    } else {
                        window.location.href = 'personal-info.html';
                    }
                }, 1500);
                
                console.log('Login successful:', loginData);
            }, 2000);
        });
    }

    function setupPasswordToggle() {
        togglePasswordBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    }

    function setupFormValidation() {
        // Real-time email validation
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('border-red-500');
                showFieldError(this, 'يرجى إدخال بريد إلكتروني صحيح');
            } else {
                this.classList.remove('border-red-500');
                hideFieldError(this);
            }
        });

        // Clear errors on input
        [emailInput, passwordInput].forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('border-red-500');
                hideFieldError(this);
            });
        });
    }

    function validateLoginForm(data) {
        let isValid = true;
        
        // Clear previous errors
        [emailInput, passwordInput].forEach(input => {
            input.classList.remove('border-red-500');
            hideFieldError(input);
        });
        
        // Email validation
        if (!data.email) {
            emailInput.classList.add('border-red-500');
            showFieldError(emailInput, 'البريد الإلكتروني مطلوب');
            isValid = false;
        } else if (!isValidEmail(data.email)) {
            emailInput.classList.add('border-red-500');
            showFieldError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
            isValid = false;
        }
        
        // Password validation
        if (!data.password) {
            passwordInput.classList.add('border-red-500');
            showFieldError(passwordInput, 'كلمة المرور مطلوبة');
            isValid = false;
        } else if (data.password.length < 6) {
            passwordInput.classList.add('border-red-500');
            showFieldError(passwordInput, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            isValid = false;
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(field, message) {
        // Remove existing error
        hideFieldError(field);
        
        // Create error element
        const error = document.createElement('div');
        error.className = 'field-error text-red-600 text-sm mt-1';
        error.textContent = message;
        
        // Insert after field
        field.parentNode.appendChild(error);
    }

    function hideFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    function loadSavedCredentials() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMeCheckbox.checked = true;
        }
    }

    // Forgot password functionality
    const forgotPasswordLink = document.querySelector('a[href="#"]');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showForgotPasswordModal();
        });
    }

    function showForgotPasswordModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-xl max-w-md w-full p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-semibold text-gray-900">استعادة كلمة المرور</h3>
                    <button class="close-modal text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="أدخل بريدك الإلكتروني">
                    </div>
                    
                    <p class="text-sm text-gray-600">سنرسل لك رابط لإعادة تعيين كلمة المرور</p>
                    
                    <div class="flex justify-end space-x-4 pt-4">
                        <button type="button" class="close-modal px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">إلغاء</button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">إرسال الرابط</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        modal.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
        
        // Form submission
        modal.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني', 'success');
                document.body.removeChild(modal);
            }
        });
    }

    // User type selection
    const userTypeLinks = document.querySelectorAll('.grid.grid-cols-2 a');
    userTypeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // In real app, you might want to set user type before redirecting
            const userType = this.querySelector('.font-medium').textContent;
            localStorage.setItem('selectedUserType', userType);
        });
    });

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
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Export functions for external use
    window.LoginPage = {
        validateLoginForm,
        isValidEmail,
        showNotification,
        showForgotPasswordModal
    };
});