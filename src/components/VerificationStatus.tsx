import { useState } from 'react';
import { Shield, Clock, CheckCircle, AlertTriangle, Mail, Phone } from 'lucide-react';

interface VerificationStatusProps {
  verificationStatus: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  submittedAt?: Date;
  onResubmit?: () => void;
}

export function VerificationStatus({ verificationStatus, rejectionReason, submittedAt, onResubmit }: VerificationStatusProps) {
  
  // Pending Verification
  if (verificationStatus === 'pending') {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-7 h-7 text-yellow-600 animate-pulse" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-yellow-900 mb-2">ID Verification Pending</h2>
            <p className="text-yellow-800">
              Thank you for submitting your ID documents! Our team is currently reviewing your verification.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Documents Submitted</p>
              <p className="text-sm text-gray-600">
                {submittedAt ? `On ${submittedAt.toLocaleDateString()} at ${submittedAt.toLocaleTimeString()}` : 'Recently'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Under Review</p>
              <p className="text-sm text-gray-600">
                Our verification team is checking your documents
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Approval Pending</p>
              <p className="text-sm text-gray-600">
                You'll be notified once your account is verified
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-2">⏱️ Typical Processing Time</h3>
          <p className="text-sm text-blue-800">
            <strong>1-2 business days</strong> - Most verifications are completed within this timeframe
          </p>
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-3">What Happens Next?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Our team verifies your age (18+) from your government ID</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>We confirm your student status from your student ID</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>We check that your graduation is within 1 year (current or recent graduate)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Once approved, you'll receive an email and can access all platform features</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 flex gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>Check your email for updates</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>Contact support if urgent</span>
          </div>
        </div>
      </div>
    );
  }

  // Approved Verification
  if (verificationStatus === 'approved') {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              ✓ Verification Complete!
            </h2>
            <p className="text-green-800">
              Your account has been verified. You now have full access to ZALPHA!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-gray-900">Age verified (18+)</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-gray-900">Student status confirmed</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-gray-900">Graduation eligibility confirmed</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-gray-900">Identity documents approved</span>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-2">🎉 What You Can Do Now:</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>✓ Apply for jobs from top employers</li>
            <li>✓ Complete your profile and add skills</li>
            <li>✓ Upload your resume and transcripts (optional)</li>
            <li>✓ Take skills assessment games (Ultra Premium)</li>
            <li>✓ Review companies you've worked with</li>
          </ul>
        </div>
      </div>
    );
  }

  // Rejected Verification
  if (verificationStatus === 'rejected') {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-red-900 mb-2">
              Verification Issue
            </h2>
            <p className="text-red-800">
              We were unable to verify your account with the documents provided.
            </p>
          </div>
        </div>

        {rejectionReason && (
          <div className="bg-white border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-red-900 mb-2">Reason for Rejection:</h3>
            <p className="text-sm text-red-800">{rejectionReason}</p>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Common Issues & Solutions:</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <div>
                <strong>Blurry or unreadable photos:</strong> Take new photos in good lighting
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <div>
                <strong>Expired ID:</strong> Upload a current, valid government-issued ID
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <div>
                <strong>Under 18 years old:</strong> ZALPHA requires users to be 18+
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <div>
                <strong>Graduation outside eligibility window:</strong> Must have graduated within 1 year
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <div>
                <strong>Name mismatch:</strong> Ensure names on both IDs match your application
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <div>
                <strong>Missing student ID:</strong> Both government ID and student ID are required
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-1">Need Help?</h3>
              <p className="text-sm text-yellow-800">
                If you believe this was an error or need assistance, please contact our support team at{' '}
                <a href="mailto:support@zalpharecruit.com" className="underline font-semibold">support@zalpharecruit.com</a>
              </p>
            </div>
          </div>
        </div>

        {onResubmit && (
          <button
            onClick={onResubmit}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
          >
            Resubmit Verification Documents
          </button>
        )}

        <p className="text-xs text-center text-gray-600 mt-4">
          Please ensure all documents are clear, valid, and meet our requirements before resubmitting
        </p>
      </div>
    );
  }

  return null;
}