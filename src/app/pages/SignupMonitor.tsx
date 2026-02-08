import { useState, useEffect } from 'react';
import { Users, Building2, RefreshCw, Calendar, MapPin, GraduationCap, Briefcase, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface SignupMonitorProps {
  onNavigate: (page: string) => void;
}

export function SignupMonitor({ onNavigate }: SignupMonitorProps) {
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulated data - In production, this would fetch from your backend
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalEmployers: 0,
    todayStudents: 0,
    todayEmployers: 0,
    last24Hours: 0,
  });

  const [recentStudentSignups, setRecentStudentSignups] = useState<any[]>([]);
  const [recentEmployerSignups, setRecentEmployerSignups] = useState<any[]>([]);

  const fetchSignupData = async () => {
    setLoading(true);
    try {
      // In production, you would call your backend API here
      // const students = await api.getAllStudents();
      // const employers = await api.getAllEmployersAdmin();
      
      // For now, showing the structure of what would be displayed
      console.log('Fetching signup data from Supabase KV store...');
      
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error fetching signup data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignupData();
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchSignupData();
      }, 30000); // Refresh every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BackButton onNavigate={onNavigate} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">
                📊 Signup Monitor
              </h1>
              <p className="text-gray-600 text-lg">
                Real-time beta tester registration tracking
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                Last updated: {formatTime(lastRefresh)}
              </div>
              
              <button
                onClick={fetchSignupData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  autoRefresh 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {autoRefresh ? '🟢 Auto-Refresh ON' : '⭕ Auto-Refresh OFF'}
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>📌 How to use:</strong> This page shows all beta tester signups in real-time. 
              Data is pulled from the Supabase KV store every 30 seconds when auto-refresh is enabled. 
              You can manually refresh at any time to see the latest signups.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-black text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-cyan-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Employers</p>
                <p className="text-2xl font-black text-gray-900">{stats.totalEmployers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today (Students)</p>
                <p className="text-2xl font-black text-gray-900">{stats.todayStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today (Employers)</p>
                <p className="text-2xl font-black text-gray-900">{stats.todayEmployers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Last 24 Hours</p>
                <p className="text-2xl font-black text-gray-900">{stats.last24Hours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Student Signups */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">Recent Student Signups</h2>
            </div>

            {recentStudentSignups.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No student signups yet today</p>
                <p className="text-sm text-gray-400 mt-2">
                  Data will appear here as students register
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentStudentSignups.map((student, index) => (
                  <div 
                    key={index}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{student.firstName} {student.lastName}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <GraduationCap className="w-4 h-4" />
                        {student.school}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {student.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        Grad: {student.graduationYear}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {new Date(student.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Employer Signups */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">Recent Employer Signups</h2>
            </div>

            {recentEmployerSignups.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No employer signups yet today</p>
                <p className="text-sm text-gray-400 mt-2">
                  Data will appear here as employers register
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentEmployerSignups.map((employer, index) => (
                  <div 
                    key={index}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-cyan-400 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{employer.companyName}</p>
                        <p className="text-sm text-gray-600">{employer.email}</p>
                      </div>
                      <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        {employer.plan}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        {employer.industry}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {employer.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        Trial: {employer.trialEndDate ? new Date(employer.trialEndDate).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {new Date(employer.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions for viewing actual data */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <h3 className="text-xl font-black text-yellow-900 mb-3">
            🔧 To View Real Signup Data:
          </h3>
          <div className="space-y-2 text-sm text-yellow-900">
            <p>
              <strong>1. Check Supabase Dashboard:</strong> Log into your Supabase project and navigate to the Authentication tab to see all registered users.
            </p>
            <p>
              <strong>2. Query KV Store:</strong> Use the Supabase SQL Editor to query the KV store table:
            </p>
            <pre className="bg-yellow-100 p-3 rounded mt-2 text-xs overflow-x-auto">
{`-- Get all students
SELECT * FROM kv_store_9bd83859 WHERE key LIKE 'student:%';

-- Get all employers
SELECT * FROM kv_store_9bd83859 WHERE key LIKE 'employer:%';

-- Get today's signups (students)
SELECT * FROM kv_store_9bd83859 
WHERE key LIKE 'student:%' 
AND (value->>'createdAt')::timestamp >= CURRENT_DATE;`}
            </pre>
            <p>
              <strong>3. Connect this page to backend:</strong> Uncomment the API calls in the <code>fetchSignupData()</code> function and create corresponding backend endpoints to retrieve signup data from the KV store.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
