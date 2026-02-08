import { useState } from 'react';
import { Calendar, Video, Users, MapPin, Clock, Building2, GraduationCap, Briefcase, Star, ArrowRight, CheckCircle, Info, Download, MessageSquare, ExternalLink, Globe } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface VirtualJobFairsProps {
  onNavigate: (page: string) => void;
  userType?: 'student' | 'employer' | 'school';
}

interface JobFair {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  status: 'upcoming' | 'live' | 'past';
  regions: string[];
  participatingSchools: number;
  participatingEmployers: number;
  registeredStudents: number;
  description: string;
  features: string[];
  hosts: string[];
  coverImage?: string;
}

export function VirtualCollegeFairs({ onNavigate, userType = 'student' }: VirtualJobFairsProps) {
  const [selectedFair, setSelectedFair] = useState<JobFair | null>(null);
  const [viewMode, setViewMode] = useState<'upcoming' | 'live' | 'past'>('upcoming');
  const [registeredFairs, setRegisteredFairs] = useState<string[]>(['fair-001']);

  const jobFairs: JobFair[] = [
    {
      id: 'fair-001',
      title: 'Pacific Islands Career & Education Expo 2026',
      date: new Date('2026-02-15'),
      time: '9:00 AM - 5:00 PM HST',
      duration: '8 hours',
      status: 'upcoming',
      regions: ['CNMI', 'FSM', 'Guam', 'Hawaii'],
      participatingSchools: 12,
      participatingEmployers: 35,
      registeredStudents: 847,
      description: 'The largest virtual career and education fair serving the Western Pacific region. Connect with top universities, employers, and training programs all in one place.',
      features: [
        'Live video sessions with recruiters',
        'Virtual booth tours',
        'One-on-one career counseling',
        'Resume review sessions',
        'Scholarship information',
        'Interactive Q&A panels',
        'Networking lounges',
        'Downloadable resources'
      ],
      hosts: ['University of Guam', 'Northern Marianas College', 'College of Micronesia']
    },
    {
      id: 'fair-002',
      title: 'Hospitality & Tourism Job Fair',
      date: new Date('2026-02-28'),
      time: '10:00 AM - 3:00 PM HST',
      duration: '5 hours',
      status: 'upcoming',
      regions: ['Guam', 'CNMI', 'Hawaii'],
      participatingSchools: 5,
      participatingEmployers: 28,
      registeredStudents: 523,
      description: 'Specialized virtual fair focused on hospitality, tourism, and service industry careers. Meet top hotels, resorts, airlines, and tourism companies hiring throughout the Pacific.',
      features: [
        'Industry expert panels',
        'Virtual hotel tours',
        'On-the-spot interviews',
        'Skills demonstrations',
        'Career pathway guidance',
        'Certification information'
      ],
      hosts: ['Guam Visitors Bureau', 'Marianas Visitors Authority']
    },
    {
      id: 'fair-003',
      title: 'STEM Careers in the Pacific',
      date: new Date('2026-03-10'),
      time: '11:00 AM - 4:00 PM HST',
      duration: '5 hours',
      status: 'upcoming',
      regions: ['CNMI', 'FSM', 'Guam', 'Hawaii'],
      participatingSchools: 8,
      participatingEmployers: 18,
      registeredStudents: 312,
      description: 'Explore opportunities in Science, Technology, Engineering, and Mathematics. Connect with tech companies, research institutions, and innovation centers.',
      features: [
        'Live coding demonstrations',
        'Research project showcases',
        'Scholarship opportunities',
        'Internship programs',
        'Tech workshops',
        'Startup pitch sessions'
      ],
      hosts: ['Pacific STEM Network', 'University of Hawaii']
    },
    {
      id: 'fair-004',
      title: 'January Pacific Career Summit',
      date: new Date('2026-01-20'),
      time: '9:00 AM - 6:00 PM HST',
      duration: '9 hours',
      status: 'past',
      regions: ['CNMI', 'FSM', 'Guam', 'Hawaii'],
      participatingSchools: 10,
      participatingEmployers: 42,
      registeredStudents: 1240,
      description: 'Our largest fair of 2026 featuring opportunities across all industries. Students connected with hundreds of employers and educational institutions.',
      features: [
        'Recording available',
        'Resource downloads',
        'Follow-up contacts',
        'Session replays'
      ],
      hosts: ['ZALPHA Platform', 'Pacific Island Career Network']
    }
  ];

  const filteredFairs = jobFairs.filter(fair => fair.status === viewMode);

  const handleRegister = (fairId: string) => {
    if (registeredFairs.includes(fairId)) {
      setRegisteredFairs(registeredFairs.filter(id => id !== fairId));
      alert('Registration cancelled');
    } else {
      setRegisteredFairs([...registeredFairs, fairId]);
      alert('Successfully registered! Check your email for confirmation and access details.');
    }
  };

  const handleJoinLive = (fair: JobFair) => {
    alert(`Launching virtual fair lobby for: ${fair.title}`);
    // In production, this would open the virtual fair platform
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50">
      {/* Navigation */}
      <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Video className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Virtual Job Fairs</h1>
                <p className="text-sm text-gray-600">Connect with employers and schools across the Pacific</p>
              </div>
            </div>
            <BackButton
              onClick={() => onNavigate('demo-showcase')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all font-semibold"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 mb-12 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Globe className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-5xl font-bold mb-2">Virtual Job Fairs</h2>
              <p className="text-xl text-blue-100">Connect with employers and schools from anywhere in the Pacific</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Calendar className="w-8 h-8 mb-2" />
              <div className="text-3xl font-bold mb-1">{jobFairs.filter(f => f.status === 'upcoming').length}</div>
              <div className="text-blue-100">Upcoming Events</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Building2 className="w-8 h-8 mb-2" />
              <div className="text-3xl font-bold mb-1">93</div>
              <div className="text-blue-100">Total Employers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <GraduationCap className="w-8 h-8 mb-2" />
              <div className="text-3xl font-bold mb-1">35</div>
              <div className="text-blue-100">Partner Schools</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="w-8 h-8 mb-2" />
              <div className="text-3xl font-bold mb-1">2,922</div>
              <div className="text-blue-100">Registered Students</div>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setViewMode('upcoming')}
            className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${
              viewMode === 'upcoming'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <Calendar className="w-5 h-5 inline-block mr-2" />
            Upcoming Fairs ({jobFairs.filter(f => f.status === 'upcoming').length})
          </button>
          <button
            onClick={() => setViewMode('live')}
            className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${
              viewMode === 'live'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <Video className="w-5 h-5 inline-block mr-2" />
            Live Now ({jobFairs.filter(f => f.status === 'live').length})
          </button>
          <button
            onClick={() => setViewMode('past')}
            className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${
              viewMode === 'past'
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <Download className="w-5 h-5 inline-block mr-2" />
            Past Events ({jobFairs.filter(f => f.status === 'past').length})
          </button>
        </div>

        {/* Fair Listings */}
        <div className="space-y-6">
          {filteredFairs.map((fair) => {
            const isRegistered = registeredFairs.includes(fair.id);
            
            return (
              <div
                key={fair.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Fair Header */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold">{fair.title}</h3>
                        {isRegistered && (
                          <span className="px-3 py-1 bg-green-500 rounded-full text-xs font-bold">
                            ✓ Registered
                          </span>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          <span>{fair.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          <span>{fair.time} ({fair.duration})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          <span>{fair.regions.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          <span>{fair.registeredStudents.toLocaleString()} registered</span>
                        </div>
                      </div>
                    </div>

                    {fair.status === 'live' && (
                      <div className="ml-4">
                        <div className="px-4 py-2 bg-red-500 rounded-full font-bold text-sm flex items-center gap-2 animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          LIVE NOW
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fair Content */}
                <div className="p-8">
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">{fair.description}</p>

                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 text-blue-600" />
                        <div>
                          <div className="text-2xl font-bold text-blue-900">{fair.participatingSchools}</div>
                          <div className="text-sm text-blue-700">Schools</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-cyan-600" />
                        <div>
                          <div className="text-2xl font-bold text-cyan-900">{fair.participatingEmployers}</div>
                          <div className="text-sm text-cyan-700">Employers</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-green-600" />
                        <div>
                          <div className="text-2xl font-bold text-green-900">{fair.registeredStudents.toLocaleString()}</div>
                          <div className="text-sm text-green-700">Students</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      What's Included:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {fair.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hosted By */}
                  <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="font-semibold text-gray-700 mb-2">Hosted by:</div>
                    <div className="flex flex-wrap gap-2">
                      {fair.hosts.map((host, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-300">
                          {host}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {fair.status === 'live' && (
                      <button
                        onClick={() => handleJoinLive(fair)}
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <Video className="w-6 h-6" />
                        Join Live Fair Now
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    )}

                    {fair.status === 'upcoming' && (
                      <>
                        <button
                          onClick={() => handleRegister(fair.id)}
                          className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all ${
                            isRegistered
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                          }`}
                        >
                          {isRegistered ? '✓ Registered - Click to Cancel' : 'Register for Free'}
                        </button>
                        <button
                          onClick={() => setSelectedFair(fair)}
                          className="px-6 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-bold text-lg"
                        >
                          <Info className="w-6 h-6 inline-block" />
                        </button>
                      </>
                    )}

                    {fair.status === 'past' && (
                      <button
                        onClick={() => alert('Downloading fair resources and recordings...')}
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <Download className="w-6 h-6" />
                        Access Recordings & Resources
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-12 border-2 border-purple-400/50">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Attend Virtual College Fairs?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Access from Anywhere</h3>
              <p className="text-gray-700">
                Join from any island in the Pacific. No travel costs, no time off needed. Connect with opportunities across CNMI, FSM, Guam, and Hawaii from your home.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Meet Multiple Employers</h3>
              <p className="text-gray-700">
                Visit dozens of employer booths in one day. Have live conversations with recruiters, ask questions, and submit applications—all in real-time.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Free for Students</h3>
              <p className="text-gray-700">
                All virtual college fairs are completely free for verified ZALPHA students. Register, attend, and access all resources at no cost.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {userType === 'student' && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Explore Your Future?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Register for upcoming virtual college fairs and connect with opportunities across the Pacific Islands.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onNavigate('student-signup')}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-bold text-lg shadow-lg"
              >
                Create Free Student Account
              </button>
              <button
                onClick={() => onNavigate('student-dashboard')}
                className="px-8 py-4 bg-blue-800 text-white rounded-xl hover:bg-blue-900 transition-all font-bold text-lg shadow-lg"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}