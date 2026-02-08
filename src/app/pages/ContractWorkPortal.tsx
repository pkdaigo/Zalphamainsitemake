import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { 
  Briefcase, 
  DollarSign, 
  Users, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Shield, 
  Award,
  Search,
  Filter,
  Calendar,
  Target,
  CheckCircle,
  AlertCircle,
  X,
  ArrowRight,
  Star,
  UserPlus
} from 'lucide-react';
import { BidModal } from '@/app/components/BidModal';
import { TeamRecruitmentModal, TeamRequestData } from '@/app/components/TeamRecruitmentModal';

interface ContractWorkPortalProps {
  onNavigate: (page: string) => void;
}

interface ContractJob {
  id: string;
  title: string;
  description: string;
  budget: number;
  currency: 'USD' | 'BTC' | 'ETH' | 'USDC';
  paymentMethod: 'stripe' | 'paypal' | 'zelle' | 'venmo' | 'crypto' | 'bank-transfer' | 'cash-app';
  duration: string;
  location: string;
  postedBy: string;
  companyName: string;
  postedDate: string;
  deadline: string;
  escrowStatus: 'pending' | 'funded' | 'released' | 'refunded';
  bidsCount: number;
  skills: string[];
  category: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
}

export function ContractWorkPortal({ onNavigate }: ContractWorkPortalProps) {
  const [viewMode, setViewMode] = useState<'employer' | 'student'>('student');
  const [showPostModal, setShowPostModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedJob, setSelectedJob] = useState<ContractJob | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showTeamRecruitmentModal, setShowTeamRecruitmentModal] = useState(false);
  const [teamRequestData, setTeamRequestData] = useState<TeamRequestData | null>(null);

  // Mock contract jobs data
  const [contractJobs, setContractJobs] = useState<ContractJob[]>([
    {
      id: 'c001',
      title: 'Website Redesign for Tourism Company',
      description: 'Need a modern, mobile-responsive website for our tourism business. Must include booking system and photo gallery.',
      budget: 2500,
      currency: 'USD',
      paymentMethod: 'stripe',
      duration: '4-6 weeks',
      location: 'CNMI',
      postedBy: 'Pacific Tours Ltd.',
      companyName: 'Pacific Tours',
      postedDate: '2026-01-28',
      deadline: '2026-03-15',
      escrowStatus: 'funded',
      bidsCount: 8,
      skills: ['Web Development', 'UI/UX Design', 'React'],
      category: 'Web Development',
      status: 'open'
    },
    {
      id: 'c002',
      title: 'Social Media Management - 3 Months',
      description: 'Looking for someone to manage our Instagram and Facebook accounts. Must create content, engage with followers, and run ad campaigns.',
      budget: 1800,
      currency: 'USD',
      paymentMethod: 'paypal',
      duration: '3 months',
      location: 'Guam',
      postedBy: 'Island Eats Restaurant',
      companyName: 'Island Eats',
      postedDate: '2026-01-27',
      deadline: '2026-02-10',
      escrowStatus: 'funded',
      bidsCount: 12,
      skills: ['Social Media', 'Content Creation', 'Marketing'],
      category: 'Marketing',
      status: 'open'
    },
    {
      id: 'c003',
      title: 'Mobile App Development - Delivery Service',
      description: 'Build a mobile app for local delivery service. Need iOS and Android versions with real-time tracking.',
      budget: 5000,
      currency: 'USDC',
      paymentMethod: 'crypto',
      duration: '8-10 weeks',
      location: 'Hawaii',
      postedBy: 'Quick Delivery HI',
      companyName: 'Quick Delivery',
      postedDate: '2026-01-26',
      deadline: '2026-04-01',
      escrowStatus: 'funded',
      bidsCount: 15,
      skills: ['Mobile Development', 'React Native', 'Firebase'],
      category: 'App Development',
      status: 'open'
    },
    {
      id: 'c004',
      title: 'Graphic Designer for Branding Package',
      description: 'Create complete branding package: logo, business cards, letterhead, social media templates.',
      budget: 800,
      currency: 'USD',
      paymentMethod: 'zelle',
      duration: '2-3 weeks',
      location: 'FSM',
      postedBy: 'New Beginnings Cafe',
      companyName: 'New Beginnings',
      postedDate: '2026-01-25',
      deadline: '2026-02-15',
      escrowStatus: 'funded',
      bidsCount: 6,
      skills: ['Graphic Design', 'Branding', 'Adobe Creative Suite'],
      category: 'Design',
      status: 'open'
    },
    {
      id: 'c005',
      title: 'Video Editor for Marketing Campaign',
      description: 'Edit 5 promotional videos for our summer campaign. Need dynamic editing with motion graphics.',
      budget: 1200,
      currency: 'USD',
      paymentMethod: 'venmo',
      duration: '3 weeks',
      location: 'CNMI',
      postedBy: 'Saipan Adventures',
      companyName: 'Saipan Adventures',
      postedDate: '2026-01-24',
      deadline: '2026-02-20',
      escrowStatus: 'funded',
      bidsCount: 9,
      skills: ['Video Editing', 'After Effects', 'Motion Graphics'],
      category: 'Video Production',
      status: 'open'
    },
    {
      id: 'c006',
      title: 'Content Writer - Blog Articles',
      description: 'Write 10 SEO-optimized blog articles about Pacific Island culture and travel. 1000+ words each.',
      budget: 600,
      currency: 'USD',
      paymentMethod: 'bank-transfer',
      duration: '1 month',
      location: 'Remote',
      postedBy: 'Pacific Culture Magazine',
      companyName: 'Pacific Culture Mag',
      postedDate: '2026-01-23',
      deadline: '2026-02-28',
      escrowStatus: 'funded',
      bidsCount: 14,
      skills: ['Content Writing', 'SEO', 'Research'],
      category: 'Writing',
      status: 'open'
    }
  ]);

  const categories = [
    'All Categories',
    'Web Development',
    'App Development',
    'Design',
    'Marketing',
    'Writing',
    'Video Production',
    'Photography',
    'Data Entry',
    'Customer Service'
  ];

  const budgetRanges = [
    { value: 'all', label: 'All Budgets' },
    { value: '0-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '2500-5000', label: '$2,500 - $5,000' },
    { value: '5000+', label: '$5,000+' }
  ];

  const filteredJobs = contractJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    
    let matchesBudget = true;
    if (selectedBudget !== 'all') {
      const [min, max] = selectedBudget.split('-').map(v => v.replace('+', ''));
      const minBudget = parseInt(min);
      const maxBudget = max ? parseInt(max) : Infinity;
      matchesBudget = job.budget >= minBudget && job.budget <= maxBudget;
    }
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  const handlePlaceBid = (job: ContractJob) => {
    setSelectedJob(job);
    setShowBidModal(true);
  };

  const handleSubmitBid = (bidData: BidData) => {
    console.log('Bid submitted:', bidData);
    // Here you would normally send the bid to your backend
    alert(`Bid submitted successfully for ${bidData.currency === 'USD' ? '$' : ''}${bidData.amount}!`);
    setShowBidModal(false);
    setSelectedJob(null);
  };

  const handleTeamRecruitment = (job: ContractJob) => {
    setSelectedJob(job);
    setShowTeamRecruitmentModal(true);
  };

  const handleSubmitTeamRequest = (requestData: TeamRequestData) => {
    console.log('Team request submitted:', requestData);
    // Here you would normally send the team request to your backend
    alert(`Team request submitted successfully for ${requestData.currency === 'USD' ? '$' : ''}${requestData.amount}!`);
    setShowTeamRecruitmentModal(false);
    setSelectedJob(null);
    setTeamRequestData(requestData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <BackButton onNavigate={onNavigate} destination="student-dashboard" />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Contract Work Portal</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              🎯 FREE for employers! Post contract jobs with funds in escrow. Students bid and get paid instantly.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setViewMode('student')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                viewMode === 'student'
                  ? 'bg-white text-blue-600 shadow-lg scale-105'
                  : 'bg-blue-500 text-white hover:bg-blue-400'
              }`}
            >
              🎓 Browse Jobs (Student)
            </button>
            <button
              onClick={() => setViewMode('employer')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                viewMode === 'employer'
                  ? 'bg-white text-blue-600 shadow-lg scale-105'
                  : 'bg-blue-500 text-white hover:bg-blue-400'
              }`}
            >
              💼 Post Job (Employer)
            </button>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-bold text-lg mb-2">100% FREE to Post</h3>
              <p className="text-blue-100 text-sm">No subscription needed. Just fund escrow and post!</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-3 text-green-300" />
              <h3 className="font-bold text-lg mb-2">Secure Escrow</h3>
              <p className="text-blue-100 text-sm">Funds held safely until work is completed</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-3 text-purple-300" />
              <h3 className="font-bold text-lg mb-2">Verified Talent</h3>
              <p className="text-blue-100 text-sm">All students are ID-verified and skills-tested</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Why Different from Indeed Section */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 mb-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">🎯 Why ZALPHA Contract Portal ≠ Indeed</h2>
            <p className="text-purple-100 text-lg">
              Indeed is great for traditional jobs. ZALPHA is built for Pacific Island contract work with features Indeed doesn't have.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-lg mb-2">Escrow Protection</h3>
              <p className="text-purple-100 text-sm">
                <strong>Indeed:</strong> No payment protection<br/>
                <strong>ZALPHA:</strong> Funds locked in escrow until work is completed. Both parties protected!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl mb-3">🏝️</div>
              <h3 className="font-bold text-lg mb-2">Pacific-Focused</h3>
              <p className="text-purple-100 text-sm">
                <strong>Indeed:</strong> Global, impersonal<br/>
                <strong>ZALPHA:</strong> Built FOR CNMI, FSM, Guam, Hawaii students. Local employers, local talent!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-bold text-lg mb-2">Student-First</h3>
              <p className="text-purple-100 text-sm">
                <strong>Indeed:</strong> Anyone can apply<br/>
                <strong>ZALPHA:</strong> ID-verified students + Basic Skills Assessment = verified workforce-ready talent!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-lg mb-2">Crypto Payments</h3>
              <p className="text-purple-100 text-sm">
                <strong>Indeed:</strong> No payment processing<br/>
                <strong>ZALPHA:</strong> BTC, ETH, USDC + PayPal, Zelle, Venmo, Stripe, Cash App!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2">Bidding System</h3>
              <p className="text-purple-100 text-sm">
                <strong>Indeed:</strong> Fixed salary listings<br/>
                <strong>ZALPHA:</strong> Students compete with proposals. Best bid wins! Market-driven pricing.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl mb-3">🏫</div>
              <h3 className="font-bold text-lg mb-2">School Revenue Share</h3>
              <p className="text-purple-100 text-sm">
                <strong>Indeed:</strong> No school involvement<br/>
                <strong>ZALPHA:</strong> Schools earn when students succeed. Everyone wins!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="font-bold text-lg mb-2">Skills Assessment</h3>
              <p className="text-purple-100 text-sm">
                <strong>Indeed:</strong> Resumes only<br/>
                <strong>ZALPHA:</strong> Gamified Basic Skills Test verifies workforce readiness for CW1/H2 replacement!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="font-bold text-lg mb-2">GitHub Integration</h3>
              <p className="text-purple-100 text-sm">
                <strong>Indeed:</strong> No code verification<br/>
                <strong>ZALPHA:</strong> Connect GitHub repos, show live projects, verify coding skills instantly!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2">Instant Payments</h3>
              <p className="text-purple-100 text-sm">
                <strong>Indeed:</strong> Wait for employer payroll cycles<br/>
                <strong>ZALPHA:</strong> Escrow released instantly when work approved. Get paid in minutes!
              </p>
            </div>
          </div>

          <div className="mt-8 text-center bg-white/20 backdrop-blur rounded-xl p-6">
            <p className="text-xl font-bold mb-2">
              🎯 Bottom Line: Indeed connects people to traditional jobs.
            </p>
            <p className="text-lg text-purple-100">
              ZALPHA empowers Pacific Island students to win contract work, get paid instantly, and build careers with blockchain-backed escrow protection!
            </p>
          </div>
        </div>

        {viewMode === 'student' ? (
          // STUDENT VIEW - Browse and Bid
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search jobs, skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat === 'All Categories' ? 'all' : cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    {budgetRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-gray-600">
                  <strong>{filteredJobs.length}</strong> contract jobs available
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4 inline mr-1" />
                    More Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-6">
              {filteredJobs.map(job => (
                <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          ✓ Escrow Funded
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-3xl font-bold text-green-600">
                        {job.currency === 'USD' ? '$' : ''}{job.budget.toLocaleString()}
                        {job.currency !== 'USD' && ` ${job.currency}`}
                      </div>
                      <div className="text-sm text-gray-500">Budget</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{job.bidsCount} bids</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Posted by</p>
                      <p className="font-semibold text-gray-900">{job.companyName}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        💳 Payment via: <span className="font-medium text-blue-600">{
                          job.paymentMethod === 'stripe' ? '💳 Stripe' :
                          job.paymentMethod === 'paypal' ? '💙 PayPal' :
                          job.paymentMethod === 'zelle' ? '💜 Zelle' :
                          job.paymentMethod === 'venmo' ? '💙 Venmo' :
                          job.paymentMethod === 'cash-app' ? '💚 Cash App' :
                          job.paymentMethod === 'bank-transfer' ? '🏦 Bank Transfer' :
                          job.paymentMethod === 'crypto' ? '₿ Crypto' : job.paymentMethod
                        }</span>
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                        View Details
                      </button>
                      <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                        onClick={() => handlePlaceBid(job)}
                      >
                        Place Bid
                      </button>
                      <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                        onClick={() => handleTeamRecruitment(job)}
                      >
                        Request Team
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </>
        ) : (
          // EMPLOYER VIEW - Post Jobs
          <>
            {/* Dedicated Recruiter Service Banner */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-2xl p-8 mb-12 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <UserPlus className="w-12 h-12" />
                    <h2 className="text-3xl font-bold">Need a Full Team?</h2>
                  </div>
                  <p className="text-orange-100 text-lg mb-4 max-w-2xl">
                    Let ZALPHA's dedicated recruiters assemble your perfect team from our pool of verified Pacific Island talent. 
                    We handle sourcing, vetting, and onboarding - you focus on your project!
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <Shield className="w-6 h-6 mb-2" />
                      <p className="font-semibold">Pre-Vetted Talent</p>
                      <p className="text-xs text-orange-100">All ID-verified + skills-tested</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <Clock className="w-6 h-6 mb-2" />
                      <p className="font-semibold">Fast Assembly</p>
                      <p className="text-xs text-orange-100">Teams ready in 5-7 days</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <Award className="w-6 h-6 mb-2" />
                      <p className="font-semibold">Quality Guarantee</p>
                      <p className="text-xs text-orange-100">100% satisfaction promise</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowTeamRecruitmentModal(true)}
                      className="px-8 py-4 bg-white text-orange-600 rounded-lg hover:bg-orange-50 font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <UserPlus className="w-5 h-5" />
                      Request Team Assembly
                    </button>
                    <div className="text-sm">
                      <p className="font-semibold">Starting at $499/person</p>
                      <p className="text-orange-100 text-xs">One-time recruitment fee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="text-center mb-8">
                  <Briefcase className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Post a Contract Job</h2>
                  <p className="text-gray-600">
                    100% FREE to post! Just fund the escrow and start receiving bids from verified Pacific Island talent.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Website Designer for Local Restaurant"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      {categories.filter(c => c !== 'All Categories').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Describe the project, deliverables, timeline, and any specific requirements..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {/* Budget and Currency */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Amount *
                      </label>
                      <input
                        type="number"
                        placeholder="2500"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency *
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                        <option value="USD">USD ($)</option>
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="USDC">USDC</option>
                      </select>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold text-gray-700"
                      >
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        Stripe
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold text-gray-700"
                      >
                        💙
                        PayPal
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold text-gray-700"
                      >
                        💜
                        Zelle
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold text-gray-700"
                      >
                        💙
                        Venmo
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold text-gray-700"
                      >
                        💚
                        Cash App
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold text-gray-700"
                      >
                        🏦
                        Bank Transfer
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold text-gray-700"
                      >
                        ₿
                        Crypto
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold text-gray-700"
                      >
                        🍎
                        Apple Pay
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 Select how you'll pay the freelancer once work is completed
                    </p>
                  </div>

                  {/* Duration and Deadline */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Duration *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 4-6 weeks"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bid Deadline *
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Preference
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option value="remote">Remote (Anywhere)</option>
                      <option value="CNMI">CNMI Only</option>
                      <option value="FSM - Yap">FSM - Yap State Only</option>
                      <option value="FSM - Chuuk">FSM - Chuuk State Only</option>
                      <option value="FSM - Pohnpei">FSM - Pohnpei State Only</option>
                      <option value="FSM - Kosrae">FSM - Kosrae State Only</option>
                      <option value="Guam">Guam Only</option>
                      <option value="Hawaii">Hawaii Only</option>
                      <option value="Palau">Palau Only</option>
                      <option value="Marshall Islands">Marshall Islands Only</option>
                      <option value="pacific">All Pacific Islands</option>
                    </select>
                  </div>

                  {/* Required Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Web Development, React, UI/UX Design"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {/* Escrow Information */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-900 mb-2">Escrow Protection</h4>
                        <p className="text-sm text-blue-800 mb-4">
                          Your payment will be held in secure escrow until the work is completed and approved. 
                          This protects both you and the freelancer.
                        </p>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Escrow Amount:</span>
                            <span className="font-bold text-gray-900">$0.00</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Platform Fee (0%):</span>
                            <span className="font-bold text-green-600">FREE</span>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                            <span className="font-semibold text-gray-900">Total to Fund:</span>
                            <span className="font-bold text-xl text-blue-600">$0.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <button className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors">
                      Fund Escrow & Post Job
                    </button>
                    <button className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold">
                      Save as Draft
                    </button>
                  </div>
                </div>
              </div>

              {/* Your Posted Jobs */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Posted Contracts</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Website Redesign Project</h4>
                        <p className="text-sm text-gray-600">Posted 2 days ago • 8 bids • $2,500 budget</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          Active
                        </span>
                        <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          View Bids
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-8 text-gray-500">
                    <p>Post your first contract job to get started!</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bid Modal */}
      {showBidModal && selectedJob && (
        <BidModal
          jobTitle={selectedJob.title}
          jobBudget={selectedJob.budget}
          jobCurrency={selectedJob.currency}
          onClose={() => {
            setShowBidModal(false);
            setSelectedJob(null);
          }}
          onSubmit={handleSubmitBid}
        />
      )}

      {/* Team Recruitment Modal */}
      {showTeamRecruitmentModal && (
        <TeamRecruitmentModal
          onClose={() => {
            setShowTeamRecruitmentModal(false);
            setSelectedJob(null);
          }}
          onSubmit={handleSubmitTeamRequest}
        />
      )}
    </div>
  );
}