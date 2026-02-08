/**
 * HeyGen AI Avatar Demo Page for ZALPHA
 * Demonstrates the new HeyGen integration
 */

import { BackButton } from '@/app/components/BackButton';
import { HeyGenExample } from '@/app/components/heygen-example';

interface HeyGenDemoProps {
  onNavigate: (page: string) => void;
}

export function HeyGenDemo({ onNavigate }: HeyGenDemoProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#006B7D] via-[#008B9F] to-[#00A8C5] py-12 px-6">
      <BackButton onNavigate={onNavigate} destination="demo-showcase" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl mb-6">
            <span className="text-4xl">🎬</span>
            <span className="text-2xl font-bold text-[#006B7D]">HeyGen AI Avatars</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            AI Video Avatar Demo
          </h1>
          <p className="text-xl text-white/95 max-w-3xl mx-auto">
            Create professional AI-powered video avatars for Zee AI, recruiters, career fairs, and tutorials
          </p>
        </div>

        {/* HeyGen Example Component */}
        <HeyGenExample />

        {/* Info Boxes */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-[#006B7D] mb-2">Fast Generation</h3>
            <p className="text-gray-600">
              Videos typically ready in 2-5 minutes with automatic status updates
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-bold text-[#006B7D] mb-2">Professional Quality</h3>
            <p className="text-gray-600">
              High-quality avatars with natural voice synthesis and lip-sync
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <div className="text-4xl mb-3">🌐</div>
            <h3 className="text-xl font-bold text-[#006B7D] mb-2">Multiple Use Cases</h3>
            <p className="text-gray-600">
              Perfect for Zee AI, recruiters, career fairs, and educational content
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('demo-showcase')}
            className="px-10 py-5 bg-white/95 backdrop-blur-sm text-[#006B7D] rounded-2xl hover:bg-white hover:scale-105 transition-all font-bold text-lg shadow-2xl"
          >
            🏠 Back to Demo Showcase
          </button>
          <button
            onClick={() => onNavigate('heygen-configuration')}
            className="ml-4 px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:scale-105 transition-all font-bold text-lg shadow-2xl"
          >
            🔐 Configure API Key
          </button>
        </div>
      </div>
    </div>
  );
}