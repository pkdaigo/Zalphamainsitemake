import { useState } from 'react';
import { Play, Clock, Users, BookOpen, Video, CheckCircle, GraduationCap, Briefcase, Search, ArrowLeft, Star, ChevronRight, Bot, Shield, Award, TrendingUp, Calendar, FileText, Sparkles } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';
import { DIDAgent } from '@/app/components/DIDAgent';

interface VideoTutorialsProps {
  onNavigate: (page: string) => void;
  userType: 'student' | 'employer';
}

interface Tutorial {
  id: number;
  title: string;
  description: string;
  duration: string;
  views: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  topics: string[];
  videoUrl: string;
  transcript: string;
  keyTakeaways: string[];
  didAgentId?: string; // Optional D-ID agent ID for real video tutorials
}

const studentTutorials: Tutorial[] = [
  {
    id: 1,
    title: 'Getting Started with ZALPHA - Complete Setup Guide',
    description: 'Learn how to create your account, verify your ID, and set up your professional profile in under 15 minutes.',
    duration: '12:45',
    views: '15.2K',
    category: 'Getting Started',
    difficulty: 'Beginner',
    thumbnail: 'setup',
    topics: ['Account Creation', 'ID Verification', 'Profile Setup', 'Privacy Settings'],
    videoUrl: 'mock-video-1',
    transcript: 'Welcome to ZALPHA! In this tutorial, you\'ll learn how to get started on the platform. First, click "Sign Up" and choose "I\'m a Student". Enter your email, create a password, and verify your email address...',
    keyTakeaways: [
      'Complete ID verification within 24 hours for full access',
      'Upload a professional profile photo to increase visibility',
      'Fill out all profile sections to rank higher in searches',
      'Enable email notifications to never miss opportunities'
    ]
  },
  {
    id: 2,
    title: 'ID Verification Process - Quick & Easy',
    description: 'Step-by-step guide to completing your ID verification using your student ID, driver\'s license, or passport.',
    duration: '8:30',
    views: '12.8K',
    category: 'Getting Started',
    difficulty: 'Beginner',
    thumbnail: 'verification',
    topics: ['Document Upload', 'Accepted IDs', 'Verification Time', 'Troubleshooting'],
    videoUrl: 'mock-video-2',
    transcript: 'ID verification is required to ensure all students on ZALPHA are real verified individuals. Here\'s what you need: A valid student ID, driver\'s license, or passport. Take a clear photo in good lighting...',
    keyTakeaways: [
      'Verification usually takes 2-4 hours during business days',
      'Make sure your ID photo is clear and not blurry',
      'Your full name must match your government ID',
      'Contact support if verification takes longer than 24 hours'
    ]
  },
  {
    id: 3,
    title: 'Building Your Perfect Profile',
    description: 'Create a standout profile that attracts top employers in the Pacific region. Tips from hiring managers included!',
    duration: '18:20',
    views: '22.1K',
    category: 'Profile',
    difficulty: 'Beginner',
    thumbnail: 'profile',
    topics: ['Profile Photo', 'Work Experience', 'Skills', 'Portfolio', 'Keywords'],
    videoUrl: 'mock-video-3',
    transcript: 'Your profile is your digital resume. Employers in CNMI, FSM, Guam, and Hawaii are searching for talent like you. Here\'s how to stand out: Start with a professional profile photo - smile, good lighting, professional attire...',
    keyTakeaways: [
      'Profiles with photos get 5x more views than those without',
      'Use Pacific-specific keywords (e.g., "Guam experience")',
      'Highlight any bilingual or cultural competencies',
      'Update your profile monthly to stay at the top of searches'
    ]
  },
  {
    id: 4,
    title: 'Acing the Basic Skills Assessment',
    description: 'Everything you need to know about the required gamified skills test. Practice tips and strategies included!',
    duration: '15:40',
    views: '18.9K',
    category: 'Assessments',
    difficulty: 'Beginner',
    thumbnail: 'assessment',
    topics: ['Test Format', 'Time Management', 'Practice Mode', 'Scoring', 'Retakes'],
    videoUrl: 'mock-video-4',
    transcript: 'All high school graduates must complete the Basic Skills Assessment. Don\'t worry - it\'s designed to be engaging and game-like! The assessment covers: Reading comprehension, basic math, critical thinking, and communication...',
    keyTakeaways: [
      'You have 45 minutes to complete the assessment',
      'Use Practice Mode as many times as needed before taking the real test',
      'You can retake the assessment once every 30 days',
      'Scores are visible to employers to validate your skills'
    ]
  },
  {
    id: 5,
    title: 'Job Search Mastery - Finding Your Dream Job',
    description: 'Advanced search techniques, filters, and alerts to help you discover the perfect opportunities.',
    duration: '14:15',
    views: '16.5K',
    category: 'Job Search',
    difficulty: 'Intermediate',
    thumbnail: 'search',
    topics: ['Search Filters', 'Job Alerts', 'Saved Searches', 'Company Research'],
    videoUrl: 'mock-video-5',
    transcript: 'The ZALPHA job search is powerful! Let me show you how to use it effectively. First, use location filters to find jobs in your specific island or territory. You can search by: CNMI, FSM, Guam, or Hawaii...',
    keyTakeaways: [
      'Set up job alerts to get notified within minutes of new postings',
      'Use salary filters to focus on jobs within your desired range',
      'Read company reviews from other students before applying',
      'Save interesting jobs to apply later when you have more time'
    ]
  },
  {
    id: 6,
    title: 'Preparing for AI Video Interviews',
    description: 'Learn what to expect in AI-conducted first interviews and how to perform your best on camera.',
    duration: '16:50',
    views: '28.3K',
    category: 'Interviews',
    difficulty: 'Intermediate',
    thumbnail: 'ai-interview',
    topics: ['AI Interview Format', 'Camera Setup', 'Lighting', 'Common Questions', 'Do\'s and Don\'ts'],
    videoUrl: 'mock-video-6',
    transcript: 'Many ZALPHA employers use AI for first-round screening interviews. Here\'s what happens: The AI interviewer (Zee) will ask you 5-8 questions about your experience, skills, and fit for the role. You\'ll have time to think and respond...',
    keyTakeaways: [
      'AI interviews are available 24/7 - choose a time when you\'re alert',
      'Test your camera, microphone, and internet before starting',
      'Speak clearly and make eye contact with the camera',
      'The AI analyzes communication, enthusiasm, and technical knowledge'
    ]
  },
  {
    id: 7,
    title: 'Human Interview Success - Round 2 Strategies',
    description: 'You passed the AI screening! Now learn how to excel in your final interview with the hiring team.',
    duration: '20:15',
    views: '19.7K',
    category: 'Interviews',
    difficulty: 'Advanced',
    thumbnail: 'human-interview',
    topics: ['Cultural Fit', 'Team Dynamics', 'Questions to Ask', 'Follow-up', 'Negotiation'],
    videoUrl: 'mock-video-7',
    transcript: 'Congratulations on advancing to Round 2! The human interview is where cultural fit and personal connection matter most. Here\'s how to shine: Research the company thoroughly, understand Pacific business culture...',
    keyTakeaways: [
      'Research the company\'s mission and Pacific community involvement',
      'Prepare 3-5 thoughtful questions about team culture and growth',
      'Show enthusiasm for working in the Pacific region',
      'Send a thank-you email within 24 hours of your interview'
    ]
  },
  {
    id: 8,
    title: 'Using Zee - Your AI Career Assistant',
    description: 'Meet Zee, your 24/7 AI assistant! Get resume help, interview prep, and career advice anytime.',
    duration: '11:30',
    views: '14.2K',
    category: 'AI Tools',
    difficulty: 'Beginner',
    thumbnail: 'ki-assistant',
    topics: ['Resume Review', 'Interview Questions', 'Career Advice', 'Skill Recommendations'],
    videoUrl: 'mock-video-8',
    transcript: 'Zee is your personal AI career coach, available 24/7! Here\'s what Zee can help you with: Resume and profile optimization, practice interview questions with feedback, career path recommendations...',
    keyTakeaways: [
      'Zee can review your resume and suggest improvements instantly',
      'Practice unlimited interview questions with AI feedback',
      'Get personalized skill development recommendations',
      'Zee understands Pacific job market trends and requirements'
    ]
  },
  {
    id: 9,
    title: 'Company Reviews - Make Informed Decisions',
    description: 'Learn how to read and write reviews to help fellow students make smart career choices.',
    duration: '9:45',
    views: '11.8K',
    category: 'Community',
    difficulty: 'Beginner',
    thumbnail: 'reviews',
    topics: ['Reading Reviews', 'Writing Reviews', 'Verified Reviews', 'Rating System'],
    videoUrl: 'mock-video-9',
    transcript: 'ZALPHA has a student-driven review system. Only verified students who have interviewed or worked at a company can leave reviews. Here\'s how to use it: When researching companies, check their overall rating...',
    keyTakeaways: [
      'Only verified students can write reviews - no fake reviews!',
      'Look for patterns in reviews, not just single comments',
      'Write honest reviews after interviews to help other students',
      'Companies can respond to reviews to show accountability'
    ]
  },
  {
    id: 10,
    title: 'Virtual Job Fairs - Stand Out from the Crowd',
    description: 'Maximize your success at virtual job fairs with preparation tips, networking strategies, and follow-up tactics.',
    duration: '17:25',
    views: '13.4K',
    category: 'Events',
    difficulty: 'Intermediate',
    thumbnail: 'job-fair',
    topics: ['Fair Navigation', 'Booth Visits', 'Virtual Networking', 'Resume Drops', 'Follow-up'],
    videoUrl: 'mock-video-10',
    transcript: 'Virtual job fairs on ZALPHA connect you with dozens of employers in one day! Here\'s how to make the most of it: Before the fair, research participating companies and prioritize which booths to visit...',
    keyTakeaways: [
      'Register early and update your profile before the fair',
      'Prepare a 30-second elevator pitch about yourself',
      'Visit priority company booths early before they get crowded',
      'Follow up with recruiters within 48 hours after the fair'
    ]
  },
  {
    id: 11,
    title: 'Ultra Premium Features - Level Up Your Job Search',
    description: 'Discover exclusive features available to Ultra Premium students, including priority placement and advanced analytics.',
    duration: '13:10',
    views: '8.9K',
    category: 'Premium',
    difficulty: 'Advanced',
    thumbnail: 'premium',
    topics: ['Priority Placement', 'Advanced Analytics', 'Exclusive Jobs', 'Personal Branding'],
    videoUrl: 'mock-video-11',
    transcript: 'Ultra Premium membership gives you a competitive edge in the Pacific job market. Here\'s what you get: Your profile appears at the top of employer searches, access to exclusive job postings...',
    keyTakeaways: [
      'Ultra Premium profiles get 10x more employer views',
      'Access exclusive jobs not visible to regular members',
      'See who viewed your profile and when',
      'Get priority customer support and career coaching'
    ]
  },
  {
    id: 12,
    title: 'AI Courses - Learn In-Demand Skills',
    description: 'Take advantage of free AI-powered courses to build skills that Pacific employers are actively seeking.',
    duration: '10:55',
    views: '15.7K',
    category: 'Learning',
    difficulty: 'Beginner',
    thumbnail: 'courses',
    topics: ['Course Catalog', 'Certifications', 'Progress Tracking', 'Skill Badges'],
    videoUrl: 'mock-video-12',
    transcript: 'ZALPHA offers free AI-powered courses in skills that Pacific employers need most! Browse the course catalog by category: Customer Service, Technology, Healthcare, Hospitality, Business...',
    keyTakeaways: [
      'Complete courses to earn verified skill badges on your profile',
      'Courses are mobile-friendly - learn anywhere, anytime',
      'AI adapts course difficulty based on your progress',
      'Employers can see your completed courses when viewing your profile'
    ]
  }
];

