import { GraduationCap, TrendingUp, DollarSign, Users, Target, Award, CheckCircle, Star, ArrowRight, Shield, Zap, BarChart3, Briefcase, Heart, MessageSquare, Trophy, Sparkles, MapPin, Rocket, Gift, Eye, Globe, XCircle, Download } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface PitchDeckStudentsProps {
  onNavigate: (page: string) => void;
}

export function PitchDeckStudents({ onNavigate }: PitchDeckStudentsProps) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-orange-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ZALPHA for Students</h1>
              <p className="text-xs text-pink-300">Your Future Starts Here</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-all text-sm font-semibold"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={() => onNavigate('demo-showcase')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all text-sm font-semibold"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Slide */}
        <section className="text-center py-16">
          <div className="inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
              <Rocket className="w-14 h-14 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight px-4">
            Your Dream Job<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
              Is Waiting for You
            </span>
          </h1>
          <p className="text-2xl text-pink-200 mb-8 max-w-3xl mx-auto">
            Connect with top employers across the Pacific and launch your career — 100% FREE for students
          </p>
          <div className="flex items-center justify-center gap-6 text-white flex-wrap">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6 text-pink-400" />
              <span className="text-lg font-bold">FREE Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-pink-400" />
              <span className="text-lg font-bold">100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-pink-400" />
              <span className="text-lg">CNMI • FSM • Guam • Hawaii • Palau • Marshall Islands</span>
            </div>
          </div>
        </section>

        {/* Why Join ZALPHA */}
        <section className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-pink-400/50">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">Why Join ZALPHA?</h2>
            <p className="text-pink-300 text-xl">The only job platform built specifically for Pacific students</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-pink-400/30 hover:border-pink-400 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Gift className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">100% FREE</h3>
              <p className="text-white/90 text-lg">
                No hidden fees, no credit card required. We're here to help you succeed, not take your money.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-pink-400/30 hover:border-pink-400 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Verified & Safe</h3>
              <p className="text-white/90 text-lg">
                All employers are verified companies. No scams, no fake jobs, just real opportunities.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-pink-400/30 hover:border-pink-400 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Local Focus</h3>
              <p className="text-white/90 text-lg">
                Jobs from companies in CNMI, FSM, Guam, Hawaii, Palau, and the Marshall Islands looking specifically for YOU.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-cyan-400/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Get Hired</h2>
            <p className="text-cyan-300 text-xl">We've built the ultimate job search platform just for you</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">🎯 Smart Job Matching</h3>
                  <p className="text-white/80">
                    Our AI assistant "Zee" matches you with jobs that fit your skills, interests, and career goals.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">🎮 Gamified Skills Tests</h3>
                  <p className="text-white/80">
                    Take fun, game-like assessments to prove your skills and stand out to employers.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">⭐ Company Reviews</h3>
                  <p className="text-white/80">
                    Read honest reviews from other students about companies before you apply.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">✨ AI Chat Assistant</h3>
                  <p className="text-white/80">
                    Chat with "Zee" anytime to get career advice, resume tips, and interview prep.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">🔐 ID Verification</h3>
                  <p className="text-white/80">
                    Quick verification process proves you're legit and makes employers trust your profile.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">⚡ One-Click Apply</h3>
                  <p className="text-white/80">
                    Apply to multiple jobs instantly with your profile. No more filling out the same forms over and over.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">📚 AI Course Platform</h3>
                  <p className="text-white/80">
                    Learn job skills through interactive AI-powered courses. Get certificates to boost your profile.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">💼 Virtual Job Fairs</h3>
                  <p className="text-white/80">
                    Attend live virtual job fairs. Meet employers, interview on the spot, and network with recruiters.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">🎓 Virtual College Fairs</h3>
                  <p className="text-white/80">
                    High school grads: Explore colleges in Guam, CNMI, FSM, Hawaii, Palau & Marshall Islands. Find scholarships and apply!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">💻 Equipment Payments</h3>
                  <p className="text-white/80">
                    Choose to receive tech equipment instead of cash - ZALPHA handles all the logistics!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">₿ Crypto Payments</h3>
                  <p className="text-white/80">
                    Receive payments in Bitcoin, Ethereum, or USDC for contract work. Modern, fast, global.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INCLUSIVE HIRING - YOUR ADVANTAGE */}
        <section className="bg-gradient-to-br from-purple-600/40 via-pink-600/40 to-orange-600/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-2 sm:border-4 border-pink-400/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-400 text-purple-900 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">ZALPHA EXCLUSIVE - PACIFIC'S FIRST & ONLY</span>
                <span className="sm:hidden">ZALPHA EXCLUSIVE</span>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">💜 We Leave No One Behind</h2>
              <p className="text-pink-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4">
                The Pacific's <strong>first and only</strong> job platform with built-in disability support, 
                ADA rights education, and accommodation requests
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              {/* Your Protections */}
              <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-green-400/50">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-400" />
                  Your Rights & Protections
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-white/90 text-sm sm:text-base">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>100% Voluntary:</strong> Disclosure is NEVER required — it's always your choice</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Full Privacy Control:</strong> You decide who sees your information and when</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>ADA Education:</strong> Learn your rights before applying to any job</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Zero-Tolerance:</strong> Discrimination = immediate employer removal</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Safe Environment:</strong> All interactions monitored for compliance</span>
                  </li>
                </ul>
              </div>

              {/* Accommodation Options */}
              <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-purple-400/50">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-400" />
                  Request Accommodations Upfront
                </h3>
                <p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-base">
                  If you choose to disclose, you can request accommodations employers must consider:
                </p>
                <ul className="space-y-1.5 sm:space-y-2 text-white/80 text-xs sm:text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">✦</span>
                    <span>Flexible work hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">✦</span>
                    <span>Remote work options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">✦</span>
                    <span>Modified work environment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">✦</span>
                    <span>Assistive technology</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">✦</span>
                    <span>Written instructions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">✦</span>
                    <span>Quiet workspace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">✦</span>
                    <span>Interpreter services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">✦</span>
                    <span>+ 5 more options</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Why This Matters */}
            <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-yellow-400/50 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">💪 Why This Makes You Stronger</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">Fair</div>
                  <p className="text-white/90 text-sm sm:text-base">Compete on skills, not assumptions</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">Protected</div>
                  <p className="text-white/90 text-sm sm:text-base">Legal rights built into the system</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">Empowered</div>
                  <p className="text-white/90 text-sm sm:text-base">You control your own narrative</p>
                </div>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 px-4">
                <strong className="text-yellow-300">26% of Americans have a disability.</strong> You're not alone, 
                and you deserve the same opportunities as everyone else.
              </p>
              <button
                onClick={() => onNavigate('ada-information')}
                className="inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-purple-700 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg hover:bg-purple-50 transition-colors shadow-xl"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Learn About Your ADA Rights</span>
                <span className="sm:hidden">Your ADA Rights</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* IMPORTANT NOTE */}
            <div className="mt-6 sm:mt-8 bg-pink-900/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-pink-400/50">
              <p className="text-white/90 text-center text-sm sm:text-base md:text-lg leading-relaxed">
                <strong className="text-pink-300">Remember:</strong> Disclosing a disability is <strong className="text-pink-300">100% optional</strong> and 
                will <strong className="text-pink-300">NEVER</strong> be used against you on ZALPHA. We built this system to empower you, not limit you. 
                You choose if, when, and how to share this information. 🛡️
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-cyan-400/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Get Started in 3 Easy Steps</h2>
            <p className="text-cyan-300 text-xl">From signup to hired in record time</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold text-white shadow-xl">
                1
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
                <h3 className="text-2xl font-bold text-white mb-3">Create Your Profile</h3>
                <p className="text-white/80 mb-4">
                  Sign up for free, verify your student ID, and build your profile in 10 minutes.
                </p>
                <ul className="text-sm text-white/70 space-y-2 text-left">
                  <li>✓ Upload your resume</li>
                  <li>✓ Add your skills</li>
                  <li>✓ Verify your ID (secure & fast)</li>
                  <li>✓ Set your job preferences</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold text-white shadow-xl">
                2
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-purple-400/30">
                <h3 className="text-2xl font-bold text-white mb-3">Take Skills Assessments</h3>
                <p className="text-white/80 mb-4">
                  Play fun, gamified tests to show off your skills and earn badges.
                </p>
                <ul className="text-sm text-white/70 space-y-2 text-left">
                  <li>✓ Quick 5-15 minute tests</li>
                  <li>✓ Earn skill badges</li>
                  <li>✓ Stand out to employers</li>
                  <li>✓ Improve your ranking</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold text-white shadow-xl">
                3
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/30">
                <h3 className="text-2xl font-bold text-white mb-3">Apply & Get Hired</h3>
                <p className="text-white/80 mb-4">
                  Browse jobs, apply with one click, and chat with employers directly.
                </p>
                <ul className="text-sm text-white/70 space-y-2 text-left">
                  <li>✓ AI-matched job recommendations</li>
                  <li>✓ One-click applications</li>
                  <li>✓ Direct employer messages</li>
                  <li>✓ Interview scheduling</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Cryptocurrency Payments for Contract Work */}
        <section className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-orange-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">💰 Get Paid in Crypto!</h2>
              <p className="text-orange-300 text-lg">Bid on contract jobs & cash out instantly</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 mb-8 border-2 border-yellow-400 text-center">
            <div className="text-white">
              <p className="text-3xl font-bold mb-3">🚀 NEW: Job Bidding + Cryptocurrency Payments</p>
              <p className="text-yellow-100 text-xl">
                Win contract jobs, get paid in Bitcoin/USDC, and cash out to your bank account!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-orange-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Trophy className="w-7 h-7 text-orange-400" />
                How Job Bidding Works
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="font-bold text-white">Find Contract Jobs</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Browse gig economy jobs like graphic design, writing, coding, event help, etc.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="font-bold text-white">Submit Your Bid</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Propose your rate and timeline. Compete with other students!</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="font-bold text-white">Win the Job</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Employer chooses you based on your profile, skills, and bid!</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="font-bold text-white">Complete Work</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Finish the project and submit it for employer approval</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 border-2 border-emerald-400">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">5</div>
                    <span className="font-bold text-white">Get Paid in Crypto!</span>
                  </div>
                  <p className="text-emerald-100 text-sm pl-11">Receive payment in Bitcoin, Ethereum, or USDC stablecoin</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Zap className="w-7 h-7 text-emerald-400" />
                Cash Out Your Crypto
              </h3>
              <p className="text-white/90 mb-4">
                Once you get paid in cryptocurrency, you can <strong>instantly convert it to USD</strong> and send it to your bank account!
              </p>
              <ul className="space-y-3 text-white/80 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">⚡</span>
                  <span><strong>Instant Payments:</strong> Get paid as soon as work is approved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">💸</span>
                  <span><strong>Lower Fees:</strong> Way cheaper than PayPal or wire transfers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">🌏</span>
                  <span><strong>Works Anywhere:</strong> Perfect for Pacific region banking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">🔒</span>
                  <span><strong>Secure Escrow:</strong> Money is held safely until work is done</span>
                </li>
              </ul>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-400/50">
                <p className="text-white font-bold mb-2">💡 How to Cash Out:</p>
                <ol className="text-white/80 text-sm space-y-1 pl-4">
                  <li>1. Receive crypto in your ZALPHA wallet</li>
                  <li>2. Click "Cash Out" button</li>
                  <li>3. Convert crypto → USD</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border-2 border-blue-400/50 text-center">
              <div className="text-4xl mb-3">₿</div>
              <h4 className="text-xl font-bold text-white mb-2">Bitcoin</h4>
              <p className="text-white/70 text-sm">The OG cryptocurrency, widely accepted</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border-2 border-purple-400/50 text-center">
              <div className="text-4xl mb-3">Ξ</div>
              <h4 className="text-xl font-bold text-white mb-2">Ethereum</h4>
              <p className="text-white/70 text-sm">Fast transactions with smart contracts</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border-2 border-emerald-400/50 text-center">
              <div className="text-4xl mb-3">💵</div>
              <h4 className="text-xl font-bold text-white mb-2">USDC Stablecoin</h4>
              <p className="text-white/70 text-sm">Always worth $1 USD - no volatility!</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 border-2 border-purple-400 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">💼 Perfect for Contract Jobs Like:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                <span className="text-white font-semibold">Graphic Design</span>
              </div>
              <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">✍️</span>
                <span className="text-white font-semibold">Content Writing</span>
              </div>
              <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">💻</span>
                <span className="text-white font-semibold">Web Development</span>
              </div>
              <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <span className="text-white font-semibold">Social Media Management</span>
              </div>
              <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">🎬</span>
                <span className="text-white font-semibold">Video Editing</span>
              </div>
              <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">🎤</span>
                <span className="text-white font-semibold">Event Support Staff</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border-2 border-green-400/50">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                Why Crypto Payments Rock
              </h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>✅ <strong>No bank account needed</strong> to receive payment</li>
                <li>✅ <strong>Instant transfers</strong> - no 5-7 day wait times</li>
                <li>✅ <strong>Lower fees</strong> than traditional payment methods</li>
                <li>✅ <strong>Perfect for Pacific islands</strong> with limited banking</li>
                <li>✅ <strong>Secure escrow</strong> protects both you and employer</li>
                <li>✅ <strong>Work for international clients</strong> easily</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border-2 border-orange-400/50">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6 text-orange-400" />
                Your Money is Safe
              </h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>🔒 <strong>Escrow protection:</strong> Money held until work approved</li>
                <li>🔒 <strong>Dispute resolution:</strong> ZALPHA team helps if issues arise</li>
                <li>🔒 <strong>Encrypted wallets:</strong> Your crypto is secure</li>
                <li>🔒 <strong>Two-factor auth:</strong> Extra security on withdrawals</li>
                <li>🔒 <strong>Verified employers only:</strong> No scam jobs allowed</li>
                <li>🔒 <strong>24/7 support:</strong> We're here if you need help</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-orange-600 to-yellow-700 rounded-2xl p-6 text-center border-2 border-orange-400">
            <div className="text-white">
              <p className="text-2xl font-bold mb-2">🌟 Start Earning Today!</p>
              <p className="text-orange-100">
                Browse contract jobs, submit your bid, and get paid in crypto within days!
              </p>
            </div>
          </div>
        </section>

        {/* Premium Tier - Optional Upgrade */}
        <section className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-yellow-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Award className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Optional Upgrades</h2>
              <p className="text-yellow-300 text-lg">Enhance your experience with premium features</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Free</h3>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  FOREVER
                </div>
              </div>
              <ul className="space-y-3 text-white mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>All core features</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Unlimited job applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Company reviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Skills assessments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>AI chat assistant</span>
                </li>
                <li className="flex items-start gap-3 opacity-60">
                  <Eye className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <span className="text-sm">Includes ads from partners</span>
                </li>
              </ul>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$0</div>
                <p className="text-white/60">Forever</p>
              </div>
            </div>

            {/* Ad-Free Tier */}
            <div className="bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-2xl p-8 border-4 border-cyan-400">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Ad-Free</h3>
                <div className="bg-cyan-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </div>
              </div>
              <ul className="space-y-3 text-white mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>All free features</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <span><strong>Zero ads</strong> - clean experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <span><strong>Faster load times</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <span><strong>Distraction-free</strong> job search</span>
                </li>
              </ul>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$5</div>
                <p className="text-white/60 mb-4">per month</p>
                <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl transition-all">
                  Remove Ads
                </button>
              </div>
            </div>

            {/* Ultra Premium */}
            <div className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl p-8 border-4 border-yellow-400">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Ultra Premium</h3>
                <div className="bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                  BEST VALUE
                </div>
              </div>
              <ul className="space-y-3 text-white mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Ad-free experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <span><strong>Share transcripts</strong> with employers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <span><strong>Priority job matching</strong> - get matched first</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <span><strong>Premium badge</strong> on your profile</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <span><strong>Advanced analytics</strong> - see who viewed your profile</span>
                </li>
              </ul>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$19.99</div>
                <p className="text-white/60 mb-4">per month</p>
                <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-xl transition-all">
                  Upgrade to Ultra Premium
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-yellow-200 text-lg">
              💡 <strong>Remember:</strong> The FREE version is all you need to get hired! Premium is just a bonus.
            </p>
          </div>
        </section>

        {/* Student Success Stories */}
        <section className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Real Students, Real Success</h2>
            <p className="text-green-300 text-xl">See how ZALPHA helped students like you land their dream jobs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/30">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-4 italic">
                "I got 3 job offers in 2 weeks! ZALPHA made it so easy to apply and the AI matching was spot-on. Already started my dream job!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div>
                  <div className="font-bold text-white">Maria Cruz</div>
                  <div className="text-sm text-cyan-300">Marketing Graduate, UOG</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/30">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-4 italic">
                "The skills tests were actually fun! I earned badges and employers saw I was qualified. Got hired at a tech company!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  JT
                </div>
                <div>
                  <div className="font-bold text-white">Jake Torres</div>
                  <div className="text-sm text-cyan-300">IT Graduate, NMC</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/30">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-4 italic">
                "Finally a job platform that actually works for Pacific students! No scams, real companies, and completely free. Love it!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  SN
                </div>
                <div>
                  <div className="font-bold text-white">Sarah Ngirakl</div>
                  <div className="text-sm text-cyan-300">Business Graduate, COM-FSM</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Web Access Note */}
        <section className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-cyan-400/50 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">🌐 Access from Any Device</h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-4">
            ZALPHA is a <strong>web application</strong> - no app download needed! Access instantly from any browser.
          </p>
          <p className="text-lg text-cyan-300">
            Works on iPhone, Android, desktop, and tablet • Visit www.zalpharecruit.com • Always up-to-date
          </p>
        </section>

        {/* NEW: Student Privacy & Control */}
        <section className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              🔒 YOU Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Your Privacy</span>
            </h2>
            <p className="text-2xl text-purple-200">Full control over what your school can see about you</p>
          </div>

          {/* Privacy Controls */}
          <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-2xl p-8 border-2 border-pink-400 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Eye className="w-10 h-10 text-pink-400" />
              10 Privacy Settings YOU Control
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">👁️ What Your School Can See:</h4>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> ✓ Your name (or hide it)</li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> ✓ Email address (or hide it)</li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> ✓ Phone number (or hide it)</li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> ✓ Major/field of study (or hide it)</li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> ✓ GPA (or hide it)</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">📊 Activity Your School Can See:</h4>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> ✓ Skills assessment scores (or hide)</li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> ✓ Job application activity (or hide)</li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> ✓ Job offers received (or hide)</li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> ✓ Hiring status (or hide)</li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> ✓ Salary information (or hide)</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-xl p-6">
              <p className="text-white text-lg mb-3">
                <strong className="text-yellow-300">💰 Important:</strong> Even if you hide EVERYTHING from your school, they STILL earn their 0.5% commission when you get hired. 
                Privacy settings don't affect revenue sharing - only what data they can see.
              </p>
              <p className="text-white/90 text-sm">
                ✨ You can change these settings anytime through your privacy dashboard. Want to be anonymous? Go for it! Want to share everything? That's cool too!
              </p>
            </div>
          </div>

          {/* On-Platform Offers Protection */}
          <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-2xl p-8 border-2 border-green-400 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-10 h-10 text-green-400" />
              Why All Job Offers Must Be Accepted On ZALPHA
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">✅ YOUR Protection:</h4>
                <ul className="text-white/90 space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Legal Documentation:</strong> Written proof of your offer, salary, and terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Payment Security:</strong> Salary held in escrow until you start work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>FERPA Compliance:</strong> Your educational records protected by federal law</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Dispute Resolution:</strong> ZALPHA mediates if anything goes wrong</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>School Support:</strong> Your school earns commission to fund career services</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">❌ What Happens Off-Platform:</h4>
                <ul className="text-white/90 space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span><strong>No Legal Protection:</strong> Just verbal promises, no documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Payment Risk:</strong> No escrow, employer could ghost you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span><strong>No Privacy Protection:</strong> FERPA doesn't apply off-platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Account Termination:</strong> Both you AND employer banned</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span><strong>School Loses Money:</strong> No commission = less career support funding</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-red-500/20 border-2 border-red-400 rounded-xl p-6">
              <p className="text-white text-lg">
                <strong className="text-red-300">⚠️ Serious Consequences:</strong> Taking offers off-platform results in immediate account termination. 
                Don't risk your account and protection for nothing. Accept on ZALPHA, stay protected!
              </p>
            </div>
          </div>

          {/* Cryptocurrency Payments */}
          <div className="bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-2xl p-8 border-2 border-orange-400">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <DollarSign className="w-10 h-10 text-orange-400" />
              Get Paid in Crypto (Bitcoin, Ethereum, USDC)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">💰 Why Crypto Payments Are Awesome:</h4>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> ⚡ <strong>Instant Payment:</strong> Get paid right away</li>
                  <li className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> 💸 <strong>Lower Fees:</strong> Keep more of your money</li>
                  <li className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> 🌏 <strong>Works Anywhere:</strong> Perfect for remote work</li>
                  <li className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> 🔐 <strong>Secure Escrow:</strong> Payment held until work done</li>
                  <li className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> 💵 <strong>Cash Out Easy:</strong> Convert to USD instantly</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">🔷 Need a Digital Wallet (10 min setup):</h4>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🔷</div>
                    <div className="text-white text-xs font-semibold">MetaMask</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🟦</div>
                    <div className="text-white text-xs font-semibold">Coinbase</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">💳</div>
                    <div className="text-white text-xs font-semibold">Ledger</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🔐</div>
                    <div className="text-white text-xs font-semibold">Trust Wallet</div>
                  </div>
                </div>
                <p className="text-white/70 text-xs">
                  💡 New to crypto? We provide setup tutorials!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Answers */}
        <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Quick Questions?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-purple-400/30">
              <h3 className="text-lg font-bold text-white mb-2">Is ZALPHA really free?</h3>
              <p className="text-white/80">YES! 100% free for students, forever. No hidden fees, no trials. Companies pay us, not you.</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-purple-400/30">
              <h3 className="text-lg font-bold text-white mb-2">Do I need to be currently in college?</h3>
              <p className="text-white/80">You must be 18+ and either currently enrolled OR graduated within the past year.</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-purple-400/30">
              <h3 className="text-lg font-bold text-white mb-2">How does ID verification work?</h3>
              <p className="text-white/80">Quick and secure! Upload your student ID + government ID. We verify in 24 hours. Your info stays private.</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-purple-400/30">
              <h3 className="text-lg font-bold text-white mb-2">Can I use ZALPHA on my phone?</h3>
              <p className="text-white/80">Yes! ZALPHA works perfectly on mobile, tablet, and desktop via your browser. Plus, <strong>native iOS & Android apps are coming soon!</strong></p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-purple-400/30">
              <h3 className="text-lg font-bold text-white mb-2">What regions do you cover?</h3>
              <p className="text-white/80">We focus on CNMI, FSM, Guam, Hawaii, Palau, and the Marshall Islands - the Western Pacific region.</p>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <section className="text-center pb-8">
          <BackButton
            onClick={() => onNavigate('demo-showcase')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all font-semibold text-lg backdrop-blur-xl border-2 border-white/20 hover:border-white/40"
          >
            ← Back to Demo Showcase
          </BackButton>
        </section>
      </div>
    </div>
  );
}