import { HelpCircle, Briefcase, GraduationCap, School } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { EmployerFAQs } from '@/app/components/EmployerFAQs';
import { StudentFAQs } from '@/app/components/StudentFAQs';
import { EducationalInstitutionFAQs } from '@/app/components/EducationalInstitutionFAQs';
import { useState } from 'react';

interface FAQProps {
  onNavigate: (page: string) => void;
}

export function FAQ({ onNavigate }: FAQProps) {
  const [activeTab, setActiveTab] = useState<'employers' | 'students' | 'institutions'>('employers');

  return (
    <div className="min-h-screen pt-20 sm:pt-24 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden pb-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-12 max-w-6xl">
        <BackButton onNavigate={onNavigate} />

        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <HelpCircle className="w-12 h-12 text-white" />
            </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight px-4">
            Frequently Asked Questions
          </h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Get answers to common questions about ZALPHA, tailored to your role in our platform.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border-2 border-white/30">
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setActiveTab('employers')}
                className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                  activeTab === 'employers'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-105'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Briefcase className="w-6 h-6" />
                <span>Employers</span>
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                  activeTab === 'students'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <GraduationCap className="w-6 h-6" />
                <span>Students</span>
              </button>

              <button
                onClick={() => setActiveTab('institutions')}
                className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                  activeTab === 'institutions'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <School className="w-6 h-6" />
                <span className="hidden md:inline">Educational Institutions</span>
                <span className="md:hidden">Schools</span>
              </button>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="min-h-[600px]">
            {activeTab === 'employers' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border-2 border-blue-400/30">
                  <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
                    <Briefcase className="w-10 h-10" />
                    For Employers
                  </h2>
                  <p className="text-white/90 text-xl">
                    Common questions about pricing, candidate screening, hiring timelines, and getting started with ZALPHA for your business.
                  </p>
                </div>
                <EmployerFAQs />
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-8 border-2 border-green-400/30">
                  <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
                    <GraduationCap className="w-10 h-10" />
                    For Students
                  </h2>
                  <p className="text-white/90 text-xl">
                    Everything you need to know about using ZALPHA, protecting your privacy, taking assessments, and finding your first job.
                  </p>
                </div>
                <StudentFAQs onNavigate={onNavigate} />
              </div>
            )}

            {activeTab === 'institutions' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border-2 border-purple-400/30">
                  <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
                    <School className="w-10 h-10" />
                    For Educational Institutions
                  </h2>
                  <p className="text-white/90 text-xl">
                    How ZALPHA partners with schools, colleges, and training programs to improve student outcomes and track employment data.
                  </p>
                </div>
                <EducationalInstitutionFAQs />
              </div>
            )}
          </div>

          {/* Additional Resources */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/30 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h3>
            <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
              Can't find the answer you're looking for? Check our Social Responsibility page for community concerns, 
              or reach out directly to the ZALPHA team.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => onNavigate('social-responsibility')}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-red-600 hover:to-pink-700 transition-all shadow-lg"
              >
                View Social Responsibility
              </button>
              <button className="px-8 py-4 bg-white text-purple-700 rounded-xl font-bold text-lg hover:bg-white/90 transition-colors shadow-lg">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}