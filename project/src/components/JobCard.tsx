import { Building, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  contractType: string;
  salary?: string;
  postedDate: string;
  featured?: boolean;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  contractType,
  salary,
  postedDate,
  featured = false,
}: JobCardProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
        featured ? 'border-blue-500' : 'border-gray-200'
      }`}
    >
      {featured && (
        <div className="bg-blue-500 text-white px-4 py-1 text-xs font-medium text-center">
          {t('jobs.jobCard.featured', { defaultValue: 'Featured Job' })}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {salary && (
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              {salary}
            </span>
          )}
        </div>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-600">
            <Building className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'} text-gray-400`} />
            <span className="text-sm">{company}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'} text-gray-400`} />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Calendar className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'} text-gray-400`} />
            <span className="text-sm">{contractType}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">{postedDate}</span>
          
          <a
            href={`/jobs/${id}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            {t('jobs.jobCard.apply')}
            {isRTL ? (
              <ChevronLeft className="h-4 w-4 mr-1" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-1" />
            )}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;