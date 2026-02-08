import { School, DollarSign, TrendingUp, CreditCard, FileText, Users, Award, ArrowRight, CheckCircle, Shield, Crown, Video, Lock, Zap, Link as LinkIcon, GraduationCap, Heart, Briefcase, Monitor, Smartphone, Tablet, Globe, BookOpen, Brain, Calendar, Sparkles, Rocket } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface DemoShowcaseProps {
  onNavigate: (page: string) => void;
}

export function DemoShowcase({ onNavigate }: DemoShowcaseProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 py-12 px-6 relative overflow-hidden">
      <BackButton onNavigate={onNavigate} destination="landing" />
      {/* Ocean Wave Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 50 Q 25 40, 50 50 T 100 50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                <path d="M0 60 Q 25 50, 50 60 T 100 60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)"/>
          </svg>
        </div>
      </div>

      {/* Floating Bubbles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-200/30 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-blue-200/25 rounded-full animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white/15 rounded-full animate-bounce" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl mb-6 border-4 border-cyan-300">
            <School className="w-8 h-8 text-cyan-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">ZALPHA Platform Demo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg px-4">
            Explore All Features
          </h1>
          <p className="text-xl text-white/95 max-w-3xl mx-auto drop-shadow-md">
            Discover features organized by user type - Students, Employers, and Platform-wide tools
          </p>
        </div>

        {/* HEYGEN AI VIDEO AVATARS - NEW FEATURE HIGHLIGHT */}
        <div className="mb-16">
          <button
            onClick={() => onNavigate('heygen-demo')}
            className="w-full bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 rounded-3xl shadow-2xl p-8 sm:p-12 text-white border-4 border-cyan-300 relative overflow-hidden hover:scale-[1.02] transition-all group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-3 bg-cyan-300/30 backdrop-blur-sm px-6 py-3 rounded-full mb-4 border-2 border-cyan-300">
                <Video className="w-6 h-6 text-cyan-100" />
                <span className="text-lg sm:text-xl font-bold text-cyan-100">NEW: AI VIDEO AVATARS POWERED BY HEYGEN</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg mb-4">
                🎬 Create AI Video Avatars
              </h2>
              <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto mb-6">
                Generate professional AI-powered video avatars for Zee AI career assistant, recruiter introductions, career fair booths, and educational tutorials
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="text-4xl mb-2">🤖</div>
                  <div className="font-bold text-lg">Zee AI Assistant</div>
                  <div className="text-sm text-white/80">Career guidance videos</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="text-4xl mb-2">💼</div>
                  <div className="font-bold text-lg">Recruiter Videos</div>
                  <div className="text-sm text-white/80">Employer introductions</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="text-4xl mb-2">🎪</div>
                  <div className="font-bold text-lg">Career Fair Booths</div>
                  <div className="text-sm text-white/80">Virtual booth welcomes</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="text-4xl mb-2">📚</div>
                  <div className="font-bold text-lg">Tutorial Videos</div>
                  <div className="text-sm text-white/80">Educational content</div>
                </div>
              </div>
              
              <div className="mt-8 inline-flex items-center gap-2 text-2xl font-bold bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl border-2 border-white/50 group-hover:scale-110 transition-transform">
                <span>Try HeyGen AI Avatars Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* BETA USER DEMO - SPECIAL HIGHLIGHT */}
        <div className="mb-16">
          <button
            onClick={() => onNavigate('beta-user-demo')}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl shadow-2xl p-8 sm:p-12 text-white border-4 border-yellow-300 relative overflow-hidden hover:scale-[1.02] transition-all group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-3 bg-yellow-300/30 backdrop-blur-sm px-6 py-3 rounded-full mb-4 border-2 border-yellow-300">
                <Crown className="w-6 h-6 text-yellow-300" />
                <span className="text-lg sm:text-xl font-bold text-yellow-100">NEW: BETA TESTER EXPERIENCE</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg mb-4">
                Experience the Beta Tester Program
              </h2>
              <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto mb-6">
                See what beta testers experience across all user types - Students, Employers, Career Services, and Person with Disabilities participants
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="text-4xl mb-2">🎓</div>
                  <div className="font-bold text-lg">Student Beta</div>
                  <div className="text-sm text-white/80">6 months FREE premium</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="text-4xl mb-2">💼</div>
                  <div className="font-bold text-lg">Employer Beta</div>
                  <div className="text-sm text-white/80">Enterprise features</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="text-4xl mb-2">🏫</div>
                  <div className="font-bold text-lg">Career Services</div>
                  <div className="text-sm text-white/80">Institutional access</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="text-4xl mb-2">💜</div>
                  <div className="font-bold text-lg">Person with Disabilities Beta</div>
                  <div className="text-sm text-white/80">Accessibility focus</div>
                </div>
              </div>
              
              <div className="mt-8 inline-flex items-center gap-2 text-2xl font-bold bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl border-2 border-white/50 group-hover:scale-110 transition-transform">
                <span>Explore Beta Experience</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* STUDENT FEATURES */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-2xl shadow-2xl">
              <GraduationCap className="w-10 h-10 text-white" />
              <h2 className="text-4xl font-bold text-white">Student Features</h2>
            </div>
            <p className="text-white/90 mt-4 text-lg">Everything students need to succeed and get hired</p>
          </div>

          {/* Student Features Navigation Card */}
          <button
            onClick={() => onNavigate('student-features')}
            className="w-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl shadow-2xl p-12 text-white mb-6 border-4 border-white/50 relative overflow-hidden hover:scale-[1.02] transition-all group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-left">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/50">
                    <GraduationCap className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold drop-shadow-lg">Explore Student Features</h3>
                    <p className="text-white/90 text-lg">Skills assessments, training, video showcases & more</p>
                  </div>
                </div>
                <ArrowRight className="w-12 h-12 text-white group-hover:translate-x-2 transition-transform" />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">🎓</div>
                  <div className="font-bold">Basic Skills Assessment</div>
                  <div className="text-sm text-white/80">For 18+ graduates</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="font-bold">Training Programs</div>
                  <div className="text-sm text-white/80">100% free courses</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">🎬</div>
                  <div className="font-bold">Video Showcases</div>
                  <div className="text-sm text-white/80">Stand out premium feature</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">🔒</div>
                  <div className="font-bold">Privacy Controls</div>
                  <div className="text-sm text-white/80">YOU control visibility</div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* EMPLOYER FEATURES */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 rounded-2xl shadow-2xl">
              <Briefcase className="w-10 h-10 text-white" />
              <h2 className="text-4xl font-bold text-white">Employer Features</h2>
            </div>
            <p className="text-white/90 mt-4 text-lg">Powerful tools to find and hire verified talent</p>
          </div>

          {/* Employer Features Navigation Card */}
          <button
            onClick={() => onNavigate('employer-features')}
            className="w-full bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600 rounded-3xl shadow-2xl p-12 text-white mb-6 border-4 border-white/50 relative overflow-hidden hover:scale-[1.02] transition-all group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-left">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/50">
                    <Briefcase className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold drop-shadow-lg">Explore Employer Features</h3>
                    <p className="text-white/90 text-lg">ATS integration, AI video interviews, skills access & more</p>
                  </div>
                </div>
                <ArrowRight className="w-12 h-12 text-white group-hover:translate-x-2 transition-transform" />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="font-bold">ATS Integration</div>
                  <div className="text-sm text-white/80">Seamless sync</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">👑</div>
                  <div className="font-bold">AI Video Interviews</div>
                  <div className="text-sm text-white/80">Ultra Premium</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="font-bold">Skills Assessment Access</div>
                  <div className="text-sm text-white/80">Verified candidates</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">💼</div>
                  <div className="font-bold">Contract Pricing</div>
                  <div className="text-sm text-white/80">Flexible rates</div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* COMING SOON / BETA TESTING */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-4 rounded-2xl shadow-2xl animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
              <h2 className="text-4xl font-bold text-white">Coming Soon</h2>
            </div>
            <p className="text-white/90 mt-4 text-lg">Beta testing & upcoming features</p>
          </div>

          {/* Coming Soon Navigation Card */}
          <button
            onClick={() => onNavigate('coming-soon')}
            className="w-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-3xl shadow-2xl p-12 text-white mb-6 border-4 border-white/50 relative overflow-hidden hover:scale-[1.02] transition-all group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-left">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/50">
                    <Rocket className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold drop-shadow-lg">Explore What's Coming</h3>
                    <p className="text-white/90 text-lg">Native mobile app, beta testing info, launch timeline & more</p>
                  </div>
                </div>
                <ArrowRight className="w-12 h-12 text-white group-hover:translate-x-2 transition-transform" />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">📱</div>
                  <div className="font-bold">Native Mobile App</div>
                  <div className="text-sm text-white/80">iOS & Android</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="font-bold">Beta Testing</div>
                  <div className="text-sm text-white/80">CNMI launch</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="font-bold">Launch Timeline</div>
                  <div className="text-sm text-white/80">Rollout schedule</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="text-3xl mb-2">✨</div>
                  <div className="font-bold">Upcoming Features</div>
                  <div className="text-sm text-white/80">What's next</div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('landing')}
            className="px-10 py-5 bg-white/95 backdrop-blur-sm text-cyan-700 rounded-2xl hover:bg-white hover:scale-105 transition-all font-bold text-lg shadow-2xl border-4 border-cyan-300"
          >
            🏠 Back to Home
          </button>
        </div>

        {/* Internal Staff Access & Additional Resources */}
        <div className="mt-12 space-y-4">
          <div className="text-center">
            <button
              onClick={() => onNavigate('internal-dashboard')}
              className="px-8 py-3 bg-red-500/20 backdrop-blur-sm text-red-300 border-2 border-red-400 rounded-xl hover:bg-red-500/30 hover:scale-105 transition-all font-semibold shadow-xl flex items-center gap-2 mx-auto"
            >
              <Lock className="w-5 h-5" />
              Internal Staff Portal
            </button>
          </div>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => onNavigate('faq')}
              className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl hover:bg-white/20 hover:scale-105 transition-all font-semibold shadow-lg"
            >
              FAQ
            </button>
            <button
              onClick={() => onNavigate('legal-disclaimers')}
              className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl hover:bg-white/20 hover:scale-105 transition-all font-semibold shadow-lg"
            >
              Legal Disclaimers
            </button>
            <button
              onClick={() => onNavigate('privacy-policy')}
              className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl hover:bg-white/20 hover:scale-105 transition-all font-semibold shadow-lg"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('terms-of-service')}
              className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl hover:bg-white/20 hover:scale-105 transition-all font-semibold shadow-lg"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}