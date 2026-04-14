import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

type MenuItem = {
  name: string;
  description: string;
  price: string;
};

const menuData = {
  it: [
    {
      id: 'antipasti',
      title: 'Antipasti',
      items: [
        { name: 'Bruschetta al Pomodoro', description: 'Pane tostato con pomodorini freschi, aglio, basilico e olio extravergine.', price: '€ 8,00' },
        { name: 'Tagliere di Salumi e Formaggi', description: 'Selezione di salumi tipici e formaggi stagionati con miele e noci.', price: '€ 18,00' },
        { name: 'Carpaccio di Manzo', description: 'Sottili fette di manzo crudo con rucola, scaglie di grana e limone.', price: '€ 14,00' },
      ]
    },
    {
      id: 'primi',
      title: 'Primi Piatti',
      items: [
        { name: 'Spaghetti alla Carbonara', description: 'Guanciale croccante, pecorino romano, uova e pepe nero.', price: '€ 14,00' },
        { name: 'Tagliatelle al Ragù', description: "Pasta fresca all'uovo con ragù di carne cotto a fuoco lento.", price: '€ 15,00' },
        { name: 'Risotto ai Funghi Porcini', description: 'Riso Carnaroli mantecato con funghi porcini freschi e parmigiano.', price: '€ 16,00' },
      ]
    },
    {
      id: 'secondi',
      title: 'Secondi Piatti',
      items: [
        { name: 'Tagliata di Manzo', description: 'Carne di manzo alla griglia servita con rucola e pomodorini.', price: '€ 22,00' },
        { name: 'Filetto di Branzino', description: 'Branzino al forno con patate, olive taggiasche e pomodorini.', price: '€ 20,00' },
        { name: 'Parmigiana di Melanzane', description: 'Strati di melanzane fritte, salsa di pomodoro, mozzarella e basilico.', price: '€ 15,00' },
      ]
    },
    {
      id: 'contorni',
      title: 'Contorni',
      items: [
        { name: 'Patate al Forno', description: 'Patate novelle arrosto con rosmarino.', price: '€ 6,00' },
        { name: 'Verdure Grigliate', description: 'Zucchine, melanzane e peperoni alla griglia.', price: '€ 7,00' },
        { name: 'Insalata Mista', description: 'Lattuga, pomodori, carote e cetrioli.', price: '€ 5,00' },
      ]
    },
    {
      id: 'dolci',
      title: 'Dolci',
      items: [
        { name: 'Tiramisù Classico', description: 'Savoiardi inzuppati nel caffè, crema al mascarpone e cacao.', price: '€ 7,00' },
        { name: 'Panna Cotta', description: 'Panna cotta alla vaniglia con coulis di frutti di bosco.', price: '€ 6,00' },
        { name: 'Cannolo Siciliano', description: 'Cialda croccante ripiena di ricotta dolce e gocce di cioccolato.', price: '€ 6,00' },
      ]
    },
    {
      id: 'bevande',
      title: 'Bevande',
      items: [
        { name: 'Acqua Minerale', description: 'Naturale o Frizzante (75cl).', price: '€ 3,00' },
        { name: 'Vino della Casa', description: 'Rosso o Bianco (1/2 Litro).', price: '€ 8,00' },
        { name: 'Caffè Espresso', description: 'Miscela arabica 100%.', price: '€ 2,00' },
      ]
    }
  ],
  en: [
    {
      id: 'antipasti',
      title: 'Starters',
      items: [
        { name: 'Tomato Bruschetta', description: 'Toasted bread with fresh cherry tomatoes, garlic, basil, and extra virgin olive oil.', price: '€ 8.00' },
        { name: 'Cold Cuts and Cheese Board', description: 'Selection of typical cold cuts and aged cheeses with honey and walnuts.', price: '€ 18.00' },
        { name: 'Beef Carpaccio', description: 'Thin slices of raw beef with arugula, parmesan shavings, and lemon.', price: '€ 14.00' },
      ]
    },
    {
      id: 'primi',
      title: 'First Courses',
      items: [
        { name: 'Spaghetti Carbonara', description: 'Crispy guanciale, pecorino romano cheese, eggs, and black pepper.', price: '€ 14.00' },
        { name: 'Tagliatelle with Ragù', description: 'Fresh egg pasta with slow-cooked meat ragù.', price: '€ 15.00' },
        { name: 'Porcini Mushroom Risotto', description: 'Carnaroli rice creamed with fresh porcini mushrooms and parmesan.', price: '€ 16.00' },
      ]
    },
    {
      id: 'secondi',
      title: 'Main Courses',
      items: [
        { name: 'Sliced Beef Steak', description: 'Grilled beef steak served with arugula and cherry tomatoes.', price: '€ 22.00' },
        { name: 'Sea Bass Fillet', description: 'Baked sea bass with potatoes, Taggiasca olives, and cherry tomatoes.', price: '€ 20.00' },
        { name: 'Eggplant Parmigiana', description: 'Layers of fried eggplant, tomato sauce, mozzarella, and basil.', price: '€ 15.00' },
      ]
    },
    {
      id: 'contorni',
      title: 'Side Dishes',
      items: [
        { name: 'Roasted Potatoes', description: 'Roasted baby potatoes with rosemary.', price: '€ 6.00' },
        { name: 'Grilled Vegetables', description: 'Grilled zucchini, eggplant, and bell peppers.', price: '€ 7.00' },
        { name: 'Mixed Salad', description: 'Lettuce, tomatoes, carrots, and cucumbers.', price: '€ 5.00' },
      ]
    },
    {
      id: 'dolci',
      title: 'Desserts',
      items: [
        { name: 'Classic Tiramisu', description: 'Ladyfingers soaked in coffee, mascarpone cream, and cocoa.', price: '€ 7.00' },
        { name: 'Panna Cotta', description: 'Vanilla panna cotta with mixed berry coulis.', price: '€ 6.00' },
        { name: 'Sicilian Cannolo', description: 'Crispy pastry shell filled with sweet ricotta and chocolate chips.', price: '€ 6.00' },
      ]
    },
    {
      id: 'bevande',
      title: 'Beverages',
      items: [
        { name: 'Mineral Water', description: 'Still or Sparkling (75cl).', price: '€ 3.00' },
        { name: 'House Wine', description: 'Red or White (1/2 Liter).', price: '€ 8.00' },
        { name: 'Espresso Coffee', description: '100% Arabica blend.', price: '€ 2.00' },
      ]
    }
  ]
};

