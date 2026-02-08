import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { Rocket, TrendingUp, Crown, Check, X, Users, Briefcase, BarChart3, Video, Zap, Target, Award, Headphones, Mail, Phone, Star, Clock, Globe, Shield, DollarSign } from 'lucide-react';

interface EmployerPlanDemosProps {
  onNavigate: (page: string) => void;
}

const plans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    price: '$49.99',
    originalPrice: '$99',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50',
    description: 'Perfect for small businesses hiring their first Pacific talent',
    features: {
      included: [
        { name: 'Post up to 3 active jobs', icon: Briefcase },
        { name: 'Access to verified student database', icon: Users },
        { name: 'Basic applicant tracking', icon: Target },
        { name: 'Email notifications for applications', icon: Mail },
        { name: 'Standard job visibility (7 days)', icon: Clock },
        { name: 'Company profile page', icon: Globe },
        { name: 'Basic analytics dashboard', icon: BarChart3 },
        { name: 'Email support (48hr response)', icon: Headphones }
      ],
      excluded: [
        { name: 'AI talent matching', icon: Zap },
        { name: 'Video interview screening', icon: Video },
        { name: 'Skills assessment access', icon: Award },
        { name: 'Priority support', icon: Star },
        { name: 'Advanced analytics', icon: BarChart3 },
        { name: 'Featured job listings', icon: TrendingUp }
      ]
    },
    limits: {
      activeJobs: '3 active jobs',
      candidateViews: 'Unlimited student profiles',
      applications: 'Unlimited applications',
      jobDuration: '30-day job postings',
      analytics: 'Basic metrics only',
      support: 'Email only (48hr)'
    },
    bestFor: [
      'Small local businesses (1-10 employees)',
      'First-time hirers on ZALPHA',
      'Contract/part-time positions',
      'Businesses hiring 1-3 students per year'
    ],
    demoFeatures: [
      'Post your first job in under 5 minutes',
      'Browse verified student profiles by location',
      'Receive instant email alerts when students apply',
      'Track applications in simple dashboard'
    ]
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    price: '$249',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-50',
    description: 'For growing companies needing advanced hiring tools',
    popular: true,
    features: {
      included: [
        { name: 'Unlimited active job postings', icon: Briefcase },
        { name: 'AI talent matching (70-100% scores)', icon: Zap },
        { name: 'Video interview screening (Round 1)', icon: Video },
        { name: 'Access to skills assessment results', icon: Award },
        { name: 'Advanced applicant tracking', icon: Target },
        { name: 'Featured job listings (+50% visibility)', icon: TrendingUp },
        { name: 'Priority email & chat support', icon: Headphones },
        { name: 'Extended job visibility (14 days)', icon: Clock },
        { name: 'Company review management', icon: Star },
        { name: 'Advanced analytics & insights', icon: BarChart3 },
        { name: 'Candidate comparison tools', icon: Users },
        { name: 'Custom job templates', icon: Briefcase }
      ],
      excluded: [
        { name: '24/7 phone support', icon: Phone },
        { name: 'Dedicated account manager', icon: Headphones },
        { name: 'Custom integrations', icon: Globe },
        { name: 'White-label career page', icon: Shield }
      ]
    },
    limits: {
      activeJobs: 'Unlimited active jobs',
      candidateViews: 'Unlimited + AI match scores',
      applications: 'Unlimited applications',
      jobDuration: '60-day job postings',
      analytics: 'Full analytics suite',
      support: 'Priority email & chat (4hr)'
    },
    bestFor: [
      'Growing businesses (10-50 employees)',
      'Companies hiring 5-15 students annually',
      'Businesses needing quality screening',
      'Multi-location employers'
    ],
    demoFeatures: [
      'AI automatically matches top candidates (85%+ scores)',
      'Screen candidates with AI video interviews',
      'View verified skills assessment badges',
      'Get featured placement for faster hiring'
    ]
  },
  {
    id: 'ultra-premium',
    name: 'Ultra Premium Plan',
    price: '$499',
    originalPrice: '$799',
    icon: Crown,
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50',
    description: 'Enterprise-grade hiring with dedicated support',
    premium: true,
    features: {
      included: [
        { name: 'Everything in Professional Plan', icon: Check },
        { name: 'Dedicated account manager', icon: Headphones },
        { name: '24/7 priority phone support', icon: Phone },
        { name: 'Custom ATS integrations', icon: Globe },
        { name: 'White-label career page', icon: Shield },
        { name: 'Unlimited video interview rounds', icon: Video },
        { name: 'Custom skills assessments', icon: Award },
        { name: 'Exclusive access to top 10% students', icon: Star },
        { name: 'Job postings visible 30 days', icon: Clock },
        { name: 'ROI tracking & hiring analytics', icon: BarChart3 },
        { name: 'Employer branding services', icon: TrendingUp },
        { name: 'Quarterly strategy calls', icon: Target },
        { name: 'Early access to new features', icon: Zap },
        { name: 'Custom candidate sourcing', icon: Users }
      ],
      excluded: []
    },
    limits: {
      activeJobs: 'Unlimited active jobs',
      candidateViews: 'Unlimited + exclusive access',
      applications: 'Unlimited applications',
      jobDuration: '90-day job postings',
      analytics: 'Full suite + ROI tracking',
      support: '24/7 phone + account manager'
    },
    bestFor: [
      'Large enterprises (50+ employees)',
      'Companies hiring 15+ students annually',
      'Multi-location organizations',
      'Businesses needing custom solutions'
    ],
    demoFeatures: [
      'Dedicated account manager handles everything',
      'Custom integrations with your existing HR systems',
      'Access exclusive top 10% student talent pool',
      'White-label career page with your branding'
    ]
  }
];

