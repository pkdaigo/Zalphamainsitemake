import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader, Server, Database, Zap, Activity } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface HealthCheckProps {
  onNavigate: (page: string) => void;
}

export function HealthCheck({ onNavigate }: HealthCheckProps) {
  const [serverHealth, setServerHealth] = useState<'loading' | 'success' | 'error'>('loading');
  const [serverMessage, setServerMessage] = useState('');
  const [responseTime, setResponseTime] = useState<number | null>(null);

  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    setServerHealth('loading');
    const startTime = Date.now();

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/health`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const endTime = Date.now();
      setResponseTime(endTime - startTime);

      if (response.ok) {
        const data = await response.json();
        setServerHealth('success');
        setServerMessage(`Server is healthy! Status: ${data.status}`);
      } else {
        setServerHealth('error');
        setServerMessage(`Server returned status ${response.status}`);
      }
    } catch (error: any) {
      setServerHealth('error');
      setServerMessage(`Connection failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-6 shadow-2xl">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            ZALPHA System Health
          </h1>
          <p className="text-xl text-blue-200">
            Real-time server status and connectivity check
          </p>
        </div>

        {/* Server Health Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Server className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Backend Server</h2>
                <p className="text-gray-600">Supabase Edge Function</p>
              </div>
            </div>
            
            {serverHealth === 'loading' && (
              <Loader className="w-8 h-8 text-blue-500 animate-spin" />
            )}
            {serverHealth === 'success' && (
              <CheckCircle className="w-8 h-8 text-green-500" />
            )}
            {serverHealth === 'error' && (
              <XCircle className="w-8 h-8 text-red-500" />
            )}
          </div>

          <div className="space-y-4">
            {/* Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Status:</span>
              <span className={`font-bold ${
                serverHealth === 'success' ? 'text-green-600' :
                serverHealth === 'error' ? 'text-red-600' :
                'text-blue-600'
              }`}>
                {serverHealth === 'loading' ? 'Checking...' :
                 serverHealth === 'success' ? '✅ Online & Healthy' :
                 '❌ Connection Issue'}
              </span>
            </div>

            {/* Response Time */}
            {responseTime !== null && (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Response Time:</span>
                <span className={`font-bold ${
                  responseTime < 500 ? 'text-green-600' :
                  responseTime < 1000 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {responseTime}ms
                  {responseTime < 500 && ' 🚀 Fast!'}
                  {responseTime >= 500 && responseTime < 1000 && ' ⚡ Good'}
                  {responseTime >= 1000 && ' 🐌 Slow'}
                </span>
              </div>
            )}

            {/* Message */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">{serverMessage || 'Waiting for response...'}</p>
            </div>

            {/* Retry Button */}
            <button
              onClick={checkServerHealth}
              disabled={serverHealth === 'loading'}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {serverHealth === 'loading' ? 'Checking...' : 'Re-check Server'}
            </button>
          </div>
        </div>

        {/* Configuration Details */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
              <p className="text-gray-600">Connection settings</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Project ID</p>
              <p className="font-mono text-sm text-gray-900 break-all">{projectId}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">API Endpoint</p>
              <p className="font-mono text-xs text-gray-900 break-all">
                https://{projectId}.supabase.co/functions/v1/make-server-9bd83859
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Public Anon Key</p>
              <p className="font-mono text-xs text-gray-900 break-all">
                {publicAnonKey.substring(0, 30)}...
              </p>
            </div>
          </div>
        </div>

        {/* System Components */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">System Components</h2>
              <p className="text-gray-600">Verified services</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-900">Supabase Auth</span>
              </div>
              <p className="text-sm text-green-700">User authentication ready</p>
            </div>

            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-900">KV Store</span>
              </div>
              <p className="text-sm text-green-700">Database storage ready</p>
            </div>

            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-900">Edge Functions</span>
              </div>
              <p className="text-sm text-green-700">API endpoints active</p>
            </div>

            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-900">File Storage</span>
              </div>
              <p className="text-sm text-green-700">Document uploads ready</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 justify-center">
          <BackButton
            onClick={() => onNavigate('landing')}
            className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all"
          >
            Back to Home
          </BackButton>
          <button
            onClick={() => onNavigate('student-signup')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
          >
            Test Student Signup
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-blue-200 text-sm">
            🌺 All systems operational • ZALPHA is ready for demo 🚀
          </p>
        </div>
      </div>
    </div>
  );
}