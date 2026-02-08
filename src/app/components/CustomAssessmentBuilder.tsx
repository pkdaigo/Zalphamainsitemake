import { useState } from 'react';
import { Plus, X, Check, AlertCircle, Edit, GripVertical, ClipboardList, Sparkles } from 'lucide-react';
import { ZeeOrchidBot } from '@/app/components/ZeeOrchidBot';

interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'true-false' | 'coding' | 'file-upload';
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer?: string | number; // For auto-graded questions
  points: number;
  required: boolean;
  timeLimit?: number; // in minutes
}

interface CustomAssessment {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // Total time in minutes
  passingScore: number; // Percentage
  questions: AssessmentQuestion[];
  enabled: boolean;
}

interface CustomAssessmentBuilderProps {
  existingAssessment?: CustomAssessment;
  onAssessmentChange: (assessment: CustomAssessment | null) => void;
}

export function CustomAssessmentBuilder({ 
  existingAssessment, 
  onAssessmentChange 
}: CustomAssessmentBuilderProps) {
  const [assessment, setAssessment] = useState<CustomAssessment>(existingAssessment || {
    id: `assessment-${Date.now()}`,
    title: '',
    description: '',
    timeLimit: 30,
    passingScore: 70,
    questions: [],
    enabled: false
  });

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<AssessmentQuestion | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<AssessmentQuestion>>({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: undefined,
    points: 10,
    required: true,
    timeLimit: undefined
  });

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice', icon: '📝' },
    { value: 'short-answer', label: 'Short Answer', icon: '✍️' },
    { value: 'essay', label: 'Essay', icon: '📄' },
    { value: 'true-false', label: 'True/False', icon: '✓/✗' },
    { value: 'coding', label: 'Coding Challenge', icon: '💻' },
    { value: 'file-upload', label: 'File Upload', icon: '📎' }
  ];

  const handleAddQuestion = () => {
    if (!newQuestion.question?.trim()) {
      alert('Please enter a question');
      return;
    }

    const question: AssessmentQuestion = {
      id: `q-${Date.now()}`,
      type: newQuestion.type as any,
      question: newQuestion.question,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer,
      points: newQuestion.points || 10,
      required: newQuestion.required !== false,
      timeLimit: newQuestion.timeLimit
    };

    const updatedAssessment = {
      ...assessment,
      questions: [...assessment.questions, question]
    };

    setAssessment(updatedAssessment);
    onAssessmentChange(updatedAssessment);
    
    // Reset form
    setNewQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: undefined,
      points: 10,
      required: true,
      timeLimit: undefined
    });
    setShowQuestionForm(false);
  };

  const handleRemoveQuestion = (id: string) => {
    const updatedAssessment = {
      ...assessment,
      questions: assessment.questions.filter(q => q.id !== id)
    };
    setAssessment(updatedAssessment);
    onAssessmentChange(updatedAssessment);
  };

  const handleToggleAssessment = () => {
    const updatedAssessment = {
      ...assessment,
      enabled: !assessment.enabled
    };
    setAssessment(updatedAssessment);
    onAssessmentChange(updatedAssessment.enabled ? updatedAssessment : null);
  };

  const totalPoints = assessment.questions.reduce((sum, q) => sum + q.points, 0);

  // Handle Zee's AI suggestions
  const handleZeeSuggestion = (suggestion: any) => {
    const updatedAssessment = {
      ...assessment,
      title: suggestion.title,
      description: suggestion.description,
      timeLimit: suggestion.timeLimit,
      passingScore: suggestion.passingScore,
      enabled: true,
      questions: suggestion.questions.map((q: any, index: number) => ({
        id: `q-${Date.now()}-${index}`,
        type: q.type,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        points: q.points,
        required: true,
        timeLimit: undefined
      }))
    };
    
    setAssessment(updatedAssessment);
    onAssessmentChange(updatedAssessment);
  };

  return (
    <>
      {/* Zee AI Bot Helper */}
      <ZeeOrchidBot 
        onSuggestion={handleZeeSuggestion}
        jobTitle="this position"
        jobCategory="general"
      />

      <div className="bg-white rounded-xl border-2 border-blue-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-blue-600" />
              Custom Candidate Assessment
            </h3>
            <p className="text-sm text-gray-600">
              Create a custom test to evaluate candidates before they can apply. This helps you find the best matches.
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">
            <input
              type="checkbox"
              checked={assessment.enabled}
              onChange={handleToggleAssessment}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="font-semibold text-gray-700">
              {assessment.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>

        {assessment.enabled && (
          <>
            {/* Assessment Settings */}
            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200 mb-6">
              <h4 className="font-bold text-gray-900 mb-4">Assessment Settings</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Assessment Title *
                  </label>
                  <input
                    type="text"
                    value={assessment.title}
                    onChange={(e) => {
                      const updated = { ...assessment, title: e.target.value };
                      setAssessment(updated);
                      onAssessmentChange(updated);
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., Graphic Design Skills Test"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={assessment.description}
                    onChange={(e) => {
                      const updated = { ...assessment, description: e.target.value };
                      setAssessment(updated);
                      onAssessmentChange(updated);
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    rows={2}
                    placeholder="What will candidates be tested on?"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Time Limit (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="180"
                      value={assessment.timeLimit}
                      onChange={(e) => {
                        const updated = { ...assessment, timeLimit: parseInt(e.target.value) || 30 };
                        setAssessment(updated);
                        onAssessmentChange(updated);
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Passing Score (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={assessment.passingScore}
                      onChange={(e) => {
                        const updated = { ...assessment, passingScore: parseInt(e.target.value) || 70 };
                        setAssessment(updated);
                        onAssessmentChange(updated);
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Questions List */}
            {assessment.questions.length > 0 && (
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">
                    Questions ({assessment.questions.length}) • Total Points: {totalPoints}
                  </h4>
                  {!showQuestionForm && (
                    <button
                      onClick={() => setShowQuestionForm(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 font-semibold text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Question
                    </button>
                  )}
                </div>

                {assessment.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full font-semibold">
                                {questionTypes.find(t => t.value === question.type)?.label}
                              </span>
                              <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded-full font-semibold">
                                {question.points} points
                              </span>
                              {question.required && (
                                <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full font-semibold">
                                  Required
                                </span>
                              )}
                            </div>
                            <p className="font-semibold text-gray-900 mb-2">{question.question}</p>
                            
                            {question.type === 'multiple-choice' && question.options && (
                              <div className="space-y-1 text-sm">
                                {question.options.map((opt, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <span className="text-gray-500">{String.fromCharCode(65 + i)}.</span>
                                    <span className={question.correctAnswer === i ? 'text-green-600 font-semibold' : 'text-gray-700'}>
                                      {opt}
                                      {question.correctAnswer === i && ' ✓'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleRemoveQuestion(question.id)}
                            className="w-8 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all flex items-center justify-center flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Question Form */}
            {showQuestionForm && (
              <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-300 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900">Add New Question</h4>
                  <button
                    onClick={() => setShowQuestionForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Question Type
                    </label>
                    <select
                      value={newQuestion.type}
                      onChange={(e) => setNewQuestion({ 
                        ...newQuestion, 
                        type: e.target.value as any,
                        options: e.target.value === 'multiple-choice' ? ['', '', '', ''] : undefined
                      })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    >
                      {questionTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Question *
                    </label>
                    <textarea
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      rows={3}
                      placeholder="Enter your question here..."
                    />
                  </div>

                  {/* Multiple Choice Options */}
                  {newQuestion.type === 'multiple-choice' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Answer Options
                      </label>
                      <div className="space-y-2">
                        {newQuestion.options?.map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={newQuestion.correctAnswer === i}
                              onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: i })}
                              className="w-4 h-4 accent-green-600"
                            />
                            <span className="text-sm font-semibold text-gray-700 w-6">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newOptions = [...(newQuestion.options || [])];
                                newOptions[i] = e.target.value;
                                setNewQuestion({ ...newQuestion, options: newOptions });
                              }}
                              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              placeholder={`Option ${String.fromCharCode(65 + i)}`}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        ✓ Select the radio button next to the correct answer
                      </p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Points
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={newQuestion.points}
                        onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) || 10 })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time Limit (min, optional)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={newQuestion.timeLimit || ''}
                        onChange={(e) => setNewQuestion({ ...newQuestion, timeLimit: parseInt(e.target.value) || undefined })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="No limit"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newQuestion.required !== false}
                        onChange={(e) => setNewQuestion({ ...newQuestion, required: e.target.checked })}
                        className="w-5 h-5 accent-purple-600"
                      />
                      <span className="text-sm font-semibold text-gray-700">
                        This question is required
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddQuestion}
                      disabled={!newQuestion.question?.trim()}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Add Question
                    </button>
                    <button
                      onClick={() => setShowQuestionForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {assessment.questions.length === 0 && !showQuestionForm && (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">No questions added yet</p>
                <button
                  onClick={() => setShowQuestionForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all inline-flex items-center gap-2 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Question
                </button>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-semibold mb-1">💡 Assessment Best Practices:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Keep assessments short (5-10 questions max for entry-level positions)</li>
                    <li>Focus on practical skills, not trivia</li>
                    <li>Use multiple question types to test different abilities</li>
                    <li>Set a reasonable time limit (2-3 minutes per question)</li>
                    <li>Remember: These are entry-level students, not experts</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {!assessment.enabled && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">Custom assessment is disabled</p>
            <p className="text-sm text-gray-500 mb-4">
              Enable it above to create a custom test for candidates
            </p>
          </div>
        )}
      </div>
    </>
  );
}