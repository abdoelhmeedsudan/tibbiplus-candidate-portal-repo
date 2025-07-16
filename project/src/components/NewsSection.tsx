import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

interface NewsItem {
  id: number;
  title: string;
  date: string;
}

const NewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  // Sample news data
  const newsItems: NewsItem[] = [
    { 
      id: 1, 
      title: isRTL ? "فرص توظيف جديدة في مستشفيات الرياض" : "New job opportunities in Riyadh hospitals", 
      date: isRTL ? "23 أكتوبر 2025" : "October 23, 2025" 
    },
    { 
      id: 2, 
      title: isRTL ? "إفتتاح مجمع طبي جديد في جدة" : "Opening of new medical complex in Jeddah", 
      date: isRTL ? "20 أكتوبر 2025" : "October 20, 2025" 
    },
    { 
      id: 3, 
      title: isRTL ? "برنامج تدريبي للأطباء المقيمين بدعم من وزارة الصحة" : "Training program for resident doctors supported by Ministry of Health", 
      date: isRTL ? "15 أكتوبر 2025" : "October 15, 2025" 
    },
    { 
      id: 4, 
      title: isRTL ? "مجمع طبي للبيع في المنطقة الشرقية بسعر تنافسي" : "Medical complex for sale in Eastern Province at competitive price", 
      date: isRTL ? "10 أكتوبر 2025" : "October 10, 2025" 
    },
    { 
      id: 5, 
      title: isRTL ? "وظائف للكادر التمريضي في المدينة المنورة" : "Jobs for nursing staff in Madinah", 
      date: isRTL ? "5 أكتوبر 2025" : "October 5, 2025" 
    },
  ];
  
  // Auto-scroll news every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % newsItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [newsItems.length]);
  
  const nextNews = () => {
    setActiveIndex((current) => (current + 1) % newsItems.length);
  };
  
  const prevNews = () => {
    setActiveIndex((current) => (current - 1 + newsItems.length) % newsItems.length);
  };
  
  return (
    <div className="bg-blue-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
              {isRTL ? "أخبار وفرص" : "News & Opportunities"}
            </span>
          </div>
          
          <div className="flex-grow relative mx-6 overflow-hidden h-8">
            <div className="absolute inset-0 flex items-center">
              {newsItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`transition-all duration-500 ease-in-out flex items-center justify-center w-full absolute ${
                    index === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className={`text-gray-700 text-sm md:text-base truncate ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className={`text-blue-600 font-semibold ${isRTL ? 'ml-2' : 'mr-2'}`}>
                      {item.date}:
                    </span>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-shrink-0 flex space-x-2">
            <button 
              onClick={prevNews} 
              className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
              aria-label={isRTL ? "السابق" : "Previous"}
            >
              {isRTL ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
            </button>
            <button 
              onClick={nextNews} 
              className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
              aria-label={isRTL ? "التالي" : "Next"}
            >
              {isRTL ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;