import { useState } from 'react';
import { Shield, DollarSign, Lock, CheckCircle, Clock, AlertTriangle, CreditCard, TrendingUp } from 'lucide-react';

interface Milestone {
  id: string;
  number: number;
  description: string;
  amount: number;
  duration: number;
  status: 'pending' | 'in_progress' | 'submitted' | 'approved' | 'released' | 'disputed';
  startDate?: Date;
  submitDate?: Date;
  approvalDate?: Date;
  releaseDate?: Date;
}

interface EscrowPaymentProps {
  projectId: string;
  totalAmount: number;
  milestones: Milestone[];
  userType: 'student' | 'employer';
  onFundEscrow?: () => void;
  onReleaseMilestone?: (milestoneId: string) => void;
  onDisputeMilestone?: (milestoneId: string) => void;
}

export function EscrowPayment({ 
  projectId, 
  totalAmount, 
  milestones, 
  userType,
  onFundEscrow,
  onReleaseMilestone,
  onDisputeMilestone 
}: EscrowPaymentProps) {
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'paypal' | 'crypto'>('card');

  const escrowStatus = {
    total: totalAmount,
    funded: milestones.filter(m => m.status !== 'pending').reduce((sum, m) => sum + m.amount, 0),
    released: milestones.filter(m => m.status === 'released').reduce((sum, m) => sum + m.amount, 0),
    held: milestones.filter(m => m.status !== 'released' && m.status !== 'pending').reduce((sum, m) => sum + m.amount, 0),
  };

  const platformFee = totalAmount * 0.10; // 10% fee
  const studentEarnings = totalAmount - platformFee;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'released': return 'bg-purple-100 text-purple-800';
      case 'disputed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFundEscrow = () => {
    // In production: Process payment through selected method
    setShowFundingModal(false);
    if (onFundEscrow) onFundEscrow();
  };

  return (
    <div>
      {/* Escrow Overview */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Escrow Protection</h2>
            <p className="text-green-100 text-sm">Your payment is safely held until work is approved</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-lg p-4">
            <p className="text-sm text-green-100 mb-1">Total Project Value</p>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-4">
            <p className="text-sm text-green-100 mb-1">Funded to Escrow</p>
            <p className="text-2xl font-bold">${escrowStatus.funded.toFixed(2)}</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-4">
            <p className="text-sm text-green-100 mb-1">Held in Escrow</p>
            <p className="text-2xl font-bold">${escrowStatus.held.toFixed(2)}</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-4">
            <p className="text-sm text-green-100 mb-1">Released</p>
            <p className="text-2xl font-bold">${escrowStatus.released.toFixed(2)}</p>
          </div>
        </div>

        {userType === 'student' && (
          <div className="mt-4 bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span>Your earnings after 10% platform fee:</span>
              <span className="text-xl font-bold">${studentEarnings.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Fund Escrow Button (Employer) */}
      {userType === 'employer' && escrowStatus.funded === 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Fund Escrow to Start Project</h3>
              <p className="text-sm text-yellow-800 mb-4">
                Deposit the full project amount into escrow. Funds will be held securely and released 
                milestone by milestone as work is completed and approved.
              </p>
              <button
                onClick={() => setShowFundingModal(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold flex items-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Fund Escrow (${totalAmount})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Funding Modal */}
      {showFundingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fund Escrow Account</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900 leading-relaxed">
                <strong>How it works:</strong> You deposit ${totalAmount} into escrow. These funds are held 
                securely by ZALPHA and will only be released to the freelancer as each milestone is completed 
                and approved by you. If you're not satisfied, you can request revisions or dispute the milestone.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Select Payment Method</h3>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedPaymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-semibold">Card</p>
                </button>
                <button
                  onClick={() => setSelectedPaymentMethod('paypal')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedPaymentMethod === 'paypal'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 mx-auto mb-2 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">PP</span>
                  </div>
                  <p className="text-sm font-semibold">PayPal</p>
                </button>
                <button
                  onClick={() => setSelectedPaymentMethod('crypto')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedPaymentMethod === 'crypto'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-sm font-semibold">Crypto</p>
                </button>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Escrow Amount:</span>
                <span className="font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Processing Fee (2%):</span>
                <span className="font-bold text-gray-900">${(totalAmount * 0.02).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-300">
                <span className="font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-green-600">${(totalAmount * 1.02).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowFundingModal(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleFundEscrow}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Confirm & Fund Escrow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Milestones */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Project Milestones</h3>

        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-purple-600">
                      #{milestone.number}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900">{milestone.description}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">${milestone.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{milestone.duration} days</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(milestone.status)}`}>
                    {milestone.status.toUpperCase().replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 text-sm">
                  {milestone.startDate && (
                    <div>
                      <p className="text-gray-600">Started:</p>
                      <p className="font-semibold text-gray-900">{milestone.startDate.toLocaleDateString()}</p>
                    </div>
                  )}
                  {milestone.submitDate && (
                    <div>
                      <p className="text-gray-600">Submitted:</p>
                      <p className="font-semibold text-gray-900">{milestone.submitDate.toLocaleDateString()}</p>
                    </div>
                  )}
                  {milestone.approvalDate && (
                    <div>
                      <p className="text-gray-600">Approved:</p>
                      <p className="font-semibold text-gray-900">{milestone.approvalDate.toLocaleDateString()}</p>
                    </div>
                  )}
                  {milestone.releaseDate && (
                    <div>
                      <p className="text-gray-600">Released:</p>
                      <p className="font-semibold text-gray-900">{milestone.releaseDate.toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {userType === 'employer' && milestone.status === 'submitted' && (
                  <>
                    <button
                      onClick={() => onReleaseMilestone && onReleaseMilestone(milestone.id)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve & Release Payment
                    </button>
                    <button
                      onClick={() => onDisputeMilestone && onDisputeMilestone(milestone.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      Dispute
                    </button>
                  </>
                )}

                {milestone.status === 'approved' && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Work approved - Payment will be released within 24 hours</span>
                  </div>
                )}

                {milestone.status === 'released' && (
                  <div className="flex items-center gap-2 text-purple-600">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold">
                      Payment released - ${(milestone.amount * 0.90).toFixed(2)} paid to freelancer
                    </span>
                  </div>
                )}

                {milestone.status === 'disputed' && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">Under review by ZALPHA mediation team</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escrow Information */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          How Escrow Protection Works
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-bold mb-2">For Employers:</h4>
            <ul className="space-y-1">
              <li>✓ Funds held securely until work approved</li>
              <li>✓ Release payment milestone by milestone</li>
              <li>✓ Request revisions if not satisfied</li>
              <li>✓ Dispute resolution available</li>
              <li>✓ Full refund if project cancelled early</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">For Students:</h4>
            <ul className="space-y-1">
              <li>✓ Payment guaranteed before starting work</li>
              <li>✓ Get paid as milestones are completed</li>
              <li>✓ Protected from non-payment</li>
              <li>✓ Fair dispute resolution process</li>
              <li>✓ Transparent fee structure (10%)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}