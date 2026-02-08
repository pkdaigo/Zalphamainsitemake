import { useState } from 'react';
import { CompanyReviewForm, Review } from '@/app/components/CompanyReviewForm';
import { CompanyReviews } from '@/app/components/CompanyReviews';
import { ReviewVerification, VerificationData } from '@/app/components/ReviewVerification';
import { analyzeCompanyReviews, calculateCompanyHealthScore } from '@/utils/reviewModeration';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface CompanyReviewDemoProps {
  onNavigate: (page: string) => void;
}

export function CompanyReviewDemo({ onNavigate }: CompanyReviewDemoProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [pendingReview, setPendingReview] = useState<Review | null>(null);
  
  // Mock reviews data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      studentName: 'John Dela Cruz',
      companyName: 'Pacific Tech Solutions',
      position: 'Software Development Intern',
      workPeriod: 'Jan 2024 - Jun 2024',
      overallRating: 5,
      workEnvironmentRating: 5,
      learningOpportunitiesRating: 5,
      managementRating: 5,
      compensationRating: 4,
      workLifeBalanceRating: 5,
      wouldRecommend: true,
      pros: 'Amazing learning environment, mentorship was top-notch, got to work on real projects',
      cons: 'Could have been paid a bit more, but the experience was worth it',
      advice: 'Apply! This is the best internship experience you can get in the Pacific region.',
      isVerified: true,
      isAnonymous: false,
      flagCount: 0,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      studentName: 'Maria Santos',
      companyName: 'Pacific Tech Solutions',
      position: 'Marketing Intern',
      workPeriod: 'Jun 2023 - Dec 2023',
      overallRating: 4,
      workEnvironmentRating: 5,
      learningOpportunitiesRating: 4,
      managementRating: 4,
      compensationRating: 3,
      workLifeBalanceRating: 4,
      wouldRecommend: true,
      pros: 'Great team culture, learned a lot about digital marketing, flexible hours',
      cons: 'Sometimes unclear direction on projects, compensation could be better',
      advice: 'Be proactive and ask questions. Great opportunity for learning!',
      isVerified: true,
      isAnonymous: false,
      flagCount: 0,
      createdAt: '2024-01-10T14:00:00Z',
    },
  ]);

  const companyName = 'Pacific Tech Solutions';
  const averageRating = reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length;
  const healthScore = calculateCompanyHealthScore(reviews);
  const moderationAction = analyzeCompanyReviews(reviews);

  const handleSubmitReview = (review: Review) => {
    setPendingReview(review);
    setShowReviewForm(false);
    setShowVerification(true);
  };

  const handleVerification = (verificationData: VerificationData) => {
    if (pendingReview) {
      const verifiedReview = { ...pendingReview };
      setReviews([...reviews, verifiedReview]);
      setShowVerification(false);
      setPendingReview(null);
    }
  };

  const handleSkipVerification = () => {
    if (pendingReview) {
      setReviews([...reviews, pendingReview]);
      setShowVerification(false);
      setPendingReview(null);
    }
  };

  const handleFlagReview = (reviewId: string) => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, flagCount: r.flagCount + 1 } : r
    ));
  };

  if (showVerification && pendingReview) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => {
              setShowVerification(false);
              setShowReviewForm(true);
            }}
            className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Review
          </button>
          <ReviewVerification
            reviewId={pendingReview.id}
            studentName={pendingReview.studentName}
            companyName={pendingReview.companyName}
            position={pendingReview.position}
            workPeriod={pendingReview.workPeriod}
            onVerify={handleVerification}
            onSkip={handleSkipVerification}
          />
        </div>
      </div>
    );
  }

  if (showReviewForm) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <BackButton onNavigate={onNavigate} destination="demo-showcase" />
        <div className="max-w-7xl mx-auto">
          <CompanyReviewForm
            companyName={companyName}
            onSubmit={handleSubmitReview}
            onCancel={() => setShowReviewForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <BackButton onNavigate={onNavigate} destination="demo-showcase" />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('student-dashboard')}
            className="mb-4 inline-flex items-center gap-2 text-white/80 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 px-4">{companyName}</h1>
          <p className="text-xl text-blue-100">
            Student Reviews & Company Accountability
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6">
        {/* Company Health Score */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Company Health Score</h2>
            <div className="flex items-center gap-2">
              {healthScore >= 80 && <TrendingUp className="w-6 h-6 text-green-600" />}
              {healthScore < 80 && healthScore >= 60 && <AlertTriangle className="w-6 h-6 text-yellow-600" />}
              {healthScore < 60 && <TrendingDown className="w-6 h-6 text-red-600" />}
              <span className={`text-4xl font-bold ${
                healthScore >= 80 ? 'text-green-600' : 
                healthScore >= 60 ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {healthScore}
              </span>
            </div>
          </div>
          
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-4">
            <div 
              className={`h-full rounded-full transition-all ${
                healthScore >= 80 ? 'bg-green-600' : 
                healthScore >= 60 ? 'bg-yellow-600' : 
                'bg-red-600'
              }`}
              style={{ width: `${healthScore}%` }}
            />
          </div>

          <div className={`p-4 rounded-lg ${
            moderationAction.severity === 'critical' ? 'bg-red-50 border border-red-200' :
            moderationAction.severity === 'high' ? 'bg-orange-50 border border-orange-200' :
            moderationAction.severity === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-green-50 border border-green-200'
          }`}>
            <p className={`text-sm font-semibold mb-1 ${
              moderationAction.severity === 'critical' ? 'text-red-900' :
              moderationAction.severity === 'high' ? 'text-orange-900' :
              moderationAction.severity === 'medium' ? 'text-yellow-900' :
              'text-green-900'
            }`}>
              Status: {moderationAction.action.toUpperCase()}
            </p>
            <p className={`text-sm ${
              moderationAction.severity === 'critical' ? 'text-red-800' :
              moderationAction.severity === 'high' ? 'text-orange-800' :
              moderationAction.severity === 'medium' ? 'text-yellow-800' :
              'text-green-800'
            }`}>
              {moderationAction.reason}
            </p>
          </div>
        </div>

        {/* Add Review Button */}
        <div className="mb-6">
          {/* WARNING NOTICE - NEW */}
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">⚠️ Important: Review Integrity Policy</h3>
                <div className="text-sm text-red-800 space-y-2">
                  <p>
                    <strong>All reviews must be truthful and based on actual work experience.</strong> Fake, fraudulent, or unverified reviews are strictly prohibited and will result in immediate account termination.
                  </p>
                  <div className="bg-red-100 border border-red-200 rounded-lg p-3 mt-2">
                    <p className="font-bold text-red-900 mb-1">Violations Include:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Reviewing companies you never worked for or interviewed with</li>
                      <li>Posting exaggerated, false, or defamatory claims</li>
                      <li>Creating multiple accounts to post fake reviews</li>
                      <li>Coordinating with others to attack a company's reputation</li>
                    </ul>
                  </div>
                  <p className="font-bold text-red-900 mt-3">
                    🚨 LEGAL WARNING: Employers can sue you for defamation and damages caused by fake reviews. Your account will be permanently terminated and ZALPHA will cooperate with legal proceedings.
                  </p>
                  <p className="text-xs text-red-700 mt-2">
                    See <button onClick={() => onNavigate('terms-of-service')} className="underline hover:text-red-900">Section 7A of Terms of Service</button> for full details on penalties and legal consequences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowReviewForm(true)}
            className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
          >
            + Write a Review
          </button>
        </div>

        {/* Reviews Display */}
        <CompanyReviews
          companyName={companyName}
          reviews={reviews}
          averageRating={averageRating}
          isSuspended={moderationAction.action === 'suspend'}
          onFlagReview={handleFlagReview}
        />

        {/* Demo Information */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            🎯 Demo Feature: Company Review & Accountability System
          </h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>What makes ZALPHA different:</strong></p>
            <ul className="space-y-1 ml-4">
              <li>✓ Students can review companies they've worked for</li>
              <li>✓ Detailed ratings across 5 categories (work environment, learning, management, etc.)</li>
              <li>✓ Verification system to confirm employment (documents, employer email, or manual)</li>
              <li>✓ Automatic company suspension when ratings drop below 2.5/5</li>
              <li>✓ Flag system for problematic reviews</li>
              <li>✓ Admin moderation dashboard to investigate companies</li>
              <li>✓ Company health score (0-100) based on reviews</li>
              <li>✓ Protection for students from bad employers</li>
            </ul>
            <p className="mt-3 pt-3 border-t border-blue-300">
              <strong>Try it:</strong> Click "Write a Review" to see the full review submission and verification flow!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}