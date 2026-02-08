import { useState } from 'react';
import { DollarSign, TrendingUp, Users, CreditCard, Download, Filter, Check, X, Clock } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface Transaction {
  id: string;
  type: 'subscription' | 'affiliate_payout' | 'refund';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: 'card' | 'paypal' | 'crypto';
  userEmail: string;
  userName: string;
  date: Date;
  description: string;
}

interface AffiliatePayout {
  id: string;
  affiliateId: string;
  affiliateName: string;
  affiliateEmail: string;
  amount: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  requestDate: Date;
  processedDate?: Date;
  paymentMethod: 'paypal' | 'bank_transfer' | 'crypto';
  paymentDetails: string;
}

interface RevenueStats {
  totalRevenue: number;
  monthlyRevenue: number;
  subscriptionRevenue: number;
  affiliatePayouts: number;
  refunds: number;
  netRevenue: number;
  growthRate: number;
}

interface AdminPaymentManagementProps {
  onNavigate: (page: string) => void;
}

export function AdminPaymentManagement({ onNavigate }: AdminPaymentManagementProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'affiliates' | 'analytics'>('overview');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  const [stats, setStats] = useState<RevenueStats>({
    totalRevenue: 45780.00,
    monthlyRevenue: 8650.00,
    subscriptionRevenue: 42340.00,
    affiliatePayouts: 3440.00,
    refunds: 560.00,
    netRevenue: 38340.00,
    growthRate: 23.5,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'txn_001',
      type: 'subscription',
      amount: 249.00,
      currency: 'USD',
      status: 'completed',
      paymentMethod: 'card',
      userEmail: 'hr@acmecorp.com',
      userName: 'Acme Corp',
      date: new Date('2025-01-28'),
      description: 'Professional Plan - Monthly',
    },
    {
      id: 'txn_002',
      type: 'subscription',
      amount: 499.00,
      currency: 'USD',
      status: 'completed',
      paymentMethod: 'paypal',
      userEmail: 'jobs@techstart.com',
      userName: 'TechStart Inc',
      date: new Date('2025-01-27'),
      description: 'Ultra Premium Plan - Monthly',
    },
    {
      id: 'txn_003',
      type: 'affiliate_payout',
      amount: -120.00,
      currency: 'USD',
      status: 'pending',
      paymentMethod: 'paypal',
      userEmail: 'affiliate@partner.com',
      userName: 'John Smith (Affiliate)',
      date: new Date('2025-01-26'),
      description: 'Affiliate Commission Payout',
    },
    {
      id: 'txn_004',
      type: 'subscription',
      amount: 99.00,
      currency: 'USD',
      status: 'completed',
      paymentMethod: 'crypto',
      userEmail: 'contact@global.com',
      userName: 'Global Solutions',
      date: new Date('2025-01-25'),
      description: 'Starter Plan - Monthly',
    },
    {
      id: 'txn_005',
      type: 'refund',
      amount: -249.00,
      currency: 'USD',
      status: 'completed',
      paymentMethod: 'card',
      userEmail: 'refund@company.com',
      userName: 'Company XYZ',
      date: new Date('2025-01-24'),
      description: 'Refund - Professional Plan',
    },
  ]);

  const [affiliatePayouts, setAffiliatePayouts] = useState<AffiliatePayout[]>([
    {
      id: 'payout_001',
      affiliateId: 'aff_123',
      affiliateName: 'John Smith',
      affiliateEmail: 'john@partner.com',
      amount: 450.00,
      status: 'pending',
      requestDate: new Date('2025-01-25'),
      paymentMethod: 'paypal',
      paymentDetails: 'john@paypal.com',
    },
    {
      id: 'payout_002',
      affiliateId: 'aff_456',
      affiliateName: 'Sarah Johnson',
      affiliateEmail: 'sarah@marketing.com',
      amount: 680.00,
      status: 'approved',
      requestDate: new Date('2025-01-20'),
      paymentMethod: 'bank_transfer',
      paymentDetails: 'Account ending in 1234',
    },
    {
      id: 'payout_003',
      affiliateId: 'aff_789',
      affiliateName: 'Mike Chen',
      affiliateEmail: 'mike@affiliates.com',
      amount: 320.00,
      status: 'paid',
      requestDate: new Date('2025-01-15'),
      processedDate: new Date('2025-01-18'),
      paymentMethod: 'crypto',
      paymentDetails: 'BTC Wallet: bc1q...',
    },
  ]);

  const filteredTransactions = transactions.filter(txn => 
    filterStatus === 'all' ? true : txn.status === filterStatus
  );

  const handleApprovePayout = (payoutId: string) => {
    setAffiliatePayouts(affiliatePayouts.map(payout =>
      payout.id === payoutId ? { ...payout, status: 'approved' as const } : payout
    ));
  };

  const handleRejectPayout = (payoutId: string) => {
    setAffiliatePayouts(affiliatePayouts.map(payout =>
      payout.id === payoutId ? { ...payout, status: 'rejected' as const } : payout
    ));
  };

  const handleMarkPaid = (payoutId: string) => {
    setAffiliatePayouts(affiliatePayouts.map(payout =>
      payout.id === payoutId ? { 
        ...payout, 
        status: 'paid' as const,
        processedDate: new Date()
      } : payout
    ));
  };

  const exportTransactions = () => {
    // In production: Generate CSV/Excel file
    alert('Exporting transactions to CSV...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton onNavigate={onNavigate} destination="internal-dashboard" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
              <p className="text-gray-600">Monitor revenue, transactions, and affiliate payouts</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-gray-900">Total Revenue</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">All time</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-gray-900">This Month</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">${stats.monthlyRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <span>↑ {stats.growthRate}% vs last month</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-gray-900">Net Revenue</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">${stats.netRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">After payouts & refunds</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-6 h-6 text-orange-600" />
              <h3 className="font-bold text-gray-900">Affiliate Payouts</h3>
            </div>
            <p className="text-3xl font-bold text-orange-600">${stats.affiliatePayouts.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Pending & paid</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow p-2 mb-6 flex gap-2">
          {(['overview', 'transactions', 'affiliates', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Revenue Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Breakdown</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Subscription Revenue</h3>
                  <p className="text-3xl font-bold text-green-600">${stats.subscriptionRevenue.toLocaleString()}</p>
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600" 
                      style={{ width: `${(stats.subscriptionRevenue / stats.totalRevenue) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {Math.round((stats.subscriptionRevenue / stats.totalRevenue) * 100)}% of total
                  </p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Affiliate Payouts</h3>
                  <p className="text-3xl font-bold text-orange-600">-${stats.affiliatePayouts.toLocaleString()}</p>
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-600" 
                      style={{ width: `${(stats.affiliatePayouts / stats.totalRevenue) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {Math.round((stats.affiliatePayouts / stats.totalRevenue) * 100)}% of total
                  </p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Refunds</h3>
                  <p className="text-3xl font-bold text-red-600">-${stats.refunds.toLocaleString()}</p>
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-600" 
                      style={{ width: `${(stats.refunds / stats.totalRevenue) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {Math.round((stats.refunds / stats.totalRevenue) * 100)}% of total
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <button className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 transition-all text-left">
                <Download className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Export Reports</h3>
                <p className="text-sm text-gray-600">Download transaction reports</p>
              </button>
              <button className="bg-white border-2 border-green-200 rounded-xl p-6 hover:border-green-400 transition-all text-left">
                <Check className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Process Payouts</h3>
                <p className="text-sm text-gray-600">Review pending affiliate payouts</p>
              </button>
              <button className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-all text-left">
                <Filter className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Filter Data</h3>
                <p className="text-sm text-gray-600">Advanced filtering options</p>
              </button>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Transactions</h2>
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <button
                  onClick={exportTransactions}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto table-scroll">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b">
                    <th className="px-3 sm:px-4 py-3 text-left text-sm font-bold text-gray-700">Date</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-sm font-bold text-gray-700">Employer</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-sm font-bold text-gray-700">Type</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-sm font-bold text-gray-700">Amount</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-sm font-bold text-gray-700">Method</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-sm font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn) => (
                    <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <p className="font-mono text-sm text-gray-900">{txn.id}</p>
                        <p className="text-xs text-gray-600">{txn.description}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-gray-900">{txn.userName}</p>
                        <p className="text-xs text-gray-600">{txn.userEmail}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="capitalize text-sm text-gray-700">{txn.type.replace('_', ' ')}</span>
                      </td>
                      <td className="py-4 px-4">
                        <p className={`font-bold ${txn.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {txn.amount < 0 ? '-' : '+'}${Math.abs(txn.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-600">{txn.currency}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="capitalize text-sm text-gray-700">{txn.paymentMethod}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          txn.status === 'completed' ? 'bg-green-100 text-green-800' :
                          txn.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {txn.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {txn.date.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Affiliates Tab */}
        {activeTab === 'affiliates' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Affiliate Payout Requests</h2>

            <div className="space-y-4">
              {affiliatePayouts.map((payout) => (
                <div key={payout.id} className="border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{payout.affiliateName}</h3>
                      <p className="text-sm text-gray-600">{payout.affiliateEmail}</p>
                      <p className="text-xs text-gray-500 mt-1">Affiliate ID: {payout.affiliateId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${payout.amount.toFixed(2)}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                        payout.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        payout.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        payout.status === 'paid' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payout.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Payment Method:</p>
                      <p className="font-semibold text-gray-900 capitalize">{payout.paymentMethod.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Details:</p>
                      <p className="font-semibold text-gray-900">{payout.paymentDetails}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Request Date:</p>
                      <p className="font-semibold text-gray-900">{payout.requestDate.toLocaleDateString()}</p>
                    </div>
                    {payout.processedDate && (
                      <div>
                        <p className="text-sm text-gray-600">Processed Date:</p>
                        <p className="font-semibold text-gray-900">{payout.processedDate.toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>

                  {payout.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleRejectPayout(payout.id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprovePayout(payout.id)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                    </div>
                  )}

                  {payout.status === 'approved' && (
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleMarkPaid(payout.id)}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Mark as Paid
                      </button>
                    </div>
                  )}

                  {payout.status === 'paid' && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">Payment completed on {payout.processedDate?.toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Analytics</h2>
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Detailed revenue charts and analytics coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}