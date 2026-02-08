import { useState } from 'react';
import { Users, Briefcase, School, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import * as api from '@/utils/api';

interface BetaTesterApplicationProps {
  onNavigate: (page: string) => void;
  userType?: 'student' | 'employer' | 'career-services' | 'ada';
}

export function BetaTesterApplication({ onNavigate, userType = 'student' }: BetaTesterApplicationProps) {
  const [selectedType, setSelectedType] = useState<'student' | 'employer' | 'career-services' | 'ada'>(userType);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Common fields
    fullName: '',
    email: '',
    phone: '',
    age: '',
    
    // WhatsApp & Communication
    whatsappNumber: '',
    whatsappOptIn: '',
    
    // Location fields
    country: '',
    island: '',
    state: '',
    city: '',
    zipcode: '',
    cnmiVillage: '',
    
    // Relocation Plans
    planToRelocate: '',
    relocationDestination: '',
    mainlandUSLocation: '',
    
    // Universal Basic Income & Remote Work
    believeInUBI: '',
    ubiReasoning: '',
    interestedInRemoteWork: '',
    
    // Voter Information
    registeredVoter: '',
    planToVoteNovember: '',
    
    // Employment & Community Perspectives
    currentOrPastWork: '',
    hardToFindWork: '',
    whyHardToFindWork: '',
    cw1ProgramExtension: '',
    cw1ExtensionReason: '',
    economyBlame: '',
    departmentResponsible: [] as string[],
    
    // Education Interest & Identity
    interestedInSchool: '',
    schoolType: '',
    selfIdentify: '',
    
    // Student-specific
    currentEducation: '',
    major: '',
    graduationYear: '',
    currentGPA: '',
    computerSkills: '',
    internetQuality: '',
    devicesOwned: [] as string[],
    hoursPerWeek: '',
    jobSearchStage: '',
    topChallenges: [] as string[],
    featurePriorities: [] as string[],
    
    // Employer-specific
    companyName: '',
    industry: '',
    companySize: '',
    hiringVolume: '',
    currentRecruitingTools: '',
    biggestHiringChallenges: '',
    willingToInterview: '',
    
    // Career Services-specific
    institutionName: '',
    institutionType: '',
    studentsServed: '',
    currentTools: '',
    budgetRange: '',
    implementationTimeline: '',
    
    // ADA-specific
    disabilityType: [] as string[],
    accommodationsNeeded: '',
    assistiveTech: '',
    primaryBarriers: '',
    employmentGoals: '',
    
    // Why beta test
    whyBetaTest: '',
    previousBetaExperience: '',
    timeCommitment: '',
    feedbackWillingness: '',
    
    // Additional
    howHeardAbout: '',
    referralCode: '',
    additionalComments: '',
    
    // Auto-captured fields
    signupDate: new Date().toISOString(),
    signupLocation: '',
    specificLocation: '' // For job fair location, person's name who referred, etc.
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: string, value: string) => {
    const current = formData[field as keyof typeof formData] as string[];
    if (current.includes(value)) {
      handleChange(field, current.filter(v => v !== value));
    } else {
      handleChange(field, [...current, value]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      console.log('🔄 Submitting beta application for:', formData.email);
      
      // Submit to backend
      const result = await api.submitBetaApplication(selectedType, formData);
      
      console.log('✅ Beta Application submitted successfully:', result);
      console.log('✅ Application ID:', result.applicationId);
      console.log('✅ Storage verified:', result.verified);
      
      if (!result.verified) {
        throw new Error('Application storage verification failed. Please try again.');
      }
      
      setSubmitted(true);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('❌ Beta application submission error:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ✅ Application Securely Received! 🎉
            </h1>
            
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-6">
              <p className="text-lg font-bold text-green-900 mb-2">
                🔒 Your data has been encrypted and securely stored
              </p>
              <p className="text-sm text-green-800">
                All information you provided is confidential and protected with enterprise-grade encryption. Your privacy is our priority.
              </p>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              Thank you for applying to be a ZALPHA beta tester! We've received your application and will review it within 2-3 business days.
            </p>
            
            {/* Application Details */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5 mb-8">
              <h3 className="font-bold text-blue-900 mb-3 text-lg">📋 Application Details</h3>
              <div className="text-left space-y-2 text-gray-700">
                <p><strong>Submitted:</strong> {new Date(formData.signupDate).toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}</p>
                <p><strong>Your Location:</strong> {formData.signupLocation || 'Not provided'}</p>
                {formData.howHeardAbout && (
                  <p><strong>How you heard about us:</strong> {
                    formData.howHeardAbout === 'job-fair-onsite' ? '🎪 Job Fair (Onsite/In-Person)' :
                    formData.howHeardAbout === 'virtual-job-fair' ? '💻 Virtual Job Fair' :
                    formData.howHeardAbout === 'career-fair' ? '🎓 Career Fair at School' :
                    formData.howHeardAbout === 'friend-told-me' ? '👥 Friend/Family Told Me' :
                    formData.howHeardAbout === 'colleague-told-me' ? '💼 Colleague/Coworker Told Me' :
                    formData.howHeardAbout
                  }</p>
                )}
                {formData.specificLocation && (
                  <p><strong>Details:</strong> {formData.specificLocation}</p>
                )}
                {formData.referralCode && (
                  <p><strong>Referral Code:</strong> {formData.referralCode}</p>
                )}
                {formData.planToRelocate && formData.planToRelocate !== '' && (
                  <>
                    <p><strong>Relocation Plans:</strong> {
                      formData.planToRelocate === 'yes-definitely' ? 'Yes - Definitely planning to relocate' :
                      formData.planToRelocate === 'yes-probably' ? 'Yes - Probably will relocate' :
                      formData.planToRelocate === 'maybe' ? 'Maybe - Considering it' :
                      formData.planToRelocate === 'no' ? 'No - Planning to stay in CNMI' :
                      formData.planToRelocate === 'unsure' ? 'Unsure at this time' :
                      'Prefer not to say'
                    }</p>
                    {formData.relocationDestination && (
                      <p><strong>Destination:</strong> {
                        formData.relocationDestination === 'guam' ? '🏝️ Guam' :
                        formData.relocationDestination === 'mainland-us' ? '🇺🇸 Mainland United States' :
                        formData.relocationDestination === 'hawaii' ? '🌺 Hawaii' :
                        formData.relocationDestination === 'other-pacific' ? '🌊 Other Pacific Islands' :
                        formData.relocationDestination === 'asia' ? '🌏 Asia' :
                        formData.relocationDestination === 'other-international' ? '🌍 Other International' :
                        'Undecided'
                      }</p>
                    )}
                    {formData.mainlandUSLocation && (
                      <p><strong>US Location:</strong> {formData.mainlandUSLocation}</p>
                    )}
                  </>
                )}
                {formData.believeInUBI && formData.believeInUBI !== '' && (
                  <>
                    <p><strong>Universal Basic Income View:</strong> {
                      formData.believeInUBI === 'yes' ? '✅ Supports UBI' :
                      formData.believeInUBI === 'no' ? '❌ Does not support UBI' :
                      formData.believeInUBI === 'maybe' ? '🤔 Maybe - Not sure' :
                      formData.believeInUBI === 'dont-care' ? '🤷 No opinion' :
                      'Prefer not to say'
                    }</p>
                    {formData.ubiReasoning && (
                      <p><strong>UBI Reasoning:</strong> {formData.ubiReasoning}</p>
                    )}
                  </>
                )}
                {formData.interestedInRemoteWork && formData.interestedInRemoteWork !== '' && (
                  <p><strong>Remote Work Interest:</strong> {
                    formData.interestedInRemoteWork === 'yes-very' ? '⭐ Very interested' :
                    formData.interestedInRemoteWork === 'yes-somewhat' ? '✅ Somewhat interested' :
                    formData.interestedInRemoteWork === 'maybe' ? '❓ Maybe - Want to learn more' :
                    formData.interestedInRemoteWork === 'no-prefer-local' ? '🏢 Prefer local work' :
                    formData.interestedInRemoteWork === 'no-not-interested' ? '❌ Not interested' :
                    formData.interestedInRemoteWork === 'already-doing' ? '💼 Already doing remote work' :
                    formData.interestedInRemoteWork
                  }</p>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border-2 border-purple-300">
              <h3 className="font-bold text-purple-900 mb-4 text-2xl">🎁 Your Beta Tester Rewards!</h3>
              <div className="text-left space-y-4 text-gray-700">
                <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                  <p className="text-xl font-bold text-purple-700 mb-2">🌟 6 MONTHS OF PREMIUM ACCESS - FREE!</p>
                  <p className="text-sm text-gray-600">Full access to all premium features, job matching, AI chatbot Zee, virtual job fairs, and more!</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-pink-200">
                  <p className="text-xl font-bold text-pink-700 mb-2">🎁 EXCLUSIVE GIFT SURPRISES!</p>
                  <p className="text-sm text-gray-600">Beta testers receive special gifts and surprises as a thank you for helping us build ZALPHA!</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">What Happens Next?</h3>
              <div className="text-left space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">1️⃣</span>
                  <p><strong>Review Process (2-3 days):</strong> Our team reviews your application against our beta criteria</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">2️⃣</span>
                  <p><strong>Notification via Email {formData.whatsappOptIn === 'yes' && '& WhatsApp'}:</strong> You'll receive an acceptance notification at <strong>{formData.email}</strong>{formData.whatsappOptIn === 'yes' && formData.whatsappNumber && <> and <strong>{formData.whatsappNumber}</strong></>}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">3️⃣</span>
                  <p><strong>Beta Access Setup:</strong> If accepted, you'll get login credentials and onboarding instructions</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">4️⃣</span>
                  <p><strong>6 Months FREE Premium:</strong> Start exploring the platform with full premium features!</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">5️⃣</span>
                  <p><strong>Gift Surprises:</strong> Receive your exclusive beta tester gifts throughout the program!</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-5 mb-8">
              <p className="font-bold text-orange-900 text-lg mb-3">
                📬 IMPORTANT: Keep Checking Your Messages!
              </p>
              <div className="text-left space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <span>📧</span>
                  <span><strong>Email:</strong> Check <strong>{formData.email}</strong> regularly (including spam/junk folders)</span>
                </p>
                {formData.whatsappOptIn === 'yes' && formData.whatsappNumber && (
                  <p className="flex items-center gap-2">
                    <span>💬</span>
                    <span><strong>WhatsApp:</strong> Watch for messages at <strong>{formData.whatsappNumber}</strong></span>
                  </p>
                )}
                <p className="text-sm text-orange-800 mt-3 bg-orange-100 p-3 rounded-lg">
                  ⚠️ Make sure to respond to our messages within 48 hours to confirm your beta access!
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('landing')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Back to Home
              </button>
              <button
                onClick={() => onNavigate('demo-showcase')}
                className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
              >
                Explore Platform Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <BackButton onNavigate={onNavigate} label="Back to Home" />
        
        {/* Header */}
        <div className="text-center mb-8 mt-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Apply to Join Our Beta Testing Program
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Be among the first to experience ZALPHA and help shape the future of Pacific Island job connections! 
            <strong className="text-blue-600"> Get 6 months of premium access FREE!</strong>
          </p>
        </div>

        {/* Privacy & Security Statement */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🔒</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900 mb-2">Your Privacy is Protected</h3>
              <p className="text-gray-700 mb-3">
                All information you provide is <strong>confidential and encrypted</strong> with enterprise-grade security. Your data is securely stored and will never be shared without your permission.
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-2">
                  ✅ <strong>Enterprise-grade encryption</strong> protects all your data
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  ✅ <strong>FERPA compliant</strong> - Your educational data is protected
                </p>
                <p className="text-sm text-gray-600">
                  ✅ <strong>You control</strong> what employers and schools see
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900 mb-1">Submission Failed</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* User Type Selection */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">I am applying as a:</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedType('student')}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedType === 'student'
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <Users className={`w-8 h-8 mx-auto mb-2 ${selectedType === 'student' ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="font-bold text-gray-900">Student</div>
              <div className="text-xs text-gray-500 mt-1">Job seeker</div>
            </button>
            
            <button
              onClick={() => setSelectedType('employer')}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedType === 'employer'
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <Briefcase className={`w-8 h-8 mx-auto mb-2 ${selectedType === 'employer' ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="font-bold text-gray-900">Employer</div>
              <div className="text-xs text-gray-500 mt-1">Hiring manager</div>
            </button>
            
            <button
              onClick={() => setSelectedType('career-services')}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedType === 'career-services'
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <School className={`w-8 h-8 mx-auto mb-2 ${selectedType === 'career-services' ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="font-bold text-gray-900">Career Services</div>
              <div className="text-xs text-gray-500 mt-1">Institution staff</div>
            </button>
            
            <button
              onClick={() => setSelectedType('ada')}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedType === 'ada'
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <Heart className={`w-8 h-8 mx-auto mb-2 ${selectedType === 'ada' ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="font-bold text-gray-900">Person with Disability</div>
              <div className="text-xs text-gray-500 mt-1">Person with Disabilities Beta</div>
            </button>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-8">
          
          {/* Basic Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Basic Information
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <select
                  required
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select age range</option>
                  <option value="under-18">Under 18</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(670) 123-4567"
                />
              </div>
            </div>
            
            {/* WhatsApp Communication */}
            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                📱 WhatsApp Updates (Optional)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                <strong className="text-blue-700">Your privacy is important to us.</strong> We'll only use this for beta program updates and will never share your information with third parties.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(670) 123-4567"
                  />
                  <p className="text-xs text-gray-500 mt-1">If different from your phone number</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Can we send you WhatsApp updates?
                  </label>
                  <select
                    value={formData.whatsappOptIn}
                    onChange={(e) => handleChange('whatsappOptIn', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select preference...</option>
                    <option value="yes">Yes - Send me WhatsApp updates</option>
                    <option value="no">No - Email only please</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Beta updates, tips, and announcements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Location
            </h2>
            
            <div className="space-y-4">
              {/* Row 1: Country and State */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country/Territory *
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <optgroup label="Pacific Islands (Primary Target)">
                      <option value="USA-Hawaii">USA - Hawaii</option>
                      <option value="CNMI">CNMI (Northern Mariana Islands)</option>
                      <option value="Guam">Guam</option>
                      <option value="FSM">FSM (Federated States of Micronesia)</option>
                      <option value="Palau">Republic of Palau</option>
                      <option value="Marshall Islands">Republic of Marshall Islands</option>
                      <option value="American Samoa">American Samoa</option>
                    </optgroup>
                    <optgroup label="Other Countries">
                      <option value="USA-Mainland">USA - Mainland</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Japan">Japan</option>
                      <option value="Australia">Australia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="Other">Other Country</option>
                    </optgroup>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Territory *
                  </label>
                  <select
                    required
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <optgroup label="FSM States">
                      <option value="Chuuk">Chuuk</option>
                      <option value="Pohnpei">Pohnpei</option>
                      <option value="Yap">Yap</option>
                      <option value="Kosrae">Kosrae</option>
                    </optgroup>
                    <optgroup label="CNMI">
                      <option value="Saipan">Saipan</option>
                      <option value="Tinian">Tinian</option>
                      <option value="Rota">Rota</option>
                    </optgroup>
                    <optgroup label="Hawaii">
                      <option value="Oahu">Oahu</option>
                      <option value="Maui">Maui</option>
                      <option value="Hawaii Island">Hawaii Island (Big Island)</option>
                      <option value="Kauai">Kauai</option>
                      <option value="Molokai">Molokai</option>
                      <option value="Lanai">Lanai</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option value="Guam">Guam</option>
                      <option value="Palau">Palau</option>
                      <option value="Majuro">Majuro (Marshall Islands)</option>
                      <option value="Ebeye">Ebeye (Marshall Islands)</option>
                      <option value="Pago Pago">Pago Pago (American Samoa)</option>
                      <option value="Other">Other State/Territory</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Row 2: Island and City */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Island/Municipality
                  </label>
                  <input
                    type="text"
                    value={formData.island}
                    onChange={(e) => handleChange('island', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Weno, Kolonia, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City/Village *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your city or village"
                  />
                </div>
              </div>

              {/* Row 3: Zipcode */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip/Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zipcode}
                    onChange={(e) => handleChange('zipcode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 96941, 96950, 96815"
                  />
                </div>
                
                {/* CNMI Village (conditional) */}
                {(formData.country === 'CNMI' || formData.state === 'Saipan' || formData.state === 'Tinian' || formData.state === 'Rota') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Village (CNMI)
                    </label>
                    <select
                      value={formData.cnmiVillage}
                      onChange={(e) => handleChange('cnmiVillage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select village...</option>
                      <optgroup label="Saipan Villages">
                        <option value="Garapan">Garapan</option>
                        <option value="Chalan Kanoa">Chalan Kanoa</option>
                        <option value="Susupe">Susupe</option>
                        <option value="San Jose">San Jose</option>
                        <option value="San Vicente">San Vicente</option>
                        <option value="San Antonio">San Antonio</option>
                        <option value="Tanapag">Tanapag</option>
                        <option value="Koblerville">Koblerville</option>
                        <option value="Capitol Hill">Capitol Hill</option>
                        <option value="Navy Hill">Navy Hill</option>
                        <option value="Kagman">Kagman</option>
                        <option value="As Lito">As Lito</option>
                        <option value="As Terlaje">As Terlaje</option>
                        <option value="Papago">Papago</option>
                        <option value="Marpi">Marpi</option>
                        <option value="San Roque">San Roque</option>
                      </optgroup>
                      <optgroup label="Tinian Villages">
                        <option value="San Jose (Tinian)">San Jose (Tinian)</option>
                        <option value="Carolinas">Carolinas</option>
                      </optgroup>
                      <optgroup label="Rota Villages">
                        <option value="Songsong">Songsong</option>
                        <option value="Sinapalo">Sinapalo</option>
                      </optgroup>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Voter Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
              Civic Engagement (Optional)
            </h2>
            
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-700 mb-4">
                <strong className="text-purple-700">Your privacy is important to us.</strong> This information helps us understand our community better and is completely optional. Your answers will not affect your beta application status.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you a registered voter?
                  </label>
                  <select
                    value={formData.registeredVoter}
                    onChange={(e) => handleChange('registeredVoter', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes - I am registered</option>
                    <option value="no">No - Not registered</option>
                    <option value="not-eligible">Not eligible to vote</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you plan to vote in November 2026?
                  </label>
                  <select
                    value={formData.planToVoteNovember}
                    onChange={(e) => handleChange('planToVoteNovember', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="yes-definitely">Yes - Definitely planning to vote</option>
                    <option value="yes-probably">Yes - Probably will vote</option>
                    <option value="maybe">Maybe - Not sure yet</option>
                    <option value="no">No - Not planning to vote</option>
                    <option value="not-eligible">Not eligible to vote</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Relocation Plans */}
            <div className="mt-8 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                ✈️ Future Relocation Plans (Optional)
              </h3>
              <p className="text-sm text-gray-700 mb-6">
                <strong className="text-cyan-700">Help us understand your future plans.</strong> This helps ZALPHA better serve you if you're planning to move. Your answer is optional and won't affect your application.
              </p>
              
              <div className="space-y-4">
                {/* Do you plan to relocate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you plan on relocating outside of the CNMI in the next year?
                  </label>
                  <select
                    value={formData.planToRelocate}
                    onChange={(e) => handleChange('planToRelocate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="yes-definitely">Yes - Definitely planning to relocate</option>
                    <option value="yes-probably">Yes - Probably will relocate</option>
                    <option value="maybe">Maybe - Considering it</option>
                    <option value="no">No - Planning to stay in CNMI</option>
                    <option value="unsure">Unsure at this time</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                {/* Where do you plan to go */}
                {formData.planToRelocate && 
                 formData.planToRelocate !== 'no' && 
                 formData.planToRelocate !== 'prefer-not-to-say' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Where do you plan to relocate?
                    </label>
                    <select
                      value={formData.relocationDestination}
                      onChange={(e) => handleChange('relocationDestination', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select destination...</option>
                      <option value="guam">🏝️ Guam</option>
                      <option value="mainland-us">🇺🇸 Mainland United States</option>
                      <option value="hawaii">🌺 Hawaii</option>
                      <option value="other-pacific">🌊 Other Pacific Islands</option>
                      <option value="asia">🌏 Asia</option>
                      <option value="other-international">🌍 Other International</option>
                      <option value="undecided">Undecided</option>
                    </select>
                  </div>
                )}
                
                {/* If Mainland US, where specifically */}
                {formData.relocationDestination === 'mainland-us' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Where in the Mainland US? (State/City)
                    </label>
                    <input
                      type="text"
                      value={formData.mainlandUSLocation}
                      onChange={(e) => handleChange('mainlandUSLocation', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., California - Los Angeles, Texas - Houston, Washington - Seattle"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This helps us provide you with relevant job opportunities in your destination
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Employment & Community Perspectives */}
            <div className="mt-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                💼 Employment & Community Perspectives (Optional)
              </h3>
              <p className="text-sm text-gray-700 mb-6">
                <strong className="text-orange-700">Help us understand your community better.</strong> Your candid responses help us serve the CNMI community and will remain confidential. These answers won't affect your application.
              </p>
              
              <div className="space-y-4">
                {/* Current/Past Work */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your current or most recent line of work?
                  </label>
                  <input
                    type="text"
                    value={formData.currentOrPastWork}
                    onChange={(e) => handleChange('currentOrPastWork', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Hospitality, Retail, Healthcare, Student, Unemployed"
                  />
                </div>
                
                {/* Hard to find work */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you think it's hard to find work in the CNMI?
                  </label>
                  <select
                    value={formData.hardToFindWork}
                    onChange={(e) => handleChange('hardToFindWork', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="very-hard">Very hard - Major challenge</option>
                    <option value="somewhat-hard">Somewhat hard - Takes time and effort</option>
                    <option value="neutral">Neutral - Depends on the field</option>
                    <option value="not-hard">Not hard - Jobs are available</option>
                    <option value="n/a">N/A - Not looking for work</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                {/* Why hard to find work */}
                {formData.hardToFindWork && formData.hardToFindWork !== 'prefer-not-to-say' && formData.hardToFindWork !== 'n/a' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why do you think it's {formData.hardToFindWork === 'not-hard' ? 'not hard' : 'hard'} to find work? (Optional)
                    </label>
                    <textarea
                      value={formData.whyHardToFindWork}
                      onChange={(e) => handleChange('whyHardToFindWork', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Share your perspective on the job market..."
                    />
                  </div>
                )}
                
                {/* CW1 Transitional Worker Program Extension */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you think the CW1 Transitional Worker Program should be extended past 2029?
                  </label>
                  <select
                    value={formData.cw1ProgramExtension}
                    onChange={(e) => handleChange('cw1ProgramExtension', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes - Should be extended</option>
                    <option value="no">No - Should not be extended</option>
                    <option value="unsure">Unsure - Need more information</option>
                    <option value="n/a">N/A</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                {/* Why CW1 Transitional Worker Program extension */}
                {formData.cw1ProgramExtension && formData.cw1ProgramExtension !== 'prefer-not-to-say' && formData.cw1ProgramExtension !== 'n/a' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why do you feel this way about the CW1 Transitional Worker Program? (Optional)
                    </label>
                    <textarea
                      value={formData.cw1ExtensionReason}
                      onChange={(e) => handleChange('cw1ExtensionReason', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Share your thoughts..."
                    />
                  </div>
                )}
                
                {/* Economy blame */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    In your opinion, who is more responsible for the current state of the economy?
                  </label>
                  <select
                    value={formData.economyBlame}
                    onChange={(e) => handleChange('economyBlame', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="local-politicians">Local politicians</option>
                    <option value="federal-politicians">Federal politicians</option>
                    <option value="both-equally">Both equally responsible</option>
                    <option value="neither">Neither - Other factors</option>
                    <option value="n/a">N/A</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                {/* Department responsible */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Which government departments do you think are most responsible for the economy and job opportunities? (Select all that apply)
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      'Tourism (MVA)',
                      'Department of Labor',
                      'Commerce',
                      'Finance',
                      'Public Lands',
                      'Education (PSS)',
                      'Economic Development',
                      "Governor's Office",
                      'Legislature',
                      'All departments equally',
                      'None - Private sector responsibility',
                      'Prefer not to say'
                    ].map(dept => (
                      <label key={dept} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.departmentResponsible.includes(dept)}
                          onChange={() => handleMultiSelect('departmentResponsible', dept)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{dept}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Education Interest */}
                <div className="pt-6 border-t-2 border-orange-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    📚 Education Interest (Optional)
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Are you interested in going back to school or furthering your education?
                      </label>
                      <select
                        value={formData.interestedInSchool}
                        onChange={(e) => handleChange('interestedInSchool', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes - Interested in going back to school</option>
                        <option value="currently-enrolled">Currently enrolled in school</option>
                        <option value="maybe">Maybe - Considering it</option>
                        <option value="no">No - Not interested at this time</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                    
                    {/* School type - only show if interested */}
                    {formData.interestedInSchool && ['yes', 'maybe'].includes(formData.interestedInSchool) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What type of school are you interested in?
                        </label>
                        <select
                          value={formData.schoolType}
                          onChange={(e) => handleChange('schoolType', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select...</option>
                          <option value="trade-school">Trade School / Vocational Training</option>
                          <option value="community-college">Community College (2-year)</option>
                          <option value="university">University (4-year)</option>
                          <option value="online-program">Online Program / Certification</option>
                          <option value="not-sure">Not sure yet</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Self-Identification */}
                <div className="pt-6 border-t-2 border-orange-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    👤 Self-Identification (Optional)
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This information helps us understand the diversity of our community and ensure we serve everyone effectively.
                  </p>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How do you self-identify? (Optional)
                    </label>
                    <select
                      value={formData.selfIdentify}
                      onChange={(e) => handleChange('selfIdentify', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="chamorro">Chamorro</option>
                      <option value="carolinian">Carolinian</option>
                      <option value="chuukese">Chuukese</option>
                      <option value="palauan">Palauan</option>
                      <option value="yapese">Yapese</option>
                      <option value="pohnpeian">Pohnpeian</option>
                      <option value="kosraean">Kosraean</option>
                      <option value="marshallese">Marshallese</option>
                      <option value="filipino">Filipino</option>
                      <option value="chinese">Chinese</option>
                      <option value="japanese">Japanese</option>
                      <option value="korean">Korean</option>
                      <option value="other-pacific-islander">Other Pacific Islander</option>
                      <option value="other-asian">Other Asian</option>
                      <option value="white-caucasian">White/Caucasian</option>
                      <option value="black-african-american">Black/African American</option>
                      <option value="hispanic-latino">Hispanic/Latino</option>
                      <option value="multiracial">Multiracial/Mixed</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Universal Basic Income & Remote Work */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
              Economic Perspectives & Remote Work
            </h2>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                💰 Universal Basic Income (Optional)
              </h3>
              <p className="text-sm text-gray-700 mb-6">
                <strong className="text-green-700">Your perspective matters.</strong> This helps us understand community views on economic policies. Your answer is optional and confidential.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you believe in Universal Basic Income, where everyone regardless of income receives a monthly living wage, like $100-500 per month?
                  </label>
                  <select
                    value={formData.believeInUBI}
                    onChange={(e) => handleChange('believeInUBI', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes - I support Universal Basic Income</option>
                    <option value="no">No - I do not support Universal Basic Income</option>
                    <option value="maybe">Maybe - I'm not sure</option>
                    <option value="dont-care">I don't care / No opinion</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                {/* Why do you feel that way - conditional */}
                {formData.believeInUBI && formData.believeInUBI !== 'prefer-not-to-say' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why do you feel that way? (Optional)
                    </label>
                    <textarea
                      value={formData.ubiReasoning}
                      onChange={(e) => handleChange('ubiReasoning', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Share your thoughts on Universal Basic Income..."
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                💼 Remote Work Interest
              </h3>
              <p className="text-sm text-gray-700 mb-6">
                <strong className="text-indigo-700">Help us understand your remote work interest.</strong> This information helps ZALPHA match you with appropriate global opportunities.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Would you be interested in remote work where you can bid on jobs from global employers?
                </label>
                <select
                  value={formData.interestedInRemoteWork}
                  onChange={(e) => handleChange('interestedInRemoteWork', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="yes-very">Yes - Very interested in remote work</option>
                  <option value="yes-somewhat">Yes - Somewhat interested</option>
                  <option value="maybe">Maybe - I'd like to learn more</option>
                  <option value="no-prefer-local">No - I prefer local in-person work</option>
                  <option value="no-not-interested">No - Not interested in remote work</option>
                  <option value="already-doing">I'm already doing remote work</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student-Specific Questions */}
          {selectedType === 'student' && (
            <>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
                  Education & Background
                </h2>
                
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Education Level *
                      </label>
                      <select
                        required
                        value={formData.currentEducation}
                        onChange={(e) => handleChange('currentEducation', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="high-school-current">High School (Current Student)</option>
                        <option value="high-school-graduate">High School Graduate</option>
                        <option value="some-college">Some College</option>
                        <option value="associates-current">Associate's Degree (In Progress)</option>
                        <option value="associates-complete">Associate's Degree (Completed)</option>
                        <option value="bachelors-current">Bachelor's Degree (In Progress)</option>
                        <option value="bachelors-complete">Bachelor's Degree (Completed)</option>
                        <option value="graduate-student">Graduate Student</option>
                        <option value="graduate-complete">Graduate Degree</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Major/Field of Study
                      </label>
                      <input
                        type="text"
                        value={formData.major}
                        onChange={(e) => handleChange('major', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Computer Science, Business"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Graduation Year
                      </label>
                      <input
                        type="text"
                        value={formData.graduationYear}
                        onChange={(e) => handleChange('graduationYear', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2026"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current GPA (Optional)
                      </label>
                      <select
                        value={formData.currentGPA}
                        onChange={(e) => handleChange('currentGPA', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="4.0">4.0</option>
                        <option value="3.5-3.9">3.5-3.9</option>
                        <option value="3.0-3.4">3.0-3.4</option>
                        <option value="2.5-2.9">2.5-2.9</option>
                        <option value="2.0-2.4">2.0-2.4</option>
                        <option value="below-2.0">Below 2.0</option>
                        <option value="not-applicable">Not Applicable</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Computer Skills Level *
                    </label>
                    <select
                      required
                      value={formData.computerSkills}
                      onChange={(e) => handleChange('computerSkills', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="beginner">Beginner - Basic email and browsing</option>
                      <option value="intermediate">Intermediate - Comfortable with apps and social media</option>
                      <option value="advanced">Advanced - Proficient with software and tools</option>
                      <option value="expert">Expert - Technical skills and programming</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Internet Connection Quality *
                    </label>
                    <select
                      required
                      value={formData.internetQuality}
                      onChange={(e) => handleChange('internetQuality', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="excellent">Excellent - Fast and reliable</option>
                      <option value="good">Good - Generally reliable</option>
                      <option value="fair">Fair - Sometimes slow or drops</option>
                      <option value="poor">Poor - Often unreliable</option>
                      <option value="limited">Very Limited - Mobile data only</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What devices do you own? (Check all that apply) *
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {['Smartphone', 'Tablet', 'Laptop', 'Desktop Computer', 'None'].map(device => (
                        <label key={device} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.devicesOwned.includes(device)}
                            onChange={() => handleMultiSelect('devicesOwned', device)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{device}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hours per week you can dedicate to beta testing *
                    </label>
                    <select
                      required
                      value={formData.hoursPerWeek}
                      onChange={(e) => handleChange('hoursPerWeek', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="1-2">1-2 hours</option>
                      <option value="3-5">3-5 hours</option>
                      <option value="6-10">6-10 hours</option>
                      <option value="10+">10+ hours</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Job Search Stage *
                    </label>
                    <select
                      required
                      value={formData.jobSearchStage}
                      onChange={(e) => handleChange('jobSearchStage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="not-started">Haven't started yet</option>
                      <option value="just-exploring">Just exploring options</option>
                      <option value="actively-searching">Actively searching</option>
                      <option value="interviewing">Currently interviewing</option>
                      <option value="have-offers">Have job offers</option>
                      <option value="employed-looking">Employed but looking</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Top challenges in your job search? (Check all that apply)
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Limited local opportunities',
                        'Lack of relevant experience',
                        'Don\'t know where to start',
                        'Resume/cover letter help',
                        'Interview preparation',
                        'Networking connections',
                        'Skills gap',
                        'Transportation'
                      ].map(challenge => (
                        <label key={challenge} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.topChallenges.includes(challenge)}
                            onChange={() => handleMultiSelect('topChallenges', challenge)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{challenge}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Which features are most important to you? (Choose top 3)
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Job search & matching',
                        'Resume builder',
                        'Interview practice',
                        'Skills assessments',
                        'Career counseling',
                        'Networking features',
                        'Learning/training content',
                        'Internship tracking'
                      ].map(feature => (
                        <label key={feature} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.featurePriorities.includes(feature)}
                            onChange={() => handleMultiSelect('featurePriorities', feature)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Employer-Specific Questions */}
          {selectedType === 'employer' && (
            <>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  Company Information
                </h2>
                
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry *
                      </label>
                      <select
                        required
                        value={formData.industry}
                        onChange={(e) => handleChange('industry', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="hospitality">Hospitality & Tourism</option>
                        <option value="retail">Retail</option>
                        <option value="construction">Construction</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="government">Government</option>
                        <option value="tech">Technology</option>
                        <option value="finance">Finance & Banking</option>
                        <option value="food-service">Food Service</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Size *
                      </label>
                      <select
                        required
                        value={formData.companySize}
                        onChange={(e) => handleChange('companySize', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Hiring Volume *
                      </label>
                      <select
                        required
                        value={formData.hiringVolume}
                        onChange={(e) => handleChange('hiringVolume', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="1-5">1-5 hires/year</option>
                        <option value="6-20">6-20 hires/year</option>
                        <option value="21-50">21-50 hires/year</option>
                        <option value="51-100">51-100 hires/year</option>
                        <option value="100+">100+ hires/year</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Recruiting Tools/Methods *
                    </label>
                    <textarea
                      required
                      value={formData.currentRecruitingTools}
                      onChange={(e) => handleChange('currentRecruitingTools', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Indeed, LinkedIn, newspaper ads, referrals, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biggest Hiring Challenges *
                    </label>
                    <textarea
                      required
                      value={formData.biggestHiringChallenges}
                      onChange={(e) => handleChange('biggestHiringChallenges', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What are your biggest pain points in recruiting Pacific Island talent?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Willing to participate in user interviews/feedback sessions? *
                    </label>
                    <select
                      required
                      value={formData.willingToInterview}
                      onChange={(e) => handleChange('willingToInterview', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="yes-video">Yes - Video calls (30-60 min)</option>
                      <option value="yes-phone">Yes - Phone calls only</option>
                      <option value="yes-email">Yes - Email feedback only</option>
                      <option value="limited">Limited availability</option>
                      <option value="no">Prefer not to</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Career Services-Specific Questions */}
          {selectedType === 'career-services' && (
            <>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  Institution Information
                </h2>
                
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.institutionName}
                        onChange={(e) => handleChange('institutionName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Name of school/university"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution Type *
                      </label>
                      <select
                        required
                        value={formData.institutionType}
                        onChange={(e) => handleChange('institutionType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="high-school">High School</option>
                        <option value="community-college">Community College</option>
                        <option value="university">University</option>
                        <option value="vocational">Vocational/Technical School</option>
                        <option value="workforce-center">Workforce Development Center</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Students Served Annually *
                      </label>
                      <select
                        required
                        value={formData.studentsServed}
                        onChange={(e) => handleChange('studentsServed', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="under-100">Under 100</option>
                        <option value="100-500">100-500</option>
                        <option value="501-1000">501-1,000</option>
                        <option value="1001-5000">1,001-5,000</option>
                        <option value="5000+">5,000+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range for Career Services Tools *
                      </label>
                      <select
                        required
                        value={formData.budgetRange}
                        onChange={(e) => handleChange('budgetRange', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="under-1000">Under $1,000/year</option>
                        <option value="1000-5000">$1,000-$5,000/year</option>
                        <option value="5000-10000">$5,000-$10,000/year</option>
                        <option value="10000-25000">$10,000-$25,000/year</option>
                        <option value="25000+">$25,000+/year</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Career Services Tools *
                    </label>
                    <textarea
                      required
                      value={formData.currentTools}
                      onChange={(e) => handleChange('currentTools', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What tools/platforms do you currently use? (e.g., Handshake, spreadsheets, email)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Implementation Timeline *
                    </label>
                    <select
                      required
                      value={formData.implementationTimeline}
                      onChange={(e) => handleChange('implementationTimeline', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">When would you want to implement?</option>
                      <option value="asap">ASAP - Ready now</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="exploring">Just exploring options</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ADA-Specific Questions */}
          {selectedType === 'ada' && (
            <>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  Accessibility & Support Needs
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-700">
                      <strong className="text-purple-700">💜 Privacy First:</strong> All information is confidential and used only to improve accessibility features. 
                      Answer only what you're comfortable sharing. All fields in this section are optional.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Type of disability (Check all that apply)
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Physical/Mobility',
                        'Visual Impairment',
                        'Hearing Impairment',
                        'Intellectual/Cognitive',
                        'Learning Disability',
                        'Mental Health',
                        'Autism Spectrum',
                        'Chronic Illness',
                        'Prefer not to specify'
                      ].map(type => (
                        <label key={type} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.disabilityType.includes(type)}
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
                      Accommodations or support you might need
                    </label>
                    <textarea
                      value={formData.accommodationsNeeded}
                      onChange={(e) => handleChange('accommodationsNeeded', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Screen reader, larger text, flexible schedule, job coach support..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assistive technology you use
                    </label>
                    <textarea
                      value={formData.assistiveTech}
                      onChange={(e) => handleChange('assistiveTech', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., JAWS, ZoomText, Dragon NaturallySpeaking, wheelchair..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary barriers to employment
                    </label>
                    <textarea
                      value={formData.primaryBarriers}
                      onChange={(e) => handleChange('primaryBarriers', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What challenges do you face in finding or keeping employment?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your employment goals
                    </label>
                    <textarea
                      value={formData.employmentGoals}
                      onChange={(e) => handleChange('employmentGoals', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What kind of work are you looking for? Full-time, part-time, remote, specific industries?"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Beta Testing Commitment */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                {selectedType === 'student' ? '4' : '4'}
              </span>
              Beta Testing Commitment
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to be a beta tester? *
                </label>
                <textarea
                  required
                  value={formData.whyBetaTest}
                  onChange={(e) => handleChange('whyBetaTest', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us what excites you about testing ZALPHA..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have you participated in beta testing before?
                </label>
                <select
                  value={formData.previousBetaExperience}
                  onChange={(e) => handleChange('previousBetaExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="yes-multiple">Yes - Multiple times</option>
                  <option value="yes-once">Yes - Once or twice</option>
                  <option value="no">No - This would be my first time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time you can commit to testing per week *
                </label>
                <select
                  required
                  value={formData.timeCommitment}
                  onChange={(e) => handleChange('timeCommitment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="1-2">1-2 hours/week</option>
                  <option value="3-5">3-5 hours/week</option>
                  <option value="6-10">6-10 hours/week</option>
                  <option value="10+">10+ hours/week</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Willingness to provide feedback *
                </label>
                <select
                  required
                  value={formData.feedbackWillingness}
                  onChange={(e) => handleChange('feedbackWillingness', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="very-active">Very Active - Regular detailed feedback</option>
                  <option value="active">Active - Weekly feedback</option>
                  <option value="moderate">Moderate - Bi-weekly feedback</option>
                  <option value="occasional">Occasional - When I find issues</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                {selectedType === 'student' ? '6' : '5'}
              </span>
              Additional Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about ZALPHA? *
                </label>
                <select
                  required
                  value={formData.howHeardAbout}
                  onChange={(e) => handleChange('howHeardAbout', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="job-fair-onsite">🎪 Job Fair (Onsite/In-Person)</option>
                  <option value="virtual-job-fair">💻 Virtual Job Fair</option>
                  <option value="career-fair">🎓 Career Fair at School</option>
                  <option value="referral-code">🎟️ Referral Code</option>
                  <option value="friend-told-me">👥 Friend/Family Told Me About It</option>
                  <option value="colleague-told-me">💼 Colleague/Coworker Told Me</option>
                  <option value="teacher-professor">👨‍🏫 Teacher/Professor Recommended</option>
                  <option value="counselor">🧭 Career Counselor/Advisor</option>
                  <option value="found-online-search">🔍 Found Online (Google/Search Engine)</option>
                  <option value="social-media-ad">📱 Social Media Ad</option>
                  <option value="social-media-post">📲 Social Media Post/Share</option>
                  <option value="school-announcement">🏫 School/University Announcement</option>
                  <option value="employer-recommended">🏢 Employer Recommended</option>
                  <option value="news-article">📰 News/Article</option>
                  <option value="community-organization">🤝 Community Organization</option>
                  <option value="government-office">🏛️ Government Office/Agency</option>
                  <option value="flyer-poster">📋 Flyer/Poster</option>
                  <option value="email-newsletter">📧 Email/Newsletter</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {/* Conditional field for specific location/person details */}
              {(formData.howHeardAbout === 'job-fair-onsite' || 
                formData.howHeardAbout === 'virtual-job-fair' ||
                formData.howHeardAbout === 'career-fair' ||
                formData.howHeardAbout === 'friend-told-me' ||
                formData.howHeardAbout === 'colleague-told-me' ||
                formData.howHeardAbout === 'teacher-professor' ||
                formData.howHeardAbout === 'counselor' ||
                formData.howHeardAbout === 'other') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.howHeardAbout.includes('fair') ? 'Which job/career fair? (Location, date, or event name)' :
                     formData.howHeardAbout.includes('told-me') || formData.howHeardAbout.includes('professor') || formData.howHeardAbout.includes('counselor') ? 
                     'Who told you about ZALPHA? (Name or organization - optional)' :
                     'Please provide more details'}
                  </label>
                  <input
                    type="text"
                    value={formData.specificLocation}
                    onChange={(e) => handleChange('specificLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      formData.howHeardAbout.includes('fair') ? 
                      'e.g., NMC Career Fair - Saipan, Jan 2026' :
                      formData.howHeardAbout.includes('told-me') || formData.howHeardAbout.includes('professor') || formData.howHeardAbout.includes('counselor') ?
                      'e.g., Maria Santos, Career Services Office' :
                      'Please specify...'
                    }
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Current Physical Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.signupLocation}
                  onChange={(e) => handleChange('signupLocation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Saipan - Northern Mariana Islands, Guam, Hawaii, etc."
                />
                <p className="mt-1 text-xs text-gray-500">
                  This helps us understand where our beta testers are located and track geographic reach
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Code (if you have one)
                </label>
                <input
                  type="text"
                  value={formData.referralCode}
                  onChange={(e) => handleChange('referralCode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optional referral code"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anything else you'd like us to know?
                </label>
                <textarea
                  value={formData.additionalComments}
                  onChange={(e) => handleChange('additionalComments', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share any additional thoughts, questions, or special circumstances..."
                />
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Important Beta Tester Information</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Selection Process:</strong> Applications reviewed within 2-3 business days</li>
                  <li>• <strong>Limited Spots:</strong> Priority given to Pacific Island residents</li>
                  <li>• <strong>Commitment:</strong> 6-month beta period with active participation expected</li>
                  <li>• <strong>NDA Required:</strong> Selected testers must sign confidentiality agreement</li>
                  <li>• <strong>Free Premium:</strong> 6 months of full platform access at no cost</li>
                  <li>• <strong>Feedback:</strong> Regular surveys and optional user interviews</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => onNavigate('landing')}
              className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? '⏳ Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
