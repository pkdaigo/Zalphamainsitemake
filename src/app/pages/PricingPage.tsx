import { Check, Star, Zap, Shield, FileText } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Home" />
        </div>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            ZALPHA is <span className="font-bold text-blue-600">100% free</span> for students. 
            Upgrade to Ultra Premium for exclusive features.
          </p>
        </div>

        {/* BETA FREEMIUM OFFER - Prominent Banner */}
        <div className="mb-12 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-4 border-white shadow-2xl">
            <div className="text-center">
              <div className="inline-block bg-white px-4 sm:px-6 py-2 rounded-full mb-4">
                <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                  🎉 BETA LAUNCH SPECIAL 🎉
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                6 Months FREE for Beta Users!
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 max-w-3xl mx-auto px-2">
                Be among the first employers to join ZALPHA! Sign up during our beta period and get 
                <strong className="text-white"> 6 months of Premium access absolutely FREE</strong> — no credit card required.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-3xl font-bold text-white mb-1">✅</p>
                  <p className="text-white font-semibold text-sm sm:text-base">All Premium Features</p>
                  <p className="text-white/80 text-xs sm:text-sm">Full platform access</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-3xl font-bold text-white mb-1">🎁</p>
                  <p className="text-white font-semibold text-sm sm:text-base">No Credit Card</p>
                  <p className="text-white/80 text-xs sm:text-sm">Zero commitment</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-3xl font-bold text-white mb-1">💡</p>
                  <p className="text-white font-semibold text-sm sm:text-base">Shape the Platform</p>
                  <p className="text-white/80 text-xs sm:text-sm">Your feedback matters</p>
                </div>
              </div>
              <p className="text-white/90 text-xs sm:text-sm italic px-2">
                After 6 months, choose to continue with a paid plan or cancel anytime — no obligations!
              </p>
            </div>
          </div>
        </div>

        {/* Student Pricing */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">For Students</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Forever</h3>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  $0<span className="text-lg sm:text-xl text-gray-600 font-normal">/month</span>
                </div>
                <p className="text-gray-600">Perfect for job seekers</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">ID verification & verified badge</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited job applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Resume uploads</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Company reviews access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Job alerts & notifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Profile visibility to employers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Tai Assistant (AI chatbot)</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate('student-signup')}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Sign Up Free
              </button>
            </div>

            {/* Ultra Premium */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 border-2 border-purple-400 relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-4 py-1 bg-white text-purple-600 text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  PREMIUM
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Ultra Premium</h3>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                  $19.99<span className="text-lg sm:text-xl text-purple-100 font-normal">/month</span>
                </div>
                <p className="text-purple-100">For serious job seekers</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white font-medium">Everything in Free, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white"><strong>Official transcript sharing</strong> with employers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white"><strong>Transcript verification badge</strong> on your profile</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white">Opt-in/opt-out transcript sharing control</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white"><strong>Priority application placement</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white">Track which employers viewed your transcripts</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white">Priority customer support</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate('student-signup')}
                className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold text-lg shadow-lg"
              >
                Upgrade to Ultra Premium
              </button>
            </div>
          </div>
        </div>

        {/* Employer Pricing */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">For Employers</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Access verified talent from across the Western Pacific region
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Free Contract Work Tier */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Contract Work</h3>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  FREE
                </div>
                <p className="text-gray-600">Perfect for solo contractors</p>
                <p className="text-sm text-gray-500 mt-2">1 seat included</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Post contract positions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Up to 3 active job postings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic candidate search</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email notifications</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate('employer-signup')}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
              >
                Sign Up Free
              </button>
            </div>
            
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  $99<span className="text-lg sm:text-xl text-gray-600 font-normal">/month</span>
                </div>
                <p className="text-green-600 font-semibold text-sm mb-1">3-Day Free Trial</p>
                <p className="text-gray-600">For small businesses</p>
                <p className="text-sm text-gray-500 mt-2">3 seats included</p>
                <p className="text-xs text-gray-400">+$25/seat/month for additional users</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Post up to 5 active jobs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Access verified student profiles</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Applicant tracking system</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Company profile page</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email notifications</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate('employer-signup')}
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg"
              >
                Start Free Trial
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-300">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">Professional</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">POPULAR</span>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  $249<span className="text-lg sm:text-xl text-gray-600 font-normal">/month</span>
                </div>
                <p className="text-green-600 font-semibold text-sm mb-1">3-Day Free Trial</p>
                <p className="text-gray-600">For growing companies</p>
                <p className="text-sm text-gray-500 mt-2">5 seats included</p>
                <p className="text-xs text-gray-400">+$35/seat/month for additional users</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Everything in Starter, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited job postings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Featured job listings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>View student transcripts</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Advanced filtering & search</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">ZALPHA ATS integration</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate('employer-signup')}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Start Free Trial
              </button>
            </div>

            {/* Ultra Premium Employer Plan */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 border-2 border-purple-400 relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-4 py-1 bg-white text-purple-600 text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  ULTRA
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Ultra Premium</h3>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                  $499<span className="text-lg sm:text-xl text-purple-100 font-normal">/month</span>
                </div>
                <p className="text-purple-100 font-semibold text-sm mb-1">3-Day Free Trial</p>
                <p className="text-purple-100">For top companies</p>
                <p className="text-sm text-purple-200 mt-2">10 seats included</p>
                <p className="text-xs text-purple-300">+$45/seat/month for additional users</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white font-medium">Everything in Professional, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white"><strong>Skills assessment game scores</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white"><strong>Real efficiency & aptitude metrics</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white">See problem-solving abilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white">View typing speed & accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white">Access customer service simulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="text-white">Dedicated account manager</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate('employer-signup')}
                className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold text-lg shadow-lg"
              >
                Contact Sales
              </button>
            </div>

            {/* RPO Level */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl shadow-2xl p-8 border-2 border-gray-600 relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-4 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 text-xs font-bold rounded-full shadow-lg">
                  ENTERPRISE
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">RPO Level</h3>
                <div className="text-3xl font-bold text-white mb-2">
                  Contact Sales
                </div>
                <p className="text-gray-300">Dedicated ZALPHA team</p>
                <p className="text-sm text-amber-300 mt-2">Unlimited seats included</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gray-900" />
                  </div>
                  <span className="text-white font-medium">Everything in Ultra Premium, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="w-3 h-3 text-gray-900" />
                  </div>
                  <span className="text-white"><strong>Dedicated ZALPHA recruitment team</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-3 h-3 text-gray-900" />
                  </div>
                  <span className="text-white"><strong>Full recruitment process outsourcing</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gray-900" />
                  </div>
                  <span className="text-white">Experienced recruitment specialists</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gray-900" />
                  </div>
                  <span className="text-white">Custom talent sourcing strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gray-900" />
                  </div>
                  <span className="text-white">White-glove candidate screening</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-gray-900" />
                  </div>
                  <span className="text-white">Priority access to top talent</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gray-900" />
                  </div>
                  <span className="text-white">Custom SLA & reporting</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate('employer-signup')}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 rounded-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-lg"
              >
                Contact Sales Team
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-2">Is ZALPHA really free for students?</h3>
              <p className="text-gray-600">
                Yes! ZALPHA is 100% free for all students and will remain free forever. We make money from employer 
                subscriptions, so you never have to pay to find a job. Ultra Premium is an optional upgrade for 
                students who want advanced features like transcript sharing.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-2">What is transcript sharing?</h3>
              <p className="text-gray-600">
                Ultra Premium students can upload their official academic transcripts, which are then verified by our 
                team. You have full control over when to share them with employers - it's completely opt-in. This helps 
                serious candidates stand out by proving their academic credentials.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-2">What happens to my transcripts and personal data?</h3>
              <p className="text-gray-600">
                You have full control over your data privacy. You can delete your transcripts at any time from your 
                privacy settings. All uploaded documents are securely stored and only shared with employers when YOU 
                choose to share them. You own your data and can request complete deletion of all your information 
                whenever you want. We take your privacy seriously and give you complete control over what data you 
                keep on our platform.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes! All subscriptions (both student Ultra Premium and employer plans) can be canceled at any time. 
                No long-term contracts or commitments required.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-2">Do employers need Professional to see transcripts?</h3>
              <p className="text-gray-600">
                Yes. Only employers with Professional plans can view transcripts shared by Ultra Premium students. 
                This ensures only serious, verified employers have access to sensitive academic records.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the Pacific region's fastest-growing job platform today
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => onNavigate('student-signup')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
            >
              I'm a Student
            </button>
            <button
              onClick={() => onNavigate('employer-signup')}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold text-lg"
            >
              I'm an Employer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}