/**
 * ZALPHA Employer Talent Attraction Screen
 * Shows how function-based roles attract better co-op candidates
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Lightbulb,
  Users,
  FileText,
  TrendingUp,
  Target,
  BarChart3,
  Plus,
  ArrowRight,
  CheckCircle,
  X,
} from 'lucide-react';

interface FunctionRole {
  id: string;
  title: string;
  icon: typeof Lightbulb;
  color: string;
  deliverables: string[];
  skills: string[];
  interestedCount: number;
}

const FUNCTION_ROLES: FunctionRole[] = [
  {
    id: 'rd',
    title: 'Recipe R&D Assistant',
    icon: Lightbulb,
    color: '#f59e0b',
    deliverables: [
      'Brainstorm new recipe ideas',
      'Test flavor combinations',
      'Document testing results',
      'Present ideas to management',
    ],
    skills: ['Innovation', 'R&D', 'Documentation'],
    interestedCount: 23,
  },
  {
    id: 'insights',
    title: 'Customer Insights & Service Design',
    icon: Users,
    color: '#06b6d4',
    deliverables: [
      'Survey guest satisfaction',
      'Analyze feedback data',
      'Design better experiences',
      'Propose service improvements',
    ],
    skills: ['Analytics', 'UX Design', 'Communication'],
    interestedCount: 18,
  },
  {
    id: 'hr',
    title: 'HR & People Operations Support',
    icon: FileText,
    color: '#8b5cf6',
    deliverables: [
      'Draft Standard Operating Procedures',
      'Organize employee files',
      'Support scheduling processes',
      'Help with onboarding materials',
    ],
    skills: ['Admin Skills', 'Writing', 'Organization'],
    interestedCount: 31,
  },
];

const INTEREST_DATA = [
  { category: 'R&D & Innovation', percentage: 67, color: '#f59e0b' },
  { category: 'HR & Administration', percentage: 54, color: '#8b5cf6' },
  { category: 'Customer Service (POS)', percentage: 48, color: '#06b6d4' },
  { category: 'Digital/Tech Tasks', percentage: 43, color: '#3b82f6' },
  { category: 'Traditional FOH', percentage: 19, color: '#94a3b8' },
];

function ComparisonCard() {
  return (
    <Card className="mb-8 border-2">
      <CardHeader>
        <CardTitle className="text-xl">The Function-Based Difference</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
                <X className="w-5 h-5 text-slate-500" />
              </div>
              <h4 className="font-semibold text-slate-900">Traditional Job Posting</h4>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="font-semibold text-slate-900 mb-2">"Front Desk Assistant"</p>
              <p className="text-sm text-slate-600 mb-3">Generic duties:</p>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Answer phones</li>
                <li>• Check in guests</li>
                <li>• General office tasks</li>
                <li>• Other duties as assigned</li>
              </ul>
            </div>

            <div className="bg-slate-100 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Applicants:</span>
                <span className="text-2xl font-bold text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Quality matches:</span>
                <span className="text-2xl font-bold text-slate-900">2</span>
              </div>
            </div>
          </div>

          {/* Function-Based */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Function-Based Posting</h4>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-slate-900 mb-2">"Customer Service & POS Specialist"</p>
              <p className="text-sm text-slate-700 mb-3">Clear deliverables:</p>
              <ul className="space-y-1 text-sm text-slate-700">
                <li>• Master POS system operations</li>
                <li>• Handle guest relations professionally</li>
                <li>• Develop problem-solving skills</li>
                <li>• Learn service design principles</li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-700">Applicants:</span>
                <span className="text-2xl font-bold text-emerald-900">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-700">Quality matches:</span>
                <span className="text-2xl font-bold text-emerald-900">18</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">3.9x</p>
            <p className="text-sm text-blue-800 font-medium">More Applicants</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-emerald-600">9x</p>
            <p className="text-sm text-emerald-800 font-medium">Better Matches</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RoleTile({ role }: { role: FunctionRole }) {
  const RoleIcon = role.icon;

  return (
    <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-blue-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ background: `${role.color}20` }}
          >
            <RoleIcon className="w-6 h-6" style={{ color: role.color }} />
          </div>
          <h3 className="font-bold text-slate-900 flex-1 leading-tight">
            {role.title}
          </h3>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-slate-700 mb-2">Students will:</p>
          <ul className="space-y-1.5">
            {role.deliverables.map((deliverable, idx) => (
              <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                <span style={{ color: role.color }}>•</span>
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {role.skills.map((skill) => (
              <Badge
                key={skill}
                className="text-xs px-2 py-1"
                style={{
                  background: `${role.color}20`,
                  color: role.color,
                  border: `1px solid ${role.color}40`,
                }}
              >
                🎓 {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-600">Student Interest:</span>
            <span className="text-xl font-bold text-slate-900">{role.interestedCount}</span>
          </div>
          <Button className="w-full bg-blue-500 hover:bg-blue-600">
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function WhyItWorksCard() {
  return (
    <Card className="bg-gradient-to-br from-purple-500 to-blue-600 text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Why This Works</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Students see the specific skills and deliverables they will work on, not just the job title.
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">3.9x more applicants</p>
              <p className="text-sm text-blue-100">Function-based roles attract significantly more interest</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">9x better-quality matches</p>
              <p className="text-sm text-blue-100">Students self-select based on genuine interest</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Higher student engagement</p>
              <p className="text-sm text-blue-100">Clear expectations lead to better performance</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Clear expectations from day 1</p>
              <p className="text-sm text-blue-100">Reduces confusion and increases success rate</p>
            </div>
          </div>
        </div>

        <Button className="w-full mt-6 bg-white text-purple-600 hover:bg-blue-50 font-semibold">
          View Student Interest Signals
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

function InterestChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Student Interest by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {INTEREST_DATA.map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">{item.category}</span>
                <span className="text-sm font-bold text-slate-900">{item.percentage}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    background: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">Key Insight</p>
              <p className="text-sm text-amber-800">
                Students want to learn business functions like R&D and HR (54-67% interest), not just traditional food service tasks (19% interest)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EmployerTalentAttraction() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-700">
            Employer Dashboard
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Attracting Co-Op Talent 🎯
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Show students the skills they'll gain, not just job titles. Function-based roles attract 3.9x more applicants with 9x better quality matches.
          </p>
        </div>

        {/* Comparison */}
        <ComparisonCard />

        {/* Function Roles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Function-Based Roles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FUNCTION_ROLES.map((role) => (
              <RoleTile key={role.id} role={role} />
            ))}
          </div>
        </div>

        {/* Why It Works */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <WhyItWorksCard />
          <InterestChart />
        </div>

        {/* CTA */}
        <Card className="bg-slate-900 text-white border-0">
          <CardContent className="p-8 text-center">
            <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Ready to Create Your First Function-Based Role?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Define clear deliverables and skills for your co-op positions. Attract motivated students who want to learn specific business functions.
            </p>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold">
              <Plus className="w-5 h-5 mr-2" />
              Create New Function-Based Role
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
