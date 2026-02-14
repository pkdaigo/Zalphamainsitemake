import { useState } from 'react';
import { CheckCircle, FileText, Shield, Scale } from 'lucide-react';
import { NonDiscriminationPolicy } from './NonDiscriminationPolicy';
import { HoldHarmlessAgreement } from './HoldHarmlessAgreement';

interface LegalAgreementFlowProps {
  userType: 'student' | 'employer';
  onComplete: () => void;
  onCancel?: () => void;
}

export function LegalAgreementFlow({ userType, onComplete, onCancel }: LegalAgreementFlowProps) {
  const [currentStep, setCurrentStep] = useState<'overview' | 'nondiscrimination' | 'holdharmless' | 'complete'>('overview');
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    nonDiscrimination: false,
    holdHarmless: false,
  });

  const handleNonDiscriminationAccept = () => {
    setAgreements({ ...agreements, nonDiscrimination: true });
    setCurrentStep('holdharmless');
  };

  const handleHoldHarmlessAccept = () => {
    setAgreements({ ...agreements, holdHarmless: true });
    setCurrentStep('complete');
  };

  const handleFinalAccept = () => {
    if (allAgreed) {
      onComplete();
    }
  };

  const allAgreed = Object.values(agreements).every(val => val === true);

  // Overview Step
  if (currentStep === 'overview') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Legal Agreements</h2>
              <p className="text-gray-600 text-sm">Please review and accept the following</p>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-blue-900 leading-relaxed mb-4">
              Before creating your ZALPHA account, you must review and accept our legal agreements. 
              These agreements protect both you and KI Executive Group and outline important rights and responsibilities.
            </p>
            <p className="text-sm text-blue-900 font-semibold">
              This will take approximately 5-10 minutes to review.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {/* Terms of Service */}
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Terms of Service</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    General terms governing your use of the ZALPHA platform, including account rules, 
                    user responsibilities, and platform policies.
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreements.termsOfService}
                      onChange={(e) => setAgreements({ ...agreements, termsOfService: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-900">
                      I have read and agree to the Terms of Service
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Non-Discrimination Policy */}
            <div className={`border-2 rounded-lg p-4 ${userType === 'employer' ? 'border-purple-200 bg-purple-50' : 'border-gray-200'}`}>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    Non-Discrimination Policy
                    {userType === 'employer' && <span className="text-red-600 ml-2">*REQUIRED FOR EMPLOYERS</span>}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {userType === 'employer' 
                      ? 'As an employer, you must commit to equal opportunity hiring practices and agree not to discriminate based on protected characteristics.'
                      : 'ZALPHA is committed to equal opportunity. All employers must evaluate you based on qualifications, not personal characteristics.'
                    }
                  </p>
                  <div className="text-xs text-gray-600 bg-white rounded p-2 mb-3">
                    Covers: Race, Gender, Age, Disability, Religion, Sexual Orientation, and more
                  </div>
                  <div className="text-sm text-gray-600">
                    ✓ {agreements.nonDiscrimination ? 'Reviewed and accepted' : 'To be reviewed in next step'}
                  </div>
                </div>
              </div>
            </div>

            {/* Hold Harmless Agreement */}
            <div className="border-2 border-amber-200 bg-amber-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Scale className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    Hold Harmless & Indemnification Agreement
                    <span className="text-red-600 ml-2">*REQUIRED</span>
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    You agree to release and hold harmless KI Executive Group and its subsidiaries from 
                    liability arising from your use of the platform.
                  </p>
                  <div className="text-xs text-gray-600 bg-white rounded p-2 mb-3">
                    Covers: Liability limitations, indemnification obligations, and legal protections
                  </div>
                  <div className="text-sm text-gray-600">
                    ✓ {agreements.holdHarmless ? 'Reviewed and accepted' : 'To be reviewed in final step'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-red-800">
              <strong>LEGAL NOTICE:</strong> By proceeding, you acknowledge that these are legally binding agreements. 
              You must accept all agreements to use ZALPHA. If you do not agree, please do not continue.
            </p>
          </div>

          <div className="flex gap-4">
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
            )}
            <button
              onClick={() => setCurrentStep('nondiscrimination')}
              disabled={!agreements.termsOfService}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Agreements
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Non-Discrimination Policy Step
  if (currentStep === 'nondiscrimination') {
    return (
      <NonDiscriminationPolicy
        userType={userType}
        onAccept={handleNonDiscriminationAccept}
        onDecline={() => setCurrentStep('overview')}
      />
    );
  }

  // Hold Harmless Agreement Step
  if (currentStep === 'holdharmless') {
    return (
      <HoldHarmlessAgreement
        userType={userType}
        onAccept={handleHoldHarmlessAccept}
        onDecline={() => setCurrentStep('nondiscrimination')}
      />
    );
  }

  // Complete Step
  if (currentStep === 'complete') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Agreements Complete</h2>
              <p className="text-gray-600 text-sm">All legal requirements accepted</p>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-green-900 mb-3">✓ You Have Accepted:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Terms of Service</span>
              </div>
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Non-Discrimination Policy</span>
              </div>
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Hold Harmless & Indemnification Agreement</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900 leading-relaxed">
              <strong>Congratulations!</strong> You've completed all legal requirements. 
              {userType === 'employer' 
                ? ' As an employer, remember to comply with our Non-Discrimination Policy in all hiring activities.'
                : ' You\'re protected by our policies and can report any discriminatory behavior you experience.'
              }
            </p>
          </div>

          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>Legal Record:</strong> By clicking "Complete," you confirm that you have read, understood, 
              and agreed to all legal agreements. These agreements are now in effect and govern your use of ZALPHA. 
              A copy has been saved to your account and can be accessed at any time through your account settings.
            </p>
          </div>

          <button
            onClick={handleFinalAccept}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Complete & Continue to Registration
          </button>
        </div>
      </div>
    );
  }

  return null;
}