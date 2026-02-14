import { FileText, CheckCircle, Shield, Download, Eye, Calendar, GraduationCap } from 'lucide-react';

interface Transcript {
  id: string;
  fileName: string;
  uploadDate: Date;
  verified: boolean;
  institution: string;
  graduationDate: string;
  gpa?: string;
  studentName: string;
}

interface TranscriptViewerProps {
  transcripts: Transcript[];
  studentName: string;
  isEmployer?: boolean;
  hasAccess?: boolean;
}

export function TranscriptViewer({ 
  transcripts, 
  studentName, 
  isEmployer = false,
  hasAccess = false 
}: TranscriptViewerProps) {
  
  // No transcripts shared
  if (transcripts.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No transcripts have been shared</p>
      </div>
    );
  }

  // Employer without access
  if (isEmployer && !hasAccess) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">Ultra Premium Transcripts Available</h4>
            <p className="text-sm text-gray-700 mb-3">
              {studentName} has shared {transcripts.length} verified transcript{transcripts.length > 1 ? 's' : ''}.
              Upgrade to Professional to view official transcripts.
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {transcripts.map((transcript) => (
            <div key={transcript.id} className="bg-white border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{transcript.institution}</p>
                    {transcript.verified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Graduated: {transcript.graduationDate}</p>
                  {transcript.gpa && (
                    <p className="text-sm text-gray-600">GPA: {transcript.gpa}</p>
                  )}
                </div>
                <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded border border-gray-300">
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Locked</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg">
          Upgrade to Professional Plan
        </button>
      </div>
    );
  }

  // Full access view (student or employer with access)
  return (
    <div className="space-y-4">
      {transcripts.map((transcript) => (
        <div key={transcript.id} className="bg-white border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-gray-900 text-lg">{transcript.fileName}</h4>
                  {transcript.verified && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      VERIFIED
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <span><strong>Institution:</strong> {transcript.institution}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span><strong>Graduated:</strong> {transcript.graduationDate}</span>
                  </div>
                  {transcript.gpa && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Star className="w-4 h-4 text-purple-600" />
                      <span><strong>GPA:</strong> {transcript.gpa}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar className="w-4 h-4" />
                    <span>Uploaded: {transcript.uploadDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          {transcript.verified && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-green-800 text-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <p>
                  <strong>Verified by ZALPHA:</strong> This transcript has been verified as an authentic, 
                  unaltered document from {transcript.institution}.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              View Transcript
            </button>
            <button className="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-semibold flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          {/* Employer View Tracking */}
          {!isEmployer && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                <Eye className="w-3 h-3 inline mr-1" />
                Viewed by 3 employers
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800">
            {isEmployer ? (
              <>
                <strong>Professional Feature:</strong> Transcript access is only available to verified Professional 
                plan employers. These documents are encrypted and access is tracked for student privacy.
              </>
            ) : (
              <>
                <strong>Your Privacy:</strong> Transcripts are encrypted and only visible to Professional plan employers 
                when you apply. You can disable sharing at any time from your profile.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}