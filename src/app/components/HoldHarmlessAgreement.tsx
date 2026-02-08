import { useState } from 'react';
import { Shield, AlertTriangle, FileText, CheckCircle, Scale, Info } from 'lucide-react';

interface HoldHarmlessAgreementProps {
  userType: 'student' | 'employer';
  onAccept: () => void;
  onDecline?: () => void;
  compact?: boolean;
}

export function HoldHarmlessAgreement({ userType, onAccept, onDecline, compact = false }: HoldHarmlessAgreementProps) {
  const [agreed, setAgreed] = useState(false);
  const [acknowledgements, setAcknowledgements] = useState({
    read: false,
    understand: false,
    release: false,
    indemnify: false,
  });

  const handleCheckbox = (field: keyof typeof acknowledgements) => {
    setAcknowledgements({ ...acknowledgements, [field]: !acknowledgements[field] });
  };

  const allAcknowledged = Object.values(acknowledgements).every(val => val === true);

  if (compact) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-amber-900 mb-2">Liability Release & Hold Harmless</h3>
            <p className="text-sm text-amber-800 mb-3">
              You agree to release and hold harmless KI Executive Group and its subsidiaries from any claims, 
              damages, or liabilities arising from your use of ZALPHA.
            </p>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) onAccept();
                }}
                className="w-4 h-4 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-amber-900">
                I agree to the Hold Harmless and Indemnification Agreement
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-amber-200">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Hold Harmless & Indemnification Agreement</h2>
            <p className="text-gray-600 text-sm">Limitation of Liability and Legal Protection</p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900 mb-2">IMPORTANT LEGAL NOTICE - READ CAREFULLY</h3>
              <p className="text-sm text-red-800 leading-relaxed">
                This agreement contains important legal terms that affect your rights. By accepting this agreement, 
                you are releasing KI Executive Group and its subsidiaries from certain liabilities and agreeing to 
                indemnify the company for certain claims. <strong>Please read this entire document carefully before 
                accepting.</strong> If you do not agree to these terms, you cannot use the ZALPHA platform.
              </p>
            </div>
          </div>
        </div>

        {/* Agreement Introduction */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            Agreement Overview
          </h3>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              This Hold Harmless and Indemnification Agreement ("Agreement") is entered into between you 
              (the "{userType === 'student' ? 'Student' : 'Employer'}") and <strong>KI Executive Group</strong>, 
              including all of its subsidiaries, affiliates, parent companies, officers, directors, employees, 
              agents, contractors, and assigns (collectively, the "Company").
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              By using the ZALPHA platform, you acknowledge and agree to the following terms:
            </p>
          </div>
        </div>

        {/* Section 1: Release of Liability */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3">1. RELEASE OF LIABILITY</h3>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 space-y-4">
            <p className="text-sm text-gray-900 font-semibold">
              You hereby release, discharge, and hold harmless the Company from any and all claims, demands, 
              damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising 
              from or relating to:
            </p>
            <div className="space-y-3 ml-4">
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-700">
                  <strong>Platform Use:</strong> Your access to and use of the ZALPHA platform, including any content, 
                  features, or services provided through the platform
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-700">
                  <strong>{userType === 'student' ? 'Employment Relationships' : 'Hiring Decisions'}:</strong> Any 
                  employment, internship, or contractor relationship {userType === 'student' ? 'you enter into' : 'you create'} 
                  {' '}through or as a result of using the ZALPHA platform
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-700">
                  <strong>Third-Party Actions:</strong> Actions, omissions, representations, or conduct of other users, 
                  {userType === 'student' ? ' employers,' : ' students,'} or third parties on the platform
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-700">
                  <strong>Job Postings & Applications:</strong> The accuracy, completeness, or quality of job postings, 
                  student profiles, resumes, or application materials
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-700">
                  <strong>Communications:</strong> Any communications, negotiations, or agreements between {userType === 'student' ? 'you and employers' : 'you and students/candidates'}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-700">
                  <strong>Verification Process:</strong> The ID verification process, verification status, or any 
                  decisions made regarding account verification or approval
                </p>
              </div>
              {userType === 'employer' && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold text-lg">•</span>
                    <p className="text-sm text-gray-700">
                      <strong>Hiring Outcomes:</strong> The performance, conduct, qualifications, or suitability 
                      of any candidate you hire through the platform
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold text-lg">•</span>
                    <p className="text-sm text-gray-700">
                      <strong>Background Checks:</strong> Your independent obligation to conduct background checks, 
                      verify credentials, or perform due diligence on candidates
                    </p>
                  </div>
                </>
              )}
              {userType === 'student' && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold text-lg">•</span>
                    <p className="text-sm text-gray-700">
                      <strong>Employment Terms:</strong> Wages, benefits, working conditions, or other terms of 
                      employment offered by employers
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold text-lg">•</span>
                    <p className="text-sm text-gray-700">
                      <strong>Workplace Issues:</strong> Workplace disputes, discrimination claims, harassment, 
                      termination, or other employment-related matters
                    </p>
                  </div>
                </>
              )}
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-700">
                  <strong>Data & Privacy:</strong> Data security, privacy breaches, unauthorized access, or loss 
                  of data, except where caused by the Company's gross negligence or willful misconduct
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-700">
                  <strong>Platform Availability:</strong> Platform downtime, technical errors, bugs, or interruptions 
                  in service
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-700">
                  <strong>Third-Party Integrations:</strong> Integration with third-party services such as ZALPHA ATS, 
                  Company Websites, or other external platforms
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Indemnification */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3">2. INDEMNIFICATION</h3>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
            <p className="text-sm text-gray-900 font-semibold mb-4">
              You agree to indemnify, defend, and hold harmless the Company from and against any and all claims, 
              demands, actions, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' 
              fees and court costs) arising from or relating to:
            </p>
            <div className="space-y-3 ml-4">
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-800">
                  Your violation of this Agreement or the ZALPHA Terms of Service
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-800">
                  Your violation of any applicable laws, regulations, or third-party rights
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-800">
                  Your use or misuse of the ZALPHA platform
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-800">
                  Content you post, upload, or transmit through the platform
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-800">
                  {userType === 'employer' 
                    ? 'Your hiring decisions, employment practices, or treatment of employees/candidates'
                    : 'Your interactions with employers or conduct during the hiring process'
                  }
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold text-lg">•</span>
                <p className="text-sm text-gray-800">
                  Any breach of your representations, warranties, or obligations under this Agreement
                </p>
              </div>
              {userType === 'employer' && (
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-lg">•</span>
                  <p className="text-sm text-gray-800">
                    Any claims by candidates or employees arising from employment relationships established 
                    through the platform
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Disclaimer of Warranties */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3">3. DISCLAIMER OF WARRANTIES</h3>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              THE ZALPHA PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED. THE COMPANY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="space-y-2 ml-4 text-sm text-gray-700">
              <li>• Implied warranties of merchantability and fitness for a particular purpose</li>
              <li>• Warranties regarding the accuracy, reliability, or completeness of platform content</li>
              <li>• Warranties that the platform will be uninterrupted, secure, or error-free</li>
              <li>• Warranties regarding {userType === 'student' ? 'employer legitimacy or job opportunities' : 'candidate qualifications or suitability'}</li>
              <li>• Warranties that platform features will meet your requirements or expectations</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Limitation of Liability */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3">4. LIMITATION OF LIABILITY</h3>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <p className="text-sm text-red-900 font-bold mb-3">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <div className="space-y-3 text-sm text-red-800">
              <p>
                <strong>A.</strong> The Company shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including but not limited to loss of profits, revenue, data, 
                or business opportunities, arising from your use of the platform.
              </p>
              <p>
                <strong>B.</strong> The Company's total aggregate liability for all claims arising from or 
                relating to the platform shall not exceed the amount you have paid to the Company in the 
                twelve (12) months preceding the claim, or $100 USD, whichever is less.
              </p>
              <p>
                <strong>C.</strong> The Company shall not be liable for any damages arising from employment 
                relationships, hiring decisions, workplace disputes, or interactions between users.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Assumption of Risk */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3">5. ASSUMPTION OF RISK</h3>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <p className="text-sm text-blue-900 font-semibold mb-3">
              You acknowledge and agree that:
            </p>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                • You use the ZALPHA platform at your own risk and discretion
              </p>
              <p>
                • The Company is a platform provider and is not a party to any employment relationships
              </p>
              <p>
                • You are responsible for conducting your own due diligence regarding {userType === 'student' ? 'employers and job opportunities' : 'candidates and their qualifications'}
              </p>
              <p>
                • The Company does not guarantee job placements, successful hires, or any specific outcomes
              </p>
              <p>
                • You are solely responsible for all interactions, communications, and agreements with other users
              </p>
            </div>
          </div>
        </div>

        {/* Acknowledgement Checkboxes */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Required Acknowledgements</h3>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgements.read}
                onChange={() => handleCheckbox('read')}
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                required
              />
              <span className="text-sm text-gray-900">
                <strong>I HAVE READ</strong> this entire Hold Harmless and Indemnification Agreement and understand 
                all of its terms
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgements.understand}
                onChange={() => handleCheckbox('understand')}
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                required
              />
              <span className="text-sm text-gray-900">
                <strong>I UNDERSTAND</strong> that I am giving up certain legal rights, including the right to 
                sue KI Executive Group and its subsidiaries for certain claims
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgements.release}
                onChange={() => handleCheckbox('release')}
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                required
              />
              <span className="text-sm text-gray-900">
                <strong>I AGREE TO RELEASE</strong> and hold harmless KI Executive Group and its subsidiaries 
                from all claims, damages, and liabilities as described above
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgements.indemnify}
                onChange={() => handleCheckbox('indemnify')}
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                required
              />
              <span className="text-sm text-gray-900">
                <strong>I AGREE TO INDEMNIFY</strong> and defend KI Executive Group and its subsidiaries 
                against any claims arising from my use of the platform or my violations of this Agreement
              </span>
            </label>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>GOVERNING LAW & SEVERABILITY:</strong> This Agreement shall be governed by the laws 
              applicable in the jurisdiction where KI Executive Group operates. If any provision of this Agreement 
              is found to be unenforceable, the remaining provisions shall remain in full force and effect. 
              This Agreement is binding upon your heirs, executors, administrators, successors, and assigns.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {onDecline && (
            <button
              onClick={onDecline}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              I Do Not Accept
            </button>
          )}
          <button
            onClick={onAccept}
            disabled={!allAcknowledged}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            I Accept This Agreement
          </button>
        </div>

        {/* Warning */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            <strong>WARNING:</strong> By clicking "I Accept This Agreement," you are entering into a legally binding 
            contract. If you do not agree to these terms, you cannot use the ZALPHA platform.
          </p>
        </div>
      </div>
    </div>
  );
}