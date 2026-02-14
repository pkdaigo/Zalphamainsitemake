/*
 * ZALPHA Platform - Pacific Co-Op & Work-Based Learning Hub
 * Employer Portal Dashboard
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Users,
  Clock,
  School,
  CheckCircle,
  XCircle,
  Star,
  Info,
  MessageSquare,
} from "lucide-react";
import { JurisdictionBadge } from "@/app/components/coop/JurisdictionSelector";
import { CoOpKPICard } from "@/app/components/coop/CoOpCard";
import { CoOpStatusChip } from "@/app/components/coop/CoOpStatusChip";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

interface StudentTrainee {
  id: string;
  name: string;
  school: string;
  jurisdictionId: string;
  programType: string;
  status: 'active' | 'pending' | 'completed';
  totalHours: number;
  lastLogDate: string;
}

interface TimeLog {
  id: string;
  studentName: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  tasks: string;
  status: 'pending' | 'approved' | 'returned';
}

interface EvaluationTask {
  id: string;
  studentName: string;
  type: 'mid-term' | 'final';
  dueDate: string;
  completed: boolean;
}

// Mock data
const mockStudents: StudentTrainee[] = [
  {
    id: 'ST001',
    name: 'Maria Santos',
    school: 'Marianas High School',
    jurisdictionId: 'guam',
    programType: 'WBL Youth Employment',
    status: 'active',
    totalHours: 82,
    lastLogDate: '2026-02-10',
  },
  {
    id: 'ST002',
    name: 'John Pangelinan',
    school: 'Marianas High School',
    jurisdictionId: 'cnmi',
    programType: 'Co-Op Education',
    status: 'active',
    totalHours: 95,
    lastLogDate: '2026-02-11',
  },
];

const mockTimeLogs: TimeLog[] = [
  {
    id: 'TL001',
    studentName: 'Maria Santos',
    date: '2026-02-10',
    startTime: '14:00',
    endTime: '17:00',
    hours: 3,
    tasks: 'Organized patient files, updated digital records system, assisted with filing',
    status: 'pending',
  },
  {
    id: 'TL002',
    studentName: 'John Pangelinan',
    date: '2026-02-11',
    startTime: '09:00',
    endTime: '13:00',
    hours: 4,
    tasks: 'Developed web components, participated in team standup, code review',
    status: 'pending',
  },
];

const mockEvaluations: EvaluationTask[] = [
  {
    id: 'EV001',
    studentName: 'Maria Santos',
    type: 'mid-term',
    dueDate: '2026-02-20',
    completed: false,
  },
];

interface CoOpEmployerDashboardProps {
  onNavigate?: (page: string) => void;
}

export function CoOpEmployerDashboard({ onNavigate }: CoOpEmployerDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const employerName = 'Pacific Islands Hospital';
  const totalStudents = mockStudents.length;
  const totalHours = mockStudents.reduce((sum, s) => sum + s.totalHours, 0);
  const partnerSchools = new Set(mockStudents.map(s => s.school)).size;
  const pendingLogs = mockTimeLogs.filter(l => l.status === 'pending').length;

  const handleApproveLog = (logId: string) => {
    console.log('Approved log:', logId);
    // In real app, this would call an API
  };

  const handleRejectLog = (logId: string) => {
    console.log('Rejected log:', logId, 'with comment:', comment);
    // In real app, this would call an API
    setComment('');
    setSelectedLog(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{employerName}</h1>
              <p className="text-sm text-gray-600 mt-1">Employer Partner Portal - Co-Op & WBL Hub</p>
            </div>
            <Button onClick={() => onNavigate?.('landing')} variant="outline">
              Exit Portal
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="time-logs">
              Time Log Approval
              {pendingLogs > 0 && (
                <Badge className="ml-2 bg-yellow-500">{pendingLogs}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
            <TabsTrigger value="info">Support & Info</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <CoOpKPICard
                title="Active Student Trainees"
                value={totalStudents}
                icon={Users}
                iconColor="text-blue-600"
              />
              <CoOpKPICard
                title="Total Student Hours"
                value={totalHours}
                icon={Clock}
                iconColor="text-green-600"
                change="This term"
              />
              <CoOpKPICard
                title="Partner Schools"
                value={partnerSchools}
                icon={School}
                iconColor="text-purple-600"
              />
              <CoOpKPICard
                title="Pending Approvals"
                value={pendingLogs}
                icon={CheckCircle}
                iconColor="text-orange-600"
                change="Needs action"
              />
            </div>

            {/* Student List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Student Trainees</CardTitle>
                <CardDescription>Students currently placed at your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead>Jurisdiction</TableHead>
                        <TableHead>Program Type</TableHead>
                        <TableHead>Total Hours</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Log</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.school}</TableCell>
                          <TableCell>
                            <JurisdictionBadge jurisdictionId={student.jurisdictionId} />
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.programType}</Badge>
                          </TableCell>
                          <TableCell className="font-semibold">{student.totalHours}</TableCell>
                          <TableCell>
                            <CoOpStatusChip status={student.status} size="sm" />
                          </TableCell>
                          <TableCell>
                            {new Date(student.lastLogDate).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('time-logs')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    Review Time Logs
                  </CardTitle>
                  <CardDescription>{pendingLogs} pending approval</CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('evaluations')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    Complete Evaluations
                  </CardTitle>
                  <CardDescription>{mockEvaluations.filter(e => !e.completed).length} evaluation(s) due</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          {/* Time Logs Tab */}
          <TabsContent value="time-logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Log Approval</CardTitle>
                <CardDescription>Review and approve student work hour submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTimeLogs.map((log) => (
                    <div key={log.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{log.studentName}</span>
                            <CoOpStatusChip status={log.status} size="sm" />
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>
                              <strong>Date:</strong> {new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div>
                              <strong>Time:</strong> {log.startTime} - {log.endTime} ({log.hours} hours)
                            </div>
                            <div>
                              <strong>Tasks:</strong> {log.tasks}
                            </div>
                          </div>
                        </div>
                      </div>

                      {log.status === 'pending' && (
                        <div className="space-y-3 pt-3 border-t">
                          {selectedLog === log.id && (
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Add comment (optional for approval, required for rejection)
                              </label>
                              <Textarea
                                placeholder="Add any notes or feedback..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3}
                              />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 text-red-600 hover:bg-red-50 border-red-300"
                              onClick={() => {
                                if (selectedLog === log.id && comment) {
                                  handleRejectLog(log.id);
                                } else {
                                  setSelectedLog(log.id);
                                }
                              }}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              {selectedLog === log.id ? 'Confirm Reject' : 'Reject'}
                            </Button>
                            <Button
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveLog(log.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mobile-friendly note */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Mobile Access</AlertTitle>
              <AlertDescription>
                Supervisors can approve time logs directly from their mobile devices for quick, on-the-go approvals.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Evaluations Tab */}
          <TabsContent value="evaluations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Evaluations</CardTitle>
                <CardDescription>Complete mid-term and final evaluations for your student trainees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvaluations.map((evaluation) => (
                    <div key={evaluation.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{evaluation.studentName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={evaluation.type === 'final' ? 'bg-purple-50' : 'bg-blue-50'}>
                              {evaluation.type === 'mid-term' ? 'Mid-Term' : 'Final'} Evaluation
                            </Badge>
                            <span className="text-sm text-gray-600">
                              Due: {new Date(evaluation.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button>
                          <Star className="w-4 h-4 mr-2" />
                          Complete Evaluation
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Please provide ratings and comments on this student's performance, work ethic, skills development, and professionalism.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support & Info Tab */}
          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Employer Responsibilities & Guidelines
                </CardTitle>
                <CardDescription>Key rules and expectations by jurisdiction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* CNMI */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <JurisdictionBadge jurisdictionId="cnmi" />
                      <h3 className="font-semibold">CNMI Co-Op Education</h3>
                    </div>
                    <ul className="text-sm space-y-1 ml-4 list-disc">
                      <li>Structured cooperative education program linking classroom and workplace</li>
                      <li>Requires designated workplace mentor/supervisor</li>
                      <li>Regular feedback and skill development tracking expected</li>
                      <li>Coordination with school Co-Op coordinator required</li>
                    </ul>
                  </div>

                  {/* Guam */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <JurisdictionBadge jurisdictionId="guam" />
                      <h3 className="font-semibold">Guam Youth Employment (WBL)</h3>
                    </div>
                    <ul className="text-sm space-y-1 ml-4 list-disc">
                      <li><strong>Age 14-15:</strong> Max 3 hours/day school days, 18 hours/week; 7 AM - 7 PM</li>
                      <li><strong>Age 16-17:</strong> Max 4 hours/day school days, 40 hours/week; 5 AM - 10 PM</li>
                      <li>Employment certificate required for all youth under 18</li>
                      <li>Must comply with federal and territorial wage laws</li>
                      <li>No hazardous work assignments</li>
                    </ul>
                  </div>

                  {/* FSM */}
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <JurisdictionBadge jurisdictionId="fsm" />
                      <h3 className="font-semibold">FSM SEE / CTE WBL & Apprenticeships</h3>
                    </div>
                    <ul className="text-sm space-y-1 ml-4 list-disc">
                      <li>Aligned with World Bank Secondary Education Enhancement (SEE) project</li>
                      <li>Career Technical Education (CTE) pathway focus</li>
                      <li>May include formal apprenticeship structures</li>
                      <li>Skills-based competency assessment required</li>
                    </ul>
                  </div>

                  {/* Palau */}
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <JurisdictionBadge jurisdictionId="palau" />
                      <h3 className="font-semibold">Palau CTE WBL & Career Skills</h3>
                    </div>
                    <ul className="text-sm space-y-1 ml-4 list-disc">
                      <li>Career Technical Education integrated internships</li>
                      <li>Career skills track alignment expected</li>
                      <li>Industry-recognized skill development focus</li>
                      <li>Coordination with Palau CTE programs</li>
                    </ul>
                  </div>

                  {/* RMI */}
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <JurisdictionBadge jurisdictionId="rmi" />
                      <h3 className="font-semibold">RMI PSS Annual Work Program</h3>
                    </div>
                    <ul className="text-sm space-y-1 ml-4 list-disc">
                      <li>Annual student work program through Public School System</li>
                      <li>Structured term-based placements</li>
                      <li>Educational and work readiness focus</li>
                      <li>PSS coordinator oversight required</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Contact your jurisdiction's Co-Op/WBL coordinator for questions about student placements, evaluations, or program requirements.
                </p>
                <Button variant="outline">Contact Coordinator</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
