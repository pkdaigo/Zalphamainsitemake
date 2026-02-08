import { useState, useEffect } from 'react';
import { MapPin, Monitor, Smartphone, Tablet, Laptop, AlertTriangle, XCircle } from 'lucide-react';

interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  os: string;
  browser: string;
  screenSize: string;
  userAgent: string;
}

interface GeolocationInfo {
  ip: string;
  country: string;
  region: string;
  city: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  isVPN: boolean;
  isProxy: boolean;
  isTor: boolean;
}

interface SecurityVerificationResult {
  allowed: boolean;
  reason?: string;
  deviceInfo: DeviceInfo;
  geoInfo: GeolocationInfo | null;
  timestamp: number;
}

// Allowed regions for beta testing
const ALLOWED_REGIONS = [
  'CNMI',
  'Commonwealth of the Northern Mariana Islands',
  'Northern Mariana Islands',
  'Saipan',
  'Tinian',
  'Rota',
  'Guam',
  'FSM',
  'Federated States of Micronesia',
  'Yap',
  'Chuuk',
  'Pohnpei',
  'Kosrae',
  'Hawaii',
  'Palau',
  'Marshall Islands',
  'Republic of the Marshall Islands'
];

export function useSecurityTracking(userId: string, assignedRegion: string) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [geoInfo, setGeoInfo] = useState<GeolocationInfo | null>(null);
  const [verificationResult, setVerificationResult] = useState<SecurityVerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    verifyUserAccess();
  }, []);

  const detectDevice = (): DeviceInfo => {
    const ua = navigator.userAgent;
    let type: DeviceInfo['type'] = 'unknown';
    let os = 'Unknown';
    let browser = 'Unknown';

    // Detect device type
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      type = 'tablet';
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      type = 'mobile';
    } else {
      type = 'desktop';
    }

    // Detect OS
    if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Mac OS X/i.test(ua)) os = 'macOS';
    else if (/Linux/i.test(ua)) os = 'Linux';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/iOS|iPhone|iPad|iPod/i.test(ua)) os = 'iOS';

    // Detect browser
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Edg/i.test(ua)) browser = 'Edge';
    else if (/MSIE|Trident/i.test(ua)) browser = 'Internet Explorer';

    return {
      type,
      os,
      browser,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      userAgent: ua
    };
  };

  const verifyUserAccess = async () => {
    setIsVerifying(true);

    try {
      // Get device info
      const device = detectDevice();
      setDeviceInfo(device);

      // Get geolocation and IP info from backend
      // In production, this should call your backend API which uses a service like:
      // - ipapi.co
      // - ip-api.com
      // - ipgeolocation.io
      // - MaxMind GeoIP2
      
      const response = await fetch('/api/verify-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          assignedRegion,
          deviceInfo: device
        })
      });

      if (!response.ok) {
        throw new Error('Failed to verify location');
      }

      const data = await response.json();
      const geo: GeolocationInfo = data.geolocation;
      setGeoInfo(geo);

      // Verify access
      const result = verifyAccess(geo, assignedRegion);
      setVerificationResult({
        ...result,
        deviceInfo: device,
        geoInfo: geo,
        timestamp: Date.now()
      });

      // Log to analytics
      await logSecurityEvent({
        userId,
        eventType: result.allowed ? 'access_granted' : 'access_denied',
        reason: result.reason,
        deviceInfo: device,
        geoInfo: geo
      });

    } catch (error) {
      console.error('Security verification failed:', error);
      
      // In demo mode, allow access but log the error
      const device = detectDevice();
      setVerificationResult({
        allowed: true, // Change to false in production
        reason: 'Demo mode - verification bypassed',
        deviceInfo: device,
        geoInfo: null,
        timestamp: Date.now()
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyAccess = (geo: GeolocationInfo, assignedRegion: string): { allowed: boolean; reason?: string } => {
    // Check for VPN/Proxy/Tor
    if (geo.isVPN || geo.isProxy || geo.isTor) {
      return {
        allowed: false,
        reason: 'VPN, proxy, or anonymization service detected. Beta access requires direct connection from your assigned region.'
      };
    }

    // Check if region matches
    const regionMatch = ALLOWED_REGIONS.some(region => 
      geo.region.toLowerCase().includes(region.toLowerCase()) ||
      geo.country.toLowerCase().includes(region.toLowerCase()) ||
      geo.city.toLowerCase().includes(region.toLowerCase())
    );

    if (!regionMatch) {
      return {
        allowed: false,
        reason: `Your IP address (${geo.ip}) indicates you are accessing from ${geo.city}, ${geo.region}, ${geo.country}. Beta access is restricted to Pacific Island regions only.`
      };
    }

    // Check if matches assigned region
    const assignedMatch = 
      geo.region.toLowerCase().includes(assignedRegion.toLowerCase()) ||
      geo.country.toLowerCase().includes(assignedRegion.toLowerCase());

    if (!assignedMatch) {
      return {
        allowed: false,
        reason: `Your IP address indicates ${geo.city}, ${geo.region}, but you were assigned to ${assignedRegion}. Please contact support if you have relocated.`
      };
    }

    return { allowed: true };
  };

  const logSecurityEvent = async (event: any) => {
    try {
      await fetch('/api/security-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  return {
    deviceInfo,
    geoInfo,
    verificationResult,
    isVerifying,
    recheck: verifyUserAccess
  };
}

// Component to display device and location info
export function SecurityTrackingDisplay({ 
  deviceInfo, 
  geoInfo 
}: { 
  deviceInfo: DeviceInfo | null; 
  geoInfo: GeolocationInfo | null;
}) {
  if (!deviceInfo) return null;

  const getDeviceIcon = () => {
    switch (deviceInfo.type) {
      case 'mobile':
        return <Smartphone className="w-6 h-6" />;
      case 'tablet':
        return <Tablet className="w-6 h-6" />;
      case 'desktop':
        return <Laptop className="w-6 h-6" />;
      default:
        return <Monitor className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-3">
      <div className="flex items-center gap-2 text-gray-700">
        {getDeviceIcon()}
        <div>
          <p className="font-semibold">Device: {deviceInfo.type.charAt(0).toUpperCase() + deviceInfo.type.slice(1)}</p>
          <p className="text-xs text-gray-600">{deviceInfo.os} • {deviceInfo.browser}</p>
        </div>
      </div>
      
      {geoInfo && (
        <div className="flex items-start gap-2 text-gray-700">
          <MapPin className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-semibold">Location: {geoInfo.city}, {geoInfo.region}</p>
            <p className="text-xs text-gray-600">IP: {geoInfo.ip} • ISP: {geoInfo.isp}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Access denied screen
export function AccessDeniedScreen({ 
  reason, 
  deviceInfo, 
  geoInfo,
  onContactSupport 
}: { 
  reason: string;
  deviceInfo: DeviceInfo;
  geoInfo: GeolocationInfo | null;
  onContactSupport: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Access Denied
        </h1>
        
        <p className="text-gray-700 text-center mb-8">
          We were unable to verify your beta tester credentials.
        </p>

        {/* Reason */}
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-red-900 mb-2">Reason for Denial:</p>
              <p className="text-red-800">{reason}</p>
            </div>
          </div>
        </div>

        {/* Device & Location Info */}
        <div className="mb-6">
          <p className="font-semibold text-gray-900 mb-3">Your Connection Details:</p>
          <SecurityTrackingDisplay deviceInfo={deviceInfo} geoInfo={geoInfo} />
        </div>

        {/* Why This Matters */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="font-semibold text-blue-900 mb-2">🔒 Why We Verify Location:</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Beta access is limited to Pacific Island residents</li>
            <li>• Geographic verification prevents unauthorized access</li>
            <li>• Ensures beta testers are from target market</li>
            <li>• Protects intellectual property and confidential information</li>
          </ul>
        </div>

        {/* Common Issues */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p className="font-semibold text-yellow-900 mb-2">💡 Common Issues:</p>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• <strong>Using VPN or Proxy:</strong> Disable all VPN/proxy services</li>
            <li>• <strong>Traveling:</strong> Contact support if you've relocated</li>
            <li>• <strong>Corporate Network:</strong> Try from home internet connection</li>
            <li>• <strong>Mobile Data:</strong> Ensure location services are enabled</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors"
          >
            Retry Verification
          </button>
          <button
            onClick={onContactSupport}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Need help? Email <span className="font-semibold text-blue-600">beta-support@zalpharecruit.com</span></p>
          <p className="mt-1">or call <span className="font-semibold">(670) 555-BETA</span></p>
        </div>
      </div>
    </div>
  );
}

// Hook to track device usage statistics
export function useDeviceTracking(userId: string) {
  const [stats, setStats] = useState<{
    mobileUsage: number;
    tabletUsage: number;
    desktopUsage: number;
    totalSessions: number;
  }>({ mobileUsage: 0, tabletUsage: 0, desktopUsage: 0, totalSessions: 0 });

  useEffect(() => {
    trackDeviceSession();
    loadDeviceStats();
  }, []);

  const trackDeviceSession = async () => {
    const deviceInfo = detectDevice();
    
    try {
      await fetch('/api/track-device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          deviceType: deviceInfo.type,
          timestamp: Date.now()
        })
      });
    } catch (error) {
      console.error('Failed to track device session:', error);
    }
  };

  const loadDeviceStats = async () => {
    try {
      const response = await fetch(`/api/device-stats/${userId}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to load device stats:', error);
    }
  };

  const detectDevice = (): DeviceInfo => {
    const ua = navigator.userAgent;
    let type: DeviceInfo['type'] = 'unknown';
    
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      type = 'tablet';
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      type = 'mobile';
    } else {
      type = 'desktop';
    }

    return {
      type,
      os: 'Unknown',
      browser: 'Unknown',
      screenSize: `${window.screen.width}x${window.screen.height}`,
      userAgent: ua
    };
  };

  return { stats, refresh: loadDeviceStats };
}

function detectDevice(): DeviceInfo {
  const ua = navigator.userAgent;
  let type: DeviceInfo['type'] = 'unknown';
  let os = 'Unknown';
  let browser = 'Unknown';

  // Detect device type
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    type = 'tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    type = 'mobile';
  } else {
    type = 'desktop';
  }

  // Detect OS
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iOS|iPhone|iPad|iPod/i.test(ua)) os = 'iOS';

  // Detect browser
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Edg/i.test(ua)) browser = 'Edge';

  return {
    type,
    os,
    browser,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    userAgent: ua
  };
}