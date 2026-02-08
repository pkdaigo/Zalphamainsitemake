import { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Info, CheckCircle, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface StudentPrivacySettingsProps {
  studentId: string;
  onClose?: () => void;
}

export function StudentPrivacySettings({ studentId, onClose }: StudentPrivacySettingsProps) {
  // Enhanced Privacy settings state - FULL student control
  const [hideFromSchool, setHideFromSchool] = useState(false);
  const [schoolCanSee, setSchoolCanSee] = useState({
    name: true,
    email: false,
    phone: false,
    major: true,
    gpa: false,
    assessmentScores: false,
    applicationActivity: false,
    jobOffers: false,
    hiringStatus: false,
    salaryInfo: false,
  });
  const [employerCanSee, setEmployerCanSee] = useState({
    transcripts: true,
    gpa: true,
    assessmentScores: true,
    videoIntroduction: true,
    governmentId: false,
    dateOfBirth: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In production, save to database
    console.log('Saving privacy settings:', {
      studentId,
      hideFromSchool,
      schoolCanSee,
      employerCanSee,
    });
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border-4 border-cyan-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-cyan-200">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Privacy Settings</h2>
          <p className="text-sm text-gray-600">Control how your information is shared</p>
        </div>
      </div>

      {/* School Revenue Sharing Privacy */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" />
          School Revenue Sharing Privacy
        </h3>

        {/* Toggle Setting */}
        <div className="bg-gray-50 rounded-lg p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={hideFromSchool}
                    onChange={(e) => setHideFromSchool(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-md"></div>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Hide my identity from my school
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    Your school will still earn revenue from your activity, but won't see your name
                  </p>
                </div>
              </label>
            </div>
            <div className="ml-4">
              {hideFromSchool ? (
                <EyeOff className="w-6 h-6 text-blue-600" />
              ) : (
                <Eye className="w-6 h-6 text-gray-400" />
              )}
            </div>
          </div>

          {/* Status Indicator */}
          <div className={`mt-4 p-4 rounded-lg ${hideFromSchool ? 'bg-blue-50 border border-blue-200' : 'bg-gray-100 border border-gray-200'}`}>
            <div className="flex items-start gap-3">
              <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${hideFromSchool ? 'text-blue-600' : 'text-gray-500'}`} />
              <div>
                <p className={`text-sm font-semibold ${hideFromSchool ? 'text-blue-900' : 'text-gray-700'}`}>
                  {hideFromSchool ? 'Privacy Mode: ENABLED' : 'Privacy Mode: DISABLED'}
                </p>
                <p className={`text-sm mt-1 ${hideFromSchool ? 'text-blue-800' : 'text-gray-600'}`}>
                  {hideFromSchool ? (
                    <>
                      Your school will see transactions as <strong>"Anonymous Student"</strong>. 
                      They will still receive their revenue share (beta example: 0.5%) but won't know it came from you.
                    </>
                  ) : (
                    <>
                      Your school can see your name in their revenue reports and will know which 
                      transactions you generated.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What This Means */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-3">How This Works</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Your school <strong>still earns revenue</strong> from your job applications and hires</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Revenue amounts are <strong>not affected</strong> by this setting</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Your identity is shown as <strong>"Anonymous Student"</strong> in school reports</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>You can <strong>change this setting</strong> at any time</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Employers <strong>always see your full profile</strong> - this only affects school visibility</span>
            </div>
          </div>
        </div>
      </div>

      {/* Example Preview */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-900 mb-3">School Will See:</h4>
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Student Name</p>
              <p className="font-bold text-gray-900">
                {hideFromSchool ? (
                  <span className="flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-gray-400" />
                    Anonymous Student
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    Your Full Name
                  </span>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Revenue Generated</p>
              <p className="font-bold text-green-600">$2.50</p>
              <p className="text-xs text-gray-500">Always visible</p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Granular School Dashboard Controls */}
      <div className="mb-6 mt-8 pt-6 border-t-2 border-cyan-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-600" />
          What Can Your School See on Their Dashboard?
        </h3>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-purple-900 font-semibold mb-2">
            🎓 YOU have FULL control over what your educational institution sees, even on their admin dashboard
          </p>
          <p className="text-xs text-purple-800">
            Your school ONLY sees what you explicitly allow. Toggle each item below to customize visibility.
          </p>
        </div>

        <div className="space-y-3">
          {/* Name */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Your Name</p>
              <p className="text-xs text-gray-600">Basic identification on school dashboard</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schoolCanSee.name}
                onChange={(e) => setSchoolCanSee({...schoolCanSee, name: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Email Address</p>
              <p className="text-xs text-gray-600">School contact information</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schoolCanSee.email}
                onChange={(e) => setSchoolCanSee({...schoolCanSee, email: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Phone Number</p>
              <p className="text-xs text-gray-600">Contact phone number</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schoolCanSee.phone}
                onChange={(e) => setSchoolCanSee({...schoolCanSee, phone: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Major */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Major/Field of Study</p>
              <p className="text-xs text-gray-600">Your academic program</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schoolCanSee.major}
                onChange={(e) => setSchoolCanSee({...schoolCanSee, major: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* GPA */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">GPA</p>
              <p className="text-xs text-gray-600">Academic performance data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schoolCanSee.gpa}
                onChange={(e) => setSchoolCanSee({...schoolCanSee, gpa: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Assessment Scores */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Skills Assessment Scores</p>
              <p className="text-xs text-gray-600">Game scores from ZALPHA assessments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schoolCanSee.assessmentScores}
                onChange={(e) => setSchoolCanSee({...schoolCanSee, assessmentScores: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Application Activity */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Job Application Activity</p>
              <p className="text-xs text-gray-600">Number of applications submitted</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schoolCanSee.applicationActivity}
                onChange={(e) => setSchoolCanSee({...schoolCanSee, applicationActivity: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Job Offers */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Job Offers Received</p>
              <p className="text-xs text-gray-600">Number and status of job offers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schoolCanSee.jobOffers}
                onChange={(e) => setSchoolCanSee({...schoolCanSee, jobOffers: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Hiring Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Hiring Status & Employment</p>
              <p className="text-xs text-gray-600">Whether you've been hired through ZALPHA</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schoolCanSee.hiringStatus}
                onChange={(e) => setSchoolCanSee({...schoolCanSee, hiringStatus: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Salary Information */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Salary Information</p>
              <p className="text-xs text-gray-600">Compensation details from job offers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schoolCanSee.salaryInfo}
                onChange={(e) => setSchoolCanSee({...schoolCanSee, salaryInfo: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-semibold mb-1">✅ Your privacy, your control</p>
              <p>
                These settings apply to your school's educational dashboard ONLY. 
                Employers who post jobs always see the full information you choose to share on your profile. 
                Revenue sharing with your school always happens regardless of these privacy settings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Saved Successfully
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Save Privacy Settings
            </>
          )}
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Close
          </button>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">Why does my school earn revenue?</p>
            <p>
              ZALPHA partners with educational institutions to support student success. When you get hired 
              or connect with employers through our platform, a small portion (0.5%) goes back to your 
              school to help fund career services and student programs. This costs you nothing!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}