import { StudentPrivacySettings } from '@/app/components/StudentPrivacySettings';
import { BackButton } from '@/app/components/BackButton';
import { Heart } from 'lucide-react';

interface StudentPrivacySettingsPageProps {
  onNavigate: (page: string) => void;
}

export function StudentPrivacySettingsPage({ onNavigate }: StudentPrivacySettingsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 py-12 px-6 relative overflow-hidden">
      {/* Ocean Wave Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 25 40, 50 50 T 100 50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
              <path d="M0 60 Q 25 50, 50 60 T 100 60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-bg)"/>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onNavigate={onNavigate} destination="student-dashboard" />
        
        {/* ADA Settings Banner */}
        <div className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 border-4 border-white/30 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                ADA Accessibility & Disability Settings
              </h3>
              <p className="text-white/90 text-sm sm:text-base">
                Manage your disability disclosure, reasonable accommodations, and ADA privacy settings
              </p>
            </div>
            <button
              onClick={() => onNavigate('ada-settings')}
              className="px-6 py-3 bg-white text-purple-700 rounded-xl font-bold hover:bg-purple-50 transition-colors shadow-lg whitespace-nowrap"
            >
              Manage ADA Settings
            </button>
          </div>
        </div>

        <StudentPrivacySettings 
          studentId="stu_demo_001" 
          onClose={() => onNavigate('student-dashboard')}
        />
      </div>
    </div>
  );
}