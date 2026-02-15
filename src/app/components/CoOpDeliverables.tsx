/**
 * ZALPHA Co-Op Deliverables Module
 * Mobile-first deliverable tracking for employers and students
 */

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent } from '@/app/components/ui/card';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Textarea } from '@/app/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/app/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  ArrowLeft,
  Plus,
  FileText,
  Users,
  Wrench,
  Lightbulb,
  Calendar,
  CheckCircle,
  Circle,
  Target,
  AlertCircle,
  Edit,
  Trash2,
  GraduationCap,
  Building,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

// Types
type Category = 'admin' | 'customer' | 'operations' | 'rd';
type Status = 'not-started' | 'in-progress' | 'completed';

interface Deliverable {
  id: string;
  placementId: string;
  title: string;
  description: string;
  category: Category;
  skillFocus: string;
  expectedOutcome: string;
  status: Status;
  progress: number;
  dueDate: Date;
  schoolOutcome?: string;
  createdAt: Date;
}

interface Placement {
  id: string;
  studentName: string;
  studentZUID: string;
  studentAvatar: string;
  employerName: string;
  role: string;
  schedule: string;
}

// Category definitions
const CATEGORIES = {
  admin: {
    label: 'Administration',
    icon: FileText,
    color: 'violet',
    bg: 'rgba(139, 92, 246, 0.1)',
    border: 'rgba(139, 92, 246, 0.2)',
    text: '#8b5cf6',
  },
  customer: {
    label: 'Service',
    icon: Users,
    color: 'cyan',
    bg: 'rgba(6, 182, 212, 0.1)',
    border: 'rgba(6, 182, 212, 0.2)',
    text: '#06b6d4',
  },
  operations: {
    label: 'Operations',
    icon: Wrench,
    color: 'emerald',
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.2)',
    text: '#10b981',
  },
  rd: {
    label: 'R&D',
    icon: Lightbulb,
    color: 'amber',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.2)',
    text: '#f59e0b',
  },
};

const SCHOOL_OUTCOMES = [
  { value: 'writing-skills', label: 'Writing Skills', credit: 'English Credit' },
  { value: 'communication', label: 'Communication', credit: null },
  { value: 'problem-solving', label: 'Problem Solving', credit: null },
  { value: 'technical-skills', label: 'Technical Skills', credit: 'CTE Credit' },
  { value: 'teamwork', label: 'Teamwork', credit: null },
  { value: 'time-management', label: 'Time Management', credit: null },
];

// Sample data
const SAMPLE_PLACEMENT: Placement = {
  id: 'pl-001',
  studentName: 'Maya Santos',
  studentZUID: 'Z24-0847',
  studentAvatar: 'MS',
  employerName: 'Paradise Hotel',
  role: 'Front Desk Assistant',
  schedule: 'Mon-Fri 9:00 AM - 2:00 PM',
};

const SAMPLE_DELIVERABLES: Deliverable[] = [
  {
    id: 'd1',
    placementId: 'pl-001',
    title: 'Create HR SOPs',
    description: 'Help create Company/Organization Standard Operating Procedures (SOPs) for Student Co-Op Program',
    category: 'admin',
    skillFocus: 'Documentation & Technical Writing',
    expectedOutcome: 'Complete 3-page SOP document with clear steps for student onboarding',
    status: 'completed',
    progress: 100,
    dueDate: new Date('2024-02-20'),
    schoolOutcome: 'writing-skills',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: 'd2',
    placementId: 'pl-001',
    title: 'POS System Training',
    description: 'Learn and operate the POS (Point of Sale) system for basic transactions',
    category: 'customer',
    skillFocus: 'Customer Service & Technology',
    expectedOutcome: 'Successfully process 10 transactions independently with 100% accuracy',
    status: 'in-progress',
    progress: 60,
    dueDate: new Date('2024-02-25'),
    schoolOutcome: 'technical-skills',
    createdAt: new Date('2024-02-12'),
  },
  {
    id: 'd3',
    placementId: 'pl-001',
    title: 'Inventory Check',
    description: 'Assist with inventory check and restocking procedures',
    category: 'operations',
    skillFocus: 'Organization & Attention to Detail',
    expectedOutcome: 'Complete weekly inventory count with less than 2% discrepancy',
    status: 'not-started',
    progress: 0,
    dueDate: new Date('2024-03-01'),
    createdAt: new Date('2024-02-14'),
  },
  {
    id: 'd4',
    placementId: 'pl-001',
    title: 'Customer Experience Ideas',
    description: 'Brainstorm and document 3 new ideas to improve customer experience',
    category: 'rd',
    skillFocus: 'Critical Thinking & Innovation',
    expectedOutcome: '3 documented ideas with pros/cons and implementation suggestions',
    status: 'in-progress',
    progress: 33,
    dueDate: new Date('2024-03-05'),
    schoolOutcome: 'communication',
    createdAt: new Date('2024-02-13'),
  },
];

