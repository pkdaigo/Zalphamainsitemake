import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { 
  Briefcase, 
  Clock, 
  Calendar, 
  MapPin, 
  User, 
  FileText, 
  MessageSquare, 
  Upload,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Star,
  Building2,
  Phone,
  Mail
} from 'lucide-react';
import { 
  TodayPlacementCard, 
  TodayDeliverablesCard, 
  StudentMentalCheckInCard,
  CoOpMessagesButton 
} from '@/app/components/coop';

interface HighSchoolCoOpDashboardProps {
  onNavigate: (page: string) => void;
}

export function HighSchoolCoOpDashboard({ onNavigate }: HighSchoolCoOpDashboardProps) {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'placement'>('jobs');
  const [showMessages, setShowMessages] = useState(false);

  // Mock data
  const studentInfo = {
    name: 'Maria Santos',
    school: 'Saipan Southern High School',
    grade: '11th Grade',
    hoursRequired: 120,
    hoursCompleted: 45,
  };

  const currentPlacement = {
    employer: 'Pacific Development Inc.',
    position: 'Junior Administrative Assistant',
    supervisor: 'John Anderson',
    supervisorEmail: 'j.anderson@pacdev.com',
    supervisorPhone: '+1 (670) 234-5678',
    startDate: '2026-01-15',
    expectedEndDate: '2026-05-30',
    hoursPerWeek: 12,
    totalHoursLogged: 45,
  };

  // Today's placement data
  const todayPlacement = {
    studentName: studentInfo.name,
    businessName: 'Kalaayan Inc',
    employerName: 'Pacific Development Inc.',
    departmentName: 'Food Service',
    shiftDate: 'February 17, 2026',
    shiftTimeRange: '8:00 AM – 12:00 PM',
    location: 'Saipan Business Center, 2nd Floor',
    supervisorName: currentPlacement.supervisor,
  };

  // Deliverables data
  const [deliverables, setDeliverables] = useState([
    {
      id: '1',
      title: 'Set up dining area',
      description: 'Arrange tables, chairs, and place settings for lunch service',
      status: 'COMPLETED' as const,
    },
    {
      id: '2',
      title: 'Stock supplies and inventory',
      description: 'Check and refill condiments, napkins, and utensils',
      status: 'IN_PROGRESS' as const,
    },
    {
      id: '3',
      title: 'Clean and sanitize stations',
      description: 'Wipe down all surfaces and ensure food safety standards',
      status: 'NOT_STARTED' as const,
    },
    {
      id: '4',
      title: 'Customer service duties',
      description: 'Greet customers, take orders, and handle inquiries',
      status: 'NOT_STARTED' as const,
    },
  ]);

  // Mental check-in data
  const [mentalCheckIn, setMentalCheckIn] = useState({
    isSubmitted: false,
    currentValue: undefined as number | undefined,
    note: undefined as string | undefined,
  });

  const handleToggleDeliverable = (id: string, newStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED') => {
    setDeliverables(prev =>
      prev.map(d => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  const handleMentalCheckInSubmit = (mood: number, note?: string) => {
    setMentalCheckIn({
      isSubmitted: true,
      currentValue: mood,
      note,
    });
    // In real app, would send to backend
    console.log('Mental check-in submitted:', { mood, note });
  };

  const coopJobs = [
    {
      id: 1,
      title: 'Retail Sales Associate',
      company: 'Island Boutique',
      location: 'Saipan, CNMI',
      hoursPerWeek: '10-15',
      duration: '4 months',
      deadline: 'Feb 25, 2026',
      applicants: 8,
      description: 'Help customers, manage inventory, and learn retail operations',
    },
    {
      id: 2,
      title: 'Office Assistant',
      company: 'CNMI Government - Education Dept',
      location: 'Saipan, CNMI',
      hoursPerWeek: '12-15',
      duration: '5 months',
      deadline: 'Mar 1, 2026',
      applicants: 12,
      description: 'Filing, data entry, reception, and general office support',
    },
    {
      id: 3,
      title: 'Social Media Intern',
      company: 'Marianas Visitors Authority',
      location: 'Saipan, CNMI',
      hoursPerWeek: '8-12',
      duration: '3 months',
      deadline: 'Feb 28, 2026',
      applicants: 15,
      description: 'Create content, manage posts, and track engagement metrics',
    },
  ];

  const myApplications = [
    {
      id: 1,
      title: 'Junior Administrative Assistant',
      company: 'Pacific Development Inc.',
      appliedDate: 'Jan 10, 2026',
      status: 'Placed',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 2,
      title: 'Customer Service Trainee',
      company: 'Saipan Grand Hotel',
      appliedDate: 'Jan 5, 2026',
      status: 'Interview Scheduled',
      statusColor: 'bg-blue-100 text-blue-800',
      interviewDate: 'Feb 20, 2026 at 2:00 PM',
    },
    {
      id: 3,
      title: 'IT Support Assistant',
      company: 'Northern Marianas College',
      appliedDate: 'Dec 28, 2025',
      status: 'Applied',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      company: 'Saipan Grand Hotel',
      position: 'Customer Service Trainee',
      date: 'Feb 20, 2026',
      time: '2:00 PM',
      location: 'Hotel Main Office',
      interviewer: 'Sarah Chen - HR Manager',
    },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Back Button */}
        <BackButton onNavigate={onNavigate} label="Back to Co-Op Login" variant="dark" />

        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-black mb-2">Welcome back, {studentInfo.name}! 🎓</h1>
              <p className="text-blue-100">
                {studentInfo.school} • {studentInfo.grade}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{studentInfo.hoursCompleted}</div>
              <div className="text-sm text-blue-100">of {studentInfo.hoursRequired} hours</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div 
              className="bg-white h-full rounded-full transition-all"
              style={{ width: `${(studentInfo.hoursCompleted / studentInfo.hoursRequired) * 100}%` }}
            />
          </div>
          <p className="text-sm text-blue-100 mt-2">
            {Math.round((studentInfo.hoursCompleted / studentInfo.hoursRequired) * 100)}% complete • 
            Keep up the great work!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
            <div className="text-sm text-gray-600">Applications</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
            <div className="text-sm text-gray-600">Interview Scheduled</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
            <div className="text-sm text-gray-600">Active Placement</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-sm text-gray-600">New Co-op Jobs</div>
          </div>
        </div>

        {/* Upcoming Interviews Alert */}
        {upcomingInterviews.length > 0 && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">📅 Upcoming Interview</h3>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="font-bold mb-1">{upcomingInterviews[0].position}</p>
                  <p className="text-sm text-purple-100 mb-2">{upcomingInterviews[0].company}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span>📅 {upcomingInterviews[0].date}</span>
                    <span>⏰ {upcomingInterviews[0].time}</span>
                    <span>📍 {upcomingInterviews[0].location}</span>
                  </div>
                  <p className="text-sm text-purple-100 mt-2">
                    Interviewer: {upcomingInterviews[0].interviewer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Placement */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Current Placement</h2>
                <p className="text-green-100 text-sm">Active since January 2026</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Placement Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Position Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Employer</p>
                    <p className="font-semibold text-gray-900">{currentPlacement.employer}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Position</p>
                    <p className="font-semibold text-gray-900">{currentPlacement.position}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-600">Start Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(currentPlacement.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">End Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(currentPlacement.expectedEndDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Supervisor Contact
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{currentPlacement.supervisor}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="font-semibold text-blue-600">{currentPlacement.supervisorEmail}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="font-semibold text-gray-900">{currentPlacement.supervisorPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Progress */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Hours Logged This Week
                </h3>
                <span className="text-2xl font-bold text-blue-600">
                  {currentPlacement.totalHoursLogged} hrs
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Expected: {currentPlacement.hoursPerWeek} hours/week
              </p>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-xl transition-all">
                Log Today's Hours
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-3">
              <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Message Supervisor
              </button>
              <button className="px-6 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Update Current Role
              </button>
            </div>
          </div>
        </div>

        {/* NEW CO-OP COMPONENTS SECTION */}
        {/* Today's Placement Card */}
        <TodayPlacementCard
          {...todayPlacement}
          onOpenMessages={() => setShowMessages(true)}
        />

        {/* Today's Deliverables Card */}
        <TodayDeliverablesCard
          date="February 17, 2026"
          functionName="Food Service"
          deliverables={deliverables}
          onToggleStatus={handleToggleDeliverable}
          onViewAll={() => console.log('View all deliverables')}
        />

        {/* Mental Check-in Card */}
        <StudentMentalCheckInCard
          date="February 17, 2026"
          currentValue={mentalCheckIn.currentValue}
          note={mentalCheckIn.note}
          isSubmitted={mentalCheckIn.isSubmitted}
          onSubmit={handleMentalCheckInSubmit}
        />

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'jobs'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Available Jobs
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'applications'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            My Applications
          </button>
        </div>

        {/* Available Co-op Jobs */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Available Co-op Opportunities</h2>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                {coopJobs.length} Open Positions
              </span>
            </div>

            {coopJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-lg text-gray-700 font-medium mb-3">{job.company}</p>
                    <p className="text-sm text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.hoursPerWeek} hrs/week
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {job.duration}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold mb-2 inline-block">
                      Apply by {job.deadline}
                    </div>
                    <p className="text-sm text-gray-500">{job.applicants} students applied</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-xl transition-all">
                    Apply Now
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>

            {myApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{app.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.statusColor}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium mb-2">{app.company}</p>
                    <p className="text-sm text-gray-500">Applied: {app.appliedDate}</p>
                    
                    {app.interviewDate && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900 font-semibold">
                          📅 Interview: {app.interviewDate}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions Footer */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
          <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button className="px-4 py-3 bg-white border-2 border-purple-200 text-gray-900 rounded-xl font-bold hover:bg-purple-50 transition-all text-sm flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Resume
            </button>
            <button className="px-4 py-3 bg-white border-2 border-purple-200 text-gray-900 rounded-xl font-bold hover:bg-purple-50 transition-all text-sm flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message Admin
            </button>
            <button className="px-4 py-3 bg-white border-2 border-purple-200 text-gray-900 rounded-xl font-bold hover:bg-purple-50 transition-all text-sm flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              View Guidelines
            </button>
            <button className="px-4 py-3 bg-white border-2 border-purple-200 text-gray-900 rounded-xl font-bold hover:bg-purple-50 transition-all text-sm flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              Get Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}