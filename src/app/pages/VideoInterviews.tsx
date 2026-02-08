import { useState } from 'react';
import { Video, Calendar, Clock, Star, Users, MessageSquare, Download, Play, CheckCircle, XCircle, AlertCircle, Filter, Search, Bot, User, TrendingUp, TrendingDown, AlertTriangle, ThumbsUp, Sparkles } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { AIAnalysisSection } from '@/app/pages/VideoInterviewsAISection';

interface VideoInterviewsProps {
  onNavigate: (page: string) => void;
}

// Mock data for interview history
const interviewHistory = [
  {
    id: 1,
    candidateName: 'Sarah Johnson',
    candidateId: 1,
    position: 'Software Developer',
    date: '2025-01-28',
    time: '2:00 PM',
    duration: '45 min',
    status: 'completed',
    recordingUrl: 'mock-recording-1',
    rating: 4.5,
    interviewType: 'human', // human or ai
    interviewRound: 2, // 1 = first interview, 2 = second interview
    teamRatings: [
      { member: 'John Smith (Hiring Manager)', rating: 5, notes: 'Excellent technical skills, great communication' },
      { member: 'Emily Chen (Tech Lead)', rating: 4, notes: 'Strong React knowledge, could improve on system design' },
    ],
    interviewNotes: 'Very impressive candidate. Strong technical background with 2 years of JavaScript experience. Showed great problem-solving skills during the coding challenge.',
    onboardingStatus: 'pending-decision',
    aiAnalysis: null,
  },
  {
    id: 2,
    candidateName: 'Michael Chen',
    candidateId: 2,
    position: 'IT Support Specialist',
    date: '2025-01-27',
    time: '10:00 AM',
    duration: '30 min',
    status: 'completed',
    recordingUrl: 'mock-recording-2',
    rating: 4,
    interviewType: 'human',
    interviewRound: 2,
    teamRatings: [
      { member: 'John Smith (Hiring Manager)', rating: 4, notes: 'Good technical knowledge, needs more experience' },
    ],
    interviewNotes: 'Solid candidate with good foundational IT knowledge. Eager to learn and has completed relevant certifications.',
    onboardingStatus: 'offer-sent',
    aiAnalysis: null,
  },
  {
    id: 3,
    candidateName: 'Emily Rodriguez',
    candidateId: 3,
    position: 'Marketing Coordinator',
    date: '2025-01-25',
    time: '3:00 PM',
    duration: '40 min',
    status: 'completed',
    recordingUrl: 'mock-recording-3',
    rating: 5,
    interviewType: 'human',
    interviewRound: 2,
    teamRatings: [
      { member: 'John Smith (Hiring Manager)', rating: 5, notes: 'Perfect fit! Excellent portfolio and creative ideas' },
      { member: 'Sarah Williams (Marketing Director)', rating: 5, notes: 'Outstanding social media expertise, hired!' },
    ],
    interviewNotes: 'Exceptional candidate. Presented an impressive portfolio of social media campaigns. Strong understanding of Pacific market.',
    onboardingStatus: 'hired',
    aiAnalysis: null,
  },
  {
    id: 4,
    candidateName: 'David Kim',
    candidateId: 4,
    position: 'Nursing Assistant',
    date: '2025-01-29',
    time: '11:00 AM',
    duration: '35 min',
    status: 'scheduled',
    recordingUrl: null,
    rating: null,
    interviewType: 'human',
    interviewRound: 2,
    teamRatings: [],
    interviewNotes: '',
    onboardingStatus: 'interview-scheduled',
    aiAnalysis: null,
  },
  {
    id: 5,
    candidateName: 'Jessica Martinez',
    candidateId: 5,
    position: 'Customer Service Representative',
    date: '2025-01-26',
    time: '9:00 AM',
    duration: '20 min',
    status: 'completed',
    recordingUrl: 'mock-recording-5',
    rating: 4.2,
    interviewType: 'ai',
    interviewRound: 1,
    teamRatings: [],
    interviewNotes: '',
    onboardingStatus: 'pending-decision',
    aiAnalysis: {
      overallScore: 4.2,
      communication: 4.5,
      technicalSkills: 4.0,
      culturalFit: 4.3,
      enthusiasm: 4.5,
      redFlags: [],
      strengths: [
        'Excellent communication skills and friendly demeanor',
        'Prior customer service experience in hospitality',
        'Bilingual (English/Spanish) - valuable for Pacific region',
        'Showed strong problem-solving abilities'
      ],
      concerns: [
        'Limited experience with CRM software',
        'May need training on technical support systems'
      ],
      recommendation: 'Strong candidate - Recommend advancing to human interview',
      transcript: 'AI: Hello Jessica! Thank you for applying. Can you tell me about your customer service experience?\n\nJessica: Hi! I worked at a hotel front desk for 2 years, handling guest check-ins, complaints, and special requests. I really enjoy helping people solve problems.\n\nAI: That\'s great! Can you describe a challenging customer situation you handled?\n\nJessica: Sure! Once a guest was very upset about a booking error. I listened carefully, apologized sincerely, offered a room upgrade, and arranged a complimentary dinner. They left a 5-star review!\n\n[... additional conversation ...]'
    },
  },
  {
    id: 6,
    candidateName: 'Marcus Thompson',
    candidateId: 6,
    position: 'Warehouse Associate',
    date: '2025-01-24',
    time: '1:30 PM',
    duration: '18 min',
    status: 'completed',
    recordingUrl: 'mock-recording-6',
    rating: 3.5,
    interviewType: 'ai',
    interviewRound: 1,
    teamRatings: [],
    interviewNotes: '',
    onboardingStatus: 'rejected',
    aiAnalysis: {
      overallScore: 3.5,
      communication: 3.0,
      technicalSkills: 4.0,
      culturalFit: 3.5,
      enthusiasm: 3.0,
      redFlags: [
        'Mentioned leaving previous job due to "disagreement with management"',
        'Gave short, minimal responses to behavioral questions'
      ],
      strengths: [
        'Strong physical fitness and able to lift heavy objects',
        'Forklift certified',
        'Punctual and reliable attendance history'
      ],
      concerns: [
        'Limited enthusiasm during interview',
        'May have interpersonal issues with supervisors',
        'Communication skills below average'
      ],
      recommendation: 'Not recommended - Consider other candidates first',
      transcript: 'AI: Hello Marcus! Thank you for your interest in the warehouse position. Tell me about your warehouse experience.\n\nMarcus: Worked at a warehouse for a year. Did shipping and receiving.\n\nAI: What did you enjoy most about that role?\n\nMarcus: It was okay. Pay was decent.\n\n[... additional conversation ...]'
    },
  },
];

