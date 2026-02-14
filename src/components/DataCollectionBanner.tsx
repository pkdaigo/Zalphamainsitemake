import { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';

interface DataCollectionBannerProps {
  onNavigate?: (page: string) => void;
}

export function DataCollectionBanner({ onNavigate }: DataCollectionBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: true,
    functional: true,
  });

  useEffect(() => {
    // Check if user has already set cookie preferences
    const cookiePrefs = localStorage.getItem('zalpha-cookie-preferences');
    if (!cookiePrefs) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const prefs = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    localStorage.setItem('zalpha-cookie-preferences', JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleDenyAll = () => {
    const prefs = {
      essential: true, // Essential always enabled
      analytics: false,
      marketing: false
    };
    localStorage.setItem('zalpha-cookie-preferences', JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('zalpha-cookie-preferences', JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Cookie Preferences</h2>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-sm text-slate-600 mb-6">
              We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. 
              You can customize your preferences below.
            </p>

            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">Essential Cookies</h3>
                  <div className="px-3 py-1 bg-slate-300 text-slate-600 text-xs font-semibold rounded cursor-not-allowed">
                    Always Active
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Required for the website to function. These cookies enable core functionality such as 
                  security, authentication, and session management. Cannot be disabled.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">Analytics Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-slate-600">
                  Help us understand how visitors interact with our website by collecting and reporting 
                  information anonymously (e.g., Google Analytics).
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">Marketing Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-slate-600">
                  Used to track visitors across websites to display relevant advertisements and measure 
                  the effectiveness of marketing campaigns.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">Functional Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-slate-600">
                  Enable enhanced functionality and personalization, such as remembering your preferences, 
                  language settings, and customized content.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 shadow-2xl z-50 p-4">
      <div className="max-w-7xl mx-auto flex items-start gap-4">
        <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
        
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 mb-2">We Use Cookies</h3>
          <p className="text-sm text-slate-700 mb-3">
            We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
            and personalize content. By clicking "Accept All", you consent to our use of cookies.{' '}
            <button
              onClick={() => onNavigate?.('privacy-policy')}
              className="text-blue-600 hover:underline font-semibold"
            >
              Learn more
            </button>
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleDenyAll}
              className="px-5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
            >
              Deny All
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="px-5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Customize
            </button>
          </div>
        </div>

        <button
          onClick={handleDenyAll}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}