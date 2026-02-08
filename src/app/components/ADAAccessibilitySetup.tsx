import { useState } from 'react';
import { Accessibility, Brain, Briefcase, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

interface ADAAccessibilitySetupProps {
  userType: 'student' | 'employer';
  onComplete: (data: ADAData) => void;
}

interface ADAData {
  requiresAccommodations: boolean;
  
  // Physical Disabilities (Direct Assessment)
  hasPhysicalDisability: boolean;
  physicalLimitations: string[];
  mobilityLevel: 'full' | 'limited' | 'wheelchair' | 'bedridden';
  canCommute: boolean;
  needsRemoteOnly: boolean;
  
  // Cognitive/Intellectual Assessment (Direct)
  hasCognitiveDisability: boolean;
  intellectualLevel: 'standard' | 'learning-disability' | 'developmental-disability' | 'intellectual-disability';
  canReadWrite: 'fluent' | 'basic' | 'struggles' | 'cannot';
  mathAbility: 'advanced' | 'basic' | 'simple-only' | 'cannot';
  followsInstructions: 'complex' | 'simple' | 'visual-only' | 'needs-assistance';
  worksPaceLevel: 'fast' | 'average' | 'slow' | 'very-slow';
  
  // Mental Health (Direct)
  hasMentalHealthCondition: boolean;
  mentalHealthImpacts: string[];
  canHandleStress: 'high' | 'moderate' | 'low' | 'minimal';
  socialInteraction: 'comfortable' | 'manageable' | 'difficult' | 'avoid';
  
  // Sensory (Direct)
  hasSensoryDisability: boolean;
  visionLevel: 'normal' | 'glasses-needed' | 'low-vision' | 'blind';
  hearingLevel: 'normal' | 'hearing-aid' | 'hard-of-hearing' | 'deaf';
  needsScreenReader: boolean;
  needsCaptions: boolean;
  
  // Work Capability Assessment
  canWorkFullTime: boolean;
  hoursCapable: number;
  needsFrequentBreaks: boolean;
  canMeetDeadlines: 'always' | 'usually' | 'sometimes' | 'rarely';
  supervisionNeeded: 'independent' | 'occasional-check' | 'regular-supervision' | 'constant-supervision';
  
  // Income Sustainability
  canSustainIncome: 'yes-independently' | 'with-support' | 'unlikely' | 'no';
  currentIncomeSource: string[];
  receivesDisabilityBenefits: boolean;
  dependentOnFamily: boolean;
  financialGoal: string;
  
  // Job Matching Preferences
  jobTypePreference: 'remote-only' | 'hybrid' | 'in-person' | 'any';
  workEnvironmentNeeds: string[];
  accommodationsRequired: string[];
  
  // Honest Self-Assessment
  biggestWorkChallenge: string;
  strengthsAndAbilities: string;
  needsAdditionalTraining: boolean;
  trainingAreas: string[];
  realisticJobGoals: string;
}

export function ADAAccessibilitySetup({ userType, onComplete }: ADAAccessibilitySetupProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ADAData>({
    requiresAccommodations: false,
    hasPhysicalDisability: false,
    physicalLimitations: [],
    mobilityLevel: 'full',
    canCommute: true,
    needsRemoteOnly: false,
    hasCognitiveDisability: false,
    intellectualLevel: 'standard',
    canReadWrite: 'fluent',
    mathAbility: 'basic',
    followsInstructions: 'complex',
    worksPaceLevel: 'average',
    hasMentalHealthCondition: false,
    mentalHealthImpacts: [],
    canHandleStress: 'moderate',
    socialInteraction: 'comfortable',
    hasSensoryDisability: false,
    visionLevel: 'normal',
    hearingLevel: 'normal',
    needsScreenReader: false,
    needsCaptions: false,
    canWorkFullTime: true,
    hoursCapable: 40,
    needsFrequentBreaks: false,
    canMeetDeadlines: 'usually',
    supervisionNeeded: 'independent',
    canSustainIncome: 'yes-independently',
    currentIncomeSource: [],
    receivesDisabilityBenefits: false,
    dependentOnFamily: false,
    financialGoal: '',
    jobTypePreference: 'any',
    workEnvironmentNeeds: [],
    accommodationsRequired: [],
    biggestWorkChallenge: '',
    strengthsAndAbilities: '',
    needsAdditionalTraining: false,
    trainingAreas: [],
    realisticJobGoals: ''
  });

  const handleMultiSelect = (field: keyof ADAData, value: string) => {
    const current = data[field] as string[];
    if (current.includes(value)) {
      setData({ ...data, [field]: current.filter(v => v !== value) });
    } else {
      setData({ ...data, [field]: [...current, value] });
    }
  };

  const handleSubmit = () => {
    onComplete(data);
  };

  if (!data.requiresAccommodations && step === 0) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Accessibility className="w-10 h-10 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Accessibility & Accommodations</h2>
            <p className="text-gray-600">Help us match you with the right opportunities</p>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
          <p className="text-blue-900 leading-relaxed">
            <strong>Honest Assessment:</strong> We ask direct questions about your abilities and limitations 
            to match you with jobs where you can succeed. This is confidential and helps us find opportunities 
            that fit YOUR reality—not what sounds good on paper.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setData({ ...data, requiresAccommodations: true })}
            className="w-full p-6 border-2 border-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-left"
          >
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              Yes, I have a disability or need accommodations
            </h3>
            <p className="text-gray-700 text-sm">
              Complete honest assessment to get matched with suitable jobs and accommodations
            </p>
          </button>

          <button
            onClick={() => onComplete(data)}
            className="w-full p-6 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-left"
          >
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              No, I don't need accommodations
            </h3>
            <p className="text-gray-700 text-sm">
              Continue with standard job matching
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Accessibility className="w-10 h-10 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Honest Work Capability Assessment</h2>
          <p className="text-gray-600">Direct questions to match you with realistic opportunities</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Section {step + 1} of 6</span>
          <span>{Math.round(((step + 1) / 6) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-600 rounded-full transition-all"
            style={{ width: `${((step + 1) / 6) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto px-2">
        {/* Section 1: Physical Abilities */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
              <p className="text-orange-900 text-sm">
                <strong>Be Honest:</strong> These answers help us find jobs you can actually do. 
                Lying helps no one—we need to know your real abilities to match you properly.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have a physical disability or limitation?
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={!data.hasPhysicalDisability}
                    onChange={() => setData({ ...data, hasPhysicalDisability: false })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>No physical limitations</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={data.hasPhysicalDisability}
                    onChange={() => setData({ ...data, hasPhysicalDisability: true })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Yes, I have physical limitations</span>
                </label>
              </div>
            </div>

            {data.hasPhysicalDisability && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What are your physical limitations? (Check all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      'Cannot stand for long periods',
                      'Cannot lift heavy objects',
                      'Limited hand dexterity',
                      'Cannot walk long distances',
                      'Chronic pain affects work',
                      'Fatigue limits work hours',
                      'Requires frequent breaks',
                      'Cannot do repetitive motions'
                    ].map(limitation => (
                      <label key={limitation} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data.physicalLimitations.includes(limitation)}
                          onChange={() => handleMultiSelect('physicalLimitations', limitation)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm">{limitation}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobility Level (Be honest)
                  </label>
                  <select
                    value={data.mobilityLevel}
                    onChange={(e) => setData({ ...data, mobilityLevel: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="full">Full mobility - no issues</option>
                    <option value="limited">Limited mobility - can walk but slowly or with difficulty</option>
                    <option value="wheelchair">Wheelchair user</option>
                    <option value="bedridden">Bedridden or severely limited</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Can you commute to a workplace?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        checked={data.canCommute}
                        onChange={() => setData({ ...data, canCommute: true, needsRemoteOnly: false })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Yes, I can commute to work</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        checked={!data.canCommute}
                        onChange={() => setData({ ...data, canCommute: false, needsRemoteOnly: true })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>No, I need remote/work-from-home only</span>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Section 2: Intellectual/Cognitive Ability */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <p className="text-purple-900 text-sm">
                  <strong>Intellectual Assessment:</strong> We need to know your real learning and thinking abilities 
                  to match you with jobs you can handle. No judgment—just honest matching.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have a learning disability, developmental disability, or intellectual disability?
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={!data.hasCognitiveDisability}
                    onChange={() => setData({ ...data, hasCognitiveDisability: false, intellectualLevel: 'standard' })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>No, I learn and think at a standard level</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={data.hasCognitiveDisability}
                    onChange={() => setData({ ...data, hasCognitiveDisability: true })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Yes, I have a cognitive or learning disability</span>
                </label>
              </div>
            </div>

            {data.hasCognitiveDisability && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intellectual Level (Honest assessment)
                </label>
                <select
                  value={data.intellectualLevel}
                  onChange={(e) => setData({ ...data, intellectualLevel: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="standard">Standard - no significant limitations</option>
                  <option value="learning-disability">Learning disability - dyslexia, ADHD, processing issues</option>
                  <option value="developmental-disability">Developmental disability - slower learning, needs support</option>
                  <option value="intellectual-disability">Intellectual disability - significant limitations in learning/reasoning</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reading and Writing Ability
              </label>
              <select
                value={data.canReadWrite}
                onChange={(e) => setData({ ...data, canReadWrite: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="fluent">Fluent - can read/write complex documents</option>
                <option value="basic">Basic - can read/write simple text</option>
                <option value="struggles">Struggles - have difficulty with reading/writing</option>
                <option value="cannot">Cannot read or write independently</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Math Ability
              </label>
              <select
                value={data.mathAbility}
                onChange={(e) => setData({ ...data, mathAbility: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="advanced">Advanced - algebra, percentages, complex calculations</option>
                <option value="basic">Basic - addition, subtraction, basic math</option>
                <option value="simple-only">Simple only - can count, very basic math</option>
                <option value="cannot">Cannot do math independently</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Following Instructions
              </label>
              <select
                value={data.followsInstructions}
                onChange={(e) => setData({ ...data, followsInstructions: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="complex">Can follow complex multi-step instructions</option>
                <option value="simple">Can follow simple, clear instructions</option>
                <option value="visual-only">Need visual demonstrations, struggle with verbal</option>
                <option value="needs-assistance">Need constant assistance and reminders</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Pace
              </label>
              <select
                value={data.worksPaceLevel}
                onChange={(e) => setData({ ...data, worksPaceLevel: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="fast">Fast - work quickly and efficiently</option>
                <option value="average">Average - normal work speed</option>
                <option value="slow">Slow - need more time than others</option>
                <option value="very-slow">Very slow - need significantly more time</option>
              </select>
            </div>
          </div>
        )}

        {/* Section 3: Mental Health */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="text-green-900 text-sm">
                <strong>Mental Health Assessment:</strong> Mental health affects work performance. 
                Be honest so we can match you with jobs that fit your stress tolerance and social needs.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have a mental health condition that affects work?
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={!data.hasMentalHealthCondition}
                    onChange={() => setData({ ...data, hasMentalHealthCondition: false })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>No mental health issues affecting work</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={data.hasMentalHealthCondition}
                    onChange={() => setData({ ...data, hasMentalHealthCondition: true })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Yes, mental health affects my work ability</span>
                </label>
              </div>
            </div>

            {data.hasMentalHealthCondition && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How does mental health impact your work? (Check all that apply)
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      'Anxiety makes it hard to focus',
                      'Depression affects motivation and energy',
                      'Panic attacks interrupt work',
                      'PTSD triggers from certain situations',
                      'Mood swings affect reliability',
                      'Social anxiety makes teamwork difficult',
                      'Need mental health days regularly',
                      'Medication affects alertness/energy'
                    ].map(impact => (
                      <label key={impact} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data.mentalHealthImpacts.includes(impact)}
                          onChange={() => handleMultiSelect('mentalHealthImpacts', impact)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm">{impact}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stress Tolerance
              </label>
              <select
                value={data.canHandleStress}
                onChange={(e) => setData({ ...data, canHandleStress: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="high">High - thrive under pressure, deadlines don't bother me</option>
                <option value="moderate">Moderate - can handle normal workplace stress</option>
                <option value="low">Low - stress affects me, need calm environment</option>
                <option value="minimal">Minimal - cannot handle stress, need very low-pressure job</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Interaction Comfort
              </label>
              <select
                value={data.socialInteraction}
                onChange={(e) => setData({ ...data, socialInteraction: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="comfortable">Comfortable - enjoy working with people</option>
                <option value="manageable">Manageable - can handle social interaction when needed</option>
                <option value="difficult">Difficult - social situations drain me</option>
                <option value="avoid">Avoid - need minimal people contact</option>
              </select>
            </div>
          </div>
        )}

        {/* Section 4: Sensory */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vision Level
              </label>
              <select
                value={data.visionLevel}
                onChange={(e) => setData({ ...data, visionLevel: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="normal">Normal vision (with or without glasses)</option>
                <option value="glasses-needed">Need strong prescription glasses</option>
                <option value="low-vision">Low vision - legally blind but can see some</option>
                <option value="blind">Blind - cannot see</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hearing Level
              </label>
              <select
                value={data.hearingLevel}
                onChange={(e) => setData({ ...data, hearingLevel: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="normal">Normal hearing</option>
                <option value="hearing-aid">Use hearing aid</option>
                <option value="hard-of-hearing">Hard of hearing - significant difficulty</option>
                <option value="deaf">Deaf - cannot hear</option>
              </select>
            </div>

            {(data.visionLevel === 'low-vision' || data.visionLevel === 'blind') && (
              <div>
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={data.needsScreenReader}
                    onChange={(e) => setData({ ...data, needsScreenReader: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>I need screen reader support</span>
                </label>
              </div>
            )}

            {(data.hearingLevel === 'hard-of-hearing' || data.hearingLevel === 'deaf') && (
              <div>
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={data.needsCaptions}
                    onChange={(e) => setData({ ...data, needsCaptions: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>I need captions/subtitles for videos</span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Section 5: Work Capability & Income Sustainability */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                <p className="text-yellow-900 text-sm">
                  <strong>Work Reality Check:</strong> Can you actually work full-time? Can you sustain yourself financially? 
                  We need honest answers to help you succeed.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Can you work full-time (40 hours/week)?
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={data.canWorkFullTime}
                    onChange={() => setData({ ...data, canWorkFullTime: true, hoursCapable: 40 })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Yes, I can work 40+ hours per week</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={!data.canWorkFullTime}
                    onChange={() => setData({ ...data, canWorkFullTime: false })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>No, I can only work part-time</span>
                </label>
              </div>
            </div>

            {!data.canWorkFullTime && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many hours per week can you realistically work?
                </label>
                <input
                  type="number"
                  value={data.hoursCapable}
                  onChange={(e) => setData({ ...data, hoursCapable: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="40"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Deadlines
              </label>
              <select
                value={data.canMeetDeadlines}
                onChange={(e) => setData({ ...data, canMeetDeadlines: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="always">Always meet deadlines</option>
                <option value="usually">Usually meet deadlines</option>
                <option value="sometimes">Sometimes struggle with deadlines</option>
                <option value="rarely">Rarely meet deadlines</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supervision Needed
              </label>
              <select
                value={data.supervisionNeeded}
                onChange={(e) => setData({ ...data, supervisionNeeded: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="independent">Independent - work on my own</option>
                <option value="occasional-check">Occasional check-ins needed</option>
                <option value="regular-supervision">Regular supervision required</option>
                <option value="constant-supervision">Constant supervision needed</option>
              </select>
            </div>

            <div className="border-t-2 border-gray-200 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900">Income Sustainability</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Can you sustain yourself financially with work income?
                </label>
                <select
                  value={data.canSustainIncome}
                  onChange={(e) => setData({ ...data, canSustainIncome: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="yes-independently">Yes - I can support myself independently</option>
                  <option value="with-support">With family/government support, yes</option>
                  <option value="unlikely">Unlikely - will always need significant help</option>
                  <option value="no">No - cannot sustain income even with help</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Current Income Sources (Check all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'Full-time job',
                  'Part-time job',
                  'Disability benefits (SSI/SSDI)',
                  'Family support',
                  'Government assistance',
                  'No current income'
                ].map(source => (
                  <label key={source} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.currentIncomeSource.includes(source)}
                      onChange={() => handleMultiSelect('currentIncomeSource', source)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={data.receivesDisabilityBenefits}
                  onChange={(e) => setData({ ...data, receivesDisabilityBenefits: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>I receive disability benefits (SSI, SSDI, etc.)</span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={data.dependentOnFamily}
                  onChange={(e) => setData({ ...data, dependentOnFamily: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>I am financially dependent on family</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Financial Goal (Be realistic)
              </label>
              <textarea
                value={data.financialGoal}
                onChange={(e) => setData({ ...data, financialGoal: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Example: Supplement disability benefits with part-time income, or become fully independent..."
              />
            </div>
          </div>
        )}

        {/* Section 6: Job Matching & Self-Assessment */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <p className="text-blue-900 text-sm">
                <strong>Final Assessment:</strong> Help us match you with jobs you can actually succeed at. 
                Be honest about your challenges and strengths.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type Preference
              </label>
              <select
                value={data.jobTypePreference}
                onChange={(e) => setData({ ...data, jobTypePreference: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="remote-only">Remote/work-from-home only</option>
                <option value="hybrid">Hybrid - some remote, some in-person</option>
                <option value="in-person">In-person only</option>
                <option value="any">Any - I'm flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Work Environment Needs (Check all that apply)
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Quiet workspace - sensitive to noise',
                  'Flexible schedule - need irregular hours',
                  'Minimal supervision - work independently',
                  'Structured environment - need clear routine',
                  'No customer-facing - avoid public interaction',
                  'Accessible facilities - wheelchair/mobility',
                  'Work from home option',
                  'Frequent breaks allowed'
                ].map(need => (
                  <label key={need} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.workEnvironmentNeeds.includes(need)}
                      onChange={() => handleMultiSelect('workEnvironmentNeeds', need)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm">{need}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your BIGGEST work challenge? (Be honest)
              </label>
              <textarea
                value={data.biggestWorkChallenge}
                onChange={(e) => setData({ ...data, biggestWorkChallenge: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Example: I struggle to focus for long periods, or I get anxious around customers, or I work very slowly..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your STRENGTHS and abilities? (What CAN you do well?)
              </label>
              <textarea
                value={data.strengthsAndAbilities}
                onChange={(e) => setData({ ...data, strengthsAndAbilities: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Example: I'm great with computers, or I'm very reliable and punctual, or I'm good with my hands..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you need additional training or education to work?
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={!data.needsAdditionalTraining}
                    onChange={() => setData({ ...data, needsAdditionalTraining: false })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>No, I'm ready to work now</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={data.needsAdditionalTraining}
                    onChange={() => setData({ ...data, needsAdditionalTraining: true })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Yes, I need training first</span>
                </label>
              </div>
            </div>

            {data.needsAdditionalTraining && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What areas do you need training in?
                </label>
                <textarea
                  value={data.trainingAreas.join(', ')}
                  onChange={(e) => setData({ ...data, trainingAreas: e.target.value.split(',').map(s => s.trim()) })}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Example: Basic computer skills, customer service, specific job skills..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Realistic Job Goals (What jobs do you think you can actually do?)
              </label>
              <textarea
                value={data.realisticJobGoals}
                onChange={(e) => setData({ ...data, realisticJobGoals: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Example: Data entry from home, stocking shelves, simple assembly work, phone support..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex gap-4">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        )}
        
        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-colors shadow-lg"
          >
            Complete Assessment & Get Matched
          </button>
        )}
      </div>
    </div>
  );
}
