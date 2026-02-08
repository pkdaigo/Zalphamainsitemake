import { AlertTriangle, Clock, DollarSign, Scale, Ban, CheckCircle, XCircle, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DisputeRefundPolicyProps {
  variant?: 'compact' | 'full';
  onAcknowledge?: (acknowledged: boolean) => void;
  acknowledged?: boolean;
}

export function DisputeRefundPolicy({ 
  variant = 'full',
  onAcknowledge,
  acknowledged = false 
}: DisputeRefundPolicyProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-4 border-amber-500 rounded-xl p-4 sm:p-6 shadow-lg">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg sm:text-2xl font-bold text-amber-900 mb-2 sm:mb-3">⏰ Dispute & Refund Policy</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-amber-300">
                <p className="font-bold text-amber-900 text-sm sm:text-lg mb-2">🕐 48-Hour Refund Window:</p>
                <p className="text-amber-800 text-xs sm:text-base">
                  Employers have the right to dispute contractor performance. However, <strong>NO REFUNDS will be issued after 48 hours</strong> of the contractor starting work.
                </p>
              </div>
              <div className="bg-amber-100 rounded-lg p-2 sm:p-3 border border-amber-400">
                <ul className="space-y-1 text-xs sm:text-sm text-amber-900">
                  <li>✓ <strong>Within 48 hours:</strong> Full refund available if work is unsatisfactory</li>
                  <li>✓ <strong>After 48 hours:</strong> No refunds, but disputes can be filed</li>
                  <li>✓ All disputes reviewed on case-by-case basis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {onAcknowledge && (
          <label className="flex items-start gap-3 mt-3 sm:mt-4 cursor-pointer group bg-white rounded-lg p-3 sm:p-4 border-2 border-amber-300 hover:bg-amber-50 transition-all">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => onAcknowledge(e.target.checked)}
              className="w-5 h-5 sm:w-6 sm:h-6 mt-0.5 cursor-pointer accent-amber-600 flex-shrink-0"
              required
            />
            <span className="text-amber-900 font-semibold text-xs sm:text-sm">
              I understand the 48-hour refund window and that no refunds are issued after a contractor has worked for 48 hours.
            </span>
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-500 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8 hover:bg-amber-100 transition-all text-left"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Scale className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-amber-900 mb-1 sm:mb-2">
            ⚖️ DISPUTE RESOLUTION & REFUND POLICY
          </h3>
          <p className="text-amber-800 font-semibold text-sm sm:text-base lg:text-xl">
            Important payment and dispute terms for employers
          </p>
        </div>
        <ChevronDown className={`w-6 h-6 sm:w-7 sm:h-7 text-amber-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Collapsible Content */}
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[20000px]' : 'max-h-0'}`}>
        <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 space-y-4 sm:space-y-6">
          {/* 48-Hour Refund Window */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-4 sm:p-6 lg:p-8 text-white shadow-2xl border-2 sm:border-4 border-amber-800">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-300 flex-shrink-0" />
              <div>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-yellow-300">🕐 48-HOUR REFUND WINDOW</h4>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-white/50 mb-4 sm:mb-6">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed mb-3 sm:mb-4">
                    Critical Timeline for Refund Eligibility:
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-green-500 rounded-lg p-4 sm:p-5 text-white border-2 border-green-700">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex-shrink-0" />
                        <div>
                          <p className="text-base sm:text-lg lg:text-xl font-bold mb-2">✅ WITHIN 48 HOURS:</p>
                          <p className="text-sm sm:text-base lg:text-lg">
                            If you are not satisfied with the contractor's work quality, performance, or deliverables within the <strong>first 48 hours of work commencement</strong>, you may dispute the contract and request a <strong>FULL REFUND</strong>.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-600 rounded-lg p-4 sm:p-5 text-white border-2 border-red-800">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <XCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex-shrink-0" />
                        <div>
                          <p className="text-base sm:text-lg lg:text-xl font-bold mb-2">❌ AFTER 48 HOURS:</p>
                          <p className="text-sm sm:text-base lg:text-lg">
                            Once 48 hours have passed from when the contractor begins work, <strong>NO REFUNDS will be issued</strong>—regardless of the reason. This policy is <strong>NON-NEGOTIABLE and FINAL</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-400 text-yellow-900 rounded-xl p-4 sm:p-6 font-bold text-center border-2 sm:border-4 border-yellow-500 text-base sm:text-lg lg:text-2xl">
                  ⏰ THE 48-HOUR CLOCK STARTS WHEN THE CONTRACTOR BEGINS WORK
                </div>
              </div>
            </div>
          </div>

          {/* What "Begins Work" Means */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-amber-400 shadow-lg">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-amber-600" />
              When Does the 48-Hour Clock Start?
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-amber-50 rounded-lg p-4 sm:p-5 border border-amber-300">
                <p className="font-bold text-amber-900 mb-2 sm:mb-3 text-base sm:text-lg">
                  "Begins Work" is defined as the EARLIEST of:
                </p>
                <ul className="space-y-2 sm:space-y-3 text-amber-800 text-sm sm:text-base">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-amber-600 font-bold text-base sm:text-lg">1.</span>
                    <div>
                      <strong>First Deliverable Submitted:</strong> When the contractor uploads or sends their first work product, draft, or deliverable
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-amber-600 font-bold text-base sm:text-lg">2.</span>
                    <div>
                      <strong>First Meeting/Kickoff:</strong> When the contractor attends the initial project meeting or kickoff call
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-amber-600 font-bold text-base sm:text-lg">3.</span>
                    <div>
                      <strong>Written Confirmation:</strong> When the contractor sends written confirmation they have started the project
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-amber-600 font-bold text-base sm:text-lg">4.</span>
                    <div>
                      <strong>Time Tracking Begins:</strong> When the contractor logs their first hours worked (for hourly contracts)
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-amber-600 font-bold text-base sm:text-lg">5.</span>
                    <div>
                      <strong>Contract Acceptance:</strong> For immediate-start projects, when both parties accept the contract
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-300">
                <p className="text-xs sm:text-sm text-blue-900">
                  <strong>📌 Note:</strong> The timestamp is automatically recorded by ZALPHA's platform. You can view the exact start time in your contract dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Employer's Right to Dispute */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-blue-400 shadow-lg">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <Scale className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
              Employer's Right to Dispute
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-blue-800 leading-relaxed text-sm sm:text-base">
                As an employer, you have the <strong>right to dispute contractor performance</strong> at any time if you believe:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-300">
                  <p className="font-bold text-blue-900 mb-2 text-sm sm:text-base">✋ Valid Dispute Reasons:</p>
                  <ul className="text-xs sm:text-sm text-blue-800 space-y-1 ml-4 list-disc">
                    <li>Work does not meet agreed specifications</li>
                    <li>Quality is substantially below expectations</li>
                    <li>Contractor missed deadlines without notice</li>
                    <li>Deliverables are incomplete or incorrect</li>
                    <li>Contractor is unresponsive or unprofessional</li>
                    <li>Work contains plagiarism or violations</li>
                    <li>Contractor violated contract terms</li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-300">
                  <p className="font-bold text-red-900 mb-2 text-sm sm:text-base">🚫 Invalid Dispute Reasons:</p>
                  <ul className="text-xs sm:text-sm text-red-800 space-y-1 ml-4 list-disc">
                    <li>Changed your mind about the project</li>
                    <li>Found a cheaper contractor</li>
                    <li>Budget constraints or financial issues</li>
                    <li>Personal reasons unrelated to work quality</li>
                    <li>Subjective style preferences (if specs met)</li>
                    <li>Company direction changed</li>
                    <li>Project no longer needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Dispute Process */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-purple-400 shadow-lg">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600" />
              How to File a Dispute
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-purple-50 rounded-lg p-4 sm:p-5 border border-purple-300">
                <p className="font-bold text-purple-900 text-base sm:text-lg mb-2 sm:mb-3">📋 Dispute Process (Within 48 Hours):</p>
                <ol className="space-y-2 sm:space-y-3 text-purple-800 text-xs sm:text-sm">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="font-bold text-purple-600">Step 1:</span>
                    <div>
                      <strong>Contact Contractor First:</strong> Attempt to resolve the issue directly with the contractor. Communicate your concerns clearly.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="font-bold text-purple-600">Step 2:</span>
                    <div>
                      <strong>File Dispute on Platform:</strong> If unresolved, click "File Dispute" in your contract dashboard within 48 hours of work start.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="font-bold text-purple-600">Step 3:</span>
                    <div>
                      <strong>Provide Evidence:</strong> Submit detailed explanation, screenshots, communications, and documentation of the issue.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="font-bold text-purple-600">Step 4:</span>
                    <div>
                      <strong>ZALPHA Review:</strong> Our dispute resolution team reviews the case within 24-48 hours. Both parties may provide statements.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="font-bold text-purple-600">Step 5:</span>
                    <div>
                      <strong>Resolution:</strong> If filed within 48 hours and valid, you receive a full refund. Contract is terminated.
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 sm:p-5 border border-purple-300">
                <p className="font-bold text-purple-900 text-base sm:text-lg mb-2 sm:mb-3">📋 Dispute Process (After 48 Hours):</p>
                <ol className="space-y-2 sm:space-y-3 text-purple-800 text-xs sm:text-sm">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="font-bold text-purple-600">Step 1:</span>
                    <div>
                      <strong>Communicate with Contractor:</strong> You MUST attempt to resolve issues directly. Document all communications.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="font-bold text-purple-600">Step 2:</span>
                    <div>
                      <strong>File Dispute for Mediation:</strong> Click "File Dispute" and select "Mediation Request."
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="font-bold text-purple-600">Step 3:</span>
                    <div>
                      <strong>ZALPHA Mediation:</strong> Our team mediates between employer and contractor to reach a resolution (e.g., corrections, partial credit, revised timeline).
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="font-bold text-purple-600">Step 4:</span>
                    <div>
                      <strong className="text-red-600">NO REFUND:</strong> After 48 hours, refunds are NOT available. Resolutions may include revisions, partial work credit, or contract termination without refund.
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Refund Policy Summary */}
          <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-xl p-4 sm:p-6 lg:p-8 text-white shadow-2xl border-2 sm:border-4 border-red-950">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Ban className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-300 flex-shrink-0" />
              <div>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-yellow-300">💰 NO REFUND POLICY (AFTER 48 HOURS)</h4>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-white/50 mb-4 sm:mb-6">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed mb-3 sm:mb-4">
                    This Policy is STRICT and NON-NEGOTIABLE:
                  </p>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-xl">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-red-300 flex-shrink-0 mt-0.5" />
                      <span>Once 48 hours have passed, <strong>ALL SALES ARE FINAL</strong></span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-red-300 flex-shrink-0 mt-0.5" />
                      <span>No exceptions for poor performance, changed minds, or project cancellation</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-red-300 flex-shrink-0 mt-0.5" />
                      <span>You remain responsible for payment even if work is not satisfactory</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-red-300 flex-shrink-0 mt-0.5" />
                      <span>Disputes after 48 hours result in mediation, NOT refunds</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-green-300 flex-shrink-0 mt-0.5" />
                      <span><strong>Solution:</strong> Carefully review contractor work in the first 48 hours!</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-400 text-yellow-900 rounded-xl p-4 sm:p-6 font-bold text-center border-2 sm:border-4 border-yellow-500 text-base sm:text-lg lg:text-2xl">
                  ⚠️ REVIEW WORK IMMEDIATELY TO PRESERVE REFUND RIGHTS
                </div>
              </div>
            </div>
          </div>

          {/* Why This Policy Exists */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-green-400 shadow-lg">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
              Why This Policy Exists
            </h4>
            <div className="space-y-3 text-green-800 text-sm sm:text-base">
              <p className="leading-relaxed">
                The 48-hour refund window protects both employers AND contractors:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-300">
                  <p className="font-bold text-green-900 mb-2 text-sm sm:text-base">✅ For Employers:</p>
                  <ul className="text-xs sm:text-sm space-y-1 ml-4 list-disc">
                    <li>Early opportunity to assess work quality</li>
                    <li>Full refund if expectations not met</li>
                    <li>Clear timeline for decision-making</li>
                    <li>Protection from incompetent contractors</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-300">
                  <p className="font-bold text-green-900 mb-2 text-sm sm:text-base">✅ For Contractors:</p>
                  <ul className="text-xs sm:text-sm space-y-1 ml-4 list-disc">
                    <li>Protection from frivolous cancellations</li>
                    <li>Guaranteed payment for completed work</li>
                    <li>Prevents "free work" exploitation</li>
                    <li>Fair compensation for time invested</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-300 mt-3 sm:mt-4">
                <p className="text-blue-900 font-semibold text-xs sm:text-sm">
                  💡 <strong>Best Practice:</strong> Schedule a check-in call or request a progress update within the first 24 hours to ensure alignment and catch any issues early.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Holds & Escrow */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-indigo-400 shadow-lg">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-600" />
              Payment Holds & Escrow Protection
            </h4>
            <div className="space-y-3 text-indigo-800">
              <div className="bg-indigo-50 rounded-lg p-4 sm:p-5 border border-indigo-300">
                <p className="font-bold text-indigo-900 text-base sm:text-lg mb-2 sm:mb-3">
                  How ZALPHA Protects Both Parties:
                </p>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Escrow System:</strong> Your payment is held in escrow when you hire a contractor. Funds are not released to the contractor until after the 48-hour window expires.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Automatic Release:</strong> If no dispute is filed within 48 hours, payment is automatically released to the contractor.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Dispute Hold:</strong> If you file a dispute within 48 hours, payment is frozen until the dispute is resolved.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Milestone Payments:</strong> For larger projects, set up milestone payments. Each milestone has its own 48-hour review window.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Exception Cases */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-orange-400 shadow-lg">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-orange-600" />
              Rare Exception Cases
            </h4>
            <div className="space-y-3 text-orange-800 text-sm sm:text-base">
              <p className="leading-relaxed">
                In <strong>extremely rare circumstances</strong>, ZALPHA may issue refunds after 48 hours ONLY if:
              </p>
              <div className="bg-orange-50 rounded-lg p-4 sm:p-5 border border-orange-300">
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <div>
                      <strong>Fraud or Identity Theft:</strong> The contractor used stolen credentials or falsified identity
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <div>
                      <strong>Plagiarism or Copyright Violation:</strong> Contractor submitted stolen or plagiarized work
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <div>
                      <strong>Complete No-Show:</strong> Contractor accepted the contract but never responded or started work
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <div>
                      <strong>Platform Technical Error:</strong> A bug or technical issue prevented proper contract execution
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-300 mt-3 sm:mt-4">
                <p className="text-red-900 font-semibold text-xs sm:text-sm">
                  ⚠️ These exceptions require substantial evidence and are determined solely at ZALPHA's discretion. Do NOT assume your case qualifies—the 48-hour policy is the rule.
                </p>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          {onAcknowledge && (
            <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 border-2 sm:border-4 border-amber-500 shadow-lg">
              <label className="flex items-start gap-3 sm:gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => onAcknowledge(e.target.checked)}
                  className="w-6 h-6 sm:w-7 sm:h-7 mt-1 cursor-pointer accent-amber-600 flex-shrink-0"
                  required
                />
                <div className="flex-1">
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-amber-900 mb-3 sm:mb-4">
                    ✅ MANDATORY ACKNOWLEDGMENT
                  </p>
                  <ul className="space-y-1 sm:space-y-2 text-amber-800 text-xs sm:text-sm">
                    <li>• I understand that I have the right to dispute contractor performance at any time</li>
                    <li>• I understand that <strong>FULL REFUNDS are ONLY available within 48 hours</strong> of the contractor beginning work</li>
                    <li>• I understand that <strong>NO REFUNDS will be issued after 48 hours</strong> have passed</li>
                    <li>• I acknowledge that the 48-hour clock starts when the contractor begins work as defined above</li>
                    <li>• I agree to review contractor work promptly within the 48-hour window</li>
                    <li>• I understand that disputes after 48 hours result in mediation, not refunds</li>
                    <li>• I accept that this refund policy is strict, non-negotiable, and final</li>
                    <li>• I will file disputes through ZALPHA's platform dispute resolution system</li>
                  </ul>
                </div>
              </label>

              {!acknowledged && (
                <div className="mt-3 sm:mt-4 bg-amber-600 text-white rounded-lg p-3 sm:p-4 font-bold text-center border-2 border-amber-800 text-sm sm:text-base">
                  ⚠️ YOU MUST ACKNOWLEDGE THIS POLICY TO PROCEED ⚠️
                </div>
              )}
            </div>
          )}

          {/* Contact for Questions */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 sm:p-6">
            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-blue-900 mb-2 sm:mb-3">❓ Questions About Disputes or Refunds?</h4>
            <div className="space-y-2 text-xs sm:text-sm text-blue-800">
              <p>
                <strong>Dispute Support:</strong> disputes@zalpharecruit.com
              </p>
              <p>
                <strong>Payment Questions:</strong> payments@zalpharecruit.com
              </p>
              <p>
                <strong>Phone:</strong> 670-286-3010
              </p>
              <p className="mt-3">
                <strong>Response Time:</strong> Dispute inquiries are typically reviewed within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}