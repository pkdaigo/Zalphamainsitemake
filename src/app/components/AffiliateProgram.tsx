import { useState, useEffect } from 'react';
import { Share2, DollarSign, Users, TrendingUp, Copy, Check, Gift, Target, Award, ExternalLink } from 'lucide-react';

interface AffiliateStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  availableForWithdrawal: number;
  thisMonthEarnings: number;
  conversionRate: number;
}

interface Referral {
  id: string;
  name: string;
  email: string;
  signupDate: Date;
  status: 'trial' | 'active' | 'cancelled';
  plan: string;
  commission: number;
  commissionStatus: 'pending' | 'approved' | 'paid';
}

interface Commission {
  id: string;
  referralName: string;
  amount: number;
  date: Date;
  type: 'signup' | 'recurring' | 'upgrade';
  status: 'pending' | 'approved' | 'paid';
}

export function AffiliateProgram() {
  const [affiliateCode, setAffiliateCode] = useState('ZALPHA-ABC123');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<AffiliateStats>({
    totalReferrals: 24,
    activeReferrals: 18,
    totalEarnings: 2450.00,
    pendingEarnings: 380.00,
    availableForWithdrawal: 2070.00,
    thisMonthEarnings: 580.00,
    conversionRate: 75,
  });

  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: '1',
      name: 'Acme Corp',
      email: 'hr@acme.com',
      signupDate: new Date('2025-01-15'),
      status: 'active',
      plan: 'Professional',
      commission: 49.80,
      commissionStatus: 'approved',
    },
    {
      id: '2',
      name: 'TechStart Inc',
      email: 'jobs@techstart.com',
      signupDate: new Date('2025-01-20'),
      status: 'active',
      plan: 'Ultra Premium',
      commission: 99.80,
      commissionStatus: 'approved',
    },
    {
      id: '3',
      name: 'Global Solutions',
      email: 'recruiting@global.com',
      signupDate: new Date('2025-01-25'),
      status: 'trial',
      plan: 'Starter',
      commission: 19.80,
      commissionStatus: 'pending',
    },
  ]);

  const [commissions, setCommissions] = useState<Commission[]>([
    {
      id: '1',
      referralName: 'Acme Corp',
      amount: 49.80,
      date: new Date('2025-01-15'),
      type: 'signup',
      status: 'approved',
    },
    {
      id: '2',
      referralName: 'TechStart Inc',
      amount: 99.80,
      date: new Date('2025-01-20'),
      type: 'signup',
      status: 'approved',
    },
    {
      id: '3',
      referralName: 'Acme Corp',
      amount: 49.80,
      date: new Date('2025-02-15'),
      type: 'recurring',
      status: 'pending',
    },
  ]);

  const referralLink = `https://www.zalpharecruit.com/signup?ref=${affiliateCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commissionRates = [
    { plan: 'Student Ultra Premium', rate: 20, amount: '$3.99 per signup' },
    { plan: 'Employer Starter', rate: 20, amount: '$19.80 per signup' },
    { plan: 'Employer Professional', rate: 20, amount: '$49.80 per signup' },
    { plan: 'Employer Ultra Premium', rate: 20, amount: '$99.80 per signup' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Gift className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Affiliate Program</h1>
              <p className="text-green-100">Earn commission on every referral (beta example: 20%)</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-sm leading-relaxed">
              Share ZALPHA with companies and earn <strong>recurring commission</strong> on their subscription (beta example: 20%). 
              Get paid monthly for as long as they remain subscribers!
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-gray-900">Total Referrals</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.totalReferrals}</p>
            <p className="text-sm text-gray-600 mt-1">{stats.activeReferrals} active</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-gray-900">Total Earnings</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">${stats.totalEarnings.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-1">All time</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
              <h3 className="font-bold text-gray-900">This Month</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-600">${stats.thisMonthEarnings.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-1">+{stats.conversionRate}% conversion</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-gray-900">Available</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">${stats.availableForWithdrawal.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-1">Ready to withdraw</p>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <Share2 className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your Referral Link</h2>
          </div>

          <div className="space-y-4">
            {/* Affiliate Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Affiliate Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={affiliateCode}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg font-mono text-lg font-bold"
                />
                <button
                  onClick={() => copyToClipboard(affiliateCode)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Referral URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Referral URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(referralLink)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Share via Email
              </button>
              <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Share on LinkedIn
              </button>
              <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Share on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Commission Rates */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Commission Structure</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-900 mb-2">
                <strong>🎉 Beta Example: 20% recurring commission on all plans!</strong>
              </p>
              <p className="text-sm text-purple-800">
                You earn commission every month for the lifetime of the subscription. If a company stays 
                subscribed for 12 months, you earn 12 months of commission! <em className="text-purple-700">(Actual percentage to be finalized post-beta)</em>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {commissionRates.map((rate, idx) => (
                <div key={idx} className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{rate.plan}</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                      {rate.rate}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{rate.amount}</p>
                  <p className="text-xs text-gray-600 mt-1">Recurring monthly commission</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-yellow-900 mb-2">💰 Example Earnings:</h4>
              <ul className="space-y-1 text-sm text-yellow-800">
                <li>• Refer 5 companies on Professional plan = <strong>$249/month recurring income</strong></li>
                <li>• Refer 3 companies on Ultra Premium plan = <strong>$299/month recurring income</strong></li>
                <li>• Refer 10 companies on Starter plan = <strong>$198/month recurring income</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Referrals</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900">Signup Date</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900">Plan</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-gray-900">Commission</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">{referral.name}</p>
                        <p className="text-sm text-gray-600">{referral.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {referral.signupDate.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        referral.status === 'active' ? 'bg-green-100 text-green-800' :
                        referral.status === 'trial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {referral.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                      {referral.plan}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div>
                        <p className="font-bold text-green-600">${referral.commission.toFixed(2)}/mo</p>
                        <p className={`text-xs ${
                          referral.commissionStatus === 'approved' ? 'text-green-600' :
                          referral.commissionStatus === 'paid' ? 'text-blue-600' :
                          'text-yellow-600'
                        }`}>
                          {referral.commissionStatus}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {referrals.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Referrals Yet</h3>
              <p className="text-gray-600">Share your referral link to start earning commissions!</p>
            </div>
          )}
        </div>

        {/* Commission History */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Commission History</h2>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
              Request Withdrawal
            </button>
          </div>

          <div className="space-y-3">
            {commissions.map((commission) => (
              <div key={commission.id} className="border-2 border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    commission.type === 'signup' ? 'bg-blue-100' :
                    commission.type === 'recurring' ? 'bg-green-100' :
                    'bg-purple-100'
                  }`}>
                    <DollarSign className={`w-6 h-6 ${
                      commission.type === 'signup' ? 'text-blue-600' :
                      commission.type === 'recurring' ? 'text-green-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{commission.referralName}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="capitalize">{commission.type}</span>
                      <span>•</span>
                      <span>{commission.date.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">+${commission.amount.toFixed(2)}</p>
                  <p className={`text-xs font-semibold ${
                    commission.status === 'paid' ? 'text-green-600' :
                    commission.status === 'approved' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {commission.status.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-bold mb-2">Share Your Link</h3>
              <p className="text-sm text-blue-100">
                Share your unique referral link with companies who need talent
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-bold mb-2">They Sign Up</h3>
              <p className="text-sm text-blue-100">
                Companies create an account and subscribe to a paid plan
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-bold mb-2">Earn Commission</h3>
              <p className="text-sm text-blue-100">
                You earn 20% recurring commission every month
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="font-bold mb-2">Get Paid</h3>
              <p className="text-sm text-blue-100">
                Withdraw earnings monthly via PayPal, bank transfer, or crypto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}