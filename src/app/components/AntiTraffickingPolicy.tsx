import { Shield, AlertTriangle, Phone, Eye, Ban, Flag, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface AntiTraffickingPolicyProps {
  variant?: 'compact' | 'full';
  onAcknowledge?: (acknowledged: boolean) => void;
  acknowledged?: boolean;
}

export function AntiTraffickingPolicy({ 
  variant = 'full',
  onAcknowledge,
  acknowledged = false 
}: AntiTraffickingPolicyProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-red-600 to-red-800 border-4 border-red-900 rounded-xl p-4 sm:p-6 text-white shadow-2xl">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
            <Ban className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3">🚨 ZERO TOLERANCE POLICY</h4>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-red-100 leading-relaxed text-sm sm:text-base">
                <strong className="text-yellow-300">ZALPHA has ZERO TOLERANCE for child exploitation, human trafficking, forced labor, or any form of modern slavery.</strong>
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border-2 border-white/50">
                <p className="font-bold text-yellow-300 mb-2 text-sm sm:text-base">⚠️ MANDATORY REPORTING:</p>
                <p className="text-white text-xs sm:text-sm">
                  Any suspected cases of child exploitation, human trafficking, or forced labor will be <strong>IMMEDIATELY REPORTED</strong> to the FBI, local law enforcement, and appropriate authorities. We cooperate fully with all investigations.
                </p>
              </div>
              <div className="bg-yellow-400 text-yellow-900 rounded-lg p-2 sm:p-3 font-bold text-center border-2 border-yellow-500 text-xs sm:text-sm">
                🚔 VIOLATORS WILL BE PROSECUTED TO THE FULLEST EXTENT OF THE LAW
              </div>
            </div>
          </div>
        </div>

        {onAcknowledge && (
          <label className="flex items-start gap-3 mt-4 sm:mt-6 cursor-pointer group bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border-2 border-white/50 hover:bg-white/30 transition-all">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => onAcknowledge(e.target.checked)}
              className="w-5 h-5 sm:w-6 sm:h-6 mt-0.5 cursor-pointer accent-yellow-400 flex-shrink-0"
              required
            />
            <span className="text-white font-bold text-xs sm:text-sm">
              I understand and agree to ZALPHA's zero-tolerance policy on human trafficking, child exploitation, and forced labor. I acknowledge that violations will be reported to law enforcement.
            </span>
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 border-4 border-red-600 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8 hover:bg-red-100 transition-all text-left"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Ban className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-red-900 mb-1 sm:mb-2">
            🚨 ANTI-TRAFFICKING & CHILD PROTECTION POLICY
          </h3>
          <p className="text-red-800 font-semibold text-sm sm:text-base lg:text-xl">
            ZALPHA's Commitment to Safety and Justice
          </p>
        </div>
        <ChevronDown className={`w-6 h-6 sm:w-7 sm:h-7 text-red-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Collapsible Content */}
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[20000px]' : 'max-h-0'}`}>
        <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 space-y-4 sm:space-y-6">
          {/* Zero Tolerance Statement */}
          <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-xl p-4 sm:p-6 lg:p-8 text-white shadow-2xl border-2 sm:border-4 border-red-950">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-300 flex-shrink-0" />
              <div>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-yellow-300">ZERO TOLERANCE POLICY</h4>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed mb-3 sm:mb-4">
                  ZALPHA has ABSOLUTELY ZERO TOLERANCE for:
                </p>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-xl">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-300 font-bold">🚫</span>
                    <span><strong>Child Labor & Exploitation:</strong> Employment of minors in violation of child labor laws</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-300 font-bold">🚫</span>
                    <span><strong>Human Trafficking:</strong> Forced labor, sex trafficking, or any form of modern slavery</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-300 font-bold">🚫</span>
                    <span><strong>Forced Labor:</strong> Coercion, threats, or abuse to compel work</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-300 font-bold">🚫</span>
                    <span><strong>Debt Bondage:</strong> Trapping workers through debt or withholding documents</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-yellow-300 font-bold">🚫</span>
                    <span><strong>Sexual Exploitation:</strong> Any form of sexual abuse or commercial sexual exploitation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-400 text-yellow-900 rounded-xl p-4 sm:p-6 font-bold text-center border-2 sm:border-4 border-yellow-500 text-lg sm:text-xl lg:text-2xl">
              ⚖️ WE TAKE THIS EXTREMELY SERIOUSLY ⚖️
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-red-400 shadow-lg">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-600" />
              ZALPHA's Commitment
            </h4>
            <div className="space-y-3 sm:space-y-4 text-red-800">
              <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-300">
                <h5 className="font-bold text-red-900 mb-2 text-sm sm:text-base">🛡️ Proactive Prevention:</h5>
                <ul className="space-y-1 sm:space-y-2 ml-4 sm:ml-6 list-disc text-xs sm:text-sm">
                  <li>Mandatory ID verification for all users (students and employers)</li>
                  <li>Age verification to ensure all workers are 18+ years old</li>
                  <li>Monitoring job postings for suspicious or exploitative content</li>
                  <li>Automated detection systems for red flag keywords and patterns</li>
                  <li>Regular audits of platform activity</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-300">
                <h5 className="font-bold text-red-900 mb-2 text-sm sm:text-base">👁️ Active Monitoring:</h5>
                <ul className="space-y-1 sm:space-y-2 ml-4 sm:ml-6 list-disc text-xs sm:text-sm">
                  <li>24/7 review of reported accounts and suspicious activity</li>
                  <li>Machine learning algorithms to detect exploitation patterns</li>
                  <li>Human review team trained to identify trafficking indicators</li>
                  <li>Partnership with anti-trafficking organizations</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-300">
                <h5 className="font-bold text-red-900 mb-2 text-sm sm:text-base">⚡ Swift Action:</h5>
                <ul className="space-y-1 sm:space-y-2 ml-4 sm:ml-6 list-disc text-xs sm:text-sm">
                  <li>Immediate suspension of suspected accounts</li>
                  <li>Preservation of evidence for law enforcement</li>
                  <li>Full cooperation with investigations</li>
                  <li>Permanent bans for confirmed violators</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mandatory Reporting */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl p-4 sm:p-6 lg:p-8 text-white shadow-2xl border-2 sm:border-4 border-blue-900">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Flag className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-300 flex-shrink-0" />
              <div>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-yellow-300">🚔 MANDATORY REPORTING TO LAW ENFORCEMENT</h4>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-white/50 mb-4 sm:mb-6">
                  <p className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 leading-relaxed">
                    If ZALPHA staff, algorithms, or community reports identify ANY suspected cases of:
                  </p>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg">
                    <li>• Child exploitation or child labor violations</li>
                    <li>• Human trafficking or forced labor</li>
                    <li>• Sexual exploitation or abuse</li>
                    <li>• Modern slavery or debt bondage</li>
                    <li>• Coercion, threats, or violence</li>
                  </ul>
                  <div className="mt-4 sm:mt-6 bg-yellow-400 text-yellow-900 rounded-lg p-3 sm:p-5 font-bold border-2 border-yellow-500">
                    <p className="text-lg sm:text-xl lg:text-2xl text-center">
                      ⚠️ WE WILL IMMEDIATELY REPORT TO:
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/30">
                    <p className="font-bold text-yellow-300 text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">Federal Authorities:</p>
                    <ul className="space-y-1 sm:space-y-2 text-white text-xs sm:text-sm">
                      <li>• <strong>FBI</strong> - Federal Bureau of Investigation</li>
                      <li>• <strong>ICE HSI</strong> - Homeland Security Investigations</li>
                      <li>• <strong>DOL</strong> - Department of Labor (Child Labor Division)</li>
                      <li>• <strong>National Human Trafficking Hotline</strong></li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/30">
                    <p className="font-bold text-yellow-300 text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">🏝️ Local Law Enforcement:</p>
                    <ul className="space-y-1 sm:space-y-2 text-white text-xs sm:text-sm">
                      <li>• CNMI Department of Public Safety</li>
                      <li>• Guam Police Department</li>
                      <li>• Hawaii State Police</li>
                      <li>• FSM National Police</li>
                      <li>• Local Attorney General offices</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 bg-red-600 text-white rounded-xl p-4 sm:p-5 font-bold text-center border-2 sm:border-4 border-red-800 text-sm sm:text-base lg:text-xl">
                  📞 All reports include full documentation, evidence, and user information for prosecution
                </div>
              </div>
            </div>
          </div>

          {/* Red Flags / Warning Signs */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-orange-400 shadow-lg">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-orange-600" />
              Trafficking Warning Signs - REPORT IMMEDIATELY
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h5 className="font-bold text-orange-900 mb-2 sm:mb-3 text-sm sm:text-base">🚩 Suspicious Job Postings:</h5>
                <ul className="space-y-1 sm:space-y-2 text-orange-800 text-xs sm:text-sm ml-4 sm:ml-6 list-disc">
                  <li>Promises of unrealistic pay or benefits</li>
                  <li>Vague job descriptions or requirements</li>
                  <li>Requests for passport/ID confiscation</li>
                  <li>Demands for upfront fees or deposits</li>
                  <li>Restrictions on communication or movement</li>
                  <li>Offers of "housing" with unclear terms</li>
                  <li>Targeting vulnerable populations</li>
                  <li>Jobs in isolated or remote locations</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-orange-900 mb-2 sm:mb-3 text-sm sm:text-base">🚩 Suspicious Employer Behavior:</h5>
                <ul className="space-y-1 sm:space-y-2 text-orange-800 text-xs sm:text-sm ml-4 sm:ml-6 list-disc">
                  <li>Requesting workers under 18 years old</li>
                  <li>Avoiding official contracts or documentation</li>
                  <li>Threatening deportation or legal action</li>
                  <li>Withholding wages or excessive deductions</li>
                  <li>Controlling worker communications</li>
                  <li>Isolated work sites with restricted access</li>
                  <li>Excessive work hours or unsafe conditions</li>
                  <li>Pattern of hiring vulnerable workers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Report */}
          <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-xl p-4 sm:p-6 lg:p-8 text-white shadow-2xl border-2 sm:border-4 border-green-800">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Phone className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-300 flex-shrink-0" />
              <div>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-yellow-300">📞 HOW TO REPORT SUSPICIOUS ACTIVITY</h4>
                <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6">
                  If you see ANYTHING suspicious, report it immediately. Your report could save lives.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 border-2 border-white/50">
                    <p className="font-bold text-yellow-300 text-base sm:text-lg lg:text-xl mb-2">⚡ Report to ZALPHA:</p>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <li>📧 Email: <strong>safety@zalpharecruit.com</strong> (monitored 24/7)</li>
                      <li>🚨 Emergency Hotline: <strong>670-286-3010</strong></li>
                      <li>💬 In-app "Report User" button on any profile or job posting</li>
                    </ul>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 border-2 border-white/50">
                    <p className="font-bold text-yellow-300 text-base sm:text-lg lg:text-xl mb-2">🚔 Report Directly to Authorities:</p>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <li>📞 <strong>National Human Trafficking Hotline: 1-888-373-7888</strong></li>
                      <li>📱 Text: "HELP" or "INFO" to <strong>233733</strong></li>
                      <li>🔗 Online: <strong>humantraffickinghotline.org</strong></li>
                      <li>🚨 FBI Tips: <strong>tips.fbi.gov</strong></li>
                      <li>🆘 Local Police: <strong>911</strong> (for immediate danger)</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 bg-yellow-400 text-yellow-900 rounded-xl p-4 sm:p-5 font-bold text-center border-2 border-yellow-500 text-sm sm:text-base lg:text-xl">
                  🛡️ REPORTERS ARE PROTECTED - Reports can be made anonymously
                </div>
              </div>
            </div>
          </div>

          {/* Consequences for Violators */}
          <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-xl p-4 sm:p-6 lg:p-8 text-white shadow-2xl border-2 sm:border-4 border-red-950">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-300 flex-shrink-0" />
              <div>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-yellow-300">⚖️ CONSEQUENCES FOR VIOLATORS</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 border-2 border-white/50">
                    <p className="font-bold text-yellow-300 text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">Platform Actions:</p>
                    <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base lg:text-lg">
                      <li>✓ Immediate and permanent account suspension</li>
                      <li>✓ All evidence preserved and turned over to law enforcement</li>
                      <li>✓ Full cooperation with criminal investigations and prosecutions</li>
                      <li>✓ Public disclosure to warn other platforms (where legally permitted)</li>
                    </ul>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 border-2 border-white/50">
                    <p className="font-bold text-yellow-300 text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">Criminal Penalties:</p>
                    <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base lg:text-lg">
                      <li>⚖️ <strong>Human Trafficking:</strong> Up to life in prison + fines up to $500,000</li>
                      <li>⚖️ <strong>Child Exploitation:</strong> 15-30 years in prison + mandatory sex offender registration</li>
                      <li>⚖️ <strong>Forced Labor:</strong> Up to 20 years in prison + restitution to victims</li>
                      <li>⚖️ <strong>Federal charges:</strong> Prosecuted under 18 U.S.C. § 1589-1594</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-400 text-yellow-900 rounded-xl p-4 sm:p-6 font-bold text-center border-2 sm:border-4 border-yellow-500 text-base sm:text-lg lg:text-2xl">
                    🚔 VIOLATORS WILL BE PROSECUTED TO THE FULLEST EXTENT OF THE LAW
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          {onAcknowledge && (
            <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 border-2 sm:border-4 border-red-500 shadow-lg">
              <label className="flex items-start gap-3 sm:gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => onAcknowledge(e.target.checked)}
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 cursor-pointer accent-red-600 flex-shrink-0"
                  required
                />
                <div className="flex-1">
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-red-900 mb-3 sm:mb-4">
                    ✅ MANDATORY ACKNOWLEDGMENT
                  </p>
                  <ul className="space-y-1 sm:space-y-2 text-red-800 text-xs sm:text-sm">
                    <li>• I understand ZALPHA has ZERO TOLERANCE for human trafficking, child exploitation, and forced labor</li>
                    <li>• I acknowledge that suspected violations will be IMMEDIATELY REPORTED to the FBI and law enforcement</li>
                    <li>• I will report any suspicious activity I observe on the platform</li>
                    <li>• I understand that violators will be permanently banned and criminally prosecuted</li>
                    <li>• I agree to comply with all anti-trafficking laws and regulations</li>
                    <li>• I will NOT use this platform for any exploitative or illegal purposes</li>
                  </ul>
                </div>
              </label>

              {!acknowledged && (
                <div className="mt-3 sm:mt-4 bg-red-600 text-white rounded-lg p-3 sm:p-4 font-bold text-center border-2 border-red-800 text-sm sm:text-base">
                  ⚠️ YOU MUST ACKNOWLEDGE THIS POLICY TO PROCEED ⚠️
                </div>
              )}
            </div>
          )}

          {/* Resources */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 sm:p-6">
            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-blue-900 mb-3 sm:mb-4">📚 Resources & Support</h4>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-blue-800">
              <div>
                <p className="font-bold mb-2">For Victims:</p>
                <ul className="space-y-1">
                  <li>• National Trafficking Hotline: 1-888-373-7888</li>
                  <li>• Crisis Text Line: Text "HELP" to 233733</li>
                  <li>• Polaris Project: polarisproject.org</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2">For Employers:</p>
                <ul className="space-y-1">
                  <li>• DOL Resources: dol.gov/endtrafficking</li>
                  <li>• Responsible Sourcing Tool: responsiblesourcingtool.org</li>
                  <li>• Comply with Trafficking Victims Protection Act (TVPA)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}