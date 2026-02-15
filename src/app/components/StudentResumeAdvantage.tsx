/**
 * ZALPHA Student Resume Advantage Screen
 * Shows how co-op deliverables become verified resume achievements
 */

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent } from '@/app/components/ui/card';
import {
  ArrowLeft,
  Download,
  FileText,
  CheckCircle,
  Star,
  Target,
  ExternalLink,
  Share2,
  Briefcase,
  Users,
  Wrench,
  Lightbulb,
} from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'admin' | 'customer' | 'operations' | 'rd';
  skillFocus: string;
  verified: boolean;
  impact?: string;
  employerName: string;
  completedDate: Date;
}

const CATEGORY_ICONS = {
  admin: FileText,
  customer: Users,
  operations: Wrench,
  rd: Lightbulb,
};

const CATEGORY_COLORS = {
  admin: { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)', text: '#8b5cf6' },
  customer: { bg: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.3)', text: '#06b6d4' },
  operations: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#10b981' },
  rd: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: '#f59e0b' },
};

const SAMPLE_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'HR Documentation & SOP Creation',
    description: 'Helped draft Standard Operating Procedures (SOPs) for Student Co-Op Program',
    category: 'admin',
    skillFocus: 'Documentation & Technical Writing',
    verified: true,
    employerName: 'Paradise Hotel',
    completedDate: new Date('2024-02-20'),
  },
  {
    id: 'a2',
    title: 'POS System Operations During Rush Hours',
    description: 'Operated POS system independently during lunch rush hours with 100% accuracy',
    category: 'customer',
    skillFocus: 'Customer Service & Technology',
    verified: true,
    employerName: 'Paradise Hotel',
    completedDate: new Date('2024-02-25'),
  },
  {
    id: 'a3',
    title: 'Menu Innovation & Recipe Development',
    description: 'Contributed 3 new recipe R&D ideas; 1 implemented in menu (Chamorro fusion bowl)',
    category: 'rd',
    skillFocus: 'Innovation & Creative Thinking',
    verified: true,
    impact: 'Led to real menu change',
    employerName: 'Paradise Hotel',
    completedDate: new Date('2024-03-05'),
  },
  {
    id: 'a4',
    title: 'Inventory Management System',
    description: 'Completed weekly inventory checks with less than 2% discrepancy rate',
    category: 'operations',
    skillFocus: 'Organization & Attention to Detail',
    verified: true,
    employerName: 'Paradise Hotel',
    completedDate: new Date('2024-03-01'),
  },
];

function AchievementCard({ achievement, onAddToResume }: { achievement: Achievement; onAddToResume: () => void }) {
  const CategoryIcon = CATEGORY_ICONS[achievement.category];
  const colors = CATEGORY_COLORS[achievement.category];

  return (
    <Card className="border-2 border-emerald-300 bg-white hover:shadow-lg transition-all">
      <CardContent className="p-4 space-y-3">
        {/* Header with verification */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
            >
              <CategoryIcon className="w-5 h-5" style={{ color: colors.text }} />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-slate-900 leading-tight">
                {achievement.title}
              </h4>
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed pl-12">
          {achievement.description}
        </p>

        {/* Skill Focus */}
        <div className="flex items-center gap-1.5 text-sm text-slate-600 pl-12">
          <Target className="w-4 h-4 text-slate-400" />
          <span className="font-medium">Skill:</span>
          <span>{achievement.skillFocus}</span>
        </div>

        {/* Verification Badge */}
        <div className="flex items-center gap-2 pl-12">
          {achievement.verified && (
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700">
              <CheckCircle className="w-3 h-3" />
              Employer Verified
            </div>
          )}

          {achievement.impact && (
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-xs font-semibold text-amber-700">
              <Star className="w-3 h-3" />
              {achievement.impact}
            </div>
          )}
        </div>

        {/* Action */}
        <div className="pt-2 pl-12">
          <Button
            onClick={onAddToResume}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <FileText className="w-4 h-4 mr-2" />
            Add to Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function StudentResumeAdvantage() {
  const [selectedAchievements, setSelectedAchievements] = useState<string[]>([]);

  const handleAddToResume = (id: string) => {
    if (!selectedAchievements.includes(id)) {
      setSelectedAchievements([...selectedAchievements, id]);
      toast.success('Added to resume!', {
        description: 'This achievement is now in your resume builder',
      });
    } else {
      toast.info('Already added', {
        description: 'This achievement is already in your resume',
      });
    }
  };

  const handleExportResume = () => {
    toast.success('Resume exported!', {
      description: 'Your achievements have been formatted for your resume',
    });
  };

  const handleBuildPortfolio = () => {
    toast.info('Portfolio builder coming soon!', {
      description: 'Create a beautiful portfolio website with your achievements',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20 max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Co-Op Achievements</h1>
              <p className="text-xs text-slate-500">{SAMPLE_ACHIEVEMENTS.length} verified</p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={handleExportResume}>
            <Download className="w-4 h-4 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="p-4">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-2xl font-bold">
                MS
              </div>
              <div>
                <h2 className="text-xl font-bold">Maya Santos</h2>
                <p className="text-sm text-blue-100">Z-UID: Z24-0847</p>
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-200" />
                <span className="text-blue-50">Paradise Hotel Co-Op</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <span>Feb 2024 - May 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resume-Ready Header */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-lg border-2 border-emerald-200 p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">Resume-Ready Achievements</h3>
              <p className="text-sm text-slate-600">
                All achievements below are verified by your employer and school admin. Add them to your resume or portfolio with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="px-4 space-y-3">
        {SAMPLE_ACHIEVEMENTS.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onAddToResume={() => handleAddToResume(achievement.id)}
          />
        ))}
      </div>

      {/* Export Actions */}
      <div className="px-4 mt-6 space-y-3">
        <Button
          onClick={handleExportResume}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-semibold"
        >
          <FileText className="w-5 h-5 mr-2" />
          Export Full Resume
        </Button>

        <Button
          onClick={handleBuildPortfolio}
          variant="outline"
          className="w-full h-12 text-base font-semibold border-2"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Build Portfolio Site
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 text-base font-semibold border-2"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Achievements
        </Button>
      </div>

      {/* Info Footer */}
      <div className="px-4 mt-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800">
            <strong>Verification matters:</strong> All achievements are verified by your co-op employer and school administrator, making them more credible to future employers and colleges.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold text-slate-900 mb-3 text-sm">Impact of Verified Achievements</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">Interview Callbacks</span>
                  <span className="text-xs font-semibold text-emerald-600">5.2x more</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">Portfolio Views</span>
                  <span className="text-xs font-semibold text-blue-600">78% hired</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">Skills Developed</span>
                  <span className="text-xs font-semibold text-violet-600">4.3 avg.</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500" style={{ width: '72%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
