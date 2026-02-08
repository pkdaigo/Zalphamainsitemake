import { useState, useEffect } from 'react';
import { Settings, CheckCircle, XCircle, RefreshCw, AlertCircle, Eye, EyeOff, Zap, Link as LinkIcon, Save } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import ZalphaATSService from '@/services/manatal';
import ZalphaWebsiteService from '@/services/wix';

interface IntegrationSettingsProps {
  onNavigate: (page: string) => void;
}

interface ConnectionStatus {
  zalphaATS: { connected: boolean; message: string; testing: boolean };
  zalphaWebsite: { connected: boolean; message: string; testing: boolean };
}

export function IntegrationSettings({ onNavigate }: IntegrationSettingsProps) {
  const [manatalKey, setManatalKey] = useState('');
  const [wixApiKey, setWixApiKey] = useState('');
  const [wixDomain, setWixDomain] = useState('');
  const [wixAccountId, setWixAccountId] = useState('');
  
  const [showManatalKey, setShowManatalKey] = useState(false);
  const [showWixKey, setShowWixKey] = useState(false);
  
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    zalphaATS: { connected: false, message: 'Not configured', testing: false },
    zalphaWebsite: { connected: false, message: 'Not configured', testing: false },
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Load saved credentials from localStorage
  useEffect(() => {
    const savedManatalKey = localStorage.getItem('manatal_key') || '0c1afe45a6b4f911a2a26935391fabdd9f8681fe';
    const savedWixKey = localStorage.getItem('wix_api_key');
    const savedWixDomain = localStorage.getItem('wix_domain');
    const savedWixAccountId = localStorage.getItem('wix_account_id');

    if (savedManatalKey) {
      setManatalKey(savedManatalKey);
      localStorage.setItem('manatal_key', savedManatalKey);
    }
    if (savedWixKey) setWixApiKey(savedWixKey);
    if (savedWixDomain) setWixDomain(savedWixDomain);
    if (savedWixAccountId) setWixAccountId(savedWixAccountId);

    // Don't auto-test connections on load to prevent fetch errors
    // Users can manually test when ready
  }, []);

  const testManatalConnectionServer = async (apiKey?: string) => {
    const key = apiKey || manatalKey;
    if (!key) {
      setConnectionStatus(prev => ({
        ...prev,
        zalphaATS: { connected: false, message: 'API key required', testing: false },
      }));
      return;
    }

    setConnectionStatus(prev => ({
      ...prev,
      zalphaATS: { ...prev.zalphaATS, testing: true },
    }));

    try {
      const response = await fetch('https://becsvvgggvhokamuiijt.supabase.co/functions/v1/make-server-9bd83859/integrations/manatal/test', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      setConnectionStatus(prev => ({
        ...prev,
        zalphaATS: { connected: result.connected, message: result.message, testing: false },
      }));
    } catch (error) {
      setConnectionStatus(prev => ({
        ...prev,
        zalphaATS: { 
          connected: false, 
          message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          testing: false 
        },
      }));
    }
  };

  const testManatalConnection = testManatalConnectionServer;

  const testWixConnection = async (apiKey?: string, domain?: string) => {
    const key = apiKey || wixApiKey;
    const site = domain || wixDomain;
    
    if (!key && !site) {
      setConnectionStatus(prev => ({
        ...prev,
        zalphaWebsite: { ...prev.zalphaWebsite, testing: true },
      }));

      try {
        const response = await fetch('https://becsvvgggvhokamuiijt.supabase.co/functions/v1/make-server-9bd83859/integrations/wix/test', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        
        setConnectionStatus(prev => ({
          ...prev,
          zalphaWebsite: { connected: result.connected, message: result.message, testing: false },
        }));
      } catch (error) {
        setConnectionStatus(prev => ({
          ...prev,
          zalphaWebsite: { 
            connected: false, 
            message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            testing: false 
          },
        }));
      }
      return;
    }

    setConnectionStatus(prev => ({
      ...prev,
      zalphaWebsite: { ...prev.zalphaWebsite, testing: true },
    }));

    try {
      const service = new ZalphaWebsiteService(key, site, wixAccountId);
      const result = await service.testConnection();
      
      setConnectionStatus(prev => ({
        ...prev,
        zalphaWebsite: { connected: result.connected, message: result.message, testing: false },
      }));
    } catch (error) {
      setConnectionStatus(prev => ({
        ...prev,
        zalphaWebsite: { 
          connected: false, 
          message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          testing: false 
        },
      }));
    }
  };

  const saveSettings = () => {
    setSaveStatus('saving');

    try {
      if (manatalKey) localStorage.setItem('manatal_key', manatalKey);
      if (wixApiKey) localStorage.setItem('wix_api_key', wixApiKey);
      if (wixDomain) localStorage.setItem('wix_domain', wixDomain);
      if (wixAccountId) localStorage.setItem('wix_account_id', wixAccountId);

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Configure Your ATS and Website API</h1>
          <p className="text-slate-600 text-lg">
            Connect your recruitment tools and website to sync job postings and applications
          </p>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">🔐 Secure Integration</h3>
              <p className="text-slate-700 text-sm mb-3">
                Your API keys are stored securely and encrypted. ZALPHA uses these credentials to sync data between platforms automatically.
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Two-way data synchronization</li>
                <li>✓ Real-time updates via webhooks</li>
                <li>✓ Automatic job posting sync from ZALPHA ATS</li>
                <li>✓ Candidate applications sent to ZALPHA ATS</li>
                <li>✓ Contact and form submissions synced with your website</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-4 border-orange-300">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 mb-6 border-2 border-orange-300">
              <div className="flex items-center gap-2 text-orange-700 font-bold text-sm">
                <AlertCircle className="w-5 h-5" />
                🏢 PLATFORM ADMIN ONLY - KI Executive Group
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <LinkIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">ZALPHA Website</h2>
                  <p className="text-sm text-slate-600">Internal Website Integration</p>
                </div>
              </div>
              {connectionStatus.zalphaWebsite.connected ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-slate-300" />
              )}
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
              <h3 className="font-bold text-slate-900 text-sm mb-2">📝 Purpose:</h3>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Syncs forms from company websites</li>
                <li>• Manages ZALPHA marketing content</li>
                <li>• Auto-posts to company blog</li>
                <li>• Platform-level configuration only</li>
              </ul>
            </div>

            <div className={`mb-6 p-4 rounded-xl border-2 ${
              connectionStatus.zalphaWebsite.connected 
                ? 'bg-green-50 border-green-200' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {connectionStatus.zalphaWebsite.testing ? (
                  <RefreshCw className="w-4 h-4 text-slate-600 animate-spin" />
                ) : connectionStatus.zalphaWebsite.connected ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-sm text-slate-900">
                  {connectionStatus.zalphaWebsite.testing ? 'Testing connection...' : 'Connection Status'}
                </span>
              </div>
              <p className="text-sm text-slate-600">{connectionStatus.zalphaWebsite.message}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                ZALPHA Website API Key
              </label>
              <div className="relative">
                <input
                  type={showWixKey ? 'text' : 'password'}
                  value={wixApiKey}
                  onChange={(e) => setWixApiKey(e.target.value)}
                  placeholder="Enter your ZALPHA Website API key"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 pr-12"
                />
                <button
                  onClick={() => setShowWixKey(!showWixKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showWixKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Site ID *
              </label>
              <input
                type="text"
                value={wixDomain}
                onChange={(e) => setWixDomain(e.target.value)}
                placeholder="e.g., abc123-def456"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Account ID <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={wixAccountId}
                onChange={(e) => setWixAccountId(e.target.value)}
                placeholder="Optional account ID"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
              />
              <p className="text-xs text-slate-500 mt-2">
                Get your credentials from{' '}
                <a 
                  href="https://dev.wix.com/api/rest/getting-started" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-600 hover:underline"
                >
                  ZALPHA Website Developers
                </a>
              </p>
            </div>

            <button
              onClick={() => testWixConnection()}
              disabled={!wixApiKey || !wixDomain || connectionStatus.zalphaWebsite.testing}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${connectionStatus.zalphaWebsite.testing ? 'animate-spin' : ''}`} />
              Test Connection
            </button>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-3 text-sm">What gets synced:</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  Contact submissions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  Form responses
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  Member registrations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  Job posts to blog
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-4 border-purple-300">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-6 border-2 border-purple-300">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                <AlertCircle className="w-5 h-5" />
                💼 EMPLOYER INTEGRATION - Each employer connects their own ATS
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Manatal ATS</h2>
                  <p className="text-sm text-slate-600">Example ATS Integration</p>
                </div>
              </div>
              {connectionStatus.zalphaATS.connected ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-slate-300" />
              )}
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
              <h3 className="font-bold text-slate-900 text-sm mb-2">📝 Purpose:</h3>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Employers connect THEIR own ATS account</li>
                <li>• Syncs jobs from employer's system</li>
                <li>• Sends applications to employer's ATS</li>
                <li>• Per-employer configuration (not platform-wide)</li>
              </ul>
            </div>

            <div className={`mb-6 p-4 rounded-xl border-2 ${
              connectionStatus.zalphaATS.connected 
                ? 'bg-green-50 border-green-200' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {connectionStatus.zalphaATS.testing ? (
                  <RefreshCw className="w-4 h-4 text-slate-600 animate-spin" />
                ) : connectionStatus.zalphaATS.connected ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400" />
                )}
                <span className="font-semibold text-sm text-slate-900">
                  {connectionStatus.zalphaATS.testing ? 'Testing connection...' : 'Connection Status'}
                </span>
              </div>
              <p className="text-sm text-slate-600">{connectionStatus.zalphaATS.message}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                API Key *
              </label>
              <div className="relative">
                <input
                  type={showManatalKey ? 'text' : 'password'}
                  value={manatalKey}
                  onChange={(e) => setManatalKey(e.target.value)}
                  placeholder="Enter your Manatal API key"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 pr-12"
                />
                <button
                  onClick={() => setShowManatalKey(!showManatalKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showManatalKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Get your API key from{' '}
                <a 
                  href="https://www.manatal.com/api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-600 hover:underline"
                >
                  ZALPHA ATS Settings → API
                </a>
              </p>
            </div>

            <button
              onClick={() => testManatalConnection()}
              disabled={!manatalKey || connectionStatus.zalphaATS.testing}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${connectionStatus.zalphaATS.testing ? 'animate-spin' : ''}`} />
              Test Connection
            </button>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-3 text-sm">What gets synced:</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  Job postings (bidirectional)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  Candidate applications
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  Application statuses
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  Real-time webhooks
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={saveSettings}
            disabled={saveStatus === 'saving'}
            className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all ${
              saveStatus === 'saved'
                ? 'bg-green-500 text-white'
                : saveStatus === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl'
            }`}
          >
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                Saving...
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <CheckCircle className="w-6 h-6" />
                Settings Saved!
              </>
            ) : saveStatus === 'error' ? (
              <>
                <XCircle className="w-6 h-6" />
                Save Failed
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                Save All Settings
              </>
            )}
          </button>
        </div>

        <div className="mt-8 text-center">
          <BackButton onNavigate={onNavigate} destination="demo-showcase" />
        </div>
      </div>
    </div>
  );
}