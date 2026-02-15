import { useState } from 'react';
import { Calendar, Video, Users, MapPin, Clock, GraduationCap, BookOpen, Award, Star, ArrowRight, CheckCircle, Info, Download, Globe, School, TrendingUp, DollarSign } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface VirtualCollegeFairs2Props {
  onNavigate: (page: string) => void;
  userType?: 'student' | 'employer' | 'school';
}

interface CollegeFair {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  status: 'upcoming' | 'live' | 'past';
  regions: string[];
  participatingColleges: number;
  registeredStudents: number;
  description: string;
  features: string[];
  colleges: string[];
  focusAreas: string[];
  coverImage?: string;
}

export function VirtualCollegeFairs2({ onNavigate, userType = 'student' }: VirtualCollegeFairs2Props) {
  const [selectedFair, setSelectedFair] = useState<CollegeFair | null>(null);
  const [viewMode, setViewMode] = useState<'upcoming' | 'live' | 'past'>('upcoming');
  const [registeredFairs, setRegisteredFairs] = useState<string[]>(['college-fair-001']);

  const collegeFairs: CollegeFair[] = [
    {
      id: 'college-fair-001',
      title: 'Pacific Islands College Admissions Fair 2026',
      date: new Date('2026-02-22'),
      time: '10:00 AM - 4:00 PM HST',
      duration: '6 hours',
      status: 'upcoming',
      regions: ['CNMI', 'FSM', 'Guam', 'Hawaii'],
      participatingColleges: 18,
      registeredStudents: 1243,
      description: 'The premier virtual college fair for high school graduates across the Western Pacific. Meet admissions representatives from all major universities and colleges in Guam, CNMI, FSM, and Hawaii. Learn about programs, scholarships, financial aid, and campus life.',
      features: [
        'Live Q&A with admissions officers',
        'Virtual campus tours',
        'One-on-one advising sessions',
        'Application workshops',
        'Scholarship information sessions',
        'Financial aid guidance',
        'Student life presentations',
        'Program-specific breakout rooms'
      ],
      colleges: [
        'University of Guam',
        'University of Hawaii (10 campuses)',
        'Northern Marianas College',
        'College of Micronesia-FSM',
        'Palau Community College',
        'Guam Community College',
        'Hawaii Pacific University',
        'Chaminade University of Honolulu'
      ],
      focusAreas: ['Liberal Arts', 'STEM', 'Business', 'Healthcare', 'Education', 'Marine Science', 'Hospitality']
    },
    {
      id: 'college-fair-002',
      title: 'Guam Colleges Virtual Open House',
      date: new Date('2026-03-05'),
      time: '9:00 AM - 2:00 PM ChST',
      duration: '5 hours',
      status: 'upcoming',
      regions: ['Guam', 'CNMI'],
      participatingColleges: 4,
      registeredStudents: 687,
      description: 'Exclusive virtual open house featuring all major colleges in Guam. Perfect for CNMI and Guam high school graduates looking to stay close to home while pursuing higher education.',
      features: [
        'Live campus virtual tours',
        'Meet current students',
        'Department presentations',
        'Housing and dorm tours',
        'Athletic programs showcase',
        'Campus life Q&A',
        'Transfer student support',
        'Military student resources'
      ],
      colleges: [
        'University of Guam',
        'Guam Community College',
        'Pacific Islands University',
        'Guam Adventist Academy'
      ],
      focusAreas: ['Nursing', 'Business Administration', 'Education', 'Marine Biology', 'Public Health', 'Tourism Management']
    },
    {
      id: 'college-fair-003',
      title: 'University of Hawaii System Virtual Fair',
      date: new Date('2026-03-15'),
      time: '11:00 AM - 5:00 PM HST',
      duration: '6 hours',
      status: 'upcoming',
      regions: ['Hawaii', 'CNMI', 'FSM', 'Guam'],
      participatingColleges: 10,
      registeredStudents: 2156,
      description: 'Explore all 10 University of Hawaii campuses in one day! Learn about the diverse programs across the UH system, from community colleges to research universities. Perfect for Pacific Islander students seeking quality education.',
      features: [
        'All 10 UH campuses represented',
        'Pacific Islander student services',
        'WICHE/WUE program info',
        'Indigenous student support',
        'Research opportunities',
        'Study abroad programs',
        'Graduate school pathways',
        'Alumni success stories'
      ],
      colleges: [
        'UH Mānoa (flagship)',
        'UH Hilo',
        'UH West Oahu',
        'Hawaii Community College',
        'Honolulu Community College',
        'Kapiolani Community College',
        'Kauai Community College',
        'Leeward Community College',
        'Windward Community College',
        'Maui College'
      ],
      focusAreas: ['Astronomy', 'Oceanography', 'Hawaiian Studies', 'Engineering', 'Business', 'Nursing', 'Liberal Arts']
    },
    {
      id: 'college-fair-004',
      title: 'Micronesia College Expo',
      date: new Date('2026-03-28'),
      time: '10:00 AM - 3:00 PM ChST',
      duration: '5 hours',
      status: 'upcoming',
      regions: ['FSM', 'CNMI', 'Guam'],
      participatingColleges: 6,
      registeredStudents: 534,
      description: 'Dedicated fair for colleges serving Micronesian students. Learn about programs tailored to FSM, CNMI, and regional students with cultural support and island-friendly policies.',
      features: [
        'Micronesian student organizations',
        'Island culture support services',
        'Language assistance programs',
        'Family housing options',
        'Compact of Free Association benefits',
        'Peer mentorship programs',
        'Cultural events calendar',
        'Remittance and family support resources'
      ],
      colleges: [
        'College of Micronesia-FSM (all 6 campuses)',
        'Northern Marianas College',
        'University of Guam - Micronesian Programs',
        'Palau Community College',
        'College of the Marshall Islands'
      ],
      focusAreas: ['Teacher Education', 'Agriculture', 'Fisheries', 'Public Health', 'Business', 'Information Technology']
    },
    {
      id: 'college-fair-005',
      title: 'January Pacific College Summit (Past Event)',
      date: new Date('2026-01-15'),
      time: '9:00 AM - 4:00 PM HST',
      duration: '7 hours',
      status: 'past',
      regions: ['CNMI', 'FSM', 'Guam', 'Hawaii'],
      participatingColleges: 22,
      registeredStudents: 1890,
      description: 'Our largest college fair of early 2026! High school graduates connected with 22 colleges and universities across the Pacific. Recordings and resources still available.',
      features: [
        'Full event recording available',
        'Downloadable college guides',
        'Application deadline calendar',
        'Scholarship database access',
        'Follow-up contact list'
      ],
      colleges: [
        'All major Pacific institutions',
        'Select mainland U.S. universities',
        'Online degree programs'
      ],
      focusAreas: ['All majors represented']
    },
    {
      id: 'pacific-track',
      name: 'Pacific Islander Student Pathways Track',
      date: 'March 15, 2024',
      time: '10:00 AM - 4:00 PM (ChST)',
      participatingColleges: 6,
      registeredStudents: 534,
      description: 'Dedicated fair for colleges serving Pacific Islander students. Learn about programs tailored to FSM, CNMI, Palau, RMI, and regional students with cultural support and island-friendly policies.',
      features: [
        'Pacific Islander student organizations',
        'Island culture support services',
        'Language assistance programs',
        'COFA-friendly financial aid',
        'Family housing options',
      ],
      colleges: [
        'Pacific Islands University',
        'College of Micronesia-FSM (all 6 campuses)',
        'Northern Marianas College',
        'University of Guam - Pacific Islander Programs',
        'Palau Community College',
        'College of the Marshall Islands'
      ]
    }
  ];

  const filteredFairs = collegeFairs.filter(fair => fair.status === viewMode);

  const handleRegister = (fairId: string) => {
    if (registeredFairs.includes(fairId)) {
      setRegisteredFairs(registeredFairs.filter(id => id !== fairId));
      alert('Registration cancelled');
    } else {
      setRegisteredFairs([...registeredFairs, fairId]);
      alert('Successfully registered! Check your email for confirmation and virtual fair access link.');
    }
  };

  const handleJoinLive = (fair: CollegeFair) => {
    alert(`Launching virtual college fair lobby for: ${fair.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Virtual College Fairs</h1>
                <p className="text-sm text-gray-600">For High School Graduates • Explore Pacific Universities</p>
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
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 mb-12 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <School className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-5xl font-bold mb-2">Virtual College Fairs</h2>
              <p className="text-xl text-purple-100">High School Graduates: Explore colleges across Guam, CNMI, FSM & Hawaii</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Calendar className="w-8 h-8 mb-2" />
              <div className="text-3xl font-bold mb-1">{collegeFairs.filter(f => f.status === 'upcoming').length}</div>
              <div className="text-purple-100">Upcoming Fairs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <GraduationCap className="w-8 h-8 mb-2" />
              <div className="text-3xl font-bold mb-1">38</div>
              <div className="text-purple-100">Colleges & Universities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="w-8 h-8 mb-2" />
              <div className="text-3xl font-bold mb-1">6,510</div>
              <div className="text-purple-100">Students Registered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <DollarSign className="w-8 h-8 mb-2" />
              <div className="text-3xl font-bold mb-1">$42M+</div>
              <div className="text-purple-100">Scholarships Available</div>
            </div>
          </div>
        </div>

        {/* Featured Pacific Colleges */}
        <div className="mb-12 bg-white rounded-3xl shadow-xl p-8 border-2 border-purple-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            Participating Colleges & Universities
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Guam Colleges */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h4 className="text-xl font-bold text-gray-900">Guam</h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>University of Guam</strong> - 4-year research university</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Guam Community College</strong> - 2-year associate degrees</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Pacific Islands University</strong> - Private Christian university</span>
                </li>
              </ul>
            </div>

            {/* Hawaii Colleges */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
                <h4 className="text-xl font-bold text-gray-900">Hawaii</h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>University of Hawaii System</strong> - 10 campuses statewide</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Hawaii Pacific University</strong> - Private university</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Chaminade University</strong> - Catholic Marianist university</span>
                </li>
              </ul>
            </div>

            {/* CNMI Colleges */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
                <h4 className="text-xl font-bold text-gray-900">Northern Mariana Islands (CNMI)</h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Northern Marianas College</strong> - Community college and 4-year programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Programs in business, education, nursing, and liberal arts</span>
                </li>
              </ul>
            </div>

            {/* FSM Colleges */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
                <h4 className="text-xl font-bold text-gray-900">Federated States of Micronesia (FSM)</h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>College of Micronesia-FSM</strong> - 6 campuses across FSM</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Palau Community College</strong> - Associate and bachelor degrees</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>College of the Marshall Islands</strong> - RMI higher education</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setViewMode('upcoming')}
            className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${
              viewMode === 'upcoming'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <Calendar className="w-5 h-5 inline-block mr-2" />
            Upcoming Fairs ({collegeFairs.filter(f => f.status === 'upcoming').length})
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
            Live Now ({collegeFairs.filter(f => f.status === 'live').length})
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
            Past Events ({collegeFairs.filter(f => f.status === 'past').length})
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
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
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
                          <span>{fair.registeredStudents.toLocaleString()} students registered</span>
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
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 text-purple-600" />
                        <div>
                          <div className="text-2xl font-bold text-purple-900">{fair.participatingColleges}</div>
                          <div className="text-sm text-purple-700">Colleges</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-pink-600" />
                        <div>
                          <div className="text-2xl font-bold text-pink-900">{fair.focusAreas.length}</div>
                          <div className="text-sm text-pink-700">Program Areas</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                          <div className="text-2xl font-bold text-blue-900">{fair.registeredStudents.toLocaleString()}</div>
                          <div className="text-sm text-blue-700">Students</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <h4 className="font-bold text-gray-900 mb-3">🎓 Program Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {fair.focusAreas.map((area, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-purple-700 border border-purple-300 shadow-sm">
                          {area}
                        </span>
                      ))}
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

                  {/* Participating Colleges */}
                  <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <School className="w-5 h-5" />
                      Participating Colleges & Universities:
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {fair.colleges.map((college, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span>{college}</span>
                        </div>
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
                              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                          }`}
                        >
                          {isRegistered ? '✓ Registered - Click to Cancel' : 'Register for Free'}
                        </button>
                        <button
                          onClick={() => setSelectedFair(fair)}
                          className="px-6 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition-all font-bold text-lg"
                        >
                          <Info className="w-6 h-6 inline-block" />
                        </button>
                      </>
                    )}

                    {fair.status === 'past' && (
                      <button
                        onClick={() => alert('Downloading college fair resources and recordings...')}
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

        {/* Benefits Section for High School Graduates */}
        <div className="mt-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-12 border-2 border-green-400/50">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Attend Virtual College Fairs?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Explore All Options</h3>
              <p className="text-gray-700">
                Meet representatives from every major college in Guam, CNMI, FSM, and Hawaii. Compare programs, costs, and campus life all in one place.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Find Scholarships</h3>
              <p className="text-gray-700">
                Learn about scholarships, financial aid, and support programs specifically for Pacific Islander students. Get help with FAFSA and applications.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Personalized Advice</h3>
              <p className="text-gray-700">
                Talk one-on-one with admissions counselors, ask questions, and get personalized guidance for your college journey—all for free.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {userType === 'student' && (
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">High School Graduates: Start Your College Journey!</h2>
            <p className="text-xl mb-8 text-purple-100">
              Register for free virtual college fairs and discover the perfect school for you across the Pacific Islands.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onNavigate('student-signup')}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition-all font-bold text-lg shadow-lg"
              >
                Create Free Student Account
              </button>
              <button
                onClick={() => onNavigate('student-dashboard')}
                className="px-8 py-4 bg-purple-800 text-white rounded-xl hover:bg-purple-900 transition-all font-bold text-lg shadow-lg"
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