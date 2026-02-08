import { Smartphone, Monitor, Download, CheckCircle, Wifi, Bell, Zap } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { isRunningAsPWA } from '@/pwa-register';

interface InstallGuideProps {
  onNavigate: (page: string) => void;
}

export function InstallGuide({ onNavigate }: InstallGuideProps) {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-b from-slate-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Download className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4">Install ZALPHA App</h1>
          {isRunningAsPWA() ? (
            <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              Already Installed
            </div>
          ) : (
            <p className="text-xl text-blue-100">
              Install ZALPHA on your device for the best experience
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        {/* Benefits Cards */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Install?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Fast & Easy</h3>
              <p className="text-sm text-slate-600">Quick access from your home screen</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wifi className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Works Offline</h3>
              <p className="text-sm text-slate-600">Access features without internet</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Stay Updated</h3>
              <p className="text-sm text-slate-600">Get notified of new opportunities</p>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="space-y-6">
          {/* iPhone */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6">
              <div className="flex items-center gap-3">
                <Smartphone className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold">iPhone / iPad</h3>
                  <p className="text-slate-300 text-sm">Using Safari browser</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-semibold text-slate-900">Open in Safari</p>
                    <p className="text-sm text-slate-600">Must use Safari browser (not Chrome)</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-semibold text-slate-900">Tap the Share button</p>
                    <p className="text-sm text-slate-600">Square icon with arrow pointing up (⬆️)</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-semibold text-slate-900">Select "Add to Home Screen"</p>
                    <p className="text-sm text-slate-600">Scroll down if you don't see it</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-semibold text-slate-900">Tap "Add"</p>
                    <p className="text-sm text-slate-600">ZALPHA icon appears on your home screen!</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Android */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
              <div className="flex items-center gap-3">
                <Smartphone className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold">Android</h3>
                  <p className="text-green-100 text-sm">Using Chrome browser</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-semibold text-slate-900">Open in Chrome</p>
                    <p className="text-sm text-slate-600">Chrome browser recommended</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-semibold text-slate-900">Look for install prompt</p>
                    <p className="text-sm text-slate-600">Banner appears at bottom of screen</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-semibold text-slate-900">Tap "Install" or menu (⋮)</p>
                    <p className="text-sm text-slate-600">Or go to menu → "Install app"</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-semibold text-slate-900">Confirm installation</p>
                    <p className="text-sm text-slate-600">ZALPHA icon appears on your home screen!</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Desktop */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <div className="flex items-center gap-3">
                <Monitor className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold">Desktop</h3>
                  <p className="text-purple-100 text-sm">Windows, Mac, or Linux</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-semibold text-slate-900">Open in Chrome or Edge</p>
                    <p className="text-sm text-slate-600">Works in most modern browsers</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-semibold text-slate-900">Look for install icon</p>
                    <p className="text-sm text-slate-600">Computer or plus icon (➕) in address bar</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-semibold text-slate-900">Click "Install"</p>
                    <p className="text-sm text-slate-600">Or menu → "Install ZALPHA"</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-semibold text-slate-900">Launch as standalone app</p>
                    <p className="text-sm text-slate-600">Opens in its own window!</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">🤔 I don't see the install option</h3>
              <p className="text-slate-600 text-sm">Make sure you're using a supported browser (Safari for iOS, Chrome for Android/Desktop). Clear your browser cache and try again.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">💾 How much space does it take?</h3>
              <p className="text-slate-600 text-sm">Very little! PWAs are much smaller than traditional apps, typically just a few megabytes.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">🔄 How do I update the app?</h3>
              <p className="text-slate-600 text-sm">Updates happen automatically! Just refresh the app and you'll get the latest version.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">🗑️ How do I uninstall?</h3>
              <p className="text-slate-600 text-sm">iOS: Long press icon → "Remove App" | Android: Long press → "Uninstall" | Desktop: Right-click icon → Remove</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <BackButton
            onNavigate={onNavigate}
            destination="landing"
            label="Back to Home"
          />
          <span className="mx-4 text-slate-400">|</span>
          <button
            onClick={() => onNavigate('qr-code')}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            View QR Code →
          </button>
        </div>
      </div>
    </div>
  );
}