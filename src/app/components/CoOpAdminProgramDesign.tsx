/**
 * ZALPHA Co-Op Admin Program Design Screen
 * Shows how deliverable data informs program design and pathways
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  BarChart3,
  Target,
  Lightbulb,
  FileText,
  Users,
  TrendingUp,
  Download,
  Share2,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Award,
  AlertCircle,
} from 'lucide-react';

interface Pathway {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  matchingStudents: number;
  supportingEmployers: number;
  color: string;
}

interface Module {
  number: number;
  title: string;
  duration: string;
  topics: string[];
}

const PATHWAYS: Pathway[] = [
  {
    id: 'operations',
    title: 'Business Operations Track',
    description: 'For students interested in HR, admin, and operational functions',
    color: '#8b5cf6',
    matchingStudents: 47,
    supportingEmployers: 12,
    modules: [
      {
        number: 1,
        title: 'Mental Readiness & Professionalism',
        duration: '2 weeks',
        topics: [
          'Workplace behavior expectations',
          'Communication fundamentals',
          'Time management & reliability',
          'Professional appearance & conduct',
        ],
      },
      {
        number: 2,
        title: 'HR Fundamentals in Small Business',
        duration: '3 weeks',
        topics: [
          'SOP documentation',
          'Employee onboarding processes',
          'File organization & record keeping',
          'Scheduling and coordination basics',
        ],
      },
      {
        number: 3,
        title: 'Customer Service & POS',
        duration: '4 weeks',
        topics: [
          'POS system operations',
          'Customer interaction protocols',
          'Problem resolution skills',
          'Service quality standards',
        ],
      },
    ],
  },
  {
    id: 'innovation',
    title: 'Innovation & R&D Track',
    description: 'For creative students interested in product development and improvement',
    color: '#f59e0b',
    matchingStudents: 58,
    supportingEmployers: 8,
    modules: [
      {
        number: 1,
        title: 'Creative Thinking in Food Service',
        duration: '3 weeks',
        topics: [
          'Brainstorming techniques',
          'Customer feedback analysis',
          'Market trends observation',
          'Competitive analysis basics',
        ],
      },
      {
        number: 2,
        title: 'Product Development Basics',
        duration: '3 weeks',
        topics: [
          'Recipe testing & documentation',
          'Cost analysis for new menu items',
          'Presentation & pitching ideas',
          'Feasibility assessment',
        ],
      },
      {
        number: 3,
        title: 'Implementation & Measurement',
        duration: '3 weeks',
        topics: [
          'Testing new ideas with customers',
          'Collecting feedback & iterating',
          'Documenting outcomes & learnings',
          'Scaling successful innovations',
        ],
      },
    ],
  },
];

const STUDENT_INTERESTS = [
  { category: 'R&D & Innovation', count: 58, percentage: 67, icon: Lightbulb },
  { category: 'HR & Documentation', count: 47, percentage: 54, icon: FileText },
  { category: 'Digital/Tech Tasks', count: 37, percentage: 43, icon: Target },
  { category: 'Customer Service (POS)', count: 42, percentage: 48, icon: Users },
  { category: 'Traditional FOH', count: 16, percentage: 19, icon: Users },
];

const SKILLS_TO_STRENGTHEN = [
  { skill: 'Communication', count: 71, color: '#3b82f6' },
  { skill: 'Reliability', count: 68, color: '#10b981' },
  { skill: 'Documentation', count: 54, color: '#8b5cf6' },
  { skill: 'POS Systems', count: 49, color: '#06b6d4' },
  { skill: 'Problem Solving', count: 63, color: '#f59e0b' },
  { skill: 'Teamwork', count: 58, color: '#ec4899' },
];

function InsightCard() {
  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Program Design Insights</h3>
            <p className="text-slate-700 text-sm">
              Data from <strong>87 students</strong> across <strong>23 placements</strong>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 text-center border border-purple-200">
            <p className="text-3xl font-bold text-purple-600">67%</p>
            <p className="text-xs text-slate-600 font-medium">Want R&D roles</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-purple-200">
            <p className="text-3xl font-bold text-purple-600">54%</p>
            <p className="text-xs text-slate-600 font-medium">Interested in HR</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-purple-200">
            <p className="text-3xl font-bold text-purple-600">19%</p>
            <p className="text-xs text-slate-600 font-medium">Want traditional tasks</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900">
            <strong>Key Insight:</strong> Students want to learn business functions, not just service tasks. Design pathways accordingly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function InterestsGrid() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Top Student Interests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {STUDENT_INTERESTS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.category} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-slate-900">{item.category}</span>
                    <span className="text-sm text-slate-600">
                      {item.count} students ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SkillsGrid() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          Skills Students Want to Strengthen
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SKILLS_TO_STRENGTHEN.map((item) => (
            <div
              key={item.skill}
              className="bg-white border-2 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              style={{ borderColor: `${item.color}40` }}
            >
              <p className="text-2xl font-bold mb-1" style={{ color: item.color }}>
                {item.count}
              </p>
              <p className="text-xs font-semibold text-slate-700">{item.skill}</p>
              <p className="text-xs text-slate-500">students</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PathwayCard({ pathway }: { pathway: Pathway }) {
  return (
    <Card className="border-2 hover:shadow-lg transition-all" style={{ borderColor: `${pathway.color}40` }}>
      <CardHeader style={{ background: `${pathway.color}10` }}>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-2">{pathway.title}</CardTitle>
            <p className="text-sm text-slate-600">{pathway.description}</p>
          </div>
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: pathway.color }}
          >
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Modules */}
        {pathway.modules.map((module) => (
          <div key={module.number} className="border-l-4 pl-4" style={{ borderColor: pathway.color }}>
            <div className="flex items-baseline gap-2 mb-2">
              <Badge
                className="px-2 py-0.5 text-xs font-bold"
                style={{
                  background: `${pathway.color}20`,
                  color: pathway.color,
                  border: 'none',
                }}
              >
                Module {module.number}
              </Badge>
              <h4 className="font-semibold text-slate-900">{module.title}</h4>
              <span className="text-xs text-slate-500 ml-auto">{module.duration}</span>
            </div>
            <ul className="space-y-1">
              {module.topics.map((topic, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                  <span style={{ color: pathway.color }}>•</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Stats */}
        <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-slate-900">{pathway.matchingStudents}</p>
            <p className="text-xs text-slate-600">students match this pathway</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{pathway.supportingEmployers}</p>
            <p className="text-xs text-slate-600">employers can support</p>
          </div>
        </div>

        {/* Action */}
        <Button
          className="w-full font-semibold"
          style={{ background: pathway.color }}
        >
          Create Pathway Template
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

function DataFlowDiagram() {
  return (
    <Card className="bg-slate-50">
      <CardHeader>
        <CardTitle>Data Flow: Deliverables to Program Design</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Node 1 */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-1">Student Deliverables</p>
            <p className="text-xs text-slate-600">Tasks completed by students</p>
          </div>

          <ArrowRight className="w-8 h-8 text-slate-400 flex-shrink-0 hidden md:block" />

          {/* Node 2 */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-1">Verified Achievements</p>
            <p className="text-xs text-slate-600">→ Student Resume</p>
          </div>

          <ArrowRight className="w-8 h-8 text-slate-400 flex-shrink-0 hidden md:block" />

          {/* Node 3 */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-1">Employer Role Design</p>
            <p className="text-xs text-slate-600">→ Better Job Descriptions</p>
          </div>

          <ArrowRight className="w-8 h-8 text-slate-400 flex-shrink-0 hidden md:block" />

          {/* Node 4 */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-1">Program Insights</p>
            <p className="text-xs text-slate-600">→ Informed Pathway Design</p>
          </div>

          <ArrowRight className="w-8 h-8 text-slate-400 flex-shrink-0 hidden md:block" />

          {/* Node 5 */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-1">Better Matches</p>
            <p className="text-xs text-slate-600">→ Higher Success</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CoOpAdminProgramDesign() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <Badge className="mb-4 bg-purple-100 text-purple-700">
              Co-Op Coordinator Dashboard
            </Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Program Design Insights 📊
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              Use student interest data and deliverable completion patterns to design effective co-op pathways
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Insight Card */}
        <InsightCard />

        {/* Interests and Skills */}
        <div className="grid lg:grid-cols-2 gap-6 my-8">
          <InterestsGrid />
          <SkillsGrid />
        </div>

        {/* Pathways */}
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Design Co-Op Pathways 🛤️</h2>
            <p className="text-slate-600">
              Based on student interest and employer needs, we suggest these structured learning pathways:
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {PATHWAYS.map((pathway) => (
              <PathwayCard key={pathway.id} pathway={pathway} />
            ))}
          </div>
        </div>

        {/* Data Flow */}
        <DataFlowDiagram />

        {/* CTA */}
        <Card className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <Lightbulb className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Transform Your Co-Op Program</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Use these insights to create pathways that match student interests, meet employer needs, and achieve learning outcomes. Data-driven program design leads to higher success rates.
            </p>
            <div className="flex gap-3 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-blue-50 font-semibold">
                Create Program Template
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
