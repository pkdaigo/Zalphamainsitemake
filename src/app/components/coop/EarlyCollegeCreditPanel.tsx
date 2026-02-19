import { useState } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  BookOpen,
  Clock,
  MapPin,
  Users,
  Video,
  Building2,
  Award,
  CheckCircle,
  ChevronRight,
  Star,
  Home,
  Calendar,
  DollarSign,
  Heart,
  Globe,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface EarlyCollegeCreditPanelProps {
  studentGrade: string;
  studentLocation: string;
}

export function EarlyCollegeCreditPanel({ studentGrade, studentLocation }: EarlyCollegeCreditPanelProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [housingInterest, setHousingInterest] = useState(false);

  // Mock early college credit courses
  const courses = [
    {
      id: '1',
      title: 'Introduction to Business Administration',
      school: 'Northern Marianas College',
      location: 'As Terlaje Campus, Saipan',
      credits: 3,
      delivery: 'hybrid',
      schedule: 'Mon/Wed 5:00-6:30 PM',
      duration: '16 weeks',
      startDate: 'August 15, 2026',
      enrolled: 18,
      capacity: 25,
      cost: 'Free for Co-Op Students',
      prerequisites: 'Junior or Senior standing',
      language: 'English',
      culturalFocus: false,
    },
    {
      id: '2',
      title: 'Chamorro Language & Culture Studies',
      school: 'Northern Marianas College',
      location: 'Saipan Campus',
      credits: 3,
      delivery: 'in-person',
      schedule: 'Tue/Thu 4:00-5:30 PM',
      duration: '16 weeks',
      startDate: 'August 15, 2026',
      enrolled: 22,
      capacity: 25,
      cost: 'Free for Co-Op Students',
      prerequisites: 'None',
      language: 'Chamorro/English',
      culturalFocus: true,
    },
    {
      id: '3',
      title: 'Automotive Technology Fundamentals',
      school: 'NMI Northern Marianas Trades Institute (NMTECH)',
      location: 'Koblerville Campus',
      credits: 4,
      delivery: 'in-person',
      schedule: 'Mon/Wed/Fri 3:00-5:00 PM',
      duration: '16 weeks',
      startDate: 'August 20, 2026',
      enrolled: 12,
      capacity: 15,
      cost: 'Free for Co-Op Students',
      prerequisites: 'Junior or Senior standing',
      language: 'English',
      culturalFocus: false,
    },
    {
      id: '4',
      title: 'Pacific Island Hospitality Management',
      school: 'University of Guam',
      location: 'Virtual (Live Online)',
      credits: 3,
      delivery: 'online',
      schedule: 'Thursday 6:00-8:30 PM (CHT)',
      duration: '16 weeks',
      startDate: 'August 18, 2026',
      enrolled: 34,
      capacity: 40,
      cost: 'Free for Co-Op Students',
      prerequisites: 'Junior or Senior standing',
      language: 'English',
      culturalFocus: true,
    },
    {
      id: '5',
      title: 'Marine Science & Conservation',
      school: 'College of Micronesia-FSM',
      location: 'Virtual (Live Online)',
      credits: 4,
      delivery: 'online',
      schedule: 'Tue/Thu 5:00-6:30 PM (CHT)',
      duration: '16 weeks',
      startDate: 'August 22, 2026',
      enrolled: 28,
      capacity: 35,
      cost: 'Free for Co-Op Students',
      prerequisites: 'None',
      language: 'English',
      culturalFocus: true,
    },
    {
      id: '6',
      title: 'Welding & Metal Fabrication I',
      school: 'NMI Northern Marianas Trades Institute (NMTECH)',
      location: 'Koblerville Campus',
      credits: 5,
      delivery: 'in-person',
      schedule: 'Mon-Fri 3:00-5:00 PM',
      duration: '16 weeks',
      startDate: 'August 20, 2026',
      enrolled: 8,
      capacity: 12,
      cost: 'Free for Co-Op Students',
      prerequisites: 'Junior or Senior standing',
      language: 'English',
      culturalFocus: false,
    },
  ];

  const [deliveryFilter, setDeliveryFilter] = useState<'all' | 'in-person' | 'online' | 'hybrid'>('all');

  const filteredCourses = courses.filter((course) =>
    deliveryFilter === 'all' ? true : course.delivery === deliveryFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black flex items-center gap-2">
              Early College Credit Courses
              <Sparkles className="w-5 h-5" />
            </h2>
            <p className="text-indigo-100 text-sm mt-1">
              Earn college credits while in high school • 100% Free for Co-Op Students
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">{courses.length}</div>
            <div className="text-indigo-100 text-sm">Available Courses</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">
              {courses.reduce((sum, c) => sum + c.credits, 0)}
            </div>
            <div className="text-indigo-100 text-sm">Total Credits</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">
              {courses.filter((c) => c.culturalFocus).length}
            </div>
            <div className="text-indigo-100 text-sm">Cultural Courses</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">FREE</div>
            <div className="text-indigo-100 text-sm">Cost to You</div>
          </div>
        </div>
      </div>

      {/* ZALPHA Ecosystem Value */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Why ZALPHA Recruit vs. Handshake?
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>We Increase Enrollment:</strong> Connect high school co-op students directly with college pathways
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>We Boost Job Placement:</strong> Graduates stay in the region with established employer connections
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>We Build Local Economy:</strong> Complete ecosystem from education to employment in the Pacific
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>We Preserve Culture:</strong> Keep Pacific Islander youth, language, and traditions thriving at home
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { id: 'all', label: 'All Courses', icon: BookOpen },
          { id: 'in-person', label: 'On Campus', icon: Building2 },
          { id: 'online', label: 'Virtual', icon: Video },
          { id: 'hybrid', label: 'Hybrid', icon: Globe },
        ].map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setDeliveryFilter(filter.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                deliveryFilter === filter.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                  <div className="flex items-center gap-2 text-slate-600 mb-3">
                    <Building2 className="w-4 h-4" />
                    <span className="font-semibold">{course.school}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {course.culturalFocus && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      Cultural Focus
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      course.delivery === 'online'
                        ? 'bg-blue-100 text-blue-700'
                        : course.delivery === 'in-person'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {course.delivery === 'online' ? (
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        Virtual
                      </span>
                    ) : course.delivery === 'in-person' ? (
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        On Campus
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        Hybrid
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{course.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Starts {course.startDate}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">{course.credits} College Credits</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">{course.cost}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>
                      {course.enrolled}/{course.capacity} enrolled
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-slate-600 font-semibold">
                  {Math.round((course.enrolled / course.capacity) * 100)}% Full
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Express Interest
                </button>
                <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition">
                  View Details
                </button>
              </div>
            </div>

            {course.delivery === 'in-person' && (
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 border-t border-orange-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Need Student Housing?
                      </div>
                      <div className="text-xs text-slate-600">
                        We can help connect you with on-campus or nearby housing options
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setHousingInterest(!housingInterest)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                      housingInterest
                        ? 'bg-green-600 text-white'
                        : 'bg-white border border-orange-300 text-orange-700 hover:bg-orange-50'
                    }`}
                  >
                    {housingInterest ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Interested
                      </span>
                    ) : (
                      "I'm Interested"
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface CollegeEnrollmentInterestData {
  id: string;
  studentName: string;
  currentSchool: string;
  grade: string;
  location: string;
  gpa: number;
  interests: string[];
  attendancePreference: 'on-campus' | 'virtual' | 'both';
  housingNeeded: boolean;
  coursesInterested: string[];
  contactDate: string;
}

export function CollegeEnrollmentDashboard() {
  const [filterPreference, setFilterPreference] = useState<'all' | 'on-campus' | 'virtual'>('all');
  const [filterLocation, setFilterLocation] = useState<'all' | 'CNMI' | 'Guam' | 'FSM' | 'Palau' | 'RMI'>('all');

  // Mock interested students
  const interestedStudents: CollegeEnrollmentInterestData[] = [
    {
      id: '1',
      studentName: 'Maria Santos',
      currentSchool: 'Saipan Southern High School',
      grade: '11th',
      location: 'CNMI',
      gpa: 3.8,
      interests: ['Business', 'Hospitality', 'Chamorro Language'],
      attendancePreference: 'on-campus',
      housingNeeded: false,
      coursesInterested: ['Business Administration', 'Chamorro Language & Culture'],
      contactDate: '2 days ago',
    },
    {
      id: '2',
      studentName: 'John Reyes',
      currentSchool: 'Okkodo High School',
      grade: '12th',
      location: 'Guam',
      gpa: 3.6,
      interests: ['Technology', 'Engineering'],
      attendancePreference: 'on-campus',
      housingNeeded: true,
      coursesInterested: ['Automotive Technology'],
      contactDate: '3 days ago',
    },
    {
      id: '3',
      studentName: 'Emily Saimon',
      currentSchool: 'Pohnpei Island High School',
      grade: '11th',
      location: 'FSM',
      gpa: 3.9,
      interests: ['Marine Science', 'Environmental Studies'],
      attendancePreference: 'virtual',
      housingNeeded: false,
      coursesInterested: ['Marine Science & Conservation'],
      contactDate: '1 week ago',
    },
    {
      id: '4',
      studentName: 'David Cruz',
      currentSchool: 'Marianas High School',
      grade: '12th',
      location: 'CNMI',
      gpa: 3.5,
      interests: ['Trades', 'Construction'],
      attendancePreference: 'on-campus',
      housingNeeded: false,
      coursesInterested: ['Welding & Metal Fabrication'],
      contactDate: '4 days ago',
    },
    {
      id: '5',
      studentName: 'Sarah Johnson',
      currentSchool: 'Southern High School',
      grade: '11th',
      location: 'Guam',
      gpa: 3.7,
      interests: ['Hospitality', 'Tourism'],
      attendancePreference: 'both',
      housingNeeded: true,
      coursesInterested: ['Pacific Island Hospitality Management'],
      contactDate: '5 days ago',
    },
  ];

  const filteredStudents = interestedStudents.filter((student) => {
    const prefMatch =
      filterPreference === 'all' ||
      student.attendancePreference === filterPreference ||
      student.attendancePreference === 'both';
    const locMatch = filterLocation === 'all' || student.location === filterLocation;
    return prefMatch && locMatch;
  });

  const stats = {
    totalInterested: interestedStudents.length,
    onCampusInterest: interestedStudents.filter((s) => s.attendancePreference === 'on-campus' || s.attendancePreference === 'both').length,
    virtualInterest: interestedStudents.filter((s) => s.attendancePreference === 'virtual' || s.attendancePreference === 'both').length,
    housingNeeded: interestedStudents.filter((s) => s.housingNeeded).length,
  };

  return (
    <div className="space-y-6">
      {/* Premium Feature Badge */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
            <Star className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black">ZALPHA Recruit Premium</h2>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold border border-white/30">
                COLLEGES & TRADE SCHOOLS
              </span>
            </div>
            <p className="text-amber-100 text-sm mt-1">
              Enrollment Pipeline Analytics • Student Interest Tracking • Regional Recruitment
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalInterested}</div>
          <div className="text-sm text-slate-600 mt-1">Interested Students</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <Building2 className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.onCampusInterest}</div>
          <div className="text-sm text-slate-600 mt-1">Want On-Campus</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <Video className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.virtualInterest}</div>
          <div className="text-sm text-slate-600 mt-1">Want Virtual</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <Home className="w-8 h-8 text-orange-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.housingNeeded}</div>
          <div className="text-sm text-slate-600 mt-1">Need Housing</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-semibold text-slate-700 mb-2 block">
              Attendance Preference
            </label>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'on-campus', label: 'On-Campus' },
                { id: 'virtual', label: 'Virtual' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterPreference(filter.id as any)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                    filterPreference === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <label className="text-sm font-semibold text-slate-700 mb-2 block">Location</label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'CNMI', 'Guam', 'FSM', 'Palau', 'RMI'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setFilterLocation(loc as any)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                    filterLocation === loc
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {loc === 'all' ? 'All Regions' : loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Student Cards */}
      <div className="space-y-4">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {student.studentName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{student.studentName}</h3>
                  <p className="text-slate-600">{student.currentSchool}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-slate-600">
                      <strong>Grade:</strong> {student.grade}
                    </span>
                    <span className="text-sm text-slate-600">
                      <strong>GPA:</strong> {student.gpa}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        student.location === 'CNMI'
                          ? 'bg-blue-100 text-blue-700'
                          : student.location === 'Guam'
                          ? 'bg-green-100 text-green-700'
                          : student.location === 'FSM'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {student.location}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-slate-500">{student.contactDate}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm font-semibold text-slate-700 mb-2">Interests</div>
                <div className="flex flex-wrap gap-2">
                  {student.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  Courses Interested In
                </div>
                <div className="flex flex-wrap gap-2">
                  {student.coursesInterested.map((course, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                {student.attendancePreference === 'on-campus' ? (
                  <Building2 className="w-5 h-5 text-green-600" />
                ) : student.attendancePreference === 'virtual' ? (
                  <Video className="w-5 h-5 text-blue-600" />
                ) : (
                  <Globe className="w-5 h-5 text-purple-600" />
                )}
                <span className="text-sm font-semibold text-slate-700">
                  Prefers:{' '}
                  {student.attendancePreference === 'on-campus'
                    ? 'On-Campus'
                    : student.attendancePreference === 'virtual'
                    ? 'Virtual'
                    : 'Flexible (Both)'}
                </span>
              </div>
              {student.housingNeeded && (
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                  <Home className="w-4 h-4" />
                  <span className="text-xs font-bold">Housing Needed</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Contact Student
              </button>
              <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition">
                View Full Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}