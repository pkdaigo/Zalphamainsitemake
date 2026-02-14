/*
 * ZALPHA Platform - Global Contracts Marketplace
 * Dual marketplace model: ZALFA's native contracts + Curated partner marketplaces
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Star, Globe, MapPin, DollarSign, Calendar, Briefcase, 
  Building2, CheckCircle, ExternalLink, Shield, Award, ChevronRight 
} from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface GlobalContractsMarketplaceProps {
  onNavigate: (page: string) => void;
}

type MarketplaceTab = 'zalfa' | 'partners';

// Sample ZALFA native contracts
const zalfaContracts = [
  {
    id: '1',
    title: 'EPA Compliance Manager',
    employer: 'Commonwealth Utilities Corporation',
    location: 'Saipan, CNMI',
    salary: '$120,000 - $150,000/year',
    duration: '2-year contract',
    type: 'Full-time Contract',
    badge: 'ZALFA Managed',
    tags: ['EPA', 'Compliance', 'Environmental'],
  },
  {
    id: '2',
    title: 'Senior Healthcare Administrator',
    employer: 'Commonwealth Healthcare Corp',
    location: 'Guam',
    salary: '$95,000 - $125,000/year',
    duration: '3-year contract',
    type: 'Full-time Contract',
    badge: 'ZALFA Managed',
    tags: ['Healthcare', 'Management', 'Public Health'],
  },
  {
    id: '3',
    title: 'Infrastructure Project Engineer',
    employer: 'Pacific Development Partners',
    location: 'CNMI (All Islands)',
    salary: '$110,000 - $140,000/year',
    duration: '18-month contract',
    type: 'Full-time Contract',
    badge: 'ZALFA Managed',
    tags: ['Engineering', 'Infrastructure', 'Construction'],
  },
  {
    id: '4',
    title: 'Education Program Director',
    employer: 'CNMI Public School System',
    location: 'Saipan, CNMI',
    salary: '$85,000 - $105,000/year',
    duration: '1-year renewable',
    type: 'Full-time Contract',
    badge: 'ZALFA Managed',
    tags: ['Education', 'Leadership', 'K-12'],
  },
  {
    id: '5',
    title: 'Utilities Systems Analyst',
    employer: 'Guam Power Authority',
    location: 'Guam',
    salary: '$100,000 - $130,000/year',
    duration: '2-year contract',
    type: 'Full-time Contract',
    badge: 'ZALFA Managed',
    tags: ['Utilities', 'Systems', 'Analysis'],
  },
  {
    id: '6',
    title: 'Renewable Energy Consultant',
    employer: 'Pacific Energy Solutions',
    location: 'FSM / Palau',
    salary: '$115,000 - $145,000/year',
    duration: '2-year contract',
    type: 'Full-time Contract',
    badge: 'ZALFA Managed',
    tags: ['Energy', 'Sustainability', 'Consulting'],
  },
];

// Sample partner marketplace contracts
const partnerContracts = [
  {
    id: 'p1',
    title: 'Cloud Security Architect',
    employer: 'TechGlobal Inc.',
    location: 'Remote (US Territories)',
    salary: '$140,000 - $180,000/year',
    duration: '1-year contract',
    type: 'Remote Contract',
    partner: 'GlobalTech Marketplace',
    partnerLogo: '🌐',
    tags: ['Cloud', 'Security', 'Architecture'],
  },
  {
    id: 'p2',
    title: 'International Development Specialist',
    employer: 'UN Development Programme',
    location: 'Pacific Islands Region',
    salary: '$105,000 - $135,000/year',
    duration: '2-year assignment',
    type: 'Full-time Contract',
    partner: 'UN Talent Network',
    partnerLogo: '🌍',
    tags: ['Development', 'International', 'NGO'],
  },
  {
    id: 'p3',
    title: 'Maritime Operations Manager',
    employer: 'Pacific Shipping Alliance',
    location: 'Guam / Hawaii',
    salary: '$125,000 - $160,000/year',
    duration: '3-year contract',
    type: 'Full-time Contract',
    partner: 'Maritime Careers Hub',
    partnerLogo: '⚓',
    tags: ['Maritime', 'Operations', 'Logistics'],
  },
  {
    id: 'p4',
    title: 'Hospitality General Manager',
    employer: 'Pacific Resort Group',
    location: 'Palau / FSM',
    salary: '$90,000 - $120,000/year',
    duration: '2-year contract',
    type: 'Full-time Contract',
    partner: 'Hospitality Staffing Network',
    partnerLogo: '🏨',
    tags: ['Hospitality', 'Management', 'Tourism'],
  },
  {
    id: 'p5',
    title: 'Federal Grants Administrator',
    employer: 'US Dept. of Interior - OIA',
    location: 'CNMI / Guam',
    salary: '$95,000 - $125,000/year',
    duration: '3-year term',
    type: 'Government Contract',
    partner: 'Federal Jobs Exchange',
    partnerLogo: '🏛️',
    tags: ['Government', 'Grants', 'Federal'],
  },
  {
    id: 'p6',
    title: 'Fisheries Management Advisor',
    employer: 'NOAA Pacific Islands',
    location: 'Hawaii / Pacific Islands',
    salary: '$110,000 - $140,000/year',
    duration: '2-year contract',
    type: 'Full-time Contract',
    partner: 'Federal Jobs Exchange',
    partnerLogo: '🏛️',
    tags: ['Fisheries', 'Environment', 'Science'],
  },
];

export function GlobalContractsMarketplace({ onNavigate }: GlobalContractsMarketplaceProps) {
  const [activeTab, setActiveTab] = useState<MarketplaceTab>('zalfa');

  const contracts = activeTab === 'zalfa' ? zalfaContracts : partnerContracts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: 'rgb(59, 130, 246)' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: 'rgb(168, 85, 247)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-16">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton onClick={() => onNavigate('app-overview')} variant="light" label="Back to Overview" />
        </div>

        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-bold text-white mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Briefcase className="w-4 h-4 text-purple-400" />
            DUAL MARKETPLACE MODEL
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Global Contracts Marketplace
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            High-value fixed-term contracts for Pacific professionals—from ZALFA's native marketplace 
            and curated partner networks
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('zalfa')}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                activeTab === 'zalfa'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                ZALFA Contracts
              </div>
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                activeTab === 'partners'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Curated Partners
              </div>
            </button>
          </div>
        </motion.div>

        {/* Tab Description */}
        <motion.div 
          className="mb-8 max-w-4xl mx-auto"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'zalfa' ? (
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">ZALFA-Managed Contracts</h3>
                  <p className="text-blue-100 leading-relaxed">
                    These contracts are <strong className="text-white">fully managed by ZALFA Recruit</strong>. 
                    We handle sourcing, AI screening, compliance checks, and placement. Employers post directly 
                    on our platform for EPA roles, utilities, infrastructure, healthcare, and education.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Curated Partner Opportunities</h3>
                  <p className="text-blue-100 leading-relaxed">
                    These opportunities come from <strong className="text-white">trusted external marketplaces 
                    and agencies</strong> we've vetted and partnered with. Access additional global contracts 
                    without leaving ZALFA—partners are clearly labeled so you know the source.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Contracts Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {contracts.map((contract, index) => (
            <motion.div
              key={contract.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all hover:scale-105 hover:shadow-2xl cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                {activeTab === 'zalfa' ? (
                  <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {contract.badge}
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                    <span>{(contract as typeof partnerContracts[0]).partnerLogo}</span>
                    via {(contract as typeof partnerContracts[0]).partner}
                  </span>
                )}
                <Star className="w-5 h-5 text-yellow-400" />
              </div>

              {/* Title & Employer */}
              <h3 className="text-xl font-bold text-white mb-2">{contract.title}</h3>
              <p className="text-cyan-300 text-sm mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {contract.employer}
              </p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <MapPin className="w-4 h-4 text-green-400" />
                  {contract.location}
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <DollarSign className="w-4 h-4 text-yellow-400" />
                  {contract.salary}
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  {contract.duration}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {contract.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/10 text-blue-200 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2">
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Info */}
        <motion.div 
          className="mt-16 grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Award className="w-6 h-6 text-cyan-400" />
              For Employers
            </h3>
            <p className="text-blue-100 mb-4">
              Post high-value contracts on ZALFA's native marketplace with full AI screening and compliance support.
            </p>
            <button
              onClick={() => onNavigate('employer-signup')}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Post a Contract
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-purple-400" />
              For Talent
            </h3>
            <p className="text-blue-100 mb-4">
              Browse ZALFA contracts and curated partner opportunities—all vetted for quality and compliance.
            </p>
            <button
              onClick={() => onNavigate('student-signup')}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Apply Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}