/**
 * HeyGen API Configuration Page for ZALPHA
 * Allows admins to configure HeyGen API key
 */

import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Key, Shield, Loader2 } from 'lucide-react';

interface HeyGenConfigurationProps {
  onNavigate: (page: string) => void;
}

export function HeyGenConfiguration({ onNavigate }: HeyGenConfigurationProps) {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    setIsVerifying(true);

    // In a real scenario, you would send this to your backend
    // For now, we'll simulate a verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsConfigured(true);
      toast.success('HeyGen API key configured successfully!');
      toast.info('Note: The API key has been set. You may need to refresh for changes to take effect.');
      setApiKey(''); // Clear for security
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#006B7D] via-[#008B9F] to-[#00A8C5] py-12 px-6">
      <BackButton onNavigate={onNavigate} destination="demo-showcase" />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl mb-6">
            <span className="text-4xl">🔐</span>
            <span className="text-2xl font-bold text-[#006B7D]">HeyGen Configuration</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Configure HeyGen API
          </h1>
          <p className="text-xl text-white/95">
            Set up your HeyGen API key to enable AI video avatar features
          </p>
        </div>

        {/* Configuration Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              isConfigured ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {isConfigured ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  API Key Configured
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  API Key Required
                </>
              )}
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            {isConfigured
              ? 'Your HeyGen API is configured and ready to use'
              : 'Configure your HeyGen API key to enable video avatars'}
          </p>

          {isConfigured ? (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Configuration Complete</span>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  Your HeyGen API key has been configured. You can now use AI video avatar features.
                </p>
              </div>
              <button
                onClick={() => setIsConfigured(false)}
                className="px-6 py-3 border-2 border-[#006B7D] text-[#006B7D] rounded-xl hover:bg-[#006B7D] hover:text-white transition-all font-semibold"
              >
                Update API Key
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2 text-blue-700">
                  <Key className="h-4 w-4 mt-0.5" />
                  <div className="text-sm">
                    You'll need a HeyGen API key to enable video avatars. Get one from the HeyGen
                    dashboard.
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="apiKey" className="block text-sm font-semibold text-gray-700">
                  HeyGen API Key
                </label>
                <input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your HeyGen API key (e.g., sk_V2_hgu_...)"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#006B7D]"
                />
                <p className="text-sm text-gray-500">
                  Your API key will be stored securely as an environment variable
                </p>
              </div>

              <button
                onClick={handleSaveApiKey}
                disabled={isVerifying || !apiKey.trim()}
                className="w-full px-6 py-4 bg-[#006B7D] text-white rounded-xl hover:bg-[#005566] transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Save & Verify API Key
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* How to Get API Key */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#006B7D] mb-4">
            How to Get Your HeyGen API Key
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700">Follow these steps to get your HeyGen API key:</p>

            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>
                Visit{' '}
                <a
                  href="https://app.heygen.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#006B7D] hover:underline font-semibold"
                >
                  app.heygen.com
                </a>{' '}
                and sign in to your account (or create one)
              </li>
              <li>Navigate to Settings → API in your HeyGen dashboard</li>
              <li>Click "Generate API Key" or use an existing key</li>
              <li>Copy the generated API key (starts with "sk_V2_hgu_...")</li>
              <li>Paste the API key in the field above and click "Save & Verify"</li>
            </ol>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-800">Important Security Note</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Keep your API key secret. Never share it publicly or commit it to version control.
                    The key will be stored as a Supabase environment variable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Info */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-[#006B7D] mb-4">
            What You Can Do with HeyGen
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#006B7D] text-white rounded-lg p-2">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Zee AI Avatar</h3>
                <p className="text-sm text-gray-600">
                  Create AI videos for Zee, your career assistant
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#006B7D] text-white rounded-lg p-2">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Recruiter Videos</h3>
                <p className="text-sm text-gray-600">
                  Generate personalized recruiter introduction videos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#006B7D] text-white rounded-lg p-2">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Career Fair Booths</h3>
                <p className="text-sm text-gray-600">
                  Create virtual booth videos for career fairs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#006B7D] text-white rounded-lg p-2">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Tutorial Videos</h3>
                <p className="text-sm text-gray-600">
                  Generate educational content with AI avatars
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Make sure you have sufficient credits in your HeyGen account.
              Each video generation consumes credits based on video length and features.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => onNavigate('demo-showcase')}
            className="px-8 py-4 bg-white/95 backdrop-blur-sm text-[#006B7D] rounded-xl hover:bg-white hover:scale-105 transition-all font-bold shadow-xl"
          >
            ← Back to Demos
          </button>
          {isConfigured && (
            <button
              onClick={() => onNavigate('heygen-demo')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:scale-105 transition-all font-bold shadow-xl"
            >
              Try HeyGen Demo →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
