import { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

interface SearchFilterProps {
  categories: { id: string; name: string }[];
  cities: { id: string; name: string }[];
  onFilter: (filters: any) => void;
  type?: 'job' | 'property';
}

const SearchFilter = ({ 
  categories, 
  cities, 
  onFilter,
  type = 'job' 
}: SearchFilterProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    city: '',
    contractType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Keyword Search */}
          <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'job' 
                ? (isRTL ? 'البحث عن وظيفة' : 'Search for Job')
                : (isRTL ? 'البحث عن عقار' : 'Search for Property')
              }
            </label>
            <div className="relative">
              <input
                type="text"
                id="keyword"
                name="keyword"
                value={filters.keyword}
                onChange={handleChange}
                placeholder={type === 'job' 
                  ? (isRTL ? 'مسمى الوظيفة أو الشركة' : 'Job title or company')
                  : (isRTL ? 'نوع العقار أو الموقع' : 'Property type or location')
                }
                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  isRTL ? 'pr-10' : 'pl-10'
                }`}
              />
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Category / Specialty */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'job' 
                ? (isRTL ? 'التخصص' : 'Specialty')
                : (isRTL ? 'نوع العقار' : 'Property Type')
              }
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">{isRTL ? 'الكل' : 'All'}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* City / Location */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'المدينة' : 'City'}
            </label>
            <select
              id="city"
              name="city"
              value={filters.city}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">{isRTL ? 'الكل' : 'All'}</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Contract Type (for jobs) or Property Status (for properties) */}
          {type === 'job' ? (
            <div>
              <label htmlFor="contractType" className="block text-sm font-medium text-gray-700 mb-1">
                {isRTL ? 'نوع العقد' : 'Contract Type'}
              </label>
              <select
                id="contractType"
                name="contractType"
                value={filters.contractType}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">{isRTL ? 'الكل' : 'All'}</option>
                <option value="full-time">{isRTL ? 'دوام كامل' : 'Full Time'}</option>
                <option value="part-time">{isRTL ? 'دوام جزئي' : 'Part Time'}</option>
                <option value="temporary">{isRTL ? 'مؤقت' : 'Temporary'}</option>
                <option value="contract">{isRTL ? 'تعاقد' : 'Contract'}</option>
              </select>
            </div>
          ) : (
            <div>
              <label htmlFor="propertyStatus" className="block text-sm font-medium text-gray-700 mb-1">
                {isRTL ? 'حالة العقار' : 'Property Status'}
              </label>
              <select
                id="propertyStatus"
                name="propertyStatus"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">{isRTL ? 'الكل' : 'All'}</option>
                <option value="sale">{isRTL ? 'للبيع' : 'For Sale'}</option>
                <option value="rent">{isRTL ? 'للإيجار' : 'For Rent'}</option>
              </select>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isRTL ? 'بحث' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;