import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { Crown, Check, X, Video, Star, TrendingUp, Target, FileText, Award, Zap, Users, BarChart3, Shield, Sparkles, ChevronRight, DollarSign, MessageSquare, Calendar } from 'lucide-react';

interface StudentAddonDemoProps {
  onNavigate: (page: string) => void;
}

interface PremiumAddon {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  icon: any;
  color: string;
  popular?: boolean;
  description: string;
  benefits: string[];
  demo: string;
}

const freeFeatures = [
  { name: 'Unlimited job search & applications', icon: Target, included: true },
  { name: 'Basic student profile', icon: Users, included: true },
  { name: 'Resume upload (1 document)', icon: FileText, included: true },
  { name: 'Skills assessment access', icon: Award, included: true },
  { name: 'Company reviews & ratings', icon: Star, included: true },
  { name: 'Job alerts & notifications', icon: Zap, included: true },
  { name: 'Basic analytics (views, applications)', icon: BarChart3, included: true },
  { name: 'Email support (48hr response)', icon: MessageSquare, included: true }
];

const premiumAddons: PremiumAddon[] = [
  {
    id: 'video-intro',
    name: '60-Second Video Introduction',
    price: 'FREE',
    icon: Video,
    color: 'from-blue-500 to-cyan-500',
    description: 'Stand out with a professional video intro that employers see first',
    benefits: [
      '60-second video introduction',
      'Employers see your personality',
      '5x more profile views',
      'Higher callback rates',
      'Unlimited re-recording'
    ],
    demo: 'Record a short video introducing yourself, your skills, and career goals. Employers watch this before reading your resume!'
  },
  {
    id: 'premium-profile',
    name: 'Premium Profile Boost',
    price: '$5.00/mo',
    originalPrice: '$9.99/mo',
    icon: Crown,
    color: 'from-purple-500 to-pink-500',
    description: 'Get featured placement and priority visibility to employers',
    benefits: [
      'Featured on employer search results',
      '10x more employer views',
      'Priority profile placement',
      'Premium badge on profile',
      'Highlighted in job matches',
      'Weekly performance reports'
    ],
    demo: 'Your profile appears at the TOP of employer searches with a gold "Premium" badge. Employers see you first!'
  },
  {
    id: 'ultra-premium',
    name: 'Ultra Premium Package',
    price: '$8.99/mo',
    originalPrice: '$19.99/mo',
    icon: Sparkles,
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    popular: true,
    description: 'Full VIP experience with all features unlocked + Featured Until Hired',
    benefits: [
      'Everything in Premium Profile',
      '✨ FEATURED UNTIL HIRED - Then auto-downgrade to FREE',
      'AI-powered resume builder',
      'Professional resume templates',
      'Unlimited document uploads',
      'Priority job application review',
      'Verified references system',
      'Advanced analytics dashboard',
      'Career coach chat support',
      'Interview preparation tools',
      '24/7 priority support',
      'Exclusive job opportunities',
      'Salary negotiation guides'
    ],
    demo: 'Get the full ZALPHA VIP experience! Stand out with AI tools, priority placement, and dedicated career support. Once hired, automatically downgrade to FREE!'
  }
];

