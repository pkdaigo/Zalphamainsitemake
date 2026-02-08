import QRCode from 'react-qr-code';
import { Download, Smartphone, Share2 } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { useState } from 'react';

interface QRCodePageProps {
  onNavigate: (page: string) => void;
}

export function QRCodePage({ onNavigate }: QRCodePageProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('https://www.zalpharecruit.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: 'ZALPHA Job Platform',
        text: 'Join ZALPHA - Connecting Pacific Island students with career opportunities!',
        url: 'https://www.zalpharecruit.com',
      });
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-b from-slate-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Smartphone className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4">Install ZALPHA App</h1>
          <p className="text-xl text-blue-100">
            Scan the QR code to install on your phone
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        {/* QR Code Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Scan to Install</h2>
            
            {/* QR Code */}
            <div className="inline-block p-8 bg-white rounded-xl shadow-lg">
              <QRCode
                id="qr-code"
                value="https://www.zalpharecruit.com"
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                viewBox={`0 0 256 256`}
              />
            </div>

            {/* App URL */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-2">Or visit directly:</p>
              <a 
                href="https://www.zalpharecruit.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-mono text-sm break-all"
              >
                https://www.zalpharecruit.com
              </a>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download QR Code
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share App Link
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">How to Install:</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">Open your camera app</p>
                <p className="text-sm text-slate-600">iPhone Camera or Android Camera app</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">Point at the QR code</p>
                <p className="text-sm text-slate-600">Hold your phone steady until it recognizes the code</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">Tap the notification</p>
                <p className="text-sm text-slate-600">Your phone will show a link - tap to open</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <p className="font-semibold text-slate-900">Install the app</p>
                <p className="text-sm text-slate-600">Follow the install prompts in your browser</p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform-Specific Tips */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-bold text-slate-900 mb-3">📱 iPhone Tips</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Use the built-in Camera app</li>
              <li>• Open in Safari (not Chrome)</li>
              <li>• Look for "Add to Home Screen"</li>
              <li>• QR scanner works from Control Center</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-green-50 rounded-xl p-6 border border-green-100">
            <h4 className="font-bold text-slate-900 mb-3">🤖 Android Tips</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Use Camera or Google Lens</li>
              <li>• Open in Chrome browser</li>
              <li>• Tap "Install app" when prompted</li>
              <li>• Works with most QR scanner apps</li>
            </ul>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <BackButton
            onClick={() => onNavigate('install-guide')}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← View Full Install Guide
          </BackButton>
        </div>
      </div>
    </div>
  );
}