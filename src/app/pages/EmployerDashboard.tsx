import { useState } from 'react';
import { Building2, Users, TrendingUp, Clock, MapPin, DollarSign, Briefcase, Eye, MessageSquare, Video, XCircle, Plus, Star, Calendar, CheckCircle, BarChart3, Award, TrendingDown, Target, Zap, HelpCircle, Edit, Trash2, Headphones, Mail, Search } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { EmployerHelpBot } from '@/app/components/EmployerHelpBot';
import { FeaturedCarousel } from '@/app/components/FeaturedProfile';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';

interface EmployerDashboardProps {
  onNavigate: (page: string) => void;
}

const myJobs = [
  {
    id: 1,
    title: 'Software Developer',
    status: 'Active',
    applicants: 12,
    views: 145,
    posted: 'Jan 15, 2026',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    id: 2,
    title: 'Marketing Manager',
    status: 'Active',
    applicants: 8,
    views: 98,
    posted: 'Jan 20, 2026',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    id: 3,
    title: 'Customer Service Rep',
    status: 'Closed',
    applicants: 25,
    views: 203,
    posted: 'Jan 5, 2026',
    statusColor: 'bg-gray-100 text-gray-800',
  },
];

const recentApplicants = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Software Developer',
    education: "Bachelor's in Computer Science",
    location: 'Guam',
    appliedDate: 'Jan 25, 2026',
    status: 'New',
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Software Developer',
    education: "Associate's in IT",
    location: 'CNMI',
    appliedDate: 'Jan 24, 2026',
    status: 'Reviewing',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Marketing Manager',
    education: "Bachelor's in Marketing",
    location: 'Hawaii',
    appliedDate: 'Jan 23, 2026',
    status: 'New',
  },
];

// Featured Students Data
const featuredStudents = [
  {
    id: 'stu-1',
    name: 'Marcus Lopez',
    title: 'Full-Stack Developer & CS Graduate',
    location: 'Guam',
    description: 'Passionate about creating innovative web applications with expertise in React, Node.js, and cloud technologies. Completed 3 internships and seeking full-time opportunities in tech.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
    isPremium: true,
    skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
    company: 'University of Guam',
  },
  {
    id: 'stu-2',
    name: 'Ana Chen',
    title: 'Marketing Professional & Business Graduate',
    location: 'Hawaii',
    description: 'Creative marketer with proven results in social media campaigns and brand strategy. Graduated with honors and eager to help Pacific businesses grow their online presence.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    isPremium: true,
    skills: ['Social Media', 'SEO', 'Content Strategy', 'Google Analytics', 'Adobe Creative Suite'],
    company: 'University of Hawaii',
  },
  {
    id: 'stu-3',
    name: 'David Palacios',
    title: 'Registered Nurse & Healthcare Leader',
    location: 'CNMI',
    description: 'Compassionate healthcare professional with clinical experience and strong patient care skills. Ready to contribute to excellent patient outcomes in the Pacific region.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800',
    isPremium: true,
    skills: ['Patient Care', 'Medical Records', 'Emergency Response', 'Team Leadership'],
    company: 'Northern Marianas College',
  },
];

