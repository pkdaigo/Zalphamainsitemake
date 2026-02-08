import { useState } from 'react';
import { Briefcase, DollarSign, Clock, Users, MapPin, Filter, Search, TrendingUp, Award, Shield, Globe, Check, Building2, User, AlertTriangle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { formatCurrency, formatBudgetRange } from '@/app/utils/currencyConverter';

interface FreelanceJob {
  id: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
    type: 'fixed' | 'hourly';
    currency?: string;
  };
  duration: string;
  skillsRequired: string[];
  category: string;
  location: 'remote' | 'onsite' | 'hybrid';
  employerName: string;
  employerType: 'company' | 'individual'; // NEW: Support for individuals
  employerCountry: string; // NEW: Global location
  employerRating: number;
  employerVerified: boolean;
  postedDate: Date;
  deadline: Date;
  proposalsCount: number;
  status: 'open' | 'in_progress' | 'completed';
  paymentVerified: boolean;
  isGlobalMarket: boolean; // NEW: Indicates worldwide job
}

interface FreelanceMarketplaceProps {
  userType: 'student' | 'employer';
  onNavigate: (page: string, data?: any) => void;
}

export function FreelanceMarketplace({ userType, onNavigate }: FreelanceMarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [budgetRange, setBudgetRange] = useState<'all' | 'under500' | '500-1000' | '1000-2500' | '2500plus'>('all');
  const [jobType, setJobType] = useState<'all' | 'fixed' | 'hourly'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All Categories',
    'Web Development',
    'Mobile Development',
    'Design',
    'Content Writing',
    'Marketing',
    'Data Entry',
    'Customer Support',
    'Virtual Assistant',
    'Video Editing',
    'Translation',
  ];

  const [jobs, setJobs] = useState<FreelanceJob[]>([
    {
      id: 'fj_001',
      title: 'Build Responsive Landing Page',
      description: 'Looking for a skilled web developer to create a modern, responsive landing page for our new product. Must be proficient in HTML, CSS, and JavaScript. Design mockups will be provided.',
      budget: { min: 500, max: 800, type: 'fixed', currency: 'USD' },
      duration: '2 weeks',
      skillsRequired: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      category: 'Web Development',
      location: 'remote',
      employerName: 'TechStart Inc',
      employerType: 'company',
      employerCountry: 'USA',
      employerRating: 4.8,
      employerVerified: true,
      postedDate: new Date('2025-01-25'),
      deadline: new Date('2025-02-10'),
      proposalsCount: 12,
      status: 'open',
      paymentVerified: true,
      isGlobalMarket: false,
    },
    {
      id: 'fj_002',
      title: 'Social Media Content Creator',
      description: 'Need a creative content creator to manage our social media accounts (Instagram, Facebook, LinkedIn). Create engaging posts, graphics, and captions. 10-15 hours per week.',
      budget: { min: 15, max: 25, type: 'hourly', currency: 'USD' },
      duration: 'Ongoing',
      skillsRequired: ['Social Media', 'Canva', 'Copywriting', 'Marketing'],
      category: 'Marketing',
      location: 'remote',
      employerName: 'Island Boutique',
      employerType: 'company',
      employerCountry: 'USA',
      employerRating: 4.5,
      employerVerified: true,
      postedDate: new Date('2025-01-26'),
      deadline: new Date('2025-02-05'),
      proposalsCount: 8,
      status: 'open',
      paymentVerified: true,
      isGlobalMarket: false,
    },
    {
      id: 'fj_003',
      title: 'Mobile App UI/UX Design',
      description: 'Seeking a talented UI/UX designer to create wireframes and high-fidelity mockups for a fitness tracking mobile app. Experience with Adobe XD or similar tools required.',
      budget: { min: 1200, max: 1800, type: 'fixed', currency: 'USD' },
      duration: '3 weeks',
      skillsRequired: ['Adobe XD', 'UI Design', 'UX Design', 'Mobile Design'],
      category: 'Design',
      location: 'remote',
      employerName: 'FitLife Solutions',
      employerType: 'company',
      employerCountry: 'USA',
      employerRating: 4.9,
      employerVerified: true,
      postedDate: new Date('2025-01-27'),
      deadline: new Date('2025-02-15'),
      proposalsCount: 15,
      status: 'open',
      paymentVerified: true,
      isGlobalMarket: false,
    },
    {
      id: 'fj_004',
      title: 'Data Entry Specialist',
      description: 'Need someone to input customer data from PDF files into our database. Accuracy is critical. Approximately 500 records to process.',
      budget: { min: 200, max: 300, type: 'fixed', currency: 'USD' },
      duration: '1 week',
      skillsRequired: ['Data Entry', 'Excel', 'Attention to Detail'],
      category: 'Data Entry',
      location: 'remote',
      employerName: 'Pacific Retail Co',
      employerType: 'company',
      employerCountry: 'USA',
      employerRating: 4.3,
      employerVerified: true,
      postedDate: new Date('2025-01-28'),
      deadline: new Date('2025-02-08'),
      proposalsCount: 20,
      status: 'open',
      paymentVerified: true,
      isGlobalMarket: false,
    },
    {
      id: 'fj_005',
      title: 'Virtual Assistant for E-commerce Store',
      description: 'Looking for a reliable virtual assistant to help with customer inquiries, order processing, and basic admin tasks. Must be available during PST business hours.',
      budget: { min: 12, max: 18, type: 'hourly', currency: 'USD' },
      duration: 'Ongoing',
      skillsRequired: ['Customer Service', 'Email Management', 'Shopify', 'Communication'],
      category: 'Virtual Assistant',
      location: 'remote',
      employerName: 'Ocean Traders',
      employerType: 'company',
      employerCountry: 'USA',
      employerRating: 4.6,
      employerVerified: true,
      postedDate: new Date('2025-01-24'),
      deadline: new Date('2025-02-05'),
      proposalsCount: 18,
      status: 'open',
      paymentVerified: true,
      isGlobalMarket: false,
    },
    // NEW: Global Market Jobs
    {
      id: 'fj_global_001',
      title: 'English-Japanese Translation for App Content',
      description: 'Looking for bilingual translator to translate mobile app content from English to Japanese. Must be native Japanese speaker with excellent English skills. ~5,000 words total.',
      budget: { min: 800, max: 1200, type: 'fixed', currency: 'USD' },
      duration: '2 weeks',
      skillsRequired: ['Japanese', 'English', 'Translation', 'Localization'],
      category: 'Translation',
      location: 'remote',
      employerName: 'Yuki Tanaka',
      employerType: 'individual',
      employerCountry: 'Japan',
      employerRating: 4.9,
      employerVerified: true,
      postedDate: new Date('2025-01-29'),
      deadline: new Date('2025-02-12'),
      proposalsCount: 6,
      status: 'open',
      paymentVerified: true,
      isGlobalMarket: true,
    },
    {
      id: 'fj_global_002',
      title: 'WordPress Website Setup for Small Business',
      description: 'Need a WordPress expert to set up a professional website for my consulting business. Theme and plugins will be provided. Must include contact forms, service pages, and blog setup.',
      budget: { min: 400, max: 600, type: 'fixed', currency: 'USD' },
      duration: '1 week',
      skillsRequired: ['WordPress', 'Web Development', 'CSS', 'PHP'],
      category: 'Web Development',
      location: 'remote',
      employerName: 'Marcus Schmidt',
      employerType: 'individual',
      employerCountry: 'Germany',
      employerRating: 4.7,
      employerVerified: true,
      postedDate: new Date('2025-01-30'),
      deadline: new Date('2025-02-08'),
      proposalsCount: 14,
      status: 'open',
      paymentVerified: true,
      isGlobalMarket: true,
    },
    {
      id: 'fj_global_003',
      title: 'SEO Content Writing for Tech Blog',
      description: 'Seeking experienced content writer to create 10 SEO-optimized blog posts about AI and machine learning. Each post should be 1,500-2,000 words with proper keyword integration.',
      budget: { min: 20, max: 35, type: 'hourly', currency: 'USD' },
      duration: '4 weeks',
      skillsRequired: ['SEO Writing', 'Content Writing', 'AI Knowledge', 'Research'],
      category: 'Content Writing',
      location: 'remote',
      employerName: 'Tech Insights Ltd',
      employerType: 'company',
      employerCountry: 'United Kingdom',
      employerRating: 4.8,
      employerVerified: true,
      postedDate: new Date('2025-01-28'),
      deadline: new Date('2025-02-25'),
      proposalsCount: 22,
      status: 'open',
      paymentVerified: true,
      isGlobalMarket: true,
    },
    {
      id: 'fj_global_004',
      title: 'Logo Design for Startup Company',
      description: 'I need a creative logo designer for my new eco-friendly product startup. Looking for modern, minimalist design with 3 initial concepts and 2 rounds of revisions included.',
      budget: { min: 300, max: 500, type: 'fixed', currency: 'USD' },
      duration: '1 week',
      skillsRequired: ['Logo Design', 'Adobe Illustrator', 'Branding', 'Graphic Design'],
      category: 'Design',
      location: 'remote',
      employerName: 'Sarah Johnson',
      employerType: 'individual',
      employerCountry: 'Australia',
      employerRating: 4.6,
      employerVerified: true,
      postedDate: new Date('2025-01-27'),
      deadline: new Date('2025-02-06'),
      proposalsCount: 28,
      status: 'open',
      paymentVerified: true,
      isGlobalMarket: true,
    },
    {
      id: 'fj_global_005',
      title: 'Video Editing for YouTube Channel',
      description: 'Looking for talented video editor for ongoing YouTube content. Need someone who can edit 2-3 videos per week (10-15 mins each). Must add intro/outro, transitions, subtitles, and background music.',
      budget: { min: 25, max: 40, type: 'hourly', currency: 'USD' },
      duration: 'Ongoing',
      skillsRequired: ['Video Editing', 'Adobe Premiere', 'After Effects', 'YouTube'],
      category: 'Video Editing',
      location: 'remote',
      employerName: 'Digital Media Hub',
      employerType: 'company',
      employerCountry: 'Singapore',
      employerRating: 4.9,
      employerVerified: true,
      postedDate: new Date('2025-01-26'),
      deadline: new Date('2025-02-10'),
      proposalsCount: 19,
      status: 'open',
      paymentVerified: true,
      isGlobalMarket: true,
    },
  ]);

  const filteredJobs = jobs.filter(job => {
    // Search filter
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skillsRequired.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filter
    const matchesCategory = selectedCategory === 'all' || 
                           selectedCategory === 'All Categories' ||
                           job.category === selectedCategory;
    
    // Budget filter
    let matchesBudget = true;
    if (budgetRange !== 'all') {
      const maxBudget = job.budget.type === 'fixed' ? job.budget.max : job.budget.max * 40; // estimate for hourly
      if (budgetRange === 'under500') matchesBudget = maxBudget < 500;
      else if (budgetRange === '500-1000') matchesBudget = maxBudget >= 500 && maxBudget <= 1000;
      else if (budgetRange === '1000-2500') matchesBudget = maxBudget > 1000 && maxBudget <= 2500;
      else if (budgetRange === '2500plus') matchesBudget = maxBudget > 2500;
    }
    
    // Job type filter
    const matchesJobType = jobType === 'all' || job.budget.type === jobType;
    
    return matchesSearch && matchesCategory && matchesBudget && matchesJobType;
  });

  const handlePostJob = () => {
    onNavigate('post-freelance-job');
  };

  const handleViewJob = (job: FreelanceJob) => {
    onNavigate('freelance-job-details', { job });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Home" />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Globe className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    Global Contract Marketplace
                  </h1>
                  <p className="text-purple-100">
                    {userType === 'student' 
                      ? 'Connect with verified clients worldwide - All payments in USD'
                      : 'Post projects and hire talented students globally'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-semibold">100% Secure Escrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-semibold">Open Worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm font-semibold">All prices in USD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-semibold">Verified Employers</span>
                </div>
              </div>
            </div>
            
            {userType === 'employer' && (
              <button
                onClick={handlePostJob}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-bold shadow-lg"
              >
                + Post Contract Work
              </button>
            )}
          </div>
        </div>

        {/* Global Market Notice */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 mb-6 text-white">
          <div className="flex items-start gap-4">
            <Globe className="w-8 h-8 flex-shrink-0 animate-pulse" />
            <div>
              <h3 className="font-bold text-lg mb-2">🌍 Open to Verified Companies & Individuals Worldwide!</h3>
              <p className="text-blue-100 mb-3">
                Our global contract marketplace welcomes <strong>verified companies AND individuals</strong> from anywhere in the world. 
                Post contract work, hire talented students, and grow your business globally!
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Companies verified:</strong> Business registration required</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Individuals verified:</strong> ID verification required</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>All payments in USD:</strong> Automatic currency conversion</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CRITICAL: Entry-Level Talent Warning */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-6 mb-6 text-white border-4 border-yellow-300">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                ⚠️ EMPLOYERS: You Are Hiring ENTRY-LEVEL Young Talent
              </h3>
              <p className="text-orange-100 mb-3 text-sm leading-relaxed">
                <strong>IMPORTANT:</strong> All ZALPHA workers are <strong>high school graduates, current college students, or fresh college graduates</strong> with 
                <strong className="underline"> LIMITED professional work experience</strong>. This is an <strong>entry-level talent marketplace.</strong>
              </p>
              <div className="grid md:grid-cols-3 gap-3 mb-3 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <span className="font-bold">🎓 Experience Level:</span>
                  <p className="text-xs text-orange-100 mt-1">0-2 years, mostly learning</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <span className="font-bold">📚 Skill Level:</span>
                  <p className="text-xs text-orange-100 mt-1">Entry-level, may need training</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <span className="font-bold">⚠️ Your Risk:</span>
                  <p className="text-xs text-orange-100 mt-1">You hire at your own risk</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-sm">
                <p className="font-bold mb-2">🚨 What This Means:</p>
                <ul className="space-y-1 text-xs text-orange-100">
                  <li>• <strong>Limited experience:</strong> Most have never held a professional job</li>
                  <li>• <strong>Skill development:</strong> They are still learning and may make mistakes</li>
                  <li>• <strong>Quality varies:</strong> Work may not meet senior-level standards</li>
                  <li>• <strong>Training needed:</strong> Be prepared to provide guidance and clear instructions</li>
                  <li>• <strong>No guarantees:</strong> ZALPHA does NOT guarantee work quality or outcomes</li>
                </ul>
              </div>
              <p className="text-white font-bold mt-3 text-sm bg-red-600/30 rounded-lg p-2">
                💡 <strong>Pro Tip:</strong> Use the 48-hour refund window to review work quality. After 48 hours, NO REFUNDS are issued.
              </p>
            </div>
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
                placeholder="Search freelance jobs by title, skills, or keywords..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
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
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat === 'All Categories' ? 'all' : cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value as any)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="all">All Budgets</option>
                  <option value="under500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500plus">$2,500+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value as any)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <strong>{filteredJobs.length}</strong> freelance {filteredJobs.length === 1 ? 'job' : 'jobs'} found
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-purple-300 transition-all cursor-pointer"
              onClick={() => handleViewJob(job)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    {job.isGlobalMarket && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        Global
                      </span>
                    )}
                    {job.paymentVerified && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Payment Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      {job.employerType === 'company' ? (
                        <Building2 className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span>{job.employerName}</span>
                      {job.employerVerified && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <span>{job.employerCountry}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{job.employerRating.toFixed(1)} ⭐</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="capitalize">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Posted {Math.floor((Date.now() - job.postedDate.getTime()) / (1000 * 60 * 60 * 24))} days ago</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.skillsRequired.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <div className="mb-2">
                    <p className="text-sm text-gray-600 mb-1">
                      {job.budget.type === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(job.budget.min, job.budget.currency)}{job.budget.max !== job.budget.min && `-${formatCurrency(job.budget.max, job.budget.currency)}`}
                      {job.budget.type === 'hourly' && <span className="text-sm">/hr</span>}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {job.duration}
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-xs text-blue-600 font-semibold">
                      {job.proposalsCount} proposals
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <strong>Deadline:</strong> {job.deadline.toLocaleDateString()}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewJob(job);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
                >
                  {userType === 'student' ? 'Submit Proposal' : 'View Details'}
                </button>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Jobs Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setBudgetRange('all');
                  setJobType('all');
                }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Platform Protection Notice */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">100% Protected Through ZALPHA</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                All freelance work goes through our secure platform. We hold payments in escrow until work is 
                approved, protecting both students and employers.
              </p>
              <ul className="grid md:grid-cols-3 gap-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Secure escrow payment system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Milestone-based releases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Work delivered through platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Dispute resolution support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Verified student profiles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Rating & review system</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}