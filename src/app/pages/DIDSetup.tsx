import React, { useState } from 'react';
import { ArrowLeft, Key, Globe, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface DIDSetupProps {
  onNavigate: (page: string) => void;
}

export default function DIDSetup({ onNavigate }: DIDSetupProps) {
  const [domains, setDomains] = useState<string>('http://localhost:3000');
  const [loading, setLoading] = useState(false);
  const [clientKey, setClientKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleGenerateClientKey = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    setClientKey('');

    try {
      // Parse domains (comma or newline separated)
      const domainList = domains
        .split(/[,\n]/)
        .map(d => d.trim())
        .filter(d => d.length > 0);

      if (domainList.length === 0) {
        setError('Please enter at least one domain');
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/did/client-key`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            allowedDomains: domainList,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate client key');
      }

      setClientKey(data.clientKey);
      setSuccess(true);
      console.log('D-ID Client Key generated successfully:', data);
    } catch (err: any) {
      console.error('Error generating D-ID client key:', err);
      setError(err.message || 'Failed to generate client key');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('landing')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">D-ID API Setup</h1>
              <p className="text-sm text-gray-600">Configure your D-ID client key for AI video tutorials</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Key className="w-5 h-5" />
              Setup Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Make sure you've already entered your D-ID API key in the environment variable <code className="bg-blue-100 px-2 py-0.5 rounded">DID_API_KEY</code></li>
              <li>Enter the domains you want to whitelist below (your production domain and localhost)</li>
              <li>Click "Generate Client Key" to create a client key for these domains</li>
              <li>The client key will be used by the frontend to connect to D-ID's services</li>
            </ol>
          </div>

          {/* Domain Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Allowed Domains
            </label>
            <textarea
              value={domains}
              onChange={(e) => setDomains(e.target.value)}
              placeholder="http://localhost:3000&#10;https://yourdomain.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            <p className="mt-2 text-sm text-gray-600">
              Enter one domain per line or separate with commas. Include protocol (http:// or https://)
            </p>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateClientKey}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Client Key...
              </>
            ) : (
              <>
                <Key className="w-5 h-5" />
                Generate Client Key
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-red-900">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && clientKey && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-green-900">Success!</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Your D-ID client key has been generated successfully.
                  </p>
                </div>
              </div>

              {/* Client Key Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Key
                </label>
                <div className="bg-white border border-gray-300 rounded-lg p-4">
                  <code className="text-xs text-gray-800 break-all font-mono">
                    {clientKey}
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(clientKey)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Copy to Clipboard
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This client key is now active for the domains you specified. 
                  The ZALPHA platform will automatically use this key when interacting with D-ID services.
                </p>
              </div>
            </div>
          )}

          {/* Test D-ID Connection */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Go to the <button onClick={() => onNavigate('tutorial-admin')} className="text-blue-600 hover:underline font-medium">Tutorial Admin Page</button> to create AI video tutorials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Visit the <button onClick={() => onNavigate('video-tutorials')} className="text-blue-600 hover:underline font-medium">Video Tutorials Page</button> to see your AI instructors in action</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Your beta testers can now interact with live AI tutorial videos powered by D-ID</span>
              </li>
            </ul>
          </div>
        </div>

        {/* API Documentation */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Reference</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800">Endpoint</h3>
              <code className="block bg-gray-100 p-3 rounded mt-2 text-xs">
                POST /make-server-9bd83859/did/client-key
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Request Body</h3>
              <pre className="bg-gray-100 p-3 rounded mt-2 text-xs overflow-x-auto">
{`{
  "allowedDomains": [
    "http://localhost:3000",
    "https://yourdomain.com"
  ]
}`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Response</h3>
              <pre className="bg-gray-100 p-3 rounded mt-2 text-xs overflow-x-auto">
{`{
  "success": true,
  "clientKey": "your-client-key-here",
  "allowedDomains": ["..."]
}`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}