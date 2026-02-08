import { Scale, Shield, AlertTriangle, FileText } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface LegalDisclaimersProps {
  onNavigate: (page: string) => void;
}

export function LegalDisclaimers({ onNavigate }: LegalDisclaimersProps) {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Legal Disclaimers</h1>
                <p className="text-xs text-amber-300">Important legal information and notices</p>
              </div>
            </div>
            <BackButton onNavigate={onNavigate} />
          </div>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">Legal Disclaimers</h2>
            <p className="text-xl text-white/80">
              Last Updated: February 1, 2026
            </p>
          </div>

          <div className="space-y-8">
            {/* General Disclaimer */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-amber-400/30">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
                <h3 className="text-2xl font-bold text-white">General Disclaimer</h3>
              </div>
              <div className="text-white/80 space-y-3">
                <p>
                  The information provided on the ZALPHA platform is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the platform or the information, products, services, or related graphics contained on the platform for any purpose.
                </p>
                <p>
                  Any reliance you place on such information is strictly at your own risk. In no event will ZALPHA be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this platform.
                </p>
              </div>
            </div>

            {/* Employment Disclaimer */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-blue-400/30">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Employment & Job Placement Disclaimer</h3>
              </div>
              <div className="text-white/80 space-y-3">
                <p className="font-semibold text-white">
                  ZALPHA DOES NOT GUARANTEE EMPLOYMENT OR JOB PLACEMENT
                </p>
                <p>
                  ZALPHA is a platform that connects students with potential employers and educational opportunities. We do not guarantee, warrant, or promise that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Any student will receive job offers or be hired by employers using the platform</li>
                  <li>Any employer will find suitable candidates through the platform</li>
                  <li>Educational institutions will successfully recruit students</li>
                  <li>Skills assessments or training programs will result in employment</li>
                  <li>Completion of any program or certification will guarantee job placement</li>
                </ul>
                <p>
                  All hiring decisions are made solely by employers based on their own criteria and business needs. ZALPHA is not responsible for employers' hiring practices, decisions, or employment outcomes.
                </p>
              </div>
            </div>

            {/* Age & Eligibility */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-400/30">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Age & Eligibility Requirements</h3>
              </div>
              <div className="text-white/80 space-y-3">
                <p className="font-semibold text-white">
                  18+ AGE REQUIREMENT
                </p>
                <p>
                  ZALPHA requires all users to be at least 18 years of age. By using this platform, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into binding agreements.
                </p>
                <p>
                  Students under 18 may not create accounts, use the platform, or participate in any ZALPHA services. Parental consent does not override this age requirement.
                </p>
              </div>
            </div>

            {/* FERPA Compliance */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-green-400/30">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold text-white">FERPA Compliance & Student Records</h3>
              </div>
              <div className="text-white/80 space-y-3">
                <p>
                  ZALPHA complies with the Family Educational Rights and Privacy Act (FERPA) regarding the handling of student education records. We:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Do not disclose student education records without proper consent</li>
                  <li>Maintain appropriate security measures for student data</li>
                  <li>Allow students to control what information is shared with employers and institutions</li>
                  <li>Protect transcript data and academic records in accordance with FERPA guidelines</li>
                </ul>
                <p>
                  Students have full control over their privacy settings and can determine what information employers and educational institutions can access.
                </p>
              </div>
            </div>

            {/* Revenue Model & Platform Interaction */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-cyan-400/30">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Platform Interaction Requirements</h3>
              </div>
              <div className="text-white/80 space-y-3">
                <p className="font-semibold text-white">
                  ALL INTERACTIONS MUST STAY ON-PLATFORM
                </p>
                <p>
                  To protect our revenue model and ensure quality service, all job offers, employment communications, applications, and employer-student interactions must occur through the ZALPHA platform. Users agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Circumvent the platform by conducting business outside of ZALPHA</li>
                  <li>Share contact information to move conversations off-platform</li>
                  <li>Negotiate employment terms outside the ZALPHA system</li>
                  <li>Use ZALPHA solely to collect leads for external recruitment</li>
                </ul>
                <p>
                  Violation of these terms may result in account suspension or termination.
                </p>
              </div>
            </div>

            {/* Assessment & Training Disclaimer */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-pink-400/30">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-pink-400" />
                <h3 className="text-2xl font-bold text-white">Skills Assessments & Training Programs</h3>
              </div>
              <div className="text-white/80 space-y-3">
                <p>
                  Skills assessments and training programs offered through ZALPHA are designed to help students demonstrate competency and develop professional skills. However:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Assessment scores do not guarantee employment or specific job placement</li>
                  <li>Training completion does not certify professional licensure unless explicitly stated</li>
                  <li>Employers make their own hiring decisions independent of assessment results</li>
                  <li>ZALPHA is not responsible for the accuracy of third-party training content</li>
                </ul>
              </div>
            </div>

            {/* Subscription Pricing */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-orange-400/30">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
                <h3 className="text-2xl font-bold text-white">Subscription Pricing</h3>
              </div>
              <div className="text-white/80 space-y-3">
                <p>
                  ZALPHA operates on a subscription-based model for employers. Employers agree to subscription fees by using the platform for recruitment. Additional details:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Contract job postings are FREE for employers</li>
                  <li>Subscription fees apply for premium platform features</li>
                  <li>All fees are outlined in the employer subscription agreement</li>
                  <li>Subscription fees are non-refundable except as required by law</li>
                </ul>
              </div>
            </div>

            {/* Third-Party Links */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-red-400/30">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <h3 className="text-2xl font-bold text-white">Third-Party Links & Services</h3>
              </div>
              <div className="text-white/80 space-y-3">
                <p>
                  Through the ZALPHA platform, you may access links to websites, services, or resources provided by third parties. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
                </p>
                <p>
                  You acknowledge and agree that ZALPHA shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of any such third-party content, goods, or services.
                </p>
              </div>
            </div>

            {/* Changes to Disclaimers */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-indigo-400/30">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-indigo-400" />
                <h3 className="text-2xl font-bold text-white">Changes to Disclaimers</h3>
              </div>
              <div className="text-white/80 space-y-3">
                <p>
                  ZALPHA reserves the right to modify these disclaimers at any time. We will notify users of material changes by updating the "Last Updated" date at the top of this page. Your continued use of the platform after any changes indicates your acceptance of the new disclaimers.
                </p>
              </div>
            </div>

            {/* Contact for Legal Questions */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 text-center border-4 border-white/30">
              <h3 className="text-3xl font-bold text-white mb-4">Questions About These Disclaimers?</h3>
              <p className="text-xl text-white/90 mb-6">
                Contact our legal team for clarification
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white text-orange-700 px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-2xl"
              >
                Contact Legal Team
              </button>
            </div>

            {/* Related Documents */}
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => onNavigate('privacy-policy')}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all text-left group"
              >
                <Shield className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="text-xl font-bold text-white mb-2">Privacy Policy</h4>
                <p className="text-white/70 text-sm">Learn how we protect and use your data</p>
              </button>

              <button
                onClick={() => onNavigate('terms-of-service')}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all text-left group"
              >
                <FileText className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="text-xl font-bold text-white mb-2">Terms of Service</h4>
                <p className="text-white/70 text-sm">Review our user agreements and guidelines</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}