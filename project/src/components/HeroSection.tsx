import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="md:flex md:items-center md:justify-between">
          <div className={`md:w-1/2 ${isRTL ? 'text-right md:pr-8' : 'text-left md:pl-8'}`}>
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('home.hero.title')}
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('home.hero.subtitle')}
            </motion.p>
            
            <motion.div 
              className={`mt-8 flex flex-col sm:flex-row gap-4 ${isRTL ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:text-lg"
              >
                <Search className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('home.hero.cta')}
              </Link>
              <Link
                to="/hire"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-950 md:text-lg"
              >
                <UserPlus className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('home.hero.secondaryCta')}
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="hidden md:block md:w-1/2"
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img 
              src="https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Medical team" 
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-3xl"></div>
    </div>
  );
};

export default HeroSection;