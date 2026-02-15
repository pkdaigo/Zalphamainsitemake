import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  GraduationCap, 
  FileText,
  ChevronDown,
  LayoutDashboard,
  BookOpen,
  UserCog,
  Database,
  Activity,
  BarChart3,
  FileSpreadsheet,
  Brain,
  Video,
  MessageSquare,
  Star,
  ArrowRight,
  Monitor,
  Mail,
  Target,
  Briefcase,
  CheckCircle,
  Building,
  BookOpenCheck
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/app/components/ui/dropdown-menu';
import { Badge } from '@/app/components/ui/badge';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [selectedSection, setSelectedSection] = useState<string>('overview');

  const adminSections = [
    {
      id: 'user-management',
      name: 'User Management',
      description: 'Manage all platform users, roles, and permissions',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      page: 'user-management',
      stats: '1,247 Users'
    },
    {
      id: 'admin-verifications',
      name: 'Identity Verification',
      description: 'Review and manage Plaid verification requests',
      icon: ShieldCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      page: 'admin-verifications',
      stats: '45 Pending'
    },
    {
      id: 'beta-applications-admin',
      name: 'Beta Applications',
      description: 'Review and approve beta tester applications',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      page: 'beta-applications-admin',
      stats: '23 New'
    },
    {
      id: 'admin-payment-management',
      name: 'Payment Management',
      description: 'Monitor transactions, subscriptions, and payouts',
      icon: CreditCard,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      page: 'admin-payment-management',
      stats: '$45,678'
    },
    {
      id: 'tutorial-admin',
      name: 'Tutorial Admin',
      description: 'Create and manage AI-powered tutorial content',
      icon: GraduationCap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      page: 'tutorial-admin',
      stats: '89 Tutorials'
    },
    {
      id: 'admin-moderation',
      name: 'Content Moderation',
      description: 'Review flagged content and enforce community guidelines',
      icon: MessageSquare,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      page: 'admin-moderation',
      stats: '12 Flagged'
    }
  ];

  const aiSections = [
    {
      id: 'did-setup',
      name: 'D-ID Setup',
      description: 'Configure AI video agents and API settings',
      icon: Video,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      page: 'did-setup'
    },
    {
      id: 'did-knowledge-manager',
      name: 'Knowledge Manager',
      description: 'Manage AI agent knowledge bases and documents',
      icon: Brain,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      page: 'did-knowledge-manager'
    },
    {
      id: 'did-agent-demo',
      name: 'AI Agent Demo',
      description: 'Test interactive AI video agents',
      icon: Activity,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      page: 'did-agent-demo'
    }
  ];

  const reportSections = [
    {
      id: 'sync-dashboard',
      name: 'Integration Sync',
      description: 'Monitor API integrations and sync status',
      icon: Database,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      page: 'sync-dashboard'
    },
    {
      id: 'health-check',
      name: 'System Health',
      description: 'Platform performance and uptime monitoring',
      icon: Activity,
      color: 'text-lime-600',
      bgColor: 'bg-lime-50',
      page: 'health-check'
    }
  ];

  const quickActions = [
    { 
      label: 'User Management', 
      page: 'user-management',
      icon: Users,
      color: 'bg-blue-600'
    },
    { 
      label: 'Verifications', 
      page: 'admin-verifications',
      icon: ShieldCheck,
      color: 'bg-green-600'
    },
    { 
      label: 'Payments', 
      page: 'admin-payment-management',
      icon: CreditCard,
      color: 'bg-yellow-600'
    },
    { 
      label: 'Beta Apps', 
      page: 'beta-applications-admin',
      icon: FileText,
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Dropdown */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
              <p className="text-slate-300 text-sm">Manage all aspects of the ZALPHA platform</p>
            </div>
            
            {/* Admin Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-white text-slate-800 hover:bg-slate-50 font-medium px-4 py-2 border-slate-300"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Admin Menu
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 bg-white shadow-xl border border-slate-200">
                <DropdownMenuLabel className="text-base font-semibold text-slate-800">
                  Admin Tools
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Core Admin Functions */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-slate-500 uppercase font-semibold tracking-wide">
                    Core Management
                  </DropdownMenuLabel>
                  {adminSections.map((section) => (
                    <DropdownMenuItem
                      key={section.id}
                      onClick={() => onNavigate(section.page)}
                      className="cursor-pointer hover:bg-slate-50 py-2.5"
                    >
                      <section.icon className={`mr-3 h-4 w-4 ${section.color}`} />
                      <div className="flex-1">
                        <div className="font-medium text-slate-700 text-sm">
                          {section.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {section.stats}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* AI Tools */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-slate-500 uppercase font-semibold tracking-wide">
                    AI & Video Tools
                  </DropdownMenuLabel>
                  {aiSections.map((section) => (
                    <DropdownMenuItem
                      key={section.id}
                      onClick={() => onNavigate(section.page)}
                      className="cursor-pointer hover:bg-slate-50 py-2.5"
                    >
                      <section.icon className={`mr-3 h-4 w-4 ${section.color}`} />
                      <div className="flex-1">
                        <div className="font-medium text-slate-700 text-sm">
                          {section.name}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* System & Reports */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-slate-500 uppercase font-semibold tracking-wide">
                    System & Reports
                  </DropdownMenuLabel>
                  {reportSections.map((section) => (
                    <DropdownMenuItem
                      key={section.id}
                      onClick={() => onNavigate(section.page)}
                      className="cursor-pointer hover:bg-slate-50 py-2.5"
                    >
                      <section.icon className={`mr-3 h-4 w-4 ${section.color}`} />
                      <div className="flex-1">
                        <div className="font-medium text-slate-700 text-sm">
                          {section.name}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => onNavigate('internal-dashboard')}
                  className="cursor-pointer hover:bg-slate-50 py-2.5 font-medium"
                >
                  <Settings className="mr-3 h-4 w-4 text-slate-600" />
                  <span className="text-slate-700 text-sm">Internal Dashboard</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Admin CTA Banner - Ready to Shape the Future */}
      <section className="py-12 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white border-b-4 border-cyan-500">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-10 h-10 text-cyan-400" />
            <h2 className="text-3xl sm:text-4xl font-black">
              Ready to Shape the Future of Pacific Talent Management?
            </h2>
          </div>
          
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Empower thousands of students, schools, and employers building careers and communities 
            across the Western Pacific Islands through data-driven insights and comprehensive platform management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => onNavigate('user-management')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl hover:shadow-2xl"
            >
              <Users className="w-5 h-5" />
              Manage Users
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('admin-verifications')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/20 transition-all"
            >
              <ShieldCheck className="w-5 h-5" />
              Verifications
            </button>

            <button
              onClick={() => onNavigate('sync-dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/20 transition-all"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </button>
          </div>

          <div className="pt-6 border-t border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-cyan-300 mb-1">1,247</div>
                <div className="text-sm text-blue-200">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-black text-green-300 mb-1">96%</div>
                <div className="text-sm text-blue-200">Placement Rate</div>
              </div>
              <div>
                <div className="text-3xl font-black text-purple-300 mb-1">45</div>
                <div className="text-sm text-blue-200">Pending Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.page}
                onClick={() => onNavigate(action.page)}
                className={`${action.color} hover:opacity-90 text-white h-auto py-3 flex-col items-center gap-2 shadow-sm`}
              >
                <action.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Core Admin Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Core Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminSections.map((section) => (
              <Card 
                key={section.id}
                className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 bg-white"
                onClick={() => onNavigate(section.page)}
              >
                <CardHeader className="pb-3">
                  <div className={`w-10 h-10 rounded-lg ${section.bgColor} flex items-center justify-center mb-2`}>
                    <section.icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <CardTitle className="text-slate-800 text-base">
                    {section.name}
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-sm">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                    {section.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI & Video Tools */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            AI & Video Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiSections.map((section) => (
              <Card 
                key={section.id}
                className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 bg-white"
                onClick={() => onNavigate(section.page)}
              >
                <CardHeader className="pb-3">
                  <div className={`w-10 h-10 rounded-lg ${section.bgColor} flex items-center justify-center mb-2`}>
                    <section.icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <CardTitle className="text-slate-800 text-base">
                    {section.name}
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-sm">
                    {section.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* System Monitoring */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            System & Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportSections.map((section) => (
              <Card 
                key={section.id}
                className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 bg-white"
                onClick={() => onNavigate(section.page)}
              >
                <CardHeader className="pb-3">
                  <div className={`w-10 h-10 rounded-lg ${section.bgColor} flex items-center justify-center mb-2`}>
                    <section.icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <CardTitle className="text-slate-800 text-base">
                    {section.name}
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-sm">
                    {section.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Guide - Moved from Landing Page */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                <BookOpenCheck className="w-7 h-7 text-cyan-600" />
                Partnership Guide & Resources
              </h2>
              <p className="text-slate-600 text-sm">Manage and understand all partner types across the ZALPHA platform</p>
            </div>
          </div>

          {/* Partnership Overview Banner */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 mb-6 border-2 border-cyan-200">
            <div className="flex items-start gap-4">
              <div className="bg-cyan-500 rounded-xl p-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Built for Every Stage of the Journey</h3>
                <p className="text-slate-700 mb-4">
                  ZALPHA connects three essential partner types: <strong>Students</strong> seeking opportunities, 
                  <strong> Schools</strong> managing placements, and <strong>Employers</strong> hiring Pacific talent.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-black text-blue-600 mb-1">2,000+</div>
                    <div className="text-xs text-slate-600">Verified Students</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-black text-green-600 mb-1">45</div>
                    <div className="text-xs text-slate-600">Partner Schools</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-black text-purple-600 mb-1">100+</div>
                    <div className="text-xs text-slate-600">Active Employers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Partnership Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Students Partnership Card */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-slate-900 text-xl mb-2">Students</CardTitle>
                <CardDescription className="text-slate-700 text-sm leading-relaxed">
                  High school students, college students, and recent graduates finding internships 
                  and early-career opportunities across the Pacific.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">Free job search tools</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">AI career coach & skill assessments</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">Virtual job fairs & networking</span>
                  </div>
                </div>
                <Button
                  onClick={() => onNavigate('student-signup')}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white font-semibold"
                >
                  Manage Student Partnerships
                </Button>
              </CardContent>
            </Card>

            {/* Schools Partnership Card */}
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Building className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-slate-900 text-xl mb-2">Schools</CardTitle>
                <CardDescription className="text-slate-700 text-sm leading-relaxed">
                  Career services and educational institutions empowering students with 
                  <strong> affordable subscription model</strong>—free for all their students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm"><strong>Free for students</strong>—school pays flat annual fee</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm"><strong>Predictable budgeting</strong> with no per-student charges</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm"><strong>ROI:</strong> Higher placement rates + career services</span>
                  </div>
                </div>
                <Button
                  onClick={() => onNavigate('pitch-deck-schools')}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white font-semibold"
                >
                  View School Partnerships
                </Button>
              </CardContent>
            </Card>

            {/* Employers Partnership Card */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-slate-900 text-xl mb-2">Employers & Contractors</CardTitle>
                <CardDescription className="text-slate-700 text-sm leading-relaxed">
                  Local businesses, global contractors, and agencies hiring Pacific talent for internships, 
                  full-time roles, and fixed-term contracts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">Access verified Pacific talent pool</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">AI interviewer & ATS integration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">EPA/DOL compliance support</span>
                  </div>
                </div>
                <Button
                  onClick={() => onNavigate('employer-signup')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold"
                >
                  Manage Employer Partnerships
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Resources */}
          <div className="mt-6 bg-slate-100 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-700" />
              Partnership Resources
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate('pitch-deck-schools')}
                className="flex items-center gap-3 bg-white rounded-lg p-4 hover:shadow-md transition-all text-left border border-slate-200"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">School Pitch Deck</div>
                  <div className="text-xs text-slate-600">Onboarding materials for educational institutions</div>
                </div>
              </button>
              <button
                onClick={() => onNavigate('pitch-deck-recruit')}
                className="flex items-center gap-3 bg-white rounded-lg p-4 hover:shadow-md transition-all text-left border border-slate-200"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">Employer Pitch Deck</div>
                  <div className="text-xs text-slate-600">Recruitment platform overview for businesses</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}