import { useState } from 'react';
import { motion } from 'motion/react';
import { BackButton } from '@/app/components/BackButton';
import {
  Briefcase,
  Clock,
  Calendar,
  MapPin,
  User,
  FileText,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Star,
  Building2,
  Target,
  Award,
  BookOpen,
  Heart,
  Zap,
  ChevronRight,
  Bell,
  Search,
  Filter,
  MapPinned,
  Phone,
  Mail,
  ExternalLink,
  Trophy,
} from 'lucide-react';
import { CoOpVotingPanel, RegionalNominationsPanel, EarlyCollegeCreditPanel, MicroGigsPanel, CertificationModulesPanel } from '@/app/components/coop';

interface HighSchoolCoOpDashboardProps {
  onNavigate: (page: string) => void;
}

export function HighSchoolCoOpDashboard({ onNavigate }: HighSchoolCoOpDashboardProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'progress' | 'opportunities' | 'college' | 'microgigs' | 'certifications' | 'awards'>('today');

  // Mock student data
  const studentInfo = {
    name: 'Maria Santos',
    school: 'Saipan Southern High School',
    grade: '11th Grade',
    studentId: 'Z-UID-1234567',
    hoursRequired: 120,
    hoursCompleted: 45,
    weeklyGoal: 12,
    currentStreak: 4,
  };

  const currentPlacement = {
    employer: 'Kalaayan Inc.',
    position: 'Food Service Assistant',
    supervisor: 'John Anderson',
    supervisorEmail: 'j.anderson@kalaayan.com',
    supervisorPhone: '+1 (670) 234-5678',
    location: 'Saipan Business Center, 2nd Floor',
    shiftToday: '8:00 AM – 12:00 PM',
    department: 'Food Service',
  };

  // Today's tasks
  const todayTasks = [
    { id: 1, title: 'Set up dining area', status: 'completed', time: '8:00 AM' },
    { id: 2, title: 'Stock supplies and inventory', status: 'completed', time: '9:00 AM' },
    { id: 3, title: 'Assist with lunch service', status: 'in-progress', time: '11:00 AM' },
    { id: 4, title: 'Clean and organize workstation', status: 'pending', time: '11:45 AM' },
  ];

  // Recent messages
  const recentMessages = [
    {
      id: 1,
      from: 'John Anderson',
      role: 'Supervisor',
      message: 'Great work today! Keep up the excellent attendance.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      from: 'Ms. Rodriguez',
      role: 'Co-Op Coordinator',
      message: 'Your weekly report has been approved.',
      time: '1 day ago',
      unread: false,
    },
  ];

  // Available opportunities
  const opportunities = [
    {
      id: 1,
      title: 'Front Desk Trainee',
      company: 'Saipan Grand Hotel',
      location: 'Garapan',
      hours: '15-20 hrs/week',
      type: 'Hospitality',
      urgency: 'high',
    },
    {
      id: 2,
      title: 'IT Support Assistant',
      company: 'Northern Marianas College',
      location: 'As Terlaje Campus',
      hours: '10-15 hrs/week',
      type: 'Technology',
      urgency: 'medium',
    },
    {
      id: 3,
      title: 'Marketing Intern',
      company: 'Marianas Visitors Authority',
      location: 'Garapan',
      hours: '12-16 hrs/week',
      type: 'Marketing',
      urgency: 'low',
    },
  ];

  // Performance stats
  const stats = {
    attendance: 98,
    tasksCompleted: 45,
    skillsLearned: 12,
    supervisorRating: 4.8,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50">
      <BackButton onClick={() => onNavigate('co-op-login')} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
                  <User className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black mb-1">{studentInfo.name}</h1>
                  <p className="text-blue-100 mb-2">{studentInfo.school} • {studentInfo.grade}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold">
                      {studentInfo.studentId}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-300" />
                      {studentInfo.currentStreak} week streak
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-black">{studentInfo.hoursCompleted}</div>
                  <div className="text-blue-100 text-sm">Hours Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">{studentInfo.hoursRequired - studentInfo.hoursCompleted}</div>
                  <div className="text-blue-100 text-sm">Hours Remaining</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Overall Progress</span>
                <span className="text-sm font-semibold">
                  {Math.round((studentInfo.hoursCompleted / studentInfo.hoursRequired) * 100)}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <motion.div
                  className="bg-white h-3 rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${(studentInfo.hoursCompleted / studentInfo.hoursRequired) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-200">
          {[
            { id: 'today', label: 'Today', icon: Calendar },
            { id: 'progress', label: 'My Progress', icon: TrendingUp },
            { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
            { id: 'college', label: 'College Credit', icon: BookOpen },
            { id: 'microgigs', label: 'Microgigs', icon: Zap },
            { id: 'certifications', label: 'Certifications', icon: FileText },
            { id: 'awards', label: 'Awards', icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'today' && (
              <>
                {/* Today's Placement */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      <h2 className="text-xl font-bold text-slate-900">Today's Placement</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{currentPlacement.employer}</h3>
                        <p className="text-slate-600">{currentPlacement.position}</p>
                      </div>
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Active
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">Today's Shift</div>
                          <div className="text-slate-600">{currentPlacement.shiftToday}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">Location</div>
                          <div className="text-slate-600">{currentPlacement.location}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <User className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">Supervisor</div>
                          <div className="text-slate-600">{currentPlacement.supervisor}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <Briefcase className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">Department</div>
                          <div className="text-slate-600">{currentPlacement.department}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        Clock In
                      </button>
                      <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Today's Tasks */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-slate-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h2 className="text-xl font-bold text-slate-900">Today's Tasks</h2>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        {todayTasks.filter((t) => t.status === 'completed').length}/{todayTasks.length}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    {todayTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            task.status === 'completed'
                              ? 'bg-green-100'
                              : task.status === 'in-progress'
                              ? 'bg-blue-100'
                              : 'bg-slate-200'
                          }`}
                        >
                          {task.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : task.status === 'in-progress' ? (
                            <Clock className="w-5 h-5 text-blue-600" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-slate-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">{task.title}</div>
                          <div className="text-sm text-slate-500">{task.time}</div>
                        </div>
                        {task.status === 'pending' && (
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                            Start
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {activeTab === 'progress' && (
              <>
                {/* Performance Stats */}
                <motion.div
                  className="grid md:grid-cols-4 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <Target className="w-8 h-8 text-green-600" />
                      <span className="text-green-600 text-sm font-semibold">↑ 2%</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{stats.attendance}%</div>
                    <div className="text-sm text-slate-600 mt-1">Attendance</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                      <span className="text-blue-600 text-sm font-semibold">↑ 5</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{stats.tasksCompleted}</div>
                    <div className="text-sm text-slate-600 mt-1">Tasks Done</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <BookOpen className="w-8 h-8 text-purple-600" />
                      <span className="text-purple-600 text-sm font-semibold">↑ 3</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{stats.skillsLearned}</div>
                    <div className="text-sm text-slate-600 mt-1">Skills Learned</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <Star className="w-8 h-8 text-yellow-500" />
                      <span className="text-yellow-600 text-sm font-semibold">↑ 0.2</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{stats.supervisorRating}</div>
                    <div className="text-sm text-slate-600 mt-1">Rating</div>
                  </div>
                </motion.div>

                {/* Weekly Hours Chart */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Weekly Hours</h2>
                  <div className="space-y-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
                      const hours = [4, 3.5, 4, 0, 3][index];
                      const maxHours = 4;
                      return (
                        <div key={day} className="flex items-center gap-4">
                          <div className="w-12 text-sm font-semibold text-slate-600">{day}</div>
                          <div className="flex-1 bg-slate-100 rounded-full h-8 relative overflow-hidden">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full flex items-center justify-end pr-3"
                              initial={{ width: 0 }}
                              animate={{ width: `${(hours / maxHours) * 100}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                            >
                              {hours > 0 && <span className="text-white text-sm font-semibold">{hours}h</span>}
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}

            {activeTab === 'opportunities' && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {opportunities.map((opp, index) => (
                  <motion.div
                    key={opp.id}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{opp.title}</h3>
                        <p className="text-slate-600 flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {opp.company}
                        </p>
                      </div>
                      {opp.urgency === 'high' && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                          Urgent
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="flex items-center gap-1 text-sm text-slate-600">
                        <MapPin className="w-4 h-4" />
                        {opp.location}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        {opp.hours}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {opp.type}
                      </span>
                    </div>
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                      Apply Now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'college' && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <EarlyCollegeCreditPanel 
                  studentGrade={studentInfo.grade}
                  studentLocation="CNMI"
                />
              </motion.div>
            )}

            {activeTab === 'microgigs' && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <MicroGigsPanel 
                  studentLevel="high-school"
                  studentLocation="CNMI"
                />
              </motion.div>
            )}

            {activeTab === 'certifications' && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CertificationModulesPanel 
                  studentLevel="high-school"
                />
              </motion.div>
            )}

            {activeTab === 'awards' && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CoOpVotingPanel userType="student" cohortName="Spring 2026" />
                <RegionalNominationsPanel region="CNMI" />
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Messages */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-slate-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">Messages</h2>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                    {recentMessages.filter((m) => m.unread).length}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-lg border ${
                      msg.unread ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-slate-900">{msg.from}</div>
                        <div className="text-xs text-slate-500">{msg.role}</div>
                      </div>
                      <div className="text-xs text-slate-500">{msg.time}</div>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{msg.message}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-200">
                <button className="w-full py-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View All Messages
                </button>
              </div>
            </motion.div>

            {/* Wellbeing Check */}
            <motion.div
              className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6" />
                <h3 className="text-xl font-bold">How are you feeling?</h3>
              </div>
              <p className="text-purple-100 mb-4 text-sm">
                Take a moment to check in with yourself.
              </p>
              <button className="w-full py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition">
                Daily Check-In
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm transition flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Submit Report
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm transition flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    View Schedule
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm transition flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    View Certificates
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}