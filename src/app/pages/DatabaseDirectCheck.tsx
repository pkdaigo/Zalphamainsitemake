import { useState, useEffect } from 'react';
import { Database, Search, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface DatabaseDirectCheckProps {
  onNavigate: (page: string) => void;
}

export function DatabaseDirectCheck({ onNavigate }: DatabaseDirectCheckProps) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const checkDatabase = async () => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Direct call to backend to get ALL beta applications
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/admin/beta-applications`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Database check results:', data);
      
      setResults({
        found: data.applications && data.applications.length > 0,
        count: data.applications?.length || 0,
        applications: data.applications || [],
        rawData: data
      });

    } catch (err: any) {
      console.error('Database check error:', err);
      setError(err.message || 'Failed to check database');
    } finally {
      setLoading(false);
    }
  };

  // Auto-check on mount
  useEffect(() => {
    checkDatabase();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <BackButton onNavigate={onNavigate} label="Back to Internal Dashboard" destination="internal-dashboard" />
        
        <div className="mt-6 mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            🔍 Direct Supabase Database Check
          </h1>
          <p className="text-lg text-gray-600">
            Checking Supabase KV Store for beta_application:* entries
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Database className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Live Database Query
            </h2>
            <p className="text-gray-600 mb-6">
              Querying: <code className="bg-gray-100 px-2 py-1 rounded">kv.getByPrefix('beta_application:')</code>
            </p>
            <button
              onClick={checkDatabase}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="inline w-5 h-5 mr-2 animate-spin" />
                  Checking Database...
                </>
              ) : (
                <>
                  <Search className="inline w-5 h-5 mr-2" />
                  Re-Check Database
                </>
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-900 mb-2">Error Checking Database</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-6">
              {/* Summary */}
              <div className={`border-2 rounded-xl p-6 ${
                results.found 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-start gap-3">
                  {results.found ? (
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {results.found ? '✅ DATA FOUND!' : '⚠️ No Data Found'}
                    </h3>
                    <p className={`text-lg mb-4 ${results.found ? 'text-green-700' : 'text-yellow-700'}`}>
                      {results.found ? (
                        <>
                          Found <strong className="text-2xl">{results.count}</strong> beta application(s) in Supabase database!
                        </>
                      ) : (
                        'No beta applications found in the database (yet)'
                      )}
                    </p>
                    {results.found && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => onNavigate('beta-applications-admin')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          View in Admin Dashboard →
                        </button>
                        <button
                          onClick={() => {
                            const dataStr = JSON.stringify(results.applications, null, 2);
                            const blob = new Blob([dataStr], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `beta_applications_${new Date().toISOString()}.json`;
                            a.click();
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Download JSON
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Application Details */}
              {results.found && results.applications.length > 0 && (
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    📋 Found {results.count} Application(s):
                  </h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {results.applications.map((app: any, i: number) => (
                      <div key={app.id || i} className="bg-white rounded-lg p-4 border border-gray-300">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="font-bold text-gray-700">Type:</span>
                            <span className="ml-2 text-gray-900">{app.type || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="font-bold text-gray-700">Status:</span>
                            <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${
                              app.status === 'approved' ? 'bg-green-100 text-green-700' :
                              app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {app.status || 'pending'}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-bold text-gray-700">Name:</span>
                            <span className="ml-2 text-gray-900">{app.fullName || 'N/A'}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-bold text-gray-700">Email:</span>
                            <span className="ml-2 text-blue-600">{app.email || 'N/A'}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-bold text-gray-700">Location:</span>
                            <span className="ml-2 text-gray-900">
                              {app.island ? `${app.island}, ${app.country || ''}` : 'N/A'}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-bold text-gray-700">Submitted:</span>
                            <span className="ml-2 text-gray-900">
                              {app.submittedAt ? new Date(app.submittedAt).toLocaleString() : 'N/A'}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-bold text-gray-700">ID:</span>
                            <span className="ml-2 text-xs font-mono text-gray-600">{app.id || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Raw Data (for debugging) */}
              <details className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <summary className="font-bold text-gray-900 cursor-pointer hover:text-blue-600">
                  🔧 View Raw Database Response (Debug)
                </summary>
                <pre className="mt-4 bg-white p-4 rounded-lg border border-gray-300 text-xs overflow-x-auto">
                  {JSON.stringify(results.rawData, null, 2)}
                </pre>
              </details>

              {/* Next Steps */}
              <div className={`border-2 rounded-xl p-6 ${
                results.found ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'
              }`}>
                <h3 className={`font-bold mb-3 ${results.found ? 'text-blue-900' : 'text-orange-900'}`}>
                  💡 What This Means:
                </h3>
                <div className={`space-y-2 text-sm ${results.found ? 'text-blue-800' : 'text-orange-800'}`}>
                  {results.found ? (
                    <>
                      <p>✅ <strong>Your beta signups WERE saved!</strong></p>
                      <p>✅ All {results.count} application(s) are safely stored in Supabase</p>
                      <p>✅ You can view, manage, and export them from the Admin Dashboard</p>
                      <p>✅ The system is working correctly!</p>
                    </>
                  ) : (
                    <>
                      <p>⚠️ <strong>No applications in database yet</strong></p>
                      <p>📝 Either no one has applied, OR applications were submitted before backend was connected</p>
                      <p>✅ New applications from now on WILL be saved properly</p>
                      <p>📧 You may need to contact previous applicants to re-submit</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}