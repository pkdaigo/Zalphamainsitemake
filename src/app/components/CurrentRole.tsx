import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle, Building2, Award, ExternalLink } from 'lucide-react';

interface CurrentRoleProps {
  isEditing: boolean;
  onRoleUpdate?: (roleData: RoleData) => void;
}

export interface RoleData {
  employmentStatus: 'Not employed' | 'Employed' | 'Internship' | 'Freelance' | 'Further studies';
  jobTitle: string;
  employer: string;
  city: string;
  country: string;
  startDate: string;
  gotJobThroughZalpha: boolean;
  linkedJobPostingId: string;
}

export function CurrentRole({ isEditing, onRoleUpdate }: CurrentRoleProps) {
  const [roleData, setRoleData] = useState<RoleData>({
    employmentStatus: 'Not employed',
    jobTitle: '',
    employer: '',
    city: '',
    country: 'CNMI',
    startDate: '',
    gotJobThroughZalpha: false,
    linkedJobPostingId: '',
  });

  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [previousStatus, setPreviousStatus] = useState<string>('Not employed');

  // Mock data for autocomplete
  const employersInSystem = [
    'Pacific Development Inc.',
    'CNMI Government',
    'Saipan Grand Hotel',
    'IT Solutions Pacific',
    'Island Marketing Group',
    'Marianas Medical Center',
    'Northern Marianas College',
  ];

  const jobPostingsAppliedTo = [
    { id: '1', title: 'Software Developer - Pacific Development Inc.' },
    { id: '2', title: 'Marketing Coordinator - Island Marketing Group' },
    { id: '3', title: 'Administrative Assistant - CNMI Government' },
  ];

  const handleStatusChange = (newStatus: string) => {
    if (previousStatus === 'Not employed' && newStatus !== 'Not employed') {
      setShowCongratsModal(true);
    }
    setRoleData({ ...roleData, employmentStatus: newStatus as RoleData['employmentStatus'] });
    setPreviousStatus(newStatus);
  };

  const handleSaveFromModal = (updatedData: Partial<RoleData>) => {
    const newRoleData = { ...roleData, ...updatedData };
    setRoleData(newRoleData);
    setShowCongratsModal(false);
    if (onRoleUpdate) {
      onRoleUpdate(newRoleData);
    }
  };

  const handleUpdate = () => {
    if (onRoleUpdate) {
      onRoleUpdate(roleData);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      handleUpdate();
    }
  }, [isEditing]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Current Role</h3>
              <p className="text-sm text-gray-600">Help track employment outcomes</p>
            </div>
          </div>
          {roleData.gotJobThroughZalpha && (
            <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              ZALPHA Success!
            </div>
          )}
        </div>

        {/* Employment Status */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Employment Status <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <select
              value={roleData.employmentStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="Not employed">Not employed</option>
              <option value="Employed">Employed (Full-time)</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance / Contract</option>
              <option value="Further studies">Further Studies</option>
            </select>
          ) : (
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                roleData.employmentStatus === 'Not employed'
                  ? 'bg-gray-100 text-gray-700'
                  : roleData.employmentStatus === 'Employed'
                  ? 'bg-green-100 text-green-700'
                  : roleData.employmentStatus === 'Internship'
                  ? 'bg-blue-100 text-blue-700'
                  : roleData.employmentStatus === 'Freelance'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {roleData.employmentStatus}
              </span>
            </div>
          )}
        </div>

        {/* Show additional fields only if employed */}
        {roleData.employmentStatus !== 'Not employed' && (
          <div className="space-y-4">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={roleData.jobTitle}
                  onChange={(e) => setRoleData({ ...roleData, jobTitle: e.target.value })}
                  placeholder="e.g., Software Developer"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              ) : (
                <p className="text-gray-900 font-medium">{roleData.jobTitle || 'Not specified'}</p>
              )}
            </div>

            {/* Employer */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Employer <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <div className="relative">
                  <input
                    type="text"
                    value={roleData.employer}
                    onChange={(e) => setRoleData({ ...roleData, employer: e.target.value })}
                    placeholder="Start typing employer name..."
                    list="employers-list"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                  <datalist id="employers-list">
                    {employersInSystem.map((employer, index) => (
                      <option key={index} value={employer} />
                    ))}
                  </datalist>
                  <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-900 font-medium">{roleData.employer || 'Not specified'}</p>
                </div>
              )}
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={roleData.city}
                    onChange={(e) => setRoleData({ ...roleData, city: e.target.value })}
                    placeholder="e.g., Saipan"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-900">{roleData.city || 'Not specified'}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country
                </label>
                {isEditing ? (
                  <select
                    value={roleData.country}
                    onChange={(e) => setRoleData({ ...roleData, country: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="CNMI">CNMI</option>
                    <option value="Guam">Guam</option>
                    <option value="Palau">Palau</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="FSM">FSM</option>
                    <option value="USA">USA</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{roleData.country}</p>
                )}
              </div>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={roleData.startDate}
                  onChange={(e) => setRoleData({ ...roleData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-900">
                    {roleData.startDate ? new Date(roleData.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Not specified'}
                  </p>
                </div>
              )}
            </div>

            {/* ZALPHA Attribution */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
              <label className="flex items-start gap-3 cursor-pointer">
                {isEditing ? (
                  <input
                    type="checkbox"
                    checked={roleData.gotJobThroughZalpha}
                    onChange={(e) => setRoleData({ ...roleData, gotJobThroughZalpha: e.target.checked })}
                    className="w-5 h-5 mt-0.5 accent-green-600"
                  />
                ) : (
                  <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center ${
                    roleData.gotJobThroughZalpha ? 'bg-green-600 border-green-600' : 'border-gray-300'
                  }`}>
                    {roleData.gotJobThroughZalpha && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">I got this job through ZALPHA</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Help us demonstrate value to your school and improve the platform!
                  </p>
                </div>
              </label>
            </div>

            {/* Linked Job Posting */}
            {roleData.gotJobThroughZalpha && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Linked Job Posting (Optional)
                </label>
                {isEditing ? (
                  <select
                    value={roleData.linkedJobPostingId}
                    onChange={(e) => setRoleData({ ...roleData, linkedJobPostingId: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select job posting...</option>
                    {jobPostingsAppliedTo.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-500" />
                    <p className="text-gray-900">
                      {roleData.linkedJobPostingId
                        ? jobPostingsAppliedTo.find(j => j.id === roleData.linkedJobPostingId)?.title
                        : 'Not linked'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Congrats Modal */}
      {showCongratsModal && (
        <CongratsModal
          onClose={() => setShowCongratsModal(false)}
          onSave={handleSaveFromModal}
          currentData={roleData}
        />
      )}
    </>
  );
}

// Congrats Modal Component
interface CongratsModalProps {
  onClose: () => void;
  onSave: (data: Partial<RoleData>) => void;
  currentData: RoleData;
}

function CongratsModal({ onClose, onSave, currentData }: CongratsModalProps) {
  const [formData, setFormData] = useState({
    employer: currentData.employer,
    jobTitle: currentData.jobTitle,
    startDate: currentData.startDate,
  });

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Congrats on your new role! 🎉
          </h2>
          <p className="text-gray-600">
            Help your school track outcomes and showcase ZALPHA's impact
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Employer <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.employer}
              onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
              placeholder="e.g., Pacific Development Inc."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              placeholder="e.g., Software Developer"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Why this matters:</strong> Your school uses this data to measure student success and 
            secure continued funding for programs like ZALPHA. Your information helps future students!
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
          >
            Skip for now
          </button>
          <button
            onClick={handleSave}
            disabled={!formData.employer || !formData.jobTitle || !formData.startDate}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
              formData.employer && formData.jobTitle && formData.startDate
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  );
}
