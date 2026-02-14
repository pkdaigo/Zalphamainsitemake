/**
 * ZALPHA Student Dashboard - Mobile First
 * Features: Z-UID, Daily Pulse, Hours Tracking, GPS Clock-In (placeholder), Remote/APAC Jobs
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  Clock,
  MapPin,
  Briefcase,
  TrendingUp,
  Award,
  Calendar,
  Smile,
  Meh,
  Frown,
  Heart,
  Star,
  Globe,
  DollarSign,
  CheckCircle,
  AlertCircle,
  MapPinned,
} from 'lucide-react';

// Mock student data
const studentData = {
  name: 'Maria Santos',
  avatar: 'MS',
  jurisdiction: 'CNMI',
  zuid: 'Z-CNMI-2026-0142',
  school: 'Marianas High School',
  grade: 11,
  age: 16,
  currentPlacement: {
    employer: 'Pacific Islands Hospital',
    role: 'Medical Records Assistant',
    hoursCompleted: 82,
    hoursRequired: 120,
    supervisor: 'Dr. James Chen',
  },
  dailyPulseStreak: 12,
  lastPulseDate: '2026-02-13',
};

const upcomingShifts = [
  { date: '2026-02-15', time: '2:00 PM - 5:00 PM', location: 'Medical Records Dept' },
  { date: '2026-02-17', time: '2:00 PM - 5:00 PM', location: 'Medical Records Dept' },
];

const recentLogs = [
  { date: '2026-02-14', hours: 4, status: 'approved' as const },
  { date: '2026-02-13', hours: 4, status: 'approved' as const },
  { date: '2026-02-12', hours: 3, status: 'pending' as const },
];

const remoteJobs = [
  { id: 1, title: 'Customer Service Rep', employer: 'TechCorp Philippines', location: 'Remote - Philippines', pay: '$8-12/hr', type: 'Part-time' },
  { id: 2, title: 'Data Entry Specialist', employer: 'Global BPO Services', location: 'Remote - APAC', pay: '$7-10/hr', type: 'Full-time' },
  { id: 3, title: 'Social Media Assistant', employer: 'Marketing Hub Japan', location: 'Remote - Japan', pay: '$10-15/hr', type: 'Part-time' },
];

const jurisdictionColors: Record<string, string> = {
  CNMI: 'bg-purple-100 text-purple-700 border-purple-300',
  Guam: 'bg-cyan-100 text-cyan-700 border-cyan-300',
  FSM: 'bg-blue-100 text-blue-700 border-blue-300',
  Palau: 'bg-green-100 text-green-700 border-green-300',
  RMI: 'bg-pink-100 text-pink-700 border-pink-300',
};

interface StudentDashboardMobileProps {
  onNavigate?: (page: string) => void;
}

export function StudentDashboardMobile({ onNavigate }: StudentDashboardMobileProps) {
  const [showDailyPulse, setShowDailyPulse] = useState(false);
  const [pulseRating, setPulseRating] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs'>('overview');

  const progressPercentage = Math.round(
    (studentData.currentPlacement.hoursCompleted / studentData.currentPlacement.hoursRequired) * 100
  );

  const handlePulseSubmit = () => {
    if (pulseRating) {
      console.log('Pulse submitted:', pulseRating);
      setShowDailyPulse(false);
      setPulseRating(null);
    }
  };

  const pulseEmojis = [
    { value: 1, icon: Frown, label: 'Terrible', color: 'text-red-500' },
    { value: 2, icon: Meh, label: 'Not Great', color: 'text-orange-500' },
    { value: 3, icon: Smile, label: 'Okay', color: 'text-yellow-500' },
    { value: 4, icon: Smile, label: 'Good', color: 'text-green-500' },
    { value: 5, icon: Heart, label: 'Amazing!', color: 'text-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Mobile Header with Student Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 pb-6 sticky top-0 z-20 shadow-lg">
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold flex-shrink-0">
            {studentData.avatar}
          </div>
          
          {/* Student Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold truncate">{studentData.name}</h1>
            <p className="text-sm text-white/90 truncate">{studentData.school}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge className={`${jurisdictionColors[studentData.jurisdiction]} text-xs border`}>
                {studentData.jurisdiction}
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-white/40 text-xs">
                Grade {studentData.grade}
              </Badge>
            </div>
          </div>
        </div>

        {/* Z-UID */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-between">
          <span className="text-xs text-white/80 font-medium">Student ID:</span>
          <span className="text-sm font-bold text-white">{studentData.zuid}</span>
        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
              activeTab === 'overview' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Briefcase className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
              activeTab === 'jobs' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Globe className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Remote Jobs</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-24 space-y-4">
        {activeTab === 'overview' && (
          <>
            {/* Daily Pulse Card */}
            <Card className="border-2 border-pink-200 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    Daily Pulse
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-gray-700">{studentData.dailyPulseStreak}</span>
                    <span className="text-xs text-gray-500">day streak</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!showDailyPulse ? (
                  <Button
                    onClick={() => setShowDailyPulse(true)}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    How was work today? 😊
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 text-center">How are you feeling about work today?</p>
                    <div className="flex justify-around">
                      {pulseEmojis.map((emoji) => (
                        <button
                          key={emoji.value}
                          onClick={() => setPulseRating(emoji.value)}
                          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                            pulseRating === emoji.value
                              ? 'bg-blue-100 scale-110'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <emoji.icon className={`w-7 h-7 ${emoji.color}`} />
                          <span className="text-xs text-gray-600">{emoji.label}</span>
                        </button>
                      ))}
                    </div>
                    <Button
                      onClick={handlePulseSubmit}
                      disabled={!pulseRating}
                      className="w-full"
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hours & Placements */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  My Hours & Placements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">{studentData.currentPlacement.employer}</span>
                    <span className="text-gray-600">
                      {studentData.currentPlacement.hoursCompleted}/{studentData.currentPlacement.hoursRequired} hrs
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">{progressPercentage}% Complete</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Current Role</p>
                  <p className="text-sm text-gray-600">{studentData.currentPlacement.role}</p>
                  <p className="text-xs text-gray-500">Supervisor: {studentData.currentPlacement.supervisor}</p>
                </div>
              </CardContent>
            </Card>

            {/* GPS Clock-In Placeholder */}
            <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
              <CardContent className="py-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                    <MapPinned className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">GPS Clock-In</p>
                    <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Clock in/out with location verification
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Shifts */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  Upcoming Shifts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingShifts.map((shift, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-green-700 font-semibold">
                        {new Date(shift.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-lg font-bold text-green-700">
                        {new Date(shift.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{shift.time}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {shift.location}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Time Logs */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Recent Time Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">
                        {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{log.hours} hrs</span>
                    </div>
                    {log.status === 'approved' ? (
                      <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  My Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
                      <Award className="w-8 h-8 text-yellow-500" />
                    </div>
                    <p className="text-xs text-gray-600">50 Hours</p>
                  </div>
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                      <Star className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-xs text-gray-600">Perfect Attendance</p>
                  </div>
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-1">
                      <Heart className="w-8 h-8 text-pink-500" />
                    </div>
                    <p className="text-xs text-gray-600">10-Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'jobs' && (
          <>
            {/* Remote & APAC Jobs */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Remote & Asia-Pacific Opportunities
              </h2>
              {remoteJobs.map((job) => (
                <Card key={job.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.employer}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <Badge variant="outline" className="text-xs">{job.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
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
      </div>
    </div>
  );
}
