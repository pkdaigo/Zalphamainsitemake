import { useState } from 'react';
import { DollarSign, TrendingUp, Building2, Users, Calendar, Download, Eye, EyeOff, Lock } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { schoolRevenueService, formatRevenue, Transaction } from '@/utils/schoolRevenueShare';

interface TransactionTrackerProps {
  userType: 'admin' | 'school' | 'employer';
  userId?: string;
  schoolId?: string;
  onNavigate: () => void;
}

export function TransactionTracker({ userType, userId, schoolId, onNavigate }: TransactionTrackerProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year' | 'all'>('month');
  const [selectedType, setSelectedType] = useState<'all' | Transaction['type']>('all');
  
  // Get date range
  const getDateRange = () => {
    const end = new Date();
    const start = new Date();
    
    switch (timeRange) {
      case 'week':
        start.setDate(start.getDate() - 7);
        break;
      case 'month':
        start.setMonth(start.getMonth() - 1);
        break;
      case 'quarter':
        start.setMonth(start.getMonth() - 3);
        break;
      case 'year':
        start.setFullYear(start.getFullYear() - 1);
        break;
      case 'all':
        start.setFullYear(2020, 0, 1);
        break;
    }
    
    return { start, end };
  };

  // Mock transaction data - In production, fetch from API
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'txn_001',
      type: 'subscription',
      employerId: 'emp_123',
      employerName: 'Pacific Tech Solutions',
      amount: 249.00,
      date: new Date('2025-01-20'),
      status: 'completed',
      schoolAttribution: {
        schoolId: 'school_001',
        schoolName: 'University of Guam',
        studentId: 'stu_456',
        studentName: 'Maria Santos',
        studentAnonymous: false, // Student chose to show identity
        reason: 'student_hired',
        schoolShareAmount: 1.25, // 0.5% of $249
        schoolSharePercentage: 0.005,
      },
    },
    {
      id: 'txn_002',
      type: 'job_post',
      employerId: 'emp_124',
      employerName: 'Island Retail Group',
      amount: 99.00,
      date: new Date('2025-01-22'),
      status: 'completed',
      schoolAttribution: {
        schoolId: 'school_001',
        schoolName: 'University of Guam',
        studentId: 'stu_457',
        studentName: 'John Dela Cruz',
        studentAnonymous: true, // Student chose to hide identity
        reason: 'student_applied',
        schoolShareAmount: 0.50,
        schoolSharePercentage: 0.005,
      },
    },
    {
      id: 'txn_003',
      type: 'premium_feature',
      employerId: 'emp_123',
      employerName: 'Pacific Tech Solutions',
      amount: 499.00,
      date: new Date('2025-01-25'),
      status: 'completed',
      schoolAttribution: {
        schoolId: 'school_001',
        schoolName: 'University of Guam',
        studentId: 'stu_456',
        studentName: 'Maria Santos',
        studentAnonymous: false,
        reason: 'subscription_with_students',
        schoolShareAmount: 2.50,
        schoolSharePercentage: 0.005,
      },
    },
    {
      id: 'txn_004',
      type: 'internship_post',
      employerId: 'emp_125',
      employerName: 'FSM Government',
      amount: 149.00,
      date: new Date('2025-01-26'),
      status: 'completed',
      schoolAttribution: {
        schoolId: 'school_002',
        schoolName: 'College of Micronesia',
        studentId: 'stu_458',
        studentName: 'Sarah Johnson',
        studentAnonymous: true, // Student chose to hide identity
        reason: 'student_applied',
        schoolShareAmount: 0.75,
        schoolSharePercentage: 0.005,
      },
    },
    {
      id: 'txn_005',
      type: 'freelance_project',
      employerId: 'emp_126',
      employerName: 'Digital Dreams Agency',
      amount: 1500.00,
      date: new Date('2025-01-27'),
      status: 'completed',
      schoolAttribution: {
        schoolId: 'school_001',
        schoolName: 'University of Guam',
        studentId: 'stu_459',
        studentName: 'David Chen',
        studentAnonymous: false,
        reason: 'student_connected',
        schoolShareAmount: 7.50,
        schoolSharePercentage: 0.005,
      },
    },
  ]);

  // Filter transactions
  const filteredTransactions = transactions.filter(txn => {
    // Filter by school if specified
    if (schoolId && txn.schoolAttribution?.schoolId !== schoolId) {
      return false;
    }
    
    // Filter by type
    if (selectedType !== 'all' && txn.type !== selectedType) {
      return false;
    }
    
    // Filter by date range
    const { start, end } = getDateRange();
    if (txn.date < start || txn.date > end) {
      return false;
    }
    
    return true;
  });

  // Calculate totals
  const totals = {
    totalTransactions: filteredTransactions.length,
    totalRevenue: filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0),
    totalSchoolShare: filteredTransactions.reduce(
      (sum, txn) => sum + (txn.schoolAttribution?.schoolShareAmount || 0),
      0
    ),
    averageTransaction: filteredTransactions.length > 0
      ? filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0) / filteredTransactions.length
      : 0,
  };

  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'subscription': return 'bg-blue-100 text-blue-800';
      case 'job_post': return 'bg-green-100 text-green-800';
      case 'internship_post': return 'bg-purple-100 text-purple-800';
      case 'premium_feature': return 'bg-yellow-100 text-yellow-800';
      case 'freelance_project': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case 'student_applied': return 'Student Applied';
      case 'student_hired': return 'Student Hired';
      case 'student_connected': return 'Student Connected';
      case 'subscription_with_students': return 'Subscription (Students)';
      default: return reason;
    }
  };

  const handleExport = () => {
    // Export to CSV
    const csv = [
      ['Date', 'Type', 'Employer', 'Amount', 'School', 'Student', 'School Share', 'Status'].join(','),
      ...filteredTransactions.map(txn => [
        txn.date.toLocaleDateString(),
        txn.type,
        txn.employerName,
        txn.amount,
        txn.schoolAttribution?.schoolName || 'N/A',
        txn.schoolAttribution?.studentName || 'N/A',
        txn.schoolAttribution?.schoolShareAmount || 0,
        txn.status,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zalpha-transactions-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <BackButton onNavigate={onNavigate} label="Back to Dashboard" />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Transaction History</h1>
            <p className="text-green-100">
              {schoolId ? 'Revenue share tracking for your school' : 'All platform transactions'}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-sm text-green-100 mb-1">Total Transactions</p>
            <p className="text-3xl font-bold">{totals.totalTransactions}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-sm text-green-100 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">{formatRevenue(totals.totalRevenue)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-sm text-green-100 mb-1">School Share</p>
            <p className="text-3xl font-bold">{formatRevenue(totals.totalSchoolShare)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-sm text-green-100 mb-1">Avg Transaction</p>
            <p className="text-3xl font-bold">{formatRevenue(totals.averageTransaction)}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Filters</h3>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="subscription">Subscriptions</option>
              <option value="job_post">Job Posts</option>
              <option value="internship_post">Internship Posts</option>
              <option value="premium_feature">Premium Features</option>
              <option value="freelance_project">Freelance Projects</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 text-lg">Transactions</h3>
        </div>

        <div className="overflow-x-auto table-scroll">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Employer
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                {!schoolId && (
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    School
                  </th>
                )}
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  School Share
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {txn.date.toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getTypeColor(txn.type)}`}>
                      {txn.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900">
                        {txn.employerName}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">
                      {formatRevenue(txn.amount)}
                    </span>
                  </td>
                  {!schoolId && (
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {txn.schoolAttribution?.schoolName || 'N/A'}
                      </div>
                      {txn.schoolAttribution && (
                        <div className="text-xs text-gray-500">
                          {getReasonLabel(txn.schoolAttribution.reason)}
                        </div>
                      )}
                    </td>
                  )}
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {txn.schoolAttribution?.studentAnonymous ? (
                        <>
                          <EyeOff className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500 italic flex items-center gap-1">
                            Anonymous Student
                            <Lock className="w-3 h-3" />
                          </span>
                        </>
                      ) : (
                        <>
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {txn.schoolAttribution?.studentName || 'N/A'}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">
                      {txn.schoolAttribution
                        ? formatRevenue(txn.schoolAttribution.schoolShareAmount)
                        : 'N/A'}
                    </div>
                    {txn.schoolAttribution && (
                      <div className="text-xs text-gray-500">
                        {(txn.schoolAttribution.schoolSharePercentage * 100).toFixed(2)}%
                      </div>
                    )}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      txn.status === 'completed' ? 'bg-green-100 text-green-800' :
                      txn.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {txn.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Transactions Found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more transactions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}