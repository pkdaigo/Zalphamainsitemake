import { Heart, Shield, Users, TrendingUp, Award, CheckCircle, Star, Target, Sparkles, Building, UserCheck } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface InclusiveHiringProps {
  onNavigate: (page: string) => void;
}

export function InclusiveHiring({ onNavigate }: InclusiveHiringProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
        <BackButton onNavigate={onNavigate} />

        <div className="space-y-12 sm:space-y-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Inclusive Hiring
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Is Our Superpower
              </span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              ZALPHA is the Pacific's <strong className="text-pink-300">first and only</strong> job platform with built-in ADA compliance and accessibility-first design
            </p>
          </div>

          {/* Why This Matters - Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/30 hover:scale-105 transition-transform">
              <div className="text-5xl font-bold text-pink-400 mb-2">26%</div>
              <div className="text-white/90">of Americans have a disability</div>
              <div className="text-sm text-white/70 mt-2">That's 1 in 4 adults</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/30 hover:scale-105 transition-transform">
              <div className="text-5xl font-bold text-purple-400 mb-2">80%</div>
              <div className="text-white/90">of disabilities are invisible</div>
              <div className="text-sm text-white/70 mt-2">Most aren't immediately apparent</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/30 hover:scale-105 transition-transform">
              <div className="text-5xl font-bold text-blue-400 mb-2">$13B</div>
              <div className="text-white/90">in disposable income</div>
              <div className="text-sm text-white/70 mt-2">People with disabilities represent huge market</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/30 hover:scale-105 transition-transform">
              <div className="text-5xl font-bold text-green-400 mb-2">90%</div>
              <div className="text-white/90">lower turnover rate</div>
              <div className="text-sm text-white/70 mt-2">Employees with disabilities stay longer</div>
            </div>
          </div>

          {/* Our Unique Value Proposition */}
          <div className="bg-gradient-to-br from-pink-600/40 to-purple-600/40 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-4 border-pink-400/50 shadow-2xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-bold text-lg sm:text-xl mb-6 shadow-xl">
                <Award className="w-6 h-6" />
                ZALPHA Exclusive Feature
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                The Only Job Platform Built for Everyone
              </h2>
              <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto">
                While other platforms treat accessibility as an afterthought, we built it into our DNA
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-white/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-pink-500/30 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-pink-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">For Students</h3>
                </div>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>100% Voluntary Disclosure</strong> - Never required, always your choice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Privacy First</strong> - You control who sees what, when</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>ADA Rights Education</strong> - Know your protections before applying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Accommodation Requests Built-In</strong> - Request what you need upfront</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Match with Inclusive Employers</strong> - Find companies that value diversity</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 border-2 border-white/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">For Employers</h3>
                </div>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Built-In Compliance</strong> - ADA requirements handled automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Access Untapped Talent</strong> - Connect with qualified diverse candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Risk Reduction</strong> - Avoid discrimination lawsuits with proper systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Enhanced Reputation</strong> - Show your commitment to diversity & inclusion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Better Retention</strong> - Inclusive workplaces have 90% lower turnover</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Business Benefits */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-white/30">
            <div className="text-center mb-10">
              <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Inclusive Hiring is Smart Business
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Companies that prioritize disability inclusion outperform their peers
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border-2 border-green-400/50">
                <Target className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Better Performance</h3>
                <p className="text-white/80">
                  Companies with inclusive hiring practices have <strong className="text-green-300">28% higher revenue</strong> and <strong className="text-green-300">2x higher net income</strong>
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border-2 border-blue-400/50">
                <Users className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Larger Talent Pool</h3>
                <p className="text-white/80">
                  Access <strong className="text-blue-300">26% more candidates</strong> who are often overlooked by competitors
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border-2 border-purple-400/50">
                <Shield className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Legal Protection</h3>
                <p className="text-white/80">
                  Avoid <strong className="text-purple-300">$300M+ in annual ADA lawsuits</strong> with proper compliance systems
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border-2 border-yellow-400/50">
                <Award className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Enhanced Brand</h3>
                <p className="text-white/80">
                  <strong className="text-yellow-300">77% of consumers</strong> prefer to buy from disability-friendly companies
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-xl p-6 border-2 border-pink-400/50">
                <Heart className="w-10 h-10 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Innovation Boost</h3>
                <p className="text-white/80">
                  Diverse teams are <strong className="text-pink-300">35% more innovative</strong> and solve problems faster
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border-2 border-indigo-400/50">
                <Star className="w-10 h-10 text-indigo-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Employee Morale</h3>
                <p className="text-white/80">
                  Inclusive workplaces have <strong className="text-indigo-300">90% higher employee satisfaction</strong>
                </p>
              </div>
            </div>
          </div>

          {/* What Makes ZALPHA Different */}
          <div className="bg-gradient-to-br from-blue-600/40 to-indigo-600/40 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-4 border-blue-400/50 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
              What Makes ZALPHA Different?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 rounded-xl p-6 border-2 border-white/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">❌</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Other Job Platforms</h3>
                    <ul className="space-y-2 text-white/80">
                      <li>• No disability disclosure options</li>
                      <li>• No accommodation request system</li>
                      <li>• No ADA compliance tools</li>
                      <li>• No privacy controls for disability info</li>
                      <li>• Students left to navigate alone</li>
                      <li>• Employers risk non-compliance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-xl p-6 border-4 border-green-400/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">ZALPHA Platform</h3>
                    <ul className="space-y-2 text-white/90">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                        <span><strong>Built-in ADA system</strong> with 8 disability categories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                        <span><strong>12+ accommodation options</strong> students can request</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                        <span><strong>Automatic compliance</strong> for employers (no extra work!)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                        <span><strong>Full privacy controls</strong> - students decide visibility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                        <span><strong>Educational resources</strong> about ADA rights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                        <span><strong>Zero-tolerance policy</strong> for discrimination</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pacific Islands Focus */}
          <div className="bg-gradient-to-br from-orange-600/40 to-pink-600/40 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-4 border-orange-400/50 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
              Why This Matters for Pacific Islands
            </h2>
            <div className="bg-white/10 rounded-xl p-6 border-2 border-white/30 max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-6">
                Pacific Island communities have historically been underserved by mainland job platforms. 
                Students with disabilities face even greater barriers. ZALPHA changes this.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-400" />
                    Cultural Respect
                  </h3>
                  <p className="text-sm text-white/80">
                    Understanding that Pacific cultures approach disability and accommodation differently
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    Community Support
                  </h3>
                  <p className="text-sm text-white/80">
                    Connecting students with employers who understand island life and values
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Equal Access
                  </h3>
                  <p className="text-sm text-white/80">
                    Ensuring all Pacific students have the same opportunities as mainland peers
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Breaking Barriers
                  </h3>
                  <p className="text-sm text-white/80">
                    First platform to bring ADA-compliant hiring to all 6 Pacific territories
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Impact */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-white/30 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              This Isn't Just Business. It's Our Mission.
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Every Pacific Island student deserves equal access to economic opportunity. 
              Period. No exceptions. No exclusions.
            </p>
            <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-1">
              <div className="bg-purple-900 rounded-xl px-8 py-6">
                <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  "Leave No One Behind"
                </p>
                <p className="text-lg text-white/80">
                  - ZALPHA Core Value
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl p-8 sm:p-12 border-4 border-white/30 shadow-2xl text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Join the Inclusive Hiring Revolution?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Whether you're a student seeking opportunity or an employer building a diverse team, 
              ZALPHA makes it easy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate('student-signup')}
                className="px-8 py-4 bg-white text-purple-700 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-xl hover:scale-105"
              >
                I'm a Student
              </button>
              <button
                onClick={() => onNavigate('employer-signup')}
                className="px-8 py-4 bg-purple-900 text-white rounded-xl font-bold text-lg hover:bg-purple-800 transition-all shadow-xl border-2 border-white/50 hover:scale-105"
              >
                I'm an Employer
              </button>
              <button
                onClick={() => onNavigate('ada-information')}
                className="px-8 py-4 bg-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all border-2 border-white/50"
              >
                Learn About ADA Rights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