const employerTutorials: Tutorial[] = [
  {
    id: 13,
    title: 'Getting Started - Employer Account Setup',
    description: 'Complete guide to setting up your company profile, choosing a subscription plan, and posting your first job.',
    duration: '15:30',
    views: '8.2K',
    category: 'Getting Started',
    difficulty: 'Beginner',
    thumbnail: 'employer-setup',
    topics: ['Company Profile', 'Subscription Plans', 'Payment Setup', 'Team Members'],
    videoUrl: 'mock-video-13',
    transcript: 'Welcome to ZALPHA! Let\'s get your company set up to hire verified Pacific talent. First, click "Employer Sign Up" and enter your company information. You\'ll need: Company name, industry, location...',
    keyTakeaways: [
      'Choose the Starter plan ($99/mo) to test the platform',
      'Add your company logo and description to attract candidates',
      'Invite team members to collaborate on hiring',
      'Verify your company email to unlock all features'
    ]
  },
  {
    id: 14,
    title: 'Subscription Plans Explained - Which is Right for You?',
    description: 'Compare Starter, Professional, Ultra Premium, and RPO Level plans to find the best fit for your hiring needs.',
    duration: '12:15',
    views: '6.9K',
    category: 'Getting Started',
    difficulty: 'Beginner',
    thumbnail: 'plans',
    topics: ['Plan Comparison', 'Pricing', 'Job Posting Limits', 'Feature Access'],
    videoUrl: 'mock-video-14',
    transcript: 'ZALPHA offers four subscription tiers to match your hiring volume and needs. Starter ($49.99/mo - LIMITED TIME): Up to 5 job postings, basic search, standard support. Professional ($249/mo): Up to 15 postings...',
    keyTakeaways: [
      'Starter is perfect for small businesses with occasional hiring',
      'Professional adds AI interviews and advanced analytics',
      'Ultra Premium includes virtual job fair hosting',
      'RPO Level provides dedicated recruiter support - contact sales'
    ]
  },
  {
    id: 15,
    title: 'Posting Jobs That Attract Top Talent',
    description: 'Learn how to write compelling job descriptions, set competitive salaries, and optimize for Pacific student searches.',
    duration: '18:45',
    views: '9.1K',
    category: 'Job Posting',
    difficulty: 'Intermediate',
    thumbnail: 'job-posting',
    topics: ['Job Titles', 'Descriptions', 'Salary Ranges', 'Requirements', 'SEO'],
    videoUrl: 'mock-video-15',
    transcript: 'A great job posting attracts qualified candidates and filters out poor fits. Here\'s the formula: Start with a clear, searchable job title. Instead of "Rock Star Developer", use "Software Developer - Full Stack"...',
    keyTakeaways: [
      'Use clear, industry-standard job titles for better search results',
      'List specific skills required vs. nice-to-have separately',
      'Include salary ranges - posts with salaries get 3x more applications',
      'Highlight Pacific-specific benefits like housing or relocation assistance'
    ]
  },
  {
    id: 16,
    title: 'Candidate Search & Filters Mastery',
    description: 'Advanced techniques for finding the perfect candidates using skills filters, location targeting, and verification status.',
    duration: '16:20',
    views: '7.5K',
    category: 'Recruiting',
    difficulty: 'Intermediate',
    thumbnail: 'candidate-search',
    topics: ['Search Filters', 'Boolean Search', 'Saved Searches', 'Candidate Matching'],
    videoUrl: 'mock-video-16',
    transcript: 'The ZALPHA candidate database is filled with verified Pacific talent. Here\'s how to search effectively: Start with the basic filters - location, skills, experience level. Then narrow down with advanced filters...',
    keyTakeaways: [
      'All candidates on ZALPHA are ID-verified - no fake profiles',
      'Use "Must Have" filters for required skills',
      'Save searches to get alerts when new matching candidates join',
      'Look for candidates with completed assessments for verified skills'
    ]
  },
  {
    id: 17,
    title: 'AI vs Human Interviews - Complete Guide',
    description: 'Understand ZALPHA\'s two-round interview system and when to use AI screening vs. human interviews.',
    duration: '22:35',
    views: '11.8K',
    category: 'Interviews',
    difficulty: 'Intermediate',
    thumbnail: 'interview-system',
    topics: ['Round 1 AI', 'Round 2 Human', 'Interview Scheduling', 'Company Policy', 'Best Practices'],
    videoUrl: 'mock-video-17',
    transcript: 'ZALPHA uses a two-round interview system designed to save you time while maintaining hiring quality. Round 1 - AI Screening: Available 24/7, AI conducts structured interviews with candidates...',
    keyTakeaways: [
      'AI interviews save 90% of recruiter time on first-round screening',
      'Company policy requires human interviews for final hiring decisions',
      'AI provides instant analysis with 5-metric scoring',
      'Human interviews ensure cultural fit and personal connection'
    ]
  },
  {
    id: 18,
    title: 'Setting Up AI Interviews - Step by Step',
    description: 'Configure AI interview questions, scoring criteria, and review settings for automated first-round screening.',
    duration: '19:10',
    views: '10.3K',
    category: 'Interviews',
    difficulty: 'Advanced',
    thumbnail: 'ai-setup',
    topics: ['Question Templates', 'Custom Questions', 'Scoring Weights', 'Red Flag Detection'],
    videoUrl: 'mock-video-18',
    transcript: 'Setting up AI interviews is easy! Navigate to "Schedule Interview" and select "AI Interview - Round 1". Choose your focus area: General screening, Technical skills, Customer service, or Communication skills...',
    keyTakeaways: [
      'Start with general screening templates, then customize as needed',
      'AI evaluates: communication, technical skills, cultural fit, enthusiasm',
      'Red flag detection identifies concerning responses automatically',
      'Full transcripts are provided for your review'
    ]
  },
  {
    id: 19,
    title: 'Reviewing AI Interview Results',
    description: 'Learn how to interpret AI analysis reports, scores, and recommendations to make informed hiring decisions.',
    duration: '14:50',
    views: '9.7K',
    category: 'Interviews',
    difficulty: 'Intermediate',
    thumbnail: 'ai-results',
    topics: ['Score Interpretation', 'Red Flags', 'Strengths/Concerns', 'Next Steps'],
    videoUrl: 'mock-video-19',
    transcript: 'After a candidate completes an AI interview, you\'ll receive a comprehensive analysis report. The overall score ranges from 1-5 and combines four key metrics. Here\'s what each score means: 4.5-5.0: Excellent candidate...',
    keyTakeaways: [
      'Scores of 4.0+ indicate candidates ready for Round 2',
      'Always read strengths and concerns, not just the overall score',
      'Pay attention to red flags - they indicate potential issues',
      'Use the transcript to verify AI analysis and get context'
    ]
  },
  {
    id: 20,
    title: 'Conducting Effective Human Interviews',
    description: 'Best practices for Round 2 interviews including cultural assessment, team collaboration, and final decision making.',
    duration: '21:40',
    views: '8.9K',
    category: 'Interviews',
    difficulty: 'Advanced',
    thumbnail: 'human-interviews',
    topics: ['Cultural Fit', 'Team Review', 'Rating System', 'Collaboration', 'Offers'],
    videoUrl: 'mock-video-20',
    transcript: 'Round 2 human interviews are where you make your final hiring decision. Here\'s how to conduct them effectively: Schedule 30-60 minutes, add team members as reviewers, prepare culture-fit questions...',
    keyTakeaways: [
      'Focus Round 2 on cultural fit and soft skills - AI covered technical',
      'Include multiple team members for diverse perspectives',
      'All interviews are recorded for team review',
      'Use the rating system to compare candidates objectively'
    ]
  },
  {
    id: 21,
    title: 'Cultural Sensitivity Training for Pacific Hiring',
    description: 'Essential training on Pacific Islander culture, communication styles, and how to create an inclusive hiring process.',
    duration: '25:15',
    views: '7.2K',
    category: 'Training',
    difficulty: 'Intermediate',
    thumbnail: 'cultural-training',
    topics: ['Pacific Culture', 'Communication Styles', 'Inclusive Hiring', 'Bias Reduction'],
    videoUrl: 'mock-video-21',
    transcript: 'Understanding Pacific Islander culture is crucial for effective hiring in CNMI, FSM, Guam, and Hawaii. Pacific culture emphasizes: Family and community, respect for elders, indirect communication...',
    keyTakeaways: [
      'Pacific candidates may use indirect communication - listen carefully',
      'Family obligations are important - offer flexibility when possible',
      'Respect for elders and hierarchy is valued in Pacific culture',
      'Cultural fit works both ways - ensure your company respects diversity'
    ]
  },
  {
    id: 22,
    title: 'Hosting Virtual Job Fairs - Complete Guide',
    description: 'Learn how to plan, promote, and host successful virtual job fairs to connect with hundreds of candidates in one day.',
    duration: '28:30',
    views: '5.8K',
    category: 'Events',
    difficulty: 'Advanced',
    thumbnail: 'hosting-fairs',
    topics: ['Planning', 'Booth Setup', 'Promotion', 'Live Chat', 'Follow-up', 'Analytics'],
    videoUrl: 'mock-video-22',
    transcript: 'Virtual job fairs on ZALPHA let you meet hundreds of candidates in a single day. Here\'s how to host one: First, ensure you have Ultra Premium or RPO Level subscription. Navigate to "Virtual Job Fairs"...',
    keyTakeaways: [
      'Plan your fair 3-4 weeks in advance for maximum attendance',
      'Customize your booth with videos, photos, and company info',
      'Have 2-3 recruiters available to manage live chat',
      'Follow up with promising candidates within 48 hours'
    ]
  },
  {
    id: 23,
    title: 'Analytics Dashboard - Data-Driven Hiring',
    description: 'Master your hiring metrics including time-to-hire, application rates, interview performance, and ROI tracking.',
    duration: '17:55',
    views: '6.4K',
    category: 'Analytics',
    difficulty: 'Advanced',
    thumbnail: 'analytics',
    topics: ['Metrics', 'Reports', 'Job Performance', 'Candidate Pipeline', 'ROI'],
    videoUrl: 'mock-video-23',
    transcript: 'The ZALPHA analytics dashboard gives you complete visibility into your hiring performance. Key metrics include: Job posting views and applications, candidate pipeline stages, time-to-hire by position...',
    keyTakeaways: [
      'Track which job postings get the most qualified applications',
      'Monitor time-to-hire and identify bottlenecks in your process',
      'Compare AI interview vs. manual screening efficiency',
      'Calculate cost-per-hire and platform ROI'
    ]
  },
  {
    id: 24,
    title: 'RPO Services - Dedicated Recruitment Support',
    description: 'Learn about ZALPHA\'s RPO (Recruitment Process Outsourcing) level, including dedicated recruiters and white-glove service.',
    duration: '13:25',
    views: '4.1K',
    category: 'Premium',
    difficulty: 'Advanced',
    thumbnail: 'rpo',
    topics: ['Dedicated Recruiters', 'Full-Service', 'White-Glove', 'Custom Solutions'],
    videoUrl: 'mock-video-24',
    transcript: 'RPO Level is our highest tier, designed for companies with high-volume or executive hiring needs. What\'s included: Dedicated recruiter assigned to your account, full candidate sourcing and screening...',
    keyTakeaways: [
      'RPO is ideal for hiring 10+ positions per year',
      'Dedicated recruiter acts as extension of your HR team',
      'We handle everything from sourcing to offer negotiation',
      'Contact sales for custom pricing based on your needs'
    ]
  }
];

