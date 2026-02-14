import { useState } from 'react';
import { Smartphone, Apple, ArrowRight, Star, Download, Bell, Zap, Shield, Globe, CheckCircle, Eye, TrendingUp } from 'lucide-react';

interface NativeAppPrototypeProps {
  onNavigate?: (page: string) => void;
}

export function NativeAppPrototype({ onNavigate }: NativeAppPrototypeProps) {
  const [selectedPhone, setSelectedPhone] = useState<'ios' | 'android'>('ios');
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const iosScreenshots = [
    {
      title: 'Login Screen',
      description: 'Sleek iOS design with Face ID support',
      features: ['Face ID / Touch ID', 'Biometric Security', 'Remember Me']
    },
    {
      title: 'Job Feed',
      description: 'Swipe through personalized job matches',
      features: ['AI Matching', 'Swipe Gestures', 'Save for Later']
    },
    {
      title: 'Skills Assessment',
      description: 'Gamified tests optimized for mobile',
      features: ['Touch Controls', 'Progress Tracking', 'Instant Results']
    },
    {
      title: 'Push Notifications',
      description: 'Never miss a job opportunity',
      features: ['Real-time Alerts', 'Custom Settings', 'Smart Timing']
    }
  ];

  const androidScreenshots = [
    {
      title: 'Material Design',
      description: 'Native Android experience',
      features: ['Material You', 'Dynamic Colors', 'Smooth Animations']
    },
    {
      title: 'Widget Support',
      description: 'Job updates on your home screen',
      features: ['Live Widgets', 'Quick Actions', 'At-a-Glance Info']
    },
    {
      title: 'Offline Mode',
      description: 'Access saved jobs without internet',
      features: ['Offline Access', 'Auto-Sync', 'Data Saving']
    },
    {
      title: 'Split Screen',
      description: 'Multitask while job hunting',
      features: ['Multi-Window', 'Picture-in-Picture', 'Task Switching']
    }
  ];

  const screenshots = selectedPhone === 'ios' ? iosScreenshots : androidScreenshots;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-block mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <Smartphone className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-5xl font-bold text-white mb-4">
          📱 Native Mobile Apps
          <span className="block text-3xl text-yellow-400 mt-2">3D Interactive Prototype</span>
        </h2>
        <p className="text-2xl text-white/90 max-w-3xl mx-auto">
          Experience the future of ZALPHA with our native iOS & Android apps - <strong>coming soon!</strong>
        </p>
      </div>

      {/* Platform Selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setSelectedPhone('ios');
            setCurrentScreenshot(0);
          }}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
            selectedPhone === 'ios'
              ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-2xl scale-105 border-4 border-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          <Apple className="w-6 h-6" />
          iOS App
          {selectedPhone === 'ios' && <CheckCircle className="w-5 h-5 text-green-400" />}
        </button>
        <button
          onClick={() => {
            setSelectedPhone('android');
            setCurrentScreenshot(0);
          }}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
            selectedPhone === 'android'
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-2xl scale-105 border-4 border-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          <Smartphone className="w-6 h-6" />
          Android App
          {selectedPhone === 'android' && <CheckCircle className="w-5 h-5 text-yellow-400" />}
        </button>
      </div>

      {/* 3D Phone Mockup Container */}
      <div className="relative min-h-[700px] flex items-center justify-center perspective-1000">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* 3D Phone Frame */}
        <div className="relative z-10 transform-gpu transition-all duration-700 hover:scale-105">
          <div className={`relative w-[340px] h-[680px] rounded-[60px] shadow-2xl transform-gpu transition-all duration-700 ${
            selectedPhone === 'ios' 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-8 border-gray-900 rotate-y-6' 
              : 'bg-gradient-to-br from-green-900 via-green-800 to-green-950 border-8 border-green-900 -rotate-y-6'
          }`}>
            {/* Phone Notch/Camera */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20"></div>
            
            {/* Phone Screen */}
            <div className="absolute inset-3 bg-white rounded-[50px] overflow-hidden">
              {/* Status Bar */}
              <div className={`h-12 flex items-center justify-between px-8 pt-2 ${
                selectedPhone === 'ios' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                  : 'bg-gradient-to-r from-green-600 to-teal-600'
              }`}>
                <span className="text-white text-xs font-bold">9:41</span>
                <div className="flex items-center gap-1">
                  <Bell className="w-3 h-3 text-white" />
                  <div className="w-5 h-3 bg-white/80 rounded-sm"></div>
                </div>
              </div>

              {/* App Content - Screenshot Showcase */}
              <div className="h-full bg-gradient-to-br from-blue-50 to-cyan-50 p-4 pb-20">
                <div className="bg-white rounded-3xl shadow-xl h-full p-4 overflow-hidden">
                  <div className="space-y-3">
                    {/* Screenshot Title */}
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 px-2">
                        {screenshots[currentScreenshot].title}
                      </h3>
                      <p className="text-xs text-gray-600 px-2 line-clamp-2">
                        {screenshots[currentScreenshot].description}
                      </p>
                    </div>

                    {/* Mock Content */}
                    <div className="space-y-2">
                      {screenshots[currentScreenshot].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="font-semibold text-gray-800 text-xs leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Mock Job Card */}
                    <div className="mt-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-3 border-2 border-purple-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-gray-900 text-sm truncate">Marketing Assistant</div>
                          <div className="text-xs text-gray-600 truncate">Guam Premium Hotels</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-white px-2 py-1 rounded-lg text-xs font-semibold text-purple-700">
                          $18/hr
                        </div>
                        <div className="bg-white px-2 py-1 rounded-lg text-xs font-semibold text-purple-700">
                          Full-time
                        </div>
                      </div>
                    </div>

                    {/* Screenshot Navigation */}
                    <div className="flex justify-center gap-2 mt-4">
                      {screenshots.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentScreenshot(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentScreenshot === idx 
                              ? 'bg-purple-600 w-8' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Indicator (iOS) or Navigation Bar (Android) */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full"></div>
            </div>

            {/* Phone Buttons */}
            <div className="absolute right-0 top-32 w-1 h-16 bg-gray-700 rounded-l"></div>
            <div className="absolute right-0 top-52 w-1 h-12 bg-gray-700 rounded-l"></div>
            <div className="absolute left-0 top-40 w-1 h-8 bg-gray-700 rounded-r"></div>
          </div>

          {/* Floating Feature Badges */}
          <div className="absolute -right-12 top-20 animate-float">
            <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-xl">
              ⚡ Fast
            </div>
          </div>
          <div className="absolute -left-12 top-40 animate-float delay-500">
            <div className="bg-green-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-xl">
              🔒 Secure
            </div>
          </div>
          <div className="absolute -right-16 bottom-32 animate-float delay-1000">
            <div className="bg-purple-400 text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl">
              📱 Native
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setCurrentScreenshot((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentScreenshot((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-xl"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Native Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border-2 border-blue-400/50">
          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Push Notifications</h3>
          <p className="text-white/80">Get instant alerts for new job matches, messages, and application updates</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border-2 border-purple-400/50">
          <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Offline Access</h3>
          <p className="text-white/80">Browse saved jobs and complete applications even without internet</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border-2 border-green-400/50">
          <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Biometric Security</h3>
          <p className="text-white/80">Face ID, Touch ID, and fingerprint authentication for maximum security</p>
        </div>
      </div>

      {/* App Store Preview Cards */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* iOS App Store */}
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-8 border-2 border-blue-400/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-xl">
              <Apple className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">ZALPHA</h3>
              <p className="text-blue-300">Pacific Job Connection</p>
            </div>
          </div>
          
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="ml-2 text-white font-semibold">5.0</span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-white/80">
              <span>Age Rating</span>
              <span className="font-semibold text-white">12+</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Category</span>
              <span className="font-semibold text-white">Business</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Size</span>
              <span className="font-semibold text-white">45.2 MB</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Compatibility</span>
              <span className="font-semibold text-white">iOS 14.0+</span>
            </div>
          </div>

          <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Coming to App Store
          </button>
        </div>

        {/* Android Google Play */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border-2 border-green-400/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">ZALPHA</h3>
              <p className="text-blue-300">Pacific Job Connection</p>
            </div>
          </div>
          
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="ml-2 text-white font-semibold">5.0</span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-white/80">
              <span>Content Rating</span>
              <span className="font-semibold text-white">Everyone</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Category</span>
              <span className="font-semibold text-white">Business</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Size</span>
              <span className="font-semibold text-white">38.5 MB</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Android</span>
              <span className="font-semibold text-white">8.0+</span>
            </div>
          </div>

          <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Coming to Google Play
          </button>
        </div>
      </div>

      {/* Key Advantages */}
      <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-3xl p-8 border-2 border-orange-400/50">
        <h3 className="text-3xl font-bold text-white mb-6 text-center">Why Native Apps Matter</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <Eye className="w-8 h-8 text-orange-400 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Better User Experience</h4>
              <p className="text-white/80">Smoother animations, faster load times, and native gestures that feel natural</p>
            </div>
          </div>
          <div className="flex gap-4">
            <TrendingUp className="w-8 h-8 text-orange-400 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Increased Engagement</h4>
              <p className="text-white/80">Push notifications keep users coming back and never miss opportunities</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Globe className="w-8 h-8 text-orange-400 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Works Everywhere</h4>
              <p className="text-white/80">Perfect for Pacific islands with limited connectivity - offline mode saves the day</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Star className="w-8 h-8 text-orange-400 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Professional Credibility</h4>
              <p className="text-white/80">Presence in App Store & Google Play builds trust and legitimacy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 text-center border-4 border-white/50">
        <h3 className="text-4xl font-bold text-white mb-4">🚀 Coming Soon to Your Pocket!</h3>
        <p className="text-xl text-white/90 mb-6">
          Native iOS and Android apps are in active development. In the meantime, enjoy the full-featured web app!
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-4 bg-white text-purple-700 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Use Web App Now
          </button>
          <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all border-2 border-white">
            Get Notified at Launch
          </button>
        </div>
      </div>
    </div>
  );
}