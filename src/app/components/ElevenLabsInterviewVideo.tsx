import { useState } from 'react';
import { X, Volume2, VolumeX, Maximize2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ElevenLabsInterviewVideoProps {
  onClose?: () => void;
  onComplete?: () => void;
  autoPlay?: boolean;
}

export function ElevenLabsInterviewVideo({ 
  onClose, 
  onComplete,
  autoPlay = true 
}: ElevenLabsInterviewVideoProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showControls, setShowControls] = useState(true);

  // ElevenLabs video URL
  const videoUrl = 'https://elevenlabs.io/app/image-video?generationId=afNeMTqnyK1ORpOltidg';

  const handleVideoEnd = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all group"
            aria-label="Close video"
          >
            <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Video Container */}
        <motion.div
          className="relative max-w-4xl w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(isPlaying ? false : true)}
        >
          {/* ElevenLabs Video Iframe */}
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            style={{ border: 'none' }}
            title="AI Interview with ElevenLabs"
          />

          {/* Custom Controls Overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  {/* Left: Title */}
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">
                      🎤 AI Interview Practice
                    </h3>
                    <p className="text-white/70 text-sm">
                      Watch and learn from this AI-powered interview
                    </p>
                  </div>

                  {/* Right: Control Buttons */}
                  <div className="flex items-center gap-3">
                    {/* Mute/Unmute */}
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>

                    {/* Fullscreen (native iframe fullscreen) */}
                    <button
                      onClick={() => {
                        const iframe = document.querySelector('iframe');
                        if (iframe?.requestFullscreen) {
                          iframe.requestFullscreen();
                        }
                      }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Indicator */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 pointer-events-none">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white/70 text-sm">Loading AI Interview...</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Info Banner */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <p className="text-white text-center text-sm">
              💡 <strong>Pro Tip:</strong> Watch carefully to learn best practices for answering interview questions with confidence!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
