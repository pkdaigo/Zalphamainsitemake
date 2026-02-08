import { useState } from 'react';
import { Heart, Brain, Briefcase, DollarSign, Lightbulb, Target } from 'lucide-react';

interface PeopleWithDisabilitiesBetaQuestionnaireProps {
  onComplete: (data: any) => void;
}

export function PeopleWithDisabilitiesBetaQuestionnaire({ onComplete }: PeopleWithDisabilitiesBetaQuestionnaireProps) {
  const [responses, setResponses] = useState({
    // Disability Information (Direct & Honest)
    hasDisability: '',
    disabilityType: [] as string[],
    disabilityDescription: '',
    howItAffectsWork: '',
    needsAccommodations: '',
    specificAccommodations: '',
    
    // Intellectual Ability Assessment
    educationLevel: '',
    canReadWrite: '',
    mathAbility: '',
    problemSolvingAbility: '',
    learningSpeed: '',
    computerSkills: '',
    canFollowInstructions: '',
    canWorkIndependently: '',
    
    // Job Matching & Income Potential
    currentlyEmployed: '',
    employmentHistory: '',
    canWorkFullTime: '',
    canWorkRemote: '',
    transportationAccess: '',
    reliableInternet: '',
    typesOfJobsCanDo: [] as string[],
    wageExpectations: '',
    canSustainIncome: '',
    needsFinancialSupport: '',
    
    // Work Capabilities (Honest Assessment)
    physicalLimitations: '',
    mentalHealthChallenges: '',
    socialSkillsLevel: '',
    canHandleStress: '',
    attendanceReliability: '',
    canMeetDeadlines: '',
    needsSupervision: '',
    
    // Platform Accessibility Needs
    visionImpairment: '',
    hearingImpairment: '',
    mobilityImpairment: '',
    cognitiveImpairment: '',
    needsScreenReader: '',
    needsLargerText: '',
    needsHighContrast: '',
    needsKeyboardNav: '',
    needsVoiceCommands: '',
    
    // Goals & Support
    employmentGoals: '',
    incomeSustainabilityPlan: '',
    whatHelpNeeded: '',
    concernsAboutWorking: '',
    strengthsToOffer: '',
    
    // Platform Feedback
    canNavigatePlatform: '',
    whatIsDifficult: '',
    whatImprovementsNeeded: '',
    additionalComments: ''
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
          <Heart className="w-6 h-6 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-900">People with Disabilities Beta Testing Program 💜</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          This program is designed to understand your unique needs and help match you with jobs that fit your abilities and interests. 
          Your responses will help us create better support systems and opportunities. 
          <strong className="text-purple-700"> All questions are optional. Share only what you're comfortable with.</strong>
        </p>
        <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
          <p className="text-yellow-900 font-bold text-sm">
            ✨ <strong>EVERY QUESTION IS OPTIONAL!</strong> You can skip ANY question you don't want to answer. 
            We respect your privacy and comfort level.
          </p>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <p className="text-blue-900 text-sm">
            <strong>♿ ADA Web Accessibility Standards:</strong> We're working to meet ADA compliance standards including 
            proper target sizes (minimum 44x44px), color contrast ratios (WCAG AA), keyboard focus indicators, and screen reader support. 
            <strong className="text-blue-800"> We apologize if we're missing any critical accessibility features—we're in beta testing phase 
            and actively improving based on your feedback!</strong>
          </p>
        </div>
      </div>

      {/* Section 1: Disability Information (Direct & Honest) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-bold text-gray-900">About Your Disability</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you have a disability that affects your ability to work?
          </label>
          <select
            value={responses.hasDisability}
            onChange={(e) => handleChange('hasDisability', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="yes">Yes, I have a disability</option>
            <option value="no">No disability</option>
            <option value="prefer-not-say">Prefer not to say</option>
          </select>
        </div>

        {responses.hasDisability === 'yes' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What type of disability do you have? (Check all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Physical disability (mobility, paralysis)',
                  'Visual impairment (blind, low vision)',
                  'Hearing impairment (deaf, hard of hearing)',
                  'Intellectual disability',
                  'Learning disability (dyslexia, etc.)',
                  'Mental health condition (depression, anxiety, etc.)',
                  'Autism or developmental disorder',
                  'Chronic illness (diabetes, epilepsy, etc.)',
                  'Brain injury or neurological condition',
                  'Speech impairment',
                  'Multiple disabilities',
                  'Other'
                ].map(type => (
                  <label key={type} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={responses.disabilityType.includes(type)}
                      onChange={() => handleMultiSelect('disabilityType', type)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your disability in your own words
              </label>
              <textarea
                value={responses.disabilityDescription}
                onChange={(e) => handleChange('disabilityDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Share what you'd like us to know about your disability..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How does your disability affect your ability to work?
              </label>
              <textarea
                value={responses.howItAffectsWork}
                onChange={(e) => handleChange('howItAffectsWork', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="E.g., need flexible hours, require breaks, prefer remote work, physical limitations..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you need workplace accommodations?
              </label>
              <select
                value={responses.needsAccommodations}
                onChange={(e) => handleChange('needsAccommodations', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select one...</option>
                <option value="yes">Yes, I need accommodations</option>
                <option value="no">No accommodations needed</option>
                <option value="not-sure">Not sure what I need</option>
              </select>
            </div>

            {responses.needsAccommodations === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What specific accommodations do you need?
                </label>
                <textarea
                  value={responses.specificAccommodations}
                  onChange={(e) => handleChange('specificAccommodations', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Wheelchair access, screen reader, flexible hours, job coach, etc."
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Section 2: Intellectual Ability Assessment */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-bold text-gray-900">Skills & Education Background</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What is your highest level of education?
          </label>
          <select
            value={responses.educationLevel}
            onChange={(e) => handleChange('educationLevel', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="some-elementary">Some elementary school</option>
            <option value="elementary">Elementary school graduate</option>
            <option value="some-high-school">Some high school</option>
            <option value="high-school">High school graduate or GED</option>
            <option value="some-college">Some college</option>
            <option value="associates">Associate's degree</option>
            <option value="bachelors">Bachelor's degree</option>
            <option value="graduate">Graduate degree</option>
            <option value="vocational">Vocational/trade school</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Can you read and write well?
          </label>
          <select
            value={responses.canReadWrite}
            onChange={(e) => handleChange('canReadWrite', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="advanced">Yes, very well - no issues</option>
            <option value="good">Yes, pretty well - minor issues</option>
            <option value="basic">Basic reading/writing - need help sometimes</option>
            <option value="limited">Limited - struggle with reading/writing</option>
            <option value="cannot">No, I cannot read or write</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are your math skills?
          </label>
          <select
            value={responses.mathAbility}
            onChange={(e) => handleChange('mathAbility', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="advanced">Advanced - can do algebra, statistics, etc.</option>
            <option value="good">Good - can handle most calculations</option>
            <option value="basic">Basic - can add, subtract, multiply, divide</option>
            <option value="limited">Limited - struggle with numbers</option>
            <option value="none">Cannot do math</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How good are you at solving problems?
          </label>
          <select
            value={responses.problemSolvingAbility}
            onChange={(e) => handleChange('problemSolvingAbility', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="excellent">Excellent - I figure things out easily</option>
            <option value="good">Good - can handle most problems</option>
            <option value="average">Average - need some guidance</option>
            <option value="struggle">Struggle - need a lot of help</option>
            <option value="need-support">Cannot solve problems alone</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How fast do you learn new things?
          </label>
          <select
            value={responses.learningSpeed}
            onChange={(e) => handleChange('learningSpeed', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="very-fast">Very fast - pick things up quickly</option>
            <option value="fast">Fast - learn with minimal help</option>
            <option value="average">Average - need normal training time</option>
            <option value="slow">Slow - need extra time and repetition</option>
            <option value="very-slow">Very slow - need lots of help and time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are your computer skills?
          </label>
          <select
            value={responses.computerSkills}
            onChange={(e) => handleChange('computerSkills', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="advanced">Advanced - coding, technical work</option>
            <option value="proficient">Proficient - comfortable with most software</option>
            <option value="basic">Basic - email, internet, simple programs</option>
            <option value="limited">Limited - need help with computers</option>
            <option value="none">No computer skills</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Can you follow instructions well?
          </label>
          <select
            value={responses.canFollowInstructions}
            onChange={(e) => handleChange('canFollowInstructions', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="excellent">Yes, very well - I get it the first time</option>
            <option value="good">Yes, pretty well - might need clarification</option>
            <option value="okay">Okay - need things explained carefully</option>
            <option value="struggle">Struggle - need step-by-step help</option>
            <option value="need-support">Need constant supervision</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Can you work independently without supervision?
          </label>
          <select
            value={responses.canWorkIndependently}
            onChange={(e) => handleChange('canWorkIndependently', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="completely">Yes, completely independent</option>
            <option value="mostly">Mostly - need occasional check-ins</option>
            <option value="some">Somewhat - need regular supervision</option>
            <option value="limited">Limited - need frequent supervision</option>
            <option value="no">No, I need constant supervision</option>
          </select>
        </div>
      </div>

      {/* Section 3: Job Matching & Income Potential */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-green-600" />
          <h4 className="text-lg font-bold text-gray-900">Job Matching & Income Sustainability</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Are you currently employed?
          </label>
          <select
            value={responses.currentlyEmployed}
            onChange={(e) => handleChange('currentlyEmployed', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="yes-full-time">Yes, full-time</option>
            <option value="yes-part-time">Yes, part-time</option>
            <option value="no">No, not employed</option>
            <option value="volunteer">Volunteer work only</option>
            <option value="supported">Supported employment program</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your employment history?
          </label>
          <textarea
            value={responses.employmentHistory}
            onChange={(e) => handleChange('employmentHistory', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Previous jobs, duration, types of work you've done..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Can you work full-time (40 hours/week)?
          </label>
          <select
            value={responses.canWorkFullTime}
            onChange={(e) => handleChange('canWorkFullTime', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="yes">Yes, can work 40+ hours</option>
            <option value="30-35">Can work 30-35 hours</option>
            <option value="20-30">Can work 20-30 hours</option>
            <option value="less-20">Can only work less than 20 hours</option>
            <option value="no">No, cannot work regular hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Can you work remotely from home?
          </label>
          <select
            value={responses.canWorkRemote}
            onChange={(e) => handleChange('canWorkRemote', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="yes-prefer">Yes, I prefer remote work</option>
            <option value="yes">Yes, I can work remotely</option>
            <option value="no-need-in-person">No, I need in-person support</option>
            <option value="no-distractions">No, too many distractions at home</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you have reliable transportation to get to work?
          </label>
          <select
            value={responses.transportationAccess}
            onChange={(e) => handleChange('transportationAccess', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="own-car">I have my own car</option>
            <option value="family-rides">Family gives me rides</option>
            <option value="public-transport">I use public transportation</option>
            <option value="walk-bike">I walk or bike</option>
            <option value="no-transportation">No reliable transportation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you have reliable internet at home?
          </label>
          <select
            value={responses.reliableInternet}
            onChange={(e) => handleChange('reliableInternet', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="yes-high-speed">Yes, high-speed internet</option>
            <option value="yes-slow">Yes, but slow sometimes</option>
            <option value="mobile-only">Mobile phone data only</option>
            <option value="no">No internet at home</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What types of work are you interested in? (Check all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Data entry / typing',
              'Customer service (phone/chat)',
              'Cleaning / janitorial',
              'Stocking / warehouse work',
              'Food service / kitchen help',
              'Retail / cashier',
              'Assembly / packaging',
              'Yard work / landscaping',
              'Office administrative work',
              'Computer programming',
              'Graphic design / creative',
              'Writing / content creation',
              'Social media management',
              'Childcare / caregiving',
              'Pet care / animal services',
              'Simple manual labor',
              'Not sure / need help figuring out'
            ].map(job => (
              <label key={job} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={responses.typesOfJobsCanDo.includes(job)}
                  onChange={() => handleMultiSelect('typesOfJobsCanDo', job)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{job}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are your wage expectations?
          </label>
          <select
            value={responses.wageExpectations}
            onChange={(e) => handleChange('wageExpectations', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="minimum">Minimum wage is fine ($7.25/hr)</option>
            <option value="10-12">$10-12/hour</option>
            <option value="12-15">$12-15/hour</option>
            <option value="15-20">$15-20/hour</option>
            <option value="20+">$20+/hour</option>
            <option value="not-sure">Not sure what's realistic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Can you sustain independent income from a job?
          </label>
          <select
            value={responses.canSustainIncome}
            onChange={(e) => handleChange('canSustainIncome', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="yes-fully">Yes, I can fully support myself</option>
            <option value="yes-with-help">Yes, with some family/government help</option>
            <option value="partial">Partially - need ongoing support</option>
            <option value="no">No, I need full financial support</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you currently receive disability benefits or financial support?
          </label>
          <select
            value={responses.needsFinancialSupport}
            onChange={(e) => handleChange('needsFinancialSupport', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="ssi-ssdi">Yes, SSI/SSDI disability benefits</option>
            <option value="family-support">Yes, family supports me</option>
            <option value="government-assistance">Yes, other government assistance</option>
            <option value="no">No, I support myself</option>
            <option value="prefer-not-say">Prefer not to say</option>
          </select>
        </div>
      </div>

      {/* Section 4: Work Support Needs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-orange-600" />
          <h4 className="text-lg font-bold text-gray-900">Work Support Needs</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are your physical limitations?
          </label>
          <textarea
            value={responses.physicalLimitations}
            onChange={(e) => handleChange('physicalLimitations', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="E.g., limited standing, lifting restrictions, mobility needs..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you have mental health challenges that affect work?
          </label>
          <textarea
            value={responses.mentalHealthChallenges}
            onChange={(e) => handleChange('mentalHealthChallenges', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Anxiety, depression, PTSD, panic attacks, mood swings, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are your social skills?
          </label>
          <select
            value={responses.socialSkillsLevel}
            onChange={(e) => handleChange('socialSkillsLevel', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="excellent">Excellent - I'm very social</option>
            <option value="good">Good - comfortable with people</option>
            <option value="okay">Okay - prefer minimal interaction</option>
            <option value="struggle">Struggle - find social situations hard</option>
            <option value="poor">Poor - avoid people if possible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Can you handle work stress and pressure?
          </label>
          <select
            value={responses.canHandleStress}
            onChange={(e) => handleChange('canHandleStress', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="yes-well">Yes, I handle stress well</option>
            <option value="yes-okay">Yes, but it's challenging</option>
            <option value="limited">Limited - I get overwhelmed easily</option>
            <option value="no">No, I break down under pressure</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How reliable is your attendance?
          </label>
          <select
            value={responses.attendanceReliability}
            onChange={(e) => handleChange('attendanceReliability', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="very-reliable">Very reliable - rarely miss work</option>
            <option value="reliable">Reliable - occasional absences</option>
            <option value="okay">Okay - miss work sometimes</option>
            <option value="unreliable">Unreliable - miss work often</option>
            <option value="very-unreliable">Very unreliable - hard to show up consistently</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Can you meet deadlines?
          </label>
          <select
            value={responses.canMeetDeadlines}
            onChange={(e) => handleChange('canMeetDeadlines', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="always">Yes, always meet deadlines</option>
            <option value="usually">Usually meet deadlines</option>
            <option value="sometimes">Sometimes - struggle with time management</option>
            <option value="rarely">Rarely meet deadlines</option>
            <option value="need-help">Need help managing deadlines</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you need ongoing supervision at work?
          </label>
          <select
            value={responses.needsSupervision}
            onChange={(e) => handleChange('needsSupervision', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="no">No, I work independently</option>
            <option value="occasional">Occasional check-ins helpful</option>
            <option value="regular">Need regular supervision</option>
            <option value="frequent">Need frequent supervision</option>
            <option value="constant">Need constant supervision/job coach</option>
          </select>
        </div>
      </div>

      {/* Section 5: Platform Accessibility Needs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <h4 className="text-lg font-bold text-gray-900">Platform Accessibility Features You Need</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vision impairment level
            </label>
            <select
              value={responses.visionImpairment}
              onChange={(e) => handleChange('visionImpairment', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="none">No vision issues</option>
              <option value="mild">Mild - need glasses</option>
              <option value="moderate">Moderate - low vision</option>
              <option value="severe">Severe - legally blind</option>
              <option value="blind">Completely blind</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hearing impairment level
            </label>
            <select
              value={responses.hearingImpairment}
              onChange={(e) => handleChange('hearingImpairment', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="none">No hearing issues</option>
              <option value="mild">Mild - hard of hearing</option>
              <option value="moderate">Moderate - need hearing aids</option>
              <option value="severe">Severe - very limited hearing</option>
              <option value="deaf">Completely deaf</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobility impairment level
            </label>
            <select
              value={responses.mobilityImpairment}
              onChange={(e) => handleChange('mobilityImpairment', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="none">No mobility issues</option>
              <option value="mild">Mild - can walk with difficulty</option>
              <option value="moderate">Moderate - use cane/walker</option>
              <option value="wheelchair">Use wheelchair</option>
              <option value="bedridden">Bedridden/very limited</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cognitive impairment level
            </label>
            <select
              value={responses.cognitiveImpairment}
              onChange={(e) => handleChange('cognitiveImpairment', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="none">No cognitive issues</option>
              <option value="mild">Mild - minor learning difficulties</option>
              <option value="moderate">Moderate - noticeable challenges</option>
              <option value="severe">Severe - significant limitations</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What accessibility features do you need? (Check all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { value: 'needsScreenReader', label: 'Screen reader (for blind users)' },
              { value: 'needsLargerText', label: 'Larger text size options' },
              { value: 'needsHighContrast', label: 'High contrast mode' },
              { value: 'needsKeyboardNav', label: 'Keyboard-only navigation' },
              { value: 'needsVoiceCommands', label: 'Voice commands / speech input' }
            ].map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-yellow-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={responses[value as keyof typeof responses] === 'yes'}
                  onChange={(e) => handleChange(value, e.target.checked ? 'yes' : 'no')}
                  className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Section 6: Goals & Support */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-green-600" />
          <h4 className="text-lg font-bold text-gray-900">Your Goals & What You Need</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are your employment goals?
          </label>
          <textarea
            value={responses.employmentGoals}
            onChange={(e) => handleChange('employmentGoals', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="What do you hope to achieve through employment? Career goals, income goals, skill development..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How do you plan to sustain independent income?
          </label>
          <textarea
            value={responses.incomeSustainabilityPlan}
            onChange={(e) => handleChange('incomeSustainabilityPlan', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Work full-time? Part-time with benefits? Start business? Need ongoing support?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What help do you need to succeed at work?
          </label>
          <textarea
            value={responses.whatHelpNeeded}
            onChange={(e) => handleChange('whatHelpNeeded', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Job coach, transportation assistance, training, flexible schedule, understanding employer..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are your biggest concerns about working?
          </label>
          <textarea
            value={responses.concernsAboutWorking}
            onChange={(e) => handleChange('concernsAboutWorking', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="What concerns do you have about finding or maintaining employment?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are your STRENGTHS that employers should know?
          </label>
          <textarea
            value={responses.strengthsToOffer}
            onChange={(e) => handleChange('strengthsToOffer', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Reliable, hard worker, detail-oriented, honest, loyal, eager to learn..."
          />
        </div>
      </div>

      {/* Section 7: Platform Feedback */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-bold text-gray-900">Platform Feedback</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Can you navigate this platform easily?
          </label>
          <select
            value={responses.canNavigatePlatform}
            onChange={(e) => handleChange('canNavigatePlatform', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="very-easy">Very easy - no problems</option>
            <option value="easy">Easy - figured it out</option>
            <option value="okay">Okay - needed some help</option>
            <option value="difficult">Difficult - confusing</option>
            <option value="very-difficult">Very difficult - can't use it</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What is difficult or confusing about this platform?
          </label>
          <textarea
            value={responses.whatIsDifficult}
            onChange={(e) => handleChange('whatIsDifficult', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Too much text, buttons too small, can't read it, too complicated..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What improvements would help you?
          </label>
          <textarea
            value={responses.whatImprovementsNeeded}
            onChange={(e) => handleChange('whatImprovementsNeeded', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Bigger buttons, audio descriptions, simpler language, video tutorials..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anything else we should know?
          </label>
          <textarea
            value={responses.additionalComments}
            onChange={(e) => handleChange('additionalComments', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Your story, challenges, hopes, or anything else..."
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6 border-t border-gray-200">
        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong className="text-purple-700">💜 Thank You:</strong> This information helps us match you 
            with opportunities that align with your abilities and interests. Your responses are confidential and help us build 
            better support systems for people with disabilities.
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
        >
          Complete Person with Disabilities Beta & Continue 🚀
        </button>
      </div>
    </div>
  );
}