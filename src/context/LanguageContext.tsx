import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'it' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  it: {
    'nav.home': 'Home',
    'nav.about': 'Chi Siamo',
    'nav.reviews': 'Recensioni',
    'nav.menu': 'Menu',
    'hero.title': 'La Bella Vita',
    'hero.subtitle': 'Autentica Tradizione Culinaria Italiana',
    'hero.cta': 'Scopri il Menu',
    'about.title': 'La Nostra Storia',
    'about.text1': "Benvenuti a \"La Bella Vita\", dove la passione per il cibo incontra l'ospitalità italiana. Da oltre vent'anni portiamo in tavola i sapori autentici della nostra terra, utilizzando solo ingredienti freschi e di altissima qualità.",
    'about.text2': 'La nostra filosofia è semplice: cucinare con amore, rispettare le tradizioni e far sentire ogni ospite come a casa propria.',
    'reviews.title': 'Dicono di Noi',
    'reviews.1.text': '"Un\'esperienza indimenticabile! La vera pasta fresca come la faceva mia nonna. Atmosfera calda e accogliente."',
    'reviews.1.author': '- Marco R.',
    'reviews.2.text': '"Il miglior tiramisù della città. Personale gentilissimo e location elegante ma familiare. Consigliatissimo!"',
    'reviews.2.author': '- Giulia S.',
    'reviews.3.text': '"Ogni piatto è un capolavoro. Ottima selezione di vini e un servizio impeccabile. Torneremo sicuramente."',
    'reviews.3.author': '- Alessandro F.',
    'footer.address': 'Via Roma, 123 - 00100 Roma (RM)',
    'footer.hours': 'Mar - Dom: 12:00 - 15:00 / 19:00 - 23:00',
    'footer.closed': 'Lunedì chiuso',
    'footer.phone': '+39 06 1234 5678',
    'menu.selection.title': 'Scegli il tuo Menu',
    'menu.selection.it': 'Menu Italiano',
    'menu.selection.en': 'English Menu',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.reviews': 'Reviews',
    'nav.menu': 'Menu',
    'hero.title': 'La Bella Vita',
    'hero.subtitle': 'Authentic Italian Culinary Tradition',
    'hero.cta': 'Discover the Menu',
    'about.title': 'Our Story',
    'about.text1': 'Welcome to "La Bella Vita", where passion for food meets Italian hospitality. For over twenty years we have been bringing the authentic flavors of our land to the table, using only fresh, highest quality ingredients.',
    'about.text2': 'Our philosophy is simple: cook with love, respect traditions, and make every guest feel at home.',
    'reviews.title': 'What They Say About Us',
    'reviews.1.text': '"An unforgettable experience! Real fresh pasta just like my grandmother used to make. Warm and welcoming atmosphere."',
    'reviews.1.author': '- Marco R.',
    'reviews.2.text': '"The best tiramisu in town. Very kind staff and elegant yet familiar location. Highly recommended!"',
    'reviews.2.author': '- Giulia S.',
    'reviews.3.text': '"Every dish is a masterpiece. Excellent wine selection and impeccable service. We will definitely be back."',
    'reviews.3.author': '- Alessandro F.',
    'footer.address': '123 Roma Street - 00100 Rome (RM)',
    'footer.hours': 'Tue - Sun: 12:00 PM - 3:00 PM / 7:00 PM - 11:00 PM',
    'footer.closed': 'Closed on Mondays',
    'footer.phone': '+39 06 1234 5678',
    'menu.selection.title': 'Choose your Menu',
    'menu.selection.it': 'Menu Italiano',
    'menu.selection.en': 'English Menu',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
