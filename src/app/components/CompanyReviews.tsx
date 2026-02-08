import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Flag, CheckCircle, Clock, TrendingDown } from 'lucide-react';
import { Review } from './CompanyReviewForm';

interface CompanyReviewsProps {
  companyName: string;
  reviews: Review[];
  averageRating: number;
  isSuspended?: boolean;
  onFlagReview?: (reviewId: string) => void;
}

export function CompanyReviews({ 
  companyName, 
  reviews, 
  averageRating,
  isSuspended = false,
  onFlagReview 
}: CompanyReviewsProps) {
  const [showFlagModal, setShowFlagModal] = useState<string | null>(null);
  const [flagReason, setFlagReason] = useState('');

  const totalReviews = reviews.length;
  const recommendCount = reviews.filter(r => r.wouldRecommend).length;
  const recommendPercent = totalReviews > 0 ? Math.round((recommendCount / totalReviews) * 100) : 0;

  // Calculate category averages
  const calculateAverage = (field: keyof Review) => {
    const validRatings = reviews
      .map(r => r[field])
      .filter(v => typeof v === 'number' && v > 0) as number[];
    
    if (validRatings.length === 0) return 0;
    return (validRatings.reduce((a, b) => a + b, 0) / validRatings.length).toFixed(1);
  };

  const categoryAverages = {
    workEnvironment: calculateAverage('workEnvironmentRating'),
    learningOpportunities: calculateAverage('learningOpportunitiesRating'),
    management: calculateAverage('managementRating'),
    compensation: calculateAverage('compensationRating'),
    workLifeBalance: calculateAverage('workLifeBalanceRating'),
  };

  const handleFlag = (reviewId: string) => {
    if (onFlagReview && flagReason.trim()) {
      onFlagReview(reviewId);
      setShowFlagModal(null);
      setFlagReason('');
    }
  };

  const StarDisplay = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Suspension Notice */}
      {isSuspended && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <TrendingDown className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-2">
                Company Suspended - Under Investigation
              </h3>
              <p className="text-red-800 mb-2">
                This company has been temporarily suspended from ZALPHA due to multiple concerning reviews 
                from students. Our team is investigating these reports to ensure student safety and fair treatment.
              </p>
              <p className="text-sm text-red-700">
                <strong>Students cannot apply to this company</strong> until the investigation is complete.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Overall Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Student Reviews for {companyName}</h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Overall Rating */}
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <StarDisplay rating={averageRating} />
            <p className="text-sm text-slate-600 mt-2">{totalReviews} total reviews</p>
          </div>

          {/* Recommendation Rate */}
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {recommendPercent}%
            </div>
            <p className="text-sm text-slate-700 font-medium">Would Recommend</p>
            <p className="text-xs text-slate-600 mt-1">
              {recommendCount} out of {totalReviews} students
            </p>
          </div>

          {/* Status */}
          <div className={`text-center p-4 rounded-lg ${
            isSuspended 
              ? 'bg-gradient-to-br from-red-50 to-orange-50' 
              : 'bg-gradient-to-br from-slate-50 to-gray-50'
          }`}>
            {isSuspended ? (
              <>
                <TrendingDown className="w-10 h-10 text-red-600 mx-auto mb-2" />
                <p className="font-bold text-red-900">Suspended</p>
                <p className="text-xs text-red-700 mt-1">Under Investigation</p>
              </>
            ) : (
              <>
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
                <p className="font-bold text-green-900">Active</p>
                <p className="text-xs text-green-700 mt-1">Good Standing</p>
              </>
            )}
          </div>
        </div>

        {/* Category Ratings */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-slate-900 mb-4">Rating Breakdown</h4>
          <div className="space-y-3">
            {[
              { label: 'Work Environment', value: categoryAverages.workEnvironment },
              { label: 'Learning Opportunities', value: categoryAverages.learningOpportunities },
              { label: 'Management', value: categoryAverages.management },
              { label: 'Compensation', value: categoryAverages.compensation },
              { label: 'Work-Life Balance', value: categoryAverages.workLifeBalance },
            ].map((category) => (
              <div key={category.label} className="flex items-center gap-4">
                <span className="text-sm text-slate-700 w-40">{category.label}</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(parseFloat(category.value) / 5) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900 w-12 text-right">
                  {category.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-900">Student Reviews ({totalReviews})</h4>
        
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-slate-600">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="font-semibold text-slate-900">{review.studentName}</h5>
                    {review.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                    {!review.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                        <Clock className="w-3 h-3" />
                        Pending Verification
                      </span>
                    )}
                    {review.flagCount > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                        <Flag className="w-3 h-3" />
                        {review.flagCount} flags
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">
                    {review.position} • {review.workPeriod}
                  </p>
                </div>
                <button
                  onClick={() => setShowFlagModal(review.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                  title="Flag review"
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <StarDisplay rating={review.overallRating} />
                {review.wouldRecommend ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    <ThumbsUp className="w-4 h-4" />
                    Recommends
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                    <ThumbsDown className="w-4 h-4" />
                    Doesn't Recommend
                  </span>
                )}
              </div>

              {/* Review Content */}
              {review.pros && (
                <div className="mb-3">
                  <h6 className="text-sm font-semibold text-green-700 mb-1">Pros:</h6>
                  <p className="text-sm text-slate-700">{review.pros}</p>
                </div>
              )}
              
              {review.cons && (
                <div className="mb-3">
                  <h6 className="text-sm font-semibold text-red-700 mb-1">Cons:</h6>
                  <p className="text-sm text-slate-700">{review.cons}</p>
                </div>
              )}
              
              {review.advice && (
                <div className="mb-3">
                  <h6 className="text-sm font-semibold text-blue-700 mb-1">Advice to Students:</h6>
                  <p className="text-sm text-slate-700">{review.advice}</p>
                </div>
              )}

              {/* Review Date */}
              <p className="text-xs text-slate-500 mt-4">
                Posted {new Date(review.createdAt).toLocaleDateString()}
              </p>

              {/* Flag Modal */}
              {showFlagModal === review.id && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl p-6 max-w-md w-full">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Flag Review</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Help us maintain review integrity. Why are you flagging this review?
                    </p>
                    <textarea
                      value={flagReason}
                      onChange={(e) => setFlagReason(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                      placeholder="Reason for flagging..."
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowFlagModal(null);
                          setFlagReason('');
                        }}
                        className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleFlag(review.id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Submit Flag
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}