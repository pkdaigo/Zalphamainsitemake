import { useState } from 'react';
import { IdCard, Upload, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import * as api from '@/utils/api';
import { DataBrokerDisclosure } from '@/app/components/DataBrokerDisclosure';
import { AgeGraduationVerification } from '@/app/components/AgeGraduationVerification';
import { IDVerification } from '@/app/components/IDVerification';
import { PlaidIDVerification } from '@/app/components/PlaidIDVerification';
import { ReCaptcha, HoneypotField, BehavioralVerification, RateLimitWarning } from '@/app/components/ReCaptcha';
import { EmploymentDisclosure } from '@/app/components/EmploymentDisclosure';
import { VideoIntroduction } from '@/app/components/VideoIntroduction';
import { DocumentUpload } from '@/app/components/DocumentUpload';
import { StudentBetaQuestionnaire } from '@/app/components/StudentBetaQuestionnaire';

interface StudentSignupProps {
  onNavigate: (page: string) => void;
}

export function StudentSignup({ onNavigate }: StudentSignupProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    location: 'CNMI',
    education: '',
    graduationYear: '',
    dateOfBirth: '',
    age: 0,
    governmentIdUrl: '',
    studentIdUrl: '',
    idNumber: '',
    studentIdNumber: '',
    // New fields for detailed student info
    major: '',
    expectedGraduationYear: '',
    internshipPreference: 'local', // 'local' or 'anywhere'
    semesterSchedule: [] as { day: string; startTime: string; endTime: string; courseName: string; }[],
    // For 18-year-old graduates
    hasTransportation: '',
    publicTransportAccess: false,
    planningSchoolInFall: '',
  });
  const [idFile, setIdFile] = useState<File | null>(null);
  
  // Plaid verification state
  const [plaidVerified, setPlaidVerified] = useState(false);
  const [plaidData, setPlaidData] = useState<any>(null);
  
  // Video introduction state
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  // Document upload state
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  
  // Anti-bot protection state
  const [honeypotValue, setHoneypotValue] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [behavioralScore, setBehavioralScore] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const maxAttempts = 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Bot detection - Check honeypot field
    if (honeypotValue !== '') {
      // Honeypot was filled - likely a bot
      setError('Automated submission detected. Please try again.');
      setFailedAttempts(prev => prev + 1);
      return;
    }
    
    // Check if account is locked due to too many attempts
    if (failedAttempts >= maxAttempts) {
      setError('Too many failed attempts. Please try again later or contact support.');
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final submission - verify bot protections
      if (!recaptchaToken || behavioralScore < 50) {
        setError('Please complete all security verifications.');
        return;
      }
      
      // Create account
      setLoading(true);
      try {
        await api.studentSignup({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          school: formData.education,
          graduationYear: formData.graduationYear,
          location: formData.location,
          dateOfBirth: formData.dateOfBirth,
          age: formData.age,
          governmentIdUrl: formData.governmentIdUrl,
          studentIdUrl: formData.studentIdUrl,
          idNumber: formData.idNumber,
          studentIdNumber: formData.studentIdNumber,
          recaptchaToken: recaptchaToken,
          behavioralScore: behavioralScore,
        });
        
        // Auto sign in after signup
        await api.signIn(formData.email, formData.password);
        
        // Navigate to dashboard
        onNavigate('student-dashboard');
      } catch (err: any) {
        console.error('Signup error:', err);
        setError(err.message || 'Failed to create account. Please try again.');
        setFailedAttempts(prev => prev + 1);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-6 sm:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Back to Home Button */}
        <div className="mb-4 sm:mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Home" />
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Step {step} of 3</span>
            <span className="text-xs sm:text-sm font-medium text-gray-600">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {step === 1 && 'Create Your Account'}
            {step === 2 && 'Tell Us About Yourself'}
            {step === 3 && 'Verify Your Identity'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            {step === 1 && 'Join ZALPHA and start your career journey'}
            {step === 2 && 'Help employers find you'}
            {step === 3 && 'Upload a valid ID to verify your account'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="john.doe@example.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <p className="text-sm text-gray-500 mt-1">Minimum 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="+1 (670) 123-4567"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </>
            )}

            {/* Step 2: Education Info */}
            {step === 2 && (
              <>
                {/* Basic Info Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <select
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="CNMI">CNMI (Commonwealth of the Northern Mariana Islands)</option>
                      <option value="FSM - Yap">FSM - Yap State</option>
                      <option value="FSM - Chuuk">FSM - Chuuk State</option>
                      <option value="FSM - Pohnpei">FSM - Pohnpei State</option>
                      <option value="FSM - Kosrae">FSM - Kosrae State</option>
                      <option value="Guam">Guam</option>
                      <option value="Hawaii">Hawaii</option>
                      <option value="Palau">Palau</option>
                      <option value="Marshall Islands">Marshall Islands</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        required
                        min="18"
                        max="100"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="25"
                      />
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Education Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Education Level *
                      </label>
                      <select
                        required
                        value={formData.education}
                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      >
                        <option value="">Select your education level</option>
                        <option value="high-school">High School Diploma</option>
                        <option value="some-college">Some College</option>
                        <option value="associate">Associate Degree</option>
                        <option value="bachelor">Bachelor's Degree (In Progress)</option>
                        <option value="bachelor-completed">Bachelor's Degree (Completed)</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD/Doctorate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Major / Field of Study *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.major}
                        onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="e.g., Business Administration, Computer Science, Nursing"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Graduation Year *
                      </label>
                      <input
                        type="number"
                        required
                        min="2024"
                        max="2035"
                        value={formData.expectedGraduationYear}
                        onChange={(e) => setFormData({ ...formData, expectedGraduationYear: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="e.g., 2026"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </div>
                  </div>
                </div>

                {/* Internship Preferences Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job & Internship Preferences</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Are you looking for opportunities locally or willing to relocate? *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                        <input
                          type="radio"
                          name="internshipPreference"
                          value="local"
                          checked={formData.internshipPreference === 'local'}
                          onChange={(e) => setFormData({ ...formData, internshipPreference: e.target.value })}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">Local Only</div>
                          <div className="text-sm text-gray-600">I want to stay in my current location</div>
                        </div>
                      </label>
                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                        <input
                          type="radio"
                          name="internshipPreference"
                          value="regional"
                          checked={formData.internshipPreference === 'regional'}
                          onChange={(e) => setFormData({ ...formData, internshipPreference: e.target.value })}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">Within Western Pacific</div>
                          <div className="text-sm text-gray-600">Open to opportunities in CNMI, FSM, Guam, Hawaii, Marshall Islands, or Palau</div>
                        </div>
                      </label>
                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                        <input
                          type="radio"
                          name="internshipPreference"
                          value="anywhere"
                          checked={formData.internshipPreference === 'anywhere'}
                          onChange={(e) => setFormData({ ...formData, internshipPreference: e.target.value })}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">Anywhere</div>
                          <div className="text-sm text-gray-600">I'm willing to relocate anywhere for the right opportunity</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 18-year-old High School Graduate Questions */}
                {formData.age === 18 && formData.education === 'high-school' && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      🎓 High School Graduate Information
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Transportation */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Do you have reliable transportation? *
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                            <input
                              type="radio"
                              name="hasTransportation"
                              value="yes"
                              checked={formData.hasTransportation === 'yes'}
                              onChange={(e) => setFormData({ ...formData, hasTransportation: e.target.value })}
                              className="mr-3"
                              required
                            />
                            <span className="text-gray-900">Yes, I have my own vehicle</span>
                          </label>
                          <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                            <input
                              type="radio"
                              name="hasTransportation"
                              value="public"
                              checked={formData.hasTransportation === 'public'}
                              onChange={(e) => setFormData({ ...formData, hasTransportation: e.target.value })}
                              className="mr-3"
                              required
                            />
                            <span className="text-gray-900">I use public transportation</span>
                          </label>
                          <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                            <input
                              type="radio"
                              name="hasTransportation"
                              value="limited"
                              checked={formData.hasTransportation === 'limited'}
                              onChange={(e) => setFormData({ ...formData, hasTransportation: e.target.value })}
                              className="mr-3"
                              required
                            />
                            <span className="text-gray-900">Limited transportation (need job near home)</span>
                          </label>
                        </div>
                      </div>

                      {/* Public Transport Access */}
                      <div>
                        <label className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <input
                            type="checkbox"
                            checked={formData.publicTransportAccess}
                            onChange={(e) => setFormData({ ...formData, publicTransportAccess: e.target.checked })}
                            className="mr-3"
                          />
                          <span className="text-sm text-gray-900">
                            I have access to public transportation in my area
                          </span>
                        </label>
                      </div>

                      {/* School Plans */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Are you planning to attend school in the fall? *
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                            <input
                              type="radio"
                              name="planningSchoolInFall"
                              value="yes-fulltime"
                              checked={formData.planningSchoolInFall === 'yes-fulltime'}
                              onChange={(e) => setFormData({ ...formData, planningSchoolInFall: e.target.value })}
                              className="mr-3"
                              required
                            />
                            <div>
                              <div className="font-medium text-gray-900">Yes, full-time student</div>
                              <div className="text-sm text-gray-600">I'll be attending college/university full-time</div>
                            </div>
                          </label>
                          <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                            <input
                              type="radio"
                              name="planningSchoolInFall"
                              value="yes-parttime"
                              checked={formData.planningSchoolInFall === 'yes-parttime'}
                              onChange={(e) => setFormData({ ...formData, planningSchoolInFall: e.target.value })}
                              className="mr-3"
                              required
                            />
                            <div>
                              <div className="font-medium text-gray-900">Yes, part-time student</div>
                              <div className="text-sm text-gray-600">I'll be taking some classes while working</div>
                            </div>
                          </label>
                          <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                            <input
                              type="radio"
                              name="planningSchoolInFall"
                              value="no-working"
                              checked={formData.planningSchoolInFall === 'no-working'}
                              onChange={(e) => setFormData({ ...formData, planningSchoolInFall: e.target.value })}
                              className="mr-3"
                              required
                            />
                            <div>
                              <div className="font-medium text-gray-900">No, entering workforce</div>
                              <div className="text-sm text-gray-600">I'm looking for full-time employment</div>
                            </div>
                          </label>
                          <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                            <input
                              type="radio"
                              name="planningSchoolInFall"
                              value="undecided"
                              checked={formData.planningSchoolInFall === 'undecided'}
                              onChange={(e) => setFormData({ ...formData, planningSchoolInFall: e.target.value })}
                              className="mr-3"
                              required
                            />
                            <div>
                              <div className="font-medium text-gray-900">Undecided</div>
                              <div className="text-sm text-gray-600">I'm still exploring my options</div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Info Box for 18-year-olds */}
                    <div className="mt-4 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                      <p className="text-sm text-cyan-900">
                        <strong>💼 Why we ask:</strong> Local businesses like restaurants, cafes, and retail stores want to know your availability and transportation situation so they can match you with the right opportunities. This helps us connect you with jobs that fit your schedule and location!
                      </p>
                    </div>
                  </div>
                )}

                {/* Class Schedule Section - For current students */}
                {formData.education !== 'high-school' && formData.education !== '' && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📅 Current Semester Schedule
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      This helps employers understand your availability for part-time jobs, internships, and shift work.
                    </p>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-900">
                        <strong>📝 Note:</strong> You can add your detailed class schedule after registration in your profile settings. For now, just confirm your status above.
                      </p>
                    </div>
                  </div>
                )}

                {/* Document Upload Section */}
                <div className="pt-6 border-t border-gray-200">
                  <DocumentUpload 
                    onDocumentsChange={(docs) => {
                      setUploadedDocuments(docs);
                      console.log('Documents uploaded:', docs);
                    }}
                    required={false}
                  />
                </div>
              </>
            )}

            {/* Step 3: ID Verification */}
            {step === 3 && (
              <div>
                {/* Rate Limit Warning */}
                <RateLimitWarning 
                  attempts={failedAttempts} 
                  maxAttempts={maxAttempts}
                  resetTime={failedAttempts >= maxAttempts ? new Date(Date.now() + 30 * 60 * 1000) : undefined}
                />

                {/* Plaid ID Verification Component */}
                <PlaidIDVerification 
                  userType="student"
                  onSuccess={(data) => {
                    setPlaidVerified(true);
                    setPlaidData(data);
                    console.log('ID Verification successful:', data);
                  }}
                  onError={(error) => {
                    console.error('ID Verification error:', error);
                    setError('ID verification failed. Please try again.');
                  }}
                />

                {/* Video Introduction - Optional */}
                <div className="mt-6">
                  <VideoIntroduction 
                    onVideoRecorded={(blob, url) => {
                      setVideoBlob(blob);
                      setVideoUrl(url);
                      console.log('Video introduction recorded:', blob);
                    }}
                    required={false}
                  />
                </div>

                {/* Anti-Bot Protection */}
                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-slate-900 text-lg">Security Verification</h3>
                  
                  {/* Honeypot Field - Invisible to users, catches bots */}
                  <HoneypotField onChange={setHoneypotValue} />
                  
                  {/* Behavioral Verification */}
                  <BehavioralVerification onComplete={setBehavioralScore} />
                  
                  {/* reCAPTCHA */}
                  <ReCaptcha 
                    onVerify={setRecaptchaToken} 
                    onError={() => setError('Security verification failed')}
                    action="student_signup"
                  />
                </div>

                {/* Data Broker Disclosure - Choose variant: 'prominent' | 'standard' | 'minimal' | 'footer' */}
                <div className="mt-6">
                  <DataBrokerDisclosure variant="minimal" onNavigate={onNavigate} />
                </div>

                {/* Employment Disclosure */}
                <div className="mt-6">
                  <EmploymentDisclosure variant="compact" />
                </div>

                {/* Account Integrity Notice - NEW */}
                <div className="mt-6">
                  <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                    <p className="text-xs text-amber-900">
                      <strong>⚠️ Account Integrity Policy:</strong> Your account may be suspended or terminated for cheating on assessments, posting fake reviews, credential fraud, or system abuse. See{' '}
                      <button 
                        onClick={() => onNavigate('terms-of-service')} 
                        className="underline hover:text-amber-950"
                      >
                        Section 7A of Terms of Service
                      </button>{' '}
                      for details. By registering, you agree to maintain honest conduct and accept legal responsibility for policy violations.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                {step === 3 ? 'Complete Registration' : 'Continue'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 text-red-500 text-sm">
              {error}
            </div>
          )}

          {loading && (
            <div className="mt-4 text-blue-500 text-sm">
              Creating your account...
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => onNavigate('signin')}
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>

          {/* Demo Skip Button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium underline"
            >
              🎯 Skip to Demo Dashboard (No Signup Required)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}