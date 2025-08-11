// Job details page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const applyBtn = document.getElementById('applyBtn');
    const saveJobBtn = document.querySelector('.fa-heart').closest('button');
    const shareJobBtn = document.querySelector('.fa-share').closest('button');
    const companyWebsiteLink = document.querySelector('a[href*="kfshrc"]');
    
    // Initialize
    setupJobActions();
    loadJobFromURL();

    function setupJobActions() {
        // Apply for job
        applyBtn.addEventListener('click', function() {
            // Check if user is logged in (simulate)
            const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
            
            if (!isLoggedIn) {
                showNotification('يرجى تسجيل الدخول أولاً للتقديم على الوظيفة', 'info');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
                return;
            }
            
            // Show application modal
            showApplicationModal();
        });

        // Save job
        saveJobBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isSaved = this.classList.contains('text-red-500');
            
            if (isSaved) {
                // Unsave job
                this.classList.remove('text-red-500', 'bg-red-50');
                this.classList.add('text-gray-400');
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('تم إلغاء حفظ الوظيفة', 'info');
            } else {
                // Save job
                this.classList.remove('text-gray-400');
                this.classList.add('text-red-500', 'bg-red-50');
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('تم حفظ الوظيفة بنجاح', 'success');
            }
        });

        // Share job
        shareJobBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'طبيب باطني - مستشفى الملك فيصل التخصصي',
                    text: 'فرصة عمل ممتازة في مستشفى الملك فيصل التخصصي',
                    url: window.location.href
                }).then(() => {
                    showNotification('تم مشاركة الوظيفة بنجاح', 'success');
                }).catch(() => {
                    fallbackShare();
                });
            } else {
                fallbackShare();
            }
        });

        // Company website link
        if (companyWebsiteLink) {
            companyWebsiteLink.addEventListener('click', function() {
                showNotification('فتح موقع الشركة...', 'info');
            });
        }
    }

    function showApplicationModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-semibold text-gray-900">التقديم للوظيفة</h3>
                    <button class="close-modal text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                <div class="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 class="font-semibold text-blue-900 mb-2">طبيب باطني</h4>
                    <p class="text-blue-700 text-sm">مستشفى الملك فيصل التخصصي - الرياض</p>
                </div>

                <form id="applicationForm" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">رسالة التقديم</label>
                        <textarea name="coverLetter" rows="6" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="اكتب رسالة تقديم مختصرة تسلط الضوء على مؤهلاتك وخبراتك..."></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">السيرة الذاتية</label>
                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 mb-2">اسحب وأفلت ملف السيرة الذاتية هنا</p>
                            <p class="text-sm text-gray-500 mb-4">أو</p>
                            <button type="button" id="uploadCV" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                اختر ملف
                            </button>
                            <p class="text-xs text-gray-500 mt-2">PDF, DOC, DOCX (حد أقصى 5MB)</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الراتب المتوقع</label>
                            <input type="text" name="expectedSalary" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="مثال: 18,000 ريال">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">تاريخ البداية المفضل</label>
                            <input type="date" name="startDate" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>

                    <div class="flex items-start space-x-3">
                        <input type="checkbox" id="agreeToContact" name="agreeToContact" required class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1">
                        <label for="agreeToContact" class="text-sm text-gray-700">
                            أوافق على تواصل الشركة معي عبر البريد الإلكتروني أو الهاتف بخصوص هذه الوظيفة
                        </label>
                    </div>

                    <div class="flex justify-end space-x-4 pt-4 border-t">
                        <button type="button" class="close-modal px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">إلغاء</button>
                        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">إرسال الطلب</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Setup modal functionality
        setupApplicationModal(modal);
    }

    function setupApplicationModal(modal) {
        // Close modal handlers
        modal.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            });
        });

        // File upload
        const uploadBtn = modal.querySelector('#uploadCV');
        uploadBtn.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.pdf,.doc,.docx';
            fileInput.style.display = 'none';
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    if (file.size > 5 * 1024 * 1024) { // 5MB limit
                        showNotification('حجم الملف كبير جداً. الحد الأقصى 5MB', 'error');
                        return;
                    }
                    
                    const uploadArea = uploadBtn.closest('.border-dashed');
                    uploadArea.innerHTML = `
                        <i class="fas fa-file-pdf text-3xl text-green-600 mb-2"></i>
                        <p class="text-green-600 font-medium">${file.name}</p>
                        <p class="text-sm text-gray-500">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button type="button" id="removeCV" class="text-red-600 hover:text-red-700 text-sm mt-2">
                            <i class="fas fa-trash ml-1"></i>إزالة الملف
                        </button>
                    `;
                    
                    // Remove file functionality
                    uploadArea.querySelector('#removeCV').addEventListener('click', function() {
                        location.reload(); // Simple way to reset upload area
                    });
                }
            });
            
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
        });

        // Form submission
        const applicationForm = modal.querySelector('#applicationForm');
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(applicationForm);
            const applicationData = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Simulate application submission
            setTimeout(() => {
                // Close modal
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
                
                // Show success message
                showNotification('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.', 'success');
                
                // Update apply button
                applyBtn.textContent = 'تم التقديم';
                applyBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                applyBtn.classList.add('bg-gray-400');
                applyBtn.disabled = true;
                
                console.log('Application submitted:', applicationData);
            }, 2500);
        });
    }

    function fallbackShare() {
        // Copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('تم نسخ رابط الوظيفة إلى الحافظة', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('تم نسخ رابط الوظيفة', 'success');
        });
    }

    function loadJobFromURL() {
        // Get job ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');
        
        if (jobId) {
            // In real app, fetch job details from API
            console.log('Loading job details for ID:', jobId);
            
            // Update page title
            document.title = `طبيب باطني - مستشفى الملك فيصل التخصصي | منصة التوظيف الصحي`;
        }
    }

    // Similar jobs functionality (could be added)
    function loadSimilarJobs() {
        // In real app, fetch similar jobs based on specialty and location
        const similarJobsSection = document.createElement('section');
        similarJobsSection.className = 'mt-8 bg-white rounded-xl shadow-md p-8';
        similarJobsSection.innerHTML = `
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">وظائف مشابهة</h2>
            <div class="space-y-4">
                <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h3 class="font-semibold text-gray-900 mb-2">طبيب باطني - مستشفى المملكة</h3>
                    <p class="text-sm text-gray-600 mb-2">جدة • دوام كامل • 14,000 - 18,000 ريال</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-500">منذ 3 أيام</span>
                        <a href="job-details.html?id=2" class="text-blue-600 hover:text-blue-700 text-sm">عرض التفاصيل</a>
                    </div>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h3 class="font-semibold text-gray-900 mb-2">استشاري باطنية - عيادات الحبيب</h3>
                    <p class="text-sm text-gray-600 mb-2">الرياض • دوام جزئي • 20,000 - 25,000 ريال</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-500">منذ أسبوع</span>
                        <a href="job-details.html?id=3" class="text-blue-600 hover:text-blue-700 text-sm">عرض التفاصيل</a>
                    </div>
                </div>
            </div>
        `;
        
        // Add to main content area
        const mainContent = document.querySelector('.lg\\:col-span-2');
        mainContent.appendChild(similarJobsSection);
    }

    // Job analytics (view tracking)
    function trackJobView() {
        const jobId = new URLSearchParams(window.location.search).get('id') || '1';
        
        // In real app, send analytics data to server
        const viewData = {
            jobId: jobId,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };
        
        console.log('Job view tracked:', viewData);
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

    // Initialize additional features
    trackJobView();
    // loadSimilarJobs(); // Uncomment to show similar jobs

    // Export functions for external use
    window.JobDetailsPage = {
        showApplicationModal,
        fallbackShare,
        trackJobView,
        showNotification
    };
});