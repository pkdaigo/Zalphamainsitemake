import React, { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface DataSummary {
  total_students: number;
  total_employers: number;
  total_applications: number;
  total_beta_applications: number;
  total_jobs: number;
  total_records: number;
}

interface AllData {
  summary: DataSummary;
  data: {
    students: any[];
    employers: any[];
    applications: any[];
    beta_applications: any[];
    jobs: any[];
  };
  raw_keys: string[];
  raw_data: Array<{ key: string; value: any }>;
}

interface AdminDataViewerProps {
  onNavigate?: (page: string) => void;
}

export function AdminDataViewer({ onNavigate }: AdminDataViewerProps) {
  const [allData, setAllData] = useState<AllData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'students' | 'employers' | 'applications' | 'beta' | 'jobs' | 'raw'>('summary');

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/admin/view-all-data`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();
      setAllData(result);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    // Get all unique keys from all objects
    const allKeys = Array.from(new Set(data.flatMap(obj => Object.keys(obj))));
    
    // Create CSV header
    const header = allKeys.join(',');
    
    // Create CSV rows
    const rows = data.map(obj => {
      return allKeys.map(key => {
        const value = obj[key];
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value).replace(/"/g, '""');
        return String(value).replace(/"/g, '""');
      }).map(v => `"${v}"`).join(',');
    });
    
    const csv = [header, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading && !allData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003459] to-[#00171F] flex items-center justify-center">
        <div className="text-white text-xl">Loading your data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003459] to-[#00171F] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={fetchAllData}
            className="px-6 py-2 bg-[#007EA7] text-white rounded-lg hover:bg-[#00A8E8] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!allData) return null;

  const tabs = [
    { id: 'summary', label: 'Summary', count: allData.summary.total_records },
    { id: 'students', label: 'Students', count: allData.summary.total_students },
    { id: 'employers', label: 'Employers', count: allData.summary.total_employers },
    { id: 'applications', label: 'Applications', count: allData.summary.total_applications },
    { id: 'beta', label: 'Beta Testers', count: allData.summary.total_beta_applications },
    { id: 'jobs', label: 'Jobs', count: allData.summary.total_jobs },
    { id: 'raw', label: 'Raw Data', count: allData.raw_data.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003459] to-[#00171F] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#003459] mb-2">📊 ZALPHA Data Dashboard</h1>
              <p className="text-gray-600">All collected data from your platform</p>
            </div>
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="px-6 py-3 bg-[#007EA7] text-white rounded-lg hover:bg-[#00A8E8] transition-colors disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : '🔄 Refresh Data'}
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <div className="text-3xl font-bold">{allData.summary.total_students}</div>
              <div className="text-sm opacity-90">Students</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
              <div className="text-3xl font-bold">{allData.summary.total_employers}</div>
              <div className="text-sm opacity-90">Employers</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="text-3xl font-bold">{allData.summary.total_applications}</div>
              <div className="text-sm opacity-90">Applications</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
              <div className="text-3xl font-bold">{allData.summary.total_beta_applications}</div>
              <div className="text-sm opacity-90">Beta Testers</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-4 text-white">
              <div className="text-3xl font-bold">{allData.summary.total_jobs}</div>
              <div className="text-sm opacity-90">Jobs</div>
            </div>
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg p-4 text-white">
              <div className="text-3xl font-bold">{allData.summary.total_records}</div>
              <div className="text-sm opacity-90">Total Records</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#007EA7] text-white border-b-4 border-[#00A8E8]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label} <span className="ml-2 text-sm opacity-75">({tab.count})</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Summary Tab */}
            {activeTab === 'summary' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#003459] mb-4">Data Summary</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(allData.summary, null, 2)}
                  </pre>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-[#003459] mb-3">All Keys in Database</h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
                    {allData.raw_keys.map((key, idx) => (
                      <div key={idx} className="py-1 px-2 hover:bg-gray-200 rounded font-mono text-sm">
                        {key}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#003459]">Students ({allData.data.students.length})</h2>
                  <div className="space-x-2">
                    <button
                      onClick={() => downloadJSON(allData.data.students, 'students.json')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      📥 Download JSON
                    </button>
                    <button
                      onClick={() => downloadCSV(allData.data.students, 'students.csv')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      📊 Download CSV
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[600px] overflow-auto">
                  <pre className="text-xs">
                    {JSON.stringify(allData.data.students, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Employers Tab */}
            {activeTab === 'employers' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#003459]">Employers ({allData.data.employers.length})</h2>
                  <div className="space-x-2">
                    <button
                      onClick={() => downloadJSON(allData.data.employers, 'employers.json')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      📥 Download JSON
                    </button>
                    <button
                      onClick={() => downloadCSV(allData.data.employers, 'employers.csv')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      📊 Download CSV
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[600px] overflow-auto">
                  <pre className="text-xs">
                    {JSON.stringify(allData.data.employers, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#003459]">Applications ({allData.data.applications.length})</h2>
                  <div className="space-x-2">
                    <button
                      onClick={() => downloadJSON(allData.data.applications, 'applications.json')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      📥 Download JSON
                    </button>
                    <button
                      onClick={() => downloadCSV(allData.data.applications, 'applications.csv')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      📊 Download CSV
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[600px] overflow-auto">
                  <pre className="text-xs">
                    {JSON.stringify(allData.data.applications, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Beta Testers Tab */}
            {activeTab === 'beta' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#003459]">Beta Applications ({allData.data.beta_applications.length})</h2>
                  <div className="space-x-2">
                    <button
                      onClick={() => downloadJSON(allData.data.beta_applications, 'beta_applications.json')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      📥 Download JSON
                    </button>
                    <button
                      onClick={() => downloadCSV(allData.data.beta_applications, 'beta_applications.csv')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      📊 Download CSV
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[600px] overflow-auto">
                  <pre className="text-xs">
                    {JSON.stringify(allData.data.beta_applications, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#003459]">Job Postings ({allData.data.jobs.length})</h2>
                  <div className="space-x-2">
                    <button
                      onClick={() => downloadJSON(allData.data.jobs, 'jobs.json')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      📥 Download JSON
                    </button>
                    <button
                      onClick={() => downloadCSV(allData.data.jobs, 'jobs.csv')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      📊 Download CSV
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[600px] overflow-auto">
                  <pre className="text-xs">
                    {JSON.stringify(allData.data.jobs, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Raw Data Tab */}
            {activeTab === 'raw' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#003459]">Raw Database Records ({allData.raw_data.length})</h2>
                  <div className="space-x-2">
                    <button
                      onClick={() => downloadJSON(allData.raw_data, 'raw_data.json')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      📥 Download JSON
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[600px] overflow-auto">
                  <pre className="text-xs">
                    {JSON.stringify(allData.raw_data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}