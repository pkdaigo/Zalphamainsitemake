import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  BookOpen,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Target,
  Brain,
  Code,
  BarChart3,
  Globe,
  Lock,
  Unlock,
  Play,
  ChevronRight,
  Sparkles,
  Zap,
  Database,
  Cpu,
  LineChart,
  PenTool,
  MessageSquare,
  Shield,
  Briefcase,
} from 'lucide-react';

interface CertificationModulesPanelProps {
  studentLevel: 'high-school' | 'college';
}

export function CertificationModulesPanel({ studentLevel }: CertificationModulesPanelProps) {
  const [enrolledModules, setEnrolledModules] = useState<Set<string>>(new Set());
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'tech' | 'business' | 'creative'>('all');

  // Mock certification modules
  const certificationModules = [
    {
      id: 'cert_1',
      title: 'AI Fundamentals & ChatGPT Essentials',
      provider: 'Google AI',
      category: 'ai',
      difficulty: 'Beginner',
      duration: '4 weeks',
      hoursPerWeek: '3-5 hours',
      modules: 8,
      completedModuleCount: 0,
      description:
        'Learn the basics of artificial intelligence, machine learning, and how to effectively use AI tools like ChatGPT for productivity.',
      skills: ['AI Basics', 'Prompt Engineering', 'ChatGPT', 'Machine Learning Concepts'],
      certificationName: 'Google AI Essentials Certificate',
      isFree: true,
      isPopular: true,
      prerequisite: 'None',
      careerRelevance: 'High - AI skills are in demand across all industries',
    },
    {
      id: 'cert_2',
      title: 'AI Image Generation & Design (Midjourney, DALL-E)',
      provider: 'Adobe Creative Cloud',
      category: 'ai',
      difficulty: 'Beginner',
      duration: '3 weeks',
      hoursPerWeek: '4-6 hours',
      modules: 6,
      completedModuleCount: 0,
      description:
        'Master AI-powered image generation tools and learn how to create stunning visuals using text prompts.',
      skills: ['Midjourney', 'DALL-E', 'AI Art', 'Prompt Design', 'Visual Design'],
      certificationName: 'AI Design Specialist Certificate',
      isFree: true,
      isPopular: true,
      prerequisite: 'None',
      careerRelevance: 'High - Essential for modern design and marketing roles',
    },
    {
      id: 'cert_3',
      title: 'Data Analytics with AI Tools',
      provider: 'Microsoft Learn',
      category: 'ai',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      hoursPerWeek: '5-7 hours',
      modules: 10,
      completedModuleCount: 0,
      description:
        'Use AI-powered tools to analyze data, create visualizations, and generate insights for business decisions.',
      skills: ['Data Analysis', 'Excel AI', 'Power BI', 'Predictive Analytics'],
      certificationName: 'Microsoft AI Data Analyst Certificate',
      isFree: true,
      isPopular: true,
      prerequisite: 'Basic Excel knowledge',
      careerRelevance: 'Very High - Data analysts needed in every industry',
    },
    {
      id: 'cert_4',
      title: 'Python Programming for Beginners',
      provider: 'Codecademy',
      category: 'tech',
      difficulty: 'Beginner',
      duration: '8 weeks',
      hoursPerWeek: '5-7 hours',
      modules: 12,
      completedModuleCount: 0,
      description:
        'Learn Python programming from scratch - the most popular programming language for AI, data science, and web development.',
      skills: ['Python', 'Programming Basics', 'Problem Solving', 'Debugging'],
      certificationName: 'Python Programming Certificate',
      isFree: true,
      isPopular: true,
      prerequisite: 'None',
      careerRelevance: 'Very High - Python is the #1 in-demand programming skill',
    },
    {
      id: 'cert_5',
      title: 'Digital Marketing & Social Media Strategy',
      provider: 'HubSpot Academy',
      category: 'business',
      difficulty: 'Beginner',
      duration: '4 weeks',
      hoursPerWeek: '3-5 hours',
      modules: 7,
      completedModuleCount: 0,
      description:
        'Master digital marketing fundamentals including SEO, social media marketing, content strategy, and analytics.',
      skills: ['SEO', 'Social Media', 'Content Marketing', 'Google Analytics'],
      certificationName: 'HubSpot Digital Marketing Certificate',
      isFree: true,
      isPopular: true,
      prerequisite: 'None',
      careerRelevance: 'High - Every business needs digital marketing',
    },
    {
      id: 'cert_6',
      title: 'Cybersecurity Fundamentals',
      provider: 'Cisco Networking Academy',
      category: 'tech',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      hoursPerWeek: '4-6 hours',
      modules: 9,
      completedModuleCount: 0,
      description:
        'Learn cybersecurity basics, threat detection, data protection, and network security principles.',
      skills: ['Cybersecurity', 'Network Security', 'Threat Detection', 'Data Protection'],
      certificationName: 'Cisco Cybersecurity Essentials Certificate',
      isFree: true,
      isPopular: false,
      prerequisite: 'Basic computer skills',
      careerRelevance: 'Very High - Critical skill shortage globally',
    },
    {
      id: 'cert_7',
      title: 'AI-Powered Content Creation & Copywriting',
      provider: 'Jasper AI',
      category: 'ai',
      difficulty: 'Beginner',
      duration: '3 weeks',
      hoursPerWeek: '3-4 hours',
      modules: 5,
      completedModuleCount: 0,
      description:
        'Learn to create compelling content using AI writing tools for blogs, social media, marketing, and more.',
      skills: ['AI Writing', 'Copywriting', 'Content Strategy', 'SEO Writing'],
      certificationName: 'AI Content Creator Certificate',
      isFree: true,
      isPopular: true,
      prerequisite: 'None',
      careerRelevance: 'High - Content creation is essential for all businesses',
    },
    {
      id: 'cert_8',
      title: 'Video Editing & Production',
      provider: 'Adobe Creative Cloud',
      category: 'creative',
      difficulty: 'Intermediate',
      duration: '5 weeks',
      hoursPerWeek: '5-7 hours',
      modules: 8,
      completedModuleCount: 0,
      description:
        'Master video editing with Adobe Premiere Pro and After Effects for social media, YouTube, and professional projects.',
      skills: ['Video Editing', 'Premiere Pro', 'After Effects', 'Storytelling'],
      certificationName: 'Adobe Video Production Certificate',
      isFree: false,
      isPopular: true,
      prerequisite: 'Basic computer skills',
      careerRelevance: 'High - Video is the most engaging content format',
    },
    {
      id: 'cert_9',
      title: 'Project Management Essentials',
      provider: 'Google Career Certificates',
      category: 'business',
      difficulty: 'Beginner',
      duration: '6 weeks',
      hoursPerWeek: '4-6 hours',
      modules: 10,
      completedModuleCount: 0,
      description:
        'Learn project management fundamentals, Agile methodology, and collaboration tools used by top companies.',
      skills: ['Project Management', 'Agile', 'Scrum', 'Team Collaboration'],
      certificationName: 'Google Project Management Certificate',
      isFree: true,
      isPopular: true,
      prerequisite: 'None',
      careerRelevance: 'Very High - Every industry needs project managers',
    },
    {
      id: 'cert_10',
      title: 'UI/UX Design with Figma',
      provider: 'Figma Design',
      category: 'creative',
      difficulty: 'Beginner',
      duration: '4 weeks',
      hoursPerWeek: '4-5 hours',
      modules: 7,
      completedModuleCount: 0,
      description:
        'Learn user interface and user experience design principles using Figma, the industry-standard design tool.',
      skills: ['UI Design', 'UX Design', 'Figma', 'Prototyping', 'User Research'],
      certificationName: 'Figma UI/UX Design Certificate',
      isFree: true,
      isPopular: true,
      prerequisite: 'None',
      careerRelevance: 'Very High - UI/UX designers in high demand',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Modules', icon: BookOpen, color: 'blue' },
    { id: 'ai', label: 'AI & Machine Learning', icon: Brain, color: 'purple' },
    { id: 'tech', label: 'Technology', icon: Code, color: 'cyan' },
    { id: 'business', label: 'Business', icon: Briefcase, color: 'green' },
    { id: 'creative', label: 'Creative', icon: PenTool, color: 'pink' },
  ];

  const filteredModules = certificationModules.filter((module) =>
    selectedCategory === 'all' ? true : module.category === selectedCategory
  );

  const handleEnroll = (moduleId: string) => {
    setEnrolledModules(new Set([...enrolledModules, moduleId]));
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai':
        return Brain;
      case 'tech':
        return Code;
      case 'business':
        return Briefcase;
      case 'creative':
        return PenTool;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black flex items-center gap-2">
              Certification Modules
              <Sparkles className="w-5 h-5" />
            </h2>
            <p className="text-purple-100 text-sm mt-1">
              Build in-demand skills • Earn certificates • Boost your career
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">{certificationModules.length}</div>
            <div className="text-purple-100 text-sm">Available Courses</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">{enrolledModules.size}</div>
            <div className="text-purple-100 text-sm">Enrolled</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">{completedModules.size}</div>
            <div className="text-purple-100 text-sm">Completed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-black mb-1">
              {certificationModules.filter((m) => m.isFree).length}
            </div>
            <div className="text-purple-100 text-sm">Free Courses</div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Why Certifications Matter for Pacific Youth
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Compete Globally:</strong> Recognized certificates from Google, Microsoft, Adobe, and more
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Remote Work Ready:</strong> Learn skills that allow you to work from anywhere
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Higher Earnings:</strong> Certified professionals earn 15-30% more on average
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Stay in the Pacific:</strong> Qualify for high-paying remote and local jobs without leaving
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
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Module Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredModules.map((module, index) => {
          const isEnrolled = enrolledModules.has(module.id);
          const isCompleted = completedModules.has(module.id);
          const Icon = getCategoryIcon(module.category);

          return (
            <motion.div
              key={module.id}
              className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden hover:shadow-md transition ${
                module.isPopular ? 'border-yellow-400' : 'border-slate-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {module.isPopular && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">Popular Course</span>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{module.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">{module.provider}</span>
                    </div>
                  </div>
                  {module.isFree && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      FREE
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 mb-4">{module.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>{module.hoursPerWeek}/week</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <BookOpen className="w-4 h-4 text-green-600" />
                    <span>{module.modules} modules</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${getDifficultyColor(
                        module.difficulty
                      )}`}
                    >
                      {module.difficulty}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs font-semibold text-slate-700 mb-2">Skills You'll Learn:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {module.skills.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 mb-1">
                        Certificate: {module.certificationName}
                      </div>
                      <div className="text-xs text-slate-600">
                        Career Relevance: {module.careerRelevance}
                      </div>
                    </div>
                  </div>
                </div>

                {isEnrolled ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Progress</span>
                      <span className="text-sm text-slate-600">
                        {module.completedModuleCount}/{module.modules} modules
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                        style={{
                          width: `${(module.completedModuleCount / module.modules) * 100}%`,
                        }}
                      />
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Continue Learning
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEnroll(module.id)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Enroll Now
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Summary */}
      {enrolledModules.size > 0 && (
        <motion.div
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Your Learning Journey</h3>
              <p className="text-slate-600 text-sm">Keep learning to unlock new career opportunities!</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-3xl font-black text-purple-600">{enrolledModules.size}</div>
              <div className="text-sm text-slate-600">Courses Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-600">{completedModules.size}</div>
              <div className="text-sm text-slate-600">Certificates Earned</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-600">
                {Math.round((completedModules.size / enrolledModules.size) * 100) || 0}%
              </div>
              <div className="text-sm text-slate-600">Completion Rate</div>
            </div>
            <div>
              <div className="text-3xl font-black text-orange-600">
                {enrolledModules.size * 40}
              </div>
              <div className="text-sm text-slate-600">Learning Hours</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
