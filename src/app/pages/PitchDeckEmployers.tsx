import { Building2, TrendingUp, DollarSign, Users, Target, Award, CheckCircle, Star, ArrowRight, Shield, Zap, BarChart3, Briefcase, GraduationCap, Sparkles, Clock, MessageSquare, MapPin, Search, XCircle, Globe, Download, Heart } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface PitchDeckEmployersProps {
  onNavigate: (page: string) => void;
}

export function PitchDeckEmployers({ onNavigate }: PitchDeckEmployersProps) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">ZALPHA for Employers</h1>
              <p className="text-xs text-cyan-300 hidden sm:block">Business Development Pitch</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm font-semibold"
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
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Building2 className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight px-4">
            Recruiting Top Pacific<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Graduate Talent
            </span>
          </h1>
          
          {/* "KEEP WORK IN THE USA" Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 via-white to-blue-600 rounded-full px-4 sm:px-8 py-3 sm:py-4 mb-6 shadow-2xl border-2 sm:border-4 border-yellow-400 animate-pulse">
            <span className="text-lg sm:text-2xl font-black text-blue-900">KEEP WORK IN THE USA</span>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-cyan-200 mb-8 max-w-3xl mx-auto px-4">
            Connect with pre-verified college students and recent graduates across the Western Pacific region
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-white px-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" />
              <span className="text-sm sm:text-base md:text-lg">CNMI • FSM • Guam • Hawaii • Marshall Islands • Palau</span>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">The Challenge You Face</h2>
              <p className="text-cyan-300 text-base sm:text-lg">Current hiring pain points</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-3">❌ Unverified Candidates</h3>
              <p className="text-white/80">Wasting time on fake profiles, unqualified applicants, and credential fraud</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-3">⏱️ Slow Hiring Process</h3>
              <p className="text-white/80">Months to find the right candidate, losing top talent to competitors</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-3">💸 High Cost Per Hire</h3>
              <p className="text-white/80">Expensive job boards with low ROI and poor candidate quality</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-3">🌴 Limited Pacific Reach</h3>
              <p className="text-white/80">Hard to find local talent across CNMI, FSM, Guam, Hawaii, Marshall Islands, and Palau</p>
            </div>
          </div>
        </section>

        {/* Why Pay When Indeed is Free? - Competitive Comparison */}
        <section className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-white mb-4">💡 "But Indeed is Free..."</h2>
            <p className="text-2xl text-purple-300">Here's what that "free" platform actually costs you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Indeed Column */}
            <div className="bg-red-900/30 rounded-2xl p-8 border-2 border-red-400/50">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-10 h-10 text-red-400" />
                <h3 className="text-3xl font-bold text-white">Indeed (Free Tier)</h3>
              </div>
              <div className="space-y-4 text-white/90 text-lg">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-2xl">❌</span>
                  <div>
                    <p className="font-bold text-red-300">30% Credential Fraud Rate</p>
                    <p className="text-white/70 text-base">Unverified candidates with fake resumes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-2xl">❌</span>
                  <div>
                    <p className="font-bold text-red-300">45-60 Days Time to Hire</p>
                    <p className="text-white/70 text-base">Manual screening of 200+ applications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-2xl">❌</span>
                  <div>
                    <p className="font-bold text-red-300">$4,500 Cost Per Hire</p>
                    <p className="text-white/70 text-base">Recruiter time + bad hire turnover</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-2xl">❌</span>
                  <div>
                    <p className="font-bold text-red-300">Zero Pacific Focus</p>
                    <p className="text-white/70 text-base">Generic platform, no island expertise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-2xl">❌</span>
                  <div>
                    <p className="font-bold text-red-300">No Skills Verification</p>
                    <p className="text-white/70 text-base">You do 100% of the screening work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-2xl">❌</span>
                  <div>
                    <p className="font-bold text-red-300">65% First-Year Retention</p>
                    <p className="text-white/70 text-base">Poor cultural fit = high turnover</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-2xl">❌</span>
                  <div>
                    <p className="font-bold text-red-300">No ADA Compliance Tools</p>
                    <p className="text-white/70 text-base">Risk $300M+ in annual ADA lawsuits</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-red-500/20 border-2 border-red-400 rounded-xl p-4">
                <p className="text-white font-bold text-xl text-center">
                  "Free" = $4,500 in hidden costs + 60 days wasted + ADA risk
                </p>
              </div>
            </div>

            {/* ZALPHA Column */}
            <div className="bg-green-900/30 rounded-2xl p-8 border-2 border-green-400/50">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
                <h3 className="text-3xl font-bold text-white">ZALPHA ($49.99/mo)</h3>
              </div>
              <div className="space-y-4 text-white/90 text-lg">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-green-300">&lt;1% Fraud Rate</p>
                    <p className="text-white/70 text-base">Dual ID + education verification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-green-300">15-20 Days Time to Hire</p>
                    <p className="text-white/70 text-base">AI pre-screens 70% of candidates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-green-300">$1,250 Cost Per Hire</p>
                    <p className="text-white/70 text-base">AI automation saves recruiter time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-green-300">100% Pacific Specialists</p>
                    <p className="text-white/70 text-base">CNMI, Guam, Hawaii, FSM, Palau, Marshall Islands</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-green-300">🤖 AI Does 70% of Work</p>
                    <p className="text-white/70 text-base">Gamified skills tests + auto-matching</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-green-300">85% First-Year Retention</p>
                    <p className="text-white/70 text-base">Cultural fit + verified references</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-green-300">🎯 Built-In ADA Compliance</p>
                    <p className="text-white/70 text-base">Pacific's ONLY platform with inclusive hiring tools</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-green-500/20 border-2 border-green-400 rounded-xl p-4">
                <p className="text-white font-bold text-xl text-center">
                  $49.99/mo = Save $3,250 per hire + 40 days + ADA protection
                </p>
              </div>
            </div>
          </div>

          {/* ROI Breakdown */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl p-8 border-2 border-yellow-400/50">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">💰 The Math: Why ZALPHA Pays for Itself</h3>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">$3,250</div>
                <p className="text-lg">Saved Per Hire</p>
                <p className="text-sm text-white/70 mt-2">($4,500 Indeed vs $1,250 ZALPHA)</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">40 Days</div>
                <p className="text-lg">Faster Hiring</p>
                <p className="text-sm text-white/70 mt-2">(60 days Indeed vs 20 days ZALPHA)</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">20%</div>
                <p className="text-lg">Better Retention</p>
                <p className="text-sm text-white/70 mt-2">(85% ZALPHA vs 65% Indeed)</p>
              </div>
            </div>
            <div className="mt-8 bg-white/10 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-white mb-2">
                ⚡ One Quality Hire = 65 Months of ZALPHA FREE
              </p>
              <p className="text-lg text-white/80">
                ($3,250 saved ÷ $49.99/month = 65 months of subscription covered)
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-2xl text-white font-bold mb-4">
              "Indeed is free" - until you count the cost of your time. 🤖
            </p>
            <p className="text-xl text-purple-300">
              ZALPHA's AI platform does 70% of the hiring work for you - that's the difference.
            </p>
          </div>
        </section>

        {/* The Solution */}
        <section className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-cyan-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Meet ZALPHA</h2>
              <p className="text-cyan-300 text-lg">Your verified Pacific talent pipeline</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">100% Verified</h3>
              <p className="text-white/80">Every student verified with dual ID authentication and age verification</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <Search className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Pre-Qualified</h3>
              <p className="text-white/80">Gamified skills assessments ensure candidates match your requirements</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <MapPin className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Pacific-Focused</h3>
              <p className="text-white/80">Exclusive access to talent across CNMI, FSM, Guam, Hawaii, Marshall Islands, and Palau</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-2xl p-6 border-2 border-yellow-400/50">
            <h3 className="text-2xl font-bold text-white mb-4">⚡ What Makes Us Different (14 Key Advantages)</h3>
            <ul className="grid md:grid-cols-2 gap-4 text-white">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>ID Verification:</strong> Dual Gov ID + Student ID verification ensures quality candidates</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>AI Custom Assessments:</strong> Build job-specific tests with Zee assistant</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Cultural Training:</strong> Optional Pacific cultural workshops to improve hiring success</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Virtual Job Fairs:</strong> Meet candidates live at Pacific-wide employment events</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Free Contract Tier:</strong> Post gig work at $0 cost to test the platform</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>50+ Integrations:</strong> ZALPHA ATS, Custom websites, and enterprise platforms (Ultra Premium)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Company Reviews:</strong> Build your employer brand with verified student reviews</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Crypto Payments:</strong> Pay contractors in Bitcoin, Ethereum, or USDC</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Game-Style Assessments:</strong> Students take engaging workforce readiness tests</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Equipment Payments:</strong> Students can request tech instead of cash (ZALPHA handles logistics)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Pacific-Only Focus:</strong> CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands - no mainland competition</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>AI Course Platform:</strong> Students upskill continuously through Zee-powered learning</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Virtual College Fairs:</strong> Support students on education pathway (high school → college)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Dual Pathway System:</strong> Only platform serving both work-first AND college-first students</span>
              </li>
            </ul>
          </div>
        </section>

        {/* NEW: Basic Skills Assessment - Replacing CW1 Workers */}
        <section className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-emerald-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">🎓 Workforce-Ready Local Talent</h2>
              <p className="text-emerald-300 text-lg">Replace CW1 workers with certified Pacific graduates</p>
            </div>
          </div>

          <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Briefcase className="w-10 h-10 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">The Contract Worker Phase-Out Solution</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  As <strong>CW1 workers (CNMI) and H2 workers (Guam)</strong> are being phased out or face restrictions, ZALPHA provides <strong>verified, workforce-ready local 18-year-olds</strong> who can fill entry-level positions immediately. Our Basic Skills Assessment certifies that high school graduates have the fundamental skills needed for your business—without requiring a college degree.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
                Basic Skills Assessment
              </h3>
              <p className="text-white/90 mb-4">
                Every 18-year-old high school graduate who wants to work (not go to college) takes our <strong>required Basic Skills Test</strong>:
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">📖</span>
                  <span><strong>Reading Comprehension:</strong> Understanding workplace instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">🔢</span>
                  <span><strong>Basic Math:</strong> Calculating hours, totals, tips, and money</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">🧠</span>
                  <span><strong>Problem Solving:</strong> Handling real workplace scenarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✅</span>
                  <span><strong>Following Instructions:</strong> Step-by-step procedures</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Award className="w-7 h-7 text-yellow-400" />
                "Workforce Ready" Certification
              </h3>
              <p className="text-white/90 mb-4">
                Students who pass with <strong>70% or higher</strong> earn a <strong>\"Workforce Ready\"</strong> badge on their profile that you can see immediately.
              </p>
              <div className="bg-emerald-500/20 rounded-xl p-4 mb-4 border border-emerald-400/50">
                <div className="text-4xl font-bold text-emerald-400 mb-1">See Their Scores</div>
                <p className="text-white/80 text-sm">
                  Ultra Premium employers ($499/month - <span className="line-through text-white/50">$799</span> LIMITED TIME) get access to detailed assessment breakdowns for every candidate.
                </p>
              </div>
              <div className="space-y-2 text-white/80 text-sm">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Filter candidates by certification status</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>View detailed skill breakdowns per candidate</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Reduce training time with pre-qualified workers</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl p-6 border-2 border-red-400/50">
              <div className="text-center">
                <div className="text-4xl mb-3">❌</div>
                <h4 className="text-xl font-bold text-white mb-2">CW1 Workers</h4>
                <ul className="text-white/80 text-sm space-y-2 text-left">
                  <li>• Being phased out</li>
                  <li>• High turnover rates</li>
                  <li>• Visa & work permit complexity</li>
                  <li>• Not invested in local economy</li>
                  <li>• Language/culture barriers</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border-2 border-emerald-400/50">
              <div className="text-center">
                <div className="text-4xl mb-3">✅</div>
                <h4 className="text-xl font-bold text-white mb-2">Local 18-Year-Olds</h4>
                <ul className="text-white/80 text-sm space-y-2 text-left">
                  <li>• Ready to work NOW</li>
                  <li>• No visa requirements</li>
                  <li>• Skills-verified & certified</li>
                  <li>• Invest earnings locally</li>
                  <li>• Build Pacific workforce</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border-2 border-purple-400/50">
              <div className="text-center">
                <div className="text-4xl mb-3">🌺</div>
                <h4 className="text-xl font-bold text-white mb-2">Economic Impact</h4>
                <ul className="text-white/80 text-sm space-y-2 text-left">
                  <li>• Keep money in CNMI/FSM/Guam/Hawaii/Marshall Islands/Palau</li>
                  <li>• Reduce youth unemployment</li>
                  <li>• Build skilled local workforce</li>
                  <li>• Support economic development</li>
                  <li>• Strengthen Pacific communities</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-center border-2 border-emerald-400">
            <div className="text-white">
              <p className="text-2xl font-bold mb-2">🏝️ Hire Local. Build Pacific. Grow Together.</p>
              <p className="text-emerald-100">
                Help our 18-year-olds transition from high school to the workforce while solving your CW1 replacement challenge.
              </p>
            </div>
          </div>
        </section>

        {/* INCLUSIVE HIRING - COMPETITIVE ADVANTAGE */}
        <section className="bg-gradient-to-br from-purple-600/40 via-pink-600/40 to-orange-600/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-2 sm:border-4 border-pink-400/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-yellow-400 text-purple-900 rounded-full text-xs sm:text-sm font-bold mb-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">ZALPHA EXCLUSIVE - PACIFIC'S FIRST & ONLY</span>
                  <span className="sm:hidden">ZALPHA EXCLUSIVE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">💜 Inclusive Hiring Built-In</h2>
                <p className="text-pink-300 text-sm sm:text-base md:text-lg">ADA Compliance + Diversity = Your Competitive Edge</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-pink-400/50 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
                🏆 Why This Is A Game-Changer For Your Business
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-white text-center mb-4 sm:mb-6">
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 mb-2">+26%</div>
                  <p className="text-base sm:text-lg font-semibold">Larger Candidate Pool</p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">Access qualified talent others overlook</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-2">+28%</div>
                  <p className="text-base sm:text-lg font-semibold">Higher Revenue</p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">Inclusive companies outperform peers</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 mb-2">90%</div>
                  <p className="text-base sm:text-lg font-semibold">Lower Turnover</p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">Employees with disabilities stay longer</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              {/* What We Built */}
              <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-green-400/50">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-400" />
                  What ZALPHA Provides
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-white/90 text-sm sm:text-base">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Automatic ADA Compliance:</strong> Built-in systems handle legal requirements</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>8 Disability Categories:</strong> Students can voluntarily disclose (100% optional)</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>12+ Accommodation Options:</strong> Clear requests upfront (flexible hours, remote work, assistive tech)</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Privacy Controls:</strong> Students decide who sees what, when</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Rights Education:</strong> Students know their protections before applying</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Zero-Tolerance Policy:</strong> Discrimination = immediate removal from platform</span>
                  </li>
                </ul>
              </div>

              {/* Business Benefits */}
              <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-purple-400/50">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-400" />
                  Your Business Benefits
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-white/90 text-sm sm:text-base">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Zero Extra Work:</strong> We handle compliance automatically</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Avoid Lawsuits:</strong> Proper systems = reduced legal risk ($300M+ in annual ADA lawsuits)</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Diverse Talent:</strong> Access 26% more qualified candidates</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Better Retention:</strong> 90% higher employee satisfaction & loyalty</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Enhanced Brand:</strong> 77% of consumers prefer disability-friendly companies</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Innovation Boost:</strong> Diverse teams are 35% more innovative</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* The Competitive Reality */}
            <div className="bg-gradient-to-r from-red-900/40 to-pink-900/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-red-400/50 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 text-center">⚠️ The Competitive Reality</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/10 rounded-xl p-4 sm:p-6 border-2 border-red-400/30">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-red-300 mb-3">❌ Indeed, LinkedIn, Other Platforms</h4>
                  <ul className="space-y-2 text-white/90 text-xs sm:text-sm">
                    <li>• No disability disclosure options</li>
                    <li>• No accommodation request system</li>
                    <li>• No ADA compliance tools</li>
                    <li>• You're on your own for legal compliance</li>
                    <li>• Missing 26% of the talent market</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-xl p-4 sm:p-6 border-2 border-green-400/50">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-green-300 mb-3">✅ ZALPHA Platform</h4>
                  <ul className="space-y-2 text-white/90 text-xs sm:text-sm">
                    <li>• Built-in ADA system (8 categories)</li>
                    <li>• Clear accommodation requests (12+ options)</li>
                    <li>• Automatic compliance for you</li>
                    <li>• Legal protection included</li>
                    <li>• Access to full diverse talent pool</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* The Bottom Line */}
            <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-yellow-400/50 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">💡 The Bottom Line</h3>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 leading-relaxed">
                While your competitors risk ADA lawsuits and miss out on 26% of qualified candidates, 
                <strong className="text-yellow-300"> ZALPHA gives you built-in compliance + access to a larger, more diverse talent pool.</strong>
              </p>
              <div className="inline-block bg-white/20 rounded-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-2 border-white/50 mb-4 sm:mb-6">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  This isn't just the right thing to do. It's smart business. 📈
                </p>
              </div>
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={() => onNavigate('inclusive-hiring')}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-purple-700 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg hover:bg-purple-50 transition-colors shadow-xl"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Learn More About Inclusive Hiring</span>
                  <span className="sm:hidden">Learn More</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* REGIONAL COST ADVANTAGE: FSM & CNMI */}
        <section className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">💵 Regional Cost Advantage</h2>
              <p className="text-green-300 text-lg">Lower labor costs + US workers = Competitive edge</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border-2 border-yellow-400/50 mb-8">
            <div className="text-center">
              <Globe className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-4">🏆 The Pacific Talent Advantage</h3>
              <p className="text-xl text-white/90 leading-relaxed">
                <strong className="text-yellow-300">FSM and CNMI</strong> have <strong className="text-yellow-300">significantly lower cost of living</strong> compared to Guam and Hawaii. This means <strong className="text-yellow-300">market-rate salaries</strong> in these regions are competitive for workers while being <strong className="text-yellow-300">much more affordable</strong> for your business.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* FSM Advantage */}
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">FSM (Federated States of Micronesia)</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/50">
                  <p className="text-white/90 text-lg mb-2">
                    <strong className="text-blue-300">Lower cost of living</strong> = workers thrive on competitive salaries
                  </p>
                  <p className="text-white/70 text-sm">
                    Your business saves while candidates earn market-rate pay that goes further in FSM
                  </p>
                </div>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Skilled workforce</strong> with Pacific work ethic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>English proficiency</strong> - no language barriers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Ideal for remote work</strong> and regional roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Perfect for contract work</strong> at competitive rates</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CNMI - MAJOR Advantage */}
            <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-2xl p-6 border-4 border-yellow-400/60 relative overflow-hidden">
              {/* "WORKERS" Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 via-white to-blue-600 text-blue-900 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-2xl animate-pulse border-2 border-yellow-400">
                WORKERS!
              </div>

              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">CNMI (Northern Mariana Islands)</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-yellow-500/20 rounded-xl p-4 border-2 border-yellow-400/60">
                  <p className="text-white font-bold text-xl mb-2">
                    <strong className="text-yellow-300">Citizens & Permanent Residents</strong>
                  </p>
                  <p className="text-white/90 text-lg">
                    <strong className="text-yellow-300">Lower cost of living + workforce</strong> = unbeatable value
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/50">
                  <p className="text-xl sm:text-2xl font-bold text-green-300 mb-2">✅ KEEP WORK IN THE USA</p>
                  <p className="text-white/90 text-sm sm:text-base">
                    No outsourcing to other countries. All CNMI, Guam, and Hawaii workers are <strong>citizens or permanent residents</strong> — you get the benefits of labor at regional market rates.
                  </p>
                  <p className="text-xs sm:text-sm text-green-200 mt-2">
                    CNMI, Guam, & Hawaii are USA
                  </p>
                </div>

                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>No visa sponsorship required</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>US employment laws apply</strong> - legal simplicity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Lower cost of living</strong> = competitive rates for you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Support American Pacific territories</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Win-Win Summary */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center border-4 border-white/50">
            <h3 className="text-4xl font-bold text-white mb-4">🏆 Win-Win for Everyone</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-5xl mb-3">🏢</div>
                <h4 className="text-2xl font-bold text-white mb-2">For Your Business</h4>
                <ul className="text-white/90 space-y-2 text-left text-sm sm:text-base">
                  <li>✅ <strong>Lower labor costs</strong> vs Guam/Hawaii</li>
                  <li>✅ <strong>Workers (CNMI)</strong> - no outsourcing</li>
                  <li>✅ <strong>Pre-verified candidates</strong> ready to hire</li>
                  <li>✅ <strong>Competitive rates</strong> for contract work</li>
                  <li>✅ <strong>No visa complexity</strong> in CNMI</li>
                </ul>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-5xl mb-3">🌺</div>
                <h4 className="text-2xl font-bold text-white mb-2">For the Pacific Regions</h4>
                <ul className="text-white/90 space-y-2 text-left">
                  <li>✅ <strong>Local jobs</strong> for 18-year-olds</li>
                  <li>✅ <strong>Money stays in the region</strong></li>
                  <li>✅ <strong>Reduce youth unemployment</strong></li>
                  <li>✅ <strong>Build skilled workforce</strong></li>
                  <li>✅ <strong>Strengthen economy</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Cryptocurrency Payments */}
        <section className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-orange-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">💰 Pay with Cryptocurrency</h2>
              <p className="text-orange-300 text-lg">Lower fees, instant payments, global reach</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-orange-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Zap className="w-7 h-7 text-orange-400" />
                For Gig & Contract Work
              </h3>
              <p className="text-white/90 mb-4">
                Employers can pay students in <strong>cryptocurrency (Bitcoin, Ethereum, USDC, etc.)</strong> for contract jobs, freelance work, and gig economy positions.
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">⚡</span>
                  <span><strong>Instant Payments:</strong> No waiting for bank transfers or check clearance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">💸</span>
                  <span><strong>Lower Fees:</strong> 1-2% vs. 3-5% for credit cards or PayPal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">🌏</span>
                  <span><strong>Cross-Border:</strong> Pay international contractors without wire fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">🔒</span>
                  <span><strong>Secure Escrow:</strong> Hold payments until work is completed</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
                How Job Bidding Works
              </h3>
              <p className="text-white/90 mb-4">
                Students can <strong>bid on contract jobs</strong> posted by employers. Winners get paid in crypto and can cash out instantly.
              </p>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="font-bold text-white">Post Contract Job</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Employer sets budget & deadline for a specific project</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="font-bold text-white">Students Bid</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Verified students submit bids with their rates & timelines</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="font-bold text-white">Pay with Crypto</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Employer pays winner via Bitcoin, USDC, or other crypto</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="font-bold text-white">Student Cashes Out</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Student converts crypto to USD and withdraws to bank</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border-2 border-blue-400/50 text-center">
              <div className="text-4xl mb-3">₿</div>
              <h4 className="text-xl font-bold text-white mb-2">Bitcoin</h4>
              <p className="text-white/70 text-sm">Widely accepted, secure</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border-2 border-purple-400/50 text-center">
              <div className="text-4xl mb-3">Ξ</div>
              <h4 className="text-xl font-bold text-white mb-2">Ethereum</h4>
              <p className="text-white/70 text-sm">Fast, smart contracts</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border-2 border-emerald-400/50 text-center">
              <div className="text-4xl mb-3">💵</div>
              <h4 className="text-xl font-bold text-white mb-2">USDC Stablecoin</h4>
              <p className="text-white/70 text-sm">$1 USD value, no volatility</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-yellow-700 rounded-2xl p-6 text-center border-2 border-orange-400">
            <div className="text-white">
              <p className="text-2xl font-bold mb-2">🌟 Perfect for the Pacific Region</p>
              <p className="text-orange-100">
                Lower banking infrastructure barriers + younger crypto-savvy workforce = <strong>faster, cheaper payments for everyone</strong>
              </p>
            </div>
          </div>
        </section>

        {/* AI Video Interviews - Ultra Premium Feature */}
        <section className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">🎥 AI Video Interviews</h2>
              <p className="text-purple-300 text-lg">Screen candidates 10x faster with AI-powered first-round interviews (Ultra Premium)</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl p-8 mb-8 border-2 border-purple-300">
            <h3 className="text-3xl font-bold text-white mb-4">⚡ How AI Video Interviews Work</h3>
            <p className="text-white text-lg mb-6">
              Ultra Premium employers get access to our AI-powered video interview system that automates your first-round screening. 
              Here's how it saves you time and money:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">🎤</div>
                <h4 className="font-bold text-white mb-2">1. You Create Questions</h4>
                <p className="text-white/80 text-sm">Set up custom interview questions specific to your job role</p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">📹</div>
                <h4 className="font-bold text-white mb-2">2. Candidates Record</h4>
                <p className="text-white/80 text-sm">Applicants answer via video on their own time</p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">🤖</div>
                <h4 className="font-bold text-white mb-2">3. AI Scores & Ranks</h4>
                <p className="text-white/80 text-sm">Our AI analyzes responses and ranks top candidates</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-purple-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-400" />
                Benefits for Employers
              </h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold text-xl">⚡</span>
                  <span><strong>10x Faster Screening:</strong> Review 50 candidates in under an hour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold text-xl">💰</span>
                  <span><strong>Save HR Time:</strong> No need to schedule 20 phone screens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold text-xl">🎯</span>
                  <span><strong>Unbiased Ranking:</strong> AI evaluates all candidates equally</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold text-xl">📊</span>
                  <span><strong>Detailed Analytics:</strong> See confidence scores, keyword matches, sentiment analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold text-xl">🌏</span>
                  <span><strong>Perfect for Remote:</strong> Interview candidates across all 6 Pacific territories</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-purple-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Star className="w-7 h-7 text-yellow-400" />
                What AI Analyzes
              </h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold text-xl">🗣️</span>
                  <span><strong>Response Quality:</strong> Clear, concise, relevant answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold text-xl">🎯</span>
                  <span><strong>Keyword Matching:</strong> Does the candidate mention required skills?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold text-xl">😊</span>
                  <span><strong>Communication Style:</strong> Confidence, enthusiasm, professionalism</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold text-xl">⏱️</span>
                  <span><strong>Response Time:</strong> How quickly they answer (critical thinking)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold text-xl">📝</span>
                  <span><strong>Structured Thinking:</strong> Organized vs rambling responses</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-pink-600 to-orange-700 rounded-2xl p-6 border-2 border-pink-400 text-center">
            <p className="text-2xl font-bold text-white mb-2">
              ⭐ Only Available in Ultra Premium ($499/month - <span className="line-through text-white/70">$799</span> LIMITED TIME)
            </p>
            <p className="text-white/90">
              Save 15-20 hours of HR time per hire + eliminate scheduling headaches + hire faster
            </p>
          </div>
        </section>

        {/* NEW: Pay Your Subscription with Crypto */}
        <section className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-blue-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">💳 Pay Your Subscription with Crypto</h2>
              <p className="text-blue-300 text-lg">We accept Bitcoin, Ethereum, USDC for all subscription tiers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-blue-400" />
                Why Pay with Crypto?
              </h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold text-xl">💸</span>
                  <span><strong>Lower Fees:</strong> Save 2-3% on credit card processing fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold text-xl">⚡</span>
                  <span><strong>Instant Activation:</strong> Your subscription starts immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold text-xl">🌏</span>
                  <span><strong>International Friendly:</strong> No currency conversion fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold text-xl">🔒</span>
                  <span><strong>Secure & Private:</strong> No credit card data stored</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold text-xl">📊</span>
                  <span><strong>Easy Accounting:</strong> Simple blockchain transaction records</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Zap className="w-7 h-7 text-emerald-400" />
                How It Works
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="font-bold text-white">Choose Your Plan</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Select Starter ($49.99 - <span className="line-through">$99</span> LIMITED TIME), Professional ($249), or Ultra Premium ($499 - <span className="line-through">$799</span> LIMITED TIME)</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="font-bold text-white">Select "Pay with Crypto"</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Choose Bitcoin, Ethereum, or USDC as payment method</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="font-bold text-white">Send Payment</span>
                  </div>
                  <p className="text-white/70 text-sm pl-11">Transfer exact amount shown to our secure wallet address</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 border-2 border-emerald-400">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">4</div>
                    <span className="font-bold text-white">Instant Activation!</span>
                  </div>
                  <p className="text-emerald-100 text-sm pl-11">Your account upgrades automatically once payment confirmed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 border-2 border-purple-400 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">💰 Subscription Pricing in Crypto</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <h4 className="text-xl font-bold text-white mb-2">Starter</h4>
                <div className="text-3xl font-bold text-white mb-1">$49.99/month</div>
                <div className="text-xs line-through text-white/50 mb-2">Was $99</div>
                <div className="text-sm text-white/70 space-y-1">
                  <div>≈ 0.0013 BTC</div>
                  <div>≈ 0.02 ETH</div>
                  <div>≈ 50 USDC</div>
                </div>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center border-2 border-yellow-400">
                <h4 className="text-xl font-bold text-white mb-2">Professional</h4>
                <div className="text-3xl font-bold text-white mb-1">$249/month</div>
                <div className="text-sm text-white/70 space-y-1">
                  <div>≈ 0.0063 BTC</div>
                  <div>≈ 0.10 ETH</div>
                  <div>≈ 249 USDC</div>
                </div>
              </div>
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <h4 className="text-xl font-bold text-white mb-2">Ultra Premium</h4>
                <div className="text-3xl font-bold text-white mb-1">$499/month</div>
                <div className="text-xs line-through text-white/50 mb-2">Was $799</div>
                <div className="text-sm text-white/70 space-y-1">
                  <div>≈ 0.0127 BTC</div>
                  <div>≈ 0.20 ETH</div>
                  <div>≈ 499 USDC</div>
                </div>
              </div>
            </div>
            <p className="text-center text-white/80 text-sm mt-4">
              <em>Note: Crypto amounts calculated at time of checkout based on current exchange rates</em>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border-2 border-orange-400/50 text-center">
              <div className="text-4xl mb-3">₿</div>
              <h4 className="text-xl font-bold text-white mb-2">Bitcoin (BTC)</h4>
              <p className="text-white/70 text-sm">Most widely accepted cryptocurrency</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border-2 border-purple-400/50 text-center">
              <div className="text-4xl mb-3">Ξ</div>
              <h4 className="text-xl font-bold text-white mb-2">Ethereum (ETH)</h4>
              <p className="text-white/70 text-sm">Fast smart contract payments</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border-2 border-emerald-400/50 text-center">
              <div className="text-4xl mb-3">💵</div>
              <h4 className="text-xl font-bold text-white mb-2">USDC Stablecoin</h4>
              <p className="text-white/70 text-sm">Pegged to $1 USD - no volatility</p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-center border-2 border-blue-400">
            <div className="text-white">
              <p className="text-2xl font-bold mb-2">🚀 Full Crypto Integration</p>
              <p className="text-blue-100">
                <strong>Accept crypto for subscriptions</strong> + <strong>Pay students in crypto</strong> = Complete cryptocurrency ecosystem
              </p>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/10 mb-12">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-6 text-white font-bold">Feature</th>
                  <th className="text-center py-4 px-6 text-white font-bold">Starter<br/><span className="text-cyan-400 text-2xl">$49.99</span><br/><span className="text-xs line-through text-white/50">$99</span></th>
                  <th className="text-center py-4 px-6 text-white font-bold bg-cyan-500/20 border-l border-r border-cyan-400/50">Professional<br/><span className="text-cyan-400 text-2xl">$249</span></th>
                  <th className="text-center py-4 px-6 text-white font-bold">Ultra Premium<br/><span className="text-purple-400 text-2xl">$499</span><br/><span className="text-xs line-through text-white/50">$799</span></th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6">Job postings</td>
                  <td className="text-center py-4 px-6"><span className="text-cyan-400">Up to 5</span></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><span className="text-cyan-400">Up to 10</span></td>
                  <td className="text-center py-4 px-6"><span className="text-purple-400">Unlimited</span></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6">Access verified candidates</td>
                  <td className="text-center py-4 px-6"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6">ZALPHA ATS integration</td>
                  <td className="text-center py-4 px-6"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6">Basic candidate search</td>
                  <td className="text-center py-4 px-6"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 font-semibold">Advanced candidate filters</td>
                  <td className="text-center py-4 px-6"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 font-semibold">AI-powered candidate matching</td>
                  <td className="text-center py-4 px-6"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 font-semibold">Priority support</td>
                  <td className="text-center py-4 px-6"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10 bg-purple-500/10">
                  <td className="py-4 px-6 font-bold text-purple-300">AI video interviews (1st round screening)</td>
                  <td className="text-center py-4 px-6"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Star className="w-5 h-5 text-yellow-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10 bg-purple-500/10">
                  <td className="py-4 px-6 font-bold text-purple-300">Assessment scores access</td>
                  <td className="text-center py-4 px-6"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Star className="w-5 h-5 text-yellow-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10 bg-purple-500/10">
                  <td className="py-4 px-6 font-bold text-purple-300">Student transcripts (Ultra tier)</td>
                  <td className="text-center py-4 px-6"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Star className="w-5 h-5 text-yellow-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10 bg-purple-500/10">
                  <td className="py-4 px-6 font-bold text-purple-300">Custom integrations (HRIS, Slack, 50+ options)</td>
                  <td className="text-center py-4 px-6"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Star className="w-5 h-5 text-yellow-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10 bg-purple-500/10">
                  <td className="py-4 px-6 font-bold text-purple-300">Dedicated account manager</td>
                  <td className="text-center py-4 px-6"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Star className="w-5 h-5 text-yellow-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10 bg-purple-500/10">
                  <td className="py-4 px-6 font-bold text-purple-300">API access & webhooks</td>
                  <td className="text-center py-4 px-6"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Star className="w-5 h-5 text-yellow-400 mx-auto" /></td>
                </tr>
                <tr className="bg-purple-500/10">
                  <td className="py-4 px-6 font-bold text-purple-300">White-glove onboarding</td>
                  <td className="text-center py-4 px-6"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6 bg-cyan-500/10"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Star className="w-5 h-5 text-yellow-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-white/70 mt-6 italic">
            💡 AI video interviews, custom integrations, assessment scores, and transcripts are exclusive to Ultra Premium ($499/month - <span className="line-through">$799</span> LIMITED TIME)
          </p>
        </section>

        {/* ROI Calculator */}
        <section className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Calculate Your ROI</h2>
              <p className="text-green-300 text-lg">See how much you save with ZALPHA</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-red-400/30">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Traditional Hiring</h3>
              <div className="space-y-4 text-white">
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>Job board fees (Indeed, LinkedIn)</span>
                  <span className="font-bold">$500/month</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>Background checks & verification</span>
                  <span className="font-bold">$300/hire</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>External recruiting costs</span>
                  <span className="font-bold">$1,000+</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>Time to hire (3-6 months)</span>
                  <span className="font-bold text-red-400">Slow</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-white/40">
                  <span className="text-xl font-bold">Total Cost Per Hire</span>
                  <span className="text-3xl font-bold text-red-400">$2,300+</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-green-400/50">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">ZALPHA Platform</h3>
              <div className="space-y-4 text-white">
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>ZALPHA subscription</span>
                  <span className="font-bold">$249/month</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>All-inclusive platform</span>
                  <span className="font-bold text-green-400">Included</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>Verification (included free)</span>
                  <span className="font-bold text-green-400">$0</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>Time to hire (1-2 weeks)</span>
                  <span className="font-bold text-green-400">Fast</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-white/40">
                  <span className="text-xl font-bold">Total Cost Per Hire</span>
                  <span className="text-3xl font-bold text-green-400">$249</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 border-2 border-green-400">
              <div className="text-5xl font-bold text-white mb-2">💰 Save $8,051+ Per Hire</div>
              <p className="text-green-100 text-lg">Plus 3-5x faster time to hire</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-cyan-400/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Get Started in Minutes</h2>
            <p className="text-cyan-300 text-xl">Simple 4-step onboarding process</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sign Up</h3>
              <p className="text-white/80">Create your company profile in 5 minutes</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Connect ATS</h3>
              <p className="text-white/80">Get instant access to your ZALPHA ATS portal</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Post Jobs</h3>
              <p className="text-white/80">Applications auto-sync to your ATS dashboard</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
                4
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hire Talent</h3>
              <p className="text-white/80">Review verified candidates and make offers</p>
            </div>
          </div>
        </section>

        {/* Web Access Note */}
        <section className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-cyan-400/50 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">🌐 Access from Any Device</h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-4">
            ZALPHA is a <strong>web application</strong> - no downloads required! Access instantly from desktop, mobile, or tablet.
          </p>
          <p className="text-lg text-cyan-300">
            Visit ZALPHA from any browser • Always up-to-date • Zero storage space needed
          </p>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-16 text-center shadow-2xl">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Transform Your Hiring?</h2>
          <p className="text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto">
            Join leading Pacific employers hiring verified talent on ZALPHA
          </p>
          <div className="flex items-center justify-center gap-6">
            <button className="px-10 py-5 bg-white text-cyan-600 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center gap-3">
              Start Free Trial
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="px-10 py-5 bg-white/20 backdrop-blur-xl text-white rounded-2xl font-bold text-xl hover:bg-white/30 transition-all">
              Schedule Demo
            </button>
          </div>
          <p className="text-cyan-100 mt-6">No credit card required • 3-day free trial • Cancel anytime</p>
        </section>

        {/* NEW COMPREHENSIVE FEATURES: AI, ROI, Privacy, Compliance */}
        <section className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              🚀 Why ZALPHA Gives You <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Better ROI</span>
            </h2>
            <p className="text-2xl text-purple-200">Less work for you. Better results. Measurable impact.</p>
          </div>

          {/* ROI Dashboard Preview */}
          <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-2xl p-8 border-2 border-green-400 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
              <TrendingUp className="w-10 h-10 text-green-400" />
              Real ROI Tracking Dashboard
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 mb-2">944%</div>
                <div className="text-white text-xs sm:text-sm">Return on Investment</div>
                <div className="text-green-200 text-xs mt-1">vs traditional hiring</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-2">$102K</div>
                <div className="text-white text-xs sm:text-sm">Cost Savings</div>
                <div className="text-yellow-200 text-xs mt-1">saved per 24 hires</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-2">6</div>
                <div className="text-white text-xs sm:text-sm">Weeks Saved</div>
                <div className="text-cyan-200 text-xs mt-1">of full-time work</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-purple-400 mb-2">96%</div>
                <div className="text-white text-sm">30-Day Retention</div>
                <div className="text-purple-200 text-xs mt-1">vs 82% industry avg</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/20 rounded-xl p-6 border-2 border-red-400">
                <h4 className="text-xl font-bold text-white mb-3">❌ Traditional Hiring Cost</h4>
                <div className="text-4xl font-bold text-red-300 mb-4">$3,000+ per hire</div>
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• Job board postings: $400-$800</li>
                  <li>• External recruiting: $1,000-$2,000</li>
                  <li>• Background checks: $50-$100</li>
                  <li>• Internal HR time: $800-$1,200</li>
                  <li>• Onboarding costs: $500-$800</li>
                </ul>
              </div>
              <div className="bg-green-500/20 rounded-xl p-6 border-2 border-green-400">
                <h4 className="text-xl font-bold text-white mb-3">✅ ZALPHA Cost</h4>
                <div className="text-4xl font-bold text-green-300 mb-4">$249-$499/month <span className="text-xl">(Unlimited hires!)</span></div>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Unlimited job postings</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> AI screening & matching</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Verified profiles included</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Built-in messaging & ATS</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Compliance included</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI-Powered Workload Reduction */}
          <div className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl p-8 border-2 border-cyan-400 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap className="w-10 h-10 text-cyan-400" />
              AI Reduces Your Workload by 70%
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-cyan-400 text-4xl font-bold mb-2">168h</div>
                <div className="text-white font-semibold mb-2">AI Auto-Screening</div>
                <p className="text-white/70 text-sm">AI screens applicants instantly based on your criteria</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-cyan-400 text-4xl font-bold mb-2">1,247</div>
                <div className="text-white font-semibold mb-2">Automated Actions</div>
                <p className="text-white/70 text-sm">Tasks completed automatically by AI</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-cyan-400 text-4xl font-bold mb-2">156</div>
                <div className="text-white font-semibold mb-2">AI Interviews Done</div>
                <p className="text-white/70 text-sm">Round 1 interviews conducted by AI</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-xl p-6">
              <h4 className="font-bold text-white mb-4 text-xl">🤖 AI Bulk Actions Available:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-white/90 space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> <strong>Auto-screen 80%+ matches</strong> for interviews</li>
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> <strong>Bulk reject &lt;50% matches</strong> with courtesy emails</li>
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> <strong>Select all strong matches</strong> with one click</li>
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> <strong>Bulk message</strong> multiple candidates</li>
                </ul>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> <strong>Bulk interview scheduling</strong> for groups</li>
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> <strong>Smart filters</strong> by AI match score</li>
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> <strong>AI-generated candidate insights</strong></li>
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> <strong>Auto-recommend top talent</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mandatory On-Platform Offers */}
          <div className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl p-8 border-2 border-indigo-400 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <BarChart3 className="w-10 h-10 text-indigo-400" />
              All Offers On-Platform = Complete Analytics
            </h3>
            <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-xl p-6 mb-6">
              <p className="text-white text-lg mb-3">
                <strong className="text-yellow-300">🎯 Why This Matters:</strong> Other platforms lose visibility when candidates go off-platform. 
                ZALPHA <strong className="text-yellow-300">requires all offers to be accepted on our platform</strong> - giving you complete hiring analytics.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">📊 Metrics You Get:</h4>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li>✓ Acceptance rates per job posting</li>
                  <li>✓ Time-to-accept analysis</li>
                  <li>✓ Decline reasons (for improvement)</li>
                  <li>✓ Salary competitiveness data</li>
                  <li>✓ Quality of hire scores</li>
                  <li>✓ 30-day & 90-day retention tracking</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">🔐 Benefits for You:</h4>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li>✓ Legal protection (documented offers)</li>
                  <li>✓ Payment security through escrow</li>
                  <li>✓ FERPA compliance built-in</li>
                  <li>✓ Dispute resolution support</li>
                  <li>✓ Schools earn commission automatically</li>
                  <li>✓ Platform improves from your data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 30-Day Employment Status Reporting */}
          <div className="bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-2xl p-8 border-2 border-orange-400 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="w-10 h-10 text-orange-400" />
              30-Day Employment Reporting (Mandatory)
            </h3>
            <div className="bg-red-500/20 border-2 border-red-400 rounded-xl p-6 mb-6">
              <p className="text-white text-lg">
                <strong className="text-red-300">⚠️ REQUIRED:</strong> All employers must report employment status within 30 days of hire. 
                This ensures quality metrics and protects both parties.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h4 className="text-white font-bold mb-2">Still Employed</h4>
                <p className="text-white/70 text-sm">Performing well & meeting expectations</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">❌</div>
                <h4 className="text-white font-bold mb-2">Terminated</h4>
                <p className="text-white/70 text-sm">Report reason + request refund if eligible</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🚪</div>
                <h4 className="text-white font-bold mb-2">Voluntary Quit</h4>
                <p className="text-white/70 text-sm">Student resignation or abandonment</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="text-white font-bold mb-3">📊 Department of Labor Compliance:</h4>
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Demographics Reporting:</strong> ZALPHA may report aggregated demographics (age ranges, education, locations) to DoL for workforce development funding</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span><strong>PII Not Shared:</strong> Names, SSNs, addresses remain private unless fraud is suspected</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Fraud Detection:</strong> Suspected government benefits abuse (unemployment, SNAP, education grants) will be reported to authorities</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Digital Wallet for Crypto */}
          <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-2xl p-8 border-2 border-yellow-400">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <DollarSign className="w-10 h-10 text-yellow-400" />
              Cryptocurrency Payments Require Digital Wallet
            </h3>
            <div className="bg-white/20 rounded-xl p-6 mb-6">
              <p className="text-white text-lg">
                To <strong className="text-yellow-300">accept cryptocurrency payments</strong>, you must have a <strong className="text-yellow-300">digital wallet</strong>. 
                We support all major wallets and provide setup guidance.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🔷</div>
                <div className="text-white font-semibold text-sm">MetaMask</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🟦</div>
                <div className="text-white font-semibold text-sm">Coinbase Wallet</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">💳</div>
                <div className="text-white font-semibold text-sm">Ledger</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🔐</div>
                <div className="text-white font-semibold text-sm">Trust Wallet</div>
              </div>
            </div>
            <div className="mt-6 bg-blue-500/20 border border-blue-400 rounded-xl p-6">
              <p className="text-white text-sm">
                <strong>💡 New to Crypto?</strong> No problem! Our support team provides wallet setup tutorials and can help you get started. 
                It takes about 10 minutes to create a wallet and start accepting crypto payments.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center text-white/80">
          <p className="mb-2">Questions? Contact our business development team</p>
          <p className="text-cyan-400 font-semibold text-lg">contact@zalpharecruit.com • 670-286-3010</p>
        </section>

        {/* Back Button */}
        <section className="text-center pb-8">
          <button
            onClick={() => onNavigate('demo-showcase')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all font-semibold text-lg backdrop-blur-xl border-2 border-white/20 hover:border-white/40"
          >
            ← Back to Demo Showcase
          </button>
        </section>
      </div>
    </div>
  );
}