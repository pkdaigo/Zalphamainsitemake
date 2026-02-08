import { useState } from 'react';
import { Search, Database, AlertCircle, CheckCircle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import * as api from '@/utils/api';

interface DataRecoveryCheckProps {
  onNavigate: (page: string) => void;
}

export function DataRecoveryCheck({ onNavigate }: DataRecoveryCheckProps) {
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<any>(null);

  const checkForData = async () => {
    setChecking(true);
    const foundData: any = {
      localStorage: [],
      sessionStorage: [],
      database: null,
      consoleWarning: false
    };

    // Check localStorage for any beta-related data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.toLowerCase().includes('beta')) {
        foundData.localStorage.push({
          key,
          value: localStorage.getItem(key)
        });
      }
    }

    // Check sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.toLowerCase().includes('beta')) {
        foundData.sessionStorage.push({
          key,
          value: sessionStorage.getItem(key)
        });
      }
    }

    // Check database
    try {
      const betaApps = await api.getAllBetaApplications();
      foundData.database = betaApps;
    } catch (err) {
      foundData.database = { error: 'Could not connect to database' };
    }

    // Check if console.log was the only storage (the problem)
    foundData.consoleWarning = 
      foundData.localStorage.length === 0 && 
      foundData.sessionStorage.length === 0 &&
      (!foundData.database || foundData.database.applications?.length === 0);

    setResults(foundData);
    setChecking(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <BackButton onNavigate={onNavigate} label="Back to Internal Dashboard" destination="internal-dashboard" />
        
        <div className="mt-6 mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            🔍 Beta Application Data Recovery Check
          </h1>
          <p className="text-lg text-gray-600">
            Let's check if any beta signups were saved anywhere
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
          <div className="text-center mb-8">
            <Database className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Scan for Beta Application Data
            </h2>
            <p className="text-gray-600 mb-6">
              This will check localStorage, sessionStorage, and the database for any saved beta applications
            </p>
            <button
              onClick={checkForData}
              disabled={checking}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50"
            >
              {checking ? (
                <>
                  <Search className="inline w-5 h-5 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="inline w-5 h-5 mr-2" />
                  Start Scan
                </>
              )}
            </button>
          </div>

          {results && (
            <div className="space-y-6">
              {/* Console Warning */}
              {results.consoleWarning && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-red-900 mb-2">❌ No Data Found</h3>
                      <p className="text-red-700 mb-4">
                        Unfortunately, no beta application data was found in localStorage, sessionStorage, or the database.
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-red-200">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>What happened:</strong> The old form only logged data to the browser console, 
                          which is temporary and disappears when the browser is closed.
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Previous signups are lost.</strong> You'll need to ask people to re-submit their applications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Database Results */}
              <div className={`border-2 rounded-xl p-6 ${
                results.database?.applications?.length > 0 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-start gap-3">
                  {results.database?.applications?.length > 0 ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">
                      Database Check
                    </h3>
                    {results.database?.error ? (
                      <p className="text-yellow-700">
                        ⚠️ Could not connect to database: {results.database.error}
                      </p>
                    ) : results.database?.applications?.length > 0 ? (
                      <>
                        <p className="text-green-700 mb-4">
                          ✅ Found {results.database.applications.length} beta application(s) in database!
                        </p>
                        <button
                          onClick={() => onNavigate('beta-applications-admin')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          View Applications →
                        </button>
                      </>
                    ) : (
                      <p className="text-yellow-700">
                        ⚠️ Database is connected but contains 0 beta applications
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* localStorage Results */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  localStorage Check
                </h3>
                {results.localStorage.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-gray-700 mb-2">
                      Found {results.localStorage.length} beta-related item(s):
                    </p>
                    {results.localStorage.map((item: any, i: number) => (
                      <div key={i} className="bg-white rounded p-3 text-sm">
                        <div className="font-mono text-blue-600">{item.key}</div>
                        <div className="text-gray-600 truncate">{item.value?.substring(0, 100)}...</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No beta-related data in localStorage</p>
                )}
              </div>

              {/* sessionStorage Results */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  sessionStorage Check
                </h3>
                {results.sessionStorage.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-gray-700 mb-2">
                      Found {results.sessionStorage.length} beta-related item(s):
                    </p>
                    {results.sessionStorage.map((item: any, i: number) => (
                      <div key={i} className="bg-white rounded p-3 text-sm">
                        <div className="font-mono text-blue-600">{item.key}</div>
                        <div className="text-gray-600 truncate">{item.value?.substring(0, 100)}...</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No beta-related data in sessionStorage</p>
                )}
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 mb-3">💡 Next Steps</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p>✅ <strong>Good news:</strong> New signups will be saved properly!</p>
                  <p>📧 <strong>For lost signups:</strong> Contact people and ask them to re-submit</p>
                  <p>🚀 <strong>Going forward:</strong> All beta applications are now stored in the database</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}