import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Upload, 
  Save, 
  Edit, 
  Eye,
  Plus,
  Trash2,
  GraduationCap,
  Briefcase,
  Award,
  Globe,
  Building,
  Heart
} from 'lucide-react';
import { 
  PersonalInfoApi, 
  CreatePersonalInfoDto, 
  PersonalInfoDto,
  NationalitiesApi,
  CitiesApi,
  JobTitlesApi,
  MaritalStatusesApi,
  GendersApi,
  CreateEducationBriefDto,
  CreateExperienceBriefDto,
  CreateSkillsBriefDto
} from '../api-client';

const PersonalInfoPage = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  // State for form data
  const [formData, setFormData] = useState<CreatePersonalInfoDto>({
    fullNameAr: '',
    fullNameEn: '',
    nationalityId: '',
    idNumber: '',
    passportNumber: '',
    passportExpiry: '',
    birthDate: '',
    gender: '',
    maritalStatusId: '',
    cityId: '',
    countryCode: '',
    mobile: '',
    email: '',
    jobTitleId: '',
    summaryAr: '',
    summaryEn: '',
    preferencesAr: '',
    preferencesEn: '',
    educations: [] as CreateEducationBriefDto[],
    skills: [] as CreateSkillsBriefDto[],
    experiences: [] as CreateExperienceBriefDto[]
  });

  // State for existing data
  const [existingData, setExistingData] = useState<PersonalInfoDto | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState('');

  // State for dropdown data
  const [nationalities, setNationalities] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [jobTitles, setJobTitles] = useState<any[]>([]);
  const [maritalStatuses, setMaritalStatuses] = useState<any[]>([]);
  const [genders, setGenders] = useState<any[]>([]);

  // API instances
  const personalInfoApi = new PersonalInfoApi();
  const nationalitiesApi = new NationalitiesApi();
  const citiesApi = new CitiesApi();
  const jobTitlesApi = new JobTitlesApi();
  const maritalStatusesApi = new MaritalStatusesApi();
  const gendersApi = new GendersApi();

  useEffect(() => {
    document.title = `${t('personalInfo.title')} | Health Candidate Portal`;
    loadDropdownData();
    loadExistingData();
  }, [t]);

  const loadDropdownData = async () => {
    try {
      const [nationalitiesRes, citiesRes, jobTitlesRes, maritalStatusesRes, gendersRes] = await Promise.all([
        nationalitiesApi.apiNationalitiesGet(),
        citiesApi.apiCitiesGet(),
        jobTitlesApi.apiJobTitlesAllGet(),
        maritalStatusesApi.apiMaritalStatusesGet(),
        gendersApi.apiGendersGet()
      ]);

      // Ensure we're setting arrays and handle potential null/undefined values
      setNationalities(Array.isArray(nationalitiesRes.data.data) ? nationalitiesRes.data.data : []);
      setCities(Array.isArray(citiesRes.data.data?.items) ? citiesRes.data.data.items : []);
      setJobTitles(Array.isArray(jobTitlesRes.data.data) ? jobTitlesRes.data.data : []);
      setMaritalStatuses(Array.isArray(maritalStatusesRes.data.data?.items) ? maritalStatusesRes.data.data.items : []);
      setGenders(Array.isArray(gendersRes.data.data?.items) ? gendersRes.data.data.items : []);
    } catch (error) {
      console.error('Error loading dropdown data:', error);
      // Set empty arrays on error to prevent map errors
      setNationalities([]);
      setCities([]);
      setJobTitles([]);
      setMaritalStatuses([]);
      setGenders([]);
    }
  };

  const loadExistingData = async () => {
    try {
      setIsLoading(true);
      // Assuming we have a way to get current user's personal info
      // For now, we'll try to get the first available personal info
      const response = await personalInfoApi.apiPersonalInfoGet();
      if (response.data.data?.items && response.data.data.items.length > 0) {
        const existingInfo = response.data.data.items[0];
        setExistingData(existingInfo);
        setFormData({
          fullNameAr: existingInfo.fullNameAr || '',
          fullNameEn: existingInfo.fullNameEn || '',
          nationalityId: existingInfo.nationalityId || '',
          idNumber: existingInfo.idNumber || '',
          passportNumber: existingInfo.passportNumber || '',
          passportExpiry: existingInfo.passportExpiry || '',
          birthDate: existingInfo.birthDate || '',
          gender: existingInfo.gender || '',
          maritalStatusId: existingInfo.maritalStatusId || '',
          cityId: existingInfo.cityId || '',
          countryCode: existingInfo.countryCode || '',
          mobile: existingInfo.mobile || '',
          email: existingInfo.email || '',
          jobTitleId: existingInfo.jobTitleId || '',
          summaryAr: existingInfo.summaryAr || '',
          summaryEn: existingInfo.summaryEn || '',
          preferencesAr: existingInfo.preferencesAr || '',
          preferencesEn: existingInfo.preferencesEn || '',
          educations: existingInfo.educations || [],
          skills: existingInfo.skills || [],
          experiences: existingInfo.experiences || []
        });
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreatePersonalInfoDto, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'educations' | 'skills' | 'experiences', index: number, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.map((item, i) => i === index ? { ...item, ...value } : item) || []
    }));
  };

  const addArrayItem = (field: 'educations' | 'skills' | 'experiences') => {
    const newItem = field === 'educations' ? {} as CreateEducationBriefDto :
                   field === 'skills' ? {} as CreateSkillsBriefDto :
                   {} as CreateExperienceBriefDto;
    
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), newItem]
    }));
  };

  const removeArrayItem = (field: 'educations' | 'skills' | 'experiences', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || []
    }));
  };

  const handleCvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCvFile(file);
      setCvFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (existingData) {
        // Update existing data
        await personalInfoApi.apiPersonalInfoIdPut(existingData.id!, formData);
      } else {
        // Create new data
        await personalInfoApi.apiPersonalInfoPost(formData);
      }

      // Handle CV upload if file is selected
      if (cvFile) {
        // TODO: Implement CV upload API call
        console.log('CV file to upload:', cvFile);
      }

      setIsEditing(false);
      await loadExistingData();
    } catch (error) {
      console.error('Error saving personal info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (isLoading && !existingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-600 ml-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {t('personalInfo.title')}
                  </h1>
                  <p className="text-gray-600">
                    {isRTL ? 'إدارة معلوماتك الشخصية والمهنية' : 'Manage your personal and professional information'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                {!isEditing && (
                  <button
                    onClick={toggleEdit}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="h-4 w-4 ml-2" />
                    {isRTL ? 'تعديل' : 'Edit'}
                  </button>
                )}
                {isEditing && (
                  <>
                    <button
                      onClick={toggleEdit}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Eye className="h-4 w-4 ml-2" />
                      {isRTL ? 'عرض' : 'View'}
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 ml-2" />
                      {isLoading ? (isRTL ? 'حفظ...' : 'Saving...') : (isRTL ? 'حفظ' : 'Save')}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 ml-2 text-blue-600" />
                {isRTL ? 'المعلومات الشخصية' : 'Personal Information'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'الاسم الكامل (عربي)' : 'Full Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.fullNameAr || ''}
                    onChange={(e) => handleInputChange('fullNameAr', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'الاسم الكامل (إنجليزي)' : 'Full Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.fullNameEn || ''}
                    onChange={(e) => handleInputChange('fullNameEn', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                {/* Contact Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'رقم الجوال' : 'Mobile Number'}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.mobile || ''}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {/* Nationality and City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'الجنسية' : 'Nationality'}
                  </label>
                  <select
                    value={formData.nationalityId || ''}
                    onChange={(e) => handleInputChange('nationalityId', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">{isRTL ? 'اختر الجنسية' : 'Select Nationality'}</option>
                    {Array.isArray(nationalities) && nationalities.map((nationality: any) => (
                      <option key={nationality.id} value={nationality.id}>
                        {isRTL ? nationality.nameAr : nationality.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'المدينة' : 'City'}
                  </label>
                  <select
                    value={formData.cityId || ''}
                    onChange={(e) => handleInputChange('cityId', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">{isRTL ? 'اختر المدينة' : 'Select City'}</option>
                    {Array.isArray(cities) && cities.map((city: any) => (
                      <option key={city.id} value={city.id}>
                        {isRTL ? city.nameAr : city.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Birth Date and Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'تاريخ الميلاد' : 'Birth Date'}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.birthDate || ''}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'الجنس' : 'Gender'}
                  </label>
                  <select
                    value={formData.gender || ''}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">{isRTL ? 'اختر الجنس' : 'Select Gender'}</option>
                    {Array.isArray(genders) && genders.map((gender: any) => (
                      <option key={gender.id} value={gender.code}>
                        {isRTL ? gender.nameAr : gender.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Title and Marital Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'المسمى الوظيفي' : 'Job Title'}
                  </label>
                  <select
                    value={formData.jobTitleId || ''}
                    onChange={(e) => handleInputChange('jobTitleId', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">{isRTL ? 'اختر المسمى الوظيفي' : 'Select Job Title'}</option>
                    {Array.isArray(jobTitles) && jobTitles.map((jobTitle: any) => (
                      <option key={jobTitle.id} value={jobTitle.id}>
                        {isRTL ? jobTitle.nameAr : jobTitle.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'الحالة الاجتماعية' : 'Marital Status'}
                  </label>
                  <select
                    value={formData.maritalStatusId || ''}
                    onChange={(e) => handleInputChange('maritalStatusId', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">{isRTL ? 'اختر الحالة الاجتماعية' : 'Select Marital Status'}</option>
                    {Array.isArray(maritalStatuses) && maritalStatuses.map((status: any) => (
                      <option key={status.id} value={status.id}>
                        {isRTL ? status.nameAr : status.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 ml-2 text-blue-600" />
                {isRTL ? 'الملخص والتفضيلات' : 'Summary & Preferences'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'الملخص (عربي)' : 'Summary (Arabic)'}
                  </label>
                  <textarea
                    value={formData.summaryAr || ''}
                    onChange={(e) => handleInputChange('summaryAr', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder={isRTL ? 'اكتب ملخصاً مختصراً عن خبراتك ومؤهلاتك...' : 'Write a brief summary about your experience and qualifications...'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'الملخص (إنجليزي)' : 'Summary (English)'}
                  </label>
                  <textarea
                    value={formData.summaryEn || ''}
                    onChange={(e) => handleInputChange('summaryEn', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder={isRTL ? 'Write a brief summary about your experience and qualifications...' : 'اكتب ملخصاً مختصراً عن خبراتك ومؤهلاتك...'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'التفضيلات (عربي)' : 'Preferences (Arabic)'}
                  </label>
                  <textarea
                    value={formData.preferencesAr || ''}
                    onChange={(e) => handleInputChange('preferencesAr', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder={isRTL ? 'اكتب تفضيلاتك الوظيفية...' : 'Write your job preferences...'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'التفضيلات (إنجليزي)' : 'Preferences (English)'}
                  </label>
                  <textarea
                    value={formData.preferencesEn || ''}
                    onChange={(e) => handleInputChange('preferencesEn', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder={isRTL ? 'Write your job preferences...' : 'اكتب تفضيلاتك الوظيفية...'}
                  />
                </div>
              </div>
            </div>

            {/* CV Upload Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="h-5 w-5 ml-2 text-blue-600" />
                {isRTL ? 'رفع السيرة الذاتية' : 'CV Upload'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'ملف السيرة الذاتية (PDF)' : 'CV File (PDF)'}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleCvUpload}
                      disabled={!isEditing}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label
                      htmlFor="cv-upload"
                      className={`flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                        !isEditing ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Upload className="h-4 w-4 ml-2" />
                      {isRTL ? 'اختر ملف' : 'Choose File'}
                    </label>
                    {cvFileName && (
                      <span className="text-sm text-gray-600">
                        {cvFileName}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {isRTL ? 'الحد الأقصى: 5 ميجابايت' : 'Maximum size: 5MB'}
                  </p>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <GraduationCap className="h-5 w-5 ml-2 text-blue-600" />
                  {isRTL ? 'التعليم' : 'Education'}
                </h2>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('educations')}
                    className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 ml-1" />
                    {isRTL ? 'إضافة' : 'Add'}
                  </button>
                )}
              </div>
              
                             <div className="space-y-4">
                 {Array.isArray(formData.educations) && formData.educations.map((education, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">
                        {isRTL ? `التعليم ${index + 1}` : `Education ${index + 1}`}
                      </h3>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('educations', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'المؤسسة التعليمية (عربي)' : 'Institution (Arabic)'}
                        </label>
                        <input
                          type="text"
                          value={education.institutionAr || ''}
                          onChange={(e) => handleArrayChange('educations', index, { institutionAr: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'المؤسسة التعليمية (إنجليزي)' : 'Institution (English)'}
                        </label>
                        <input
                          type="text"
                          value={education.institutionEn || ''}
                          onChange={(e) => handleArrayChange('educations', index, { institutionEn: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'الدرجة العلمية (عربي)' : 'Degree (Arabic)'}
                        </label>
                        <input
                          type="text"
                          value={education.degreeAr || ''}
                          onChange={(e) => handleArrayChange('educations', index, { degreeAr: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'الدرجة العلمية (إنجليزي)' : 'Degree (English)'}
                        </label>
                        <input
                          type="text"
                          value={education.degreeEn || ''}
                          onChange={(e) => handleArrayChange('educations', index, { degreeEn: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'تاريخ البداية' : 'Start Date'}
                        </label>
                        <input
                          type="date"
                          value={education.startDate || ''}
                          onChange={(e) => handleArrayChange('educations', index, { startDate: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'تاريخ الانتهاء' : 'End Date'}
                        </label>
                        <input
                          type="date"
                          value={education.endDate || ''}
                          onChange={(e) => handleArrayChange('educations', index, { endDate: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Briefcase className="h-5 w-5 ml-2 text-blue-600" />
                  {isRTL ? 'الخبرات' : 'Experience'}
                </h2>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('experiences')}
                    className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 ml-1" />
                    {isRTL ? 'إضافة' : 'Add'}
                  </button>
                )}
              </div>
              
                             <div className="space-y-4">
                 {Array.isArray(formData.experiences) && formData.experiences.map((experience, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">
                        {isRTL ? `الخبرة ${index + 1}` : `Experience ${index + 1}`}
                      </h3>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('experiences', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'الشركة (عربي)' : 'Company (Arabic)'}
                        </label>
                        <input
                          type="text"
                          value={experience.companyAr || ''}
                          onChange={(e) => handleArrayChange('experiences', index, { companyAr: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'الشركة (إنجليزي)' : 'Company (English)'}
                        </label>
                        <input
                          type="text"
                          value={experience.companyEn || ''}
                          onChange={(e) => handleArrayChange('experiences', index, { companyEn: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'تاريخ البداية' : 'Start Date'}
                        </label>
                        <input
                          type="date"
                          value={experience.startDate || ''}
                          onChange={(e) => handleArrayChange('experiences', index, { startDate: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'تاريخ الانتهاء' : 'End Date'}
                        </label>
                        <input
                          type="date"
                          value={experience.endDate || ''}
                          onChange={(e) => handleArrayChange('experiences', index, { endDate: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'المسؤوليات (عربي)' : 'Responsibilities (Arabic)'}
                        </label>
                        <textarea
                          value={experience.responsibilitiesAr || ''}
                          onChange={(e) => handleArrayChange('experiences', index, { responsibilitiesAr: e.target.value })}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'المسؤوليات (إنجليزي)' : 'Responsibilities (English)'}
                        </label>
                        <textarea
                          value={experience.responsibilitiesEn || ''}
                          onChange={(e) => handleArrayChange('experiences', index, { responsibilitiesEn: e.target.value })}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Award className="h-5 w-5 ml-2 text-blue-600" />
                  {isRTL ? 'المهارات' : 'Skills'}
                </h2>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('skills')}
                    className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 ml-1" />
                    {isRTL ? 'إضافة' : 'Add'}
                  </button>
                )}
              </div>
              
                             <div className="space-y-4">
                 {Array.isArray(formData.skills) && formData.skills.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">
                        {isRTL ? `المهارة ${index + 1}` : `Skill ${index + 1}`}
                      </h3>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('skills', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'اسم المهارة (عربي)' : 'Skill Name (Arabic)'}
                        </label>
                        <input
                          type="text"
                          value={skill.skillNameAr || ''}
                          onChange={(e) => handleArrayChange('skills', index, { skillNameAr: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'اسم المهارة (إنجليزي)' : 'Skill Name (English)'}
                        </label>
                        <input
                          type="text"
                          value={skill.skillNameEn || ''}
                          onChange={(e) => handleArrayChange('skills', index, { skillNameEn: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'مستوى الإتقان (عربي)' : 'Proficiency Level (Arabic)'}
                        </label>
                        <input
                          type="text"
                          value={skill.proficiencyLevelAr || ''}
                          onChange={(e) => handleArrayChange('skills', index, { proficiencyLevelAr: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'مستوى الإتقان (إنجليزي)' : 'Proficiency Level (English)'}
                        </label>
                        <input
                          type="text"
                          value={skill.proficiencyLevelEn || ''}
                          onChange={(e) => handleArrayChange('skills', index, { proficiencyLevelEn: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isRTL ? 'سنوات الخبرة' : 'Years of Experience'}
                        </label>
                        <input
                          type="number"
                          value={skill.yearsOfExperience || ''}
                          onChange={(e) => handleArrayChange('skills', index, { yearsOfExperience: parseInt(e.target.value) || 0 })}
                          disabled={!isEditing}
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
