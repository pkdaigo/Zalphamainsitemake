import { useState } from 'react';
import { Search, MapPin, GraduationCap, Filter, Mail, Phone, FileText, CheckCircle, Video, Sparkles, Zap, Bot, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface CandidateSearchProps {
  onNavigate: (page: string) => void;
}

const candidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    education: "Bachelor's in Computer Science",
    graduationYear: 2024,
    location: 'Guam',
    skills: ['JavaScript', 'React', 'Python'],
    verified: true,
    available: true,
    jobTypesLookingFor: ['Technology/IT', 'Freelance/Contract Remote', 'Part-Time'],
    aiMatchScore: 95,
    aiInterviewCompleted: false,
    jobId: 'JOB-001',
    jobTitle: 'Junior Software Developer',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    education: "Associate's in Information Technology",
    graduationYear: 2025,
    location: 'CNMI',
    skills: ['Java', 'SQL', 'Networking'],
    verified: true,
    available: true,
    jobTypesLookingFor: ['Technology/IT', 'Administrative', 'Internships'],
    aiMatchScore: 88,
    aiInterviewCompleted: true,
    jobId: 'JOB-002',
    jobTitle: 'IT Support Specialist',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    education: "Bachelor's in Marketing",
    graduationYear: 2023,
    location: 'Hawaii',
    skills: ['Social Media', 'Content Creation', 'Analytics'],
    verified: true,
    available: false,
    jobTypesLookingFor: ['Marketing/Social Media', 'Creative/Design', 'Freelance/Contract Remote'],
    aiMatchScore: 82,
    aiInterviewCompleted: true,
    jobId: 'JOB-003',
    jobTitle: 'Social Media Coordinator',
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@email.com',
    education: "Bachelor's in Nursing",
    graduationYear: 2024,
    location: 'Guam',
    skills: ['Patient Care', 'Emergency Response', 'Healthcare'],
    verified: true,
    available: true,
    jobTypesLookingFor: ['Healthcare', 'Part-Time', 'Internships'],
    aiMatchScore: 91,
    aiInterviewCompleted: false,
    jobId: 'JOB-004',
    jobTitle: 'Registered Nurse',
  },
  {
    id: 5,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    education: "High School Diploma",
    graduationYear: 2025,
    location: 'FSM',
    skills: ['Customer Service', 'Communication', 'Hospitality'],
    verified: true,
    available: true,
    jobTypesLookingFor: ['Hospitality', 'Restaurant/Food Service', 'Customer Service', 'Part-Time'],
    aiMatchScore: 78,
    aiInterviewCompleted: false,
    jobId: 'JOB-005',
    jobTitle: 'Customer Service Representative',
  },
];

