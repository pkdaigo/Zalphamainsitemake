import { School, GraduationCap, Briefcase, CheckCircle, FileText, MapPin, Shield } from 'lucide-react';
import { useState } from 'react';

interface CoOpSignInSectionProps {
  onNavigate: (page: string) => void;
}

export function CoOpSignInSection({ onNavigate }: CoOpSignInSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const signInCards = [
    {
      id: 'schools',
      title: 'Schools & Co-Op Coordinators',
      icon: School,
      accentColor: 'green',
      description: 'Manage student placements, track progress, earn 10% commission on hires. PSS CNMI, Guam DOE, FSM, Palau PCC, Marshall PSS approved.',
      features: [
        'Student portfolio & matching dashboard',
        'Compliance reporting (DOL, PSS requirements)',
        'Job fair integration & employer connections',
        '10% revenue share when students hired'
      ],
      buttonText: 'School Sign In',
      buttonLink: 'co-op-coordinator-dashboard',
      gradient: 'from-green-500 to-emerald-600',
      hoverGradient: 'hover:from-green-600 hover:to-emerald-700',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-500',
      badgeColors: ['bg-green-100 text-green-800', 'bg-emerald-100 text-emerald-800']
    },
    {
      id: 'students',
      title: 'High School Students',
      icon: GraduationCap,
      accentColor: 'blue',
      description: 'Find paid/unpaid co-op placements, build resume, explore careers. Juniors/seniors only (14-21yo).',
      features: [
        'Browse verified employer jobs by location/skill',
        'Apply with 1-click from school profile',
        'Track hours, evaluations, certificates',
        '100% FREE – no subscription needed'
      ],
      buttonText: 'Student Sign In',
      buttonLink: 'co-op-student-dashboard',
      gradient: 'from-blue-500 to-cyan-600',
      hoverGradient: 'hover:from-blue-600 hover:to-cyan-700',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-500',
      badgeColors: ['bg-blue-100 text-blue-800', 'bg-cyan-100 text-cyan-800']
    },
    {
      id: 'employers',
      title: 'Employers & Businesses',
      icon: Briefcase,
      accentColor: 'purple',
      description: 'Host CNMI PSS Co-op students, Guam youth interns, FSM/Palau/Marshall practicum trainees. Government/private partners welcome.',
      features: [
        'Post part-time co-op positions (up to 480 hours)',
        'Pre-screened talent from high schools',
        'Simple timesheets & evaluations',
        'Beta access: FREE basic posting'
      ],
      buttonText: 'Employer Sign In',
      buttonLink: 'co-op-employer-dashboard',
      gradient: 'from-purple-500 to-violet-600',
      hoverGradient: 'hover:from-purple-600 hover:to-violet-700',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-500',
      badgeColors: ['bg-purple-100 text-purple-800', 'bg-violet-100 text-violet-800']
    }
  ];

  const jurisdictions = [
    { name: 'CNMI PSS', program: 'Co-op & Training', icon: '🏝️' },
    { name: 'Guam DOL', program: 'Youth Work Experience', icon: '🌺' },
    { name: 'FSM', program: 'Consortium Work Programs', icon: '🌴' },
    { name: 'Palau PCC', program: 'On-the-Job Training', icon: '🐚' },
    { name: 'Marshall Islands PSS', program: '6-Week Practicum', icon: '🌊' }
  ];

  return (
    <section className="w-full bg-gradient-to-br from-[#00A3E0] via-[#0077B6] to-[#005A8D] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Pacific High School Co-Op Hub
          </h1>
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <p className="text-white font-semibold text-sm sm:text-base">
              Official Platform for CNMI PSS • Guam DOL • FSM • Palau PCC • Marshall Islands PSS
            </p>
          </div>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Integrates classroom learning with supervised on-the-job training. Sign in for students, schools/coordinators, employers.
          </p>
        </div>

        {/* Jurisdiction Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {jurisdictions.map((jurisdiction, idx) => (
            <div 
              key={idx}
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl px-4 py-2 text-white hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{jurisdiction.icon}</span>
                <div className="text-left">
                  <p className="font-bold text-sm">{jurisdiction.name}</p>
                  <p className="text-xs text-white/80">{jurisdiction.program}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sign-In Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {signInCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  bg-white rounded-2xl shadow-2xl overflow-hidden border-2 ${card.borderColor}
                  transition-all duration-300 transform
                  ${hoveredCard === card.id ? 'scale-105 shadow-3xl' : 'scale-100'}
                `}
              >
                {/* Card Header with Icon */}
                <div className={`bg-gradient-to-r ${card.gradient} p-6 text-center`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${card.iconBg} rounded-2xl shadow-lg mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {card.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          card.accentColor === 'green' ? 'text-green-600' :
                          card.accentColor === 'blue' ? 'text-blue-600' :
                          'text-purple-600'
                        }`} />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sign In Button */}
                  <button
                    onClick={() => onNavigate(card.buttonLink)}
                    className={`
                      w-full py-3 px-6 rounded-xl font-bold text-white
                      bg-gradient-to-r ${card.gradient} ${card.hoverGradient}
                      transition-all duration-300 shadow-lg hover:shadow-xl
                      transform hover:scale-105 active:scale-95
                      focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                        card.accentColor === 'green' ? 'focus:ring-green-400' :
                        card.accentColor === 'blue' ? 'focus:ring-blue-400' :
                        'focus:ring-purple-400'
                      }
                    `}
                    aria-label={`${card.buttonText} to access the co-op hub`}
                  >
                    {card.buttonText}
                  </button>

                  {/* Beta Badge */}
                  {card.id === 'employers' && (
                    <div className="mt-4 text-center">
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                        🎉 BETA: Free During Testing
                      </span>
                    </div>
                  )}

                  {/* Special Badges */}
                  {card.id === 'schools' && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        10% Commission
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                        DOL Compliant
                      </span>
                    </div>
                  )}

                  {card.id === 'students' && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        Ages 14-21
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full">
                        100% FREE
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Program Highlights */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-white/30 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Proven Programs We Support
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🏫</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">CNMI PSS Co-Op</h4>
                  <p className="text-white/80 text-xs">On-campus co-op + off-campus training. Annual job fairs at Saipan World Resort.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💼</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Guam DOL Youth Program</h4>
                  <p className="text-white/80 text-xs">Work experience for high school juniors/seniors. Work readiness workshops included.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⏱️</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Marshall Islands Practicum</h4>
                  <p className="text-white/80 text-xs">6-week hands-on placements across government agencies and private sector.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎓</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Palau PCC Training</h4>
                  <p className="text-white/80 text-xs">Occupational skills & on-the-job training. Certified by Palau Community College.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🤝</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">FSM Consortium</h4>
                  <p className="text-white/80 text-xs">Higher ed consortium style work programs. Multi-institution collaboration.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Up to 480 Hours</h4>
                  <p className="text-white/80 text-xs">Part-time schedules that don't interfere with education. Flexible arrangements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance & Security Footer */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">
                  Powered by ZALPHA
                </h4>
                <p className="text-slate-600 text-sm">
                  Compliant with CNMI PSS Co-op, Guam DOL Youth Program, Marshall Islands Practicum
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={() => onNavigate('legal-disclaimers')}
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline transition-colors"
              >
                <FileText className="w-4 h-4 inline mr-1" />
                Compliance Docs
              </button>
              <button
                onClick={() => onNavigate('privacy-policy')}
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline transition-colors"
              >
                <Shield className="w-4 h-4 inline mr-1" />
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Beta Access Notice */}
          <div className="mt-6 pt-6 border-t-2 border-slate-200">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-400 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-2xl">ℹ️</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">
                    Open Beta Access
                  </p>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    This Co-Op Hub is now accessible to all users. Schools, students, and employers can sign in directly to explore our pilot programs and collaborative learning opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Coverage */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              <MapPin className="w-3 h-3" />
              CNMI: Saipan, Tinian, Rota
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              <MapPin className="w-3 h-3" />
              Guam
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              <MapPin className="w-3 h-3" />
              FSM: Yap, Chuuk, Pohnpei, Kosrae
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              <MapPin className="w-3 h-3" />
              Palau
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              <MapPin className="w-3 h-3" />
              Marshall Islands
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <div className="text-3xl font-black text-white mb-1">5</div>
            <div className="text-white/80 text-xs font-semibold">Jurisdictions</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <div className="text-3xl font-black text-white mb-1">480</div>
            <div className="text-white/80 text-xs font-semibold">Max Hours/Program</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <div className="text-3xl font-black text-white mb-1">10%</div>
            <div className="text-white/80 text-xs font-semibold">School Commission</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <div className="text-3xl font-black text-white mb-1">FREE</div>
            <div className="text-white/80 text-xs font-semibold">For Students</div>
          </div>
        </div>
      </div>
    </section>
  );
}