import { useState, useEffect } from 'react';
import SearchFilter from '../components/SearchFilter';
import JobCard from '../components/JobCard';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const JobSearchPage = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  
  // Mock data for categories and cities
  const jobCategories = [
    { id: 'doctor', name: isRTL ? 'طبيب' : 'Doctor' },
    { id: 'nurse', name: isRTL ? 'تمريض' : 'Nursing' },
    { id: 'dental', name: isRTL ? 'طب أسنان' : 'Dental' },
    { id: 'lab', name: isRTL ? 'مختبرات' : 'Laboratory' },
    { id: 'pharmacy', name: isRTL ? 'صيدلة' : 'Pharmacy' },
    { id: 'engineering', name: isRTL ? 'هندسة طبية' : 'Medical Engineering' },
    { id: 'management', name: isRTL ? 'إدارة صحية' : 'Healthcare Management' },
  ];

  const saudiCities = [
    { id: 'riyadh', name: isRTL ? 'الرياض' : 'Riyadh' },
    { id: 'jeddah', name: isRTL ? 'جدة' : 'Jeddah' },
    { id: 'dammam', name: isRTL ? 'الدمام' : 'Dammam' },
    { id: 'makkah', name: isRTL ? 'مكة المكرمة' : 'Makkah' },
    { id: 'madinah', name: isRTL ? 'المدينة المنورة' : 'Madinah' },
    { id: 'taif', name: isRTL ? 'الطائف' : 'Taif' },
    { id: 'abha', name: isRTL ? 'أبها' : 'Abha' },
  ];

  // Mock job listings
  const mockJobs = [
    {
      id: 'job1',
      title: isRTL ? 'أخصائي باطنة' : 'Internal Medicine Specialist',
      company: isRTL ? 'مستشفى المملكة' : 'Kingdom Hospital',
      location: isRTL ? 'الرياض' : 'Riyadh',
      contractType: isRTL ? 'دوام كامل' : 'Full Time',
      salary: '25,000 - 30,000 ريال',
      postedDate: isRTL ? 'منذ 3 أيام' : '3 days ago',
      featured: true,
    },
    {
      id: 'job2',
      title: isRTL ? 'طبيب أسنان' : 'Dentist',
      company: isRTL ? 'مجمع عيادات الشفاء' : 'Al-Shifa Medical Complex',
      location: isRTL ? 'جدة' : 'Jeddah',
      contractType: isRTL ? 'دوام كامل' : 'Full Time',
      salary: '22,000 - 28,000 ريال',
      postedDate: isRTL ? 'منذ 5 أيام' : '5 days ago',
      featured: false,
    },
    {
      id: 'job3',
      title: isRTL ? 'فني مختبر' : 'Lab Technician',
      company: isRTL ? 'المختبر الطبي المتقدم' : 'Advanced Medical Laboratory',
      location: isRTL ? 'الدمام' : 'Dammam',
      contractType: isRTL ? 'دوام جزئي' : 'Part Time',
      salary: '10,000 - 13,000 ريال',
      postedDate: isRTL ? 'منذ أسبوع' : '1 week ago',
      featured: false,
    },
    {
      id: 'job4',
      title: isRTL ? 'مدير تمريض' : 'Nursing Manager',
      company: isRTL ? 'مستشفى الأمل' : 'Al-Amal Hospital',
      location: isRTL ? 'مكة المكرمة' : 'Makkah',
      contractType: isRTL ? 'دوام كامل' : 'Full Time',
      salary: '18,000 - 22,000 ريال',
      postedDate: isRTL ? 'منذ أسبوع' : '1 week ago',
      featured: true,
    },
    {
      id: 'job5',
      title: isRTL ? 'صيدلي' : 'Pharmacist',
      company: isRTL ? 'صيدليات الدواء' : 'Al-Dawa Pharmacies',
      location: isRTL ? 'الرياض' : 'Riyadh',
      contractType: isRTL ? 'دوام كامل' : 'Full Time',
      salary: '15,000 - 18,000 ريال',
      postedDate: isRTL ? 'منذ 10 أيام' : '10 days ago',
      featured: false,
    },
    {
      id: 'job6',
      title: isRTL ? 'مهندس أجهزة طبية' : 'Medical Device Engineer',
      company: isRTL ? 'شركة الحلول الطبية' : 'Medical Solutions Company',
      location: isRTL ? 'جدة' : 'Jeddah',
      contractType: isRTL ? 'دوام كامل' : 'Full Time',
      salary: '19,000 - 24,000 ريال',
      postedDate: isRTL ? 'منذ أسبوعين' : '2 weeks ago',
      featured: false,
    },
  ];
  
  // Update page title on component mount
  useEffect(() => {
    document.title = `${t('jobs.title')} | MedConnect.sa`;
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, [t, isRTL]);
  
  const handleFilter = (filters: any) => {
    let filtered = [...jobs];
    
    // Filter by keyword
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword)
      );
    }
    
    // Filter by category (not implemented in mock data, but would be straightforward to add)
    
    // Filter by city
    if (filters.city) {
      filtered = filtered.filter((job) => {
        const city = saudiCities.find((c) => c.id === filters.city);
        return job.location === city?.name;
      });
    }
    
    // Filter by contract type
    if (filters.contractType) {
      const contractTypeMap: Record<string, string> = {
        'full-time': isRTL ? 'دوام كامل' : 'Full Time',
        'part-time': isRTL ? 'دوام جزئي' : 'Part Time',
        'temporary': isRTL ? 'مؤقت' : 'Temporary',
        'contract': isRTL ? 'تعاقد' : 'Contract',
      };
      
      filtered = filtered.filter(
        (job) => job.contractType === contractTypeMap[filters.contractType]
      );
    }
    
    setFilteredJobs(filtered);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('jobs.title')}</h1>
          <p className="mt-2 text-lg text-gray-600">
            {t('jobs.subtitle', { defaultValue: 'Find your perfect opportunity in the healthcare sector' })}
          </p>
        </div>
        
        <div className="mb-8">
          <SearchFilter 
            categories={jobCategories} 
            cities={saudiCities} 
            onFilter={handleFilter}
            type="job"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">
                {t('jobs.noResults', { defaultValue: 'No jobs found matching your search criteria' })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;