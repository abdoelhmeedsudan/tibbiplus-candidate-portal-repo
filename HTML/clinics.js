// Clinics page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchInput = document.getElementById('searchInput');
    const cityFilter = document.getElementById('cityFilter');
    const specialtyFilter = document.getElementById('specialtyFilter');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const clinicsContainer = document.getElementById('clinicsContainer');
    const resultsCount = document.getElementById('resultsCount');
    
    const clinicCards = document.querySelectorAll('.clinic-card');
    
    let currentView = 'grid';

    // Initialize
    setupEventListeners();
    updateResultsCount();

    function setupEventListeners() {
        // Search functionality
        searchInput.addEventListener('input', filterClinics);
        cityFilter.addEventListener('change', filterClinics);
        specialtyFilter.addEventListener('change', filterClinics);

        // View toggle
        gridViewBtn.addEventListener('click', () => setView('grid'));
        listViewBtn.addEventListener('click', () => setView('list'));

        // Clinic card interactions
        setupClinicCardEvents();
    }

    function filterClinics() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCity = cityFilter.value;
        const selectedSpecialty = specialtyFilter.value;

        let visibleCount = 0;

        clinicCards.forEach(card => {
            const clinicName = card.querySelector('h3').textContent.toLowerCase();
            const clinicDescription = card.querySelector('p').textContent.toLowerCase();
            const clinicCity = card.getAttribute('data-city');
            const clinicSpecialty = card.getAttribute('data-specialty');

            let shouldShow = true;

            // Search filter
            if (searchTerm && !clinicName.includes(searchTerm) && !clinicDescription.includes(searchTerm)) {
                shouldShow = false;
            }

            // City filter
            if (selectedCity && clinicCity !== selectedCity) {
                shouldShow = false;
            }

            // Specialty filter
            if (selectedSpecialty && clinicSpecialty !== selectedSpecialty) {
                shouldShow = false;
            }

            // Show/hide card
            if (shouldShow) {
                card.style.display = 'block';
                card.classList.add('fade-in-up');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in-up');
            }
        });

        updateResultsCount(visibleCount);
        showNoResultsMessage(visibleCount === 0);
    }

    function setView(viewType) {
        currentView = viewType;

        if (viewType === 'grid') {
            gridViewBtn.classList.add('bg-blue-100', 'text-blue-600');
            gridViewBtn.classList.remove('text-gray-400', 'hover:text-gray-600');
            listViewBtn.classList.remove('bg-blue-100', 'text-blue-600');
            listViewBtn.classList.add('text-gray-400', 'hover:text-gray-600');

            clinicsContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
            
            // Reset card styles for grid view
            clinicCards.forEach(card => {
                card.classList.remove('flex');
                const img = card.querySelector('img');
                const content = card.querySelector('.p-6');
                if (img && content) {
                    img.parentElement.className = '';
                    img.className = 'w-full h-48 object-cover';
                }
            });
        } else {
            listViewBtn.classList.add('bg-blue-100', 'text-blue-600');
            listViewBtn.classList.remove('text-gray-400', 'hover:text-gray-600');
            gridViewBtn.classList.remove('bg-blue-100', 'text-blue-600');
            gridViewBtn.classList.add('text-gray-400', 'hover:text-gray-600');

            clinicsContainer.className = 'space-y-6';
            
            // Adjust card styles for list view
            clinicCards.forEach(card => {
                card.classList.add('flex');
                const img = card.querySelector('img');
                const content = card.querySelector('.p-6');
                if (img && content) {
                    img.parentElement.className = 'w-64 flex-shrink-0';
                    img.className = 'w-full h-full object-cover';
                    content.className = 'p-6 flex-1';
                }
            });
        }
    }

    function setupClinicCardEvents() {
        // Details buttons
        const detailsButtons = document.querySelectorAll('.clinic-card button:first-of-type');
        detailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const clinicCard = this.closest('.clinic-card');
                const clinicName = clinicCard.querySelector('h3').textContent;
                showClinicDetails(clinicName);
            });
        });

        // Directions buttons
        const directionsButtons = document.querySelectorAll('.clinic-card button:last-of-type');
        directionsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const clinicCard = this.closest('.clinic-card');
                const address = clinicCard.querySelector('.fa-map-marker-alt').nextElementSibling.textContent;
                openDirections(address);
            });
        });
    }

    function showClinicDetails(clinicName) {
        // In a real application, this would open a detailed view or modal
        showNotification(`عرض تفاصيل: ${clinicName}`, 'info');
        
        // Could redirect to a details page
        // window.location.href = `clinic-details.html?name=${encodeURIComponent(clinicName)}`;
    }

    function openDirections(address) {
        // Open Google Maps with the address
        const encodedAddress = encodeURIComponent(address);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        window.open(mapsUrl, '_blank');
        
        showNotification('فتح الخريطة...', 'success');
    }

    function updateResultsCount(count = null) {
        const visibleClinics = count !== null ? count : document.querySelectorAll('.clinic-card[style*="block"], .clinic-card:not([style*="none"])').length;
        resultsCount.textContent = visibleClinics;
    }

    function showNoResultsMessage(show) {
        let noResultsMsg = document.getElementById('noResultsMessage');
        
        if (show && !noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMessage';
            noResultsMsg.className = 'col-span-full text-center py-12';
            noResultsMsg.innerHTML = `
                <div class="text-gray-400 mb-4">
                    <i class="fas fa-hospital text-6xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">لم يتم العثور على مؤسسات صحية</h3>
                <p class="text-gray-500 mb-4">جرب تعديل معايير البحث أو الفلاتر</p>
                <button id="resetFiltersBtn" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    إعادة تعيين الفلاتر
                </button>
            `;
            
            clinicsContainer.appendChild(noResultsMsg);
            
            // Add reset functionality
            document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);
        } else if (!show && noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    function resetFilters() {
        searchInput.value = '';
        cityFilter.value = '';
        specialtyFilter.value = '';
        
        clinicCards.forEach(card => {
            card.style.display = 'block';
            card.classList.add('fade-in-up');
        });
        
        updateResultsCount();
        hideNoResultsMessage();
    }

    function hideNoResultsMessage() {
        const noResultsMsg = document.getElementById('noResultsMessage');
        if (noResultsMsg) {
            noResultsMsg.remove();
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

    // Map view functionality
    const mapButton = document.querySelector('.bg-green-600');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            showNotification('ميزة الخريطة التفاعلية قيد التطوير', 'info');
            // In a real application, this would integrate with Google Maps or similar service
        });
    }

    // Export functions for external use
    window.ClinicsPage = {
        filterClinics,
        setView,
        resetFilters,
        showClinicDetails,
        openDirections
    };
});