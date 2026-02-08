import { useState } from 'react';
import { Building2, MapPin, Globe, Users, Edit2, Save, Mail, Phone } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface EmployerProfileProps {
  onNavigate: (page: string) => void;
}

export function EmployerProfile({ onNavigate }: EmployerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    companyName: 'Pacific Tech Solutions',
    industry: 'Technology',
    companySize: '51-200',
    website: 'https://www.pacifictechsolutions.com',
    location: 'Guam',
    description: 'Pacific Tech Solutions is a leading technology company serving the Western Pacific region. We specialize in software development, cloud solutions, and digital transformation services for businesses across CNMI, FSM, Guam, Hawaii, Marshall Islands, and Palau.',
    contactPerson: 'Jane Smith',
    jobTitle: 'HR Manager',
    email: 'jane.smith@pacifictechsolutions.com',
    phone: '+1 (671) 555-0123',
    benefits: ['Health Insurance', 'Paid Time Off', 'Professional Development', 'Remote Work Options'],
    allowStudentReviews: true, // NEW: Employers can opt out of student reviews
  });

  const [newBenefit, setNewBenefit] = useState('');

  const handleAddBenefit = () => {
    if (newBenefit.trim() && !companyData.benefits.includes(newBenefit.trim())) {
      setCompanyData({
        ...companyData,
        benefits: [...companyData.benefits, newBenefit.trim()]
      });
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (benefitToRemove: string) => {
    setCompanyData({
      ...companyData,
      benefits: companyData.benefits.filter(benefit => benefit !== benefitToRemove)
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to a database
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <BackButton
            onClick={() => onNavigate('employer-dashboard')}
            className="text-blue-600 hover:text-blue-700 font-semibold mb-4"
          />
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Company Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-3xl">
              {companyData.companyName.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {companyData.companyName}
              </h2>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {companyData.industry}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {companyData.companySize} employees
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {companyData.location}
                </div>
              </div>
              {companyData.website && (
                <div className="flex items-center gap-2 text-blue-600">
                  <Globe className="w-4 h-4" />
                  <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {companyData.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Company Information</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={companyData.companyName}
                  onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={companyData.industry}
                    onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Hospitality">Hospitality & Tourism</option>
                    <option value="Retail">Retail</option>
                    <option value="Finance">Finance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <select
                    value={companyData.companySize}
                    onChange={(e) => setCompanyData({ ...companyData, companySize: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={companyData.website}
                    onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={companyData.location}
                    onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="CNMI">CNMI (Commonwealth of the Northern Mariana Islands)</option>
                    <option value="FSM - Yap">FSM - Yap State</option>
                    <option value="FSM - Chuuk">FSM - Chuuk State</option>
                    <option value="FSM - Pohnpei">FSM - Pohnpei State</option>
                    <option value="FSM - Kosrae">FSM - Kosrae State</option>
                    <option value="Guam">Guam</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Palau">Palau</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Company Name</div>
                <div className="font-medium text-gray-900">{companyData.companyName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Industry</div>
                <div className="font-medium text-gray-900">{companyData.industry}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Company Size</div>
                <div className="font-medium text-gray-900">{companyData.companySize} employees</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Location</div>
                <div className="font-medium text-gray-900">{companyData.location}</div>
              </div>
            </div>
          )}
        </div>

        {/* Company Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">About the Company</h3>
          
          {isEditing ? (
            <textarea
              value={companyData.description}
              onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Tell candidates about your company..."
            />
          ) : (
            <p className="text-gray-600">{companyData.description}</p>
          )}
        </div>

        {/* Contact Person */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                  <input
                    type="text"
                    value={companyData.contactPerson}
                    onChange={(e) => setCompanyData({ ...companyData, contactPerson: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={companyData.jobTitle}
                    onChange={(e) => setCompanyData({ ...companyData, jobTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={companyData.email}
                    onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Contact Person</div>
                <div className="font-medium text-gray-900">{companyData.contactPerson}</div>
                <div className="text-sm text-gray-500">{companyData.jobTitle}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Contact Details</div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <Mail className="w-4 h-4" />
                  {companyData.email}
                </div>
                <div className="flex items-center gap-2 text-gray-900">
                  <Phone className="w-4 h-4" />
                  {companyData.phone}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Benefits & Perks */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Benefits & Perks</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {companyData.benefits.map((benefit, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                {benefit}
                {isEditing && (
                  <button
                    onClick={() => handleRemoveBenefit(benefit)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ✕
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddBenefit()}
                placeholder="Add a benefit..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button
                onClick={handleAddBenefit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Privacy & Review Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Privacy & Review Settings</h3>
          
          <div className="space-y-6">
            {/* Student Reviews Toggle */}
            <div className="flex items-start justify-between p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg">
              <div className="flex-1 mr-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-gray-900">Student Reviews</h4>
                  {companyData.allowStudentReviews ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-bold">ENABLED</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-bold">DISABLED</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  {companyData.allowStudentReviews 
                    ? 'Students who have worked for your company can leave verified reviews about their experience. Good reviews help attract top talent!'
                    : 'Student reviews are currently disabled. Students who have worked for your company cannot leave reviews on your company page.'}
                </p>
                {!companyData.allowStudentReviews && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                    <strong>⚠️ Note:</strong> Disabling reviews may make your company appear less transparent to job seekers. Verified reviews build trust and authenticity. We recommend keeping reviews enabled for best results.
                  </div>
                )}
                {companyData.allowStudentReviews && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                    <strong>✓ Benefits:</strong> Verified reviews showcase your company culture, help attract quality candidates, and provide valuable feedback. Only students who were actually hired through ZALPHA can leave reviews.
                  </div>
                )}
              </div>
              
              {isEditing && (
                <label className="flex items-center cursor-pointer ml-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={companyData.allowStudentReviews}
                      onChange={(e) => setCompanyData({ ...companyData, allowStudentReviews: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${
                      companyData.allowStudentReviews ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      companyData.allowStudentReviews ? 'transform translate-x-6' : ''
                    }`}></div>
                  </div>
                </label>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">📊 How Student Reviews Work</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Only students who were <strong>hired through ZALPHA</strong> can leave reviews</li>
                <li>• Students must verify their employment with upload of paystub or offer letter</li>
                <li>• You can respond to any review publicly</li>
                <li>• False or inappropriate reviews can be flagged for admin review</li>
                <li>• Reviews include star ratings (1-5) and written feedback</li>
                <li>• Your overall rating is displayed on your company profile</li>
              </ul>
            </div>

            {!isEditing && (
              <div className="text-center text-sm text-gray-500 pt-4">
                Click "Edit Profile" above to change review settings
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}