export function EmployerDashboard({ onNavigate }: EmployerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [showHelpBot, setShowHelpBot] = useState(false);
  
  // Subscription Plan State - Default to 'professional' for demo
  const [subscriptionPlan, setSubscriptionPlan] = useState<'free-contract' | 'basic' | 'professional' | 'enterprise'>('professional');
  
  const handleViewStudentProfile = (studentId: string) => {
    console.log('View student profile:', studentId);
    onNavigate('candidate-search');
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-slate-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6">
        {/* Back Button */}
        <div>
          <BackButton onNavigate={onNavigate} label="Back to Home" />
        </div>

        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Welcome back, Pacific Tech Solutions!</h1>
            <p className="text-sm sm:text-base text-slate-600">Manage your job postings and connect with talent</p>
          </div>
          <button 
            onClick={() => setShowNewJobModal(true)}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Post New Job
          </button>
        </div>

        {/* Top Demo Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => onNavigate('heygen-agent-demo')}
            className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all text-left group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Video className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Interview Agent Demo 🤖</h3>
                <p className="text-sm text-white/80">Interactive HeyGen Technology</p>
              </div>
            </div>
            <p className="text-white/90 text-sm">
              Experience our live AI interview agent! Talk with an interactive AI that conducts natural conversations with candidates in real-time.
            </p>
          </button>
          
          <button
            onClick={() => onNavigate('employer-plan-demos')}
            className="bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all text-left group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Explore Plan Demos</h3>
                <p className="text-sm text-white/80">Starter • Professional • Ultra Premium</p>
              </div>
            </div>
            <p className="text-white/90 text-sm">
              Compare all employer subscription plans with interactive demos. See exactly what features you get at each tier!
            </p>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => onNavigate('candidate-search')}
            className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all text-left group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Search className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Search Candidates</h3>
                <p className="text-sm text-white/80">Find Pacific Island Talent 🌺</p>
              </div>
            </div>
            <p className="text-white/90 text-sm">
              Search our verified database of Pacific Island students and graduates. AI-powered matching finds the best candidates for your roles!
            </p>
          </button>
          
          <button
            onClick={() => onNavigate('heygen-demo')}
            className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all text-left group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Video className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Create HeyGen Videos</h3>
                <p className="text-sm text-white/80">Recruiter & Career Fair Videos</p>
              </div>
            </div>
            <p className="text-white/90 text-sm">
              Create AI-powered videos for job postings, career fairs, and company introductions using HeyGen avatars!
            </p>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">3</div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">Active Jobs</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">45</div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">Total Applicants</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">446</div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">Profile Views</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">12</div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">New This Week</div>
          </div>
        </div>

        {/* Video Tutorials Banner */}
        <div 
          onClick={() => onNavigate('video-tutorials')}
          className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <Video className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">🎥 Video Tutorials</h3>
                <p className="text-white/90 text-xs sm:text-base lg:text-lg">Master ZALPHA's employer features with 12 comprehensive video guides</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 text-white/80 text-xs sm:text-sm">
                  <span>📚 12 Guides</span>
                  <span>⭐ 4.9 Rating</span>
                  <span>🎓 Training</span>
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white text-cyan-600 rounded-lg sm:rounded-xl font-bold hover:bg-cyan-50 transition-all shadow-lg text-sm sm:text-base">
              Watch Now →
            </button>
          </div>
        </div>

        {/* Contract Jobs Banner */}
        <div 
          onClick={() => onNavigate('contract-marketplace')}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">💼 Contract & Freelance Jobs</h3>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg">Post short-term projects with specialized pricing</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 text-white/80 text-xs sm:text-sm">
                  <span>⚡ Fast Delivery</span>
                  <span>💵 Pay Per Project</span>
                  <span>🎯 Skilled Freelancers</span>
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white text-indigo-600 rounded-lg sm:rounded-xl font-bold hover:bg-purple-50 transition-all shadow-lg text-sm sm:text-base">
              Post Contract Job →
            </button>
          </div>
        </div>

        {/* Featured Students Carousel */}
        <FeaturedCarousel 
          type="student"
          profiles={featuredStudents}
          onViewProfile={handleViewStudentProfile}
        />

        {/* ATS Integration - Collapsible */}
        <CollapsibleSection
          title="ATS & Website Integration"
          subtitle="ZALPHA Applicant Tracking System - Included with your plan"
          icon={<Zap className="w-8 h-8 text-cyan-400" />}
          colorScheme="cyan"
        >
          <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-white/10">
              <p className="text-white/90 mb-4 text-sm sm:text-base">
                All applications from ZALPHA automatically sync to your dedicated ATS portal. Manage your entire hiring process with enterprise-grade tools:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Pipeline Management</div>
                    <div className="text-white/60 text-xs sm:text-sm">Track candidates through every stage</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Interview Scheduling</div>
                    <div className="text-white/60 text-xs sm:text-sm">Calendar integration & reminders</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Team Collaboration</div>
                    <div className="text-white/60 text-xs sm:text-sm">Share notes & feedback with your team</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Analytics & Reports</div>
                    <div className="text-white/60 text-xs sm:text-sm">Track hiring metrics & ROI</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Candidate Messaging</div>
                    <div className="text-white/60 text-xs sm:text-sm">Communicate directly with applicants</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Advanced Filtering</div>
                    <div className="text-white/60 text-xs sm:text-sm">Sort by skills, location, education</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('integration-settings');
                }}
                className="w-full sm:flex-1 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all text-center flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                Configure ZALPHA ATS
              </a>
              <button 
                onClick={() => onNavigate('integration-settings')}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-white/10 text-white border-2 border-cyan-400/50 rounded-xl font-semibold transition-all hover:bg-white/20 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                Add Integrations
              </button>
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-cyan-300 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                <span>Real-time sync enabled • All new applications appear instantly in your ATS</span>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Job Postings & Applicants - Collapsible */}
        <CollapsibleSection
          title="Your Job Postings"
          subtitle="Active jobs and recent applicants"
          icon={<Briefcase className="w-8 h-8 text-blue-600" />}
          colorScheme="blue"
          defaultOpen={true}
        >
          <div className="p-4 grid lg:grid-cols-3 gap-6">
            {/* Job Postings */}
            <div className="lg:col-span-2 space-y-4">
              {myJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">{job.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500">Posted {job.posted}</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${job.statusColor} self-start`}>
                      {job.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-cyan-100/50">
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{job.applicants}</div>
                      <div className="text-xs sm:text-sm text-slate-600 font-medium">Applicants</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-100/50">
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{job.views}</div>
                      <div className="text-xs sm:text-sm text-slate-600 font-medium">Views</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg sm:rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold flex items-center justify-center gap-2 text-sm sm:text-base">
                      <Users className="w-4 h-4" />
                      View Applicants
                    </button>
                    <button className="sm:w-auto px-4 py-2.5 border-2 border-slate-200 text-slate-600 rounded-lg sm:rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all">
                      <Edit className="w-4 h-4 mx-auto" />
                    </button>
                    <button className="sm:w-auto px-4 py-2.5 border-2 border-red-200 text-red-600 rounded-lg sm:rounded-xl hover:bg-red-50 hover:border-red-300 transition-all">
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Subscription Info */}
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl p-6 shadow-sm border border-white/20 text-white">
                <h3 className="font-bold text-lg mb-1">Professional Plan</h3>
                <p className="text-cyan-100 text-sm mb-4">Unlimited job postings</p>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/10">
                  <div className="text-3xl font-bold">$249<span className="text-lg font-normal">/mo</span></div>
                  <div className="text-sm text-cyan-100 mt-1">Renews Feb 15, 2026</div>
                </div>
                <button className="w-full py-2.5 bg-white text-cyan-600 rounded-xl hover:bg-cyan-50 transition-all font-semibold shadow-sm text-sm sm:text-base">
                  Manage Plan
                </button>
              </div>

              {/* Recent Applicants */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 shadow-sm border border-slate-200/60">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-slate-900">Recent Applicants</h3>
                  <button 
                    onClick={() => onNavigate('candidate-search')}
                    className="text-cyan-600 hover:text-cyan-700 text-sm font-semibold"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {recentApplicants.map((applicant) => (
                    <div key={applicant.id} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm sm:text-base">{applicant.name}</h4>
                          <p className="text-xs sm:text-sm text-slate-600">{applicant.position}</p>
                        </div>
                        {applicant.status === 'New' && (
                          <span className="px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-semibold">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-1">{applicant.education}</p>
                      <p className="text-xs text-slate-500">{applicant.location} • {applicant.appliedDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Quick Actions & Support - Collapsible */}
        <CollapsibleSection
          title="Quick Actions & Support"
          subtitle="Common tasks and help resources"
          icon={<Target className="w-8 h-8 text-orange-600" />}
          colorScheme="orange"
        >
          <div className="p-4 grid sm:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 shadow-sm border border-slate-200/60">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('candidate-search')}
                  className="w-full text-left px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 rounded-xl transition-all border border-slate-200/60"
                >
                  <div className="font-semibold text-slate-900 text-sm sm:text-base">Search Candidates</div>
                  <div className="text-xs sm:text-sm text-slate-600">Browse verified talent</div>
                </button>
                <button 
                  onClick={() => onNavigate('employer-profile')}
                  className="w-full text-left px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 rounded-xl transition-all border border-slate-200/60"
                >
                  <div className="font-semibold text-slate-900 text-sm sm:text-base">Company Profile</div>
                  <div className="text-xs sm:text-sm text-slate-600">Update your information</div>
                </button>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl sm:rounded-2xl p-6 shadow-sm border border-orange-100/50">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Need Help?</h3>
              <p className="text-sm text-slate-600 mb-4">Our team is here to support you</p>
              
              <div className="space-y-3">
                <a 
                  href="mailto:contact@zalpharecruit.com?subject=Technical Support"
                  className="flex items-start gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all border border-orange-100"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">Technical Support</div>
                    <div className="text-xs text-slate-600">Get help with platform issues</div>
                  </div>
                </a>

                <a 
                  href="mailto:contact@zalpharecruit.com?subject=Customer Success"
                  className="flex items-start gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all border border-orange-100"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">Customer Success</div>
                    <div className="text-xs text-slate-600">Account & billing assistance</div>
                  </div>
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-orange-200">
                <a 
                  href="mailto:contact@zalpharecruit.com"
                  className="text-sm text-slate-700 hover:text-cyan-600 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  contact@zalpharecruit.com
                </a>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* New Job Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6 z-50">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Post a New Job</h2>
              <button 
                onClick={() => setShowNewJobModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                  placeholder="e.g. Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                  placeholder="Describe the role, responsibilities, and qualifications..."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select location</option>
                    <option value="CNMI">CNMI (Commonwealth of the Northern Mariana Islands)</option>
                    <option value="FSM - Yap">FSM - Yap State</option>
                    <option value="FSM - Chuuk">FSM - Chuuk State</option>
                    <option value="FSM - Pohnpei">FSM - Pohnpei State</option>
                    <option value="FSM - Kosrae">FSM - Kosrae State</option>
                    <option value="Guam">Guam</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Palau">Palau</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                  placeholder="e.g. $50,000 - $70,000"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewJobModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowNewJobModal(false);
                    // In a real app, this would save the job posting
                  }}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Help Bot */}
      {showHelpBot && (
        <EmployerHelpBot onClose={() => setShowHelpBot(false)} />
      )}

      {/* Floating Help Button */}
      {!showHelpBot && (
        <button
          onClick={() => setShowHelpBot(true)}
          className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center z-40 border-4 border-white"
        >
          <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>
      )}
    </div>
  );
}