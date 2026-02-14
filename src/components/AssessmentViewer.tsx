import { Trophy, Brain, Zap, Target, Clock, Star, Shield, Lock, TrendingUp } from 'lucide-react';

interface AssessmentResult {
  gameId: string;
  title: string;
  score: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  skillsAssessed: string[];
  completedDate: Date;
  icon: any;
  color: string;
  insights: string[];
}

interface AssessmentViewerProps {
  studentName: string;
  hasAccess: boolean;
  isEmployer?: boolean;
  onUpgrade?: () => void;
}

export function AssessmentViewer({ studentName, hasAccess, isEmployer = false, onUpgrade }: AssessmentViewerProps) {
  
  const mockResults: AssessmentResult[] = [
    {
      gameId: 'problem-solver',
      title: 'Problem Solver Quest',
      score: 89,
      difficulty: 'Medium',
      skillsAssessed: ['Critical Thinking', 'Problem Solving', 'Decision Making'],
      completedDate: new Date('2024-01-15'),
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      insights: [
        'Consistently chose optimal solutions',
        'Fast decision-making under pressure',
        'Strong analytical reasoning'
      ]
    },
    {
      gameId: 'speed-typer',
      title: 'Data Entry Sprint',
      score: 87,
      difficulty: 'Easy',
      skillsAssessed: ['Typing Speed', 'Attention to Detail', 'Data Entry'],
      completedDate: new Date('2024-01-12'),
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      insights: [
        '72 WPM typing speed',
        '96% accuracy rate',
        'Excellent for data entry roles'
      ]
    },
    {
      gameId: 'customer-hero',
      title: 'Customer Service Hero',
      score: 92,
      difficulty: 'Medium',
      skillsAssessed: ['Communication', 'Customer Service', 'Multitasking'],
      completedDate: new Date('2024-01-18'),
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      insights: [
        'Handled multiple customers simultaneously',
        'Empathetic communication style',
        'Quick problem resolution'
      ]
    },
  ];

  const averageScore = Math.round(mockResults.reduce((sum, r) => sum + r.score, 0) / mockResults.length);

  // No results shared
  if (mockResults.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No assessment results available</p>
      </div>
    );
  }

  // Employer without access
  if (isEmployer && !hasAccess) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">Skills Assessment Results Available</h4>
            <p className="text-sm text-gray-700 mb-3">
              {studentName} has completed {mockResults.length} gamified skills assessments.
              Upgrade to Ultra Premium to see detailed performance metrics and efficiency scores.
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {mockResults.map((result) => {
            const Icon = result.icon;
            return (
              <div key={result.gameId} className="bg-white border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{result.title}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        result.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        result.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {result.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Completed {result.completedDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded border border-gray-300">
                    <div className="text-center">
                      <Lock className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Locked</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-purple-100 border border-purple-300 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-purple-900 mb-2">🎮 What You'll Get:</h4>
          <ul className="space-y-1 text-sm text-purple-800">
            <li>✓ Detailed performance scores & percentiles</li>
            <li>✓ Typing speed, accuracy, and efficiency metrics</li>
            <li>✓ Problem-solving ability scores</li>
            <li>✓ Customer service simulation results</li>
            <li>✓ Real-world skill validation</li>
            <li>✓ Time management & multitasking scores</li>
          </ul>
        </div>

        <button 
          onClick={onUpgrade}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg"
        >
          Upgrade to Ultra Premium
        </button>
      </div>
    );
  }

  // Full access view
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Skills Assessment Results</h3>
            <p className="text-purple-100 text-sm">{mockResults.length} games completed</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold mb-1">{averageScore}%</div>
            <div className="text-sm text-purple-100">Average Score</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold mb-1">Top 15%</div>
            <div className="text-sm text-purple-100">Percentile</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold mb-1">{mockResults.length}</div>
            <div className="text-sm text-purple-100">Assessments</div>
          </div>
        </div>
      </div>

      {/* Individual Results */}
      {mockResults.map((result) => {
        const Icon = result.icon;
        return (
          <div key={result.gameId} className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-14 h-14 bg-gradient-to-br ${result.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-gray-900 text-lg">{result.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      result.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      result.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {result.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {result.skillsAssessed.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600">
                    Completed on {result.completedDate.toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Score Badge */}
              <div className="ml-4">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={result.score >= 90 ? '#10B981' : result.score >= 70 ? '#3B82F6' : '#6B7280'}
                      strokeWidth="3"
                      strokeDasharray={`${result.score}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{result.score}</div>
                      <div className="text-xs text-gray-600">Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <h5 className="font-bold text-gray-900 text-sm">Performance Insights</h5>
              </div>
              <ul className="space-y-2">
                {result.insights.map((insight, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <Star className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Performance</span>
                <span className="font-medium">{result.score >= 90 ? 'Excellent' : result.score >= 70 ? 'Good' : 'Average'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${result.color} h-2 rounded-full transition-all`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Overall Recommendation */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-green-900 mb-2">Hiring Recommendation</h4>
            <p className="text-sm text-green-800 mb-3">
              Based on assessment results, <strong>{studentName}</strong> demonstrates:
            </p>
            <ul className="space-y-1 text-sm text-green-800">
              <li>✓ <strong>Strong problem-solving skills</strong> - Top 15% of test-takers</li>
              <li>✓ <strong>Excellent typing efficiency</strong> - 72 WPM with high accuracy</li>
              <li>✓ <strong>Outstanding customer service</strong> - 92% score in simulations</li>
              <li>✓ <strong>Verified skills</strong> - All assessments independently validated</li>
            </ul>
            <p className="text-sm text-green-800 mt-3">
              <strong>Recommendation:</strong> Highly suitable for customer-facing roles, data entry positions, 
              and roles requiring quick decision-making under pressure.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800">
            {isEmployer ? (
              <>
                <strong>Ultra Premium Feature:</strong> Assessment results are only available to verified Ultra Premium 
                employers. Students opt-in to share these results and can disable access at any time.
              </>
            ) : (
              <>
                <strong>Your Privacy:</strong> Assessment results are only visible to Ultra Premium employers 
                when you apply. You can disable sharing at any time from your profile.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
