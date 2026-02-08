import { useState } from 'react';
import { Users, Briefcase, School, Heart, Star, MessageSquare, Award, CheckCircle, Clock, TrendingUp, Gift, Zap, Target, Calendar, Bell, Send, ThumbsUp, AlertCircle, Crown, MapPin } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface BetaUserDemoProps {
  onNavigate: (page: string) => void;
}

type UserType = 'student' | 'employer' | 'career-services' | 'ada';

export function BetaUserDemo({ onNavigate }: BetaUserDemoProps) {
  const [selectedUserType, setSelectedUserType] = useState<UserType>('student');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackCategory, setFeedbackCategory] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  // Mock beta user data
  const betaUserData = {
    student: {
      name: 'Carina Pangelinan',
      betaId: 'BETA-STU-2026-0042',
      joinedDate: '2026-01-15',
      daysRemaining: 152,
      tier: 'Premium Beta',
      totalFeedback: 12,
      pointsEarned: 850,
      badgesEarned: ['Early Adopter', 'Feedback Champion', 'Feature Tester'],
      tasksCompleted: 8,
      tasksTotal: 15,
      location: {
        city: 'Honolulu',
        state: 'Hawaii',
        zipcode: '96815',
        country: 'USA'
      }
    },
    employer: {
      name: 'Kalaayan Inc.',
      betaId: 'BETA-EMP-2026-0018',
      joinedDate: '2026-01-20',
      daysRemaining: 147,
      tier: 'Enterprise Beta',
      totalFeedback: 8,
      pointsEarned: 620,
      badgesEarned: ['Industry Pioneer', 'Active Participant'],
      tasksCompleted: 5,
      tasksTotal: 10,
      location: {
        city: 'Weno',
        state: 'Chuuk',
        zipcode: '96942',
        country: 'FSM (Federated States of Micronesia)'
      }
    },
    'career-services': {
      name: 'Northern Marianas College Career Center',
      betaId: 'BETA-EDU-2026-0003',
      joinedDate: '2026-01-10',
      daysRemaining: 157,
      tier: 'Institutional Beta',
      totalFeedback: 15,
      pointsEarned: 1200,
      badgesEarned: ['Education Leader', 'Power User', 'Community Builder'],
      tasksCompleted: 9,
      tasksTotal: 12,
      location: {
        city: 'Saipan',
        state: 'Northern Mariana Islands',
        zipcode: '96950',
        country: 'CNMI'
      }
    },
    ada: {
      name: 'Maria Flores',
      betaId: 'BETA-ADA-2026-0007',
      joinedDate: '2026-01-25',
      daysRemaining: 142,
      tier: 'Accessibility Beta',
      totalFeedback: 10,
      pointsEarned: 750,
      badgesEarned: ['Accessibility Advocate', 'Inclusive Tester'],
      tasksCompleted: 6,
      tasksTotal: 10,
      location: {
        city: 'Palikir',
        state: 'Pohnpei',
        zipcode: '96941',
        country: 'FSM (Federated States of Micronesia)'
      }
    }
  };

  const currentUser = betaUserData[selectedUserType];

  // Beta Tasks
  const betaTasks = {
    student: [
      { id: 1, title: 'Complete your profile', status: 'completed', points: 50 },
      { id: 2, title: 'Search for 5 jobs', status: 'completed', points: 30 },
      { id: 3, title: 'Take a skills assessment', status: 'completed', points: 100 },
      { id: 4, title: 'Practice AI interview', status: 'completed', points: 75 },
      { id: 5, title: 'Submit resume for review', status: 'completed', points: 50 },
      { id: 6, title: 'Rate job search feature', status: 'completed', points: 25 },
      { id: 7, title: 'Provide feedback on UI/UX', status: 'completed', points: 100 },
      { id: 8, title: 'Test mobile responsiveness', status: 'completed', points: 50 },
      { id: 9, title: 'Try video interview feature', status: 'pending', points: 75 },
      { id: 10, title: 'Invite a friend to waitlist', status: 'pending', points: 50 },
      { id: 11, title: 'Complete training module', status: 'pending', points: 100 },
      { id: 12, title: 'Submit bug report (if found)', status: 'pending', points: 150 },
      { id: 13, title: 'Participate in weekly survey', status: 'pending', points: 25 },
      { id: 14, title: 'Test accessibility features', status: 'pending', points: 50 },
      { id: 15, title: 'Final beta review survey', status: 'pending', points: 200 }
    ],
    employer: [
      { id: 1, title: 'Set up company profile', status: 'completed', points: 100 },
      { id: 2, title: 'Post your first job', status: 'completed', points: 75 },
      { id: 3, title: 'Review 3 candidate profiles', status: 'completed', points: 50 },
      { id: 4, title: 'Test AI interview system', status: 'completed', points: 100 },
      { id: 5, title: 'Rate candidate matching', status: 'completed', points: 50 },
      { id: 6, title: 'Schedule live interview', status: 'pending', points: 50 },
      { id: 7, title: 'Provide hiring feedback', status: 'pending', points: 100 },
      { id: 8, title: 'Test employer dashboard', status: 'pending', points: 75 },
      { id: 9, title: 'Invite team member', status: 'pending', points: 50 },
      { id: 10, title: 'Complete final survey', status: 'pending', points: 200 }
    ],
    'career-services': [
      { id: 1, title: 'Set up institution account', status: 'completed', points: 150 },
      { id: 2, title: 'Add 10 students to platform', status: 'completed', points: 100 },
      { id: 3, title: 'Create virtual career fair', status: 'completed', points: 200 },
      { id: 4, title: 'Connect with 5 employers', status: 'completed', points: 75 },
      { id: 5, title: 'Test student analytics', status: 'completed', points: 100 },
      { id: 6, title: 'Review placement tracking', status: 'completed', points: 75 },
      { id: 7, title: 'Test integration features', status: 'completed', points: 100 },
      { id: 8, title: 'Provide platform feedback', status: 'completed', points: 150 },
      { id: 9, title: 'Host virtual employer event', status: 'completed', points: 200 },
      { id: 10, title: 'Review revenue dashboard', status: 'pending', points: 100 },
      { id: 11, title: 'Test mobile app features', status: 'pending', points: 75 },
      { id: 12, title: 'Complete beta final review', status: 'pending', points: 250 }
    ],
    ada: [
      { id: 1, title: 'Complete accessibility profile', status: 'completed', points: 100 },
      { id: 2, title: 'Test screen reader compatibility', status: 'completed', points: 150 },
      { id: 3, title: 'Try keyboard navigation', status: 'completed', points: 100 },
      { id: 4, title: 'Test high contrast mode', status: 'completed', points: 75 },
      { id: 5, title: 'Review job accessibility tags', status: 'completed', points: 50 },
      { id: 6, title: 'Provide accessibility feedback', status: 'completed', points: 200 },
      { id: 7, title: 'Test mobile accessibility', status: 'pending', points: 100 },
      { id: 8, title: 'Review accommodation requests', status: 'pending', points: 75 },
      { id: 9, title: 'Test assistive tech integration', status: 'pending', points: 150 },
      { id: 10, title: 'Complete accessibility survey', status: 'pending', points: 200 }
    ]
  };

  const currentTasks = betaTasks[selectedUserType];

  const handleFeedbackSubmit = () => {
    alert(`Feedback submitted!\n\nCategory: ${feedbackCategory}\nFeedback: ${feedbackText}\n\n+50 Beta Points Earned!`);
    setShowFeedbackForm(false);
    setFeedbackCategory('');
    setFeedbackText('');
  };

  const progressPercentage = (currentUser.tasksCompleted / currentUser.tasksTotal) * 100;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <BackButton onNavigate={onNavigate} label="Back" />
        
        {/* Header */}
        <div className="mt-6 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full mb-4 shadow-lg">
            <Crown className="w-5 h-5" />
            <span className="font-bold">BETA TESTER PROGRAM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Beta User Experience Demo
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            See what beta testers experience across all user types
          </p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Select Beta User Type to Demo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedUserType('student')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedUserType === 'student'
                  ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <Users className={`w-10 h-10 mx-auto mb-3 ${selectedUserType === 'student' ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="font-bold text-gray-900 text-lg">Student Beta</div>
              <div className="text-xs text-gray-500 mt-1">Job seeker experience</div>
            </button>
            
            <button
              onClick={() => setSelectedUserType('employer')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedUserType === 'employer'
                  ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <Briefcase className={`w-10 h-10 mx-auto mb-3 ${selectedUserType === 'employer' ? 'text-purple-600' : 'text-gray-400'}`} />
              <div className="font-bold text-gray-900 text-lg">Employer Beta</div>
              <div className="text-xs text-gray-500 mt-1">Hiring manager experience</div>
            </button>
            
            <button
              onClick={() => setSelectedUserType('career-services')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedUserType === 'career-services'
                  ? 'border-green-600 bg-green-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
              <School className={`w-10 h-10 mx-auto mb-3 ${selectedUserType === 'career-services' ? 'text-green-600' : 'text-gray-400'}`} />
              <div className="font-bold text-gray-900 text-lg">Career Services</div>
              <div className="text-xs text-gray-500 mt-1">Institution experience</div>
            </button>
            
            <button
              onClick={() => setSelectedUserType('ada')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedUserType === 'ada'
                  ? 'border-pink-600 bg-pink-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-pink-300 hover:shadow-md'
              }`}
            >
              <Heart className={`w-10 h-10 mx-auto mb-3 ${selectedUserType === 'ada' ? 'text-pink-600' : 'text-gray-400'}`} />
              <div className="font-bold text-gray-900 text-lg">Person with Disabilities Beta</div>
              <div className="text-xs text-gray-500 mt-1">Accessibility tester</div>
            </button>
          </div>
        </div>

        {/* Beta Dashboard */}
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/40">
                    {selectedUserType === 'student' && <Users className="w-8 h-8" />}
                    {selectedUserType === 'employer' && <Briefcase className="w-8 h-8" />}
                    {selectedUserType === 'career-services' && <School className="w-8 h-8" />}
                    {selectedUserType === 'ada' && <Heart className="w-8 h-8" />}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Welcome, {currentUser.name}!</h2>
                    <p className="text-white/90">Beta ID: {currentUser.betaId}</p>
                    <p className="text-white/90 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-4 h-4" />
                      {currentUser.location.city}, {currentUser.location.state} {currentUser.location.zipcode}, {currentUser.location.country}
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-white/80 text-sm mb-1">Beta Tier</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <Crown className="w-6 h-6 text-yellow-300" />
                      {currentUser.tier}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-white/80 text-sm mb-1">Days Remaining</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <Clock className="w-6 h-6" />
                      {currentUser.daysRemaining} days
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/30 text-center min-w-[200px]">
                <Gift className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                <div className="text-sm text-white/80 mb-1">Premium Features</div>
                <div className="text-3xl font-bold">100% FREE</div>
                <div className="text-xs text-white/70 mt-1">for {currentUser.daysRemaining} days</div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{currentUser.totalFeedback}</div>
              <div className="text-sm text-gray-600">Feedback Submitted</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <Zap className="w-8 h-8 text-purple-600" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{currentUser.pointsEarned}</div>
              <div className="text-sm text-gray-600">Beta Points</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
              <div className="flex items-center justify-between mb-3">
                <Target className="w-8 h-8 text-green-600" />
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{currentUser.tasksCompleted}/{currentUser.tasksTotal}</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <Award className="w-8 h-8 text-orange-600" />
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{currentUser.badgesEarned.length}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Beta Testing Progress</h3>
              <span className="text-2xl font-bold text-purple-600">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage > 10 && (
                  <span className="text-white text-xs font-bold">{Math.round(progressPercentage)}%</span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Complete all tasks to earn <strong className="text-purple-600">bonus rewards</strong> and priority access to future features!
            </p>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-orange-600" />
              Badges Earned
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {currentUser.badgesEarned.map((badge, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-bold text-gray-900">{badge}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Beta Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                Beta Testing Tasks
              </h3>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Submit Feedback
              </button>
            </div>
            
            <div className="space-y-3">
              {currentTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    task.status === 'completed'
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {task.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                      )}
                      <div>
                        <div className={`font-semibold ${task.status === 'completed' ? 'text-green-900' : 'text-gray-900'}`}>
                          {task.title}
                        </div>
                        {task.status === 'pending' && (
                          <div className="text-xs text-gray-500 mt-1">Click to mark as complete</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        task.status === 'completed'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {task.status === 'completed' ? '✓ Complete' : 'Pending'}
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-bold">
                        <Zap className="w-4 h-4" />
                        +{task.points}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beta Benefits Reminder */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <Gift className="w-10 h-10 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Your Beta Tester Benefits</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><strong>6 Months FREE Premium</strong> - Full platform access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><strong>Priority Support</strong> - Direct line to dev team</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><strong>Early Access</strong> - New features before launch</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><strong>Beta Badges</strong> - Exclusive recognition</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><strong>Discount After Beta</strong> - 50% off first year</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><strong>Shape the Platform</strong> - Your feedback matters!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="w-6 h-6 text-purple-600" />
              Recent Beta Updates
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">New Feature Released!</div>
                    <div className="text-sm text-gray-600 mt-1">
                      We've added AI-powered job matching based on your beta feedback. Test it now!
                    </div>
                    <div className="text-xs text-purple-600 mt-2">2 days ago</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <ThumbsUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Your Feedback Implemented!</div>
                    <div className="text-sm text-gray-600 mt-1">
                      The mobile navigation improvements you suggested are now live. Thank you!
                    </div>
                    <div className="text-xs text-blue-600 mt-2">5 days ago</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">New Badge Unlocked!</div>
                    <div className="text-sm text-gray-600 mt-1">
                      You've earned the "Feedback Champion" badge for your active participation!
                    </div>
                    <div className="text-xs text-green-600 mt-2">1 week ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-7 h-7 text-purple-600" />
                Submit Beta Feedback
              </h2>
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback Category *
                </label>
                <select
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select category...</option>
                  <option value="bug">🐛 Bug Report</option>
                  <option value="feature">💡 Feature Request</option>
                  <option value="ui-ux">🎨 UI/UX Feedback</option>
                  <option value="performance">⚡ Performance Issue</option>
                  <option value="accessibility">♿ Accessibility</option>
                  <option value="mobile">📱 Mobile Experience</option>
                  <option value="general">💬 General Feedback</option>
                  <option value="praise">❤️ What I Love</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback *
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tell us what you think! Be as detailed as possible..."
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <strong className="text-blue-900">💡 Tip:</strong> Detailed feedback helps us improve faster! 
                    Include screenshots if you can (via email: <span className="text-blue-600 font-semibold">beta@zalpharecruit.com</span>).
                    You'll earn <strong className="text-purple-600">+50 Beta Points</strong> for this feedback!
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={!feedbackCategory || !feedbackText}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    feedbackCategory && feedbackText
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}