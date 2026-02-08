import { Briefcase, TrendingUp, Users, Building2, CheckCircle2, Mail, Bell, Sparkles, Target, Award, Rocket, Globe } from 'lucide-react';
import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';

interface ExperiencedProfessionalsComingSoonProps {
  onNavigate: (page: string) => void;
}

export function ExperiencedProfessionalsComingSoon({ onNavigate }: ExperiencedProfessionalsComingSoonProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to actual signup form/backend
    console.log('Email submitted:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <BackButton onNavigate={onNavigate} />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-cyan-300 font-bold text-sm sm:text-base">Coming Soon - 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight">
            ZALPHA for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mt-2">
              Experienced Professionals
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed px-4">
            The same innovative platform you know, now designed for professionals with 5+ years of experience across the Pacific Islands.
          </p>
        </div>

        {/* Value Propositions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg border-2 border-cyan-400/30 rounded-2xl p-6 sm:p-8 hover:border-cyan-400/60 transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Advanced Career Matching</h3>
            <p className="text-blue-200 text-sm sm:text-base">
              AI-powered matching that considers your full career trajectory, specialized skills, and professional goals.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border-2 border-purple-400/30 rounded-2xl p-6 sm:p-8 hover:border-purple-400/60 transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Executive & Mid-Level Roles</h3>
            <p className="text-blue-200 text-sm sm:text-base">
              Access to management, director, and senior specialist positions across all Pacific territories.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border-2 border-blue-400/30 rounded-2xl p-6 sm:p-8 hover:border-blue-400/60 transition-all sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Verified Experience</h3>
            <p className="text-blue-200 text-sm sm:text-base">
              Showcase your proven track record with verified employment history and professional achievements.
            </p>
          </div>
        </div>

        {/* What's Different Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border-2 border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">What Makes It Different?</h2>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Pacific Islands Focus</h4>
                  <p className="text-blue-200 text-sm sm:text-base">
                    Exclusively serving CNMI, Guam, Hawaii, Palau, Marshall Islands, and FSM with region-specific opportunities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Skills-First Approach</h4>
                  <p className="text-blue-200 text-sm sm:text-base">
                    Advanced assessments that validate your expertise, not just years on a resume.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Direct Employer Access</h4>
                  <p className="text-blue-200 text-sm sm:text-base">
                    No recruiters taking commissions. Connect directly with hiring managers and decision-makers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Contract & Full-Time</h4>
                  <p className="text-blue-200 text-sm sm:text-base">
                    Access to both traditional employment and high-value contract opportunities with transparent pricing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">AI-Powered Insights</h4>
                  <p className="text-blue-200 text-sm sm:text-base">
                    Career coaching, salary benchmarking, and negotiation support powered by advanced AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border-2 border-cyan-400/50 rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">1000+</div>
            <div className="text-cyan-300 font-semibold text-xs sm:text-sm">Mid-Senior Roles</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-2 border-purple-400/50 rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">200+</div>
            <div className="text-purple-300 font-semibold text-xs sm:text-sm">Partner Employers</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-lg border-2 border-blue-400/50 rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">6</div>
            <div className="text-blue-300 font-semibold text-xs sm:text-sm">Island Territories</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-2 border-green-400/50 rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">$120K+</div>
            <div className="text-green-300 font-semibold text-xs sm:text-sm">Avg. Salary Range</div>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">Be the First to Know</h2>
              <p className="text-blue-200 text-sm sm:text-base lg:text-lg">
                Sign up now to get early access when we launch. Limited spots available for our beta program!
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-cyan-400 transition-all text-sm sm:text-base"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Get Early Access</span>
                </button>

                <p className="text-blue-200 text-xs sm:text-sm text-center">
                  Join <strong className="text-white">5,000+ professionals</strong> already on the waitlist
                </p>
              </form>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">You're on the list!</h3>
                <p className="text-blue-200 text-sm sm:text-base mb-6">
                  We'll notify you as soon as ZALPHA for Experienced Professionals launches.
                </p>
                <button
                  onClick={() => onNavigate('landing')}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-white/10 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all text-sm sm:text-base"
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Launching Q3 2026</h3>
            </div>
            <p className="text-blue-200 text-sm sm:text-base">
              We're building something special for experienced professionals across the Pacific Islands. 
              Our platform will be ready in Q3 2026, and early access members get exclusive benefits including:
            </p>
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <p className="font-bold text-cyan-300 text-sm sm:text-base">🎁 Free Premium</p>
                <p className="text-blue-200 text-xs sm:text-sm">3 months free</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <p className="font-bold text-purple-300 text-sm sm:text-base">⚡ Priority Matching</p>
                <p className="text-blue-200 text-xs sm:text-sm">Early employer access</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <p className="font-bold text-blue-300 text-sm sm:text-base">👥 Beta Program</p>
                <p className="text-blue-200 text-xs sm:text-sm">Shape the platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
