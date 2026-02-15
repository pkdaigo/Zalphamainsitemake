/**
 * ZALPHA Co-Op Messaging Demo Page
 * Shows the messaging system with sample data
 */

import { CoOpMessaging } from '@/app/components/CoOpMessaging';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { 
  MessageCircle, 
  Users, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight 
} from 'lucide-react';

export function CoOpMessagingDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-700">
            New Feature
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Co-Op Messaging System
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Direct messaging for students, employers, and administrators with automatic compliance tracking
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <MessageCircle className="w-10 h-10 text-blue-500 mb-2" />
              <CardTitle className="text-lg">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Pre-built messages for common situations: late arrivals, time-off requests, and absence notifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-10 h-10 text-emerald-500 mb-2" />
              <CardTitle className="text-lg">Three-Way Thread</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                All messages automatically CC'd to school co-op administrators for oversight and record-keeping
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-10 h-10 text-violet-500 mb-2" />
              <CardTitle className="text-lg">Compliance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Every message recorded with timestamps and metadata for attendance and WIOA compliance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Placement Summary</p>
                  <p className="text-sm text-slate-600">Shows student name, employer, role, schedule, and today's shift at the top</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Role Differentiation</p>
                  <p className="text-sm text-slate-600">Clear visual distinction between Student (blue), Employer (green), and Admin (purple)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Status Tags</p>
                  <p className="text-sm text-slate-600">Messages show status: Pending, Acknowledged, Approved, or Follow-up Required</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Auto CC Admin</p>
                  <p className="text-sm text-slate-600">All student messages automatically shared with school coordinator</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">File Attachments</p>
                  <p className="text-sm text-slate-600">Students can attach photos or documents (doctor's notes, etc.)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Mobile-First Design</p>
                  <p className="text-sm text-slate-600">Optimized for 390x844 mobile screens with thumb-friendly controls</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Templates */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Message Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 mb-1">I'll be late</p>
                  <p className="text-sm text-slate-600">Quick notification with expected arrival time and reason</p>
                  <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                    "Hi, I will be late to my shift today. Expected arrival time: 10:00 AM. Reason: Traffic on Beach Road. Sorry for the inconvenience."
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 mb-1">Request time off</p>
                  <p className="text-sm text-slate-600">Formal request with date and reason (requires employer approval)</p>
                  <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                    "Hi, I would like to request time off on Friday, February 16, 2024. Reason: Doctor's appointment. Please let me know if this works. Thank you!"
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 mb-1">Cannot attend shift</p>
                  <p className="text-sm text-slate-600">Emergency absence notification with reason</p>
                  <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                    "Hi, I am unable to attend my shift today (Wednesday, February 14, 2024). Reason: Family emergency. I apologize for the short notice."
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Demo */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Live Demo</h2>
          <p className="text-slate-600 mb-6">Try sending a message using the interface below</p>
          
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-800 mb-4">
            <Shield className="w-4 h-4" />
            <span>This is a demo. Messages are not actually sent.</span>
          </div>
        </div>

        {/* Mobile Frame */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            {/* Phone Frame */}
            <div className="bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl">
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-inner">
                <CoOpMessaging />
              </div>
            </div>

            {/* Floating Labels */}
            <div className="absolute -left-4 top-20 hidden lg:block">
              <div className="bg-white rounded-lg shadow-lg p-3 border border-slate-200 max-w-xs">
                <p className="text-xs font-medium text-slate-900 mb-1">Placement Summary</p>
                <p className="text-xs text-slate-600">Shows student, employer, role, and today's shift</p>
              </div>
            </div>

            <div className="absolute -right-4 top-40 hidden lg:block">
              <div className="bg-white rounded-lg shadow-lg p-3 border border-slate-200 max-w-xs">
                <p className="text-xs font-medium text-slate-900 mb-1">Compliance Banner</p>
                <p className="text-xs text-slate-600">All messages recorded for attendance tracking</p>
              </div>
            </div>

            <div className="absolute -left-4 bottom-40 hidden lg:block">
              <div className="bg-white rounded-lg shadow-lg p-3 border border-slate-200 max-w-xs">
                <p className="text-xs font-medium text-slate-900 mb-1">Quick Templates</p>
                <p className="text-xs text-slate-600">Pre-filled messages for common situations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Points */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Integration with Existing Systems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Time Logs</p>
                  <p className="text-sm text-slate-600">Messages automatically linked to attendance records and GPS clock-in/out data</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Placement Records</p>
                  <p className="text-sm text-slate-600">All threads stored as part of student's co-op placement history</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">WIOA Compliance</p>
                  <p className="text-sm text-slate-600">Message metadata used for Perkins V and RAPIDS reporting</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Admin Dashboard</p>
                  <p className="text-sm text-slate-600">Coordinators can view all threads, export for audits, and track response times</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
            View Full Documentation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
