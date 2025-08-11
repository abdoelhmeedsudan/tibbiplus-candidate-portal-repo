// Dashboard page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Modal elements
    const jobFormModal = document.getElementById('jobFormModal');
    const addJobBtn = document.getElementById('addJobBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelJobBtn = document.getElementById('cancelJob');
    const jobForm = document.getElementById('jobForm');

    // Initialize
    setupTabNavigation();
    setupModal();
    setupJobManagement();
    setupApplicationManagement();

    function setupTabNavigation() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Update button states
                tabButtons.forEach(btn => {
                    btn.classList.remove('border-blue-500', 'text-blue-600');
                    btn.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
                });
                
                this.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
                this.classList.add('border-blue-500', 'text-blue-600');
                
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

    function setupModal() {
        // Open modal
        addJobBtn.addEventListener('click', function() {
            jobFormModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        // Close modal
        function closeModal() {
            jobFormModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            jobForm.reset();
        }

        closeModalBtn.addEventListener('click', closeModal);
        cancelJobBtn.addEventListener('click', closeModal);

        // Close modal when clicking outside
        jobFormModal.addEventListener('click', function(e) {
            if (e.target === jobFormModal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !jobFormModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    function setupJobManagement() {
        // Job form submission
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(jobForm);
            const jobData = Object.fromEntries(formData);
            
            // Validate form
            if (!validateJobForm(jobData)) {
                return;
            }
            
            // Show loading state
            const submitBtn = jobForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'جاري النشر...';
            submitBtn.disabled = true;
            
            // Simulate job creation
            setTimeout(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Close modal
                jobFormModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
                
                // Show success message
                showNotification('تم نشر الوظيفة بنجاح!', 'success');
                
                // Add job to table (in real app, refresh from server)
                addJobToTable(jobData);
                
                // Reset form
                jobForm.reset();
                
                console.log('Job created:', jobData);
            }, 2000);
        });

        // Job action buttons
        setupJobActions();
    }

    function setupJobActions() {
        // View job buttons
        document.addEventListener('click', function(e) {
            if (e.target.closest('.fa-eye')) {
                const row = e.target.closest('tr');
                const jobTitle = row.querySelector('.font-medium').textContent;
                showNotification(`عرض تفاصيل: ${jobTitle}`, 'info');
            }
        });

        // Edit job buttons
        document.addEventListener('click', function(e) {
            if (e.target.closest('.fa-edit')) {
                const row = e.target.closest('tr');
                const jobTitle = row.querySelector('.font-medium').textContent;
                showNotification(`تعديل: ${jobTitle}`, 'info');
                // In real app, populate form with job data and open modal
            }
        });

        // Delete job buttons
        document.addEventListener('click', function(e) {
            if (e.target.closest('.fa-trash')) {
                const row = e.target.closest('tr');
                const jobTitle = row.querySelector('.font-medium').textContent;
                
                if (confirm(`هل أنت متأكد من حذف وظيفة "${jobTitle}"؟`)) {
                    row.remove();
                    showNotification(`تم حذف الوظيفة: ${jobTitle}`, 'success');
                    updateJobStats();
                }
            }
        });
    }

    function setupApplicationManagement() {
        // Application action buttons
        document.addEventListener('click', function(e) {
            // View application
            if (e.target.closest('.fa-eye') && e.target.closest('#applications-tab')) {
                const row = e.target.closest('tr');
                const candidateName = row.querySelector('.font-medium').textContent;
                showNotification(`عرض ملف: ${candidateName}`, 'info');
            }

            // Accept application
            if (e.target.textContent === 'قبول') {
                const row = e.target.closest('tr');
                const candidateName = row.querySelector('.font-medium').textContent;
                const statusBadge = row.querySelector('.inline-flex');
                
                statusBadge.className = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800';
                statusBadge.textContent = 'مقبول للمقابلة';
                
                showNotification(`تم قبول طلب: ${candidateName}`, 'success');
            }

            // Reject application
            if (e.target.textContent === 'رفض') {
                const row = e.target.closest('tr');
                const candidateName = row.querySelector('.font-medium').textContent;
                
                if (confirm(`هل أنت متأكد من رفض طلب "${candidateName}"؟`)) {
                    const statusBadge = row.querySelector('.inline-flex');
                    statusBadge.className = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800';
                    statusBadge.textContent = 'مرفوض';
                    
                    showNotification(`تم رفض طلب: ${candidateName}`, 'info');
                }
            }
        });
    }

    function validateJobForm(data) {
        const requiredFields = ['jobTitle', 'department', 'location', 'jobType', 'jobDescription'];
        let isValid = true;
        
        // Clear previous errors
        const inputs = jobForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('border-red-500');
        });
        
        // Check required fields
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                isValid = false;
                const input = jobForm.querySelector(`[name="${field}"]`);
                if (input) {
                    input.classList.add('border-red-500');
                }
            }
        });
        
        if (!isValid) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        }
        
        return isValid;
    }

    function addJobToTable(jobData) {
        const jobsTable = document.querySelector('#jobs-tab tbody');
        const newRow = document.createElement('tr');
        newRow.className = 'hover:bg-gray-50';
        
        const departmentMap = {
            'internal-medicine': 'الطب الباطني',
            'surgery': 'الجراحة',
            'pediatrics': 'طب الأطفال',
            'nursing': 'التمريض',
            'pharmacy': 'الصيدلة'
        };
        
        const locationMap = {
            'riyadh': 'الرياض',
            'jeddah': 'جدة',
            'dammam': 'الدمام',
            'mecca': 'مكة المكرمة'
        };
        
        const currentDate = new Date().toISOString().split('T')[0];
        
        newRow.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">${jobData.jobTitle}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${departmentMap[jobData.department] || jobData.department}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${locationMap[jobData.location] || jobData.location}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">نشط</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${currentDate}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                    <button class="text-blue-600 hover:text-blue-900 transition-colors">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="text-green-600 hover:text-green-900 transition-colors">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-600 hover:text-red-900 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        jobsTable.appendChild(newRow);
        updateJobStats();
    }

    function updateJobStats() {
        // Update job statistics in overview
        const totalJobsElement = document.querySelector('#overview-tab .text-3xl');
        if (totalJobsElement) {
            const currentTotal = parseInt(totalJobsElement.textContent);
            totalJobsElement.textContent = currentTotal + 1;
        }
    }

    // Search functionality
    const searchInputs = document.querySelectorAll('input[placeholder*="البحث"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.space-y-6').querySelector('tbody');
            
            if (table) {
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    });

    // Export functionality
    const exportBtn = document.querySelector('.fa-download');
    if (exportBtn) {
        exportBtn.closest('button').addEventListener('click', function() {
            showNotification('جاري تصدير البيانات...', 'info');
            // In real app, generate and download CSV/Excel file
            setTimeout(() => {
                showNotification('تم تصدير البيانات بنجاح', 'success');
            }, 2000);
        });
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

    // Export functions for external use
    window.Dashboard = {
        showNotification,
        validateJobForm,
        addJobToTable,
        updateJobStats
    };
});