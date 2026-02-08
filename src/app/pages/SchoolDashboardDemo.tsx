import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { Building2, Users, TrendingUp, Award, DollarSign, FileText, Calendar, Target, CheckCircle, BarChart3, GraduationCap, Briefcase, MessageSquare, Settings, Download, Eye, Star, MapPin, Clock, ArrowRight, Sparkles, BookOpen, UserCheck, Activity } from 'lucide-react';

interface SchoolDashboardDemoProps {
  onNavigate: (page: string) => void;
}

export function SchoolDashboardDemo({ onNavigate }: SchoolDashboardDemoProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'placements' | 'reports'>('overview');

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Back Button */}
        <BackButton onNavigate={onNavigate} label="Back to School Login" />

        {/* Demo Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold">
            <Eye className="w-4 h-4" />
            Interactive Demo
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
            School Dashboard Demo 🎓
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore what your school's dashboard will look like on ZALPHA - track student success, manage placements, and access powerful analytics!
          </p>
        </div>

        {/* Sample School Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-200 overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Building2 className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Pacific Islands University</h2>
                  <p className="text-white/90 text-lg mb-3">Guam | Est. 1972</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>2,847 Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>342 Placed This Year</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>Premium Partner</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold">94%</div>
                  <div className="text-xs text-white/80">Employment Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-2">
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5" />
                <span className="hidden sm:inline">Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                <span className="hidden sm:inline">Students</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('placements')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'placements'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Briefcase className="w-5 h-5" />
                <span className="hidden sm:inline">Placements</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'reports'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                <span className="hidden sm:inline">Reports</span>
              </div>
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-bold">
                    +12%
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">2,847</div>
                <div className="text-sm text-slate-600">Active Students on ZALPHA</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-bold">
                    +24%
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">342</div>
                <div className="text-sm text-slate-600">Jobs Secured This Year</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-xs font-bold">
                    94%
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">Within 6mo</div>
                <div className="text-sm text-slate-600">Employment Rate</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-bold">
                    +18%
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">$48.5K</div>
                <div className="text-sm text-slate-600">Avg Starting Salary</div>
              </div>
            </div>

            {/* Recent Activity & Top Employers */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Placements */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Recent Placements
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Maria Santos', role: 'Software Developer', company: 'Pacific Tech Solutions', salary: '$65K', date: '2 days ago' },
                    { name: 'James Nakamura', role: 'Marketing Coordinator', company: 'Island Tourism Board', salary: '$52K', date: '5 days ago' },
                    { name: 'Keanu Palomo', role: 'Business Analyst', company: 'Guam Power Authority', salary: '$58K', date: '1 week ago' },
                    { name: 'Leilani Cruz', role: 'Graphic Designer', company: 'Creative Pacific', salary: '$48K', date: '1 week ago' },
                  ].map((placement, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {placement.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900">{placement.name}</div>
                        <div className="text-sm text-slate-600">{placement.role} at {placement.company}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs font-semibold text-green-600">{placement.salary}</span>
                          <span className="text-xs text-slate-500">{placement.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Hiring Partners */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-purple-600" />
                  Top Hiring Partners
                </h3>
                <div className="space-y-3">
                  {[
                    { company: 'Pacific Tech Solutions', hires: 42, logo: '💻' },
                    { company: 'Guam Power Authority', hires: 28, logo: '⚡' },
                    { company: 'Island Tourism Board', hires: 24, logo: '🏝️' },
                    { company: 'Bank of Guam', hires: 19, logo: '🏦' },
                    { company: 'Creative Pacific Agency', hires: 16, logo: '🎨' },
                  ].map((partner, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-2xl">
                          {partner.logo}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{partner.company}</div>
                          <div className="text-sm text-slate-600">{partner.hires} students hired</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">#{idx + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-3xl shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <button className="p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-left">
                  <Calendar className="w-8 h-8 mb-2" />
                  <div className="font-bold mb-1">Schedule Virtual Fair</div>
                  <div className="text-sm text-white/80">Plan your next recruiting event</div>
                </button>
                <button className="p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-left">
                  <FileText className="w-8 h-8 mb-2" />
                  <div className="font-bold mb-1">Download Reports</div>
                  <div className="text-sm text-white/80">Export placement data</div>
                </button>
                <button className="p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-left">
                  <MessageSquare className="w-8 h-8 mb-2" />
                  <div className="font-bold mb-1">Message Students</div>
                  <div className="text-sm text-white/80">Send announcements</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Active Students</h3>
                <input
                  type="text"
                  placeholder="Search students..."
                  className="px-4 py-2 border-2 border-slate-300 rounded-xl"
                />
              </div>

              {/* Student List */}
              <div className="space-y-3">
                {[
                  { name: 'Maria Santos', major: 'Computer Science', year: 'Senior', gpa: '3.8', status: 'Actively Applying', applications: 12 },
                  { name: 'James Nakamura', major: 'Business Admin', year: 'Junior', gpa: '3.6', status: 'Interview Scheduled', applications: 8 },
                  { name: 'Keanu Palomo', major: 'Engineering', year: 'Senior', gpa: '3.9', status: 'Job Offer Received', applications: 15 },
                  { name: 'Leilani Cruz', major: 'Graphic Design', year: 'Senior', gpa: '3.7', status: 'Actively Applying', applications: 10 },
                  { name: 'Carlos Reyes', major: 'Marketing', year: 'Junior', gpa: '3.5', status: 'Profile Complete', applications: 5 },
                ].map((student, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-lg">{student.name}</div>
                          <div className="text-sm text-slate-600 mb-2">{student.major} • {student.year} • GPA: {student.gpa}</div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              student.status === 'Job Offer Received' 
                                ? 'bg-green-100 text-green-600'
                                : student.status === 'Interview Scheduled'
                                ? 'bg-purple-100 text-purple-600'
                                : 'bg-blue-100 text-blue-600'
                            }`}>
                              {student.status}
                            </span>
                            <span className="text-xs text-slate-600">{student.applications} applications</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-semibold">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Placements Tab */}
        {activeTab === 'placements' && (
          <div className="space-y-6">
            {/* Placement Stats */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">342</div>
                  <div className="text-sm text-slate-600 mb-4">Total Placements This Year</div>
                  <div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">85% of goal (400)</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$48.5K</div>
                  <div className="text-sm text-slate-600 mb-4">Average Starting Salary</div>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    +18% from last year
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">94%</div>
                  <div className="text-sm text-slate-600 mb-4">Employment Rate (6 months)</div>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-semibold">
                    <Star className="w-4 h-4" />
                    Above national avg (88%)
                  </div>
                </div>
              </div>
            </div>

            {/* By Industry */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Placements by Industry</h3>
              <div className="space-y-4">
                {[
                  { industry: 'Technology', count: 94, percent: 27, color: 'blue' },
                  { industry: 'Healthcare', count: 68, percent: 20, color: 'green' },
                  { industry: 'Government', count: 58, percent: 17, color: 'purple' },
                  { industry: 'Tourism & Hospitality', count: 51, percent: 15, color: 'orange' },
                  { industry: 'Education', count: 41, percent: 12, color: 'cyan' },
                  { industry: 'Other', count: 30, percent: 9, color: 'slate' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900">{item.industry}</span>
                      <span className="text-sm text-slate-600">{item.count} students ({item.percent}%)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${item.color}-500`}
                        style={{ width: `${item.percent * 3.7}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Available Reports</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Monthly Placement Report', desc: 'Detailed breakdown of student placements', icon: FileText, color: 'blue' },
                  { title: 'Salary Trends Analysis', desc: 'Average salaries by major and industry', icon: DollarSign, color: 'green' },
                  { title: 'Employer Engagement Report', desc: 'Top hiring partners and relationships', icon: Briefcase, color: 'purple' },
                  { title: 'Student Outcomes Dashboard', desc: 'Employment rates and career paths', icon: TrendingUp, color: 'orange' },
                  { title: 'Industry Placement Summary', desc: 'Where your students are working', icon: Target, color: 'cyan' },
                  { title: 'Annual Performance Review', desc: 'Year-over-year comparison', icon: BarChart3, color: 'pink' },
                ].map((report, idx) => {
                  const Icon = report.icon;
                  return (
                    <button
                      key={idx}
                      className={`p-6 bg-${report.color}-50 rounded-xl border-2 border-${report.color}-200 hover:border-${report.color}-400 transition-all text-left group`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 bg-${report.color}-100 rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${report.color}-600`} />
                        </div>
                        <Download className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                      </div>
                      <div className="font-bold text-slate-900 mb-1">{report.title}</div>
                      <div className="text-sm text-slate-600">{report.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl shadow-2xl p-8 text-white text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Join 100+ Pacific Island schools already using ZALPHA to track student success and build stronger employer relationships!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('school-login')}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-slate-100 transition-all font-bold text-lg inline-flex items-center justify-center gap-2"
            >
              Create School Account
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('school-partnership-guide')}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-bold text-lg inline-flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              View Partnership Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}