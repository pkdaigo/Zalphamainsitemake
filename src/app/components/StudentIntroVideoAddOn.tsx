import { useState } from 'react';
import { Video, Sparkles, CheckCircle, Info, Play, Users, TrendingUp, Shield } from 'lucide-react';

interface StudentIntroVideoAddOnProps {
  onAccept?: () => void;
  onDecline?: () => void;
  onSetup?: () => void;
}

export default function StudentIntroVideoAddOn({
  onAccept,
  onDecline,
  onSetup
}: StudentIntroVideoAddOnProps) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
    if (onAccept) {
      onAccept();
    }
  };

  const handleDecline = () => {
    if (onDecline) {
      onDecline();
    }
  };

  const handleSetup = () => {
    if (onSetup) {
      onSetup();
    }
  };

  if (isAccepted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success State */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6">
              <CheckCircle className="w-9 h-9 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Intro Video Add-On Activated! 🎉
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
              Great choice! You're one step closer to standing out with a personal introduction video. 
              Let's set up your video profile to help regional employers and schools get to know the real you.
            </p>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Video className="w-6 h-6 text-cyan-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Record or upload your 60-90 second introduction</li>
                    <li>• Add captions and choose your background</li>
                    <li>• Preview before sharing with employers</li>
                    <li>• Track engagement from schools and recruiters</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={handleSetup}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Next: Set Up Your Intro Video
            </button>

            <p className="text-sm text-gray-500 mt-6">
              You can complete this later from your dashboard if you prefer.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Headline and Description */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-900">Optional Add-On</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Add a Student Intro Video
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Stand out to regional employers, colleges, and trade schools across the Western Pacific 
              and Asia-Pacific with a personal introduction video.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">More Human Connection</h3>
                  <p className="text-sm text-gray-600">
                    Let employers see your personality, energy, and communication style before an interview.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">More Memorable</h3>
                  <p className="text-sm text-gray-600">
                    Video intros help you stand out in a sea of text-based applications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Region-Friendly</h3>
                  <p className="text-sm text-gray-600">
                    Perfect for employers across Pacific Islands who value authentic connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Feature Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Video Thumbnail Placeholder */}
            <div className="relative bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 aspect-video flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-cyan-600 ml-1" />
                </div>
                <p className="text-white font-semibold text-lg">Preview Sample Video</p>
                <p className="text-white/80 text-sm mt-1">See what an intro video looks like</p>
              </div>
              
              {/* Corner Badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                EXAMPLE
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why Add an Intro Video?
              </h2>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-cyan-100 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                  <span className="text-gray-700">
                    <strong>Show your personality</strong> beyond your resume and portfolio
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-cyan-100 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                  <span className="text-gray-700">
                    <strong>Perfect for internships</strong> and first-job applications
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-cyan-100 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                  <span className="text-gray-700">
                    <strong>Works with regional employers</strong> and the contract marketplace
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-cyan-100 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                  <span className="text-gray-700">
                    <strong>Flexible format:</strong> record on phone or upload from computer
                  </span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    This is an <strong>optional add-on service</strong> powered by ZALPHA Recruit credits. 
                    No subscriptions required—use credits only when you're ready.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Add-On Details */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-6">
              <div className="relative">
                <h3 
                  className="text-xl font-bold text-gray-900 mb-2 cursor-help inline-flex items-center gap-2"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  Intro Video Add-On
                  <div className="inline-flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full">
                    <Info className="w-3 h-3 text-gray-600" />
                  </div>
                </h3>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute left-0 top-full mt-2 z-10 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                    <p className="leading-relaxed">
                      This is an optional add-on service. You'll use ZALPHA Recruit credits, 
                      not a monthly subscription.
                    </p>
                    <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-1">(Credits Only)</p>

              <div className="h-px bg-gray-200 my-4"></div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Uses ZALPHA Recruit credits. No monthly subscription required.
              </p>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">Beta Add-On</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Credit Pricing:</span>
                  <span className="font-semibold text-gray-900 bg-yellow-100 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Video Length:</span>
                  <span className="font-semibold text-gray-900">60-90 seconds</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-semibold text-gray-900">MP4, MOV, WebM</span>
                </div>
              </div>

              <div className="h-px bg-gray-200 my-6"></div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAccept}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold text-base hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Use Credits for Intro Video
                </button>

                <button
                  onClick={handleDecline}
                  className="w-full px-6 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold text-base hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  Maybe Later
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                You can always add this later from your profile settings
              </p>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">
                    Engagement Analytics
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Schools and colleges can view intro video engagement data alongside your existing 
                    profile metrics and reports—helping you understand which employers are most interested.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Row */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center">
              <Info className="w-6 h-6 text-cyan-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">
                How It Works with Your ZALPHA Profile
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Your intro video integrates seamlessly with your existing ZALPHA Recruit profile. 
                Employers viewing your application will see the video thumbnail alongside your skills assessments, 
                portfolio, and transcripts. Schools and career services can track engagement analytics to help you 
                understand which opportunities are the best fit. Everything stays in one platform—no need to 
                manage multiple accounts or services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
