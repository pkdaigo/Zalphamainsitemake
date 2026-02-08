import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Eye, EyeOff, Lock, Unlock, X, Shield, Crown } from 'lucide-react';

interface TranscriptFile {
  id: string;
  fileName: string;
  uploadDate: Date;
  verified: boolean;
  institution: string;
  graduationDate: string;
  gpa?: string;
}

interface TranscriptUploadProps {
  isPremium: boolean;
  onUpgrade?: () => void;
}

export function TranscriptUpload({ isPremium, onUpgrade }: TranscriptUploadProps) {
  const [isOptedIn, setIsOptedIn] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptFile[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    institution: '',
    graduationDate: '',
    gpa: '',
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In production, this would upload to Supabase Storage
    const newTranscript: TranscriptFile = {
      id: Date.now().toString(),
      fileName: file.name,
      uploadDate: new Date(),
      verified: false,
      institution: uploadFormData.institution,
      graduationDate: uploadFormData.graduationDate,
      gpa: uploadFormData.gpa,
    };

    setTranscripts([...transcripts, newTranscript]);
    setShowUploadForm(false);
    setUploadFormData({ institution: '', graduationDate: '', gpa: '' });
  };

  const handleRemoveTranscript = (id: string) => {
    setTranscripts(transcripts.filter(t => t.id !== id));
  };

  // Non-Premium View
  if (!isPremium) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-amber-200 relative overflow-hidden">
        {/* Premium Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-pink-600 text-white rounded-full text-xs font-bold">
            <Crown className="w-3 h-3" />
            PREMIUM
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Official Transcript Sharing</h3>
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-gray-600 text-sm">
              Stand out by sharing verified academic transcripts with employers (Premium Feature)
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-pink-50 border-2 border-amber-300 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Included in Premium ($6/month):
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span>Upload official transcripts (PDF, encrypted)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span>Verification badge on your profile</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span>Full privacy control - share only when you want</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span>Track which employers viewed your transcripts</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onUpgrade}
          className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-bold text-lg"
        >
          Upgrade to Premium - $6/month
        </button>
      </div>
    );
  }

  // Premium View - Opt-In Gate
  if (!isOptedIn) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Official Transcript Sharing</h3>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                ULTRA PREMIUM
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Share your academic achievements with verified employers
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Your Privacy is Protected</h4>
              <p className="text-sm text-blue-800">
                Transcript sharing is completely optional. You have full control over:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-blue-800">
                <li>• When to share (opt-in/opt-out anytime)</li>
                <li>• Which employers can view your transcripts</li>
                <li>• Track who has accessed your information</li>
                <li>• Delete your transcripts at any time</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-purple-900 mb-2">Why Share Your Transcript?</h4>
          <ul className="space-y-2 text-sm text-purple-800">
            <li>✓ Prove your academic excellence to top employers</li>
            <li>✓ Get priority consideration for competitive positions</li>
            <li>✓ Skip redundant verification steps</li>
            <li>✓ Build trust with transparent credentials</li>
            <li>✓ Stand out in the applicant pool</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsOptedIn(true)}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
          >
            <Unlock className="w-5 h-5" />
            Enable Transcript Sharing
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          You can disable this feature at any time from your profile settings
        </p>
      </div>
    );
  }

  // Premium View - Active Transcript Management
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Official Transcript Sharing</h3>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                <Unlock className="w-3 h-3" />
                ACTIVE
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Your transcripts are visible to verified employers
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOptedIn(false)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Disable Sharing
        </button>
      </div>

      {/* Uploaded Transcripts */}
      {transcripts.length > 0 && (
        <div className="space-y-3 mb-6">
          {transcripts.map((transcript) => (
            <div
              key={transcript.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{transcript.fileName}</h4>
                    {transcript.verified ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Pending Review
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-0.5">
                    <p><strong>Institution:</strong> {transcript.institution}</p>
                    <p><strong>Graduation:</strong> {transcript.graduationDate}</p>
                    {transcript.gpa && <p><strong>GPA:</strong> {transcript.gpa}</p>}
                    <p className="text-xs text-gray-500">Uploaded {transcript.uploadDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveTranscript(transcript.id)}
                className="text-red-600 hover:text-red-700 ml-4"
                aria-label="Remove transcript"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload New Transcript */}
      {!showUploadForm ? (
        <button
          onClick={() => setShowUploadForm(true)}
          className="w-full px-6 py-4 border-2 border-dashed border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Upload New Transcript
        </button>
      ) : (
        <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50">
          <h4 className="font-bold text-gray-900 mb-4">Upload Official Transcript</h4>
          
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Name *
              </label>
              <input
                type="text"
                value={uploadFormData.institution}
                onChange={(e) => setUploadFormData({ ...uploadFormData, institution: e.target.value })}
                placeholder="e.g., University of Guam"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Date *
                </label>
                <input
                  type="month"
                  value={uploadFormData.graduationDate}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, graduationDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={uploadFormData.gpa}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, gpa: e.target.value })}
                  placeholder="e.g., 3.85"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transcript File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <span className="text-purple-600 font-semibold hover:text-purple-700">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">PDF only, up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> Official transcripts must be unaltered documents from your institution. 
              Our team will verify authenticity before displaying to employers (typically 1-2 business days).
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowUploadForm(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800">
            <strong>Privacy:</strong> Your transcripts are encrypted and only visible to verified employers 
            when you apply for positions. You can disable sharing at any time.
          </p>
        </div>
      </div>
    </div>
  );
}