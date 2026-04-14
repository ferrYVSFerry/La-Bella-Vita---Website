import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export const MenuSelection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12 bg-stone-50 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-red-700 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-green-800 blur-3xl"></div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif font-bold text-stone-900 mb-4">
            {t('menu.selection.title')}
          </h1>
          <div className="w-24 h-1 bg-red-700 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/menu/it"
              className="group block relative overflow-hidden rounded-2xl aspect-[4/3] shadow-xl hover:shadow-2xl transition-all"
            >
              <img 
                src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=2080&auto=format&fit=crop" 
                alt="Italian Menu" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/50 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-serif font-bold text-white tracking-wide border-2 border-white/80 px-8 py-4 rounded-lg backdrop-blur-sm group-hover:bg-white/10 transition-all">
                  Menu Italiano
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/menu/en"
              className="group block relative overflow-hidden rounded-2xl aspect-[4/3] shadow-xl hover:shadow-2xl transition-all"
            >
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
                alt="English Menu" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/50 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-serif font-bold text-white tracking-wide border-2 border-white/80 px-8 py-4 rounded-lg backdrop-blur-sm group-hover:bg-white/10 transition-all">
                  English Menu
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
