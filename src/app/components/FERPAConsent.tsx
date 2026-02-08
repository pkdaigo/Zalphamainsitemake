import { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, FileText, Lock } from 'lucide-react';

interface FERPAConsentProps {
  onConsent: (consentData: FERPAConsentData) => void;
}

export interface FERPAConsentData {
  studentConsent: boolean;
  directoryInfoOptIn: boolean;
  thirdPartyDisclosure: boolean;
  consentDate: string;
  ipAddress?: string;
  studentSignature: string;
}

export function FERPAConsent({ onConsent }: FERPAConsentProps) {
  const [step, setStep] = useState(1);
  const [studentConsent, setStudentConsent] = useState(false);
  const [directoryInfoOptIn, setDirectoryInfoOptIn] = useState(false);
  const [thirdPartyDisclosure, setThirdPartyDisclosure] = useState(false);
  const [studentSignature, setStudentSignature] = useState('');
  const [hasReadPolicy, setHasReadPolicy] = useState(false);

  const handleSubmit = () => {
    const consentData: FERPAConsentData = {
      studentConsent,
      directoryInfoOptIn,
      thirdPartyDisclosure,
      consentDate: new Date().toISOString(),
      studentSignature,
    };
    onConsent(consentData);
  };

  const canProceedStep1 = hasReadPolicy && studentConsent && studentSignature.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">FERPA Privacy Notice & Consent</h1>
              <p className="text-slate-600">Family Educational Rights and Privacy Act Compliance</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 mt-6">
            <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`flex-1 h-2 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`} />
          </div>
          <div className="flex justify-between mt-2 text-xs font-semibold text-slate-600">
            <span>Student Rights</span>
            <span>Privacy Options</span>
            <span>Final Consent</span>
          </div>
        </div>

        {/* Step 1: FERPA Rights & Student Consent */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Your Rights Under FERPA
              </h2>
              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">📋 What is FERPA?</h3>
                  <p>The Family Educational Rights and Privacy Act (FERPA) is a federal law that protects the privacy of student education records. ZALPHA complies with FERPA to ensure your educational information remains secure.</p>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-blue-100">
                  <h3 className="font-bold text-slate-900 mb-3">Your FERPA Rights:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Inspect & Review:</strong> You have the right to inspect and review your education records maintained by ZALPHA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Request Amendment:</strong> You may request corrections to records you believe are inaccurate or misleading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Consent to Disclosures:</strong> You control when your education records are disclosed to third parties (with certain exceptions)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>File Complaints:</strong> You have the right to file a complaint with the U.S. Department of Education</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-200">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-amber-600" />
                    How ZALPHA Protects Your Information
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Encrypted storage and transmission of all education records</li>
                    <li>• Access logs tracking who views your information</li>
                    <li>• Annual notification of your FERPA rights</li>
                    <li>• Secure authentication and authorization controls</li>
                    <li>• Ability to export or delete your data at any time</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                    Age Requirement Notice
                  </h3>
                  <p className="text-sm text-slate-700">
                    ZALPHA requires all students to be 18 years of age or older to register. By proceeding with this consent, you confirm that you are 18 or older and have the legal capacity to consent to the use of your education records.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">What Information We Collect:</h3>
                  <p className="text-sm mb-2">ZALPHA collects and maintains the following education records:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Academic information (school, graduation year, GPA, courses)</li>
                    <li>• Skills assessments and certifications</li>
                    <li>• Job applications and employment history</li>
                    <li>• Contact information (name, email, phone, address)</li>
                    <li>• Résumés, portfolios, and work samples</li>
                    <li>• Communication records with employers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Student Acknowledgment */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Student Acknowledgment (18+ Only)</h3>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasReadPolicy}
                    onChange={(e) => setHasReadPolicy(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600"
                  />
                  <span className="text-sm text-slate-700">
                    I have read and understand my rights under FERPA as described above
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={studentConsent}
                    onChange={(e) => setStudentConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600"
                  />
                  <span className="text-sm text-slate-700">
                    <strong>I consent</strong> to ZALPHA collecting, storing, and processing my education records as described in this notice and the Privacy Policy. I confirm that I am 18 years of age or older.
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Digital Signature (Type your full legal name) *
                  </label>
                  <input
                    type="text"
                    value={studentSignature}
                    onChange={(e) => setStudentSignature(e.target.value)}
                    placeholder="Type your full legal name"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    By typing your name, you agree this serves as your legal electronic signature
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Privacy Options →
            </button>
          </div>
        )}

        {/* Step 2: Privacy Options */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-indigo-600" />
                Privacy & Disclosure Options
              </h2>
              <p className="text-sm text-slate-700 mb-4">
                Please choose your privacy preferences. You can change these settings at any time in your Privacy Dashboard.
              </p>

              <div className="space-y-4">
                {/* Directory Information */}
                <div className="bg-white rounded-lg p-5 border-2 border-slate-200">
                  <div className="flex items-start gap-3 mb-3">
                    <input
                      type="checkbox"
                      id="directory-opt-in"
                      checked={directoryInfoOptIn}
                      onChange={(e) => setDirectoryInfoOptIn(e.target.checked)}
                      className="mt-1 w-5 h-5 text-blue-600"
                    />
                    <div className="flex-1">
                      <label htmlFor="directory-opt-in" className="font-bold text-slate-900 cursor-pointer">
                        Allow Directory Information Disclosure
                      </label>
                      <p className="text-sm text-slate-600 mt-1">
                        Directory information includes: name, school, graduation year, major/field of study, and general location. 
                        This allows employers to find your profile when searching for candidates.
                      </p>
                      <div className="mt-2 text-xs bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <strong>If enabled:</strong> Employers can see your basic profile information in search results
                        <br />
                        <strong>If disabled:</strong> Your profile will be completely private and hidden from searches
                      </div>
                    </div>
                  </div>
                </div>

                {/* Third-Party Disclosure */}
                <div className="bg-white rounded-lg p-5 border-2 border-slate-200">
                  <div className="flex items-start gap-3 mb-3">
                    <input
                      type="checkbox"
                      id="third-party"
                      checked={thirdPartyDisclosure}
                      onChange={(e) => setThirdPartyDisclosure(e.target.checked)}
                      className="mt-1 w-5 h-5 text-blue-600"
                    />
                    <div className="flex-1">
                      <label htmlFor="third-party" className="font-bold text-slate-900 cursor-pointer">
                        Allow Sharing with Educational Partners
                      </label>
                      <p className="text-sm text-slate-600 mt-1">
                        Share my education records with verified educational institutions and scholarship programs to help with college applications and financial aid opportunities.
                      </p>
                      <div className="mt-2 text-xs bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <strong>Partners include:</strong> Universities, community colleges, scholarship foundations, and government education programs in Pacific Islands
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">✅ Always Allowed (Legitimate Educational Interests):</h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• ZALPHA staff for platform support and technical assistance</li>
                    <li>• Employers you directly apply to or message</li>
                    <li>• Required disclosures to comply with legal obligations</li>
                    <li>• Emergency situations to protect health and safety</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-4 bg-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-300 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Continue to Final Consent →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Final Consent */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Final Consent Confirmation
              </h2>

              {/* Student Consent Summary */}
              <div className="bg-white rounded-lg p-5 border-2 border-slate-200 mb-4">
                <h3 className="font-bold text-slate-900 mb-3">Consent Summary:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>I am 18 years of age or older</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>FERPA rights acknowledged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {directoryInfoOptIn ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                    <span>Directory information: {directoryInfoOptIn ? 'Enabled (Profile Visible)' : 'Disabled (Private Profile)'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {thirdPartyDisclosure ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                    <span>Educational partners: {thirdPartyDisclosure ? 'Sharing Allowed' : 'Sharing Not Allowed'}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <strong>Digital Signature:</strong> {studentSignature}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-xs text-slate-700">
                <strong>Legal Agreement:</strong> By clicking "Complete FERPA Consent" below, you acknowledge that:
                <br />• You are 18 years of age or older
                <br />• This electronic signature has the same legal effect as a handwritten signature
                <br />• You have read and understand your FERPA rights
                <br />• You consent to ZALPHA's collection and use of your education records
                <br />• You will receive a copy of this consent form via email for your records
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-6 py-4 bg-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-300 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-6 h-6" />
                Complete FERPA Consent
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
