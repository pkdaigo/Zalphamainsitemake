import { useState } from 'react';
import { GraduationCap, Users, TrendingUp, DollarSign, Calendar, Award, Target, ArrowRight, Building2, MapPin, Mail, Phone, Settings, FileText, BarChart3, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface SchoolDashboardProps {
  onNavigate: (page: string) => void;
}

export function SchoolDashboard({ onNavigate }: SchoolDashboardProps) {
  const [schoolName] = useState('University of Guam');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Mock data - in real app, this would come from API
  const stats = {
    totalStudents: 324,
    activeApplications: 89,
    placementRate: 67,
    revenueThisMonth: 1245.50,
    revenueThisYear: 12890.75,
    topEmployers: [
      { name: 'Pacific Islands Club', hires: 12 },
      { name: 'Hyatt Regency Guam', hires: 8 },
      { name: 'IT&E', hires: 7 },
      { name: 'Bank of Guam', hires: 6 },
      { name: 'Guam Memorial Hospital', hires: 5 }
    ],
    recentPlacements: [
      { student: 'Maria Santos', employer: 'Pacific Islands Club', position: 'Front Desk Associate', date: '2026-01-28' },
      { student: 'John Camacho', employer: 'Bank of Guam', position: 'Bank Teller', date: '2026-01-26' },
      { student: 'Sarah Johnson', employer: 'Hyatt Regency Guam', position: 'Restaurant Server', date: '2026-01-25' },
      { student: 'Michael Cruz', employer: 'IT&E', position: 'Customer Service Rep', date: '2026-01-23' }
    ]
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Home" />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900">{schoolName}</h1>
                <p className="text-gray-600">Educational Partner Dashboard</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigate('school-revenue-dashboard')}
                className="px-5 py-2 bg-white border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 transition-colors font-semibold flex items-center gap-2"
              >
                <DollarSign className="w-5 h-5" />
                Revenue Details
              </button>
              <button
                onClick={() => alert('Settings page')}
                className="px-5 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </div>
          </div>

          {/* School Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span>Mangilao, Guam</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span>career.services@uog.edu</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span>(671) 735-2000</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">Active Partner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
          <div className="flex gap-2 bg-white rounded-xl p-1 shadow-md border-2 border-gray-200">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                timeRange === 'week'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                timeRange === 'month'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                timeRange === 'year'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              This Year
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Total Students */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10" />
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                +12% ↑
              </div>
            </div>
            <div className="text-4xl font-black mb-1">{stats.totalStudents}</div>
            <div className="text-blue-100 font-semibold">Active Students</div>
          </div>

          {/* Active Applications */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-10 h-10" />
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                +23% ↑
              </div>
            </div>
            <div className="text-4xl font-black mb-1">{stats.activeApplications}</div>
            <div className="text-purple-100 font-semibold">Job Applications</div>
          </div>

          {/* Placement Rate */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-10 h-10" />
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                +5% ↑
              </div>
            </div>
            <div className="text-4xl font-black mb-1">{stats.placementRate}%</div>
            <div className="text-green-100 font-semibold">Placement Rate</div>
          </div>

          {/* Revenue */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10" />
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                +18% ↑
              </div>
            </div>
            <div className="text-4xl font-black mb-1">
              ${timeRange === 'year' ? stats.revenueThisYear.toFixed(2) : stats.revenueThisMonth.toFixed(2)}
            </div>
            <div className="text-orange-100 font-semibold">Revenue {timeRange === 'year' ? '(Year)' : '(Month)'}</div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Employers */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-blue-600" />
                Top Hiring Employers
              </h3>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {stats.topEmployers.map((employer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <span className="font-semibold text-gray-900">{employer.name}</span>
                  </div>
                  <div className="px-3 py-1 bg-blue-600 text-white rounded-full font-bold text-sm">
                    {employer.hires} hires
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Placements */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-6 h-6 text-green-600" />
                Recent Student Placements
              </h3>
              <button className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {stats.recentPlacements.map((placement, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{placement.student}</p>
                      <p className="text-sm text-gray-600">{placement.position}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{placement.employer}</span>
                    <span className="text-gray-500">{new Date(placement.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate('school-revenue-dashboard')}
              className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 rounded-xl border-2 border-purple-200 transition-all group"
            >
              <DollarSign className="w-8 h-8 text-purple-600 mb-3" />
              <p className="font-bold text-gray-900 mb-1">Revenue Analytics</p>
              <p className="text-sm text-gray-600">View detailed earnings</p>
            </button>

            <button
              onClick={() => onNavigate('transaction-tracker')}
              className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-xl border-2 border-blue-200 transition-all group"
            >
              <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
              <p className="font-bold text-gray-900 mb-1">Transaction History</p>
              <p className="text-sm text-gray-600">View all transactions</p>
            </button>

            <button
              onClick={() => onNavigate('payout-system')}
              className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl border-2 border-green-200 transition-all group"
            >
              <Calendar className="w-8 h-8 text-green-600 mb-3" />
              <p className="font-bold text-gray-900 mb-1">Payouts</p>
              <p className="text-sm text-gray-600">Manage disbursements</p>
            </button>

            <button
              onClick={() => alert('Download report feature')}
              className="p-6 bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-xl border-2 border-orange-200 transition-all group"
            >
              <Download className="w-8 h-8 text-orange-600 mb-3" />
              <p className="font-bold text-gray-900 mb-1">Download Report</p>
              <p className="text-sm text-gray-600">Export analytics</p>
            </button>
          </div>
        </div>

        {/* Announcements & Updates */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-200">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Platform Updates & Announcements</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-gray-900">🎉 New Feature: Verified References</p>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Students can now add verified references from teachers, community leaders, and peers. This helps your graduates stand out to employers!
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-gray-900">💰 Commission Rate Increase</p>
                    <span className="text-xs text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Your revenue share has been increased from 3% to 5% for all premium student subscriptions. Updated rates effective immediately!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Need Help or Have Questions?</h3>
          <p className="text-purple-100 mb-6">
            Our dedicated school partnership team is here to support you 24/7
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:schools@zalpharecruit.com"
              className="px-8 py-3 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-colors font-bold flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              schools@zalpharecruit.com
            </a>
            <a 
              href="tel:+16702863010"
              className="px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl transition-colors font-bold flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              670-286-3010
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}