export function StudentAddonDemo({ onNavigate }: StudentAddonDemoProps) {
  const [selectedAddon, setSelectedAddon] = useState<string>('ultra-premium');
  const [showComparison, setShowComparison] = useState(false);

  const currentAddon = premiumAddons.find(a => a.id === selectedAddon) || premiumAddons[2];
  const Icon = currentAddon.icon;

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Back Button */}
        <BackButton onNavigate={onNavigate} label="Back to Dashboard" />

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold">
            <Crown className="w-4 h-4" />
            Student Premium Add-Ons
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 px-4">
            Unlock Your Full Potential 🌺
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
            Start for free, then upgrade to Premium features when you're ready to stand out!
          </p>
        </div>

        {/* Free vs Premium Toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-6 py-3 bg-white border-2 border-purple-300 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all font-semibold text-slate-700"
          >
            {showComparison ? 'Hide' : 'Compare'} Free vs Premium Features
          </button>
        </div>

        {showComparison && (
          /* Free vs Premium Comparison */
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">
              What's Included FREE vs Premium
            </h2>
            
            {/* Free Features */}
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                <Check className="w-6 h-6" />
                FREE Forever - No Credit Card Required
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {freeFeatures.map((feature, idx) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                      <FeatureIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-slate-800 font-medium">{feature.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-6">
              <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <Crown className="w-6 h-6" />
                Premium Add-Ons (Optional - Pay Only What You Need)
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {premiumAddons.map((addon) => {
                  const AddonIcon = addon.icon;
                  return (
                    <div key={addon.id} className={`relative p-6 bg-gradient-to-br ${addon.color} text-white rounded-2xl border-4 border-white shadow-xl`}>
                      {addon.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full">
                          MOST POPULAR
                        </div>
                      )}
                      <AddonIcon className="w-10 h-10 mb-3" />
                      <h4 className="font-bold text-lg mb-2">{addon.name}</h4>
                      <div className="text-2xl font-bold mb-3">{addon.price}</div>
                      <p className="text-white/90 text-sm mb-4">{addon.description}</p>
                      <div className="text-sm space-y-1">
                        {addon.benefits.slice(0, 3).map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                        {addon.benefits.length > 3 && (
                          <div className="text-white/80 text-xs italic">
                            +{addon.benefits.length - 3} more benefits
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Add-on Selection */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {premiumAddons.map((addon) => {
            const AddonIcon = addon.icon;
            return (
              <button
                key={addon.id}
                onClick={() => setSelectedAddon(addon.id)}
                className={`relative w-full sm:w-auto px-6 py-4 rounded-2xl border-2 transition-all ${
                  selectedAddon === addon.id
                    ? `bg-gradient-to-r ${addon.color} text-white shadow-xl scale-105 border-white`
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                {addon.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <AddonIcon className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-bold text-base">{addon.name}</div>
                    <div className="text-sm opacity-90">{addon.price}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Individual Add-on Demo */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Add-on Details */}
          <div className="space-y-6">
            {/* Add-on Card */}
            <div className={`bg-gradient-to-br ${currentAddon.color} text-white rounded-3xl shadow-2xl p-8 border-4 border-white`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Icon className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{currentAddon.name}</h2>
                  <div className="flex items-center gap-2">
                    {currentAddon.originalPrice && (
                      <span className="text-white/60 line-through text-lg">{currentAddon.originalPrice}</span>
                    )}
                    <p className="text-white/90 text-2xl font-bold">{currentAddon.price}</p>
                  </div>
                  {currentAddon.originalPrice && (
                    <div className="inline-block mt-1 px-2 py-0.5 bg-yellow-400 text-slate-900 text-xs font-bold rounded">
                      🎉 INTRODUCTORY PRICE
                    </div>
                  )}
                </div>
              </div>
              <p className="text-white/90 text-lg">{currentAddon.description}</p>
            </div>

            {/* Benefits List */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                What You Get
              </h3>
              <div className="space-y-3">
                {currentAddon.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-slate-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Impact */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border-2 border-green-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Expected Impact
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-xl border border-green-200">
                  <div className="text-3xl font-bold text-green-600">
                    {currentAddon.id === 'video-intro' ? '5x' : currentAddon.id === 'premium-profile' ? '10x' : '20x'}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">More Profile Views</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-green-200">
                  <div className="text-3xl font-bold text-green-600">
                    {currentAddon.id === 'video-intro' ? '3x' : currentAddon.id === 'premium-profile' ? '5x' : '8x'}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Faster Callbacks</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-green-200">
                  <div className="text-3xl font-bold text-green-600">
                    {currentAddon.id === 'video-intro' ? '70%' : currentAddon.id === 'premium-profile' ? '85%' : '95%'}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Interview Rate</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-green-200">
                  <div className="text-3xl font-bold text-green-600">
                    {currentAddon.id === 'video-intro' ? '2 wks' : currentAddon.id === 'premium-profile' ? '1 wk' : '3 days'}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Avg. Hire Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="space-y-6">
            {/* How It Works */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                How It Works
              </h3>
              <p className="text-slate-700 mb-4">{currentAddon.demo}</p>
              
              {currentAddon.id === 'video-intro' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <div className="font-semibold text-slate-900">Record Your Video</div>
                      <div className="text-sm text-slate-600">Use your phone or webcam - 60 seconds max</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <div className="font-semibold text-slate-900">Introduce Yourself</div>
                      <div className="text-sm text-slate-600">Share your name, skills, and career goals</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <div className="font-semibold text-slate-900">Go Live!</div>
                      <div className="text-sm text-slate-600">Employers see your video on every job application</div>
                    </div>
                  </div>
                </div>
              )}

              {currentAddon.id === 'premium-profile' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                    <Crown className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Featured Placement</div>
                      <div className="text-sm text-slate-600">Appear at the TOP of employer searches</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                    <Star className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Premium Badge</div>
                      <div className="text-sm text-slate-600">Gold badge shows you're serious</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Performance Reports</div>
                      <div className="text-sm text-slate-600">Weekly insights on who's viewing your profile</div>
                    </div>
                  </div>
                </div>
              )}

              {currentAddon.id === 'ultra-premium' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                    <Sparkles className="w-6 h-6 text-orange-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">AI Resume Builder</div>
                      <div className="text-sm text-slate-600">Professional templates optimized for ATS systems</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Verified References</div>
                      <div className="text-sm text-slate-600">Professional reference checking system</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Career Coach Chat</div>
                      <div className="text-sm text-slate-600">24/7 AI career guidance + human support</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Try Demo Button */}
            <button
              onClick={() => {
                if (currentAddon.id === 'video-intro') onNavigate('student-profile');
                else if (currentAddon.id === 'premium-profile') onNavigate('student-profile');
                else onNavigate('student-profile');
              }}
              className={`w-full py-3 sm:py-4 bg-gradient-to-r ${currentAddon.color} text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-base sm:text-lg flex items-center justify-center gap-2`}
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              Try Interactive Demo
            </button>

            {/* Pricing Details */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-500" />
                Pricing & Billing
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-200">
                  <span className="font-medium text-slate-700">Monthly Price:</span>
                  <div className="text-right">
                    {currentAddon.originalPrice && (
                      <div className="text-slate-400 line-through text-sm">{currentAddon.originalPrice}</div>
                    )}
                    <span className="text-green-600 font-bold text-lg">{currentAddon.price}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="font-medium text-slate-700">Billing:</span>
                  <span className="text-slate-900 font-semibold">Monthly (cancel anytime)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="font-medium text-slate-700">Free Trial:</span>
                  <span className="text-slate-900 font-semibold">7 days - no credit card</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="font-medium text-slate-700">Student Discount:</span>
                  <span className="text-blue-600 font-bold">Already Applied! 🎉</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onNavigate('student-profile')}
              className={`w-full py-4 bg-gradient-to-r ${currentAddon.color} text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg flex items-center justify-center gap-2 border-4 border-white shadow-xl`}
            >
              <Crown className="w-6 h-6" />
              Upgrade to {currentAddon.name}
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Guarantee */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-900">7-Day Money-Back Guarantee</span>
              </div>
              <p className="text-sm text-green-800">
                Try risk-free! If you're not 100% satisfied, get a full refund within 7 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}