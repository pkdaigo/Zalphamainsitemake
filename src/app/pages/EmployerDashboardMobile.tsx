/**
 * ZALPHA Employer Dashboard - Mobile First
 * Features: Free for Co-Op, Z-UID on cards, Time log approval, Digital training agreements
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  FileText,
  AlertCircle,
  TrendingUp,
  Building,
  Award,
} from 'lucide-react';

const employerData = {
  name: 'Pacific Islands Hospital',
  logo: 'PIH',
  totalStudents: 5,
  activeStudents: 4,
  totalHours: 387,
};

const studentTrainees = [
  {
    id: 1,
    name: 'Maria Santos',
    zuid: 'Z-CNMI-2026-0142',
    school: 'Marianas High School',
    jurisdiction: 'CNMI',
    program: 'WBL Youth Employment',
    status: 'active' as const,
    totalHours: 82,
    avatar: 'MS',
  },
  {
    id: 2,
    name: 'John Pangelinan',
    zuid: 'Z-CNMI-2026-0098',
    school: 'Marianas High School',
    jurisdiction: 'CNMI',
    program: 'Co-Op Education',
    status: 'active' as const,
    totalHours: 95,
    avatar: 'JP',
  },
  {
    id: 3,
    name: 'Sarah Ngiramengior',
    zuid: 'Z-PALAU-2026-0203',
    school: 'Palau High School',
    jurisdiction: 'Palau',
    program: 'CTE Internship',
    status: 'active' as const,
    totalHours: 67,
    avatar: 'SN',
  },
];

const pendingTimeLogs = [
  {
    id: 1,
    studentName: 'Maria Santos',
    zuid: 'Z-CNMI-2026-0142',
    date: '2026-02-12',
    hours: 3,
    tasks: 'Organized patient files, updated digital records',
  },
  {
    id: 2,
    studentName: 'John Pangelinan',
    zuid: 'Z-CNMI-2026-0098',
    date: '2026-02-13',
    hours: 4,
    tasks: 'Assisted with inventory management',
  },
];

const evaluationTasks = [
  { id: 1, studentName: 'Maria Santos', type: 'Mid-term', dueDate: '2026-02-20' },
  { id: 2, studentName: 'Sarah Ngiramengior', type: 'Weekly Check-in', dueDate: '2026-02-16' },
];

const jurisdictionColors: Record<string, string> = {
  CNMI: 'bg-purple-100 text-purple-700 border-purple-300',
  Guam: 'bg-cyan-100 text-cyan-700 border-cyan-300',
  FSM: 'bg-blue-100 text-blue-700 border-blue-300',
  Palau: 'bg-green-100 text-green-700 border-green-300',
  RMI: 'bg-pink-100 text-pink-700 border-pink-300',
};

interface EmployerDashboardMobileProps {
  onNavigate?: (page: string) => void;
}

export function EmployerDashboardMobile({ onNavigate }: EmployerDashboardMobileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'trainees'>('overview');

  const handleApprove = (logId: number) => {
    console.log('Approved log:', logId);
  };

  const handleReject = (logId: number) => {
    console.log('Rejected log:', logId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 pb-6 sticky top-0 z-20 shadow-lg">
        <div className="flex items-start gap-3 mb-3">
          {/* Logo */}
          <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center text-xl font-bold flex-shrink-0">
            {employerData.logo}
          </div>
          
          {/* Employer Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold truncate">{employerData.name}</h1>
            <p className="text-sm text-white/90">Employer Portal</p>
          </div>
        </div>

        {/* Free Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-lg px-4 py-3 shadow-md">
          <p className="font-bold text-sm">🎉 Free for Co-Op Employers</p>
          <p className="text-xs mt-1">Advanced tools run on Z-Credits (pay-as-you-go)</p>
        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center justify-center py-2 px-3 transition-colors ${
              activeTab === 'overview' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <Building className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex flex-col items-center justify-center py-2 px-3 transition-colors relative ${
              activeTab === 'logs' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <Clock className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Time Logs</span>
            {pendingTimeLogs.length > 0 && (
              <span className="absolute top-1 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingTimeLogs.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('trainees')}
            className={`flex flex-col items-center justify-center py-2 px-3 transition-colors ${
              activeTab === 'trainees' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Trainees</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-24 space-y-4">
        {activeTab === 'overview' && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="shadow-md">
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{employerData.totalStudents}</p>
                  <p className="text-xs text-gray-600">Total Students</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{employerData.activeStudents}</p>
                  <p className="text-xs text-gray-600">Active Now</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{employerData.totalHours}</p>
                  <p className="text-xs text-gray-600">Total Hours</p>
                </CardContent>
              </Card>
            </div>

            {/* Pending Actions Alert */}
            {pendingTimeLogs.length > 0 && (
              <Card className="border-2 border-orange-300 bg-orange-50 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-orange-900">Action Required</p>
                      <p className="text-sm text-orange-800 mt-1">
                        {pendingTimeLogs.length} time log{pendingTimeLogs.length > 1 ? 's' : ''} waiting for approval
                      </p>
                      <Button
                        size="sm"
                        onClick={() => setActiveTab('logs')}
                        className="mt-2 bg-orange-600 hover:bg-orange-700"
                      >
                        Review Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Digital Training Agreement */}
            <Card className="border-2 border-dashed border-blue-300 bg-blue-50 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900">Digital Training Agreement</p>
                    <p className="text-xs text-blue-700 mt-1">DOL-compliant digital signing</p>
                    <Button size="sm" variant="outline" className="mt-3 border-blue-400 text-blue-700 hover:bg-blue-100">
                      Sign Digitally
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evaluation Tasks */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Upcoming Evaluations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {evaluationTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{task.studentName}</p>
                      <p className="text-xs text-gray-600">{task.type}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <Button size="sm">Complete</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-700">42</p>
                    <p className="text-xs text-gray-600">Hours Logged</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-700">18</p>
                    <p className="text-xs text-gray-600">Shifts Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'logs' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Time Logs to Approve
            </h2>
            {pendingTimeLogs.map((log) => (
              <Card key={log.id} className="shadow-md border-l-4 border-l-orange-400">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{log.studentName}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">{log.zuid}</p>
                    </div>
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                      Pending
                    </Badge>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hours:</span>
                      <span className="font-bold text-blue-700">{log.hours} hrs</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Tasks completed:</p>
                      <p className="text-sm text-gray-900">{log.tasks}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(log.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(log.id)}
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

        {activeTab === 'trainees' && (
          <>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Student Trainees
            </h2>
            {studentTrainees.map((student) => (
              <Card key={student.id} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-600 truncate">{student.school}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge className={`${jurisdictionColors[student.jurisdiction]} text-xs border`}>
                          {student.jurisdiction}
                        </Badge>
                        <Badge
                          className={`${
                            student.status === 'active'
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : 'bg-gray-100 text-gray-700 border-gray-300'
                          } text-xs border`}
                        >
                          {student.status === 'active' ? 'Active' : 'Completed'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Z-UID:</span>
                      <span className="font-mono text-xs text-blue-700 font-semibold">{student.zuid}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Program:</span>
                      <span className="text-gray-900 text-xs">{student.program}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                      <span className="text-gray-600">Total Hours:</span>
                      <span className="font-bold text-purple-700">{student.totalHours} hrs</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
