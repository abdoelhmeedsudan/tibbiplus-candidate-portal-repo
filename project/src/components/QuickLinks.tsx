import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Bluetooth as Tooth, Wrench, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const QuickLinks = () => {
  const { t } = useTranslation();

  const categories = [
    {
      id: 1,
      title: t('quickLinks.medicalJobs', { defaultValue: 'Medical Jobs' }),
      icon: <Stethoscope className="h-10 w-10 text-blue-500" />,
      link: '/jobs?category=medical',
      color: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 2,
      title: t('quickLinks.dentalTechnicians', { defaultValue: 'Dental Technicians' }),
      icon: <Tooth className="h-10 w-10 text-emerald-500" />,
      link: '/jobs?category=dental',
      color: 'bg-emerald-50',
      hoverColor: 'hover:bg-emerald-100'
    },
    {
      id: 3,
      title: t('quickLinks.medicalEngineers', { defaultValue: 'Medical Device Engineers' }),
      icon: <Wrench className="h-10 w-10 text-amber-500" />,
      link: '/jobs?category=engineering',
      color: 'bg-amber-50',
      hoverColor: 'hover:bg-amber-100'
    },
    {
      id: 4,
      title: t('quickLinks.medicalClinics', { defaultValue: 'Medical Clinics' }),
      icon: <Building className="h-10 w-10 text-purple-500" />,
      link: '/clinics',
      color: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          {t('quickLinks.title', { defaultValue: 'Quick Links' })}
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link
                to={category.link}
                className={`block h-full p-6 rounded-lg shadow-sm ${category.color} ${category.hoverColor} transition-colors duration-200 text-center`}
              >
                <div className="flex flex-col items-center">
                  {category.icon}
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{category.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default QuickLinks;