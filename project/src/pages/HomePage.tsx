import HeroSection from '../components/HeroSection';
import QuickLinks from '../components/QuickLinks';
import StatisticsSection from '../components/StatisticsSection';
import NewsSection from '../components/NewsSection';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  // Update page title on component mount
  useEffect(() => {
    document.title = `${t('navigation.home')} | MedConnect.sa`;
  }, [t]);

  return (
    <div className="min-h-screen bg-white">
      <NewsSection />
      <HeroSection />
      
      <QuickLinks />
      
      <StatisticsSection />
      
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {isRTL ? "لماذا تختار منصة ميدكونيكت؟" : "Why Choose MedConnect Platform?"}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-blue-50">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isRTL ? "منصة متخصصة" : "Specialized Platform"}
                </h3>
                <p className="text-gray-600">
                  {isRTL 
                    ? "نركز فقط على القطاع الصحي في المملكة، مما يعني فرصًا وظيفية وخدمات أكثر تخصصًا وملاءمة لاحتياجاتك."
                    : "We focus exclusively on the healthcare sector in the Kingdom, meaning more specialized and relevant job opportunities and services for your needs."
                  }
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-blue-50">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isRTL ? "توفير الوقت" : "Time Saving"}
                </h3>
                <p className="text-gray-600">
                  {isRTL 
                    ? "نقدم حلولًا متكاملة للباحثين عن عمل وأصحاب المنشآت الطبية، مما يوفر الوقت والجهد في عملية التوظيف."
                    : "We provide integrated solutions for job seekers and healthcare facility owners, saving time and effort in the hiring process."
                  }
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-blue-50">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isRTL ? "خدمات متنوعة" : "Diverse Services"}
                </h3>
                <p className="text-gray-600">
                  {isRTL 
                    ? "نقدم خدمات متكاملة تشمل التوظيف الطبي، تسويق العقارات الطبية، وربط المستثمرين بالفرص المناسبة."
                    : "We provide integrated services including medical recruitment, medical real estate marketing, and connecting investors with suitable opportunities."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;