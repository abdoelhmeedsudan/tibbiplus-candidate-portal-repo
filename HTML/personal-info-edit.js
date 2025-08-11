// Personal Info Edit page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Form elements
    const form = document.getElementById('personalInfoForm');
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const addSkillBtn = document.getElementById('addSkill');
    
    // Counters for dynamic entries
    let educationCounter = 1;
    let experienceCounter = 1;
    let skillCounter = 1;

    // Initialize page
    setupTabNavigation();
    setupDynamicEntries();
    setupFormSubmission();

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

    function setupDynamicEntries() {
        // Add Education Entry
        addEducationBtn.addEventListener('click', function() {
            const educationList = document.getElementById('educationList');
            const newEntry = createEducationEntry(educationCounter);
            educationList.appendChild(newEntry);
            educationCounter++;
        });

        // Add Experience Entry
        addExperienceBtn.addEventListener('click', function() {
            const experienceList = document.getElementById('experienceList');
            const newEntry = createExperienceEntry(experienceCounter);
            experienceList.appendChild(newEntry);
            experienceCounter++;
        });

        // Add Skill Entry
        addSkillBtn.addEventListener('click', function() {
            const skillsList = document.getElementById('skillsList');
            const newEntry = createSkillEntry(skillCounter);
            skillsList.appendChild(newEntry);
            skillCounter++;
        });

        // Remove entry event delegation
        document.addEventListener('click', function(e) {
            if (e.target.closest('.remove-education')) {
                e.target.closest('.education-entry').remove();
            }
            if (e.target.closest('.remove-experience')) {
                e.target.closest('.experience-entry').remove();
            }
            if (e.target.closest('.remove-skill')) {
                e.target.closest('.skill-entry').remove();
            }
        });
    }

    function createEducationEntry(index) {
        const div = document.createElement('div');
        div.className = 'education-entry border border-gray-200 rounded-lg p-6';
        div.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900">المؤهل #${index + 1}</h3>
                <button type="button" class="remove-education text-red-600 hover:text-red-700">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">اسم المؤسسة (عربي)</label>
                    <input type="text" name="educations[${index}][institutionAr]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">اسم المؤسسة (إنجليزي)</label>
                    <input type="text" name="educations[${index}][institutionEn]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">الدرجة العلمية (عربي)</label>
                    <input type="text" name="educations[${index}][degreeAr]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">الدرجة العلمية (إنجليزي)</label>
                    <input type="text" name="educations[${index}][degreeEn]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">تاريخ البداية</label>
                    <input type="date" name="educations[${index}][startDate]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">تاريخ النهاية</label>
                    <input type="date" name="educations[${index}][endDate]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">ملاحظات (عربي)</label>
                    <textarea name="educations[${index}][notesAr]" rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">ملاحظات (إنجليزي)</label>
                    <textarea name="educations[${index}][notesEn]" rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
            </div>
        `;
        return div;
    }

    function createExperienceEntry(index) {
        const div = document.createElement('div');
        div.className = 'experience-entry border border-gray-200 rounded-lg p-6';
        div.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900">الخبرة #${index + 1}</h3>
                <button type="button" class="remove-experience text-red-600 hover:text-red-700">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">اسم الشركة (عربي)</label>
                    <input type="text" name="experiences[${index}][companyAr]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">اسم الشركة (إنجليزي)</label>
                    <input type="text" name="experiences[${index}][companyEn]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">المسمى الوظيفي</label>
                    <select name="experiences[${index}][jobTitleId]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">اختر المسمى الوظيفي</option>
                        <option value="consultant">استشاري</option>
                        <option value="specialist">أخصائي</option>
                        <option value="resident">مقيم</option>
                        <option value="intern">طبيب امتياز</option>
                        <option value="senior-nurse">ممرض أول</option>
                        <option value="nurse">ممرض</option>
                        <option value="pharmacist">صيدلي</option>
                        <option value="technician">فني</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">تاريخ البداية</label>
                    <input type="date" name="experiences[${index}][startDate]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">تاريخ النهاية</label>
                    <input type="date" name="experiences[${index}][endDate]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">المسؤوليات (عربي)</label>
                    <textarea name="experiences[${index}][responsibilitiesAr]" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">المسؤوليات (إنجليزي)</label>
                    <textarea name="experiences[${index}][responsibilitiesEn]" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
            </div>
        `;
        return div;
    }

    function createSkillEntry(index) {
        const div = document.createElement('div');
        div.className = 'skill-entry border border-gray-200 rounded-lg p-6';
        div.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900">المهارة #${index + 1}</h3>
                <button type="button" class="remove-skill text-red-600 hover:text-red-700">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">اسم المهارة (عربي)</label>
                    <input type="text" name="skills[${index}][skillNameAr]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">اسم المهارة (إنجليزي)</label>
                    <input type="text" name="skills[${index}][skillNameEn]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">مستوى الإتقان (عربي)</label>
                    <select name="skills[${index}][proficiencyLevelAr]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">اختر المستوى</option>
                        <option value="مبتدئ">مبتدئ</option>
                        <option value="متوسط">متوسط</option>
                        <option value="متقدم">متقدم</option>
                        <option value="خبير">خبير</option>
                        <option value="متخصص">متخصص</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">مستوى الإتقان (إنجليزي)</label>
                    <select name="skills[${index}][proficiencyLevelEn]" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                        <option value="Specialist">Specialist</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
                    <input type="number" name="skills[${index}][yearsOfExperience]" min="0" max="50" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
        `;
        return div;
    }

    function setupFormSubmission() {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            
            // Basic form fields
            for (let [key, value] of formData.entries()) {
                if (!key.includes('[')) {
                    data[key] = value;
                }
            }
            
            // Handle arrays (educations, experiences, skills)
            data.educations = collectArrayData('educations');
            data.experiences = collectArrayData('experiences');
            data.skills = collectArrayData('skills');
            
            console.log('Form data:', data);
            
            // Show success message
            showNotification('تم حفظ البيانات بنجاح!', 'success');
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'personal-info.html';
            }, 2000);
        });
    }

    function collectArrayData(arrayName) {
        const entries = document.querySelectorAll(`.${arrayName.slice(0, -1)}-entry`);
        const arrayData = [];
        
        entries.forEach((entry, index) => {
            const entryData = {};
            const inputs = entry.querySelectorAll(`[name^="${arrayName}[${index}]"]`);
            
            inputs.forEach(input => {
                const fieldName = input.name.match(/\[([^\]]+)\]$/)[1];
                entryData[fieldName] = input.value;
            });
            
            arrayData.push(entryData);
        });
        
        return arrayData;
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

    // Form validation
    function validateForm() {
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
        
        return isValid;
    }

    // Auto-save functionality (optional)
    function setupAutoSave() {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                // Save to localStorage
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                localStorage.setItem('personalInfoDraft', JSON.stringify(data));
            });
        });
    }

    // Load draft data (optional)
    function loadDraftData() {
        const draftData = localStorage.getItem('personalInfoDraft');
        if (draftData) {
            const data = JSON.parse(draftData);
            
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = data[key];
                }
            });
        }
    }

    // Initialize optional features
    setupAutoSave();
    loadDraftData();
});