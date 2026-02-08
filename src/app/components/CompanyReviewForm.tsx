import { useState } from 'react';
import { Star, AlertCircle, CheckCircle } from 'lucide-react';

interface CompanyReviewFormProps {
  companyName: string;
  onSubmit: (review: Review) => void;
  onCancel: () => void;
}

export interface Review {
  id: string;
  studentName: string;
  companyName: string;
  position: string;
  workPeriod: string;
  overallRating: number;
  workEnvironmentRating: number;
  learningOpportunitiesRating: number;
  managementRating: number;
  compensationRating: number;
  workLifeBalanceRating: number;
  wouldRecommend: boolean;
  pros: string;
  cons: string;
  advice: string;
  isVerified: boolean;
  isAnonymous: boolean;
  flagCount: number;
  createdAt: string;
}

export function CompanyReviewForm({ companyName, onSubmit, onCancel }: CompanyReviewFormProps) {
  const [studentName, setStudentName] = useState('');
  const [position, setPosition] = useState('');
  const [workPeriod, setWorkPeriod] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Ratings
  const [overallRating, setOverallRating] = useState(0);
  const [workEnvironmentRating, setWorkEnvironmentRating] = useState(0);
  const [learningOpportunitiesRating, setLearningOpportunitiesRating] = useState(0);
  const [managementRating, setManagementRating] = useState(0);
  const [compensationRating, setCompensationRating] = useState(0);
  const [workLifeBalanceRating, setWorkLifeBalanceRating] = useState(0);
  
  // Text feedback
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [advice, setAdvice] = useState('');

  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName || !position || !workPeriod || overallRating === 0 || wouldRecommend === null) {
      alert('Please fill in all required fields');
      return;
    }

    setShowVerification(true);
  };

  const handleVerificationConfirm = () => {
    const review: Review = {
      id: Date.now().toString(),
      studentName: isAnonymous ? 'Anonymous' : studentName,
      companyName,
      position,
      workPeriod,
      overallRating,
      workEnvironmentRating,
      learningOpportunitiesRating,
      managementRating,
      compensationRating,
      workLifeBalanceRating,
      wouldRecommend: wouldRecommend!,
      pros,
      cons,
      advice,
      isVerified: false, // Will be verified by admin
      isAnonymous,
      flagCount: 0,
      createdAt: new Date().toISOString(),
    };

    onSubmit(review);
  };

  const StarRating = ({ rating, setRating, label }: { rating: number; setRating: (n: number) => void; label: string }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-slate-600">
          {rating > 0 ? `${rating}/5` : 'Not rated'}
        </span>
      </div>
    </div>
  );

  if (showVerification) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <AlertCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Review</h3>
          <p className="text-slate-600">
            Before submitting, please confirm you actually worked at {companyName}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900 mb-3">
            <strong>Why verification matters:</strong>
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Protects the integrity of our community</li>
            <li>• Ensures honest, accurate feedback</li>
            <li>• Holds companies accountable fairly</li>
            <li>• Your review will be flagged as "Pending Verification"</li>
          </ul>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-slate-900">I worked at {companyName}</p>
              <p className="text-sm text-slate-600">Position: {position}</p>
              <p className="text-sm text-slate-600">Period: {workPeriod}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <p className="text-sm text-slate-700">
              I understand that ZALPHA admins may contact me to verify my employment
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <p className="text-sm text-slate-700">
              My review is honest and based on my actual experience
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowVerification(false)}
            className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={handleVerificationConfirm}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm & Submit Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Review {companyName}
        </h2>
        <p className="text-slate-600">
          Share your experience to help other students and hold companies accountable
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              disabled={isAnonymous}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
              placeholder="Enter your name"
              required={!isAnonymous}
            />
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-600">Post anonymously</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Position/Role *
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Marketing Intern"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Work Period *
            </label>
            <input
              type="text"
              value={workPeriod}
              onChange={(e) => setWorkPeriod(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Jan 2024 - Jun 2024"
              required
            />
          </div>
        </div>

        {/* Overall Rating */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Overall Rating *</h3>
          <StarRating 
            rating={overallRating} 
            setRating={setOverallRating} 
            label="How would you rate your overall experience?"
          />
        </div>

        {/* Detailed Ratings */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Detailed Ratings</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <StarRating 
              rating={workEnvironmentRating} 
              setRating={setWorkEnvironmentRating} 
              label="Work Environment"
            />
            <StarRating 
              rating={learningOpportunitiesRating} 
              setRating={setLearningOpportunitiesRating} 
              label="Learning Opportunities"
            />
            <StarRating 
              rating={managementRating} 
              setRating={setManagementRating} 
              label="Management & Leadership"
            />
            <StarRating 
              rating={compensationRating} 
              setRating={setCompensationRating} 
              label="Compensation & Benefits"
            />
            <StarRating 
              rating={workLifeBalanceRating} 
              setRating={setWorkLifeBalanceRating} 
              label="Work-Life Balance"
            />
          </div>
        </div>

        {/* Recommendation */}
        <div className="border-t pt-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Would you recommend this company to other students? *
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setWouldRecommend(true)}
              className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${
                wouldRecommend === true
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              Yes, I recommend
            </button>
            <button
              type="button"
              onClick={() => setWouldRecommend(false)}
              className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${
                wouldRecommend === false
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              No, I don't recommend
            </button>
          </div>
        </div>

        {/* Written Feedback */}
        <div className="border-t pt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What were the pros of working here?
            </label>
            <textarea
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What did you like about working at this company?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What were the cons of working here?
            </label>
            <textarea
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What challenges did you face?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Advice for other students considering this company
            </label>
            <textarea
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What should future applicants know?"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="border-t pt-6 flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}