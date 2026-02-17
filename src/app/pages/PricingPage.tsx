import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { Check, Zap, TrendingUp, Crown, Sparkles, CreditCard, Coins, Building2, GraduationCap, ArrowRight, Info } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: string) => void;
  userType?: 'student' | 'employer';
}

export function PricingPage({ onNavigate, userType = 'student' }: PricingPageProps) {
  const [selectedType, setSelectedType] = useState<'student' | 'employer'>(userType);

  // Credit usage guide
  const creditUsage = [
    { action: 'AI Interview Practice Session', credits: 2, icon: '🎤' },
    { action: 'Premium Job Application', credits: 1, icon: '📝' },
    { action: 'AI Resume Review', credits: 3, icon: '📄' },
    { action: 'Skills Assessment Game', credits: 2, icon: '🎮' },
    { action: 'Profile Boost (7 days)', credits: 5, icon: '⭐' },
    { action: 'Direct Message to Employer', credits: 1, icon: '💬' },
    { action: 'Video Resume Creation', credits: 4, icon: '🎥' },
    { action: 'Career Path AI Guidance', credits: 2, icon: '🧭' },
  ];

  const studentPlans = [
    {
      name: 'Starter',
      price: 3.99,
      credits: 10,
      creditsPerMonth: 10,
      popular: false,
      color: 'from-blue-400 to-cyan-400',
      features: [
        '10 credits per month',
        'Rollover unused credits',
        'Basic job applications',
        'Profile creation',
        'Job search & filters',
        'Email notifications',
        'Mobile app access',
      ],
      bonus: null,
    },
    {
      name: 'Builder',
      price: 9.99,
      credits: 30,
      creditsPerMonth: 30,
      popular: true,
      color: 'from-purple-500 to-pink-500',
      features: [
        '30 credits per month',
        'Rollover unused credits',
        'All Starter features',
        'AI interview practice',
        'Skills assessments',
        'Resume AI reviews',
        'Priority support',
        'Profile boost 1x/month',
      ],
      bonus: '+5 bonus credits on signup!',
    },
    {
      name: 'Pro',
      price: 14.99,
      credits: 60,
      creditsPerMonth: 60,
      popular: false,
      color: 'from-orange-500 to-amber-500',
      features: [
        '60 credits per month',
        'Rollover unused credits',
        'All Builder features',
        'Unlimited job applications',
        'Video resume creation',
        'Career path AI guidance',
        'Direct employer messaging',
        'Profile boost 2x/month',
        'Premium support',
      ],
      bonus: '+10 bonus credits on signup!',
    },
  ];

  const employerPlans = [
    {
      name: 'Essentials',
      price: 29.99,
      credits: 50,
      creditsPerMonth: 50,
      popular: false,
      color: 'from-cyan-500 to-blue-500',
      features: [
        '50 credits per month',
        'Post up to 5 jobs',
        'Search student database',
        'View 25 full profiles',
        'Basic applicant tracking',
        'Email support',
        'Job posting templates',
      ],
      bonus: null,
    },
    {
      name: 'Growth',
      price: 79.99,
      credits: 150,
      creditsPerMonth: 150,
      popular: true,
      color: 'from-purple-500 to-pink-500',
      features: [
        '150 credits per month',
        'Post up to 15 jobs',
        'All Essentials features',
        'View 100 full profiles',
        'Advanced search filters',
        'Skills assessment results',
        'Video interview access',
        'Featured job listings',
        'Priority support',
      ],
      bonus: '+25 bonus credits on signup!',
    },
    {
      name: 'Enterprise',
      price: 149.99,
      credits: 350,
      creditsPerMonth: 350,
      popular: false,
      color: 'from-orange-500 to-amber-600',
      features: [
        '350 credits per month',
        'Unlimited job postings',
        'All Growth features',
        'Unlimited profile views',
        'Dedicated account manager',
        'Custom branding',
        'API access',
        'Virtual job fair hosting',
        'Analytics dashboard',
        'White-label options',
      ],
      bonus: '+50 bonus credits on signup!',
    },
  ];

  const employerCreditUsage = [
    { action: 'View Full Student Profile', credits: 2, icon: '👤' },
    { action: 'Post Standard Job Listing', credits: 10, icon: '📋' },
    { action: 'Featured Job Listing (7 days)', credits: 20, icon: '⭐' },
    { action: 'Direct Message to Student', credits: 1, icon: '💬' },
    { action: 'Video Interview Invitation', credits: 5, icon: '🎥' },
    { action: 'Access Skills Assessment Results', credits: 3, icon: '📊' },
    { action: 'Download Resume/Transcript', credits: 2, icon: '📄' },
    { action: 'Virtual Job Fair Booth (30 days)', credits: 50, icon: '🏢' },
  ];

  const plans = selectedType === 'student' ? studentPlans : employerPlans;
  const usage = selectedType === 'student' ? creditUsage : employerCreditUsage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
      <BackButton onClick={() => onNavigate('landing')} />

      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coins className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-black">
              Credit-Based Pricing
            </h1>
          </div>
          <p className="text-xl text-white/90 mb-8">
            Pay only for what you use. Credits never expire, and unused credits roll over!
          </p>

          {/* User Type Toggle */}
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto bg-white/20 backdrop-blur-sm rounded-2xl p-2">
            <button
              onClick={() => setSelectedType('student')}
              className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                selectedType === 'student'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Students
            </button>
            <button
              onClick={() => setSelectedType('employer')}
              className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                selectedType === 'employer'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-5 h-5" />
              Employers
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:scale-105 ${
                plan.popular ? 'ring-4 ring-purple-500 relative' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Header */}
              <div className={`bg-gradient-to-br ${plan.color} p-6 text-white`}>
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-black">${plan.price}</span>
                  <span className="text-white/80">/month</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-2">
                  <div className="flex items-center justify-center gap-2">
                    <Coins className="w-5 h-5" />
                    <span className="text-2xl font-bold">{plan.credits} Credits</span>
                  </div>
                  <p className="text-xs text-white/80 text-center mt-1">
                    per month
                  </p>
                </div>
                {plan.bonus && (
                  <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg px-3 py-2 text-center text-sm font-bold">
                    🎁 {plan.bonus}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => onNavigate(selectedType === 'student' ? 'student-signup' : 'employer-signup')}
                  className={`w-full px-6 py-4 bg-gradient-to-r ${plan.color} text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold flex items-center justify-center gap-2`}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pay As You Go Option */}
        <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 rounded-2xl p-8 mb-12 text-white shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CreditCard className="w-10 h-10" />
              <h2 className="text-3xl font-black">Or Pay As You Go</h2>
            </div>
            <p className="text-center text-white/90 mb-8 text-lg">
              Don't want a monthly plan? Buy credits whenever you need them!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { credits: 5, price: 2.99, bonus: null },
                { credits: 15, price: 7.99, bonus: '+2 bonus' },
                { credits: 30, price: 14.99, bonus: '+5 bonus' },
                { credits: 100, price: 39.99, bonus: '+15 bonus' },
              ].map((pack, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all text-center"
                >
                  <div className="text-4xl font-black mb-2">{pack.credits}</div>
                  <div className="text-sm text-white/70 mb-3">credits</div>
                  <div className="text-2xl font-bold mb-2">${pack.price}</div>
                  {pack.bonus && (
                    <div className="text-xs bg-amber-500/30 rounded-full px-3 py-1 inline-block">
                      {pack.bonus}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate(selectedType === 'student' ? 'student-signup' : 'employer-signup')}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                Buy Credits Now
                <Zap className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Credit Usage Guide */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-black text-gray-900">
              How Credits Work
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Each action on ZALPHA costs a certain number of credits. Here's what you can do with your credits:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usage.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-gray-800">{item.action}</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-bold text-sm">
                  <Coins className="w-4 h-4" />
                  {item.credits}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200">
            <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Credits Roll Over</h3>
            <p className="text-gray-600">
              Unused credits never expire! They roll over month to month, so you never lose what you paid for.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Usage</h3>
            <p className="text-gray-600">
              Use your credits however you want! Focus on interviews, applications, or profile boosts - you decide.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Anytime</h3>
            <p className="text-gray-600">
              No long-term contracts! Cancel your subscription anytime and keep using your remaining credits.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-white rounded-xl p-4 shadow-sm">
              <summary className="font-bold text-gray-900 cursor-pointer">
                What happens if I run out of credits?
              </summary>
              <p className="text-gray-600 mt-2 text-sm">
                You can buy more credits anytime using our pay-as-you-go option, or wait until your monthly credits refresh. Basic features like browsing jobs and viewing your profile are always free!
              </p>
            </details>
            <details className="bg-white rounded-xl p-4 shadow-sm">
              <summary className="font-bold text-gray-900 cursor-pointer">
                Do credits expire?
              </summary>
              <p className="text-gray-600 mt-2 text-sm">
                No! All credits roll over month to month. As long as you maintain an active account, your credits never expire.
              </p>
            </details>
            <details className="bg-white rounded-xl p-4 shadow-sm">
              <summary className="font-bold text-gray-900 cursor-pointer">
                Can I change plans later?
              </summary>
              <p className="text-gray-600 mt-2 text-sm">
                Absolutely! You can upgrade or downgrade your plan anytime. Your existing credits will carry over to your new plan.
              </p>
            </details>
            <details className="bg-white rounded-xl p-4 shadow-sm">
              <summary className="font-bold text-gray-900 cursor-pointer">
                Is there a free trial?
              </summary>
              <p className="text-gray-600 mt-2 text-sm">
                Yes! New users get 5 free credits to explore ZALPHA. Plus, we offer signup bonuses with most paid plans!
              </p>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of Pacific Island students and employers on ZALPHA!
          </p>
          <button
            onClick={() => onNavigate(selectedType === 'student' ? 'student-signup' : 'employer-signup')}
            className="px-12 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-black text-xl inline-flex items-center gap-3"
          >
            <Sparkles className="w-6 h-6" />
            Sign Up Now
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
