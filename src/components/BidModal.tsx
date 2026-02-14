import { useState } from 'react';
import { DollarSign, Clock, FileText, Send, X, Github, ExternalLink, Code, Star } from 'lucide-react';

interface BidModalProps {
  jobTitle: string;
  jobBudget: number;
  jobCurrency: string;
  onClose: () => void;
  onSubmit: (bidData: BidData) => void;
}

export interface BidData {
  amount: number;
  currency: string;
  deliveryTime: string;
  proposal: string;
  portfolio?: string;
  githubUsername?: string;
  githubRepos?: string[];
}

export function BidModal({ jobTitle, jobBudget, jobCurrency, onClose, onSubmit }: BidModalProps) {
  const [bidAmount, setBidAmount] = useState(jobBudget.toString());
  const [deliveryTime, setDeliveryTime] = useState('');
  const [proposal, setProposal] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [showGithubSection, setShowGithubSection] = useState(false);

  // Mock GitHub data (in real app, this would come from GitHub API)
  const mockGithubRepos = [
    { name: 'e-commerce-platform', stars: 45, language: 'React', description: 'Full-stack e-commerce with Stripe' },
    { name: 'mobile-app-portfolio', stars: 23, language: 'React Native', description: 'Cross-platform mobile apps' },
    { name: 'pacific-tourism-site', stars: 67, language: 'Next.js', description: 'Tourism website for CNMI' },
    { name: 'social-media-dashboard', stars: 12, language: 'Vue.js', description: 'Analytics dashboard' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(bidAmount),
      currency: jobCurrency,
      deliveryTime,
      proposal,
      portfolio,
      githubUsername: showGithubSection ? githubUsername : undefined,
      githubRepos: showGithubSection ? selectedRepos : undefined
    });
  };

  const toggleRepo = (repoName: string) => {
    setSelectedRepos(prev => 
      prev.includes(repoName) 
        ? prev.filter(r => r !== repoName)
        : [...prev, repoName]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Place Your Bid</h2>
              <p className="text-blue-100">{jobTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Budget Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 mb-1">Client's Budget</p>
            <p className="text-2xl font-bold text-blue-900">
              {jobCurrency === 'USD' ? '$' : ''}{jobBudget.toLocaleString()}
              {jobCurrency !== 'USD' && ` ${jobCurrency}`}
            </p>
          </div>

          {/* Your Bid Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Bid Amount *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                required
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                step="0.01"
                min="1"
                className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your bid"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                {jobCurrency}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              💡 Tip: Competitive bids have higher chances of winning
            </p>
          </div>

          {/* Delivery Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Time *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="e.g., 3 weeks, 5 days, 2 months"
              />
            </div>
          </div>

          {/* Proposal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Proposal *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                required
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                rows={6}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Explain why you're the best fit for this project. Include your relevant experience, approach, and any questions..."
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {proposal.length}/1000 characters
            </p>
          </div>

          {/* Portfolio/Samples (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Portfolio or Work Samples (Optional)
            </label>
            <input
              type="url"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="https://yourportfolio.com or link to relevant work"
            />
          </div>

          {/* GitHub Section (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Username (Optional)
            </label>
            <input
              type="text"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter your GitHub username"
            />
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setShowGithubSection(!showGithubSection)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {showGithubSection ? 'Hide GitHub Repos' : 'Show GitHub Repos'}
            </button>
          </div>
          {showGithubSection && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Select Repositories</h4>
              <div className="grid grid-cols-2 gap-4">
                {mockGithubRepos.map(repo => (
                  <div
                    key={repo.name}
                    className={`p-4 border rounded-lg ${selectedRepos.includes(repo.name) ? 'border-blue-500' : 'border-gray-300'}`}
                    onClick={() => toggleRepo(repo.name)}
                  >
                    <div className="flex items-center">
                      <Github className="w-5 h-5 text-gray-500" />
                      <span className="ml-2 text-sm font-medium">{repo.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {repo.description}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="ml-1 text-xs text-gray-500">{repo.stars} stars</span>
                      <Code className="w-4 h-4 text-gray-500 ml-2" />
                      <span className="ml-1 text-xs text-gray-500">{repo.language}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-3">Bid Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Your Bid:</span>
                <span className="font-semibold text-gray-900">
                  {jobCurrency === 'USD' ? '$' : ''}{parseFloat(bidAmount || '0').toLocaleString()}
                  {jobCurrency !== 'USD' && ` ${jobCurrency}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee:</span>
                <span className="font-semibold text-green-600">0% (FREE)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Time:</span>
                <span className="font-semibold text-gray-900">{deliveryTime || 'Not set'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-green-200">
                <span className="font-semibold text-gray-900">You'll Receive:</span>
                <span className="font-bold text-lg text-green-600">
                  {jobCurrency === 'USD' ? '$' : ''}{parseFloat(bidAmount || '0').toLocaleString()}
                  {jobCurrency !== 'USD' && ` ${jobCurrency}`}
                </span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2 text-sm">How It Works</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>✓ Your bid will be reviewed by the employer</li>
              <li>✓ If accepted, funds are released from escrow when work is completed</li>
              <li>✓ You can withdraw your bid anytime before it's accepted</li>
              <li>✓ Payment is instant via USD or cryptocurrency</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}