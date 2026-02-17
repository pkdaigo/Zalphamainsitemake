import { OpportunityCard } from './OpportunityCard';
import { RegionFilter } from './CollegeRegionFilters';
import { Briefcase } from 'lucide-react';

type RegionalOpportunitiesFeedProps = {
  activeFilter: RegionFilter;
  onViewOpportunity: (id: string) => void;
};

export function RegionalOpportunitiesFeed({ activeFilter, onViewOpportunity }: RegionalOpportunitiesFeedProps) {
  // Mock data - in real app, filter by activeFilter
  const allOpportunities = [
    {
      id: '1',
      title: 'Junior Network Technician',
      employer: 'CNMI Public Utilities',
      locationLabel: 'Saipan · CNMI / Western Pacific',
      regionTag: 'Stay in CNMI',
      region: 'CNMI' as RegionFilter,
      isTechnicalFriendly: true,
      salary: '$35,000 - $45,000/year',
      type: 'Full-time',
      postedDate: '2 days ago',
    },
    {
      id: '2',
      title: 'IT Support Specialist',
      employer: 'Northern Marianas College',
      locationLabel: 'Saipan · CNMI',
      regionTag: 'Stay in CNMI',
      region: 'CNMI' as RegionFilter,
      isTechnicalFriendly: true,
      salary: '$32,000 - $42,000/year',
      type: 'Full-time',
      postedDate: '5 days ago',
    },
    {
      id: '3',
      title: 'Support Engineer (Remote, APAC)',
      employer: 'Pacific Cloud Services',
      locationLabel: 'Remote · Asia-Pacific',
      regionTag: 'Asia-Pacific',
      region: 'REMOTE_AP' as RegionFilter,
      isTechnicalFriendly: true,
      salary: '$45,000 - $65,000/year',
      type: 'Remote · Full-time',
      postedDate: '1 week ago',
    },
    {
      id: '4',
      title: 'Clinical Tech Assistant',
      employer: 'Hospital Partner – Honolulu',
      locationLabel: 'Honolulu · Hawaii (our only U.S. state focus)',
      regionTag: 'Hawaii',
      region: 'HAWAII' as RegionFilter,
      isTechnicalFriendly: true,
      salary: '$40,000 - $50,000/year',
      type: 'Full-time',
      postedDate: '3 days ago',
    },
    {
      id: '5',
      title: 'Administrative Coordinator',
      employer: 'Guam Visitors Bureau',
      locationLabel: 'Tamuning · Guam / Western Pacific',
      regionTag: 'Western Pacific',
      region: 'WESTERN_PACIFIC' as RegionFilter,
      isTechnicalFriendly: false,
      salary: '$30,000 - $38,000/year',
      type: 'Full-time',
      postedDate: '1 week ago',
    },
    {
      id: '6',
      title: 'Software Developer Intern',
      employer: 'Pacific Tech Hub',
      locationLabel: 'Remote · Western Pacific & CNMI',
      regionTag: 'Remote · Western Pacific',
      region: 'REMOTE_WP' as RegionFilter,
      isTechnicalFriendly: true,
      salary: '$20/hour',
      type: 'Internship · Part-time',
      postedDate: '4 days ago',
    },
    {
      id: '7',
      title: 'Hospitality Manager',
      employer: 'Saipan Grand Hotel',
      locationLabel: 'Saipan · CNMI',
      regionTag: 'Stay in CNMI',
      region: 'CNMI' as RegionFilter,
      isTechnicalFriendly: false,
      salary: '$38,000 - $48,000/year',
      type: 'Full-time',
      postedDate: '2 weeks ago',
    },
    {
      id: '8',
      title: 'Data Analyst',
      employer: 'Asia-Pacific Analytics Ltd',
      locationLabel: 'Remote · Asia-Pacific',
      regionTag: 'Asia-Pacific',
      region: 'ASIA_PACIFIC' as RegionFilter,
      isTechnicalFriendly: true,
      salary: '$50,000 - $70,000/year',
      type: 'Remote · Full-time',
      postedDate: '1 week ago',
    },
  ];

  // Filter opportunities based on active region
  const filteredOpportunities = allOpportunities.filter(opp => {
    if (activeFilter === 'CNMI') return opp.region === 'CNMI';
    if (activeFilter === 'WESTERN_PACIFIC') return opp.region === 'WESTERN_PACIFIC';
    if (activeFilter === 'ASIA_PACIFIC') return opp.region === 'ASIA_PACIFIC';
    if (activeFilter === 'HAWAII') return opp.region === 'HAWAII';
    if (activeFilter === 'REMOTE_WP') return opp.region === 'REMOTE_WP';
    if (activeFilter === 'REMOTE_AP') return opp.region === 'REMOTE_AP';
    return true;
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-50">
          Opportunities across our region
        </h2>
        <span className="text-[11px] text-slate-400 font-semibold">
          {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'role' : 'roles'}
        </span>
      </div>

      {filteredOpportunities.length > 0 ? (
        <div className="space-y-2">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              title={opp.title}
              employer={opp.employer}
              locationLabel={opp.locationLabel}
              regionTag={opp.regionTag}
              isTechnicalFriendly={opp.isTechnicalFriendly}
              salary={opp.salary}
              type={opp.type}
              postedDate={opp.postedDate}
              onViewApply={() => onViewOpportunity(opp.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center">
          <Briefcase className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="text-sm text-slate-400 font-semibold mb-1">
            No opportunities in this region yet
          </p>
          <p className="text-[11px] text-slate-500">
            Check back soon or try a different region filter
          </p>
        </div>
      )}
    </section>
  );
}
