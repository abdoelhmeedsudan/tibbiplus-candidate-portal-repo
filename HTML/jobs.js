// Jobs page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Job filtering functionality
    const jobCards = document.querySelectorAll('.job-card');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const jobCountElement = document.getElementById('jobCount');
    const searchBtn = document.getElementById('searchBtn');
    const mainSearch = document.getElementById('mainSearch');

    // Filter inputs
    const jobTitleInput = document.getElementById('jobTitle');
    const cityFilter = document.getElementById('cityFilter');
    const specialtyFilter = document.getElementById('specialtyFilter');
    const jobTypeFilter = document.getElementById('jobTypeFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    const sortBy = document.getElementById('sortBy');

    // Save job functionality
    const saveJobBtns = document.querySelectorAll('.save-job');
    const applyBtns = document.querySelectorAll('.apply-btn');

    // Initialize page
    updateJobCount();
    setupEventListeners();

    function setupEventListeners() {
        // Filter button
        applyFiltersBtn.addEventListener('click', applyFilters);
        
        // Search functionality
        searchBtn.addEventListener('click', performSearch);
        mainSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Sort functionality
        sortBy.addEventListener('change', sortJobs);

        // Save job buttons
        saveJobBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                toggleSaveJob(this);
            });
        });

        // Apply buttons
        applyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                applyToJob(this);
            });
        });

        // Real-time filtering (optional)
        [jobTitleInput, cityFilter, specialtyFilter, jobTypeFilter, experienceFilter].forEach(input => {
            input.addEventListener('change', applyFilters);
        });
    }

    function applyFilters() {
        const filters = {
            title: jobTitleInput.value.toLowerCase(),
            city: cityFilter.value,
            specialty: specialtyFilter.value,
            jobType: jobTypeFilter.value,
            experience: experienceFilter.value
        };

        let visibleCount = 0;

        jobCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardCity = card.getAttribute('data-city');
            const cardSpecialty = card.getAttribute('data-specialty');
            const cardType = card.getAttribute('data-type');

            let shouldShow = true;

            // Title filter
            if (filters.title && !cardTitle.includes(filters.title)) {
                shouldShow = false;
            }

            // City filter
            if (filters.city && cardCity !== filters.city) {
                shouldShow = false;
            }

            // Specialty filter
            if (filters.specialty && cardSpecialty !== filters.specialty) {
                shouldShow = false;
            }

            // Job type filter
            if (filters.jobType && cardType !== filters.jobType) {
                shouldShow = false;
            }

            // Show/hide card with animation
            if (shouldShow) {
                card.style.display = 'block';
                card.classList.add('fade-in-up');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in-up');
            }
        });

        updateJobCount(visibleCount);
        
        // Show no results message if needed
        showNoResultsMessage(visibleCount === 0);
    }

    function performSearch() {
        const searchTerm = mainSearch.value.toLowerCase();
        if (!searchTerm) {
            // Reset filters if search is empty
            resetFilters();
            return;
        }

        let visibleCount = 0;

        jobCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardCompany = card.querySelector('.fa-building').nextElementSibling.textContent.toLowerCase();
            const cardDescription = card.querySelector('p').textContent.toLowerCase();

            const shouldShow = cardTitle.includes(searchTerm) || 
                             cardCompany.includes(searchTerm) || 
                             cardDescription.includes(searchTerm);

            if (shouldShow) {
                card.style.display = 'block';
                card.classList.add('fade-in-up');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in-up');
            }
        });

        updateJobCount(visibleCount);
        showNoResultsMessage(visibleCount === 0);
    }

    function sortJobs() {
        const sortValue = sortBy.value;
        const jobContainer = document.getElementById('jobListings');
        const jobs = Array.from(jobCards);

        jobs.sort((a, b) => {
            switch (sortValue) {
                case 'الأحدث أولاً':
                    return getJobDate(b) - getJobDate(a);
                case 'الأقدم أولاً':
                    return getJobDate(a) - getJobDate(b);
                case 'الراتب: الأعلى أولاً':
                    return getMaxSalary(b) - getMaxSalary(a);
                case 'الراتب: الأقل أولاً':
                    return getMaxSalary(a) - getMaxSalary(b);
                default:
                    return 0;
            }
        });

        // Re-append sorted jobs
        jobs.forEach(job => jobContainer.appendChild(job));
    }

    function getJobDate(jobCard) {
        const dateText = jobCard.querySelector('.fa-clock').nextElementSibling.textContent;
        // Simple date parsing - in real app, use proper date handling
        if (dateText.includes('يومين')) return 2;
        if (dateText.includes('3 أيام')) return 3;
        if (dateText.includes('أسبوع')) return 7;
        return 1;
    }

    function getMaxSalary(jobCard) {
        const salaryText = jobCard.querySelector('.fa-dollar-sign').nextElementSibling.textContent;
        const numbers = salaryText.match(/\d+/g);
        return numbers ? Math.max(...numbers.map(Number)) : 0;
    }

    function toggleSaveJob(button) {
        const icon = button.querySelector('i');
        const isCurrentlySaved = button.classList.contains('text-red-500');

        if (isCurrentlySaved) {
            // Unsave job
            button.classList.remove('text-red-500', 'bg-red-50');
            button.classList.add('text-gray-400');
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification('تم إلغاء حفظ الوظيفة', 'info');
        } else {
            // Save job
            button.classList.remove('text-gray-400');
            button.classList.add('text-red-500', 'bg-red-50');
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification('تم حفظ الوظيفة بنجاح', 'success');
        }
    }

    function applyToJob(button) {
        const jobCard = button.closest('.job-card');
        const jobTitle = jobCard.querySelector('h3').textContent;
        
        // In a real application, this would open an application modal or redirect
        showNotification(`تم التقديم لوظيفة: ${jobTitle}`, 'success');
        
        // Disable button temporarily
        button.disabled = true;
        button.textContent = 'تم التقديم';
        button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        button.classList.add('bg-gray-400');
        
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = '<span>تقدم الآن</span><i class="fas fa-chevron-left text-sm"></i>';
            button.classList.remove('bg-gray-400');
            button.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 3000);
    }

    function updateJobCount(count = null) {
        const visibleJobs = count !== null ? count : document.querySelectorAll('.job-card[style*="block"], .job-card:not([style*="none"])').length;
        jobCountElement.textContent = visibleJobs;
    }

    function resetFilters() {
        jobTitleInput.value = '';
        cityFilter.value = '';
        specialtyFilter.value = '';
        jobTypeFilter.value = '';
        experienceFilter.value = '';
        mainSearch.value = '';
        
        jobCards.forEach(card => {
            card.style.display = 'block';
            card.classList.add('fade-in-up');
        });
        
        updateJobCount();
        hideNoResultsMessage();
    }

    function showNoResultsMessage(show) {
        let noResultsMsg = document.getElementById('noResultsMessage');
        
        if (show && !noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMessage';
            noResultsMsg.className = 'text-center py-12';
            noResultsMsg.innerHTML = `
                <div class="text-gray-400 mb-4">
                    <i class="fas fa-search text-6xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">لم يتم العثور على وظائف</h3>
                <p class="text-gray-500 mb-4">جرب تعديل معايير البحث أو الفلاتر</p>
                <button id="resetFiltersBtn" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    إعادة تعيين الفلاتر
                </button>
            `;
            
            document.getElementById('jobListings').appendChild(noResultsMsg);
            
            // Add reset functionality
            document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);
        } else if (!show && noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    function hideNoResultsMessage() {
        const noResultsMsg = document.getElementById('noResultsMessage');
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // Notification function (reuse from main script)
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

    // Handle URL parameters for search
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        mainSearch.value = searchParam;
        performSearch();
    }

    // Advanced filtering with multiple criteria
    function advancedFilter() {
        // This could be expanded for more complex filtering logic
        // such as salary ranges, experience levels, etc.
    }

    // Export functions for external use
    window.JobsPage = {
        applyFilters,
        performSearch,
        resetFilters,
        toggleSaveJob,
        applyToJob
    };
});