export const Menu: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang === 'en' ? 'en' : 'it';
  const sections = menuData[currentLang];
  const [activeSection, setActiveSection] = useState(sections[0].id);
  
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(true);
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Active section logic
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const viewportTop = 200; // Offset for header

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportTop) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }

      // Desktop fixed sidebar logic
      if (window.innerWidth >= 1024 && sidebarContainerRef.current && contentContainerRef.current) {
        const containerRect = contentContainerRef.current.getBoundingClientRect();
        const sidebarParentRect = sidebarContainerRef.current.getBoundingClientRect();
        const offsetTop = 128; // Navbar height + padding
        
        if (containerRect.top > offsetTop) {
          setSidebarStyle({ position: 'relative', top: 0, width: '100%' });
        } else {
          const sidebarContent = sidebarContainerRef.current.firstElementChild as HTMLElement;
          const sidebarHeight = sidebarContent?.clientHeight || 0;
          const maxScroll = containerRect.height - sidebarHeight;
          const currentScroll = offsetTop - containerRect.top;
          
          if (currentScroll >= maxScroll) {
            setSidebarStyle({ 
              position: 'absolute', 
              bottom: 0, 
              top: 'auto',
              width: sidebarParentRect.width 
            });
          } else {
            setSidebarStyle({ 
              position: 'fixed', 
              top: offsetTop, 
              width: sidebarParentRect.width 
            });
          }
        }
      } else {
        setSidebarStyle({ position: 'relative', top: 0, width: '100%' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCategoriesVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );

    if (sidebarContainerRef.current) {
      observer.observe(sidebarContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = window.innerWidth < 1024 ? 80 : 120; // Adjust based on actual navbar height
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToCategories = () => {
    const el = document.getElementById('categories-list');
    if (el) {
      const headerOffset = window.innerWidth < 1024 ? 80 : 120; // Adjust based on actual navbar height
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link to="/menu" className="inline-flex items-center text-stone-500 hover:text-red-700 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentLang === 'it' ? 'Torna alla selezione' : 'Back to selection'}
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-stone-900 mb-4">
            {currentLang === 'it' ? 'Il Nostro Menu' : 'Our Menu'}
          </h1>
          <div className="w-24 h-1 bg-red-700 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative" ref={contentContainerRef}>
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4 relative" id="categories-list" ref={sidebarContainerRef}>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-stone-100" style={sidebarStyle}>
              <nav className="flex flex-col gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left px-4 py-3 rounded-lg font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-red-50 text-red-700 border-l-4 border-red-700'
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900 border-l-4 border-transparent'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Menu Content */}
          <div className="lg:w-3/4">
            <div className="space-y-16">
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 border-b-2 border-stone-200 pb-4">
                    {section.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {section.items.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-serif font-bold text-stone-900 pr-4">
                            {item.name}
                          </h3>
                          <span className="text-lg font-medium text-red-700 whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-stone-500 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Categories Button */}
      <AnimatePresence>
        {!isCategoriesVisible && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="lg:hidden fixed bottom-6 left-0 right-0 px-4 z-40 flex justify-center pointer-events-none"
          >
            <button
              onClick={scrollToCategories}
              className="bg-stone-900 text-white px-6 py-3 rounded-full font-medium shadow-xl pointer-events-auto hover:bg-stone-800 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              {currentLang === 'it' ? 'Categorie' : 'Categories'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
