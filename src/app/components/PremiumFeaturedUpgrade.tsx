import { useState } from 'react';
import { Crown, Video, Upload, Check, X, Sparkles } from 'lucide-react';

interface PremiumFeaturedUpgradeProps {
  userType: 'student' | 'employer';
  onClose: () => void;
  onUpgrade: (planType: string, videoFile?: File) => void;
}

export function PremiumFeaturedUpgrade({ userType, onClose, onUpgrade }: PremiumFeaturedUpgradeProps) {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'video'>('video');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');

  const pricing = userType === 'student' 
    ? { basic: 9.99, video: 19.99 }
    : { basic: 199, video: 499 };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate video file
      if (!file.type.startsWith('video/')) {
        alert('Please upload a valid video file');
        return;
      }
      
      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert('Video file must be less than 100MB');
        return;
      }

      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpgrade = () => {
    if (selectedPlan === 'video' && !videoFile) {
      alert('Please upload a video for the premium video package');
      return;
    }
    onUpgrade(selectedPlan, videoFile || undefined);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Get Featured</h2>
                <p className="text-slate-600">Stand out and get noticed</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Benefits Banner */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border-2 border-orange-200/50">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-orange-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Why Get Featured?</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  {userType === 'student' 
                    ? 'Get 10x more views from top employers'
                    : 'Get 10x more applications from qualified candidates'}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Prominent placement at the top of search results
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Premium badge that builds trust and credibility
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  {userType === 'student' 
                    ? 'Priority consideration for exclusive opportunities'
                    : 'Priority access to new verified candidates'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Basic Featured Plan */}
          <button
            onClick={() => setSelectedPlan('basic')}
            className={`text-left p-6 rounded-2xl border-2 transition-all ${
              selectedPlan === 'basic'
                ? 'border-orange-500 bg-orange-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Featured</h3>
                </div>
                <div className="text-3xl font-bold text-slate-900">${pricing.basic}<span className="text-lg text-slate-600">/mo</span></div>
              </div>
              {selectedPlan === 'basic' && (
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Featured badge on your profile
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Top placement in search results
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Enhanced profile visibility
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Monthly performance analytics
              </li>
            </ul>
          </button>

          {/* Premium Video Plan */}
          <button
            onClick={() => setSelectedPlan('video')}
            className={`text-left p-6 rounded-2xl border-2 transition-all relative ${
              selectedPlan === 'video'
                ? 'border-orange-500 bg-orange-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="absolute -top-3 left-4 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
              MOST POPULAR
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Featured + Video</h3>
                </div>
                <div className="text-3xl font-bold text-slate-900">${pricing.video}<span className="text-lg text-slate-600">/mo</span></div>
              </div>
              {selectedPlan === 'video' && (
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Everything in Featured plan
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-600 font-semibold" />
                Premium video profile (up to 2 min)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-600 font-semibold" />
                Rotating carousel feature
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-600 font-semibold" />
                3x more engagement
              </li>
            </ul>
          </button>
        </div>

        {/* Video Upload Section */}
        {selectedPlan === 'video' && (
          <div className="mb-8">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Upload Your Video</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:border-orange-400 transition-colors">
              {!videoFile ? (
                <label className="cursor-pointer flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-slate-900 font-semibold text-lg mb-2">Click to upload your video</span>
                  <span className="text-slate-600 text-sm mb-1">MP4, MOV, or AVI (max 100MB)</span>
                  <span className="text-slate-500 text-xs">Recommended: 1-2 minutes, 1080p quality</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{videoFile.name}</div>
                        <div className="text-sm text-slate-600">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setVideoFile(null);
                        setVideoPreview('');
                      }}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  {videoPreview && (
                    <video
                      src={videoPreview}
                      controls
                      className="w-full rounded-xl"
                    />
                  )}
                </div>
              )}
            </div>
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900 font-medium mb-2">Video Tips for Maximum Impact:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {userType === 'student' ? 'Introduce yourself and highlight your top skills' : 'Showcase your company culture and values'}</li>
                <li>• Keep it concise and engaging (60-90 seconds ideal)</li>
                <li>• Use good lighting and clear audio</li>
                <li>• Be authentic and show your personality</li>
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-lg"
          >
            Maybe Later
          </button>
          <button
            onClick={handleUpgrade}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-bold text-lg flex items-center justify-center gap-2"
          >
            <Crown className="w-5 h-5" />
            Upgrade to {selectedPlan === 'basic' ? 'Featured' : 'Featured + Video'}
          </button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-4">
          Cancel anytime • No long-term commitment • {userType === 'student' ? '7-day' : '3-day'} money-back guarantee
        </p>
      </div>
    </div>
  );
}