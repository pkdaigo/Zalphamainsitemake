import { useState } from 'react';
import { Award, Star, FileText, GraduationCap, CheckCircle, Download, TrendingUp } from 'lucide-react';

interface EvaluationCriteria {
  id: string;
  category: string;
  criteria: string;
  rating: number;
  comments: string;
}

interface InternshipEvaluationProps {
  internName: string;
  internshipTitle: string;
  company: string;
  startDate: Date;
  endDate: Date;
  userType: 'mentor' | 'student';
  totalHours: number;
  completedHours: number;
}

export function InternshipEvaluation({ 
  internName, 
  internshipTitle, 
  company, 
  startDate, 
  endDate,
  userType,
  totalHours,
  completedHours
}: InternshipEvaluationProps) {
  const [evaluationCriteria, setEvaluationCriteria] = useState<EvaluationCriteria[]>([
    {
      id: 'eval_001',
      category: 'Technical Skills',
      criteria: 'Demonstrates proficiency in required technical skills',
      rating: 0,
      comments: '',
    },
    {
      id: 'eval_002',
      category: 'Technical Skills',
      criteria: 'Applies knowledge to solve real-world problems',
      rating: 0,
      comments: '',
    },
    {
      id: 'eval_003',
      category: 'Professional Skills',
      criteria: 'Communicates effectively with team members',
      rating: 0,
      comments: '',
    },
    {
      id: 'eval_004',
      category: 'Professional Skills',
      criteria: 'Demonstrates reliability and punctuality',
      rating: 0,
      comments: '',
    },
    {
      id: 'eval_005',
      category: 'Professional Skills',
      criteria: 'Takes initiative and shows enthusiasm',
      rating: 0,
      comments: '',
    },
    {
      id: 'eval_006',
      category: 'Learning & Growth',
      criteria: 'Shows willingness to learn and adapt',
      rating: 0,
      comments: '',
    },
    {
      id: 'eval_007',
      category: 'Learning & Growth',
      criteria: 'Applies feedback and improves performance',
      rating: 0,
      comments: '',
    },
    {
      id: 'eval_008',
      category: 'Teamwork',
      criteria: 'Works collaboratively with others',
      rating: 0,
      comments: '',
    },
    {
      id: 'eval_009',
      category: 'Teamwork',
      criteria: 'Contributes positively to team culture',
      rating: 0,
      comments: '',
    },
    {
      id: 'eval_010',
      category: 'Work Quality',
      criteria: 'Produces high-quality work',
      rating: 0,
      comments: '',
    },
  ]);

  const [overallComments, setOverallComments] = useState('');
  const [strengths, setStrengths] = useState('');
  const [areasForImprovement, setAreasForImprovement] = useState('');
  const [futureRecommendations, setFutureRecommendations] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);

  // Academic Credit Section
  const [requestingCredit, setRequestingCredit] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [instructorEmail, setInstructorEmail] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [creditsRequested, setCreditsRequested] = useState('');

  const updateRating = (id: string, rating: number) => {
    setEvaluationCriteria(evaluationCriteria.map(item =>
      item.id === id ? { ...item, rating } : item
    ));
  };

  const updateComments = (id: string, comments: string) => {
    setEvaluationCriteria(evaluationCriteria.map(item =>
      item.id === id ? { ...item, comments } : item
    ));
  };

  const calculateAverageRating = () => {
    const rated = evaluationCriteria.filter(item => item.rating > 0);
    if (rated.length === 0) return 0;
    const sum = rated.reduce((acc, item) => acc + item.rating, 0);
    return (sum / rated.length).toFixed(1);
  };

  const getCategoryAverage = (category: string) => {
    const categoryItems = evaluationCriteria.filter(item => item.category === category && item.rating > 0);
    if (categoryItems.length === 0) return 0;
    const sum = categoryItems.reduce((acc, item) => acc + item.rating, 0);
    return (sum / categoryItems.length).toFixed(1);
  };

  const categories = Array.from(new Set(evaluationCriteria.map(item => item.category)));

  const handleSubmitEvaluation = () => {
    // Validation
    const allRated = evaluationCriteria.every(item => item.rating > 0);
    if (!allRated) {
      alert('Please rate all criteria before submitting');
      return;
    }

    if (!overallComments.trim() || !strengths.trim() || !areasForImprovement.trim()) {
      alert('Please complete all required sections');
      return;
    }

    alert('Evaluation submitted successfully!');
  };

  const handleRequestCredit = () => {
    if (!schoolName || !instructorName || !instructorEmail || !courseNumber || !creditsRequested) {
      alert('Please fill in all academic credit information');
      return;
    }

    alert('Academic credit request submitted! Your school will be contacted for verification.');
  };

  const progressPercentage = Math.round((completedHours / totalHours) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-8 mb-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Internship Evaluation</h1>
              <p className="text-purple-100">{internName} - {internshipTitle}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 bg-white/10 backdrop-blur rounded-lg p-4">
            <div>
              <p className="text-sm text-purple-200 mb-1">Company</p>
              <p className="font-bold">{company}</p>
            </div>
            <div>
              <p className="text-sm text-purple-200 mb-1">Duration</p>
              <p className="font-bold">
                {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-purple-200 mb-1">Hours Completed</p>
              <p className="font-bold">{completedHours} / {totalHours} hours ({progressPercentage}%)</p>
            </div>
          </div>
        </div>

        {/* Evaluation Form (Mentor View) */}
        {userType === 'mentor' && (
          <div className="space-y-6">
            {/* Rating Criteria */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Evaluation</h2>

              {categories.map((category) => (
                <div key={category} className="mb-8 last:mb-0">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                    <span className="text-sm font-semibold text-indigo-600">
                      Average: {getCategoryAverage(category)} / 5.0
                    </span>
                  </div>

                  <div className="space-y-4">
                    {evaluationCriteria
                      .filter(item => item.category === category)
                      .map((item) => (
                        <div key={item.id} className="border-2 border-gray-200 rounded-lg p-4">
                          <p className="font-semibold text-gray-900 mb-3">{item.criteria}</p>
                          
                          {/* Star Rating */}
                          <div className="flex items-center gap-2 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => updateRating(item.id, star)}
                                className="transition-all hover:scale-110"
                              >
                                <Star
                                  className={`w-8 h-8 ${
                                    star <= item.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              </button>
                            ))}
                            {item.rating > 0 && (
                              <span className="ml-2 font-bold text-indigo-600">
                                {item.rating}.0
                              </span>
                            )}
                          </div>

                          {/* Comments */}
                          <textarea
                            value={item.comments}
                            onChange={(e) => updateComments(item.id, e.target.value)}
                            placeholder="Add specific comments or examples..."
                            className="w-full h-20 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none text-sm"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Overall Rating */}
              <div className="mt-8 bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">Overall Rating</h3>
                    <p className="text-sm text-indigo-700">Average across all criteria</p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-bold text-indigo-600">{calculateAverageRating()}</p>
                    <p className="text-sm text-indigo-700">out of 5.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Written Feedback */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Written Feedback</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Overall Performance Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={overallComments}
                    onChange={(e) => setOverallComments(e.target.value)}
                    placeholder="Provide an overall summary of the intern's performance during this internship..."
                    className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Key Strengths <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    placeholder="What are the intern's main strengths? What did they excel at?"
                    className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Areas for Improvement <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={areasForImprovement}
                    onChange={(e) => setAreasForImprovement(e.target.value)}
                    placeholder="What skills or behaviors could the intern develop further?"
                    className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Future Recommendations
                  </label>
                  <textarea
                    value={futureRecommendations}
                    onChange={(e) => setFutureRecommendations(e.target.value)}
                    placeholder="Would you recommend this intern for full-time positions? What roles would they be suited for?"
                    className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Would you hire this intern for a full-time position? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setWouldRecommend(true)}
                      className={`flex-1 px-6 py-3 border-2 rounded-lg font-semibold transition-all ${
                        wouldRecommend === true
                          ? 'bg-green-600 text-white border-green-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Yes, Definitely
                    </button>
                    <button
                      onClick={() => setWouldRecommend(false)}
                      className={`flex-1 px-6 py-3 border-2 rounded-lg font-semibold transition-all ${
                        wouldRecommend === false
                          ? 'bg-red-600 text-white border-red-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Not at This Time
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                  Save Draft
                </button>
                <button
                  onClick={handleSubmitEvaluation}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Submit Evaluation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Academic Credit Request (Student View) */}
        {userType === 'student' && (
          <div className="space-y-6">
            {/* View Evaluation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Performance Evaluation</h2>
              
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-indigo-900">Overall Rating</h3>
                    <p className="text-sm text-indigo-700">Based on mentor evaluation</p>
                  </div>
                  <div className="text-center">
                    <p className="text-6xl font-bold text-indigo-600">4.5</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${
                            star <= 4.5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {categories.map((category) => (
                  <div key={category} className="border-2 border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">{category}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600"
                          style={{ width: `${(parseFloat(getCategoryAverage(category)) / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-indigo-600">
                        {getCategoryAverage(category)}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                View Full Evaluation Report
              </button>
            </div>

            {/* Academic Credit Request */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-green-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Request Academic Credit</h2>
                  <p className="text-sm text-gray-600">
                    Get college credit for your internship experience
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requestingCredit}
                    onChange={(e) => setRequestingCredit(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="font-semibold text-gray-900">
                    I want to receive academic credit for this internship
                  </span>
                </label>
              </div>

              {requestingCredit && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Requirements:</strong> You must have completed at least {Math.round(totalHours * 0.8)} hours 
                      ({Math.round((totalHours * 0.8 / totalHours) * 100)}% of required hours) and received a 
                      satisfactory evaluation from your mentor.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        School/University <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="University of Guam"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Course Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={courseNumber}
                        onChange={(e) => setCourseNumber(e.target.value)}
                        placeholder="CS 499"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Faculty Advisor/Instructor <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={instructorName}
                        onChange={(e) => setInstructorName(e.target.value)}
                        placeholder="Dr. Jane Smith"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Instructor Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={instructorEmail}
                        onChange={(e) => setInstructorEmail(e.target.value)}
                        placeholder="jane.smith@uog.edu"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Credits Requested <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={creditsRequested}
                        onChange={(e) => setCreditsRequested(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 Credit</option>
                        <option value="2">2 Credits</option>
                        <option value="3">3 Credits</option>
                        <option value="4">4 Credits</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-900 mb-2">What Happens Next:</h4>
                    <ol className="space-y-1 text-sm text-yellow-800 list-decimal list-inside">
                      <li>ZALPHA will send your evaluation and hours log to your instructor</li>
                      <li>Your instructor will review and verify the internship</li>
                      <li>Credit will be processed by your school's registrar</li>
                      <li>Typically takes 2-4 weeks to complete</li>
                    </ol>
                  </div>

                  <button
                    onClick={handleRequestCredit}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Submit Credit Request
                  </button>
                </div>
              )}
            </div>

            {/* Certificate */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Internship Certificate</h2>
              <p className="text-gray-600 mb-6">
                Download your official internship completion certificate
              </p>
              <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}