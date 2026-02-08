import { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Flag, 
  TrendingDown, 
  Eye,
  Ban,
  PlayCircle,
  MessageSquare
} from 'lucide-react';
import { Review } from '@/app/components/CompanyReviewForm';
import { BackButton } from '@/app/components/BackButton';

interface AdminModerationProps {
  onNavigate: (page: string) => void;
}

interface Company {
  id: string;
  name: string;
  averageRating: number;
  totalReviews: number;
  flaggedReviews: number;
  isSuspended: boolean;
  suspensionReason?: string;
  lastReviewDate: string;
  trend: 'up' | 'down' | 'stable';
}

export function AdminModeration({ onNavigate }: AdminModerationProps) {
  // Mock data - in real app, this comes from backend
  const [companies] = useState<Company[]>([
    {
      id: '1',
      name: 'Island Resort & Spa',
      averageRating: 2.1,
      totalReviews: 8,
      flaggedReviews: 3,
      isSuspended: true,
      suspensionReason: 'Multiple reports of unpaid overtime and poor working conditions',
      lastReviewDate: '2024-01-20',
      trend: 'down'
    },
    {
      id: '2',
      name: 'Pacific Marketing Group',
      averageRating: 2.8,
      totalReviews: 5,
      flaggedReviews: 2,
      isSuspended: false,
      lastReviewDate: '2024-01-22',
      trend: 'down'
    },
    {
      id: '3',
      name: 'Guam Tech Solutions',
      averageRating: 4.6,
      totalReviews: 12,
      flaggedReviews: 0,
      isSuspended: false,
      lastReviewDate: '2024-01-25',
      trend: 'stable'
    },
  ]);

  const [flaggedReviews] = useState<Review[]>([
    {
      id: 'r1',
      studentName: 'Maria Santos',
      companyName: 'Island Resort & Spa',
      position: 'Front Desk Intern',
      workPeriod: 'Jun 2023 - Dec 2023',
      overallRating: 1,
      workEnvironmentRating: 2,
      learningOpportunitiesRating: 1,
      managementRating: 1,
      compensationRating: 1,
      workLifeBalanceRating: 1,
      wouldRecommend: false,
      pros: '',
      cons: 'Worked overtime without pay, manager was verbally abusive, unsafe working conditions',
      advice: 'Avoid at all costs. They take advantage of students.',
      isVerified: true,
      isAnonymous: false,
      flagCount: 2,
      createdAt: '2024-01-15T10:00:00Z',
    },
  ]);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [actionModal, setActionModal] = useState<'suspend' | 'reactivate' | null>(null);
  const [actionNotes, setActionNotes] = useState('');

  const suspendedCount = companies.filter(c => c.isSuspended).length;
  const needsReviewCount = companies.filter(c => c.averageRating < 3.0 && !c.isSuspended).length;

  const handleSuspendCompany = (company: Company) => {
    setSelectedCompany(company);
    setActionModal('suspend');
  };

  const handleReactivateCompany = (company: Company) => {
    setSelectedCompany(company);
    setActionModal('reactivate');
  };

  const confirmAction = () => {
    console.log('Action confirmed:', actionModal, selectedCompany, actionNotes);
    setActionModal(null);
    setSelectedCompany(null);
    setActionNotes('');
    // In real app: API call to update company status
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <BackButton onNavigate={onNavigate} label="Back to Home" />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Admin Moderation Dashboard</h1>
          <p className="text-red-100">
            Monitor reviews, investigate companies, and protect students
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Total Companies</span>
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{companies.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Suspended</span>
              <Ban className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{suspendedCount}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Needs Review</span>
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">{needsReviewCount}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Flagged Reviews</span>
              <Flag className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{flaggedReviews.length}</p>
          </div>
        </div>

        {/* Company Monitoring */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Company Monitoring</h2>
          
          <div className="space-y-4">
            {companies.map((company) => (
              <div 
                key={company.id} 
                className={`p-6 rounded-lg border-2 ${
                  company.isSuspended 
                    ? 'bg-red-50 border-red-200' 
                    : company.averageRating < 3.0 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{company.name}</h3>
                      {company.isSuspended && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                          <Ban className="w-4 h-4" />
                          SUSPENDED
                        </span>
                      )}
                      {!company.isSuspended && company.averageRating < 3.0 && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-sm font-medium rounded-full">
                          <AlertTriangle className="w-4 h-4" />
                          NEEDS ATTENTION
                        </span>
                      )}
                    </div>
                    {company.isSuspended && company.suspensionReason && (
                      <p className="text-sm text-red-800 mb-2">
                        <strong>Reason:</strong> {company.suspensionReason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Average Rating</p>
                    <p className={`text-2xl font-bold ${
                      company.averageRating < 3.0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {company.averageRating.toFixed(1)} ⭐
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total Reviews</p>
                    <p className="text-2xl font-bold text-slate-900">{company.totalReviews}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Flagged Reviews</p>
                    <p className={`text-2xl font-bold ${
                      company.flaggedReviews > 0 ? 'text-orange-600' : 'text-slate-900'
                    }`}>
                      {company.flaggedReviews}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Trend</p>
                    <div className="flex items-center gap-2">
                      {company.trend === 'down' && (
                        <>
                          <TrendingDown className="w-5 h-5 text-red-600" />
                          <span className="text-sm font-medium text-red-600">Declining</span>
                        </>
                      )}
                      {company.trend === 'stable' && (
                        <span className="text-sm font-medium text-slate-600">Stable</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {/* View details */}}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Reviews
                  </button>
                  {company.isSuspended ? (
                    <button
                      onClick={() => handleReactivateCompany(company)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Reactivate Company
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSuspendCompany(company)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Ban className="w-4 h-4" />
                      Suspend Company
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged Reviews */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Flagged Reviews Requiring Action</h2>
          
          {flaggedReviews.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-slate-600">No flagged reviews to review</p>
            </div>
          ) : (
            <div className="space-y-4">
              {flaggedReviews.map((review) => (
                <div key={review.id} className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{review.companyName}</h4>
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                          <Flag className="w-3 h-3" />
                          {review.flagCount} flags
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        By {review.studentName} • {review.position}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">{review.overallRating}⭐</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-slate-700"><strong>Cons:</strong> {review.cons}</p>
                    {review.advice && (
                      <p className="text-sm text-slate-700 mt-2"><strong>Advice:</strong> {review.advice}</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      Approve Review
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <XCircle className="w-4 h-4" />
                      Remove Review
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      Contact Student
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      {actionModal && selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {actionModal === 'suspend' ? 'Suspend Company' : 'Reactivate Company'}
            </h3>
            <p className="text-slate-700 mb-4">
              {actionModal === 'suspend' 
                ? `Are you sure you want to suspend ${selectedCompany.name}? Students will not be able to apply to this company.`
                : `Reactivate ${selectedCompany.name}? They will be able to post jobs again.`
              }
            </p>
            <textarea
              value={actionNotes}
              onChange={(e) => setActionNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              placeholder={actionModal === 'suspend' 
                ? 'Reason for suspension (required)...' 
                : 'Investigation notes (optional)...'
              }
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActionModal(null);
                  setSelectedCompany(null);
                  setActionNotes('');
                }}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 text-white rounded-lg ${
                  actionModal === 'suspend'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}