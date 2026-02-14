export function ColorMockup() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">ZALPHA Color Comparison</h1>
        <p className="text-gray-600 mb-4 text-center">Before vs. After</p>
        
        <div className="bg-green-100 border-4 border-green-500 rounded-2xl p-6 mb-8">
          <p className="text-2xl font-bold text-green-800 text-center">
            ✅ Option A (Ocean Professional) is NOW ACTIVE on the platform!
          </p>
          <p className="text-center text-green-700 mt-2">Go back to the landing page to see the new colors.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* BEFORE - Vibrant Sunset */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-red-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-4 py-1 bg-red-500 text-white text-sm font-bold rounded-full">BEFORE</div>
              <h2 className="text-2xl font-bold text-gray-900">Vibrant Pacific Sunset</h2>
            </div>
            
            {/* Logo Example */}
            <div className="mb-6">
              <div className="text-5xl font-black bg-gradient-to-r from-cyan-500 via-blue-500 to-orange-500 bg-clip-text text-transparent inline-block">
                ZALPHA
              </div>
              <div className="text-sm text-gray-600 mt-1">Fresh Talent.Future Leaders</div>
            </div>
            
            {/* Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold">
                Students - Get Started
              </button>
              <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg font-semibold">
                Employers - Post Jobs
              </button>
            </div>
            
            {/* Color Swatches */}
            <div className="flex gap-2">
              <div className="flex-1 h-12 bg-cyan-500 rounded"></div>
              <div className="flex-1 h-12 bg-blue-500 rounded"></div>
              <div className="flex-1 h-12 bg-orange-500 rounded"></div>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              ❌ <strong>Issue:</strong> Too vibrant, orange may feel unprofessional
            </p>
          </div>

          {/* AFTER - Ocean Professional */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-green-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-4 py-1 bg-green-500 text-white text-sm font-bold rounded-full">✅ NOW ACTIVE</div>
              <h2 className="text-2xl font-bold text-gray-900">Ocean Professional</h2>
            </div>
            
            {/* Logo Example */}
            <div className="mb-6">
              <div className="text-5xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent inline-block">
                ZALPHA
              </div>
              <div className="text-sm text-gray-600 mt-1">Fresh Talent.Future Leaders</div>
            </div>
            
            {/* Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold">
                Students - Get Started
              </button>
              <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold">
                Employers - Post Jobs
              </button>
            </div>
            
            {/* Color Swatches */}
            <div className="flex gap-2">
              <div className="flex-1 h-12 bg-cyan-600 rounded"></div>
              <div className="flex-1 h-12 bg-blue-600 rounded"></div>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              ✅ <strong>Benefit:</strong> More professional, cleaner, trustworthy
            </p>
          </div>

        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 font-semibold">
            Key Changes: Removed orange accent • Deeper blue tones (600 instead of 500) • Two-color gradient
          </p>
        </div>
      </div>
    </div>
  );
}