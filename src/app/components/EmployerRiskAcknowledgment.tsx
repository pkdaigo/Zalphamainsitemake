import { useState } from 'react';
import { AlertTriangle, GraduationCap, Briefcase, Check, X, Shield, BookOpen } from 'lucide-react';

interface EmployerRiskAcknowledgmentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function EmployerRiskAcknowledgment({ onAccept, onDecline }: EmployerRiskAcknowledgmentProps) {
  const [checkedItems, setCheckedItems] = useState({
    experienceLevel: false,
    skillLimitations: false,
    noGuarantees: false,
    ownRisk: false,
    reviewWork: false,
    disputePolicy: false,
  });

  const allChecked = Object.values(checkedItems).every(v => v);

  const toggleCheck = (key: keyof typeof checkedItems) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-t-2xl text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">⚠️ IMPORTANT: Student Experience Level Acknowledgment</h2>
              <p className="text-orange-100 text-sm">
                Please read carefully before posting contract work on ZALPHA
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Main Warning */}
          <div className="bg-yellow-50 border-4 border-yellow-400 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-12 h-12 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-yellow-900 mb-3">
                  ⚠️ CRITICAL: You Are Hiring ENTRY-LEVEL Young Talent
                </h3>
                <p className="text-yellow-800 text-lg leading-relaxed mb-4">
                  <strong>ZALPHA exclusively serves Pacific Island students and fresh graduates.</strong> The talent pool consists of:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-yellow-300">
                    <GraduationCap className="w-8 h-8 text-yellow-600 mb-2" />
                    <h4 className="font-bold text-yellow-900 mb-1">High School Grads</h4>
                    <p className="text-sm text-yellow-800">Fresh out of high school, minimal work experience</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-yellow-300">
                    <BookOpen className="w-8 h-8 text-yellow-600 mb-2" />
                    <h4 className="font-bold text-yellow-900 mb-1">Current Students</h4>
                    <p className="text-sm text-yellow-800">Still in college, learning & building skills</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-yellow-300">
                    <Briefcase className="w-8 h-8 text-yellow-600 mb-2" />
                    <h4 className="font-bold text-yellow-900 mb-1">Recent Graduates</h4>
                    <p className="text-sm text-yellow-800">Fresh college grads, limited professional experience</p>
                  </div>
                </div>
                <p className="text-yellow-800 font-bold text-lg">
                  🚨 These are NOT seasoned professionals. They are young, eager learners who may need guidance, 
                  training, and patience. You are taking a calculated risk by hiring entry-level talent.
                </p>
              </div>
            </div>
          </div>

          {/* What This Means */}
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              What This Means for YOU as an Employer:
            </h3>
            <div className="space-y-3 text-red-800">
              <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-red-600 font-bold text-2xl">❌</span>
                <div>
                  <p className="font-bold mb-1">Limited Professional Experience:</p>
                  <p className="text-sm">Most have 0-2 years of work experience. Many have never held a professional job.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-red-600 font-bold text-2xl">❌</span>
                <div>
                  <p className="font-bold mb-1">Skill Development in Progress:</p>
                  <p className="text-sm">They are still learning. Expect a learning curve and potential mistakes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-red-600 font-bold text-2xl">❌</span>
                <div>
                  <p className="font-bold mb-1">May Require Training & Guidance:</p>
                  <p className="text-sm">Be prepared to provide clear instructions, examples, and mentorship.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-red-600 font-bold text-2xl">❌</span>
                <div>
                  <p className="font-bold mb-1">Work Quality May Vary:</p>
                  <p className="text-sm">Entry-level work may not meet senior-level standards. Revisions may be needed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-red-600 font-bold text-2xl">❌</span>
                <div>
                  <p className="font-bold mb-1">Longer Timelines Expected:</p>
                  <p className="text-sm">Tasks may take longer than experienced professionals would require.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ZALPHA's Role */}
          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              What ZALPHA DOES and DOES NOT Provide:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  What We DO:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Verify student identities and enrollment status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Provide secure escrow payment protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Offer dispute resolution support (48-hour refund window)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Display student skills, education, and assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Facilitate communication between parties</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                  <X className="w-5 h-5" />
                  What We DO NOT Do:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span><strong>Guarantee work quality</strong> - Students are learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span><strong>Certify professional skills</strong> - No industry certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span><strong>Provide work insurance</strong> - You hire at your own risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span><strong>Train students for you</strong> - Training is your responsibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span><strong>Manage your projects</strong> - You supervise the work</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mandatory Acknowledgments */}
          <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              ✋ You MUST Acknowledge the Following to Post Contract Work:
            </h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-300 hover:border-purple-400 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={checkedItems.experienceLevel}
                  onChange={() => toggleCheck('experienceLevel')}
                  className="w-6 h-6 mt-1 flex-shrink-0 accent-purple-600"
                />
                <span className="text-gray-800">
                  <strong>I understand</strong> that ZALPHA students are <strong>entry-level workers</strong> (high school graduates, 
                  current college students, or recent college graduates) with <strong>LIMITED professional work experience.</strong>
                </span>
              </label>

              <label className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-300 hover:border-purple-400 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={checkedItems.skillLimitations}
                  onChange={() => toggleCheck('skillLimitations')}
                  className="w-6 h-6 mt-1 flex-shrink-0 accent-purple-600"
                />
                <span className="text-gray-800">
                  <strong>I understand</strong> that students may have <strong>LIMITED skills, require training, and may make mistakes.</strong> 
                  I am prepared to provide guidance and accept a learning curve.
                </span>
              </label>

              <label className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-300 hover:border-purple-400 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={checkedItems.noGuarantees}
                  onChange={() => toggleCheck('noGuarantees')}
                  className="w-6 h-6 mt-1 flex-shrink-0 accent-purple-600"
                />
                <span className="text-gray-800">
                  <strong>I understand</strong> that <strong>ZALPHA does NOT guarantee work quality, skill proficiency, or professional outcomes.</strong> 
                  Student profiles show skills, but actual performance may vary.
                </span>
              </label>

              <label className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-300 hover:border-purple-400 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={checkedItems.ownRisk}
                  onChange={() => toggleCheck('ownRisk')}
                  className="w-6 h-6 mt-1 flex-shrink-0 accent-purple-600"
                />
                <span className="text-gray-800">
                  <strong>I acknowledge</strong> that <strong>I am hiring at MY OWN RISK.</strong> I am solely responsible for 
                  evaluating student qualifications, managing the work, and accepting the outcome.
                </span>
              </label>

              <label className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-300 hover:border-purple-400 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={checkedItems.reviewWork}
                  onChange={() => toggleCheck('reviewWork')}
                  className="w-6 h-6 mt-1 flex-shrink-0 accent-purple-600"
                />
                <span className="text-gray-800">
                  <strong>I agree</strong> to <strong>carefully review work within the 48-hour refund window.</strong> After 48 hours, 
                  NO REFUNDS are provided—regardless of work quality.
                </span>
              </label>

              <label className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-300 hover:border-purple-400 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={checkedItems.disputePolicy}
                  onChange={() => toggleCheck('disputePolicy')}
                  className="w-6 h-6 mt-1 flex-shrink-0 accent-purple-600"
                />
                <span className="text-gray-800">
                  <strong>I agree</strong> that <strong>ZALPHA is a marketplace platform only.</strong> We connect employers with 
                  students but are NOT responsible for work quality, project outcomes, or any damages.
                </span>
              </label>
            </div>
          </div>

          {/* Final Warning */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-12 h-12 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-3">🚨 FINAL WARNING: READ THIS CAREFULLY</h3>
                <p className="text-white/90 mb-4 leading-relaxed">
                  By clicking "I Accept and Understand," you acknowledge that you are hiring <strong>YOUNG, ENTRY-LEVEL TALENT 
                  WITH LIMITED EXPERIENCE.</strong> ZALPHA provides a platform to connect you with students, but we do NOT:
                </p>
                <ul className="space-y-2 text-sm text-white/90 mb-4">
                  <li>• Guarantee their work quality or skill level</li>
                  <li>• Certify their professional abilities</li>
                  <li>• Provide work insurance or liability coverage</li>
                  <li>• Manage your projects or train students for you</li>
                  <li>• Accept responsibility for project outcomes</li>
                </ul>
                <p className="font-bold text-lg">
                  ⚠️ YOU HIRE AT YOUR OWN RISK. You are responsible for evaluating qualifications, managing work, 
                  and accepting outcomes. ZALPHA is NOT liable for any damages, losses, or unsatisfactory results.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onDecline}
              className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all font-bold text-lg"
            >
              ❌ I Do Not Accept - Take Me Back
            </button>
            <button
              onClick={onAccept}
              disabled={!allChecked}
              className={`flex-1 px-6 py-4 rounded-xl transition-all font-bold text-lg ${
                allChecked
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {allChecked ? '✓ I Accept and Understand All Risks' : '⚠️ Check All Boxes Above'}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            This acknowledgment is legally binding. By accepting, you release ZALPHA from any liability related to work quality or outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
