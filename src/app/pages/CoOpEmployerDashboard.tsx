import { useState } from 'react';
import { motion } from 'motion/react';
import { BackButton } from '@/app/components/BackButton';
import {
  Briefcase,
  Users,
  CheckCircle,
  Clock,
  Star,
  Plus,
  Eye,
  Calendar,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Building2,
  Target,
  Award,
  FileText,
  ChevronRight,
  MapPin,
  DollarSign,
  Filter,
  Search,
  Settings,
  Download,
  ThumbsUp,
  XCircle,
  Mail,
  Phone,
  UserCheck,
  Bell,
  Trophy,
} from 'lucide-react';
import { CoOpVotingPanel } from '@/app/components/coop';

interface CoOpEmployerDashboardProps {
  onNavigate: (page: string) => void;
}

export function CoOpEmployerDashboard({ onNavigate }: CoOpEmployerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'postings' | 'students' | 'applications' | 'awards'>('overview');

  // Mock employer data
  const employerInfo = {
    name: 'Pacific Development Inc.',
    contactPerson: 'John Anderson',
    industry: 'Business Services',
    totalPlacements: 24,
    activePlacements: 5,
    rating: 4.8,
    reviewCount: 18,
  };

  // Stats
  const stats = {
    activePostings: 3,
    totalApplicants: 24,
    currentStudents: 5,
    completedPlacements: 19,
  };

  // Active postings
  const activePostings = [
    {
      id: 1,
      title: 'Front Desk Assistant',
      department: 'Reception',
      hours: '15-20 hrs/week',
      applicants: 12,
      status: 'Active',
      postedDate: 'Feb 10, 2026',
      urgency: 'high',
    },
    {
      id: 2,
      title: 'Marketing Intern',
      department: 'Marketing',
      hours: '10-15 hrs/week',
      applicants: 8,
      status: 'Active',
      postedDate: 'Feb 8, 2026',
      urgency: 'medium',
    },
    {
      id: 3,
      title: 'IT Support Trainee',
      department: 'Technology',
      hours: '12-16 hrs/week',
      applicants: 4,
      status: 'Active',
      postedDate: 'Feb 5, 2026',
      urgency: 'low',
    },
  ];

  // Current students
  const currentStudents = [
    {
      id: 1,
      name: 'Maria Santos',
      school: 'Saipan Southern High School',
      position: 'Office Assistant',
      startDate: 'Jan 15, 2026',
      hoursCompleted: 45,
      hoursTotal: 120,
      attendance: 98,
      performance: 4.8,
      status: 'On Track',
    },
    {
      id: 2,
      name: 'John Reyes',
      school: 'Marianas High School',
      position: 'Administrative Assistant',
      startDate: 'Jan 10, 2026',
      hoursCompleted: 52,
      hoursTotal: 120,
      attendance: 100,
      performance: 5.0,
      status: 'Excellent',
    },
    {
      id: 3,
      name: 'Emily Chen',
      school: 'Saipan Southern High School',
      position: 'Reception Trainee',
      startDate: 'Feb 1, 2026',
      hoursCompleted: 24,
      hoursTotal: 120,
      attendance: 92,
      performance: 4.5,
      status: 'Good',
    },
  ];

  // Pending applications
  const pendingApplications = [
    {
      id: 1,
      name: 'Sarah Johnson',
      school: 'Northern Marianas College',
      position: 'Front Desk Assistant',
      appliedDate: '2 days ago',
      gpa: 3.8,
      skills: ['Customer Service', 'Microsoft Office', 'Communication'],
      priority: 'high',
    },
    {
      id: 2,
      name: 'Michael Torres',
      school: 'Marianas High School',
      position: 'Marketing Intern',
      appliedDate: '3 days ago',
      gpa: 3.6,
      skills: ['Social Media', 'Graphic Design', 'Writing'],
      priority: 'medium',
    },
    {
      id: 3,
      name: 'Lisa Martinez',
      school: 'Saipan Southern High School',
      position: 'IT Support Trainee',
      appliedDate: '5 days ago',
      gpa: 3.9,
      skills: ['Technical Support', 'Troubleshooting', 'Windows'],
      priority: 'low',
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'application',
      message: 'Sarah Johnson applied for Front Desk Assistant',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'hours',
      message: 'Maria Santos logged 4 hours',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'message',
      message: 'New message from John Reyes',
      time: '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <BackButton onClick={() => onNavigate('co-op-login')} />

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
                  <Building2 className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black mb-1">{employerInfo.name}</h1>
                  <p className="text-purple-100 mb-2">{employerInfo.industry}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                      <span className="font-semibold">{employerInfo.rating}</span>
                      <span className="text-purple-200">({employerInfo.reviewCount} reviews)</span>
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold">
                      {employerInfo.totalPlacements} Total Placements
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl transition flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Post New Role
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition"
                >
                  <Settings className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <Briefcase className="w-8 h-8 text-purple-600" />
              <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +2
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">{stats.activePostings}</div>
            <div className="text-sm text-slate-600 mt-1">Active Postings</div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="text-blue-600 text-sm font-semibold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +6
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">{stats.totalApplicants}</div>
            <div className="text-sm text-slate-600 mt-1">Total Applicants</div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-green-600" />
              <span className="text-green-600 text-sm font-semibold">Active</span>
            </div>
            <div className="text-3xl font-black text-slate-900">{stats.currentStudents}</div>
            <div className="text-sm text-slate-600 mt-1">Current Students</div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="w-8 h-8 text-cyan-600" />
              <span className="text-cyan-600 text-sm font-semibold flex items-center gap-1">
                <Award className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">{stats.completedPlacements}</div>
            <div className="text-sm text-slate-600 mt-1">Completed</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview', icon: Target },
            { id: 'postings', label: 'Job Postings', icon: Briefcase },
            { id: 'students', label: 'Current Students', icon: Users },
            { id: 'applications', label: 'Applications', icon: FileText },
            { id: 'awards', label: 'Awards', icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
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
            {activeTab === 'overview' && (
              <>
                {/* Current Students Quick View */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-slate-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-green-600" />
                      <h2 className="text-xl font-bold text-slate-900">Current Students</h2>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    {currentStudents.slice(0, 3).map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{student.name}</div>
                            <div className="text-sm text-slate-600">{student.position}</div>
                            <div className="text-xs text-slate-500 mt-1">{student.school}</div>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-slate-600">
                                {student.hoursCompleted}/{student.hoursTotal} hrs
                              </span>
                              <span className="text-xs text-green-600 font-semibold">
                                {student.attendance}% attendance
                              </span>
                              <span className="flex items-center gap-1 text-xs text-yellow-600 font-semibold">
                                <Star className="w-3 h-3 fill-yellow-600" />
                                {student.performance}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition">
                            View Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Pending Applications */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-slate-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                      <h2 className="text-xl font-bold text-slate-900">Pending Applications</h2>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                        {pendingApplications.length}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {pendingApplications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {app.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="font-semibold text-slate-900">{app.name}</div>
                              <span className="text-xs text-slate-500">• {app.appliedDate}</span>
                            </div>
                            <div className="text-sm text-slate-600 mb-2">{app.position}</div>
                            <div className="text-xs text-slate-500 mb-2">{app.school} • GPA: {app.gpa}</div>
                            <div className="flex flex-wrap gap-2">
                              {app.skills.map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            Accept
                          </button>
                          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {activeTab === 'postings' && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {activePostings.map((posting, index) => (
                  <motion.div
                    key={posting.id}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{posting.title}</h3>
                        <p className="text-slate-600">{posting.department} • {posting.hours}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {posting.urgency === 'high' && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                            Urgent
                          </span>
                        )}
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          {posting.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-black text-slate-900">{posting.applicants}</div>
                        <div className="text-xs text-slate-600">Applicants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-slate-900">{posting.postedDate}</div>
                        <div className="text-xs text-slate-600">Posted</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-slate-900">{posting.hours}</div>
                        <div className="text-xs text-slate-600">Hours/Week</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                        View Applicants
                      </button>
                      <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition">
                        Edit
                      </button>
                      <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition">
                        Close
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'students' && (
              <motion.div
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase">Student</th>
                        <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase">Position</th>
                        <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase">Progress</th>
                        <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase">Performance</th>
                        <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-slate-900">{student.name}</div>
                              <div className="text-sm text-slate-500">{student.school}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">{student.position}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-slate-900 mb-1">
                                {student.hoursCompleted}/{student.hoursTotal} hrs
                              </div>
                              <div className="w-32 bg-slate-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                  style={{ width: `${(student.hoursCompleted / student.hoursTotal) * 100}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-semibold text-slate-900">{student.performance}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'applications' && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {pendingApplications.map((app, index) => (
                  <motion.div
                    key={app.id}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-1">{app.name}</h3>
                          <p className="text-slate-600 mb-2">{app.school} • GPA: {app.gpa}</p>
                          <div className="flex flex-wrap gap-2">
                            {app.skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-slate-500">{app.appliedDate}</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg mb-4">
                      <div className="font-semibold text-slate-900 mb-1">Applied for: {app.position}</div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        Accept Application
                      </button>
                      <button className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition">
                        View Full Profile
                      </button>
                      <button className="px-6 py-3 bg-white border border-red-300 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Decline
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'awards' && (
              <CoOpVotingPanel userType="employer" cohortName="Spring 2026" />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-slate-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <Bell className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-900 font-medium mb-1">{activity.message}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-purple-100">New Applications</span>
                  <span className="text-2xl font-black">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-100">Hours Logged</span>
                  <span className="text-2xl font-black">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-100">Avg. Rating</span>
                  <span className="text-2xl font-black flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    4.8
                  </span>
                </div>
              </div>
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
                    <Download className="w-4 h-4" />
                    Export Reports
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm transition flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message Students
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm transition flex items-center justify-between px-4">
                  <span className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Account Settings
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