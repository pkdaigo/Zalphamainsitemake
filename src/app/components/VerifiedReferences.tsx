import { useState } from 'react';
import { UserCheck, Plus, Video, Mail, Phone, CheckCircle, Star, Clock, Shield, AlertCircle, Award, MessageSquare, PlayCircle, Upload } from 'lucide-react';

interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
  yearsKnown: string;
  status: 'pending' | 'verified' | 'completed';
  hasVideo: boolean;
  videoUrl?: string;
  questionsCompleted?: number;
  totalQuestions?: number;
  rating?: number;
}

interface VerifiedReferencesProps {
  isPremium?: boolean;
  onUpgrade?: () => void;
  onNavigate?: (page: string) => void;
}

export function VerifiedReferences({ isPremium = false, onUpgrade, onNavigate }: VerifiedReferencesProps) {
  const [references, setReferences] = useState<Reference[]>([
    {
      id: 'ref-1',
      name: 'Maria Santos',
      title: 'HR Manager',
      company: 'Pacific Hotels Group',
      email: 'maria.santos@pacifichotels.com',
      phone: '(670) 234-5678',
      relationship: 'Former Supervisor',
      yearsKnown: '2 years',
      status: 'verified',
      hasVideo: true,
      videoUrl: 'https://video.example.com/ref1',
      questionsCompleted: 10,
      totalQuestions: 10,
      rating: 5
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);

  // Standard reference check questions
  const referenceQuestions = [
    {
      category: 'Work Performance',
      questions: [
        'How would you describe the candidate\'s work quality and attention to detail?',
        'Can you provide an example of a project where they demonstrated exceptional performance?',
        'How does the candidate handle deadlines and multiple priorities?',
        'What were the candidate\'s key strengths in their role?',
      ]
    },
    {
      category: 'Teamwork & Communication',
      questions: [
        'How would you describe the candidate\'s ability to work in a team?',
        'How effectively does the candidate communicate with colleagues and supervisors?',
        'Can you share an example of how they handled a conflict or disagreement?',
      ]
    },
    {
      category: 'Work Ethic & Reliability',
      questions: [
        'How would you rate the candidate\'s punctuality and attendance?',
        'Can you describe their level of initiative and motivation?',
        'Would you rehire this candidate if given the opportunity? Why or why not?',
      ]
    }
  ];

  const totalQuestions = referenceQuestions.reduce((sum, cat) => sum + cat.questions.length, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
        <div className="w-full sm:flex-1">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex flex-wrap items-center gap-2 mb-1">
                <span>Verified References</span>
                <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                  VERIFIED
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">Build trust with verified professional references</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Reference</span>
        </button>
      </div>

      {/* Verified References Benefit Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 mb-6 border-2 border-green-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-green-900 text-base sm:text-lg mb-3">
              Why Verified References Matter:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  <strong>Saves time:</strong> Employers skip manual reference checks
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  <strong>Builds trust:</strong> ZALPHA verifies all references
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  <strong>Stand out:</strong> 3x more likely to get interviews
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  <strong>Professional:</strong> Pre-answered common questions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Video References Feature */}
      {isPremium && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-300">
          <div className="flex items-start gap-3">
            <Video className="w-8 h-8 text-purple-600 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-bold text-purple-900 text-lg mb-2 flex items-center gap-2">
                🎥 Video Reference Recommendations
                <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full">
                  PREMIUM
                </span>
              </h4>
              <p className="text-purple-900 mb-4">
                As a Premium member, your references can record video recommendations! 
                This powerful feature lets employers see authentic testimonials and builds incredible trust.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <div className="font-semibold text-purple-900 mb-1 text-sm">📹 Video Length</div>
                  <div className="text-xs text-gray-700">30-90 seconds</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <div className="font-semibold text-purple-900 mb-1 text-sm">🎯 Guided Prompts</div>
                  <div className="text-xs text-gray-700">Professional questions</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <div className="font-semibold text-purple-900 mb-1 text-sm">✅ Easy Recording</div>
                  <div className="text-xs text-gray-700">Mobile-friendly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isPremium && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6 border-2 border-gray-300 opacity-75">
          <div className="flex items-start gap-3">
            <Video className="w-8 h-8 text-gray-400 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-700 text-lg mb-2 flex items-center gap-2">
                🎥 Video Reference Recommendations
                <span className="px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full">
                  PREMIUM ONLY
                </span>
              </h4>
              <p className="text-gray-600 mb-4">
                Upgrade to Premium to unlock video recommendations! Let your references record 
                powerful video testimonials that make you stand out to employers.
              </p>
              <button
                onClick={onUpgrade}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reference List */}
      <div className="space-y-4 mb-6">
        {references.map((ref) => (
          <div key={ref.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {ref.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{ref.name}</h4>
                  <p className="text-sm text-gray-700">{ref.title}</p>
                  <p className="text-sm text-gray-600">{ref.company}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {ref.email}
                    </span>
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {ref.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {ref.status === 'verified' && (
                  <div className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    VERIFIED
                  </div>
                )}
                {ref.hasVideo && (
                  <div className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    VIDEO
                  </div>
                )}
              </div>
            </div>

            {/* Reference Details */}
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Relationship</div>
                <div className="font-semibold text-gray-900 text-sm">{ref.relationship}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Known For</div>
                <div className="font-semibold text-gray-900 text-sm">{ref.yearsKnown}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Rating</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (ref.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Questions Completed */}
            {ref.questionsCompleted && (
              <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">Reference Questions Completed</span>
                  <span className="text-sm font-bold text-green-600">
                    {ref.questionsCompleted}/{ref.totalQuestions}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${(ref.questionsCompleted / (ref.totalQuestions || 1)) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => setShowQuestionsModal(true)}
                  className="mt-3 text-sm text-green-700 hover:text-green-800 font-semibold flex items-center gap-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  View All Responses
                </button>
              </div>
            )}

            {/* Video Reference */}
            {ref.hasVideo && ref.videoUrl && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border-2 border-purple-300">
                <div className="flex items-start gap-3">
                  <PlayCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h5 className="font-bold text-purple-900 mb-2">Video Recommendation Available</h5>
                    <p className="text-sm text-purple-800 mb-3">
                      This reference has recorded a video testimonial about your work. Employers love these!
                    </p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all text-sm flex items-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      Watch Video
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          How Verified References Work:
        </h4>
        <div className="grid sm:grid-cols-4 gap-4">
          <div>
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
              1
            </div>
            <h5 className="font-semibold text-blue-900 text-sm mb-1">Add Reference</h5>
            <p className="text-xs text-blue-800">
              Provide your reference's contact info
            </p>
          </div>
          <div>
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
              2
            </div>
            <h5 className="font-semibold text-blue-900 text-sm mb-1">We Verify</h5>
            <p className="text-xs text-blue-800">
              ZALPHA confirms they worked with you
            </p>
          </div>
          <div>
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
              3
            </div>
            <h5 className="font-semibold text-blue-900 text-sm mb-1">Questions Answered</h5>
            <p className="text-xs text-blue-800">
              They complete {totalQuestions} standard questions
            </p>
          </div>
          <div>
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
              4
            </div>
            <h5 className="font-semibold text-blue-900 text-sm mb-1">Employers See</h5>
            <p className="text-xs text-blue-800">
              Instant trust - no calls needed
            </p>
          </div>
        </div>
      </div>

      {/* View Questions Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowQuestionsModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all inline-flex items-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          View All {totalQuestions} Reference Questions
        </button>
      </div>

      {/* Questions Modal */}
      {showQuestionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Standard Reference Check Questions
                </h3>
                <p className="text-gray-600">
                  These are the {totalQuestions} questions your references will answer. 
                  Employers can view these responses instantly!
                </p>
              </div>
              <button
                onClick={() => setShowQuestionsModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {referenceQuestions.map((category, catIndex) => (
                <div key={catIndex} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      {catIndex + 1}
                    </div>
                    {category.category}
                  </h4>
                  <div className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <div key={qIndex} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {qIndex + 1}
                          </div>
                          <p className="text-sm text-gray-800">{question}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-green-900 mb-2">Employer Time Savings</h5>
                  <p className="text-sm text-green-800">
                    By having these questions pre-answered, employers save 30-45 minutes per candidate. 
                    This makes you a more attractive hire because they can move faster with verified information!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowQuestionsModal(false)}
              className="w-full mt-6 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}