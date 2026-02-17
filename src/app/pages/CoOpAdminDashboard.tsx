import { useState } from 'react';
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
  XCircle,
  Eye,
  Mail,
  Phone
} from 'lucide-react';
import { FunctionRotationOverview, CoOpMessagesList } from '@/app/components/coop';
import { RegionalTalentFeed, CareerServicesBoard } from '@/app/components/college';

interface CoOpAdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function CoOpAdminDashboard({ onNavigate }: CoOpAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'employers' | 'alerts' | 'network'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [messageFilter, setMessageFilter] = useState<'ALL' | 'ATTENDANCE'>('ALL');

  // Mock data
  const stats = {
    totalStudents: 145,
    placementsFilled: 98,
    openRoles: 23,
    unmatchedStudents: 47,
    activeEmployers: 34,
    pendingApprovals: 8,
  };

  // Function rotation data
  const functionRotationData = {
    activeDepartmentsCount: 8,
    studentsWith3PlusFunctions: 23,
    avgFunctionsPerStudent: 2.4,
    studentSummaries: [
      {
        studentId: '1',
        studentName: 'Maria Santos',
        schoolName: 'Saipan Southern High School',
        currentBusinessName: 'Kalaayan Inc',
        currentFunctionName: 'Food Service',
        totalFunctionsExperienced: 3,
      },
      {
        studentId: '2',
        studentName: 'John Reyes',
        schoolName: 'Marianas High School',
        currentBusinessName: 'Pacific Development Inc.',
        currentFunctionName: 'Office Administration',
        totalFunctionsExperienced: 2,
      },
      {
        studentId: '3',
        studentName: 'Emily Chen',
        schoolName: 'Saipan Southern High School',
        currentBusinessName: 'Saipan Grand Hotel',
        currentFunctionName: 'Customer Service',
        totalFunctionsExperienced: 4,
      },
      {
        studentId: '4',
        studentName: 'David Cabrera',
        schoolName: 'Marianas High School',
        currentBusinessName: 'Marianas Visitors Authority',
        currentFunctionName: 'Marketing & Social Media',
        totalFunctionsExperienced: 2,
      },
      {
        studentId: '5',
        studentName: 'Sarah Johnson',
        schoolName: 'Saipan Southern High School',
        currentBusinessName: 'Northern Marianas College',
        currentFunctionName: 'IT Support',
        totalFunctionsExperienced: 3,
      },
    ],
  };

  // Messages data
  const messageThreads = [
    {
      id: 'thread_1',
      subject: "Today's shift - running late",
      studentName: 'Maria Santos',
      businessName: 'Kalaayan Inc',
      hasAttendanceFlag: true,
      lastMessageAt: '10 minutes ago',
      unreadForAdmin: true,
    },
    {
      id: 'thread_2',
      subject: 'Question about deliverables',
      studentName: 'John Reyes',
      businessName: 'Pacific Development Inc.',
      hasAttendanceFlag: false,
      lastMessageAt: '1 hour ago',
      unreadForAdmin: false,
    },
    {
      id: 'thread_3',
      subject: 'Student absent today',
      studentName: 'Emily Chen',
      businessName: 'Saipan Grand Hotel',
      hasAttendanceFlag: true,
      lastMessageAt: '2 hours ago',
      unreadForAdmin: true,
    },
    {
      id: 'thread_4',
      subject: 'Great progress this week',
      studentName: 'Sarah Johnson',
      businessName: 'Northern Marianas College',
      hasAttendanceFlag: false,
      lastMessageAt: 'Yesterday',
      unreadForAdmin: false,
    },
  ];

  const riskFlags = [
    {
      id: 1,
      type: 'No Applications',
      student: 'John Reyes',
      grade: '11th',
      daysInactive: 21,
      severity: 'high',
      icon: AlertTriangle,
    },
    {
      id: 2,
      type: 'Placement Ending Soon',
      student: 'Maria Santos',
      employer: 'Pacific Development Inc.',
      daysRemaining: 14,
      severity: 'medium',
      icon: Clock,
    },
    {
      id: 3,
      type: 'No Applications',
      student: 'David Cabrera',
      grade: '12th',
      daysInactive: 35,
      severity: 'high',
      icon: AlertTriangle,
    },
    {
      id: 4,
      type: 'Low Hours Logged',
      student: 'Sarah Johnson',
      hoursLogged: 8,
      expectedHours: 24,
      severity: 'medium',
      icon: XCircle,
    },
  ];

  const students = [
    {
      id: 1,
      name: 'Maria Santos',
      grade: '11th',
      school: 'Saipan Southern High School',
      status: 'Placed',
      employer: 'Pacific Development Inc.',
      hoursCompleted: 45,
      hoursRequired: 120,
      email: 'm.santos@student.edu',
      phone: '+1 (670) 123-4567',
    },
    {
      id: 2,
      name: 'John Reyes',
      grade: '11th',
      school: 'Marianas High School',
      status: 'Searching',
      employer: null,
      hoursCompleted: 0,
      hoursRequired: 120,
      email: 'j.reyes@student.edu',
      phone: '+1 (670) 234-5678',
    },
    {
      id: 3,
      name: 'Emily Chen',
      grade: '12th',
      school: 'Saipan Southern High School',
      status: 'Interviewing',
      employer: 'Saipan Grand Hotel',
      hoursCompleted: 0,
      hoursRequired: 100,
      email: 'e.chen@student.edu',
      phone: '+1 (670) 345-6789',
    },
    {
      id: 4,
      name: 'David Cabrera',
      grade: '12th',
      school: 'Marianas High School',
      status: 'Searching',
      employer: null,
      hoursCompleted: 0,
      hoursRequired: 100,
      email: 'd.cabrera@student.edu',
      phone: '+1 (670) 456-7890',
    },
  ];

  const employers = [
    { name: 'Pacific Development Inc.', placements: 12, rating: 4.8 },
    { name: 'Saipan Grand Hotel', placements: 8, rating: 4.6 },
    { name: 'CNMI Government', placements: 15, rating: 4.9 },
    { name: 'Marianas Visitors Authority', placements: 6, rating: 4.7 },
    { name: 'Northern Marianas College', placements: 5, rating: 4.5 },
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'New Employer',
      name: 'Island Tech Solutions',
      submittedDate: 'Feb 15, 2026',
      contact: 'Mike Johnson',
    },
    {
      id: 2,
      type: 'Job Posting',
      name: 'Social Media Coordinator',
      employer: 'Marianas Visitors Authority',
      submittedDate: 'Feb 14, 2026',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Placed':
        return 'bg-green-100 text-green-800';
      case 'Interviewing':
        return 'bg-blue-100 text-blue-800';
      case 'Searching':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Regional Network data (shared across NMTECH, NMC, and Admins)
  const regionalFeed = [
    {
      id: '1',
      type: 'CO_OP_POSTING' as const,
      title: 'New Co-Op Position: IT Support at Saipan Grand Hotel',
      description: 'Hotel is seeking a high school co-op student interested in IT and technology support',
      timestamp: '2 hours ago',
      region: 'CNMI' as const,
      source: 'Saipan Grand Hotel',
      metadata: {
        employerName: 'Saipan Grand Hotel',
      },
    },
    {
      id: '2',
      type: 'STUDENT_MILESTONE' as const,
      title: 'Maria Santos Completed Co-Op Program',
      description: 'Student from Saipan Southern HS completed 120/120 hours at Pacific Development Inc.',
      timestamp: '5 hours ago',
      region: 'CNMI' as const,
      source: 'DA\'OK Academy',
      metadata: {
        studentName: 'Maria Santos',
        hoursCompleted: 120,
        employerName: 'Pacific Development Inc.',
      },
    },
    {
      id: '3',
      type: 'NEW_EMPLOYER' as const,
      title: 'Kalaayan Inc Joined ZALPHA Co-Op Network',
      description: 'Local restaurant and catering business now offering food service placements',
      timestamp: '1 day ago',
      region: 'CNMI' as const,
      source: 'ZALPHA Platform',
      metadata: {
        employerName: 'Kalaayan Inc',
      },
    },
    {
      id: '4',
      type: 'COLLEGE_PROGRAM' as const,
      title: 'NMTECH Launches New IT Certificate Program',
      description: 'Fast-track IT certification program now available for co-op graduates',
      timestamp: '2 days ago',
      region: 'CNMI' as const,
      source: 'NMTECH',
      metadata: {
        programName: 'IT Certificate',
      },
    },
  ];

  const boardPosts = [
    {
      id: 'post_1',
      type: 'QUESTION' as const,
      title: 'Best practices for engaging co-op students in virtual career fairs?',
      body: 'We\'re planning our first virtual career fair and want to make sure co-op students are engaged. What has worked well for you?',
      author: 'Christine Deleon',
      authorRole: 'Co-Op Coordinator',
      authorInstitution: 'DA\'OK Academy',
      region: 'CNMI' as const,
      tags: ['Virtual Events', 'Student Engagement', 'Co-Op'],
      upvotes: 12,
      commentCount: 8,
      views: 156,
      timestamp: '3 hours ago',
      isBookmarked: false,
      hasUpvoted: false,
    },
    {
      id: 'post_2',
      type: 'RESOURCE_SHARE' as const,
      title: 'Free Resume Workshop Materials - Download Now',
      body: 'Our team created comprehensive resume workshop materials specifically for Pacific Islander students. Includes templates, examples, and facilitation guides.',
      author: 'Neda De Leon Guerro',
      authorRole: 'Career Services Director',
      authorInstitution: 'Northern Marianas College',
      region: 'CNMI' as const,
      tags: ['Resources', 'Resume', 'Student Support'],
      upvotes: 28,
      commentCount: 15,
      views: 342,
      timestamp: '1 day ago',
      isBookmarked: true,
      hasUpvoted: true,
    },
    {
      id: 'post_3',
      type: 'SUCCESS_STORY' as const,
      title: '🎉 100% Job Placement Rate for Our IT Graduates',
      body: 'Excited to share that all 15 of our Information Technology program graduates secured employment within 3 months! Here\'s what worked...',
      author: 'Ben Babauta',
      authorRole: 'Career Services Director',
      authorInstitution: 'NMTECH',
      region: 'CNMI' as const,
      tags: ['Success Story', 'IT Program', 'Job Placement'],
      upvotes: 45,
      commentCount: 22,
      views: 489,
      timestamp: '2 days ago',
      isBookmarked: false,
      hasUpvoted: false,
    },
    {
      id: 'post_4',
      type: 'EVENT' as const,
      title: 'Pacific Islands Co-Op Coordinators Summit - April 2026',
      body: 'Join us in Guam for our annual summit! Share strategies, network with colleagues, and learn about new funding opportunities.',
      author: 'Brandon Mafnas',
      authorRole: 'Co-Op Admin',
      authorInstitution: 'DA\'OK Academy',
      region: 'ALL_PACIFIC' as const,
      tags: ['Event', 'Professional Development', 'Networking'],
      upvotes: 34,
      commentCount: 18,
      views: 278,
      timestamp: '4 days ago',
      isBookmarked: false,
      hasUpvoted: false,
    },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Back Button */}
        <BackButton onNavigate={onNavigate} label="Back to Co-Op Login" variant="dark" />

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black mb-2">Co-Op Admin Dashboard 🎓</h1>
              <p className="text-purple-100">
                Program Management • Student Placements • Employer Relations
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalStudents}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.placementsFilled}</div>
            <div className="text-sm text-gray-600">Placements Filled</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.openRoles}</div>
            <div className="text-sm text-gray-600">Open Roles</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-100">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.unmatchedStudents}</div>
            <div className="text-sm text-gray-600">Unmatched</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.activeEmployers}</div>
            <div className="text-sm text-gray-600">Active Employers</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-100">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pendingApprovals}</div>
            <div className="text-sm text-gray-600">Pending Approvals</div>
          </div>
        </div>

        {/* Risk Flags Alert */}
        {riskFlags.length > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">⚠️ Action Required: {riskFlags.length} Risk Flags</h3>
                <p className="text-red-100 text-sm mb-4">
                  Students need immediate attention to stay on track for graduation requirements
                </p>
                <button
                  onClick={() => setActiveTab('alerts')}
                  className="px-6 py-3 bg-white text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all"
                >
                  View All Risk Flags
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pending Approvals */}
        {pendingApprovals.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-purple-600" />
              Pending Approvals ({pendingApprovals.length})
            </h3>
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs font-bold rounded-full">
                        {item.type}
                      </span>
                      <span className="font-bold text-gray-900">{item.name}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.type === 'New Employer' ? `Contact: ${item.contact}` : `Employer: ${item.employer}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Submitted: {item.submittedDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all text-sm">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all text-sm">
                      Deny
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'students'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Student Roster
          </button>
          <button
            onClick={() => setActiveTab('employers')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'employers'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Employers
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-6 py-3 rounded-xl font-bold transition-all relative ${
              activeTab === 'alerts'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Risk Flags
            {riskFlags.length > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {riskFlags.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'network'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Regional Network
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Employers */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Top Employers by Placements
              </h3>
              <div className="space-y-3">
                {employers.map((employer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{employer.name}</p>
                        <p className="text-sm text-gray-600">{employer.placements} active placements</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-yellow-600">
                        <span className="text-lg">⭐</span>
                        <span className="font-bold">{employer.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Program Health Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Placement Rate</h3>
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {Math.round((stats.placementsFilled / stats.totalStudents) * 100)}%
                </div>
                <p className="text-gray-600 mb-4">
                  {stats.placementsFilled} of {stats.totalStudents} students placed
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                    style={{ width: `${(stats.placementsFilled / stats.totalStudents) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Students Needing Placement</h3>
                <div className="text-5xl font-bold text-orange-600 mb-2">
                  {stats.unmatchedStudents}
                </div>
                <p className="text-gray-600 mb-4">Students actively searching</p>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:shadow-xl transition-all">
                  View Unmatched Students
                </button>
              </div>
            </div>

            {/* NEW CO-OP COMPONENTS */}
            {/* Function Rotation Overview */}
            <FunctionRotationOverview
              {...functionRotationData}
              onOpenStudentRotation={(studentId) => console.log('Open student rotation:', studentId)}
            />

            {/* Co-Op Messages List */}
            <CoOpMessagesList
              threads={messageThreads}
              filter={messageFilter}
              onFilterChange={setMessageFilter}
              onOpenThread={(threadId) => console.log('Open thread:', threadId)}
            />
          </div>
        )}

        {/* Student Roster Tab */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter
                </button>
              </div>
            </div>

            {/* Student List */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Student</th>
                      <th className="px-6 py-4 text-left font-bold">Grade</th>
                      <th className="px-6 py-4 text-left font-bold">Status</th>
                      <th className="px-6 py-4 text-left font-bold">Employer</th>
                      <th className="px-6 py-4 text-left font-bold">Hours Progress</th>
                      <th className="px-6 py-4 text-left font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-purple-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.school}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900 font-medium">{student.grade}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900 text-sm">{student.employer || 'Not placed'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-32">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>{student.hoursCompleted}</span>
                              <span>{student.hoursRequired}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                                style={{ width: `${(student.hoursCompleted / student.hoursRequired) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all">
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Employers Tab */}
        {activeTab === 'employers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Participating Employers</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-xl transition-all">
                + Add New Employer
              </button>
            </div>

            {employers.map((employer, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{employer.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {employer.placements} placements
                      </div>
                      <div className="flex items-center gap-1 text-yellow-600">
                        <span>⭐</span>
                        <span className="font-bold">{employer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all text-sm">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-all text-sm">
                      View Postings
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Risk Flags Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Risk Flags & Alerts</h2>
              <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                {riskFlags.length} Issues
              </span>
            </div>

            {riskFlags.map((flag) => {
              const Icon = flag.icon;
              return (
                <div
                  key={flag.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${
                    flag.severity === 'high' ? 'border-red-300' : 'border-yellow-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        flag.severity === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${flag.severity === 'high' ? 'text-red-600' : 'text-yellow-600'}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            flag.severity === 'high'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {flag.severity === 'high' ? 'High Priority' : 'Medium Priority'}
                        </span>
                        <span className="font-bold text-gray-900">{flag.type}</span>
                      </div>
                      <p className="text-gray-900 font-semibold mb-2">{flag.student}</p>
                      {flag.grade && <p className="text-sm text-gray-600">Grade: {flag.grade}</p>}
                      {flag.daysInactive && (
                        <p className="text-sm text-gray-600">Inactive for {flag.daysInactive} days</p>
                      )}
                      {flag.employer && <p className="text-sm text-gray-600">Employer: {flag.employer}</p>}
                      {flag.daysRemaining && (
                        <p className="text-sm text-gray-600">Placement ends in {flag.daysRemaining} days</p>
                      )}
                      {flag.hoursLogged !== undefined && (
                        <p className="text-sm text-gray-600">
                          Hours: {flag.hoursLogged} / {flag.expectedHours} (this month)
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all text-sm whitespace-nowrap">
                        Contact Student
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all text-sm whitespace-nowrap">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Regional Network Tab */}
        {activeTab === 'network' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regional Career Services Network</h2>

            {/* Regional Talent Feed */}
            <RegionalTalentFeed
              items={regionalFeed}
              onViewDetails={(id) => console.log('View details:', id)}
            />

            {/* Career Services Board */}
            <CareerServicesBoard
              posts={boardPosts}
              onCreatePost={() => console.log('Create post')}
              onViewPost={(id) => console.log('View post:', id)}
              onUpvote={(id) => console.log('Upvote post:', id)}
              onBookmark={(id) => console.log('Bookmark post:', id)}
              onComment={(id) => console.log('Comment on post:', id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}