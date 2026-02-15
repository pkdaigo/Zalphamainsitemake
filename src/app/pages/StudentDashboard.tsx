import { JobCoaching } from '@/app/components/JobCoaching';
import { ZalphaBot } from '@/app/components/ZalphaBot';
import { BackButton } from '@/app/components/BackButton';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';
import { PlaidVerification } from '@/app/components/PlaidVerification';
import { FileText, Clock, Calendar, Briefcase, Video, MapPin, Star, BookOpen, CheckCircle, Target, Award, Users } from 'lucide-react';
import { useState } from 'react';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

const recentJobs = [
  {
    id: 1,
    title: 'Software Developer',
    company: 'Pacific Tech Solutions',
    location: 'Guam',
    type: 'Full-time',
    salary: '$50,000 - $70,000',
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'Marketing Coordinator',
    company: 'Island Tourism Board',
    location: 'CNMI',
    type: 'Full-time',
    salary: '$40,000 - $55,000',
    posted: '3 days ago',
  },
  {
    id: 3,
    title: 'Registered Nurse',
    company: 'Pacific Medical Center',
    location: 'Hawaii',
    type: 'Full-time',
    salary: '$65,000 - $85,000',
    posted: '5 days ago',
  },
];

const myApplications = [
  {
    id: 1,
    title: 'Junior Developer',
    company: 'Digital Innovations LLC',
    status: 'Under Review',
    appliedDate: 'Jan 20, 2026',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 2,
    title: 'Customer Service Representative',
    company: 'Pacific Airlines',
    status: 'Interview Scheduled',
    appliedDate: 'Jan 18, 2026',
    statusColor: 'bg-blue-100 text-blue-800',
  },
];

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [showZeeBot, setShowZeeBot] = useState(false);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6">
        {/* Back Button */}
        <div>
          <BackButton onNavigate={onNavigate} label="Back to Home" variant="dark" />
        </div>

        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Welcome back, Dolly!</h1>
          <p className="text-sm sm:text-base text-gray-600">Here's what's happening with your job search</p>
        </div>

        {/* Premium Add-on Demo Banner */}
        <button
          onClick={() => onNavigate('student-addon-demo')}
          className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all text-left group w-full"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Star className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">🌺 Unlock Premium Features</h3>
              <p className="text-sm text-white/80">Video Intro • Profile Boost • Ultra Premium ($19.99/mo)</p>
            </div>
          </div>
          <p className="text-white/90 text-sm">
            Stand out from the crowd! Explore optional premium add-ons: 60-second video intro, featured profile placement, and AI resume builder. Try interactive demos now!
          </p>
        </button>

        {/* AI Interview Practice Banner */}
        <button
          onClick={() => onNavigate('ai-interview-practice')}
          className="bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all text-left group w-full"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Video className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">🎤 Practice AI Interviews</h3>
                <p className="text-sm text-white/80">Get interviewed by PK or Airen • Instant AI Feedback</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('interview-tutorial-video');
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Video className="w-4 h-4" />
              Watch Tutorial
            </button>
          </div>
          <p className="text-white/90 text-sm">
            Practice your interview skills with our AI interviewers! Answer real questions, get scored on clarity, content, confidence, and timing. Build confidence before the real thing!
          </p>
        </button>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">5</div>
            <div className="text-xs sm:text-sm text-gray-600">Applications Sent</div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">2</div>
            <div className="text-xs sm:text-sm text-gray-600">Under Review</div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">1</div>
            <div className="text-xs sm:text-sm text-gray-600">Interviews</div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">127</div>
            <div className="text-xs sm:text-sm text-gray-600">New Jobs</div>
          </div>
        </div>

        {/* Video Tutorials Banner */}
        <div 
          onClick={() => onNavigate('video-tutorials')}
          className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <Video className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">🎥 Video Tutorials</h3>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg">Learn everything you need to succeed on ZALPHA with 24 step-by-step guides</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 text-white/80 text-xs sm:text-sm">
                  <span>📚 12 Student Guides</span>
                  <span>⭐ 4.9 Rating</span>
                  <span>🎓 Beginner Friendly</span>
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-cyan-600 rounded-lg sm:rounded-xl font-bold hover:bg-cyan-50 transition-all shadow-lg text-sm sm:text-base">
              Watch Now →
            </button>
          </div>
        </div>

        {/* Plaid Verification Section */}
        <div className="space-y-4">
          <PlaidVerification />
        </div>

        {/* Recommended Jobs - Collapsible */}
        <CollapsibleSection
          title="Recommended for You"
          subtitle="Jobs matching your profile and interests"
          icon={<Target className="w-8 h-8 text-blue-600" />}
          colorScheme="blue"
          defaultOpen={true}
        >
          <div className="p-4 space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">{job.company}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium self-start">
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    {job.posted}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base">
                    Apply Now
                  </button>
                  <button className="sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm sm:text-base">
                    Save
                  </button>
                </div>
              </div>
            ))}
            <button 
              onClick={() => onNavigate('job-search')}
              className="w-full text-center text-blue-600 hover:text-blue-700 font-semibold py-3 text-sm sm:text-base"
            >
              View All Jobs →
            </button>
          </div>
        </CollapsibleSection>

        {/* Profile & Applications - Collapsible */}
        <CollapsibleSection
          title="Your Activity"
          subtitle="Profile status and recent applications"
          icon={<Users className="w-8 h-8 text-purple-600" />}
          colorScheme="purple"
        >
          <div className="p-4 grid sm:grid-cols-2 gap-6">
            {/* Profile Completion */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Profile Strength</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">75% Complete</span>
                  <span className="text-blue-600 font-medium">Good</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                  </div>
                  <span className="text-gray-600">Basic information added</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                  </div>
                  <span className="text-gray-600">ID verified</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  </div>
                  <span className="text-gray-600">Add resume</span>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('student-profile')}
                className="w-full mt-4 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
              >
                Complete Profile
              </button>
            </div>

            {/* My Applications */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Recent Applications</h3>
              <div className="space-y-4">
                {myApplications.map((app) => (
                  <div key={app.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{app.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{app.company}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{app.appliedDate}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Resources - Collapsible */}
        <CollapsibleSection
          title="Resources & Tools"
          subtitle="Training, reviews, and coaching"
          icon={<Award className="w-8 h-8 text-green-600" />}
          colorScheme="green"
        >
          <div className="p-4 space-y-4">
            {/* Company Reviews */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <h3 className="font-bold text-lg">NEW: Company Reviews</h3>
                  </div>
                  <p className="text-blue-100 text-sm mb-4">
                    Share your internship experience and help protect fellow students from bad employers
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-blue-50 mb-4">
                <li>✓ Review companies you've worked for</li>
                <li>✓ Companies with bad reviews get suspended</li>
                <li>✓ Build our student community</li>
                <li>✓ Hold employers accountable</li>
              </ul>
              <button
                onClick={() => onNavigate('company-review-demo')}
                className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm sm:text-base"
              >
                Try Company Reviews Demo →
              </button>
            </div>

            {/* Workforce Training */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg text-white">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-6 h-6" />
                <h3 className="font-bold text-lg">🎓 Free Training</h3>
              </div>
              <p className="text-purple-100 text-sm mb-4">
                Level up your career with free interactive sessions in English
              </p>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Interview preparation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Resume building</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>LinkedIn & online presence</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>+5 more skill areas</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('training-hub')}
                className="w-full px-4 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold text-sm sm:text-base"
              >
                Browse Training →
              </button>
            </div>

            {/* 1-on-1 Job Coaching */}
            <JobCoaching 
              variant="compact" 
              isPremium={true}
              onNavigate={onNavigate}
            />
          </div>
        </CollapsibleSection>
      </div>

      {/* Zee Assistant Bot - Conditional */}
      {showZeeBot && (
        <ZalphaBot 
          onNavigate={onNavigate} 
          userName="John" 
          onClose={() => setShowZeeBot(false)}
        />
      )}

      {/* Zee Bot Button - Fixed Position */}
      {!showZeeBot && (
        <button
          onClick={() => setShowZeeBot(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-[60] animate-bounce"
          aria-label="Open Zee Assistant"
          title="Chat with Zee"
        >
          <span className="text-2xl sm:text-3xl">🌺</span>
        </button>
      )}
    </div>
  );
}