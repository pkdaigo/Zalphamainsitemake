import { useState, useEffect } from 'react';
import { Cookie, Shield, X, Settings, Check, Info, Eye, TrendingUp, Target, Zap } from 'lucide-react';

interface CookieConsentProps {
  onConsentChange: (consent: CookieConsent) => void;
}

export interface CookieConsent {
  essential: boolean; // Always true, can't be disabled
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
}

export function CookieConsentManager({ onConsentChange }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true, // Always on
    functional: false,
    analytics: false,
    advertising: false,
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem('zalpha_cookie_consent');
    if (!savedConsent) {
      // Show banner after 1 second delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved consent
      const parsed = JSON.parse(savedConsent);
      setConsent(parsed);
      onConsentChange(parsed);
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    const consentWithTimestamp = {
      ...newConsent,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('zalpha_cookie_consent', JSON.stringify(consentWithTimestamp));
    setConsent(consentWithTimestamp);
    onConsentChange(consentWithTimestamp);
    setShowBanner(false);
    setShowDetails(false);
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      functional: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString()
    });
  };

  const acceptEssentialOnly = () => {
    saveConsent({
      essential: true,
      functional: false,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString()
    });
  };

  const acceptSome = () => {
    saveConsent(consent);
  };

  if (!showBanner) {
    return null;
  }

  // Detailed settings view
  if (showDetails) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">🍪 Cookie Settings</h2>
                  <p className="text-blue-100">
                    Customize your privacy preferences and control how we use cookies
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Essential Cookies */}
            <div className="mb-8 pb-8 border-b-2 border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Essential Cookies (Required)</h3>
                    <p className="text-gray-700 mb-3">
                      These cookies are necessary for the website to function properly and cannot be disabled.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-green-900 mb-2">What we use these for:</p>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• User authentication and login sessions</li>
                        <li>• Security and fraud prevention</li>
                        <li>• Remembering your cookie preferences</li>
                        <li>• Essential platform functionality</li>
                        <li>• Shopping cart and payment processing</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-bold text-sm border-2 border-green-300">
                    Always Active
                  </div>
                </div>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="mb-8 pb-8 border-b-2 border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Settings className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Functional Cookies</h3>
                    <p className="text-gray-700 mb-3">
                      These cookies enable enhanced functionality and personalization, such as language preferences and customized content.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-blue-900 mb-2">What we use these for:</p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Remember your language and region settings</li>
                        <li>• Save your dashboard layout preferences</li>
                        <li>• Remember collapsed/expanded sections</li>
                        <li>• Personalized job recommendations</li>
                        <li>• Chat history and message preferences</li>
                        <li>• Video playback settings</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <label className="ml-4 relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.functional}
                    onChange={(e) => setConsent({ ...consent, functional: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-16 h-8 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="mb-8 pb-8 border-b-2 border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics Cookies</h3>
                    <p className="text-gray-700 mb-3">
                      These cookies help us understand how visitors use our platform so we can improve it. All data is anonymized.
                    </p>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-900 mb-2">What we use these for:</p>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Track which features are most used</li>
                        <li>• Measure page loading times and performance</li>
                        <li>• Understand user journey through the site</li>
                        <li>• Identify and fix bugs faster</li>
                        <li>• See which job postings get most views</li>
                        <li>• Improve AI recommendations over time</li>
                      </ul>
                      <p className="text-xs text-purple-700 mt-3 font-semibold">
                        ℹ️ All analytics data is anonymized and never sold to third parties
                      </p>
                    </div>
                  </div>
                </div>
                <label className="ml-4 relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-16 h-8 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>

            {/* Advertising Cookies */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Advertising & Marketing Cookies</h3>
                    <p className="text-gray-700 mb-3">
                      These cookies are used to show you relevant job recommendations and marketing content based on your interests.
                    </p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-orange-900 mb-2">What we use these for:</p>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Show relevant job postings based on your profile</li>
                        <li>• Display personalized training program recommendations</li>
                        <li>• Track effectiveness of our marketing campaigns</li>
                        <li>• Retarget visitors with relevant opportunities</li>
                        <li>• Show you ads on social media platforms</li>
                        <li>• Measure ROI of advertising spend</li>
                      </ul>
                      <p className="text-xs text-orange-700 mt-3 font-semibold">
                        ⚠️ Disabling this may result in less relevant job recommendations
                      </p>
                    </div>
                  </div>
                </div>
                <label className="ml-4 relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.advertising}
                    onChange={(e) => setConsent({ ...consent, advertising: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-16 h-8 bg-gray-300 peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Your Privacy Matters
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>We never sell your personal data to third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>You can change these settings anytime in your profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>All data collection complies with GDPR and privacy regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>You can request data deletion at any time</span>
                </li>
              </ul>
              <div className="mt-4">
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 font-semibold text-sm underline">
                  Read our full Privacy Policy →
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={acceptEssentialOnly}
                className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-bold border-2 border-gray-300"
              >
                Essential Only
              </button>
              <button
                onClick={acceptSome}
                className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg"
              >
                Save My Choices
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all font-bold"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Simple banner view
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-200">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Icon & Text */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🍪 We Value Your Privacy</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies to enhance your experience, provide personalized job recommendations, and improve our platform. 
                  You can choose which cookies to accept.
                </p>
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Customize Settings
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={acceptEssentialOnly}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-bold whitespace-nowrap border-2 border-gray-300"
              >
                Essential Only
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-bold whitespace-nowrap"
              >
                Accept All Cookies
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 rounded-lg p-3">
                <Shield className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-green-900">Essential</p>
                <p className="text-xs text-green-700">Always On</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <Settings className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-blue-900">Functional</p>
                <p className="text-xs text-blue-700">Personalization</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <TrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-purple-900">Analytics</p>
                <p className="text-xs text-purple-700">Improvements</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <Target className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-orange-900">Marketing</p>
                <p className="text-xs text-orange-700">Relevant Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component to manage cookie consent in your app
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedConsent = localStorage.getItem('zalpha_cookie_consent');
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    }
    setLoading(false);
  }, []);

  return { consent, loading };
}
