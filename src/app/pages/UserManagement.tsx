import { useState, useEffect } from 'react';
import { Users, Building2, GraduationCap, Search, Filter, Download, Eye, Mail, MapPin, Calendar, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import * as api from '@/utils/api';

interface UserManagementProps {
  onNavigate: (page: string) => void;
}

export function UserManagement({ onNavigate }: UserManagementProps) {
  const [activeTab, setActiveTab] = useState<'students' | 'employers'>('students');
  const [students, setStudents] = useState<any[]>([]);
  const [employers, setEmployers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [studentsData, employersData] = await Promise.all([
        api.getAllStudents(),
        api.getAllEmployersAdmin(),
      ]);
      
      setStudents(studentsData.students || []);
      setEmployers(employersData.employers || []);
    } catch (err: any) {
      console.error('Failed to load user data:', err);
      setError(err.message || 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const data = activeTab === 'students' ? filteredStudents : filteredEmployers;
    
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    // Create CSV content
    let csvContent = '';
    
    if (activeTab === 'students') {
      csvContent = 'Name,Email,School,Graduation Year,Location,Age,ID Verified,Plaid Verifications,Created At\n';
      data.forEach((student: any) => {
        const plaidCount = student.verificationStatus?.completedCount || 0;
        csvContent += `"${student.firstName} ${student.lastName}","${student.email}","${student.school}","${student.graduationYear}","${student.location}","${student.age}","${student.idVerified ? 'Yes' : 'No'}","${plaidCount}/3","${new Date(student.createdAt).toLocaleDateString()}"\n`;
      });
    } else {
      csvContent = 'Company Name,Email,Industry,Location,Plan,Subscription Active,Created At\n';
      data.forEach((employer: any) => {
        csvContent += `"${employer.companyName}","${employer.email}","${employer.industry}","${employer.location}","${employer.plan}","${employer.subscriptionActive ? 'Yes' : 'No'}","${new Date(employer.createdAt).toLocaleDateString()}"\n`;
      });
    }

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `zalpha_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter students
  const filteredStudents = students.filter((student) => {
    // Search filter
    const matchesSearch = 
      student.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.location?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Verified filter
    if (filterVerified === 'verified' && !student.idVerified) return false;
    if (filterVerified === 'unverified' && student.idVerified) return false;

    return true;
  });

  // Filter employers
  const filteredEmployers = employers.filter((employer) => {
    // Search filter
    const matchesSearch = 
      employer.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.location?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton onNavigate={onNavigate} destination="internal-dashboard" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
                <p className="text-slate-600">View and manage all registered users</p>
              </div>
            </div>
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-xl transition-all font-semibold shadow-lg"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-blue-100">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 px-6 py-4 font-bold text-lg transition-all ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-tl-2xl'
                  : 'text-slate-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Students ({filteredStudents.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('employers')}
              className={`flex-1 px-6 py-4 font-bold text-lg transition-all ${
                activeTab === 'employers'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-tr-2xl'
                  : 'text-slate-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-5 h-5" />
                Employers ({filteredEmployers.length})
              </div>
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Verified Filter (Students only) */}
              {activeTab === 'students' && (
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={filterVerified}
                    onChange={(e) => setFilterVerified(e.target.value as any)}
                    className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Students</option>
                    <option value="verified">Verified Only</option>
                    <option value="unverified">Unverified Only</option>
                  </select>
                </div>
              )}

              {/* Export Button */}
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all font-semibold shadow-lg"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-blue-100">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-600 text-lg">Loading user data...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="font-bold text-red-900">Error Loading Data</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Students Table */}
        {!loading && !error && activeTab === 'students' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-100">
            {filteredStudents.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Students Found</h3>
                <p className="text-slate-600">
                  {searchQuery || filterVerified !== 'all'
                    ? 'Try adjusting your filters'
                    : 'No students have registered yet'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Name</th>
                      <th className="px-6 py-4 text-left font-bold">Email</th>
                      <th className="px-6 py-4 text-left font-bold">School</th>
                      <th className="px-6 py-4 text-left font-bold">Grad Year</th>
                      <th className="px-6 py-4 text-left font-bold">Location</th>
                      <th className="px-6 py-4 text-left font-bold">Age</th>
                      <th className="px-6 py-4 text-left font-bold">ID Verified</th>
                      <th className="px-6 py-4 text-left font-bold">Plaid</th>
                      <th className="px-6 py-4 text-left font-bold">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents.map((student, index) => (
                      <tr key={student.id || index} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900">
                            {student.firstName} {student.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4" />
                            {student.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-900">{student.school}</td>
                        <td className="px-6 py-4 text-slate-900">{student.graduationYear}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="w-4 h-4" />
                            {student.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-900">{student.age}</td>
                        <td className="px-6 py-4">
                          {student.idVerified ? (
                            <span className="flex items-center gap-1 text-green-600 font-semibold">
                              <CheckCircle className="w-4 h-4" />
                              Yes
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-600 font-semibold">
                              <XCircle className="w-4 h-4" />
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {student.verificationStatus?.completedCount ? (
                            <span className="flex items-center gap-1 text-blue-600 font-semibold">
                              <CheckCircle className="w-4 h-4" />
                              {student.verificationStatus.completedCount}/3
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">
                              Not verified
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(student.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Employers Table */}
        {!loading && !error && activeTab === 'employers' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-purple-100">
            {filteredEmployers.length === 0 ? (
              <div className="p-12 text-center">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Employers Found</h3>
                <p className="text-slate-600">
                  {searchQuery
                    ? 'Try adjusting your search'
                    : 'No employers have registered yet'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Company Name</th>
                      <th className="px-6 py-4 text-left font-bold">Email</th>
                      <th className="px-6 py-4 text-left font-bold">Industry</th>
                      <th className="px-6 py-4 text-left font-bold">Location</th>
                      <th className="px-6 py-4 text-left font-bold">Plan</th>
                      <th className="px-6 py-4 text-left font-bold">Active</th>
                      <th className="px-6 py-4 text-left font-bold">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEmployers.map((employer, index) => (
                      <tr key={employer.id || index} className="hover:bg-purple-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900">{employer.companyName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4" />
                            {employer.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-900 capitalize">{employer.industry}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="w-4 h-4" />
                            {employer.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold capitalize">
                            {employer.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {employer.subscriptionActive ? (
                            <span className="flex items-center gap-1 text-green-600 font-semibold">
                              <CheckCircle className="w-4 h-4" />
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-600 font-semibold">
                              <XCircle className="w-4 h-4" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(employer.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
