import { useState } from 'react';
import { Shield, Lock, Eye, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface BetaLegalAgreementProps {
  userType: 'student' | 'employer' | 'career-services';
  onAccept: (agreements: BetaAgreements) => void;
  onDecline: () => void;
}

interface BetaAgreements {
  nda: boolean;
  intellectualProperty: boolean;
  nonCompete: boolean;
  privacyPolicy: boolean;
  holdHarmless: boolean;
  dataUsageConsent: boolean;
  acceptedAt: number;
  ipAddress: string;
  userAgent: string;
}

export function BetaLegalAgreement({ userType, onAccept, onDecline }: BetaLegalAgreementProps) {
  const [agreements, setAgreements] = useState({
    nda: false,
    intellectualProperty: false,
    nonCompete: false,
    privacyPolicy: false,
    holdHarmless: false,
    dataUsageConsent: false
  });
  const [showNDA, setShowNDA] = useState(false);
  const [showIP, setShowIP] = useState(false);
  const [showNonCompete, setShowNonCompete] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [error, setError] = useState('');

  const allAgreed = Object.values(agreements).every(v => v === true);

  const handleAccept = () => {
    if (!allAgreed) {
      setError('You must accept all agreements to participate in the beta program.');
      return;
    }

    const fullAgreements: BetaAgreements = {
      ...agreements,
      acceptedAt: Date.now(),
      ipAddress: 'IP_TO_BE_CAPTURED', // Will be captured server-side
      userAgent: navigator.userAgent
    };

    onAccept(fullAgreements);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Warning Banner */}
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-2">⚠️ LEGAL AGREEMENTS REQUIRED</h2>
              <p className="text-red-800 leading-relaxed">
                Access to the ZALPHA Beta Program requires acceptance of legally binding agreements. 
                Please read carefully before proceeding. <strong>By accepting, you are entering into a 
                legal contract that is enforceable under applicable laws.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Main Agreement Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Beta Tester Legal Agreements</h1>
              <p className="text-gray-600">All agreements must be accepted to continue</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* 1. NDA */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={agreements.nda}
                  onChange={(e) => setAgreements({ ...agreements, nda: e.target.checked })}
                  className="w-6 h-6 mt-1 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  id="nda"
                />
                <div className="flex-1">
                  <label htmlFor="nda" className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-bold text-gray-900">Non-Disclosure Agreement (NDA)</h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      You agree to keep all information about ZALPHA's features, technology, business model, 
                      and proprietary systems <strong className="text-red-600">strictly confidential</strong>. 
                      You may not disclose, share, or discuss any aspect of the platform with third parties 
                      without written consent from ZALPHA.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowNDA(!showNDA)}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                      {showNDA ? 'Hide' : 'Read'} Full NDA →
                    </button>
                    
                    {showNDA && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-2 max-h-64 overflow-y-auto border border-gray-200">
                        <p><strong>NON-DISCLOSURE AGREEMENT</strong></p>
                        <p>This Non-Disclosure Agreement ("NDA") is entered into between ZALPHA, Inc. ("Company") and the undersigned Beta Tester ("Recipient").</p>
                        
                        <p><strong>1. Confidential Information:</strong> Recipient acknowledges that during the beta testing period, they will have access to proprietary and confidential information including but not limited to: software features, algorithms, business strategies, user data structures, AI models, gamification systems, pricing models, employer relationships, and technical specifications.</p>
                        
                        <p><strong>2. Non-Disclosure Obligations:</strong> Recipient agrees to:
                          <br/>• Maintain strict confidentiality of all Confidential Information
                          <br/>• Not disclose any Confidential Information to any third party
                          <br/>• Not use Confidential Information for any purpose other than beta testing
                          <br/>• Take reasonable precautions to prevent unauthorized disclosure
                        </p>
                        
                        <p><strong>3. Duration:</strong> This NDA remains in effect for five (5) years from the date of signing or until the information becomes publicly available through no fault of Recipient.</p>
                        
                        <p><strong>4. Consequences of Breach:</strong> Breach of this NDA may result in immediate termination from the beta program, legal action, and damages including but not limited to actual damages, lost profits, and attorney fees.</p>
                        
                        <p className="text-red-600 font-semibold">⚠️ VIOLATION OF THIS NDA WILL RESULT IN LEGAL ACTION</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* 2. Intellectual Property Agreement */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={agreements.intellectualProperty}
                  onChange={(e) => setAgreements({ ...agreements, intellectualProperty: e.target.checked })}
                  className="w-6 h-6 mt-1 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  id="ip"
                />
                <div className="flex-1">
                  <label htmlFor="ip" className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-bold text-gray-900">Intellectual Property & Trademark Agreement</h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      You acknowledge that ZALPHA owns <strong className="text-red-600">all intellectual property rights</strong> 
                      to the platform, including patents, trademarks, copyrights, and trade secrets. You agree that you 
                      <strong className="text-red-600"> CANNOT replicate, copy, reverse engineer, or use</strong> any aspect 
                      of ZALPHA's software, features, or business model.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowIP(!showIP)}
                      className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                    >
                      {showIP ? 'Hide' : 'Read'} Full IP Agreement →
                    </button>
                    
                    {showIP && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-2 max-h-64 overflow-y-auto border border-gray-200">
                        <p><strong>INTELLECTUAL PROPERTY AGREEMENT</strong></p>
                        
                        <p><strong>1. Ownership:</strong> Recipient acknowledges and agrees that ZALPHA, Inc. owns all right, title, and interest in and to:
                          <br/>• The ZALPHA platform and all its features
                          <br/>• All software, algorithms, and code
                          <br/>• The "ZALPHA" name, logo, and all trademarks
                          <br/>• AI models including "Zee," "Zal," and "Airen Nakamura"
                          <br/>• Gamification systems and skills assessments
                          <br/>• Business models and processes
                          <br/>• User interface designs and user experience flows
                          <br/>• Database structures and data models
                        </p>
                        
                        <p><strong>2. Prohibited Activities:</strong> Recipient explicitly agrees to NOT:
                          <br/>• Copy, replicate, or recreate any feature or functionality
                          <br/>• Reverse engineer, decompile, or disassemble the software
                          <br/>• Use screenshots, recordings, or documentation to recreate features
                          <br/>• Use the ZALPHA name, logo, or any trademarks
                          <br/>• Create derivative works based on ZALPHA
                          <br/>• Access the platform to build a competing product
                          <br/>• Use any knowledge gained to benefit a competitor
                        </p>
                        
                        <p><strong>3. Trademark Protection:</strong> "ZALPHA," "Zee," "Zal," and all associated marks are protected trademarks. Unauthorized use will result in trademark infringement claims.</p>
                        
                        <p><strong>4. Patent Rights:</strong> ZALPHA's unique features and processes may be covered by pending or issued patents. Use or replication may constitute patent infringement.</p>
                        
                        <p className="text-red-600 font-semibold">⚠️ VIOLATION WILL RESULT IN IMMEDIATE LEGAL ACTION FOR THEFT OF INTELLECTUAL PROPERTY</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* 3. Non-Compete Agreement */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-red-300 transition-colors">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={agreements.nonCompete}
                  onChange={(e) => setAgreements({ ...agreements, nonCompete: e.target.checked })}
                  className="w-6 h-6 mt-1 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                  id="noncompete"
                />
                <div className="flex-1">
                  <label htmlFor="noncompete" className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-bold text-gray-900">5-Year Non-Compete & Non-Implementation Agreement</h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      For <strong className="text-red-600">FIVE (5) YEARS</strong> from today, you agree that you 
                      <strong className="text-red-600"> WILL NOT</strong> create, launch, operate, or participate in any 
                      SaaS platform, job board, career services software, or similar technology in your geographic region 
                      that competes with or resembles ZALPHA's features or business model.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowNonCompete(!showNonCompete)}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      {showNonCompete ? 'Hide' : 'Read'} Full Non-Compete Agreement →
                    </button>
                    
                    {showNonCompete && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-2 max-h-64 overflow-y-auto border border-gray-200">
                        <p><strong>NON-COMPETE AND NON-IMPLEMENTATION AGREEMENT</strong></p>
                        
                        <p><strong>1. Term:</strong> This agreement is effective for FIVE (5) YEARS from the date of acceptance.</p>
                        
                        <p><strong>2. Geographic Scope:</strong> This agreement applies to the following regions:
                          <br/>• Commonwealth of the Northern Mariana Islands (CNMI)
                          <br/>• Federated States of Micronesia (FSM)
                          <br/>• Guam
                          <br/>• Hawaii
                          <br/>• Palau
                          <br/>• Republic of the Marshall Islands
                          <br/>• Any Pacific Island territory or region where ZALPHA operates
                        </p>
                        
                        <p><strong>3. Prohibited Activities:</strong> Recipient agrees to NOT:
                          <br/>• Create or launch a competing job platform or career services SaaS
                          <br/>• Develop software with similar features (AI interviews, skills games, job matching, etc.)
                          <br/>• Implement any ZALPHA features in another product or service
                          <br/>• Participate in, invest in, or advise a competing venture
                          <br/>• Recruit ZALPHA users to a competing platform
                          <br/>• Use knowledge gained from beta testing to compete with ZALPHA
                        </p>
                        
                        <p><strong>4. "Similar Features" Definition:</strong> Includes but not limited to:
                          <br/>• AI-powered interview coaching or practice
                          <br/>• Gamified skills assessments
                          <br/>• Job matching algorithms
                          <br/>• Student-employer connection platforms
                          <br/>• Pacific Islands-focused career services
                          <br/>• Virtual job fair platforms
                          <br/>• Contract-based job posting systems
                        </p>
                        
                        <p><strong>5. Enforcement:</strong> If Recipient breaches this agreement, ZALPHA is entitled to:
                          <br/>• Immediate injunctive relief to stop the competing activity
                          <br/>• Monetary damages equal to 3x actual damages or $500,000 (whichever is greater)
                          <br/>• Recovery of all attorney fees and court costs
                          <br/>• Disgorgement of all profits from the competing venture
                        </p>
                        
                        <p><strong>6. Reasonableness:</strong> Recipient acknowledges that this agreement is reasonable given:
                          <br/>• The proprietary nature of ZALPHA's technology
                          <br/>• The limited geographic market
                          <br/>• The significant investment by ZALPHA
                          <br/>• The competitive advantage gained through beta access
                        </p>
                        
                        <p className="text-red-600 font-semibold">⚠️ COMPETING ACTIVITIES WILL RESULT IN IMMEDIATE LEGAL ACTION AND SIGNIFICANT FINANCIAL DAMAGES</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* 4. Privacy & Data Usage */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={agreements.privacyPolicy}
                  onChange={(e) => setAgreements({ ...agreements, privacyPolicy: e.target.checked })}
                  className="w-6 h-6 mt-1 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  id="privacy"
                />
                <div className="flex-1">
                  <label htmlFor="privacy" className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-bold text-gray-900">Privacy Policy & Data Protection Guarantee</h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      Your privacy is <strong className="text-green-600">extremely important</strong> to us. We guarantee that:
                      <br/>✅ <strong>We will NEVER sell your information</strong> to third parties
                      <br/>✅ Your data is encrypted and securely stored
                      <br/>✅ You maintain control over your information
                      <br/>✅ We only use data to improve ZALPHA
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowPrivacy(!showPrivacy)}
                      className="text-green-600 hover:text-green-700 font-semibold text-sm"
                    >
                      {showPrivacy ? 'Hide' : 'Read'} Full Privacy Policy →
                    </button>
                    
                    {showPrivacy && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-2 max-h-64 overflow-y-auto border border-gray-200">
                        <p><strong>PRIVACY POLICY & DATA PROTECTION</strong></p>
                        
                        <p><strong>1. Our Commitment:</strong> ZALPHA is committed to protecting your privacy and maintaining the confidentiality of your personal information.</p>
                        
                        <p><strong>2. Data We Collect:</strong>
                          <br/>• Beta questionnaire responses
                          <br/>• Feature ratings and feedback
                          <br/>• Usage analytics (page views, clicks, time on platform)
                          <br/>• Device information (type, browser, IP address)
                          <br/>• Geographic location (for security verification)
                          <br/>• Account credentials (username, encrypted password)
                        </p>
                        
                        <p><strong>3. How We Use Your Data:</strong>
                          <br/>• Improve platform features and user experience
                          <br/>• Analyze usage patterns to prioritize development
                          <br/>• Provide personalized recommendations
                          <br/>• Ensure platform security and prevent fraud
                          <br/>• Generate anonymized aggregate reports
                        </p>
                        
                        <p><strong className="text-green-600">4. WE WILL NEVER:</strong>
                          <br/>• ❌ Sell your personal information to third parties
                          <br/>• ❌ Share your data with advertisers
                          <br/>• ❌ Use your information for purposes beyond ZALPHA
                          <br/>• ❌ Disclose your data without your consent (except as required by law)
                        </p>
                        
                        <p><strong>5. Your Rights:</strong>
                          <br/>• Access your data at any time
                          <br/>• Request data correction or deletion
                          <br/>• Opt-out of analytics tracking (after initial ratings)
                          <br/>• Export your data in standard formats
                          <br/>• Withdraw consent (results in beta termination)
                        </p>
                        
                        <p><strong>6. Data Security:</strong>
                          <br/>• All data encrypted in transit (SSL/TLS)
                          <br/>• Passwords hashed using industry-standard algorithms
                          <br/>• Regular security audits and penetration testing
                          <br/>• Access controls and audit logs
                          <br/>• Compliance with FERPA and privacy regulations
                        </p>
                        
                        <p><strong>7. Data Retention:</strong> Beta testing data is retained for the duration of the beta program plus 2 years for analysis, then anonymized or deleted.</p>
                        
                        <p className="text-green-600 font-semibold">✅ YOUR PRIVACY IS PROTECTED - WE NEVER SELL YOUR DATA</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* 5. Hold Harmless Agreement */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-yellow-300 transition-colors">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={agreements.holdHarmless}
                  onChange={(e) => setAgreements({ ...agreements, holdHarmless: e.target.checked })}
                  className="w-6 h-6 mt-1 text-yellow-600 rounded focus:ring-2 focus:ring-yellow-500"
                  id="harmless"
                />
                <div className="flex-1">
                  <label htmlFor="harmless" className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-yellow-600" />
                      <h3 className="text-lg font-bold text-gray-900">Hold Harmless & Liability Waiver</h3>
                    </div>
                    <p className="text-gray-700">
                      You agree to hold ZALPHA, Inc., its officers, employees, and affiliates harmless from any claims, 
                      damages, or liabilities arising from your use of the beta platform. ZALPHA is not liable for any 
                      issues, errors, or consequences resulting from beta testing. You use the platform 
                      <strong> "AS IS"</strong> and <strong>"AT YOUR OWN RISK."</strong>
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* 6. Data Usage Consent */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={agreements.dataUsageConsent}
                  onChange={(e) => setAgreements({ ...agreements, dataUsageConsent: e.target.checked })}
                  className="w-6 h-6 mt-1 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  id="consent"
                />
                <div className="flex-1">
                  <label htmlFor="consent" className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-bold text-gray-900">Data Usage & Analytics Consent</h3>
                    </div>
                    <p className="text-gray-700">
                      You consent to ZALPHA collecting analytics data including page views, clicks, feature usage, 
                      device information, and IP address for the purpose of improving the platform. All data remains 
                      confidential and is never sold. You understand that analytics tracking begins after you complete 
                      initial feature ratings.
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
              <p className="text-red-800 font-semibold">{error}</p>
            </div>
          )}

          {/* Final Warning */}
          <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
            <p className="text-yellow-900 font-semibold mb-2">⚠️ LEGAL NOTICE:</p>
            <p className="text-yellow-900 text-sm leading-relaxed">
              By checking all boxes and clicking "I Accept," you acknowledge that you have read, understood, and agree 
              to be legally bound by these agreements. These agreements are enforceable under applicable laws. Violation 
              of any agreement may result in immediate termination from the beta program and legal action including but 
              not limited to injunctive relief, monetary damages, and recovery of attorney fees.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={onDecline}
              className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              Decline & Exit
            </button>
            <button
              onClick={handleAccept}
              disabled={!allAgreed}
              className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${
                allAgreed
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {allAgreed ? 'I Accept - Proceed to Beta Program' : 'Accept All Agreements to Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
