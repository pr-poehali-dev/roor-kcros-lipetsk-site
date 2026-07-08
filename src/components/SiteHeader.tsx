import Icon from '@/components/ui/icon';

interface SiteHeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SiteHeader = ({ activeSection, setActiveSection }: SiteHeaderProps) => {
  return (
    <header className="bg-secondary text-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/%D0%A0%D0%9E%D0%9E%D0%A0%20%D0%93%D0%B5%D1%80%D0%B1.png" alt="РООР КЦРОС" className="h-12 w-auto" />
            <div>
              <h1 className="text-xl font-bold">РООР КЦРОС</h1>
              <p className="text-sm text-gray-300">Координационный центр руководителей охранных структур</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => setActiveSection('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'home' ? 'text-primary' : 'text-white'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'about' ? 'text-primary' : 'text-white'
              }`}
            >Об организации</button>
            <button
              onClick={() => setActiveSection('registry')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'registry' ? 'text-primary' : 'text-white'
              }`}
            >
              Реестры
            </button>
            <button
              onClick={() => setActiveSection('news')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'news' ? 'text-primary' : 'text-white'
              }`}
            >
              Новости
            </button>
            <button
              onClick={() => setActiveSection('documents')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'documents' ? 'text-primary' : 'text-white'
              }`}
            >
              Документы
            </button>
            <button
              onClick={() => setActiveSection('contacts')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'contacts' ? 'text-primary' : 'text-white'
              }`}
            >
              Контакты
            </button>
            <button
              onClick={() => setActiveSection('admin')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'admin' ? 'text-primary' : 'text-white'
              }`}
            >
              <Icon name="Settings" size={16} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
