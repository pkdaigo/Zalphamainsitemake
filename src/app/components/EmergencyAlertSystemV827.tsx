/**
 * ZALPHA Emergency Alert System v827
 * Features: Red banners, typhoon/earthquake alerts, school closings, shelter maps, safety check-ins
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  AlertTriangle,
  X,
  MapPin,
  Phone,
  Users,
  CheckCircle,
  Clock,
  Radio,
  ExternalLink,
  Share2,
  Bell,
  Volume2,
  Home,
  School,
  Briefcase,
  Shield,
  Navigation,
  AlertCircle,
} from 'lucide-react';

interface EmergencyAlert {
  id: string;
  type: 'disaster' | 'school-closing' | 'safety' | 'all-clear';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  location: string[];
  timestamp: Date;
  expiresAt?: Date;
  shelter?: Shelter;
  actions?: AlertAction[];
  isActive: boolean;
}

interface Shelter {
  name: string;
  address: string;
  capacity: number;
  distance: string;
  mapUrl: string;
}

interface AlertAction {
  label: string;
  icon: any;
  url?: string;
}

interface EmergencyAlertSystemV827Props {
  userRole: 'student' | 'employer' | 'coordinator' | 'dol-admin';
  userLocation: string;
  onAcknowledge?: (alertId: string) => void;
}

export function EmergencyAlertSystemV827({ 
  userRole, 
  userLocation,
  onAcknowledge 
}: EmergencyAlertSystemV827Props) {
  const [activeAlert, setActiveAlert] = useState<EmergencyAlert | null>(null);
  const [showAlertHub, setShowAlertHub] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [sharingLocation, setSharingLocation] = useState(false);
  const [safetyChecked, setSafetyChecked] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Mock active alert (Typhoon demo)
  useEffect(() => {
    // Simulate active typhoon alert
    const mockAlert: EmergencyAlert = {
      id: 'alert-001',
      type: 'disaster',
      severity: 'critical',
      title: '🌪️ TYPHOON APPROACHING - SCHOOLS CLOSED',
      message: 'Typhoon Mawar expected to make landfall in 6 hours. All CNMI schools closed. Seek shelter immediately.',
      location: ['Saipan', 'Tinian', 'Rota'],
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
      shelter: {
        name: 'Maria A. Ulloa Elementary School',
        address: 'Beach Road, Garapan, Saipan',
        capacity: 500,
        distance: '2.3 miles',
        mapUrl: '#',
      },
      actions: [
        { label: 'Call Emergency', icon: Phone, url: 'tel:911' },
        { label: 'Find Shelter', icon: MapPin },
        { label: 'Share Location', icon: Navigation },
      ],
      isActive: true,
    };
    setActiveAlert(mockAlert);

    // Countdown timer
    const interval = setInterval(() => {
      if (mockAlert.expiresAt) {
        const remaining = Math.floor((mockAlert.expiresAt.getTime() - Date.now()) / 1000 / 60);
        setCountdown(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = () => {
    setAcknowledged(true);
    if (activeAlert && onAcknowledge) {
      onAcknowledge(activeAlert.id);
    }
  };

  const handleShareLocation = () => {
    setSharingLocation(true);
    // Simulate location sharing
    setTimeout(() => {
      setSharingLocation(false);
      alert('Location shared with emergency contacts');
    }, 2000);
  };

  const handleSafetyCheck = (status: 'safe' | 'need-help') => {
    setSafetyChecked(true);
    alert(`Safety status: ${status === 'safe' ? '✅ Safe' : '⚠️ Need Help'}`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600';
      case 'warning':
        return 'bg-orange-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const mockAlertHistory: EmergencyAlert[] = [
    {
      id: 'alert-002',
      type: 'school-closing',
      severity: 'warning',
      title: '🏫 PSS Schools Closed',
      message: 'All Public School System (PSS) schools closed due to weather advisory.',
      location: ['Saipan'],
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isActive: false,
    },
    {
      id: 'alert-003',
      type: 'all-clear',
      severity: 'info',
      title: '✅ All Clear - Normal Operations',
      message: 'Weather advisory lifted. Schools resume normal schedule tomorrow.',
      location: ['Saipan', 'Tinian'],
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isActive: false,
    },
  ];

  return (
    <>
      {/* Red Alert Banner - Top of Screen */}
      {activeAlert && activeAlert.isActive && !acknowledged && (
        <div className={`fixed top-0 left-0 right-0 z-50 ${getSeverityColor(activeAlert.severity)} text-white shadow-2xl animate-slide-down max-w-[390px] mx-auto`}>
          <div className="p-4">
            {/* Alert Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="animate-pulse">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{activeAlert.title}</h3>
                <p className="text-sm text-white/90">{activeAlert.message}</p>
              </div>
            </div>

            {/* Countdown Timer */}
            {countdown > 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-semibold">Time to Landfall:</span>
                  </div>
                  <span className="text-xl font-bold">{Math.floor(countdown / 60)}h {countdown % 60}m</span>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {activeAlert.actions?.map((action, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant="outline"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs h-auto py-2"
                  onClick={() => action.label === 'Share Location' && handleShareLocation()}
                >
                  <action.icon className="w-4 h-4 mb-1" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>

            {/* Nearest Shelter */}
            {activeAlert.shelter && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{activeAlert.shelter.name}</p>
                    <p className="text-xs text-white/80">{activeAlert.shelter.address}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span>📍 {activeAlert.shelter.distance}</span>
                      <span>👥 {activeAlert.shelter.capacity} capacity</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="bg-white text-red-600 hover:bg-white/90 text-xs">
                    Directions
                  </Button>
                </div>
              </div>
            )}

            {/* Safety Check */}
            {!safetyChecked && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold mb-2">Safety Check-In:</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSafetyCheck('safe')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    I'm Safe
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSafetyCheck('need-help')}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Need Help
                  </Button>
                </div>
              </div>
            )}

            {/* Acknowledge Button */}
            <Button
              onClick={handleAcknowledge}
              className="w-full bg-white text-red-600 hover:bg-white/90 font-bold text-lg h-12"
            >
              ✅ ACKNOWLEDGE ALERT
            </Button>

            {/* More Info */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAlertHub(true)}
              className="w-full mt-2 text-white hover:bg-white/20"
            >
              View Alert Hub
            </Button>
          </div>

          {/* Screen Shake Animation */}
          <style>{`
            @keyframes slide-down {
              from {
                transform: translateY(-100%);
              }
              to {
                transform: translateY(0);
              }
            }
            .animate-slide-down {
              animation: slide-down 0.5s ease-out;
            }
          `}</style>
        </div>
      )}

      {/* Persistent Notification Dot on Zee Bot */}
      {activeAlert && activeAlert.isActive && (
        <div className="fixed bottom-[100px] right-7 z-40 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white shadow-lg" />
      )}

      {/* Alert Hub Modal */}
      {showAlertHub && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto max-w-[390px] mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 sticky top-0 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bell className="w-6 h-6" />
                <h2 className="text-xl font-bold">Alert Hub</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAlertHub(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-white/90">Emergency notifications & status</p>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Active Alerts */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Active Alerts (1)
              </h3>
              {activeAlert && (
                <Card className="shadow-md border-l-4 border-l-red-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={`${getSeverityColor(activeAlert.severity)} text-white`}>
                        {activeAlert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {activeAlert.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{activeAlert.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{activeAlert.message}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {activeAlert.location.join(', ')}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* FEMA/PDC Feeds */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Radio className="w-5 h-5 text-blue-600" />
                Emergency Feeds
              </h3>
              <div className="space-y-2">
                <Card className="shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">FEMA Pacific</p>
                        <p className="text-xs text-gray-600">Last update: 5 min ago</p>
                        <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-xs">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Full Updates
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Radio className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">PDC DisasterAWARE</p>
                        <p className="text-xs text-gray-600">Typhoon tracking active</p>
                        <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-xs">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Track Storm
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* School Status */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <School className="w-5 h-5 text-green-600" />
                School Status
              </h3>
              <div className="space-y-2">
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-red-900">PSS - CNMI</p>
                      <p className="text-xs text-red-700">All schools closed</p>
                    </div>
                    <Badge className="bg-red-600 text-white">CLOSED</Badge>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-red-900">GDOE - Guam</p>
                      <p className="text-xs text-red-700">All schools closed</p>
                    </div>
                    <Badge className="bg-red-600 text-white">CLOSED</Badge>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-900">NMC</p>
                      <p className="text-xs text-green-700">Monitoring situation</p>
                    </div>
                    <Badge className="bg-yellow-600 text-white">ADVISORY</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert History */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                Recent Alerts
              </h3>
              <div className="space-y-2">
                {mockAlertHistory.map((alert) => (
                  <Card key={alert.id} className="shadow-sm">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                        <Badge variant="outline" className="text-xs">Resolved</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{alert.message}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(alert.timestamp).toLocaleDateString()} at{' '}
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                Emergency Contacts
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
                  <Phone className="w-5 h-5 mb-1 text-red-600" />
                  <span className="text-xs font-semibold">911</span>
                  <span className="text-xs text-gray-500">Emergency</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
                  <Shield className="w-5 h-5 mb-1 text-blue-600" />
                  <span className="text-xs font-semibold">FEMA</span>
                  <span className="text-xs text-gray-500">1-800-621</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
                  <Radio className="w-5 h-5 mb-1 text-purple-600" />
                  <span className="text-xs font-semibold">Red Cross</span>
                  <span className="text-xs text-gray-500">670-234-XXXX</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
                  <Home className="w-5 h-5 mb-1 text-green-600" />
                  <span className="text-xs font-semibold">Shelter Info</span>
                  <span className="text-xs text-gray-500">211</span>
                </Button>
              </div>
            </div>

            {/* Role-Specific Actions */}
            {userRole === 'coordinator' && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  Admin Controls
                </h3>
                <div className="space-y-2">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Trigger Alert to Cohort
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Student Attendance Export
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
