import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import * as api from '@/utils/api';

interface DataCheckProps {
  onNavigate: (page: string) => void;
}

export function DataCheck({ onNavigate }: DataCheckProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const checkData = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(
        'https://becsvvgggvhokamuiijt.supabase.co/functions/v1/make-server-9bd83859/admin/view-all-data',
        {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlY3N2dmdnZ3Zob2thbXVpaWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMzE5MjAsImV4cCI6MjA1MjkwNzkyMH0.8yNVq16FHVp3kIPdQc0f6rkz6j9TvFQG9yb-q_rU1gw`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Error checking data:', err);
      setError(err.message || 'Failed to check data');
    } finally {
      setLoading(false);
    }
  };

  const createTestStudent = async () => {
    setLoading(true);
    setError('');
    
    try {
      const testData = {
        email: `test${Date.now()}@zalpha.test`,
        password: 'TestPassword123!',
        firstName: 'Test',
        lastName: 'Student',
        dateOfBirth: '2000-01-01',
        school: 'Test University',
        graduationYear: '2024',
        location: 'Test Location',
        recaptchaToken: 'test-token',
      };

      const response = await fetch(
        'https://becsvvgggvhokamuiijt.supabase.co/functions/v1/make-server-9bd83859/auth/student/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlY3N2dmdnZ3Zob2thbXVpaWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMzE5MjAsImV4cCI6MjA1MjkwNzkyMH0.8yNVq16FHVp3kIPdQc0f6rkz6j9TvFQG9yb-q_rU1gw`,
          },
          body: JSON.stringify(testData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      alert('Test student created successfully! Now click "Check Data" to see it.');
      
      // Auto-check data after creation
      setTimeout(() => checkData(), 1000);
    } catch (err: any) {
      console.error('Error creating test student:', err);
      setError(err.message || 'Failed to create test student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003459] to-[#00171F] p-6">
      <BackButton onNavigate={onNavigate} destination="internal-dashboard" />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-[#003459] mb-4">🔍 Data Collection Check</h1>
          <p className="text-gray-600 mb-6">
            Use this tool to verify that data is being collected and stored in your Supabase database.
          </p>

          <div className="flex gap-4 mb-6">
            <button
              onClick={checkData}
              disabled={loading}
              className="px-6 py-3 bg-[#007EA7] text-white rounded-lg hover:bg-[#00A8E8] transition-colors disabled:opacity-50 font-semibold"
            >
              {loading ? '⏳ Checking...' : '🔍 Check Data'}
            </button>

            <button
              onClick={createTestStudent}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-semibold"
            >
              {loading ? '⏳ Creating...' : '➕ Create Test Student'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-semibold">❌ Error:</p>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
                <h2 className="text-xl font-bold text-[#003459] mb-4">📊 Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center shadow">
                    <div className="text-3xl font-bold text-blue-600">{result.summary?.total_students || 0}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow">
                    <div className="text-3xl font-bold text-green-600">{result.summary?.total_employers || 0}</div>
                    <div className="text-sm text-gray-600">Employers</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow">
                    <div className="text-3xl font-bold text-purple-600">{result.summary?.total_applications || 0}</div>
                    <div className="text-sm text-gray-600">Applications</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow">
                    <div className="text-3xl font-bold text-orange-600">{result.summary?.total_beta_applications || 0}</div>
                    <div className="text-sm text-gray-600">Beta Apps</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow">
                    <div className="text-3xl font-bold text-pink-600">{result.summary?.total_jobs || 0}</div>
                    <div className="text-sm text-gray-600">Jobs</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow">
                    <div className="text-3xl font-bold text-gray-600">{result.summary?.total_records || 0}</div>
                    <div className="text-sm text-gray-600">Total Records</div>
                  </div>
                </div>
              </div>

              {/* Status */}
              {result.summary?.total_records > 0 ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">✅</div>
                    <div>
                      <h3 className="text-xl font-bold text-green-900 mb-2">Data is Being Collected!</h3>
                      <p className="text-green-800 mb-4">
                        Your platform is successfully collecting and storing data in Supabase.
                      </p>
                      <div className="space-y-2 text-sm text-green-700">
                        <p>✓ Database connection: <strong>Working</strong></p>
                        <p>✓ Data storage: <strong>Active</strong></p>
                        <p>✓ Total records: <strong>{result.summary.total_records}</strong></p>
                      </div>
                      <button
                        onClick={() => onNavigate('admin-data-viewer')}
                        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        📊 View Full Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">⚠️</div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-900 mb-2">No Data Found</h3>
                      <p className="text-yellow-800 mb-4">
                        The database connection is working, but no user data has been collected yet.
                      </p>
                      <div className="space-y-2 text-sm text-yellow-700">
                        <p>• Click "Create Test Student" above to add sample data</p>
                        <p>• Or ask someone to sign up through the Student Signup page</p>
                        <p>• Then click "Check Data" again to verify</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Raw Keys */}
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-[#003459] mb-3">🔑 Database Keys ({result.raw_keys?.length || 0})</h3>
                <div className="max-h-96 overflow-auto bg-white rounded p-4 font-mono text-xs">
                  {result.raw_keys && result.raw_keys.length > 0 ? (
                    result.raw_keys.map((key: string, idx: number) => (
                      <div key={idx} className="py-1 px-2 hover:bg-gray-100 rounded">
                        {key}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No keys found</p>
                  )}
                </div>
              </div>

              {/* Recent Students */}
              {result.data?.students && result.data.students.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-[#003459] mb-3">👥 Recent Students</h3>
                  <div className="space-y-2">
                    {result.data.students.slice(0, 5).map((student: any, idx: number) => (
                      <div key={idx} className="bg-white rounded p-3 shadow-sm">
                        <div className="font-semibold text-[#003459]">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-sm text-gray-600">{student.email}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {student.school} • {student.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
