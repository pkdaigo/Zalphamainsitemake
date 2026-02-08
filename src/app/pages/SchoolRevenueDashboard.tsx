import { useState } from 'react';
import { TrendingUp, DollarSign, Users, Calendar, Award, Download, CreditCard, AlertCircle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { schoolRevenueService, formatRevenue, School, SchoolPayout } from '@/utils/schoolRevenueShare';

interface SchoolRevenueDashboardProps {
  schoolId: string;
  onNavigate: () => void;
}

export function SchoolRevenueDashboard({ schoolId, onNavigate }: SchoolRevenueDashboardProps) {
  // Mock school data - In production, fetch from API
  const [school] = useState<School>({
    id: schoolId,
    name: 'University of Guam',
    type: 'university',
    location: {
      city: 'Mangilao',
      territory: 'Guam',
    },
    contactInfo: {
      adminName: 'Dr. Thomas Krise',
      adminEmail: 'admin@uog.edu',
      phone: '(671) 735-2990',
      address: '303 University Drive, Mangilao, GU 96923',
    },
    verified: true,
    registrationDate: new Date('2024-01-15'),
    revenueShare: {
      enabled: true,
      percentage: 0.005, // 0.5%
      minimumPayout: 50,
      payoutMethod: 'bank_transfer',
      payoutSchedule: 'monthly',
      bankInfo: {
        accountName: 'University of Guam',
        accountNumber: '****7890',
        routingNumber: '321**9876',
        bankName: 'Bank of Guam',
      },
    },
    stats: {
      totalStudents: 3200,
      activeStudents: 450,
      graduatedStudents: 45,
      totalRevenue: 185.50,
      lifetimeRevenue: 1245.75,
      lastPayoutDate: new Date('2024-12-31'),
      nextPayoutDate: new Date('2025-01-31'),
    },
  });

  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  // Mock analytics data
  const analytics = {
    currentPeriod: {
      revenue: 185.50,
      transactions: 15,
      students: 8,
      avgPerStudent: 23.19,
    },
    previousPeriod: {
      revenue: 142.30,
      transactions: 12,
      students: 6,
      avgPerStudent: 23.72,
    },
    topStudents: [
      { name: 'Maria Santos', transactions: 5, revenue: 45.50 },
      { name: 'John Dela Cruz', transactions: 3, revenue: 32.00 },
      { name: 'David Chen', transactions: 2, revenue: 28.75 },
      { name: 'Sarah Johnson', transactions: 2, revenue: 25.50 },
      { name: 'Michael Perez', transactions: 3, revenue: 22.25 },
    ],
    byTransactionType: [
      { type: 'Subscriptions', count: 6, revenue: 75.00 },
      { type: 'Job Posts', count: 4, revenue: 40.00 },
      { type: 'Internship Posts', count: 3, revenue: 35.50 },
      { type: 'Premium Features', count: 1, revenue: 25.00 },
      { type: 'Freelance', count: 1, revenue: 10.00 },
    ],
    monthlyTrend: [
      { month: 'Aug', revenue: 95.25 },
      { month: 'Sep', revenue: 112.50 },
      { month: 'Oct', revenue: 128.00 },
      { month: 'Nov', revenue: 142.30 },
      { month: 'Dec', revenue: 165.75 },
      { month: 'Jan', revenue: 185.50 },
    ],
  };

  // Mock upcoming payout
  const upcomingPayout: SchoolPayout = {
    id: 'payout_002',
    schoolId: school.id,
    schoolName: school.name,
    period: {
      start: new Date('2025-01-01'),
      end: new Date('2025-01-31'),
    },
    totalTransactions: 15,
    totalRevenue: 37100.00,
    schoolShareAmount: 185.50,
    status: 'pending',
    paymentMethod: 'bank_transfer',
    transactions: [],
  };

  const growthPercentage = ((analytics.currentPeriod.revenue - analytics.previousPeriod.revenue) / analytics.previousPeriod.revenue * 100).toFixed(1);
  const isPositiveGrowth = Number(growthPercentage) > 0;

  const daysUntilPayout = school.stats.nextPayoutDate 
    ? Math.ceil((school.stats.nextPayoutDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleDownloadReport = () => {
    alert('Downloading revenue report...');
  };

  const handleRequestPayout = () => {
    if (school.stats.totalRevenue >= school.revenueShare.minimumPayout) {
      alert('Payout request submitted! You will receive payment within 5-7 business days.');
    } else {
      alert(`Minimum payout is ${formatRevenue(school.revenueShare.minimumPayout)}. Current balance: ${formatRevenue(school.stats.totalRevenue)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Dashboard" />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 mb-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{school.name}</h1>
                <p className="text-blue-100">Revenue Share Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleDownloadReport}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-sm text-blue-100 mb-1">Current Balance</p>
              <p className="text-3xl font-bold">{formatRevenue(school.stats.totalRevenue)}</p>
              <p className="text-xs text-blue-200 mt-1">Available for payout</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-sm text-blue-100 mb-1">Lifetime Earnings</p>
              <p className="text-3xl font-bold">{formatRevenue(school.stats.lifetimeRevenue)}</p>
              <p className="text-xs text-blue-200 mt-1">All-time revenue</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-sm text-blue-100 mb-1">Active Students</p>
              <p className="text-3xl font-bold">{school.stats.activeStudents}</p>
              <p className="text-xs text-blue-200 mt-1">Generating revenue</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-sm text-blue-100 mb-1">Next Payout</p>
              <p className="text-3xl font-bold">{daysUntilPayout}d</p>
              <p className="text-xs text-blue-200 mt-1">{school.stats.nextPayoutDate?.toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Upcoming Payout Card */}
        {school.stats.totalRevenue >= school.revenueShare.minimumPayout && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">Payout Ready!</h3>
                </div>
                <p className="text-sm text-green-800 mb-4">
                  You have <strong>{formatRevenue(school.stats.totalRevenue)}</strong> available for payout.
                  Payment will be sent to your {school.revenueShare.bankInfo?.bankName} account ending in {school.revenueShare.bankInfo?.accountNumber.slice(-4)}.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleRequestPayout}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
                  >
                    Request Payout Now
                  </button>
                  <span className="text-sm text-green-700">
                    or wait for automatic payout on {school.stats.nextPayoutDate?.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Minimum Payout Notice */}
        {school.stats.totalRevenue < school.revenueShare.minimumPayout && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">Minimum Payout Not Yet Reached</h3>
                <p className="text-sm text-yellow-800 mb-2">
                  You need <strong>{formatRevenue(school.revenueShare.minimumPayout - school.stats.totalRevenue)}</strong> more to reach the minimum payout of <strong>{formatRevenue(school.revenueShare.minimumPayout)}</strong>.
                </p>
                <p className="text-sm text-yellow-700">
                  Your current balance will automatically be paid out once you reach the minimum.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Growth Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Revenue Growth</h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Current Period</span>
                <span className={`text-sm font-bold ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositiveGrowth ? '+' : ''}{growthPercentage}%
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Revenue</span>
                  <span className="font-bold text-gray-900">{formatRevenue(analytics.currentPeriod.revenue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Transactions</span>
                  <span className="font-bold text-gray-900">{analytics.currentPeriod.transactions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Students</span>
                  <span className="font-bold text-gray-900">{analytics.currentPeriod.students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Avg per Student</span>
                  <span className="font-bold text-gray-900">{formatRevenue(analytics.currentPeriod.avgPerStudent)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-4">Monthly Trend</h4>
              <div className="space-y-2">
                {analytics.monthlyTrend.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700 w-8">{item.month}</span>
                    <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${(item.revenue / Math.max(...analytics.monthlyTrend.map(m => m.revenue))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-16 text-right">
                      ${item.revenue.toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Top Students */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Top Revenue Generating Students</h3>
            <div className="space-y-3">
              {analytics.topStudents.map((student, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      idx === 0 ? 'bg-yellow-500' :
                      idx === 1 ? 'bg-gray-400' :
                      idx === 2 ? 'bg-orange-600' :
                      'bg-blue-500'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-600">{student.transactions} transactions</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">{formatRevenue(student.revenue)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Type */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue by Transaction Type</h3>
            <div className="space-y-3">
              {analytics.byTransactionType.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">{item.type}</span>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{formatRevenue(item.revenue)}</span>
                      <span className="text-xs text-gray-600 ml-2">({item.count})</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${(item.revenue / Math.max(...analytics.byTransactionType.map(t => t.revenue))) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Share Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue Share Configuration</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Share Percentage</p>
              <p className="text-2xl font-bold text-blue-600">
                {(school.revenueShare.percentage * 100).toFixed(2)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Of each employer transaction</p>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Minimum Payout</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatRevenue(school.revenueShare.minimumPayout)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Required to process payment</p>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Payout Schedule</p>
              <p className="text-2xl font-bold text-blue-600 capitalize">
                {school.revenueShare.payoutSchedule}
              </p>
              <p className="text-xs text-gray-500 mt-1">Automatic payment frequency</p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 mb-2">How It Works</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Your school earns {(school.revenueShare.percentage * 100).toFixed(2)}% when employers post jobs/internships or subscribe</li>
              <li>• Revenue is attributed when your students apply, get hired, or are involved in transactions</li>
              <li>• Payments are processed {school.revenueShare.payoutSchedule} via {school.revenueShare.payoutMethod.replace('_', ' ')}</li>
              <li>• You can request early payout once you reach {formatRevenue(school.revenueShare.minimumPayout)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}