export function VideoTutorials({ onNavigate, userType }: VideoTutorialsProps) {
  const [selectedVideo, setSelectedVideo] = useState<Tutorial | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingUserType, setViewingUserType] = useState<'student' | 'employer'>(userType);

  const tutorials = viewingUserType === 'student' ? studentTutorials : employerTutorials;

  const categories = Array.from(new Set(tutorials.map(t => t.category)));

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = activeCategory === 'all' || tutorial.category === activeCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getThumbnailGradient = (thumbnail: string) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-pink-600',
      'from-cyan-500 to-blue-600',
      'from-purple-500 to-pink-600',
      'from-yellow-500 to-orange-600',
      'from-teal-500 to-green-600',
      'from-pink-500 to-rose-600'
    ];
    return gradients[thumbnail.length % gradients.length];
  };

  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 md:py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Back Button */}
          <BackButton
            onClick={() => setSelectedVideo(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 md:mb-6 text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            Back to Tutorials
          </BackButton>

          {/* Video Player */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 md:mb-8">
            {/* D-ID Video Agent or Placeholder */}
            {selectedVideo.didAgentId ? (
              <div className="aspect-video bg-gray-900">
                <DIDAgent
                  agentType="custom"
                  agentId={selectedVideo.didAgentId}
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="bg-gray-900 aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className={`w-20 h-20 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br ${getThumbnailGradient(selectedVideo.thumbnail)} flex items-center justify-center`}>
                    <Play className="w-10 h-10 md:w-16 md:h-16 opacity-90" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold mb-2">{selectedVideo.title}</h3>
                  <p className="text-sm md:text-base text-gray-300">{selectedVideo.duration} • {selectedVideo.views} views</p>
                  <p className="text-xs text-gray-400 mt-4">Video coming soon - D-ID agent will be generated</p>
                </div>
              </div>
            )}

            <div className="p-4 md:p-8">
              {/* Video Info */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(selectedVideo.difficulty)}`}>
                  {selectedVideo.difficulty}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {selectedVideo.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedVideo.duration}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {selectedVideo.views} views
                </span>
              </div>

              <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{selectedVideo.title}</h1>
              <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6">{selectedVideo.description}</p>

              {/* Topics Covered */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.topics.map((topic, index) => (
                    <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs md:text-sm font-medium border border-blue-200">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-bold text-green-900 mb-3 md:mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {selectedVideo.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-green-800">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 text-green-600" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transcript */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  Video Transcript
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{selectedVideo.transcript}</p>
              </div>
            </div>
          </div>

          {/* Related Videos */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Related Tutorials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {tutorials
                .filter(t => t.category === selectedVideo.category && t.id !== selectedVideo.id)
                .slice(0, 3)
                .map(tutorial => (
                  <div
                    key={tutorial.id}
                    onClick={() => setSelectedVideo(tutorial)}
                    className="cursor-pointer group"
                  >
                    <div className={`aspect-video rounded-xl bg-gradient-to-br ${getThumbnailGradient(tutorial.thumbnail)} flex items-center justify-center mb-3 overflow-hidden relative`}>
                      <Play className="w-12 h-12 md:w-16 md:h-16 text-white opacity-80 group-hover:scale-110 transition-transform" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {tutorial.duration}
                      </div>
                    </div>
                    <h4 className="font-bold text-sm md:text-base text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {tutorial.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{tutorial.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => onNavigate(userType === 'student' ? 'student-dashboard' : 'employer-dashboard')}
            className="text-blue-600 hover:text-blue-700 font-semibold mb-4 text-sm md:text-base"
          >
            ← Back to Dashboard
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Video className="w-7 h-7 md:w-10 md:h-10 text-purple-600" />
                Video Tutorials
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Learn everything you need to succeed on ZALPHA with step-by-step video guides
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="flex gap-2 bg-white rounded-xl p-1 shadow-lg border-2 border-gray-200 w-full md:w-auto">
              <button
                onClick={() => setViewingUserType('student')}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-lg font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2 ${
                  viewingUserType === 'student'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                For Students
              </button>
              <button
                onClick={() => setViewingUserType('employer')}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-lg font-bold transition-all text-sm md:text-base flex items-center justify-center gap-2 ${
                  viewingUserType === 'employer'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                For Employers
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs md:text-sm font-semibold text-gray-600">Total Videos</h3>
                <Video className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{tutorials.length}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-green-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs md:text-sm font-semibold text-gray-600">Categories</h3>
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{categories.length}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs md:text-sm font-semibold text-gray-600">Total Views</h3>
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              </div>
              <div className="text-xl md:text-3xl font-bold text-gray-900">
                {viewingUserType === 'student' ? '195K' : '98K'}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-yellow-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs md:text-sm font-semibold text-gray-600">Avg Rating</h3>
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">4.9</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm transition-all ${
                  activeCategory === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Tutorials
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm transition-all ${
                    activeCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTutorials.map(tutorial => (
            <div
              key={tutorial.id}
              onClick={() => setSelectedVideo(tutorial)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all group"
            >
              {/* Thumbnail */}
              <div className={`aspect-video bg-gradient-to-br ${getThumbnailGradient(tutorial.thumbnail)} flex items-center justify-center relative`}>
                <Play className="w-12 h-12 md:w-16 md:h-16 text-white opacity-80 group-hover:scale-110 transition-transform" />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {tutorial.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
                  <span className="font-semibold">{tutorial.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {tutorial.views}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {tutorial.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">
                  {tutorial.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {tutorial.topics.slice(0, 3).map((topic, index) => (
                    <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                  {tutorial.topics.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                      +{tutorial.topics.length - 3}
                    </span>
                  )}
                </div>

                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold text-sm flex items-center justify-center gap-2">
                  Watch Tutorial
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No tutorials found</h3>
            <p className="text-gray-600">Try adjusting your search or category filters</p>
          </div>
        )}
      </div>
    </div>
  );
}