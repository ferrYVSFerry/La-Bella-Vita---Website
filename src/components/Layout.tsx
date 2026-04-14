import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    setLanguage(language === 'it' ? 'en' : 'it');
  };

  const isHomePage = location.pathname === '/';
  const showTransparentNavbar = isHomePage && !isScrolled && !isMobileMenuOpen;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    const wasOpen = isMobileMenuOpen;
    setIsMobileMenuOpen(false);
    
    if (isHomePage) {
      e.preventDefault();
      if (wasOpen) {
        setTimeout(() => scrollToTop(), 300);
      } else {
        scrollToTop();
      }
    }
  };

  const handleSectionClick = (e: React.MouseEvent, id: string) => {
    const wasOpen = isMobileMenuOpen;
    setIsMobileMenuOpen(false);
    
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        if (wasOpen) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `/#${id}`);
          }, 300);
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${id}`);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-800 bg-stone-50">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showTransparentNavbar ? 'bg-transparent py-5' : 'bg-white/95 backdrop-blur-sm shadow-md py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" onClick={handleHomeClick} className="flex items-center gap-2 group">
            <UtensilsCrossed className={`w-8 h-8 transition-colors ${!showTransparentNavbar ? 'text-red-700' : 'text-red-600 group-hover:text-red-500'}`} />
            <span className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300 ${!showTransparentNavbar ? 'text-stone-900' : 'text-white'}`}>
              La Bella Vita
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" onClick={handleHomeClick} className={`font-medium hover:text-red-600 transition-colors duration-300 ${!showTransparentNavbar ? 'text-stone-600' : 'text-white'}`}>
              {t('nav.home')}
            </Link>
            <Link to="/#about" onClick={(e) => handleSectionClick(e, 'about')} className={`font-medium hover:text-red-600 transition-colors duration-300 ${!showTransparentNavbar ? 'text-stone-600' : 'text-white'}`}>
              {t('nav.about')}
            </Link>
            <Link to="/#reviews" onClick={(e) => handleSectionClick(e, 'reviews')} className={`font-medium hover:text-red-600 transition-colors duration-300 ${!showTransparentNavbar ? 'text-stone-600' : 'text-white'}`}>
              {t('nav.reviews')}
            </Link>
            
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 font-medium hover:text-red-600 transition-colors duration-300 ${!showTransparentNavbar ? 'text-stone-600' : 'text-white'}`}
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase text-sm">{language}</span>
            </button>

            <Link
              to="/menu"
              onClick={() => { scrollToTop(); setIsMobileMenuOpen(false); }}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-md"
            >
              Menu
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 font-medium transition-colors duration-300 ${!showTransparentNavbar ? 'text-stone-600' : 'text-white'}`}
            >
              <Globe className="w-5 h-5" />
              <span className="uppercase text-sm">{language}</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors duration-300 ${!showTransparentNavbar ? 'text-stone-900' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 pb-6 flex flex-col gap-6 md:hidden"
          >
            <Link to="/" onClick={handleHomeClick} className="text-2xl font-serif font-medium text-stone-800 border-b border-stone-100 pb-4">
              {t('nav.home')}
            </Link>
            <Link to="/#about" onClick={(e) => handleSectionClick(e, 'about')} className="text-2xl font-serif font-medium text-stone-800 border-b border-stone-100 pb-4">
              {t('nav.about')}
            </Link>
            <Link to="/#reviews" onClick={(e) => handleSectionClick(e, 'reviews')} className="text-2xl font-serif font-medium text-stone-800 border-b border-stone-100 pb-4">
              {t('nav.reviews')}
            </Link>
            <Link
              to="/menu"
              onClick={() => { 
                setIsMobileMenuOpen(false);
                setTimeout(() => scrollToTop(), 300);
              }}
              className="mt-auto bg-red-700 text-white text-center text-xl py-4 rounded-xl font-medium shadow-lg"
            >
              Menu
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 border-t-4 border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4 text-white">
              <UtensilsCrossed className="w-6 h-6 text-red-600" />
              <span className="font-serif text-xl font-bold tracking-tight">La Bella Vita</span>
            </div>
            <p className="text-sm max-w-xs">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-serif font-semibold text-lg mb-4">Contatti</h3>
            <p className="mb-2">{t('footer.address')}</p>
            <p className="mb-2">{t('footer.phone')}</p>
            <p>info@labellavita.it</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-serif font-semibold text-lg mb-4">Orari</h3>
            <p className="mb-2">{t('footer.hours')}</p>
            <p className="text-red-400">{t('footer.closed')}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800 text-center text-sm text-stone-500">
          &copy; {new Date().getFullYear()} La Bella Vita. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
