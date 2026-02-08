// Geolocation & Geo-fencing utility for ZALPHA security

export interface GeolocationData {
  latitude: number;
  longitude: number;
  country: string;
  region: string;
  city: string;
  ip: string;
  timestamp: Date;
  allowed: boolean;
  reason?: string;
}

// Pacific Island geographic boundaries (lat/lng)
// These define the allowed regions for students
const PACIFIC_ISLAND_REGIONS = [
  {
    name: 'CNMI (Saipan, Tinian, Rota)',
    bounds: {
      north: 20.55,
      south: 14.11,
      east: 146.06,
      west: 144.89
    }
  },
  {
    name: 'FSM - Yap',
    bounds: {
      north: 9.8,
      south: 9.4,
      east: 138.3,
      west: 138.0
    }
  },
  {
    name: 'FSM - Chuuk',
    bounds: {
      north: 7.5,
      south: 7.2,
      east: 151.9,
      west: 151.7
    }
  },
  {
    name: 'FSM - Pohnpei',
    bounds: {
      north: 7.0,
      south: 6.7,
      east: 158.4,
      west: 158.1
    }
  },
  {
    name: 'FSM - Kosrae',
    bounds: {
      north: 5.4,
      south: 5.2,
      east: 163.1,
      west: 162.9
    }
  },
  {
    name: 'Guam',
    bounds: {
      north: 13.7,
      south: 13.2,
      east: 144.96,
      west: 144.61
    }
  },
  {
    name: 'Hawaii',
    bounds: {
      north: 22.5,
      south: 18.9,
      east: -154.7,
      west: -160.3
    }
  },
  {
    name: 'Palau',
    bounds: {
      north: 8.1,
      south: 7.0,
      east: 134.7,
      west: 134.1
    }
  },
  {
    name: 'Marshall Islands',
    bounds: {
      north: 14.6,
      south: 5.6,
      east: 172.0,
      west: 165.0
    }
  }
];

// Check if coordinates are within Pacific Island regions
export function isWithinPacificIslands(latitude: number, longitude: number): { allowed: boolean; region?: string } {
  for (const region of PACIFIC_ISLAND_REGIONS) {
    const { north, south, east, west } = region.bounds;
    
    // Check if coordinates are within this region's bounds
    if (latitude <= north && latitude >= south && longitude <= east && longitude >= west) {
      return { allowed: true, region: region.name };
    }
  }
  
  return { allowed: false };
}

// Get user's location via browser Geolocation API
export async function getBrowserLocation(): Promise<{ latitude: number; longitude: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported by browser');
      resolve(null);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

// Get user's location via IP address (fallback/verification)
export async function getIPLocation(): Promise<{
  latitude: number;
  longitude: number;
  country: string;
  region: string;
  city: string;
  ip: string;
} | null> {
  try {
    // Using ipapi.co free tier (1,000 requests/day, no API key needed)
    const response = await fetch('https://ipapi.co/json/');
    
    if (!response.ok) {
      throw new Error('IP geolocation service unavailable');
    }
    
    const data = await response.json();
    
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      country: data.country_name,
      region: data.region,
      city: data.city,
      ip: data.ip
    };
  } catch (error) {
    console.error('IP geolocation error:', error);
    
    // Fallback to ip-api.com (free, no key needed)
    try {
      const fallbackResponse = await fetch('http://ip-api.com/json/');
      const fallbackData = await fallbackResponse.json();
      
      return {
        latitude: fallbackData.lat,
        longitude: fallbackData.lon,
        country: fallbackData.country,
        region: fallbackData.regionName,
        city: fallbackData.city,
        ip: fallbackData.query
      };
    } catch (fallbackError) {
      console.error('Fallback IP geolocation also failed:', fallbackError);
      return null;
    }
  }
}

// Comprehensive geolocation check for students
export async function verifyStudentLocation(): Promise<GeolocationData> {
  const timestamp = new Date();
  
  // Try browser geolocation first (most accurate)
  const browserLocation = await getBrowserLocation();
  
  // Get IP location (for verification and fallback)
  const ipLocation = await getIPLocation();
  
  if (!browserLocation && !ipLocation) {
    return {
      latitude: 0,
      longitude: 0,
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown',
      ip: 'Unknown',
      timestamp,
      allowed: false,
      reason: 'Unable to determine your location. Please enable location services and try again.'
    };
  }
  
  // Prefer browser location if available, otherwise use IP location
  const latitude = browserLocation?.latitude || ipLocation!.latitude;
  const longitude = browserLocation?.longitude || ipLocation!.longitude;
  
  // Check if location is within Pacific Islands
  const locationCheck = isWithinPacificIslands(latitude, longitude);
  
  // If browser and IP locations differ significantly, flag for review
  const suspicious = browserLocation && ipLocation && (
    Math.abs(browserLocation.latitude - ipLocation.latitude) > 5 ||
    Math.abs(browserLocation.longitude - ipLocation.longitude) > 5
  );
  
  return {
    latitude,
    longitude,
    country: ipLocation?.country || 'Unknown',
    region: ipLocation?.region || (locationCheck.region || 'Unknown'),
    city: ipLocation?.city || 'Unknown',
    ip: ipLocation?.ip || 'Unknown',
    timestamp,
    allowed: locationCheck.allowed,
    reason: locationCheck.allowed 
      ? `Access granted from ${locationCheck.region}` 
      : `Access denied: You must be physically located in the Pacific Islands (CNMI, FSM, Guam, Hawaii, Palau, or Marshall Islands) to use ZALPHA as a student. Your current location appears to be outside this region.${suspicious ? ' Location mismatch detected - possible VPN usage.' : ''}`
  };
}

// Store geolocation data in database (for security audit)
export async function logGeolocation(
  userId: string, 
  userType: 'student' | 'employer', 
  action: string,
  geoData: GeolocationData
): Promise<void> {
  try {
    // In production, send to backend
    const logEntry = {
      userId,
      userType,
      action,
      ...geoData,
      timestamp: new Date().toISOString()
    };
    
    console.log('Geolocation log:', logEntry);
    
    // TODO: Send to backend API
    // await fetch('/api/log-geolocation', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(logEntry)
    // });
  } catch (error) {
    console.error('Failed to log geolocation:', error);
  }
}

// Continuous location monitoring for students (checks every 30 minutes)
export class LocationMonitor {
  private intervalId: number | null = null;
  private onLocationViolation: (data: GeolocationData) => void;
  
  constructor(onLocationViolation: (data: GeolocationData) => void) {
    this.onLocationViolation = onLocationViolation;
  }
  
  start() {
    // Check immediately on start
    this.checkLocation();
    
    // Then check every 30 minutes
    this.intervalId = window.setInterval(() => {
      this.checkLocation();
    }, 30 * 60 * 1000); // 30 minutes
  }
  
  stop() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  private async checkLocation() {
    const geoData = await verifyStudentLocation();
    
    if (!geoData.allowed) {
      this.onLocationViolation(geoData);
    }
  }
}