export function VideoInterviews({ onNavigate }: VideoInterviewsProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('all');
  const [selectedInterview, setSelectedInterview] = useState<number | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [interviewType, setInterviewType] = useState<'ai' | 'human'>('ai');
  const [allowRetakes, setAllowRetakes] = useState(true); // New state for retake option
  const [maxRetakes, setMaxRetakes] = useState(2); // Maximum number of retakes allowed

  const filteredInterviews = interviewHistory.filter((interview) => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'upcoming' && interview.status === 'scheduled') ||
      (activeTab === 'completed' && interview.status === 'completed');
    const matchesStatus = filterStatus === 'all' || interview.onboardingStatus === filterStatus;
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'hired':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Hired
        </span>;
      case 'offer-sent':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Offer Sent
        </span>;
      case 'pending-decision':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold flex items-center gap-1">
          <Clock className="w-3 h-3" /> Pending Decision
        </span>;
      case 'interview-scheduled':
        return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold flex items-center gap-1">
          <Calendar className="w-3 h-3" /> Scheduled
        </span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold flex items-center gap-1">
          <XCircle className="w-3 h-3" /> Not Selected
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <BackButton
            onClick={() => onNavigate('employer-dashboard')}
            className="text-blue-600 hover:text-blue-700 font-semibold mb-4 text-sm md:text-base"
          />
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2 md:gap-3">
                <Video className="w-7 h-7 md:w-10 md:h-10 text-purple-600" />
                Video Interviews
              </h1>
              <p className="text-gray-600 text-sm md:text-base">Conduct, record, and review candidate interviews with your team</p>
            </div>
            
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="w-full md:w-auto px-4 md:px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              Schedule Interview
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border-2 border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs md:text-sm font-semibold text-gray-600">Total</h3>
              <Video className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900">{interviewHistory.length}</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border-2 border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs md:text-sm font-semibold text-gray-600">Upcoming</h3>
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900">
              {interviewHistory.filter(i => i.status === 'scheduled').length}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border-2 border-green-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs md:text-sm font-semibold text-gray-600">Hired</h3>
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900">
              {interviewHistory.filter(i => i.onboardingStatus === 'hired').length}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border-2 border-yellow-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs md:text-sm font-semibold text-gray-600">Avg Rating</h3>
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900">4.5</div>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
          {/* Tabs */}
          <div className="flex gap-1 md:gap-2 mb-4 md:mb-6 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 md:px-6 py-2 md:py-3 font-semibold transition-all whitespace-nowrap text-sm md:text-base ${
                activeTab === 'all'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              All Interviews
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 md:px-6 py-2 md:py-3 font-semibold transition-all whitespace-nowrap text-sm md:text-base ${
                activeTab === 'upcoming'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 md:px-6 py-2 md:py-3 font-semibold transition-all whitespace-nowrap text-sm md:text-base ${
                activeTab === 'completed'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Completed
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates or positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="interview-scheduled">Scheduled</option>
                <option value="pending-decision">Pending Decision</option>
                <option value="offer-sent">Offer Sent</option>
                <option value="hired">Hired</option>
                <option value="rejected">Not Selected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interview List */}
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex items-start gap-3 md:gap-4 flex-1 mb-3 md:mb-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0">
                    {interview.candidateName.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 truncate">{interview.candidateName}</h3>
                    <p className="text-sm md:text-base text-gray-600 font-medium truncate">{interview.position}</p>
                    
                    {/* Interview Type Badge */}
                    <div className="flex items-center gap-2 mt-2">
                      {interview.interviewType === 'ai' ? (
                        <span className="px-2.5 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 rounded-full text-xs font-bold flex items-center gap-1 border border-cyan-300">
                          <Bot className="w-3 h-3" />
                          AI Interview - Round {interview.interviewRound}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-bold flex items-center gap-1 border border-purple-300">
                          <User className="w-3 h-3" />
                          Human Interview - Round {interview.interviewRound}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-600 mt-2 md:mt-3">
                      <div className="flex items-center gap-1 md:gap-2">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">{interview.date}</span>
                        <span className="sm:hidden">{new Date(interview.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Clock className="w-3 h-3 md:w-4 md:h-4" />
                        {interview.time}
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Video className="w-3 h-3 md:w-4 md:h-4" />
                        {interview.duration}
                      </div>
                      {interview.rating && (
                        <div className="flex items-center gap-1 md:gap-2 text-yellow-600 font-semibold">
                          <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-600" />
                          {interview.rating.toFixed(1)}
                        </div>
                      )}
                      {interview.teamRatings.length > 0 && (
                        <div className="flex items-center gap-1 md:gap-2 text-purple-600 font-semibold">
                          <Users className="w-3 h-3 md:w-4 md:h-4" />
                          {interview.teamRatings.length}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="md:ml-4">
                  {getStatusBadge(interview.onboardingStatus)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4">
                {interview.status === 'completed' && (
                  <>
                    <button
                      onClick={() => setSelectedInterview(interview.id)}
                      className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <Play className="w-4 h-4" />
                      <span className="hidden sm:inline">Watch Recording</span>
                      <span className="sm:hidden">Watch</span>
                    </button>
                    <button className="px-3 md:px-4 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-purple-500 hover:text-purple-600 transition-all font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
                      <MessageSquare className="w-4 h-4" />
                      <span className="hidden sm:inline">Notes</span>
                    </button>
                    <button className="px-3 md:px-4 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-purple-500 hover:text-purple-600 transition-all font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </>
                )}
                {interview.status === 'scheduled' && (
                  <>
                    <button className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
                      <Video className="w-4 h-4" />
                      Join Interview
                    </button>
                    <button className="px-3 md:px-4 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-purple-500 hover:text-purple-600 transition-all font-semibold text-sm md:text-base">
                      Reschedule
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredInterviews.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-lg text-center">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No interviews found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Schedule your first video interview to get started'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button
                onClick={() => setShowScheduleModal(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold"
              >
                Schedule Interview
              </button>
            )}
          </div>
        )}
      </div>

      {/* Interview Detail Modal with Recording Playback */}
      {selectedInterview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-3 md:p-6 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-4 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const interview = interviewHistory.find(i => i.id === selectedInterview);
              if (!interview) return null;
              
              return (
                <>
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div>
                      <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{interview.candidateName}</h2>
                      <p className="text-base md:text-lg text-gray-600">{interview.position}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedInterview(null)}
                      className="text-gray-400 hover:text-gray-600 text-xl md:text-2xl ml-2"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Video Player */}
                  <div className="mb-4 md:mb-6">
                    <div className="bg-gray-900 rounded-xl overflow-hidden aspect-video mb-3 md:mb-4">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
                        <div className="text-center text-white">
                          <Play className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-2 md:mb-4 opacity-50" />
                          <p className="text-base md:text-lg font-semibold">Interview Recording</p>
                          <p className="text-xs md:text-sm text-gray-300 mt-1 md:mt-2">{interview.date} • {interview.duration}</p>
                          {interview.interviewType === 'ai' && (
                            <div className="mt-2 md:mt-3">
                              <span className="px-3 py-1.5 bg-cyan-500/20 text-cyan-200 rounded-full text-xs font-bold flex items-center gap-1 justify-center w-fit mx-auto border border-cyan-400/30">
                                <Bot className="w-3.5 h-3.5" />
                                AI-Conducted Interview
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <button className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
                        <Play className="w-4 h-4 md:w-5 md:h-5" />
                        Play Recording
                      </button>
                      <button className="px-3 md:px-4 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-purple-500 transition-all font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
                        <Download className="w-4 h-4 md:w-5 md:h-5" />
                        Download
                      </button>
                    </div>
                  </div>

                  {/* AI Analysis Section - Only show for AI interviews */}
                  {interview.aiAnalysis && (
                    <AIAnalysisSection 
                      aiAnalysis={interview.aiAnalysis}
                      onScheduleRound2={() => {
                        setSelectedInterview(null);
                        setShowScheduleModal(true);
                        setInterviewType('human');
                      }}
                    />
                  )}

                  {/* Team Ratings Section */}
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                      Team Reviews ({interview.teamRatings.length})
                    </h3>
                    
                    <div className="space-y-3 md:space-y-4">
                      {interview.teamRatings.map((rating, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-3 md:p-4 border-2 border-gray-200">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 md:mb-3 gap-2">
                            <div className="font-semibold text-sm md:text-base text-gray-900">{rating.member}</div>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 md:w-5 md:h-5 ${
                                    star <= rating.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-1 md:ml-2 font-bold text-sm md:text-base text-gray-900">{rating.rating}.0</span>
                            </div>
                          </div>
                          <p className="text-sm md:text-base text-gray-700">{rating.notes}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Your Rating */}
                    <div className="mt-3 md:mt-4 p-3 md:p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                      <h4 className="font-bold text-sm md:text-base text-purple-900 mb-2 md:mb-3">Add Your Rating</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 mb-3">
                        <label className="text-xs md:text-sm font-medium text-gray-700">Your Rating:</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className="hover:scale-110 transition-transform touch-manipulation">
                              <Star className="w-7 h-7 md:w-6 md:h-6 text-gray-300 hover:text-yellow-400 hover:fill-yellow-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        placeholder="Add your notes about this candidate..."
                        rows={3}
                        className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                      ></textarea>
                      <button className="mt-3 px-4 md:px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold text-sm md:text-base w-full sm:w-auto">
                        Submit Review
                      </button>
                    </div>
                  </div>

                  {/* Interview Notes */}
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                      Interview Notes
                    </h3>
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 md:p-4">
                      <p className="text-sm md:text-base text-gray-800">{interview.interviewNotes}</p>
                    </div>
                  </div>

                  {/* Onboarding Actions */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Next Steps</h3>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 md:gap-3">
                      <button className="px-4 md:px-6 py-2.5 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                        Send Offer
                      </button>
                      <button 
                        onClick={() => onNavigate('candidate-search')}
                        className="px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-sm md:text-base"
                      >
                        View Full Profile
                      </button>
                      <button className="px-4 md:px-6 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-purple-500 hover:text-purple-600 transition-all font-semibold text-sm md:text-base">
                        Schedule Follow-up
                      </button>
                      <button className="px-4 md:px-6 py-2.5 md:py-3 border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
                        <XCircle className="w-4 h-4 md:w-5 md:h-5" />
                        Not a Fit
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 md:p-6 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-4 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Schedule Video Interview</h2>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl md:text-2xl ml-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 md:space-y-4">
              {/* Interview Type Selection */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-3">Interview Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setInterviewType('ai')}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      interviewType === 'ai'
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-300 hover:border-cyan-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className={`w-5 h-5 ${interviewType === 'ai' ? 'text-cyan-600' : 'text-gray-500'}`} />
                      <span className={`font-bold ${interviewType === 'ai' ? 'text-cyan-900' : 'text-gray-700'}`}>
                        AI Interview
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">Round 1 - Screening</p>
                    <p className="text-xs text-gray-500">Automated 24/7, instant analysis</p>
                  </button>

                  <button
                    onClick={() => setInterviewType('human')}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      interviewType === 'human'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User className={`w-5 h-5 ${interviewType === 'human' ? 'text-purple-600' : 'text-gray-500'}`} />
                      <span className={`font-bold ${interviewType === 'human' ? 'text-purple-900' : 'text-gray-700'}`}>
                        Human Interview
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">Round 2 - Required</p>
                    <p className="text-xs text-gray-500">Conducted by your team</p>
                  </button>
                </div>
              </div>

              {/* Important Notice for Human Interview Requirement */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3 md:p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm md:text-base text-amber-900 mb-1">
                      {interviewType === 'ai' ? 'AI Screening Only' : 'Final Interview Stage'}
                    </h4>
                    <p className="text-xs md:text-sm text-amber-800">
                      {interviewType === 'ai' 
                        ? '⚠️ Company Policy: AI can conduct first interviews, but a human interview (Round 2) is REQUIRED before making any hiring decision.'
                        : '✓ This is your final interview stage. Human review ensures cultural fit and personal connection with candidates.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Interview Benefits */}
              {interviewType === 'ai' && (
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-3 md:p-4">
                  <h4 className="font-semibold text-sm md:text-base text-cyan-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                    AI Interview Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-cyan-800">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-cyan-600" />
                      <span>24/7 availability</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-cyan-600" />
                      <span>Instant analysis report</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-cyan-600" />
                      <span>Detailed scoring (5 metrics)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-cyan-600" />
                      <span>Red flag detection</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-cyan-600" />
                      <span>Full transcript provided</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-cyan-600" />
                      <span>Zero recruiter time</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Human Interview Info */}
              {interviewType === 'human' && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-3 md:p-4">
                  <h4 className="font-semibold text-sm md:text-base text-purple-900 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 md:w-5 md:h-5" />
                    Human Interview Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-purple-800">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>Team collaboration</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>Multiple reviewers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>Cultural assessment</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>Personal connection</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>Recorded & saved</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>Final hiring decision</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Select Candidate</label>
                <select className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none">
                  <option>Sarah Johnson - Software Developer</option>
                  <option>Michael Chen - IT Support Specialist</option>
                  <option>Emily Rodriguez - Marketing Coordinator</option>
                  <option>David Kim - Nursing Assistant</option>
                  <option>Maria Santos - Customer Service</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Interview Date
                    {interviewType === 'ai' && <span className="text-cyan-600 ml-1">(Flexible)</span>}
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                  {interviewType === 'ai' && (
                    <p className="text-xs text-cyan-600 mt-1">AI interviews can start immediately</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Interview Time
                    {interviewType === 'ai' && <span className="text-cyan-600 ml-1">(Optional)</span>}
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    disabled={interviewType === 'ai'}
                  />
                  {interviewType === 'ai' && (
                    <p className="text-xs text-cyan-600 mt-1">24/7 availability</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none">
                  {interviewType === 'ai' ? (
                    <>
                      <option>15-20 minutes (Recommended)</option>
                      <option>20-25 minutes</option>
                      <option>25-30 minutes</option>
                    </>
                  ) : (
                    <>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </>
                  )}
                </select>
              </div>

              {interviewType === 'human' && (
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Add Team Members (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter email addresses separated by commas"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-600 mt-2">Team members will receive the recording and can add their ratings</p>
                </div>
              )}

              {interviewType === 'ai' && (
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">AI Interview Focus (Optional)</label>
                  <select className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none">
                    <option>General screening (Default)</option>
                    <option>Technical skills assessment</option>
                    <option>Customer service focus</option>
                    <option>Communication skills</option>
                    <option>Cultural fit evaluation</option>
                  </select>
                </div>
              )}

              {/* NEW: AI Interview Retake Options */}
              {interviewType === 'ai' && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-3 md:p-4">
                  <h4 className="font-semibold text-sm md:text-base text-orange-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
                    AI Interview Retake Policy
                  </h4>
                  
                  <div className="mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allowRetakes}
                        onChange={(e) => setAllowRetakes(e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        Allow candidates to retake AI interview
                      </span>
                    </label>
                    <p className="text-xs text-orange-700 ml-6 mt-1">
                      Candidates can retake the AI interview to improve their score if they don't pass on the first attempt.
                    </p>
                  </div>

                  {allowRetakes && (
                    <div className="ml-6 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Maximum retakes allowed per candidate:
                        </label>
                        <select
                          value={maxRetakes}
                          onChange={(e) => setMaxRetakes(Number(e.target.value))}
                          className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                        >
                          <option value={1}>1 retake (2 attempts total)</option>
                          <option value={2}>2 retakes (3 attempts total)</option>
                          <option value={3}>3 retakes (4 attempts total)</option>
                          <option value={-1}>Unlimited retakes</option>
                        </select>
                      </div>

                      <div className="bg-white/60 rounded-lg p-3 border border-orange-200">
                        <h5 className="font-semibold text-xs text-gray-900 mb-2">Retake Policy Details:</h5>
                        <ul className="space-y-1 text-xs text-gray-700">
                          <li className="flex items-start gap-1">
                            <span className="text-orange-600 mt-0.5">•</span>
                            <span>Candidates must wait <strong>24 hours</strong> between retake attempts</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-orange-600 mt-0.5">•</span>
                            <span>Only the <strong>highest score</strong> will be considered for Round 2</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-orange-600 mt-0.5">•</span>
                            <span>You can review <strong>all attempt transcripts</strong> and analysis reports</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-orange-600 mt-0.5">•</span>
                            <span>AI asks different questions each attempt (no memorization)</span>
                          </li>
                          {maxRetakes === -1 ? (
                            <li className="flex items-start gap-1">
                              <span className="text-orange-600 mt-0.5">•</span>
                              <span><strong>Unlimited retakes:</strong> Best for skill-based roles where persistence matters</span>
                            </li>
                          ) : (
                            <li className="flex items-start gap-1">
                              <span className="text-orange-600 mt-0.5">•</span>
                              <span>After {maxRetakes} retake{maxRetakes > 1 ? 's' : ''}, no more attempts allowed</span>
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-xs text-blue-900">
                          <strong>💡 Pro Tip:</strong> Allowing retakes can help nervous candidates perform better and demonstrates your company values growth and second chances. Many employers find this reduces hiring bias and discovers hidden talent!
                        </p>
                      </div>
                    </div>
                  )}

                  {!allowRetakes && (
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200 mt-3">
                      <p className="text-xs text-red-900">
                        <strong>⚠️ No Retakes Policy:</strong> Candidates get only ONE chance at the AI interview. This may increase pressure and potentially exclude qualified candidates who perform poorly under stress.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder={interviewType === 'ai' 
                    ? 'Add specific topics or requirements for the AI to cover...'
                    : 'Add any notes or interview topics...'}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className={`${interviewType === 'ai' ? 'bg-cyan-50 border-cyan-200' : 'bg-purple-50 border-purple-200'} border-2 rounded-xl p-3 md:p-4`}>
                <h4 className={`font-semibold text-sm md:text-base ${interviewType === 'ai' ? 'text-cyan-900' : 'text-purple-900'} mb-2 flex items-center gap-2`}>
                  <Video className="w-4 h-4 md:w-5 md:h-5" />
                  Interview Recording
                </h4>
                <p className={`text-xs md:text-sm ${interviewType === 'ai' ? 'text-cyan-800' : 'text-purple-800'}`}>
                  ✓ Interview will be automatically recorded<br />
                  ✓ Saved to your interview history<br />
                  {interviewType === 'ai' && (
                    <>
                      ✓ AI analysis report generated instantly<br />
                      ✓ Detailed scoring on 5 key metrics<br />
                    </>
                  )}
                  {interviewType === 'human' && (
                    <>
                      ✓ Accessible to all team members<br />
                      ✓ Team ratings and collaboration tools<br />
                    </>
                  )}
                  ✓ Available for download anytime
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2 md:pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className={`flex-1 px-4 md:px-6 py-2.5 md:py-3 ${
                    interviewType === 'ai' 
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600'
                  } text-white rounded-xl hover:shadow-lg transition-all font-bold text-sm md:text-base flex items-center justify-center gap-2`}
                >
                  {interviewType === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  Schedule {interviewType === 'ai' ? 'AI' : 'Human'} Interview
                </button>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 md:px-6 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm md:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}