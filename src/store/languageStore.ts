import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LanguageStore = {
  language: 'en' | 'hi';
  showLanguageModal: boolean;
  setLanguage: (language: 'en' | 'hi') => void;
  setShowLanguageModal: (show: boolean) => void;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      showLanguageModal: true,
      setLanguage: (language) => set({ language }),
      setShowLanguageModal: (show) => set({ showLanguageModal: show }),
    }),
    {
      name: 'language-storage',
    }
  )
);