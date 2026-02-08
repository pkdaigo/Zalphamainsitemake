import { Users, Target, Rocket, TrendingUp, DollarSign, BarChart3, CheckCircle, AlertCircle, Clock, Zap, Shield, Globe, Building2, GraduationCap, Award, MessageSquare, Star, ArrowRight, Briefcase, School, Settings, Calendar, FileText, Database, BookOpen, Heart } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface PitchDeckInternalProps {
  onNavigate: (page: string) => void;
}

export function PitchDeckInternal({ onNavigate }: PitchDeckInternalProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">ZALPHA Internal Team Guide</h1>
              <p className="text-xs text-purple-300 hidden sm:block">Complete Platform Overview & Operations</p>
            </div>
          </div>
          <BackButton onNavigate={onNavigate} label="Back to Demo" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Hero Slide */}
        <section className="text-center py-12 sm:py-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Users className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight px-4">
            Welcome to the<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              ZALPHA Team
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto px-4">
            Everything you need to know about how ZALPHA works, who we serve, and how to support our mission
          </p>
          <div className="inline-block bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl px-8 py-4 border-2 border-purple-400/50">
            <p className="text-white font-semibold">🎯 Mission: Connect Pacific talent with opportunity</p>
          </div>
        </section>

        {/* NEW: Our Mission - Preventing Brain Drain */}
        <section className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-emerald-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Heart className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">🌴 Our Mission: Keep Pacific Families Together</h2>
              <p className="text-emerald-300 text-lg">Fighting brain drain to strengthen our communities</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-orange-700 rounded-2xl p-8 mb-8 border-2 border-red-400">
            <h3 className="text-3xl font-bold text-white mb-4">💔 The Problem We're Solving</h3>
            <p className="text-white text-lg mb-4">
              <strong className="text-yellow-300">70% of Pacific graduates leave</strong> CNMI, FSM, Guam, Hawaii, Palau, and the Marshall Islands after college because they can't find good jobs at home. This brain drain:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-4xl mb-2 text-center">👨‍👩‍👧‍👦</div>
                <p className="text-white font-bold mb-1 text-center">Breaks Families Apart</p>
                <p className="text-white/80 text-sm text-center">Children grow up away from grandparents, culture, and heritage</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-4xl mb-2 text-center">💰</div>
                <p className="text-white font-bold mb-1 text-center">Weakens Economies</p>
                <p className="text-white/80 text-sm text-center">Educated workforce leaves, tax revenue disappears, businesses can't hire</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-4xl mb-2 text-center">🌊</div>
                <p className="text-white font-bold mb-1 text-center">Erodes Culture</p>
                <p className="text-white/80 text-sm text-center">Pacific Islander traditions fade when youth relocate permanently</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 border-2 border-emerald-300">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <GraduationCap className="w-10 h-10" />
                Our Solution: Local Jobs = Local Futures
              </h3>
              <p className="text-white text-xl mb-6">
                ZALPHA connects Pacific graduates with <strong className="text-emerald-200">employers in their home regions</strong>, so they can build careers WITHOUT leaving their families, culture, or communities.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Users className="w-6 h-6 text-emerald-300" />
                    For Students & Families
                  </h4>
                  <ul className="space-y-2 text-white/90">
                    <li>✓ Stay close to loved ones and culture</li>
                    <li>✓ Build careers in home communities</li>
                    <li>✓ Raise children near grandparents</li>
                    <li>✓ Preserve Pacific Islander identity</li>
                    <li>✓ Lower cost of living than mainland</li>
                  </ul>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-teal-300" />
                    For Our Communities
                  </h4>
                  <ul className="space-y-2 text-white/90">
                    <li>✓ Retain educated, skilled workforce</li>
                    <li>✓ Keep tax revenue and spending local</li>
                    <li>✓ Strengthen businesses with talent pool</li>
                    <li>✓ Preserve cultural continuity</li>
                    <li>✓ Reduce dependency on outside labor</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-600/30 to-emerald-600/30 rounded-2xl p-8 border-2 border-teal-400">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">🎯 Our Impact Goals</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-4xl font-bold text-emerald-300 mb-1">75%</div>
                  <p className="text-white/90 text-sm font-bold mb-1">Retention Rate</p>
                  <p className="text-white/70 text-xs">graduates stay in Pacific</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-4xl font-bold text-emerald-300 mb-1">10K+</div>
                  <p className="text-white/90 text-sm font-bold mb-1">Families Together</p>
                  <p className="text-white/70 text-xs">across 4 regions</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-4xl font-bold text-emerald-300 mb-1">$50M</div>
                  <p className="text-white/90 text-sm font-bold mb-1">Economic Value</p>
                  <p className="text-white/70 text-xs">retained annually</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-4xl font-bold text-emerald-300 mb-1">100%</div>
                  <p className="text-white/90 text-sm font-bold mb-1">Pacific Focus</p>
                  <p className="text-white/70 text-xs">exclusively local</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-8 border-2 border-emerald-400/50">
              <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-400" />
                Why This Matters for Our Team
              </h4>
              <p className="text-white/90 text-lg mb-6">
                Every person we hire, every student we help, every employer we onboard — we're not just running a business. We're <strong className="text-emerald-300">rebuilding Pacific communities</strong> and keeping families together. That's what makes our work meaningful.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-emerald-500/20 rounded-xl p-4 border border-emerald-400">
                  <p className="text-emerald-300 font-bold mb-2">When we succeed...</p>
                  <p className="text-white/80 text-sm">A grandmother gets to watch her grandchildren grow up instead of seeing them once a year</p>
                </div>
                <div className="bg-emerald-500/20 rounded-xl p-4 border border-emerald-400">
                  <p className="text-emerald-300 font-bold mb-2">When we succeed...</p>
                  <p className="text-white/80 text-sm">A talented graduate uses their education to strengthen their home island instead of California's economy</p>
                </div>
                <div className="bg-emerald-500/20 rounded-xl p-4 border border-emerald-400">
                  <p className="text-emerald-300 font-bold mb-2">When we succeed...</p>
                  <p className="text-white/80 text-sm">Pacific Islander culture thrives with educated youth leading the next generation</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 border-2 border-purple-400 text-center">
              <h4 className="text-3xl font-bold text-white mb-4">💎 This Is Why ZALPHA Exists</h4>
              <p className="text-purple-100 text-xl mb-4">
                We're not just another job platform. We're a <strong className="text-yellow-300">mission-driven company</strong> fighting to keep Pacific families together and communities strong.
              </p>
              <div className="inline-block bg-yellow-500/20 rounded-xl px-8 py-4 border-2 border-yellow-400">
                <p className="text-2xl font-bold text-yellow-300">
                  Every student placed locally = One more family that stays together
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pitch Decks & BD Guides Section */}
        <section className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <FileText className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">📊 Pitch Decks & BD Guides</h2>
              <p className="text-purple-300 text-lg">Sales materials and training resources for all stakeholders</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">🎤 Pitch Decks</h3>
            <p className="text-white/80 mb-6">
              Comprehensive pitch decks tailored for each stakeholder group. Use these to understand what we promise to each audience.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <button
                onClick={() => onNavigate('pitch-deck-employers')}
                className="bg-white/95 backdrop-blur-sm text-cyan-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-cyan-200 text-left"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Employers</h3>
                </div>
                <p className="text-slate-700 mb-4">
                  Business development pitch for recruiting top Pacific talent
                </p>
                <div className="flex items-center gap-2 text-cyan-600 font-semibold">
                  <span>View Deck</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => onNavigate('pitch-deck-students')}
                className="bg-white/95 backdrop-blur-sm text-pink-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-pink-200 text-left"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Students</h3>
                </div>
                <p className="text-slate-700 mb-4">
                  Attract students to join the platform and launch their careers
                </p>
                <div className="flex items-center gap-2 text-pink-600 font-semibold">
                  <span>View Deck</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => onNavigate('pitch-deck-schools')}
                className="bg-white/95 backdrop-blur-sm text-indigo-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-indigo-200 text-left"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <School className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Schools</h3>
                </div>
                <p className="text-slate-700 mb-4">
                  Educational partnership pitch for universities and colleges
                </p>
                <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                  <span>View Deck</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => onNavigate('pitch-deck-investors')}
                className="bg-white/95 backdrop-blur-sm text-emerald-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-emerald-200 text-left"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Investors</h3>
                </div>
                <p className="text-slate-700 mb-4">
                  Series A fundraising deck with market opportunity and financials
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <span>View Deck</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => onNavigate('pitch-deck-advertisers')}
                className="bg-white/95 backdrop-blur-sm text-orange-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-orange-200 text-left"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Advertisers</h3>
                </div>
                <p className="text-slate-700 mb-4">
                  Reach 50,000+ verified students across the Pacific
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <span>View Deck</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-8"></div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">📚 Business Development Guides</h3>
            <p className="text-white/80 mb-6">
              Complete training materials for Business Development Representatives. These guides teach BDRs how to sign up schools and employers while earning commission.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => onNavigate('school-bd-guide')}
                className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-purple-300 text-left relative overflow-hidden"
              >
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">ESSENTIAL</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">School BD Guide</h3>
                </div>
                <p className="text-purple-100 mb-4">
                  Complete training guide for Business Development Representatives to sign up schools and earn commission
                </p>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <span>Open Training Guide</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => onNavigate('employer-bd-guide')}
                className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-cyan-300 text-left relative overflow-hidden"
              >
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">ESSENTIAL</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Employer BD Guide</h3>
                </div>
                <p className="text-cyan-100 mb-4">
                  Step-by-step training for signing up employers and creating successful partnerships
                </p>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <span>Open Training Guide</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* What is ZALPHA? */}
        <section className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-cyan-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Target className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">What is ZALPHA?</h2>
              <p className="text-cyan-300 text-lg">The Pacific's verified job connection platform</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-cyan-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">📝 The Elevator Pitch</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                ZALPHA is a job connection platform built specifically for the Western Pacific region (CNMI, FSM, Guam, Hawaii, Palau, and the Marshall Islands). 
                We connect <strong>verified college students and recent graduates</strong> with <strong>verified employers</strong>{' '}
                through a secure, easy-to-use platform that eliminates credential fraud and speeds up hiring.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-cyan-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">🎯 Core Differentiators</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span><strong>Dual ID Verification:</strong> Government ID + student verification prevents all fraud</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span><strong>Pacific-First:</strong> Only platform serving CNMI, FSM, Guam, Hawaii, Palau, and the Marshall Islands exclusively</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span><strong>Free for Students:</strong> Zero cost, zero barriers to entry</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ZALPHA vs Competition - NEW SECTION */}
        <section className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-orange-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">ZALPHA vs. Indeed & Handshake</h2>
              <p className="text-orange-300 text-lg">Why we win in the Pacific region</p>
            </div>
          </div>

          {/* Comparison Table Headers */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* ZALPHA Column */}
            <div className="bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-2xl p-6 border-2 border-cyan-400/50">
              <div className="text-center mb-4">
                <div className="inline-block px-4 py-2 bg-cyan-500 rounded-full text-white font-bold text-lg mb-2">
                  🏆 ZALPHA
                </div>
                <p className="text-sm text-cyan-200">Pacific Job Platform</p>
              </div>
            </div>

            {/* Indeed Column */}
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-gray-400/30">
              <div className="text-center mb-4">
                <div className="inline-block px-4 py-2 bg-gray-600 rounded-full text-white font-bold text-lg mb-2">
                  Indeed
                </div>
                <p className="text-sm text-gray-300">Global Job Board</p>
              </div>
            </div>

            {/* Handshake Column */}
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-gray-400/30">
              <div className="text-center mb-4">
                <div className="inline-block px-4 py-2 bg-gray-600 rounded-full text-white font-bold text-lg mb-2">
                  Handshake
                </div>
                <p className="text-sm text-gray-300">College Recruiting</p>
              </div>
            </div>
          </div>

          {/* Feature Comparison List */}
          <div className="space-y-4">
            {/* ID Verification */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">🔐 ID Verification</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Dual verification (Gov ID + Student ID)</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">None - anyone can apply</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">Email verification only</span>
                </div>
              </div>
            </div>

            {/* Regional Focus */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">🌴 Pacific Region Focus</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">ONLY CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">Global - no regional expertise</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">US mainland focus</span>
                </div>
              </div>
            </div>

            {/* Cost for Students */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">💵 Cost for Students</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">100% FREE forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Free (but resume spam)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Free for students</span>
                </div>
              </div>
            </div>

            {/* AI-Powered Custom Assessments */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">🤖 AI-Powered Custom Assessments</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Zee chatbot builds tests in minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">No assessment tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">No assessment tools</span>
                </div>
              </div>
            </div>

            {/* AI Course Platform */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">📚 AI Course Platform for Students</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Interactive learning + certificates</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">No learning platform</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">Career advice only</span>
                </div>
              </div>
            </div>

            {/* Cultural Sensitivity Training */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">🌏 Cultural Sensitivity Training</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Optional/Recommended for employers</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">None</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">None</span>
                </div>
              </div>
            </div>

            {/* Game-Style Skills Assessments */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">🎮 Game-Style Skills Assessment</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Engaging basic skills test for 18yo graduates</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">None</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">None</span>
                </div>
              </div>
            </div>

            {/* School Revenue Sharing */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">🏫 School Revenue Sharing</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Revenue share per student & employer signup</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">No revenue share</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">Schools pay for membership</span>
                </div>
              </div>
            </div>

            {/* Payment Equipment Option */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">💻 Payment Equipment Option</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Students can request tech - ZALPHA manages logistics</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">Cash only (no payments to students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">No payment system</span>
                </div>
              </div>
            </div>

            {/* Free Contract Work Tier */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">🆓 Free Contract Work Tier</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Free tier for gig/contract postings</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">Pay-per-post model</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">Schools must pay</span>
                </div>
              </div>
            </div>

            {/* Cryptocurrency Payments */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">₿ Cryptocurrency Payments</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Bitcoin, Ethereum, USDC accepted</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">Traditional payments only</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">Traditional payments only</span>
                </div>
              </div>
            </div>

            {/* Company Review System */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">⭐ Student-Driven Company Reviews</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Verified students only, moderated</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">Generic reviews (Glassdoor-like)</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">No review system</span>
                </div>
              </div>
            </div>

            {/* Virtual Job Fairs */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3 text-lg">💼 Virtual Job Fairs</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold">Live Pacific-wide job fairs, free for students</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">No virtual fair system</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">Limited to partner schools only</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="mt-8 bg-gradient-to-r from-green-500/30 to-cyan-500/30 rounded-2xl p-8 border-2 border-green-400/50">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">🏆 The ZALPHA Advantage</h3>
            <p className="text-white/90 text-lg text-center leading-relaxed">
              <strong>Indeed and Handshake are generalist platforms.</strong> They don't understand the Pacific region, 
              don't verify candidates, and don't offer training or cultural support. <strong>ZALPHA is built specifically 
              for Pacific Island talent</strong> with features that address the unique challenges of CNMI, FSM, Guam, 
              Hawaii, Palau, and the Marshall Islands job markets. We're not just a job board—we're a complete workforce development platform.
            </p>
          </div>
        </section>

        {/* Our Three Audiences */}
        <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">Who We Serve</h2>
            <p className="text-purple-300 text-xl">Three distinct customer segments with unique needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Students */}
            <div className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-2xl p-8 border-2 border-pink-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">🎓 Students</h3>
              <div className="space-y-3 text-white/90 text-sm">
                <p><strong>Who:</strong> College students & graduates within 1 year (18+ only)</p>
                <p><strong>Pain Point:</strong> Can't find local jobs, 6-12 month job search</p>
                <p><strong>What They Want:</strong> Easy job applications, verified employers, FREE platform</p>
                <p><strong>Revenue:</strong> FREE base tier, $19.99/mo Ultra Premium (transcript sharing)</p>
              </div>
            </div>

            {/* Employers */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 border-2 border-cyan-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">💼 Employers</h3>
              <div className="space-y-3 text-white/90 text-sm">
                <p><strong>Who:</strong> Companies hiring in CNMI, FSM, Guam, Hawaii, Palau, and the Marshall Islands</p>
                <p><strong>Pain Point:</strong> Fake candidates, slow hiring, high cost per hire ($4,500)</p>
                <p><strong>What They Want:</strong> Verified candidates, ATS integration, fast results</p>
                <p><strong>Revenue:</strong> $99-$499/mo subscriptions (85% of our revenue)</p>
              </div>
            </div>

            {/* Schools */}
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-8 border-2 border-indigo-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <School className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">🏫 Schools</h3>
              <div className="space-y-3 text-white/90 text-sm">
                <p><strong>Who:</strong> Universities, colleges, career services departments</p>
                <p><strong>Pain Point:</strong> Low job placement rates hurt rankings and reputation</p>
                <p><strong>What They Want:</strong> Better outcomes for students, easy integration</p>
                <p><strong>Revenue:</strong> Strategic partners (free for them, drives student adoption)</p>
              </div>
            </div>
          </div>
        </section>

        {/* How ZALPHA Works - User Journey */}
        <section className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-emerald-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Rocket className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">How ZALPHA Works</h2>
              <p className="text-emerald-300 text-lg">End-to-end user journey</p>
            </div>
          </div>

          {/* Student Journey */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-pink-400" />
              Student Journey
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="bg-white/10 rounded-xl p-4 border-2 border-pink-400/30">
                <div className="text-2xl font-bold text-pink-400 mb-2">1</div>
                <h4 className="font-bold text-white text-sm mb-2">Sign Up</h4>
                <p className="text-xs text-white/80">FREE account creation, basic info</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border-2 border-pink-400/30">
                <div className="text-2xl font-bold text-pink-400 mb-2">2</div>
                <h4 className="font-bold text-white text-sm mb-2">ID Verification</h4>
                <p className="text-xs text-white/80">Government ID + student ID upload</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border-2 border-pink-400/30">
                <div className="text-2xl font-bold text-pink-400 mb-2">3</div>
                <h4 className="font-bold text-white text-sm mb-2">Build Profile</h4>
                <p className="text-xs text-white/80">Skills, education, resume upload</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border-2 border-pink-400/30">
                <div className="text-2xl font-bold text-pink-400 mb-2">4</div>
                <h4 className="font-bold text-white text-sm mb-2">Apply to Jobs</h4>
                <p className="text-xs text-white/80">One-click applications, AI matching</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border-2 border-pink-400/30">
                <div className="text-2xl font-bold text-pink-400 mb-2">5</div>
                <h4 className="font-bold text-white text-sm mb-2">Get Hired</h4>
                <p className="text-xs text-white/80">Interviews → offers → success!</p>
              </div>
            </div>
          </div>

          {/* Employer Journey */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-cyan-400" />
              Employer Journey
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="bg-white/10 rounded-xl p-4 border-2 border-cyan-400/30">
                <div className="text-2xl font-bold text-cyan-400 mb-2">1</div>
                <h4 className="font-bold text-white text-sm mb-2">Subscribe</h4>
                <p className="text-xs text-white/80">Choose plan: $99-$499/mo</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border-2 border-cyan-400/30">
                <div className="text-2xl font-bold text-cyan-400 mb-2">2</div>
                <h4 className="font-bold text-white text-sm mb-2">Company Verification</h4>
                <p className="text-xs text-white/80">Business license, non-discrimination clause</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border-2 border-cyan-400/30">
                <div className="text-2xl font-bold text-cyan-400 mb-2">3</div>
                <h4 className="font-bold text-white text-sm mb-2">Post Jobs</h4>
                <p className="text-xs text-white/80">Create listings, auto-sync from ATS</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border-2 border-cyan-400/30">
                <div className="text-2xl font-bold text-cyan-400 mb-2">4</div>
                <h4 className="font-bold text-white text-sm mb-2">Review Candidates</h4>
                <p className="text-xs text-white/80">Verified profiles, skills assessments</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border-2 border-cyan-400/30">
                <div className="text-2xl font-bold text-cyan-400 mb-2">5</div>
                <h4 className="font-bold text-white text-sm mb-2">Hire Talent</h4>
                <p className="text-xs text-white/80">Interview → offer → onboard</p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-orange-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Platform Features</h2>
              <p className="text-orange-300 text-lg">What makes ZALPHA powerful</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Student Features */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">🎓 Student Features</h3>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-xl p-4 border border-pink-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-pink-400" />
                    <span className="font-bold text-white">Dual ID Verification</span>
                  </div>
                  <p className="text-sm text-white/70">Government ID + student ID ensures authenticity</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-pink-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5 text-pink-400" />
                    <span className="font-bold text-white">AI Job Matching</span>
                  </div>
                  <p className="text-sm text-white/70">Smart recommendations based on skills and preferences</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-pink-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-pink-400" />
                    <span className="font-bold text-white">Gamified Skills Assessments</span>
                  </div>
                  <p className="text-sm text-white/70">Prove your skills with interactive challenges</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-pink-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-pink-400" />
                    <span className="font-bold text-white">Company Reviews</span>
                  </div>
                  <p className="text-sm text-white/70">Student-driven employer ratings and feedback</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-pink-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-pink-400" />
                    <span className="font-bold text-white">Zee AI Assistant</span>
                  </div>
                  <p className="text-sm text-white/70">24/7 career guidance chatbot</p>
                </div>
              </div>
            </div>

            {/* Employer Features */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">💼 Employer Features</h3>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white">Verified Candidates Only</span>
                  </div>
                  <p className="text-sm text-white/70">Zero fake profiles, 100% real students</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white">ZALPHA ATS Integration</span>
                  </div>
                  <p className="text-sm text-white/70">Sync jobs and applications automatically</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white">Skills Assessment Access</span>
                  </div>
                  <p className="text-sm text-white/70">Ultra Premium: View verified skill scores</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white">Analytics Dashboard</span>
                  </div>
                  <p className="text-sm text-white/70">Track job performance and candidate metrics</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white">Transcript Access</span>
                  </div>
                  <p className="text-sm text-white/70">Ultra Premium students share verified transcripts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Revenue */}
        <section className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Pricing & Revenue Model</h2>
              <p className="text-green-300 text-lg">How we make money</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Employer Pricing */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-cyan-400/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Building2 className="w-7 h-7 text-cyan-400" />
                Employer Subscriptions (Primary Revenue)
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Starter</span>
                    <span className="text-2xl font-bold text-cyan-400">$99/mo</span>
                  </div>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• 3 active job posts</li>
                    <li>• 50 candidate profile views/month</li>
                    <li>• Basic search filters</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Professional</span>
                    <span className="text-2xl font-bold text-cyan-400">$249/mo</span>
                  </div>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• 10 active job posts</li>
                    <li>• Unlimited candidate views</li>
                    <li>• ZALPHA ATS integration</li>
                    <li>• Advanced analytics</li>
                  </ul>
                </div>
                <div className="bg-cyan-500/20 rounded-xl p-4 border-2 border-cyan-400/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Ultra Premium</span>
                    <span className="text-2xl font-bold text-cyan-400">$499/mo</span>
                  </div>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Unlimited job posts</li>
                    <li>• Skills assessment results access</li>
                    <li>• Verified transcript viewing</li>
                    <li>• 50+ enterprise integrations</li>
                    <li>• Priority customer support</li>
                    <li>• Custom company branding</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Student Pricing */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-pink-400/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <GraduationCap className="w-7 h-7 text-pink-400" />
                Student Plans (Optional Premium)
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4 border border-pink-400/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Free (Base)</span>
                    <span className="text-2xl font-bold text-green-400">$0</span>
                  </div>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Job search & applications</li>
                    <li>• Profile & resume builder</li>
                    <li>• Basic AI job matching</li>
                    <li>• Company reviews access</li>
                    <li>• Zee AI chatbot (limited)</li>
                  </ul>
                  <div className="mt-3 text-xs text-green-400 font-bold">✓ FREE FOREVER — No credit card required</div>
                </div>
                <div className="bg-pink-500/20 rounded-xl p-4 border-2 border-pink-400/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Ultra Premium</span>
                    <span className="text-2xl font-bold text-pink-400">$19.99/mo</span>
                  </div>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Verified transcript sharing</li>
                    <li>• Priority job visibility</li>
                    <li>• Unlimited Zee AI queries</li>
                    <li>• Advanced career coaching</li>
                    <li>• Application tracking analytics</li>
                  </ul>
                  <div className="mt-3 text-xs text-pink-400 font-bold">💡 8-12% conversion rate expected</div>
                </div>
                <div className="bg-purple-500/20 rounded-xl p-4 border-2 border-purple-400/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Ad-Free</span>
                    <span className="text-2xl font-bold text-purple-400">$5/mo</span>
                  </div>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Remove all advertisements</li>
                    <li>• Cleaner interface</li>
                    <li>• Support platform development</li>
                  </ul>
                  <div className="mt-3 text-xs text-purple-400 font-bold">🎯 Low-cost option for ad-free experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Advertising Revenue */}
          <div className="mt-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border-2 border-purple-400/50">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-purple-400" />
              📢 Advertising Revenue Stream
            </h3>
            <p className="text-white/90 mb-6">
              Monetize verified student audience with targeted advertising. Students can pay $5/month to remove ads if preferred.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4 border border-purple-400/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white">Basic Ads</span>
                  <span className="text-xl font-bold text-purple-400">$299/mo</span>
                </div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Banner ads</li>
                  <li>• 50K impressions/month</li>
                  <li>• Basic targeting</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-purple-400/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white">Professional</span>
                  <span className="text-xl font-bold text-purple-400">$999/mo</span>
                </div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Premium placement</li>
                  <li>• 200K impressions/month</li>
                  <li>• Advanced targeting</li>
                  <li>• Performance analytics</li>
                </ul>
              </div>
              <div className="bg-purple-500/20 rounded-xl p-4 border-2 border-purple-400/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white">Enterprise</span>
                  <span className="text-xl font-bold text-purple-400">$2,999/mo</span>
                </div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Exclusive sponsorships</li>
                  <li>• 500K+ impressions/month</li>
                  <li>• Custom campaigns</li>
                  <li>• Dedicated account manager</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-emerald-500/20 rounded-xl p-4 border border-emerald-400/50">
              <p className="text-white font-bold">Projected ARR: $180K - $360K from advertising revenue</p>
              <p className="text-white/80 text-sm mt-1">10-20 advertisers × $299-$2,999/month</p>
              <p className="text-emerald-200 text-xs mt-2">💡 ARR = Annual Recurring Revenue (yearly subscription income)</p>
            </div>
          </div>
        </section>

        {/* NEW: Cryptocurrency Payment System */}
        <section className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-orange-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">💰 Cryptocurrency Payment Ecosystem</h2>
              <p className="text-orange-300 text-lg">Accept crypto subscriptions + pay students for gig work</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-6 mb-8 border-2 border-yellow-400">
            <h3 className="text-2xl font-bold text-white mb-3">🚀 NEW FEATURE: Full Cryptocurrency Support</h3>
            <p className="text-white/90 text-lg">
              ZALPHA now <strong>accepts cryptocurrency</strong> for employer subscriptions AND <strong>pays students in crypto</strong> for contract jobs!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-orange-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">Accept Crypto Subscriptions</h3>
              <p className="text-white/90 mb-4">Employers pay $99/$249/$499 subscriptions in Bitcoin, Ethereum, or USDC</p>
              <ul className="space-y-3 text-white/80 text-sm">
                <li>💸 Lower fees (save 2-3%)</li>
                <li>⚡ Instant activation</li>
                <li>🌏 No currency conversion</li>
              </ul>
              <div className="bg-emerald-500/20 rounded-xl p-3 border border-emerald-400/50 mt-4">
                <p className="text-white font-bold text-sm">+$120K ARR (Additional Annual Revenue)</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">Pay Students in Crypto</h3>
              <p className="text-white/90 mb-4">Students bid on gig work, get paid in crypto, cash out to USD</p>
              <ul className="space-y-3 text-white/80 text-sm">
                <li>🎯 Job bidding platform</li>
                <li>🔒 Escrow protection</li>
                <li>💵 Instant cash-out</li>
              </ul>
              <div className="bg-purple-500/20 rounded-xl p-3 border border-purple-400/50 mt-4">
                <p className="text-white font-bold text-sm">+$780K ARR (Additional Annual Revenue)</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 border-2 border-emerald-400">
            <p className="text-4xl font-bold text-white mb-4 text-center">+$900K Additional ARR (Annual Revenue)</p>
            
            {/* Simple Explanation for Internal Team */}
            <div className="bg-white/20 rounded-xl p-6 mb-6 border-2 border-white/30">
              <p className="text-2xl font-bold mb-3 text-yellow-300">📚 TEAM TRAINING: What This Means</p>
              <div className="text-white space-y-3">
                <p className="text-lg">
                  <strong>ARR = Annual Recurring Revenue</strong> = Money we make every year automatically
                </p>
                <p className="text-base leading-relaxed">
                  This <strong className="text-yellow-300">+$900K is BONUS money</strong> we earn ON TOP OF our regular $2.1M subscription income. 
                  It's EXTRA revenue from the same customers!
                </p>
                <div className="bg-emerald-500/30 rounded-lg p-4 border border-emerald-300 mt-3">
                  <p className="font-bold text-lg">
                    💡 Simple Math: $2.1M (Subscriptions) + $900K (Crypto Fees) = <span className="text-yellow-300">$3M Total Revenue!</span>
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 mt-3">
                  <p className="text-sm">
                    <strong>Real Example:</strong> If you run a gym with 100 members paying $100/month ($120K/year), 
                    then you add a smoothie bar that makes $75K/year in profit — that's your "+$75K additional revenue." 
                    Same members, same building, but TWO income streams!
                  </p>
                </div>
              </div>
            </div>

            {/* Integration Explanation */}
            <div className="bg-white rounded-xl p-6 text-gray-900 mb-6">
              <p className="text-2xl font-bold mb-4 text-center text-emerald-700">🔌 What is "Integration"? (Elementary Explanation)</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
                  <p className="text-lg font-bold text-blue-900 mb-2">🧩 Like Connecting Puzzle Pieces</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>Integration</strong> means making two different computer systems "talk to each other" and work together. 
                    Think of it like plugging your phone charger into the wall — you're connecting (integrating) two things so they work as one.
                  </p>
                  <div className="mt-3 bg-blue-100 rounded p-2 text-xs">
                    <strong>Example:</strong> "Sign in with Google" button = Website + Google are integrated!
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
                  <p className="text-lg font-bold text-green-900 mb-2">💰 Crypto Integration For Our Platform</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    We connected Bitcoin/Ethereum payment systems INTO ZALPHA. Now employers can pay subscriptions with crypto. 
                    Students can receive payments in crypto. It's like adding Apple Pay to a store that only took cash before!
                  </p>
                  <div className="mt-3 bg-green-100 rounded p-2 text-xs">
                    <strong>Result:</strong> More payment options = happier customers = we earn transaction fees!
                  </div>
                </div>
              </div>
            </div>

            <p className="text-emerald-100 text-lg text-center">
              <strong>Crypto payments = New revenue stream + competitive advantage + perfect for Pacific Islands</strong>
            </p>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-red-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Security & Legal Compliance</h2>
              <p className="text-red-300 text-lg">Critical protections built into the platform</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-400" />
                Student Safety
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>✓ <strong>Age Verification:</strong> 18+ minimum (strict enforcement)</li>
                <li>✓ <strong>Dual ID Authentication:</strong> Government ID + student ID required</li>
                <li>✓ <strong>College Graduate Requirement:</strong> Within 1 year of graduation</li>
                <li>✓ <strong>FERPA Compliance:</strong> Student education records protected (see below)</li>
                <li>✓ <strong>Hold Harmless Agreement:</strong> Legal protection for students</li>
                <li>✓ <strong>All employers verified</strong> before posting jobs</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-400" />
                Employer Compliance
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>✓ <strong>Business License Verification:</strong> All companies verified</li>
                <li>✓ <strong>Non-Discrimination Clause:</strong> Mandatory for all employers</li>
                <li>✓ <strong>Hold Harmless Agreement:</strong> Protects Zee Executive Group</li>
                <li>✓ <strong>Payment Verification:</strong> Valid payment method required</li>
                <li>✓ <strong>Review & Rating System:</strong> Students can flag bad actors</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-400" />
                Data Security
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>✓ <strong>End-to-End Encryption:</strong> All sensitive data encrypted</li>
                <li>✓ <strong>Secure Supabase Backend:</strong> Enterprise-grade database</li>
                <li>✓ <strong>ID Storage:</strong> Encrypted at rest, never exposed</li>
                <li>✓ <strong>Payment Security:</strong> PCI-DSS compliant payment processing</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-red-400" />
                Legal Protections
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>✓ <strong>Terms of Service:</strong> Clear user agreements</li>
                <li>✓ <strong>Privacy Policy:</strong> GDPR/CCPA compliant</li>
                <li>✓ <strong>Hold Harmless Clauses:</strong> Protect Zee Executive Group from liability</li>
                <li>✓ <strong>Anti-Fraud Measures:</strong> Automated fraud detection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FERPA Compliance Explained */}
        <section className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">🎓 FERPA Compliance</h2>
              <p className="text-green-300 text-lg">Protecting Student Education Records</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 border-2 border-green-300 mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">What is FERPA?</h3>
            <p className="text-white text-lg mb-4">
              <strong className="text-green-200">FERPA</strong> stands for the <strong className="text-green-200">Family Educational Rights and Privacy Act</strong>. 
              It's a U.S. federal law that protects the privacy of student education records.
            </p>
            <div className="bg-white/20 rounded-xl p-6 border-2 border-green-300">
              <p className="text-white font-bold text-xl mb-3">📚 Simple Explanation for the Team:</p>
              <p className="text-white text-lg">
                FERPA means we <strong className="underline">CANNOT share a student's grades, transcripts, enrollment status, or any education records</strong> with employers, 
                parents, or anyone else WITHOUT the student's written permission.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-7 h-7 text-green-400" />
                What FERPA Protects
              </h3>
              <ul className="space-y-3 text-white/90 text-base">
                <li>🎓 <strong>Transcripts:</strong> Grades, GPA, courses taken</li>
                <li>📝 <strong>Enrollment Records:</strong> Registration status, class schedules</li>
                <li>💰 <strong>Financial Aid:</strong> Loans, scholarships, grants</li>
                <li>🏫 <strong>Disciplinary Records:</strong> Academic or behavioral issues</li>
                <li>📧 <strong>Student ID Numbers:</strong> Social security numbers, student IDs</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-7 h-7 text-yellow-400" />
                How ZALPHA Complies
              </h3>
              <ul className="space-y-3 text-white/90 text-base">
                <li>✅ <strong>Student Consent Required:</strong> Students must OPT-IN to share transcripts</li>
                <li>✅ <strong>Privacy Dashboard:</strong> Students control WHO sees their education records</li>
                <li>✅ <strong>18+ Age Requirement:</strong> FERPA applies differently to adults (18+)</li>
                <li>✅ <strong>Encrypted Storage:</strong> All education records encrypted and secure</li>
                <li>✅ <strong>Audit Logs:</strong> We track who accessed what and when</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-orange-700 rounded-2xl p-6 border-2 border-red-400">
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <AlertCircle className="w-7 h-7 text-white" />
              ⚠️ CRITICAL: What Team Members MUST Do
            </h3>
            <div className="space-y-3 text-white text-base">
              <p><strong>❌ NEVER share student transcripts or grades</strong> with employers unless the student has explicitly given permission through our platform.</p>
              <p><strong>❌ NEVER discuss a student's academic performance</strong> with anyone outside of ZALPHA without student consent.</p>
              <p><strong>✅ ALWAYS check the student's privacy settings</strong> before sharing ANY education-related information.</p>
              <p><strong>✅ IF IN DOUBT, ASK!</strong> Violating FERPA can result in fines up to $50,000 and loss of federal funding for schools.</p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-blue-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Settings className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Technology Stack</h2>
              <p className="text-blue-300 text-lg">What powers ZALPHA</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <h3 className="text-xl font-bold text-white mb-4">🎨 Frontend</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• <strong>React:</strong> Modern UI framework</li>
                <li>• <strong>TypeScript:</strong> Type-safe development</li>
                <li>• <strong>Tailwind CSS v4:</strong> Pacific Ocean-themed design</li>
                <li>• <strong>Lucide Icons:</strong> Beautiful, consistent iconography</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <h3 className="text-xl font-bold text-white mb-4">⚙️ Backend</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• <strong>Supabase:</strong> Backend-as-a-Service (auth, database, storage)</li>
                <li>• <strong>PostgreSQL:</strong> Relational database (via Supabase)</li>
                <li>• <strong>Supabase Edge Functions:</strong> Serverless API endpoints</li>
                <li>• <strong>Hono Web Framework:</strong> Fast, lightweight server</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <h3 className="text-xl font-bold text-white mb-4">🔌 Integrations</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• <strong>ZALPHA ATS:</strong> Built-in applicant tracking system</li>
                <li>• <strong>Company Websites:</strong> Connect employer websites (employer-specific)</li>
                <li>• <strong>Payment Processing:</strong> Stripe/PayPal for subscriptions</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <h3 className="text-xl font-bold text-white mb-4">🤖 AI Features</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• <strong>Zee AI Chatbot:</strong> 24/7 career guidance assistant</li>
                <li>• <strong>Smart Job Matching:</strong> ML-powered recommendations</li>
                <li>• <strong>Skills Assessment:</strong> Gamified testing system</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Integrations Explained */}
        <section className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-amber-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Integration Architecture</h2>
              <p className="text-amber-300 text-lg">IMPORTANT: Two types of integrations</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-2xl p-8 border-4 border-orange-400">
              <div className="bg-white/20 rounded-xl p-4 mb-6 border-2 border-orange-300">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  🏢 Platform Admin (Zee Executive Group)
                </h3>
              </div>
              <div className="bg-white/10 rounded-xl p-6 border-2 border-orange-400/30 mb-4">
                <h4 className="font-bold text-white mb-3 text-lg">Company Website Integration</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• <strong>Purpose:</strong> Connect OUR company website (www.zalpharecruit.com)</li>
                  <li>• <strong>Scope:</strong> Admin/platform-level only</li>
                  <li>• <strong>What it does:</strong> Syncs form submissions, contact requests, blog posts</li>
                  <li>• <strong>Who uses it:</strong> Zee Executive Group team (internal only)</li>
                </ul>
              </div>
              <div className="bg-amber-500/20 rounded-xl p-4 border-2 border-amber-400/50">
                <p className="text-sm text-white font-bold">
                  ⚠️ This is NOT for employers — it's for our own website management
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl p-8 border-4 border-purple-400">
              <div className="bg-white/20 rounded-xl p-4 mb-6 border-2 border-purple-300">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  💼 Employer Integrations (Per-Employer)
                </h3>
              </div>
              <div className="bg-white/10 rounded-xl p-6 border-2 border-purple-400/30 mb-4">
                <h4 className="font-bold text-white mb-3 text-lg">ZALPHA ATS (Built-In)</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• <strong>Purpose:</strong> Employers use ZALPHA's built-in ATS system</li>
                  <li>• <strong>Scope:</strong> Per-employer configuration</li>
                  <li>• <strong>What it does:</strong> Syncs jobs from employer's ATS, sends applications back</li>
                  <li>• <strong>Who uses it:</strong> Each individual employer (separate API keys)</li>
                </ul>
              </div>
              <div className="bg-purple-500/20 rounded-xl p-4 border-2 border-purple-400/50">
                <p className="text-sm text-white font-bold">
                  ✓ All Employers → ZALPHA ATS (Integrated) • Optional: Connect their existing ATS for data sync
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Support & Operations */}
        <section className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-teal-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center">
              <Users className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Team Roles & Responsibilities</h2>
              <p className="text-teal-300 text-lg">Who does what at ZALPHA</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-teal-400/30">
              <h3 className="text-xl font-bold text-white mb-4">👥 Customer Support</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Help students with account setup and ID verification</li>
                <li>• Assist employers with job postings and subscription issues</li>
                <li>• Monitor and respond to platform feedback</li>
                <li>• Escalate technical issues to dev team</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-teal-400/30">
              <h3 className="text-xl font-bold text-white mb-4">💼 Sales & Business Development</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Onboard new employers and close subscription deals</li>
                <li>• Build partnerships with universities and career centers</li>
                <li>• Conduct product demos and sales presentations</li>
                <li>• Manage employer relationships and renewals</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-teal-400/30">
              <h3 className="text-xl font-bold text-white mb-4">🎨 Marketing</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Drive student signups through social media and campus outreach</li>
                <li>• Create content for blog, email campaigns, and ads</li>
                <li>• Manage brand presence across Pacific region</li>
                <li>• Track growth metrics and campaign performance</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-teal-400/30">
              <h3 className="text-xl font-bold text-white mb-4">⚙️ Operations & Admin</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Verify student IDs and employer business licenses</li>
                <li>• Monitor platform for fraud and policy violations</li>
                <li>• Manage compliance and legal documentation</li>
                <li>• Handle billing, invoicing, and subscription management</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-teal-400/30">
              <h3 className="text-xl font-bold text-white mb-4">🌟 Student Ambassadors</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Promote ZALPHA on campus and drive student signups</li>
                <li>• Host info sessions and answer student questions</li>
                <li>• Gather feedback from student users and report to team</li>
                <li>• Earn commission/bonuses for successful referrals</li>
                <li>• Act as the voice of students in platform improvements</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-2xl p-6 border-2 border-pink-400/50">
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <Star className="w-7 h-7 text-pink-400" />
              🌟 Student Ambassador Program
            </h3>
            <p className="text-white/90 mb-4">
              Our Student Ambassadors are current students or recent graduates who represent ZALPHA on their campuses. 
              They're our boots on the ground, helping us build trust and drive adoption in the Pacific Island student community.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-bold text-white mb-1">💰 Compensation</p>
                <p className="text-white/80 text-sm">Commission per student signup + performance bonuses</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-bold text-white mb-1">🎯 Goals</p>
                <p className="text-white/80 text-sm">Sign up 50+ students per semester per ambassador</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-bold text-white mb-1">📍 Locations</p>
                <p className="text-white/80 text-sm">All 6 Pacific territories (CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Launch Timeline */}
        <section className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-indigo-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Calendar className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Launch Timeline</h2>
              <p className="text-indigo-300 text-lg">Phased rollout strategy</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-yellow-400/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Phase 1: Platform Development</h3>
                  <p className="text-yellow-300">Current Status: IN PROGRESS</p>
                </div>
              </div>
              <ul className="text-white/80 space-y-2 ml-16">
                <li>🔨 Building core platform features</li>
                <li>🔨 Developing ID verification system</li>
                <li>🔨 Creating Basic Skills Assessment</li>
                <li>🔨 Integrating cryptocurrency payments</li>
                <li>🔨 Building ATS integrations (Custom APIs for employer websites)</li>
                <li>🔨 Preparing for CNMI beta launch</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Phase 2: Beta Launch (CNMI)</h3>
                  <p className="text-blue-300">Months 1-3 • Status: UPCOMING</p>
                </div>
              </div>
              <ul className="text-white/80 space-y-2 ml-16">
                <li>• Launch platform to 500 student beta testers</li>
                <li>• Onboard 50 CNMI employers</li>
                <li>• Test ID verification system</li>
                <li>• Gather user feedback & iterate</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-purple-400/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Phase 3: Guam Expansion</h3>
                  <p className="text-purple-300">Months 4-9 • Status: PLANNED</p>
                </div>
              </div>
              <ul className="text-white/80 space-y-2 ml-16">
                <li>• UOG partnership signed</li>
                <li>• Target: 5,000 student signups</li>
                <li>• Target: 200 employer accounts</li>
                <li>• Local marketing campaign launch</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Phase 4: Hawaii & FSM</h3>
                  <p className="text-cyan-300">Months 10-18 • Status: PLANNED</p>
                </div>
              </div>
              <ul className="text-white/80 space-y-2 ml-16">
                <li>• UH system partnership</li>
                <li>• Target: 50,000+ students</li>
                <li>• Target: 1,000+ employers</li>
                <li>• Full platform feature rollout</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-emerald-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Key Success Metrics</h2>
              <p className="text-emerald-300 text-lg">What we measure and why</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <h3 className="text-xl font-bold text-white mb-4">🎓 Student Metrics</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li>
                  <div className="font-bold text-emerald-400">Total Signups</div>
                  <div>Target: 50K Year 1</div>
                </li>
                <li>
                  <div className="font-bold text-emerald-400">Verification Rate</div>
                  <div>Target: 95%+ completion</div>
                </li>
                <li>
                  <div className="font-bold text-emerald-400">Job Applications</div>
                  <div>Avg: 5-10 per student/month</div>
                </li>
                <li>
                  <div className="font-bold text-emerald-400">Placement Rate</div>
                  <div>Target: 60% within 90 days</div>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <h3 className="text-xl font-bold text-white mb-4">💼 Employer Metrics</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li>
                  <div className="font-bold text-cyan-400">Paying Customers</div>
                  <div>Target: 1,200 Year 1</div>
                </li>
                <li>
                  <div className="font-bold text-cyan-400">Avg Revenue/Customer</div>
                  <div>$249/month (Professional tier)</div>
                </li>
                <li>
                  <div className="font-bold text-cyan-400">Churn Rate</div>
                  <div>Target: &lt;5% monthly</div>
                </li>
                <li>
                  <div className="font-bold text-cyan-400">Time to Hire</div>
                  <div>Target: 15-20 days (vs 45-60)</div>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-purple-400/30">
              <h3 className="text-xl font-bold text-white mb-4">💰 Revenue Metrics</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li>
                  <div className="font-bold text-purple-400">Monthly Recurring Revenue (MRR)</div>
                  <div>Target: $240K by Month 12</div>
                </li>
                <li>
                  <div className="font-bold text-purple-400">Annual Recurring Revenue (ARR)</div>
                  <div>Target: $2.8M Year 1</div>
                </li>
                <li>
                  <div className="font-bold text-purple-400">Customer Lifetime Value</div>
                  <div>Avg: $8,970 (30 months)</div>
                </li>
                <li>
                  <div className="font-bold text-purple-400">CAC Payback Period</div>
                  <div>Target: &lt;6 months</div>
                </li>
              </ul>
            </div>
          </div>

          {/* ARR Simple Explanation */}
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl p-8 border-2 border-purple-300">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-7 h-7 text-white" />
              💡 What is ARR? (Simple Explanation for the Team)
            </h3>
            <div className="bg-white/20 rounded-xl p-6 border-2 border-purple-200">
              <p className="text-white text-lg mb-4">
                <strong className="text-purple-200">ARR = Annual Recurring Revenue</strong>
              </p>
              <p className="text-white text-base mb-4">
                This is the total amount of money we expect to make from subscriptions <strong className="underline">every year</strong>.
              </p>
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                <p className="text-white font-bold mb-2">🧮 Simple Math Example:</p>
                <p className="text-white text-sm mb-2">If we have <strong>100 employers</strong> paying <strong>$249/month</strong>:</p>
                <p className="text-white text-sm">
                  • Monthly Revenue = 100 × $249 = <strong className="text-green-300">$24,900/month</strong><br/>
                  • <strong className="text-yellow-300">ARR</strong> = $24,900 × 12 months = <strong className="text-green-300">$298,800/year</strong>
                </p>
              </div>
              <div className="bg-purple-900/50 rounded-lg p-4">
                <p className="text-white font-bold mb-2">🎯 Why ARR Matters:</p>
                <ul className="text-white text-sm space-y-1">
                  <li>✅ Shows investors how much reliable income we generate</li>
                  <li>✅ Helps us predict future revenue and plan growth</li>
                  <li>✅ Higher ARR = More valuable company</li>
                  <li>✅ Our goal: <strong className="text-green-300">$2.8M ARR in Year 1</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Resources */}
        <section className="text-center py-12">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-12 shadow-2xl border-2 border-purple-300">
            <h2 className="text-4xl font-bold text-white mb-4">Questions? Need Help?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Your success is our success. Here's how to get support and stay informed.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/20 rounded-2xl p-6">
                <BookOpen className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Documentation</h3>
                <button 
                  onClick={() => onNavigate('app-overview')}
                  className="text-sm text-purple-200 hover:text-white underline"
                >
                  View Full Platform Overview
                </button>
              </div>
              <div className="bg-white/20 rounded-2xl p-6">
                <Users className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Team Chat</h3>
                <p className="text-sm text-purple-200">Slack: #zalpha-team</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-6">
                <Settings className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Admin Portal</h3>
                <button 
                  onClick={() => onNavigate('integration-settings')}
                  className="text-sm text-purple-200 hover:text-white underline"
                >
                  Access Settings
                </button>
              </div>
            </div>
            <div className="mt-8 text-purple-100">
              <p className="text-lg font-semibold">Zee Executive Group</p>
              <p className="text-sm">Building the future of Pacific talent connection</p>
            </div>
          </div>
        </section>

        {/* Business Development Training Guides */}
        <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">💼 BD Training Guides</h2>
              <p className="text-green-200 text-lg">Complete training materials for Business Development</p>
            </div>
          </div>
          
          <p className="text-xl text-white/95 mb-8">
            Complete training materials for Business Development representatives to acquire new schools, employers, and investors!
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => onNavigate('school-bd-guide')}
              className="bg-white/95 backdrop-blur-sm text-purple-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-purple-200 text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <School className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">School BD Guide</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Complete training for signing up 150+ schools across 6 Pacific islands
              </p>
              <ul className="space-y-2 text-sm text-slate-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Sales scripts & objection handling
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  $500-$2,000 commission per school
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  8-step onboarding process
                </li>
              </ul>
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <span>View Guide</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('employer-bd-guide')}
              className="bg-white/95 backdrop-blur-sm text-blue-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-blue-200 text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Employer BD Guide</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Training for acquiring 1000+ employer clients at $99-$499/month
              </p>
              <ul className="space-y-2 text-sm text-slate-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Target database: Hotels, banks, hospitals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  15-25% recurring commission
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Cold call & email templates
                </li>
              </ul>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <span>View Guide</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('investor-bd-guide')}
              className="bg-white/95 backdrop-blur-sm text-pink-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-pink-200 text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Investor BD Guide</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Complete pitch deck for raising $2M seed round from Angels & VCs
              </p>
              <ul className="space-y-2 text-sm text-slate-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Market opportunity: 500K+ students
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  $18K MRR, 23% monthly growth
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  5-10x return projections
                </li>
              </ul>
              <div className="flex items-center gap-2 text-pink-600 font-semibold">
                <span>View Guide</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </section>

        {/* Legal Checklist */}
        <section className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">⚖️ Legal Checklist</h2>
              <p className="text-purple-200 text-lg">IP protection & trademark guide for ZALPHA</p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-8 border-2 border-purple-300/50 mb-6">
            <p className="text-xl text-white/95 mb-4">
              Essential legal protections and compliance checklist for the ZALPHA platform. Access the full Legal Checklist for detailed information on intellectual property, trademarks, and compliance requirements.
            </p>
            <button
              onClick={() => onNavigate('legal-checklist')}
              className="bg-white/95 backdrop-blur-sm text-purple-700 rounded-xl px-6 py-3 hover:shadow-2xl hover:scale-105 transition-all font-semibold flex items-center gap-2"
            >
              <Shield className="w-5 h-5" />
              <span>View Full Legal Checklist</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-7 h-7 text-green-400" />
                Intellectual Property
              </h3>
              <ul className="space-y-2 text-white/90">
                <li>✓ ZALPHA trademark registration</li>
                <li>✓ Logo and brand protection</li>
                <li>✓ Copyright for platform content</li>
                <li>✓ Patent considerations for AI features</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-blue-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-7 h-7 text-blue-400" />
                Legal Documentation
              </h3>
              <ul className="space-y-2 text-white/90">
                <li>✓ Terms of Service</li>
                <li>✓ Privacy Policy (GDPR/CCPA compliant)</li>
                <li>✓ User agreements</li>
                <li>✓ Hold harmless clauses</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}