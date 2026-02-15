/**
 * ZALPHA Deliverables Marketing Demo
 * Showcases the value of structured co-op deliverables for all stakeholders
 */

import { useState } from 'react';
import { StudentResumeAdvantage } from '@/app/components/StudentResumeAdvantage';
import { EmployerTalentAttraction } from '@/app/components/EmployerTalentAttraction';
import { CoOpAdminProgramDesign } from '@/app/components/CoOpAdminProgramDesign';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  User,
  Building,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Target,
  FileText,
  BarChart3,
} from 'lucide-react';

type Screen = 'overview' | 'student' | 'employer' | 'admin';

export function DeliverablesMarketingDemo() {
  const [activeScreen, setActiveScreen] = useState<Screen>('overview');

  if (activeScreen === 'student') {
    return (
      <div>
        <div className="bg-white border-b border-slate-200 p-4">
          <Button variant="outline" onClick={() => setActiveScreen('overview')}>
            ← Back to Overview
          </Button>
        </div>
        <StudentResumeAdvantage />
      </div>
    );
  }

  if (activeScreen === 'employer') {
    return (
      <div>
        <div className="bg-white border-b border-slate-200 p-4">
          <Button variant="outline" onClick={() => setActiveScreen('overview')}>
            ← Back to Overview
          </Button>
        </div>
        <EmployerTalentAttraction />
      </div>
    );
  }

  if (activeScreen === 'admin') {
    return (
      <div>
        <div className="bg-white border-b border-slate-200 p-4">
          <Button variant="outline" onClick={() => setActiveScreen('overview')}>
            ← Back to Overview
          </Button>
        </div>
        <CoOpAdminProgramDesign />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm px-4 py-1.5">
            Product Showcase
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            The Deliverables
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Advantage
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            How structured co-op deliverables create competitive advantages for students, employers, and program coordinators
          </p>
        </div>

        {/* Value Prop Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl cursor-pointer" onClick={() => setActiveScreen('student')}>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">For Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Turn co-op experience into verified achievements that stand out on resumes and portfolios
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>5.2x more interview callbacks</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Employer-verified achievements</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Portfolio-ready work samples</span>
                </div>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                View Student Screen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200 hover:border-emerald-400 transition-all hover:shadow-xl cursor-pointer" onClick={() => setActiveScreen('employer')}>
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <Building className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle className="text-xl">For Employers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Attract motivated candidates with function-based roles that showcase skill development opportunities
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>3.9x more applicants</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>9x better-quality matches</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Clear expectations from day 1</span>
                </div>
              </div>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                View Employer Screen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl cursor-pointer" onClick={() => setActiveScreen('admin')}>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">For Coordinators</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Design data-driven co-op pathways based on student interests and employer needs
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>87 student interest signals</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Structured learning pathways</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Higher program success rates</span>
                </div>
              </div>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                View Admin Screen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Data Flow Visualization */}
        <Card className="mb-12 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">How Deliverables Create Value Across the System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold text-slate-900 text-sm mb-1">1. Deliverable Created</p>
                <p className="text-xs text-slate-600">Employer defines task</p>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-slate-300" />
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold text-slate-900 text-sm mb-1">2. Student Completes</p>
                <p className="text-xs text-slate-600">Verified achievement</p>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-slate-300" />
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold text-slate-900 text-sm mb-1">3. Data Analyzed</p>
                <p className="text-xs text-slate-600">Program insights</p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Student Benefit
                </p>
                <p className="text-sm text-blue-800">Resume-ready achievements with employer verification</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Employer Benefit
                </p>
                <p className="text-sm text-emerald-800">Attracts students interested in specific business functions</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Admin Benefit
                </p>
                <p className="text-sm text-purple-800">Data-driven program design based on real interest patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Impact Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <p className="text-4xl font-bold text-blue-600">5.2x</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">More Interview Callbacks</p>
                <p className="text-xs text-slate-600">Students with verified achievements</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  <p className="text-4xl font-bold text-emerald-600">3.9x</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">More Applicants</p>
                <p className="text-xs text-slate-600">Function-based vs traditional roles</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  <p className="text-4xl font-bold text-purple-600">67%</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">Student Interest</p>
                <p className="text-xs text-slate-600">In R&D and innovation roles</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <p className="text-4xl font-bold text-amber-600">78%</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">Get Hired</p>
                <p className="text-xs text-slate-600">Students with portfolios</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Traditional Approach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 text-slate-600">
                <span className="text-red-500 font-bold">×</span>
                <span className="text-sm">Generic job descriptions</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <span className="text-red-500 font-bold">×</span>
                <span className="text-sm">No skill tracking</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <span className="text-red-500 font-bold">×</span>
                <span className="text-sm">Limited resume value</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <span className="text-red-500 font-bold">×</span>
                <span className="text-sm">Unclear expectations</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <span className="text-red-500 font-bold">×</span>
                <span className="text-sm">No data for program improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-300 bg-emerald-50/30">
            <CardHeader>
              <CardTitle className="text-emerald-900">ZALPHA Deliverables Approach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Function-based role descriptions</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Verified skill development</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Resume-ready achievements</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Clear deliverables from day 1</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Data-driven program design</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to See the Advantage?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Explore the three perspectives and see how structured deliverables create value for everyone in the co-op ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setActiveScreen('student')}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                <User className="w-5 h-5 mr-2" />
                Student View
              </Button>
              <Button
                size="lg"
                onClick={() => setActiveScreen('employer')}
                className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold"
              >
                <Building className="w-5 h-5 mr-2" />
                Employer View
              </Button>
              <Button
                size="lg"
                onClick={() => setActiveScreen('admin')}
                className="bg-white text-purple-600 hover:bg-purple-50 font-semibold"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Admin View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
