import { useState, useEffect } from 'react';
import { Brain, Zap, Target, Clock, Trophy, Star, CheckCircle, Lock, Play, RotateCcw, DollarSign, BookOpen, Crosshair, Heart, Dumbbell, Users, Crown } from 'lucide-react';

interface AssessmentGame {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration: number; // minutes
  skillsAssessed: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  score?: number;
  color: string;
}

interface SkillsAssessmentProps {
  isPremium: boolean;
  onUpgrade?: () => void;
  onNavigate?: (page: string) => void;
}

export function SkillsAssessment({ isPremium, onUpgrade, onNavigate }: SkillsAssessmentProps) {
  const [selectedGame, setSelectedGame] = useState<AssessmentGame | null>(null);
  const [isOptedIn, setIsOptedIn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const games: AssessmentGame[] = [
    {
      id: 'problem-solver',
      title: 'Problem Solver Quest',
      description: 'Navigate through business scenarios and make quick decisions. Tests logical thinking and problem-solving under time pressure.',
      icon: Brain,
      duration: 8,
      skillsAssessed: ['Critical Thinking', 'Problem Solving', 'Decision Making'],
      difficulty: 'Medium',
      completed: false,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'speed-typer',
      title: 'Data Entry Sprint',
      description: 'Type accurately and quickly! Process orders, enter data, and beat the clock. Measures typing speed and accuracy.',
      icon: Zap,
      duration: 5,
      skillsAssessed: ['Typing Speed', 'Attention to Detail', 'Data Entry'],
      difficulty: 'Easy',
      completed: true,
      score: 87,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'customer-hero',
      title: 'Customer Service Hero',
      description: 'Handle customer requests and complaints in a cafe simulation. Tests communication and multitasking skills.',
      icon: Target,
      duration: 10,
      skillsAssessed: ['Communication', 'Customer Service', 'Multitasking'],
      difficulty: 'Medium',
      completed: true,
      score: 92,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'pattern-master',
      title: 'Pattern Recognition',
      description: 'Find patterns in data sequences! Tests analytical thinking and attention to detail.',
      icon: Target,
      duration: 7,
      skillsAssessed: ['Analytical Thinking', 'Pattern Recognition', 'Logic'],
      difficulty: 'Hard',
      completed: false,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'priority-manager',
      title: 'Task Priority Manager',
      description: 'Organize tasks by urgency and importance. Tests time management and organizational skills.',
      icon: Clock,
      duration: 6,
      skillsAssessed: ['Time Management', 'Organization', 'Prioritization'],
      difficulty: 'Medium',
      completed: false,
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'team-builder',
      title: 'Team Builder Challenge',
      description: 'Assign team members to projects based on their skills. Tests leadership and team management.',
      icon: Trophy,
      duration: 8,
      skillsAssessed: ['Leadership', 'Team Management', 'Strategic Thinking'],
      difficulty: 'Hard',
      completed: false,
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: 'finance-wizard',
      title: 'Financial Literacy Challenge',
      description: 'Make budgeting decisions, calculate expenses, and manage finances in real-world scenarios. Tests financial knowledge and money management skills.',
      icon: DollarSign,
      duration: 9,
      skillsAssessed: ['Financial Literacy', 'Budgeting', 'Math Skills', 'Money Management'],
      difficulty: 'Medium',
      completed: false,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'english-master',
      title: 'English Proficiency Test',
      description: 'Demonstrate grammar, vocabulary, reading comprehension, and writing skills. Tests professional English communication abilities.',
      icon: BookOpen,
      duration: 12,
      skillsAssessed: ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Writing'],
      difficulty: 'Medium',
      completed: false,
      color: 'from-violet-500 to-purple-500',
    },
    {
      id: 'accuracy-champion',
      title: 'Accuracy & Precision Test',
      description: 'Spot errors in documents, verify data accuracy, and perform quality control tasks. Tests attention to detail and precision.',
      icon: Crosshair,
      duration: 7,
      skillsAssessed: ['Attention to Detail', 'Quality Control', 'Error Detection', 'Precision'],
      difficulty: 'Easy',
      completed: false,
      color: 'from-sky-500 to-blue-500',
    },
    {
      id: 'soft-skills',
      title: 'Workplace Soft Skills Assessment',
      description: 'Real-world scenarios testing teamwork, communication, conflict resolution, and professionalism. Learn how you handle workplace situations.',
      icon: Users,
      duration: 10,
      skillsAssessed: ['Teamwork', 'Communication', 'Conflict Resolution', 'Professionalism', 'Adaptability'],
      difficulty: 'Medium',
      completed: false,
      color: 'from-rose-500 to-pink-500',
    },
    {
      id: 'physical-abilities',
      title: 'Physical Abilities & Job Requirements',
      description: 'Self-assessment of physical capabilities for various job types. Helps match you with roles that fit your abilities (lifting, standing, mobility, etc.).',
      icon: Dumbbell,
      duration: 5,
      skillsAssessed: ['Physical Stamina', 'Lifting Capability', 'Mobility', 'Manual Dexterity'],
      difficulty: 'Easy',
      completed: false,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'workplace-readiness',
      title: 'Workplace Readiness & Reliability',
      description: 'Assess punctuality habits, work ethic, responsibility, and professional attitudes. Shows employers your commitment level.',
      icon: Heart,
      duration: 8,
      skillsAssessed: ['Reliability', 'Work Ethic', 'Punctuality', 'Responsibility', 'Attitude'],
      difficulty: 'Easy',
      completed: false,
      color: 'from-teal-500 to-cyan-500',
    },
  ];

  // Non-Premium View
  if (!isPremium) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-amber-200 relative overflow-hidden">
        {/* Premium Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-pink-600 text-white rounded-full text-xs font-bold">
            <Crown className="w-3 h-3" />
            PREMIUM
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Skills Assessment Games</h3>
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-gray-600 text-sm">
              Prove your skills through fun, game-style challenges that employers can see! (Premium Feature)
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-pink-50 border-2 border-amber-300 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Included in Premium ($6/month):
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span><strong>12 Skills Games:</strong> Typing, problem-solving, customer service, finance & more</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span><strong>Fun & Engaging:</strong> No stressful tests - designed like mobile games!</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span><strong>Employer Visibility:</strong> Verified scores displayed to employers</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span><strong>Earn Badges:</strong> "Workforce Ready" badges for 70%+ scores</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span><strong>Full Control:</strong> Opt-in/out anytime, retry games</span>
            </li>
          </ul>
        </div>

        {/* Game Previews */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {games.slice(0, 4).map((game) => {
            const Icon = game.icon;
            return (
              <div key={game.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-10" style={{ background: `linear-gradient(to bottom right, ${game.color})` }}></div>
                <div className="relative">
                  <Icon className="w-8 h-8 text-purple-600 mb-2" />
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{game.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{game.duration} min • {game.difficulty}</p>
                  <div className="absolute top-0 right-0">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onUpgrade}
          className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-bold text-lg"
        >
          Upgrade to Premium - $6/month
        </button>
      </div>
    );
  }

  // Opt-In Gate
  if (!isOptedIn) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Skills Assessment Games</h3>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                ULTRA PREMIUM
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Take fun, game-style challenges to showcase your skills to employers
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Trophy className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">How It Works (No Pressure!)</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Play 6 fun, game-style challenges (5-10 min each)</li>
                <li>• No boring tests - designed like mobile games!</li>
                <li>• Take at your own pace, retry anytime</li>
                <li>• Results are private until you choose to share</li>
                <li>• Only Ultra Premium employers can see scores</li>
                <li>• Opt-out anytime from your profile</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-purple-900 mb-3">🎮 Available Games:</h4>
          <div className="grid grid-cols-2 gap-3">
            {games.map((game) => {
              const Icon = game.icon;
              return (
                <div key={game.id} className="flex items-start gap-2">
                  <Icon className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{game.title}</p>
                    <p className="text-xs text-gray-600">{game.duration} min</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setIsOptedIn(true)}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          Start Playing Games
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Your scores stay private until you choose to share them with employers
        </p>
      </div>
    );
  }

  // Playing a specific game
  if (isPlaying && selectedGame) {
    return (
      <GamePlayer 
        game={selectedGame} 
        onComplete={(score) => {
          // Update game with score
          setIsPlaying(false);
          setSelectedGame(null);
        }}
        onExit={() => {
          setIsPlaying(false);
          setSelectedGame(null);
        }}
      />
    );
  }

  // Active Games Dashboard
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Skills Assessment Games</h3>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                <Play className="w-3 h-3" />
                ACTIVE
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Complete games to showcase your skills • {games.filter(g => g.completed).length}/{games.length} completed
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOptedIn(false)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Stop Sharing
        </button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-green-900 mb-1">
            {games.filter(g => g.completed).length}
          </div>
          <div className="text-sm text-green-700">Games Completed</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-900 mb-1">
            {Math.round(games.filter(g => g.completed).reduce((sum, g) => sum + (g.score || 0), 0) / games.filter(g => g.completed).length) || 0}
          </div>
          <div className="text-sm text-blue-700">Avg Score</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-purple-900 mb-1">
            {games.filter(g => !g.completed).length}
          </div>
          <div className="text-sm text-purple-700">Games Left</div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="space-y-4 mb-6">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              className={`border-2 rounded-xl p-6 transition-all ${
                game.completed 
                  ? 'border-green-200 bg-green-50/50' 
                  : 'border-purple-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50 hover:shadow-lg'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-14 h-14 bg-gradient-to-br ${game.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{game.title}</h4>
                      {game.completed && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Score: {game.score}%
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {game.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{game.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {game.skillsAssessed.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {game.duration} minutes
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  {game.completed ? (
                    <button
                      onClick={() => {
                        setSelectedGame(game);
                        setIsPlaying(true);
                      }}
                      className="px-4 py-2 border-2 border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-semibold flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retry
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedGame(game);
                        setIsPlaying(true);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg flex items-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Play Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Trophy className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800">
            <strong>Privacy:</strong> Your scores are only visible to Ultra Premium employers when you apply for jobs. 
            You can disable sharing anytime, and completed games remain in your profile for your reference.
          </p>
        </div>
      </div>
    </div>
  );
}

// Game Player Component
function GamePlayer({ game, onComplete, onExit }: { game: AssessmentGame; onComplete: (score: number) => void; onExit: () => void }) {
  const [timeLeft, setTimeLeft] = useState(game.duration * 60); // seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const Icon = game.icon;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-complete when time runs out
          const randomScore = Math.floor(Math.random() * 30) + 60; // 60-90
          onComplete(randomScore);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 overflow-hidden">
      {/* Game Header */}
      <div className={`bg-gradient-to-r ${game.color} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl">{game.title}</h3>
              <p className="text-sm text-white/80">Question {currentQuestion + 1} of 10</p>
            </div>
          </div>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg hover:bg-white/30 transition-colors font-semibold"
          >
            Exit Game
          </button>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-3 bg-white/20 backdrop-blur rounded-lg p-3">
          <Clock className="w-5 h-5" />
          <div className="flex-1">
            <div className="text-sm mb-1">Time Remaining</div>
            <div className="text-2xl font-bold">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm mb-1">Progress</div>
            <div className="text-2xl font-bold">{Math.round(((currentQuestion) / 10) * 100)}%</div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="p-8">
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
          <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">Game Interface Goes Here</h4>
          <p className="text-gray-600 mb-6">
            This would be the actual game content - interactive scenarios, typing tests, 
            problem-solving challenges, etc.
          </p>
          <button
            onClick={() => {
              if (currentQuestion < 9) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                // Complete game
                const randomScore = Math.floor(Math.random() * 30) + 70; // 70-100
                onComplete(randomScore);
              }
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-lg"
          >
            {currentQuestion < 9 ? 'Next Question' : 'Complete Game'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`bg-gradient-to-r ${game.color} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${((currentQuestion) / 10) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}