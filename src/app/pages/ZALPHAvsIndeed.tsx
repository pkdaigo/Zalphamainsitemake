import { CheckCircle, XCircle, TrendingUp, Clock, DollarSign, Shield, Target, Users, Zap, Award, ArrowRight } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { CostCalculator } from '@/app/components/CostCalculator';

interface ZALPHAvsIndeedProps {
  onNavigate: (page: string) => void;
}

export function ZALPHAvsIndeed({ onNavigate }: ZALPHAvsIndeedProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <BackButton onNavigate={onNavigate} label="Back to Home" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
            💡 "But Indeed is Free..."
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-purple-300 mb-4">
            Let's do the math on what "free" really costs
          </p>
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400 rounded-2xl">
            <span className="text-3xl">🤖</span>
            <p className="text-xl text-white font-bold">
              ZALPHA's AI does 70% of the hiring work for you
            </p>
          </div>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Indeed Column */}
          <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-red-400/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center">
                <XCircle className="w-9 h-9 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Indeed</h2>
                <p className="text-red-300 text-xl">Free Tier</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <DollarSign className="w-7 h-7 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Cost Per Hire</h3>
                    <div className="text-4xl font-bold text-red-400 mb-2">$4,500</div>
                    <p className="text-white/70">Recruiter time (45hrs @ $100/hr) + bad hire turnover costs</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="w-7 h-7 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Time to Hire</h3>
                    <div className="text-4xl font-bold text-red-400 mb-2">45-60 Days</div>
                    <p className="text-white/70">Manual screening of 200+ unverified applications</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="w-7 h-7 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Credential Fraud Rate</h3>
                    <div className="text-4xl font-bold text-red-400 mb-2">30%</div>
                    <p className="text-white/70">Unverified resumes, fake degrees, inflated skills</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Users className="w-7 h-7 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">First-Year Retention</h3>
                    <div className="text-4xl font-bold text-red-400 mb-2">65%</div>
                    <p className="text-white/70">Poor cultural fit leads to high turnover</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Target className="w-7 h-7 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Pacific Islands Focus</h3>
                    <div className="text-4xl font-bold text-red-400 mb-2">0%</div>
                    <p className="text-white/70">Generic global platform with no local expertise</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="w-7 h-7 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">AI Automation</h3>
                    <div className="text-4xl font-bold text-red-400 mb-2">0%</div>
                    <p className="text-white/70">You do 100% of screening, assessment, and matching work</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-red-500/30 border-2 border-red-400 rounded-2xl p-6">
              <p className="text-white font-bold text-2xl text-center mb-2">
                "Free" Platform Cost
              </p>
              <p className="text-5xl font-bold text-white text-center">
                $4,500 + 60 Days
              </p>
              <p className="text-red-200 text-center mt-2">Per hire in hidden costs</p>
            </div>
          </div>

          {/* ZALPHA Column */}
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-green-400/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">ZALPHA</h2>
                <p className="text-green-300 text-xl">$49.99/month</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <DollarSign className="w-7 h-7 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Cost Per Hire</h3>
                    <div className="text-4xl font-bold text-green-400 mb-2">$1,250</div>
                    <p className="text-white/70">AI automation saves 70% of recruiter time</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="w-7 h-7 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Time to Hire</h3>
                    <div className="text-4xl font-bold text-green-400 mb-2">15-20 Days</div>
                    <p className="text-white/70">Pre-verified candidates, AI pre-screening</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="w-7 h-7 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Credential Fraud Rate</h3>
                    <div className="text-4xl font-bold text-green-400 mb-2">&lt;1%</div>
                    <p className="text-white/70">Dual ID verification + educational transcripts</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Users className="w-7 h-7 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">First-Year Retention</h3>
                    <div className="text-4xl font-bold text-green-400 mb-2">85%</div>
                    <p className="text-white/70">Cultural fit screening + verified local references</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Target className="w-7 h-7 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Pacific Islands Focus</h3>
                    <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
                    <p className="text-white/70">CNMI, Guam, Hawaii, FSM, Palau, Marshall Islands only</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="w-7 h-7 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">🤖 AI Automation</h3>
                    <div className="text-4xl font-bold text-green-400 mb-2">70%</div>
                    <p className="text-white/70">Gamified skills tests + auto-matching + AI interviews</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-green-500/30 border-2 border-green-400 rounded-2xl p-6">
              <p className="text-white font-bold text-2xl text-center mb-2">
                Total Monthly Cost
              </p>
              <p className="text-5xl font-bold text-white text-center">
                $49.99/mo
              </p>
              <p className="text-green-200 text-center mt-2">Save $3,250 per hire</p>
            </div>
          </div>
        </div>

        {/* Interactive Cost Calculator */}
        <div className="mb-16">
          <CostCalculator />
        </div>

        {/* ZALPHA vs Handshake */}
        <div className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 backdrop-blur-xl rounded-3xl p-12 border-2 border-orange-400/50 mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-10">🎓 ZALPHA vs Handshake</h2>
          <p className="text-xl text-orange-200 text-center mb-12">
            Both serve college talent - but with completely different business models
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Handshake Column */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-orange-400/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🤝</span> Handshake
              </h3>
              <div className="space-y-4 text-white/90">
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold">💳</span>
                  <div>
                    <p className="font-bold text-orange-300">Licensing Fee Model</p>
                    <p className="text-white/70">Pay per school license or per-seat annually</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold">🌐</span>
                  <div>
                    <p className="font-bold text-orange-300">Nationwide Focus</p>
                    <p className="text-white/70">Mainstream US colleges and universities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold">🎯</span>
                  <div>
                    <p className="font-bold text-orange-300">Job Board Style</p>
                    <p className="text-white/70">Post jobs, students apply - basic matching</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold">🏢</span>
                  <div>
                    <p className="font-bold text-orange-300">No White-Label</p>
                    <p className="text-white/70">Handshake branding only - no customization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold">❌</span>
                  <div>
                    <p className="font-bold text-orange-300">Limited AI</p>
                    <p className="text-white/70">Basic recommendation algorithms</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ZALPHA Column */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-cyan-400/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">⚡</span> ZALPHA
              </h3>
              <div className="space-y-4 text-white/90">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✅</span>
                  <div>
                    <p className="font-bold text-cyan-300">Subscription + White-Label Options</p>
                    <p className="text-white/70">$49.99/mo subscription OR fully white-labeled platform for institutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">🌺</span>
                  <div>
                    <p className="font-bold text-cyan-300">100% Pacific Islands</p>
                    <p className="text-white/70">CNMI, Guam, Hawaii, FSM, Palau, Marshall Islands exclusive</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">🤖</span>
                  <div>
                    <p className="font-bold text-cyan-300">AI-Powered Platform</p>
                    <p className="text-white/70">70% automation with skills testing, video interviews, auto-matching</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">🎨</span>
                  <div>
                    <p className="font-bold text-cyan-300">Full White-Label Available</p>
                    <p className="text-white/70">Schools can rebrand the entire platform as their own</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">🛡️</span>
                  <div>
                    <p className="font-bold text-cyan-300">Verified Pacific Talent</p>
                    <p className="text-white/70">Dual ID verification + cultural fit screening</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 border-2 border-cyan-400/50">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">🎯 Key Difference: White-Label Flexibility</h3>
            <p className="text-lg text-white/90 text-center max-w-4xl mx-auto">
              Handshake charges licensing fees with <strong>no white-label option</strong> - you're stuck with their branding. 
              ZALPHA offers <strong>flexible subscription pricing</strong> AND the ability to fully <strong>white-label the platform</strong> for schools and large employers who want their own branded career portal.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-16 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Stop Wasting Money?</h2>
          <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join Pacific employers who are saving $3,250+ per hire with ZALPHA's AI platform
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('employer-signup')}
              className="px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center gap-3"
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-6 h-6" />
            </button>
            <button 
              onClick={() => onNavigate('employer-dashboard')}
              className="px-10 py-5 bg-white/20 backdrop-blur-xl text-white rounded-2xl font-bold text-xl hover:bg-white/30 transition-all"
            >
              See Demo Dashboard
            </button>
          </div>
          <p className="text-white/80 mt-6 text-lg">
            No credit card required • 3-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}