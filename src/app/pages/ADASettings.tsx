import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { ADAAccessibility, ADAData } from '@/app/components/ADAAccessibility';
import { Save, Info } from 'lucide-react';

interface ADASettingsProps {
  onNavigate: (page: string) => void;
}

export function ADASettings({ onNavigate }: ADASettingsProps) {
  const [savedData, setSavedData] = useState<ADAData | null>(null);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const handleSave = (data: ADAData) => {
    // In production, this would save to the backend
    setSavedData(data);
    setShowSaveConfirmation(true);
    
    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setShowSaveConfirmation(false);
    }, 3000);
    
    console.log('ADA Data Saved:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Dashboard" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ADA Accessibility Settings
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your disability disclosure and accommodation preferences
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Your Privacy is Protected</h3>
              <p className="text-sm sm:text-base text-blue-800">
                All information on this page is <strong>completely voluntary</strong> and <strong>100% private by default</strong>. 
                You choose if and when employers can see this information. You can update or delete this information at any time.
              </p>
              <button
                onClick={() => onNavigate('ada-information')}
                className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-900 underline"
              >
                Learn more about your ADA rights →
              </button>
            </div>
          </div>
        </div>

        {/* Save Confirmation */}
        {showSaveConfirmation && (
          <div className="fixed top-24 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in z-50">
            <Save className="w-5 h-5" />
            <span className="font-semibold">ADA settings saved successfully!</span>
          </div>
        )}

        {/* ADA Component */}
        <ADAAccessibility 
          onSave={handleSave}
          initialData={savedData || undefined}
          showFullExplanation={true}
        />

        {/* Bottom Info */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">What Happens to This Information?</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong className="text-gray-900">Private by Default:</strong> Unless you check "Allow employers to see my disability status," 
              this information is only visible to you and ZALPHA administrators.
            </p>
            <p>
              <strong className="text-gray-900">You Control Sharing:</strong> You can change your visibility settings at any time. 
              When you make your information visible, only employers viewing your profile will see it.
            </p>
            <p>
              <strong className="text-gray-900">Secure Storage:</strong> All disability information is encrypted and stored separately 
              from your main profile in compliance with ADA and HIPAA privacy requirements.
            </p>
            <p>
              <strong className="text-gray-900">You Can Delete Anytime:</strong> You can delete all of this information at any time 
              from your privacy settings. Once deleted, it's permanently removed from our systems.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('student-privacy-settings')}
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            Privacy Settings
          </button>
          <button
            onClick={() => onNavigate('ada-information')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Learn About ADA Rights
          </button>
          <button
            onClick={() => onNavigate('student-dashboard')}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
