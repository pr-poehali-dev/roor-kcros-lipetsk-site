import { ReactNode } from 'react';
import Icon from '@/components/ui/icon';

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

const LegalPageLayout = ({ title, children }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary text-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img
                src="/emblem-shield.png"
                alt="РООР КЦРОС"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold">РООР КЦРОС</h1>
                <p className="text-sm text-gray-300">Координационный центр руководителей охранных структур</p>
              </div>
            </a>
            <a
              href="/"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <Icon name="ArrowLeft" size={16} />
              На главную
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-secondary">{title}</h1>
        <div className="space-y-4 text-sm leading-relaxed text-gray-700">{children}</div>
      </main>

      <footer className="bg-secondary text-white mt-16 py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 РООР КЦРОС Липецкой области. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default LegalPageLayout;