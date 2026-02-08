import { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Play, StopCircle, RotateCcw, CheckCircle, Camera } from 'lucide-react';

interface VideoIntroductionProps {
  onVideoRecorded: (videoBlob: Blob, videoUrl: string) => void;
  required?: boolean;
}

export function VideoIntroduction({ onVideoRecorded, required = true }: VideoIntroductionProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showPrompts, setShowPrompts] = useState(true);
  
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const playbackRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const introductionQuestions = [
    "What's your name and where are you from?",
    "What are you currently studying or what did you study?",
    "What type of job or career are you looking for?",
    "What are your top 3 skills or strengths?",
    "Why should an employer choose you?"
  ];

  // Request camera permission
  const requestCameraPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }, 
        audio: true 
      });
      setStream(mediaStream);
      setHasPermission(true);
      setPermissionDenied(false);
      
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      // Silently handle camera permission denial - user will see permission denied UI
      setPermissionDenied(true);
      setHasPermission(false);
    }
  };

  // Start recording
  const startRecording = () => {
    if (!stream) return;
    
    setShowPrompts(false);
    chunksRef.current = [];
    
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp8,opus'
    });
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
      setRecordedBlob(blob);
      onVideoRecorded(blob, url);
      
      // Stop all tracks
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setStream(null);
      setHasPermission(false);
    };
    
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
    setTimeLeft(30);
    
    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Reset and re-record
  const resetRecording = () => {
    setRecordedVideo(null);
    setRecordedBlob(null);
    setTimeLeft(30);
    setShowPrompts(true);
    chunksRef.current = [];
    requestCameraPermission();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <Video className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              📹 30-Second Video Introduction {required && <span className="text-red-500">*</span>}
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Record a brief video introducing yourself to potential employers. This helps them get to know you beyond your resume!
            </p>
            
            {showPrompts && !recordedVideo && (
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="font-semibold text-purple-900 mb-2 text-sm">💡 Answer these questions in your video:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  {introductionQuestions.map((question, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="font-bold text-purple-600 flex-shrink-0">{index + 1}.</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-xs text-yellow-900">
                    <strong>💼 Tip:</strong> Be authentic, smile, and speak clearly. Employers love seeing your personality!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Recording/Preview Area */}
        <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
          {!hasPermission && !recordedVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              {permissionDenied ? (
                <div className="text-center p-6">
                  <VideoOff className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h4 className="text-white font-semibold mb-2">Camera Access Denied</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Please enable camera and microphone access to record your introduction video.
                  </p>
                  <button
                    type="button"
                    onClick={requestCameraPermission}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="text-center p-6">
                  <Camera className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-white font-semibold mb-2">Ready to Record?</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Click below to enable your camera and microphone
                  </p>
                  <button
                    type="button"
                    onClick={requestCameraPermission}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    Enable Camera
                  </button>
                </div>
              )}
            </div>
          )}

          {hasPermission && !recordedVideo && (
            <>
              <video
                ref={videoPreviewRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <span>REC {timeLeft}s</span>
                </div>
              )}
              {isRecording && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur rounded-lg p-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-purple-600 h-full transition-all duration-1000"
                        style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {recordedVideo && (
            <div className="relative w-full h-full">
              <video
                ref={playbackRef}
                src={recordedVideo}
                controls
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Recorded!
              </div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="mt-4 flex gap-3 justify-center">
          {!isRecording && !recordedVideo && hasPermission && (
            <button
              type="button"
              onClick={startRecording}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              <Play className="w-5 h-5" />
              Start Recording
            </button>
          )}

          {isRecording && (
            <button
              type="button"
              onClick={stopRecording}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              <StopCircle className="w-5 h-5" />
              Stop Recording
            </button>
          )}

          {recordedVideo && (
            <button
              type="button"
              onClick={resetRecording}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              <RotateCcw className="w-5 h-5" />
              Re-record Video
            </button>
          )}
        </div>

        {recordedVideo && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Great job! Your video introduction is ready.</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              You can re-record if you'd like to make changes, or continue with your signup.
            </p>
          </div>
        )}

        {required && !recordedVideo && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>📌 Required:</strong> Please record your video introduction to continue with the signup process.
            </p>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-600">
          <strong>🔒 Privacy:</strong> Your video will only be visible to employers when you apply for jobs or when they search for candidates. You can delete or update your video anytime from your profile settings.
        </p>
      </div>
    </div>
  );
}