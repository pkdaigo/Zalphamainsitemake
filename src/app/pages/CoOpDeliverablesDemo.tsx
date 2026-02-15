/**
 * ZALPHA Co-Op Deliverables Demo Page
 * Showcases the deliverables tracking system
 */

import { CoOpDeliverables } from '@/app/components/CoOpDeliverables';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import {
  FileText,
  Users,
  Wrench,
  Lightbulb,
  CheckCircle,
  Target,
  TrendingUp,
  GraduationCap,
  ArrowRight,
  BarChart3,
} from 'lucide-react';

export function CoOpDeliverablesDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-teal-100 text-teal-700">
            Skills Tracking
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Co-Op Deliverables Module
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Define, assign, and track clear deliverables for high school co-op students across four business categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <FileText className="w-8 h-8 text-violet-500 mb-2" />
              <CardTitle className="text-base">Administration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 mb-2">
                Office tasks, documentation, SOPs
              </p>
              <div className="text-xs text-slate-500">
                Examples: HR docs, filing, emails
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <Users className="w-8 h-8 text-cyan-500 mb-2" />
              <CardTitle className="text-base">Customer Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 mb-2">
                POS systems, customer interaction
              </p>
              <div className="text-xs text-slate-500">
                Examples: POS training, greetings
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <Wrench className="w-8 h-8 text-emerald-500 mb-2" />
              <CardTitle className="text-base">Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 mb-2">
                Hands-on tasks, inventory, maintenance
              </p>
              <div className="text-xs text-slate-500">
                Examples: Restocking, inspections
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <Lightbulb className="w-8 h-8 text-amber-500 mb-2" />
              <CardTitle className="text-base">R&D / Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 mb-2">
                Brainstorming, improvements, innovation
              </p>
              <div className="text-xs text-slate-500">
                Examples: Ideas, feedback analysis
              </div>
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
                  <p className="font-medium text-slate-900">Category-Based Organization</p>
                  <p className="text-sm text-slate-600">
                    Four clear categories: Admin, Customer Service, Operations, and R&D
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Progress Tracking</p>
                  <p className="text-sm text-slate-600">
                    Visual indicators: Not Started, In Progress (with %), Completed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Skill Focus Areas</p>
                  <p className="text-sm text-slate-600">
                    Each deliverable maps to specific skills: communication, organization, technical, etc.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">School Outcomes Mapping</p>
                  <p className="text-sm text-slate-600">
                    Optional mapping to learning objectives and credit requirements
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Due Dates & Alerts</p>
                  <p className="text-sm text-slate-600">
                    Track due dates with overdue warnings and countdown displays
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Mobile-First Design</p>
                  <p className="text-sm text-slate-600">
                    Optimized for 390x844 screens with thumb-friendly controls
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Deliverables */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sample Deliverables for High School Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-violet-500 pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-violet-500" />
                  <span className="font-semibold text-slate-900">Administration</span>
                </div>
                <p className="text-sm text-slate-700 font-medium mb-1">
                  Create HR SOPs
                </p>
                <p className="text-xs text-slate-600 mb-2">
                  Help create Company/Organization Standard Operating Procedures for Student Co-Op Program
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Target className="w-3 h-3" />
                    <span>Skill: Documentation & Writing</span>
                  </div>
                  <div className="flex items-center gap-1 text-violet-600">
                    <GraduationCap className="w-3 h-3" />
                    <span>Maps to: Writing Skills</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-cyan-500 pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-cyan-500" />
                  <span className="font-semibold text-slate-900">Customer Service</span>
                </div>
                <p className="text-sm text-slate-700 font-medium mb-1">
                  POS System Training
                </p>
                <p className="text-xs text-slate-600 mb-2">
                  Learn and operate the POS (Point of Sale) system for basic transactions
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Target className="w-3 h-3" />
                    <span>Skill: Customer Service & Technology</span>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-600">
                    <GraduationCap className="w-3 h-3" />
                    <span>Maps to: Technical Skills</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-slate-900">Operations</span>
                </div>
                <p className="text-sm text-slate-700 font-medium mb-1">
                  Inventory Check & Restocking
                </p>
                <p className="text-xs text-slate-600 mb-2">
                  Assist with inventory check and restocking procedures
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Target className="w-3 h-3" />
                    <span>Skill: Organization & Detail</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <GraduationCap className="w-3 h-3" />
                    <span>Maps to: Problem Solving</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-slate-900">Research & Development</span>
                </div>
                <p className="text-sm text-slate-700 font-medium mb-1">
                  Customer Experience Ideas
                </p>
                <p className="text-xs text-slate-600 mb-2">
                  Brainstorm and document 3 new ideas to improve customer experience
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Target className="w-3 h-3" />
                    <span>Skill: Critical Thinking & Innovation</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600">
                    <GraduationCap className="w-3 h-3" />
                    <span>Maps to: Communication</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Points */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              System Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Time Logs</p>
                  <p className="text-sm text-slate-600">
                    Students can tag time entries with specific deliverables they worked on
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Evaluations</p>
                  <p className="text-sm text-slate-600">
                    Include deliverable progress in performance evaluations and ratings
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Coordinator Dashboard</p>
                  <p className="text-sm text-slate-600">
                    Admins can view deliverables across all placements and generate reports by skill/outcome
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">DOL Reporting</p>
                  <p className="text-sm text-slate-600">
                    Skills and competencies automatically included in WIOA and Perkins V reports
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Transcripts & Credits</p>
                  <p className="text-sm text-slate-600">
                    School outcomes mapping enables transcript entries and credit allocation
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <Target className="w-10 h-10 text-blue-500 mb-2" />
              <CardTitle className="text-lg">For Employers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>✓ Clear expectations set from day one</p>
              <p>✓ Track student progress systematically</p>
              <p>✓ Document skill development</p>
              <p>✓ Easy performance evaluations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="w-10 h-10 text-emerald-500 mb-2" />
              <CardTitle className="text-lg">For Students</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>✓ Know exactly what's expected</p>
              <p>✓ See skill progression clearly</p>
              <p>✓ Build a portfolio of work</p>
              <p>✓ Earn school credit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <GraduationCap className="w-10 h-10 text-violet-500 mb-2" />
              <CardTitle className="text-lg">For Coordinators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>✓ Monitor all placements at once</p>
              <p>✓ Ensure learning objectives met</p>
              <p>✓ Generate compliance reports</p>
              <p>✓ Award credit based on outcomes</p>
            </CardContent>
          </Card>
        </div>

        {/* Live Demo */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Live Demo</h2>
          <p className="text-slate-600 mb-6">
            Try adding, editing, and tracking deliverables below
          </p>

          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-lg px-4 py-2 text-sm text-teal-800 mb-4">
            <CheckCircle className="w-4 h-4" />
            <span>This is a demo. Changes are not saved.</span>
          </div>
        </div>

        {/* Mobile Frame */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            {/* Phone Frame */}
            <div className="bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl">
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-inner" style={{ height: '844px' }}>
                <CoOpDeliverables />
              </div>
            </div>

            {/* Floating Labels */}
            <div className="absolute -left-4 top-24 hidden lg:block">
              <div className="bg-white rounded-lg shadow-lg p-3 border border-slate-200 max-w-xs">
                <p className="text-xs font-medium text-slate-900 mb-1">Student Header</p>
                <p className="text-xs text-slate-600">Shows placement details and schedule</p>
              </div>
            </div>

            <div className="absolute -right-4 top-48 hidden lg:block">
              <div className="bg-white rounded-lg shadow-lg p-3 border border-slate-200 max-w-xs">
                <p className="text-xs font-medium text-slate-900 mb-1">Category Tags</p>
                <p className="text-xs text-slate-600">Color-coded: Admin, Service, Operations, R&D</p>
              </div>
            </div>

            <div className="absolute -left-4 bottom-32 hidden lg:block">
              <div className="bg-white rounded-lg shadow-lg p-3 border border-slate-200 max-w-xs">
                <p className="text-xs font-medium text-slate-900 mb-1">Progress Tracking</p>
                <p className="text-xs text-slate-600">Visual indicators and percentage completion</p>
              </div>
            </div>
          </div>
        </div>

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
