import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FeatureRatingSystemProps {
  featureName: string;
  featureCategory: 'student' | 'employer' | 'career-services';
  userId: string;
  onComplete: (rating: FeatureRating) => void;
  onDismiss?: () => void;
}

interface FeatureRating {
  featureName: string;
  featureCategory: string;
  userId: string;
  rating: number; // 1-5 stars
  thumbs?: 'up' | 'down';
  easeOfUse: number; // 1-5
  usefulness: number; // 1-5
  wouldRecommend: boolean;
  comments: string;
  improvements: string;
  timestamp: number;
}

export function FeatureRatingSystem({ 
  featureName, 
  featureCategory, 
  userId, 
  onComplete,
  onDismiss 
}: FeatureRatingSystemProps) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState({
    featureName,
    featureCategory,
    userId,
    rating: 0,
    thumbs: undefined as 'up' | 'down' | undefined,
    easeOfUse: 0,
    usefulness: 0,
    wouldRecommend: false,
    comments: '',
    improvements: '',
    timestamp: Date.now()
  });
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleStarClick = (value: number, field: 'rating' | 'easeOfUse' | 'usefulness') => {
    setRating({ ...rating, [field]: value });
  };

  const handleSubmit = () => {
    onComplete(rating);
  };

  const getFeatureDisplayName = () => {
    const names: { [key: string]: string } = {
      'ai-interview-practice': 'AI Interview Practice with Airen',
      'skills-assessment': 'Skills Assessment Games',
      'job-matching': 'Job Matching Algorithm',
      'resume-builder': 'Resume Builder',
      'video-introduction': 'Video Introduction',
      'employer-dashboard': 'Employer Dashboard',
      'candidate-search': 'Candidate Search',
      'job-posting': 'Job Posting Tool',
      'contract-pricing': 'Contract-Based Pricing',
      'career-fair': 'Virtual Career Fair',
      'student-verification': 'Student Verification System',
    };
    return names[featureName] || featureName;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onDismiss}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl relative">
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-white">Beta Tester Feedback</h2>
            </div>
            <p className="text-white/90">Help us improve: {getFeatureDisplayName()}</p>
            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full ${
                    step >= s ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Step 1: Overall Rating & Quick Feedback */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    How would you rate this feature overall?
                  </h3>
                  <div className="flex gap-2 justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star, 'rating')}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-12 h-12 ${
                            star <= (hoveredStar || rating.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating.rating > 0 && (
                    <p className="text-center text-gray-600">
                      {rating.rating === 5 && '🎉 Amazing! So glad you love it!'}
                      {rating.rating === 4 && '😊 Great! We appreciate the positive feedback!'}
                      {rating.rating === 3 && '👍 Good! Help us make it even better!'}
                      {rating.rating === 2 && '🤔 Thanks for being honest. What can we improve?'}
                      {rating.rating === 1 && '😔 We hear you. Let us know how to fix this.'}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Quick reaction: How did this feature work for you?
                  </h3>
                  <div className="flex gap-4 justify-center">
                    <button
                      type="button"
                      onClick={() => setRating({ ...rating, thumbs: 'up' })}
                      className={`flex items-center gap-2 px-6 py-4 rounded-xl border-2 transition-all ${
                        rating.thumbs === 'up'
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'border-gray-300 text-gray-600 hover:border-green-500'
                      }`}
                    >
                      <ThumbsUp className="w-6 h-6" />
                      <span className="font-semibold">Worked Great!</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRating({ ...rating, thumbs: 'down' })}
                      className={`flex items-center gap-2 px-6 py-4 rounded-xl border-2 transition-all ${
                        rating.thumbs === 'down'
                          ? 'bg-red-50 border-red-500 text-red-700'
                          : 'border-gray-300 text-gray-600 hover:border-red-500'
                      }`}
                    >
                      <ThumbsDown className="w-6 h-6" />
                      <span className="font-semibold">Needs Work</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={rating.rating === 0}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 2: Detailed Ratings */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How easy was it to use?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    1 = Very confusing, 5 = Super intuitive
                  </p>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star, 'easeOfUse')}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= rating.easeOfUse
                              ? 'fill-blue-400 text-blue-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    How useful is this feature?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    1 = Not useful, 5 = Extremely valuable
                  </p>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star, 'usefulness')}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= rating.usefulness
                              ? 'fill-purple-400 text-purple-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Would you recommend this to others?
                  </h3>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRating({ ...rating, wouldRecommend: true })}
                      className={`flex-1 px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                        rating.wouldRecommend
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'border-gray-300 text-gray-600 hover:border-green-500'
                      }`}
                    >
                      ✅ Yes, definitely!
                    </button>
                    <button
                      type="button"
                      onClick={() => setRating({ ...rating, wouldRecommend: false })}
                      className={`flex-1 px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                        !rating.wouldRecommend && rating.wouldRecommend !== undefined
                          ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                          : 'border-gray-300 text-gray-600 hover:border-yellow-500'
                      }`}
                    >
                      🤔 Maybe later
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={rating.easeOfUse === 0 || rating.usefulness === 0}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Comments & Improvements */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    What did you like or dislike about this feature?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Be honest—we want to know what worked and what didn't!
                  </p>
                  <textarea
                    value={rating.comments}
                    onChange={(e) => setRating({ ...rating, comments: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="The AI interview practice was realistic, but it felt a bit slow loading..."
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    If you could change ONE thing, what would it be?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Your improvement ideas directly shape our development roadmap!
                  </p>
                  <textarea
                    value={rating.improvements}
                    onChange={(e) => setRating({ ...rating, improvements: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add more practice questions, make the interface simpler, add a skip button..."
                  />
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-900">
                    <strong>🙏 Thank you!</strong> Your feedback is invaluable to us. After submitting, 
                    you won't be asked to rate features again—we'll just quietly track your usage patterns 
                    to see what you use most!
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                  >
                    Submit Feedback 🚀
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Lightweight prompt for first-time feature use
export function FeatureRatingPrompt({ 
  featureName, 
  onRate, 
  onSkip 
}: { 
  featureName: string; 
  onRate: () => void; 
  onSkip: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border-2 border-blue-200 z-40"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Quick Feedback?</h4>
          <p className="text-sm text-gray-600">
            You just tried <strong>{featureName}</strong>. Mind sharing your thoughts?
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onSkip}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
        >
          Maybe Later
        </button>
        <button
          onClick={onRate}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
        >
          Sure! 👍
        </button>
      </div>
    </motion.div>
  );
}
