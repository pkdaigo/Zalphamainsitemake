import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Tag,
  DollarSign,
  Clock,
  X,
  Send,
  ChevronRight,
  AlertCircle,
  Briefcase,
  Building2,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface User {
  student_age?: number;
  id?: string;
  name?: string;
}

interface Contract {
  id: string;
  title: string;
  employerName: string;
  location: string;
  category: string;
  budgetType: 'Fixed' | 'Hourly';
  budgetAmount: number;
  description: string;
  skills: string[];
  timeline?: string;
  source: 'ZALPHA' | 'Partner';
  partnerName?: string;
}

interface Bid {
  contractId: string;
  amount: number;
  message: string;
}

interface ContractMarketplaceSectionProps {
  user?: User;
  onNavigate: (page: string) => void;
}

type TabType = 'our-marketplace' | 'curated-partners';
type LocationFilter = 'All' | 'CNMI' | 'Guam' | 'FSM' | 'Palau' | 'Marshall Islands' | 'Remote';
type CategoryFilter = 'All' | 'IT' | 'Utilities' | 'Healthcare' | 'Education' | 'Government' | 'Other';
type BudgetTypeFilter = 'All' | 'Fixed' | 'Hourly';

// ============================================================================
// STUB DATA - Replace with Supabase queries later
// ============================================================================

const STUB_ZALPHA_CONTRACTS: Contract[] = [
  {
    id: 'zalpha-1',
    title: 'Website Development for Tourism Board',
    employerName: 'CNMI Visitors Authority',
    location: 'CNMI',
    category: 'IT',
    budgetType: 'Fixed',
    budgetAmount: 4500,
    description: 'Build a modern, responsive website showcasing CNMI tourism attractions. Must include booking integration and mobile-first design.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'API Integration'],
    timeline: '6-8 weeks',
    source: 'ZALPHA'
  },
  {
    id: 'zalpha-2',
    title: 'Social Media Marketing Campaign',
    employerName: 'Pacific Pearl Resort',
    location: 'Guam',
    category: 'Other',
    budgetType: 'Hourly',
    budgetAmount: 35,
    description: 'Create and manage social media content for our resort. 3-month contract with potential for extension.',
    skills: ['Social Media', 'Content Creation', 'Canva', 'Instagram'],
    timeline: '3 months',
    source: 'ZALPHA'
  },
  {
    id: 'zalpha-3',
    title: 'Healthcare Database Management',
    employerName: 'FSM Health Services',
    location: 'FSM',
    category: 'Healthcare',
    budgetType: 'Fixed',
    budgetAmount: 3200,
    description: 'Organize and digitize patient records system. Experience with healthcare data privacy required.',
    skills: ['Database Design', 'SQL', 'Data Entry', 'HIPAA Compliance'],
    timeline: '4 weeks',
    source: 'ZALPHA'
  },
  {
    id: 'zalpha-4',
    title: 'Remote IT Support Technician',
    employerName: 'Palau National Communications',
    location: 'Remote',
    category: 'IT',
    budgetType: 'Hourly',
    budgetAmount: 28,
    description: 'Provide remote technical support to staff and customers. Flexible hours, part-time opportunity.',
    skills: ['Technical Support', 'Windows', 'MacOS', 'Networking'],
    timeline: 'Ongoing',
    source: 'ZALPHA'
  },
  {
    id: 'zalpha-5',
    title: 'Educational Content Writer',
    employerName: 'Marshall Islands Community College',
    location: 'Marshall Islands',
    category: 'Education',
    budgetType: 'Fixed',
    budgetAmount: 2800,
    description: 'Develop educational materials for online courses. Background in Pacific Island culture preferred.',
    skills: ['Writing', 'Curriculum Design', 'Research', 'Adobe Suite'],
    timeline: '8 weeks',
    source: 'ZALPHA'
  },
  {
    id: 'zalpha-6',
    title: 'Government Document Translation',
    employerName: 'Regional Government Office',
    location: 'Remote',
    category: 'Government',
    budgetType: 'Fixed',
    budgetAmount: 1800,
    description: 'Translate official documents from English to local Pacific languages. Native fluency required.',
    skills: ['Translation', 'Proofreading', 'Microsoft Word'],
    timeline: '3 weeks',
    source: 'ZALPHA'
  }
];

