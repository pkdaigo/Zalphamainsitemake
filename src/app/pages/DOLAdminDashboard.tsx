/**
 * ZALPHA DOL Admin Dashboard - Mobile First
 * Features: Regional overview, Compliance metrics (Perkins V, RAPIDS), Student/Employer registry, 20-year pipeline
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  Shield,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BarChart3,
  FileText,
  Award,
  Building,
  GraduationCap,
} from 'lucide-react';

const dolAdminData = {
  totalStudents: 2847,
  totalEmployers: 456,
  totalPlacements: 1923,
  totalHours: 156734,
  totalEarnings: 2847293,
};

const regionalData = [
  {
    jurisdiction: 'CNMI',
    students: 847,
    employers: 142,
    placements: 612,
    hours: 48234,
    compliance: 94,
    color: 'purple',
  },
  {
    jurisdiction: 'Guam',
    students: 1124,
    employers: 198,
    placements: 823,
    hours: 67893,
    compliance: 96,
    color: 'cyan',
  },
  {
    jurisdiction: 'Palau',
    students: 234,
    employers: 42,
    placements: 178,
    hours: 14562,
    compliance: 89,
    color: 'green',
  },
  {
    jurisdiction: 'FSM',
    students: 412,
    employers: 48,
    placements: 234,
    hours: 18923,
    compliance: 87,
    color: 'blue',
  },
  {
    jurisdiction: 'RMI',
    students: 156,
    employers: 18,
    placements: 54,
    hours: 4328,
    compliance: 82,
    color: 'pink',
  },
  {
    jurisdiction: 'Asia-Pacific',
    students: 74,
    employers: 8,
    placements: 22,
    hours: 2794,
    compliance: 91,
    color: 'orange',
  },
];

const complianceMetrics = {
  perkinsV: {
    compliantPrograms: 89,
    totalPrograms: 94,
    achievementRate: 95,
  },
  rapids: {
    onTimeReports: 92,
    totalReports: 94,
    dataAccuracy: 98,
  },
  wioa: {
    activeParticipants: 1847,
    placementRate: 87,
    retentionRate: 92,
  },
};

const recentRegistry = [
  {
    id: 1,
    type: 'student' as const,
    name: 'Maria Santos',
    zuid: 'Z-CNMI-2026-0142',
    jurisdiction: 'CNMI',
    schoolId: 'PSS-SAIPAN-001',
    status: 'active' as const,
  },
  {
    id: 2,
    type: 'employer' as const,
    name: 'Pacific Islands Hospital',
    id_display: 'EMP-CNMI-0045',
    jurisdiction: 'CNMI',
    students: 12,
    status: 'active' as const,
  },
  {
    id: 3,
    type: 'student' as const,
    name: 'John Pangelinan',
    zuid: 'Z-CNMI-2026-0098',
    jurisdiction: 'CNMI',
    schoolId: 'PSS-SAIPAN-001',
    status: 'active' as const,
  },
];

const pipelineData = {
  hsGraduates: 2847,
  collegeEnrolled: 1823,
  workforceEntered: 2234,
  retention5yr: 78,
  retention10yr: 64,
  retention20yr: 52,
};

const jurisdictionColors: Record<string, string> = {
  purple: 'from-purple-500 to-purple-600',
  cyan: 'from-cyan-500 to-cyan-600',
  green: 'from-green-500 to-green-600',
  blue: 'from-blue-500 to-blue-600',
  pink: 'from-pink-500 to-pink-600',
  orange: 'from-orange-500 to-orange-600',
};

const jurisdictionBadgeColors: Record<string, string> = {
  CNMI: 'bg-purple-100 text-purple-700 border-purple-300',
  Guam: 'bg-cyan-100 text-cyan-700 border-cyan-300',
  FSM: 'bg-blue-100 text-blue-700 border-blue-300',
  Palau: 'bg-green-100 text-green-700 border-green-300',
  RMI: 'bg-pink-100 text-pink-700 border-pink-300',
  'Asia-Pacific': 'bg-orange-100 text-orange-700 border-orange-300',
};

interface DOLAdminDashboardProps {
  onNavigate?: (page: string) => void;
}

export function DOLAdminDashboard({ onNavigate }: DOLAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'compliance' | 'registry' | 'pipeline'>('overview');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-slate-700 to-blue-700 text-white p-4 pb-6 sticky top-0 z-20 shadow-lg">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold">DOL Admin Portal</h1>
            <p className="text-sm text-white/90">Department of Labor Dashboard</p>
          </div>
        </div>

        {/* Region Selector */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full bg-transparent text-white text-sm font-medium outline-none"
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

      {/* Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 shadow-lg">
        <div className="grid grid-cols-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center justify-center py-2 px-2 transition-colors ${
              activeTab === 'overview' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <BarChart3 className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`flex flex-col items-center justify-center py-2 px-2 transition-colors ${
              activeTab === 'compliance' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <CheckCircle className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Compliance</span>
          </button>
          <button
            onClick={() => setActiveTab('registry')}
            className={`flex flex-col items-center justify-center py-2 px-2 transition-colors ${
              activeTab === 'registry' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Registry</span>
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex flex-col items-center justify-center py-2 px-2 transition-colors ${
              activeTab === 'pipeline' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <TrendingUp className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Pipeline</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-24 space-y-4">
        {activeTab === 'overview' && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <Users className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{dolAdminData.totalStudents.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Total Students</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <Building className="w-5 h-5 text-green-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{dolAdminData.totalEmployers.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Employers</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <Briefcase className="w-5 h-5 text-purple-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{dolAdminData.totalPlacements.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Placements</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <DollarSign className="w-5 h-5 text-orange-600 mb-2" />
                  <p className="text-xl font-bold text-gray-900">${(dolAdminData.totalEarnings / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-600">Total Earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Regional Overview */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Regional Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {regionalData.map((region) => (
                  <div key={region.jurisdiction} className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${jurisdictionColors[region.color]}`} />
                        <span className="font-semibold text-gray-900">{region.jurisdiction}</span>
                      </div>
                      <Badge
                        className={
                          region.compliance >= 90
                            ? 'bg-green-100 text-green-700 border-green-300'
                            : region.compliance >= 85
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                            : 'bg-red-100 text-red-700 border-red-300'
                        }
                      >
                        {region.compliance}% Compliant
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div>
                        <p className="font-bold text-blue-700">{region.students}</p>
                        <p className="text-gray-600">Students</p>
                      </div>
                      <div>
                        <p className="font-bold text-green-700">{region.employers}</p>
                        <p className="text-gray-600">Employers</p>
                      </div>
                      <div>
                        <p className="font-bold text-purple-700">{region.placements}</p>
                        <p className="text-gray-600">Placements</p>
                      </div>
                      <div>
                        <p className="font-bold text-orange-700">{(region.hours / 1000).toFixed(1)}k</p>
                        <p className="text-gray-600">Hours</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'compliance' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Compliance Metrics
            </h2>

            {/* Perkins V */}
            <Card className="shadow-md border-l-4 border-l-blue-400">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-500" />
                  Perkins V Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-700">
                      {complianceMetrics.perkinsV.compliantPrograms}/{complianceMetrics.perkinsV.totalPrograms}
                    </p>
                    <p className="text-xs text-gray-600">Compliant Programs</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-700">{complianceMetrics.perkinsV.achievementRate}%</p>
                    <p className="text-xs text-gray-600">Achievement Rate</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-600">Overall Compliance</span>
                    <span className="font-medium text-gray-900">
                      {Math.round((complianceMetrics.perkinsV.compliantPrograms / complianceMetrics.perkinsV.totalPrograms) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(complianceMetrics.perkinsV.compliantPrograms / complianceMetrics.perkinsV.totalPrograms) * 100}
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* RAPIDS */}
            <Card className="shadow-md border-l-4 border-l-purple-400">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-500" />
                  RAPIDS Reporting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-purple-700">
                      {complianceMetrics.rapids.onTimeReports}/{complianceMetrics.rapids.totalReports}
                    </p>
                    <p className="text-xs text-gray-600">On-Time Reports</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-700">{complianceMetrics.rapids.dataAccuracy}%</p>
                    <p className="text-xs text-gray-600">Data Accuracy</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-600">Reporting Compliance</span>
                    <span className="font-medium text-gray-900">
                      {Math.round((complianceMetrics.rapids.onTimeReports / complianceMetrics.rapids.totalReports) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(complianceMetrics.rapids.onTimeReports / complianceMetrics.rapids.totalReports) * 100}
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* WIOA */}
            <Card className="shadow-md border-l-4 border-l-green-400">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  WIOA Youth Programs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-blue-700">{complianceMetrics.wioa.activeParticipants.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Participants</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-green-700">{complianceMetrics.wioa.placementRate}%</p>
                    <p className="text-xs text-gray-600">Placement</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-purple-700">{complianceMetrics.wioa.retentionRate}%</p>
                    <p className="text-xs text-gray-600">Retention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'registry' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Student & Employer Registry
            </h2>
            {recentRegistry.map((entry) => (
              <Card key={entry.id} className="shadow-md">
                <CardContent className="p-4 space-y-3">
                  {entry.type === 'student' ? (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {entry.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{entry.name}</p>
                            <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-xs mt-1">
                              <Users className="w-3 h-3 mr-1" />
                              Student
                            </Badge>
                          </div>
                        </div>
                        <Badge
                          className={
                            entry.status === 'active'
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : 'bg-gray-100 text-gray-700 border-gray-300'
                          }
                        >
                          {entry.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Z-UID:</span>
                          <span className="font-mono text-xs text-blue-700 font-semibold">{entry.zuid}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">School ID:</span>
                          <span className="font-mono text-xs text-gray-900">{entry.schoolId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Region:</span>
                          <Badge className={`${jurisdictionBadgeColors[entry.jurisdiction]} text-xs border`}>
                            {entry.jurisdiction}
                          </Badge>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 text-white flex items-center justify-center flex-shrink-0">
                            <Building className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{entry.name}</p>
                            <Badge className="bg-green-100 text-green-700 border-green-300 text-xs mt-1">
                              <Building className="w-3 h-3 mr-1" />
                              Employer
                            </Badge>
                          </div>
                        </div>
                        <Badge
                          className={
                            entry.status === 'active'
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : 'bg-gray-100 text-gray-700 border-gray-300'
                          }
                        >
                          {entry.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Employer ID:</span>
                          <span className="font-mono text-xs text-green-700 font-semibold">{entry.id_display}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Active Students:</span>
                          <span className="font-bold text-gray-900">{entry.students}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Region:</span>
                          <Badge className={`${jurisdictionBadgeColors[entry.jurisdiction]} text-xs border`}>
                            {entry.jurisdiction}
                          </Badge>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {activeTab === 'pipeline' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              20-Year College Enrollment Pipeline
            </h2>

            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Pipeline Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-blue-900">High School Graduates</span>
                      <span className="text-xl font-bold text-blue-700">{pipelineData.hsGraduates.toLocaleString()}</span>
                    </div>
                    <Progress value={100} className="h-2 bg-blue-200" />
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-purple-900">College Enrolled</span>
                      <span className="text-xl font-bold text-purple-700">{pipelineData.collegeEnrolled.toLocaleString()}</span>
                    </div>
                    <Progress value={(pipelineData.collegeEnrolled / pipelineData.hsGraduates) * 100} className="h-2 bg-purple-200" />
                    <p className="text-xs text-gray-600 mt-1">
                      {Math.round((pipelineData.collegeEnrolled / pipelineData.hsGraduates) * 100)}% enrollment rate
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-green-900">Workforce Entry</span>
                      <span className="text-xl font-bold text-green-700">{pipelineData.workforceEntered.toLocaleString()}</span>
                    </div>
                    <Progress value={(pipelineData.workforceEntered / pipelineData.hsGraduates) * 100} className="h-2 bg-green-200" />
                    <p className="text-xs text-gray-600 mt-1">
                      {Math.round((pipelineData.workforceEntered / pipelineData.hsGraduates) * 100)}% workforce participation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Long-Term Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">5-Year Retention</span>
                      <span className="font-bold text-blue-700">{pipelineData.retention5yr}%</span>
                    </div>
                    <Progress value={pipelineData.retention5yr} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">10-Year Retention</span>
                      <span className="font-bold text-purple-700">{pipelineData.retention10yr}%</span>
                    </div>
                    <Progress value={pipelineData.retention10yr} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">20-Year Retention</span>
                      <span className="font-bold text-green-700">{pipelineData.retention20yr}%</span>
                    </div>
                    <Progress value={pipelineData.retention20yr} className="h-3" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic mt-3">
                  Tracking graduates from high school → NMC/NMTECH → Pacific Islands workforce over 20 years
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <GraduationCap className="w-10 h-10 text-blue-600 mx-auto" />
                  <p className="font-bold text-gray-900">Brain Circulation Success</p>
                  <p className="text-sm text-gray-600">
                    Turning brain drain into brain circulation by tracking and supporting graduates throughout their career journeys
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
