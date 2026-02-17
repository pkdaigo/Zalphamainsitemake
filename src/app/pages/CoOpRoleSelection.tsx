import { GraduationCap, Shield, Building2, ArrowRight, Users, Briefcase, Calendar } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface CoOpRoleSelectionProps {
  onNavigate: (page: string) => void;
}

export function CoOpRoleSelection({ onNavigate }: CoOpRoleSelectionProps) {
  const roles = [
    {
      id: 'student',
      title: 'High School Student Co-op Login',
      description: 'Access co-op job postings, track placements, and log hours',
      icon: GraduationCap,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      iconBg: 'bg-blue-500',
      features: [
        'Browse co-op job postings',
        'Track application status',
        'Log placement hours',
        'Message supervisors',
      ],
      page: 'coop-student-dashboard',
    },
    {
      id: 'admin',
      title: 'Co-op Admin Login',
      description: 'Manage students, employers, and program coordination',
      icon: Shield,
      gradient: 'from-purple-500 via-pink-500 to-orange-500',
      iconBg: 'bg-purple-500',
      features: [
        'Monitor student placements',
        'Approve employers & postings',
        'Match students to roles',
        'Export program reports',
      ],
      page: 'coop-admin-dashboard',
    },
    {
      id: 'employer',
      title: 'Co-op Employer Login',
      description: 'Post opportunities, review students, and manage placements',
      icon: Building2,
      gradient: 'from-green-500 via-emerald-500 to-cyan-500',
      iconBg: 'bg-green-500',
      features: [
        'Post co-op opportunities',
        'Review student applicants',
        'Track placement progress',
        'Submit evaluations',
      ],
      page: 'coop-employer-dashboard',
    },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Home" variant="dark" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            🎓 ZALPHA Co-Op Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect high school students with real-world work experiences
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Job Placements</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Hour Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              <span>Program Management</span>
            </div>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => onNavigate(role.page)}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-transparent hover:scale-105 text-left"
              >
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${role.gradient} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 ${role.iconBg} bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <ArrowRight className="w-6 h-6 text-white/80 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{role.title}</h2>
                  <p className="text-white/90 text-sm">{role.description}</p>
                </div>

                {/* Features List */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Key Features:
                  </h3>
                  <ul className="space-y-3">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Login Button */}
                  <div className={`mt-6 px-6 py-3 bg-gradient-to-r ${role.gradient} text-white rounded-xl font-bold text-center group-hover:shadow-lg transition-all`}>
                    Login as {role.id === 'student' ? 'Student' : role.id === 'admin' ? 'Admin' : 'Employer'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Banner */}
        <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">About ZALPHA Co-Op Program</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Our co-op program connects high school students across Pacific Islands with meaningful work experiences. 
                Students gain real-world skills, employers access motivated talent, and program administrators 
                coordinate placements efficiently—all in one platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
