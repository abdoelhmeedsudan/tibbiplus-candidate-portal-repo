// Profile page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const saveButton = document.getElementById('saveSettings');
    
    // Initialize
    setupTabNavigation();
    setupSettingsHandlers();
    setupProfileActions();

    function setupTabNavigation() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Update button states
                tabButtons.forEach(btn => {
                    btn.classList.remove('bg-blue-50', 'text-blue-600', 'border-blue-200');
                    btn.classList.add('text-gray-700', 'hover:bg-gray-50');
                });
                
                this.classList.remove('text-gray-700', 'hover:bg-gray-50');
                this.classList.add('bg-blue-50', 'text-blue-600', 'border-blue-200');
                
                // Show/hide tab contents
                tabContents.forEach(content => {
                    content.classList.add('hidden');
                });
                
                const targetContent = document.getElementById(targetTab + '-tab');
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }
            });
        });
    }

    function setupSettingsHandlers() {
        // Save settings button
        saveButton.addEventListener('click', function() {
            const settings = collectAllSettings();
            
            // Show loading state
            const originalText = this.textContent;
            this.textContent = 'جاري الحفظ...';
            this.disabled = true;
            
            // Simulate saving
            setTimeout(() => {
                // Reset button
                this.textContent = originalText;
                this.disabled = false;
                
                // Show success message
                showNotification('تم حفظ الإعدادات بنجاح!', 'success');
                
                // Log settings (in real app, send to server)
                console.log('Settings saved:', settings);
            }, 1500);
        });

        // Language change handler
        const languageSelect = document.querySelector('select[value="ar"]');
        if (languageSelect) {
            languageSelect.addEventListener('change', function() {
                const selectedLanguage = this.value;
                showNotification(`تم تغيير اللغة إلى ${selectedLanguage === 'ar' ? 'العربية' : 'الإنجليزية'}`, 'info');
                // In real app, this would trigger a page reload or dynamic language change
            });
        }

        // Checkbox change handlers
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const label = this.closest('.flex').querySelector('h4');
                const setting = label ? label.textContent : 'إعداد';
                const status = this.checked ? 'تم تفعيل' : 'تم إلغاء';
                
                showNotification(`${status}: ${setting}`, 'info');
            });
        });
    }

    function setupProfileActions() {
        // Profile picture change
        const profilePictureBtn = document.querySelector('.fa-camera').closest('button');
        if (profilePictureBtn) {
            profilePictureBtn.addEventListener('click', function() {
                // Create file input
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
                
                fileInput.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        // In real app, upload the file
                        showNotification('تم تحديث الصورة الشخصية', 'success');
                        
                        // Preview the image (optional)
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            // Update profile picture preview
                            console.log('New profile picture:', e.target.result);
                        };
                        reader.readAsDataURL(file);
                    }
                });
                
                document.body.appendChild(fileInput);
                fileInput.click();
                document.body.removeChild(fileInput);
            });
        }

        // Security actions
        setupSecurityActions();
        
        // Privacy actions
        setupPrivacyActions();
        
        // Logout functionality
        const logoutBtn = document.querySelector('.fa-sign-out-alt').closest('button');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                    showNotification('جاري تسجيل الخروج...', 'info');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                }
            });
        }
    }

    function setupSecurityActions() {
        // Change password
        const changePasswordBtn = Array.from(document.querySelectorAll('h4')).find(h4 => h4.textContent.includes('تغيير كلمة المرور'));
        if (changePasswordBtn) {
            changePasswordBtn.closest('button').addEventListener('click', function() {
                showPasswordChangeModal();
            });
        }

        // Two-factor authentication
        const twoFactorBtn = Array.from(document.querySelectorAll('h4')).find(h4 => h4.textContent.includes('التحقق بخطوتين'));
        if (twoFactorBtn) {
            twoFactorBtn.closest('button').addEventListener('click', function() {
                showNotification('ميزة التحقق بخطوتين قيد التطوير', 'info');
                // In real app, show 2FA setup modal
            });
        }
    }

    function setupPrivacyActions() {
        // Download data
        const downloadBtn = Array.from(document.querySelectorAll('h4')).find(h4 => h4.textContent.includes('تحميل بياناتي'));
        if (downloadBtn) {
            downloadBtn.closest('button').addEventListener('click', function() {
                showNotification('جاري تحضير بياناتك للتحميل...', 'info');
                
                setTimeout(() => {
                    // In real app, generate and download data file
                    showNotification('تم إرسال رابط التحميل إلى بريدك الإلكتروني', 'success');
                }, 3000);
            });
        }

        // Delete account
        const deleteBtn = Array.from(document.querySelectorAll('h4')).find(h4 => h4.textContent.includes('حذف الحساب'));
        if (deleteBtn) {
            deleteBtn.closest('button').addEventListener('click', function() {
                showDeleteAccountModal();
            });
        }
    }

    function showPasswordChangeModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-xl max-w-md w-full p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-semibold text-gray-900">تغيير كلمة المرور</h3>
                    <button class="close-modal text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الحالية</label>
                        <input type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الجديدة</label>
                        <input type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">تأكيد كلمة المرور الجديدة</label>
                        <input type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div class="flex justify-end space-x-4 pt-4">
                        <button type="button" class="close-modal px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">إلغاء</button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">تغيير كلمة المرور</button>
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
            showNotification('تم تغيير كلمة المرور بنجاح!', 'success');
            document.body.removeChild(modal);
        });
    }

    function showDeleteAccountModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-xl max-w-md w-full p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-semibold text-red-600">حذف الحساب</h3>
                    <button class="close-modal text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="mb-6">
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-triangle text-red-600 ml-2"></i>
                            <span class="text-red-800 font-medium">تحذير: هذا الإجراء لا يمكن التراجع عنه</span>
                        </div>
                    </div>
                    
                    <p class="text-gray-700 mb-4">سيتم حذف جميع بياناتك نهائياً بما في ذلك:</p>
                    <ul class="text-sm text-gray-600 space-y-1 mb-4">
                        <li>• الملف الشخصي والمعلومات المهنية</li>
                        <li>• طلبات التوظيف المقدمة</li>
                        <li>• الوظائف المحفوظة</li>
                        <li>• سجل المراسلات</li>
                    </ul>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">اكتب "حذف حسابي" للتأكيد</label>
                        <input type="text" id="deleteConfirmation" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="حذف حسابي">
                    </div>
                </div>
                
                <div class="flex justify-end space-x-4">
                    <button type="button" class="close-modal px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">إلغاء</button>
                    <button type="button" id="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>حذف الحساب نهائياً</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Enable delete button when confirmation text is entered
        const confirmationInput = modal.querySelector('#deleteConfirmation');
        const deleteButton = modal.querySelector('#confirmDelete');
        
        confirmationInput.addEventListener('input', function() {
            if (this.value === 'حذف حسابي') {
                deleteButton.disabled = false;
            } else {
                deleteButton.disabled = true;
            }
        });
        
        // Close modal handlers
        modal.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
        
        // Delete confirmation
        deleteButton.addEventListener('click', function() {
            if (confirmationInput.value === 'حذف حسابي') {
                showNotification('جاري حذف الحساب...', 'info');
                setTimeout(() => {
                    showNotification('تم حذف الحساب بنجاح', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                }, 2000);
            }
        });
    }

    function collectAllSettings() {
        const settings = {
            language: document.querySelector('select[value="ar"]')?.value || 'ar',
            timezone: 'asia/riyadh',
            notifications: {},
            privacy: {}
        };
        
        // Collect notification settings
        const notificationCheckboxes = document.querySelectorAll('#notifications-tab input[type="checkbox"]');
        notificationCheckboxes.forEach((checkbox, index) => {
            const label = checkbox.closest('.flex').querySelector('h4')?.textContent;
            if (label) {
                settings.notifications[label] = checkbox.checked;
            }
        });
        
        // Collect privacy settings
        const privacyCheckboxes = document.querySelectorAll('#privacy-tab input[type="checkbox"]');
        privacyCheckboxes.forEach((checkbox, index) => {
            const label = checkbox.closest('.flex').querySelector('h4')?.textContent;
            if (label) {
                settings.privacy[label] = checkbox.checked;
            }
        });
        
        return settings;
    }

    // Profile completion calculation
    function calculateProfileCompletion() {
        // This would calculate based on filled fields in personal info
        const completionPercentage = 87; // Example value
        
        const completionElement = document.querySelector('.text-purple-600');
        if (completionElement) {
            completionElement.textContent = `${completionPercentage}%`;
        }
        
        return completionPercentage;
    }

    // Quick stats update
    function updateQuickStats() {
        // In real app, fetch from API
        const stats = {
            appliedJobs: 12,
            scheduledInterviews: 3,
            profileCompletion: calculateProfileCompletion()
        };
        
        // Update display
        const statsElements = document.querySelectorAll('#profile-tab .text-2xl');
        if (statsElements.length >= 3) {
            statsElements[0].textContent = stats.appliedJobs;
            statsElements[1].textContent = stats.scheduledInterviews;
            statsElements[2].textContent = `${stats.profileCompletion}%`;
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

    // Initialize stats
    updateQuickStats();

    // Export functions for external use
    window.ProfilePage = {
        collectAllSettings,
        calculateProfileCompletion,
        updateQuickStats,
        showNotification
    };
});