import { useState } from 'react';
import { Briefcase, Clock, CheckCircle, XCircle, Eye, MessageCircle, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface Application {
  id: string;
  internshipTitle: string;
  company: string;
  appliedDate: Date;
  status: 'submitted' | 'under_review' | 'interview_scheduled' | 'accepted' | 'rejected' | 'withdrawn';
  lastUpdate: Date;
  interviewDate?: Date;
  feedback?: string;
  nextSteps?: string;
}

interface InternshipTrackingProps {
  userType: 'student' | 'employer';
  onNavigate: () => void;
}

export function InternshipTracking({ userType, onNavigate }: InternshipTrackingProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('active');
  
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'app_001',
      internshipTitle: 'Software Engineering Intern',
      company: 'Pacific Tech Solutions',
      appliedDate: new Date('2025-01-20'),
      status: 'interview_scheduled',
      lastUpdate: new Date('2025-01-26'),
      interviewDate: new Date('2025-02-05'),
      nextSteps: 'Technical interview scheduled. Prepare to discuss your projects and coding skills.',
    },
    {
      id: 'app_002',
      internshipTitle: 'Marketing & Social Media Intern',
      company: 'Island Retail Group',
      appliedDate: new Date('2025-01-18'),
      status: 'under_review',
      lastUpdate: new Date('2025-01-22'),
      nextSteps: 'Application under review. You should hear back within 1-2 weeks.',
    },
    {
      id: 'app_003',
      internshipTitle: 'UI/UX Design Intern',
      company: 'Digital Dreams Agency',
      appliedDate: new Date('2025-01-15'),
      status: 'accepted',
      lastUpdate: new Date('2025-01-25'),
      nextSteps: 'Congratulations! Please complete onboarding paperwork by February 1st.',
    },
    {
      id: 'app_004',
      internshipTitle: 'Data Science Intern',
      company: 'Analytics Corp',
      appliedDate: new Date('2025-01-10'),
      status: 'rejected',
      lastUpdate: new Date('2025-01-20'),
      feedback: 'Thank you for your interest. While your qualifications are strong, we decided to move forward with candidates who have more experience with Python and machine learning.',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'interview_scheduled': return 'bg-purple-100 text-purple-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'withdrawn': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'under_review': return <Eye className="w-4 h-4" />;
      case 'interview_scheduled': return <Calendar className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'withdrawn': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'active') {
      return ['submitted', 'under_review', 'interview_scheduled'].includes(app.status);
    } else if (activeTab === 'completed') {
      return ['accepted', 'rejected', 'withdrawn'].includes(app.status);
    }
    return true;
  });

  const stats = {
    total: applications.length,
    active: applications.filter(a => ['submitted', 'under_review', 'interview_scheduled'].includes(a.status)).length,
    interviews: applications.filter(a => a.status === 'interview_scheduled').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Dashboard" />
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-blue-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Internship Applications</h1>
              <p className="text-gray-600">Track your application status and manage interviews</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Total Applications</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-yellow-600 mb-1">Active</p>
              <p className="text-3xl font-bold text-yellow-900">{stats.active}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 mb-1">Interviews</p>
              <p className="text-3xl font-bold text-purple-900">{stats.interviews}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 mb-1">Accepted</p>
              <p className="text-3xl font-bold text-green-900">{stats.accepted}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow p-2 mb-6 flex gap-2">
          {(['all', 'active', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map(application => (
            <div
              key={application.id}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-blue-300 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{application.internshipTitle}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      {application.status.toUpperCase().replace('_', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">
                    <strong>{application.company}</strong>
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Applied {application.appliedDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Updated {application.lastUpdate.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Interview Date */}
                  {application.interviewDate && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <h4 className="font-bold text-purple-900">Interview Scheduled</h4>
                      </div>
                      <p className="text-sm text-purple-800">
                        <strong>Date:</strong> {application.interviewDate.toLocaleDateString()} at {application.interviewDate.toLocaleTimeString()}
                      </p>
                    </div>
                  )}

                  {/* Next Steps */}
                  {application.nextSteps && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-blue-900 mb-1">Next Steps</h4>
                          <p className="text-sm text-blue-800">{application.nextSteps}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Feedback (for rejected applications) */}
                  {application.feedback && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-bold text-red-900 mb-1">Feedback</h4>
                      <p className="text-sm text-red-800">{application.feedback}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="ml-6 flex flex-col gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm whitespace-nowrap">
                    View Details
                  </button>
                  {application.status === 'interview_scheduled' && (
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm whitespace-nowrap">
                      Interview Prep
                    </button>
                  )}
                  {application.status === 'accepted' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm whitespace-nowrap">
                      Start Onboarding
                    </button>
                  )}
                  {['submitted', 'under_review'].includes(application.status) && (
                    <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm whitespace-nowrap">
                      Withdraw
                    </button>
                  )}
                  <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm whitespace-nowrap flex items-center justify-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredApplications.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Applications Yet</h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'active' 
                  ? "You don't have any active applications"
                  : activeTab === 'completed'
                  ? "You don't have any completed applications"
                  : "Start applying to internships to see them here"
                }
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Browse Internships
              </button>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Application Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-bold mb-2">While Waiting:</h4>
              <ul className="space-y-1">
                <li>✓ Continue applying to other positions</li>
                <li>✓ Research the company thoroughly</li>
                <li>✓ Prepare answers to common interview questions</li>
                <li>✓ Update your portfolio and LinkedIn</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">After Interview:</h4>
              <ul className="space-y-1">
                <li>✓ Send a thank-you email within 24 hours</li>
                <li>✓ Follow up if you haven't heard back in 2 weeks</li>
                <li>✓ Be prepared for multiple interview rounds</li>
                <li>✓ Have questions ready for the interviewer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}