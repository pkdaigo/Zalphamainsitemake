import { useState } from 'react';
import { Palette, Navigation, Smartphone, Monitor, Eye, MessageSquare, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UXUIFeedbackProps {
  userId: string;
  userType: 'student' | 'employer' | 'career-services' | 'ada' | 'general';
  currentPage: string;
  onComplete: (feedback: UXUIFeedback) => void;
  onDismiss?: () => void;
}

interface UXUIFeedback {
  userId: string;
  userType: string;
  currentPage: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  
  // Overall Experience
  overallRating: number;
  easyToUse: number;
  visuallyAppealing: number;
  
  // Colors & Design
  colorSchemeRating: number;
  colorsEasyToRead: 'yes' | 'no' | 'sometimes';
  colorsLiked: string;
  colorsDisliked: string;
  contrastIssues: string;
  
  // Navigation
  navigationRating: number;
  easyToFindThings: 'very-easy' | 'easy' | 'okay' | 'difficult' | 'very-difficult';
  navigationIssues: string;
  missingFeatures: string;
  
  // Mobile Experience
  mobileRating: number;
  mobileIssues: string;
  touchTargetsOkay: 'yes' | 'no' | 'sometimes';
  textReadableOnMobile: 'yes' | 'no' | 'too-small';
  mobileSuggestions: string;
  
  // Specific Issues
  whatYouLike: string;
  whatYouDislike: string;
  whatIsConfusing: string;
  whatIsMissing: string;
  improvements: string;
  
  timestamp: number;
}

export function UXUIFeedbackSystem({ userId, userType, currentPage, onComplete, onDismiss }: UXUIFeedbackProps) {
  const [step, setStep] = useState(1);
  const [deviceType] = useState<'mobile' | 'tablet' | 'desktop'>(
    window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop'
  );
  
  const [feedback, setFeedback] = useState<Partial<UXUIFeedback>>({
    userId,
    userType,
    currentPage,
    deviceType,
    overallRating: 0,
    easyToUse: 0,
    visuallyAppealing: 0,
    colorSchemeRating: 0,
    colorsEasyToRead: 'yes',
    colorsLiked: '',
    colorsDisliked: '',
    contrastIssues: '',
    navigationRating: 0,
    easyToFindThings: 'easy',
    navigationIssues: '',
    missingFeatures: '',
    mobileRating: 0,
    mobileIssues: '',
    touchTargetsOkay: 'yes',
    textReadableOnMobile: 'yes',
    mobileSuggestions: '',
    whatYouLike: '',
    whatYouDislike: '',
    whatIsConfusing: '',
    whatIsMissing: '',
    improvements: ''
  });

  const handleStarClick = (field: string, value: number) => {
    setFeedback({ ...feedback, [field]: value });
  };

  const handleSubmit = () => {
    const completeFeedback: UXUIFeedback = {
      ...feedback,
      timestamp: Date.now()
    } as UXUIFeedback;
    
    onComplete(completeFeedback);
  };

  const totalSteps = deviceType === 'mobile' ? 4 : 3;

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
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl relative">
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            )}
            <div className="flex items-center gap-3 mb-2">
              <Palette className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-white">Help Us Improve!</h2>
            </div>
            <p className="text-white/90">Your feedback on colors, navigation, and mobile experience</p>
            <p className="text-yellow-200 text-sm mt-2 font-semibold">✨ All questions are optional - skip any you want!</p>
            <div className="mt-4 flex gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    step > i ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Step 1: Overall Experience */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    How would you rate your overall experience?
                  </h3>
                  <div className="flex gap-2 justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick('overallRating', star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-12 h-12 ${
                            star <= (feedback.overallRating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Is the platform easy to use?
                  </h3>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick('easyToUse', star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= (feedback.easyToUse || 0)
                              ? 'fill-blue-400 text-blue-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    1 = Very confusing, 5 = Super easy
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Is the platform visually appealing?
                  </h3>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick('visuallyAppealing', star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= (feedback.visuallyAppealing || 0)
                              ? 'fill-purple-400 text-purple-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    1 = Ugly/hard to look at, 5 = Beautiful design
                  </p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!feedback.overallRating || !feedback.easyToUse || !feedback.visuallyAppealing}
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 2: Colors & Design */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Colors & Design</h3>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    How do you like the color scheme?
                  </label>
                  <div className="flex gap-2 justify-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick('colorSchemeRating', star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= (feedback.colorSchemeRating || 0)
                              ? 'fill-pink-400 text-pink-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Are the colors easy to read?
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: 'yes', label: '✅ Yes, easy to read', color: 'green' },
                      { value: 'sometimes', label: '⚠️ Sometimes hard', color: 'yellow' },
                      { value: 'no', label: '❌ Hard to read', color: 'red' }
                    ].map(({ value, label, color }) => (
                      <button
                        key={value}
                        onClick={() => setFeedback({ ...feedback, colorsEasyToRead: value as any })}
                        className={`flex-1 px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          feedback.colorsEasyToRead === value
                            ? `bg-${color}-50 border-${color}-500 text-${color}-700`
                            : 'border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    What colors do you LIKE?
                  </label>
                  <textarea
                    value={feedback.colorsLiked}
                    onChange={(e) => setFeedback({ ...feedback, colorsLiked: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="The blues are nice, love the purple headers, green buttons work well..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    What colors do you DISLIKE or find hard to read?
                  </label>
                  <textarea
                    value={feedback.colorsDisliked}
                    onChange={(e) => setFeedback({ ...feedback, colorsDisliked: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Gray text is too light, red on green is hard to see, too much yellow..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Any contrast issues? (Text hard to see on backgrounds?)
                  </label>
                  <textarea
                    value={feedback.contrastIssues}
                    onChange={(e) => setFeedback({ ...feedback, contrastIssues: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Light text on light background, can't read labels, buttons blend in..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Navigation */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Navigation className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Navigation & Usability</h3>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    How easy is it to navigate the platform?
                  </label>
                  <div className="flex gap-2 justify-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick('navigationRating', star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= (feedback.navigationRating || 0)
                              ? 'fill-blue-400 text-blue-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Is it easy to find what you're looking for?
                  </label>
                  <select
                    value={feedback.easyToFindThings}
                    onChange={(e) => setFeedback({ ...feedback, easyToFindThings: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="very-easy">Very easy - no issues</option>
                    <option value="easy">Easy - figured it out</option>
                    <option value="okay">Okay - takes some time</option>
                    <option value="difficult">Difficult - get lost sometimes</option>
                    <option value="very-difficult">Very difficult - very confusing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    What navigation issues have you experienced?
                  </label>
                  <textarea
                    value={feedback.navigationIssues}
                    onChange={(e) => setFeedback({ ...feedback, navigationIssues: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Can't find profile, back button doesn't work, menu is hidden, got stuck..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    What features are you looking for but can't find?
                  </label>
                  <textarea
                    value={feedback.missingFeatures}
                    onChange={(e) => setFeedback({ ...feedback, missingFeatures: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Search jobs, view messages, edit profile, help/FAQ, contact support..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => deviceType === 'mobile' ? setStep(4) : handleSubmit()}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
                  >
                    {deviceType === 'mobile' ? 'Continue' : 'Submit Feedback 🚀'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Mobile-Specific (only if on mobile) */}
            {step === 4 && deviceType === 'mobile' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Mobile Experience</h3>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    How is your experience on mobile?
                  </label>
                  <div className="flex gap-2 justify-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick('mobileRating', star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= (feedback.mobileRating || 0)
                              ? 'fill-green-400 text-green-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Are buttons/links easy to tap?
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: 'yes', label: '✅ Yes, easy to tap' },
                      { value: 'sometimes', label: '⚠️ Sometimes too small' },
                      { value: 'no', label: '❌ Too small to tap' }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setFeedback({ ...feedback, touchTargetsOkay: value as any })}
                        className={`flex-1 px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          feedback.touchTargetsOkay === value
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Is text readable on your phone?
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: 'yes', label: '✅ Yes, readable' },
                      { value: 'too-small', label: '⚠️ Too small' },
                      { value: 'no', label: '❌ Can\'t read it' }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setFeedback({ ...feedback, textReadableOnMobile: value as any })}
                        className={`flex-1 px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          feedback.textReadableOnMobile === value
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    What mobile issues have you experienced?
                  </label>
                  <textarea
                    value={feedback.mobileIssues}
                    onChange={(e) => setFeedback({ ...feedback, mobileIssues: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Text too small, buttons overlap, page doesn't fit screen, slow loading..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    How can we improve the mobile experience?
                  </label>
                  <textarea
                    value={feedback.mobileSuggestions}
                    onChange={(e) => setFeedback({ ...feedback, mobileSuggestions: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Bigger buttons, simpler menu, less scrolling, mobile app instead..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
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

// Lightweight prompt to trigger UX/UI feedback
export function UXUIFeedbackPrompt({ 
  onStart, 
  onDismiss 
}: { 
  onStart: () => void; 
  onDismiss: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border-2 border-purple-200 z-40"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Palette className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Quick Design Feedback?</h4>
          <p className="text-sm text-gray-600">
            Help us improve colors, navigation, and mobile experience!
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onDismiss}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
        >
          Not Now
        </button>
        <button
          onClick={onStart}
          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
        >
          Sure! 🎨
        </button>
      </div>
    </motion.div>
  );
}