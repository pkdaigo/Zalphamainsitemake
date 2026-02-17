import { useState } from 'react';
import { motion } from 'motion/react';
import { BackButton } from '@/app/components/BackButton';
import {
  Users,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Building2,
  FileText,
  Download,
  Search,
  Filter,
  UserCheck,
  Clock,
  Target,
  MapPin,
  GraduationCap,
  Award,
  Newspaper,
  ExternalLink,
  Calendar,
  Bell,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronRight,
  TrendingDown,
  Eye,
  BookOpen,
  Globe,
  Trophy
} from 'lucide-react';
import { RegionalNominationsPanel, CollegeSchoolAwards } from '@/app/components/coop';

interface CoOpAdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function CoOpAdminDashboard({ onNavigate }: CoOpAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'employers' | 'placements' | 'awards'>('overview');

  // Mock stats
  const stats = {
    totalStudents: 145,
    activeCoOps: 98,
    completionRate: 87,
    avgHoursPerWeek: 18.5,
    upcomingPlacements: 23,
    pendingApprovals: 8,
    totalHoursLogged: 12450,
    employerPartners: 34,
  };

  // Pacific region news
  const pacificNews = [
    {
      id: 1,
      title: 'CNMI PSS Launches New Career Pathways Program',
      source: 'Marianas Variety',
      date: 'Feb 15, 2026',
      category: 'CNMI',
      url: '#',
      excerpt: 'Public School System introduces expanded career and technical education opportunities for high school students...'
    },
    {
      id: 2,
      title: 'Guam DOE Partners with Local Businesses for Work-Based Learning',
      source: 'Pacific Daily News',
      date: 'Feb 12, 2026',
      category: 'Guam',
      url: '#',
      excerpt: 'Department of Education announces 50 new partnerships with island businesses to provide hands-on learning experiences...'
    },
    {
      id: 3,
      title: 'FSM National Government Invests in Youth Employment Programs',
      source: 'Island Times',
      date: 'Feb 10, 2026',
      category: 'FSM',
      url: '#',
      excerpt: 'Congress of the Federated States of Micronesia approves $2M funding for vocational training initiatives...'
    },
    {
      id: 4,
      title: 'Palau Ministry of Education Expands CTE Curriculum',
      source: 'Island Times',
      date: 'Feb 8, 2026',
      category: 'Palau',
      url: '#',
      excerpt: 'New courses in hospitality, marine science, and renewable energy added to career technical education offerings...'
    },
    {
      id: 5,
      title: 'RMI PSS Graduates First Cohort of Work-Ready Students',
      source: 'Marshall Islands Journal',
      date: 'Feb 5, 2026',
      category: 'RMI',
      url: '#',
      excerpt: '45 students complete intensive work-based learning program with job placement support...'
    },
  ];

  // Recent students
  const recentStudents = [
    {
      id: 1,
      name: 'Maria Santos',
      school: 'Saipan Southern High School',
      employer: 'Kalaayan Inc.',
      position: 'Food Service Assistant',
      hours: 45,
      totalHours: 120,
      status: 'On Track',
      attendance: 98,
    },
    {
      id: 2,
      name: 'John Reyes',
      school: 'Marianas High School',
      employer: 'Pacific Development Inc.',
      position: 'Office Assistant',
      hours: 52,
      totalHours: 120,
      status: 'On Track',
      attendance: 100,
    },
    {
      id: 3,
      name: 'Emily Chen',
      school: 'Saipan Southern High School',
      employer: 'Saipan Grand Hotel',
      position: 'Front Desk Trainee',
      hours: 38,
      totalHours: 120,
      status: 'At Risk',
      attendance: 85,
    },
    {
      id: 4,
      name: 'David Cabrera',
      school: 'Marianas High School',
      employer: 'Marianas Visitors Authority',
      position: 'Marketing Intern',
      hours: 67,
      totalHours: 120,
      status: 'Ahead',
      attendance: 100,
    },
  ];

  // Pending approvals
  const pendingApprovals = [
    {
      id: 1,
      type: 'Placement Request',
      student: 'Sarah Johnson',
      employer: 'Northern Marianas College',
      requestDate: '2 days ago',
      priority: 'high',
    },
    {
      id: 2,
      type: 'Hours Verification',
      student: 'Michael Torres',
      hours: 24,
      weekEnding: 'Feb 14, 2026',
      priority: 'medium',
    },
    {
      id: 3,
      type: 'New Employer Application',
      employer: 'Pacific Islands Club',
      contactName: 'Lisa Martinez',
      priority: 'low',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BackButton onClick={() => onNavigate('co-op-login')} />

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                    Co-Op Coordinator Dashboard
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Managing {stats.totalStudents} students across {stats.employerPartners} employer partners
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Report
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </motion.button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'employers', label: 'Employers', icon: Building2 },
              { id: 'placements', label: 'Placements', icon: Briefcase },
              { id: 'awards', label: 'Awards', icon: Trophy },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +12%
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900">{stats.totalStudents}</div>
                <div className="text-sm text-slate-600 mt-1">Total Students</div>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Briefcase className="w-8 h-8 text-green-600" />
                  <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +8%
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900">{stats.activeCoOps}</div>
                <div className="text-sm text-slate-600 mt-1">Active Placements</div>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Target className="w-8 h-8 text-purple-600" />
                  <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +5%
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900">{stats.completionRate}%</div>
                <div className="text-sm text-slate-600 mt-1">Completion Rate</div>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Clock className="w-8 h-8 text-orange-600" />
                  <span className="text-orange-600 text-sm font-semibold flex items-center gap-1">
                    <Bell className="w-4 h-4" />
                    {stats.pendingApprovals}
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900">{stats.totalHoursLogged}</div>
                <div className="text-sm text-slate-600 mt-1">Total Hours Logged</div>
              </motion.div>
            </div>

            {/* Awards */}
            {activeTab === 'awards' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CollegeSchoolAwards region="Pacific" />
                <RegionalNominationsPanel region="CNMI" />
              </motion.div>
            )}

            {activeTab !== 'awards' && (
              <>
                {/* Recent Students */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                      <h2 className="text-xl font-bold text-slate-900">Student Progress</h2>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Student</th>
                          <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Employer</th>
                          <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Hours</th>
                          <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                          <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {recentStudents.map((student) => (
                          <tr key={student.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-semibold text-slate-900">{student.name}</div>
                                <div className="text-sm text-slate-500">{student.school}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-slate-900">{student.employer}</div>
                                <div className="text-sm text-slate-500">{student.position}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-semibold text-slate-900">{student.hours}/{student.totalHours}</div>
                                <div className="w-32 bg-slate-200 rounded-full h-2 mt-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                                    style={{ width: `${(student.hours / student.totalHours) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                  student.status === 'On Track'
                                    ? 'bg-green-100 text-green-700'
                                    : student.status === 'Ahead'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-orange-100 text-orange-700'
                                }`}
                              >
                                {student.status === 'On Track' ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : student.status === 'Ahead' ? (
                                  <TrendingUp className="w-3 h-3" />
                                ) : (
                                  <AlertTriangle className="w-3 h-3" />
                                )}
                                {student.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
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

                {/* Pending Approvals */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-slate-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                      <h2 className="text-xl font-bold text-slate-900">Pending Approvals</h2>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                        {stats.pendingApprovals}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {pendingApprovals.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              item.priority === 'high'
                                ? 'bg-red-100'
                                : item.priority === 'medium'
                                ? 'bg-orange-100'
                                : 'bg-blue-100'
                            }`}
                          >
                            <FileText
                              className={`w-5 h-5 ${
                                item.priority === 'high'
                                  ? 'text-red-600'
                                  : item.priority === 'medium'
                                  ? 'text-orange-600'
                                  : 'text-blue-600'
                              }`}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{item.type}</div>
                            <div className="text-sm text-slate-600 mt-1">
                              {'student' in item && item.student}
                              {'employer' in item && item.employer}
                              {'hours' in item && `${item.hours} hours`}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              {'requestDate' in item && item.requestDate}
                              {'weekEnding' in item && `Week ending ${item.weekEnding}`}
                              {'contactName' in item && `Contact: ${item.contactName}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition">
                            Approve
                          </button>
                          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition">
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </div>

          {/* Right Column - News Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Pacific Region News */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-500 to-cyan-500">
                <div className="flex items-center gap-3 text-white">
                  <Newspaper className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Pacific Education News</h2>
                </div>
                <p className="text-blue-100 text-sm mt-2">Latest updates from across the Pacific</p>
              </div>
              <div className="max-h-[800px] overflow-y-auto">
                <div className="p-4 space-y-3">
                  {pacificNews.map((news) => (
                    <motion.a
                      key={news.id}
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            news.category === 'CNMI'
                              ? 'bg-blue-100 text-blue-700'
                              : news.category === 'Guam'
                              ? 'bg-green-100 text-green-700'
                              : news.category === 'FSM'
                              ? 'bg-purple-100 text-purple-700'
                              : news.category === 'Palau'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {news.category}
                        </span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition flex-shrink-0" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                        {news.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{news.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {news.source}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {news.date}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
                <div className="p-4 border-t border-slate-200 bg-slate-50">
                  <button className="w-full py-2 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    View All News
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}