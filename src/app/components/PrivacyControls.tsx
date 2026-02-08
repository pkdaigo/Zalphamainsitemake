import { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Users, Building, GraduationCap, FileText, Video, Phone, Mail, MapPin, Calendar, Award, Briefcase, Globe, Save, Check, Info } from 'lucide-react';

interface PrivacyControlsProps {
  studentId: string;
  studentName: string;
  onSaveSettings: (settings: PrivacySettings) => void;
}

export interface PrivacySettings {
  // Profile Visibility
  profilePublic: boolean;
  showFullName: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showLocation: 'full' | 'city' | 'hidden';
  showAge: boolean;
  showPhoto: boolean;
  
  // Information Sharing with Employers
  shareWithEmployers: {
    basicInfo: boolean;
    contactInfo: boolean;
    resume: boolean;
    workHistory: boolean;
    education: boolean;
    skills: boolean;
    videoIntro: boolean;
    references: boolean;
    socialMedia: boolean;
    portfolio: boolean;
  };
  
  // Information Sharing with Educational Partners
  shareWithEducation: {
    academicRecords: boolean;
    enrollmentStatus: boolean;
    gpa: boolean;
    coursework: boolean;
    certifications: boolean;
    attendance: boolean;
    financialAid: boolean;
    disciplinary: boolean;
  };
  
  // Job Application Settings
  autoShareResume: boolean;
  autoShareVideo: boolean;
  requireApprovalBeforeContact: boolean;
  
  // Platform Features
  allowMessagesFrom: 'everyone' | 'verified-employers' | 'nobody';
  showOnlineStatus: boolean;
  showApplicationHistory: boolean;
  allowDataForAI: boolean;
  allowDataForAnalytics: boolean;
}

