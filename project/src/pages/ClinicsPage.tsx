import { useState, useEffect } from 'react';
import SearchFilter from '../components/SearchFilter';
import PropertyCard from '../components/PropertyCard';
import { Tabs, TabList, Tab, TabPanel } from '../components/Tabs';
import { Building, Home } from 'lucide-react';

// Mock data for property categories and cities
const propertyCategories = [
  { id: 'building', name: 'مبنى كامل' },
  { id: 'floor', name: 'طابق' },
  { id: 'clinic', name: 'عيادة' },
  { id: 'office', name: 'مكتب' },
  { id: 'pharmacy', name: 'صيدلية' },
  { id: 'lab', name: 'مختبر' },
];

const saudiCities = [
  { id: 'riyadh', name: 'الرياض' },
  { id: 'jeddah', name: 'جدة' },
  { id: 'dammam', name: 'الدمام' },
  { id: 'makkah', name: 'مكة المكرمة' },
  { id: 'madinah', name: 'المدينة المنورة' },
  { id: 'taif', name: 'الطائف' },
  { id: 'abha', name: 'أبها' },
];

// Mock property listings
const mockProperties = [
  {
    id: 'prop1',
    title: 'مجمع طبي راقي للبيع',
    type: 'sale',
    propertyType: 'مبنى كامل',
    location: 'الرياض - حي الملقا',
    area: '1,500 متر مربع',
    price: '8,500,000 ريال',
    imageUrl: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'prop2',
    title: 'عيادة طبية للإيجار',
    type: 'rent',
    propertyType: 'عيادة',
    location: 'جدة - حي الصفا',
    area: '120 متر مربع',
    price: '75,000 ريال/سنة',
    imageUrl: 'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'prop3',
    title: 'طابق كامل في مجمع طبي للبيع',
    type: 'sale',
    propertyType: 'طابق',
    location: 'الدمام - حي الشاطئ',
    area: '450 متر مربع',
    price: '2,800,000 ريال',
    imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'prop4',
    title: 'مختبر طبي للإيجار',
    type: 'rent',
    propertyType: 'مختبر',
    location: 'الرياض - حي العليا',
    area: '200 متر مربع',
    price: '120,000 ريال/سنة',
    imageUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'prop5',
    title: 'عيادات طبية فاخرة للبيع',
    type: 'sale',
    propertyType: 'عيادة',
    location: 'مكة المكرمة - العزيزية',
    area: '85 متر مربع',
    price: '950,000 ريال',
    imageUrl: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'prop6',
    title: 'مبنى طبي كامل للإيجار',
    type: 'rent',
    propertyType: 'مبنى كامل',
    location: 'جدة - حي الروضة',
    area: '1,200 متر مربع',
    price: '750,000 ريال/سنة',
    imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const ClinicsPage = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [activeTab, setActiveTab] = useState(0);
  
  // Update page title on component mount
  useEffect(() => {
    document.title = 'المجمعات الطبية | MedConnect.sa';
  }, []);
  
  useEffect(() => {
    // Filter properties based on active tab (0 = all, 1 = for sale, 2 = for rent)
    if (activeTab === 1) {
      setFilteredProperties(properties.filter(p => p.type === 'sale'));
    } else if (activeTab === 2) {
      setFilteredProperties(properties.filter(p => p.type === 'rent'));
    } else {
      setFilteredProperties(properties);
    }
  }, [activeTab, properties]);
  
  const handleFilter = (filters: any) => {
    let filtered = [...properties];
    
    // Apply active tab filter (sale or rent)
    if (activeTab === 1) {
      filtered = filtered.filter(p => p.type === 'sale');
    } else if (activeTab === 2) {
      filtered = filtered.filter(p => p.type === 'rent');
    }
    
    // Filter by keyword
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(keyword) ||
          property.location.toLowerCase().includes(keyword)
      );
    }
    
    // Filter by category
    if (filters.category) {
      const category = propertyCategories.find(c => c.id === filters.category);
      if (category) {
        filtered = filtered.filter(p => p.propertyType === category.name);
      }
    }
    
    // Filter by city
    if (filters.city) {
      const city = saudiCities.find(c => c.id === filters.city);
      if (city) {
        filtered = filtered.filter(p => p.location.includes(city.name));
      }
    }
    
    setFilteredProperties(filtered);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">المجمعات الطبية</h1>
          <p className="mt-2 text-lg text-gray-600">عقارات طبية للبيع والإيجار في مختلف مناطق المملكة</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <Tabs activeTab={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab>
                <Building className="h-5 w-5 ml-2" />
                جميع العقارات
              </Tab>
              <Tab>
                <Home className="h-5 w-5 ml-2" />
                للبيع
              </Tab>
              <Tab>
                <Home className="h-5 w-5 ml-2" />
                للإيجار
              </Tab>
            </TabList>
            
            <TabPanel>
              <div className="p-6">
                <SearchFilter 
                  categories={propertyCategories} 
                  cities={saudiCities} 
                  onFilter={handleFilter}
                  type="property"
                />
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <PropertyCard key={property.id} {...property} />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-12">
                      <p className="text-gray-500 text-lg">لم يتم العثور على عقارات تطابق معايير البحث</p>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
            
            <TabPanel>
              <div className="p-6">
                <SearchFilter 
                  categories={propertyCategories} 
                  cities={saudiCities} 
                  onFilter={handleFilter}
                  type="property"
                />
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <PropertyCard key={property.id} {...property} />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-12">
                      <p className="text-gray-500 text-lg">لم يتم العثور على عقارات للبيع تطابق معايير البحث</p>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
            
            <TabPanel>
              <div className="p-6">
                <SearchFilter 
                  categories={propertyCategories} 
                  cities={saudiCities} 
                  onFilter={handleFilter}
                  type="property"
                />
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <PropertyCard key={property.id} {...property} />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-12">
                      <p className="text-gray-500 text-lg">لم يتم العثور على عقارات للإيجار تطابق معايير البحث</p>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
          <h2 className="text-xl font-semibold mb-4">إضافة عقار طبي للبيع أو الإيجار</h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="propertyTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  عنوان الإعلان
                </label>
                <input
                  type="text"
                  id="propertyTitle"
                  name="propertyTitle"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                  نوع العقار
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">اختر نوع العقار</option>
                  {propertyCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="listingType" className="block text-sm font-medium text-gray-700 mb-1">
                  نوع الإعلان
                </label>
                <select
                  id="listingType"
                  name="listingType"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">اختر نوع الإعلان</option>
                  <option value="sale">للبيع</option>
                  <option value="rent">للإيجار</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="propertyCity" className="block text-sm font-medium text-gray-700 mb-1">
                  المدينة
                </label>
                <select
                  id="propertyCity"
                  name="propertyCity"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">اختر المدينة</option>
                  {saudiCities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  العنوان التفصيلي
                </label>
                <input
                  type="text"
                  id="propertyAddress"
                  name="propertyAddress"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="propertyArea" className="block text-sm font-medium text-gray-700 mb-1">
                  المساحة (متر مربع)
                </label>
                <input
                  type="number"
                  id="propertyArea"
                  name="propertyArea"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="propertyPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  السعر (ريال سعودي)
                </label>
                <input
                  type="number"
                  id="propertyPrice"
                  name="propertyPrice"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="propertyDesc" className="block text-sm font-medium text-gray-700 mb-1">
                  وصف العقار
                </label>
                <textarea
                  id="propertyDesc"
                  name="propertyDesc"
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  صور العقار
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>رفع الملفات</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pr-1">أو سحب وإفلات</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 10 ميجابايت</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                  اسم جهة الاتصال
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                نشر الإعلان
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClinicsPage;