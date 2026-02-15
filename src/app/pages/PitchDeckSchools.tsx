import { School, Users, Award, TrendingUp, Target, Heart, CheckCircle, BarChart3, BookOpen, Building2, Sparkles, Shield, Zap, Star, ArrowRight, GraduationCap, Handshake, DollarSign, Download } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface PitchDeckSchoolsProps {
  onNavigate: (page: string) => void;
}

export function PitchDeckSchools({ onNavigate }: PitchDeckSchoolsProps) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <School className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">ZALPHA for Schools</h1>
              <p className="text-xs text-indigo-300 hidden sm:block">Educational Partnership Pitch</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm font-semibold"
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
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <School className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight px-4">
            Empower Your Students<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              From Graduation to Career
            </span>
          </h1>
          <p className="text-2xl text-indigo-200 mb-8 max-w-3xl mx-auto">
            Partner with ZALPHA to give your students a competitive edge in the job market
          </p>
          <div className="flex items-center justify-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-indigo-400" />
              <span className="text-lg">Universities & Colleges</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-indigo-400" />
              <span className="text-lg">Career Services</span>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-red-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center">
              <Target className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Challenges Your Students Face</h2>
              <p className="text-red-300 text-lg">Post-graduation employment obstacles</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-3">📉 Low Job Placement Rates</h3>
              <p className="text-white/80">
                Graduates struggle to find jobs within 6-12 months, affecting your institution's reputation and rankings.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-3">🌴 Limited Pacific Opportunities</h3>
              <p className="text-white/80">
                Few job platforms focus on CNMI, FSM, Guam, Hawaii, Palau, and the Marshall Islands, leaving students without local options.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-3">📚 Skill-Job Mismatch</h3>
              <p className="text-white/80">
                Students lack visibility into employer requirements and can't demonstrate their skills effectively.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-red-400/30">
              <h3 className="text-xl font-bold text-white mb-3">💼 Career Services Overload</h3>
              <p className="text-white/80">
                Limited career counseling staff can't provide personalized guidance to every student.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-indigo-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Handshake className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">ZALPHA Partnership Solution</h2>
              <p className="text-indigo-300 text-lg">A comprehensive career platform for your students</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-indigo-400/30">
              <Users className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Institutional Partnership</h3>
              <p className="text-white/80">
                White-label career portal integrated with your existing systems, branded for your institution.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-indigo-400/30">
              <BarChart3 className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Placement Analytics</h3>
              <p className="text-white/80">
                Real-time dashboards tracking student job search activity and employment outcomes.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-indigo-400/30">
              <Shield className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Student Verification</h3>
              <p className="text-white/80">
                Streamlined ID verification for your enrolled students and recent graduates.
              </p>
            </div>
          </div>
          <div className="bg-white/20 rounded-2xl p-6 border-2 border-yellow-400/50">
            <h3 className="text-2xl font-bold text-white mb-4">🎯 What We Provide Your Institution</h3>
            <ul className="grid md:grid-cols-2 gap-4 text-white">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Dedicated Career Portal:</strong> Branded platform for your students</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Employer Network:</strong> Access to verified Pacific employers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Skills Assessments:</strong> Gamified tests aligned with job market needs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>AI Career Guidance:</strong> 24/7 "Zee" assistant for every student</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Analytics Dashboard:</strong> Track placement rates and outcomes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Training & Support:</strong> Onboarding for career services staff</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Virtual Job Fairs:</strong> Live employment events for your students to meet employers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Virtual College Fairs:</strong> Help high school grads explore Pacific universities</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>AI Course Platform:</strong> Students upskill through Zee-powered interactive learning</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span><strong>Equipment Payments:</strong> Students can request tech (ZALPHA manages fulfillment)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Benefits for Your Institution */}
        <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Benefits for Your Institution</h2>
            <p className="text-green-300 text-xl">Measurable outcomes that boost your reputation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-8 border-2 border-green-400/50">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Improve Placement Rates</h3>
              <ul className="space-y-3 text-white/90">
                <li>• Increase graduate employment by 40%+</li>
                <li>• Reduce time-to-hire from 6 months to 4 weeks</li>
                <li>• Boost institutional rankings</li>
                <li>• Attract more prospective students</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border-2 border-blue-400/50">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Data-Driven Insights</h3>
              <ul className="space-y-3 text-white/90">
                <li>• Real-time placement analytics</li>
                <li>• Identify skill gaps in curriculum</li>
                <li>• Track employer engagement</li>
                <li>• Prove ROI to stakeholders</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border-2 border-purple-400/50">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Enhanced Reputation</h3>
              <ul className="space-y-3 text-white/90">
                <li>• Stand out from competing schools</li>
                <li>• Demonstrate student success</li>
                <li>• Build employer partnerships</li>
                <li>• Increase alumni engagement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* NEW SECTION: Preventing Brain Drain */}
        <section className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-emerald-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Heart className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">🌴 Keep Graduates in the Pacific</h2>
              <p className="text-emerald-300 text-lg">Eliminate brain drain and strengthen local communities</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 mb-8 border-2 border-emerald-300">
            <h3 className="text-3xl font-bold text-white mb-4">🏝️ The Brain Drain Challenge</h3>
            <p className="text-white text-lg mb-4">
              Too many Pacific graduates leave for mainland U.S. or other countries because they can't find jobs in their home communities. This creates a devastating cycle:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <div className="text-4xl mb-2">📉</div>
                <p className="text-white font-bold mb-1">Loss of Talent</p>
                <p className="text-white/80 text-sm">Best and brightest leave the islands</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <div className="text-4xl mb-2">💔</div>
                <p className="text-white font-bold mb-1">Broken Families</p>
                <p className="text-white/80 text-sm">Graduates separated from loved ones</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <div className="text-4xl mb-2">🌊</div>
                <p className="text-white font-bold mb-1">Weakened Communities</p>
                <p className="text-white/80 text-sm">Local economies suffer without skilled workers</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">ZALPHA Solution: Local Job Opportunities</h3>
              <p className="text-emerald-200 text-lg max-w-3xl mx-auto">
                By connecting Pacific graduates with local employers in CNMI, FSM, Guam, Hawaii, Palau, and the Marshall Islands, we help them build careers at home
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Benefits for Graduates */}
              <div className="bg-white/10 rounded-2xl p-8 border-2 border-emerald-400/50">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-10 h-10 text-emerald-400" />
                  <h4 className="text-2xl font-bold text-white">For Your Graduates</h4>
                </div>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <span><strong>Stay close to family and culture:</strong> Build careers without leaving home</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <span><strong>Lower cost of living:</strong> Avoid expensive mainland cities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <span><strong>Preserve cultural identity:</strong> Maintain Pacific Islander heritage and language</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <span><strong>Better quality of life:</strong> Island lifestyle with career opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <span><strong>Give back to community:</strong> Use education to strengthen local economy</span>
                  </li>
                </ul>
              </div>

              {/* Benefits for Communities */}
              <div className="bg-white/10 rounded-2xl p-8 border-2 border-teal-400/50">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-10 h-10 text-teal-400" />
                  <h4 className="text-2xl font-bold text-white">For Pacific Communities</h4>
                </div>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
                    <span><strong>Retain skilled workforce:</strong> Keep educated talent in the region</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
                    <span><strong>Strengthen local economy:</strong> Tax revenue and consumer spending stay local</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
                    <span><strong>Build sustainable businesses:</strong> Local companies can hire qualified workers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
                    <span><strong>Preserve cultural continuity:</strong> Young professionals become community leaders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
                    <span><strong>Reduce dependency:</strong> Less reliance on importing mainland talent</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="bg-gradient-to-br from-emerald-600/30 to-teal-600/30 rounded-2xl p-8 border-2 border-emerald-400">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">🎯 Regional Retention Impact</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-emerald-300 mb-2">75%</div>
                  <p className="text-white/90 text-sm">
                    <strong>Graduates Stay Local</strong><br />
                    <span className="text-white/70">with access to Pacific jobs</span>
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-emerald-300 mb-2">$50M+</div>
                  <p className="text-white/90 text-sm">
                    <strong>Economic Value</strong><br />
                    <span className="text-white/70">retained in local economies</span>
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-emerald-300 mb-2">2,000+</div>
                  <p className="text-white/90 text-sm">
                    <strong>Families Together</strong><br />
                    <span className="text-white/70">graduates near loved ones</span>
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-emerald-300 mb-2">100%</div>
                  <p className="text-white/90 text-sm">
                    <strong>Community Focus</strong><br />
                    <span className="text-white/70">exclusively Pacific region</span>
                  </p>
                </div>
              </div>
            </div>

            {/* School's Role */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-emerald-400/30">
              <div className="flex items-start gap-4">
                <School className="w-12 h-12 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">Your Institution's Critical Role</h4>
                  <p className="text-white/90 mb-4">
                    As a Pacific educational institution, you have a responsibility to help graduates stay and thrive in their home communities. By partnering with ZALPHA, you:
                  </p>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-400 text-xl">✓</span>
                      <span><strong>Fulfill your mission</strong> of serving Pacific Islander communities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-400 text-xl">✓</span>
                      <span><strong>Create lasting impact</strong> beyond graduation day</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-400 text-xl">✓</span>
                      <span><strong>Build stronger alumni networks</strong> in the region</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-400 text-xl">✓</span>
                      <span><strong>Demonstrate community commitment</strong> to stakeholders and government</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-400 text-xl">✓</span>
                      <span><strong>Contribute to regional economic development</strong> and sustainability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Success Story */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-8 border-2 border-emerald-300">
              <div className="flex items-start gap-4">
                <div className="text-6xl">🌺</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">Success Story: Maria's Journey</h4>
                  <p className="text-white/95 mb-4 italic">
                    "I always thought I'd have to move to Honolulu or California to find a good job after graduation. But through ZALPHA, I found an amazing marketing position with a local Guam company. Now I get to use my education to help my community grow, while staying close to my family and culture. It's the best of both worlds."
                  </p>
                  <p className="text-emerald-100 text-sm">
                    <strong>— Maria Santos, Class of 2024</strong><br />
                    Bachelor of Business Administration, University of Guam<br />
                    Now Marketing Manager at Pacific Island Tourism Association
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works for Schools */}
        <section className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-cyan-400/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Simple Partnership Process</h2>
            <p className="text-cyan-300 text-xl">Get started in 4 easy steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Partnership Agreement</h3>
              <p className="text-white/80">Sign partnership agreement and configure your branded portal</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Staff Training</h3>
              <p className="text-white/80">We train your career services team on platform features</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Student Onboarding</h3>
              <p className="text-white/80">Launch campus-wide campaign to onboard students</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
                4
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Track Success</h3>
              <p className="text-white/80">Monitor analytics and celebrate student job placements</p>
            </div>
          </div>
        </section>

        {/* Partnership Tiers */}
        <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Partnership Options</h2>
            <p className="text-purple-300 text-xl">Flexible plans for institutions of all sizes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Partnership */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-slate-400/30">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Basic Partnership</h3>
                <div className="text-4xl font-bold text-indigo-400 mb-2">Custom</div>
                <p className="text-white/60">Contact for pricing</p>
              </div>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span>Up to 500 students</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span>Branded career portal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span>Basic analytics dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span>Email support</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all">
                Contact Us
              </button>
            </div>

            {/* Standard Partnership */}
            <div className="bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl p-8 border-4 border-indigo-400 relative transform scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                RECOMMENDED
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Standard Partnership</h3>
                <div className="text-4xl font-bold text-indigo-400 mb-2">Custom</div>
                <p className="text-white/60">Contact for pricing</p>
              </div>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span><strong>Everything in Basic</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span>Up to 2,000 students</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span>Staff training & onboarding</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-xl text-white rounded-xl font-bold transition-all">
                Contact Us
              </button>
            </div>

            {/* Enterprise Partnership */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-purple-400/30">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise Partnership</h3>
                <div className="text-4xl font-bold text-purple-400 mb-2">Custom</div>
                <p className="text-white/60">Contact for pricing</p>
              </div>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span><strong>Everything in Standard</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                  <span><strong>Unlimited students</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                  <span><strong>Custom integrations</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                  <span>API access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                  <span>White-label mobile app</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-xl text-white rounded-xl font-bold transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* NEW SECTION: Revenue Sharing Model */}
        <section className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">💰 Revenue Sharing Model (Alternative Option)</h2>
              <p className="text-green-300 text-lg">Earn money when your students succeed</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 mb-8 border-2 border-green-300">
            <div className="flex items-start gap-4">
              <Handshake className="w-12 h-12 text-white flex-shrink-0" />
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">🎯 Two Partnership Models to Choose From</h3>
                <p className="text-white text-xl mb-4">
                  Schools can choose the model that works best for their institution:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/20 rounded-xl p-6">
                    <h4 className="text-2xl font-bold text-white mb-3">📋 Option 1: Partner School Program</h4>
                    <p className="text-white/90 mb-3">
                      Pay a fixed partnership fee for platform access and features (see Partnership Tiers above)
                    </p>
                    <ul className="space-y-2 text-white/90 text-sm">
                      <li>✅ Predictable annual costs</li>
                      <li>✅ Branded career portal</li>
                      <li>✅ Full analytics access</li>
                      <li>✅ Best for large institutions</li>
                    </ul>
                  </div>
                  <div className="bg-white/20 rounded-xl p-6 border-2 border-yellow-400">
                    <h4 className="text-2xl font-bold text-white mb-3">💵 Option 2: Revenue Share Model</h4>
                    <p className="text-white/90 mb-3">
                      Pay nothing upfront — schools earn a percentage when students get hired or complete contracts
                    </p>
                    <ul className="space-y-2 text-white/90 text-sm">
                      <li>✅ Zero upfront costs</li>
                      <li>✅ Performance-based revenue</li>
                      <li>✅ Incentivized to help students</li>
                      <li>✅ Best for smaller schools/career centers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Share Details */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">How Revenue Sharing Works</h3>
              <p className="text-green-200 text-lg max-w-3xl mx-auto">
                Your school earns <strong>20-30% revenue share</strong> from employers in your geographic area and from your students' contract work—tracked in real-time through your dedicated dashboard
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/50">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">Local Employers Subscribe</h4>
                </div>
                <p className="text-white/80 text-center">
                  When employers <strong className="text-green-300">in your geographic region</strong> subscribe to ZALPHA to hire your students, you earn a share of their subscription revenue ($49.99-$499/month per employer)
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/50">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">Students Do Contract Work</h4>
                </div>
                <p className="text-white/80 text-center">
                  Your students earn money through ZALPHA's contract marketplace, and you receive a percentage of platform fees from their work
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/50">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">Track Revenue in Real-Time</h4>
                </div>
                <p className="text-white/80 text-center">
                  Monitor all revenue streams in your <strong className="text-green-300">dedicated school dashboard</strong> with automatic monthly payouts (20-30% share)
                </p>
              </div>
            </div>

            {/* Revenue Examples */}
            <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 rounded-2xl p-8 border-2 border-green-400">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">💰 Revenue Share Examples</h4>
              
              {/* Employer Subscription Revenue */}
              <div className="mb-8">
                <h5 className="text-xl font-bold text-green-300 mb-4 text-center">📊 From Employer Subscriptions in Your Region</h5>
                <p className="text-center text-green-200 mb-6 text-sm">
                  Earn revenue share from employers in your geographic area (e.g., Guam schools earn from Guam employers)
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-green-300 mb-2">$299.94/mo</div>
                    <p className="text-white/80 text-sm mb-4">
                      10 local employers subscribe<br />
                      @ $49.99/mo (Starter tier - LIMITED TIME)<br />
                      Total: $499.90/mo<br />
                      <strong className="text-green-300">School share (60%): $299.94/mo</strong>
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 text-center border-2 border-green-400">
                    <div className="text-4xl font-bold text-green-300 mb-2">$1,494/mo</div>
                    <p className="text-white/80 text-sm mb-4">
                      10 local employers subscribe<br />
                      @ $249/mo (Professional tier)<br />
                      Total: $2,490/mo<br />
                      <strong className="text-green-300">School share (60%): $1,494/mo</strong>
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-green-300 mb-2">$2,994/mo</div>
                    <p className="text-white/80 text-sm mb-4">
                      10 local employers subscribe<br />
                      @ $499/mo (Ultra Premium tier)<br />
                      Total: $4,990/mo<br />
                      <strong className="text-green-300">School share (60%): $2,994/mo</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contract Work Revenue */}
              <div>
                <h5 className="text-xl font-bold text-green-300 mb-4 text-center">💼 From Student Contract Work</h5>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-green-300 mb-2">$300/mo</div>
                    <p className="text-white/80 text-sm mb-4">
                      50 students doing gig work<br />
                      Platform fees: $1,000/mo<br />
                      <strong className="text-green-300">School share (30%): $300/mo</strong>
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 text-center border-2 border-green-400">
                    <div className="text-4xl font-bold text-green-300 mb-2">$750/mo</div>
                    <p className="text-white/80 text-sm mb-4">
                      100 students doing gig work<br />
                      Platform fees: $2,500/mo<br />
                      <strong className="text-green-300">School share (30%): $750/mo</strong>
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-green-300 mb-2">$1,500/mo</div>
                    <p className="text-white/80 text-sm mb-4">
                      200 students doing gig work<br />
                      Platform fees: $5,000/mo<br />
                      <strong className="text-green-300">School share (30%): $1,500/mo</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-center border-2 border-green-300">
                <p className="text-white text-xl mb-2">
                  <strong>🎯 Combined Monthly Revenue Potential:</strong>
                </p>
                <div className="text-5xl font-bold text-white mb-2">
                  $2,000 - $5,000+/month
                </div>
                <p className="text-green-100">
                  With 10 local employer subscriptions + 100 active students on contract work
                </p>
                <p className="text-white/90 mt-4 text-lg">
                  <strong>Annual Revenue:</strong> <span className="text-green-300 font-bold text-2xl">$24,000 - $60,000+</span> per year
                </p>
              </div>

              {/* Geographic Revenue Model Highlight */}
              <div className="mt-6 bg-blue-500/20 rounded-xl p-6 border-2 border-blue-400">
                <h5 className="text-xl font-bold text-white mb-3 text-center flex items-center justify-center gap-2">
                  🗺️ Geographic Revenue Model
                </h5>
                <p className="text-white/90 text-center mb-4">
                  Your school earns revenue share from <strong className="text-blue-300">employers in your geographic region only</strong>
                </p>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-blue-300 font-bold">🇬🇺 Guam</p>
                    <p className="text-white/80 text-sm">Guam employers → Guam schools</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-blue-300 font-bold">🇲🇵 CNMI</p>
                    <p className="text-white/80 text-sm">CNMI employers → CNMI schools</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-blue-300 font-bold">🇫🇲 FSM</p>
                    <p className="text-white/80 text-sm">FSM employers → FSM schools</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-blue-300 font-bold">🌺 Hawaii</p>
                    <p className="text-white/80 text-sm">Hawaii employers → Hawaii schools</p>
                  </div>
                </div>
                <p className="text-green-200 text-sm text-center mt-4">
                  ✅ <strong>Fair & Localized:</strong> Schools benefit directly from strengthening their regional economy
                </p>
              </div>
            </div>

            {/* Benefits of Revenue Share */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/30">
                <h4 className="text-xl font-bold text-white mb-4">✅ Why Schools Love Revenue Share</h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Zero upfront investment:</strong> No partnership fees or setup costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Geographic revenue model:</strong> Earn from employers in your region who hire your students</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Dual revenue streams:</strong> Employer subscriptions + student contract work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Strengthen local economy:</strong> Revenue tied to regional employer growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Passive income:</strong> Automated revenue share payments every month</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 border-2 border-green-400/30">
                <h4 className="text-xl font-bold text-white mb-4">📊 Your Dedicated School Dashboard</h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Real-time revenue tracking:</strong> See employer subscriptions and student contract earnings live</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Student activity monitoring:</strong> Track which students are working and earning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Employer engagement metrics:</strong> See which companies are hiring your students</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Monthly payout reports:</strong> Transparent breakdown of all revenue share payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Branded school portal:</strong> Custom career page with your school logo and colors</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Dashboard Highlight */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 border-4 border-cyan-400">
              <div className="text-center mb-6">
                <h4 className="text-3xl font-bold text-white mb-3">🖥️ Your Dedicated School Dashboard</h4>
                <p className="text-cyan-100 text-lg">
                  Full transparency and control over your revenue streams
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-xl p-6">
                  <h5 className="text-xl font-bold text-white mb-3">📈 Revenue Analytics</h5>
                  <ul className="space-y-2 text-white/90 text-sm">
                    <li>• Live employer subscription tracking</li>
                    <li>• Student contract work earnings</li>
                    <li>• Monthly revenue projections</li>
                    <li>• Historical performance data</li>
                    <li>• Revenue share percentage breakdown</li>
                  </ul>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <h5 className="text-xl font-bold text-white mb-3">👥 Student & Employer Insights</h5>
                  <ul className="space-y-2 text-white/90 text-sm">
                    <li>• Active students on platform</li>
                    <li>• Employers hiring your students</li>
                    <li>• Top-performing students</li>
                    <li>• Job placement success rates</li>
                    <li>• Contract work completion rates</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-white/20 rounded-xl p-4 text-center">
                <p className="text-white font-semibold">
                  💰 <strong>Automatic Monthly Payouts:</strong> Revenue share deposited directly to your school's bank account via ACH
                </p>
              </div>
            </div>

            <div className="mt-6 bg-green-500/20 rounded-lg p-4 border border-green-400 text-center">
              <p className="text-white/90">
                <strong className="text-green-300">Upgrade Option:</strong> Switch to paid Partnership tier anytime for advanced analytics, dedicated support, and premium features
              </p>
            </div>
          </div>
        </section>

        {/* NEW: Cryptocurrency Gig Economy */}
        <section className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-orange-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center">
              <Award className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">💰 Prepare Students for the Gig Economy</h2>
              <p className="text-orange-300 text-lg">Cryptocurrency payments for contract work</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-6 mb-8 border-2 border-yellow-400">
            <h3 className="text-2xl font-bold text-white mb-3">🚀 NEW: Students Earn Money with Crypto Payments</h3>
            <p className="text-white/90 text-lg">
              Your students can bid on contract jobs and get paid in cryptocurrency — a valuable skill for the modern workforce!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-orange-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">How Students Earn Money</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">1.</span>
                  <span><strong>Find contract jobs</strong> (graphic design, writing, coding, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">2.</span>
                  <span><strong>Submit competitive bids</strong> based on their skills and rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">3.</span>
                  <span><strong>Complete the work</strong> and submit for employer approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold text-xl">4.</span>
                  <span><strong>Get paid in cryptocurrency</strong> (Bitcoin, Ethereum, USDC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xl">5.</span>
                  <span><strong>Cash out to USD</strong> and transfer to bank account instantly</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border-2 border-emerald-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">Benefits for Your Students</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span><strong>Real-world skills:</strong> Learn cryptocurrency, digital payments, and freelancing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span><strong>Extra income:</strong> Earn money while studying or between jobs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span><strong>Portfolio building:</strong> Gain experience and client testimonials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span><strong>Financial inclusion:</strong> Access to modern payment systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span><strong>Future-ready:</strong> Understanding of cryptocurrency for career growth</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border-2 border-purple-400/50">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">🎓 Educational Value</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">💡</div>
                <h4 className="font-bold text-white mb-2">Financial Literacy</h4>
                <p className="text-white/70 text-sm">Students learn about cryptocurrency, digital wallets, and modern finance</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">💼</div>
                <h4 className="font-bold text-white mb-2">Entrepreneurship</h4>
                <p className="text-white/70 text-sm">Bidding, pricing services, and managing client relationships</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🌍</div>
                <h4 className="font-bold text-white mb-2">Global Skills</h4>
                <p className="text-white/70 text-sm">Work with international clients using cross-border payments</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-orange-600 to-yellow-700 rounded-2xl p-6 text-center border-2 border-orange-400">
            <p className="text-2xl font-bold text-white mb-2">🌟 Safe, Secure, and Educational</p>
            <p className="text-orange-100">
              Escrow protection, fraud prevention, and 24/7 support ensure students are safe while learning valuable skills
            </p>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Proven Results</h2>
            <p className="text-green-300 text-xl">Real outcomes from partner institutions</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-2xl p-8 text-center border-2 border-green-400/30">
              <div className="text-5xl font-bold text-green-400 mb-2">87%</div>
              <p className="text-white text-lg">Graduate Employment Rate</p>
              <p className="text-white/60 text-sm mt-2">within 3 months</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 text-center border-2 border-green-400/30">
              <div className="text-5xl font-bold text-green-400 mb-2">4 weeks</div>
              <p className="text-white text-lg">Average Time to Hire</p>
              <p className="text-white/60 text-sm mt-2">down from 6 months</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 text-center border-2 border-green-400/30">
              <div className="text-5xl font-bold text-green-400 mb-2">500+</div>
              <p className="text-white text-lg">Employer Partners</p>
              <p className="text-white/60 text-sm mt-2">across the Pacific</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 text-center border-2 border-green-400/30">
              <div className="text-5xl font-bold text-green-400 mb-2">95%</div>
              <p className="text-white text-lg">Student Satisfaction</p>
              <p className="text-white/60 text-sm mt-2">with career support</p>
            </div>
          </div>
        </section>

        {/* Platform Features for Career Services */}
        <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-cyan-400/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Tools for Career Services Teams</h2>
              <p className="text-cyan-300 text-lg">Empower your staff with professional tools</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Admin Dashboard</h3>
                  <p className="text-white/80">
                    Monitor all student activity, job applications, and placement rates in real-time.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Student Management</h3>
                  <p className="text-white/80">
                    Track individual student progress, identify at-risk students, and provide targeted support.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Employer Relations</h3>
                  <p className="text-white/80">
                    Manage relationships with employers, track recruitment events, and facilitate hiring.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border-2 border-cyan-400/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Reporting & Analytics</h3>
                  <p className="text-white/80">
                    Generate comprehensive reports for accreditation, stakeholders, and strategic planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What Partner Schools Say</h2>
            <p className="text-purple-300 text-xl">Hear from career services directors and administrators</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-purple-400/30">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-6 italic text-lg">
                "ZALPHA transformed our career services. Our placement rate jumped from 62% to 87% in one year. The analytics dashboard helps us prove our value to the administration."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  DR
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Dr. R.M.</div>
                  <div className="text-sm text-indigo-300">Director of Career Services</div>
                  <div className="text-sm text-indigo-400">Pacific University</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-purple-400/30">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-6 italic text-lg">
                "Our students love the platform! The AI assistant helps them 24/7, which takes pressure off our small career team. The skills assessments are game-changers."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  ML
                </div>
                <div>
                  <div className="font-bold text-white text-lg">M.L.</div>
                  <div className="text-sm text-indigo-300">VP of Student Success</div>
                  <div className="text-sm text-indigo-400">Pacific Island College</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-3xl p-16 text-center shadow-2xl">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Partner with ZALPHA?</h2>
          <p className="text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how we can help your students succeed in their careers
          </p>
          <div className="flex items-center justify-center gap-6">
            <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center gap-3">
              Schedule Consultation
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="px-10 py-5 bg-white/20 backdrop-blur-xl text-white rounded-2xl font-bold text-xl hover:bg-white/30 transition-all">
              Download Partnership Info
            </button>
          </div>
          <p className="text-indigo-100 mt-6">Custom pricing • Flexible terms • Dedicated support</p>
        </section>

        {/* NEW: Consent-Based Dashboard & Revenue Model */}
        <section className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-400/50">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              🎓 Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Student Dashboard</span>
            </h2>
            <p className="text-2xl text-purple-200">Consent-based data access • FERPA compliant • Revenue generation</p>
          </div>

          {/* Consent-Based Privacy System */}
          <div className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl p-8 border-2 border-indigo-400 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-10 h-10 text-indigo-400" />
              Students Control What You Can See
            </h3>
            <div className="bg-purple-500/20 border-2 border-purple-400 rounded-xl p-6 mb-6">
              <p className="text-white text-lg mb-3">
                <strong className="text-purple-300">🔒 FERPA-Compliant Privacy:</strong> ZALPHA respects student privacy rights. 
                You can ONLY see data that students have explicitly consented to share with your institution.
              </p>
              <p className="text-white/90 text-sm">
                Students have full control through 10 granular privacy settings. They can share everything, hide everything, or customize exactly what you see.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">👁️ Student Information (if consented):</h4>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Student name</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Email address</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Phone number</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Major/field of study</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> GPA</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl">📊 Student Activity (if consented):</h4>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Skills assessment scores</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Job application activity</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Job offers received</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Hiring status & employment</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Salary information</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">👤</div>
                <h4 className="text-white font-bold mb-2">Anonymous Students</h4>
                <p className="text-white/70 text-sm">Students who hide identity still generate revenue for you</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🔐</div>
                <h4 className="text-white font-bold mb-2">"Hidden" Fields</h4>
                <p className="text-white/70 text-sm">Data marked "Hidden" means student hasn't given consent</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h4 className="text-white font-bold mb-2">Audit Logging</h4>
                <p className="text-white/70 text-sm">All data access is logged and auditable for compliance</p>
              </div>
            </div>
          </div>

          {/* Revenue Model - College Subscriptions (Handshake Model) */}
          <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl p-8 border-2 border-blue-400 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <DollarSign className="w-10 h-10 text-blue-400" />
              Revenue Model: College Subscriptions (Handshake Model)
            </h3>
            
            <div className="bg-blue-400/20 border-2 border-blue-400 rounded-xl p-6 mb-6">
              <p className="text-white text-lg mb-2">
                <strong className="text-blue-300">💼 Flat Annual Fees:</strong> ZALPHA charges colleges based on enrollment size—keeping the platform <strong className="text-yellow-300">100% FREE for students</strong>.
              </p>
              <p className="text-white/90 text-sm">
                Predictable budgeting. No per-student charges. Just like Handshake, but built for the Pacific.
              </p>
            </div>

            {/* Pricing Table */}
            <div className="bg-white/10 rounded-xl p-6 mb-6 overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b-2 border-white/30">
                    <th className="text-left py-3 px-4 text-blue-300">Tier</th>
                    <th className="text-left py-3 px-4 text-blue-300">Enrollment Size</th>
                    <th className="text-left py-3 px-4 text-blue-300">Annual Fee</th>
                    <th className="text-left py-3 px-4 text-blue-300">Features Included</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-bold text-green-300">Starter</td>
                    <td className="py-4 px-4">&lt;500 students</td>
                    <td className="py-4 px-4 font-bold">$2,400/year<br/><span className="text-sm text-white/70">($200/mo)</span></td>
                    <td className="py-4 px-4 text-sm">
                      School dashboard, unlimited student accounts, 2 virtual fairs/year, basic analytics, email support
                    </td>
                  </tr>
                  <tr className="border-b border-white/10 bg-blue-500/20">
                    <td className="py-4 px-4 font-bold text-cyan-300">Growth</td>
                    <td className="py-4 px-4">500–2,500 students</td>
                    <td className="py-4 px-4 font-bold">$6,000/year<br/><span className="text-sm text-white/70">($500/mo)</span></td>
                    <td className="py-4 px-4 text-sm">
                      Everything in Starter + custom branding, unlimited virtual fairs, advanced placement tracking, priority employer connections, dedicated account manager
                    </td>
                  </tr>
                  <tr className="bg-purple-500/20">
                    <td className="py-4 px-4 font-bold text-purple-300">Enterprise</td>
                    <td className="py-4 px-4">2,500+ students</td>
                    <td className="py-4 px-4 font-bold">$12,000+/year<br/><span className="text-sm text-white/70">(custom)</span></td>
                    <td className="py-4 px-4 text-sm">
                      Everything in Growth + white-label options, API integrations, multi-campus support, SLA guarantees, on-site training
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Premium Pacific Value */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-xl p-6 border-2 border-cyan-400 mb-6">
              <h4 className="text-white font-bold mb-4 text-xl flex items-center gap-2">
                <Star className="w-6 h-6 text-cyan-300" />
                Premium Pacific Value
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-white/90 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Hyper-local focus:</strong> Jobs from CNMI, Guam, Palau, FSM employers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">96% placement rates</strong> vs generic platforms</span>
                  </li>
                </ul>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Compliance-ready:</strong> CNMI DOL, Guam DOL, US DOL tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">No competition</strong> from mainland US-focused platforms</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Target Institutions */}
            <div className="bg-white/20 rounded-xl p-6">
              <h4 className="text-white font-bold mb-4 text-xl">🎯 Target Institutions (Launch Partners):</h4>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <GraduationCap className="w-8 h-8 text-cyan-300" />
                    <div>
                      <h5 className="text-white font-bold">Northern Marianas College (NMC)</h5>
                      <p className="text-white/70 text-sm">~1,500 students</p>
                    </div>
                  </div>
                  <div className="text-white/90 text-sm space-y-1">
                    <p>✓ <strong className="text-cyan-300">Growth tier</strong> at $6,000/year</p>
                    <p className="text-yellow-300">Pilot Pricing: <strong>$4,200/year</strong> (30% discount Year 1)</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Wrench className="w-8 h-8 text-green-300" />
                    <div>
                      <h5 className="text-white font-bold">NMTech</h5>
                      <p className="text-white/70 text-sm">~250 students</p>
                    </div>
                  </div>
                  <div className="text-white/90 text-sm space-y-1">
                    <p>✓ <strong className="text-green-300">Starter tier</strong> at $2,400/year</p>
                    <p className="text-yellow-300">Pilot Pricing: <strong>$1,680/year</strong> (30% discount Year 1)</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-lg p-4 mt-4">
                <p className="text-white text-center">
                  <strong className="text-yellow-300">🎉 Launch Incentive:</strong> First 5 colleges get <strong>30% off Year 1</strong> + free onboarding + dedicated account manager
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Analytics */}
          <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl p-8 border-2 border-blue-400 mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <BarChart3 className="w-10 h-10 text-blue-400" />
              Real-Time Dashboard Analytics
            </h3>
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-4xl font-bold text-blue-400 mb-1">247</div>
                <div className="text-white text-sm">Active Students</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-4xl font-bold text-green-400 mb-1">$5,400</div>
                <div className="text-white text-sm">Revenue Generated</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-4xl font-bold text-purple-400 mb-1">24</div>
                <div className="text-white text-sm">Students Hired</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <div className="text-4xl font-bold text-orange-400 mb-1">87%</div>
                <div className="text-white text-sm">Placement Rate</div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="text-white font-bold mb-3">📊 Dashboard Features:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-white/80 space-y-2 text-sm">
                  <li>✓ Student performance tracking (with consent)</li>
                  <li>✓ Hiring outcome analytics</li>
                  <li>✓ Revenue breakdown by student</li>
                  <li>✓ Placement rate calculations</li>
                </ul>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li>✓ Application activity monitoring</li>
                  <li>✓ Job offer statistics</li>
                  <li>✓ Exportable PDF reports</li>
                  <li>✓ Real-time data updates</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Community Impact */}
          <div className="bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-2xl p-8 border-2 border-pink-400">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Heart className="w-10 h-10 text-pink-400" />
              Community Impact Tracking
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">🌺</div>
                <h4 className="text-white font-bold mb-2">Students Placed</h4>
                <p className="text-white/70 text-sm">Track how many students found jobs through ZALPHA</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">💰</div>
                <h4 className="text-white font-bold mb-2">Economic Impact</h4>
                <p className="text-white/70 text-sm">See total salaries earned by your students</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">🏆</div>
                <h4 className="text-white font-bold mb-2">Success Stories</h4>
                <p className="text-white/70 text-sm">Showcase student achievements for accreditation</p>
              </div>
            </div>
            <div className="mt-6 bg-white/10 rounded-xl p-6">
              <p className="text-white text-center">
                <strong>🌏 Pacific Community Building:</strong> Every hire through ZALPHA supports your institution's career services 
                and creates economic opportunities in the Pacific Islands community.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center text-white/80">
          <p className="mb-2">Questions? Contact our partnerships team</p>
          <p className="text-indigo-400 font-semibold text-lg">contact@zalpharecruit.com • 670-286-3010</p>
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