// Components
function StudentHeaderCard({ placement }: { placement: Placement }) {
  return (
    <Card className="mx-4 mb-3 border-slate-200">
      <CardContent className="p-4 space-y-3">
        {/* Student Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold">
            {placement.studentAvatar}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{placement.studentName}</h3>
            <p className="text-sm text-slate-500">Z-UID: {placement.studentZUID}</p>
          </div>
        </div>

        {/* Employer */}
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Building className="w-4 h-4 text-slate-400" />
          <span>{placement.employerName}</span>
        </div>

        {/* Role */}
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Target className="w-4 h-4 text-slate-400" />
          <span>{placement.role}</span>
        </div>

        {/* Schedule */}
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>{placement.schedule}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressSummary({ deliverables }: { deliverables: Deliverable[] }) {
  const completed = deliverables.filter(d => d.status === 'completed').length;
  const inProgress = deliverables.filter(d => d.status === 'in-progress').length;
  const notStarted = deliverables.filter(d => d.status === 'not-started').length;
  const total = deliverables.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mx-4 mb-4 bg-slate-50 rounded-lg p-3 space-y-2">
      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-700">{completed}/{total} Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-slate-700">{inProgress} In Progress</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function DeliverableCard({ 
  deliverable, 
  onToggle, 
  onEdit, 
  onDelete,
  userRole 
}: { 
  deliverable: Deliverable; 
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  userRole: 'student' | 'employer';
}) {
  const category = CATEGORIES[deliverable.category];
  const CategoryIcon = category.icon;
  const isOverdue = deliverable.dueDate < new Date() && deliverable.status !== 'completed';
  const daysUntilDue = Math.ceil((deliverable.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getStatusIcon = () => {
    switch (deliverable.status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'in-progress': return <Circle className="w-5 h-5 text-blue-500 fill-blue-500/20" />;
      case 'not-started': return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusText = () => {
    switch (deliverable.status) {
      case 'completed': return 'Completed';
      case 'in-progress': return `In Progress (${deliverable.progress}%)`;
      case 'not-started': return 'Not Started';
    }
  };

  const getBorderColor = () => {
    if (isOverdue) return 'border-red-300 bg-red-50/30';
    switch (deliverable.status) {
      case 'completed': return 'border-emerald-300 bg-emerald-50/30';
      case 'in-progress': return 'border-blue-300 bg-blue-50/30';
      case 'not-started': return 'border-slate-200';
    }
  };

  const schoolOutcome = SCHOOL_OUTCOMES.find(o => o.value === deliverable.schoolOutcome);

  return (
    <Card className={`mx-4 mb-3 border-2 ${getBorderColor()} transition-all`}>
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {userRole === 'employer' && deliverable.status !== 'completed' ? (
              <Checkbox
                checked={deliverable.status === 'completed'}
                onCheckedChange={onToggle}
                className="w-5 h-5"
              />
            ) : (
              getStatusIcon()
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            {/* Title and Category */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge 
                    className="text-[10px] px-2 py-0.5 font-semibold uppercase"
                    style={{
                      background: category.bg,
                      color: category.text,
                      border: `1px solid ${category.border}`,
                    }}
                  >
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {category.label}
                  </Badge>
                </div>
                <h4 className="text-base font-semibold text-slate-900 leading-tight">
                  {deliverable.title}
                </h4>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {deliverable.description}
            </p>

            {/* Skill Focus */}
            <div className="flex items-center gap-1.5 text-sm text-slate-600">
              <Target className="w-4 h-4 text-slate-400" />
              <span className="font-medium">Skill:</span>
              <span>{deliverable.skillFocus}</span>
            </div>

            {/* Progress Bar for In-Progress */}
            {deliverable.status === 'in-progress' && (
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${deliverable.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-700">
                  {getStatusText()}
                </span>
              </div>

              <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 font-semibold' : 'text-slate-500'}`}>
                {isOverdue ? (
                  <>
                    <AlertCircle className="w-3 h-3" />
                    <span>Overdue</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3 h-3" />
                    <span>
                      Due: {deliverable.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {daysUntilDue >= 0 && daysUntilDue <= 7 && (
                        <span className="ml-1">({daysUntilDue}d)</span>
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* School Outcome */}
            {schoolOutcome && (
              <div className="flex items-center gap-1.5 text-xs bg-violet-50 border border-violet-200 rounded px-2 py-1">
                <GraduationCap className="w-3 h-3 text-violet-600" />
                <span className="text-violet-700 font-medium">
                  Maps to: {schoolOutcome.label}
                  {schoolOutcome.credit && (
                    <span className="ml-1 text-violet-600">({schoolOutcome.credit})</span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions (Employer only) */}
        {userRole === 'employer' && (
          <div className="flex gap-2 pt-2 border-t border-slate-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="flex-1 h-8 text-xs"
            >
              <Edit className="w-3 h-3 mr-1.5" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="flex-1 h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3 mr-1.5" />
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AddDeliverableForm({ 
  onClose, 
  onSave 
}: { 
  onClose: () => void; 
  onSave: (deliverable: Omit<Deliverable, 'id' | 'placementId' | 'createdAt' | 'status' | 'progress'>) => void;
}) {
  const [category, setCategory] = useState<Category | ''>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillFocus, setSkillFocus] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [schoolOutcome, setSchoolOutcome] = useState('');

  const handleSave = () => {
    // Validation
    if (!category || !title || !description || !skillFocus || !expectedOutcome || !dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (title.length < 5) {
      toast.error('Title must be at least 5 characters');
      return;
    }

    if (description.length < 20) {
      toast.error('Description must be at least 20 characters');
      return;
    }

    onSave({
      title,
      description,
      category: category as Category,
      skillFocus,
      expectedOutcome,
      dueDate: new Date(dueDate),
      schoolOutcome: schoolOutcome || undefined,
    });

    toast.success('Deliverable created successfully');
    onClose();
  };

  return (
    <div className="space-y-4">
      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(CATEGORIES) as Category[]).map((cat) => {
            const catData = CATEGORIES[cat];
            const CategoryIcon = catData.icon;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  category === cat
                    ? `border-${catData.color}-500 bg-${catData.color}-50`
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                style={category === cat ? {
                  borderColor: catData.text,
                  background: catData.bg,
                } : undefined}
              >
                <CategoryIcon className="w-5 h-5 mb-1 mx-auto" style={{ color: catData.text }} />
                <p className="text-xs font-semibold" style={category === cat ? { color: catData.text } : undefined}>
                  {catData.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., POS System Training"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          maxLength={100}
        />
        <p className="text-xs text-slate-500 mt-1">{title.length}/100</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what the student will do..."
          className="w-full resize-none"
          rows={3}
          maxLength={300}
        />
        <p className="text-xs text-slate-500 mt-1">{description.length}/300</p>
      </div>

      {/* Skill Focus */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Skill Focus <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={skillFocus}
          onChange={(e) => setSkillFocus(e.target.value)}
          placeholder="e.g., Customer Service & Technology"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
        />
      </div>

      {/* Expected Outcome */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Expected Outcome <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-slate-500 mb-1">What should the student achieve?</p>
        <Textarea
          value={expectedOutcome}
          onChange={(e) => setExpectedOutcome(e.target.value)}
          placeholder="e.g., Successfully process 10 transactions independently"
          className="w-full resize-none"
          rows={2}
          maxLength={200}
        />
        <p className="text-xs text-slate-500 mt-1">{expectedOutcome.length}/200</p>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Due Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
        />
      </div>

      {/* School Outcome */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          School Learning Outcome (Optional)
        </label>
        <Select value={schoolOutcome} onValueChange={setSchoolOutcome}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select outcome..." />
          </SelectTrigger>
          <SelectContent>
            {SCHOOL_OUTCOMES.map((outcome) => (
              <SelectItem key={outcome.value} value={outcome.value}>
                {outcome.label}
                {outcome.credit && (
                  <span className="text-xs text-slate-500 ml-1">({outcome.credit})</span>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* High School Notice */}
      <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          <strong>Remember:</strong> Make this suitable for high school students (ages 16-18) with clear, achievable objectives
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSave} className="flex-1 bg-blue-500 hover:bg-blue-600">
          Create Deliverable
        </Button>
      </div>
    </div>
  );
}

export function CoOpDeliverables() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>(SAMPLE_DELIVERABLES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
  const userRole: 'student' | 'employer' = 'employer'; // In real app, from auth

  const filteredDeliverables = filterStatus === 'all' 
    ? deliverables 
    : deliverables.filter(d => d.status === filterStatus);

  const handleToggle = (id: string) => {
    setDeliverables(deliverables.map(d => 
      d.id === id 
        ? { ...d, status: 'completed' as Status, progress: 100 }
        : d
    ));
    toast.success('Deliverable marked as complete');
  };

  const handleDelete = (id: string) => {
    setDeliverables(deliverables.filter(d => d.id !== id));
    toast.success('Deliverable deleted');
  };

  const handleSave = (data: Omit<Deliverable, 'id' | 'placementId' | 'createdAt' | 'status' | 'progress'>) => {
    const newDeliverable: Deliverable = {
      ...data,
      id: `d${deliverables.length + 1}`,
      placementId: SAMPLE_PLACEMENT.id,
      status: 'not-started',
      progress: 0,
      createdAt: new Date(),
    };
    setDeliverables([...deliverables, newDeliverable]);
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Co-Op Deliverables</h1>
            <p className="text-xs text-slate-500">{filteredDeliverables.length} total</p>
          </div>
        </div>
        {userRole === 'employer' && (
          <Button
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        )}
      </div>

      {/* Student Header */}
      <div className="pt-3">
        <StudentHeaderCard placement={SAMPLE_PLACEMENT} />
        <ProgressSummary deliverables={deliverables} />
      </div>

      {/* Filter */}
      <div className="px-4 mb-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
            className="flex-shrink-0"
          >
            All ({deliverables.length})
          </Button>
          <Button
            variant={filterStatus === 'in-progress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('in-progress')}
            className="flex-shrink-0"
          >
            In Progress ({deliverables.filter(d => d.status === 'in-progress').length})
          </Button>
          <Button
            variant={filterStatus === 'not-started' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('not-started')}
            className="flex-shrink-0"
          >
            Not Started ({deliverables.filter(d => d.status === 'not-started').length})
          </Button>
          <Button
            variant={filterStatus === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('completed')}
            className="flex-shrink-0"
          >
            Completed ({deliverables.filter(d => d.status === 'completed').length})
          </Button>
        </div>
      </div>

      {/* Deliverables List */}
      <div className="space-y-0">
        {filteredDeliverables.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <FileText className="w-16 h-16 text-slate-300 mb-3" />
            <p className="text-slate-600 font-medium mb-1">No deliverables yet</p>
            <p className="text-sm text-slate-500 text-center mb-4">
              {userRole === 'employer' 
                ? 'Add deliverables to track learning objectives'
                : 'Your employer will add deliverables soon'}
            </p>
            {userRole === 'employer' && (
              <Button onClick={() => setShowAddForm(true)} className="bg-blue-500 hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add First Deliverable
              </Button>
            )}
          </div>
        ) : (
          filteredDeliverables.map((deliverable) => (
            <DeliverableCard
              key={deliverable.id}
              deliverable={deliverable}
              onToggle={() => handleToggle(deliverable.id)}
              onEdit={() => toast.info('Edit functionality coming soon')}
              onDelete={() => handleDelete(deliverable.id)}
              userRole={userRole}
            />
          ))
        )}
      </div>

      {/* Add Deliverable Form Modal */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Deliverable</DialogTitle>
          </DialogHeader>
          <AddDeliverableForm
            onClose={() => setShowAddForm(false)}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
