import { useState } from 'react';
import { HelpCircle, Sparkles, Video } from 'lucide-react';
import { ZalphaBot } from './ZalphaBot';
import { DIDAgent } from './DIDAgent';
import { Button } from './ui/button';

interface ZeeBotWrapperProps {
  onNavigate?: (page: string) => void;
  userName?: string;
}

export function ZeeBotWrapper({ onNavigate, userName }: ZeeBotWrapperProps) {
  const [showZeeBot, setShowZeeBot] = useState(false);
  const [showVideoAgent, setShowVideoAgent] = useState(false);

  return (
    <>
      {/* Zee Bot Modal (Text) */}
      {showZeeBot && (
        <ZalphaBot 
          onNavigate={(page) => {
            setShowZeeBot(false);
            onNavigate?.(page);
          }} 
          userName={userName} 
        />
      )}

      {/* D-ID Video Agent Modal */}
      {showVideoAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-5xl">
            <DIDAgent
              agentType="zee"
              onClose={() => setShowVideoAgent(false)}
            />
          </div>
        </div>
      )}

      {/* Floating Zee Button with Options */}
      {!showZeeBot && !showVideoAgent && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
          {/* Video Chat Option */}
          <Button
            onClick={() => setShowVideoAgent(true)}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all"
          >
            <Video className="h-4 w-4 mr-2" />
            Video Chat
          </Button>

          {/* Main Zee Button */}
          <div className="group">
            <button
              onClick={() => setShowZeeBot(true)}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center border-4 border-white"
              aria-label="Open Zee Assistant"
            >
              <div className="relative">
                {/* Orchid icon representation */}
                <svg width="32" height="32" viewBox="0 0 32 32" className="drop-shadow-lg">
                  {/* Simple orchid shape */}
                  <circle cx="16" cy="16" r="8" fill="white" opacity="0.3" />
                  <circle cx="16" cy="16" r="5" fill="white" />
                  <circle cx="14" cy="15" r="1.5" fill="#1e293b" />
                  <circle cx="18" cy="15" r="1.5" fill="#1e293b" />
                  <path d="M 13 18 Q 16 20 19 18" stroke="#E879F9" strokeWidth="1" fill="none" strokeLinecap="round" />
                </svg>
                
                {/* Sparkle indicator */}
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Hi! I'm Zee 🌺 Click me for help!
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
