import { BookOpen, ArrowLeft, GraduationCap } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { WorkforceTraining } from '@/app/components/WorkforceTraining';

interface TrainingHubProps {
  onNavigate: (page: string) => void;
}

export function TrainingHub({ onNavigate }: TrainingHubProps) {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <BackButton
            onClick={() => onNavigate('student-dashboard')}
            className="flex items-center gap-2 text-purple-100 hover:text-white mb-6 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </BackButton>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">ZALPHA Training Hub</h1>
              <p className="text-2xl text-purple-200">Free Workforce Development Programs</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/30">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100% Free</div>
                <div className="text-purple-200">All sessions included with ZALPHA account</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">Live Training</div>
                <div className="text-purple-200">Interactive sessions with industry experts</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">🇬🇧 English</div>
                <div className="text-purple-200">All sessions conducted in English</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">Certificates</div>
                <div className="text-purple-200">Earn credentials for your profile</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Program Overview */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 border-2 border-purple-200">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Empowering Pacific Students with Essential Skills
              </h2>
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                ZALPHA is committed to preparing students across CNMI, FSM, Guam, and Hawaii for successful careers. Our workforce training program provides <strong>free, interactive sessions in English</strong> covering essential professional skills that employers demand.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-300">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">Interview Preparation</h3>
              <p className="text-purple-800">
                Master the art of interviewing with practice sessions, mock interviews, and expert feedback. Learn to answer behavioral questions, negotiate salary, and make a lasting impression.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border-2 border-indigo-300">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Resume Building</h3>
              <p className="text-indigo-800">
                Create professional resumes and cover letters that get noticed. Access templates, learn ATS optimization, and discover how to showcase your achievements with powerful metrics.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-300">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Online Presence</h3>
              <p className="text-blue-800">
                Build a compelling LinkedIn profile and professional online brand. Learn networking strategies, content creation, and how to leverage social media for career growth.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 border-2 border-cyan-300">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-cyan-900 mb-3">Professional Communication</h3>
              <p className="text-cyan-800">
                Develop strong written and verbal communication skills. Master email etiquette, meeting facilitation, conflict resolution, and cross-cultural communication.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border-2 border-teal-300">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-teal-900 mb-3">Time Management</h3>
              <p className="text-teal-800">
                Learn proven productivity techniques, prioritization frameworks, and time-blocking strategies. Master remote work skills and achieve better work-life balance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-300">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-green-900 mb-3">Technical Skills</h3>
              <p className="text-green-800">
                Build in-demand technical skills like Excel, data analysis, and digital tools. Gain practical, hands-on experience with business software and reporting techniques.
              </p>
            </div>
          </div>
        </div>

        {/* Why English? */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white mb-12 shadow-2xl">
          <div className="flex items-start gap-6">
            <div className="text-6xl">🇬🇧</div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Why All Sessions Are in English</h2>
              <p className="text-xl text-blue-100 leading-relaxed mb-6">
                English is the primary language of business in the Pacific region and globally. Our training sessions are conducted entirely in English to:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                  <div className="font-bold text-xl mb-2">✓ Prepare You for the Workplace</div>
                  <div className="text-blue-100">Most professional environments require English communication skills</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                  <div className="font-bold text-xl mb-2">✓ Build Language Confidence</div>
                  <div className="text-blue-100">Practice professional English in a supportive learning environment</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                  <div className="font-bold text-xl mb-2">✓ Match Employer Expectations</div>
                  <div className="text-blue-100">Employers expect candidates to communicate professionally in English</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                  <div className="font-bold text-xl mb-2">✓ Access Global Opportunities</div>
                  <div className="text-blue-100">English skills open doors to remote and international positions</div>
                </div>
              </div>
              <div className="mt-6 bg-yellow-400 text-yellow-900 rounded-xl p-5 font-semibold border-2 border-yellow-500">
                💡 Don't worry if English isn't your first language! Our instructors speak clearly, provide visual aids, and encourage questions. We support all learners.
              </div>
            </div>
          </div>
        </div>

        {/* Training Sessions */}
        <WorkforceTraining variant="full" onNavigate={onNavigate} />

        {/* Success Stories */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mt-12 border-2 border-green-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            🌟 Student Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div>
                  <div className="font-bold text-green-900">Maria S.</div>
                  <div className="text-sm text-green-700">Saipan, CNMI</div>
                </div>
              </div>
              <p className="text-green-800 italic mb-4">
                "The resume building workshop completely transformed my job search. I used the templates and landed 3 interviews in one week! Got hired at a hotel with 20% higher pay than expected."
              </p>
              <div className="text-sm text-green-700 font-semibold">
                ✅ Hired: Front Desk Manager at Pacific Resort
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  J
                </div>
                <div>
                  <div className="font-bold text-blue-900">Joshua T.</div>
                  <div className="text-sm text-blue-700">Honolulu, Hawaii</div>
                </div>
              </div>
              <p className="text-blue-800 italic mb-4">
                "The interview mastery workshop gave me so much confidence. I practiced with real scenarios and learned the STAR method. Aced my interview and got my dream job in tech!"
              </p>
              <div className="text-sm text-blue-700 font-semibold">
                ✅ Hired: Junior Developer at TechPacific
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <div>
                  <div className="font-bold text-purple-900">Angela R.</div>
                  <div className="text-sm text-purple-700">Hagåtña, Guam</div>
                </div>
              </div>
              <p className="text-purple-800 italic mb-4">
                "LinkedIn training changed everything! I optimized my profile, started posting content, and got noticed by recruiters. Now I have my own digital marketing clients!"
              </p>
              <div className="text-sm text-purple-700 font-semibold">
                ✅ Hired: Freelance Digital Marketer (5 clients)
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-white text-center mt-12 shadow-2xl">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl font-bold mb-4">Ready to Level Up Your Career?</h2>
          <p className="text-2xl text-purple-200 mb-8">
            Enroll in training sessions above and start building the skills that employers want.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-lg"
            >
              Browse Training Sessions
            </button>
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all border-2 border-white/50"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}