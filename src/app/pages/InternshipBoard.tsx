import { useState } from 'react';
import { Briefcase, Clock, DollarSign, GraduationCap, MapPin, Building2, Award, Calendar, Users, Filter, Search, TrendingUp } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyVerified: boolean;
  description: string;
  duration: string;
  startDate: Date;
  endDate: Date;
  location: 'remote' | 'onsite' | 'hybrid';
  city?: string;
  compensation: {
    type: 'paid' | 'unpaid' | 'stipend' | 'academic_credit';
    amount?: number;
    currency?: string;
    period?: 'hourly' | 'monthly' | 'total';
  };
  hoursPerWeek: number;
  category: string;
  requirements: {
    minGPA?: number;
    yearInSchool: string[];
    majors?: string[];
    skills: string[];
  };
  benefits: string[];
  learningObjectives: string[];
  mentorshipIncluded: boolean;
  academicCreditAvailable: boolean;
  applicationDeadline: Date;
  positions: number;
  applicants: number;
  status: 'open' | 'closed' | 'filled';
}

interface InternshipBoardProps {
  userType: 'student' | 'employer';
  onNavigate: (page: string, data?: any) => void;
}

export function InternshipBoard({ userType, onNavigate }: InternshipBoardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [compensationType, setCompensationType] = useState<'all' | 'paid' | 'unpaid' | 'stipend' | 'credit'>('all');
  const [durationType, setDurationType] = useState<'all' | 'summer' | 'semester' | 'year'>('all');
  const [locationType, setLocationType] = useState<'all' | 'remote' | 'onsite' | 'hybrid'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All Categories',
    'Software Engineering',
    'Data Science',
    'Marketing',
    'Business Development',
    'Design',
    'Finance',
    'Human Resources',
    'Operations',
    'Customer Success',
    'Research',
  ];

  const [internships, setInternships] = useState<Internship[]>([
    {
      id: 'int_001',
      title: 'Software Engineering Intern',
      company: 'Pacific Tech Solutions',
      companyVerified: true,
      description: 'Join our engineering team to work on real-world projects building web applications for local businesses. You\'ll work alongside senior engineers, participate in code reviews, and contribute to production code. Perfect opportunity to gain hands-on experience with modern tech stack.',
      duration: 'Summer 2025 (12 weeks)',
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-08-31'),
      location: 'hybrid',
      city: 'Guam',
      compensation: {
        type: 'paid',
        amount: 20,
        currency: 'USD',
        period: 'hourly',
      },
      hoursPerWeek: 40,
      category: 'Software Engineering',
      requirements: {
        minGPA: 3.0,
        yearInSchool: ['Sophomore', 'Junior', 'Senior'],
        majors: ['Computer Science', 'Software Engineering', 'Information Technology'],
        skills: ['JavaScript', 'React', 'Node.js', 'Git'],
      },
      benefits: [
        'Mentorship from senior engineers',
        'Professional development workshops',
        'Networking opportunities',
        'Potential for full-time offer',
        'Flexible work schedule',
      ],
      learningObjectives: [
        'Build and deploy production web applications',
        'Participate in agile development process',
        'Learn industry best practices and coding standards',
        'Gain experience with modern development tools',
      ],
      mentorshipIncluded: true,
      academicCreditAvailable: true,
      applicationDeadline: new Date('2025-04-15'),
      positions: 3,
      applicants: 12,
      status: 'open',
    },
    {
      id: 'int_002',
      title: 'Marketing & Social Media Intern',
      company: 'Island Retail Group',
      companyVerified: true,
      description: 'Help us grow our social media presence and develop marketing campaigns for our retail brands. You\'ll create content, analyze metrics, and work on real campaigns that impact our business. Great for students interested in digital marketing and brand management.',
      duration: 'Fall Semester 2025 (16 weeks)',
      startDate: new Date('2025-08-25'),
      endDate: new Date('2025-12-15'),
      location: 'hybrid',
      city: 'Saipan, CNMI',
      compensation: {
        type: 'stipend',
        amount: 2000,
        currency: 'USD',
        period: 'total',
      },
      hoursPerWeek: 20,
      category: 'Marketing',
      requirements: {
        minGPA: 2.5,
        yearInSchool: ['Sophomore', 'Junior', 'Senior'],
        majors: ['Marketing', 'Communications', 'Business', 'Public Relations'],
        skills: ['Social Media', 'Canva', 'Content Creation', 'Analytics'],
      },
      benefits: [
        'Portfolio-building projects',
        'Marketing tools training',
        'Professional references',
        'Academic credit available',
      ],
      learningObjectives: [
        'Develop social media strategies',
        'Create engaging content for multiple platforms',
        'Analyze campaign performance metrics',
        'Learn brand management fundamentals',
      ],
      mentorshipIncluded: true,
      academicCreditAvailable: true,
      applicationDeadline: new Date('2025-07-01'),
      positions: 2,
      applicants: 18,
      status: 'open',
    },
    {
      id: 'int_003',
      title: 'Data Science & Analytics Intern',
      company: 'FSM Government - Economic Development',
      companyVerified: true,
      description: 'Work with government data to analyze economic trends and support policy decisions. You\'ll use Python and SQL to analyze datasets, create visualizations, and present findings to leadership. Meaningful work that impacts your community.',
      duration: 'Spring Semester 2025 (16 weeks)',
      startDate: new Date('2025-01-15'),
      endDate: new Date('2025-05-15'),
      location: 'onsite',
      city: 'Pohnpei, FSM',
      compensation: {
        type: 'academic_credit',
      },
      hoursPerWeek: 15,
      category: 'Data Science',
      requirements: {
        minGPA: 3.2,
        yearInSchool: ['Junior', 'Senior', 'Graduate'],
        majors: ['Data Science', 'Statistics', 'Computer Science', 'Economics'],
        skills: ['Python', 'SQL', 'Data Visualization', 'Statistics'],
      },
      benefits: [
        'Government work experience',
        'Networking with policymakers',
        'Resume-building projects',
        'Recommendation letters',
      ],
      learningObjectives: [
        'Apply statistical methods to real-world data',
        'Create data visualizations for stakeholders',
        'Develop policy recommendations based on analysis',
        'Learn government data practices',
      ],
      mentorshipIncluded: true,
      academicCreditAvailable: true,
      applicationDeadline: new Date('2025-12-01'),
      positions: 1,
      applicants: 5,
      status: 'open',
    },
    {
      id: 'int_004',
      title: 'UI/UX Design Intern',
      company: 'Digital Dreams Agency',
      companyVerified: true,
      description: 'Join our creative team to design user interfaces and experiences for client projects. You\'ll work on wireframes, mockups, and prototypes using Adobe XD or similar tools. Perfect for design students wanting to build their portfolio with real client work.',
      duration: 'Summer 2025 (10 weeks)',
      startDate: new Date('2025-06-15'),
      endDate: new Date('2025-08-25'),
      location: 'remote',
      compensation: {
        type: 'paid',
        amount: 18,
        currency: 'USD',
        period: 'hourly',
      },
      hoursPerWeek: 30,
      category: 'Design',
      requirements: {
        yearInSchool: ['Sophomore', 'Junior', 'Senior'],
        majors: ['Graphic Design', 'UX Design', 'Visual Arts', 'Computer Science'],
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      },
      benefits: [
        'Portfolio pieces from real projects',
        'Design mentorship',
        'Access to design tools and resources',
        'Client presentation experience',
      ],
      learningObjectives: [
        'Design user-centered interfaces',
        'Conduct user research and testing',
        'Create design systems',
        'Present design decisions to stakeholders',
      ],
      mentorshipIncluded: true,
      academicCreditAvailable: false,
      applicationDeadline: new Date('2025-05-01'),
      positions: 2,
      applicants: 22,
      status: 'open',
    },
  ]);

  const filteredInternships = internships.filter(internship => {
    // Search filter
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.requirements.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filter
    const matchesCategory = selectedCategory === 'all' || 
                           selectedCategory === 'All Categories' ||
                           internship.category === selectedCategory;
    
    // Compensation filter
    const matchesCompensation = compensationType === 'all' || internship.compensation.type === compensationType;
    
    // Duration filter
    let matchesDuration = true;
    if (durationType !== 'all') {
      const duration = internship.duration.toLowerCase();
      matchesDuration = duration.includes(durationType);
    }
    
    // Location filter
    const matchesLocation = locationType === 'all' || internship.location === locationType;
    
    return matchesSearch && matchesCategory && matchesCompensation && matchesDuration && matchesLocation;
  });

  const handlePostInternship = () => {
    onNavigate('post-internship');
  };

  const handleViewInternship = (internship: Internship) => {
    onNavigate('internship-details', { internship });
  };

  const handleApply = (internship: Internship) => {
    onNavigate('apply-internship', { internship });
  };

  const daysUntilDeadline = (deadline: Date) => {
    return Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Dashboard" />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Internship Programs</h1>
                  <p className="text-blue-100">
                    {userType === 'student' 
                      ? 'Gain real-world experience and build your career in the Pacific'
                      : 'Find talented students for internship positions'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-semibold">Mentorship Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-sm font-semibold">Academic Credit Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-semibold">Career Development</span>
                </div>
              </div>
            </div>
            
            {userType === 'employer' && (
              <button
                onClick={handlePostInternship}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-bold shadow-lg"
              >
                + Post Internship
              </button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search internships by title, company, or skills..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat === 'All Categories' ? 'all' : cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Compensation</label>
                <select
                  value={compensationType}
                  onChange={(e) => setCompensationType(e.target.value as any)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="paid">Paid</option>
                  <option value="stipend">Stipend</option>
                  <option value="academic_credit">Academic Credit</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                <select
                  value={durationType}
                  onChange={(e) => setDurationType(e.target.value as any)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Durations</option>
                  <option value="summer">Summer</option>
                  <option value="semester">Semester</option>
                  <option value="year">Year-Long</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <select
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value as any)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <strong>{filteredInternships.length}</strong> internship{filteredInternships.length === 1 ? '' : 's'} available
          </p>
        </div>

        {/* Internship Listings */}
        <div className="space-y-4">
          {filteredInternships.map(internship => {
            const deadline = daysUntilDeadline(internship.applicationDeadline);
            
            return (
              <div
                key={internship.id}
                className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{internship.title}</h3>
                      {internship.mentorshipIncluded && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Mentorship
                        </span>
                      )}
                      {internship.academicCreditAvailable && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          Credit
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span className="font-semibold">{internship.company}</span>
                        {internship.companyVerified && <span className="text-blue-600">✓</span>}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="capitalize">{internship.location}</span>
                        {internship.city && <span>• {internship.city}</span>}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{internship.hoursPerWeek} hrs/week</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{internship.description}</p>

                    {/* Requirements */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-2">
                        {internship.requirements.minGPA && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
                            Min GPA: {internship.requirements.minGPA}
                          </span>
                        )}
                        {internship.requirements.yearInSchool.map((year, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                            {year}
                          </span>
                        ))}
                        {internship.requirements.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                            {skill}
                          </span>
                        ))}
                        {internship.requirements.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold">
                            +{internship.requirements.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 text-right">
                    {/* Compensation */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">Compensation</p>
                      {internship.compensation.type === 'paid' && internship.compensation.amount && (
                        <p className="text-2xl font-bold text-green-600">
                          ${internship.compensation.amount}
                          <span className="text-sm">/{internship.compensation.period}</span>
                        </p>
                      )}
                      {internship.compensation.type === 'stipend' && internship.compensation.amount && (
                        <p className="text-2xl font-bold text-blue-600">
                          ${internship.compensation.amount}
                          <span className="text-sm"> stipend</span>
                        </p>
                      )}
                      {internship.compensation.type === 'academic_credit' && (
                        <p className="text-lg font-bold text-purple-600">
                          Academic Credit
                        </p>
                      )}
                      {internship.compensation.type === 'unpaid' && (
                        <p className="text-lg font-bold text-gray-600">
                          Unpaid
                        </p>
                      )}
                    </div>

                    {/* Positions */}
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-blue-600 font-semibold mb-1">
                        {internship.positions} {internship.positions === 1 ? 'position' : 'positions'}
                      </p>
                      <p className="text-xs text-blue-700">
                        {internship.applicants} applicants
                      </p>
                    </div>

                    {/* Deadline */}
                    <div className={`text-sm ${deadline <= 7 ? 'text-red-600' : 'text-gray-600'}`}>
                      <Clock className="w-4 h-4 inline mr-1" />
                      {deadline > 0 ? `${deadline} days left` : 'Deadline passed'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <strong>Apply by:</strong> {internship.applicationDeadline.toLocaleDateString()}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewInternship(internship);
                      }}
                      className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                    >
                      View Details
                    </button>
                    {userType === 'student' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(internship);
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredInternships.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Internships Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setCompensationType('all');
                  setDurationType('all');
                  setLocationType('all');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Why Internships Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4 text-xl">Why Choose ZALPHA Internships?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Mentorship Included</h4>
              <p className="text-sm text-gray-700">
                Every intern is paired with an experienced mentor for guidance and career development
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Academic Credit</h4>
              <p className="text-sm text-gray-700">
                Many internships offer academic credit. Coordinate with your school to earn credits while gaining experience
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Career Growth</h4>
              <p className="text-sm text-gray-700">
                Build real skills, grow your network, and often receive full-time job offers after successful internships
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}