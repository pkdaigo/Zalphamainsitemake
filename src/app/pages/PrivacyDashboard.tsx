import { useState } from 'react';
import { Shield, Eye, EyeOff, Download, Trash2, FileText, Lock, Users, History, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface PrivacyDashboardProps {
  onNavigate: (page: string) => void;
}

interface PrivacySettings {
  directoryInfoVisible: boolean;
  thirdPartySharing: boolean;
  employerMessaging: boolean;
  profilePublic: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showAddress: boolean;
}

interface AccessLog {
  id: string;
  accessor: string;
  accessorType: 'employer' | 'admin' | 'system' | 'educational_partner';
  action: string;
  timestamp: string;
  dataAccessed: string[];
  purpose: string;
}

export function PrivacyDashboard({ onNavigate }: PrivacyDashboardProps) {
  const [activeTab, setActiveTab] = useState<'settings' | 'access-logs' | 'data-export' | 'rights'>('settings');
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    directoryInfoVisible: true,
    thirdPartySharing: false,
    employerMessaging: true,
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    showAddress: false,
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'ready'>('idle');
  const [deleteConfirm, setDeleteConfirm] = useState('');

  // Mock access logs - in production, this would come from the backend
  const accessLogs: AccessLog[] = [
    {
      id: '1',
      accessor: 'Pacific Airlines HR',
      accessorType: 'employer',
      action: 'Viewed profile',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      dataAccessed: ['Name', 'School', 'Skills', 'Resume'],
      purpose: 'Job application review for Flight Attendant position'
    },
    {
      id: '2',
      accessor: 'University of Guam',
      accessorType: 'educational_partner',
      action: 'Accessed education records',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      dataAccessed: ['Transcripts', 'GPA', 'Course History'],
      purpose: 'Scholarship application review'
    },
    {
      id: '3',
      accessor: 'ZALPHA System',
      accessorType: 'system',
      action: 'Profile sync',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      dataAccessed: ['All profile data'],
      purpose: 'Automated backup and sync'
    },
    {
      id: '4',
      accessor: 'ZALPHA Admin (Support Ticket #1234)',
      accessorType: 'admin',
      action: 'Viewed profile for support',
      timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      dataAccessed: ['Contact info', 'Account settings'],
      purpose: 'Resolved technical issue with profile upload'
    },
  ];

  const handleSaveSettings = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('ferpa_privacy_settings', JSON.stringify(privacySettings));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const handleExportData = () => {
    setExportStatus('exporting');
    // Simulate data export
    setTimeout(() => {
      const exportData = {
        exportDate: new Date().toISOString(),
        studentData: {
          profile: '...',
          applications: '...',
          messages: '...',
          accessLogs: accessLogs,
        },
        privacySettings: privacySettings,
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ZALPHA_data_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportStatus('ready');
      setTimeout(() => setExportStatus('idle'), 3000);
    }, 2000);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm === 'DELETE MY ACCOUNT') {
      alert('Account deletion requested. You will receive a confirmation email within 24 hours.');
      setDeleteConfirm('');
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Less than 1 hour ago';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-slate-50 to-blue-50 py-6 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">Privacy Dashboard</h1>
              <p className="text-slate-600">Manage your FERPA rights and privacy settings</p>
            </div>
            <BackButton
              onClick={() => onNavigate('student-profile')}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-all"
            >
              ← Back to Profile
            </BackButton>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="flex border-b-2 border-slate-200">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Lock className="w-5 h-5 inline mr-2" />
              Privacy Settings
            </button>
            <button
              onClick={() => setActiveTab('access-logs')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'access-logs'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <History className="w-5 h-5 inline mr-2" />
              Access Logs
            </button>
            <button
              onClick={() => setActiveTab('data-export')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'data-export'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Download className="w-5 h-5 inline mr-2" />
              Data Export
            </button>
            <button
              onClick={() => setActiveTab('rights')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'rights'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Your Rights
            </button>
          </div>
        </div>

        {/* Privacy Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Directory Information Settings</h2>
              <p className="text-slate-600 mb-6">
                Control what information is visible to employers and educational partners. Changes take effect immediately.
              </p>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-2">Directory Information Visible</h3>
                      <p className="text-sm text-slate-600 mb-3">
                        Allow your basic information (name, school, graduation year, major) to appear in employer searches and directory listings.
                      </p>
                      <div className="text-xs bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <strong>If disabled:</strong> Your profile will be completely hidden from searches. Employers cannot find you unless you apply to their jobs.
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={privacySettings.directoryInfoVisible}
                        onChange={(e) => setPrivacySettings({ ...privacySettings, directoryInfoVisible: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-2">Third-Party Educational Sharing</h3>
                      <p className="text-sm text-slate-600 mb-3">
                        Allow ZALPHA to share your education records with verified universities, scholarship programs, and government education agencies.
                      </p>
                      <div className="text-xs bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <strong>Partners:</strong> Pacific Islands universities, scholarship foundations, and government education programs only
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={privacySettings.thirdPartySharing}
                        onChange={(e) => setPrivacySettings({ ...privacySettings, thirdPartySharing: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-2">Employer Direct Messaging</h3>
                      <p className="text-sm text-slate-600">
                        Allow employers to send you direct messages about job opportunities (even if you haven't applied).
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={privacySettings.employerMessaging}
                        onChange={(e) => setPrivacySettings({ ...privacySettings, employerMessaging: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information Visibility</h2>
              <p className="text-slate-600 mb-6">
                Choose which contact details are visible on your public profile. These settings only apply when Directory Information is enabled.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <div className="flex items-center gap-3">
                    {privacySettings.showEmail ? <Eye className="w-5 h-5 text-blue-600" /> : <EyeOff className="w-5 h-5 text-slate-400" />}
                    <span className="font-semibold text-slate-900">Email Address</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.showEmail}
                      onChange={(e) => setPrivacySettings({ ...privacySettings, showEmail: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <div className="flex items-center gap-3">
                    {privacySettings.showPhone ? <Eye className="w-5 h-5 text-blue-600" /> : <EyeOff className="w-5 h-5 text-slate-400" />}
                    <span className="font-semibold text-slate-900">Phone Number</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.showPhone}
                      onChange={(e) => setPrivacySettings({ ...privacySettings, showPhone: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <div className="flex items-center gap-3">
                    {privacySettings.showAddress ? <Eye className="w-5 h-5 text-blue-600" /> : <EyeOff className="w-5 h-5 text-slate-400" />}
                    <span className="font-semibold text-slate-900">Physical Address</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.showAddress}
                      onChange={(e) => setPrivacySettings({ ...privacySettings, showAddress: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSaveSettings}
                disabled={saveStatus === 'saving'}
                className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all ${
                  saveStatus === 'saved'
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'
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
                ) : (
                  <>
                    <Lock className="w-6 h-6" />
                    Save Privacy Settings
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Access Logs Tab */}
        {activeTab === 'access-logs' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Education Records Access Log</h2>
            <p className="text-slate-600 mb-6">
              FERPA requires us to maintain a record of all parties who have accessed your education records. This log shows who accessed your data, when, and for what purpose.
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-700">
                  <strong>Note:</strong> This log excludes access by you (the student) and routine system operations like backups. All access is logged for at least 5 years as required by FERPA.
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {accessLogs.map((log) => (
                <div key={log.id} className="border-2 border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        log.accessorType === 'employer' ? 'bg-purple-100' :
                        log.accessorType === 'educational_partner' ? 'bg-green-100' :
                        log.accessorType === 'admin' ? 'bg-amber-100' :
                        'bg-slate-100'
                      }`}>
                        {log.accessorType === 'employer' ? <Users className="w-6 h-6 text-purple-600" /> :
                         log.accessorType === 'educational_partner' ? <FileText className="w-6 h-6 text-green-600" /> :
                         log.accessorType === 'admin' ? <Shield className="w-6 h-6 text-amber-600" /> :
                         <Lock className="w-6 h-6 text-slate-600" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{log.accessor}</h3>
                        <p className="text-sm text-slate-600">{log.action}</p>
                        <p className="text-xs text-slate-500 mt-1">{formatTimestamp(log.timestamp)}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      log.accessorType === 'employer' ? 'bg-purple-100 text-purple-700' :
                      log.accessorType === 'educational_partner' ? 'bg-green-100 text-green-700' :
                      log.accessorType === 'admin' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {log.accessorType.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4 mb-3">
                    <h4 className="text-xs font-bold text-slate-700 mb-2">Data Accessed:</h4>
                    <div className="flex flex-wrap gap-2">
                      {log.dataAccessed.map((data, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-700">
                          {data}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <h4 className="text-xs font-bold text-slate-700 mb-1">Purpose:</h4>
                    <p className="text-sm text-slate-600">{log.purpose}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-all">
                Download Full Access Log (CSV)
              </button>
            </div>
          </div>
        )}

        {/* Data Export Tab */}
        {activeTab === 'data-export' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Export Your Data</h2>
              <p className="text-slate-600 mb-6">
                Under FERPA, you have the right to inspect and review all education records we maintain about you. Export a complete copy of your data in machine-readable format.
              </p>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-slate-900 mb-3">Your export will include:</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Complete profile information and education records
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    All job applications and employment history
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Message history with employers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Skills assessments and certifications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Access logs showing who viewed your records
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Privacy settings and consent history
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleExportData}
                  disabled={exportStatus === 'exporting'}
                  className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all ${
                    exportStatus === 'ready'
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'
                  }`}
                >
                  {exportStatus === 'exporting' ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      Preparing Export...
                    </>
                  ) : exportStatus === 'ready' ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Download Complete!
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      Export All My Data
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-bold text-slate-900">Delete My Account</h2>
              </div>
              
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-900 mb-2">⚠️ Warning: This action cannot be undone</h3>
                    <p className="text-sm text-red-800">
                      Deleting your account will permanently remove all your education records, job applications, messages, and profile information from ZALPHA. This process is irreversible.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-red-200">
                  <h4 className="font-bold text-slate-900 mb-2 text-sm">What will be deleted:</h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• Your entire profile and education records</li>
                    <li>• All job applications and application history</li>
                    <li>• Message history with employers</li>
                    <li>• Skills assessments and test results</li>
                    <li>• Uploaded documents (résumés, transcripts, etc.)</li>
                  </ul>
                  <p className="text-xs text-slate-600 mt-3">
                    <strong>Note:</strong> We may retain certain information for legal compliance purposes (e.g., transaction records) for up to 7 years as required by law.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Type "DELETE MY ACCOUNT" to confirm:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    placeholder="DELETE MY ACCOUNT"
                    className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirm !== 'DELETE MY ACCOUNT'}
                  className="w-full px-6 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-6 h-6" />
                  Permanently Delete My Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Your Rights Tab */}
        {activeTab === 'rights' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your FERPA Rights</h2>
            <p className="text-slate-600 mb-6">
              The Family Educational Rights and Privacy Act (FERPA) gives you specific rights regarding your education records maintained by ZALPHA.
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  1. Right to Inspect and Review
                </h3>
                <p className="text-sm text-slate-700 mb-3">
                  You have the right to inspect and review all education records that ZALPHA maintains about you within 45 days of your request.
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm">
                  Request Records Review
                </button>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  2. Right to Request Amendment
                </h3>
                <p className="text-sm text-slate-700 mb-3">
                  If you believe any education record is inaccurate, misleading, or violates your privacy, you can request that ZALPHA amend the record.
                </p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-sm">
                  Request Amendment
                </button>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-600" />
                  3. Right to Consent to Disclosures
                </h3>
                <p className="text-sm text-slate-700 mb-3">
                  You control when your education records are disclosed to third parties. Manage these settings in the Privacy Settings tab.
                </p>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all text-sm"
                >
                  Manage Disclosure Settings
                </button>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  4. Right to File a Complaint
                </h3>
                <p className="text-sm text-slate-700 mb-3">
                  If you believe ZALPHA has violated your FERPA rights, you have the right to file a complaint with:
                </p>
                <div className="bg-white rounded-lg p-4 border border-amber-200 text-sm text-slate-700">
                  <strong>Family Policy Compliance Office</strong><br />
                  U.S. Department of Education<br />
                  400 Maryland Avenue, SW<br />
                  Washington, DC 20202-5920<br />
                  <a href="https://www2.ed.gov/policy/gen/guid/fpco/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    www.ed.gov/fpco
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">Annual Notification</h3>
                <p className="text-sm text-slate-700 mb-2">
                  ZALPHA is required to notify you annually of your FERPA rights. By maintaining an active account, you acknowledge receipt of this notification.
                </p>
                <p className="text-xs text-slate-600">
                  Last notification sent: {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">Questions or Concerns?</h3>
                <p className="text-sm text-slate-700 mb-3">
                  If you have questions about your FERPA rights or privacy concerns, contact our Privacy Officer:
                </p>
                <div className="text-sm text-slate-700">
                  📧 Email: privacy@zalpharecruit.com<br />
                  📞 Phone: 670-286-3010<br />
                  ⏰ Hours: Monday-Friday, 8am-5pm Pacific Time
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}