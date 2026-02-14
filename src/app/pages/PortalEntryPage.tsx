import { 
  GraduationCap, 
  School, 
  Building2, 
  Briefcase, 
  Shield, 
  Users, 
  Grid3x3, 
  HelpCircle, 
  Mail,
  FileText,
  ExternalLink
} from 'lucide-react';

interface PortalEntryPageProps {
  onNavigate: (page: string) => void;
}

interface PortalCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  iconBgColor: string;
  primaryButton?: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
  demoButton?: {
    text: string;
    onClick: () => void;
  };
  noteText?: string;
}

function PortalCard({
  title,
  subtitle,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
  primaryButton,
  secondaryButton,
  demoButton,
  noteText
}: PortalCardProps) {
  return (
    <div className="group relative bg-[#020617] rounded-2xl p-6 border border-slate-700/50 hover:border-[#38bdf8]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1">
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-14 h-14 ${iconBgColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-[#f1f5f9] mb-2">{title}</h3>
      <p className="text-sm font-medium text-[#38bdf8] mb-3">{subtitle}</p>
      <p className="text-sm text-[#94a3b8] leading-relaxed mb-5">{description}</p>

      {/* Note Text */}
      {noteText && (
        <p className="text-xs text-[#64748b] italic mb-4 bg-slate-800/50 p-2 rounded-lg border border-slate-700/30">
          {noteText}
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        {primaryButton && (
          <button
            onClick={primaryButton.onClick}
            className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-slate-900 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95"
          >
            {primaryButton.text}
          </button>
        )}
        
        {secondaryButton && (
          <button
            onClick={secondaryButton.onClick}
            className="w-full bg-[#1e293b] hover:bg-[#334155] text-[#f1f5f9] font-semibold py-2.5 px-4 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all duration-200 active:scale-95"
          >
            {secondaryButton.text}
          </button>
        )}

        {demoButton && (
          <button
            onClick={demoButton.onClick}
            className="w-full text-[#38bdf8] hover:text-[#0ea5e9] font-medium py-2 px-4 text-sm flex items-center justify-center gap-2 hover:underline transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            {demoButton.text}
          </button>
        )}
      </div>
    </div>
  );
}

export function PortalEntryPage({ onNavigate }: PortalEntryPageProps) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9]">
      {/* Header Navigation */}
      <nav className="bg-[#020617] border-b border-slate-800/50 sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] rounded-xl flex items-center justify-center font-black text-white text-xl">
                Z
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#f1f5f9]">ZALPHA Recruit</h1>
              </div>
            </div>

            {/* Top Right Links */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => onNavigate('support')}
                className="text-[#cbd5e1] hover:text-[#38bdf8] text-sm font-medium transition-colors"
              >
                Support
              </button>
              <button 
                onClick={() => onNavigate('status')}
                className="text-[#cbd5e1] hover:text-[#38bdf8] text-sm font-medium transition-colors"
              >
                Status
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="text-[#cbd5e1] hover:text-[#38bdf8] text-sm font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        {/* Background Abstract Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f1f5f9] mb-4">
            Choose Your ZALPHA Portal
          </h1>
          <p className="text-lg sm:text-xl text-[#cbd5e1] max-w-3xl mx-auto">
            One platform, tailored experiences for students, schools, and employers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* GROUP 1: For Students */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-[#38bdf8]" />
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#f1f5f9]">For Students</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Youth Co-op Student */}
            <PortalCard
              title="Youth Co-op Student"
              subtitle="High school and youth work-based learning"
              description="Access school-approved co-op opportunities, track hours, and complete your first work experience."
              icon={GraduationCap}
              iconColor="text-cyan-400"
              iconBgColor="bg-cyan-500/10"
              primaryButton={{
                text: "Youth Co-op Sign Up",
                onClick: () => onNavigate('co-op-student-signup')
              }}
              secondaryButton={{
                text: "Youth Co-op Login",
                onClick: () => onNavigate('co-op-student-dashboard')
              }}
              demoButton={{
                text: "View Student Demo",
                onClick: () => onNavigate('co-op-student-demo')
              }}
            />

            {/* College Student */}
            <PortalCard
              title="College Student"
              subtitle="Internships, co-op, and early career roles"
              description="Log in to manage applications, interviews, and offers connected to your college."
              icon={GraduationCap}
              iconColor="text-blue-400"
              iconBgColor="bg-blue-500/10"
              primaryButton={{
                text: "College Student Login",
                onClick: () => onNavigate('student-dashboard')
              }}
              demoButton={{
                text: "View Student Demo",
                onClick: () => onNavigate('student-demo')
              }}
              noteText="Access may be provided by your college or university."
            />
          </div>
        </section>

        {/* GROUP 2: For Schools */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <School className="w-6 h-6 text-[#38bdf8]" />
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#f1f5f9]">For Schools</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Co-op School Portal */}
            <PortalCard
              title="Co-op School Portal"
              subtitle="High school / youth co-op coordinators and teachers"
              description="Approve placements, monitor hours, and manage student work-based learning."
              icon={School}
              iconColor="text-emerald-400"
              iconBgColor="bg-emerald-500/10"
              primaryButton={{
                text: "School Login",
                onClick: () => onNavigate('co-op-coordinator-dashboard')
              }}
              demoButton={{
                text: "View Co-op School Demo",
                onClick: () => onNavigate('co-op-school-demo')
              }}
            />

            {/* College Admin Portal */}
            <PortalCard
              title="College Admin Portal"
              subtitle="Career services, internship and co-op offices"
              description="Oversee college programs, manage employer partners, and report on outcomes."
              icon={Shield}
              iconColor="text-purple-400"
              iconBgColor="bg-purple-500/10"
              primaryButton={{
                text: "College Admin Login",
                onClick: () => onNavigate('school-dashboard')
              }}
              demoButton={{
                text: "View Admin Demo",
                onClick: () => onNavigate('college-admin-demo')
              }}
            />
          </div>
        </section>

        {/* GROUP 3: For Employers */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-[#38bdf8]" />
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#f1f5f9]">For Employers</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Co-op Employer Portal */}
            <PortalCard
              title="Co-op Employer Portal"
              subtitle="Hire youth co-op students"
              description="Post co-op roles for younger students, manage applications, and log evaluations with school partners."
              icon={Briefcase}
              iconColor="text-orange-400"
              iconBgColor="bg-orange-500/10"
              primaryButton={{
                text: "Employer Login",
                onClick: () => onNavigate('co-op-employer-dashboard')
              }}
              demoButton={{
                text: "View Co-op Employer Demo",
                onClick: () => onNavigate('co-op-employer-demo')
              }}
            />

            {/* College Employer Portal */}
            <PortalCard
              title="College Employer Portal"
              subtitle="Hire college students and fresh grads"
              description="Post internships and graduate roles, manage shortlists, and coordinate with college career centers."
              icon={Building2}
              iconColor="text-indigo-400"
              iconBgColor="bg-indigo-500/10"
              primaryButton={{
                text: "Employer Login",
                onClick: () => onNavigate('employer-dashboard')
              }}
              demoButton={{
                text: "View College Employer Demo",
                onClick: () => onNavigate('college-employer-demo')
              }}
            />

            {/* Contract Marketplace Employer */}
            <PortalCard
              title="Contract Marketplace"
              subtitle="On-demand talent and project-based work"
              description="Access the contract marketplace to find students, alumni, and professionals for project-based roles."
              icon={Grid3x3}
              iconColor="text-pink-400"
              iconBgColor="bg-pink-500/10"
              primaryButton={{
                text: "Marketplace Employer Login",
                onClick: () => onNavigate('contract-marketplace')
              }}
              demoButton={{
                text: "View Marketplace Demo",
                onClick: () => onNavigate('marketplace-demo')
              }}
            />
          </div>
        </section>

        {/* Help & Support Section */}
        <section className="mt-20 bg-[#020617] rounded-2xl border border-slate-700/50 p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <HelpCircle className="w-8 h-8 text-[#38bdf8] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-[#f1f5f9] mb-2">
                  Not sure which portal to use?
                </h3>
                <p className="text-sm text-[#94a3b8] mb-4">
                  ZALPHA Recruit is a multi-portal platform for youth co-op, college programs, and employer partnerships.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => onNavigate('portal-guide')}
                    className="inline-flex items-center gap-2 text-[#38bdf8] hover:text-[#0ea5e9] font-medium text-sm transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Portal Guide
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 text-[#38bdf8] hover:text-[#0ea5e9] font-medium text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-[#38bdf8]">7</div>
                <div className="text-xs text-[#94a3b8]">Portals</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#38bdf8]">3</div>
                <div className="text-xs text-[#94a3b8]">Audiences</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#38bdf8]">1</div>
                <div className="text-xs text-[#94a3b8]">Platform</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#020617] border-t border-slate-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] rounded-lg flex items-center justify-center font-black text-white text-sm">
                Z
              </div>
              <p className="text-sm text-[#94a3b8]">
                © 2026 ZALPHA Recruit. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-[#94a3b8]">
              <button 
                onClick={() => onNavigate('privacy-policy')}
                className="hover:text-[#38bdf8] transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => onNavigate('terms-of-service')}
                className="hover:text-[#38bdf8] transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => onNavigate('legal-disclaimers')}
                className="hover:text-[#38bdf8] transition-colors"
              >
                Legal
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
