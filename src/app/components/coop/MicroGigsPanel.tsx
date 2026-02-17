import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  DollarSign,
  Clock,
  MapPin,
  Star,
  Briefcase,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Award,
  Globe,
  Wifi,
  Laptop,
  Video,
  FileText,
  Code,
  Palette,
  MessageSquare,
  BarChart3,
  Heart,
  Sparkles,
  Home,
  Building2,
} from 'lucide-react';

interface MicroGigsPanelProps {
  studentLevel: 'high-school' | 'college';
  studentLocation: string;
}

export function MicroGigsPanel({ studentLevel, studentLocation }: MicroGigsPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'design' | 'writing' | 'tech' | 'social' | 'data'>('all');
  const [appliedGigs, setAppliedGigs] = useState<Set<string>>(new Set());

  // Mock micro gigs data
  const microGigs = [
    {
      id: 'gig_1',
      title: 'Social Media Content Creation - CNMI Tourism',
      description: 'Create 10 Instagram posts featuring local CNMI attractions and culture. Must include Chamorro/Carolinian cultural elements.',
      category: 'social',
      client: 'Marianas Visitors Authority',
      location: 'Remote (CNMI)',
      duration: '1 week',
      payRange: '$150 - $250',
      difficulty: 'Beginner',
      skillsRequired: ['Social Media', 'Photography', 'Cultural Awareness'],
      estimatedHours: '8-10 hours',
      isRemote: true,
      isFeatured: true,
      applicants: 5,
      postedDate: '2 days ago',
    },
    {
      id: 'gig_2',
      title: 'Website Content Writing - Local Business',
      description: 'Write 5 blog posts (500 words each) about Pacific Island business success stories. Research and interview local entrepreneurs.',
      category: 'writing',
      client: 'Pacific Business Center',
      location: 'Remote (Any Pacific Region)',
      duration: '2 weeks',
      payRange: '$200 - $300',
      difficulty: 'Intermediate',
      skillsRequired: ['Writing', 'Research', 'Interviewing'],
      estimatedHours: '12-15 hours',
      isRemote: true,
      isFeatured: true,
      applicants: 8,
      postedDate: '1 day ago',
    },
    {
      id: 'gig_3',
      title: 'Data Entry - Government Survey Project',
      description: 'Enter survey responses into database system. Must be detail-oriented and maintain confidentiality.',
      category: 'data',
      client: 'CNMI Department of Commerce',
      location: 'Remote (CNMI)',
      duration: '3 weeks',
      payRange: '$300 - $400',
      difficulty: 'Beginner',
      skillsRequired: ['Data Entry', 'Microsoft Excel', 'Attention to Detail'],
      estimatedHours: '20-25 hours',
      isRemote: true,
      isFeatured: false,
      applicants: 12,
      postedDate: '3 days ago',
    },
    {
      id: 'gig_4',
      title: 'Logo Design for Local Restaurant',
      description: 'Design modern logo for new Chamorro fusion restaurant. Must incorporate cultural elements and modern aesthetics.',
      category: 'design',
      client: 'Kalaayan Fusion Bistro',
      location: 'Remote (CNMI)',
      duration: '1 week',
      payRange: '$250 - $400',
      difficulty: 'Intermediate',
      skillsRequired: ['Graphic Design', 'Adobe Illustrator', 'Cultural Design'],
      estimatedHours: '10-15 hours',
      isRemote: true,
      isFeatured: true,
      applicants: 6,
      postedDate: '4 hours ago',
    },
    {
      id: 'gig_5',
      title: 'WordPress Website Updates',
      description: 'Update existing WordPress website with new content, images, and plugins. Basic WordPress knowledge required.',
      category: 'tech',
      client: 'Saipan Chamber of Commerce',
      location: 'Remote (Any Location)',
      duration: '1 week',
      payRange: '$200 - $350',
      difficulty: 'Beginner',
      skillsRequired: ['WordPress', 'Basic HTML/CSS', 'Content Management'],
      estimatedHours: '8-12 hours',
      isRemote: true,
      isFeatured: false,
      applicants: 10,
      postedDate: '1 week ago',
    },
    {
      id: 'gig_6',
      title: 'Video Editing - Tourism Promotional Video',
      description: 'Edit 3-5 minute promotional video showcasing Pacific Islands culture and attractions. Must have video editing experience.',
      category: 'design',
      client: 'Visit Micronesia',
      location: 'Remote (Pacific Region)',
      duration: '2 weeks',
      payRange: '$400 - $600',
      difficulty: 'Advanced',
      skillsRequired: ['Video Editing', 'Adobe Premiere', 'Storytelling'],
      estimatedHours: '15-20 hours',
      isRemote: true,
      isFeatured: true,
      applicants: 4,
      postedDate: '5 days ago',
    },
    {
      id: 'gig_7',
      title: 'Market Research Survey Analysis',
      description: 'Analyze 200+ survey responses and create summary report with charts and insights for local business development.',
      category: 'data',
      client: 'Pacific Islands Development Bank',
      location: 'Remote (Any Location)',
      duration: '2 weeks',
      payRange: '$350 - $500',
      difficulty: 'Intermediate',
      skillsRequired: ['Data Analysis', 'Excel', 'Report Writing'],
      estimatedHours: '18-22 hours',
      isRemote: true,
      isFeatured: false,
      applicants: 7,
      postedDate: '6 days ago',
    },
    {
      id: 'gig_8',
      title: 'Social Media Management - Local Nonprofit',
      description: 'Manage Facebook, Instagram, and TikTok for youth development nonprofit. Create content calendar and post daily.',
      category: 'social',
      client: 'Pacific Youth Leadership Foundation',
      location: 'Remote (CNMI)',
      duration: '1 month',
      payRange: '$500 - $750',
      difficulty: 'Intermediate',
      skillsRequired: ['Social Media Management', 'Content Creation', 'Canva'],
      estimatedHours: '30-40 hours',
      isRemote: true,
      isFeatured: true,
      applicants: 9,
      postedDate: '2 hours ago',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Gigs', icon: Briefcase, color: 'blue' },
    { id: 'design', label: 'Design', icon: Palette, color: 'purple' },
    { id: 'writing', label: 'Writing', icon: FileText, color: 'green' },
    { id: 'tech', label: 'Tech', icon: Code, color: 'cyan' },
    { id: 'social', label: 'Social Media', icon: MessageSquare, color: 'pink' },
    { id: 'data', label: 'Data', icon: BarChart3, color: 'orange' },
  ];

  const filteredGigs = microGigs.filter((gig) =>
    selectedCategory === 'all' ? true : gig.category === selectedCategory
  );

  const handleApply = (gigId: string) => {
    setAppliedGigs(new Set([...appliedGigs, gigId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const totalEarnings = appliedGigs.size * 300; // Average $300 per gig

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black flex items-center gap-2">
              MicroGigs - Contract Jobs
              <Sparkles className="w-5 h-5" />
            </h2>
            <p className="text-cyan-100 text-sm mt-1">
              Remote work opportunities • Stay in the Pacific • Build your portfolio
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">{filteredGigs.length}</div>
            <div className="text-cyan-100 text-sm">Available Gigs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">{appliedGigs.size}</div>
            <div className="text-cyan-100 text-sm">Applied</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">
              {microGigs.filter((g) => g.isRemote).length}
            </div>
            <div className="text-cyan-100 text-sm">100% Remote</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">${totalEarnings}</div>
            <div className="text-cyan-100 text-sm">Potential Earnings</div>
          </div>
        </div>
      </div>

      {/* Why MicroGigs */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              Why MicroGigs Keep You in the Pacific 🌺
              <Home className="w-5 h-5 text-green-600" />
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Remote Work Skills:</strong> Build experience working remotely - the future of work
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Stay Home:</strong> Earn income without leaving the Pacific Islands
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Portfolio Building:</strong> Create real work samples for future employment
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Local Opportunities:</strong> Work with Pacific businesses and organizations you care about
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition ${
                isActive
                  ? `bg-gradient-to-r from-${category.color}-600 to-${category.color}-500 text-white shadow-lg`
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Gig Cards */}
      <div className="space-y-4">
        {filteredGigs.map((gig, index) => {
          const hasApplied = appliedGigs.has(gig.id);

          return (
            <motion.div
              key={gig.id}
              className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden hover:shadow-md transition ${
                gig.isFeatured ? 'border-yellow-400' : 'border-slate-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {gig.isFeatured && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">Featured Gig</span>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{gig.title}</h3>
                    <p className="text-slate-600 mb-3">{gig.description}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">{gig.client}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-2xl font-black text-green-600 mb-1">{gig.payRange}</div>
                    <div className="text-xs text-slate-500">Payment</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>{gig.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{gig.duration} • {gig.estimatedHours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Wifi className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">100% Remote</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(
                      gig.difficulty
                    )}`}
                  >
                    {gig.difficulty}
                  </span>
                  <span className="text-xs text-slate-500">
                    {gig.applicants} applicants • Posted {gig.postedDate}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-semibold text-slate-700 mb-2">Skills Required:</div>
                  <div className="flex flex-wrap gap-2">
                    {gig.skillsRequired.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {hasApplied ? (
                    <button
                      disabled
                      className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Applied Successfully
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleApply(gig.id)}
                        className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Apply Now
                      </button>
                      <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition">
                        Save
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Success Metrics */}
      {appliedGigs.size > 0 && (
        <motion.div
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Your Progress</h3>
              <p className="text-slate-600 text-sm">Keep applying to build your remote work portfolio!</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="text-3xl font-black text-purple-600">{appliedGigs.size}</div>
              <div className="text-sm text-slate-600">Gigs Applied</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-600">${totalEarnings}</div>
              <div className="text-sm text-slate-600">Potential Earnings</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-600">
                {Math.round((appliedGigs.size / microGigs.length) * 100)}%
              </div>
              <div className="text-sm text-slate-600">Applications Rate</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}