import { Globe } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { useAnalytics } from '../hooks/useAnalytics';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore();
  const { trackLanguageChange } = useAnalytics();

  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    trackLanguageChange(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <button
      className="flex items-center gap-2 hover:text-[#FF9800] transition-colors"
      onClick={handleLanguageChange}
    >
      <Globe size={20} />
      <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
    </button>
  );
}