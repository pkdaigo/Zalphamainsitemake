import { Bot, Sparkles, Star, ThumbsUp, AlertTriangle, TrendingUp, TrendingDown, CheckCircle, AlertCircle, XCircle, MessageSquare, User } from 'lucide-react';

interface AIAnalysis {
  overallScore: number;
  communication: number;
  technicalSkills: number;
  culturalFit: number;
  enthusiasm: number;
  redFlags: string[];
  strengths: string[];
  concerns: string[];
  recommendation: string;
  transcript: string;
}

interface AIAnalysisSectionProps {
  aiAnalysis: AIAnalysis;
  onScheduleRound2: () => void;
}

export function AIAnalysisSection({ aiAnalysis, onScheduleRound2 }: AIAnalysisSectionProps) {
  return (
    <div className="mb-4 md:mb-6">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
        <Bot className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />
        AI Analysis Report
      </h3>

      {/* Overall Score and Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
        {/* Overall Score Card */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm md:text-base font-semibold text-cyan-900">Overall Score</h4>
            <Sparkles className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="text-4xl md:text-5xl font-bold text-cyan-700 mb-2">
            {aiAnalysis.overallScore.toFixed(1)}
            <span className="text-xl md:text-2xl text-cyan-600">/5.0</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 md:w-5 md:h-5 ${
                  star <= Math.round(aiAnalysis.overallScore)
                    ? 'fill-cyan-500 text-cyan-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Recommendation Card */}
        <div className={`border-2 rounded-xl p-4 md:p-6 ${
          aiAnalysis.recommendation.toLowerCase().includes('recommend')
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
            : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {aiAnalysis.recommendation.toLowerCase().includes('recommend') ? (
              <ThumbsUp className="w-5 h-5 text-green-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            )}
            <h4 className={`text-sm md:text-base font-semibold ${
              aiAnalysis.recommendation.toLowerCase().includes('recommend')
                ? 'text-green-900'
                : 'text-red-900'
            }`}>
              AI Recommendation
            </h4>
          </div>
          <p className={`text-sm md:text-base font-medium ${
            aiAnalysis.recommendation.toLowerCase().includes('recommend')
              ? 'text-green-800'
              : 'text-red-800'
          }`}>
            {aiAnalysis.recommendation}
          </p>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6 mb-3 md:mb-4">
        <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Detailed Metrics</h4>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-purple-50 rounded-lg p-3 md:p-4 border border-purple-200">
            <div className="text-xs md:text-sm text-purple-700 font-medium mb-1">Communication</div>
            <div className="text-2xl md:text-3xl font-bold text-purple-900">
              {aiAnalysis.communication.toFixed(1)}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-200">
            <div className="text-xs md:text-sm text-blue-700 font-medium mb-1">Technical Skills</div>
            <div className="text-2xl md:text-3xl font-bold text-blue-900">
              {aiAnalysis.technicalSkills.toFixed(1)}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 md:p-4 border border-green-200">
            <div className="text-xs md:text-sm text-green-700 font-medium mb-1">Cultural Fit</div>
            <div className="text-2xl md:text-3xl font-bold text-green-900">
              {aiAnalysis.culturalFit.toFixed(1)}
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 md:p-4 border border-yellow-200">
            <div className="text-xs md:text-sm text-yellow-700 font-medium mb-1">Enthusiasm</div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-900">
              {aiAnalysis.enthusiasm.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 md:p-6 mb-3 md:mb-4">
        <h4 className="text-base md:text-lg font-bold text-green-900 mb-2 md:mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Strengths
        </h4>
        <ul className="space-y-2">
          {aiAnalysis.strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-2 text-sm md:text-base text-green-800">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 text-green-600" />
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Concerns */}
      {aiAnalysis.concerns.length > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 md:p-6 mb-3 md:mb-4">
          <h4 className="text-base md:text-lg font-bold text-yellow-900 mb-2 md:mb-3 flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Areas of Concern
          </h4>
          <ul className="space-y-2">
            {aiAnalysis.concerns.map((concern, index) => (
              <li key={index} className="flex items-start gap-2 text-sm md:text-base text-yellow-800">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 text-yellow-600" />
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Red Flags */}
      {aiAnalysis.redFlags.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 md:p-6 mb-3 md:mb-4">
          <h4 className="text-base md:text-lg font-bold text-red-900 mb-2 md:mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Red Flags
          </h4>
          <ul className="space-y-2">
            {aiAnalysis.redFlags.map((flag, index) => (
              <li key={index} className="flex items-start gap-2 text-sm md:text-base text-red-800">
                <XCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 text-red-600" />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Interview Transcript */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 md:p-6">
        <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          Interview Transcript
        </h4>
        <div className="bg-white rounded-lg p-3 md:p-4 max-h-60 overflow-y-auto">
          <pre className="text-xs md:text-sm text-gray-700 whitespace-pre-wrap font-sans">
            {aiAnalysis.transcript}
          </pre>
        </div>
      </div>

      {/* Schedule Round 2 Button for AI Interviews */}
      {aiAnalysis.recommendation.toLowerCase().includes('recommend') && (
        <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-4 md:p-6">
          <h4 className="text-base md:text-lg font-bold text-purple-900 mb-2">Ready for Round 2?</h4>
          <p className="text-sm md:text-base text-purple-800 mb-3 md:mb-4">
            This candidate passed AI screening. Schedule a human interview to make your final decision.
          </p>
          <button 
            onClick={onScheduleRound2}
            className="w-full px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-bold text-sm md:text-base flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4 md:w-5 md:h-5" />
            Schedule Human Interview (Round 2)
          </button>
        </div>
      )}
    </div>
  );
}
