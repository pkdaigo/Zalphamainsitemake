import { useState } from 'react';
import { Upload, FileCheck, AlertCircle, CheckCircle, Shield, CreditCard, IdCard, Camera, X, Eye } from 'lucide-react';

interface IDVerificationProps {
  studentName: string;
  dateOfBirth: string;
  onVerified: (data: { 
    governmentIdUrl: string; 
    studentIdUrl: string; 
    idNumber: string;
    studentIdNumber: string;
  }) => void;
  onBack?: () => void;
}

export function IDVerification({ studentName, dateOfBirth, onVerified, onBack }: IDVerificationProps) {
  const [governmentIdFile, setGovernmentIdFile] = useState<File | null>(null);
  const [studentIdFile, setStudentIdFile] = useState<File | null>(null);
  const [governmentIdPreview, setGovernmentIdPreview] = useState<string>('');
  const [studentIdPreview, setStudentIdPreview] = useState<string>('');
  const [idNumber, setIdNumber] = useState('');
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Allowed file types
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File, fieldName: string): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `${fieldName}: Only JPG, PNG, WEBP, or PDF files are allowed`;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return `${fieldName}: File size must be less than 10MB`;
    }
    
    return null;
  };

  const handleGovernmentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file, 'Government ID');
    if (error) {
      setErrors([error]);
      return;
    }

    setGovernmentIdFile(file);
    
    // Create preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGovernmentIdPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setGovernmentIdPreview('PDF');
    }
    
    setErrors([]);
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file, 'Student ID');
    if (error) {
      setErrors([error]);
      return;
    }

    setStudentIdFile(file);
    
    // Create preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentIdPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setStudentIdPreview('PDF');
    }
    
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors: string[] = [];
    
    if (!governmentIdFile) {
      validationErrors.push('Government-issued ID is required');
    }
    
    if (!studentIdFile) {
      validationErrors.push('Student ID is required');
    }
    
    if (!idNumber) {
      validationErrors.push('ID number is required');
    } else if (idNumber.length < 4) {
      validationErrors.push('ID number must be at least 4 characters');
    }
    
    if (!studentIdNumber) {
      validationErrors.push('Student ID number is required');
    }
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // In a real app, upload to server/Supabase Storage
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Mock URLs (in production, these would come from the upload response)
      const mockGovernmentIdUrl = `https://storage.zalpharecruit.com/ids/${Date.now()}-gov-id.jpg`;
      const mockStudentIdUrl = `https://storage.zalpharecruit.com/ids/${Date.now()}-student-id.jpg`;

      onVerified({
        governmentIdUrl: mockGovernmentIdUrl,
        studentIdUrl: mockStudentIdUrl,
        idNumber,
        studentIdNumber,
      });
    } catch (error) {
      setErrors(['Upload failed. Please try again.']);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">ID Verification</h2>
            <p className="text-gray-600 text-sm">Upload your government ID and student ID for verification</p>
          </div>
        </div>

        {/* Why We Need This */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Why We Need ID Verification
          </h3>
          <ul className="space-y-2 text-sm text-purple-800">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span><strong>Safety:</strong> Ensures all students are real, verified individuals</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span><strong>Trust:</strong> Employers trust ZALPHA because all candidates are verified</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span><strong>Age Verification:</strong> Confirms you are 18+ years old</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span><strong>Student Status:</strong> Confirms you are currently enrolled or recently graduated</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span><strong>Privacy:</strong> IDs are encrypted and only reviewed by ZALPHA staff, never shared with employers</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Government ID Upload */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Government-Issued ID <span className="text-red-500">*</span>
                </h3>
                <p className="text-sm text-gray-600">Required for US work eligibility verification</p>
              </div>
            </div>

            {/* Region-Specific Document Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-bold text-blue-900 mb-3 text-sm">📋 Accepted Documents by Region:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="font-bold text-blue-900 mb-2">CNMI, Guam, Hawaii:</p>
                  <ul className="space-y-1 text-gray-700 text-xs">
                    <li>✓ Birth Certificate</li>
                    <li>✓ US Passport</li>
                    <li>✓ Permanent Resident Card</li>
                    <li className="text-gray-500 italic">(Proves US work eligibility)</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="font-bold text-blue-900 mb-2">🌺 FSM (Micronesia):</p>
                  <ul className="space-y-1 text-gray-700 text-xs">
                    <li>✓ FSM Passport</li>
                    <li>✓ Government-Issued ID</li>
                    <li className="text-gray-500 italic">(Citizenship verification)</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-blue-800 mt-3">
                <strong>Note:</strong> All documents must clearly show your full name, date of birth, and photo.
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors">
              {!governmentIdPreview ? (
                <label className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 mb-1">Upload Government ID</p>
                    <p className="text-sm text-gray-600">JPG, PNG, WEBP, or PDF (Max 10MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                    onChange={handleGovernmentIdChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                    onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                  >
                    Choose File
                  </button>
                </label>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{governmentIdFile?.name}</p>
                        <p className="text-sm text-gray-600">
                          {(governmentIdFile!.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setGovernmentIdFile(null);
                        setGovernmentIdPreview('');
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  {governmentIdPreview !== 'PDF' && (
                    <img
                      src={governmentIdPreview}
                      alt="Government ID Preview"
                      className="w-full h-48 object-contain bg-gray-50 rounded-lg"
                    />
                  )}
                </div>
              )}
            </div>

            {/* ID Number */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ID Number (Last 4-6 digits) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="e.g., 123456"
                maxLength={8}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll use this to match your ID with your application
              </p>
            </div>
          </div>

          {/* Student ID Upload */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <IdCard className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Student ID Card <span className="text-red-500">*</span>
                </h3>
                <p className="text-sm text-gray-600">Current or recent college/high school ID</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors">
              {!studentIdPreview ? (
                <label className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 mb-1">Upload Student ID</p>
                    <p className="text-sm text-gray-600">JPG, PNG, WEBP, or PDF (Max 10MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                    onChange={handleStudentIdChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                    onClick={() => {
                      const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
                      inputs[1]?.click();
                    }}
                  >
                    Choose File
                  </button>
                </label>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{studentIdFile?.name}</p>
                        <p className="text-sm text-gray-600">
                          {(studentIdFile!.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStudentIdFile(null);
                        setStudentIdPreview('');
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  {studentIdPreview !== 'PDF' && (
                    <img
                      src={studentIdPreview}
                      alt="Student ID Preview"
                      className="w-full h-48 object-contain bg-gray-50 rounded-lg"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Student ID Number */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student ID Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={studentIdNumber}
                onChange={(e) => setStudentIdNumber(e.target.value)}
                placeholder="e.g., S2024001234"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                The ID number printed on your student card
              </p>
            </div>
          </div>

          {/* Upload Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Photo Tips for Best Results
            </h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>✓ Ensure all text on ID is clearly readable</li>
              <li>✓ Take photo in good lighting (no glare or shadows)</li>
              <li>✓ Capture entire ID card in frame</li>
              <li>✓ Avoid blurry or cropped images</li>
              <li>✓ Photo or front side is sufficient (both sides not required)</li>
            </ul>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-red-900 mb-2">Please Fix the Following Issues:</h4>
                  <ul className="space-y-1">
                    {errors.map((error, idx) => (
                      <li key={idx} className="text-sm text-red-800">
                        • {error}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Upload className="w-5 h-5 text-purple-600 animate-bounce" />
                <span className="font-semibold text-purple-900">Uploading IDs...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-purple-700 mt-2">{uploadProgress}% complete</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                disabled={isUploading}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={isUploading || !governmentIdFile || !studentIdFile}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Upload className="w-5 h-5 animate-bounce" />
                  Uploading...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Submit for Verification
                </>
              )}
            </button>
          </div>
        </form>

        {/* Privacy & Security Notice */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Privacy & Security</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your IDs are encrypted and stored securely in our private database. They are only reviewed by 
                authorized ZALPHA staff for verification purposes and are never shared with employers or third parties. 
                We comply with all data protection regulations. Verification typically takes 1-2 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}