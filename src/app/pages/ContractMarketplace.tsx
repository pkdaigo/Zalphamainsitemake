import { Briefcase, DollarSign, Clock, MapPin, TrendingUp, Award, Filter, Search, Send, Star, CheckCircle, AlertCircle, Zap, Users, Target } from 'lucide-react';
import { useState } from 'react';
import { EmploymentDisclosure } from '@/app/components/EmploymentDisclosure';
import { DisputeRefundPolicy } from '@/app/components/DisputeRefundPolicy';
import { BackButton } from '@/app/components/BackButton';

interface ContractMarketplaceProps {
  onNavigate: (page: string) => void;
  userType: 'student' | 'employer' | null;
}

// Mock contract jobs data
const contractJobs = [
  {
    id: 1,
    title: 'Website Redesign for Tourism Company',
    company: 'Pacific Adventures Tours',
    companyLogo: '🏝️',
    budget: '$2,500 - $4,000',
    duration: '6-8 weeks',
    location: 'Remote - CNMI',
    postedDate: '2 days ago',
    bidsCount: 8,
    skills: ['Web Design', 'React', 'Adobe XD'],
    description: 'Looking for a talented web designer to redesign our tourism website. Must have experience with modern design trends and responsive layouts.',
    status: 'open',
    contractType: 'Fixed Price'
  },
  {
    id: 2,
    title: 'Social Media Content Creator',
    company: 'Island Wellness Spa',
    companyLogo: '🧘',
    budget: '$500 - $800/month',
    duration: '3 months',
    location: 'Remote - Guam',
    postedDate: '5 days ago',
    bidsCount: 15,
    skills: ['Social Media', 'Content Creation', 'Photography'],
    description: 'Need a creative content creator to manage Instagram, Facebook, and TikTok accounts. 10-15 posts per week.',
    status: 'open',
    contractType: 'Hourly'
  },
  {
    id: 3,
    title: 'Financial Analysis & Reporting',
    company: 'Pacific Investment Group',
    companyLogo: '💼',
    budget: '$3,000 - $5,000',
    duration: '4 weeks',
    location: 'Remote - Hawaii',
    postedDate: '1 week ago',
    bidsCount: 6,
    skills: ['Excel', 'Financial Analysis', 'Data Visualization'],
    description: 'Seeking finance graduate to create quarterly financial reports and analysis dashboards for our investment portfolio.',
    status: 'open',
    contractType: 'Fixed Price'
  },
  {
    id: 4,
    title: 'Mobile App UI/UX Design',
    company: 'TechPacific Solutions',
    companyLogo: '📱',
    budget: '$1,500 - $2,500',
    duration: '5 weeks',
    location: 'Remote - FSM',
    postedDate: '3 days ago',
    bidsCount: 12,
    skills: ['UI/UX Design', 'Figma', 'Mobile Design'],
    description: 'Design a modern mobile app for local business directory. Need complete UI/UX mockups and prototype.',
    status: 'open',
    contractType: 'Fixed Price'
  },
  {
    id: 5,
    title: 'Video Editor for Marketing Content',
    company: 'Ocean View Resorts',
    companyLogo: '🌊',
    budget: '$30-$45/hour',
    duration: 'Ongoing',
    location: 'Remote - CNMI',
    postedDate: '1 day ago',
    bidsCount: 9,
    skills: ['Video Editing', 'Adobe Premiere', 'After Effects'],
    description: 'Looking for skilled video editor to create promotional videos for our resort properties. 2-3 videos per month.',
    status: 'open',
    contractType: 'Hourly'
  }
];

// Mock student bids data
const myBids = [
  {
    id: 1,
    jobTitle: 'Website Redesign for Tourism Company',
    company: 'Pacific Adventures Tours',
    bidAmount: '$3,200',
    timeline: '7 weeks',
    status: 'pending',
    submittedDate: '1 day ago',
    message: 'I have 3 years of experience in web design and have completed similar tourism website projects...'
  },
  {
    id: 2,
    jobTitle: 'Mobile App UI/UX Design',
    company: 'TechPacific Solutions',
    bidAmount: '$2,000',
    timeline: '4 weeks',
    status: 'accepted',
    submittedDate: '3 days ago',
    message: 'I specialize in mobile UI/UX and have designed 5+ apps that are currently live...'
  }
];

