import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Scale, Users, Heart, Ban } from 'lucide-react';

interface NonDiscriminationPolicyProps {
  userType: 'student' | 'employer';
  onAccept: () => void;
  onDecline?: () => void;
  compact?: boolean;
}

export function NonDiscriminationPolicy({ userType, onAccept, onDecline, compact = false }: NonDiscriminationPolicyProps) {
  const [agreed, setAgreed] = useState(false);
  const [acknowledgements, setAcknowledgements] = useState({
    read: false,
    understand: false,
    comply: false,
  });

  const handleCheckbox = (field: keyof typeof acknowledgements) => {
    setAcknowledgements({ ...acknowledgements, [field]: !acknowledgements[field] });
  };

  const allAcknowledged = Object.values(acknowledgements).every(val => val === true);

  if (compact) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2">Non-Discrimination Commitment</h3>
            <p className="text-sm text-blue-800 mb-3">
              ZALPHA is committed to equal opportunity. {userType === 'employer' ? 'As an employer, you must' : 'All employers must'} evaluate candidates based solely on qualifications, skills, and experience—without discrimination.
            </p>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) onAccept();
                }}
                className="w-4 h-4 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-blue-900">
                I agree to comply with ZALPHA's Non-Discrimination Policy
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Non-Discrimination Policy</h2>
            <p className="text-gray-600 text-sm">Equal Opportunity Employment Commitment</p>
          </div>
        </div>

        {/* Policy Statement */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Our Commitment to Equal Opportunity
          </h3>
          <p className="text-sm text-blue-800 leading-relaxed mb-4">
            ZALPHA (operated by <strong>KI Executive Group</strong> and its subsidiaries) is committed to fostering 
            an inclusive environment where all students and job seekers have equal access to employment opportunities 
            regardless of protected characteristics. We believe in merit-based hiring that focuses solely on 
            qualifications, skills, experience, and potential.
          </p>
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong>All employers using the ZALPHA platform must comply with this policy.</strong> Violations may 
            result in immediate account suspension and removal from the platform.
          </p>
        </div>

        {/* Protected Classes */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Protected Characteristics
          </h3>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-700 mb-4">
              Employers <strong className="text-red-600">MUST NOT</strong> discriminate against candidates based on:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Race or Ethnicity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Color or Skin Tone</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">National Origin or Ancestry</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Religion or Creed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Sex or Gender</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Gender Identity or Expression</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Sexual Orientation</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Age (except minimum age requirements)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Disability or Physical Condition</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Medical Condition</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Genetic Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Marital or Family Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Pregnancy or Parental Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-900">Military or Veteran Status</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                <strong>Note:</strong> This list is not exhaustive. Employers must comply with all applicable federal, 
                state, and local anti-discrimination laws, including but not limited to Title VII of the Civil Rights 
                Act, Americans with Disabilities Act (ADA), Age Discrimination in Employment Act (ADEA), and applicable 
                laws in CNMI, FSM, Guam, Hawaii, Marshall Islands, and Palau.
              </p>
            </div>
          </div>
        </div>

        {/* Employer Obligations */}
        {userType === 'employer' && (
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Your Obligations as an Employer
            </h3>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Evaluate Based on Merit</p>
                  <p className="text-sm text-green-800">
                    Make hiring decisions based solely on qualifications, skills, experience, work performance, 
                    and job-related criteria
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Provide Equal Opportunity</p>
                  <p className="text-sm text-green-800">
                    Ensure all qualified candidates have equal access to job opportunities, interviews, 
                    and employment considerations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Reasonable Accommodations</p>
                  <p className="text-sm text-green-800">
                    Provide reasonable accommodations for candidates with disabilities, religious practices, 
                    or other protected needs
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Inclusive Job Postings</p>
                  <p className="text-sm text-green-800">
                    Create job descriptions that focus on required skills and qualifications without 
                    discriminatory language or requirements
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Comply with Laws</p>
                  <p className="text-sm text-green-800">
                    Adhere to all applicable federal, state, and local employment laws and regulations
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reporting and Enforcement */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Reporting Violations & Enforcement
          </h3>
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
            <p className="text-sm text-orange-900 mb-4">
              <strong>ZALPHA takes discrimination seriously.</strong> Students who experience or witness discrimination 
              can report violations through our platform.
            </p>
            <div className="space-y-2 text-sm text-orange-800">
              <p><strong>How to Report:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Use the "Report" button on job postings or employer profiles</li>
                <li>Contact ZALPHA Support at <a href="mailto:compliance@zalpharecruit.com" className="underline font-semibold">compliance@zalpharecruit.com</a></li>
                <li>Submit confidential report through student dashboard</li>
              </ul>
              <p className="mt-3"><strong>Enforcement Actions:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Investigation of all reported violations</li>
                <li>Immediate suspension of employer accounts during review</li>
                <li>Permanent removal from platform for confirmed violations</li>
                <li>Cooperation with legal authorities when appropriate</li>
                <li>Public accountability through company review system</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Student Rights */}
        {userType === 'student' && (
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />
              Your Rights as a Student
            </h3>
            <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-pink-900">
                  <strong>Equal Consideration:</strong> You have the right to be evaluated based on your 
                  qualifications, skills, and experience—not personal characteristics
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-pink-900">
                  <strong>Safe Environment:</strong> You deserve to engage with employers in a respectful, 
                  professional environment free from discrimination
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-pink-900">
                  <strong>Report Discrimination:</strong> You can report any discriminatory behavior without 
                  fear of retaliation
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-pink-900">
                  <strong>Platform Protection:</strong> ZALPHA will investigate all reports and take swift 
                  action against violating employers
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Acknowledgement Checkboxes */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Required Acknowledgements</h3>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgements.read}
                onChange={() => handleCheckbox('read')}
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                required
              />
              <span className="text-sm text-gray-900">
                I have read and understand ZALPHA's Non-Discrimination Policy in its entirety
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgements.understand}
                onChange={() => handleCheckbox('understand')}
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                required
              />
              <span className="text-sm text-gray-900">
                {userType === 'employer' 
                  ? 'I understand that I am prohibited from discriminating based on the protected characteristics listed above'
                  : 'I understand my rights to equal opportunity employment and the protections afforded to me'
                }
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgements.comply}
                onChange={() => handleCheckbox('comply')}
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                required
              />
              <span className="text-sm text-gray-900">
                {userType === 'employer'
                  ? 'I commit to complying with this policy and all applicable anti-discrimination laws, and understand that violations may result in permanent removal from the platform'
                  : 'I agree to report any discriminatory behavior I experience or witness through the proper channels'
                }
              </span>
            </label>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong>LEGAL NOTICE:</strong> This Non-Discrimination Policy is incorporated into and is part of 
            the ZALPHA Terms of Service. By using the ZALPHA platform, you agree to comply with this policy. 
            Violations constitute a breach of your agreement with KI Executive Group and its subsidiaries, 
            and may result in account termination, legal action, and reporting to appropriate regulatory authorities. 
            This policy does not create any additional rights beyond those provided by applicable law.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {onDecline && (
            <button
              onClick={onDecline}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Decline
            </button>
          )}
          <button
            onClick={onAccept}
            disabled={!allAcknowledged}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            I Accept This Policy
          </button>
        </div>
      </div>
    </div>
  );
}