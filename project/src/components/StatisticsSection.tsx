import { Users, Briefcase, Building, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

const StatItem = ({ icon, value, label, suffix = '' }: StatItemProps) => (
  <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
    <div className="rounded-full bg-blue-100 p-3 mb-4">
      {icon}
    </div>
    <h3 className="text-3xl font-bold text-gray-900 mb-1">
      <CountUp end={value} duration={2.5} suffix={suffix} />
    </h3>
    <p className="text-gray-600">{label}</p>
  </div>
);

const StatisticsSection = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">{t('home.statistics.title')}</h2>
          <p className="mt-2 text-lg text-gray-600">
            {t('home.statistics.subtitle', { defaultValue: 'Growing with us every day to serve the healthcare sector in the Kingdom' })}
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={itemVariants}>
            <StatItem 
              icon={<Briefcase className="h-6 w-6 text-blue-600" />} 
              value={1250} 
              label={t('home.statistics.jobs')} 
              suffix="+" 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StatItem 
              icon={<Users className="h-6 w-6 text-blue-600" />} 
              value={8700} 
              label={t('home.statistics.professionals')} 
              suffix="+" 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StatItem 
              icon={<Building className="h-6 w-6 text-blue-600" />} 
              value={340} 
              label={t('home.statistics.clinics')} 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StatItem 
              icon={<Calendar className="h-6 w-6 text-blue-600" />} 
              value={125} 
              label={t('home.statistics.successRate', { defaultValue: 'Success Rate' })} 
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;