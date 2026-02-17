import { TrendingUp, Users, Eye, MessageSquare, ExternalLink } from 'lucide-react';

type ProgramMetrics = {
  views: number;
  clicks: number;
  inquiries: number;
  applications: number;
};

type CollegeProgram = {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  creditsAvailable: number;
  metrics: ProgramMetrics;
  isFeatured: boolean;
};

type ProgramPromotionCardProps = {
  program: CollegeProgram;
  availableCredits: number;
  onPromote: (programId: string) => void;
  onViewDetails: (programId: string) => void;
  onMessageInquiries: (programId: string) => void;
};

export function ProgramPromotionCard(props: ProgramPromotionCardProps) {
  const { program, availableCredits } = props;
  const canPromote = availableCredits >= program.creditsAvailable;

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-5 border-2 transition-all ${
      program.isFeatured 
        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' 
        : 'border-gray-100 hover:border-blue-300'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{program.name}</h3>
            {program.isFeatured && (
              <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-black">
                ⭐ FEATURED
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">{program.description}</p>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
              {program.category}
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full font-semibold">
              {program.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Eye className="w-3 h-3 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-blue-600">{program.metrics.views}</div>
          <div className="text-xs text-gray-600">Views</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ExternalLink className="w-3 h-3 text-purple-600" />
          </div>
          <div className="text-xl font-bold text-purple-600">{program.metrics.clicks}</div>
          <div className="text-xs text-gray-600">Clicks</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <MessageSquare className="w-3 h-3 text-orange-600" />
          </div>
          <div className="text-xl font-bold text-orange-600">{program.metrics.inquiries}</div>
          <div className="text-xs text-gray-600">Inquiries</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-3 h-3 text-green-600" />
          </div>
          <div className="text-xl font-bold text-green-600">{program.metrics.applications}</div>
          <div className="text-xs text-gray-600">Applied</div>
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="bg-white rounded-xl p-3 border border-gray-200 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-600">Conversion Rate</span>
          <span className="text-xs font-bold text-green-600">
            {program.metrics.views > 0 
              ? ((program.metrics.applications / program.metrics.views) * 100).toFixed(1) 
              : 0}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
            style={{
              width: program.metrics.views > 0 
                ? `${(program.metrics.applications / program.metrics.views) * 100}%` 
                : '0%'
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {!program.isFeatured ? (
          <button
            onClick={() => props.onPromote(program.id)}
            disabled={!canPromote}
            className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              canPromote
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Promote ({program.creditsAvailable} credits)
          </button>
        ) : (
          <button
            disabled
            className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-yellow-100 text-yellow-800 cursor-default"
          >
            ✓ Currently Featured
          </button>
        )}
        
        <button
          onClick={() => props.onViewDetails(program.id)}
          className="px-4 py-3 bg-blue-100 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-200 transition-all"
        >
          Details
        </button>
      </div>

      {program.metrics.inquiries > 0 && (
        <button
          onClick={() => props.onMessageInquiries(program.id)}
          className="w-full mt-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-xl font-semibold text-xs hover:bg-purple-200 transition-all flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          View {program.metrics.inquiries} Inquir{program.metrics.inquiries === 1 ? 'y' : 'ies'}
        </button>
      )}
    </div>
  );
}