export function PrivacyControls({ studentId, studentName, onSaveSettings }: PrivacyControlsProps) {
  const [settings, setSettings] = useState<PrivacySettings>({
    // Default safe settings
    profilePublic: true,
    showFullName: true,
    showEmail: false,
    showPhone: false,
    showLocation: 'city',
    showAge: false,
    showPhoto: true,
    
    shareWithEmployers: {
      basicInfo: true,
      contactInfo: false, // Protected by default
      resume: true,
      workHistory: true,
      education: true,
      skills: true,
      videoIntro: true,
      references: false, // Protected by default
      socialMedia: false,
      portfolio: true
    },
    
    shareWithEducation: {
      academicRecords: false,
      enrollmentStatus: true,
      gpa: false,
      coursework: true,
      certifications: true,
      attendance: false,
      financialAid: false,
      disciplinary: false
    },
    
    autoShareResume: true,
    autoShareVideo: true,
    requireApprovalBeforeContact: true,
    
    allowMessagesFrom: 'verified-employers',
    showOnlineStatus: false,
    showApplicationHistory: false,
    allowDataForAI: true,
    allowDataForAnalytics: true
  });

  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'employers' | 'education' | 'platform'>('profile');

  const handleSave = () => {
    onSaveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const setPreset = (preset: 'private' | 'balanced' | 'open') => {
    if (preset === 'private') {
      setSettings({
        ...settings,
        profilePublic: false,
        showEmail: false,
        showPhone: false,
        showLocation: 'hidden',
        shareWithEmployers: {
          ...settings.shareWithEmployers,
          contactInfo: false,
          references: false,
          socialMedia: false
        },
        requireApprovalBeforeContact: true,
        allowMessagesFrom: 'nobody'
      });
    } else if (preset === 'balanced') {
      setSettings({
        ...settings,
        profilePublic: true,
        showEmail: false,
        showPhone: false,
        showLocation: 'city',
        shareWithEmployers: {
          ...settings.shareWithEmployers,
          contactInfo: false,
          references: false,
          socialMedia: false
        },
        requireApprovalBeforeContact: true,
        allowMessagesFrom: 'verified-employers'
      });
    } else if (preset === 'open') {
      setSettings({
        ...settings,
        profilePublic: true,
        showEmail: true,
        showPhone: true,
        showLocation: 'full',
        shareWithEmployers: {
          ...settings.shareWithEmployers,
          contactInfo: true,
          references: true,
          socialMedia: true
        },
        requireApprovalBeforeContact: false,
        allowMessagesFrom: 'everyone'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">🔒 Privacy & Data Controls</h1>
              <p className="text-xl text-blue-100">
                You control what information you share and with whom
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setPreset('private')}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200 hover:border-red-400 transition-all text-left"
          >
            <Lock className="w-8 h-8 text-red-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">🔒 Maximum Privacy</h3>
            <p className="text-sm text-gray-600">Minimal information shared, require approval for all contact</p>
          </button>

          <button
            onClick={() => setPreset('balanced')}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all text-left"
          >
            <Shield className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">⚖️ Balanced (Recommended)</h3>
            <p className="text-sm text-gray-600">Share professional info, protect personal details</p>
          </button>

          <button
            onClick={() => setPreset('open')}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all text-left"
          >
            <Eye className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">👁️ Maximum Visibility</h3>
            <p className="text-sm text-gray-600">Share everything to maximize job opportunities</p>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-lg border-b-2 border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-blue-50 text-blue-600 border-b-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Eye className="w-5 h-5 inline mr-2" />
              Profile Visibility
            </button>
            <button
              onClick={() => setActiveTab('employers')}
              className={`flex-1 px-6 py-4 font-bold transition-all ${
                activeTab === 'employers'
                  ? 'bg-blue-50 text-blue-600 border-b-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Building className="w-5 h-5 inline mr-2" />
              Share with Employers
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex-1 px-6 py-4 font-bold transition-all ${
                activeTab === 'education'
                  ? 'bg-blue-50 text-blue-600 border-b-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <GraduationCap className="w-5 h-5 inline mr-2" />
              Share with Education
            </button>
            <button
              onClick={() => setActiveTab('platform')}
              className={`flex-1 px-6 py-4 font-bold transition-all ${
                activeTab === 'platform'
                  ? 'bg-blue-50 text-blue-600 border-b-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Globe className="w-5 h-5 inline mr-2" />
              Platform Settings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl shadow-xl p-8 mb-6">
          {/* Profile Visibility Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 Profile Visibility Settings</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Make Profile Public</h3>
                    <p className="text-sm text-gray-600">Allow employers to find your profile in searches</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.profilePublic}
                      onChange={(e) => setSettings({ ...settings, profilePublic: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Show Full Name
                    </h3>
                    <p className="text-sm text-gray-600">Display your complete name on your profile</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showFullName}
                      onChange={(e) => setSettings({ ...settings, showFullName: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Show Email Address
                    </h3>
                    <p className="text-sm text-gray-600">⚠️ Not recommended - use platform messaging instead</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showEmail}
                      onChange={(e) => setSettings({ ...settings, showEmail: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Show Phone Number
                    </h3>
                    <p className="text-sm text-gray-600">⚠️ Not recommended - employers should contact via chat</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showPhone}
                      onChange={(e) => setSettings({ ...settings, showPhone: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4" />
                        Location Visibility
                      </h3>
                      <p className="text-sm text-gray-600">Choose how much location detail to show</p>
                    </div>
                  </div>
                  <select
                    value={settings.showLocation}
                    onChange={(e) => setSettings({ ...settings, showLocation: e.target.value as 'full' | 'city' | 'hidden' })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="full">Show Full Address (e.g., "123 Main St, Saipan, CNMI")</option>
                    <option value="city">Show City Only (e.g., "Saipan, CNMI") - Recommended</option>
                    <option value="hidden">Hide Location Completely</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Show Age/Birth Year
                    </h3>
                    <p className="text-sm text-gray-600">Display your age or birth year on profile</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showAge}
                      onChange={(e) => setSettings({ ...settings, showAge: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Show Profile Photo</h3>
                    <p className="text-sm text-gray-600">Display your profile picture</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showPhoto}
                      onChange={(e) => setSettings({ ...settings, showPhoto: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Employers Tab */}
          {activeTab === 'employers' && (
            <div className="space-y-6">
              <div className="flex items-start gap-4 mb-6">
                <Building className="w-8 h-8 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">🏢 Share with Employers</h2>
                  <p className="text-gray-600">
                    Control what information employers can see when they view your profile or receive your application
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries({
                  basicInfo: { icon: FileText, label: 'Basic Information', desc: 'Name, location (city only), profile summary' },
                  contactInfo: { icon: Phone, label: 'Contact Information', desc: 'Email and phone number (⚠️ Keep OFF for safety)' },
                  resume: { icon: FileText, label: 'Resume/CV', desc: 'Your uploaded or AI-generated resume' },
                  workHistory: { icon: Briefcase, label: 'Work History', desc: 'Previous jobs and experience' },
                  education: { icon: GraduationCap, label: 'Education', desc: 'Schools, degrees, certifications' },
                  skills: { icon: Award, label: 'Skills & Expertise', desc: 'Technical and soft skills' },
                  videoIntro: { icon: Video, label: 'Video Introduction', desc: 'Your recorded video profile' },
                  references: { icon: Users, label: 'References', desc: 'Contact info for professional references (⚠️ Sensitive)' },
                  socialMedia: { icon: Globe, label: 'Social Media Links', desc: 'LinkedIn, portfolio, etc.' },
                  portfolio: { icon: Award, label: 'Portfolio/Projects', desc: 'Work samples and project showcase' }
                }).map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start gap-3 flex-1">
                      <data.icon className="w-5 h-5 text-gray-600 mt-1" />
                      <div>
                        <h3 className="font-bold text-gray-900">{data.label}</h3>
                        <p className="text-sm text-gray-600">{data.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.shareWithEmployers[key as keyof typeof settings.shareWithEmployers]}
                        onChange={(e) => setSettings({
                          ...settings,
                          shareWithEmployers: {
                            ...settings.shareWithEmployers,
                            [key]: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mt-6">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  💡 Recommended Settings
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                    <span><strong>Share:</strong> Resume, work history, education, skills, video intro, portfolio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <EyeOff className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                    <span><strong>Keep Private:</strong> Contact info, references until later stages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                    <span><strong>Safety:</strong> Use ZALPHA's secure chat instead of sharing phone/email</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-start gap-4 mb-6">
                <GraduationCap className="w-8 h-8 text-purple-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">🎓 Share with Educational Partners</h2>
                  <p className="text-gray-600">
                    Control what academic information schools, colleges, and training programs can access
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries({
                  academicRecords: { label: 'Academic Records/Transcripts', desc: 'Complete grade history (⚠️ Very Sensitive)' },
                  enrollmentStatus: { label: 'Enrollment Status', desc: 'Whether you\'re currently enrolled' },
                  gpa: { label: 'GPA/Grade Average', desc: 'Your overall academic performance' },
                  coursework: { label: 'Coursework & Classes', desc: 'Classes taken and in progress' },
                  certifications: { label: 'Certifications & Awards', desc: 'Academic achievements and certificates' },
                  attendance: { label: 'Attendance Records', desc: 'Class attendance history (⚠️ Sensitive)' },
                  financialAid: { label: 'Financial Aid Status', desc: 'Scholarship/loan information (⚠️ Very Sensitive)' },
                  disciplinary: { label: 'Disciplinary Records', desc: 'Academic misconduct history (⚠️ Very Sensitive)' }
                }).map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{data.label}</h3>
                      <p className="text-sm text-gray-600">{data.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.shareWithEducation[key as keyof typeof settings.shareWithEducation]}
                        onChange={(e) => setSettings({
                          ...settings,
                          shareWithEducation: {
                            ...settings.shareWithEducation,
                            [key]: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mt-6">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  ⚠️ Important Notes
                </h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-0.5">•</span>
                    <span>Educational partners must be <strong>verified by ZALPHA</strong> to access this data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-0.5">•</span>
                    <span>You'll receive <strong>notification</strong> whenever someone accesses your records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-0.5">•</span>
                    <span>Financial aid and disciplinary records are <strong>especially sensitive</strong> - keep OFF unless required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-0.5">•</span>
                    <span>Some training programs may require access to specific records for enrollment</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Platform Settings Tab */}
          {activeTab === 'platform' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">⚙️ Platform Settings</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Auto-Share Resume with Applications</h3>
                    <p className="text-sm text-gray-600">Automatically include your resume when applying to jobs</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoShareResume}
                      onChange={(e) => setSettings({ ...settings, autoShareResume: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Auto-Share Video Introduction</h3>
                    <p className="text-sm text-gray-600">Include your video intro with job applications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoShareVideo}
                      onChange={(e) => setSettings({ ...settings, autoShareVideo: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Require Approval Before Contact</h3>
                    <p className="text-sm text-gray-600">Employers must get your approval before messaging you</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.requireApprovalBeforeContact}
                      onChange={(e) => setSettings({ ...settings, requireApprovalBeforeContact: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">Allow Messages From</h3>
                  <select
                    value={settings.allowMessagesFrom}
                    onChange={(e) => setSettings({ ...settings, allowMessagesFrom: e.target.value as any })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="everyone">Everyone (All employers can message)</option>
                    <option value="verified-employers">Verified Employers Only (Recommended)</option>
                    <option value="nobody">Nobody (Disable all messages)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Show Online Status</h3>
                    <p className="text-sm text-gray-600">Let employers see when you're online</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showOnlineStatus}
                      onChange={(e) => setSettings({ ...settings, showOnlineStatus: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Show Application History</h3>
                    <p className="text-sm text-gray-600">Let employers see your previous applications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showApplicationHistory}
                      onChange={(e) => setSettings({ ...settings, showApplicationHistory: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="border-t-2 border-gray-200 pt-6 mt-6">
                  <h3 className="font-bold text-gray-900 mb-4">🤖 AI & Analytics</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Allow Data for AI Improvements</h3>
                        <p className="text-sm text-gray-600">Help train ZALPHA's AI features (resume builder, job matching)</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.allowDataForAI}
                          onChange={(e) => setSettings({ ...settings, allowDataForAI: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Allow Data for Analytics</h3>
                        <p className="text-sm text-gray-600">Help improve platform with anonymized usage data</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.allowDataForAnalytics}
                          onChange={(e) => setSettings({ ...settings, allowDataForAnalytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <button
            onClick={handleSave}
            className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3"
          >
            {saved ? (
              <>
                <Check className="w-6 h-6" />
                Settings Saved Successfully!
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                Save Privacy Settings
              </>
            )}
          </button>

          {saved && (
            <p className="text-center text-sm text-green-600 font-semibold mt-3">
              ✅ Your privacy preferences have been updated
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
