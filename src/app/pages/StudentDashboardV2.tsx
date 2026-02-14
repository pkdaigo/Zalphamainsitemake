/**
 * ZALPHA Student Dashboard V2 - Ultra-Easy Mobile First (390x844)
 * Features: AI Search, QR Scanner, One-Tap Actions, Auto-Portfolio, Remote Gigs, Gen Alpha Features
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Input } from '@/app/components/ui/input';
import {
  Search,
  QrCode,
  Home,
  Briefcase,
  MessageCircle,
  User,
  Bell,
  Clock,
  MapPin,
  TrendingUp,
  Award,
  Heart,
  Zap,
  Download,
  ExternalLink,
  Globe,
  DollarSign,
  CheckCircle,
  Calendar,
  Sparkles,
  Flag,
  FileText,
  Target,
} from 'lucide-react';

const studentData = {
  name: 'Maria Santos',
  avatar: 'MS',
  jurisdiction: 'CNMI',
  flag: '🇲🇵',
  zuid: 'Z-CNMI-2026-0142',
  school: 'Marianas High School',
  streak: 15,
  badges: ['50 Hours', 'Perfect Attendance', '15-Day Streak'],
  currentPlacement: {
    employer: 'Pacific Islands Hospital',
    role: 'Medical Records Assistant',
    hoursCompleted: 82,
    hoursRequired: 120,
    rating: 4.8,
  },
};

const remoteGigs = [
  { id: 1, title: 'Virtual Assistant', employer: 'TechCorp Manila', location: 'Remote - Philippines 🇵🇭', pay: '$8-12/hr', type: 'Part-time', verified: true },
  { id: 2, title: 'Customer Support Rep', employer: 'Global BPO Services', location: 'Remote - Asia Pacific 🌏', pay: '$7-10/hr', type: 'Full-time', verified: true },
  { id: 3, title: 'Social Media Manager', employer: 'Marketing Hub Tokyo', location: 'Remote - Japan 🇯🇵', pay: '$10-15/hr', type: 'Part-time', verified: false },
  { id: 4, title: 'Data Entry Specialist', employer: 'Pacific Tech Solutions', location: 'Hybrid - Guam 🇬🇺', pay: '$9-11/hr', type: 'Part-time', verified: true },
];

const aiSuggestions = [
  'Find co-op jobs near me',
  'How to clock in with GPS?',
  'Apply to remote jobs',
  'Check my hours status',
  'Generate my portfolio',
  'Message my supervisor',
];

interface StudentDashboardV2Props {
  onNavigate?: (page: string) => void;
}

export function StudentDashboardV2({ onNavigate }: StudentDashboardV2Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'jobs' | 'chat' | 'profile' | 'notifications'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showPulseChat, setShowPulseChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hey Maria! 👋 How can I help you today?' },
  ]);

  const progressPercentage = Math.round(
    (studentData.currentPlacement.hoursCompleted / studentData.currentPlacement.hoursRequired) * 100
  );

  const handleAIQuestion = (question: string) => {
    setChatMessages([...chatMessages, { role: 'user', text: question }]);
    
    setTimeout(() => {
      let response = '';
      if (question.toLowerCase().includes('clock in')) {
        response = '⏰ To clock in with GPS:\n1. Go to your placement page\n2. Tap the "Clock In" button\n3. Allow location access\n4. Confirm your location matches your work site\n5. Done! ✅ Your time will be logged automatically.';
      } else if (question.toLowerCase().includes('portfolio')) {
        response = '📁 I can auto-generate your portfolio! It will include:\n• Your completed hours & skills\n• Supervisor reviews\n• Achievements & badges\n• Work samples\n\nWant me to create it now?';
      } else {
        response = 'Great question! Let me help you with that. You can also browse our Help Center or message your coordinator. 😊';
      }
      setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 max-w-[390px] mx-auto">
      {/* Top Search Bar with AI */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Ask AI or search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowAISuggestions(true)}
              className="pl-9 pr-3 py-2 text-sm"
            />
            {searchQuery && (
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-pulse" />
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowQRScanner(true)}
            className="flex-shrink-0 w-10 h-10 p-0"
          >
            <QrCode className="w-5 h-5" />
          </Button>
        </div>

        {/* AI Autocomplete Suggestions */}
        {showAISuggestions && (
          <div className="absolute top-14 left-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 mt-1 z-40">
            <div className="p-2 space-y-1">
              {aiSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setShowAISuggestions(false);
                    setActiveTab('chat');
                    handleAIQuestion(suggestion);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
                <QrCode className="w-24 h-24 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Scan Z-UID QR Code</h3>
                <p className="text-sm text-gray-600 mt-1">Position QR code within the frame</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-900">
                  💡 Use this for instant clock-in, document signing, or quick access to your profile
                </p>
              </div>
              <Button onClick={() => setShowQRScanner(false)} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-4 pb-24 space-y-4">
        {activeTab === 'home' && (
          <>
            {/* Student Header Card with Flag */}
            <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-500 to-teal-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
                    {studentData.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{studentData.name}</h2>
                      <span className="text-2xl">{studentData.flag}</span>
                    </div>
                    <p className="text-sm text-white/90">{studentData.school}</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mt-2 inline-flex items-center gap-1">
                      <span className="text-xs font-medium">Z-UID:</span>
                      <span className="text-xs font-bold font-mono">{studentData.zuid}</span>
                    </div>
                  </div>
                </div>

                {/* Streak & Rating */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    <span className="font-bold text-lg">{studentData.streak}</span>
                    <span className="text-sm">day streak</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    <span className="font-bold">{studentData.currentPlacement.rating}</span>
                    <span className="text-sm">/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* One-Tap Quick Actions */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="flex-col h-auto py-3 gap-1">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-xs">Clock In</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-col h-auto py-3 gap-1">
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="text-xs">Portfolio</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-col h-auto py-3 gap-1">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-xs">Calendar</span>
                </Button>
              </CardContent>
            </Card>

            {/* Integration Cards */}
            <Card className="shadow-md border-l-4 border-l-blue-500">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-sm">Sync with Handshake</span>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 text-xs">
                    Connect
                  </Button>
                </div>
                <p className="text-xs text-gray-600">Import your applications and track all jobs in one place</p>
              </CardContent>
            </Card>

            {/* Current Placement Progress */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Current Placement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{studentData.currentPlacement.employer}</p>
                      <p className="text-sm text-gray-600">{studentData.currentPlacement.role}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-300">Active</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-bold text-blue-700">
                      {studentData.currentPlacement.hoursCompleted}/{studentData.currentPlacement.hoursRequired} hrs
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">{progressPercentage}% Complete</p>
                </div>
              </CardContent>
            </Card>

            {/* Gen Alpha Achievements */}
            <Card className="shadow-md bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {studentData.badges.map((badge, idx) => (
                    <div key={idx} className="flex-shrink-0 bg-white rounded-lg p-3 text-center min-w-[80px] border-2 border-purple-200">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-semibold text-gray-900">{badge}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'jobs' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Remote & Pacific Jobs
            </h2>

            {/* Auto-Portfolio Generator */}
            <Card className="shadow-md border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-teal-900 mb-1">Auto-Generate Portfolio</p>
                    <p className="text-xs text-teal-700 mb-3">
                      AI creates a professional portfolio from your hours, skills, and reviews
                    </p>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 w-full">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Generate Now (Free)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Remote Gigs List */}
            <div className="space-y-3">
              {remoteGigs.map((job) => (
                <Card key={job.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                            {job.verified && (
                              <CheckCircle className="w-4 h-4 text-green-600 fill-green-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{job.employer}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{job.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{job.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-green-700 font-bold">
                          <DollarSign className="w-4 h-4" />
                          {job.pay}
                        </span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 'chat' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              AI Assistant - Zee
            </h2>

            <Card className="shadow-md min-h-[400px] flex flex-col">
              <CardContent className="p-4 flex-1 space-y-3">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input placeholder="Ask Zee anything..." className="flex-1" />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'profile' && (
          <>
            <h2 className="text-lg font-bold text-gray-900">My Profile</h2>
            <Card className="shadow-md">
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-3">
                    {studentData.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{studentData.name}</h3>
                  <p className="text-sm text-gray-600">{studentData.school}</p>
                  <p className="text-xs text-gray-500 font-mono mt-2">{studentData.zuid}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{studentData.currentPlacement.hoursCompleted}</p>
                    <p className="text-xs text-gray-600">Total Hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{studentData.badges.length}</p>
                    <p className="text-xs text-gray-600">Badges Earned</p>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Edit Profile
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Portfolio
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'notifications' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Notifications
            </h2>
            <Card className="shadow-md">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Time log approved</p>
                    <p className="text-xs text-gray-600">Your 4-hour shift from Feb 12 was approved</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New badge unlocked!</p>
                    <p className="text-xs text-gray-600">You earned the "15-Day Streak" badge 🎉</p>
                    <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New remote job match</p>
                    <p className="text-xs text-gray-600">3 new jobs match your skills and interests</p>
                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Bottom Navigation - Thumb Friendly */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 shadow-lg max-w-[390px] mx-auto">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'jobs' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Briefcase className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'chat' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <MessageCircle className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] relative ${
              activeTab === 'notifications' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Bell className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Alerts</span>
            <span className="absolute top-2 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
