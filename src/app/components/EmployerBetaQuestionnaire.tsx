import { useState } from 'react';
import { Building2, Target, TrendingUp, Users, Lightbulb, MapPin } from 'lucide-react';

interface EmployerBetaQuestionnaireProps {
  onComplete: (data: any) => void;
}

export function EmployerBetaQuestionnaire({ onComplete }: EmployerBetaQuestionnaireProps) {
  const [responses, setResponses] = useState({
    // Business Context & Goals
    businessStage: '',
    primaryGoal: '',
    hiringChallenges: [] as string[],
    growthPlans: '',
    
    // Regional Connection
    businessRoots: '',
    localCommitment: '',
    culturalConsiderations: '',
    islandChallenges: '',
    
    // Financial Context (Smart/Non-Intrusive)
    hiringFrequency: '',
    budgetApproach: '',
    investmentPriority: '',
    costConcerns: '',
    
    // Hiring Philosophy
    idealCandidate: '',
    skillsVsExperience: '',
    trainingWillingness: '',
    diversityApproach: '',
    
    // Platform Feedback
    criticalFeature: '',
    successMetrics: '',
    concernsOrBarriers: '',
    additionalInsights: ''
  });

  const handleChange = (field: string, value: any) => {
    setResponses({ ...responses, [field]: value });
  };

  const handleMultiSelect = (field: string, value: string) => {
    const current = responses[field as keyof typeof responses] as string[];
    if (current.includes(value)) {
      handleChange(field, current.filter(v => v !== value));
    } else {
      handleChange(field, [...current, value]);
    }
  };

  const handleSubmit = () => {
    onComplete(responses);
  };

  return (
    <div className="space-y-8 max-h-[70vh] overflow-y-auto px-2">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-3">
          <Building2 className="w-6 h-6 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-900">Welcome to the Beta Partnership! 🎉</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          You're not just signing up—you're shaping ZALPHA with us! These questions help us understand YOUR business needs 
          so we can build features that actually solve your hiring challenges. Be candid—there are no wrong answers. 
          <strong className="text-purple-700"> Skip anything you prefer not to share!</strong>
        </p>
      </div>

      {/* Section 1: Business Goals & Stage */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-bold text-gray-900">Your Business Journey</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Where is your business right now?
          </label>
          <select
            value={responses.businessStage}
            onChange={(e) => handleChange('businessStage', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="startup">Just getting started (0-2 years)</option>
            <option value="growing">Growing steadily (3-5 years)</option>
            <option value="established">Well-established (5-10 years)</option>
            <option value="mature">Long-standing business (10+ years)</option>
            <option value="expanding">Rapid expansion phase</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your #1 business goal right now?
          </label>
          <textarea
            value={responses.primaryGoal}
            onChange={(e) => handleChange('primaryGoal', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Expand operations, improve service quality, reduce turnover, find reliable staff..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What are your biggest hiring challenges? (Check all that apply) 🎯
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Finding qualified candidates',
              'High turnover rates',
              'Limited applicant pool',
              'Time-consuming screening',
              'No-shows for interviews',
              'Skills gaps in candidates',
              'Expensive recruiting costs',
              'Training new hires',
              'Verifying qualifications',
              'Cultural fit concerns'
            ].map(challenge => (
              <label key={challenge} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={responses.hiringChallenges.includes(challenge)}
                  onChange={() => handleMultiSelect('hiringChallenges', challenge)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{challenge}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are your growth plans for the next 1-2 years?
          </label>
          <textarea
            value={responses.growthPlans}
            onChange={(e) => handleChange('growthPlans', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Open new location, double staff, expand services, enter new markets..."
          />
        </div>
      </div>

      {/* Section 2: Regional Roots & Commitment */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-green-600" />
          <h4 className="text-lg font-bold text-gray-900">Your Connection to the Islands</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tell us about your business roots—are you locally owned, family business, established here?
          </label>
          <textarea
            value={responses.businessRoots}
            onChange={(e) => handleChange('businessRoots', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Born and raised here, moved here 10 years ago, family business for 3 generations..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How do you see your business contributing to the local community?
          </label>
          <textarea
            value={responses.localCommitment}
            onChange={(e) => handleChange('localCommitment', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Creating local jobs, supporting youth employment, giving back to community..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any cultural considerations that are important in how you run your business?
          </label>
          <textarea
            value={responses.culturalConsiderations}
            onChange={(e) => handleChange('culturalConsiderations', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Family values, respect for traditions, multilingual workplace, community-first approach..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What unique challenges do you face operating a business in the Pacific Islands?
          </label>
          <textarea
            value={responses.islandChallenges}
            onChange={(e) => handleChange('islandChallenges', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Limited talent pool, shipping costs, seasonal tourism, small market size..."
          />
        </div>
      </div>

      {/* Section 3: Hiring Approach & Financial Context */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-orange-600" />
          <h4 className="text-lg font-bold text-gray-900">Your Hiring Strategy</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How often do you typically hire new employees?
          </label>
          <select
            value={responses.hiringFrequency}
            onChange={(e) => handleChange('hiringFrequency', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="constantly">Constantly hiring (high turnover or growth)</option>
            <option value="monthly">Several times per month</option>
            <option value="quarterly">Every few months</option>
            <option value="annually">Once or twice a year</option>
            <option value="rarely">Only when someone leaves</option>
            <option value="first-time">This will be my first hires</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How do you approach hiring investments?
          </label>
          <select
            value={responses.budgetApproach}
            onChange={(e) => handleChange('budgetApproach', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="willing-invest">Willing to invest for the right tools</option>
            <option value="cost-conscious">Cost-conscious but value quality</option>
            <option value="budget-limited">Operating on a tight budget</option>
            <option value="roi-focused">ROI-focused—must prove value first</option>
            <option value="flexible">Flexible depending on results</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            When investing in hiring tools, what matters most?
          </label>
          <select
            value={responses.investmentPriority}
            onChange={(e) => handleChange('investmentPriority', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="quality">Quality of candidates</option>
            <option value="time">Time savings</option>
            <option value="cost">Affordability</option>
            <option value="local">Local/regional focus</option>
            <option value="ease">Ease of use</option>
            <option value="results">Proven results</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What concerns you most about hiring platform costs?
          </label>
          <textarea
            value={responses.costConcerns}
            onChange={(e) => handleChange('costConcerns', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Paying for features I won't use, getting locked into long contracts, hidden fees..."
          />
        </div>
      </div>

      {/* Section 4: Hiring Philosophy */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-pink-600" />
          <h4 className="text-lg font-bold text-gray-900">Your Hiring Values</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your ideal candidate—what really matters to you?
          </label>
          <textarea
            value={responses.idealCandidate}
            onChange={(e) => handleChange('idealCandidate', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Reliable, eager to learn, good attitude, cultural fit, specific skills..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills vs. Experience: Which is more important to you?
          </label>
          <select
            value={responses.skillsVsExperience}
            onChange={(e) => handleChange('skillsVsExperience', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="skills">Skills matter more—I can train them</option>
            <option value="experience">Experience is crucial—need them ready to go</option>
            <option value="attitude">Attitude matters most—everything else can be learned</option>
            <option value="balance">A good balance of both</option>
            <option value="depends">Depends on the position</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How willing are you to train and develop employees?
          </label>
          <select
            value={responses.trainingWillingness}
            onChange={(e) => handleChange('trainingWillingness', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="very-willing">Very willing—I see it as an investment</option>
            <option value="willing">Willing for the right person</option>
            <option value="some">Some training okay, but need baseline skills</option>
            <option value="minimal">Minimal—need people who can hit the ground running</option>
            <option value="depends">Depends on the role</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How do you approach diversity and giving opportunities to first-time workers?
          </label>
          <textarea
            value={responses.diversityApproach}
            onChange={(e) => handleChange('diversityApproach', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Open to giving youth their first chance, value diverse backgrounds, skills-based hiring..."
          />
        </div>
      </div>

      {/* Section 5: Help Us Build ZALPHA */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <h4 className="text-lg font-bold text-gray-900">Shape ZALPHA With Us</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's the ONE feature that would make ZALPHA absolutely critical for your business?
          </label>
          <textarea
            value={responses.criticalFeature}
            onChange={(e) => handleChange('criticalFeature', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Verified skill assessments, fast candidate matching, reduced no-shows..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you measure if ZALPHA is successful for your business?
          </label>
          <textarea
            value={responses.successMetrics}
            onChange={(e) => handleChange('successMetrics', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Hire within 2 weeks, reduce turnover, save time screening, find better-fit candidates..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any concerns or barriers that might prevent you from using ZALPHA long-term?
          </label>
          <textarea
            value={responses.concernsOrBarriers}
            onChange={(e) => handleChange('concernsOrBarriers', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Cost, learning curve, candidate quality, competition with other platforms..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any additional insights about hiring in the Pacific Islands we should know?
          </label>
          <textarea
            value={responses.additionalInsights}
            onChange={(e) => handleChange('additionalInsights', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Share your experiences, challenges, ideas—your perspective is invaluable!"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6 border-t border-gray-200">
        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong className="text-purple-700">🤝 Confidential Partnership:</strong> This information helps our team build 
            features that solve YOUR challenges. It's confidential and never shared publicly. Skip any questions you prefer 
            not to answer—we appreciate whatever you're comfortable sharing!
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
        >
          Complete Beta Partnership & Continue 🚀
        </button>
      </div>
    </div>
  );
}
