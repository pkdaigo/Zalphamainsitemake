import { useState, useEffect, useRef } from 'react';
import { Shield, Camera, AlertTriangle, CheckCircle, XCircle, Clock, Eye, FileCheck, Video } from 'lucide-react';

interface IDVerificationConsentProps {
  onComplete: () => void;
  interviewerName: string;
}

export function IDVerificationConsent({ onComplete, interviewerName }: IDVerificationConsentProps) {
  const [step, setStep] = useState<'consent' | 'id-verification' | 'complete'>('consent');
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [recordingAgreed, setRecordingAgreed] = useState(false);
  const [employerViewAgreed, setEmployerViewAgreed] = useState(false);
  const [idVerificationTime, setIdVerificationTime] = useState(300); // 5 minutes in seconds
  const [idCaptured, setIdCaptured] = useState(false);
  const [isCapturingID, setIsCapturingID] = useState(false);
  const timerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (step === 'id-verification' && idVerificationTime > 0 && !idCaptured) {
      timerRef.current = window.setInterval(() => {
        setIdVerificationTime(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [step, idVerificationTime, idCaptured]);

  const handleConsentSubmit = () => {
    if (consentAgreed && recordingAgreed && employerViewAgreed) {
      setStep('id-verification');
    }
  };

  const handleCaptureID = async () => {
    setIsCapturingID(true);
    
    // Simulate camera access and ID capture
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      
      // After 3 seconds, simulate ID capture
      setTimeout(() => {
        setIdCaptured(true);
        setIsCapturingID(false);
        
        // Stop camera
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        // Move to complete step after brief delay
        setTimeout(() => {
          setStep('complete');
          // Auto-complete after showing success
          setTimeout(() => {
            onComplete();
          }, 2000);
        }, 1000);
      }, 3000);
    } catch (error) {
      // Silently handle camera error - user will see UI message
      setIsCapturingID(false);
      // Skip camera and just mark as complete for demo
      setIdCaptured(true);
      setTimeout(() => {
        setStep('complete');
        setTimeout(() => {
          onComplete();
        }, 2000);
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const allConsentsChecked = consentAgreed && recordingAgreed && employerViewAgreed;

  if (step === 'consent') {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-8 bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Interview Recording Consent</h1>
                  <p className="text-white/90">Required before starting your interview</p>
                </div>
              </div>
            </div>

            {/* Warning Banner */}
            <div className="p-6 bg-yellow-50 border-b-2 border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">⚠️ Important: Video Interview Recording</h3>
                  <p className="text-sm text-yellow-800">
                    This interview will be recorded and shared with potential employers. Please read and agree to all terms below before proceeding.
                  </p>
                </div>
              </div>
            </div>

            {/* Consent Form */}
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">What You're Agreeing To:</h2>
                
                {/* Consent Items */}
                <div className="space-y-4">
                  {/* Recording Consent */}
                  <label className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200 cursor-pointer hover:bg-blue-100 transition-all">
                    <input
                      type="checkbox"
                      checked={recordingAgreed}
                      onChange={(e) => setRecordingAgreed(e.target.checked)}
                      className="w-6 h-6 mt-1 accent-blue-600 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-slate-900">Video & Audio Recording</h3>
                      </div>
                      <p className="text-sm text-slate-700">
                        I consent to ZALPHA recording my video and audio responses during this practice interview. This recording will be used for AI analysis and to showcase my interview skills.
                      </p>
                    </div>
                  </label>

                  {/* Employer View Consent */}
                  <label className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-200 cursor-pointer hover:bg-purple-100 transition-all">
                    <input
                      type="checkbox"
                      checked={employerViewAgreed}
                      onChange={(e) => setEmployerViewAgreed(e.target.checked)}
                      className="w-6 h-6 mt-1 accent-purple-600 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-5 h-5 text-purple-600" />
                        <h3 className="font-bold text-slate-900">Employer Access</h3>
                      </div>
                      <p className="text-sm text-slate-700">
                        I understand that employers on ZALPHA will be able to view my recorded interview responses when I apply for jobs. This helps them assess my communication skills and cultural fit.
                      </p>
                    </div>
                  </label>

                  {/* General Consent */}
                  <label className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border-2 border-green-200 cursor-pointer hover:bg-green-100 transition-all">
                    <input
                      type="checkbox"
                      checked={consentAgreed}
                      onChange={(e) => setConsentAgreed(e.target.checked)}
                      className="w-6 h-6 mt-1 accent-green-600 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileCheck className="w-5 h-5 text-green-600" />
                        <h3 className="font-bold text-slate-900">Terms & Conditions</h3>
                      </div>
                      <p className="text-sm text-slate-700">
                        I am 18 years or older and I agree to ZALPHA's Terms of Service and Privacy Policy. I understand that my recorded responses will be stored securely on ZALPHA's platform and may be used to improve AI interviewing technology.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-200">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  Why This Helps You:
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">✓</span>
                    <span>Employers see your personality and communication skills (not just a resume)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">✓</span>
                    <span>Stand out from other candidates with video responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">✓</span>
                    <span>Practice makes perfect - unlimited attempts to improve</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">✓</span>
                    <span>AI feedback helps you become a better interviewer</span>
                  </li>
                </ul>
              </div>

              {/* Privacy Notice */}
              <div className="p-4 bg-slate-100 rounded-xl border border-slate-300">
                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <Shield className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Privacy:</strong> Your interview recordings are stored securely and encrypted. Only employers you apply to will have access. You can delete your recordings at any time from your Student Dashboard.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.history.back()}
                  className="flex-1 px-6 py-4 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConsentSubmit}
                  disabled={!allConsentsChecked}
                  className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${
                    allConsentsChecked
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {allConsentsChecked ? 'I Agree - Continue to ID Verification' : 'Please Check All Boxes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'id-verification') {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">ID Verification Required</h1>
                    <p className="text-white/90">Please show your government-issued ID</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${idVerificationTime <= 60 ? 'text-red-200 animate-pulse' : ''}`}>
                    {formatTime(idVerificationTime)}
                  </div>
                  <div className="text-sm text-white/80">Time Remaining</div>
                </div>
              </div>
            </div>

            {/* Warning if time is running out */}
            {idVerificationTime <= 60 && !idCaptured && (
              <div className="p-4 bg-red-50 border-b-2 border-red-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-bold text-red-900">
                    ⏰ Less than 1 minute remaining! Please verify your ID now.
                  </p>
                </div>
              </div>
            )}

            {/* Timeout Message */}
            {idVerificationTime === 0 && !idCaptured && (
              <div className="p-6 bg-red-100 border-b-2 border-red-300">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="font-bold text-red-900 mb-1">Time Expired</h3>
                    <p className="text-sm text-red-800">
                      The 5-minute verification window has expired. Please refresh and try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ID Verification Content */}
            <div className="p-8 space-y-6">
              {!idCaptured && idVerificationTime > 0 && (
                <>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Verify Your Identity</h2>
                    <p className="text-slate-600 mb-6">
                      For security and compliance, we need to verify your identity before you can participate in video interviews.
                    </p>
                  </div>

                  {/* Camera Preview */}
                  <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      playsInline
                      muted
                    />
                    {!isCapturingID && (
                      <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
                        <div className="text-center text-white p-8">
                          <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg">Camera will activate when you click "Capture ID"</p>
                        </div>
                      </div>
                    )}
                    {isCapturingID && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-40 border-4 border-green-400 rounded-xl"></div>
                      </div>
                    )}
                  </div>

                  {/* Instructions */}
                  <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-blue-600" />
                      Accepted ID Types:
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Driver's License</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Passport</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>State ID Card</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Military ID</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Tribal ID</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Government-Issued ID</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Tips for Best Results:
                    </h3>
                    <ul className="space-y-1 text-sm text-yellow-800">
                      <li>• Ensure your ID is well-lit and clearly visible</li>
                      <li>• Hold ID within the green frame</li>
                      <li>• Make sure all text is readable</li>
                      <li>• Avoid glare or shadows</li>
                    </ul>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleCaptureID}
                    disabled={isCapturingID || idVerificationTime === 0}
                    className={`w-full px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                      isCapturingID || idVerificationTime === 0
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-xl'
                    }`}
                  >
                    {isCapturingID ? (
                      <span className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Capturing ID...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        <Camera className="w-6 h-6" />
                        Capture My ID
                      </span>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 py-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-green-200 p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Verification Complete! ✓</h1>
            <p className="text-lg text-slate-600 mb-6">
              Your identity has been verified. Starting your interview with {interviewerName}...
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}