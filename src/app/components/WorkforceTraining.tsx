import { BookOpen, Video, Users, Calendar, CheckCircle, Clock, Award, Target, Briefcase, FileText, Globe, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

interface WorkforceTrainingProps {
  variant?: 'compact' | 'full';
  onNavigate?: (page: string) => void;
}

// Training session data
const trainingPrograms = [
  {
    id: 1,
    title: 'Interview Mastery Workshop',
    category: 'Interview Skills',
    icon: '🎤',
    duration: '2 hours',
    format: 'Live Interactive Session',
    language: 'English',
    level: 'Beginner to Advanced',
    description: 'Learn how to ace any job interview with confidence. Practice common interview questions, body language, and follow-up strategies.',
    topics: [
      'Common interview questions & how to answer them',
      'STAR method for behavioral questions',
      'Body language & professional presence',
      'Virtual interview best practices',
      'Salary negotiation tactics',
      'Post-interview follow-up strategies'
    ],
    nextSession: 'Feb 5, 2026 at 6:00 PM CNMI Time',
    instructor: 'Maria Santos - HR Director, Pacific Hotels',
    enrolled: 124,
    capacity: 200,
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Resume Building Bootcamp',
    category: 'Professional Documents',
    icon: '📄',
    duration: '1.5 hours',
    format: 'Live Workshop + Templates',
    language: 'English',
    level: 'All Levels',
    description: 'Create a professional resume that gets noticed. Learn formatting, keyword optimization, and how to highlight your achievements.',
    topics: [
      'Modern resume formats & ATS optimization',
      'Writing powerful bullet points with metrics',
      'Tailoring resumes for specific jobs',
      'Cover letter writing strategies',
      'Common resume mistakes to avoid',
      'Using action verbs & quantifying achievements'
    ],
    nextSession: 'Feb 8, 2026 at 5:00 PM CNMI Time',
    instructor: 'James Reyes - Career Coach, ZALPHA',
    enrolled: 156,
    capacity: 250,
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'LinkedIn & Online Presence Mastery',
    category: 'Digital Branding',
    icon: '🌐',
    duration: '2 hours',
    format: 'Live Interactive Session',
    language: 'English',
    level: 'Beginner to Intermediate',
    description: 'Build a powerful online professional presence. Optimize your LinkedIn profile, create engaging content, and network effectively.',
    topics: [
      'Creating a standout LinkedIn profile',
      'Professional headshots & personal branding',
      'Networking strategies & connection requests',
      'Posting engaging professional content',
      'Building your online portfolio',
      'Managing your digital reputation'
    ],
    nextSession: 'Feb 12, 2026 at 6:30 PM CNMI Time',
    instructor: 'Sarah Chen - Digital Marketing Manager',
    enrolled: 98,
    capacity: 150,
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Professional Communication Skills',
    category: 'Soft Skills',
    icon: '💬',
    duration: '1.5 hours',
    format: 'Interactive Workshop',
    language: 'English',
    level: 'All Levels',
    description: 'Master professional email writing, workplace communication, and conflict resolution strategies for the modern workplace.',
    topics: [
      'Professional email etiquette & formatting',
      'Effective verbal communication in meetings',
      'Active listening & asking questions',
      'Giving and receiving feedback professionally',
      'Conflict resolution in the workplace',
      'Cross-cultural communication tips'
    ],
    nextSession: 'Feb 15, 2026 at 5:30 PM CNMI Time',
    instructor: 'David Muna - Communications Director',
    enrolled: 87,
    capacity: 200,
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Time Management & Productivity',
    category: 'Professional Skills',
    icon: '⏰',
    duration: '1.5 hours',
    format: 'Live Workshop',
    language: 'English',
    level: 'All Levels',
    description: 'Learn proven techniques to manage your time, prioritize tasks, and boost productivity in remote and office settings.',
    topics: [
      'Time blocking & calendar management',
      'Prioritization frameworks (Eisenhower Matrix)',
      'Overcoming procrastination',
      'Managing distractions & focus techniques',
      'Tools for remote work productivity',
      'Work-life balance strategies'
    ],
    nextSession: 'Feb 18, 2026 at 6:00 PM CNMI Time',
    instructor: 'Lisa Ngiraingas - Project Manager',
    enrolled: 112,
    capacity: 180,
    status: 'upcoming'
  },
  {
    id: 6,
    title: 'Excel & Data Skills for Business',
    category: 'Technical Skills',
    icon: '📊',
    duration: '2.5 hours',
    format: 'Hands-on Training',
    language: 'English',
    level: 'Beginner to Intermediate',
    description: 'Master essential Excel skills for business. Learn formulas, pivot tables, data visualization, and reporting techniques.',
    topics: [
      'Excel basics & essential formulas',
      'Creating professional charts & graphs',
      'Pivot tables & data analysis',
      'VLOOKUP, INDEX/MATCH functions',
      'Data cleaning & organization',
      'Dashboard creation for reporting'
    ],
    nextSession: 'Feb 22, 2026 at 5:00 PM CNMI Time',
    instructor: 'Robert Takano - Financial Analyst',
    enrolled: 145,
    capacity: 200,
    status: 'upcoming'
  },
  {
    id: 7,
    title: 'Customer Service Excellence',
    category: 'Professional Skills',
    icon: '🤝',
    duration: '1.5 hours',
    format: 'Interactive Role-Play',
    language: 'English',
    level: 'All Levels',
    description: 'Develop exceptional customer service skills for hospitality, retail, and office environments. Handle difficult situations with professionalism.',
    topics: [
      'Customer service mindset & empathy',
      'Handling difficult customers with grace',
      'Problem-solving & de-escalation techniques',
      'Phone & email customer service etiquette',
      'Building customer loyalty',
      'Turning complaints into opportunities'
    ],
    nextSession: 'Feb 25, 2026 at 6:00 PM CNMI Time',
    instructor: 'Angela Babauta - Hospitality Trainer',
    enrolled: 93,
    capacity: 150,
    status: 'upcoming'
  },
  {
    id: 8,
    title: 'Personal Finance & Career Planning',
    category: 'Career Development',
    icon: '💰',
    duration: '2 hours',
    format: 'Live Workshop',
    language: 'English',
    level: 'All Levels',
    description: 'Learn to manage your finances, plan your career path, negotiate salary, and build long-term financial stability.',
    topics: [
      'Budgeting & saving strategies',
      'Understanding taxes for 1099 contractors',
      'Building an emergency fund',
      'Career path planning & goal setting',
      'Salary negotiation techniques',
      'Retirement planning basics for young workers'
    ],
    nextSession: 'Mar 1, 2026 at 5:30 PM CNMI Time',
    instructor: 'Michael Torres - Financial Advisor',
    enrolled: 76,
    capacity: 200,
    status: 'upcoming'
  }
];

const completedTrainings = [
  {
    id: 101,
    title: 'Professional Networking Basics',
    completedDate: 'Jan 15, 2026',
    certificate: true,
    rating: 5
  },
  {
    id: 102,
    title: 'Introduction to Remote Work',
    completedDate: 'Jan 22, 2026',
    certificate: true,
    rating: 5
  }
];

export function WorkforceTraining({ variant = 'full', onNavigate }: WorkforceTrainingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [enrolledSessions, setEnrolledSessions] = useState<number[]>([2, 3]);

  const categories = ['All', 'Interview Skills', 'Professional Documents', 'Digital Branding', 'Soft Skills', 'Professional Skills', 'Technical Skills', 'Career Development'];

  const filteredPrograms = selectedCategory === 'All' 
    ? trainingPrograms 
    : trainingPrograms.filter(p => p.category === selectedCategory);

  const handleEnroll = (id: number) => {
    if (enrolledSessions.includes(id)) {
      setEnrolledSessions(enrolledSessions.filter(sessionId => sessionId !== id));
    } else {
      setEnrolledSessions([...enrolledSessions, id]);
      alert('🎉 Successfully enrolled! You will receive a calendar invite and reminder email.');
    }
  };

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-4 border-purple-500 rounded-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-purple-900 mb-2">
              📚 ZALPHA Workforce Training Program
            </h3>
            <p className="text-purple-700 mb-4">
              <strong>Free interactive sessions in English</strong> to help you succeed in the modern workplace
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
                <div className="text-purple-600 font-bold mb-1">🎤 Interview Skills</div>
                <div className="text-sm text-purple-800">Master job interviews with confidence</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
                <div className="text-purple-600 font-bold mb-1">📄 Resume Building</div>
                <div className="text-sm text-purple-800">Create professional resumes that stand out</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
                <div className="text-purple-600 font-bold mb-1">🌐 Online Presence</div>
                <div className="text-sm text-purple-800">Build your LinkedIn & professional brand</div>
              </div>
            </div>

            <div className="bg-purple-100 border-2 border-purple-400 rounded-xl p-4 mb-4">
              <div className="font-bold text-purple-900 mb-2">✨ What's Included:</div>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>✓ Live interactive sessions with industry experts</li>
                <li>✓ All sessions conducted in English</li>
                <li>✓ Hands-on workshops & practice exercises</li>
                <li>✓ Resume templates & professional resources</li>
                <li>✓ Completion certificates for your profile</li>
                <li>✓ Ongoing workforce development training</li>
              </ul>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('training-hub')}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Browse All Training Sessions →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8" />
            <div className="text-3xl font-bold">{trainingPrograms.length}</div>
          </div>
          <div className="text-purple-100">Available Trainings</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8" />
            <div className="text-3xl font-bold">{enrolledSessions.length}</div>
          </div>
          <div className="text-indigo-100">Enrolled Sessions</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8" />
            <div className="text-3xl font-bold">{completedTrainings.length}</div>
          </div>
          <div className="text-blue-100">Certificates Earned</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-8 h-8" />
          </div>
          <div className="text-cyan-100">All in English</div>
        </div>
      </div>

      {/* Why ZALPHA Training? */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-4">🎓 Why ZALPHA Workforce Training?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
            <div className="text-4xl mb-3">🆓</div>
            <div className="font-bold text-xl mb-2">100% Free</div>
            <div className="text-purple-100">All training sessions are completely free for verified ZALPHA students</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
            <div className="text-4xl mb-3">👥</div>
            <div className="font-bold text-xl mb-2">Interactive & Live</div>
            <div className="text-purple-100">Real instructors, live Q&A, hands-on practice, and peer collaboration</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
            <div className="text-4xl mb-3">🏆</div>
            <div className="font-bold text-xl mb-2">Career-Boosting</div>
            <div className="text-purple-100">Earn certificates, build skills, and stand out to employers</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-slate-700">Filter by Category:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Training Sessions */}
      <div className="space-y-6">
        {filteredPrograms.map((program) => {
          const isEnrolled = enrolledSessions.includes(program.id);
          
          return (
            <div key={program.id} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-slate-200 hover:border-purple-400 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {program.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900">{program.title}</h3>
                      {isEnrolled && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-sm">
                          ✅ Enrolled
                        </span>
                      )}
                    </div>
                    <p className="text-purple-600 font-semibold mb-3">{program.category}</p>
                    <p className="text-slate-700 leading-relaxed mb-4">{program.description}</p>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Video className="w-4 h-4 text-purple-600" />
                        <span>{program.format}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Globe className="w-4 h-4 text-purple-600" />
                        <span>{program.language}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <span>{program.level}</span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-200 mb-4">
                      <div className="font-bold text-purple-900 mb-3">📋 What You'll Learn:</div>
                      <div className="grid md:grid-cols-2 gap-2">
                        {program.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-purple-800">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span><strong>Next Session:</strong> {program.nextSession}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-indigo-600" />
                        <span>{program.enrolled}/{program.capacity} enrolled</span>
                      </div>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {program.instructor.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-indigo-900">Instructor</div>
                          <div className="text-sm text-indigo-700">{program.instructor}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleEnroll(program.id)}
                  className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${
                    isEnrolled
                      ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg'
                  }`}
                >
                  {isEnrolled ? 'Cancel Enrollment' : '✨ Enroll Now (Free)'}
                </button>
                <button className="px-6 py-4 border-2 border-purple-300 text-purple-700 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-50 transition-all">
                  View Details
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                  <span>Enrollment Progress</span>
                  <span>{Math.round((program.enrolled / program.capacity) * 100)}% Full</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${(program.enrolled / program.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completed Trainings */}
      {completedTrainings.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-green-600" />
            <h3 className="text-2xl font-bold text-slate-900">Your Completed Trainings</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {completedTrainings.map((training) => (
              <div key={training.id} className="bg-green-50 rounded-xl p-6 border-2 border-green-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-green-900 mb-1">{training.title}</h4>
                    <div className="text-sm text-green-700">Completed: {training.completedDate}</div>
                  </div>
                  <div className="text-2xl">🏆</div>
                </div>
                <div className="flex items-center gap-4">
                  {training.certificate && (
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-sm">
                      📄 Download Certificate
                    </button>
                  )}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < training.rating ? 'text-yellow-400' : 'text-slate-300'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Resources */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-300">
        <div className="flex items-start gap-4 mb-6">
          <Zap className="w-10 h-10 text-cyan-600" />
          <div>
            <h3 className="text-2xl font-bold text-cyan-900 mb-2">🎁 Bonus Resources</h3>
            <p className="text-cyan-700">All training participants get access to:</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 border border-cyan-300">
            <div className="font-bold text-cyan-900 mb-2">📚 Resource Library</div>
            <div className="text-sm text-cyan-800">Resume templates, interview guides, and career worksheets</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-cyan-300">
            <div className="font-bold text-cyan-900 mb-2">🎥 Recorded Sessions</div>
            <div className="text-sm text-cyan-800">Access recordings if you miss a live session</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-cyan-300">
            <div className="font-bold text-cyan-900 mb-2">👥 Alumni Network</div>
            <div className="text-sm text-cyan-800">Connect with past participants and industry mentors</div>
          </div>
        </div>
      </div>

      {/* Language Note */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Globe className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-blue-900 mb-2">All Sessions Conducted in English</h4>
            <p className="text-blue-800 text-sm">
              All ZALPHA workforce training sessions are conducted in English to prepare you for the modern workplace. Instructors speak clearly and provide support for non-native English speakers. This helps you build professional English communication skills while learning valuable career competencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}