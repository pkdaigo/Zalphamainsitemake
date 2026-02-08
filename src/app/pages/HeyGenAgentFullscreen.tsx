import { useEffect } from 'react';

export function HeyGenAgentFullscreen() {
  useEffect(() => {
    // Redirect to HeyGen agent in fullscreen mode
    window.location.href = 'https://app.heygen.com/agent/share/e3fadf75-7037-4c98-9068-98e0692242ae';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
          <span className="text-6xl">🤖</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Launching AI Interview Agent...
        </h1>
        <p className="text-cyan-200 text-lg">
          Please wait while we connect you to the interactive agent
        </p>
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
