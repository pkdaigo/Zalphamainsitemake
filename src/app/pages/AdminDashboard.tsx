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
  MessageSquare
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
        <div>
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
      </div>
    </div>
  );
}