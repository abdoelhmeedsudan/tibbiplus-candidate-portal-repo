import { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '../components/Tabs';
import { Building, Plus, FileText, Users } from 'lucide-react';

const HireStaffPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Update page title on component mount
  useEffect(() => {
    document.title = 'نشر وظيفة | MedConnect.sa';
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">نشر وظيفة</h1>
          <p className="mt-2 text-lg text-gray-600">أضف وظائفك وابحث عن أفضل الكوادر الطبية</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Tabs activeTab={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab>
                <Building className="h-5 w-5 ml-2" />
                تسجيل منشأة
              </Tab>
              <Tab>
                <Plus className="h-5 w-5 ml-2" />
                إضافة وظيفة
              </Tab>
              <Tab>
                <FileText className="h-5 w-5 ml-2" />
                الوظائف المنشورة
              </Tab>
              <Tab>
                <Users className="h-5 w-5 ml-2" />
                المتقدمون
              </Tab>
            </TabList>
            
            <TabPanel>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">تسجيل منشأة طبية</h2>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="facilityName" className="block text-sm font-medium text-gray-700 mb-1">
                        اسم المنشأة
                      </label>
                      <input
                        type="text"
                        id="facilityName"
                        name="facilityName"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 mb-1">
                        نوع المنشأة
                      </label>
                      <select
                        id="facilityType"
                        name="facilityType"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">اختر نوع المنشأة</option>
                        <option value="hospital">مستشفى</option>
                        <option value="clinic">عيادة</option>
                        <option value="complex">مجمع طبي</option>
                        <option value="pharmacy">صيدلية</option>
                        <option value="lab">مختبر</option>
                        <option value="company">شركة طبية</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="facilityLicense" className="block text-sm font-medium text-gray-700 mb-1">
                        رقم الترخيص
                      </label>
                      <input
                        type="text"
                        id="facilityLicense"
                        name="facilityLicense"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="facilityCity" className="block text-sm font-medium text-gray-700 mb-1">
                        المدينة
                      </label>
                      <select
                        id="facilityCity"
                        name="facilityCity"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">اختر المدينة</option>
                        <option value="riyadh">الرياض</option>
                        <option value="jeddah">جدة</option>
                        <option value="dammam">الدمام</option>
                        <option value="makkah">مكة المكرمة</option>
                        <option value="madinah">المدينة المنورة</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="facilityAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        العنوان
                      </label>
                      <input
                        type="text"
                        id="facilityAddress"
                        name="facilityAddress"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
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
                      تسجيل المنشأة
                    </button>
                  </div>
                </form>
              </div>
            </TabPanel>
            
            <TabPanel>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">إضافة وظيفة جديدة</h2>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        المسمى الوظيفي
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="jobSpecialty" className="block text-sm font-medium text-gray-700 mb-1">
                        التخصص
                      </label>
                      <select
                        id="jobSpecialty"
                        name="jobSpecialty"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">اختر التخصص</option>
                        <option value="general-medicine">الطب العام</option>
                        <option value="dentistry">طب الأسنان</option>
                        <option value="nursing">التمريض</option>
                        <option value="pharmacy">الصيدلة</option>
                        <option value="laboratory">المختبرات</option>
                        <option value="physiotherapy">العلاج الطبيعي</option>
                        <option value="medical-engineering">الهندسة الطبية</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700 mb-1">
                        نطاق الراتب
                      </label>
                      <div className="flex space-x-4">
                        <input
                          type="number"
                          id="minSalary"
                          name="minSalary"
                          placeholder="الحد الأدنى"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          id="maxSalary"
                          name="maxSalary"
                          placeholder="الحد الأعلى"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700 mb-1">
                        مكان العمل
                      </label>
                      <select
                        id="jobLocation"
                        name="jobLocation"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">اختر المدينة</option>
                        <option value="riyadh">الرياض</option>
                        <option value="jeddah">جدة</option>
                        <option value="dammam">الدمام</option>
                        <option value="makkah">مكة المكرمة</option>
                        <option value="madinah">المدينة المنورة</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="contractType" className="block text-sm font-medium text-gray-700 mb-1">
                        نوع العقد
                      </label>
                      <select
                        id="contractType"
                        name="contractType"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">اختر نوع العقد</option>
                        <option value="full-time">دوام كامل</option>
                        <option value="part-time">دوام جزئي</option>
                        <option value="temporary">مؤقت</option>
                        <option value="contract">تعاقد</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="contractDuration" className="block text-sm font-medium text-gray-700 mb-1">
                        مدة العقد
                      </label>
                      <select
                        id="contractDuration"
                        name="contractDuration"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">اختر المدة</option>
                        <option value="6-months">6 أشهر</option>
                        <option value="1-year">سنة</option>
                        <option value="2-years">سنتين</option>
                        <option value="open">مفتوح</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="jobRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                        متطلبات الوظيفة
                      </label>
                      <textarea
                        id="jobRequirements"
                        name="jobRequirements"
                        rows={4}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      نشر الوظيفة
                    </button>
                  </div>
                </form>
              </div>
            </TabPanel>
            
            <TabPanel>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">الوظائف المنشورة</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المسمى الوظيفي
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          التخصص
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المدينة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          نوع العقد
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المتقدمون
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الحالة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">طبيب عام</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">الطب العام</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">الرياض</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">دوام كامل</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            نشط
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 ml-3">تعديل</button>
                          <button className="text-red-600 hover:text-red-900">حذف</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ممرض</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">التمريض</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">جدة</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">دوام كامل</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            نشط
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 ml-3">تعديل</button>
                          <button className="text-red-600 hover:text-red-900">حذف</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">فني أشعة</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">الأشعة</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">الدمام</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">دوام جزئي</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            معلق
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 ml-3">تعديل</button>
                          <button className="text-red-600 hover:text-red-900">حذف</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>
            
            <TabPanel>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">المتقدمون للوظائف</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الاسم
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الوظيفة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          تاريخ التقديم
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الجنسية
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الحالة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">أحمد محمد</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">طبيب عام</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20 أكتوبر 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">سعودي</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            قيد المراجعة
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 ml-3">عرض السيرة</button>
                          <button className="text-green-600 hover:text-green-900">قبول</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">سارة عبدالله</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ممرض</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 أكتوبر 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">سعودية</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            تمت المقابلة
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 ml-3">عرض السيرة</button>
                          <button className="text-green-600 hover:text-green-900">قبول</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">خالد عمر</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">فني أشعة</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 أكتوبر 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">مصري</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            جديد
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 ml-3">عرض السيرة</button>
                          <button className="text-green-600 hover:text-green-900">قبول</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HireStaffPage;