export function CandidateSearch({ onNavigate }: CandidateSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedEducation, setSelectedEducation] = useState('all');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [isPremium] = useState(true); // Demo: Set to true for premium features
  const [useAIMatching, setUseAIMatching] = useState(true);
  const [sendingInterview, setSendingInterview] = useState(false);

  // Handler for sending Zal Interview Link
  const handleSendZalInterview = async (candidate: typeof candidates[0]) => {
    setSendingInterview(true);
    
    try {
      // ============================================================================
      // Make.com Webhook URL for Zal_First_Interview scenario
      // ============================================================================
      const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/unv1ulyok3pxshgyeu5u3s82t2k216zr';
      
      // Send request to Make.com webhook
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidate_id: candidate.id,
          candidate_name: candidate.name,
          email: candidate.email,
          job_id: candidate.jobId,
          job_title: candidate.jobTitle,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Success
      alert('🤖 Zal Interview link sent! Candidate will receive an email with their personalized interview link.');
      console.log('✅ Successfully sent Zal interview request for:', candidate.name);
      
    } catch (error) {
      console.error('❌ Failed to send Zal interview request:', error);
      alert('❌ Something went wrong sending the Zal interview link. Please try again.');
    } finally {
      setSendingInterview(false);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = selectedLocation === 'all' || candidate.location === selectedLocation;
    const matchesEducation = selectedEducation === 'all' || 
                             candidate.education.toLowerCase().includes(selectedEducation.toLowerCase());
    const matchesJobTypes = selectedJobTypes.length === 0 || 
                           selectedJobTypes.some(jobType => candidate.jobTypesLookingFor.includes(jobType));
    return matchesSearch && matchesLocation && matchesEducation && matchesJobTypes;
  });

  // Sort by AI match score if AI matching is enabled
  const sortedCandidates = useAIMatching 
    ? [...filteredCandidates].sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0))
    : filteredCandidates;

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Dashboard" />
        </div>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Find Qualified Candidates</h1>
          <p className="text-sm sm:text-base text-gray-600">{sortedCandidates.length} verified candidates available</p>
        </div>

        {/* Premium AI Matching Banner */}
        {isPremium && (
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-2xl border-4 border-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white">🤖 AI-Powered Matching</h3>
                    <span className="px-2 sm:px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs sm:text-sm font-bold">PREMIUM</span>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">
                    Zee automatically matches the perfect candidates for your jobs. Let AI do the work!
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-white/90 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span>Smart skill matching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-300" />
                      <span>Ranked by fit score</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-300" />
                      <span>Auto AI interviews</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button 
                  onClick={() => setUseAIMatching(!useAIMatching)}
                  className={`px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold transition-all shadow-lg text-sm sm:text-base whitespace-nowrap ${
                    useAIMatching 
                      ? 'bg-white text-purple-600 hover:bg-purple-50' 
                      : 'bg-white/20 text-white border-2 border-white/50 hover:bg-white/30'
                  }`}
                >
                  {useAIMatching ? '✓ AI Matching ON' : 'AI Matching OFF'}
                </button>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-white/20 text-white border-2 border-white/50 rounded-lg sm:rounded-xl font-bold hover:bg-white/30 transition-all text-sm sm:text-base whitespace-nowrap"
                >
                  Manual Search →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 justify-center text-sm sm:text-base"
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="all">All Locations</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                  <select
                    value={selectedEducation}
                    onChange={(e) => setSelectedEducation(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="all">All Levels</option>
                    <option value="high school">High School</option>
                    <option value="associate">Associate's Degree</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Types</label>
                  <div className="flex flex-wrap gap-2">
                    {['Technology/IT', 'Administrative', 'Internships', 'Part-Time', 'Freelance/Contract Remote', 'Marketing/Social Media', 'Creative/Design', 'Healthcare', 'Hospitality', 'Restaurant/Food Service', 'Customer Service'].map((jobType) => (
                      <button
                        key={jobType}
                        onClick={() => {
                          if (selectedJobTypes.includes(jobType)) {
                            setSelectedJobTypes(selectedJobTypes.filter(jt => jt !== jobType));
                          } else {
                            setSelectedJobTypes([...selectedJobTypes, jobType]);
                          }
                        }}
                        className={`px-2 sm:px-3 py-1 ${selectedJobTypes.includes(jobType) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} rounded text-xs`}
                      >
                        {jobType}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedLocation('all');
                      setSelectedEducation('all');
                      setSearchTerm('');
                      setSelectedJobTypes([]);
                    }}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm sm:text-base"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Candidate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow"
            >
              {/* AI Match Score Badge */}
              {isPremium && useAIMatching && (
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-xs font-bold text-purple-900">
                      {candidate.aiMatchScore}% Match
                    </span>
                  </div>
                  {candidate.aiInterviewCompleted && (
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-green-100 border border-green-300 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-xs font-semibold text-green-900">AI Interview ✓</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">{candidate.name}</h3>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {candidate.location}
                    </div>
                  </div>
                </div>
                {candidate.verified && (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" title="ID Verified" />
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <div>{candidate.education}</div>
                    <div className="text-xs">Class of {candidate.graduationYear}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs font-medium text-gray-700 mb-2">Skills</div>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Job Types Looking For */}
              <div className="mb-4">
                <div className="text-xs font-medium text-gray-700 mb-2">Looking For</div>
                <div className="flex flex-wrap gap-1">
                  {candidate.jobTypesLookingFor.slice(0, 3).map((jobType, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded text-xs font-medium"
                    >
                      {jobType}
                    </span>
                  ))}
                  {candidate.jobTypesLookingFor.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{candidate.jobTypesLookingFor.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {candidate.available && (
                <div className="mb-4 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-xs font-medium text-green-800">Available for opportunities</div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={() => setSelectedCandidate(candidate.id)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-xs sm:text-sm"
                >
                  View Profile
                </button>
                <button className="sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedCandidates.length === 0 && (
          <div className="bg-white rounded-xl p-8 sm:p-12 shadow-lg text-center">
            <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No candidates found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Try adjusting your search or filters to find more talent
            </p>
            <button
              onClick={() => {
                setSelectedLocation('all');
                setSelectedEducation('all');
                setSearchTerm('');
                setSelectedJobTypes([]);
              }}
              className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6 z-50">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const candidate = candidates.find(c => c.id === selectedCandidate);
              if (!candidate) return null;
              
              return (
                <>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{candidate.name}</h2>
                        <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                          <MapPin className="w-4 h-4" />
                          {candidate.location}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedCandidate(null)}
                      className="text-gray-400 hover:text-gray-600 self-end sm:self-start"
                    >
                      ✕
                    </button>
                  </div>

                  {/* AI Match Score */}
                  {isPremium && useAIMatching && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-purple-600" />
                          <span className="font-bold text-purple-900">AI Match Analysis</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">{candidate.aiMatchScore}%</span>
                      </div>
                      <div className="w-full bg-purple-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all" 
                          style={{ width: `${candidate.aiMatchScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-purple-700">
                        {candidate.aiMatchScore >= 90 ? '🎯 Excellent match for your requirements' : 
                         candidate.aiMatchScore >= 80 ? '✓ Good match with strong skills' : 
                         '○ Potential match worth considering'}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Education</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <GraduationCap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">{candidate.education}</div>
                            <div className="text-xs sm:text-sm text-gray-600">Graduated {candidate.graduationYear}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Job Types Looking For</h3>
                      <div className="flex flex-wrap gap-2">
                        {candidate.jobTypesLookingFor.map((jobType, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs sm:text-sm font-medium"
                          >
                            {jobType}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Verification Status</h3>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium text-sm sm:text-base">ID Verified</span>
                      </div>
                    </div>

                    {/* Premium: AI Video Interview Option */}
                    {isPremium && (
                      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 sm:p-6 text-white">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-base sm:text-lg mb-1">AI-Powered First Interview</h3>
                            <p className="text-white/90 text-xs sm:text-sm">
                              Let Zee conduct the initial screening interview automatically. You'll receive:
                            </p>
                          </div>
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-white/90 mb-4">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>Full video interview recording & transcript</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>AI analysis of communication skills</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>Technical competency evaluation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>Recommendation: Advance or decline</span>
                          </li>
                        </ul>
                        
                        {/* NEW: Send Zal Interview Link Button */}
                        <div className="space-y-3">
                          <button 
                            onClick={() => handleSendZalInterview(candidate)}
                            className="w-full px-4 sm:px-6 py-3 bg-white text-purple-600 rounded-lg sm:rounded-xl hover:bg-purple-50 transition-colors font-bold flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                            Send Zal Interview Link
                          </button>
                          
                          {/* Developer Note */}
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-xs text-white/70 text-center">
                            💡 On click → call Make scenario: create row in `agent_jobs` (first_interview)
                          </div>
                        </div>
                        
                        {candidate.aiInterviewCompleted && (
                          <div className="mt-3">
                            <button 
                              onClick={() => onNavigate('video-interviews')}
                              className="w-full px-4 sm:px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl hover:bg-white/30 transition-colors font-bold flex items-center justify-center gap-2 text-sm sm:text-base border-2 border-white/30"
                            >
                              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                              View AI Interview Results
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col gap-3 pt-4">
                      {!isPremium && (
                        <button 
                          onClick={() => onNavigate('video-interviews')}
                          className="w-full px-4 sm:px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                          Schedule Video Interview
                        </button>
                      )}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 text-sm sm:text-base">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                          Contact
                        </button>
                        <button className="flex-1 px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2 text-sm sm:text-base">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                          Resume
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}