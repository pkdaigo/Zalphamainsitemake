import { Briefcase, Users, Building2, TrendingUp, MapPin, Calendar, Eye } from 'lucide-react';
import { useState } from 'react';

type FeedItemType = 'CO_OP_POSTING' | 'STUDENT_MILESTONE' | 'NEW_EMPLOYER' | 'FAIR_ANNOUNCEMENT' | 'COLLEGE_PROGRAM';

type RegionalFeedItem = {
  id: string;
  type: FeedItemType;
  title: string;
  description: string;
  timestamp: string;
  region: 'CNMI' | 'GUAM' | 'FSM' | 'PALAU' | 'MARSHALL_ISLANDS';
  source: string;
  metadata?: {
    studentName?: string;
    hoursCompleted?: number;
    employerName?: string;
    programName?: string;
    eventDate?: string;
  };
};

type RegionalTalentFeedProps = {
  items: RegionalFeedItem[];
  onViewDetails: (id: string) => void;
};

function getItemIcon(type: FeedItemType) {
  switch (type) {
    case 'CO_OP_POSTING':
      return <Briefcase className="w-5 h-5" />;
    case 'STUDENT_MILESTONE':
      return <TrendingUp className="w-5 h-5" />;
    case 'NEW_EMPLOYER':
      return <Building2 className="w-5 h-5" />;
    case 'FAIR_ANNOUNCEMENT':
      return <Calendar className="w-5 h-5" />;
    case 'COLLEGE_PROGRAM':
      return <Users className="w-5 h-5" />;
  }
}

function getItemColor(type: FeedItemType) {
  switch (type) {
    case 'CO_OP_POSTING':
      return 'from-blue-500 to-cyan-500';
    case 'STUDENT_MILESTONE':
      return 'from-green-500 to-emerald-500';
    case 'NEW_EMPLOYER':
      return 'from-purple-500 to-pink-500';
    case 'FAIR_ANNOUNCEMENT':
      return 'from-orange-500 to-red-500';
    case 'COLLEGE_PROGRAM':
      return 'from-indigo-500 to-purple-500';
  }
}

function getItemBadgeColor(type: FeedItemType) {
  switch (type) {
    case 'CO_OP_POSTING':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'STUDENT_MILESTONE':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'NEW_EMPLOYER':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'FAIR_ANNOUNCEMENT':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'COLLEGE_PROGRAM':
      return 'bg-indigo-100 text-indigo-800 border-indigo-300';
  }
}

function getRegionColor(region: string) {
  switch (region) {
    case 'CNMI':
      return 'bg-cyan-100 text-cyan-800';
    case 'GUAM':
      return 'bg-blue-100 text-blue-800';
    case 'FSM':
      return 'bg-green-100 text-green-800';
    case 'PALAU':
      return 'bg-purple-100 text-purple-800';
    case 'MARSHALL_ISLANDS':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function RegionalTalentFeed(props: RegionalTalentFeedProps) {
  const [filter, setFilter] = useState<'ALL' | 'MY_REGION' | 'OUTER_REGION' | 'CO_OP' | 'GENERAL'>('ALL');

  const filteredItems = props.items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'MY_REGION') return item.region === 'CNMI';
    if (filter === 'OUTER_REGION') return item.region !== 'CNMI';
    if (filter === 'CO_OP') return item.type === 'CO_OP_POSTING' || item.type === 'STUDENT_MILESTONE';
    if (filter === 'GENERAL') return item.type !== 'CO_OP_POSTING' && item.type !== 'STUDENT_MILESTONE';
    return true;
  });

  return (
    <div className="w-full space-y-4">
      {/* Filter Buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-3 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            filter === 'ALL'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Activity
        </button>
        <button
          onClick={() => setFilter('MY_REGION')}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            filter === 'MY_REGION'
              ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          My Region (CNMI)
        </button>
        <button
          onClick={() => setFilter('OUTER_REGION')}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            filter === 'OUTER_REGION'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Outer Region
        </button>
        <button
          onClick={() => setFilter('CO_OP')}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            filter === 'CO_OP'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          High School Co-Op
        </button>
        <button
          onClick={() => setFilter('GENERAL')}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            filter === 'GENERAL'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          General Jobs
        </button>
      </div>

      {/* Feed Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-blue-300 overflow-hidden"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start gap-4 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getItemColor(item.type)} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                  {getItemIcon(item.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.title}</h3>
                    <button
                      onClick={() => props.onViewDetails(item.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-200 transition-all whitespace-nowrap"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.description}</p>
                  
                  {/* Metadata */}
                  {item.metadata && (
                    <div className="flex flex-wrap gap-2 mb-3 text-xs">
                      {item.metadata.studentName && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                          👤 {item.metadata.studentName}
                        </span>
                      )}
                      {item.metadata.hoursCompleted && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                          ⏱️ {item.metadata.hoursCompleted} hours
                        </span>
                      )}
                      {item.metadata.employerName && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-semibold">
                          🏢 {item.metadata.employerName}
                        </span>
                      )}
                      {item.metadata.programName && (
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full font-semibold">
                          📚 {item.metadata.programName}
                        </span>
                      )}
                      {item.metadata.eventDate && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-semibold">
                          📅 {item.metadata.eventDate}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Footer */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className={`px-2 py-0.5 rounded-full font-bold ${getRegionColor(item.region)}`}>
                        {item.region}
                      </span>
                    </div>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-full border font-semibold ${getItemBadgeColor(item.type)}`}>
                      {item.type.replace(/_/g, ' ')}
                    </span>
                    <span>•</span>
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-semibold">No activity to display</p>
            <p className="text-gray-400 text-sm mt-2">
              {filter === 'ALL' ? 'Check back soon for regional updates' : `No ${filter.toLowerCase().replace('_', ' ')} activity at this time`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
