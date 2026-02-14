import { useState } from 'react';
import { CheckCircle, Upload, AlertCircle, FileText, Mail, Calendar } from 'lucide-react';

interface ReviewVerificationProps {
  reviewId: string;
  studentName: string;
  companyName: string;
  position: string;
  workPeriod: string;
  onVerify: (verificationData: VerificationData) => void;
  onSkip: () => void;
}

export interface VerificationData {
  method: 'document' | 'email' | 'manual';
  documents?: File[];
  employerEmail?: string;
  verificationNotes?: string;
  verified: boolean;
}

export function ReviewVerification({
  reviewId,
  studentName,
  companyName,
  position,
  workPeriod,
  onVerify,
  onSkip,
}: ReviewVerificationProps) {
  const [verificationMethod, setVerificationMethod] = useState<'document' | 'email' | 'manual' | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [employerEmail, setEmployerEmail] = useState('');
  const [verificationNotes, setVerificationNotes] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setDocuments([...documents, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setDocuments([...documents, ...newFiles]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleSubmitVerification = () => {
    const verificationData: VerificationData = {
      method: verificationMethod!,
      documents: documents.length > 0 ? documents : undefined,
      employerEmail: employerEmail || undefined,
      verificationNotes: verificationNotes || undefined,
      verified: true,
    };
    onVerify(verificationData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Employment</h2>
        <p className="text-slate-600">
          Help us confirm you actually worked at {companyName}
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-blue-900 mb-2">Review Details:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Student:</strong> {studentName}</li>
          <li>• <strong>Company:</strong> {companyName}</li>
          <li>• <strong>Position:</strong> {position}</li>
          <li>• <strong>Period:</strong> {workPeriod}</li>
        </ul>
      </div>

      <div className="space-y-6 mb-8">
        <h3 className="font-semibold text-slate-900">Choose Verification Method:</h3>

        {/* Method Selection */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setVerificationMethod('document')}
            className={`p-6 rounded-lg border-2 transition-all ${
              verificationMethod === 'document'
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <FileText className={`w-8 h-8 mx-auto mb-3 ${
              verificationMethod === 'document' ? 'text-blue-600' : 'text-slate-400'
            }`} />
            <h4 className="font-semibold text-slate-900 mb-1">Upload Documents</h4>
            <p className="text-xs text-slate-600">
              Offer letter, pay stub, or certificate
            </p>
          </button>

          <button
            onClick={() => setVerificationMethod('email')}
            className={`p-6 rounded-lg border-2 transition-all ${
              verificationMethod === 'email'
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <Mail className={`w-8 h-8 mx-auto mb-3 ${
              verificationMethod === 'email' ? 'text-blue-600' : 'text-slate-400'
            }`} />
            <h4 className="font-semibold text-slate-900 mb-1">Employer Verification</h4>
            <p className="text-xs text-slate-600">
              We'll contact your employer
            </p>
          </button>

          <button
            onClick={() => setVerificationMethod('manual')}
            className={`p-6 rounded-lg border-2 transition-all ${
              verificationMethod === 'manual'
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <Calendar className={`w-8 h-8 mx-auto mb-3 ${
              verificationMethod === 'manual' ? 'text-blue-600' : 'text-slate-400'
            }`} />
            <h4 className="font-semibold text-slate-900 mb-1">Manual Review</h4>
            <p className="text-xs text-slate-600">
              Admin will verify manually
            </p>
          </button>
        </div>

        {/* Document Upload */}
        {verificationMethod === 'document' && (
          <div className="space-y-4">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            >
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-700 mb-2">
                Drag and drop your documents here, or
              </p>
              <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                <span>Browse Files</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                />
              </label>
              <p className="text-xs text-slate-500 mt-2">
                Accepted: PDF, JPG, PNG, DOC (max 10MB each)
              </p>
            </div>

            {documents.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900">Uploaded Documents:</h4>
                {documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{file.name}</p>
                        <p className="text-xs text-slate-600">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeDocument(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Acceptable Documents:</p>
                  <ul className="space-y-1">
                    <li>• Offer letter or employment contract</li>
                    <li>• Pay stub or payroll record</li>
                    <li>• Internship completion certificate</li>
                    <li>• Official company email communication</li>
                  </ul>
                  <p className="mt-2 text-xs">
                    <strong>Note:</strong> Personal information will be kept confidential
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Verification */}
        {verificationMethod === 'email' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Manager or HR Contact Email
              </label>
              <input
                type="email"
                value={employerEmail}
                onChange={(e) => setEmployerEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="hr@company.com or manager@company.com"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">What Happens Next:</p>
                  <ul className="space-y-1">
                    <li>• We'll send a verification email to the contact you provided</li>
                    <li>• They'll confirm your employment dates and position</li>
                    <li>• Your review will be marked as "Verified" once confirmed</li>
                    <li>• This typically takes 1-3 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manual Review */}
        {verificationMethod === 'manual' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Additional Information
              </label>
              <textarea
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide any details that can help verify your employment (e.g., supervisor name, specific projects, dates, team members, etc.)"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Manual Verification Process:</p>
                  <ul className="space-y-1">
                    <li>• Our admin team will review your information</li>
                    <li>• We may contact you for additional details</li>
                    <li>• We'll cross-reference with company records if available</li>
                    <li>• Verification typically takes 3-5 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onSkip}
          className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Skip for Now
        </button>
        <button
          onClick={handleSubmitVerification}
          disabled={
            !verificationMethod ||
            (verificationMethod === 'document' && documents.length === 0) ||
            (verificationMethod === 'email' && !employerEmail)
          }
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Submit Verification
        </button>
      </div>

      <p className="text-xs text-slate-500 text-center mt-4">
        Your review will be marked as "Pending Verification" until confirmed.
        Verified reviews carry more weight in company ratings.
      </p>
    </div>
  );
}
