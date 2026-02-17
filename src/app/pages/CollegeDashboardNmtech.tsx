import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Coins, 
  MessageSquare,
  Calendar,
  Star,
  Award
} from 'lucide-react';
import { 
  RegionalTalentFeed, 
  ProgramPromotionCard, 
  CoOpPipelineView,
  CareerServicesBoard 
} from '@/app/components/college';

interface CollegeDashboardNmtechProps {
  onNavigate: (page: string) => void;
}

export function CollegeDashboardNmtech({ onNavigate }: CollegeDashboardNmtechProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'programs' | 'pipeline' | 'board'>('feed');

  // College Info
  const collegeInfo = {
    name: 'NMTECH',
    contactPerson: 'Ben Babauta',
    role: 'Career Services Director',
    totalPrograms: 8,
    activePromotions: 2,
    availableCredits: 450,
    rating: 4.7,
  };

  // Regional Feed Data
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
      type: 'FAIR_ANNOUNCEMENT' as const,
      title: 'Virtual Career Fair - March 15, 2026',
      description: 'Pacific Islands regional career fair featuring 50+ employers and colleges',
      timestamp: '2 days ago',
      region: 'CNMI' as const,
      source: 'ZALPHA Events',
      metadata: {
        eventDate: 'March 15, 2026',
      },
    },
  ];

  // Programs Data
  const programs = [
    {
      id: 'prog_1',
      name: 'Information Technology',
      description: 'Learn programming, network administration, and cybersecurity fundamentals',
      category: 'Technology',
      duration: '2 years',
      creditsAvailable: 100,
      metrics: {
        views: 245,
        clicks: 89,
        inquiries: 23,
        applications: 12,
      },
      isFeatured: true,
    },
    {
      id: 'prog_2',
      name: 'Business Administration',
      description: 'Accounting, management, and entrepreneurship training',
      category: 'Business',
      duration: '2 years',
      creditsAvailable: 100,
      metrics: {
        views: 198,
        clicks: 67,
        inquiries: 18,
        applications: 8,
      },
      isFeatured: true,
    },
    {
      id: 'prog_3',
      name: 'Hospitality & Tourism',
      description: 'Hotel management and tourism industry professional training',
      category: 'Hospitality',
      duration: '2 years',
      creditsAvailable: 100,
      metrics: {
        views: 167,
        clicks: 54,
        inquiries: 14,
        applications: 6,
      },
      isFeatured: false,
    },
    {
      id: 'prog_4',
      name: 'Construction Technology',
      description: 'Carpentry, electrical, and construction management skills',
      category: 'Trade',
      duration: '2 years',
      creditsAvailable: 100,
      metrics: {
        views: 134,
        clicks: 42,
        inquiries: 11,
        applications: 5,
      },
      isFeatured: false,
    },
  ];

  // Pipeline Data
  const pipelineSchools = [
    {
      id: 'school_1',
      schoolName: 'Saipan Southern High School',
      location: 'Saipan, CNMI',
      totalStudents: 45,
      interestedStudents: 23,
      inquiries: 12,
      applicants: 8,
      enrolled: 3,
    },
    {
      id: 'school_2',
      schoolName: 'Marianas High School',
      location: 'Saipan, CNMI',
      totalStudents: 38,
      interestedStudents: 19,
      inquiries: 10,
      applicants: 6,
      enrolled: 2,
    },
    {
      id: 'school_3',
      schoolName: 'Tinian High School',
      location: 'Tinian, CNMI',
      totalStudents: 15,
      interestedStudents: 8,
      inquiries: 4,
      applicants: 2,
      enrolled: 1,
    },
  ];

  // Board Posts Data
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
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Back Button */}
        <BackButton onNavigate={onNavigate} label="Back to Login" variant="dark" />

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black mb-2">{collegeInfo.name} 🎓</h1>
              <p className="text-cyan-100 text-lg">
                Career Services Portal • {collegeInfo.contactPerson}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className="text-3xl font-bold">{collegeInfo.rating}</span>
              </div>
              <p className="text-sm text-cyan-100">Partner Rating</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{collegeInfo.totalPrograms}</div>
            <div className="text-sm text-gray-600">Active Programs</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {programs.reduce((sum, p) => sum + p.metrics.applications, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {pipelineSchools.reduce((sum, s) => sum + s.interestedStudents, 0)}
            </div>
            <div className="text-sm text-gray-600">Interested Students</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100">
            <div className="flex items-center justify-between mb-2">
              <Coins className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{collegeInfo.availableCredits}</div>
            <div className="text-sm text-gray-600">Available Credits</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'feed'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Regional Activity
          </button>
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'programs'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Programs & Promotions
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'pipeline'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Co-Op Pipeline
          </button>
          <button
            onClick={() => setActiveTab('board')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'board'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Career Services Network
          </button>
        </div>

        {/* Content Areas */}
        {activeTab === 'feed' && (
          <RegionalTalentFeed
            items={regionalFeed}
            onViewDetails={(id) => console.log('View details:', id)}
          />
        )}

        {activeTab === 'programs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Program Promotions</h2>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl px-5 py-3 shadow-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Coins className="w-5 h-5" />
                    <span className="text-xs font-semibold">Available Credits</span>
                  </div>
                  <div className="text-2xl font-black">{collegeInfo.availableCredits}</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {programs.map((program) => (
                <ProgramPromotionCard
                  key={program.id}
                  program={program}
                  availableCredits={collegeInfo.availableCredits}
                  onPromote={(id) => console.log('Promote program:', id)}
                  onViewDetails={(id) => console.log('View program details:', id)}
                  onMessageInquiries={(id) => console.log('Message inquiries:', id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Western Region Co-Op Pipeline</h2>
            <CoOpPipelineView
              schools={pipelineSchools}
              onViewSchoolDetails={(id) => console.log('View school:', id)}
            />
          </div>
        )}

        {activeTab === 'board' && (
          <CareerServicesBoard
            posts={boardPosts}
            onCreatePost={() => console.log('Create post')}
            onViewPost={(id) => console.log('View post:', id)}
            onUpvote={(id) => console.log('Upvote post:', id)}
            onBookmark={(id) => console.log('Bookmark post:', id)}
            onComment={(id) => console.log('Comment on post:', id)}
          />
        )}
      </div>
    </div>
  );
}
