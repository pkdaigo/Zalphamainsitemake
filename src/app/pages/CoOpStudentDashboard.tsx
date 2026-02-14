/*
 * ZALPHA Platform - Pacific Co-Op & Work-Based Learning Hub
 * Student Portal Dashboard
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import {
  Calendar,
  Clock,
  Briefcase,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  FileText,
  User,
  Home,
  History,
  BarChart3,
} from "lucide-react";
import { JurisdictionBadge, ProgramTypeBadge } from "@/app/components/coop/JurisdictionSelector";
import { CoOpCard, CoOpKPICard } from "@/app/components/coop/CoOpCard";
import { CoOpProgressBar } from "@/app/components/coop/CoOpProgressBar";
import { CoOpStatusChip } from "@/app/components/coop/CoOpStatusChip";
import { GuamWeeklyHoursTracker } from "@/app/components/coop/GuamAgeHourValidator";

interface StudentData {
  id: string;
  name: string;
  school: string;
  grade: number;
  age: number;
  jurisdictionId: string;
  programId: string;
  cohortName: string;
}

interface PlacementData {
  id: string;
  employerName: string;
  employerLogo?: string;
  role: string;
  supervisor: string;
  supervisorEmail: string;
  status: 'active' | 'pending' | 'completed';
  hoursCompleted: number;
  hoursRequired: number;
  weeklyHours: number;
  startDate: string;
  endDate: string;
}

interface ShiftData {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  location: string;
}

interface FeedbackData {
  id: string;
  from: string;
  date: string;
  rating: number;
  comment: string;
}

interface AlertData {
  id: string;
  type: 'warning' | 'info' | 'error';
  message: string;
}

// Mock data
const mockStudent: StudentData = {
  id: 'STU001',
  name: 'Maria Santos',
  school: 'Marianas High School',
  grade: 11,
  age: 16,
  jurisdictionId: 'guam',
  programId: 'guam-wbl',
  cohortName: 'Fall 2026 WBL Cohort',
};

const mockPlacement: PlacementData = {
  id: 'PLC001',
  employerName: 'Pacific Islands Hospital',
  role: 'Medical Records Assistant',
  supervisor: 'Dr. James Chen',
  supervisorEmail: 'jchen@pihospital.com',
  status: 'active',
  hoursCompleted: 82,
  hoursRequired: 120,
  weeklyHours: 14,
  startDate: '2026-09-15',
  endDate: '2026-12-15',
};

const mockShifts: ShiftData[] = [
  { id: 'SH1', date: '2026-02-12', startTime: '14:00', endTime: '17:00', hours: 3, location: 'Medical Records Dept' },
  { id: 'SH2', date: '2026-02-13', startTime: '14:00', endTime: '18:00', hours: 4, location: 'Medical Records Dept' },
  { id: 'SH3', date: '2026-02-14', startTime: '09:00', endTime: '13:00', hours: 4, location: 'Medical Records Dept' },
  { id: 'SH4', date: '2026-02-17', startTime: '14:00', endTime: '17:00', hours: 3, location: 'Medical Records Dept' },
];

const mockFeedback: FeedbackData[] = [
  {
    id: 'FB1',
    from: 'Dr. James Chen',
    date: '2026-02-05',
    rating: 5,
    comment: 'Maria shows excellent attention to detail and professionalism. She quickly learned our filing system and always asks great questions.',
  },
];

const mockAlerts: AlertData[] = [
  {
    id: 'AL1',
    type: 'warning',
    message: 'Missing time log for Feb 10 - please submit by Feb 15',
  },
  {
    id: 'AL2',
    type: 'info',
    message: 'Mid-term evaluation available - complete by Feb 20',
  },
];

interface CoOpStudentDashboardProps {
  onNavigate?: (page: string) => void;
}

export function CoOpStudentDashboard({ onNavigate }: CoOpStudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileNav, setMobileNav] = useState('home');

  const student = mockStudent;
  const placement = mockPlacement;
  const shifts = mockShifts;
  const feedback = mockFeedback;
  const alerts = mockAlerts;

  // Calculate progress percentage
  const progressPercentage = Math.round((placement.hoursCompleted / placement.hoursRequired) * 100);
  const isGuam = student.jurisdictionId === 'guam';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Desktop Header */}
      <div className="hidden md:block bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                <JurisdictionBadge jurisdictionId={student.jurisdictionId} />
                <ProgramTypeBadge programId={student.programId} />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {student.school} • Grade {student.grade} • {student.cohortName}
              </p>
            </div>
            <Button onClick={() => onNavigate?.('landing')} variant="outline">
              Exit Portal
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold text-gray-900">{student.name}</h1>
            <div className="flex gap-2">
              <JurisdictionBadge jurisdictionId={student.jurisdictionId} />
            </div>
          </div>
          <p className="text-xs text-gray-600">{student.school} • Grade {student.grade}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                variant={alert.type === 'error' ? 'destructive' : 'default'}
                className={
                  alert.type === 'warning'
                    ? 'border-orange-500 bg-orange-50'
                    : alert.type === 'info'
                    ? 'border-blue-500 bg-blue-50'
                    : ''
                }
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="hidden md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="placement">Placement Details</TabsTrigger>
            <TabsTrigger value="logs">Time Logs</TabsTrigger>
            <TabsTrigger value="history">History & Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CoOpCard
                title="Current Placement"
                icon={Briefcase}
                iconColor="text-blue-600"
              >
                <div className="space-y-2">
                  <div className="font-semibold text-lg">{placement.employerName}</div>
                  <div className="text-sm text-gray-600">{placement.role}</div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </CoOpCard>

              <CoOpCard
                title="Hours Progress"
                icon={Clock}
                iconColor="text-purple-600"
              >
                <div className="space-y-3">
                  <div className="text-2xl font-bold">
                    {placement.hoursCompleted} / {placement.hoursRequired}
                  </div>
                  <CoOpProgressBar
                    current={placement.hoursCompleted}
                    required={placement.hoursRequired}
                    showNumbers={false}
                  />
                  <div className="text-sm text-gray-600">{progressPercentage}% Complete</div>
                </div>
              </CoOpCard>

              <CoOpCard
                title="Latest Feedback"
                icon={TrendingUp}
                iconColor="text-green-600"
              >
                {feedback.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback[0].rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{feedback[0].comment}</p>
                    <p className="text-xs text-gray-500">From: {feedback[0].from}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No feedback yet</p>
                )}
              </CoOpCard>
            </div>

            {/* Guam Weekly Hours Tracker */}
            {isGuam && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    Guam Youth Employment Compliance
                  </CardTitle>
                  <CardDescription>
                    Age {student.age} - Federal and Guam territorial work hour limits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GuamWeeklyHoursTracker age={student.age} weeklyHours={placement.weeklyHours} />
                </CardContent>
              </Card>
            )}

            {/* Upcoming Shifts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Shifts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {new Date(shift.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="text-sm text-gray-600">
                          {shift.startTime} - {shift.endTime} • {shift.location}
                        </div>
                      </div>
                      <Badge variant="outline">{shift.hours} hrs</Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => setActiveTab('logs')}>
                  View All Shifts & Log Hours
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                size="lg"
                className="h-auto py-4"
                onClick={() => setActiveTab('logs')}
              >
                <FileText className="w-5 h-5 mr-2" />
                Log Hours
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-auto py-4"
                onClick={() => setActiveTab('placement')}
              >
                <Briefcase className="w-5 h-5 mr-2" />
                View Placement Details
              </Button>
            </div>
          </TabsContent>

          {/* Placement Details Tab */}
          <TabsContent value="placement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Overview</CardTitle>
                <CardDescription>{placement.employerName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Role</label>
                    <p className="text-base">{placement.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Supervisor</label>
                    <p className="text-base">{placement.supervisor}</p>
                    <p className="text-sm text-gray-500">{placement.supervisorEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Start Date</label>
                    <p className="text-base">{new Date(placement.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">End Date</label>
                    <p className="text-base">{new Date(placement.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Hours Progress</label>
                  <CoOpProgressBar
                    current={placement.hoursCompleted}
                    required={placement.hoursRequired}
                  />
                </div>

                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Learning Goals</label>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span className="text-sm">Learn medical records management systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span className="text-sm">Understand HIPAA compliance and patient privacy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className="text-sm">Develop professional communication skills</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Time Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Time & Activity Logs</CardTitle>
                    <CardDescription>Track your work hours and activities</CardDescription>
                  </div>
                  <Button onClick={() => onNavigate?.('coop-student-time-log')}>
                    <FileText className="w-4 h-4 mr-2" />
                    New Log Entry
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">
                            {new Date(shift.date).toLocaleDateString()}
                          </span>
                          <CoOpStatusChip status="approved" size="sm" />
                        </div>
                        <div className="text-sm text-gray-600">
                          {shift.startTime} - {shift.endTime} • {shift.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">{shift.hours}h</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History & Profile Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Co-Op / WBL History</CardTitle>
                <CardDescription>Your past placements and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">Pacific Islands Hospital</h3>
                        <p className="text-sm text-gray-600">Medical Records Assistant</p>
                      </div>
                      <Badge className="bg-blue-600 text-white">Current</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Fall 2026 • {placement.hoursCompleted} hours completed
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">Pacific Star Hotel</h3>
                        <p className="text-sm text-gray-600">Front Desk Assistant</p>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Spring 2026 • 100 hours completed • Rating: ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills & Reflections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Skills Developed</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Medical Records</Badge>
                      <Badge variant="secondary">HIPAA Compliance</Badge>
                      <Badge variant="secondary">Customer Service</Badge>
                      <Badge variant="secondary">Time Management</Badge>
                      <Badge variant="secondary">Professional Communication</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${
              activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('placement')}
            className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${
              activeTab === 'placement' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-xs mt-1">Placement</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${
              activeTab === 'logs' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs mt-1">Logs</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${
              activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-xs mt-1">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}
