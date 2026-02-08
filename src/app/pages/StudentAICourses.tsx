import { useState } from 'react';
import { GraduationCap, BookOpen, Award, Clock, TrendingUp, Play, CheckCircle, Lock, Sparkles, Brain } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { ZalphaBot } from '@/app/components/ZalphaBot';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  modules: number;
  enrolled: boolean;
  progress: number;
  certificate: boolean;
  rating: number;
  students: number;
  skills: string[];
  thumbnail: string;
}

interface StudentAICoursesProps {
  onNavigate: (page: string) => void;
}

export function StudentAICourses({ onNavigate }: StudentAICoursesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledOnly, setEnrolledOnly] = useState(false);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Professional Communication Skills',
      description: 'Master workplace communication, email etiquette, and professional conversations with AI-guided practice',
      category: 'soft-skills',
      level: 'beginner',
      duration: '2 hours',
      modules: 8,
      enrolled: true,
      progress: 65,
      certificate: true,
      rating: 4.8,
      students: 245,
      skills: ['Email Writing', 'Phone Etiquette', 'Active Listening', 'Presentation Skills'],
      thumbnail: '💬'
    },
    {
      id: '2',
      title: 'Customer Service Excellence',
      description: 'Learn hospitality best practices, conflict resolution, and customer satisfaction strategies for the Pacific tourism industry',
      category: 'hospitality',
      level: 'intermediate',
      duration: '3 hours',
      modules: 12,
      enrolled: true,
      progress: 30,
      certificate: true,
      rating: 4.9,
      students: 189,
      skills: ['Guest Relations', 'Problem Solving', 'Cultural Sensitivity', 'Service Recovery'],
      thumbnail: '🏨'
    },
    {
      id: '3',
      title: 'Digital Literacy Fundamentals',
      description: 'Build essential computer skills including Microsoft Office, email, internet navigation, and online collaboration tools',
      category: 'technology',
      level: 'beginner',
      duration: '4 hours',
      modules: 16,
      enrolled: false,
      progress: 0,
      certificate: true,
      rating: 4.7,
      students: 412,
      skills: ['Microsoft Word', 'Excel Basics', 'Email Management', 'Google Workspace'],
      thumbnail: '💻'
    },
    {
      id: '4',
      title: 'Financial Literacy & Money Management',
      description: 'Understanding budgeting, saving, credit, and financial planning for young professionals in the Pacific region',
      category: 'personal-development',
      level: 'beginner',
      duration: '2.5 hours',
      modules: 10,
      enrolled: false,
      progress: 0,
      certificate: true,
      rating: 4.6,
      students: 298,
      skills: ['Budgeting', 'Credit Score', 'Savings Plans', 'Investment Basics'],
      thumbnail: '💰'
    },
    {
      id: '5',
      title: 'Introduction to Web Development',
      description: 'Learn HTML, CSS, and JavaScript basics to start your tech career with hands-on projects and AI mentorship',
      category: 'technology',
      level: 'intermediate',
      duration: '8 hours',
      modules: 24,
      enrolled: true,
      progress: 15,
      certificate: true,
      rating: 4.9,
      students: 167,
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      thumbnail: '🌐'
    },
    {
      id: '6',
      title: 'Leadership & Team Management',
      description: 'Develop leadership skills, team coordination, and management techniques for emerging Pacific leaders',
      category: 'soft-skills',
      level: 'advanced',
      duration: '5 hours',
      modules: 18,
      enrolled: false,
      progress: 0,
      certificate: true,
      rating: 4.8,
      students: 134,
      skills: ['Team Building', 'Conflict Resolution', 'Decision Making', 'Motivation'],
      thumbnail: '👥'
    },
    {
      id: '7',
      title: 'Pacific Island Business Practices',
      description: 'Understanding business culture, customs, and professional etiquette across CNMI, FSM, Guam, and Hawaii',
      category: 'cultural',
      level: 'intermediate',
      duration: '3 hours',
      modules: 12,
      enrolled: false,
      progress: 0,
      certificate: true,
      rating: 5.0,
      students: 89,
      skills: ['Cultural Awareness', 'Business Etiquette', 'Regional Customs', 'Networking'],
      thumbnail: '🏝️'
    },
    {
      id: '8',
      title: 'Resume Writing & Interview Prep',
      description: 'Craft compelling resumes and master interview techniques with AI feedback and mock interview practice',
      category: 'career-prep',
      level: 'beginner',
      duration: '2 hours',
      modules: 8,
      enrolled: true,
      progress: 80,
      certificate: true,
      rating: 4.9,
      students: 523,
      skills: ['Resume Design', 'Cover Letters', 'Interview Skills', 'Personal Branding'],
      thumbnail: '📄'
    },
    {
      id: '9',
      title: 'Data Analytics for Beginners',
      description: 'Learn data analysis fundamentals with Excel, basic statistics, and data visualization techniques',
      category: 'technology',
      level: 'intermediate',
      duration: '6 hours',
      modules: 20,
      enrolled: false,
      progress: 0,
      certificate: true,
      rating: 4.7,
      students: 201,
      skills: ['Excel Advanced', 'Data Visualization', 'Statistics', 'Reporting'],
      thumbnail: '📊'
    },
    {
      id: '10',
      title: 'Time Management & Productivity',
      description: 'Master time management techniques, productivity tools, and work-life balance strategies',
      category: 'personal-development',
      level: 'beginner',
      duration: '1.5 hours',
      modules: 6,
      enrolled: false,
      progress: 0,
      certificate: true,
      rating: 4.6,
      students: 387,
      skills: ['Task Prioritization', 'Calendar Management', 'Goal Setting', 'Focus Techniques'],
      thumbnail: '⏰'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'soft-skills', name: 'Soft Skills', icon: '💬' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'hospitality', name: 'Hospitality', icon: '🏨' },
    { id: 'career-prep', name: 'Career Prep', icon: '📄' },
    { id: 'personal-development', name: 'Personal Development', icon: '🌟' },
    { id: 'cultural', name: 'Cultural Awareness', icon: '🏝️' }
  ];

  const filteredCourses = courses.filter(course => {
    if (enrolledOnly && !course.enrolled) return false;
    if (selectedCategory !== 'all' && course.category !== selectedCategory) return false;
    return true;
  });

  const myProgress = {
    coursesEnrolled: courses.filter(c => c.enrolled).length,
    coursesCompleted: courses.filter(c => c.enrolled && c.progress === 100).length,
    certificatesEarned: courses.filter(c => c.enrolled && c.progress === 100 && c.certificate).length,
    averageProgress: Math.round(
      courses.filter(c => c.enrolled).reduce((sum, c) => sum + c.progress, 0) /
      courses.filter(c => c.enrolled).length
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Dashboard" />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Brain className="w-10 h-10 text-purple-600" />
                AI-Powered Courses
              </h1>
              <p className="text-xl text-gray-600">
                Learn new skills with personalized AI mentorship
              </p>
            </div>
            <button
              onClick={() => setEnrolledOnly(!enrolledOnly)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                enrolledOnly
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
              }`}
            >
              {enrolledOnly ? 'Show All Courses' : 'My Courses'}
            </button>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8" />
                <TrendingUp className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-3xl font-bold mb-1">{myProgress.coursesEnrolled}</p>
              <p className="text-blue-100">Courses Enrolled</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8" />
                <TrendingUp className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-3xl font-bold mb-1">{myProgress.coursesCompleted}</p>
              <p className="text-green-100">Completed</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8" />
                <TrendingUp className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-3xl font-bold mb-1">{myProgress.certificatesEarned}</p>
              <p className="text-purple-100">Certificates</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8" />
                <Sparkles className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-3xl font-bold mb-1">{myProgress.averageProgress || 0}%</p>
              <p className="text-orange-100">Avg. Progress</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600 hover:text-purple-600'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Courses Found</h2>
            <p className="text-gray-600 mb-6">
              {enrolledOnly ? 'You haven\'t enrolled in any courses yet.' : 'Try selecting a different category.'}
            </p>
            {enrolledOnly && (
              <button
                onClick={() => setEnrolledOnly(false)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Browse All Courses
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
                {/* Course Thumbnail */}
                <div className={`h-32 bg-gradient-to-br ${
                  course.enrolled 
                    ? 'from-blue-500 to-purple-600' 
                    : 'from-gray-400 to-gray-500'
                } flex items-center justify-center text-6xl`}>
                  {course.thumbnail}
                </div>

                <div className="p-6">
                  {/* Course Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {course.title}
                      </h3>
                      {course.enrolled && (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {course.description}
                    </p>

                    {/* Course Meta */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        course.level === 'beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {course.level.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                        {course.modules} modules
                      </span>
                    </div>

                    {/* Rating & Students */}
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{course.students} students</span>
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {course.enrolled && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-700">Progress</span>
                          <span className="text-xs font-bold text-purple-600">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{course.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Certificate Badge */}
                    {course.certificate && (
                      <div className="flex items-center gap-2 text-xs text-purple-600 font-semibold mb-4">
                        <Award className="w-4 h-4" />
                        Certificate upon completion
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                      course.enrolled
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-600 hover:text-white'
                    }`}
                  >
                    {course.enrolled ? (
                      <>
                        <Play className="w-5 h-5" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Enroll Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feature Highlight */}
        <div className="mt-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                🌟 AI-Powered Learning Experience
              </h3>
              <p className="text-gray-700 mb-4">
                ZALPHA courses are different from traditional online learning platforms:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Zee AI Mentor:</strong> Get personalized feedback and guidance throughout your learning journey</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Pacific-Focused:</strong> All courses are tailored to Western Pacific workforce needs and culture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Interactive Practice:</strong> Hands-on exercises with real-time AI evaluation and improvement suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Employer Recognition:</strong> Certificates are recognized by ZALPHA employers and show on your profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Career Pathways:</strong> Course recommendations based on your job interests and skill gaps</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Zee Assistant Bot */}
      <ZalphaBot onNavigate={onNavigate} userName="Student" />
    </div>
  );
}