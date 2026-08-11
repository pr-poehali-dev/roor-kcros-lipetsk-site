import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface SiteHeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'Об организации' },
  { id: 'news', label: 'Новости' },
  { id: 'documents', label: 'Документы' },
  { id: 'contacts', label: 'Контакты' },
];

const SiteHeader = ({ activeSection, setActiveSection }: SiteHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-secondary text-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3 text-left"
          >
            <img
              src="https://cdn.poehali.dev/files/%D0%A0%D0%9E%D0%9E%D0%A0%20%D0%93%D0%B5%D1%80%D0%B1.png"
              alt="РООР КЦРОС"
              className="h-10 md:h-12 w-auto flex-shrink-0"
            />
            <div>
              <h1 className="text-lg md:text-xl font-bold leading-tight">РООР КЦРОС</h1>
              <p className="hidden sm:block text-sm text-gray-300">
                Координационный центр руководителей охранных структур
              </p>
            </div>
          </button>

          <nav className="hidden md:flex gap-6 items-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.id ? 'text-primary' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('admin')}
              aria-label="Админ-панель"
              className={`transition-colors hover:text-primary ${
                activeSection === 'admin' ? 'text-primary' : 'text-white'
              }`}
            >
              <Icon name="Settings" size={16} />
            </button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
            className="md:hidden text-white hover:text-primary transition-colors p-1"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-1 mt-4 pt-4 border-t border-white/15">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`text-left text-base font-medium py-2.5 px-2 rounded-md transition-colors hover:bg-white/10 ${
                  activeSection === item.id ? 'text-primary' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('admin')}
              className={`flex items-center gap-2 text-left text-base font-medium py-2.5 px-2 rounded-md transition-colors hover:bg-white/10 ${
                activeSection === 'admin' ? 'text-primary' : 'text-white'
              }`}
            >
              <Icon name="Settings" size={18} />
              Админ-панель
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
