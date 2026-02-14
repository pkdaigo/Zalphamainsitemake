import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  DollarSign, 
  Clock, 
  MapPin, 
  Shield, 
  Star, 
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  CreditCard,
  CheckCircle,
  Award,
  Filter,
  ChevronRight,
  Building2,
  Laptop
} from 'lucide-react';

interface ContractMarketplaceSectionProps {
  onNavigate: (page: string) => void;
}

export function ContractMarketplaceSection({ onNavigate }: ContractMarketplaceSectionProps) {
  const [hoveredGig, setHoveredGig] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Animated counter state
  const [stats, setStats] = useState({
    gigs: 0,
    employers: 0,
    paid: 0,
    compliance: 0
  });

  // Animate counters on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      gigs: 500,
      employers: 300,
      paid: 50,
      compliance: 100
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        gigs: Math.floor(targets.gigs * progress),
        employers: Math.floor(targets.employers * progress),
        paid: Math.floor(targets.paid * progress),
        compliance: Math.floor(targets.compliance * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const skillCategories = [
    'All Categories',
    'Office/Admin',
    'Tech/IT',
    'Hospitality',
    'Trades',
    'Data Entry',
    'Social Media',
    'Customer Service'
  ];

  const sampleGigs = [
    {
      id: 1,
      title: 'Virtual Admin Assistant',
      budget: '$15/hr',
      type: 'Hourly',
      location: 'Remote',
      description: 'CNMI PSS Co-op grad needed for email management, scheduling, data entry. Flexible hours.',
      skills: ['Office', 'Admin', 'Data Entry'],
      employer: 'Pacific Tech Solutions',
      postedDate: '2 days ago',
      region: 'CNMI',
      applicants: 12,
      verified: true
    },
    {
      id: 2,
      title: 'Data Entry Gig',
      budget: '$10/hr',
      type: '20 hrs total',
      location: 'Guam',
      description: 'Entry-level data entry project. Perfect for DOL Youth Program alumni. Flexible schedule.',
      skills: ['Data Entry', 'Excel', 'Attention to Detail'],
      employer: 'Guam Business Center',
      postedDate: '1 week ago',
      region: 'Guam',
      applicants: 8,
      verified: true
    },
    {
      id: 3,
      title: 'Social Media Content Tasks',
      budget: '$100 Fixed',
      type: 'Fixed Price',
      location: 'FSM Remote',
      description: 'Create 10 social media posts for local business. Fiverr-style quick project.',
      skills: ['Social Media', 'Content Creation', 'Canva'],
      employer: 'FSM Marketing Co',
      postedDate: '3 days ago',
      region: 'FSM',
      applicants: 15,
      verified: true
    }
  ];

  const workflowSteps = [
    {
      number: 1,
      title: 'Post Gig',
      description: 'Employers post gigs (free during beta)',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: 2,
      title: 'Apply',
      description: 'Students apply with co-op portfolio',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: 3,
      title: 'Connect',
      description: 'Chat, negotiate, hire with escrow',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500'
    },
    {
      number: 4,
      title: 'Complete',
      description: 'Work, review, release funds (10% fee)',
      icon: Award,
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const trustBadges = [
    { text: 'PSS CNMI Approved', icon: Shield },
    { text: 'Guam DOL Compliant', icon: CheckCircle },
    { text: 'Secure Payments via Stripe', icon: CreditCard },
    { text: '18+ Verified Only', icon: Users },
    { text: 'Escrow Protected', icon: Shield }
  ];

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Age Gate Warning Banner */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 mb-8 shadow-2xl">
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-6 h-6 text-white flex-shrink-0" />
            <p className="text-white font-bold text-center text-sm sm:text-base">
              🔞 18+ ONLY: Age verification required post-signup via Government ID + School Certificate
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
            ZALPHA Contract Marketplace
          </h1>
          <div className="inline-block bg-gradient-to-r from-[#00A3E0] to-[#0077B6] rounded-full px-6 py-2 mb-4">
            <p className="text-white font-bold text-sm sm:text-base">
              18+ Gig Jobs for Pacific Talent | PSS Compliant
            </p>
          </div>
          <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            Post gigs, hire verified grads, earn from freelance skills. No minors – school-approved only.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600">
            <Award className="w-4 h-4" />
            <span className="font-semibold">For CNMI PSS Co-op Completers | Guam DOL Alumni | FSM/Palau/Marshall Practicum Finishers</span>
          </div>
        </div>

        {/* Hero Stats Row - Animated Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 text-center hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-blue-600 mb-2">
              {stats.gigs}+
            </div>
            <div className="text-sm text-slate-600 font-semibold">Pacific Gigs Posted</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200 text-center hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-purple-600 mb-2">
              {stats.employers}+
            </div>
            <div className="text-sm text-slate-600 font-semibold">Employers Hiring</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 text-center hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-green-600 mb-2">
              ${stats.paid}k+
            </div>
            <div className="text-sm text-slate-600 font-semibold">Paid to Students</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200 text-center hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-orange-600 mb-2">
              {stats.compliance}%
            </div>
            <div className="text-sm text-slate-600 font-semibold">PSS/DOL Compliant</div>
          </div>
        </div>

        {/* Dual-Sided Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Post Gig (Employer Focus) */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-blue-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Post a Gig</h2>
                <p className="text-slate-600 text-sm">Hire Pacific Talent Fast</p>
              </div>
            </div>

            {/* Minimal Form Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Gig Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Virtual Assistant for 20hrs/week"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description & Skills Needed *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe tasks: admin, data entry, co-op follow-on work..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Budget *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="5-500/hr or fixed"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Duration
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all">
                    <option>Gig (1-2 weeks)</option>
                    <option>Short-term (1 month)</option>
                    <option>Medium (1-3 months)</option>
                    <option>Ongoing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Skills Tags (PSS Co-op)
                </label>
                <select className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all">
                  <option>Office/Admin</option>
                  <option>Tech/IT</option>
                  <option>Hospitality</option>
                  <option>Trades</option>
                  <option>Data Entry</option>
                  <option>Social Media</option>
                  <option>Customer Service</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location
                </label>
                <select className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all">
                  <option>Remote</option>
                  <option>CNMI - Saipan</option>
                  <option>CNMI - Tinian</option>
                  <option>CNMI - Rota</option>
                  <option>Guam</option>
                  <option>FSM</option>
                  <option>Palau</option>
                  <option>Marshall Islands</option>
                  <option>US Mainland</option>
                </select>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              {[
                'Verified 18+ grads only',
                'Secure escrow payments',
                'PSS compliance reports',
                'Gig templates (Upwork-style)'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onNavigate('marketplace/post')}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Briefcase className="w-5 h-5" />
              Post Gig Free (Beta)
            </button>

            <p className="text-center text-xs text-slate-500 mt-3">
              🎉 Free during beta testing • 10% platform fee after launch
            </p>
          </div>

          {/* Right: Browse Gigs (Student Focus) */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Find Gigs</h2>
                <p className="text-slate-600 text-sm">Build Your Freelance Portfolio</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search gigs by keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                />
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold hover:bg-purple-200 transition-colors">
                  <Filter className="w-3 h-3" />
                  Budget
                </button>
                <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold hover:bg-slate-200 transition-colors">
                  Remote Only
                </button>
                <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold hover:bg-slate-200 transition-colors">
                  CNMI/Guam/FSM
                </button>
                <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold hover:bg-slate-200 transition-colors">
                  Skills Match
                </button>
              </div>
            </div>

            {/* Sample Gig Cards */}
            <div className="space-y-4 mb-6 max-h-[600px] overflow-y-auto pr-2">
              {sampleGigs.map((gig) => (
                <div
                  key={gig.id}
                  onMouseEnter={() => setHoveredGig(gig.id)}
                  onMouseLeave={() => setHoveredGig(null)}
                  className={`
                    border-2 rounded-2xl p-4 transition-all cursor-pointer
                    ${hoveredGig === gig.id 
                      ? 'border-purple-400 shadow-lg scale-[1.02] bg-purple-50' 
                      : 'border-slate-200 hover:border-purple-300 bg-white'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-base">{gig.title}</h3>
                        {gig.verified && (
                          <Shield className="w-4 h-4 text-blue-500" title="Verified Employer" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{gig.employer} • {gig.postedDate}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-green-600">{gig.budget}</div>
                      <div className="text-xs text-slate-500">{gig.type}</div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 mb-3 line-clamp-2">
                    {gig.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {gig.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {gig.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {gig.applicants} applicants
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate(`marketplace/gig/${gig.id}`)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-bold rounded-lg transition-all transform hover:scale-105"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-2 mb-4">
              {[
                '18+ verified students only',
                'Milestone payments',
                'Portfolio builder',
                'Reviews & ratings'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('marketplace/browse')}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Browse All Gigs
            </button>
          </div>
        </div>

        {/* How It Works Timeline */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 mb-12 border-2 border-cyan-300">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
            How It Works
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative">
                  {/* Connector Line (desktop only) */}
                  {idx < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-slate-300 to-slate-200 -z-10" />
                  )}
                  
                  <div className="text-center">
                    <div className={`
                      inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4
                      bg-gradient-to-br ${step.color} shadow-lg transform hover:scale-110 transition-transform
                    `}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Platform Fee Notice */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 text-sm mb-1">Transparent Pricing</p>
                <p className="text-slate-700 text-xs leading-relaxed">
                  ZALPHA takes a 10% platform fee on completed gigs. Free for employers to post during beta. 
                  Secure escrow protects both parties until work is approved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upwork/Fiverr Mirror Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Laptop className="w-10 h-10" />
              <h3 className="text-2xl font-bold">Upwork Style</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Submit proposals with cover letters</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Milestone-based payments for projects</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Hourly or fixed-price contracts</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Time tracking for hourly gigs</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-10 h-10" />
              <h3 className="text-2xl font-bold">Fiverr Style</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Package tiers: Basic, Standard, Premium</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Quick tasks & micro-gigs ($5-$50)</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Student showcase portfolios</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Instant delivery options</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges Footer */}
        <div className="bg-gradient-to-r from-[#00A3E0] to-[#0077B6] rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Trusted & Compliant Platform
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-white/20 transition-all border-2 border-white/30"
                >
                  <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white text-xs font-semibold leading-tight">{badge.text}</p>
                </div>
              );
            })}
          </div>

          {/* Link to Co-Op Hub */}
          <div className="mt-8 pt-6 border-t-2 border-white/30 text-center">
            <p className="text-white/90 text-sm mb-3">
              High school student? Start with our Co-Op Program first
            </p>
            <button
              onClick={() => onNavigate('co-op-hub')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <Award className="w-5 h-5" />
              Go to Co-Op Hub
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Region Coverage */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['CNMI', 'Guam', 'FSM', 'Palau', 'Marshall Islands', 'Remote Pacific'].map((region, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-xs font-semibold">
                📍 {region}
              </span>
            ))}
          </div>
        </div>

        {/* Beta Notice */}
        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🎉</div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 mb-2">Beta Testing Active - Join Now!</p>
              <p className="text-slate-700 text-sm leading-relaxed mb-3">
                Contract Marketplace is in private beta. All gig postings are FREE during testing. 
                Early adopters get lifetime 5% platform fee (vs. 10% standard). Limited to verified 18+ Pacific graduates.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('signup-employer')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  Sign Up as Employer
                </button>
                <button
                  onClick={() => onNavigate('signup-student')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  Sign Up as Student (18+)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
