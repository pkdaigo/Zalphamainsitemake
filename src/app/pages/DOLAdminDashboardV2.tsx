/**
 * ZALPHA DOL Admin Dashboard V2 - Ultra-Easy Mobile First (390x844)
 * Features: AI Search, WIOA Gauges, 20-Year Workforce Projections, Compliance Metrics
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
  BarChart3,
  MessageCircle,
  User,
  Bell,
  Shield,
  Users,
  Building,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Award,
  FileText,
  Download,
  Sparkles,
  Target,
  GraduationCap,
  AlertCircle,
} from 'lucide-react';

const dolAdminData = {
  totalStudents: 2847,
  totalEmployers: 456,
  totalPlacements: 1923,
  totalEarnings: 2847293,
  wioaCompliance: 94,
  perkinsCompliance: 95,
  rapidsCompliance: 98,
};

const regionalSummary = [
  { name: 'CNMI 🇲🇵', students: 847, employers: 142, compliance: 94 },
  { name: 'Guam 🇬🇺', students: 1124, employers: 198, compliance: 96 },
  { name: 'Palau 🇵🇼', students: 234, employers: 42, compliance: 89 },
  { name: 'FSM 🇫🇲', students: 412, employers: 48, compliance: 87 },
  { name: 'RMI 🇲🇭', students: 156, employers: 18, compliance: 82 },
  { name: 'APAC 🌏', students: 74, employers: 8, compliance: 91 },
];

const workforce20YearProjection = {
  current: 2847,
  year5: 3420,
  year10: 4150,
  year15: 4890,
  year20: 5640,
  retentionRate5yr: 78,
  retentionRate10yr: 64,
  retentionRate20yr: 52,
};

const aiSuggestions = [
  'Generate WIOA compliance report',
  'View regional breakdown',
  'Export 20-year projections',
  'Check Perkins V metrics',
  'Sync RAPIDS data',
  'Analyze brain circulation',
];

interface DOLAdminDashboardV2Props {
  onNavigate?: (page: string) => void;
}

export function DOLAdminDashboardV2({ onNavigate }: DOLAdminDashboardV2Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'compliance' | 'chat' | 'profile' | 'notifications'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');

  const getComplianceColor = (score: number) => {
    if (score >= 90) return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
    if (score >= 85) return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' };
    return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
  };

  const renderGauge = (value: number, max: number = 100, label: string, color: string) => {
    const percentage = (value / max) * 100;
    const gaugeRotation = (percentage / 100) * 180 - 90;

    return (
      <div className="relative w-32 h-20 mx-auto">
        {/* Gauge Background */}
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="w-28 h-14 border-8 border-gray-200 rounded-t-full border-b-0" />
        </div>
        {/* Gauge Fill */}
        <div className="absolute inset-0 flex items-end justify-center">
          <div
            className={`w-28 h-14 border-8 ${color} rounded-t-full border-b-0 transition-all duration-1000`}
            style={{
              clipPath: `polygon(0 100%, 0 ${100 - percentage}%, 100% ${100 - percentage}%, 100% 100%)`,
            }}
          />
        </div>
        {/* Value Display */}
        <div className="absolute inset-0 flex items-center justify-center mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{value}%</p>
            <p className="text-xs text-gray-600">{label}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 max-w-[390px] mx-auto">
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
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-pulse" />
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

      {/* Main Content */}
      <div className="p-4 pb-24 space-y-4">
        {activeTab === 'home' && (
          <>
            {/* DOL Header */}
            <Card className="shadow-lg border-2 border-slate-200 bg-gradient-to-br from-slate-700 to-blue-700 text-white">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">DOL Admin Portal</h2>
                    <p className="text-sm text-white/90">Department of Labor</p>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="mt-2 bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-1.5 outline-none border border-white/30 w-full"
                    >
                      <option value="all" className="bg-slate-700">All Regions</option>
                      <option value="cnmi" className="bg-slate-700">CNMI</option>
                      <option value="guam" className="bg-slate-700">Guam</option>
                      <option value="palau" className="bg-slate-700">Palau</option>
                      <option value="fsm" className="bg-slate-700">FSM</option>
                      <option value="rmi" className="bg-slate-700">RMI</option>
                      <option value="apac" className="bg-slate-700">Asia-Pacific</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="shadow-md">
                <CardContent className="p-3 text-center">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xl font-bold text-gray-900">{dolAdminData.totalStudents.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-600">Students</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-3 text-center">
                  <Building className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <p className="text-xl font-bold text-gray-900">{dolAdminData.totalEmployers.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-600">Employers</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-3 text-center">
                  <Target className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-xl font-bold text-gray-900">{dolAdminData.totalPlacements.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-600">Placements</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-3 text-center">
                  <DollarSign className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">${(dolAdminData.totalEarnings / 1000000).toFixed(1)}M</p>
                  <p className="text-[10px] text-gray-600">Earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* WIOA Compliance Gauges */}
            <Card className="shadow-md border-2 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  WIOA Compliance Gauges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {renderGauge(dolAdminData.wioaCompliance, 100, 'WIOA', 'border-green-500')}
                  {renderGauge(dolAdminData.perkinsCompliance, 100, 'Perkins V', 'border-blue-500')}
                  {renderGauge(dolAdminData.rapidsCompliance, 100, 'RAPIDS', 'border-purple-500')}
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-900 text-center">
                    ✅ All compliance metrics above 90% threshold
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Regional Summary */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Regional Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {regionalSummary.map((region, idx) => {
                  const colors = getComplianceColor(region.compliance);
                  return (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-gray-900">{region.name}</span>
                        <Badge className={`${colors.bg} ${colors.text} border ${colors.border} text-xs`}>
                          {region.compliance}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-gray-600">Students</p>
                          <p className="font-bold text-blue-700">{region.students}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Employers</p>
                          <p className="font-bold text-green-700">{region.employers}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* 20-Year Workforce Projection */}
            <Card className="shadow-md border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  20-Year Workforce Projections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current (2026)</span>
                    <span className="text-lg font-bold text-gray-900">{workforce20YearProjection.current.toLocaleString()}</span>
                  </div>
                  <Progress value={50} className="h-2 bg-blue-200" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">5 Years (2031)</span>
                    <span className="text-lg font-bold text-blue-700">{workforce20YearProjection.year5.toLocaleString()}</span>
                  </div>
                  <Progress value={60} className="h-2 bg-blue-200" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">10 Years (2036)</span>
                    <span className="text-lg font-bold text-purple-700">{workforce20YearProjection.year10.toLocaleString()}</span>
                  </div>
                  <Progress value={75} className="h-2 bg-purple-200" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">20 Years (2046)</span>
                    <span className="text-lg font-bold text-green-700">{workforce20YearProjection.year20.toLocaleString()}</span>
                  </div>
                  <Progress value={100} className="h-2 bg-green-200" />
                </div>

                <div className="bg-white rounded-lg p-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Retention Rates:</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-blue-700">{workforce20YearProjection.retentionRate5yr}%</p>
                      <p className="text-xs text-gray-600">5-Year</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-700">{workforce20YearProjection.retentionRate10yr}%</p>
                      <p className="text-xs text-gray-600">10-Year</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-700">{workforce20YearProjection.retentionRate20yr}%</p>
                      <p className="text-xs text-gray-600">20-Year</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3 text-white text-center">
                  <GraduationCap className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-bold">Brain Circulation Success</p>
                  <p className="text-xs mt-1">Turning brain drain into sustainable Pacific workforce development</p>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export 20-Year Projection (PDF)
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export WIOA Quarterly Report
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Perkins V Metrics
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Sync RAPIDS Data
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'compliance' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Compliance Dashboard
            </h2>

            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Compliance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-green-900">WIOA Youth Programs</p>
                    <p className="text-xs text-green-700">Active & compliant</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-700">{dolAdminData.wioaCompliance}%</p>
                    <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-blue-900">Perkins V CTE</p>
                    <p className="text-xs text-blue-700">Achievement rate on track</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-700">{dolAdminData.perkinsCompliance}%</p>
                    <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-purple-900">RAPIDS Reporting</p>
                    <p className="text-xs text-purple-700">Data accuracy high</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-700">{dolAdminData.rapidsCompliance}%</p>
                    <CheckCircle className="w-5 h-5 text-purple-600 ml-auto" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900 mb-1">Attention Required</p>
                    <p className="text-xs text-yellow-800">
                      2 regions below 85% compliance threshold. Review RMI and FSM metrics.
                    </p>
                  </div>
                </div>
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
            <h2 className="text-lg font-bold text-gray-900">Admin Profile</h2>
            <Card className="shadow-md">
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-slate-700 to-blue-700 text-white flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">DOL Administrator</h3>
                  <p className="text-sm text-gray-600 mt-1">Pacific Islands Regional Office</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">6</p>
                    <p className="text-xs text-gray-600">Regions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{dolAdminData.wioaCompliance}%</p>
                    <p className="text-xs text-gray-600">Compliance</p>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Settings
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
              activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'compliance' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <BarChart3 className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium">Metrics</span>
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
            className={`flex flex-col items-center justify-center py-3 px-4 transition-colors min-w-[60px] ${
              activeTab === 'notifications' ? 'text-blue-600' : 'text-gray-500'
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
