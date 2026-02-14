/**
 * ZALPHA Employer Dashboard V2 - Ultra-Easy Mobile First (390x844)
 * Features: AI Search, Swipe Actions, Free Co-Op Banner, Z-Credits Upsell, Verified Reviews, ATS Integration
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import {
  Search,
  QrCode,
  Home,
  Clock,
  MessageCircle,
  User,
  Bell,
  Users,
  CheckCircle,
  XCircle,
  Star,
  ExternalLink,
  Download,
  Sparkles,
  Building,
  Award,
  DollarSign,
  Calendar,
  FileText,
  Zap,
} from 'lucide-react';

const employerData = {
  name: 'Pacific Islands Hospital',
  logo: 'PIH',
  totalStudents: 5,
  verified: true,
  rating: 4.8,
  reviewCount: 23,
};

const pendingTimeLogs = [
  {
    id: 1,
    studentName: 'Maria Santos',
    zuid: 'Z-CNMI-2026-0142',
    date: '2026-02-12',
    hours: 3,
    tasks: 'Organized patient files, updated digital records',
    avatar: 'MS',
  },
  {
    id: 2,
    studentName: 'John Pangelinan',
    zuid: 'Z-CNMI-2026-0098',
    date: '2026-02-13',
    hours: 4,
    tasks: 'Assisted with inventory management',
    avatar: 'JP',
  },
];

const studentTrainees = [
  {
    id: 1,
    name: 'Maria Santos',
    zuid: 'Z-CNMI-2026-0142',
    avatar: 'MS',
    jurisdiction: 'CNMI 🇲🇵',
    totalHours: 82,
    rating: 4.8,
    status: 'active' as const,
  },
  {
    id: 2,
    name: 'John Pangelinan',
    zuid: 'Z-CNMI-2026-0098',
    avatar: 'JP',
    jurisdiction: 'CNMI 🇲🇵',
    totalHours: 95,
    rating: 4.5,
    status: 'active' as const,
  },
];

const zCreditUpsells = [
  { name: 'AI Video Interviews', price: 10, unit: 'per interview', icon: Sparkles },
  { name: 'Priority Job Posting', price: 15, unit: 'per post', icon: Star },
  { name: 'Pre-Screening Service', price: 5, unit: 'per candidate', icon: CheckCircle },
  { name: 'Advanced Analytics', price: 25, unit: 'per month', icon: Award },
];

const aiSuggestions = [
  'Approve all pending logs',
  'Export ATS data',
  'Find qualified students',
  'Schedule evaluations',
  'Sync with BambooHR',
  'View student reviews',
];

interface EmployerDashboardV2Props {
  onNavigate?: (page: string) => void;
}

export function EmployerDashboardV2({ onNavigate }: EmployerDashboardV2Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'logs' | 'chat' | 'profile' | 'notifications'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [swipedLogId, setSwipedLogId] = useState<number | null>(null);

  const handleSwipeApprove = (logId: number) => {
    console.log('Approved log:', logId);
    // Remove from pending list
  };

  const handleSwipeReject = (logId: number) => {
    console.log('Rejected log:', logId);
    // Remove from pending list
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 max-w-[390px] mx-auto">
      {/* Top Search Bar with AI */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Ask AI or search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowAISuggestions(true)}
              className="pl-9 pr-3 py-2 text-sm"
            />
            {searchQuery && (
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 animate-pulse" />
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="flex-shrink-0 w-10 h-10 p-0"
          >
            <QrCode className="w-5 h-5" />
          </Button>
        </div>

        {/* AI Autocomplete */}
        {showAISuggestions && (
          <div className="absolute top-14 left-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 mt-1 z-40 max-w-[358px]">
            <div className="p-2 space-y-1">
              {aiSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setShowAISuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3 text-green-500" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4 pb-24 space-y-4">
        {activeTab === 'home' && (
          <>
            {/* Free Co-Op Banner with Verified Badge */}
            <Card className="shadow-lg border-2 border-yellow-300 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg bg-white/90 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {employerData.logo}
                  </div>
                  <div className="flex-1 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold">{employerData.name}</h2>
                      {employerData.verified && (
                        <CheckCircle className="w-5 h-5 text-white fill-white" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-white" />
                      <span className="font-bold">{employerData.rating}</span>
                      <span className="text-sm">({employerData.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 mt-3">
                  <p className="font-bold text-gray-900 text-center mb-1">🎉 FREE for Co-Op Employers</p>
                  <p className="text-xs text-gray-600 text-center">
                    Advanced tools available with Z-Credits (pay-as-you-go)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="shadow-md">
                <CardContent className="p-3 text-center">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xl font-bold text-gray-900">{employerData.totalStudents}</p>
                  <p className="text-[10px] text-gray-600">Students</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-3 text-center">
                  <Clock className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <p className="text-xl font-bold text-gray-900">{pendingTimeLogs.length}</p>
                  <p className="text-[10px] text-gray-600">Pending</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-3 text-center">
                  <Star className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                  <p className="text-xl font-bold text-gray-900">{employerData.rating}</p>
                  <p className="text-[10px] text-gray-600">Rating</p>
                </CardContent>
              </Card>
            </div>

            {/* One-Tap Actions */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700 justify-start" size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve All Pending Logs ({pendingTimeLogs.length})
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export ATS Data (CSV)
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Sync with Handshake
                </Button>
              </CardContent>
            </Card>

            {/* Integration Cards */}
            <div className="space-y-2">
              <Card className="shadow-md border-l-4 border-l-blue-500">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-sm">Connect Calendar</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-l-4 border-l-purple-500">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-sm">Import from BambooHR</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Import
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-l-4 border-l-green-500">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-sm">Handshake Pipeline</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs">Connected</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Z-Credits Upsell */}
            <Card className="shadow-md bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600 fill-blue-600" />
                  Upgrade with Z-Credits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {zCreditUpsells.map((upsell, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <upsell.icon className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{upsell.name}</p>
                        <p className="text-xs text-gray-600">${upsell.price} {upsell.unit}</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 text-xs">
                      Add
                    </Button>
                  </div>
                ))}
                <div className="bg-yellow-100 rounded-lg p-3 mt-3">
                  <p className="text-xs text-yellow-900 text-center">
                    💰 <strong>Beta Pricing:</strong> Base subscription only $29/month + Z-Credits as needed
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Student Reviews Section */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  Student Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold text-gray-900">{employerData.rating}</div>
                    <div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">{employerData.reviewCount} reviews</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300">Verified</Badge>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 italic mb-2">
                    "Great learning environment! Supervisors are supportive and give real-world experience."
                  </p>
                  <p className="text-xs text-gray-500">— Maria S., Medical Records Assistant</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'logs' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Time Logs ({pendingTimeLogs.length} Pending)
            </h2>

            <div className="bg-blue-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-blue-900 font-medium mb-1">💡 Swipe Actions</p>
              <p className="text-xs text-blue-700">
                Swipe right to approve ✓ • Swipe left to reject ✗
              </p>
            </div>

            {pendingTimeLogs.map((log) => (
              <Card
                key={log.id}
                className="shadow-md border-l-4 border-l-orange-400 relative overflow-hidden"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm">
                        {log.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{log.studentName}</p>
                        <p className="text-xs text-gray-500 font-mono">{log.zuid}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                      Pending
                    </Badge>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hours:</span>
                      <span className="font-bold text-blue-700">{log.hours} hrs</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Tasks:</p>
                      <p className="text-sm text-gray-900">{log.tasks}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSwipeApprove(log.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSwipeReject(log.id)}
                      className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {activeTab === 'chat' && (
          <>
            <h2 className="text-lg font-bold text-gray-900">Messages</h2>
            <Card className="shadow-md">
              <CardContent className="p-4">
                <p className="text-center text-gray-500 py-8">No new messages</p>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'profile' && (
          <>
            <h2 className="text-lg font-bold text-gray-900">Company Profile</h2>
            <Card className="shadow-md">
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                    {employerData.logo}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{employerData.name}</h3>
                  <Badge className="bg-green-100 text-green-700 mt-2">Verified Employer</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{employerData.totalStudents}</p>
                    <p className="text-xs text-gray-600">Active Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{employerData.rating}</p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'notifications' && (
          <>
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <Card className="shadow-md">
              <CardContent className="p-4">
                <p className="text-center text-gray-500 py-8">No new notifications</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 shadow-lg max-w-[390px] mx-auto">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'home' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] relative ${
              activeTab === 'logs' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <Clock className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Logs</span>
            {pendingTimeLogs.length > 0 && (
              <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {pendingTimeLogs.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'chat' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <MessageCircle className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'profile' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'notifications' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <Bell className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
}
