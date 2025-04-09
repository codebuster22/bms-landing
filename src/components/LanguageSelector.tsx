import { Globe } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { translations } from '../translations';

export function LanguageSelector() {
  const { language, setLanguage, showLanguageModal, setShowLanguageModal } = useLanguageStore();
  const t = translations[language];

  if (!showLanguageModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-[8px_8px_0_#212121] border-4 border-[#212121]">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="text-[#0B3B8F]" size={24} />
          <h2 className="text-2xl font-bold">{t.languageSelector.title}</h2>
        </div>
        <p className="text-gray-600 mb-6">{t.languageSelector.description}</p>
        <div className="space-y-4 mb-6">
          <button
            className={`w-full p-4 rounded-lg border-2 flex items-center justify-between ${
              language === 'en'
                ? 'border-[#0B3B8F] bg-[#0B3B8F] text-white'
                : 'border-gray-200 hover:border-[#0B3B8F]'
            }`}
            onClick={() => setLanguage('en')}
          >
            <span>{t.languageSelector.english}</span>
            {language === 'en' && <span>✓</span>}
          </button>
          <button
            className={`w-full p-4 rounded-lg border-2 flex items-center justify-between ${
              language === 'hi'
                ? 'border-[#0B3B8F] bg-[#0B3B8F] text-white'
                : 'border-gray-200 hover:border-[#0B3B8F]'
            }`}
            onClick={() => setLanguage('hi')}
          >
            <span>{t.languageSelector.hindi}</span>
            {language === 'hi' && <span>✓</span>}
          </button>
        </div>
        <button
          className="w-full bg-[#0B3B8F] text-white px-6 py-3 rounded-lg font-bold shadow-[4px_4px_0_#212121] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#212121] transition-all"
          onClick={() => setShowLanguageModal(false)}
        >
          {t.languageSelector.continue}
        </button>
      </div>
    </div>
  );
}