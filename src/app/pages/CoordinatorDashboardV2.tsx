/**
 * ZALPHA Coordinator Dashboard V2 - Ultra-Easy Mobile First (390x844)
 * Features: AI Search, School Filters, Home-to-Work Charts, Enrollment Exports, Integration Cards
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
  Home as HomeIcon,
  Users,
  MessageCircle,
  User,
  Bell,
  School,
  Download,
  ExternalLink,
  Sparkles,
  BarChart3,
  FileText,
  Filter,
  MapPin,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Target,
} from 'lucide-react';

const coordinatorData = {
  institutionName: 'Northern Marianas College',
  schoolId: 'PSS-SAIPAN-001',
  totalStudents: 127,
  activePlacements: 89,
  avgCommuteTime: 28,
  commuteRiskLevel: 'medium' as const,
};

const schools = [
  { id: 'PSS-SAIPAN-001', name: 'Marianas High School', students: 67, flag: '🇲🇵' },
  { id: 'PSS-TINIAN-002', name: 'Tinian High School', students: 32, flag: '🇲🇵' },
  { id: 'NMC-001', name: 'Northern Marianas College', students: 28, flag: '🇲🇵' },
];

const homeToWorkStats = {
  low: { count: 45, percent: 51, color: 'green' },
  medium: { count: 30, percent: 34, color: 'yellow' },
  high: { count: 14, percent: 16, color: 'red' },
  transportIssues: 12,
  stressFactors: 8,
};

const exportOptions = [
  { name: 'Student Enrollment Report', format: 'Excel', icon: FileText },
  { name: 'WIOA Quarterly Data', format: 'PDF', icon: FileText },
  { name: 'Perkins V Metrics', format: 'CSV', icon: BarChart3 },
  { name: 'Home-to-Work Analysis', format: 'PDF', icon: MapPin },
];

const aiSuggestions = [
  'Export enrollment report',
  'Filter by school district',
  'View commute analysis',
  'Sync with state database',
  'Generate WIOA report',
  'Check at-risk students',
];

interface CoordinatorDashboardV2Props {
  onNavigate?: (page: string) => void;
}

export function CoordinatorDashboardV2({ onNavigate }: CoordinatorDashboardV2Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'data' | 'chat' | 'profile' | 'notifications'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState<string[]>(['all']);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSchool = (schoolId: string) => {
    if (schoolId === 'all') {
      setSelectedSchools(['all']);
    } else {
      const newSelection = selectedSchools.filter(id => id !== 'all');
      if (newSelection.includes(schoolId)) {
        const filtered = newSelection.filter(id => id !== schoolId);
        setSelectedSchools(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedSchools([...newSelection, schoolId]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 max-w-[390px] mx-auto">
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
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 animate-pulse" />
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex-shrink-0 w-10 h-10 p-0"
          >
            <Filter className="w-5 h-5" />
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
                  className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* School Filters Dropdown */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 space-y-2">
          <p className="text-xs font-semibold text-gray-700 mb-2">Filter by School:</p>
          <div className="space-y-2">
            <button
              onClick={() => toggleSchool('all')}
              className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                selectedSchools.includes('all')
                  ? 'bg-indigo-100 border-indigo-300 text-indigo-900'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="font-medium">All Schools ({coordinatorData.totalStudents})</span>
            </button>
            {schools.map(school => (
              <button
                key={school.id}
                onClick={() => toggleSchool(school.id)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                  selectedSchools.includes(school.id)
                    ? 'bg-indigo-100 border-indigo-300 text-indigo-900'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{school.flag}</span>
                    <span className="text-sm font-medium">{school.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{school.students}</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">{school.id}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 pb-24 space-y-4">
        {activeTab === 'home' && (
          <>
            {/* Coordinator Header */}
            <Card className="shadow-lg border-2 border-indigo-200 bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <School className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{coordinatorData.institutionName}</h2>
                    <p className="text-sm text-white/90">Coordinator Portal</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mt-2 inline-flex items-center gap-1">
                      <span className="text-xs font-medium">School ID:</span>
                      <span className="text-xs font-bold font-mono">{coordinatorData.schoolId}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="shadow-md">
                <CardContent className="p-3 text-center">
                  <Users className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-gray-900">{coordinatorData.totalStudents}</p>
                  <p className="text-[10px] text-gray-600">Total Students</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-3 text-center">
                  <Target className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-gray-900">{coordinatorData.activePlacements}</p>
                  <p className="text-[10px] text-gray-600">Active Placements</p>
                </CardContent>
              </Card>
            </div>

            {/* One-Tap Export Actions */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">Quick Exports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {exportOptions.slice(0, 2).map((option, idx) => (
                  <Button key={idx} variant="outline" className="w-full justify-start" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    {option.name} ({option.format})
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Integration Cards */}
            <div className="space-y-2">
              <Card className="shadow-md border-l-4 border-l-blue-500">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-sm">Sync State Database</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Sync
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-l-4 border-l-purple-500">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-sm">Connect Calendar System</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-l-4 border-l-green-500">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-sm">Handshake Pipeline</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs">Connected</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Home-to-Work Factor Analysis */}
            <Card className="shadow-md border-2 border-orange-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    Home-to-Work Analysis
                  </CardTitle>
                  <Badge
                    className={
                      coordinatorData.commuteRiskLevel === 'low'
                        ? 'bg-green-100 text-green-700'
                        : coordinatorData.commuteRiskLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }
                  >
                    {coordinatorData.commuteRiskLevel.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-orange-700">{coordinatorData.avgCommuteTime}</p>
                    <p className="text-[10px] text-gray-600">Avg Minutes</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-red-700">{homeToWorkStats.transportIssues}</p>
                    <p className="text-[10px] text-gray-600">Issues</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-yellow-700">{homeToWorkStats.stressFactors}</p>
                    <p className="text-[10px] text-gray-600">Stress</p>
                  </div>
                </div>

                {/* Visual Commute Distribution Chart */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-700">Commute Difficulty:</p>
                  
                  {/* Low */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-green-700 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Low Risk ({homeToWorkStats.low.count} students)
                      </span>
                      <span className="text-gray-600">{homeToWorkStats.low.percent}%</span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${homeToWorkStats.low.percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Medium */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-yellow-700 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Medium Risk ({homeToWorkStats.medium.count} students)
                      </span>
                      <span className="text-gray-600">{homeToWorkStats.medium.percent}%</span>
                    </div>
                    <div className="w-full bg-yellow-100 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full transition-all"
                        style={{ width: `${homeToWorkStats.medium.percent}%` }}
                      />
                    </div>
                  </div>

                  {/* High */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-red-700 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        High Risk ({homeToWorkStats.high.count} students)
                      </span>
                      <span className="text-gray-600">{homeToWorkStats.high.percent}%</span>
                    </div>
                    <div className="w-full bg-red-100 rounded-full h-3">
                      <div
                        className="bg-red-500 h-3 rounded-full transition-all"
                        style={{ width: `${homeToWorkStats.high.percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Full Analysis (PDF)
                </Button>
              </CardContent>
            </Card>

            {/* Enrollment Pipeline */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  College Enrollment Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-700">64%</p>
                    <p className="text-xs text-gray-600">College Enrolled</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-700">82%</p>
                    <p className="text-xs text-gray-600">Employed After</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic">
                  📊 20-year tracking: HS → NMC → Workforce
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Enrollment Data
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'data' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Reports & Data Exports
            </h2>

            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Available Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {exportOptions.map((option, idx) => (
                  <Button key={idx} variant="outline" className="w-full justify-between" size="sm">
                    <span className="flex items-center gap-2">
                      <option.icon className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm">{option.name}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{option.format}</Badge>
                      <Download className="w-4 h-4 text-gray-400" />
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-md bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm text-blue-900 font-medium mb-2">💡 Automated Reports</p>
                <p className="text-xs text-blue-700 mb-3">
                  Get weekly WIOA and Perkins V reports emailed automatically
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full">
                  Enable Auto-Reports
                </Button>
              </CardContent>
            </Card>
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
            <h2 className="text-lg font-bold text-gray-900">Profile</h2>
            <Card className="shadow-md">
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center mx-auto mb-3">
                    <School className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{coordinatorData.institutionName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{coordinatorData.schoolId}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">{coordinatorData.totalStudents}</p>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{coordinatorData.activePlacements}</p>
                    <p className="text-xs text-gray-600">Placements</p>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Edit Settings
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
              activeTab === 'home' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <HomeIcon className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'data' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <BarChart3 className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Data</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'chat' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <MessageCircle className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'profile' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'notifications' ? 'text-indigo-600' : 'text-gray-500'
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