export function ContractMarketplace({ onNavigate, userType }: ContractMarketplaceProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-bids' | 'post-job' | 'my-contracts'>('browse');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidTimeline, setBidTimeline] = useState('');
  const [bidMessage, setBidMessage] = useState('');

  const handleSubmitBid = () => {
    alert(`Bid submitted!\nAmount: $${bidAmount}\nTimeline: ${bidTimeline} weeks\n\nThe employer will review your proposal and contact you if selected.`);
    setShowBidForm(false);
    setBidAmount('');
    setBidTimeline('');
    setBidMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <BackButton onNavigate={onNavigate} destination="student-dashboard" />
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold">Contract Marketplace</h1>
                  <p className="text-cyan-200 text-xl">Remote-Only Opportunities Across the Pacific</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Info Banner */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/30">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">🌏 Remote Only</div>
                <div className="text-cyan-200">Work from anywhere in the Pacific</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">127</div>
                <div className="text-cyan-200">Active Contract Jobs</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">$500-$5K</div>
                <div className="text-cyan-200">Typical Project Budget</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">⚡ Fast</div>
                <div className="text-cyan-200">Get hired within days</div>
              </div>
            </div>
          </div>

          {/* IMPORTANT: On-Platform Requirement */}
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 mt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-2">⚠️ All Contract Work MUST Be Conducted Through ZALPHA Platform</h3>
                <p className="text-red-800 leading-relaxed mb-3">
                  <strong>Legal Compliance Requirement:</strong> All contract negotiations, work, communication, deliverables, payments, and disputes MUST be handled through the ZALPHA platform. Taking work "off-platform" or arranging side deals outside of ZALPHA is strictly prohibited.
                </p>
                <div className="bg-red-100 rounded-lg p-4">
                  <p className="text-sm text-red-900 font-semibold mb-2">Why This Rule Exists:</p>
                  <ul className="space-y-1 text-sm text-red-800 ml-4 list-disc">
                    <li>Protects both employers and workers from legal disputes</li>
                    <li>Ensures payment security through escrow system</li>
                    <li>Maintains platform integrity and trust</li>
                    <li>Allows ZALPHA to monitor for labor law compliance</li>
                    <li>Prevents trafficking, exploitation, and unfair practices</li>
                  </ul>
                  <p className="text-sm text-red-900 font-bold mt-3">
                    Violation of this policy may result in account suspension and legal action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Employment Disclosure - Shows for all users */}
        <div className="mb-8">
          <EmploymentDisclosure variant="compact" />
        </div>

        {/* Dispute & Refund Policy - Shows for employers */}
        {userType === 'employer' && (
          <div className="mb-8">
            <DisputeRefundPolicy variant="compact" />
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 flex gap-2">
          {userType === 'student' && (
            <>
              <button
                onClick={() => setActiveTab('browse')}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
                  activeTab === 'browse'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Browse Jobs
                </div>
              </button>
              <button
                onClick={() => setActiveTab('my-bids')}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
                  activeTab === 'my-bids'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Target className="w-5 h-5" />
                  My Bids ({myBids.length})
                </div>
              </button>
            </>
          )}
          {userType === 'employer' && (
            <>
              <button
                onClick={() => setActiveTab('post-job')}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
                  activeTab === 'post-job'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Post Contract Job
                </div>
              </button>
              <button
                onClick={() => setActiveTab('my-contracts')}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
                  activeTab === 'my-contracts'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  My Contract Posts
                </div>
              </button>
            </>
          )}
        </div>

        {/* STUDENT VIEW: Browse Jobs */}
        {activeTab === 'browse' && userType === 'student' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-slate-600" />
                  <span className="font-semibold text-slate-700">Filters:</span>
                </div>
                <select className="px-4 py-2 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none">
                  <option>All Regions</option>
                  <option>CNMI</option>
                  <option>Guam</option>
                  <option>Hawaii</option>
                  <option>FSM</option>
                </select>
                <select className="px-4 py-2 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none">
                  <option>All Types</option>
                  <option>Fixed Price</option>
                  <option>Hourly</option>
                </select>
                <select className="px-4 py-2 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none">
                  <option>All Budgets</option>
                  <option>$0 - $1,000</option>
                  <option>$1,000 - $3,000</option>
                  <option>$3,000 - $5,000</option>
                  <option>$5,000+</option>
                </select>
                <input
                  type="text"
                  placeholder="Search skills..."
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-6">
              {contractJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-cyan-400">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-3xl">
                        {job.companyLogo}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h3>
                        <p className="text-slate-600 mb-2">{job.company}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-cyan-600" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-cyan-600" />
                            {job.postedDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-cyan-600" />
                            {job.bidsCount} bids
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 mb-1">{job.budget}</div>
                      <div className="text-sm text-slate-600">{job.contractType}</div>
                      <div className="text-sm text-slate-600">⏱️ {job.duration}</div>
                    </div>
                  </div>

                  <p className="text-slate-700 mb-6">{job.description}</p>

                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-xl font-semibold text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        setSelectedJob(job.id);
                        setShowBidForm(true);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Submit Bid
                    </button>
                    <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:border-cyan-500 hover:text-cyan-600 transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENT VIEW: My Bids */}
        {activeTab === 'my-bids' && userType === 'student' && (
          <div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white mb-6">
              <h2 className="text-2xl font-bold mb-2">Your Active Bids</h2>
              <p className="text-cyan-100">Track all your submitted proposals and their status</p>
            </div>

            <div className="space-y-6">
              {myBids.map((bid) => (
                <div key={bid.id} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-slate-200">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{bid.jobTitle}</h3>
                      <p className="text-slate-600">{bid.company}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-bold ${
                      bid.status === 'accepted' 
                        ? 'bg-green-100 text-green-700' 
                        : bid.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {bid.status === 'accepted' ? '✅ Accepted' : '⏳ Pending Review'}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-cyan-50 rounded-xl p-4">
                      <div className="text-sm text-cyan-700 mb-1">Your Bid Amount</div>
                      <div className="text-2xl font-bold text-cyan-600">{bid.bidAmount}</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-blue-700 mb-1">Proposed Timeline</div>
                      <div className="text-2xl font-bold text-blue-600">{bid.timeline}</div>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-4">
                      <div className="text-sm text-indigo-700 mb-1">Submitted</div>
                      <div className="text-2xl font-bold text-indigo-600">{bid.submittedDate}</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <div className="font-semibold text-slate-700 mb-2">Your Proposal:</div>
                    <p className="text-slate-600">{bid.message}</p>
                  </div>

                  {bid.status === 'accepted' && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                        <CheckCircle className="w-5 h-5" />
                        Congratulations! Your bid was accepted
                      </div>
                      <p className="text-green-600 text-sm">The employer will contact you soon to discuss next steps and begin the contract.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EMPLOYER VIEW: Post Contract Job */}
        {activeTab === 'post-job' && userType === 'employer' && (
          <div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white mb-6">
              <h2 className="text-2xl font-bold mb-2">Post a Contract Job</h2>
              <p className="text-cyan-100">🌏 This is for REMOTE-ONLY positions accessible to Pacific students</p>
            </div>

            {/* Pricing Model Banner */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    💰 Transparent Pricing: First 3 Jobs FREE!
                  </h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Your first 3 contract jobs are completely FREE.</strong> After that, choose the pricing option that works best for you:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {/* Option A: Flat Fee */}
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                        <h4 className="font-bold text-blue-900">Option A: Flat Fee</h4>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">$99</div>
                      <p className="text-sm text-gray-600 mb-3">per contract job posting</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Pay once when posting</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>No commission later</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Best for projects $1,000+</span>
                        </div>
                      </div>
                    </div>

                    {/* Option B: Commission */}
                    <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <h4 className="font-bold text-purple-900">Option B: Commission</h4>
                      </div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">10%</div>
                      <p className="text-sm text-gray-600 mb-3">of total contract value</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Pay nothing to post</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Only pay when you hire</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Best for projects under $990</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-cyan-100 rounded-lg border border-cyan-300">
                    <p className="text-sm text-cyan-900">
                      <strong>💡 Smart Pricing:</strong> ZALPHA automatically recommends the best option based on your budget. 
                      On a $3,000 project, choose $99 flat fee and save $201!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Experience Level Awareness Banner */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 rounded-full p-3">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    🎓 Important: Your Talent Pool is Students & Recent Graduates
                  </h3>
                  <p className="text-gray-700 mb-4">
                    ZALPHA connects you with <strong>current college students and recent graduates</strong> (typically 0-3 years of professional experience). 
                    Please scope your contract work appropriately for their experience level to get the best results.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    {/* Entry Level */}
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-green-600" />
                        <h4 className="font-bold text-green-900">Entry Level</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Current students, 0-1 year experience</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <div className="font-semibold text-green-700">✓ Good for:</div>
                        <div>• Social media content</div>
                        <div>• Data entry & research</div>
                        <div>• Basic design work</div>
                        <div>• Simple admin tasks</div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-green-200">
                        <div className="text-xs font-semibold text-green-800">Budget: $500-$2,000</div>
                      </div>
                    </div>

                    {/* Intermediate */}
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <h4 className="font-bold text-blue-900">Intermediate</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Recent grads, 1-2 years experience</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <div className="font-semibold text-blue-700">✓ Good for:</div>
                        <div>• Website development</div>
                        <div>• Marketing campaigns</div>
                        <div>• Financial analysis</div>
                        <div>• Mobile app UI/UX</div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-blue-200">
                        <div className="text-xs font-semibold text-blue-800">Budget: $2,000-$5,000</div>
                      </div>
                    </div>

                    {/* Advanced */}
                    <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        <h4 className="font-bold text-purple-900">Advanced</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">2-3 years or portfolio work</p>
                      <div className="text-xs text-gray-700 space-y-1">
                        <div className="font-semibold text-purple-700">✓ Good for:</div>
                        <div>• Complex web apps</div>
                        <div>• Video production</div>
                        <div> Strategic consulting</div>
                        <div>• Full-stack projects</div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-purple-200">
                        <div className="text-xs font-semibold text-purple-800">Budget: $5,000+</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-900">
                      <strong>💡 Pro Tip:</strong> Students can deliver amazing work when projects are scoped to their skill level. 
                      Break large projects into smaller contracts, provide clear requirements, and you'll get great results!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Contract Job Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Website Redesign, Social Media Manager, Data Analysis"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Experience Level Selector - NEW */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    Required Experience Level * 
                    <span className="ml-2 text-sm font-normal text-gray-600">
                      (This helps students understand if they're qualified)
                    </span>
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <label className="flex items-start gap-3 p-4 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-green-500 transition-all group">
                      <input type="radio" name="experienceLevel" value="entry" className="mt-1 w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 group-hover:text-green-600">Entry Level</div>
                        <div className="text-xs text-slate-600 mt-1">Current students, minimal experience required</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 transition-all group">
                      <input type="radio" name="experienceLevel" value="intermediate" className="mt-1 w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600">Intermediate</div>
                        <div className="text-xs text-slate-600 mt-1">1-2 years or relevant coursework/projects</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-purple-500 transition-all group">
                      <input type="radio" name="experienceLevel" value="advanced" className="mt-1 w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 group-hover:text-purple-600">Advanced</div>
                        <div className="text-xs text-slate-600 mt-1">2-3 years or strong portfolio</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Contract Type *</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-cyan-500 transition-all">
                      <input type="radio" name="contractType" className="w-5 h-5" />
                      <div>
                        <div className="font-semibold text-slate-900">Fixed Price</div>
                        <div className="text-sm text-slate-600">One-time project with set budget</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-cyan-500 transition-all">
                      <input type="radio" name="contractType" className="w-5 h-5" />
                      <div>
                        <div className="font-semibold text-slate-900">Hourly Rate</div>
                        <div className="text-sm text-slate-600">Pay by the hour worked</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Budget Range *</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none"
                      />
                      <span className="text-slate-600">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Project Duration *</label>
                    <input
                      type="text"
                      placeholder="e.g., 4-6 weeks, 3 months"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Remote Location (Pacific Region) *</label>
                  <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none">
                    <option>Remote - All Pacific Regions</option>
                    <option>Remote - CNMI</option>
                    <option>Remote - Guam</option>
                    <option>Remote - Hawaii</option>
                    <option>Remote - FSM</option>
                  </select>
                  <p className="text-sm text-slate-600 mt-2">💡 Students can work remotely from anywhere in the Pacific</p>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Required Skills *</label>
                  <input
                    type="text"
                    placeholder="e.g., React, Graphic Design, Social Media Marketing"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none"
                  />
                  <p className="text-sm text-slate-600 mt-2">Separate skills with commas</p>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Project Description *</label>
                  <textarea
                    rows={6}
                    placeholder="Describe the contract work, deliverables, and any specific requirements..."
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-cyan-900 mb-2">🌏 Contract Marketplace Guidelines</h3>
                      <ul className="text-sm text-cyan-800 space-y-1">
                        <li>✓ This section is for <strong>remote/contract work only</strong></li>
                        <li>✓ Students will submit bids with their proposed price and timeline</li>
                        <li>✓ You can review all bids and select the best candidate</li>
                        <li>✓ Payment handled through the platform for protection</li>
                        <li>✓ All contractors must be verified ZALPHA students</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                    Post Contract Job
                  </button>
                  <button className="px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:border-cyan-500 transition-all">
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EMPLOYER VIEW: My Contract Posts */}
        {activeTab === 'my-contracts' && userType === 'employer' && (
          <div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white mb-6">
              <h2 className="text-2xl font-bold mb-2">Your Contract Job Posts</h2>
              <p className="text-cyan-100">Manage your contract listings and review bids from students</p>
            </div>

            <div className="space-y-6">
              {contractJobs.slice(0, 2).map((job) => (
                <div key={job.id} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-slate-200">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Posted {job.postedDate}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-bold">
                      🟢 Active
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-cyan-50 rounded-xl p-4">
                      <div className="text-sm text-cyan-700 mb-1">Budget</div>
                      <div className="text-xl font-bold text-cyan-600">{job.budget}</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-blue-700 mb-1">Duration</div>
                      <div className="text-xl font-bold text-blue-600">{job.duration}</div>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-4">
                      <div className="text-sm text-indigo-700 mb-1">Total Bids</div>
                      <div className="text-xl font-bold text-indigo-600">{job.bidsCount}</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="text-sm text-purple-700 mb-1">Type</div>
                      <div className="text-xl font-bold text-purple-600">{job.contractType}</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                      View {job.bidsCount} Bids
                    </button>
                    <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:border-cyan-500 transition-all">
                      Edit
                    </button>
                    <button className="px-6 py-3 border-2 border-red-300 text-red-700 rounded-xl font-semibold hover:border-red-500 transition-all">
                      Close
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bid Submission Modal */}
        {showBidForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Submit Your Bid</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Your Bid Amount ($) *</label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your proposed price"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Timeline (weeks) *</label>
                  <input
                    type="number"
                    value={bidTimeline}
                    onChange={(e) => setBidTimeline(e.target.value)}
                    placeholder="How many weeks will you need?"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Cover Letter / Proposal *</label>
                  <textarea
                    rows={6}
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    placeholder="Explain why you're the best candidate for this project..."
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-cyan-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-cyan-800">
                      <strong>Tips for a winning bid:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Be competitive but realistic with pricing</li>
                        <li>Highlight relevant experience and portfolio work</li>
                        <li>Ask clarifying questions if needed</li>
                        <li>Set a realistic timeline you can commit to</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSubmitBid}
                    disabled={!bidAmount || !bidTimeline || !bidMessage}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Bid
                  </button>
                  <button
                    onClick={() => setShowBidForm(false)}
                    className="px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:border-cyan-500 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}