const STUB_PARTNER_CONTRACTS: Contract[] = [
  {
    id: 'partner-1',
    title: 'Graphic Design for Marketing Materials',
    employerName: 'Pacific Trade Alliance',
    location: 'Remote',
    category: 'Other',
    budgetType: 'Fixed',
    budgetAmount: 2200,
    description: 'Design brochures, flyers, and digital assets for trade conferences across the Pacific region.',
    skills: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Brand Design'],
    timeline: '5 weeks',
    source: 'Partner',
    partnerName: 'Upwork Pacific'
  },
  {
    id: 'partner-2',
    title: 'Data Entry and Processing',
    employerName: 'Regional Census Bureau',
    location: 'Remote',
    category: 'Government',
    budgetType: 'Hourly',
    budgetAmount: 22,
    description: 'Process census data and prepare reports. Attention to detail and accuracy essential.',
    skills: ['Excel', 'Data Entry', 'Attention to Detail'],
    timeline: '2 months',
    source: 'Partner',
    partnerName: 'Freelancer.com'
  },
  {
    id: 'partner-3',
    title: 'Virtual Assistant for Utility Company',
    employerName: 'Pacific Power & Water',
    location: 'Remote',
    category: 'Utilities',
    budgetType: 'Hourly',
    budgetAmount: 25,
    description: 'Manage schedules, emails, and customer inquiries. Professional communication skills required.',
    skills: ['Admin Support', 'Email Management', 'Customer Service'],
    timeline: 'Ongoing',
    source: 'Partner',
    partnerName: 'Fiverr Pro'
  }
];

// ============================================================================
// STUB FUNCTIONS - Replace with real API calls later
// ============================================================================

/**
 * Load contracts from Supabase
 * TODO: Replace with actual Supabase query
 * @example
 * const { data, error } = await supabase
 *   .from('contracts')
 *   .select('*')
 *   .eq('status', 'active')
 *   .order('created_at', { ascending: false });
 */
async function loadContracts(source: 'ZALPHA' | 'Partner'): Promise<Contract[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (source === 'ZALPHA') {
    return STUB_ZALPHA_CONTRACTS;
  }
  return STUB_PARTNER_CONTRACTS;
}

/**
 * Submit a bid for a contract
 * TODO: Replace with actual Supabase insert
 * @example
 * const { data, error } = await supabase
 *   .from('bids')
 *   .insert({
 *     contract_id: bid.contractId,
 *     user_id: user.id,
 *     amount: bid.amount,
 *     message: bid.message,
 *     status: 'pending'
 *   });
 */
