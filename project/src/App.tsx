import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobSearchPage from './pages/JobSearchPage';
import HireStaffPage from './pages/HireStaffPage';
import ClinicsPage from './pages/ClinicsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import './i18n';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="jobs" element={<JobSearchPage />} />
              <Route path="hire" element={<HireStaffPage />} />
              <Route path="clinics" element={<ClinicsPage />} />
              <Route path="contact" element={<ContactPage />} />
            <Route path="personal-info" element={<PersonalInfoPage />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;