import { useState } from 'react';
import { CheckCircle, XCircle, FileText, DollarSign, Calendar, MapPin, Briefcase, Clock, AlertTriangle, Shield, Info, Download, Star } from 'lucide-react';

interface JobOffer {
  id: string;
  employerName: string;
  employerLogo?: string;
  jobTitle: string;
  location: string;
  salary: string;
  startDate: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  benefits: string[];
  offerLetterUrl?: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'declined';
}

interface JobOfferAcceptanceProps {
  offer: JobOffer;
  onAccept: (offerId: string) => void;
  onDecline: (offerId: string, reason: string) => void;
  onClose?: () => void;
}

export function JobOfferAcceptance({ offer, onAccept, onDecline, onClose }: JobOfferAcceptanceProps) {
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [acceptanceStep, setAcceptanceStep] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleAccept = () => {
    if (!agreedToTerms) {
      alert('Please read and agree to the terms before accepting');
      return;
    }
    
    // Track in analytics
    console.log('OFFER ACCEPTED:', {
      offerId: offer.id,
      employerName: offer.employerName,
      jobTitle: offer.jobTitle,
      salary: offer.salary,
      timestamp: new Date().toISOString(),
    });
    
    onAccept(offer.id);
  };

  const handleDecline = () => {
    if (!declineReason.trim()) {
      alert('Please provide a reason for declining (helps us improve!)');
      return;
    }
    
    // Track in analytics
    console.log('OFFER DECLINED:', {
      offerId: offer.id,
      employerName: offer.employerName,
      jobTitle: offer.jobTitle,
      reason: declineReason,
      timestamp: new Date().toISOString(),
    });
    
    onDecline(offer.id, declineReason);
  };

  // Calculate days until expiration
  const daysUntilExpiration = Math.ceil(
    (new Date(offer.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  if (showDeclineConfirm) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border-4 border-red-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center">
            <XCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Decline Job Offer</h2>
            <p className="text-sm text-gray-600">We're sorry this wasn't the right fit</p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold text-gray-900 mb-1">Position: {offer.jobTitle}</p>
          <p className="text-sm text-gray-600">Company: {offer.employerName}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Why are you declining? (Required) *
          </label>
          <select
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-2"
          >
            <option value="">Select a reason...</option>
            <option value="accepted_another_offer">I accepted another offer</option>
            <option value="salary_too_low">Salary is too low</option>
            <option value="location_not_convenient">Location isn't convenient</option>
            <option value="schedule_conflict">Schedule doesn't work for me</option>
            <option value="not_interested_anymore">No longer interested in this role</option>
            <option value="continuing_education">Continuing my education instead</option>
            <option value="personal_reasons">Personal reasons</option>
            <option value="other">Other</option>
          </select>
          <p className="text-xs text-gray-600">
            Your feedback helps us improve job matching and helps the employer understand student preferences
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Before you decline:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>This action cannot be undone</li>
                <li>The employer will be notified immediately</li>
                <li>You may not be able to re-apply for this position</li>
                <li>Consider reaching out to discuss concerns first</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowDeclineConfirm(false)}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Go Back
          </button>
          <button
            onClick={handleDecline}
            disabled={!declineReason}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            Decline Offer
          </button>
        </div>
      </div>
    );
  }

  if (showAcceptConfirm) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl mx-auto border-4 border-green-300">
        {acceptanceStep === 0 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Accept Job Offer</h2>
                <p className="text-sm text-gray-600">Review and confirm your acceptance</p>
              </div>
            </div>

            <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
              <div className="flex items-start gap-4 mb-4">
                {offer.employerLogo && (
                  <img src={offer.employerLogo} alt={offer.employerName} className="w-16 h-16 rounded-lg object-cover" />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{offer.jobTitle}</h3>
                  <p className="text-gray-700 font-medium">{offer.employerName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-gray-900">{offer.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{offer.employmentType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Starts: {offer.startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{offer.location}</span>
                </div>
              </div>

              {offer.benefits && offer.benefits.length > 0 && (
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Benefits Included:</p>
                  <div className="flex flex-wrap gap-2">
                    {offer.benefits.map((benefit, index) => (
                      <span key={index} className="px-3 py-1 bg-white border border-green-300 text-green-800 rounded-full text-xs font-medium">
                        ✓ {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* MANDATORY ON-PLATFORM ACCEPTANCE */}
            <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-bold mb-2">🔒 Why must I accept on ZALPHA?</p>
                  <ul className="space-y-1 text-xs">
                    <li>• <strong>Legal Protection:</strong> Your acceptance is documented and legally binding</li>
                    <li>• <strong>Payment Security:</strong> Ensures proper payment processing through our escrow system</li>
                    <li>• <strong>Student Rights:</strong> Protects your FERPA rights and employment terms</li>
                    <li>• <strong>School Support:</strong> Your school earns commission (beta example: 0.5%) to support career services</li>
                    <li>• <strong>Analytics:</strong> Helps us track success rates and improve matching</li>
                    <li>• <strong>Dispute Resolution:</strong> ZALPHA can assist if issues arise</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-900">
                  <p className="font-bold mb-2">⚠️ IMPORTANT: Off-Platform Agreements Are Prohibited</p>
                  <p className="mb-2">
                    Accepting job offers outside of ZALPHA violates our Terms of Service and can result in:
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li>• <strong>Account Termination:</strong> Immediate suspension from the platform</li>
                    <li>• <strong>No Legal Protection:</strong> ZALPHA cannot assist with disputes</li>
                    <li>• <strong>No Payment Security:</strong> Risk of payment issues or wage theft</li>
                    <li>• <strong>School Loses Revenue:</strong> Your educational institution loses support funding</li>
                    <li>• <strong>Affects Future Students:</strong> Damages employer relationships for your peers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <div className="flex-1 text-sm text-gray-800">
                  <p className="font-semibold mb-1">I agree to the following terms:</p>
                  <ul className="space-y-1 text-xs">
                    <li>✓ I accept this job offer and commit to starting on {offer.startDate}</li>
                    <li>✓ I will complete all onboarding through ZALPHA's platform</li>
                    <li>✓ I will NOT negotiate or accept alternative arrangements outside ZALPHA</li>
                    <li>✓ All payments and contract work will be processed through ZALPHA's escrow system</li>
                    <li>✓ I understand my school earns 0.5% commission from this hire</li>
                    <li>✓ I have read the <a href="#" className="text-blue-600 underline">Employment Agreement</a> and <a href="#" className="text-blue-600 underline">Terms of Service</a></li>
                  </ul>
                </div>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowAcceptConfirm(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => setAcceptanceStep(1)}
                disabled={!agreedToTerms}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Continue to Final Step
              </button>
            </div>
          </>
        )}

        {acceptanceStep === 1 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Final Confirmation</h2>
                <p className="text-sm text-gray-600">You're one click away from your new job!</p>
              </div>
            </div>

            <div className="mb-6 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Final Reminder Before Acceptance
              </h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">1.</span>
                  <span>This acceptance is <strong>legally binding</strong> and cannot be reversed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">2.</span>
                  <span>The employer will be notified <strong>immediately</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">3.</span>
                  <span>You must decline other pending offers after accepting this one</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">4.</span>
                  <span>All work and payments <strong>must</strong> go through ZALPHA's platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">5.</span>
                  <span>Your acceptance data will be shared with your educational institution</span>
                </li>
              </ul>
            </div>

            <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
              <h3 className="font-bold text-green-900 mb-3">🎉 What Happens Next?</h3>
              <ol className="space-y-2 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">1.</span>
                  <span>Employer receives your acceptance notification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">2.</span>
                  <span>You'll receive onboarding instructions via ZALPHA Messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">3.</span>
                  <span>Complete required paperwork (I-9, W-4, direct deposit, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">4.</span>
                  <span>Your school receives notification and earns 0.5% commission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">5.</span>
                  <span>Start your new job on {offer.startDate}! 🚀</span>
                </li>
              </ol>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setAcceptanceStep(0)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Go Back
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold text-lg shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-6 h-6" />
                Accept Job Offer
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Initial offer view
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border-4 border-blue-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Job Offer Received!</h2>
            <p className="text-sm text-gray-600">Congratulations on your offer</p>
          </div>
        </div>
        {daysUntilExpiration <= 3 && (
          <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            Expires in {daysUntilExpiration} day{daysUntilExpiration !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
        <div className="flex items-start gap-4 mb-4">
          {offer.employerLogo && (
            <img src={offer.employerLogo} alt={offer.employerName} className="w-20 h-20 rounded-lg object-cover shadow-md" />
          )}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{offer.jobTitle}</h3>
            <p className="text-gray-700 font-medium text-lg">{offer.employerName}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-600">Compensation</span>
            </div>
            <p className="font-bold text-gray-900">{offer.salary}</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-600">Employment Type</span>
            </div>
            <p className="font-bold text-gray-900">{offer.employmentType}</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-gray-600">Start Date</span>
            </div>
            <p className="font-bold text-gray-900">{offer.startDate}</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="text-xs text-gray-600">Location</span>
            </div>
            <p className="font-bold text-gray-900">{offer.location}</p>
          </div>
        </div>

        {offer.benefits && offer.benefits.length > 0 && (
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-900 mb-2">Benefits Package:</p>
            <div className="flex flex-wrap gap-2">
              {offer.benefits.map((benefit, index) => (
                <span key={index} className="px-3 py-1 bg-green-50 border border-green-300 text-green-800 rounded-full text-xs font-medium">
                  ✓ {benefit}
                </span>
              ))}
            </div>
          </div>
        )}

        {offer.offerLetterUrl && (
          <div className="mt-4">
            <a
              href={offer.offerLetterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm"
            >
              <Download className="w-4 h-4" />
              Download Official Offer Letter
            </a>
          </div>
        )}
      </div>

      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-800">
            <p className="font-semibold mb-1">✅ All offers must be accepted on ZALPHA</p>
            <p>
              This protects your rights, ensures payment security, and allows your school to earn commission 
              that supports career services. Accepting offers outside the platform violates Terms of Service.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setShowDeclineConfirm(true)}
          className="flex-1 px-6 py-3 border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <XCircle className="w-5 h-5" />
          Decline
        </button>
        <button
          onClick={() => setShowAcceptConfirm(true)}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold shadow-lg flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Accept Offer
        </button>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full mt-4 px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
        >
          Review Later
        </button>
      )}
    </div>
  );
}