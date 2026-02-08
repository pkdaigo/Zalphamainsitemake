import { useState } from 'react';
import { CreditCard, CheckCircle, Clock, AlertCircle, Download, Calendar, TrendingUp } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { SchoolPayout, formatRevenue } from '@/utils/schoolRevenueShare';

interface PayoutSystemProps {
  schoolId: string;
  onNavigate: () => void;
}

export function PayoutSystem({ schoolId, onNavigate }: PayoutSystemProps) {
  // Mock payout history - In production, fetch from API
  const [payouts, setPayouts] = useState<SchoolPayout[]>([
    {
      id: 'payout_001',
      schoolId: 'school_001',
      schoolName: 'University of Guam',
      period: {
        start: new Date('2024-12-01'),
        end: new Date('2024-12-31'),
      },
      totalTransactions: 22,
      totalRevenue: 48750.00,
      schoolShareAmount: 243.75,
      status: 'completed',
      paymentMethod: 'bank_transfer',
      paymentDate: new Date('2025-01-05'),
      paymentReference: 'PAY-2024-12-UOG-001',
      transactions: [],
    },
    {
      id: 'payout_002',
      schoolId: 'school_001',
      schoolName: 'University of Guam',
      period: {
        start: new Date('2024-11-01'),
        end: new Date('2024-11-30'),
      },
      totalTransactions: 18,
      totalRevenue: 39200.00,
      schoolShareAmount: 196.00,
      status: 'completed',
      paymentMethod: 'bank_transfer',
      paymentDate: new Date('2024-12-05'),
      paymentReference: 'PAY-2024-11-UOG-001',
      transactions: [],
    },
    {
      id: 'payout_003',
      schoolId: 'school_001',
      schoolName: 'University of Guam',
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
    },
  ]);

  const [selectedPayout, setSelectedPayout] = useState<SchoolPayout | null>(null);

  const pendingPayouts = payouts.filter(p => p.status === 'pending');
  const completedPayouts = payouts.filter(p => p.status === 'completed');
  const totalPaidOut = completedPayouts.reduce((sum, p) => sum + p.schoolShareAmount, 0);
  const pendingAmount = pendingPayouts.reduce((sum, p) => sum + p.schoolShareAmount, 0);

  const getStatusColor = (status: SchoolPayout['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: SchoolPayout['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleDownloadReceipt = (payout: SchoolPayout) => {
    alert(`Downloading receipt for ${payout.paymentReference}...`);
  };

  const handleRequestEarlyPayout = (payout: SchoolPayout) => {
    if (confirm(`Request early payout of ${formatRevenue(payout.schoolShareAmount)}? A small processing fee may apply.`)) {
      alert('Early payout requested! Processing will begin within 24 hours.');
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-xl p-8 mb-6 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Payout Management</h1>
              <p className="text-green-100">Track and manage your revenue share payments</p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-sm text-green-100 mb-1">Total Paid Out</p>
              <p className="text-3xl font-bold">{formatRevenue(totalPaidOut)}</p>
              <p className="text-xs text-green-200 mt-1">{completedPayouts.length} payments</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-sm text-green-100 mb-1">Pending Payouts</p>
              <p className="text-3xl font-bold">{formatRevenue(pendingAmount)}</p>
              <p className="text-xs text-green-200 mt-1">{pendingPayouts.length} pending</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-sm text-green-100 mb-1">Average Payout</p>
              <p className="text-3xl font-bold">
                {formatRevenue(completedPayouts.length > 0 ? totalPaidOut / completedPayouts.length : 0)}
              </p>
              <p className="text-xs text-green-200 mt-1">Per payment period</p>
            </div>
          </div>
        </div>

        {/* Pending Payouts */}
        {pendingPayouts.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pending Payouts</h2>
            <div className="space-y-4">
              {pendingPayouts.map((payout) => (
                <div key={payout.id} className="border-2 border-yellow-200 bg-yellow-50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {payout.period.start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusColor(payout.status)}`}>
                          {getStatusIcon(payout.status)}
                          {payout.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Period</p>
                          <p className="font-semibold text-gray-900">
                            {payout.period.start.toLocaleDateString()} - {payout.period.end.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Transactions</p>
                          <p className="font-semibold text-gray-900">{payout.totalTransactions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                          <p className="font-semibold text-gray-900">{formatRevenue(payout.totalRevenue)}</p>
                        </div>
                      </div>
                      <div className="bg-white border border-yellow-300 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Your Share</p>
                            <p className="text-3xl font-bold text-green-600">
                              {formatRevenue(payout.schoolShareAmount)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                            <p className="font-semibold text-gray-900 capitalize">
                              {payout.paymentMethod.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-yellow-300">
                    <button
                      onClick={() => handleRequestEarlyPayout(payout)}
                      className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
                    >
                      Request Early Payout
                    </button>
                    <button
                      onClick={() => setSelectedPayout(payout)}
                      className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payout History */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Payout History</h2>
          </div>

          <div className="overflow-x-auto table-scroll">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Transactions
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Total Revenue
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    School Share
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Payment Date
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
                {payouts.map((payout) => (
                  <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {payout.period.start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{payout.totalTransactions}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatRevenue(payout.totalRevenue)}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-green-600">
                        {formatRevenue(payout.schoolShareAmount)}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {payout.paymentDate?.toLocaleDateString() || 'Pending'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${getStatusColor(payout.status)}`}>
                        {getStatusIcon(payout.status)}
                        {payout.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {payout.status === 'completed' && (
                        <button
                          onClick={() => handleDownloadReceipt(payout)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          Receipt
                        </button>
                      )}
                      {payout.status === 'pending' && (
                        <button
                          onClick={() => setSelectedPayout(payout)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout Information */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-4 text-lg">Payout Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-blue-800 mb-2">Automatic Payouts</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Payouts are processed automatically at the end of each period</li>
                <li>• Payments typically arrive within 5-7 business days</li>
                <li>• You'll receive an email notification when payment is processed</li>
                <li>• Minimum balance of $50 required for automatic payout</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-800 mb-2">Early Payout Option</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Request early payout anytime after $50 balance</li>
                <li>• Small processing fee may apply for early requests</li>
                <li>• Early payouts processed within 24-48 hours</li>
                <li>• Available for verified schools only</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tax Information Notice */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Tax Information</h3>
              <p className="text-sm text-yellow-800 mb-2">
                All payouts are reported to the IRS. You will receive a 1099 form at the end of the year if your total payments exceed $600.
              </p>
              <p className="text-sm text-yellow-700">
                Please ensure your tax information is up to date in your school profile settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}