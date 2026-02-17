import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import {
  Briefcase,
  Users,
  CheckCircle,
  Clock,
  Star,
  Plus,
  Edit,
  Eye,
  Mail,
  Phone,
  Calendar,
  FileText,
  TrendingUp,
  Award,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { EmployerFunctionTemplates, EmployerBadgesPanel } from '@/app/components/coop';

interface CoOpEmployerDashboardProps {
  onNavigate: (page: string) => void;
}

export function CoOpEmployerDashboard({ onNavigate }: CoOpEmployerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'postings' | 'applicants' | 'placements' | 'evaluations' | 'functions'>('postings');

  // Mock data
  const employerInfo = {
    name: 'Pacific Development Inc.',
    contactPerson: 'John Anderson',
    totalPlacements: 12,
    activePlacements: 5,
    rating: 4.8,
  };

  const jobPostings = [
    {
      id: 1,
      title: 'Junior Administrative Assistant',
      status: 'Active',
      applicants: 8,
      interviewed: 3,
      hired: 1,
      postedDate: 'Jan 5, 2026',
      hoursPerWeek: '12-15',
      duration: '4 months',
    },
    {
      id: 2,
      title: 'Marketing Intern',
      status: 'Active',
      applicants: 12,
      interviewed: 5,
      hired: 0,
      postedDate: 'Feb 1, 2026',
      hoursPerWeek: '10-12',
      duration: '3 months',
    },
    {
      id: 3,
      title: 'Data Entry Clerk',
      status: 'Filled',
      applicants: 6,
      interviewed: 2,
      hired: 2,
      postedDate: 'Dec 15, 2025',
      hoursPerWeek: '8-10',
      duration: '5 months',
    },
  ];

  const applicants = [
    {
      id: 1,
      name: 'Emily Chen',
      position: 'Marketing Intern',
      school: 'Saipan Southern High School',
      grade: '12th',
      gpa: 3.8,
      appliedDate: 'Feb 3, 2026',
      status: 'Shortlisted',
      email: 'e.chen@student.edu',
      phone: '+1 (670) 345-6789',
      resumeUrl: '#',
    },
    {
      id: 2,
      name: 'David Cabrera',
      position: 'Marketing Intern',
      school: 'Marianas High School',
      grade: '12th',
      gpa: 3.6,
      appliedDate: 'Feb 5, 2026',
      status: 'New',
      email: 'd.cabrera@student.edu',
      phone: '+1 (670) 456-7890',
      resumeUrl: '#',
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      position: 'Junior Administrative Assistant',
      school: 'Saipan Southern High School',
      grade: '11th',
      gpa: 3.9,
      appliedDate: 'Jan 12, 2026',
      status: 'Interviewed',
      email: 's.johnson@student.edu',
      phone: '+1 (670) 567-8901',
      resumeUrl: '#',
    },
  ];

  const currentPlacements = [
    {
      id: 1,
      name: 'Maria Santos',
      position: 'Junior Administrative Assistant',
      startDate: '2026-01-15',
      expectedEndDate: '2026-05-30',
      hoursCompleted: 45,
      hoursRequired: 120,
      performance: 'Excellent',
      supervisor: 'John Anderson',
      evaluationDue: 'Mar 1, 2026',
    },
    {
      id: 2,
      name: 'Michael Reyes',
      position: 'Data Entry Clerk',
      startDate: '2026-01-20',
      expectedEndDate: '2026-06-15',
      hoursCompleted: 38,
      hoursRequired: 100,
      performance: 'Good',
      supervisor: 'Lisa Martinez',
      evaluationDue: 'Mar 5, 2026',
    },
  ];

  const completedPlacements = [
    {
      id: 1,
      name: 'James Kim',
      position: 'Office Assistant',
      completedDate: '2025-12-20',
      totalHours: 120,
      finalRating: 4.5,
      wouldRehire: true,
    },
    {
      id: 2,
      name: 'Ana Guerrero',
      position: 'Marketing Intern',
      completedDate: '2025-11-30',
      totalHours: 100,
      finalRating: 5.0,
      wouldRehire: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Filled':
        return 'bg-blue-100 text-blue-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      case 'Shortlisted':
        return 'bg-purple-100 text-purple-800';
      case 'Interviewed':
        return 'bg-blue-100 text-blue-800';
      case 'New':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function templates data
  const functionTemplates = [
    {
      id: 'func_1',
      name: 'Food Service',
      description: 'Front-of-house dining operations and customer service',
      defaultDeliverables: [
        { id: 'd1', title: 'Set up dining area', description: 'Arrange tables, chairs, and place settings' },
        { id: 'd2', title: 'Stock supplies and inventory', description: 'Check and refill condiments, napkins, utensils' },
        { id: 'd3', title: 'Clean and sanitize stations', description: 'Wipe surfaces and ensure food safety standards' },
        { id: 'd4', title: 'Customer service duties', description: 'Greet customers, take orders, handle inquiries' },
      ],
    },
    {
      id: 'func_2',
      name: 'Office Administration',
      description: 'Administrative support and office management tasks',
      defaultDeliverables: [
        { id: 'd5', title: 'File and organize documents', description: 'Sort and file paperwork alphabetically' },
        { id: 'd6', title: 'Answer phone calls', description: 'Receive calls and take messages professionally' },
        { id: 'd7', title: 'Data entry tasks', description: 'Input data into spreadsheets and databases' },
        { id: 'd8', title: 'Mail and shipping', description: 'Process outgoing mail and packages' },
      ],
    },
    {
      id: 'func_3',
      name: 'Customer Service',
      description: 'Front-desk reception and customer support',
      defaultDeliverables: [
        { id: 'd9', title: 'Greet and assist customers', description: 'Welcome visitors and answer questions' },
        { id: 'd10', title: 'Handle customer complaints', description: 'Listen to concerns and escalate as needed' },
        { id: 'd11', title: 'Process transactions', description: 'Handle payments and provide receipts' },
      ],
    },
  ];

  // Badges data
  const badgesData = [
    {
      id: 'badge_1',
      name: 'Food Service Explorer',
      description: 'Awarded for completing 5 Food Service shifts with excellent performance',
      creditCost: 50,
      isActive: true,
    },
    {
      id: 'badge_2',
      name: 'Office Pro',
      description: 'Given to students who master all office administration tasks',
      creditCost: 75,
      isActive: true,
    },
    {
      id: 'badge_3',
      name: 'Customer Champion',
      description: 'Earned by students with outstanding customer service ratings',
      creditCost: 60,
      isActive: false,
    },
    {
      id: 'badge_4',
      name: 'Perfect Attendance',
      description: 'Rewarded for completing the entire placement without any absences',
      creditCost: 100,
      isActive: false,
    },
  ];

  const availableCredits = 250;

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-green-50 via-white to-cyan-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Back Button */}
        <BackButton onNavigate={onNavigate} label="Back to Co-Op Login" variant="dark" />

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-black mb-2">{employerInfo.name} 🏢</h1>
              <p className="text-green-100">
                Co-Op Employer Portal • Contact: {employerInfo.contactPerson}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className="text-3xl font-bold">{employerInfo.rating}</span>
              </div>
              <p className="text-sm text-green-100">Employer Rating</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{jobPostings.length}</div>
            <div className="text-sm text-gray-600">Job Postings</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {jobPostings.reduce((sum, job) => sum + job.applicants, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Applicants</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{currentPlacements.length}</div>
            <div className="text-sm text-gray-600">Active Placements</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{employerInfo.totalPlacements}</div>
            <div className="text-sm text-gray-600">Total Placements</div>
          </div>
        </div>

        {/* Evaluation Reminders */}
        {currentPlacements.some((p) => p.evaluationDue) && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">📋 Student Evaluations Due</h3>
                <p className="text-orange-100 text-sm mb-4">
                  {currentPlacements.filter((p) => p.evaluationDue).length} student evaluation(s) are due soon
                </p>
                <button
                  onClick={() => setActiveTab('evaluations')}
                  className="px-6 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
                >
                  Submit Evaluations
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('postings')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'postings'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            My Postings
          </button>
          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'applicants'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Applicants
          </button>
          <button
            onClick={() => setActiveTab('placements')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'placements'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Placements
          </button>
          <button
            onClick={() => setActiveTab('evaluations')}
            className={`px-6 py-3 rounded-xl font-bold transition-all relative ${
              activeTab === 'evaluations'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Evaluations
            {currentPlacements.filter((p) => p.evaluationDue).length > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {currentPlacements.filter((p) => p.evaluationDue).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('functions')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'functions'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Functions
          </button>
        </div>

        {/* Job Postings Tab */}
        {activeTab === 'postings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Job Postings</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Post New Co-op Job
              </button>
            </div>

            {jobPostings.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.hoursPerWeek} hrs/week
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {job.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Posted: {job.postedDate}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>

                {/* Applicant Pipeline */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm">Applicant Pipeline:</h4>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{job.applicants}</div>
                      <div className="text-xs text-gray-600">Applied</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{job.interviewed}</div>
                      <div className="text-xs text-gray-600">Interviewed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{job.hired}</div>
                      <div className="text-xs text-gray-600">Hired</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {job.applicants - job.interviewed}
                      </div>
                      <div className="text-xs text-gray-600">To Review</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all">
                    View Applicants
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                    Edit Posting
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Applicants Tab */}
        {activeTab === 'applicants' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Student Applicants</h2>

            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Student Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {applicant.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{applicant.name}</h3>
                        <p className="text-sm text-gray-600">{applicant.school} • {applicant.grade}</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Applied For</p>
                        <p className="font-semibold text-gray-900">{applicant.position}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">GPA</p>
                        <p className="font-semibold text-gray-900">{applicant.gpa}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-blue-600">{applicant.email}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-900">{applicant.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(applicant.status)}`}>
                        {applicant.status}
                      </span>
                      <span className="text-sm text-gray-500">Applied: {applicant.appliedDate}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-64 space-y-3">
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                      <Eye className="w-5 h-5" />
                      View Full Profile
                    </button>
                    <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all">
                      Download Resume
                    </button>
                    <button className="w-full px-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all">
                      Move to Interview
                    </button>
                    <button className="w-full px-4 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Message Student
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Placements Tab */}
        {activeTab === 'placements' && (
          <div className="space-y-6">
            {/* Current Placements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Placements</h2>
              <div className="space-y-4">
                {currentPlacements.map((placement) => (
                  <div
                    key={placement.id}
                    className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{placement.name}</h3>
                        <p className="text-gray-700 font-medium mb-3">{placement.position}</p>
                        
                        <div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
                          <div>
                            <p className="text-gray-600">Start Date</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(placement.startDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Expected End</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(placement.expectedEndDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Supervisor</p>
                            <p className="font-semibold text-gray-900">{placement.supervisor}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Performance</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              placement.performance === 'Excellent'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {placement.performance}
                            </span>
                          </div>
                        </div>

                        {/* Hours Progress */}
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-700 font-semibold">Hours Completed</span>
                            <span className="text-blue-600 font-bold">
                              {placement.hoursCompleted} / {placement.hoursRequired}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                              style={{
                                width: `${(placement.hoursCompleted / placement.hoursRequired) * 100}%`,
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            {Math.round((placement.hoursCompleted / placement.hoursRequired) * 100)}% complete
                          </p>
                        </div>
                      </div>
                    </div>

                    {placement.evaluationDue && (
                      <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200 mb-4">
                        <p className="text-sm text-orange-900 font-semibold">
                          📋 Evaluation due: {placement.evaluationDue}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                        View Details
                      </button>
                      <button className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all">
                        Submit Evaluation
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Placements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Placements</h2>
              <div className="space-y-4">
                {completedPlacements.map((placement) => (
                  <div
                    key={placement.id}
                    className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{placement.name}</h3>
                        <p className="text-gray-700 mb-2">{placement.position}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div>Completed: {placement.completedDate}</div>
                          <div>Total Hours: {placement.totalHours}</div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold">{placement.finalRating}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {placement.wouldRehire && (
                          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                            Would Rehire ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Evaluations Tab */}
        {activeTab === 'evaluations' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Student Evaluations</h2>

            {currentPlacements.map((placement) => (
              <div
                key={placement.id}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{placement.name}</h3>
                  <p className="text-gray-700">{placement.position}</p>
                  {placement.evaluationDue && (
                    <p className="text-sm text-orange-600 font-semibold mt-2">
                      Due: {placement.evaluationDue}
                    </p>
                  )}
                </div>

                {/* Evaluation Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Overall Performance
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none">
                      <option value="">Select rating...</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="satisfactory">Satisfactory</option>
                      <option value="needs-improvement">Needs Improvement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Would you hire this student for a full-time position?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name={`hire-${placement.id}`} value="yes" className="w-5 h-5" />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name={`hire-${placement.id}`} value="no" className="w-5 h-5" />
                        <span>No</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name={`hire-${placement.id}`} value="maybe" className="w-5 h-5" />
                        <span>Maybe</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Strengths & Achievements
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                      rows={3}
                      placeholder="What did this student do well?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Areas for Improvement
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                      rows={3}
                      placeholder="What could this student improve?"
                    />
                  </div>

                  <button className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-xl transition-all">
                    Submit Evaluation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Functions Tab */}
        {activeTab === 'functions' && (
          <div className="space-y-6">
            <EmployerFunctionTemplates
              functions={functionTemplates}
              onEditFunction={(id) => console.log('Edit function:', id)}
            />
            
            <EmployerBadgesPanel
              badges={badgesData}
              availableCredits={availableCredits}
              onPurchaseBadge={(id) => console.log('Purchase badge:', id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}