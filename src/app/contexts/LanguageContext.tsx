import { createContext, useContext, useState, ReactNode } from 'react';

// Supported languages - English only
export type Language = 'en';

export const LANGUAGES = {
  en: 'English',
};

// Translation dictionary (expandable)
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.jobs': 'Find Jobs',
    'nav.contracts': 'Contract Work',
    'nav.profile': 'My Profile',
    'nav.employers': 'For Employers',
    
    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.apply': 'Apply',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    
    // Contract Marketplace
    'contract.title': 'Global Contract Marketplace',
    'contract.subtitle': 'Connect with verified clients worldwide',
    'contract.post_job': 'Post Contract Work',
    'contract.browse': 'Browse Contracts',
    'contract.remote': 'Remote',
    'contract.verified': 'Verified',
    'contract.payment_verified': 'Payment Verified',
    'contract.proposals': 'proposals',
    'contract.budget': 'Budget',
    'contract.duration': 'Duration',
    'contract.skills': 'Skills Required',
    'contract.worldwide': 'Open Worldwide',
    
    // Currency
    'currency.usd': 'USD',
    'currency.per_hour': 'per hour',
    'currency.fixed': 'Fixed Price',
    
    // Zee Bot
    'zee.greeting': 'Hi! I\'m Zee, your ZALPHA assistant! 💙',
    'zee.help': 'How can I help you today?',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}