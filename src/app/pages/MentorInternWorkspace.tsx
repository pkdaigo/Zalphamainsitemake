import { useState } from 'react';
import { Target, CheckCircle, Award, MessageCircle, Calendar, FileText, TrendingUp, Users, Book } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface LearningObjective {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'professional' | 'project';
  status: 'not_started' | 'in_progress' | 'completed';
  completionDate?: Date;
  evidence?: string;
}

interface Meeting {
  id: string;
  date: Date;
  duration: number;
  type: '1-on-1' | 'team' | 'review';
  notes: string;
  actionItems: string[];
}

interface MentorInternWorkspaceProps {
  internshipId: string;
  internName: string;
  mentorName: string;
  userType: 'student' | 'mentor';
  startDate: Date;
  endDate: Date;
}

export function MentorInternWorkspace({ 
  internshipId, 
  internName, 
  mentorName, 
  userType, 
  startDate, 
  endDate 
}: MentorInternWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'objectives' | 'meetings' | 'progress' | 'messages'>('overview');
  
  const [learningObjectives, setLearningObjectives] = useState<LearningObjective[]>([
    {
      id: 'obj_001',
      title: 'Master React and Component Architecture',
      description: 'Learn React fundamentals, component lifecycle, hooks, and state management. Build at least 3 production-ready components.',
      category: 'technical',
      status: 'in_progress',
    },
    {
      id: 'obj_002',
      title: 'Participate in Agile Development Process',
      description: 'Attend daily standups, sprint planning, and retrospectives. Understand agile methodology and team collaboration.',
      category: 'professional',
      status: 'in_progress',
    },
    {
      id: 'obj_003',
      title: 'Complete Client Website Project',
      description: 'Build a responsive website for client from design to deployment. Practice full development lifecycle.',
      category: 'project',
      status: 'not_started',
    },
    {
      id: 'obj_004',
      title: 'Learn Git and Version Control',
      description: 'Master Git workflows, branching strategies, pull requests, and code reviews.',
      category: 'technical',
      status: 'completed',
      completionDate: new Date('2025-01-20'),
      evidence: 'Successfully merged 15 pull requests with no major conflicts',
    },
    {
      id: 'obj_005',
      title: 'Develop Professional Communication Skills',
      description: 'Practice clear written and verbal communication with team and clients. Learn to present technical concepts to non-technical stakeholders.',
      category: 'professional',
      status: 'in_progress',
    },
  ]);

  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 'meet_001',
      date: new Date('2025-01-26'),
      duration: 30,
      type: '1-on-1',
      notes: 'Discussed progress on React components. Sarah is doing great with hooks and state management. Need to work on performance optimization next week.',
      actionItems: [
        'Complete UserProfile component by Friday',
        'Read React Performance documentation',
        'Prepare questions for next meeting',
      ],
    },
    {
      id: 'meet_002',
      date: new Date('2025-01-19'),
      duration: 30,
      type: '1-on-1',
      notes: 'First week check-in. Reviewed codebase setup and development environment. Assigned first task: build a simple dashboard component.',
      actionItems: [
        'Set up local development environment',
        'Review existing codebase',
        'Start on dashboard component',
      ],
    },
  ]);

  const weeksCompleted = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
  const totalWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
  const progressPercentage = Math.round((weeksCompleted / totalWeeks) * 100);

  const objectiveStats = {
    total: learningObjectives.length,
    completed: learningObjectives.filter(obj => obj.status === 'completed').length,
    inProgress: learningObjectives.filter(obj => obj.status === 'in_progress').length,
    notStarted: learningObjectives.filter(obj => obj.status === 'not_started').length,
  };

  const updateObjectiveStatus = (id: string, status: LearningObjective['status']) => {
    setLearningObjectives(learningObjectives.map(obj =>
      obj.id === id ? { 
        ...obj, 
        status, 
        completionDate: status === 'completed' ? new Date() : undefined 
      } : obj
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'professional': return 'bg-purple-100 text-purple-800';
      case 'project': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'not_started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={() => window.location.reload()} label="Back to Dashboard" />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 mb-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Mentorship Workspace</h1>
              <p className="text-indigo-100">
                {userType === 'student' ? `Mentor: ${mentorName}` : `Intern: ${internName}`}
              </p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Internship Progress</span>
              <span className="text-2xl font-bold">{progressPercentage}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-white transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-indigo-100">
              <span>Week {weeksCompleted} of {totalWeeks}</span>
              <span>{Math.max(0, totalWeeks - weeksCompleted)} weeks remaining</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-gray-900">Completed</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">{objectiveStats.completed}</p>
            <p className="text-sm text-gray-600 mt-1">Learning objectives</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
              <h3 className="font-bold text-gray-900">In Progress</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{objectiveStats.inProgress}</p>
            <p className="text-sm text-gray-600 mt-1">Currently working on</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-gray-900">Meetings</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">{meetings.length}</p>
            <p className="text-sm text-gray-600 mt-1">1-on-1 sessions</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-gray-900">Completion</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {Math.round((objectiveStats.completed / objectiveStats.total) * 100)}%
            </p>
            <p className="text-sm text-gray-600 mt-1">Objectives met</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow p-2 mb-6 flex gap-2">
          {(['overview', 'objectives', 'meetings', 'progress', 'messages'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Completed: Git and Version Control</p>
                    <p className="text-xs text-gray-600">5 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">1-on-1 meeting with mentor</p>
                    <p className="text-xs text-gray-600">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Started: Complete Client Website Project</p>
                    <p className="text-xs text-gray-600">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Meeting */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Next Meeting</h2>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-indigo-900">1-on-1 Check-in</h3>
                </div>
                <p className="text-sm text-indigo-800 mb-2">
                  <strong>Date:</strong> Friday, February 2, 2025
                </p>
                <p className="text-sm text-indigo-800 mb-3">
                  <strong>Time:</strong> 2:00 PM - 2:30 PM PST
                </p>
                <div className="bg-white rounded p-3">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Agenda:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Review React component progress</li>
                    <li>• Discuss performance optimization</li>
                    <li>• Plan next week's objectives</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Objectives Tab */}
        {activeTab === 'objectives' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Learning Objectives</h2>
              {userType === 'mentor' && (
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                  + Add Objective
                </button>
              )}
            </div>

            <div className="space-y-4">
              {learningObjectives.map((objective) => (
                <div key={objective.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{objective.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(objective.category)}`}>
                          {objective.category.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(objective.status)}`}>
                          {objective.status.toUpperCase().replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{objective.description}</p>
                      
                      {objective.completionDate && (
                        <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
                          <p className="text-xs font-semibold text-green-900 mb-1">
                            ✓ Completed on {objective.completionDate.toLocaleDateString()}
                          </p>
                          {objective.evidence && (
                            <p className="text-xs text-green-800">
                              <strong>Evidence:</strong> {objective.evidence}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {objective.status !== 'completed' && (
                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      {objective.status === 'not_started' && (
                        <button
                          onClick={() => updateObjectiveStatus(objective.id, 'in_progress')}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold text-sm"
                        >
                          Start Working
                        </button>
                      )}
                      {objective.status === 'in_progress' && (
                        <button
                          onClick={() => updateObjectiveStatus(objective.id, 'completed')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm flex items-center gap-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark Complete
                        </button>
                      )}
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm">
                        Add Note
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meetings Tab */}
        {activeTab === 'meetings' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Meeting History</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                Schedule Meeting
              </button>
            </div>

            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-bold text-gray-900">
                          {meeting.date.toLocaleDateString()} - {meeting.type.replace('_', ' ').replace('-', ' ')}
                        </h3>
                        <span className="text-sm text-gray-600">{meeting.duration} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Notes:</h4>
                    <p className="text-sm text-gray-700">{meeting.notes}</p>
                  </div>

                  {meeting.actionItems.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Action Items:</h4>
                      <ul className="space-y-1">
                        {meeting.actionItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <Target className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Progress Report</h2>
            
            <div className="space-y-6">
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Skills Development</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-700">Technical Skills</span>
                      <span className="text-sm font-bold text-indigo-600">85%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600" style={{ width: '85%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-700">Professional Skills</span>
                      <span className="text-sm font-bold text-purple-600">70%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600" style={{ width: '70%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-700">Project Completion</span>
                      <span className="text-sm font-bold text-green-600">60%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {userType === 'mentor' && (
                <div className="border-2 border-indigo-200 rounded-lg p-6 bg-indigo-50">
                  <h3 className="font-bold text-indigo-900 mb-4">Mentor Evaluation</h3>
                  <textarea
                    placeholder="Add evaluation notes, strengths, areas for improvement..."
                    className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                  />
                  <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                    Save Evaluation
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Messaging</h3>
              <p className="text-gray-600">Send messages to your {userType === 'student' ? 'mentor' : 'intern'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}