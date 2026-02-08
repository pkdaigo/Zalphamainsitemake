import { useState } from 'react';
import { Heart, Shield, Eye, EyeOff, CheckCircle, Info, Lock } from 'lucide-react';

interface ADAAccessibilityProps {
  onSave?: (data: ADAData) => void;
  initialData?: ADAData;
  showFullExplanation?: boolean;
}

export interface ADAData {
  hasDisability: 'yes' | 'no' | 'prefer-not-to-say';
  disabilityTypes: string[];
  requiresAccommodations: boolean;
  accommodationsNeeded: string[];
  otherAccommodations: string;
  allowEmployersToSee: boolean;
  notes: string;
}

export function ADAAccessibility({ 
  onSave, 
  initialData,
  showFullExplanation = true 
}: ADAAccessibilityProps) {
  const [data, setData] = useState<ADAData>(initialData || {
    hasDisability: 'prefer-not-to-say',
    disabilityTypes: [],
    requiresAccommodations: false,
    accommodationsNeeded: [],
    otherAccommodations: '',
    allowEmployersToSee: false,
    notes: '',
  });

  const [showDetails, setShowDetails] = useState(false);

  const disabilityCategories = [
    { id: 'mobility', label: 'Mobility/Physical Disability', icon: '♿' },
    { id: 'vision', label: 'Vision Impairment', icon: '👁️' },
    { id: 'hearing', label: 'Hearing Impairment', icon: '👂' },
    { id: 'cognitive', label: 'Cognitive/Learning Disability', icon: '🧠' },
    { id: 'mental-health', label: 'Mental Health Condition', icon: '💚' },
    { id: 'chronic-illness', label: 'Chronic Illness/Medical Condition', icon: '🏥' },
    { id: 'neurodivergent', label: 'Neurodivergent (ADHD, Autism, etc.)', icon: '🌈' },
    { id: 'other', label: 'Other Disability', icon: '➕' },
  ];

  const commonAccommodations = [
    { id: 'flexible-schedule', label: 'Flexible work schedule' },
    { id: 'remote-work', label: 'Remote/work-from-home options' },
    { id: 'ergonomic', label: 'Ergonomic workspace setup' },
    { id: 'screen-reader', label: 'Screen reader software' },
    { id: 'breaks', label: 'Additional breaks' },
    { id: 'quiet-space', label: 'Quiet workspace' },
    { id: 'assistive-tech', label: 'Assistive technology' },
    { id: 'modified-duties', label: 'Modified job duties' },
    { id: 'accessible-facilities', label: 'Wheelchair accessible facilities' },
    { id: 'sign-language', label: 'Sign language interpreter' },
    { id: 'written-instructions', label: 'Written instructions' },
    { id: 'noise-cancelling', label: 'Noise-cancelling headphones' },
  ];

  const handleSave = () => {
    if (onSave) {
      onSave(data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">ADA Accessibility & Accommodations</h2>
            <p className="text-base sm:text-lg text-white/90">
              Your rights are protected under the Americans with Disabilities Act (ADA)
            </p>
          </div>
        </div>
      </div>

      {showFullExplanation && (
        <>
          {/* Important Information */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Your Rights Under ADA</h3>
                <ul className="space-y-2 text-sm sm:text-base text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Voluntary Disclosure:</strong> You are NOT required to disclose any disability. This is 100% optional.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Protection from Discrimination:</strong> Employers cannot discriminate against you because of a disability.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Reasonable Accommodations:</strong> Employers must provide reasonable accommodations if requested.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Privacy Control:</strong> You decide who sees this information and when.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Disclose */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-900 mb-3">Why Some Students Choose to Disclose</h3>
            <ul className="space-y-2 text-sm sm:text-base text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Find employers who actively support workplace diversity and inclusion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Request accommodations early in the hiring process</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Match with employers who have experience supporting employees with disabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Access disability hiring programs and initiatives</span>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Disclosure Question */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Do you have a disability?</h3>
        <p className="text-sm text-gray-600 mb-6">
          This question is completely voluntary. You may choose not to answer.
        </p>

        <div className="space-y-3">
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="hasDisability"
              value="yes"
              checked={data.hasDisability === 'yes'}
              onChange={(e) => {
                setData({ ...data, hasDisability: 'yes' });
                setShowDetails(true);
              }}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Yes, I have a disability</div>
              <div className="text-sm text-gray-600">I would like to share this information</div>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="hasDisability"
              value="no"
              checked={data.hasDisability === 'no'}
              onChange={(e) => {
                setData({ ...data, hasDisability: 'no', disabilityTypes: [], requiresAccommodations: false, accommodationsNeeded: [] });
                setShowDetails(false);
              }}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900">No, I do not have a disability</div>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="hasDisability"
              value="prefer-not-to-say"
              checked={data.hasDisability === 'prefer-not-to-say'}
              onChange={(e) => {
                setData({ ...data, hasDisability: 'prefer-not-to-say', disabilityTypes: [], requiresAccommodations: false, accommodationsNeeded: [] });
                setShowDetails(false);
              }}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900">I prefer not to answer</div>
              <div className="text-sm text-gray-600">I choose not to disclose at this time</div>
            </div>
          </label>
        </div>
      </div>

      {/* Additional Details (only if "yes") */}
      {showDetails && data.hasDisability === 'yes' && (
        <>
          {/* Disability Type */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Type of Disability (Optional)</h3>
            <p className="text-sm text-gray-600 mb-6">
              Select all that apply. This helps us connect you with appropriate resources.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {disabilityCategories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={data.disabilityTypes.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setData({
                          ...data,
                          disabilityTypes: [...data.disabilityTypes, category.id],
                        });
                      } else {
                        setData({
                          ...data,
                          disabilityTypes: data.disabilityTypes.filter((t) => t !== category.id),
                        });
                      }
                    }}
                  />
                  <span className="text-2xl">{category.icon}</span>
                  <span className="text-sm font-medium text-gray-900">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Accommodations */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reasonable Accommodations</h3>
            <p className="text-sm text-gray-600 mb-6">
              Do you require workplace accommodations to perform job duties?
            </p>

            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.requiresAccommodations}
                  onChange={(e) =>
                    setData({
                      ...data,
                      requiresAccommodations: e.target.checked,
                    })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold text-purple-900">Yes, I may need reasonable accommodations</div>
                  <div className="text-sm text-purple-700">Select common accommodations below</div>
                </div>
              </label>

              {data.requiresAccommodations && (
                <div className="pl-4 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {commonAccommodations.map((accommodation) => (
                      <label
                        key={accommodation.id}
                        className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={data.accommodationsNeeded.includes(accommodation.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setData({
                                ...data,
                                accommodationsNeeded: [...data.accommodationsNeeded, accommodation.id],
                              });
                            } else {
                              setData({
                                ...data,
                                accommodationsNeeded: data.accommodationsNeeded.filter(
                                  (a) => a !== accommodation.id
                                ),
                              });
                            }
                          }}
                          className="mt-0.5"
                        />
                        <span className="text-sm text-gray-900">{accommodation.label}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Other Accommodations (Optional)
                    </label>
                    <textarea
                      value={data.otherAccommodations}
                      onChange={(e) =>
                        setData({ ...data, otherAccommodations: e.target.value })
                      }
                      placeholder="Describe any other accommodations you may need..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Privacy Control */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Privacy & Visibility</h3>
                <p className="text-sm text-purple-800 mb-4">
                  You have complete control over who can see your disability information.
                </p>
              </div>
            </div>

            <label className="flex items-start gap-3 p-4 bg-white border-2 border-purple-300 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={data.allowEmployersToSee}
                onChange={(e) =>
                  setData({ ...data, allowEmployersToSee: e.target.checked })
                }
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {data.allowEmployersToSee ? (
                    <Eye className="w-5 h-5 text-green-600" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="font-semibold text-gray-900">
                    Allow employers to see my disability status
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {data.allowEmployersToSee ? (
                    <span className="text-green-600">
                      ✓ Employers who view your profile will see that you have a disability and any accommodation needs you've listed. This can help you connect with inclusive employers.
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      Your disability information will remain private. Only you and ZALPHA administrators can see it.
                    </span>
                  )}
                </div>
              </div>
            </label>
          </div>

          {/* Additional Notes */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Information (Optional)</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add any additional notes about your disability or accommodation needs. This will only be visible if you choose to share your information with employers.
            </p>
            <textarea
              value={data.notes}
              onChange={(e) => setData({ ...data, notes: e.target.value })}
              placeholder="E.g., specific tools you use, best ways to communicate, etc."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </>
      )}

      {/* Legal Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-gray-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700 space-y-2">
            <p className="font-semibold text-gray-900">Your Legal Protections:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>The ADA prohibits discrimination based on disability in all employment practices</li>
              <li>Employers must provide reasonable accommodations unless it causes undue hardship</li>
              <li>You cannot be denied employment solely because you have a disability</li>
              <li>Medical information must be kept confidential and separate from personnel files</li>
              <li>Retaliation for requesting accommodations is illegal</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3">
              For more information about your rights under the ADA, visit{' '}
              <a href="https://www.ada.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                ADA.gov
              </a>{' '}
              or contact the{' '}
              <a href="https://www.eeoc.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                EEOC
              </a>.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {onSave && (
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            Save ADA Information
          </button>
        </div>
      )}
    </div>
  );
}
