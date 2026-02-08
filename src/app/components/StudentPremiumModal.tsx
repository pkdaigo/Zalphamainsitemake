import { X, Check, Video, Star, Crown, FileText, Target, Zap, TrendingUp } from 'lucide-react';

interface StudentPremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function StudentPremiumModal({ isOpen, onClose, onUpgrade }: StudentPremiumModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-pink-600 text-white p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Premium Membership</h2>
              <p className="text-white/90">Unlock Your Full Potential</p>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Plan</h3>
          
          <div className="grid gap-6 mb-8">
            {/* Premium - $6/month */}
            <div className="border-4 border-gradient-to-br from-amber-500 to-pink-600 rounded-2xl p-6 bg-gradient-to-br from-amber-50 to-pink-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Premium</h4>
                    <p className="text-sm text-gray-600">Complete Profile Package</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">$6</div>
                  <div className="text-sm text-gray-600">/month</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Video className="w-5 h-5 text-orange-600" />
                      Video Introduction
                    </h5>
                    <p className="text-sm text-gray-600">
                      60-second video to showcase your personality - profiles get 10x more views!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-orange-600" />
                      Transcript Upload & Verification
                    </h5>
                    <p className="text-sm text-gray-600">
                      Upload verified transcripts and GPA to prove your academic excellence
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-600" />
                      Skills Assessments for Employers
                    </h5>
                    <p className="text-sm text-gray-600">
                      Take verified skills tests that employers can see - earn "Workforce Ready" badges
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Crown className="w-5 h-5 text-orange-600" />
                      Premium Badge
                    </h5>
                    <p className="text-sm text-gray-600">
                      Stand out with a premium badge on your profile visible in all searches
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Unlimited Job Applications</h5>
                    <p className="text-sm text-gray-600">
                      Free users limited to 10/month - Premium gets unlimited
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Priority Application Review</h5>
                    <p className="text-sm text-gray-600">
                      Your applications appear at the top of employer queues
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Advanced Analytics</h5>
                    <p className="text-sm text-gray-600">
                      See who viewed your profile and track application performance
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={onUpgrade}
                className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Upgrade to Premium - $6/month
              </button>
            </div>

            {/* Featured Candidate - $19.99/30 days */}
            <div className="border-3 border-blue-400 rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Featured Candidate</h4>
                    <p className="text-sm text-gray-600">30-Day Spotlight Boost</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600">$19.99</div>
                  <div className="text-sm text-gray-600">/30 days</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-600" />
                      Featured Profile Placement
                    </h5>
                    <p className="text-sm text-gray-600">
                      Your profile appears at the TOP of all employer searches for 30 days
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      Featured Badge
                    </h5>
                    <p className="text-sm text-gray-600">
                      Bright "Featured" badge catches employer attention immediately
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      10x Profile Views
                    </h5>
                    <p className="text-sm text-gray-600">
                      Featured candidates get 10x more profile views and interview requests
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">One-Time 30-Day Payment</h5>
                    <p className="text-sm text-gray-600">
                      No recurring charges - option to renew after 30 days
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={onUpgrade}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Become Featured - $19.99/30 days
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                ✨ Combine with Premium for maximum visibility!
              </p>
            </div>

            {/* Job Coaches - Per Hour */}
            <div className="border-2 border-purple-300 rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">Job Coaches</h4>
                  <p className="text-sm text-gray-600">1-on-1 Expert Guidance</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                Get personalized career coaching, interview prep, resume reviews, and job search strategies from experienced professionals.
              </p>

              <div className="bg-white rounded-lg p-4 border-2 border-purple-200 mb-4">
                <div className="text-sm text-gray-600 mb-2">Pricing varies by coach:</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Entry-Level Coaches</span>
                    <span className="font-bold text-purple-600">$25-35/hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Experienced Coaches</span>
                    <span className="font-bold text-purple-600">$40-60/hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Industry Specialists</span>
                    <span className="font-bold text-purple-600">$75-100/hour</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onUpgrade}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Browse Job Coaches
              </button>
            </div>
          </div>

          {/* Close Button */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Maybe Later
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            All plans can be canceled anytime. Premium is monthly recurring. Featured is one-time for 30 days. Job Coaches are pay-per-session.
          </p>
        </div>
      </div>
    </div>
  );
}