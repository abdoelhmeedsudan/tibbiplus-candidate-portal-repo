import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">MedConnect.sa</h3>
            <p className="text-blue-200 text-sm">
              {isRTL 
                ? "منصة متخصصة في ربط الكوادر الطبية بالمنشآت الصحية وتوفير حلول ذات قيمة للقطاع الصحي في المملكة العربية السعودية."
                : "A specialized platform connecting medical professionals with healthcare facilities and providing valuable solutions for the healthcare sector in Saudi Arabia."
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isRTL ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-blue-200 hover:text-white text-sm">
                  {isRTL ? "وظائف طبية" : "Medical Jobs"}
                </Link>
              </li>
              <li>
                <Link to="/jobs?specialty=dental" className="text-blue-200 hover:text-white text-sm">
                  {isRTL ? "فنيي الأسنان" : "Dental Technicians"}
                </Link>
              </li>
              <li>
                <Link to="/jobs?specialty=engineering" className="text-blue-200 hover:text-white text-sm">
                  {isRTL ? "مهندسو الأجهزة الطبية" : "Medical Device Engineers"}
                </Link>
              </li>
              <li>
                <Link to="/clinics" className="text-blue-200 hover:text-white text-sm">
                  {isRTL ? "المجمعات الطبية" : "Medical Clinics"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <Phone className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span className="text-blue-200">+966 12 345 6789</span>
              </li>
              <li className="flex items-center text-sm">
                <Mail className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span className="text-blue-200">info@medconnect.sa</span>
              </li>
              <li className="flex items-center text-sm">
                <MapPin className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span className="text-blue-200">
                  {isRTL ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isRTL ? "تابعنا" : "Follow Us"}
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-800">
          <p className="text-center text-blue-200 text-sm">
            &copy; {new Date().getFullYear()} MedConnect.sa - {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;