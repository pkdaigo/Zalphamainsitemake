import { useState } from 'react';
import { Scale, Shield, AlertTriangle, FileText, MessageCircle, CheckCircle, Clock, Upload } from 'lucide-react';

interface DisputeResolutionProps {
  projectId: string;
  projectTitle: string;
  milestoneNumber: number;
  milestoneAmount: number;
  userType: 'student' | 'employer';
  onResolve?: (resolution: DisputeResolution) => void;
}

interface DisputeResolution {
  outcome: 'employer_wins' | 'student_wins' | 'partial_refund' | 'resubmission';
  refundAmount?: number;
  notes: string;
}

interface Evidence {
  id: string;
  type: 'text' | 'file' | 'screenshot';
  content: string;
  uploadedBy: 'student' | 'employer';
  timestamp: Date;
}

export function DisputeResolution({ 
  projectId, 
  projectTitle, 
  milestoneNumber, 
  milestoneAmount, 
  userType,
  onResolve 
}: DisputeResolutionProps) {
  const [disputeReason, setDisputeReason] = useState('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [evidenceText, setEvidenceText] = useState('');
  const [disputeStatus, setDisputeStatus] = useState<'filing' | 'under_review' | 'resolved'>('filing');
  
  const [evidence, setEvidence] = useState<Evidence[]>([]);

  const disputeReasons = [
    'Work does not match requirements',
    'Work quality is substandard',
    'Missed deadline without communication',
    'Freelancer not responding',
    'Payment not released after approval',
    'Unfair rejection of work',
    'Requirements changed after agreement',
    'Other',
  ];

  const handleFileDispute = () => {
    if (!selectedReason) {
      alert('Please select a reason for the dispute');
      return;
    }
    if (!disputeReason.trim()) {
      alert('Please provide a detailed explanation');
      return;
    }

    setDisputeStatus('under_review');
  };

  const handleAddEvidence = () => {
    if (!evidenceText.trim()) return;

    const newEvidence: Evidence = {
      id: `ev_${Date.now()}`,
      type: 'text',
      content: evidenceText,
      uploadedBy: userType,
      timestamp: new Date(),
    };

    setEvidence([...evidence, newEvidence]);
    setEvidenceText('');
  };

  if (disputeStatus === 'filing') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-red-200">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">File a Dispute</h2>
              <p className="text-gray-600 text-sm">Milestone #{milestoneNumber} - {projectTitle}</p>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">Before Filing a Dispute</h3>
                <p className="text-sm text-yellow-800 leading-relaxed mb-3">
                  We encourage resolving issues directly with the other party first. Disputes can take 3-5 business 
                  days to resolve. Have you tried communicating your concerns in the project workspace?
                </p>
                <ul className="space-y-1 text-sm text-yellow-800">
                  <li>✓ Clearly explain your concerns</li>
                  <li>✓ Provide specific examples</li>
                  <li>✓ Be professional and respectful</li>
                  <li>✓ Upload evidence (screenshots, files, etc.)</li>
                </ul>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            {/* Reason Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Reason for Dispute <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                required
              >
                <option value="">Select a reason...</option>
                {disputeReasons.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            {/* Detailed Explanation */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Detailed Explanation <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Provide a clear, detailed explanation of the issue. Include specific examples and what resolution you're seeking.
              </p>
              <textarea
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                placeholder="Please describe the issue in detail...

Example:
- What was agreed upon in the original requirements
- What was delivered vs. what was expected
- Specific issues with the work
- What resolution you're requesting (revision, partial refund, full refund)
- Any previous communication about this issue"
                className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none resize-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {disputeReason.length} / 2000 characters
              </p>
            </div>

            {/* Upload Evidence */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Evidence (Optional but Recommended)
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Upload screenshots, files, or provide links to support your claim
              </p>
              
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Click to upload</strong> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Screenshots, documents, or any supporting files
                  </p>
                </div>

                <div>
                  <textarea
                    value={evidenceText}
                    onChange={(e) => setEvidenceText(e.target.value)}
                    placeholder="Add text evidence, links to external files, or additional context..."
                    className="w-full h-24 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none resize-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddEvidence}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    Add Evidence
                  </button>
                </div>

                {evidence.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Added Evidence:</p>
                    <div className="space-y-2">
                      {evidence.map((ev) => (
                        <div key={ev.id} className="bg-white border border-gray-200 rounded p-3">
                          <p className="text-sm text-gray-700">{ev.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Added {ev.timestamp.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dispute Amount */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Disputed Amount:</strong>
              </p>
              <p className="text-3xl font-bold text-red-600">${milestoneAmount.toFixed(2)}</p>
              <p className="text-xs text-gray-600 mt-1">
                The ZALPHA mediation team will review this dispute and determine the appropriate resolution
              </p>
            </div>

            {/* Terms */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">Dispute Resolution Process</h4>
              <ol className="space-y-1 text-sm text-blue-800 list-decimal list-inside">
                <li>Your dispute will be reviewed by the ZALPHA mediation team within 24 hours</li>
                <li>Both parties will be asked to provide evidence and explanations</li>
                <li>The mediation team will review all evidence and communication history</li>
                <li>A resolution will be determined within 3-5 business days</li>
                <li>Possible outcomes: full refund, partial refund, work revision, or no refund</li>
              </ol>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFileDispute}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
              >
                <Scale className="w-5 h-5" />
                File Dispute
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (disputeStatus === 'under_review') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Scale className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dispute Under Review</h2>
              <p className="text-gray-600 text-sm">Case ID: DSP-{projectId}-M{milestoneNumber}</p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-bold text-blue-900">Under Mediation Review</h3>
                <p className="text-sm text-blue-700">Expected resolution: 3-5 business days</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Dispute filed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Other party notified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700 font-semibold">Awaiting mediation team review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                  <span className="text-sm text-gray-400">Resolution determined</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dispute Details */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Dispute Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Project:</p>
                <p className="text-gray-900">{projectTitle}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Milestone:</p>
                <p className="text-gray-900">Milestone #{milestoneNumber}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Amount in Dispute:</p>
                <p className="text-2xl font-bold text-red-600">${milestoneAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Your Reason:</p>
                <p className="text-gray-900">{selectedReason || 'Work does not match requirements'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Detailed Explanation:</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {disputeReason || 'The delivered work does not meet the requirements specified in the project description...'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Communication */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Mediation Communication</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">ZALPHA Mediation Team</p>
                    <p className="text-sm text-blue-800 mt-1">
                      We have received your dispute and are reviewing the case. Both parties will have the 
                      opportunity to provide additional evidence. We'll update you within 24 hours.
                    </p>
                    <p className="text-xs text-blue-600 mt-2">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <textarea
                placeholder="Add additional information or respond to the mediation team..."
                className="w-full h-24 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-sm"
              />
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-bold text-green-900 mb-3">What Happens Next?</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600">1.</span>
                <span>The mediation team reviews all evidence from both parties</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">2.</span>
                <span>Both parties may be asked for additional information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">3.</span>
                <span>The team determines a fair resolution based on the evidence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">4.</span>
                <span>You'll be notified of the decision and next steps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">5.</span>
                <span>Escrow funds are released according to the resolution</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
}