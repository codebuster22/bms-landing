import { useCallback } from 'react';
import { trackEvent } from '../utils/analytics';
import { useLanguageStore } from '../store/languageStore';

export const useAnalytics = () => {
  const { language } = useLanguageStore();

  const trackPurchaseClick = useCallback(() => {
    trackEvent({
      name: 'purchase_click',
      props: {
        language,
      },
    });
  }, [language]);

  const trackDownloadClick = useCallback(() => {
    trackEvent({
      name: 'download_click',
      props: {
        language,
      },
    });
  }, [language]);

  const trackLanguageChange = useCallback((newLanguage: string) => {
    trackEvent({
      name: 'language_change',
      props: {
        from: language,
        to: newLanguage,
      },
    });
  }, [language]);

  return {
    trackPurchaseClick,
    trackDownloadClick,
    trackLanguageChange,
  };
};