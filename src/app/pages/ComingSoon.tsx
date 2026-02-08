import { Smartphone, Star, Rocket, Clock, CheckCircle, ArrowRight, Bell, Sparkles, Zap, Globe, Users, Award, School } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { NativeAppPrototype } from '@/app/components/NativeAppPrototype';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';
import { MetgotLogoWithText } from '@/app/components/MetgotLogo';

interface ComingSoonProps {
  onNavigate: (page: string) => void;
}

export function ComingSoon({ onNavigate }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Coming Soon</h1>
                <p className="text-xs text-pink-300 hidden sm:block">Beta Testing & Upcoming Features</p>
              </div>
            </div>
            <BackButton onNavigate={onNavigate} label="Back to Demo" />
          </div>
        </div>
      </div>

      <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl mb-4 sm:mb-6 animate-pulse">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="text-sm sm:text-lg font-bold text-white">🚀 BETA TESTING PHASE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 drop-shadow-2xl px-4">
              The Future is
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mt-2">
                Coming Soon
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto drop-shadow-lg leading-relaxed px-4">
              We're currently in beta testing across CNMI. Join our waitlist to be notified when we launch in your region!
            </p>
          </div>

          {/* Beta Status & Timeline - Collapsible */}
          <CollapsibleSection
            title="Launch Timeline & Beta Status"
            subtitle="Our roadmap from beta to full Pacific Islands rollout"
            icon={<Clock className="w-8 h-8 text-green-400" />}
            colorScheme="green"
            defaultOpen={true}
          >
            <div className="p-4 space-y-6">
              {/* Beta Status Banner */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 sm:border-4 border-white/50 shadow-2xl">
                <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <p className="text-white font-bold text-sm sm:text-lg">Phase 1</p>
                    <p className="text-white/80 text-xs sm:text-sm">Beta Testing</p>
                  </div>
                  <div className="text-2xl sm:text-4xl text-white">→</div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <p className="text-white font-bold text-sm sm:text-lg">CNMI Launch</p>
                    <p className="text-white/80 text-xs sm:text-sm">500 Students</p>
                  </div>
                  <div className="text-2xl sm:text-4xl text-white">→</div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <p className="text-white font-bold text-sm sm:text-lg">Full Rollout</p>
                    <p className="text-white/80 text-xs sm:text-sm">All 6 Islands</p>
                  </div>
                </div>
              </div>

              {/* Launch Timeline Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-cyan-400/50">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Now: CNMI Beta</h3>
                  <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4">
                    Currently testing with 500 students in Saipan, Tinian, and Rota. Gathering feedback and refining features.
                  </p>
                  <div className="bg-green-500/20 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-green-400/50">
                    <p className="text-green-300 font-semibold text-xs sm:text-sm">✓ In Progress</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-purple-400/50">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Q2 2026: Guam Launch</h3>
                  <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4">
                    Expanding to Guam with University of Guam partnership. Target: 5,000 student signups and 200 employers.
                  </p>
                  <div className="bg-yellow-500/20 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-yellow-400/50">
                    <p className="text-yellow-300 font-semibold text-xs sm:text-sm">⏳ Coming Soon</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-pink-400/50 sm:col-span-2 lg:col-span-1">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                    <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Q3-Q4 2026: Full Rollout</h3>
                  <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4">
                    Complete expansion to Hawaii, Palau, Marshall Islands, and FSM. All 6 Pacific territories live!
                  </p>
                  <div className="bg-blue-500/20 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-blue-400/50">
                    <p className="text-blue-300 font-semibold text-xs sm:text-sm">📅 Planned</p>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Native Mobile App - Collapsible */}
          <CollapsibleSection
            title="Native Mobile App"
            subtitle="Coming to iOS & Android - Full experience on mobile"
            icon={<Smartphone className="w-8 h-8 text-purple-400" />}
            colorScheme="purple"
          >
            <div className="p-4">
              <div className="bg-gradient-to-br from-purple-400 via-pink-400 to-orange-500 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-white border-2 sm:border-4 border-white/50 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <div className="absolute top-0 right-0 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <NativeAppPrototype onNavigate={onNavigate} />
                </div>
              </div>
              <p className="text-center text-white/80 mt-4 text-sm sm:text-base">
                The full ZALPHA experience, optimized for mobile devices with offline capabilities and push notifications.
              </p>
            </div>
          </CollapsibleSection>

          {/* Upcoming Features - Collapsible */}
          <CollapsibleSection
            title="What's Coming Next"
            subtitle="Features currently in development"
            icon={<Sparkles className="w-8 h-8 text-cyan-400" />}
            colorScheme="cyan"
          >
            <div className="p-4">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-indigo-400/50">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">AI Job Matching</h3>
                  </div>
                  <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4">
                    Advanced AI algorithms to match students with perfect job opportunities based on skills, location, and preferences.
                  </p>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">Q3 2026</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-pink-400/50">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">Certification Programs</h3>
                  </div>
                  <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4">
                    Industry-recognized certifications for high-demand skills like hospitality, healthcare, and technology.
                  </p>
                  <div className="flex items-center gap-2 text-pink-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">Q3 2026</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-cyan-400/50">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">Multilingual Support</h3>
                  </div>
                  <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4">
                    Platform translations for Chamorro, Carolinian, Chuukese, Marshallese, and other Pacific Island languages.
                  </p>
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">Q4 2026</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-green-400/50">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">Mentorship Program</h3>
                  </div>
                  <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4">
                    Connect with industry professionals and successful alumni for career guidance and mentorship.
                  </p>
                  <div className="flex items-center gap-2 text-green-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">Q4 2026</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-yellow-400/50">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <School className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">Student Recruitment</h3>
                  </div>
                  <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4">
                    Universities and colleges can recruit students directly through ZALPHA, with admission management tools and virtual campus tours.
                  </p>
                  <div className="flex items-center gap-2 text-yellow-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">Q3 2026</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-purple-400/50">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">Admission Management</h3>
                  </div>
                  <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4">
                    Complete admission application system for educational institutions to manage applications, transcripts, and enrollment.
                  </p>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">Q3 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Sister Platform: Metgot Global - Collapsible */}
          <CollapsibleSection
            title="Metgot Global: Coming Soon"
            subtitle="Job connections for all age demographics across Pacific Islands"
            icon={<Globe className="w-8 h-8 text-cyan-400" />}
            colorScheme="cyan"
          >
            <div className="p-4">
              <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-white border-2 sm:border-4 border-white/50 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <div className="absolute top-0 right-0 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6 sm:mb-8">
                    {/* Metgot Global Logo */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <MetgotLogoWithText size="large" orientation="vertical" className="drop-shadow-2xl" />
                    </div>
                    
                    <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
                      <span className="text-sm sm:text-lg font-bold text-white">LAUNCHING Q2 2026</span>
                    </div>
                    <p className="text-lg sm:text-xl text-white/90 mb-4 sm:mb-6">
                      The sister platform to ZALPHA - connecting experienced professionals and all age demographics across the Pacific Islands
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
                        <h4 className="font-bold text-white text-base sm:text-lg">All Ages Welcome</h4>
                      </div>
                      <p className="text-white/80 text-sm sm:text-base">
                        No age restrictions - connect experienced professionals, mid-career changers, and mature workers with opportunities
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
                        <h4 className="font-bold text-white text-base sm:text-lg">Industry Veterans</h4>
                      </div>
                      <p className="text-white/80 text-sm sm:text-base">
                        Specialized matching for professionals with 5+ years of experience in their field
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
                        <h4 className="font-bold text-white text-base sm:text-lg">Pacific-Wide Network</h4>
                      </div>
                      <p className="text-white/80 text-sm sm:text-base">
                        Connect professionals across all Pacific Island territories with regional employers
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
                        <h4 className="font-bold text-white text-base sm:text-lg">Advanced Matching</h4>
                      </div>
                      <p className="text-white/80 text-sm sm:text-base">
                        AI-powered job matching based on decades of experience, skills, and career goals
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-white/30 text-center">
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                      ZALPHA + Metgot Global = Complete Pacific Workforce
                    </h4>
                    <p className="text-white/90 text-sm sm:text-base mb-4">
                      Together, these platforms cover the entire career spectrum - from recent graduates to seasoned professionals
                    </p>
                    <div className="inline-flex items-center gap-2 text-yellow-300 font-semibold text-sm sm:text-base">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Target Launch: Q2 2026</span>
                    </div>
                  </div>

                  {/* Metgot Global Waitlist Signup */}
                  <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-white/50 shadow-2xl mt-6 sm:mt-8">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
                        Join the Metgot Global Waitlist
                      </h4>
                      <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto">
                        Be among the first to know when Metgot Global launches. Get exclusive early access for experienced professionals!
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base w-full sm:w-80 border-2 border-white/30 focus:border-white focus:outline-none text-gray-900"
                        />
                        <button className="bg-white text-orange-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base hover:scale-105 transition-all shadow-xl flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center">
                          Sign Me Up!
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                      <p className="text-white/80 text-xs sm:text-sm mt-3 sm:mt-4">
                        ✓ Exclusive updates  •  ✓ Priority access  •  ✓ No spam
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Beta Tester Benefits - Collapsible */}
          <CollapsibleSection
            title="Beta Tester Benefits"
            subtitle="Exclusive perks for early adopters"
            icon={<Star className="w-8 h-8 text-yellow-400" />}
            colorScheme="orange"
          >
            <div className="p-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-4 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Star className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Early Access</h4>
                  <p className="text-white/70 text-xs sm:text-sm">
                    Be among the first to use new features before public release
                  </p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Free Premium</h4>
                  <p className="text-white/70 text-xs sm:text-sm">
                    6 months of premium features absolutely free for beta testers
                  </p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 sm:col-span-2 lg:col-span-1">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Shape the Platform</h4>
                  <p className="text-white/70 text-xs sm:text-sm">
                    Your feedback directly influences product development
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Join Waitlist CTA - Always Visible */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border-2 sm:border-4 border-white/50 mt-8 sm:mt-12">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Join the Waitlist</h3>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Be the first to know when ZALPHA launches in your region. Get exclusive early access and special perks!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg w-full sm:w-96 border-2 sm:border-4 border-white/30 focus:border-white focus:outline-none"
                />
                <button className="bg-white text-purple-700 px-8 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:scale-105 transition-all shadow-2xl flex items-center gap-2 sm:gap-3 whitespace-nowrap w-full sm:w-auto justify-center">
                  Join Waitlist
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <p className="text-white/70 text-xs sm:text-sm mt-4 sm:mt-6">
                ✓ No spam, ever  •  ✓ Exclusive updates  •  ✓ Early access perks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}