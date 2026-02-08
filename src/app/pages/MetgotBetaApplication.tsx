import { useState } from 'react';
import { Users, CheckCircle, AlertCircle, Briefcase, Car, Globe } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import * as api from '@/utils/api';

interface MetgotBetaApplicationProps {
  onNavigate: (page: string) => void;
}

export function MetgotBetaApplication({ onNavigate }: MetgotBetaApplicationProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    email: '',
    phone: '',
    age: '',
    dateOfBirth: '',
    
    // WhatsApp & Communication
    whatsappNumber: '',
    whatsappOptIn: '',
    
    // Location
    country: '',
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
    
    // Work Authorization & Status
    authorizedToWork: '',
    workingStatus: '',
    
    // Job Fair & Technology Experience
    jobFairsAttended: '',
    technologyRating: '',
    
    // Focus Group Participation
    hasTransportation: '',
    availableForFocusGroup: '',
    preferredFocusGroupTimes: [] as string[],
    
    // Employment Information
    currentEmploymentStatus: '',
    yearsOfExperience: '',
    primaryIndustry: '',
    lookingForWork: '',
    
    // Why Participate
    whyParticipate: '',
    whatHopesToGain: '',
    previousBetaExperience: '',
    
    // Additional
    howHeardAbout: '',
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
    
    // Validate age requirement
    if (formData.age && !['25-34', '35-44', '45-54', '55-64', '65+'].includes(formData.age)) {
      setError('This program is specifically for participants age 25 and older. Thank you for your interest.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      console.log('🔄 Submitting Metgot Global beta application for:', formData.email);
      
      // Submit to backend
      const result = await api.submitMetgotBetaApplication(formData);
      
      console.log('✅ Metgot Beta Application submitted successfully:', result);
      console.log('✅ Application ID:', result.applicationId);
      console.log('✅ Storage verified:', result.verified);
      
      if (!result.verified) {
        throw new Error('Application storage verification failed. Please try again.');
      }
      
      setSubmitted(true);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('❌ Metgot beta application submission error:', err);
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
              Thank you for applying to be part of the Metgot Global Beta Testing Program! 
              We've received your application and our team will review it carefully.
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
                  <p><strong>Review (3-5 business days):</strong> Our team will carefully review your application</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">2️⃣</span>
                  <p><strong>Notification via Email {formData.whatsappOptIn === 'yes' && '& WhatsApp'}:</strong> You'll receive an acceptance notification at <strong>{formData.email}</strong>{formData.whatsappOptIn === 'yes' && formData.whatsappNumber && <> and <strong>{formData.whatsappNumber}</strong></>}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">3️⃣</span>
                  <p><strong>Focus Group Invitation:</strong> If selected, we'll contact you to schedule your participation</p>
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
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-2">📍 Focus Group Location</h3>
              <p className="text-gray-700 text-sm mb-2">
                If selected, focus groups will be held at our facility. Transportation assistance may be available.
              </p>
              <p className="text-purple-700 font-semibold">
                We'll contact participants directly with scheduling and location details.
              </p>
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
      <div className="max-w-4xl mx-auto px-4">
        <BackButton onNavigate={onNavigate} label="Back to Home" />
        
        {/* Header */}
        <div className="text-center mb-8 mt-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Metgot Global Beta Program
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Join our exclusive focus group for professionals age 25+ and help shape the future of job connections!
          </p>
          <div className="inline-flex items-center gap-2 bg-purple-100 border-2 border-purple-300 rounded-full px-6 py-2">
            <Users className="w-5 h-5 text-purple-700" />
            <span className="text-purple-900 font-semibold">Ages 25+ Only</span>
          </div>
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
                  ✅ <strong>FERPA compliant</strong> - Your data is protected
                </p>
                <p className="text-sm text-gray-600">
                  ✅ <strong>You control</strong> what employers see
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
              <h3 className="font-bold text-red-900 mb-1">Submission Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-8">
          
          {/* Section 1: Basic Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range *
                </label>
                <select
                  required
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select age range</option>
                  <option value="under-18">Under 18 (Not Eligible)</option>
                  <option value="18-24">18-24 (Not Eligible)</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55-64">55-64</option>
                  <option value="65+">65+</option>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

          {/* Section 2: Location */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Location
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country/Territory *
                </label>
                <select
                  required
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <optgroup label="Pacific Islands">
                    <option value="CNMI">CNMI (Northern Mariana Islands)</option>
                    <option value="Guam">Guam</option>
                    <option value="FSM">FSM (Federated States of Micronesia)</option>
                    <option value="Palau">Republic of Palau</option>
                    <option value="Marshall Islands">Republic of Marshall Islands</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="USA-Hawaii">USA - Hawaii</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="USA-Mainland">USA - Mainland</option>
                    <option value="Other">Other</option>
                  </optgroup>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Territory *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Saipan, Guam, Pohnpei"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your city"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip/Postal Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.zipcode}
                  onChange={(e) => handleChange('zipcode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 96950, 96913"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            
            {/* Voter Information */}
            <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                🗳️ Civic Engagement (Optional)
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                <strong className="text-purple-700">Your privacy is important to us.</strong> This information helps us understand our community better and is completely optional. Your answers will not affect your application status.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you a registered voter?
                  </label>
                  <select
                    value={formData.registeredVoter}
                    onChange={(e) => handleChange('registeredVoter', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                <strong className="text-cyan-700">Help us understand your future plans.</strong> This helps us better serve you if you're planning to move. Your answer is optional and won't affect your application.
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., California - Los Angeles, Texas - Houston, Washington - Seattle"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This helps us provide you with relevant opportunities in your destination
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Hospitality, Retail, Healthcare, Construction, Government"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      <label key={dept} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.departmentResponsible.includes(dept)}
                          onChange={() => handleMultiSelect('departmentResponsible', dept)}
                          className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

          {/* Section 3: Universal Basic Income & Remote Work */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                <strong className="text-indigo-700">Help us understand your remote work interest.</strong> This information helps us match you with appropriate global opportunities.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Would you be interested in remote work where you can bid on jobs from global employers?
                </label>
                <select
                  value={formData.interestedInRemoteWork}
                  onChange={(e) => handleChange('interestedInRemoteWork', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

          {/* Section 4: Work Authorization */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
              <Globe className="w-6 h-6 text-purple-600" />
              Work Authorization & Status
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you authorized to work in the United States? *
                </label>
                <select
                  required
                  value={formData.authorizedToWork}
                  onChange={(e) => handleChange('authorizedToWork', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is your working status? *
                </label>
                <select
                  required
                  value={formData.workingStatus}
                  onChange={(e) => handleChange('workingStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="US Citizen">US Citizen</option>
                  <option value="US National">US National</option>
                  <option value="COFA">COFA (Compact of Free Association)</option>
                  <option value="CW1">CW1 (Commonwealth Worker)</option>
                  <option value="H1B">H1B Visa Holder</option>
                  <option value="US Permanent Resident">US Permanent Resident</option>
                  <option value="No Status">No Status</option>
                  <option value="N/A">N/A</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 5: Job Fair & Technology Experience */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
              Experience & Technology
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many job fairs have you attended in the past 2 years? *
                </label>
                <select
                  required
                  value={formData.jobFairsAttended}
                  onChange={(e) => handleChange('jobFairsAttended', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="0">0 - Never attended</option>
                  <option value="1-2">1-2 job fairs</option>
                  <option value="3-5">3-5 job fairs</option>
                  <option value="6-10">6-10 job fairs</option>
                  <option value="10+">More than 10 job fairs</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Rate yourself when it comes to using technology (1-10) *
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    required
                    value={formData.technologyRating || '5'}
                    onChange={(e) => handleChange('technologyRating', e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>1 - Beginner</span>
                    <span className="font-bold text-purple-600 text-lg">{formData.technologyRating || '5'}</span>
                    <span>10 - Expert</span>
                  </div>
                  <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 mt-2">
                    {parseInt(formData.technologyRating || '5') <= 3 && '📱 Basic - Can use phone and email'}
                    {parseInt(formData.technologyRating || '5') > 3 && parseInt(formData.technologyRating || '5') <= 6 && '💻 Intermediate - Comfortable with apps and software'}
                    {parseInt(formData.technologyRating || '5') > 6 && parseInt(formData.technologyRating || '5') <= 8 && '⚡ Advanced - Proficient with most technology'}
                    {parseInt(formData.technologyRating || '5') > 8 && '🚀 Expert - Very tech-savvy and innovative'}
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Work Experience *
                </label>
                <select
                  required
                  value={formData.yearsOfExperience}
                  onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-15">11-15 years</option>
                  <option value="16-20">16-20 years</option>
                  <option value="20+">More than 20 years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Industry/Field *
                </label>
                <input
                  type="text"
                  required
                  value={formData.primaryIndustry}
                  onChange={(e) => handleChange('primaryIndustry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Hospitality, Healthcare, Retail, Government"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Focus Group Participation */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">6</span>
              <Car className="w-6 h-6 text-purple-600" />
              Focus Group Participation
            </h2>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-blue-900 text-sm">
                <strong>📍 Important:</strong> Selected participants will be invited to attend in-person focus group sessions 
                at our facility. These sessions typically last 1-2 hours and you'll receive compensation for your time.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have reliable transportation to come to our facility? *
                </label>
                <select
                  required
                  value={formData.hasTransportation}
                  onChange={(e) => handleChange('hasTransportation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="yes-own-vehicle">Yes - I have my own vehicle</option>
                  <option value="yes-public-transit">Yes - I can use public transportation</option>
                  <option value="yes-ride-share">Yes - I can arrange ride-share</option>
                  <option value="maybe-need-assistance">Maybe - I may need transportation assistance</option>
                  <option value="no">No - I would need transportation provided</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you available to participate in in-person focus groups? *
                </label>
                <select
                  required
                  value={formData.availableForFocusGroup}
                  onChange={(e) => handleChange('availableForFocusGroup', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="yes-definitely">Yes - Definitely available</option>
                  <option value="yes-flexible">Yes - Flexible schedule</option>
                  <option value="maybe-limited">Maybe - Limited availability</option>
                  <option value="prefer-virtual">Prefer virtual participation if possible</option>
                  <option value="no">No - Not available for in-person sessions</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Focus Group Times (Select all that apply) *
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Weekday Mornings (8am-12pm)',
                    'Weekday Afternoons (12pm-5pm)',
                    'Weekday Evenings (5pm-8pm)',
                    'Saturday Mornings',
                    'Saturday Afternoons',
                    'Flexible - Any time works'
                  ].map(time => (
                    <label key={time} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.preferredFocusGroupTimes.includes(time)}
                        onChange={() => handleMultiSelect('preferredFocusGroupTimes', time)}
                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Why Participate */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">7</span>
              Your Motivation
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to participate in this beta program? *
                </label>
                <textarea
                  required
                  value={formData.whyParticipate}
                  onChange={(e) => handleChange('whyParticipate', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tell us what motivates you to join this program..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you hope to gain from participating? *
                </label>
                <textarea
                  required
                  value={formData.whatHopesToGain}
                  onChange={(e) => handleChange('whatHopesToGain', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your expectations and goals..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you currently looking for employment opportunities?
                </label>
                <select
                  value={formData.lookingForWork}
                  onChange={(e) => handleChange('lookingForWork', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="yes-actively">Yes - Actively searching</option>
                  <option value="yes-casually">Yes - Casually looking</option>
                  <option value="open-to-opportunities">Open to opportunities</option>
                  <option value="no-employed">No - Currently employed and happy</option>
                  <option value="no-not-looking">No - Not looking at this time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about Metgot Global? *
                </label>
                <select
                  required
                  value={formData.howHeardAbout}
                  onChange={(e) => handleChange('howHeardAbout', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                     'Who told you about Metgot Global? (Name or organization - optional)' :
                     'Please provide more details'}
                  </label>
                  <input
                    type="text"
                    value={formData.specificLocation}
                    onChange={(e) => handleChange('specificLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Saipan - Northern Mariana Islands, Guam, Hawaii, etc."
                />
                <p className="mt-1 text-xs text-gray-500">
                  This helps us understand where our beta testers are located and track geographic reach
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  value={formData.additionalComments}
                  onChange={(e) => handleChange('additionalComments', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-purple-900">
                <strong>📋 Before submitting:</strong> Please review your information carefully. 
                Selected participants will be contacted via email within 5 business days.
              </p>
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
