import { GraduationCap, Award, Video, Crown, CheckCircle, TrendingUp, DollarSign, BookOpen, ArrowRight, School } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { ZalphaBot } from '@/app/components/ZalphaBot';

interface StudentPlatformFeaturesProps {
  onNavigate: (page: string) => void;
}

export function StudentPlatformFeatures({ onNavigate }: StudentPlatformFeaturesProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">Student Features</h1>
                <p className="text-xs text-cyan-300 hidden sm:block">Everything students need to succeed</p>
              </div>
            </div>
            <BackButton onNavigate={onNavigate} label="Back to Demo" />
          </div>
        </div>
      </div>

      <div className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl mb-4 sm:mb-6 border-2 sm:border-4 border-cyan-300">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600" />
              <span className="text-base sm:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Student Platform Features</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg px-4">
              Built for Your Success
            </h1>
            <p className="text-base sm:text-xl text-white/95 max-w-3xl mx-auto drop-shadow-md px-4">
              Everything you need to land your dream job across the Pacific Islands
            </p>
          </div>

          {/* Basic Skills Assessment for High School Graduates */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-white mb-6 border-2 sm:border-4 border-white/50 relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/30 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-white/50">
                    <GraduationCap className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <div>
                    <div className="inline-block bg-yellow-400 text-yellow-900 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-2">
                      ⭐ NEW FOR 18-YEAR-OLDS
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">🎓 Basic Skills Assessment</h2>
                  </div>
                </div>
                <p className="text-base sm:text-xl text-white/95 mb-6 drop-shadow">
                  Required for high school graduates entering the workforce—show employers you're ready to work!
                </p>
                
                <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Perfect for Students Who:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <span className="text-sm sm:text-base text-gray-700">Just graduated high school (18 years old)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <span className="text-sm sm:text-base text-gray-700">Want to work instead of going to college</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <span className="text-sm sm:text-base text-gray-700">Need to prove basic workforce skills</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <span className="text-sm sm:text-base text-gray-700">Want to earn a "Workforce Ready" badge</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">📖</div>
                    <h4 className="font-bold text-gray-900 mb-1">Reading</h4>
                    <p className="text-xs text-gray-600">Comprehension</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">🔢</div>
                    <h4 className="font-bold text-gray-900 mb-1">Basic Math</h4>
                    <p className="text-xs text-gray-600">Work calculations</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">🧠</div>
                    <h4 className="font-bold text-gray-900 mb-1">Problem Solving</h4>
                    <p className="text-xs text-gray-600">Real scenarios</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">✅</div>
                    <h4 className="font-bold text-gray-900 mb-1">Instructions</h4>
                    <p className="text-xs text-gray-600">Following steps</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => onNavigate('basic-skills-demo')}
                    className="flex-1 bg-white text-teal-700 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 sm:gap-3 border-2 sm:border-4 border-teal-200"
                  >
                    <Award className="w-6 h-6 sm:w-7 sm:h-7" />
                    <span className="hidden sm:inline">Take the Assessment (10 min)</span>
                    <span className="sm:hidden">Take Assessment</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Workforce Training Program */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 rounded-3xl shadow-2xl p-8 text-white mb-6 border-4 border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-11 h-11" />
                  </div>
                  <div>
                    <div className="inline-block bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold mb-2">
                      📚 100% FREE IN ENGLISH
                    </div>
                    <h2 className="text-4xl font-bold drop-shadow-lg">Workforce Training Program</h2>
                  </div>
                </div>
                <p className="text-xl text-white/95 mb-6 drop-shadow">
                  Interactive training sessions to help you succeed: Interview prep, resume building, LinkedIn & more!
                </p>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="text-3xl mb-2">🎤</div>
                    <div className="font-bold mb-1">Interview Mastery</div>
                    <div className="text-sm text-white/80">Ace any job interview with confidence</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="text-3xl mb-2">📄</div>
                    <div className="font-bold mb-1">Resume Building</div>
                    <div className="text-sm text-white/80">Create professional resumes that get noticed</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="text-3xl mb-2">🌐</div>
                    <div className="font-bold mb-1">Online Presence</div>
                    <div className="text-sm text-white/80">Build LinkedIn & professional brand</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="font-bold mb-1">All in English</div>
                    <div className="text-sm text-white/80">Professional workplace communication</div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 border border-white/30 mb-6">
                  <div className="font-bold text-lg mb-2">✨ What's Included:</div>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm">
                    <li>✓ Live interactive sessions with industry experts</li>
                    <li>✓ Time management & productivity training</li>
                    <li>✓ Professional communication skills</li>
                    <li>✓ Excel & technical skills workshops</li>
                    <li>✓ Customer service excellence</li>
                    <li>✓ Personal finance & career planning</li>
                    <li>✓ Completion certificates for your profile</li>
                    <li>✓ Ongoing workforce development</li>
                  </ul>
                </div>
                <button
                  onClick={() => onNavigate('training-hub')}
                  className="w-full md:w-auto px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-2xl hover:shadow-white/50 hover:scale-105 transform"
                >
                  Browse Training Sessions →
                </button>

                <div className="mt-4 bg-white/10 rounded-xl p-4 border border-white/30">
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span><strong>For Employers:</strong> See verified basic skills scores to reduce hiring risk and find qualified entry-level candidates!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Video Showcases for Students */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-3xl shadow-2xl p-8 text-white mb-6 border-4 border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border-2 border-white/40">
                    <Video className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <div className="inline-block bg-amber-400 text-amber-900 px-4 py-1 rounded-full text-sm font-bold mb-2">
                      <Crown className="w-4 h-4 inline mr-1" />
                      PREMIUM FEATURE
                    </div>
                    <h2 className="text-4xl font-bold drop-shadow-lg">Video Showcases</h2>
                  </div>
                </div>
                
                <p className="text-xl text-white/95 mb-6 drop-shadow">
                  Stand out with a premium video profile! Featured profiles get 10x more visibility and engagement from employers.
                </p>
                
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What You Get:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-purple-600" />
                      30-second video introduction
                    </li>
                    <li className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-amber-600" />
                      Featured badge & top placement
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Rotating carousel display
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      10x more visibility & engagement
                    </li>
                    <li className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      $9.99-$19.99/mo for students
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 text-sm text-white/90 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <span>💡 Check the student dashboard to see featured profiles in action!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Student Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Student Profile */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-cyan-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <School className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Student Profile & Dashboard</h3>
              <p className="text-white/80 mb-4">
                Complete profile management with resume, skills, education, and job applications all in one place.
              </p>
              <button
                onClick={() => onNavigate('student-profile')}
                className="bg-white/95 text-cyan-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                View Student Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Privacy Controls */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Privacy & Control Settings</h3>
              <p className="text-white/80 mb-4">
                YOU control what employers see. Manage your visibility, transcript sharing, and profile privacy settings.
              </p>
              <button
                onClick={() => onNavigate('student-privacy-settings')}
                className="bg-white/95 text-purple-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                Manage Privacy
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* AI Courses */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-pink-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI-Powered Courses</h3>
              <p className="text-white/80 mb-4">
                Learn new skills with interactive AI courses tailored to Pacific Island job markets and industries.
              </p>
              <button
                onClick={() => onNavigate('ai-courses')}
                className="bg-white/95 text-pink-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                Browse Courses
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Government Loans */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-green-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Government Loan Applications</h3>
              <p className="text-white/80 mb-4">
                Complete documentation and support for government education and training loan applications.
              </p>
              <button
                onClick={() => onNavigate('government-loans')}
                className="bg-white/95 text-green-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                View Loan Info
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-12 shadow-2xl border-4 border-white/50">
              <h3 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-xl text-white/90 mb-6">
                Join 2,000+ students already finding opportunities across the Pacific
              </p>
              <button
                onClick={() => onNavigate('student-signup')}
                className="bg-white text-blue-700 px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl"
              >
                Sign Up Free →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Zee Assistant Bot */}
      <ZalphaBot onNavigate={onNavigate} userName="Student" />
    </div>
  );
}