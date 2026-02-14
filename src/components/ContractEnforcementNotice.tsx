import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, DollarSign, Calendar, Lock } from 'lucide-react';

interface ContractEnforcementProps {
  studentId: string;
  studentName: string;
  employerId: string;
  employerName: string;
  jobTitle: string;
  onCreateContract: () => void;
}

export function ContractEnforcementNotice({
  studentId,
  studentName,
  employerId,
  employerName,
  jobTitle,
  onCreateContract
}: ContractEnforcementProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-200 p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <Shield className="w-12 h-12 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold mb-2">🔒 All Work Must Use ZALPHA Platform</h2>
            <p className="text-purple-100">
              To protect both parties, all contract work, payments, and project management 
              must be conducted through ZALPHA's secure platform.
            </p>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          Why On-Platform Work is Required
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Student Protection */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
            <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              For Students:
            </h4>
            <ul className="text-sm text-green-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold">💰</span>
                <span><strong>Payment Protection:</strong> Money held in escrow until work is approved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">⚖️</span>
                <span><strong>Dispute Resolution:</strong> ZALPHA mediates if there's a disagreement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">📜</span>
                <span><strong>Legal Contract:</strong> Enforceable agreement protects your work</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">🛡️</span>
                <span><strong>Scam Prevention:</strong> Verified employers only</span>
              </li>
            </ul>
          </div>

          {/* Employer Protection */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              For Employers:
            </h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold">✅</span>
                <span><strong>Quality Assurance:</strong> Review work before releasing payment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">📊</span>
                <span><strong>Project Tracking:</strong> Time logs, deliverables, and milestones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">⚖️</span>
                <span><strong>Dispute Resolution:</strong> Fair mediation if issues arise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">🔍</span>
                <span><strong>Verified Workers:</strong> ID-verified students only</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Prohibited Actions */}
      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          ⚠️ STRICTLY PROHIBITED
        </h3>
        
        <div className="space-y-3 text-sm text-red-900">
          <div className="flex items-start gap-3">
            <span className="font-bold text-xl">❌</span>
            <div>
              <p className="font-bold">Taking work OFF the platform</p>
              <p className="text-red-700">Do not exchange contact info to continue work privately</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-bold text-xl">❌</span>
            <div>
              <p className="font-bold">Direct payments (Cash, Venmo, PayPal, etc.)</p>
              <p className="text-red-700">All payments must go through ZALPHA escrow</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-bold text-xl">❌</span>
            <div>
              <p className="font-bold">Circumventing the platform fee</p>
              <p className="text-red-700">Attempting to avoid fees results in permanent ban</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-bold text-xl">❌</span>
            <div>
              <p className="font-bold">Creating fake contracts or sham agreements</p>
              <p className="text-red-700">All contracts are reviewed; fraud is reported to authorities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consequences */}
      <div className="bg-gray-900 text-white rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lock className="w-6 h-6" />
          Consequences of Violations
        </h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-yellow-400 font-bold">1st Violation:</span>
            <span className="text-gray-300">Account suspended for 30 days + written warning</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-orange-400 font-bold">2nd Violation:</span>
            <span className="text-gray-300">Account suspended for 90 days + loss of all ratings</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 font-bold">3rd Violation:</span>
            <span className="text-gray-300">Permanent ban + reported to authorities if fraud involved</span>
          </div>
          
          <div className="border-t border-white/20 pt-4 mt-4">
            <p className="font-bold text-red-400 mb-2">⚠️ LEGAL CONSEQUENCES:</p>
            <p className="text-gray-300">
              Circumventing platform fees or engaging in fraud may result in civil lawsuits 
              and criminal charges. ZALPHA cooperates fully with law enforcement.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">How ZALPHA Contract Work Works</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-bold text-gray-900">Create Contract on Platform</p>
              <p className="text-sm text-gray-700">Define scope, deliverables, payment, and timeline</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-bold text-gray-900">Employer Funds Escrow</p>
              <p className="text-sm text-gray-700">Money is held securely by ZALPHA (not released yet)</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-bold text-gray-900">Student Completes Work</p>
              <p className="text-sm text-gray-700">Submit deliverables through platform with time tracking</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <div>
              <p className="font-bold text-gray-900">Employer Reviews & Approves</p>
              <p className="text-sm text-gray-700">48 hours to review; automatic approval if no response</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              5
            </div>
            <div>
              <p className="font-bold text-gray-900">Payment Released</p>
              <p className="text-sm text-gray-700">
                Student receives payment (minus 10% ZALPHA fee for first 3 jobs)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Reminder */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          Platform Fees
        </h3>
        <div className="space-y-2 text-sm text-amber-900">
          <p>✓ <strong>First 3 contract jobs:</strong> FREE (no platform fee)</p>
          <p>✓ <strong>After 3 jobs:</strong> Choose either:</p>
          <ul className="ml-6 space-y-1">
            <li>• $99 flat monthly subscription (unlimited contracts), OR</li>
            <li>• 10% commission per contract (no monthly fee)</li>
          </ul>
          <p className="mt-3 font-bold">💡 Regular full-time employment has no fees!</p>
        </div>
      </div>

      {/* Acknowledgment */}
      <div className="border-2 border-purple-300 rounded-xl p-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded mt-1"
          />
          <span className="text-sm text-gray-900 flex-1">
            <strong className="text-purple-900">I understand and agree:</strong>
            <br />
            All contract work between {studentName} and {employerName} for "{jobTitle}" 
            must be conducted through ZALPHA's platform. I understand that attempting to 
            circumvent the platform will result in account suspension and potential legal action. 
            I acknowledge that ZALPHA provides payment protection, dispute resolution, and 
            project management tools for my benefit.
          </span>
        </label>
      </div>

      {/* Action Button */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={onCreateContract}
          disabled={!acknowledged}
          className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
        >
          <FileText className="w-6 h-6" />
          Create Secure Contract
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        By creating a contract, you agree to ZALPHA's Terms of Service and Platform Usage Policy
      </p>
    </div>
  );
}