async function submitBid(bid: Bid, userId: string): Promise<{ success: boolean; message: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  console.log('Submitting bid:', { bid, userId });
  
  // Simulate success
  return {
    success: true,
    message: 'Your bid has been submitted successfully! The employer will review it and contact you.'
  };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ContractMarketplaceSection({ 
  user, 
  onNavigate 
}: ContractMarketplaceSectionProps) {
  
  // ==================== Age Gate Logic ====================
  const [ageCheckComplete, setAgeCheckComplete] = useState(false);
  
  useEffect(() => {
    // Check if user is under 18
    if (user && user.student_age !== undefined) {
      if (user.student_age < 18) {
        // Redirect to Co-Op Hub
        onNavigate('coop-hub');
        return;
      }
    }
    setAgeCheckComplete(true);
  }, [user, onNavigate]);

  // If age check not complete or user is under 18, show nothing (redirect happens above)
  if (!ageCheckComplete) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#38bdf8] mx-auto mb-4"></div>
          <p className="text-[#cbd5e1]">Loading...</p>
        </div>
      </div>
    );
  }

  // ==================== State ====================
  const [activeTab, setActiveTab] = useState<TabType>('our-marketplace');
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [budgetTypeFilter, setBudgetTypeFilter] = useState<BudgetTypeFilter>('All');
  
  // Modal state
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [bidSubmitting, setBidSubmitting] = useState(false);
  const [bidSuccess, setBidSuccess] = useState(false);

  // ==================== Effects ====================
  useEffect(() => {
    loadContractsData();
  }, [activeTab]);

  async function loadContractsData() {
    setLoading(true);
    try {
      const source = activeTab === 'our-marketplace' ? 'ZALPHA' : 'Partner';
      const data = await loadContracts(source);
      setContracts(data);
    } catch (error) {
      console.error('Error loading contracts:', error);
    } finally {
      setLoading(false);
    }
  }

  // ==================== Filtered Contracts ====================
  const filteredContracts = contracts.filter(contract => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        contract.title.toLowerCase().includes(query) ||
        contract.employerName.toLowerCase().includes(query) ||
        contract.description.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Location filter
    if (locationFilter !== 'All' && contract.location !== locationFilter) {
      return false;
    }

    // Category filter
    if (categoryFilter !== 'All' && contract.category !== categoryFilter) {
      return false;
    }

    // Budget type filter
    if (budgetTypeFilter !== 'All' && contract.budgetType !== budgetTypeFilter) {
      return false;
    }

    return true;
  });

  // ==================== Handlers ====================
  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setBidAmount('');
    setBidMessage('');
    setBidSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedContract(null);
    setBidAmount('');
    setBidMessage('');
    setBidSuccess(false);
  };

  const handleSubmitBid = async () => {
    if (!selectedContract || !bidAmount || !bidMessage) {
      alert('Please fill in all bid fields');
      return;
    }

    setBidSubmitting(true);
    try {
      const result = await submitBid(
        {
          contractId: selectedContract.id,
          amount: parseFloat(bidAmount),
          message: bidMessage
        },
        user?.id || 'guest'
      );

      if (result.success) {
        setBidSuccess(true);
        // Reset form after 2 seconds
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Failed to submit bid. Please try again.');
    } finally {
      setBidSubmitting(false);
    }
  };

  // ==================== Render ====================
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9]">
      
      {/* Header */}
      <header className="bg-[#020617] border-b border-slate-800/50 sticky top-0 z-40 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] mb-2">
                ZALPHA Contract Marketplace <span className="text-[#38bdf8]">(18+)</span>
              </h1>
              <p className="text-[#cbd5e1] text-lg max-w-3xl">
                Short-term gigs, freelance contracts, and remote work opportunities for Pacific talent. 
                Connect with employers across CNMI, Guam, FSM, Palau, and Marshall Islands.
              </p>
            </div>
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="text-[#38bdf8] hover:text-[#0ea5e9] font-medium flex items-center gap-2 transition-colors"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          {/* Age Warning Banner */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-200">
              <strong>18+ Only:</strong> Contract marketplace requires users to be 18 years or older. 
              High school students should use the <button 
                onClick={() => onNavigate('coop-hub')}
                className="underline hover:text-yellow-100 font-semibold"
              >Co-Op Hub</button> instead.
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#020617] border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('our-marketplace')}
              className={`px-6 py-3 font-semibold transition-all relative ${
                activeTab === 'our-marketplace'
                  ? 'text-[#38bdf8] bg-[#0f172a]'
                  : 'text-[#94a3b8] hover:text-[#cbd5e1] hover:bg-slate-800/30'
              }`}
            >
              Our Marketplace
              {activeTab === 'our-marketplace' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38bdf8]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('curated-partners')}
              className={`px-6 py-3 font-semibold transition-all relative ${
                activeTab === 'curated-partners'
                  ? 'text-[#38bdf8] bg-[#0f172a]'
                  : 'text-[#94a3b8] hover:text-[#cbd5e1] hover:bg-slate-800/30'
              }`}
            >
              Curated Partners
              {activeTab === 'curated-partners' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38bdf8]"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-[#020617] rounded-xl border border-slate-700/50 p-6 sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-[#38bdf8]" />
                <h2 className="text-xl font-semibold text-[#f1f5f9]">Filters</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Title or employer..."
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-[#f1f5f9] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value as LocationFilter)}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent"
                >
                  <option value="All">All Locations</option>
                  <option value="CNMI">CNMI</option>
                  <option value="Guam">Guam</option>
                  <option value="FSM">FSM</option>
                  <option value="Palau">Palau</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent"
                >
                  <option value="All">All Categories</option>
                  <option value="IT">IT</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Government">Government</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Budget Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Budget Type
                </label>
                <select
                  value={budgetTypeFilter}
                  onChange={(e) => setBudgetTypeFilter(e.target.value as BudgetTypeFilter)}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent"
                >
                  <option value="All">All Types</option>
                  <option value="Fixed">Fixed Price</option>
                  <option value="Hourly">Hourly Rate</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLocationFilter('All');
                  setCategoryFilter('All');
                  setBudgetTypeFilter('All');
                }}
                className="w-full text-sm text-[#38bdf8] hover:text-[#0ea5e9] font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#cbd5e1]">
                {filteredContracts.length} contract{filteredContracts.length !== 1 ? 's' : ''} available
              </h3>
              {activeTab === 'our-marketplace' && (
                <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                  <TrendingUp className="w-4 h-4" />
                  <span>Sorted by: Most Recent</span>
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#38bdf8] mx-auto mb-4"></div>
                <p className="text-[#cbd5e1]">Loading contracts...</p>
              </div>
            ) : filteredContracts.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20 bg-[#020617] rounded-xl border border-slate-700/50">
                <Briefcase className="w-16 h-16 text-[#64748b] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#f1f5f9] mb-2">No contracts found</h3>
                <p className="text-[#94a3b8] mb-6">Try adjusting your filters or check back later for new opportunities.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setLocationFilter('All');
                    setCategoryFilter('All');
                    setBudgetTypeFilter('All');
                  }}
                  className="text-[#38bdf8] hover:text-[#0ea5e9] font-medium transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              /* Contract Cards Grid */
              <div className="grid gap-6">
                {activeTab === 'our-marketplace' ? (
                  /* OUR MARKETPLACE CARDS */
                  filteredContracts.map(contract => (
                    <ContractCard
                      key={contract.id}
                      contract={contract}
                      onViewContract={handleViewContract}
                    />
                  ))
                ) : (
                  /* CURATED PARTNERS CONTENT */
                  <>
                    {/* Explanation Banner */}
                    <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6 mb-6">
                      <div className="flex items-start gap-4">
                        <ExternalLink className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-[#f1f5f9] mb-2">
                            Partner Marketplace Contracts
                          </h3>
                          <p className="text-[#cbd5e1] leading-relaxed">
                            These opportunities come from our curated partner marketplaces and external agencies. 
                            ZALPHA has vetted these partners to ensure quality and legitimacy. When you apply, 
                            you'll be connected directly with the partner platform.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Partner Contracts */}
                    {filteredContracts.map(contract => (
                      <ContractCard
                        key={contract.id}
                        contract={contract}
                        onViewContract={handleViewContract}
                      />
                    ))}
                  </>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Contract Detail Modal */}
      {selectedContract && (
        <ContractDetailModal
          contract={selectedContract}
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          bidMessage={bidMessage}
          setBidMessage={setBidMessage}
          bidSubmitting={bidSubmitting}
          bidSuccess={bidSuccess}
          onSubmitBid={handleSubmitBid}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

// ============================================================================
// CONTRACT CARD COMPONENT
// ============================================================================

interface ContractCardProps {
  contract: Contract;
  onViewContract: (contract: Contract) => void;
}

function ContractCard({ contract, onViewContract }: ContractCardProps) {
  return (
    <div className="bg-[#020617] rounded-xl border border-slate-700/50 hover:border-[#38bdf8]/50 transition-all duration-300 p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-2">
            <Building2 className="w-5 h-5 text-[#38bdf8] mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-[#f1f5f9] group-hover:text-[#38bdf8] transition-colors mb-1">
                {contract.title}
              </h3>
              <p className="text-[#94a3b8]">{contract.employerName}</p>
            </div>
          </div>
        </div>
        
        {/* Source Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
          contract.source === 'ZALPHA' 
            ? 'bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30' 
            : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
        }`}>
          {contract.source === 'ZALPHA' ? 'Source: ZALPHA' : `via ${contract.partnerName}`}
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700/30 text-[#cbd5e1] text-sm rounded-full">
          <MapPin className="w-3.5 h-3.5" />
          {contract.location}
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700/30 text-[#cbd5e1] text-sm rounded-full">
          <Tag className="w-3.5 h-3.5" />
          {contract.category}
        </span>
        {contract.timeline && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700/30 text-[#cbd5e1] text-sm rounded-full">
            <Clock className="w-3.5 h-3.5" />
            {contract.timeline}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-[#94a3b8] leading-relaxed mb-4 line-clamp-2">
        {contract.description}
      </p>

      {/* Budget & Action */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <span className="text-lg font-bold text-emerald-400">
            ${contract.budgetAmount.toLocaleString()}
            {contract.budgetType === 'Hourly' && '/hr'}
          </span>
          <span className="text-sm text-[#64748b]">
            {contract.budgetType === 'Fixed' ? 'fixed' : 'hourly'}
          </span>
        </div>

        <button
          onClick={() => onViewContract(contract)}
          className="inline-flex items-center gap-2 bg-[#38bdf8] hover:bg-[#0ea5e9] text-slate-900 font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95"
        >
          View & Bid
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// CONTRACT DETAIL MODAL COMPONENT
// ============================================================================

interface ContractDetailModalProps {
  contract: Contract;
  bidAmount: string;
  setBidAmount: (value: string) => void;
  bidMessage: string;
  setBidMessage: (value: string) => void;
  bidSubmitting: boolean;
  bidSuccess: boolean;
  onSubmitBid: () => void;
  onClose: () => void;
}

function ContractDetailModal({
  contract,
  bidAmount,
  setBidAmount,
  bidMessage,
  setBidMessage,
  bidSubmitting,
  bidSuccess,
  onSubmitBid,
  onClose
}: ContractDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#020617] rounded-2xl border border-slate-700/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#020617] border-b border-slate-700/50 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#f1f5f9] mb-1">{contract.title}</h2>
            <p className="text-[#94a3b8]">{contract.employerName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-700/30 text-[#cbd5e1] text-sm rounded-full">
              <MapPin className="w-4 h-4" />
              {contract.location}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-700/30 text-[#cbd5e1] text-sm rounded-full">
              <Tag className="w-4 h-4" />
              {contract.category}
            </span>
            {contract.timeline && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-700/30 text-[#cbd5e1] text-sm rounded-full">
                <Clock className="w-4 h-4" />
                {contract.timeline}
              </span>
            )}
            <span className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full font-semibold ${
              contract.source === 'ZALPHA' 
                ? 'bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30' 
                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
            }`}>
              {contract.source === 'ZALPHA' ? 'ZALPHA Marketplace' : contract.partnerName}
            </span>
          </div>

          {/* Budget */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-2xl font-bold text-emerald-400">
                  ${contract.budgetAmount.toLocaleString()}
                  {contract.budgetType === 'Hourly' && '/hr'}
                </div>
                <div className="text-sm text-emerald-300">
                  {contract.budgetType} {contract.budgetType === 'Fixed' ? 'Project' : 'Rate'}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-[#f1f5f9] mb-3">Description</h3>
            <p className="text-[#cbd5e1] leading-relaxed">{contract.description}</p>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-lg font-semibold text-[#f1f5f9] mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {contract.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-[#38bdf8]/10 text-[#38bdf8] text-sm font-medium rounded-lg border border-[#38bdf8]/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bid Form */}
          {!bidSuccess ? (
            <div className="bg-[#1e293b] rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-[#38bdf8]" />
                Submit Your Bid
              </h3>

              <div className="space-y-4">
                {/* Bid Amount */}
                <div>
                  <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                    Your Bid Amount (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter your bid amount"
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-[#f1f5f9] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-[#64748b] mt-1">
                    Suggested: ${contract.budgetAmount.toLocaleString()}
                    {contract.budgetType === 'Hourly' ? '/hr' : ''}
                  </p>
                </div>

                {/* Bid Message */}
                <div>
                  <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                    Cover Message
                  </label>
                  <textarea
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    placeholder="Explain why you're the best fit for this contract. Include relevant experience, portfolio links, and your proposed timeline..."
                    rows={6}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-4 py-3 text-[#f1f5f9] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-[#64748b] mt-1">
                    {bidMessage.length}/1000 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={onSubmitBid}
                  disabled={bidSubmitting || !bidAmount || !bidMessage}
                  className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-900 disabled:text-slate-500 font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95 flex items-center justify-center gap-2"
                >
                  {bidSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Bid
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Success Message */
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Bid Submitted Successfully!</h3>
              <p className="text-[#cbd5e1]">
                The employer will review your proposal and contact you if you're selected.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
