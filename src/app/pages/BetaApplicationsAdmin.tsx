import { useState, useEffect } from 'react';
import { Users, TrendingUp, CheckCircle, Clock, XCircle, Filter, Search, Download, Eye, Mail, Phone, MapPin, Calendar, Award, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import * as api from '@/utils/api';

interface BetaApplicationsAdminProps {
  onNavigate: (page: string) => void;
}

const statusColors = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  approved: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  waitlist: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  rejected: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
};

const typeIcons = {
  student: '🎓',
  employer: '💼',
  'career-services': '🏫',
  ada: '💜',
  'metgot-global': '🌏',
};

export function BetaApplicationsAdmin({ onNavigate }: BetaApplicationsAdminProps) {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch applications from backend
  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await api.getAllBetaApplications();
      console.log('Fetched beta applications:', result);
      setApplications(result.applications || []);
    } catch (err: any) {
      console.error('Error loading beta applications:', err);
      setError(err.message || 'Failed to load beta applications');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string, notes?: string) => {
    try {
      await api.updateBetaApplicationStatus(id, newStatus, notes);
      // Reload applications
      await loadApplications();
      setSelectedApplication(null);
      alert(`Application ${newStatus} successfully!`);
    } catch (err: any) {
      console.error('Failed to update application status:', err);
      alert(`Error: ${err.message || 'Failed to update application status'}`);
    }
  };

  // Filter applications - use real applications data
  const filteredApplications = applications.filter(app => {
    const matchesType = filterType === 'all' || app.type === filterType;
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      (app.fullName && app.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.email && app.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.country && app.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.state && app.state.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesStatus && matchesSearch;
  });

  // Calculate analytics - use real applications data
  const analytics = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    waitlist: applications.filter(a => a.status === 'waitlist').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    byType: {
      student: applications.filter(a => a.type === 'student').length,
      employer: applications.filter(a => a.type === 'employer').length,
      'career-services': applications.filter(a => a.type === 'career-services').length,
      ada: applications.filter(a => a.type === 'ada').length,
      'metgot-global': applications.filter(a => a.type === 'metgot-global').length
    },
    averageScore: applications.length > 0 ? Math.round(applications.reduce((sum, app) => sum + (app.score || 0), 0) / applications.length) : 0,
    approvalRate: applications.length > 0 ? Math.round((applications.filter(a => a.status === 'approved').length / applications.length) * 100) : 0
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <BackButton onNavigate={onNavigate} label="Back to Admin" />
        
        {/* Header */}
        <div className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Beta Tester Applications
          </h1>
          <p className="text-lg text-gray-600">
            Manage and review beta testing program applications
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-yellow-900 mb-2">Unable to Load Live Data</h3>
                <p className="text-yellow-800 mb-4">{error}</p>
                <div className="bg-white rounded-lg p-4 mb-4 border border-yellow-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Showing mock data for demo purposes.</strong> The server may still be initializing.
                  </p>
                  <p className="text-sm text-gray-600">
                    If you just submitted a beta application, click "Refresh" in a few seconds to see real data.
                  </p>
                </div>
                <button
                  onClick={loadApplications}
                  disabled={loading}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Refreshing...' : 'Try Again'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{analytics.total}</div>
            <div className="text-sm text-gray-500">Total Applications</div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-yellow-200">
            <Clock className="w-8 h-8 text-yellow-600 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{analytics.pending}</div>
            <div className="text-sm text-gray-500">Pending Review</div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-green-200">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{analytics.approved}</div>
            <div className="text-sm text-gray-500">Approved</div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <Award className="w-8 h-8 text-purple-600 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{analytics.averageScore}</div>
            <div className="text-sm text-gray-500">Avg. Score</div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <TrendingUp className="w-8 h-8 text-cyan-600 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{analytics.approvalRate}%</div>
            <div className="text-sm text-gray-500">Approval Rate</div>
          </div>
        </div>

        {/* By Type Breakdown */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
            <div className="text-3xl mb-2">🎓</div>
            <div className="text-2xl font-bold">{analytics.byType.student}</div>
            <div className="text-blue-100">Student Applications</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
            <div className="text-3xl mb-2">💼</div>
            <div className="text-2xl font-bold">{analytics.byType.employer}</div>
            <div className="text-purple-100">Employer Applications</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
            <div className="text-3xl mb-2">🏫</div>
            <div className="text-2xl font-bold">{analytics.byType['career-services']}</div>
            <div className="text-green-100">Career Services</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
            <div className="text-3xl mb-2">💜</div>
            <div className="text-2xl font-bold">{analytics.byType.ada}</div>
            <div className="text-purple-100">ADA Program</div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
            <div className="text-3xl mb-2">🌏</div>
            <div className="text-2xl font-bold">{analytics.byType['metgot-global']}</div>
            <div className="text-teal-100">Metgot Global (25+)</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, or location..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="lg:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="student">Students</option>
                <option value="employer">Employers</option>
                <option value="career-services">Career Services</option>
                <option value="ada">ADA Program</option>
                <option value="metgot-global">Metgot Global (25+)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="lg:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="waitlist">Waitlist</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Export Button */}
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          ) : (
            filteredApplications.map(app => {
              const statusStyle = statusColors[app.status as keyof typeof statusColors];
              
              return (
                <div
                  key={app.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Main Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                          {typeIcons[app.type as keyof typeof typeIcons]}
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{app.fullName || app.name || 'Unknown'}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
                              {app.type === 'career-services' ? 'Career Services' : 
                               app.type === 'metgot-global' ? 'Metgot Global (25+)' : 
                               app.type.charAt(0).toUpperCase() + app.type.slice(1)}
                            </span>
                          </div>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {app.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {app.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              {`${app.city || app.state || app.island || ''}, ${app.country || app.state || ''}`.replace(/^, |, $/g, '') || app.location || 'Unknown'}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : new Date(app.appliedDate || Date.now()).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Type-specific highlights */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {app.type === 'student' && (
                              <>
                                {app.education && (
                                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                    {app.education}
                                  </span>
                                )}
                                {app.major && (
                                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                                    {app.major}
                                  </span>
                                )}
                                {app.gpa && (
                                  <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                                    GPA: {app.gpa}
                                  </span>
                                )}
                              </>
                            )}

                            {app.type === 'employer' && (
                              <>
                                {app.companyName && (
                                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                                    {app.companyName}
                                  </span>
                                )}
                                {app.industry && (
                                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                    {app.industry}
                                  </span>
                                )}
                                {app.hiringVolume && (
                                  <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs">
                                    Hires: {app.hiringVolume}/year
                                  </span>
                                )}
                              </>
                            )}

                            {app.type === 'career-services' && (
                              <>
                                {app.institutionName && (
                                  <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                                    {app.institutionName}
                                  </span>
                                )}
                                {app.studentsServed && (
                                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                    Students: {app.studentsServed}
                                  </span>
                                )}
                              </>
                            )}

                            {app.type === 'ada' && app.disabilityType && (
                              app.disabilityType.map((type: string) => (
                                <span key={type} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                                  {type}
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Score & Actions */}
                    <div className="flex items-center gap-4">
                      {/* Score */}
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${
                          (app.score || 0) >= 85 ? 'text-green-600' :
                          (app.score || 0) >= 70 ? 'text-blue-600' :
                          (app.score || 0) >= 50 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {app.score || 0}
                        </div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>

                      {/* Actions */}
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
                      >
                        <Eye className="w-5 h-5" />
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedApplication.fullName || selectedApplication.name || 'Unknown'}</h2>
                  <p className="text-gray-600">{selectedApplication.email}</p>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                {/* Status & Score */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Application Status</div>
                    <div className={`text-lg font-bold ${statusColors[selectedApplication.status as keyof typeof statusColors].text}`}>
                      {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Applicant Score</div>
                    <div className="text-lg font-bold text-gray-900">{selectedApplication.score} / 100</div>
                  </div>
                </div>

                {/* Full Application Details */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Why They Want to Beta Test</h3>
                  <p className="text-gray-700 bg-blue-50 rounded-lg p-4">{selectedApplication.whyBetaTest}</p>
                </div>

                {/* Type-specific details would go here */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Application Details</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-600">Type:</span> <span className="font-semibold">{selectedApplication.type}</span></div>
                    <div><span className="text-gray-600">Age:</span> <span className="font-semibold">{selectedApplication.age}</span></div>
                    <div><span className="text-gray-600">Location:</span> <span className="font-semibold">{selectedApplication.location}</span></div>
                    <div><span className="text-gray-600">Applied:</span> <span className="font-semibold">{new Date(selectedApplication.appliedDate).toLocaleDateString()}</span></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid sm:grid-cols-3 gap-3 pt-4">
                  <button
                    onClick={() => handleUpdateStatus(selectedApplication.id, 'approved')}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedApplication.id, 'waitlist')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
                  >
                    → Waitlist
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedApplication.id, 'rejected')}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}