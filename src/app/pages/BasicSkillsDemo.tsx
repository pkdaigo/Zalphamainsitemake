import { useState } from 'react';
import { ArrowLeft, GraduationCap, Award, CheckCircle, Briefcase, TrendingUp, Users, Target } from 'lucide-react';
import { BasicSkillsTest } from '@/app/components/BasicSkillsTest';
import { BackButton } from '@/app/components/BackButton';

interface BasicSkillsDemoProps {
  onNavigate: (page: string) => void;
}

export function BasicSkillsDemo({ onNavigate }: BasicSkillsDemoProps) {
  const [showTest, setShowTest] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleTestComplete = (score: number) => {
    setFinalScore(score);
    setTestCompleted(true);
    setShowTest(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <BackButton onNavigate={onNavigate} destination="demo-showcase" />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => onNavigate('demo-showcase')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Demo Showcase
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Award className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">🎓 Basic Skills Assessment</h1>
              <p className="text-xl text-white/90">
                Required for high school graduates entering the workforce
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Overview Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Why This Matters</h2>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We know that many 18-year-old high school graduates want to start working right away instead of going to college. 
              That's awesome! This <strong>Basic Skills Assessment</strong> helps employers understand your fundamental workplace skills 
              so they can match you with the right entry-level positions.
            </p>
            <p className="text-gray-700">
              This isn't a hard test—it's designed to show you have the basic reading, math, problem-solving, and instruction-following 
              skills needed for most jobs. Think of it as your "workforce ready" badge! 🎯
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">For You (Students)</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Show employers you're ready to work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Get matched with entry-level jobs that fit your skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Earn a "Workforce Ready" badge on your profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Identify areas to improve before starting work</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">For Employers</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Verify candidates have basic workplace skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Reduce time spent on unqualified applicants</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>See detailed skill breakdowns for hiring decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Build stronger, more prepared entry-level teams</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* What's Tested */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-cyan-600" />
            <h2 className="text-3xl font-bold text-gray-900">What's Tested (10 Minutes)</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">📖 Reading Comprehension</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Read short passages about work situations and answer questions to show you understand what you read.
              </p>
              <p className="text-sm text-gray-600 italic">
                Example: "Your shift starts at 8:00 AM. You should arrive 10 minutes early..."
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">🔢 Basic Math</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Simple math problems you'd use at work: calculating totals, hours worked, tips, and basic money math.
              </p>
              <p className="text-sm text-gray-600 italic">
                Example: "If you work 8 hours per day, 5 days per week, how many hours per week?"
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">🧠 Problem Solving</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Real workplace scenarios where you choose the best professional response to common situations.
              </p>
              <p className="text-sm text-gray-600 italic">
                Example: "A customer wants to return an item but doesn't have a receipt. What do you do?"
              </p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">✅ Following Instructions</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Show you can read and follow step-by-step instructions—a critical skill for any job!
              </p>
              <p className="text-sm text-gray-600 italic">
                Example: "Closing procedure: (1) Turn off equipment, (2) Lock doors, (3) Set alarm..."
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl shadow-xl p-8 mb-8 border-2 border-cyan-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 How It Works</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <p>Complete the assessment when you sign up (or any time from your profile)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <p>Answer all questions honestly—there's no time limit, so take your time!</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <p>Get your results immediately with a breakdown of each skill area</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                4
              </div>
              <p>Pass with 70% or higher to earn your "Workforce Ready" certification</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                5
              </div>
              <p>Employers can see your certification and detailed scores when you apply</p>
            </div>
          </div>
        </div>

        {/* Test Status/CTA */}
        {!testCompleted ? (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to Get Certified?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Take 10 minutes now to show employers you have the basic skills they're looking for. 
              You can retake it anytime to improve your score!
            </p>
            <button
              onClick={() => setShowTest(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
            >
              <Award className="w-6 h-6" />
              Start Basic Skills Assessment
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className={`w-24 h-24 ${finalScore >= 70 ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-orange-500 to-red-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {finalScore >= 70 ? (
                <CheckCircle className="w-12 h-12 text-white" />
              ) : (
                <TrendingUp className="w-12 h-12 text-white" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {finalScore >= 70 ? '🎉 Congratulations!' : '📈 Good Effort!'}
            </h2>
            <div className="text-6xl font-bold text-blue-600 mb-2">{finalScore}%</div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg">
              {finalScore >= 70
                ? 'You\'ve earned your "Workforce Ready" certification! This will appear on your profile and employers can see it.'
                : 'You need 70% or higher to pass. Review the material and try again when you\'re ready!'}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setTestCompleted(false);
                  setShowTest(true);
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                {finalScore >= 70 ? 'Retake to Improve Score' : 'Try Again'}
              </button>
              <button
                onClick={() => onNavigate('student-dashboard')}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Test Modal */}
      {showTest && (
        <BasicSkillsTest
          onComplete={handleTestComplete}
          onSkip={() => setShowTest(false)}
        />
      )}
    </div>
  );
}