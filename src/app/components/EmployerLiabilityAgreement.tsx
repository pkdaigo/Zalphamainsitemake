import { Shield, AlertTriangle, Scale, FileText, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface EmployerLiabilityAgreementProps {
  onAccept: (accepted: boolean) => void;
  accepted: boolean;
}

export function EmployerLiabilityAgreement({ onAccept, accepted }: EmployerLiabilityAgreementProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 border-4 border-red-500 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-red-100/50 transition-all text-left"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Scale className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl sm:text-3xl font-bold text-red-900 mb-2">
            ⚖️ MANDATORY EMPLOYER LIABILITY AGREEMENT
          </h3>
          <p className="text-red-800 font-semibold text-base sm:text-lg">
            You MUST read and accept ALL terms before using the ZALPHA platform
          </p>
        </div>
        <ChevronDown className={`w-6 h-6 sm:w-7 sm:h-7 text-red-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Collapsible Content */}
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[10000px]' : 'max-h-0'}`}>
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-6">
          {/* Section 1: Platform Role */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-red-400 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-red-900 mb-3">1. ZALPHA Platform Role & Limitations</h4>
                <div className="space-y-3 text-sm sm:text-base text-red-800">
                  <p className="leading-relaxed">
                    <strong>ZALPHA is a job connection platform ONLY.</strong> We provide a marketplace to connect employers with verified candidates. ZALPHA does NOT:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Act as an employer, staffing agency, or employment agency</li>
                    <li>Employ, hire, or place workers on your behalf</li>
                    <li>Participate in employment contracts or work arrangements</li>
                    <li>Manage payroll, benefits, or employment matters</li>
                    <li>Guarantee candidate performance or work quality</li>
                    <li>Supervise, direct, or control workers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Employer Responsibility */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-orange-400 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-orange-900 mb-3">2. Employer Responsibilities & Obligations</h4>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-300 mb-4">
                  <p className="font-bold text-orange-900 text-base sm:text-lg mb-2">
                    YOU (the Employer) are SOLELY RESPONSIBLE for:
                  </p>
                </div>
                <ul className="space-y-3 text-sm sm:text-base text-orange-800 ml-6 list-disc">
                  <li><strong>Employment Contracts:</strong> Creating, executing, and enforcing all employment agreements</li>
                  <li><strong>Compensation & Payroll:</strong> Setting wages, processing payroll, and ensuring timely payment</li>
                  <li><strong>Tax Compliance:</strong> Withholding taxes (if W-2) or providing 1099 forms (if contractor)</li>
                  <li><strong>Legal Compliance:</strong> Following all federal, state, territory, and local employment laws</li>
                  <li><strong>Worker Classification:</strong> Properly determining employee vs. independent contractor status</li>
                  <li><strong>Benefits & Insurance:</strong> Providing any required benefits, worker's compensation, liability insurance</li>
                  <li><strong>Workplace Safety:</strong> Ensuring safe working conditions and OSHA compliance (if applicable)</li>
                  <li><strong>Background Checks:</strong> Conducting additional vetting beyond ZALPHA's ID verification</li>
                  <li><strong>Discrimination & Harassment:</strong> Preventing and addressing any workplace violations</li>
                  <li><strong>Termination & Disputes:</strong> Handling all employment terminations and dispute resolutions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Indemnification & Hold Harmless */}
          <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-4 sm:p-6 text-white shadow-lg border-4 border-red-800">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300 flex-shrink-0" />
              <div>
                <h4 className="text-xl sm:text-2xl font-bold mb-3">3. ⚠️ INDEMNIFICATION & HOLD HARMLESS CLAUSE</h4>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 sm:p-5 border-2 border-white/50 mb-4">
                  <p className="font-bold text-yellow-300 text-lg sm:text-xl mb-3">
                    YOU AGREE TO THE FOLLOWING:
                  </p>
                  <ul className="space-y-3 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-yellow-300">Indemnify ZALPHA:</strong> You agree to defend, indemnify, and hold harmless ZALPHA, its officers, directors, employees, agents, and affiliates from ANY and ALL claims, damages, liabilities, costs, and expenses (including attorney fees) arising from:
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                          <li>Your hiring decisions or employment practices</li>
                          <li>Employment-related disputes with workers</li>
                          <li>Wage and hour violations or misclassification claims</li>
                          <li>Discrimination, harassment, or wrongful termination claims</li>
                          <li>Tax liability or failure to withhold/pay employment taxes</li>
                          <li>Workplace injuries or safety violations</li>
                          <li>Any breach of employment laws or regulations</li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-yellow-300">Hold Harmless:</strong> You will NOT hold ZALPHA responsible or liable for any employment-related issues, disputes, or legal matters between you and hired candidates.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-yellow-300">Assumption of Risk:</strong> You acknowledge that you are assuming ALL risks associated with hiring and employing workers through the platform.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Arbitration Waiver */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-purple-400 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-purple-900 mb-3">4. Dispute Resolution & Arbitration</h4>
                <div className="bg-purple-50 rounded-lg p-4 sm:p-5 border-2 border-purple-300 mb-4">
                  <p className="font-bold text-purple-900 text-base sm:text-lg mb-3">
                    🚫 NO ARBITRATION AGAINST ZALPHA FOR EMPLOYMENT MATTERS
                  </p>
                  <div className="space-y-3 text-sm sm:text-base text-purple-800">
                    <p>
                      You agree that you <strong>CANNOT pursue arbitration, litigation, or legal action against ZALPHA</strong> for any employment-related matters, including but not limited to:
                    </p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Candidate performance or work quality issues</li>
                      <li>Employment contract disputes</li>
                      <li>Wage and hour claims</li>
                      <li>Worker misclassification allegations</li>
                      <li>Discrimination or harassment claims</li>
                      <li>Tax liability or compliance issues</li>
                      <li>Workplace injury or safety violations</li>
                    </ul>
                    <p className="mt-3">
                      <strong>All employment disputes are between YOU and the WORKER.</strong> ZALPHA is not a party to your employment relationship and cannot be joined in employment-related legal proceedings.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-300">
                  <p className="text-xs sm:text-sm text-blue-900">
                    <strong>Platform Disputes:</strong> For disputes related to platform functionality, subscription fees, or terms of service (NOT employment matters), standard arbitration provisions in our Terms of Service apply.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Limitation of Liability */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-slate-400 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">5. ZALPHA Limitation of Liability</h4>
                <div className="space-y-3 text-sm sm:text-base text-slate-800">
                  <p>
                    <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>ZALPHA's total liability for ANY claim related to the platform is limited to the amount you paid in subscription fees in the 12 months prior to the claim</li>
                    <li>ZALPHA is NOT liable for indirect, incidental, special, consequential, or punitive damages</li>
                    <li>ZALPHA provides the platform "AS IS" without warranties of any kind</li>
                    <li>ZALPHA does not guarantee candidate qualifications, performance, or suitability</li>
                    <li>ID verification confirms identity only—NOT employment eligibility, skills, or background</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Employment Law Compliance */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-green-400 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-green-900 mb-3">6. Employment Law Compliance Acknowledgment</h4>
                <div className="space-y-3 text-sm sm:text-base text-green-800">
                  <p>
                    You acknowledge and agree that YOU are responsible for compliance with ALL applicable laws, including:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-300">
                      <p className="font-bold text-green-900 mb-2">Federal Laws:</p>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Fair Labor Standards Act (FLSA)</li>
                        <li>• Title VII (Civil Rights Act)</li>
                        <li>• Americans with Disabilities Act (ADA)</li>
                        <li>• Age Discrimination in Employment Act</li>
                        <li>• Family and Medical Leave Act (FMLA)</li>
                        <li>• OSHA safety requirements</li>
                        <li>• Immigration laws (I-9, work authorization)</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-300">
                      <p className="font-bold text-green-900 mb-2">🏝️ Territory/State Laws:</p>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• CNMI labor regulations</li>
                        <li>• Guam employment laws</li>
                        <li>• Hawaii state labor code</li>
                        <li>• FSM employment requirements</li>
                        <li>• Local minimum wage laws</li>
                        <li>• Territory-specific tax obligations</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mt-4">
                    <p className="text-yellow-900 font-semibold text-xs sm:text-sm">
                      ⚠️ <strong>IMPORTANT:</strong> Consult with an employment attorney to ensure compliance. ZALPHA cannot provide legal advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Governing Law */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-blue-400 shadow-lg">
            <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">7. Governing Law & Jurisdiction</h4>
            <div className="space-y-2 text-sm sm:text-base text-blue-800">
              <p>
                This Agreement and your use of the ZALPHA platform are governed by the laws of the Commonwealth of the Northern Mariana Islands (CNMI) and applicable U.S. federal law, without regard to conflict of law provisions.
              </p>
            </div>
          </div>

          {/* Mandatory Acceptance */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 sm:p-8 text-white border-4 border-red-800">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300 flex-shrink-0" />
              <div>
                <h4 className="text-xl sm:text-2xl font-bold mb-2">MANDATORY ACCEPTANCE REQUIRED</h4>
                <p className="text-red-100 text-base sm:text-lg">
                  You MUST check the box below to proceed. By accepting, you are entering into a legally binding agreement.
                </p>
              </div>
            </div>

            <label className="flex items-start gap-4 cursor-pointer group bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-white/50 hover:bg-white/30 transition-all">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => onAccept(e.target.checked)}
                className="w-6 h-6 sm:w-7 sm:h-7 mt-1 cursor-pointer accent-yellow-400"
                required
              />
              <div className="flex-1">
                <p className="text-lg sm:text-xl font-bold text-yellow-300 mb-4">
                  ✅ I HAVE READ, UNDERSTAND, AND AGREE TO ALL TERMS ABOVE
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-white">
                  <li>• I acknowledge that ZALPHA is a platform only and not an employer or staffing agency</li>
                  <li>• I accept full responsibility for all employment relationships and legal compliance</li>
                  <li>• I agree to indemnify and hold harmless ZALPHA from employment-related claims</li>
                  <li>• I will NOT pursue arbitration or litigation against ZALPHA for employment matters</li>
                  <li>• I understand that employment disputes are between me and the worker only</li>
                  <li>• I acknowledge ZALPHA's limitation of liability as stated above</li>
                  <li>• I will comply with all applicable employment laws and regulations</li>
                  <li>• I have consulted or will consult with legal counsel regarding my obligations</li>
                </ul>
              </div>
            </label>

            {!accepted && (
              <div className="mt-4 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center border-2 border-yellow-600 text-sm sm:text-base">
                ⚠️ YOU MUST ACCEPT THIS AGREEMENT TO USE THE ZALPHA PLATFORM ⚠️
              </div>
            )}
          </div>

          {/* Legal Notice */}
          <div className="bg-slate-100 border-2 border-slate-300 rounded-lg p-4">
            <p className="text-xs sm:text-sm text-slate-700">
              <strong>Legal Notice:</strong> This agreement is a legally binding contract. By checking the box above, you acknowledge that you have read and understood all terms, and you agree to be bound by them. If you do not agree, you may not use the ZALPHA platform. We recommend consulting with an attorney before accepting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
