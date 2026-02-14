/*
 * ZALPHA Platform - Pacific Co-Op & Work-Based Learning Hub
 * Coordinator Dashboard
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Users,
  Briefcase,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  BarChart3,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { JurisdictionSelector, JurisdictionBadge, ProgramTypeBadge, JURISDICTIONS } from "@/app/components/coop/JurisdictionSelector";
import { CoOpKPICard } from "@/app/components/coop/CoOpCard";
import { CoOpStatusChip } from "@/app/components/coop/CoOpStatusChip";

interface PlacementData {
  id: string;
  studentName: string;
  studentAge: number;
  school: string;
  grade: number;
  employerName: string;
  role: string;
  jurisdictionId: string;
  programId: string;
  status: 'active' | 'pending' | 'completed' | 'at-risk';
  hoursCompleted: number;
  hoursRequired: number;
  lastLogDate: string;
}

interface CohortData {
  id: string;
  name: string;
  jurisdictionId: string;
  programId: string;
  term: string;
  activeStudents: number;
  totalStudents: number;
  startDate: string;
  endDate: string;
}

// Mock data
const mockPlacements: PlacementData[] = [
  {
    id: 'P001',
    studentName: 'Maria Santos',
    studentAge: 16,
    school: 'Marianas High School',
    grade: 11,
    employerName: 'Pacific Islands Hospital',
    role: 'Medical Records Assistant',
    jurisdictionId: 'guam',
    programId: 'guam-wbl',
    status: 'active',
    hoursCompleted: 82,
    hoursRequired: 120,
    lastLogDate: '2026-02-10',
  },
  {
    id: 'P002',
    studentName: 'John Pangelinan',
    studentAge: 17,
    school: 'Marianas High School',
    grade: 12,
    employerName: 'IT Solutions Pacific',
    role: 'Junior Developer',
    jurisdictionId: 'cnmi',
    programId: 'cnmi-coop',
    status: 'active',
    hoursCompleted: 145,
    hoursRequired: 180,
    lastLogDate: '2026-02-11',
  },
  {
    id: 'P003',
    studentName: 'Sarah Ngiramengior',
    studentAge: 16,
    school: 'Palau High School',
    grade: 11,
    employerName: 'Palau Tourism Office',
    role: 'Marketing Intern',
    jurisdictionId: 'palau',
    programId: 'palau-cte',
    status: 'active',
    hoursCompleted: 45,
    hoursRequired: 100,
    lastLogDate: '2026-02-08',
  },
  {
    id: 'P004',
    studentName: 'David Heine',
    studentAge: 17,
    school: 'Marshall Islands High School',
    grade: 12,
    employerName: 'RMI Marine Resources',
    role: 'Research Assistant',
    jurisdictionId: 'rmi',
    programId: 'rmi-work',
    status: 'at-risk',
    hoursCompleted: 25,
    hoursRequired: 120,
    lastLogDate: '2026-01-28',
  },
  {
    id: 'P005',
    studentName: 'Lisa Benjamin',
    studentAge: 15,
    school: 'FSM High School',
    grade: 10,
    employerName: 'Micronesia Chamber of Commerce',
    role: 'Office Assistant',
    jurisdictionId: 'fsm',
    programId: 'fsm-see',
    status: 'active',
    hoursCompleted: 60,
    hoursRequired: 90,
    lastLogDate: '2026-02-11',
  },
];

const mockCohorts: CohortData[] = [
  {
    id: 'COH001',
    name: 'Fall 2026 CNMI Co-Op',
    jurisdictionId: 'cnmi',
    programId: 'cnmi-coop',
    term: 'Fall 2026',
    activeStudents: 45,
    totalStudents: 50,
    startDate: '2026-09-01',
    endDate: '2026-12-15',
  },
  {
    id: 'COH002',
    name: 'Fall 2026 Guam WBL',
    jurisdictionId: 'guam',
    programId: 'guam-wbl',
    term: 'Fall 2026',
    activeStudents: 38,
    totalStudents: 40,
    startDate: '2026-09-01',
    endDate: '2026-12-15',
  },
];

interface CoOpCoordinatorDashboardProps {
  onNavigate?: (page: string) => void;
}

export function CoOpCoordinatorDashboard({ onNavigate }: CoOpCoordinatorDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Calculate KPIs
  const totalStudents = mockPlacements.length;
  const activeEmployers = new Set(mockPlacements.map(p => p.employerName)).size;
  const totalHours = mockPlacements.reduce((sum, p) => sum + p.hoursCompleted, 0);
  const atRiskStudents = mockPlacements.filter(p => p.status === 'at-risk').length;

  // Filter placements
  const filteredPlacements = mockPlacements.filter((placement) => {
    if (selectedJurisdiction && placement.jurisdictionId !== selectedJurisdiction) return false;
    if (selectedProgram && placement.programId !== selectedProgram) return false;
    if (statusFilter !== 'all' && placement.status !== statusFilter) return false;
    if (searchQuery && !placement.studentName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !placement.employerName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Co-Op & WBL Coordinator Portal</h1>
              <p className="text-sm text-gray-600 mt-1">Pacific Islands Work-Based Learning Management</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onNavigate?.('coop-coordinator-cohort-setup')}>
                <Settings className="w-4 h-4 mr-2" />
                Cohort Settings
              </Button>
              <Button onClick={() => onNavigate?.('landing')} variant="outline">
                Exit Portal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="home">Dashboard</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
            <TabsTrigger value="logs">Time Logs</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Home Dashboard */}
          <TabsContent value="home" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filter by Jurisdiction & Program</CardTitle>
              </CardHeader>
              <CardContent>
                <JurisdictionSelector
                  selectedJurisdiction={selectedJurisdiction}
                  selectedProgram={selectedProgram}
                  onJurisdictionChange={setSelectedJurisdiction}
                  onProgramChange={setSelectedProgram}
                  showProgramSelector={true}
                />
                {(selectedJurisdiction || selectedProgram) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      setSelectedJurisdiction('');
                      setSelectedProgram('');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <CoOpKPICard
                title="Active Students"
                value={totalStudents}
                icon={Users}
                iconColor="text-blue-600"
                change="+5 this week"
                trend="up"
              />
              <CoOpKPICard
                title="Active Employers"
                value={activeEmployers}
                icon={Briefcase}
                iconColor="text-green-600"
                change="+2 this month"
                trend="up"
              />
              <CoOpKPICard
                title="Total Hours This Term"
                value={totalHours.toLocaleString()}
                icon={Clock}
                iconColor="text-purple-600"
                change="+450 this week"
                trend="up"
              />
              <CoOpKPICard
                title="At-Risk Placements"
                value={atRiskStudents}
                icon={AlertTriangle}
                iconColor="text-orange-600"
                change={atRiskStudents > 0 ? "Needs attention" : "All on track"}
                trend={atRiskStudents > 0 ? "down" : "neutral"}
              />
            </div>

            {/* Recent Placements Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Placements</CardTitle>
                    <CardDescription>Manage student work-based learning placements</CardDescription>
                  </div>
                  <Button onClick={() => onNavigate?.('coop-coordinator-placement-management')}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Placement
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search and filters */}
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search students or employers..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="at-risk">At Risk</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Table */}
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>School / Grade</TableHead>
                          <TableHead>Employer</TableHead>
                          <TableHead>Jurisdiction</TableHead>
                          <TableHead>Hours</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Log</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPlacements.map((placement) => {
                          const progress = Math.round((placement.hoursCompleted / placement.hoursRequired) * 100);
                          const daysSinceLog = Math.floor(
                            (new Date().getTime() - new Date(placement.lastLogDate).getTime()) / (1000 * 60 * 60 * 24)
                          );
                          
                          return (
                            <TableRow key={placement.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{placement.studentName}</div>
                                  <div className="text-xs text-gray-500">Age {placement.studentAge}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <div>{placement.school}</div>
                                  <div className="text-gray-500">Grade {placement.grade}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <div className="font-medium">{placement.employerName}</div>
                                  <div className="text-gray-500">{placement.role}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <JurisdictionBadge jurisdictionId={placement.jurisdictionId} />
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <div className="font-medium">
                                    {placement.hoursCompleted} / {placement.hoursRequired}
                                  </div>
                                  <div className="text-xs text-gray-500">{progress}%</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <CoOpStatusChip status={placement.status} size="sm" />
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  {new Date(placement.lastLogDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                  {daysSinceLog > 7 && (
                                    <div className="text-xs text-orange-600">({daysSinceLog} days ago)</div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">View</Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placements Tab */}
          <TabsContent value="placements" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Placement Management</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => onNavigate?.('coop-coordinator-placement-management')}>
                      <Filter className="w-4 h-4 mr-2" />
                      Advanced Filters
                    </Button>
                    <Button onClick={() => onNavigate?.('coop-coordinator-placement-management')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Placement
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Full placement management interface with drag-and-drop matching, bulk actions, and detailed student-employer pairing tools.
                </p>
                <Button className="mt-4" onClick={() => onNavigate?.('coop-coordinator-placement-management')}>
                  Open Placement Manager
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cohorts Tab */}
          <TabsContent value="cohorts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Program Cohorts</CardTitle>
                  <Button onClick={() => onNavigate?.('coop-coordinator-cohort-setup')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Cohort
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCohorts.map((cohort) => (
                    <div key={cohort.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{cohort.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <JurisdictionBadge jurisdictionId={cohort.jurisdictionId} />
                            <Badge variant="outline">{cohort.term}</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Active Students</div>
                          <div className="font-semibold">
                            {cohort.activeStudents} / {cohort.totalStudents}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Start Date</div>
                          <div className="font-semibold">
                            {new Date(cohort.startDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">End Date</div>
                          <div className="font-semibold">
                            {new Date(cohort.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Time Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Time Log Approval</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-yellow-50">
                      12 Pending
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPlacements.slice(0, 3).map((placement, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium">{placement.studentName}</div>
                          <div className="text-sm text-gray-600">
                            {placement.employerName} • {new Date(placement.lastLogDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Hours: 4.0 • 2:00 PM - 6:00 PM
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Hours by Student/Employer
                  </CardTitle>
                  <CardDescription>Detailed breakdown of work hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Placements by Jurisdiction
                  </CardTitle>
                  <CardDescription>Cross-jurisdiction analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    WIOA Youth Funding Report
                  </CardTitle>
                  <CardDescription>Funding-linked student data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    FSM SEE Program Report
                  </CardTitle>
                  <CardDescription>World Bank SEE alignment</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
