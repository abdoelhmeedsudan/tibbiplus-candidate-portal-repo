import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Stethoscope, 
  User, 
  ChevronDown, 
  LogIn, 
  UserPlus, 
  UserCheck,
  Home,
  Briefcase,
  Users,
  Building2,
  Phone,
  Search,
  Bell,
  Settings
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <Stethoscope className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span className={`${isRTL ? 'mr-3' : 'ml-3'} font-bold text-xl text-blue-600 group-hover:text-blue-700 transition-colors`}>
                Health Candidate Portal
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`
              }
            >
              <Home className="w-4 h-4 ml-2" />
              {t('navigation.home')}
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`
              }
            >
              <Briefcase className="w-4 h-4 ml-2" />
              {t('navigation.jobs')}
            </NavLink>
            <NavLink
              to="/hire"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`
              }
            >
              <Users className="w-4 h-4 ml-2" />
              {t('navigation.hire')}
            </NavLink>
            <NavLink
              to="/clinics"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`
              }
            >
              <Building2 className="w-4 h-4 ml-2" />
              {t('navigation.clinics')}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`
              }
            >
              <Phone className="w-4 h-4 ml-2" />
              {t('navigation.contact')}
            </NavLink>
            <div className={`flex items-center space-x-3 ${isRTL ? 'ml-4' : 'mr-4'}`}>
              {/* Search Button */}
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="w-px h-6 bg-gray-200"></div>
              
              <LanguageSwitcher />
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  aria-label={isProfileDropdownOpen ? t('dropdown.closeMenu') : t('dropdown.openMenu')}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-2">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="hidden lg:block">{t('profile.dropdown.title')}</span>
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 border border-gray-100`}>
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{t('profile.dropdown.title')}</p>
                        <p className="text-xs text-gray-500">إدارة حسابك</p>
                      </div>
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <LogIn className="w-4 h-4 ml-3" />
                        {t('profile.dropdown.login')}
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <UserPlus className="w-4 h-4 ml-3" />
                        {t('profile.dropdown.register')}
                      </Link>
                      <Link
                        to="/personal-info"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <UserCheck className="w-4 h-4 ml-3" />
                        {t('personalInfo.title')}
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4 ml-3" />
                          {t('profile.dropdown.settings')}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg" id="mobile-menu">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`
              }
              onClick={toggleMenu}
            >
              <Home className="w-5 h-5 ml-3" />
              {t('navigation.home')}
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`
              }
              onClick={toggleMenu}
            >
              <Briefcase className="w-5 h-5 ml-3" />
              {t('navigation.jobs')}
            </NavLink>
            <NavLink
              to="/hire"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`
              }
              onClick={toggleMenu}
            >
              <Users className="w-5 h-5 ml-3" />
              {t('navigation.hire')}
            </NavLink>
            <NavLink
              to="/clinics"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`
              }
              onClick={toggleMenu}
            >
              <Building2 className="w-5 h-5 ml-3" />
              {t('navigation.clinics')}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`
              }
              onClick={toggleMenu}
            >
              <Phone className="w-5 h-5 ml-3" />
              {t('navigation.contact')}
            </NavLink>
            
            {/* Mobile Profile Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t('profile.dropdown.title')}
              </div>
              <Link
                to="/login"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={toggleMenu}
              >
                <LogIn className="w-5 h-5 ml-3" />
                {t('profile.dropdown.login')}
              </Link>
              <Link
                to="/register"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={toggleMenu}
              >
                <UserPlus className="w-5 h-5 ml-3" />
                {t('profile.dropdown.register')}
              </Link>
              <Link
                to="/personal-info"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={toggleMenu}
              >
                <UserCheck className="w-5 h-5 ml-3" />
                {t('profile.dropdown.personalInfo')}
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={toggleMenu}
              >
                <Settings className="w-5 h-5 ml-3" />
                {t('profile.dropdown.settings')}
              </Link>
            </div>
            
            <div className="pt-6 flex flex-col space-y-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;