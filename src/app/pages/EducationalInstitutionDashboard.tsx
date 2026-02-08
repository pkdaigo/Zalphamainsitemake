import { useState } from 'react';
import { GraduationCap, Users, DollarSign, TrendingUp, Award, Briefcase, MapPin, Eye, EyeOff, Lock, Info, Download, BarChart3, CheckCircle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface StudentData {
  id: string;
  name: string;
  email: string;
  major: string;
  gpa: number;
  graduationDate: string;
  consentGiven: {
    name: boolean;
    email: boolean;
    phone: boolean;
    major: boolean;
    gpa: boolean;
    assessmentScores: boolean;
    applicationActivity: boolean;
    jobOffers: boolean;
    hiringStatus: boolean;
    salaryInfo: boolean;
  };
  stats: {
    applications: number;
    offers: number;
    hired: boolean;
    salary?: string;
  };
  revenueGenerated: number;
}

interface EducationalInstitutionDashboardProps {
  institutionName: string;
  onNavigate: (page: string) => void;
}

export function EducationalInstitutionDashboard({ institutionName, onNavigate }: EducationalInstitutionDashboardProps) {
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

  // Mock data - In production, this comes from API with consent filters applied
  const students: StudentData[] = [
    {
      id: '1',
      name: 'Maria Santos',
      email: 'maria.santos@guam.edu',
      major: 'Business Administration',
      gpa: 3.7,
      graduationDate: '2025-05',
      consentGiven: {
        name: true,
        email: true,
        phone: false,
        major: true,
        gpa: true,
        assessmentScores: true,
        applicationActivity: true,
        jobOffers: true,
        hiringStatus: true,
        salaryInfo: false,
      },
      stats: {
        applications: 12,
        offers: 3,
        hired: true,
        salary: 'Hidden by student',
      },
      revenueGenerated: 125.50,
    },
    {
      id: '2',
      name: 'Anonymous Student',
      email: 'Hidden',
      major: 'Computer Science',
      gpa: 3.9,
      graduationDate: '2025-08',
      consentGiven: {
        name: false,
        email: false,
        phone: false,
        major: true,
        gpa: false,
        assessmentScores: false,
        applicationActivity: false,
        jobOffers: false,
        hiringStatus: false,
        salaryInfo: false,
      },
      stats: {
        applications: 0,
        offers: 0,
        hired: false,
      },
      revenueGenerated: 45.00,
    },
    {
      id: '3',
      name: 'John Taitano',
      email: 'j.taitano@uog.edu',
      major: 'Marketing',
      gpa: 3.4,
      graduationDate: '2025-12',
      consentGiven: {
        name: true,
        email: true,
        phone: true,
        major: true,
        gpa: true,
        assessmentScores: true,
        applicationActivity: true,
        jobOffers: true,
        hiringStatus: true,
        salaryInfo: true,
      },
      stats: {
        applications: 8,
        offers: 2,
        hired: true,
        salary: '$45,000/year',
      },
      revenueGenerated: 225.00,
    },
  ];

  const totalRevenue = students.reduce((sum, s) => sum + s.revenueGenerated, 0);
  const totalStudents = students.length;
  const hiredStudents = students.filter(s => s.stats.hired).length;
  const totalApplications = students.reduce((sum, s) => sum + s.stats.applications, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 py-12 px-6">
      <BackButton onNavigate={onNavigate} destination="landing" />
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-blue-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Educational Institution Dashboard
                </h1>
                <p className="text-gray-600 font-medium">{institutionName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm text-purple-900">
              <p className="font-bold mb-2">🔒 Student Privacy Protection Active</p>
              <p className="mb-2">
                ZALPHA respects student privacy rights. You can ONLY see data that students have explicitly 
                consented to share with your institution. Students have full control over their privacy settings.
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li><strong>Masked Data:</strong> Fields marked "Hidden" mean student has not given consent</li>
                <li><strong>Anonymous Students:</strong> Students who hide their identity still generate revenue</li>
                <li><strong>FERPA Compliant:</strong> All data access is logged and auditable</li>
                <li><strong>Student Rights:</strong> Students can modify privacy settings anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Active Students</p>
                <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Revenue Generated</p>
                <p className="text-3xl font-bold text-green-900">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">0.5% commission from all transactions</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Students Hired</p>
                <p className="text-3xl font-bold text-purple-900">{hiredStudents}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">{Math.round((hiredStudents/totalStudents)*100)}% placement rate</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-orange-900">{totalApplications}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Avg {Math.round(totalApplications/totalStudents)} per student</p>
          </div>
        </div>
      </div>

      {/* Student Data Table with Consent-Based Visibility */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-indigo-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Student Performance Dashboard</h2>
              <p className="text-sm text-gray-600">Consent-based data access • FERPA compliant</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>

          <div className="overflow-x-auto table-scroll">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-100 to-indigo-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Student Name</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Major</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">GPA</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Applications</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Offers</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Hired</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Salary</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Revenue</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Privacy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3">
                      {student.consentGiven.name ? (
                        <div>
                          <p className="font-semibold text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">Grad: {student.graduationDate}</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500">
                          <EyeOff className="w-4 h-4" />
                          <span className="font-medium">Anonymous Student</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {student.consentGiven.email ? (
                        <span className="text-sm text-gray-700">{student.email}</span>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Lock className="w-3 h-3" />
                          <span className="text-xs">Hidden</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {student.consentGiven.major ? (
                        <span className="text-sm text-gray-700">{student.major}</span>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Lock className="w-3 h-3" />
                          <span className="text-xs">Hidden</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {student.consentGiven.gpa ? (
                        <span className="font-semibold text-gray-900">{student.gpa}</span>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Lock className="w-3 h-3" />
                          <span className="text-xs">Hidden</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {student.consentGiven.applicationActivity ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                          {student.stats.applications}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Lock className="w-3 h-3" />
                          <span className="text-xs">Hidden</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {student.consentGiven.jobOffers ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                          {student.stats.offers}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Lock className="w-3 h-3" />
                          <span className="text-xs">Hidden</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {student.consentGiven.hiringStatus ? (
                        student.stats.hired ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                            <CheckCircle className="w-3 h-3" />
                            Hired
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            Active
                          </span>
                        )
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Lock className="w-3 h-3" />
                          <span className="text-xs">Hidden</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {student.consentGiven.salaryInfo && student.stats.salary ? (
                        <span className="text-sm font-semibold text-green-700">{student.stats.salary}</span>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Lock className="w-3 h-3" />
                          <span className="text-xs">Hidden</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-green-600">
                        ${student.revenueGenerated.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold hover:bg-purple-200 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View Consent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-semibold text-gray-900 mb-2">Data Visibility Legend:</p>
            <div className="grid grid-cols-3 gap-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-600" />
                <span>Visible data = Student gave consent</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                <span>"Hidden" = Student privacy protected</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>Revenue = Always visible (0.5% commission)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Consent Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full border-4 border-purple-300">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Student Privacy Settings</h3>
                <p className="text-sm text-gray-600">{selectedStudent.consentGiven.name ? selectedStudent.name : 'Anonymous Student'}</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-900 font-semibold mb-2">
                🔒 This student has control over what you can see
              </p>
              <p className="text-xs text-purple-800">
                Below shows what data this student has consented to share with your institution. 
                They can change these settings at any time through their privacy dashboard.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {Object.entries(selectedStudent.consentGiven).map(([key, value]) => {
                const labels: Record<string, string> = {
                  name: 'Student Name',
                  email: 'Email Address',
                  phone: 'Phone Number',
                  major: 'Major/Field of Study',
                  gpa: 'GPA',
                  assessmentScores: 'Skills Assessment Scores',
                  applicationActivity: 'Job Application Activity',
                  jobOffers: 'Job Offers Received',
                  hiringStatus: 'Hiring Status & Employment',
                  salaryInfo: 'Salary Information',
                };

                return (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">{labels[key]}</span>
                    <div className="flex items-center gap-2">
                      {value ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs font-semibold text-green-700">Visible to School</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 text-red-600" />
                          <span className="text-xs font-semibold text-red-700">Hidden from School</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Revenue Sharing Not Affected</p>
                  <p className="text-xs">
                    Regardless of privacy settings, your institution ALWAYS earns the 0.5% commission 
                    from this student's transactions. Privacy settings only control data visibility, not revenue.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Community Impact Section */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-10 h-10" />
            <h2 className="text-3xl font-bold">Community Impact</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-5xl font-bold mb-2">{hiredStudents}</p>
              <p className="text-green-100">Students Placed in Jobs</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">${totalRevenue.toFixed(0)}</p>
              <p className="text-green-100">Supporting Career Services</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">{Math.round((hiredStudents/totalStudents)*100)}%</p>
              <p className="text-green-100">Student Placement Rate</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-green-100">
            Every hire through ZALPHA supports your institution's career services and creates economic 
            opportunities in the Pacific Islands community. Thank you for being part of this mission!
          </p>
        </div>
      </div>
    </div>
  );
}