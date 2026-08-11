import Icon from '@/components/ui/icon';

interface SiteFooterProps {
  setActiveSection: (section: string) => void;
}

const SiteFooter = ({ setActiveSection }: SiteFooterProps) => {
  return (
    <footer className="bg-secondary text-white mt-16 py-12 border-t border-border relative overflow-hidden">
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
        <img src="/emblem-full.png" alt="" className="h-64 w-auto" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/emblem-shield.png" alt="РООР КЦРОС" className="h-16 w-auto" />
              <div>
                <h3 className="font-bold text-xl mb-1">РООР КЦРОС</h3>
                <p className="text-sm text-gray-300">Липецкая область</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 max-w-md">
              Координационный центр руководителей охранных структур Липецкой области
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveSection('about')} className="text-gray-300 hover:text-primary transition-colors">Об организации</button>
              </li>
              <li>
                <button onClick={() => setActiveSection('documents')} className="text-gray-300 hover:text-primary transition-colors">
                  Документы
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('news')} className="text-gray-300 hover:text-primary transition-colors">
                  Новости
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={16} className="mt-1 flex-shrink-0" />
                <span>г. Липецк, ул. Тельмана, д. 92, оф. 1</span>
              </li>
              <li>
                <a href="tel:+79191610030" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Icon name="Phone" size={16} />
                  +7-919-161-00-30
                </a>
              </li>
              <li>
                <a href="mailto:roorktsros@yandex.ru" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Icon name="Mail" size={16} className="flex-shrink-0" />
                  <span className="break-all">roorktsros@yandex.ru</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400 space-y-3">
          <p>&copy; {new Date().getFullYear()} РООР КЦРОС Липецкой области. Все права защищены.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/cookie-policy" className="hover:text-primary transition-colors underline">
              Политика cookie
            </a>
            <a href="/terms-of-use" className="hover:text-primary transition-colors underline">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;