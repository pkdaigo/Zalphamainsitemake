import { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Shield, RefreshCw, Lock } from 'lucide-react';
import { verifyStudentLocation, logGeolocation, LocationMonitor, GeolocationData } from '@/app/utils/geolocation';

interface GeofenceProtectionProps {
  userType: 'student' | 'employer';
  userId?: string;
  onLocationVerified?: (data: GeolocationData) => void;
  onLocationBlocked?: (data: GeolocationData) => void;
}

export function GeofenceProtection({ 
  userType, 
  userId,
  onLocationVerified,
  onLocationBlocked 
}: GeofenceProtectionProps) {
  const [loading, setLoading] = useState(true);
  const [geoData, setGeoData] = useState<GeolocationData | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const checkLocation = async () => {
    setLoading(true);
    
    try {
      const data = await verifyStudentLocation();
      setGeoData(data);
      
      // Log the location check
      if (userId) {
        await logGeolocation(userId, userType, 'location_verification', data);
      }
      
      if (userType === 'student' && !data.allowed) {
        // Student is outside Pacific Islands - BLOCK ACCESS
        setBlocked(true);
        onLocationBlocked?.(data);
      } else {
        // Location verified
        setBlocked(false);
        onLocationVerified?.(data);
      }
    } catch (error) {
      console.error('Geolocation check failed:', error);
      
      // If geolocation fails for students, err on the side of caution
      if (userType === 'student') {
        setBlocked(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only enforce geofencing for students
    if (userType === 'student') {
      checkLocation();
      
      // Set up continuous monitoring
      const monitor = new LocationMonitor((data) => {
        setGeoData(data);
        setBlocked(true);
        onLocationBlocked?.(data);
      });
      
      monitor.start();
      
      return () => monitor.stop();
    } else {
      // For employers, just log their location but don't block
      checkLocation();
      setLoading(false);
    }
  }, [userType, userId]);

  // Loading state
  if (loading && userType === 'student') {
    return (
      <div className="fixed inset-0 bg-blue-600 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Your Location</h2>
            <p className="text-gray-600 mb-4">
              For security purposes, we need to verify you're in the Pacific Islands region...
            </p>
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-sm text-gray-500">Checking location...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // BLOCKED state - Student outside Pacific Islands
  if (blocked && userType === 'student') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center z-50 p-6 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 rounded-t-2xl text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">🚫 Access Denied</h2>
                <p className="text-red-100">
                  Geographic Restriction Enforced
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="bg-red-50 border-4 border-red-400 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-12 h-12 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-3">
                    You Are Outside the Allowed Region
                  </h3>
                  <p className="text-red-800 mb-4 leading-relaxed">
                    {geoData?.reason || 'Your current location is outside the Pacific Islands region.'}
                  </p>
                  
                  {geoData && (
                    <div className="bg-white rounded-lg p-4 border-2 border-red-300">
                      <h4 className="font-bold text-red-900 mb-2">Your Detected Location:</h4>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Country:</span>
                          <span className="ml-2 font-semibold text-gray-900">{geoData.country}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Region:</span>
                          <span className="ml-2 font-semibold text-gray-900">{geoData.region}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">City:</span>
                          <span className="ml-2 font-semibold text-gray-900">{geoData.city}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Coordinates:</span>
                          <span className="ml-2 font-semibold text-gray-900">
                            {geoData.latitude.toFixed(4)}, {geoData.longitude.toFixed(4)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Why This Restriction */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Why This Restriction Exists
              </h3>
              <div className="space-y-3 text-blue-800">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">1.</span>
                  <p>
                    <strong>Geographic Mission:</strong> ZALPHA exclusively serves students from the Pacific Islands 
                    (CNMI, FSM, Guam, Hawaii, Palau, and Marshall Islands).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">2.</span>
                  <p>
                    <strong>Funding Requirements:</strong> Our grants and partnerships require us to serve 
                    Pacific Island residents only.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">3.</span>
                  <p>
                    <strong>Security & Fraud Prevention:</strong> Geolocation verification prevents fraud, 
                    identity theft, and unauthorized access.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">4.</span>
                  <p>
                    <strong>VPN Detection:</strong> Using a VPN or location spoofing will trigger this block.
                  </p>
                </div>
              </div>
            </div>

            {/* Allowed Regions */}
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                ✅ ZALPHA Student Access Available In:
              </h3>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  'CNMI (Northern Mariana Islands)',
                  'FSM - Yap State',
                  'FSM - Chuuk State',
                  'FSM - Pohnpei State',
                  'FSM - Kosrae State',
                  'Guam',
                  'Hawaii',
                  'Palau',
                  'Marshall Islands'
                ].map(region => (
                  <div key={region} className="bg-white rounded-lg p-3 border-2 border-green-200">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-900">{region}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What You Can Do */}
            <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">
                What You Can Do:
              </h3>
              <div className="space-y-3 text-sm text-purple-800">
                <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <span className="text-purple-600">✓</span>
                  <div>
                    <strong>If you ARE in the Pacific Islands:</strong>
                    <p className="text-purple-700 mt-1">
                      Disable any VPN, enable location services, and click "Retry Location Check" below.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <span className="text-purple-600">✓</span>
                  <div>
                    <strong>If you WILL BE in the Pacific Islands soon:</strong>
                    <p className="text-purple-700 mt-1">
                      Wait until you're physically in the region, then try again.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <span className="text-purple-600">✓</span>
                  <div>
                    <strong>If this is an error:</strong>
                    <p className="text-purple-700 mt-1">
                      Contact support at support@zalpharecruit.com with your location details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setRetryCount(prev => prev + 1);
                  checkLocation();
                }}
                className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-lg flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Retry Location Check {retryCount > 0 && `(${retryCount})`}
              </button>
              <button
                onClick={() => window.location.href = 'mailto:support@zalpharecruit.com'}
                className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all font-bold text-lg"
              >
                Contact Support
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              Security Log ID: {geoData?.timestamp.getTime()} | IP: {geoData?.ip}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success state - show small indicator (optional)
  if (geoData && geoData.allowed && userType === 'student') {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-40 animate-fade-in">
        <MapPin className="w-4 h-4" />
        <span className="text-sm font-semibold">
          ✓ Location Verified: {geoData.region}
        </span>
      </div>
    );
  }

  // For employers, don't show anything (just log in background)
  return null;
}