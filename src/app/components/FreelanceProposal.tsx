import { useState } from 'react';
import { DollarSign, Clock, FileText, Send, Award, CheckCircle, AlertCircle } from 'lucide-react';

interface FreelanceProposalProps {
  job: {
    id: string;
    title: string;
    budget: {
      min: number;
      max: number;
      type: 'fixed' | 'hourly';
    };
  };
  onSubmit: (proposal: ProposalData) => void;
  onCancel: () => void;
}

interface ProposalData {
  coverLetter: string;
  bidAmount: number;
  deliveryTime: number;
  milestones?: Milestone[];
  attachments: string[];
}

interface Milestone {
  id: string;
  description: string;
  amount: number;
  duration: number;
}

export function FreelanceProposal({ job, onSubmit, onCancel }: FreelanceProposalProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [bidAmount, setBidAmount] = useState(job.budget.min);
  const [deliveryTime, setDeliveryTime] = useState(7);
  const [useMilestones, setUseMilestones] = useState(job.budget.type === 'fixed');
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: '1', description: '', amount: 0, duration: 0 }
  ]);

  const addMilestone = () => {
    setMilestones([...milestones, { 
      id: Date.now().toString(), 
      description: '', 
      amount: 0, 
      duration: 0 
    }]);
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: string | number) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const totalMilestoneAmount = milestones.reduce((sum, m) => sum + (m.amount || 0), 0);
  const totalMilestoneDuration = milestones.reduce((sum, m) => sum + (m.duration || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!coverLetter.trim()) {
      alert('Please write a cover letter');
      return;
    }
    
    if (useMilestones && totalMilestoneAmount !== bidAmount) {
      alert('Milestone amounts must equal your total bid');
      return;
    }

    const proposalData: ProposalData = {
      coverLetter,
      bidAmount,
      deliveryTime: useMilestones ? totalMilestoneDuration : deliveryTime,
      milestones: useMilestones ? milestones : undefined,
      attachments: [],
    };

    onSubmit(proposalData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Proposal</h2>
          <p className="text-gray-600">For: <strong>{job.title}</strong></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Cover Letter <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Explain why you're the best fit for this project. Highlight your relevant experience and skills.
            </p>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Dear Hiring Manager,

I am excited to submit my proposal for your project...

I have experience in...

I am confident I can deliver high-quality results within your timeline.

Best regards,"
              className="w-full h-48 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {coverLetter.length} / 1000 characters
            </p>
          </div>

          {/* Bid Amount */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Your Bid Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={job.budget.min}
                  max={job.budget.max * 2}
                  step={job.budget.type === 'hourly' ? 1 : 50}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  required
                />
                {job.budget.type === 'hourly' && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">
                    /hour
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Budget range: ${job.budget.min} - ${job.budget.max}
                {job.budget.type === 'hourly' && '/hr'}
              </p>
              
              {/* Platform Fee Notice */}
              <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>You'll receive:</strong> ${(bidAmount * 0.90).toFixed(2)}
                  <br />
                  <span className="text-blue-600">ZALPHA platform fee: 10% (${(bidAmount * 0.10).toFixed(2)})</span>
                </p>
              </div>
            </div>

            {!useMilestones && (
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Delivery Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(Number(e.target.value))}
                    min={1}
                    max={90}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">
                    days
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  How long will it take to complete this project?
                </p>
              </div>
            )}
          </div>

          {/* Milestone Option */}
          {job.budget.type === 'fixed' && (
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useMilestones}
                  onChange={(e) => setUseMilestones(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="font-bold text-gray-900">
                  Break project into milestones (Recommended)
                </span>
              </label>
              <p className="text-sm text-gray-600 ml-7 mt-1">
                Milestones help manage payment releases as you complete different phases of the project
              </p>
            </div>
          )}

          {/* Milestones */}
          {useMilestones && (
            <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Project Milestones</h3>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                >
                  + Add Milestone
                </button>
              </div>

              <div className="space-y-4">
                {milestones.map((milestone, idx) => (
                  <div key={milestone.id} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900">Milestone {idx + 1}</h4>
                      {milestones.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMilestone(milestone.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={milestone.description}
                          onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                          placeholder="E.g., Initial design mockups"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Amount ($)
                          </label>
                          <input
                            type="number"
                            value={milestone.amount || ''}
                            onChange={(e) => updateMilestone(milestone.id, 'amount', Number(e.target.value))}
                            min={0}
                            placeholder="0"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Duration (days)
                          </label>
                          <input
                            type="number"
                            value={milestone.duration || ''}
                            onChange={(e) => updateMilestone(milestone.id, 'duration', Number(e.target.value))}
                            min={1}
                            placeholder="0"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Milestone Summary */}
              <div className="mt-4 bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">Total Amount:</span>
                  <span className={`text-xl font-bold ${totalMilestoneAmount === bidAmount ? 'text-green-600' : 'text-red-600'}`}>
                    ${totalMilestoneAmount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Total Duration:</span>
                  <span className="text-xl font-bold text-blue-600">{totalMilestoneDuration} days</span>
                </div>
                {totalMilestoneAmount !== bidAmount && (
                  <div className="mt-2 flex items-start gap-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Milestone amounts must equal your bid amount of ${bidAmount}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Terms Agreement */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-bold text-yellow-900 mb-2">Important Terms</h4>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>• All work must be delivered through the ZALPHA platform</li>
              <li>• Payment is held in escrow until work is approved</li>
              <li>• You agree to deliver work within the specified timeline</li>
              <li>• ZALPHA charges a 10% platform fee on all earnings</li>
              <li>• Disputes will be handled through ZALPHA mediation</li>
            </ul>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}