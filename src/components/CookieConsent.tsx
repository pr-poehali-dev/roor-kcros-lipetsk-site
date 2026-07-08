import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const STORAGE_KEY = 'cookie_consent_accepted';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-secondary text-white shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-4">
        <Icon name="Cookie" size={28} className="hidden sm:block shrink-0 text-white/80" />
        <p className="text-sm text-gray-200 flex-1 text-center sm:text-left">
          Мы используем файлы cookie для улучшения работы сайта и анализа посещаемости. Продолжая пользоваться сайтом, вы соглашаетесь с{' '}
          <a href="/cookie-policy" className="underline hover:text-white">
            политикой использования cookie
          </a>{' '}
          и{' '}
          <a href="/terms-of-use" className="underline hover:text-white">
            пользовательским соглашением
          </a>
          .
        </p>
        <Button
          onClick={handleAccept}
          className="bg-primary hover:bg-primary/90 text-white shrink-0"
        >
          Принять
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;