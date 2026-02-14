/**
 * ZALPHA Coordinator Dashboard - Mobile First
 * Features: School ID, Home-to-Work Factor Analysis, Multi-region filter, WIOA reports, Z-UID in tables
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  Users,
  Briefcase,
  Clock,
  TrendingUp,
  Download,
  Filter,
  School,
  MapPin,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  FileText,
  Home,
} from 'lucide-react';

const coordinatorData = {
  institutionName: 'Northern Marianas College',
  schoolId: 'PSS-SAIPAN-001',
  totalStudents: 127,
  activePlacements: 89,
  totalHours: 8942,
  completionRate: 76,
};

const cohorts = [
  {
    id: 1,
    name: 'Fall 2026 WBL',
    jurisdiction: 'CNMI',
    students: 45,
    placed: 38,
    totalHours: 3420,
    completionRate: 84,
  },
  {
    id: 2,
    name: 'Spring 2026 Co-Op',
    jurisdiction: 'Guam',
    students: 52,
    placed: 51,
    totalHours: 5522,
    completionRate: 98,
  },
];

const placements = [
  {
    id: 1,
    studentName: 'Maria Santos',
    zuid: 'Z-CNMI-2026-0142',
    employer: 'Pacific Islands Hospital',
    jurisdiction: 'CNMI',
    hoursCompleted: 82,
    hoursRequired: 120,
    commuteLevel: 'low' as const,
    status: 'active' as const,
  },
  {
    id: 2,
    studentName: 'John Pangelinan',
    zuid: 'Z-CNMI-2026-0098',
    employer: 'IT Solutions Pacific',
    jurisdiction: 'CNMI',
    hoursCompleted: 145,
    hoursRequired: 180,
    commuteLevel: 'medium' as const,
    status: 'active' as const,
  },
  {
    id: 3,
    studentName: 'Sarah Ngiramengior',
    zuid: 'Z-PALAU-2026-0203',
    employer: 'Palau Tourism Office',
    jurisdiction: 'Palau',
    hoursCompleted: 45,
    hoursRequired: 100,
    commuteLevel: 'high' as const,
    status: 'at-risk' as const,
  },
];

const homeToWorkData = {
  avgCommuteTime: 28,
  transportIssues: 12,
  stressFactors: 8,
  distribution: {
    low: 45,
    medium: 30,
    high: 14,
  },
};

const jurisdictionColors: Record<string, string> = {
  CNMI: 'bg-purple-100 text-purple-700 border-purple-300',
  Guam: 'bg-cyan-100 text-cyan-700 border-cyan-300',
  FSM: 'bg-blue-100 text-blue-700 border-blue-300',
  Palau: 'bg-green-100 text-green-700 border-green-300',
  RMI: 'bg-pink-100 text-pink-700 border-pink-300',
  'Asia-Pacific': 'bg-orange-100 text-orange-700 border-orange-300',
};

interface CoordinatorDashboardMobileProps {
  onNavigate?: (page: string) => void;
}

export function CoordinatorDashboardMobile({ onNavigate }: CoordinatorDashboardMobileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'placements' | 'reports'>('overview');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('all');

  const jurisdictions = ['All', 'CNMI', 'Guam', 'Palau', 'FSM', 'RMI', 'Asia-Pacific'];

  const getCommuteColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 pb-6 sticky top-0 z-20 shadow-lg">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <School className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold truncate">{coordinatorData.institutionName}</h1>
            <p className="text-sm text-white/90">Coordinator Portal</p>
          </div>
        </div>

        {/* School ID */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-between">
          <span className="text-xs text-white/80 font-medium">School ID:</span>
          <span className="text-sm font-bold text-white font-mono">{coordinatorData.schoolId}</span>
        </div>
      </div>

      {/* Multi-Region Filter */}
      <div className="bg-white border-b border-gray-200 p-3 sticky top-[136px] z-10 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          {jurisdictions.map((jurisdiction) => (
            <button
              key={jurisdiction}
              onClick={() => setSelectedJurisdiction(jurisdiction.toLowerCase())}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-colors ${
                selectedJurisdiction === jurisdiction.toLowerCase()
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {jurisdiction}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center justify-center py-2 px-3 transition-colors ${
              activeTab === 'overview' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <BarChart3 className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('placements')}
            className={`flex flex-col items-centers justify-center py-2 px-3 transition-colors ${
              activeTab === 'placements' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Placements</span>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex flex-col items-center justify-center py-2 px-3 transition-colors ${
              activeTab === 'reports' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Reports</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-24 space-y-4">
        {activeTab === 'overview' && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <Users className="w-5 h-5 text-indigo-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{coordinatorData.totalStudents}</p>
                  <p className="text-xs text-gray-600">Total Students</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <Briefcase className="w-5 h-5 text-green-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{coordinatorData.activePlacements}</p>
                  <p className="text-xs text-gray-600">Active Placements</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <Clock className="w-5 h-5 text-purple-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{coordinatorData.totalHours.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Total Hours</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <TrendingUp className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{coordinatorData.completionRate}%</p>
                  <p className="text-xs text-gray-600">Completion Rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Home-to-Work Factor Analysis */}
            <Card className="shadow-md border-l-4 border-l-orange-400">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Home className="w-5 h-5 text-orange-500" />
                  Home-to-Work Factor Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-orange-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-orange-700">{homeToWorkData.avgCommuteTime}</p>
                    <p className="text-xs text-gray-600">Avg Commute (min)</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-700">{homeToWorkData.transportIssues}</p>
                    <p className="text-xs text-gray-600">Transport Issues</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-yellow-700">{homeToWorkData.stressFactors}</p>
                    <p className="text-xs text-gray-600">Stress Factors</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Commute Difficulty Distribution</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-green-700 font-medium">Low ({homeToWorkData.distribution.low})</span>
                        <span className="text-gray-600">{Math.round((homeToWorkData.distribution.low / coordinatorData.activePlacements) * 100)}%</span>
                      </div>
                      <Progress value={(homeToWorkData.distribution.low / coordinatorData.activePlacements) * 100} className="h-2 bg-green-200" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-yellow-700 font-medium">Medium ({homeToWorkData.distribution.medium})</span>
                        <span className="text-gray-600">{Math.round((homeToWorkData.distribution.medium / coordinatorData.activePlacements) * 100)}%</span>
                      </div>
                      <Progress value={(homeToWorkData.distribution.medium / coordinatorData.activePlacements) * 100} className="h-2 bg-yellow-200" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-red-700 font-medium">High ({homeToWorkData.distribution.high})</span>
                        <span className="text-gray-600">{Math.round((homeToWorkData.distribution.high / coordinatorData.activePlacements) * 100)}%</span>
                      </div>
                      <Progress value={(homeToWorkData.distribution.high / coordinatorData.activePlacements) * 100} className="h-2 bg-red-200" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cohorts */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Active Cohorts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cohorts.map((cohort) => (
                  <div key={cohort.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{cohort.name}</p>
                        <Badge className={`${jurisdictionColors[cohort.jurisdiction]} text-xs border mt-1`}>
                          {cohort.jurisdiction}
                        </Badge>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                        {cohort.completionRate}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <p className="font-bold text-gray-900">{cohort.students}</p>
                        <p className="text-gray-600">Students</p>
                      </div>
                      <div>
                        <p className="font-bold text-green-700">{cohort.placed}</p>
                        <p className="text-gray-600">Placed</p>
                      </div>
                      <div>
                        <p className="font-bold text-purple-700">{cohort.totalHours}</p>
                        <p className="text-gray-600">Hours</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'placements' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Student Placements
            </h2>
            {placements.map((placement) => (
              <Card key={placement.id} className={`shadow-md ${placement.status === 'at-risk' ? 'border-l-4 border-l-red-400' : ''}`}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{placement.studentName}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">{placement.zuid}</p>
                    </div>
                    {placement.status === 'at-risk' && (
                      <Badge className="bg-red-100 text-red-700 border-red-300 text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        At Risk
                      </Badge>
                    )}
                    {placement.status === 'active' && (
                      <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Employer:</span>
                      <span className="font-medium text-gray-900 text-xs text-right">{placement.employer}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Region:</span>
                      <Badge className={`${jurisdictionColors[placement.jurisdiction]} text-xs border`}>
                        {placement.jurisdiction}
                      </Badge>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium text-gray-900">
                          {placement.hoursCompleted}/{placement.hoursRequired} hrs
                        </span>
                      </div>
                      <Progress
                        value={(placement.hoursCompleted / placement.hoursRequired) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                    <span className="text-xs text-gray-600">Commute Level:</span>
                    <Badge className={`${getCommuteColor(placement.commuteLevel)} text-xs border`}>
                      <MapPin className="w-3 h-3 mr-1" />
                      {placement.commuteLevel.charAt(0).toUpperCase() + placement.commuteLevel.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {activeTab === 'reports' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              WIOA & Funding Reports
            </h2>

            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Compliance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-green-900">WIOA Compliance</p>
                    <p className="text-xs text-green-700">All programs aligned</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-blue-900">Perkins V Metrics</p>
                    <p className="text-xs text-blue-700">92% achievement rate</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="bg-purple-50 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-purple-900">RAPIDS Reporting</p>
                    <p className="text-xs text-purple-700">Up to date</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Export Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  WIOA Quarterly Report (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Perkins V Metrics (CSV)
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Student Hours Summary (Excel)
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Placement Success Report (PDF)
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">College Enrollment Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-700">64%</p>
                    <p className="text-xs text-gray-600">Enrolled in College</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-700">82%</p>
                    <p className="text-xs text-gray-600">Employed After</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic">
                  20-year tracking: High school → NMC/NMTECH → Workforce pipeline
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
