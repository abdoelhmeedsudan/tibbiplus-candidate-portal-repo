// Register page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const registerForm = document.getElementById('registerForm');
    const userTypeButtons = document.querySelectorAll('.user-type-btn');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const companyField = document.getElementById('companyField');
    const candidateFields = document.getElementById('candidateFields');
    
    let selectedUserType = 'candidate';

    // Initialize
    setupUserTypeSelection();
    setupPasswordToggles();
    setupFormSubmission();
    setupFormValidation();

    function setupUserTypeSelection() {
        userTypeButtons.forEach(button => {
            button.addEventListener('click', function() {
                selectedUserType = this.getAttribute('data-type');
                
                // Update button states
                userTypeButtons.forEach(btn => {
                    btn.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-700', 'border-green-500', 'bg-green-50', 'text-green-700');
                    btn.classList.add('border-gray-200', 'text-gray-700');
                });
                
                if (selectedUserType === 'candidate') {
                    this.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-700');
                    companyField.classList.add('hidden');
                    candidateFields.classList.remove('hidden');
                    
                    // Make candidate fields required
                    document.getElementById('city').required = true;
                    document.getElementById('specialty').required = true;
                    document.getElementById('companyName').required = false;
                } else {
                    this.classList.add('border-green-500', 'bg-green-50', 'text-green-700');
                    companyField.classList.remove('hidden');
                    candidateFields.classList.add('hidden');
                    
                    // Make company field required
                    document.getElementById('companyName').required = true;
                    document.getElementById('city').required = false;
                    document.getElementById('specialty').required = false;
                }
            });
        });
    }

    function setupPasswordToggles() {
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

        toggleConfirmPasswordBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (confirmPasswordInput.type === 'password') {
                confirmPasswordInput.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                confirmPasswordInput.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    }

    function setupFormSubmission() {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(registerForm);
            const registrationData = {
                userType: selectedUserType,
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword'),
                city: formData.get('city'),
                specialty: formData.get('specialty'),
                companyName: formData.get('companyName'),
                acceptTerms: formData.get('acceptTerms') === 'on'
            };
            
            // Validate form
            if (!validateRegistrationForm(registrationData)) {
                return;
            }
            
            // Show loading state
            const submitButton = registerForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري إنشاء الحساب...';
            submitButton.disabled = true;
            
            // Simulate registration process
            setTimeout(() => {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showNotification('تم إنشاء الحساب بنجاح!', 'success');
                
                // Redirect based on user type
                setTimeout(() => {
                    if (selectedUserType === 'employer') {
                        window.location.href = 'dashboard.html';
                    } else {
                        window.location.href = 'personal-info-edit.html';
                    }
                }, 2000);
                
                console.log('Registration successful:', registrationData);
            }, 3000);
        });
    }

    function setupFormValidation() {
        // Real-time validation
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('border-red-500');
                showFieldError(this, 'يرجى إدخال بريد إلكتروني صحيح');
            } else {
                this.classList.remove('border-red-500');
                hideFieldError(this);
            }
        });

        phoneInput.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                this.classList.add('border-red-500');
                showFieldError(this, 'يرجى إدخال رقم هاتف صحيح');
            } else {
                this.classList.remove('border-red-500');
                hideFieldError(this);
            }
        });

        // Password confirmation validation
        confirmPasswordInput.addEventListener('blur', function() {
            if (this.value && this.value !== passwordInput.value) {
                this.classList.add('border-red-500');
                showFieldError(this, 'كلمة المرور غير متطابقة');
            } else {
                this.classList.remove('border-red-500');
                hideFieldError(this);
            }
        });

        // Clear errors on input
        const inputs = registerForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('border-red-500');
                hideFieldError(this);
            });
        });
    }

    function validateRegistrationForm(data) {
        let isValid = true;
        
        // Clear previous errors
        const inputs = registerForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('border-red-500');
            hideFieldError(input);
        });
        
        // Required fields validation
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'];
        
        // Add conditional required fields
        if (selectedUserType === 'employer') {
            requiredFields.push('companyName');
        } else {
            requiredFields.push('city', 'specialty');
        }
        
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                isValid = false;
                const input = registerForm.querySelector(`[name="${field}"]`);
                if (input) {
                    input.classList.add('border-red-500');
                    showFieldError(input, 'هذا الحقل مطلوب');
                }
            }
        });
        
        // Email validation
        if (data.email && !isValidEmail(data.email)) {
            isValid = false;
            const emailInput = registerForm.querySelector('[name="email"]');
            emailInput.classList.add('border-red-500');
            showFieldError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
        }
        
        // Phone validation
        if (data.phone && !isValidPhone(data.phone)) {
            isValid = false;
            const phoneInput = registerForm.querySelector('[name="phone"]');
            phoneInput.classList.add('border-red-500');
            showFieldError(phoneInput, 'يرجى إدخال رقم هاتف صحيح');
        }
        
        // Password validation
        if (data.password && data.password.length < 8) {
            isValid = false;
            const passwordInput = registerForm.querySelector('[name="password"]');
            passwordInput.classList.add('border-red-500');
            showFieldError(passwordInput, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        }
        
        // Password confirmation
        if (data.password !== data.confirmPassword) {
            isValid = false;
            const confirmPasswordInput = registerForm.querySelector('[name="confirmPassword"]');
            confirmPasswordInput.classList.add('border-red-500');
            showFieldError(confirmPasswordInput, 'كلمة المرور غير متطابقة');
        }
        
        // Terms acceptance
        if (!data.acceptTerms) {
            isValid = false;
            showNotification('يجب الموافقة على الشروط والأحكام', 'error');
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Saudi phone number validation
        const phoneRegex = /^(\+966|966|0)?[5][0-9]{8}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function showFieldError(field, message) {
        // Remove existing error
        hideFieldError(field);
        
        // Create error element
        const error = document.createElement('div');
        error.className = 'field-error text-red-600 text-sm mt-1';
        error.textContent = message;
        
        // Insert after field container
        field.parentNode.parentNode.appendChild(error);
    }

    function hideFieldError(field) {
        const container = field.parentNode.parentNode;
        const existingError = container.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Password strength indicator
    function setupPasswordStrength() {
        const strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength mt-2 hidden';
        strengthIndicator.innerHTML = `
            <div class="flex space-x-1 mb-1">
                <div class="strength-bar h-1 bg-gray-200 rounded flex-1"></div>
                <div class="strength-bar h-1 bg-gray-200 rounded flex-1"></div>
                <div class="strength-bar h-1 bg-gray-200 rounded flex-1"></div>
                <div class="strength-bar h-1 bg-gray-200 rounded flex-1"></div>
            </div>
            <div class="strength-text text-xs text-gray-500"></div>
        `;
        
        passwordInput.parentNode.parentNode.appendChild(strengthIndicator);
        
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            updatePasswordStrengthDisplay(strength);
            
            if (password.length > 0) {
                strengthIndicator.classList.remove('hidden');
            } else {
                strengthIndicator.classList.add('hidden');
            }
        });
    }

    function calculatePasswordStrength(password) {
        let score = 0;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[^A-Za-z0-9]/.test(password)
        };
        
        Object.values(checks).forEach(check => {
            if (check) score++;
        });
        
        return {
            score,
            level: score < 2 ? 'ضعيف' : score < 4 ? 'متوسط' : score < 5 ? 'قوي' : 'ممتاز',
            color: score < 2 ? 'red' : score < 4 ? 'yellow' : score < 5 ? 'blue' : 'green'
        };
    }

    function updatePasswordStrengthDisplay(strength) {
        const bars = document.querySelectorAll('.strength-bar');
        const text = document.querySelector('.strength-text');
        
        bars.forEach((bar, index) => {
            bar.className = `strength-bar h-1 rounded flex-1 ${
                index < strength.score ? `bg-${strength.color}-500` : 'bg-gray-200'
            }`;
        });
        
        text.textContent = `قوة كلمة المرور: ${strength.level}`;
        text.className = `strength-text text-xs text-${strength.color}-600`;
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
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Initialize password strength indicator
    setupPasswordStrength();

    // Export functions for external use
    window.RegisterPage = {
        validateRegistrationForm,
        isValidEmail,
        isValidPhone,
        showNotification,
        calculatePasswordStrength
    };
});