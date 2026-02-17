import { Smartphone, Download, X } from 'lucide-react';
import { useState } from 'react';

type PwaInfo = {
  isStandalone: boolean;
  isInstallPromptAvailable: boolean;
};

type PwaInstallPromptProps = {
  info: PwaInfo;
  onInstallClick: () => void;
};

export function PwaInstallPrompt(props: PwaInstallPromptProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't show if already installed or dismissed
  if (props.info.isStandalone || isDismissed || !props.info.isInstallPromptAvailable) {
    return null;
  }

  return (
    <div className="w-full rounded-3xl border-2 border-cyan-400 bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-6 shadow-xl text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300 rounded-full blur-3xl" />
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all z-10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Smartphone className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-black mb-2">Install ZALPHA Co-Op App</h3>
            <p className="text-cyan-100 text-sm leading-relaxed">
              Get quick access to your co-op dashboard, messages, and deliverables right from your home screen—no app store needed!
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <p className="text-xs font-bold text-cyan-100 mb-1">⚡ Instant Access</p>
            <p className="text-xs text-white/80">Open from home screen in 1 tap</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <p className="text-xs font-bold text-cyan-100 mb-1">📱 Works Offline</p>
            <p className="text-xs text-white/80">View info even without internet</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <p className="text-xs font-bold text-cyan-100 mb-1">🔔 Notifications</p>
            <p className="text-xs text-white/80">Stay updated on messages & shifts</p>
          </div>
        </div>

        {/* Install Button */}
        <button
          onClick={props.onInstallClick}
          className="w-full px-6 py-4 bg-white text-blue-600 rounded-xl font-black text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
        >
          <Download className="w-6 h-6" />
          Install App Now
        </button>

        <p className="text-center text-xs text-cyan-100 mt-3">
          Free • No download from app store • Takes 5 seconds
        </p>
      </div>
    </div>
  );
}
