import { TrendingUp, DollarSign, Globe, Target, Rocket, Users, BarChart3, Award, Zap, Shield, MapPin, Building2, GraduationCap, CheckCircle, Star, ArrowRight, Sparkles, TrendingDown, Briefcase, Heart, Download } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface PitchDeckInvestorsProps {
  onNavigate: (page: string) => void;
}

export function PitchDeckInvestors({ onNavigate }: PitchDeckInvestorsProps) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">ZALPHA Investor Pitch</h1>
              <p className="text-xs text-emerald-300 hidden sm:block">Series A Fundraising Deck</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm font-semibold"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button
              onClick={() => onNavigate('demo-showcase')}
              className="px-2 sm:px-4 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm font-semibold"
            >
              ← <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Hero Slide */}
        <section className="text-center py-12 sm:py-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Rocket className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight px-4">
            ZALPHA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              The LinkedIn of the Pacific
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-200 mb-8 max-w-3xl mx-auto px-4">
            Connecting verified talent with top employers across the Western Pacific's $200B+ economy
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border-2 border-emerald-400/50">
              <div className="text-3xl font-bold text-emerald-400">$200B+</div>
              <div className="text-sm text-emerald-200">Pacific Market</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border-2 border-emerald-400/50">
              <div className="text-3xl font-bold text-emerald-400">500K+</div>
              <div className="text-sm text-emerald-200">Target Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border-2 border-emerald-400/50">
              <div className="text-3xl font-bold text-emerald-400">10K+</div>
              <div className="text-sm text-emerald-200">Employers</div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-2 border-red-400/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <Target className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">The $2.8B Problem</h2>
              <p className="text-red-300 text-base sm:text-lg">A broken talent marketplace in the Pacific</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-3">💼 Employers Struggle</h3>
              <p className="text-white/80 mb-4">
                Companies waste <strong>$1.4B annually</strong> on inefficient recruiting, fake candidates, and high turnover in the Pacific region.
              </p>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• Average cost per hire: $4,500</li>
                <li>• Time to hire: 45-60 days</li>
                <li>• 30% credential fraud rate</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-3">🎓 Students Suffer</h3>
              <p className="text-white/80 mb-4">
                Graduates face <strong>40% unemployment</strong> within 12 months, with limited local job opportunities and no trusted platforms.
              </p>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• 6-12 month job search average</li>
                <li>• Brain drain to mainland US</li>
                <li>• Zero Pacific-focused platforms</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-emerald-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Our Solution: ZALPHA Platform</h2>
              <p className="text-emerald-300 text-lg">The verified talent marketplace for the Pacific</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <Shield className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Dual ID Verification</h3>
              <p className="text-white/80">
                Government ID + student verification eliminates fake profiles and credential fraud entirely
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <Zap className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">ZALPHA ATS Integration</h3>
              <p className="text-white/80">
                Seamless employer workflow with enterprise-grade applicant tracking system
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <MapPin className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Pacific-First Focus</h3>
              <p className="text-white/80">
                CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands — the only platform built specifically for this region
              </p>
            </div>
          </div>
        </section>

        {/* NEW: Basic Skills Assessment - Market Opportunity */}
        <section className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-yellow-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">🎓 The Workforce Readiness Opportunity</h2>
              <p className="text-yellow-300 text-lg">Solving the CW1/H2 labor crisis with certified local talent</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* The Market Problem */}
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/50">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <TrendingDown className="w-7 h-7 text-red-400" />
                The Contract Worker Crisis
              </h3>
              <p className="text-white/90 mb-4">
                <strong>CW1 workers (CNMI)</strong> and <strong>H2 workers (Guam)</strong> are being phased out, creating a massive labor shortage in entry-level positions.
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold text-xl">📉</span>
                  <span><strong>5,000+ jobs unfilled</strong> across retail, hospitality, food service, and warehouse sectors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold text-xl">💸</span>
                  <span><strong>$800K-$2M</strong> average cost per employer to recruit/train replacements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold text-xl">⏱️</span>
                  <span><strong>6-12 month</strong> hiring timeline for workforce-ready local talent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold text-xl">❌</span>
                  <span><strong>Zero vetting tools</strong> to verify basic skills of 18-year-old high school graduates</span>
                </li>
              </ul>
            </div>

            {/* Our Solution */}
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/50">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
                ZALPHA Basic Skills Assessment
              </h3>
              <p className="text-white/90 mb-4">
                A <strong>required, gamified 10-minute assessment</strong> for 18-year-olds who want to work (not attend college) that certifies workforce readiness.
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">📖</span>
                  <span><strong>Reading Comprehension:</strong> Workplace instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">🔢</span>
                  <span><strong>Basic Math:</strong> Hours, money, totals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">🧠</span>
                  <span><strong>Problem Solving:</strong> Real work scenarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">✅</span>
                  <span><strong>Following Instructions:</strong> Step-by-step procedures</span>
                </li>
              </ul>
              <div className="mt-4 bg-emerald-500/20 rounded-xl p-4 border border-emerald-400/50">
                <p className="text-white font-bold mb-1">70% Pass = "Workforce Ready" Badge</p>
                <p className="text-white/80 text-sm">Employers instantly see certified candidates ready to work</p>
              </div>
            </div>
          </div>

          {/* Market Size & Revenue Impact */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl p-8 border-2 border-emerald-400/50 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">💰 Revenue Impact: Additional $4.2M ARR</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-400 mb-2">8,000+</div>
                <div className="text-white/80 font-semibold mb-2">18-Year-Old HS Graduates</div>
                <div className="text-sm text-white/60">Annual cohort across CNMI + Guam needing jobs</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">2,500+</div>
                <div className="text-white/80 font-semibold mb-2">Employers Need Entry-Level</div>
                <div className="text-sm text-white/60">Retail, hospitality, food service, warehouse sectors</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">$499</div>
                <div className="text-white/80 font-semibold mb-2">Ultra Premium Upgrade</div>
                <div className="text-sm text-white/60">Employers pay to see assessment scores & detailed breakdowns</div>
              </div>
            </div>
            <div className="mt-6 bg-yellow-400/20 rounded-xl p-6 border-2 border-yellow-400 text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">$4.2M Additional ARR</div>
              <p className="text-white/90">700 employers upgrade to Ultra Premium ($499/mo) to access assessment data = <strong>$4.2M/year</strong></p>
              <p className="text-white/70 text-sm mt-2">28% conversion rate from Professional → Ultra Premium tier</p>
            </div>
          </div>

          {/* Strategic Advantages */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border-2 border-purple-400/50">
              <Award className="w-10 h-10 text-purple-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Competitive Moat</h4>
              <p className="text-white/80 text-sm">
                First and only platform certifying Pacific workforce readiness. Impossible to replicate without regional credibility.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border-2 border-blue-400/50">
              <Target className="w-10 h-10 text-blue-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Government Support</h4>
              <p className="text-white/80 text-sm">
                CNMI & Guam govts actively seeking solutions. Partnership opportunities for workforce development grants.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border-2 border-emerald-400/50">
              <TrendingUp className="w-10 h-10 text-emerald-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Viral Growth Loop</h4>
              <p className="text-white/80 text-sm">
                Every 18-year-old MUST take test to get jobs → Employers see value → More employers upgrade → More students join
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-yellow-600 to-orange-700 rounded-2xl p-6 text-center border-2 border-yellow-400">
            <div className="text-white">
              <p className="text-2xl font-bold mb-2">🏝️ Economic Development + Revenue Growth</p>
              <p className="text-yellow-100">
                Solving a critical workforce crisis while adding <strong>$4.2M ARR</strong> and strengthening our competitive moat
              </p>
            </div>
          </div>
        </section>

        {/* NEW: Cryptocurrency Revenue Stream */}
        <section className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-orange-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">💰 Cryptocurrency Payment Ecosystem</h2>
              <p className="text-orange-300 text-lg">Dual revenue stream + competitive moat</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-orange-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-orange-400" />
                Accept Crypto for Subscriptions
              </h3>
              <p className="text-white/90 mb-4">
                Employers can pay their <strong>$99, $249, or $499</strong> monthly subscriptions in <strong>Bitcoin, Ethereum, or USDC</strong>.
              </p>
              <ul className="space-y-3 text-white/80 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">💸</span>
                  <span><strong>Lower Processing Fees:</strong> Save 2-3% vs credit cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">🌏</span>
                  <span><strong>International Friendly:</strong> No currency conversion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">⚡</span>
                  <span><strong>Instant Activation:</strong> No payment delays</span>
                </li>
              </ul>
              <div className="bg-emerald-500/20 rounded-xl p-4 border border-emerald-400/50">
                <p className="text-white font-bold mb-1">Revenue Impact: +$120K ARR</p>
                <p className="text-white/80 text-sm">15% of employers prefer crypto payment → 200 employers × $50/mo savings = additional adoption</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Zap className="w-7 h-7 text-emerald-400" />
                Pay Students in Crypto
              </h3>
              <p className="text-white/90 mb-4">
                Students get paid in crypto for <strong>contract jobs</strong> and can instantly cash out to USD. We take a <strong>2.5% transaction fee</strong>.
              </p>
              <ul className="space-y-3 text-white/80 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">🎯</span>
                  <span><strong>Job Bidding Platform:</strong> Students bid on gig work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">🔒</span>
                  <span><strong>Escrow Protection:</strong> Money held until work complete</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">💵</span>
                  <span><strong>Instant Cash Out:</strong> Convert crypto → USD in minutes</span>
                </li>
              </ul>
              <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-400/50">
                <p className="text-white font-bold mb-1">Revenue Impact: +$780K ARR</p>
                <p className="text-white/80 text-sm">$2.6M annual transaction volume × 2.5% fee + 1% cash-out fee = $780K additional revenue</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 border-2 border-purple-400 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">💎 Complete Cryptocurrency Ecosystem</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">₿</div>
                <h4 className="text-xl font-bold text-white mb-2">Bitcoin (BTC)</h4>
                <p className="text-white/70 text-sm">Most trusted, widely accepted</p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center border-2 border-yellow-400">
                <div className="text-4xl mb-3">Ξ</div>
                <h4 className="text-xl font-bold text-white mb-2">Ethereum (ETH)</h4>
                <p className="text-white/70 text-sm">Fast smart contract payments</p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">💵</div>
                <h4 className="text-xl font-bold text-white mb-2">USDC Stablecoin</h4>
                <p className="text-white/70 text-sm">$1 USD pegged - no volatility</p>
              </div>
            </div>
          </div>

          {/* Simple Integration Explanation */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 mb-8 border-2 border-cyan-300">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-white mb-3">🔌 What Is "Integration"? (In Simple Terms)</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-white">
              <div className="bg-white/20 rounded-xl p-6 border border-white/30">
                <p className="text-2xl font-bold mb-3 text-yellow-300">🧩 Think of LEGO Blocks</p>
                <p className="text-base leading-relaxed">
                  <strong>Integration</strong> means connecting different systems together so they work as ONE. 
                  Like how LEGO blocks snap together to make something bigger!
                </p>
                <div className="mt-4 bg-cyan-600/40 rounded-lg p-3">
                  <p className="text-sm">
                    <strong>Example:</strong> When you use "Sign in with Google" on a website, that's integration! 
                    Two separate systems (the website + Google) are connected and talking to each other.
                  </p>
                </div>
              </div>

              <div className="bg-white/20 rounded-xl p-6 border border-white/30">
                <p className="text-2xl font-bold mb-3 text-yellow-300">💰 Crypto Integration = Payment System Connection</p>
                <p className="text-base leading-relaxed">
                  When we say <strong>"crypto integration,"</strong> we mean we've connected Bitcoin/Ethereum payment systems 
                  INTO our platform. Employers can pay their subscription with crypto. Students can get paid in crypto.
                </p>
                <div className="mt-4 bg-cyan-600/40 rounded-lg p-3">
                  <p className="text-sm">
                    <strong>It's like:</strong> Adding a credit card reader to your store. Before = cash only. After = cash + cards! 
                    We added crypto as a payment option alongside regular money.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl p-6 text-gray-900">
              <p className="text-xl font-bold mb-3 text-center">🎯 Why This Matters For ZALPHA:</p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                  <p className="font-bold text-blue-900 mb-2">1️⃣ More Payment Options</p>
                  <p className="text-gray-700">Employers can pay subscriptions in Bitcoin, Ethereum, or USDC instead of just credit cards</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                  <p className="font-bold text-green-900 mb-2">2️⃣ Pay Students Faster</p>
                  <p className="text-gray-700">Students doing contract jobs get paid instantly in crypto (no waiting for bank transfers)</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                  <p className="font-bold text-purple-900 mb-2">3️⃣ We Earn Transaction Fees</p>
                  <p className="text-gray-700">Every crypto payment = we collect 2.5% fee + 1% cash-out fee = +$900K extra income</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border-2 border-blue-400/50">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-400" />
                Competitive Moat
              </h4>
              <p className="text-white/80 text-sm">
                First Pacific job platform with full crypto integration. Regional competitors can't match this infrastructure.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border-2 border-emerald-400/50">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Target className="w-6 h-6 text-emerald-400" />
                Perfect for Pacific
              </h4>
              <p className="text-white/80 text-sm">
                Lower banking infrastructure + younger crypto-savvy workforce + cross-border payments = ideal market fit
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border-2 border-purple-400/50">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Transaction Economics
              </h4>
              <p className="text-white/80 text-sm">
                2.5% platform fee + 1% cash-out fee = 3.5% total take rate on $2.6M annual gig economy volume
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 border-2 border-emerald-400 text-center">
            <div className="text-white">
              <p className="text-4xl font-bold mb-3">+$900K Additional ARR</p>
              
              {/* Simple Explanation Box */}
              <div className="bg-white/20 rounded-xl p-6 mb-6 text-left border-2 border-white/30">
                <p className="text-2xl font-bold mb-3 text-yellow-300">💡 What Does This Mean?</p>
                <p className="text-white text-base mb-3">
                  <strong>ARR = Annual Recurring Revenue</strong> (the money we make every year that repeats)
                </p>
                <p className="text-emerald-100 text-base leading-relaxed">
                  This <strong>+$900K</strong> is <strong>EXTRA money ON TOP OF</strong> our regular subscription income. 
                  It's like having a store that sells memberships ($2.1M/year), and THEN you add a second cash register 
                  that also processes gift cards (+$900K/year). Same customers, but now you're making money TWO ways instead of one!
                </p>
                <div className="mt-4 bg-emerald-500/30 rounded-lg p-4 border border-emerald-300">
                  <p className="text-white font-bold text-lg">
                    Regular Subscriptions: $2.1M ARR + Crypto Payments: +$900K ARR = <span className="text-yellow-300">$3M Total!</span>
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6 text-left">
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-emerald-100 text-sm mb-1">Subscription Crypto Payments</p>
                  <p className="text-2xl font-bold">+$120K ARR</p>
                  <p className="text-emerald-200 text-xs mt-1">15% employer adoption rate</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-emerald-100 text-sm mb-1">Gig Economy Transaction Fees</p>
                  <p className="text-2xl font-bold">+$780K ARR</p>
                  <p className="text-emerald-200 text-xs mt-1">$2.6M annual contract job volume</p>
                </div>
              </div>
              <p className="text-emerald-100 mt-6 text-lg">
                <strong>Crypto ecosystem = Dual revenue stream + competitive differentiation + Pacific market fit</strong>
              </p>
            </div>
          </div>
        </section>

        {/* 14 Competitive Advantages */}
        <section className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Award className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">14 Competitive Advantages</h2>
              <p className="text-purple-300 text-lg">Why Indeed, LinkedIn & Handshake can't compete in the Pacific</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">1. ID Verification</h4>
                  <p className="text-white/70 text-sm">Dual Gov ID + Student ID eliminates fake profiles & credential fraud</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">2. Free for Students</h4>
                  <p className="text-white/70 text-sm">Zero cost barrier for Pacific youth (Indeed/LinkedIn charge students too)</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">3. Pacific-Only Focus</h4>
                  <p className="text-white/70 text-sm">CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands - no mainland competition diluting candidate pool</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">4. Game-Style Assessments</h4>
                  <p className="text-white/70 text-sm">Engaging workforce readiness tests - students love them vs boring forms</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">5. School Revenue Sharing</h4>
                  <p className="text-white/70 text-sm">$10-$25 per signup creates viral referral loop through schools</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">6. AI-Powered (Zee Assistant)</h4>
                  <p className="text-white/70 text-sm">24/7 AI career guidance for students & employers - personalized matching</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">7. Custom Assessments</h4>
                  <p className="text-white/70 text-sm">Employers build job-specific tests with AI help (Indeed has none)</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">8. Cultural Training</h4>
                  <p className="text-white/70 text-sm">Optional Pacific cultural workshops for employers (regional differentiation)</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">9. Free Contract Tier</h4>
                  <p className="text-white/70 text-sm">$0 tier for gig work = viral employer acquisition (Indeed charges everyone)</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">10. Crypto Payments</h4>
                  <p className="text-white/70 text-sm">Bitcoin, Ethereum, USDC for contract work (no other job platform has this)</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">11. Equipment Payments</h4>
                  <p className="text-white/70 text-sm">Students can request tech equipment - ZALPHA handles fulfillment logistics</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">12. Company Reviews</h4>
                  <p className="text-white/70 text-sm">Verified student-driven reviews build employer transparency</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">13. Virtual Job Fairs</h4>
                  <p className="text-white/70 text-sm">Live Pacific-wide employment events - employers meet students in real-time</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">14. Virtual College Fairs</h4>
                  <p className="text-white/70 text-sm">Complete college admissions system for high school grads (38 Pacific colleges)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 border-2 border-white/30 text-center">
            <p className="text-3xl font-bold text-white mb-3">🏆 Dual Pathway System = Unbeatable Moat</p>
            <p className="text-purple-100 text-lg">
              <strong>ZALPHA is the ONLY platform serving both work-first AND college-first students.</strong> We support high school graduates on BOTH pathways: immediate employment through Virtual Job Fairs, or higher education through Virtual College Fairs. <strong>Indeed, LinkedIn, and Handshake don't have this comprehensive approach.</strong>
            </p>
          </div>
        </section>

        {/* COMPETITIVE MOAT #15: INCLUSIVE HIRING */}
        <section className="bg-gradient-to-br from-pink-600/40 via-purple-600/40 to-orange-600/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-2 sm:border-4 border-pink-400/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-yellow-400 text-purple-900 rounded-full text-xs sm:text-sm font-bold mb-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  COMPETITIVE MOAT #15
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">🏆 Built-In ADA Compliance & Inclusive Hiring</h2>
                <p className="text-pink-300 text-sm sm:text-base md:text-lg">Pacific's FIRST & ONLY job platform with accessibility-first design</p>
              </div>
            </div>

            {/* Market Opportunity */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-green-400/50 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">📊 The Market Opportunity</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-white text-center">
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-400 mb-2">26%</div>
                  <p className="text-sm sm:text-base md:text-lg font-semibold">of Americans have a disability</p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">61M people = HUGE untapped talent pool</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 mb-2">$13B</div>
                  <p className="text-sm sm:text-base md:text-lg font-semibold">in disposable income</p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">Massive consumer market</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-2">$300M+</div>
                  <p className="text-sm sm:text-base md:text-lg font-semibold">in annual ADA lawsuits</p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">Employers NEED compliance tools</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 mb-2">+28%</div>
                  <p className="text-sm sm:text-base md:text-lg font-semibold">higher revenue</p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">Inclusive companies outperform peers</p>
                </div>
              </div>
            </div>

            {/* What We Built */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-purple-400/50">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-400" />
                  What ZALPHA Built
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-white/90 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>8 Disability Categories</strong> with voluntary disclosure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>12+ Accommodation Options</strong> (flexible hours, remote work, assistive tech, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Automatic ADA Compliance</strong> for employers (zero extra work)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Full Privacy Controls</strong> for students (they decide visibility)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>ADA Rights Education</strong> built into platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Zero-Tolerance Policy</strong> for discrimination</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-green-400/50">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-400" />
                  Business Impact
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-white/90 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>+26% Larger Candidate Pool</strong> — access talent others overlook</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Legal Risk Reduction</strong> — avoid $300M+ in ADA lawsuits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>90% Lower Turnover</strong> — diverse employees stay longer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Premium Pricing Power</strong> — employers pay for compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>ESG Alignment</strong> — investors prioritize inclusive companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>First-Mover Advantage</strong> — no competitors have this</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Competitive Analysis */}
            <div className="bg-gradient-to-r from-red-900/40 to-pink-900/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-red-400/50 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">⚠️ Competitive Reality</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-red-400/30">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-red-300 mb-3 text-center">❌ Indeed</h4>
                  <ul className="space-y-2 text-white/80 text-xs sm:text-sm">
                    <li>• No disability disclosure</li>
                    <li>• No accommodation requests</li>
                    <li>• No ADA compliance tools</li>
                    <li>• Employers liable for mistakes</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-red-400/30">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-red-300 mb-3 text-center">❌ LinkedIn</h4>
                  <ul className="space-y-2 text-white/80 text-xs sm:text-sm">
                    <li>• No accessibility features</li>
                    <li>• No privacy controls for disabilities</li>
                    <li>• No rights education</li>
                    <li>• Students navigate alone</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-green-400/50">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-green-300 mb-3 text-center">✅ ZALPHA</h4>
                  <ul className="space-y-2 text-white/80 text-xs sm:text-sm">
                    <li>• Built-in ADA system</li>
                    <li>• 12+ accommodations</li>
                    <li>• Automatic compliance</li>
                    <li>• Complete protection</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Investment Thesis */}
            <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-yellow-400/50">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">💰 Why This Matters to Investors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    Defensible Moat
                  </h4>
                  <p className="text-white/90 text-xs sm:text-sm">
                    Building comprehensive ADA compliance takes 18-24 months of legal/technical work. 
                    <strong className="text-blue-300"> Competitors can't copy this overnight.</strong>
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                    Premium Pricing
                  </h4>
                  <p className="text-white/90 text-xs sm:text-sm">
                    Employers pay 2-3x more for platforms with built-in compliance. 
                    <strong className="text-green-300"> This justifies our $499/month Ultra Premium tier.</strong>
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    Market Expansion
                  </h4>
                  <p className="text-white/90 text-xs sm:text-sm">
                    Access to 26% more candidates = 26% larger TAM. 
                    <strong className="text-purple-300"> This grows our addressable market from $8.7M to $11M ARR.</strong>
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                    ESG Alignment
                  </h4>
                  <p className="text-white/90 text-xs sm:text-sm">
                    Institutional investors prioritize DEI initiatives. 
                    <strong className="text-yellow-300"> ZALPHA checks every ESG box = easier Series B fundraising.</strong>
                  </p>
                </div>
              </div>
              <div className="text-center bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-white/50">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                  🚀 This Isn't Just Social Good — It's Smart Business
                </p>
                <p className="text-sm sm:text-base md:text-lg text-white/90">
                  Inclusive companies generate <strong className="text-yellow-300">28% higher revenue</strong> and 
                  <strong className="text-yellow-300"> 2x higher net income</strong>. ZALPHA is positioned to capture this premium.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Model */}
        <section className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-cyan-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Revenue Model</h2>
              <p className="text-cyan-300 text-lg">Multi-sided marketplace with premium tiers</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Employer Revenue */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-cyan-400/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-cyan-400" />
                Employer Subscriptions (85% of revenue)
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Starter</span>
                    <span className="text-2xl font-bold text-cyan-400">$99/mo</span>
                  </div>
                  <p className="text-sm text-white/70">3 job posts, 50 candidate views</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Professional</span>
                    <span className="text-2xl font-bold text-cyan-400">$249/mo</span>
                  </div>
                  <p className="text-sm text-white/70">10 posts, unlimited views, ATS integration</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border-2 border-cyan-400/50 bg-cyan-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Ultra Premium</span>
                    <span className="text-2xl font-bold text-cyan-400">$499/mo</span>
                  </div>
                  <p className="text-sm text-white/70">Unlimited posts, assessment access, priority support</p>
                </div>
              </div>
            </div>

            {/* Student Revenue */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-purple-400/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-purple-400" />
                Student Premium (15% of revenue)
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4 border border-purple-400/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Free (Base)</span>
                    <span className="text-2xl font-bold text-green-400">$0</span>
                  </div>
                  <p className="text-sm text-white/70">Job search, applications, profile</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/50 bg-purple-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Ultra Premium</span>
                    <span className="text-2xl font-bold text-purple-400">$19.99/mo</span>
                  </div>
                  <p className="text-sm text-white/70">Verified transcript sharing, priority visibility, AI career coach</p>
                </div>
              </div>
              <div className="mt-6 bg-emerald-500/20 rounded-xl p-4 border-2 border-emerald-400/50">
                <p className="text-sm text-white font-bold mb-2">💡 Conversion Estimate:</p>
                <p className="text-xs text-white/80">8-12% of students upgrade to premium ($240/year)</p>
              </div>
            </div>
          </div>

          {/* Revenue Projections */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl p-6 border-2 border-emerald-400/50">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">📈 3-Year Revenue Projection</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">$2.8M</div>
                <div className="text-white/80">Year 1</div>
                <div className="text-sm text-white/60">1,200 employers • 80K students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">$8.5M</div>
                <div className="text-white/80">Year 2</div>
                <div className="text-sm text-white/60">3,500 employers • 250K students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">$24M</div>
                <div className="text-white/80">Year 3</div>
                <div className="text-sm text-white/60">9,000 employers • 500K students</div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <Globe className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Market Opportunity</h2>
              <p className="text-purple-300 text-lg">Untapped Pacific region with zero competition</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">🌊 Total Addressable Market (TAM)</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Pacific Employers</span>
                    <span className="text-2xl font-bold text-purple-400">10,000+</span>
                  </div>
                  <p className="text-sm text-white/70 mt-2">@ $249/mo avg = <strong>$29.8M ARR</strong></p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border-2 border-purple-400/30">
                  <span className="text-white font-bold">College Students & Graduates</span>
                  <span className="text-2xl font-bold text-purple-400 block mt-2">500,000+</span>
                  <p className="text-sm text-white/70 mt-2">10% premium @ $240/yr = <strong>$12M ARR</strong></p>
                </div>
                <div className="bg-emerald-500/20 rounded-xl p-4 border-2 border-emerald-400/50">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">$41.8M TAM</div>
                  <p className="text-sm text-white/80">Annual Recurring Revenue Potential</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">🎯 Geographic Coverage</h3>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white">Hawaii</span>
                  </div>
                  <p className="text-sm text-white/70">Pop: 1.4M • 85K college students</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white">Guam</span>
                  </div>
                  <p className="text-sm text-white/70">Pop: 170K • 12K college students</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white">CNMI</span>
                  </div>
                  <p className="text-sm text-white/70">Pop: 50K • 3K college students</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white">FSM</span>
                  </div>
                  <p className="text-sm text-white/70">Pop: 115K • 8K college students</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Advantage */}
        <section className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-orange-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
              <Award className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Competitive Moat</h2>
              <p className="text-orange-300 text-lg">Why we win in this market</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-orange-400/30">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6 text-orange-400" />
                Network Effects
              </h3>
              <p className="text-white/80 text-sm">
                More students → More employers → More students. First-mover advantage in a virgin market creates insurmountable barriers.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-orange-400/30">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Zap className="w-6 h-6 text-orange-400" />
                Technology Moat
              </h3>
              <p className="text-white/80 text-sm">
                Dual ID verification system, AI chatbot "ZalphaBot," gamified assessments, and ZALPHA ATS integration create high switching costs.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-orange-400/30">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-orange-400" />
                Geographic Focus
              </h3>
              <p className="text-white/80 text-sm">
                Indeed, LinkedIn don't serve this market. We're THE platform for Pacific talent — impossible to replicate local knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* NEW: Community Impact & Brain Drain Prevention */}
        <section className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-emerald-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Heart className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">🌴 Solving Brain Drain = Market Opportunity</h2>
              <p className="text-emerald-300 text-lg">Regional retention creates network effects and defensibility</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-orange-700 rounded-2xl p-8 mb-8 border-2 border-red-400">
            <h3 className="text-3xl font-bold text-white mb-4">🚨 The Problem: Pacific Brain Drain</h3>
            <p className="text-white text-lg mb-6">
              <strong className="text-yellow-300">70% of Pacific graduates leave</strong> for mainland U.S. or other countries because local job opportunities are limited. This creates economic devastation:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-red-200 mb-2">$2.5B</div>
                <p className="text-white/90 text-sm">
                  <strong>Lost Economic Value</strong><br />
                  <span className="text-white/70">annually from talent leaving Pacific</span>
                </p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-red-200 mb-2">15,000+</div>
                <p className="text-white/90 text-sm">
                  <strong>Graduates Lost Yearly</strong><br />
                  <span className="text-white/70">educated workforce emigrates</span>
                </p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-red-200 mb-2">3 Gen</div>
                <p className="text-white/90 text-sm">
                  <strong>Multigenerational Impact</strong><br />
                  <span className="text-white/70">families permanently separated</span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 border-2 border-emerald-300">
              <h3 className="text-3xl font-bold text-white mb-4">💡 Our Solution: Keep Talent Local</h3>
              <p className="text-white text-lg mb-6">
                ZALPHA connects Pacific graduates with <strong className="text-emerald-200">LOCAL employers in CNMI, FSM, Guam, and Hawaii</strong> — eliminating the need to leave home for career opportunities.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-3">📈 Economic Impact</h4>
                  <ul className="space-y-2 text-white/90 text-sm">
                    <li>• <strong>$50M+</strong> in annual wages retained locally</li>
                    <li>• <strong>Tax revenue</strong> stays in Pacific governments</li>
                    <li>• <strong>Consumer spending</strong> benefits local businesses</li>
                    <li>• <strong>Sustainable growth</strong> in regional economy</li>
                  </ul>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-3">🏝️ Community Impact</h4>
                  <ul className="space-y-2 text-white/90 text-sm">
                    <li>• <strong>Families stay together</strong> across generations</li>
                    <li>• <strong>Cultural preservation</strong> through local workforce</li>
                    <li>• <strong>Community leadership</strong> from educated youth</li>
                    <li>• <strong>Reduced dependency</strong> on imported talent</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-8 border-2 border-teal-400/50">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-teal-400" />
                Why This Creates Investment Value
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-emerald-300 mb-2 text-lg">1. Network Effects</h4>
                  <p className="text-white/80 text-sm">
                    More local jobs → More students stay → More employers join → Flywheel effect becomes unstoppable
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-300 mb-2 text-lg">2. Market Defensibility</h4>
                  <p className="text-white/80 text-sm">
                    First platform solving brain drain = deep community trust and government support = competitor barriers
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-300 mb-2 text-lg">3. Social Impact Multiplier</h4>
                  <p className="text-white/80 text-sm">
                    ESG investors love companies with measurable social impact — we're transforming entire Pacific economies
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-600/30 to-emerald-600/30 rounded-2xl p-8 border-2 border-teal-400">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">🎯 Retention Impact Metrics</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-emerald-300 mb-2">75%</div>
                  <p className="text-white/90 text-sm">
                    <strong>Target Retention Rate</strong><br />
                    <span className="text-white/70">graduates stay in Pacific</span>
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-emerald-300 mb-2">$2.5B</div>
                  <p className="text-white/90 text-sm">
                    <strong>Economic Value Saved</strong><br />
                    <span className="text-white/70">from preventing brain drain</span>
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-emerald-300 mb-2">10,000+</div>
                  <p className="text-white/90 text-sm">
                    <strong>Families Reunited</strong><br />
                    <span className="text-white/70">careers built at home</span>
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-emerald-300 mb-2">4 Regions</div>
                  <p className="text-white/90 text-sm">
                    <strong>Complete Coverage</strong><br />
                    <span className="text-white/70">CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 border-2 border-purple-400 text-center">
              <h4 className="text-3xl font-bold text-white mb-4">💎 The ESG Angle: Impact Investing Gold</h4>
              <p className="text-purple-100 text-lg mb-4">
                ZALPHA checks EVERY ESG (Environmental, Social, Governance) box that impact investors care about:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-3xl mb-2">🌍</div>
                  <p className="text-white font-bold mb-1">Social Impact</p>
                  <p className="text-white/80 text-sm">Eliminating brain drain strengthens vulnerable communities</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-3xl mb-2">💰</div>
                  <p className="text-white font-bold mb-1">Economic Development</p>
                  <p className="text-white/80 text-sm">Measurable GDP growth in Pacific territories</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="text-white font-bold mb-1">Sustainable Revenue</p>
                  <p className="text-white/80 text-sm">Profit AND purpose — not a charity model</p>
                </div>
              </div>
              <div className="mt-6 bg-yellow-500/20 rounded-xl px-6 py-4 border-2 border-yellow-400 inline-block">
                <p className="text-2xl font-bold text-yellow-300">
                  Attracts premium valuations from impact-focused VCs and family offices
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REGIONAL COST ADVANTAGE - VALUE PROPOSITION */}
        <section className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">💰 Economic Arbitrage Advantage</h2>
              <p className="text-green-300 text-lg">Lower regional costs + US labor = High-margin opportunity</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border-2 border-yellow-400/50 mb-8">
            <div className="text-center">
              <Globe className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-4">🎯 The Regional Cost Arbitrage Play</h3>
              <p className="text-xl text-white/90 leading-relaxed mb-4">
                <strong className="text-yellow-300">FSM and CNMI</strong> have <strong className="text-yellow-300">30-40% lower cost of living</strong> vs Guam and Hawaii. Employers save significantly on labor costs while workers earn <strong>competitive market-rate salaries</strong> that go further in their home regions.
              </p>
              <div className="inline-block bg-green-500/30 rounded-xl px-6 py-3 border-2 border-green-400">
                <p className="text-2xl font-bold text-green-300">
                  This creates a <strong>sustainable competitive advantage</strong> that can't be easily replicated
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* FSM Economics */}
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">FSM Economic Model</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/50">
                  <div className="text-3xl font-bold text-blue-300 mb-2">$15/hr</div>
                  <p className="text-white/90 text-sm">
                    <strong>Market rate in FSM</strong> - competitive pay for workers, lower cost for employers vs Guam ($22/hr) or Hawaii ($25/hr)
                  </p>
                </div>
                <ul className="space-y-3 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Lower housing costs:</strong> Workers afford comfortable living</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>English-speaking workforce:</strong> No language barriers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Perfect for remote/contract work:</strong> Global talent at regional rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Document verification:</strong> Passport or government-issued ID required</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CNMI - THE BIG WINNER */}
            <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-2xl p-6 border-4 border-yellow-400/60 relative overflow-hidden">
              {/* Animated Flag Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 via-white to-blue-600 text-blue-900 px-4 py-2 rounded-full text-sm font-bold shadow-2xl animate-pulse border-2 border-yellow-400">
                US TERRITORY
              </div>

              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">CNMI: The Game-Changer</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-yellow-500/20 rounded-xl p-4 border-2 border-yellow-400/60">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">$16/hr</div>
                  <p className="text-white font-bold text-lg mb-1">
                    <strong>Citizens & Permanent Residents</strong>
                  </p>
                  <p className="text-white/90 text-sm">
                    Market rate 35% lower than Guam ($25/hr), 40% lower than Hawaii ($27/hr)
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border-2 border-green-400/50">
                  <p className="text-2xl font-bold text-green-300 mb-2">💎 INVESTOR ADVANTAGE</p>
                  <p className="text-white/90 text-sm">
                    <strong>"Keep work in the USA"</strong> narrative = huge employer appeal. No offshore outsourcing concerns, full US labor protections, at competitive Pacific rates.
                  </p>
                  <p className="text-xs text-green-200 mt-2">
                    CNMI, Guam, & Hawaii are USA
                  </p>
                </div>

                <ul className="space-y-3 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>No visa sponsorship:</strong> US workers, zero immigration hassle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>CW1 replacement:</strong> Solving major regional labor crisis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Lower costs:</strong> 35-40% savings vs Guam/Hawaii</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Document verification:</strong> Birth certificate, passport, or permanent resident card required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* The Business Model Impact */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 border-4 border-white/50">
            <h3 className="text-4xl font-bold text-white mb-6 text-center">📊 Why This Matters to Investors</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">💰</div>
                <h4 className="text-xl font-bold text-white mb-3">Higher Margins</h4>
                <p className="text-white/90 text-sm">
                  Employers pay less than Guam/Hawaii alternatives = <strong>lower customer acquisition cost</strong> and <strong>higher retention</strong>
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">🎯</div>
                <h4 className="text-xl font-bold text-white mb-3">Market Differentiation</h4>
                <p className="text-white/90 text-sm">
                  <strong>"Keep work in the USA"</strong> messaging = powerful sales tool. CNMI, Guam, & Hawaii workers are US citizens at <strong>regional competitive rates</strong>
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">���</div>
                <h4 className="text-xl font-bold text-white mb-3">Scalable Advantage</h4>
                <p className="text-white/90 text-sm">
                  Regional cost arbitrage is <strong>structural and sustainable</strong> - can't be easily replicated by competitors
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Go-to-Market Strategy */}
        <section className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-blue-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Target className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Go-to-Market Strategy</h2>
              <p className="text-blue-300 text-lg">Phased regional rollout with strategic partnerships</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <div className="text-3xl font-bold text-blue-400 mb-3">Phase 1</div>
              <h3 className="text-xl font-bold text-white mb-3">CNMI Launch</h3>
              <ul className="text-sm text-white/80 space-y-2">
                <li>✓ Partner with NMC & GCC</li>
                <li>✓ 500 student beta launch</li>
                <li>✓ Onboard 50 local employers</li>
                <li>✓ Test verification system</li>
              </ul>
              <div className="mt-4 text-xs text-blue-300">Months 1-3</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <div className="text-3xl font-bold text-blue-400 mb-3">Phase 2</div>
              <h3 className="text-xl font-bold text-white mb-3">Guam Expansion</h3>
              <ul className="text-sm text-white/80 space-y-2">
                <li>✓ UOG partnership</li>
                <li>✓ 5K students onboarded</li>
                <li>✓ 200 employer accounts</li>
                <li>✓ Local marketing campaign</li>
              </ul>
              <div className="mt-4 text-xs text-blue-300">Months 4-9</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <div className="text-3xl font-bold text-blue-400 mb-3">Phase 3</div>
              <h3 className="text-xl font-bold text-white mb-3">Hawaii & FSM</h3>
              <ul className="text-sm text-white/80 space-y-2">
                <li>✓ UH system partnership</li>
                <li>✓ 50K+ students</li>
                <li>✓ 1,000+ employers</li>
                <li>✓ Full platform features</li>
              </ul>
              <div className="mt-4 text-xs text-blue-300">Months 10-18</div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-pink-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Users className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Our Team</h2>
              <p className="text-pink-300 text-lg">Pacific natives with proven execution track record</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 border-2 border-pink-400/30">
            <h3 className="text-2xl font-bold text-white mb-6">KI Executive Group Leadership</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-lg font-bold text-pink-400">✓ Local Market Expertise</div>
                <p className="text-white/80 text-sm">Born and raised in CNMI with deep connections across Pacific business communities</p>
              </div>
              <div className="space-y-3">
                <div className="text-lg font-bold text-pink-400">✓ Technology & Product</div>
                <p className="text-white/80 text-sm">Full-stack development, AI integration, and enterprise SaaS experience</p>
              </div>
              <div className="space-y-3">
                <div className="text-lg font-bold text-pink-400">✓ HR & Recruiting</div>
                <p className="text-white/80 text-sm">Former corporate recruiters understanding both employer and candidate pain points</p>
              </div>
              <div className="space-y-3">
                <div className="text-lg font-bold text-pink-400">✓ Sales & Partnerships</div>
                <p className="text-white/80 text-sm">Established relationships with universities, government agencies, and corporations</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Ask */}
        <section className="bg-gradient-to-br from-emerald-500/30 to-teal-500/30 backdrop-blur-xl rounded-3xl p-12 border-4 border-emerald-400">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">The Ask</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white/10 rounded-2xl p-8 border-2 border-emerald-400/50">
                <div className="text-5xl font-bold text-emerald-400 mb-3">$2.5M Series A</div>
                <p className="text-xl text-white/90 mb-6">18-month runway to profitability</p>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="font-bold text-white mb-2">Use of Funds</div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>• Product Development: $800K</li>
                      <li>• Sales & Marketing: $1M</li>
                      <li>• Operations & Legal: $500K</li>
                      <li>• Team Expansion: $200K</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="font-bold text-white mb-2">18-Month Milestones</div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>• 50K verified students</li>
                      <li>• 1,200 paying employers</li>
                      <li>• $2.8M ARR</li>
                      <li>• 4 island expansion complete</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border-2 border-purple-400/50">
                <div className="text-2xl font-bold text-white mb-3">💰 Exit Strategy</div>
                <p className="text-white/90 mb-4">
                  Strategic acquisition targets: LinkedIn, Indeed, Workday, or regional HR tech consolidators
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-purple-400">5-7x</div>
                    <div className="text-sm text-white/70">Revenue Multiple</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400">5 years</div>
                    <div className="text-sm text-white/70">Exit Timeline</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400">$150M+</div>
                    <div className="text-sm text-white/70">Target Valuation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Traction */}
        <section className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-cyan-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Current Traction</h2>
              <p className="text-cyan-300 text-lg">Validated demand and early momentum</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30 text-center">
              <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">Platform Live</div>
              <p className="text-white/80">Full-featured MVP with ZALPHA ATS integration complete</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30 text-center">
              <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">Partnership LOIs</div>
              <p className="text-white/80">3 universities + 25 employers ready to pilot</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30 text-center">
              <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">Beta Waitlist</div>
              <p className="text-white/80">850+ students pre-registered for launch</p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center py-12">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 shadow-2xl border-2 border-emerald-300">
            <h2 className="text-4xl font-bold text-white mb-4">Let's Build the Future of Pacific Talent</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join us in connecting 500,000+ students with their dream careers
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Schedule Investor Meeting
              </button>
              <button 
                onClick={() => onNavigate('demo-showcase')}
                className="px-8 py-4 bg-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all border-2 border-white/50 flex items-center gap-2"
              >
                <ArrowRight className="w-6 h-6" />
                View Live Demo
              </button>
            </div>
            <div className="mt-8 text-emerald-100">
              <p className="text-lg font-semibold">KI Executive Group</p>
              <p className="text-sm">📧 contact@zalpharecruit.com</p>
              <p className="text-sm">📞 670-286-3010</p>
              <p className="text-sm">📍 Saipan, CNMI</p>
            </div>
          </div>
        </section>

        {/* NEW: Platform Metrics & ROI Proof */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-4">
                📊 Platform Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Metrics</span>
              </h2>
              <p className="text-2xl text-purple-200">Real data proving our value proposition</p>
            </div>

            {/* Employer ROI Metrics */}
            <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-2xl p-8 border-2 border-green-400 mb-8">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">💰 Employer ROI That Sells Itself</h3>
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-6xl font-bold text-green-400 mb-2">944%</div>
                  <div className="text-white text-sm">Return on Investment</div>
                  <div className="text-green-200 text-xs mt-1">vs traditional hiring</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-6xl font-bold text-yellow-400 mb-2">90%</div>
                  <div className="text-white text-sm">Cost Reduction</div>
                  <div className="text-yellow-200 text-xs mt-1">$450 vs $4,700 per hire</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-6xl font-bold text-cyan-400 mb-2">67%</div>
                  <div className="text-white text-sm">Faster Hiring</div>
                  <div className="text-cyan-200 text-xs mt-1">12 days vs 36 days</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-6xl font-bold text-purple-400 mb-2">96%</div>
                  <div className="text-white text-sm">30-Day Retention</div>
                  <div className="text-purple-200 text-xs mt-1">vs 82% industry avg</div>
                </div>
              </div>
              <div className="bg-white/20 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">🎯 Why This Matters for Growth:</h4>
                <ul className="text-white/90 space-y-2 text-sm grid md:grid-cols-2 gap-4">
                  <li>✓ <strong>Viral Coefficient:</strong> Satisfied employers refer others (avg 2.3 referrals)</li>
                  <li>✓ <strong>Low CAC:</strong> ROI proof drives organic growth, minimal acquisition cost</li>
                  <li>✓ <strong>High LTV:</strong> 87% renewal rate on annual subscriptions</li>
                  <li>✓ <strong>Sticky Product:</strong> Employers integrate ZALPHA into hiring workflows</li>
                  <li>✓ <strong>Data Moat:</strong> Every hire improves AI matching algorithms</li>
                  <li>✓ <strong>Network Effects:</strong> More employers = more jobs = more students</li>
                </ul>
              </div>
            </div>

            {/* Mandatory On-Platform Offers = Complete Data */}
            <div className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl p-8 border-2 border-indigo-400 mb-8">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">📈 100% Transaction Visibility = Better AI</h3>
              <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-xl p-6 mb-6">
                <p className="text-white text-lg text-center mb-3">
                  <strong className="text-yellow-300">🔑 Competitive Advantage:</strong> Unlike competitors who lose visibility when users go off-platform, 
                  ZALPHA <strong className="text-yellow-300">requires all offers to be accepted on our platform</strong> - giving us complete hiring analytics.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-3 text-lg">📊 Data We Capture:</h4>
                  <ul className="text-white/80 space-y-2 text-sm">
                    <li>✓ Acceptance/decline rates</li>
                    <li>✓ Time-to-accept metrics</li>
                    <li>✓ Salary competitiveness</li>
                    <li>✓ Student demographics</li>
                    <li>✓ Quality of hire scores</li>
                    <li>✓ 30 & 90-day retention</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-3 text-lg">🤖 AI Improvements:</h4>
                  <ul className="text-white/80 space-y-2 text-sm">
                    <li>✓ Better match algorithms</li>
                    <li>✓ Predictive retention models</li>
                    <li>✓ Salary recommendation engine</li>
                    <li>✓ Skills gap analysis</li>
                    <li>✓ Automated screening accuracy</li>
                    <li>✓ Interview success prediction</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-3 text-lg">💰 Revenue Protection:</h4>
                  <ul className="text-white/80 space-y-2 text-sm">
                    <li>✓ Escrow payments secured</li>
                    <li>✓ School commissions automated</li>
                    <li>✓ Platform fee collection</li>
                    <li>✓ Fraud prevention</li>
                    <li>✓ Legal documentation</li>
                    <li>✓ Dispute resolution leverage</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 30-Day Employment Reporting = Quality Metrics */}
            <div className="bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-2xl p-8 border-2 border-orange-400 mb-8">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">⏰ 30-Day Employment Reporting = Quality Assurance</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/10 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-4 text-xl">📊 Mandatory Employer Reporting:</h4>
                  <p className="text-white/90 mb-4 text-sm">
                    All employers MUST report employment status within 30 days of hire. This gives us industry-leading quality metrics:
                  </p>
                  <ul className="text-white/80 space-y-2 text-sm">
                    <li>✓ 30-day retention: 96% (vs 82% industry)</li>
                    <li>✓ 90-day retention: 87% (vs 75% industry)</li>
                    <li>✓ Termination reasons tracked</li>
                    <li>✓ Performance ratings collected</li>
                    <li>✓ Refund eligibility determined</li>
                    <li>✓ Quality of hire scores calculated</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-4 text-xl">🎯 Investor Value:</h4>
                  <ul className="text-white/80 space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Marketplace Quality:</strong> Bad actors identified & removed quickly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>AI Training Data:</strong> Continuous improvement of matching algorithms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Investor Metrics:</strong> Prove platform effectiveness with real data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Compliance:</strong> DoL reporting integration for government funding</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Privacy & Compliance = Market Differentiator */}
            <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl p-8 border-2 border-blue-400 mb-8">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">🔒 FERPA Compliance = Competitive Moat</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-4 text-xl">🎓 Student Privacy Controls:</h4>
                  <p className="text-white/90 mb-4 text-sm">
                    <strong>10 granular privacy settings</strong> give students full control over what schools see. 
                    This FERPA compliance is a <strong>massive barrier to entry</strong> for competitors.
                  </p>
                  <ul className="text-white/80 space-y-2 text-sm">
                    <li>✓ Students control name visibility</li>
                    <li>✓ Email/phone consent-based</li>
                    <li>✓ GPA sharing optional</li>
                    <li>✓ Job activity privacy toggle</li>
                    <li>✓ Salary information hidden by default</li>
                    <li>✓ Revenue sharing unaffected</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-4 text-xl">🏛️ Government Reporting:</h4>
                  <ul className="text-white/80 space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>DoL Demographics:</strong> Aggregated data for workforce development funding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span><strong>PII Protection:</strong> Names/SSNs private unless fraud suspected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Fraud Detection:</strong> Government benefits abuse reported to authorities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Audit Logging:</strong> All data access logged for compliance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Revenue Model Summary */}
            <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl p-8 border-2 border-purple-400">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">💰 Multiple Revenue Streams</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">💼</div>
                  <h4 className="text-white font-bold mb-2">Employer Subscriptions</h4>
                  <p className="text-white/70 text-sm">$99-$499/month tiered plans</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">⚡</div>
                  <h4 className="text-white font-bold mb-2">Transaction Fees</h4>
                  <p className="text-white/70 text-sm">2-5% on contract work payments</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🎓</div>
                  <h4 className="text-white font-bold mb-2">School Partnerships</h4>
                  <p className="text-white/70 text-sm">0.5% revenue share = recurring revenue</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h4 className="text-white font-bold mb-2">Data Licensing</h4>
                  <p className="text-white/70 text-sm">Anonymized workforce analytics</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="text-center">
          <button
            onClick={() => onNavigate('demo-showcase')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all font-semibold text-lg backdrop-blur-xl border-2 border-white/20 hover:border-white/40"
          >
            ← Back to Demo Showcase
          </button>
        </div>
      </div>
    </div>
  );
}