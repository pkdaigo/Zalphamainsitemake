import { useState, useRef, useEffect } from 'react';
import { Video, Upload, Trash2, Play, Pause, StopCircle, Camera, Check, AlertCircle, RefreshCw, Download } from 'lucide-react';

interface VideoIntroRecorderProps {
  onVideoSaved: (videoBlob: Blob, videoUrl: string) => void;
  existingVideoUrl?: string;
  maxDurationSeconds?: number;
  userType: 'student' | 'employer';
}

export function VideoIntroRecorder({
  onVideoSaved,
  existingVideoUrl,
  maxDurationSeconds = 120, // 2 minutes default
  userType
}: VideoIntroRecorderProps) {
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'paused' | 'preview'>('idle');
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(existingVideoUrl || null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [countdown, setCountdown] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopStream();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: true
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      // Start countdown
      setCountdown(3);
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            startRecordingNow(mediaStream);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError('Could not access camera and microphone. Please grant permissions.');
      // Silently handle - error message shown to user via UI
    }
  };

  const startRecordingNow = (mediaStream: MediaStream) => {
    try {
      chunksRef.current = [];
      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        setRecordingState('preview');
        stopStream();
      };

      mediaRecorder.start(100);
      mediaRecorderRef.current = mediaRecorder;
      setRecordingState('recording');
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= maxDurationSeconds) {
            stopRecording();
          }
          return newTime;
        });
      }, 1000);
    } catch (err) {
      setError('Failed to start recording. Please try again.');
      console.error('Recording error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const deleteRecording = () => {
    if (recordedVideoUrl) {
      URL.revokeObjectURL(recordedVideoUrl);
    }
    setRecordedVideoUrl(null);
    setRecordingState('idle');
    setRecordingTime(0);
    chunksRef.current = [];
  };

  const saveVideo = () => {
    if (recordedVideoUrl) {
      // Convert URL back to blob
      fetch(recordedVideoUrl)
        .then(res => res.blob())
        .then(blob => {
          onVideoSaved(blob, recordedVideoUrl);
        });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError('Video file is too large. Maximum size is 50MB.');
        return;
      }

      // Check file type
      if (!file.type.startsWith('video/')) {
        setError('Please upload a valid video file.');
        return;
      }

      const url = URL.createObjectURL(file);
      setRecordedVideoUrl(url);
      setRecordingState('preview');
      onVideoSaved(file, url);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Video className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-gray-900 mb-1">
              {userType === 'student' ? '🎥 Video Introduction' : '🏢 Company Video Introduction'}
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              {userType === 'student' 
                ? 'Record a 30-120 second video to introduce yourself to employers. Show your personality and enthusiasm!'
                : 'Record a video to introduce your company culture, team, and workplace environment to candidates.'
              }
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>✓ Up to {maxDurationSeconds} seconds</li>
              <li>✓ Record on camera or upload a video file</li>
              <li>✓ Required for profile activation</li>
              <li>⚠️ Keep it professional - reviewed by ZALPHA team</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 mb-1">Error</p>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Video Display */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
        <div className="aspect-video bg-gray-900 relative">
          {countdown > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
              <div className="text-center">
                <div className="text-8xl font-bold text-white mb-4">{countdown}</div>
                <p className="text-xl text-white">Get ready...</p>
              </div>
            </div>
          )}

          {recordingState === 'recording' && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              REC {formatTime(recordingTime)} / {formatTime(maxDurationSeconds)}
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={recordingState === 'recording'}
            controls={recordingState === 'preview'}
            className="w-full h-full object-cover"
            src={recordingState === 'preview' ? recordedVideoUrl || undefined : undefined}
          >
            Your browser does not support video playback.
          </video>

          {recordingState === 'idle' && !recordedVideoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Camera preview will appear here</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 space-y-4">
          {recordingState === 'idle' && !recordedVideoUrl && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={startCamera}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-bold flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Start Recording
              </button>
              <label className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all font-bold flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-5 h-5" />
                Upload Video
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {recordingState === 'recording' && (
            <button
              onClick={stopRecording}
              className="w-full px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all font-bold flex items-center justify-center gap-2"
            >
              <StopCircle className="w-5 h-5" />
              Stop Recording
            </button>
          )}

          {recordingState === 'preview' && recordedVideoUrl && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={deleteRecording}
                className="px-6 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all font-bold flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete & Re-record
              </button>
              <button
                onClick={saveVideo}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Save Video Introduction
              </button>
            </div>
          )}

          {existingVideoUrl && recordingState === 'idle' && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800 font-semibold">
                Video introduction saved! You can record a new one anytime.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4">
        <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Recording Tips
        </h4>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• Find a quiet location with good lighting</li>
          <li>• Dress professionally and smile!</li>
          <li>• Look directly at the camera</li>
          <li>• Speak clearly and with enthusiasm</li>
          {userType === 'student' ? (
            <>
              <li>• Mention your skills, experience, and career goals</li>
              <li>• Share what makes you unique</li>
            </>
          ) : (
            <>
              <li>• Showcase your company culture and team</li>
              <li>• Highlight what makes your workplace special</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z" />
      <path d="M20 3L21 6L24 7L21 8L20 11L19 8L16 7L19 6L20 3Z" />
    </svg>
  );
}