export function EmployerPlanDemos({ onNavigate }: EmployerPlanDemosProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [showComparison, setShowComparison] = useState(false);

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1];
  const Icon = currentPlan.icon;

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Back Button */}
        <BackButton onNavigate={onNavigate} label="Back to Dashboard" />

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-sm font-semibold">
            <Zap className="w-4 h-4" />
            Interactive Plan Demos
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
            Explore ZALPHA Employer Plans
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the perfect plan for your hiring needs. Try interactive demos to see exactly what each plan offers.
          </p>
        </div>

        {/* Plan Selection Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative w-full sm:w-auto px-6 py-4 rounded-2xl border-2 transition-all ${
                  selectedPlan === plan.id
                    ? `border-${plan.borderColor} bg-gradient-to-r ${plan.color} text-white shadow-xl scale-105`
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                {plan.premium && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    BEST VALUE
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <PlanIcon className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-bold text-lg">{plan.name}</div>
                    <div className="text-sm opacity-90">
                      {plan.originalPrice && (
                        <span className="line-through mr-2">{plan.originalPrice}</span>
                      )}
                      {plan.price}/mo
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Comparison Toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-6 py-3 bg-white border-2 border-slate-300 rounded-xl hover:border-slate-400 hover:shadow-lg transition-all font-semibold text-slate-700"
          >
            {showComparison ? 'Hide' : 'Show'} Side-by-Side Comparison
          </button>
        </div>

        {showComparison ? (
          /* Side-by-Side Comparison Table */
          <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Feature</th>
                  {plans.map((plan) => {
                    const PlanIcon = plan.icon;
                    return (
                      <th key={plan.id} className={`py-4 px-4 bg-gradient-to-br ${plan.color} text-white rounded-t-xl`}>
                        <div className="flex flex-col items-center gap-2">
                          <PlanIcon className="w-8 h-8" />
                          <div className="font-bold">{plan.name}</div>
                          <div className="text-sm opacity-90">
                            {plan.originalPrice && (
                              <span className="line-through mr-2">{plan.originalPrice}</span>
                            )}
                            {plan.price}/mo
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-3 px-4 font-semibold">Active Jobs</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="py-3 px-4 text-center">{plan.limits.activeJobs}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="py-3 px-4 font-semibold">Candidate Access</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="py-3 px-4 text-center">{plan.limits.candidateViews}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 px-4 font-semibold">Job Duration</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="py-3 px-4 text-center">{plan.limits.jobDuration}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="py-3 px-4 font-semibold">Analytics</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="py-3 px-4 text-center">{plan.limits.analytics}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 px-4 font-semibold">Support</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="py-3 px-4 text-center text-sm">{plan.limits.support}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="py-3 px-4 font-semibold">AI Talent Matching</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="py-3 px-4 text-center">
                      {plan.id === 'starter' ? <X className="w-5 h-5 text-red-500 mx-auto" /> : <Check className="w-5 h-5 text-green-500 mx-auto" />}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 px-4 font-semibold">Video Interviews</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="py-3 px-4 text-center">
                      {plan.id === 'starter' ? <X className="w-5 h-5 text-red-500 mx-auto" /> : plan.id === 'ultra-premium' ? <span className="text-green-600 font-semibold">Unlimited</span> : <Check className="w-5 h-5 text-green-500 mx-auto" />}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="py-3 px-4 font-semibold">Dedicated Account Manager</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="py-3 px-4 text-center">
                      {plan.id === 'ultra-premium' ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          /* Individual Plan Demo */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Plan Details */}
            <div className="space-y-6">
              {/* Plan Card */}
              <div className={`bg-gradient-to-br ${currentPlan.color} text-white rounded-3xl shadow-2xl p-8 border-4 border-white`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Icon className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{currentPlan.name}</h2>
                    <p className="text-white/90 text-lg">
                      {currentPlan.originalPrice && (
                        <span className="line-through mr-2">{currentPlan.originalPrice}</span>
                      )}
                      {currentPlan.price}/month
                    </p>
                  </div>
                </div>
                <p className="text-white/90 text-lg">{currentPlan.description}</p>
              </div>

              {/* Features Included */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6 text-green-500" />
                  Included Features
                </h3>
                <div className="space-y-3">
                  {currentPlan.features.included.map((feature, idx) => {
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

              {/* Features Excluded */}
              {currentPlan.features.excluded.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <X className="w-6 h-6 text-red-500" />
                    Not Included
                  </h3>
                  <div className="space-y-3">
                    {currentPlan.features.excluded.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-200 opacity-60">
                          <FeatureIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                          <span className="text-slate-600 font-medium line-through">{feature.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Interactive Demo & Best For */}
            <div className="space-y-6">
              {/* Best For */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-500" />
                  Best For
                </h3>
                <div className="space-y-2">
                  {currentPlan.bestFor.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Demo Features */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg border-2 border-slate-300 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Try These Features
                </h3>
                <div className="space-y-3">
                  {currentPlan.demoFeatures.map((feature, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (feature.includes('AI')) onNavigate('candidate-search');
                        else if (feature.includes('video')) onNavigate('video-interview-ai-demo');
                        else if (feature.includes('Post')) onNavigate('employer-dashboard');
                        else if (feature.includes('analytics')) onNavigate('employer-roi-dashboard');
                      }}
                      className={`w-full p-4 bg-gradient-to-r ${currentPlan.color} text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold text-left flex items-center gap-3`}
                    >
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span>{feature}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Details */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-500" />
                  Plan Limits & Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="font-medium text-slate-700">Active Jobs:</span>
                    <span className="text-slate-900 font-bold">{currentPlan.limits.activeJobs}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="font-medium text-slate-700">Job Duration:</span>
                    <span className="text-slate-900 font-bold">{currentPlan.limits.jobDuration}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="font-medium text-slate-700">Analytics:</span>
                    <span className="text-slate-900 font-bold">{currentPlan.limits.analytics}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="font-medium text-slate-700">Support:</span>
                    <span className="text-slate-900 font-bold text-sm">{currentPlan.limits.support}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onNavigate('employer-signup')}
                className={`w-full py-4 bg-gradient-to-r ${currentPlan.color} text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg flex items-center justify-center gap-2`}
              >
                <Rocket className="w-6 h-6" />
                Start {currentPlan.name} - 3-Day Free Trial
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}