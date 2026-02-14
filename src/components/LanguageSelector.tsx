import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage, LANGUAGES, Language } from '@/app/contexts/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-purple-300 rounded-xl hover:bg-purple-50 transition-all hover:shadow-md"
        aria-label="Change Language"
      >
        <Globe className="w-5 h-5 text-purple-600" />
        <span className="font-semibold text-purple-900">{LANGUAGES[language]}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-purple-300 z-50 max-h-96 overflow-y-auto">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-t-xl">
              <Globe className="w-5 h-5 inline mr-2" />
              Select Language
            </div>
            
            <div className="p-2">
              {/* Pacific Languages Section */}
              <div className="mb-2">
                <div className="px-3 py-2 text-xs font-bold text-purple-600 bg-purple-50 rounded-lg">
                  🌺 Pacific Languages
                </div>
                <div className="mt-1">
                  {(['en', 'tl', 'ch', 'mh', 'pw'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                        language === lang
                          ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-900 font-bold'
                          : 'hover:bg-purple-50 text-gray-700'
                      }`}
                    >
                      <span>{LANGUAGES[lang]}</span>
                      {language === lang && (
                        <Check className="w-5 h-5 text-purple-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asian Languages Section */}
              <div className="mb-2">
                <div className="px-3 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg">
                  🌏 Asian Languages
                </div>
                <div className="mt-1">
                  {(['zh', 'ja', 'ko', 'vi', 'th', 'hi'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                        language === lang
                          ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-900 font-bold'
                          : 'hover:bg-purple-50 text-gray-700'
                      }`}
                    >
                      <span>{LANGUAGES[lang]}</span>
                      {language === lang && (
                        <Check className="w-5 h-5 text-purple-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* European Languages Section */}
              <div>
                <div className="px-3 py-2 text-xs font-bold text-green-600 bg-green-50 rounded-lg">
                  🌍 European Languages
                </div>
                <div className="mt-1">
                  {(['es', 'fr', 'de', 'pt'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                        language === lang
                          ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-900 font-bold'
                          : 'hover:bg-purple-50 text-gray-700'
                      }`}
                    >
                      <span>{LANGUAGES[lang]}</span>
                      {language === lang && (
                        <Check className="w-5 h-5 text-purple-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-purple-50 rounded-b-xl border-t border-purple-200">
              <p className="text-xs text-center text-purple-700">
                ✨ More languages coming soon!
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
