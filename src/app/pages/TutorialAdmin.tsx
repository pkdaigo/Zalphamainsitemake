import { useState, useEffect } from 'react';
import { ArrowLeft, Video, Search, Filter, RefreshCw, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { TutorialVideoGenerator } from '@/app/components/TutorialVideoGenerator';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface TutorialAdminProps {
  onNavigate: (page: string) => void;
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
}

// Import tutorial data
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
];

export function TutorialAdmin({ onNavigate }: TutorialAdminProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [generatedVideos, setGeneratedVideos] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859`;

  // Load existing tutorial videos
  useEffect(() => {
    loadGeneratedVideos();
  }, []);

  const loadGeneratedVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/did/tutorials`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const videos: Record<number, string> = {};
        
        data.tutorials.forEach((tutorial: any) => {
          videos[tutorial.tutorialId] = tutorial.agentId;
        });
        
        setGeneratedVideos(videos);
      }
    } catch (error) {
      console.error('Error loading generated videos:', error);
      toast.error('Failed to load generated videos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoGenerated = (tutorialId: number, agentId: string) => {
    setGeneratedVideos(prev => ({
      ...prev,
      [tutorialId]: agentId,
    }));
  };

  const categories = Array.from(new Set(studentTutorials.map(t => t.category)));

  const filteredTutorials = studentTutorials.filter(tutorial => {
    const matchesCategory = filterCategory === 'all' || tutorial.category === filterCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = {
    total: studentTutorials.length,
    generated: Object.keys(generatedVideos).length,
    pending: studentTutorials.length - Object.keys(generatedVideos).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <BackButton
          onClick={() => onNavigate('admin-dashboard')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 md:mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Admin Dashboard
        </BackButton>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tutorial Video Management</h1>
              <p className="text-gray-600 mt-1">Generate and manage D-ID video tutorials</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Generated Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.generated}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                Pending Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <Button
              variant="outline"
              onClick={loadGeneratedVideos}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Tutorial List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTutorials.map((tutorial) => (
              <TutorialVideoGenerator
                key={tutorial.id}
                tutorial={tutorial}
                onVideoGenerated={handleVideoGenerated}
                existingAgentId={generatedVideos[tutorial.id]}
              />
            ))}
          </div>
        )}

        {filteredTutorials.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tutorials found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-600" />
              About D-ID Tutorial Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>What are D-ID Tutorial Videos?</strong><br />
              D-ID creates realistic AI video avatars that present tutorial content with natural speech and facial expressions.
            </p>
            <p>
              <strong>How it works:</strong><br />
              • Click "Generate D-ID Video" to create an AI agent for each tutorial<br />
              • The agent uses the tutorial script and key takeaways to teach the content<br />
              • Students can interact with the video agent and ask questions<br />
              • Videos are streamed in real-time using WebRTC technology
            </p>
            <p>
              <strong>Note:</strong> Make sure your D-ID API key is configured in the environment variables before generating videos.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TutorialAdmin;
