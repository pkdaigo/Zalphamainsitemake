import { DollarSign, Users, Target, TrendingUp, CheckCircle, Heart, Gift, Award, Calendar, MapPin, Briefcase, GraduationCap, Zap, Shield, Star, Play, Lock } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { useState } from 'react';

interface KickstarterCampaignProps {
  onNavigate: (page: string) => void;
}

export function KickstarterCampaign({ onNavigate }: KickstarterCampaignProps) {
  const [pledgeAmount, setPledgeAmount] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  // Campaign Stats
  const fundingGoal = 150000;
  const currentFunding = 42750; // Example: 28.5% funded
  const backers = 187;
  const daysLeft = 45;
  const percentFunded = Math.round((currentFunding / fundingGoal) * 100);

  const handlePledge = (tier: string, amount: number) => {
    setSelectedTier(tier);
    setPledgeAmount(amount);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 py-12 px-6">
      {/* Ocean Wave Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern-ks" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 50 Q 25 40, 50 50 T 100 50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                <path d="M0 60 Q 25 50, 50 60 T 100 60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern-ks)"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-full shadow-2xl mb-6 border-4 border-white/50">
            <Heart className="w-7 h-7 text-white" />
            <span className="text-2xl font-bold text-white">Kickstarter Campaign</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg px-4">
            Help Launch ZALPHA 🌺
          </h1>
          <p className="text-2xl text-white/95 max-w-4xl mx-auto drop-shadow-md mb-4">
            The Pacific's first job connection platform built FOR students BY Pacific Islanders
          </p>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Connecting 18-year-old high school graduates in CNMI, FSM, Guam, and Hawaii with verified local employment opportunities
          </p>
        </div>

        {/* Pledge Confirmation Banner */}
        {pledgeAmount && selectedTier && (
          <div className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl border-4 border-white/50 animate-pulse">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-12 h-12 text-white" />
              <div>
                <h3 className="text-2xl font-bold text-white">Thank You for Your Support! 🎉</h3>
                <p className="text-white/90 text-lg">
                  You've selected the <strong>{selectedTier}</strong> tier (${pledgeAmount})
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Campaign Stats */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border-4 border-cyan-300">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">
                ${currentFunding.toLocaleString()}
              </div>
              <div className="text-gray-600 font-semibold">pledged of ${fundingGoal.toLocaleString()} goal</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">{backers}</div>
              <div className="text-gray-600 font-semibold">backers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">{daysLeft}</div>
              <div className="text-gray-600 font-semibold">days to go</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">{percentFunded}%</div>
              <div className="text-gray-600 font-semibold">funded</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
                style={{ width: `${percentFunded}%` }}
              ></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700">{percentFunded}% Funded</span>
            </div>
          </div>

          {/* All or Nothing */}
          <div className="mt-6 bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <p className="text-center text-gray-700 font-semibold">
              ⚡ All-or-nothing funding • This project will only be funded if it reaches its goal by {new Date(Date.now() + daysLeft * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Video & Story Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Video */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-purple-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Play className="w-8 h-8 text-purple-600" />
              Campaign Video
            </h2>
            <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center border-4 border-purple-300 mb-4">
              <div className="text-center">
                <Play className="w-20 h-20 text-white mb-4 mx-auto" />
                <p className="text-white text-xl font-bold">Watch Our Story</p>
                <p className="text-white/80">3:45 minutes</p>
              </div>
            </div>
            <p className="text-gray-600 text-center">
              See how ZALPHA will transform job opportunities for Pacific Island youth
            </p>
          </div>

          {/* Quick Pitch */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-cyan-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why ZALPHA Matters</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">🎓 18-Year-Old Focus</h3>
                  <p className="text-gray-700 text-sm">Designed specifically for high school graduates who want to work, not attend college</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">🌺 Pacific-Only Platform</h3>
                  <p className="text-gray-700 text-sm">Exclusively serving CNMI, FSM, Guam, and Hawaii—no outside competition</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">🎮 Basic Skills Assessment</h3>
                  <p className="text-gray-700 text-sm">Game-style test proves workforce readiness to employers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">🚫 Replace Contract Workers</h3>
                  <p className="text-gray-700 text-sm">Local talent replaces CW1/H2 workers being phased out</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">💰 Crypto Payments</h3>
                  <p className="text-gray-700 text-sm">Students can earn and cash out cryptocurrency for gig work</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">🏫 School Revenue Share</h3>
                  <p className="text-gray-700 text-sm">Schools earn 5% commission on every job placement</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACKER REWARDS */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
            🎁 Backer Rewards
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tier 1: Early Supporter */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-4 border-green-300 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Early Supporter</h3>
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-4">$10</div>
              <ul className="space-y-2 text-gray-700 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  ZALPHA thank you email
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Name on "Supporters" page
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Campaign updates
                </li>
              </ul>
              <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
                <p className="text-xs text-gray-600"><strong>73 backers</strong> • Limited (227 left)</p>
              </div>
              <button
                onClick={() => handlePledge('Early Supporter', 10)}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                Pledge $10
              </button>
            </div>

            {/* Tier 2: Pacific Champion */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-4 border-cyan-300 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Pacific Champion</h3>
                <Award className="w-8 h-8 text-cyan-600" />
              </div>
              <div className="text-4xl font-bold text-cyan-600 mb-4">$50</div>
              <ul className="space-y-2 text-gray-700 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-600" />
                  All previous rewards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-600" />
                  ZALPHA branded sticker pack
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-600" />
                  Digital "Pacific Champion" badge
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-600" />
                  6 months free ad-free student account
                </li>
              </ul>
              <div className="bg-cyan-50 rounded-lg p-3 mb-4 border border-cyan-200">
                <p className="text-xs text-gray-600"><strong>52 backers</strong> • Limited (148 left)</p>
              </div>
              <button
                onClick={() => handlePledge('Pacific Champion', 50)}
                className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold hover:bg-cyan-700 transition-colors"
              >
                Pledge $50
              </button>
            </div>

            {/* Tier 3: Island Advocate */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-4 border-blue-300 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Island Advocate</h3>
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-4">$100</div>
              <ul className="space-y-2 text-gray-700 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  All previous rewards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  ZALPHA branded t-shirt
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  1 year free student Ultra Premium
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Early access to beta launch
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Name in app credits
                </li>
              </ul>
              <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                <p className="text-xs text-gray-600"><strong>34 backers</strong> • Limited (66 left)</p>
              </div>
              <button
                onClick={() => handlePledge('Island Advocate', 100)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                Pledge $100
              </button>
            </div>

            {/* Tier 4: Business Founder */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-4 border-purple-300 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Business Founder</h3>
                <Briefcase className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-4">$250</div>
              <ul className="space-y-2 text-gray-700 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  All previous rewards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  3 months FREE Employer Starter Plan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  Featured company profile
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  Priority customer support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  Logo on website "Founding Partners"
                </li>
              </ul>
              <div className="bg-purple-50 rounded-lg p-3 mb-4 border border-purple-200">
                <p className="text-xs text-gray-600"><strong>18 backers</strong> • Limited (32 left)</p>
              </div>
              <button
                onClick={() => handlePledge('Business Founder', 250)}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors"
              >
                Pledge $250
              </button>
            </div>

            {/* Tier 5: School Partner */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-4 border-orange-300 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">School Partner</h3>
                <GraduationCap className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-4">$500</div>
              <ul className="space-y-2 text-gray-700 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  All previous rewards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  FREE school revenue dashboard access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  Waived setup fees (save $299)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  Branded school portal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  Dedicated account manager
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  Logo on app "Partner Schools"
                </li>
              </ul>
              <div className="bg-orange-50 rounded-lg p-3 mb-4 border border-orange-200">
                <p className="text-xs text-gray-600"><strong>7 backers</strong> • Limited (13 left)</p>
              </div>
              <button
                onClick={() => handlePledge('School Partner', 500)}
                className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors"
              >
                Pledge $500
              </button>
            </div>

            {/* Tier 6: Enterprise Founding Partner */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl border-4 border-yellow-300 hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-xs font-bold rotate-12 transform translate-x-2 -translate-y-1">
                BEST VALUE
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Founding Partner</h3>
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-4">$1,000+</div>
              <ul className="space-y-2 text-white mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  All previous rewards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  6 months FREE Employer Ultra Premium
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Company logo on homepage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Exclusive "Founding Partner" badge
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Lifetime 20% discount
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Private strategy call with CEO
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Recognition at launch event
                </li>
              </ul>
              <div className="bg-white/20 rounded-lg p-3 mb-4 border border-white/40">
                <p className="text-xs text-white"><strong>3 backers</strong> • Limited (7 left)</p>
              </div>
              <button
                onClick={() => handlePledge('Founding Partner', 1000)}
                className="w-full bg-white text-orange-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Pledge $1,000+
              </button>
            </div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border-4 border-green-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-600" />
            How We'll Use the Funds
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32 font-bold text-gray-900">$60,000</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Platform Development</span>
                  <span className="text-gray-600">40%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: '40%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Complete core features, ID verification, skills assessment</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-32 font-bold text-gray-900">$30,000</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Marketing & Launch</span>
                  <span className="text-gray-600">20%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600" style={{ width: '20%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">CNMI beta launch campaign, student recruitment, employer outreach</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-32 font-bold text-gray-900">$25,000</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Legal & Compliance</span>
                  <span className="text-gray-600">17%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600" style={{ width: '17%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Business licenses, privacy compliance (GDPR/CCPA), terms of service</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-32 font-bold text-gray-900">$20,000</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">School Partnerships</span>
                  <span className="text-gray-600">13%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-600" style={{ width: '13%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Partnership agreements, revenue dashboard setup, training materials</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-32 font-bold text-gray-900">$15,000</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Infrastructure & Hosting</span>
                  <span className="text-gray-600">10%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: '10%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Servers, database, storage, cryptocurrency wallet integration</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <p className="text-gray-700 font-semibold text-center">
              ✅ Every dollar goes directly toward launching ZALPHA and helping Pacific Island youth find jobs!
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border-4 border-blue-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            Development Timeline
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div className="w-1 flex-1 bg-yellow-300 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Month 1-2: Platform Completion</h3>
                <p className="text-gray-700">Finish core features, ID verification, Basic Skills Assessment, crypto integration</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div className="w-1 flex-1 bg-blue-300 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Month 3: CNMI Beta Launch</h3>
                <p className="text-gray-700">500 student beta testers, 50 employers, gather feedback, iterate on features</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div className="w-1 flex-1 bg-purple-300 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Month 4-6: Guam Expansion</h3>
                <p className="text-gray-700">Partner with UOG, 5,000 student target, 200 employer accounts, local marketing</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Month 7-12: Hawaii & FSM Rollout</h3>
                <p className="text-gray-700">Full regional launch, 50,000+ students, 1,000+ employers, complete feature set</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border-4 border-purple-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                KI
              </div>
              <h3 className="font-bold text-gray-900 text-lg">KI Executive Group</h3>
              <p className="text-gray-600 mb-2">Founder & CEO</p>
              <p className="text-sm text-gray-700">Based in Saipan, CNMI. Passionate about connecting Pacific Island youth with opportunities.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                TD
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Tech Development Team</h3>
              <p className="text-gray-600 mb-2">Platform Engineers</p>
              <p className="text-sm text-gray-700">Experienced developers building scalable, secure platforms for Pacific communities.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                PA
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Partnership Advisors</h3>
              <p className="text-gray-600 mb-2">School & Business Relations</p>
              <p className="text-sm text-gray-700">Deep connections with schools and employers across all Pacific territories.</p>
            </div>
          </div>
        </div>

        {/* Risks & Challenges */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border-4 border-orange-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-orange-600" />
            Risks & Challenges
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">⚠️ ID Verification Complexity</h3>
              <p className="text-gray-700 mb-1"><strong>Challenge:</strong> Verifying student IDs across 4 territories with different systems.</p>
              <p className="text-gray-700"><strong>Solution:</strong> Partnering with schools directly for verification, manual review process initially.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">⚠️ Employer Adoption</h3>
              <p className="text-gray-700 mb-1"><strong>Challenge:</strong> Convincing employers to pay $99-$499/month for subscriptions.</p>
              <p className="text-gray-700"><strong>Solution:</strong> Free trial period, demonstrate ROI with quality candidates, Basic Skills Assessment data.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">⚠️ Internet Access in Remote Islands</h3>
              <p className="text-gray-700 mb-1"><strong>Challenge:</strong> Some FSM islands have limited internet connectivity.</p>
              <p className="text-gray-700"><strong>Solution:</strong> Mobile-first design, offline mode for Basic Skills Assessment, phased rollout starting in well-connected areas.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">⚠️ Cryptocurrency Complexity</h3>
              <p className="text-gray-700 mb-1"><strong>Challenge:</strong> Crypto payments may be unfamiliar to Pacific Island users.</p>
              <p className="text-gray-700"><strong>Solution:</strong> Crypto is OPTIONAL (not required), simple tutorials, instant USD cash-out, traditional payments always available.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-12 text-center border-4 border-white/50">
          <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            🌺 Join the Movement!
          </h2>
          <p className="text-2xl text-white/95 mb-8 max-w-3xl mx-auto">
            Help us launch the Pacific's first job platform built for 18-year-old high school graduates. Every pledge brings us closer to connecting local talent with opportunities!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              className="bg-white text-green-700 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              💚 Back This Project
            </button>
            <button
              onClick={() => onNavigate('demo-showcase')}
              className="bg-cyan-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all border-4 border-white/50"
            >
              👀 View Platform Demo
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Saipan, CNMI</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{backers} backers</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span>{daysLeft} days left</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <p className="text-white/90 mb-2">Questions about the campaign?</p>
          <p className="text-white font-bold text-lg">
            📧 contact@zalpharecruit.com | 📞 670-286-3010
          </p>
        </div>
      </div>
    </div>
  );
}