import { useState } from 'react';
import { GraduationCap, Users, Target, TrendingUp, Lightbulb, Building2 } from 'lucide-react';

interface CareerServicesBetaQuestionnaireProps {
  onComplete: (data: any) => void;
}

export function CareerServicesBetaQuestionnaire({ onComplete }: CareerServicesBetaQuestionnaireProps) {
  const [responses, setResponses] = useState({
    // Institution & Role
    institutionName: '',
    institutionType: '',
    yourRole: '',
    yearsInCareerServices: '',
    studentsServed: '',
    
    // Current Challenges
    biggestChallenges: [] as string[],
    employerRelationships: '',
    studentEngagement: '',
    placementSuccessRate: '',
    limitingFactors: '',
    
    // What You're Looking For
    idealPlatformFeatures: [] as string[],
    successMetrics: '',
    dealBreakers: '',
    budgetReality: '',
    
    // Student Demographics & Needs
    studentDemographics: '',
    commonBarriers: '',
    inDemandFields: '',
    employerNeeds: '',
    
    // Regional Context
    islandChallenges: '',
    localEmployerTypes: [] as string[],
    retentionConcerns: '',
    culturalConsiderations: '',
    
    // Platform Integration
    currentTools: '',
    integrationNeeds: '',
    dataTrackingNeeds: '',
    reportingNeeds: '',
    
    // Partnership Vision
    howZalphaHelps: '',
    collaborationInterest: '',
    concernsOrQuestions: '',
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
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap className="w-6 h-6 text-green-600" />
          <h3 className="text-2xl font-bold text-gray-900">Career Services Beta Partnership 🎓</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          You're at the frontline of student success! Your insights will help us build features that actually solve 
          the challenges YOU face daily. Be candid—we're here to support your work, not add to it.
          <strong className="text-green-700"> Skip anything you prefer not to share!</strong>
        </p>
      </div>

      {/* Section 1: Your Institution & Role */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-bold text-gray-900">About Your Institution</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Name
          </label>
          <input
            type="text"
            value={responses.institutionName}
            onChange={(e) => handleChange('institutionName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Northern Marianas College, University of Guam, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Type
          </label>
          <select
            value={responses.institutionType}
            onChange={(e) => handleChange('institutionType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="community-college">Community College</option>
            <option value="four-year-university">Four-Year University</option>
            <option value="vocational-technical">Vocational/Technical School</option>
            <option value="high-school">High School Career Center</option>
            <option value="workforce-development">Workforce Development Center</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Role
          </label>
          <input
            type="text"
            value={responses.yourRole}
            onChange={(e) => handleChange('yourRole', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Career Services Director, Counselor, Job Placement Coordinator..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years in Career Services
            </label>
            <select
              value={responses.yearsInCareerServices}
              onChange={(e) => handleChange('yearsInCareerServices', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="<1">Less than 1 year</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Students Served Annually
            </label>
            <select
              value={responses.studentsServed}
              onChange={(e) => handleChange('studentsServed', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="<50">Less than 50</option>
              <option value="50-100">50-100</option>
              <option value="100-250">100-250</option>
              <option value="250-500">250-500</option>
              <option value="500-1000">500-1,000</option>
              <option value="1000+">1,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Current Challenges */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-red-600" />
          <h4 className="text-lg font-bold text-gray-900">Your Current Challenges</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What are your BIGGEST challenges right now? (Check all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Limited employer connections',
              'Low student engagement',
              'Tracking student outcomes',
              'Verifying job placements',
              'Students lack interview skills',
              'Resume quality issues',
              'Students don\'t use our services',
              'Employer ghosting/no response',
              'Limited budget for tools',
              'Staff bandwidth constraints',
              'Hard to match students to jobs',
              'Students leave the islands'
            ].map(challenge => (
              <label key={challenge} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={responses.biggestChallenges.includes(challenge)}
                  onChange={() => handleMultiSelect('biggestChallenges', challenge)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{challenge}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you describe your employer relationships?
          </label>
          <textarea
            value={responses.employerRelationships}
            onChange={(e) => handleChange('employerRelationships', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Strong with a few key partners but limited reach, mostly reactive, struggling to build new connections..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What percentage of your students actively engage with career services?
          </label>
          <select
            value={responses.studentEngagement}
            onChange={(e) => handleChange('studentEngagement', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="<10%">Less than 10%</option>
            <option value="10-25%">10-25%</option>
            <option value="25-50%">25-50%</option>
            <option value="50-75%">50-75%</option>
            <option value="75%+">75% or more</option>
            <option value="unknown">We don't track this</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your current job placement success rate (if tracked)?
          </label>
          <select
            value={responses.placementSuccessRate}
            onChange={(e) => handleChange('placementSuccessRate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="<25%">Less than 25%</option>
            <option value="25-50%">25-50%</option>
            <option value="50-75%">50-75%</option>
            <option value="75-90%">75-90%</option>
            <option value="90%+">90% or higher</option>
            <option value="unknown">We don't track this</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's the #1 thing limiting your effectiveness right now?
          </label>
          <textarea
            value={responses.limitingFactors}
            onChange={(e) => handleChange('limitingFactors', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Lack of employer engagement, no tracking system, students don't show up, limited staff..."
          />
        </div>
      </div>

      {/* Section 3: What You're Looking For */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <h4 className="text-lg font-bold text-gray-900">What You Need from ZALPHA</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Which features would be most valuable to you? (Check all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Verified employer network',
              'Student placement tracking',
              'Automated outcome reporting',
              'Interview practice tools',
              'Resume builder integration',
              'Employer matching algorithm',
              'Virtual career fair hosting',
              'Skills assessment data',
              'Student engagement metrics',
              'White-label branding options',
              'Direct employer communication',
              'Job posting dashboard'
            ].map(feature => (
              <label key={feature} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-yellow-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={responses.idealPlatformFeatures.includes(feature)}
                  onChange={() => handleMultiSelect('idealPlatformFeatures', feature)}
                  className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you measure if ZALPHA is successful for your institution?
          </label>
          <textarea
            value={responses.successMetrics}
            onChange={(e) => handleChange('successMetrics', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Increased placements, better employer engagement, easier outcome tracking, student satisfaction..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What would be a deal-breaker? (What would make you NOT use this platform?)
          </label>
          <textarea
            value={responses.dealBreakers}
            onChange={(e) => handleChange('dealBreakers', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Too expensive, too complicated, students won't use it, no data ownership..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Let's be real about budget—what's your reality?
          </label>
          <select
            value={responses.budgetReality}
            onChange={(e) => handleChange('budgetReality', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="free-only">Must be free—zero budget</option>
            <option value="minimal">Very limited ($500-$1,000/year)</option>
            <option value="moderate">Moderate ($1,000-$5,000/year)</option>
            <option value="flexible">Flexible if we see ROI</option>
            <option value="grant-funded">Grant-funded—different process</option>
            <option value="institutional">Part of institutional license</option>
          </select>
        </div>
      </div>

      {/* Section 4: Student Demographics & Needs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-bold text-gray-900">Your Students & Their Needs</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your student demographics
          </label>
          <textarea
            value={responses.studentDemographics}
            onChange={(e) => handleChange('studentDemographics', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Mostly Pacific Islander, 18-25 age range, first-generation college, working students..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are the most common barriers your students face getting jobs?
          </label>
          <textarea
            value={responses.commonBarriers}
            onChange={(e) => handleChange('commonBarriers', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Lack of experience, poor interview skills, transportation, limited job openings, competition with H-2 workers..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What fields or industries are most in-demand for your students?
          </label>
          <input
            type="text"
            value={responses.inDemandFields}
            onChange={(e) => handleChange('inDemandFields', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Hospitality, healthcare, education, government, retail..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What do local employers tell you they need in candidates?
          </label>
          <textarea
            value={responses.employerNeeds}
            onChange={(e) => handleChange('employerNeeds', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Reliability, soft skills, customer service, technical skills, bilingual ability..."
          />
        </div>
      </div>

      {/* Section 5: Regional Context */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          <h4 className="text-lg font-bold text-gray-900">Island-Specific Context</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What unique challenges do you face serving students in the Pacific Islands?
          </label>
          <textarea
            value={responses.islandChallenges}
            onChange={(e) => handleChange('islandChallenges', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Small job market, students leave for mainland, seasonal economy, limited employers, geographic isolation..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What types of local employers do you work with? (Check all that apply)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Hotels & Resorts',
              'Restaurants & Food Service',
              'Retail Stores',
              'Healthcare Facilities',
              'Government Agencies',
              'Schools & Education',
              'Construction Companies',
              'Tourism & Activities',
              'Financial Services',
              'Small Local Businesses',
              'Non-Profits',
              'Very few/none'
            ].map(type => (
              <label key={type} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-teal-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={responses.localEmployerTypes.includes(type)}
                  onChange={() => handleMultiSelect('localEmployerTypes', type)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How do you address the "brain drain" issue—students leaving the islands?
          </label>
          <textarea
            value={responses.retentionConcerns}
            onChange={(e) => handleChange('retentionConcerns', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="We emphasize local opportunities, promote island pride, can't compete with mainland pay..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any cultural considerations important to your work?
          </label>
          <textarea
            value={responses.culturalConsiderations}
            onChange={(e) => handleChange('culturalConsiderations', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Family obligations, respect for elders, island time, community connections matter more than resumes..."
          />
        </div>
      </div>

      {/* Section 6: Platform Integration */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-orange-600" />
          <h4 className="text-lg font-bold text-gray-900">Technical & Integration Needs</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What tools/systems do you currently use?
          </label>
          <input
            type="text"
            value={responses.currentTools}
            onChange={(e) => handleChange('currentTools', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Handshake, spreadsheets, email, student information system..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you need ZALPHA to integrate with your existing systems?
          </label>
          <textarea
            value={responses.integrationNeeds}
            onChange={(e) => handleChange('integrationNeeds', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Yes, need SSO integration, student data sync, reporting integration..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What data do you NEED to track for compliance/reporting?
          </label>
          <textarea
            value={responses.dataTrackingNeeds}
            onChange={(e) => handleChange('dataTrackingNeeds', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Job placement rates, employer engagement, student participation, outcomes by major..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What kind of reporting would make your life easier?
          </label>
          <textarea
            value={responses.reportingNeeds}
            onChange={(e) => handleChange('reportingNeeds', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Annual outcome reports, real-time dashboards, employer feedback summaries..."
          />
        </div>
      </div>

      {/* Section 7: Partnership Vision */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-pink-600" />
          <h4 className="text-lg font-bold text-gray-900">Let's Build This Together</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            In your ideal world, how would ZALPHA help YOU do your job better?
          </label>
          <textarea
            value={responses.howZalphaHelps}
            onChange={(e) => handleChange('howZalphaHelps', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Save time on manual tracking, increase student engagement, expand employer network, prove our value to administration..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Would you be interested in ongoing collaboration (feedback sessions, feature testing, case studies)?
          </label>
          <select
            value={responses.collaborationInterest}
            onChange={(e) => handleChange('collaborationInterest', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="very-interested">Yes, very interested!</option>
            <option value="interested">Yes, depending on time commitment</option>
            <option value="maybe">Maybe—tell me more</option>
            <option value="prefer-passive">I'd prefer to just use the platform</option>
            <option value="no-time">No time for additional commitments</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any concerns, questions, or things we should know?
          </label>
          <textarea
            value={responses.concernsOrQuestions}
            onChange={(e) => handleChange('concernsOrQuestions', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Data privacy concerns, FERPA compliance, worried about student adoption, integration complexity..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anything else you want us to know about your work, challenges, or vision?
          </label>
          <textarea
            value={responses.additionalInsights}
            onChange={(e) => handleChange('additionalInsights', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Share your story, insights, or ideas—we're all ears!"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6 border-t border-gray-200">
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong className="text-green-700">🤝 Partnership Confidentiality:</strong> This information helps us build 
            features that truly support your work. It's confidential and only used to improve ZALPHA for career services 
            professionals. Skip any questions you're not comfortable answering!
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
        >
          Complete Beta Partnership & Continue 🚀
        </button>
      </div>
    </div>
  );
}
