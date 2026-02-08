import { useState } from 'react';
import { Brain, Plus, Eye, Edit, Trash2, Copy, TrendingUp } from 'lucide-react';
import { CustomAssessmentBuilder } from '@/app/components/CustomAssessmentBuilder';
import { BackButton } from '@/app/components/BackButton';

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: any[];
  totalPoints: number;
  estimatedTime: number;
  passingScore: number;
  timesUsed: number;
  averageScore: number;
  createdDate: string;
}

interface EmployerAssessmentsProps {
  onNavigate: (page: string) => void;
}

export function EmployerAssessments({ onNavigate }: EmployerAssessmentsProps) {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: '1',
      title: 'Customer Service Excellence',
      description: 'Evaluates customer service skills and conflict resolution',
      category: 'customer-service',
      difficulty: 'intermediate',
      questions: [],
      totalPoints: 100,
      estimatedTime: 25,
      passingScore: 75,
      timesUsed: 12,
      averageScore: 82,
      createdDate: '2026-01-15'
    },
    {
      id: '2',
      title: 'Hotel Front Desk Operations',
      description: 'Tests knowledge of hotel systems and guest services',
      category: 'hospitality',
      difficulty: 'intermediate',
      questions: [],
      totalPoints: 120,
      estimatedTime: 30,
      passingScore: 70,
      timesUsed: 8,
      averageScore: 78,
      createdDate: '2026-01-20'
    }
  ]);

  const handleSaveAssessment = (assessment: Assessment) => {
    if (selectedAssessment) {
      // Update existing
      setAssessments(prev => prev.map(a => a.id === assessment.id ? assessment : a));
    } else {
      // Create new
      setAssessments(prev => [...prev, { ...assessment, timesUsed: 0, averageScore: 0, createdDate: new Date().toISOString().split('T')[0] }]);
    }
    setView('list');
    setSelectedAssessment(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this assessment?')) {
      setAssessments(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleDuplicate = (assessment: Assessment) => {
    const duplicate = {
      ...assessment,
      id: Date.now().toString(),
      title: `${assessment.title} (Copy)`,
      timesUsed: 0,
      averageScore: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setAssessments(prev => [...prev, duplicate]);
  };

  if (view === 'create' || view === 'edit') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
        <BackButton onNavigate={onNavigate} destination="employer-dashboard" />
        <CustomAssessmentBuilder
          onSave={handleSaveAssessment}
          existingAssessment={selectedAssessment || undefined}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Brain className="w-10 h-10 text-purple-600" />
                Custom Assessments
              </h1>
              <p className="text-xl text-gray-600">
                Create job-specific tests with AI assistance from Zee
              </p>
            </div>
            <button
              onClick={() => setView('create')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create New Assessment
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Assessments</p>
                  <p className="text-3xl font-bold text-gray-900">{assessments.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Times Used</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {assessments.reduce((sum, a) => sum + a.timesUsed, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Score</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {assessments.length > 0
                      ? Math.round(assessments.reduce((sum, a) => sum + a.averageScore, 0) / assessments.length)
                      : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assessments List */}
        {assessments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Assessments Yet</h2>
            <p className="text-gray-600 mb-6">
              Create your first custom assessment with AI assistance from Zee
            </p>
            <button
              onClick={() => setView('create')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold text-lg flex items-center gap-2 mx-auto shadow-lg"
            >
              <Plus className="w-6 h-6" />
              Create Your First Assessment
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{assessment.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{assessment.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        {assessment.category.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        assessment.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                        assessment.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {assessment.difficulty.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Questions</p>
                    <p className="text-lg font-bold text-gray-900">{assessment.questions.length || 10}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Time</p>
                    <p className="text-lg font-bold text-gray-900">{assessment.estimatedTime}m</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Pass %</p>
                    <p className="text-lg font-bold text-gray-900">{assessment.passingScore}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-600 mb-1">Times Used</p>
                    <p className="text-xl font-bold text-blue-900">{assessment.timesUsed}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 mb-1">Avg. Score</p>
                    <p className="text-xl font-bold text-green-900">{assessment.averageScore}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedAssessment(assessment);
                      setView('edit');
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDuplicate(assessment)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(assessment.id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🌟 Standout Feature: AI-Powered Assessment Builder
          </h3>
          <p className="text-gray-700 mb-4">
            Unlike Indeed or LinkedIn, ZALPHA offers intelligent, job-specific assessments tailored to the Western Pacific workforce:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Zee AI Assistant:</strong> Get instant question suggestions based on your job requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Pacific Context:</strong> Questions include cultural awareness and regional considerations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Multiple Question Types:</strong> Multiple choice, short answer, essay, practical scenarios, and coding challenges</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Analytics:</strong> Track completion rates and average scores to refine your hiring process</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}