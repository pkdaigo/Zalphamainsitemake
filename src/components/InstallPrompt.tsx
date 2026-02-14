import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { promptInstall, isRunningAsPWA } from '@/pwa-register';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already installed or dismissed
    if (isRunningAsPWA() || dismissed) {
      return;
    }

    // Check if user has dismissed before
    const wasDismissed = localStorage.getItem('zalpha-install-dismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Listen for PWA install availability
    const handleInstallAvailable = () => {
      setShowPrompt(true);
    };

    window.addEventListener('pwa-install-available', handleInstallAvailable);

    return () => {
      window.removeEventListener('pwa-install-available', handleInstallAvailable);
    };
  }, [dismissed]);

  const handleInstall = async () => {
    const accepted = await promptInstall();
    if (accepted) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('zalpha-install-dismissed', 'true');
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-in slide-in-from-bottom-4">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl shadow-2xl p-4">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
            <Download className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="flex-1 pt-1">
            <h3 className="font-bold text-lg mb-1">Install ZALPHA App</h3>
            <p className="text-sm text-white/90 mb-3">
              Get the full experience! Install ZALPHA on your device for quick access and offline features.
            </p>
            
            <button
              onClick={handleInstall}
              className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Install Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}