import { useState } from 'react';
import { Mail, Phone, MapPin, Edit, Save, X, Award, Briefcase, Plus, Trash2, GraduationCap, User, FileText, Calendar, Star, CheckCircle, DollarSign, Video, Upload, Target, Car, Crown, Lock } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { TranscriptUpload } from '@/app/components/TranscriptUpload';
import { SkillsAssessment } from '@/app/components/SkillsAssessment';
import { ZalphaBot } from '@/app/components/ZalphaBot';
import { VideoIntroduction } from '@/app/components/VideoIntroduction';
import { StudentPremiumModal } from '@/app/components/StudentPremiumModal';
import { DocumentUpload } from '@/app/components/DocumentUpload';
import { AIResumeBuilder } from '@/app/components/AIResumeBuilder';
import { VerifiedReferences } from '@/app/components/VerifiedReferences';

interface StudentProfileProps {
  onNavigate: (page: string) => void;
}

export function StudentProfile({ onNavigate }: StudentProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false); // In production, get from user context
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [hasRecordedVideo, setHasRecordedVideo] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'transcript' | 'assessment' | 'payment'>('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (670) 123-4567',
    location: 'CNMI',
    education: "Bachelor's Degree",
    major: 'Computer Science',
    graduationYear: '2024',
    graduationMonth: 'May', // NEW: Add graduation month
    skills: ['JavaScript', 'React', 'Python', 'SQL'],
    bio: 'Motivated computer science graduate seeking opportunities in software development.',
    jobTypesLookingFor: ['Administrative', 'Freelance/Contract Remote', 'Technology/IT'], // NEW
  });

  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
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
          <div className="mb-4">
            <BackButton onNavigate={onNavigate} label="Back to Dashboard" />
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
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

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-4xl">
              {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {profileData.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {profileData.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">ID Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
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
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Name</div>
                <div className="font-medium text-gray-900">{profileData.firstName} {profileData.lastName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <div className="font-medium text-gray-900">{profileData.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Phone</div>
                <div className="font-medium text-gray-900">{profileData.phone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Location</div>
                <div className="font-medium text-gray-900">{profileData.location}</div>
              </div>
            </div>
          )}
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            Education
          </h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                  <select
                    value={profileData.education}
                    onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="High School Diploma">High School Diploma</option>
                    <option value="Associate's Degree">Associate's Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD/Doctorate">PhD/Doctorate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                  <input
                    type="number"
                    value={profileData.graduationYear}
                    onChange={(e) => setProfileData({ ...profileData, graduationYear: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Major/Field of Study</label>
                <input
                  type="text"
                  value={profileData.major}
                  onChange={(e) => setProfileData({ ...profileData, major: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-1">{profileData.education}</div>
              <div className="text-gray-600">{profileData.major}</div>
              <div className="text-sm text-gray-500 mt-1">Class of {profileData.graduationYear}</div>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            Skills
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {profileData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                {skill}
                {isEditing && (
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-blue-600 hover:text-blue-800"
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
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                placeholder="Add a skill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button
                onClick={handleAddSkill}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">About Me</h3>
          
          {isEditing ? (
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Tell employers about yourself..."
            />
          ) : (
            <p className="text-gray-600">{profileData.bio}</p>
          )}
        </div>

        {/* Job Types Looking For - NEW SECTION */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            Job Types I'm Looking For
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            Select all job types you're interested in. Employers can filter candidates by these preferences.
          </p>

          {isEditing ? (
            <div className="grid md:grid-cols-2 gap-4">
              {/* All job type options */}
              {[
                { value: 'Hospitality', icon: '🏨', description: 'Hotels, resorts, tourism' },
                { value: 'Restaurant/Food Service', icon: '🍽️', description: 'Dining, catering, food prep' },
                { value: 'Retail', icon: '🛍️', description: 'Stores, sales, customer service' },
                { value: 'Administrative', icon: '📋', description: 'Office, clerical, data entry' },
                { value: 'Customer Service', icon: '💬', description: 'Support, service desk, call center' },
                { value: 'Technology/IT', icon: '💻', description: 'Software, web dev, tech support' },
                { value: 'Healthcare', icon: '⚕️', description: 'Medical, nursing, patient care' },
                { value: 'Education/Tutoring', icon: '📚', description: 'Teaching, tutoring, training' },
                { value: 'Marketing/Social Media', icon: '📱', description: 'Digital marketing, content creation' },
                { value: 'Finance/Accounting', icon: '💰', description: 'Bookkeeping, payroll, analysis' },
                { value: 'Construction/Trades', icon: '🔧', description: 'Building, electrical, plumbing' },
                { value: 'Warehouse/Logistics', icon: '📦', description: 'Shipping, inventory, distribution' },
                { value: 'Transportation', icon: '🚗', description: 'Driving, delivery, logistics' },
                { value: 'Creative/Design', icon: '🎨', description: 'Graphic design, photography, art' },
                { value: 'Sales', icon: '💼', description: 'B2B, B2C, account management' },
                { value: 'Freelance/Contract Remote', icon: '🌐', description: 'Work from anywhere, project-based' },
                { value: 'Internships', icon: '🎓', description: 'Learning opportunities, entry-level' },
                { value: 'Part-Time', icon: '⏰', description: 'Flexible hours, student-friendly' },
              ].map((jobType) => (
                <label
                  key={jobType.value}
                  className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    profileData.jobTypesLookingFor.includes(jobType.value)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={profileData.jobTypesLookingFor.includes(jobType.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProfileData({
                          ...profileData,
                          jobTypesLookingFor: [...profileData.jobTypesLookingFor, jobType.value]
                        });
                      } else {
                        setProfileData({
                          ...profileData,
                          jobTypesLookingFor: profileData.jobTypesLookingFor.filter(t => t !== jobType.value)
                        });
                      }
                    }}
                    className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{jobType.icon}</span>
                      <span className="font-semibold text-gray-900">{jobType.value}</span>
                    </div>
                    <p className="text-xs text-gray-600">{jobType.description}</p>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div>
              {profileData.jobTypesLookingFor.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {profileData.jobTypesLookingFor.map((jobType, index) => {
                    const jobTypeData = [
                      { value: 'Hospitality', icon: '🏨' },
                      { value: 'Restaurant/Food Service', icon: '🍽️' },
                      { value: 'Retail', icon: '🛍️' },
                      { value: 'Administrative', icon: '📋' },
                      { value: 'Customer Service', icon: '💬' },
                      { value: 'Technology/IT', icon: '💻' },
                      { value: 'Healthcare', icon: '⚕️' },
                      { value: 'Education/Tutoring', icon: '📚' },
                      { value: 'Marketing/Social Media', icon: '📱' },
                      { value: 'Finance/Accounting', icon: '💰' },
                      { value: 'Construction/Trades', icon: '🔧' },
                      { value: 'Warehouse/Logistics', icon: '📦' },
                      { value: 'Transportation', icon: '🚗' },
                      { value: 'Creative/Design', icon: '🎨' },
                      { value: 'Sales', icon: '💼' },
                      { value: 'Freelance/Contract Remote', icon: '🌐' },
                      { value: 'Internships', icon: '🎓' },
                      { value: 'Part-Time', icon: '⏰' },
                    ].find(jt => jt.value === jobType);
                    
                    return (
                      <div
                        key={index}
                        className="px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl font-medium flex items-center gap-2"
                      >
                        <span>{jobTypeData?.icon}</span>
                        <span>{jobType}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-gray-500 italic bg-gray-50 rounded-lg p-4">
                  No job type preferences selected yet. Click "Edit Profile" to add your preferences.
                </div>
              )}
              
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>💡 Tip:</strong> Selecting multiple job types increases your visibility to employers 
                  searching for candidates with diverse interests!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Video Introduction - Premium Feature */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 relative overflow-hidden">
          {/* Premium Badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-pink-600 text-white rounded-full text-xs font-bold">
              <Crown className="w-3 h-3" />
              PREMIUM
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Video className="w-6 h-6 text-purple-600" />
            Video Introduction
            {!isPremiumUser && <Lock className="w-5 h-5 text-amber-600" />}
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            {isPremiumUser 
              ? "Showcase your personality! Video profiles get 10x more employer views." 
              : "🌟 Upgrade to Premium to unlock video introductions and stand out to employers!"
            }
          </p>

          {/* Show existing video or upload new one */}
          <div className="mb-4 relative">
            {!isPremiumUser && (
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Lock className="w-16 h-16 mx-auto mb-4 text-amber-400" />
                  <h4 className="text-2xl font-bold mb-2">Premium Feature</h4>
                  <p className="text-gray-300 mb-6 max-w-sm">
                    {hasRecordedVideo 
                      ? "You've recorded a video! Upgrade to Premium for $6/month to activate it and let employers see your personality."
                      : "Record a 60-second video introduction to showcase your personality and stand out to employers. Video profiles get 10x more views!"
                    }
                  </p>
                  <button
                    onClick={() => setShowPremiumModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Upgrade to Premium - $6/month
                  </button>
                </div>
              </div>
            )}

            <div className="bg-gray-900 rounded-xl overflow-hidden aspect-video mb-4">
              {/* Placeholder - In production, show actual video */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
                <div className="text-center text-white p-6">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold mb-2">
                    {hasRecordedVideo ? "Your Video Introduction" : "Record Your Introduction"}
                  </p>
                  <p className="text-sm text-gray-300">
                    {hasRecordedVideo 
                      ? "Video recorded - upgrade to activate!" 
                      : "60-second video to showcase yourself"
                    }
                  </p>
                </div>
              </div>
            </div>
            
            {isEditing && (
              <div className="mt-4">
                <VideoIntroduction 
                  onVideoRecorded={(blob, url) => {
                    console.log('New video recorded:', blob);
                    setHasRecordedVideo(true);
                    if (!isPremiumUser) {
                      // Show premium modal after recording
                      setTimeout(() => {
                        setShowPremiumModal(true);
                      }, 500);
                    }
                  }}
                  required={false}
                />
                {hasRecordedVideo && !isPremiumUser && (
                  <div className="mt-4 p-4 bg-amber-50 border-2 border-amber-400 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Crown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-900 mb-1">Great video! Now activate it with Premium</p>
                        <p className="text-sm text-amber-800 mb-3">
                          Your video is saved but not visible to employers yet. Upgrade to Premium for just $6/month to activate your video and unlock all premium features!
                        </p>
                        <button
                          onClick={() => setShowPremiumModal(true)}
                          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                        >
                          Activate Video - $6/month
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {!isEditing && isPremiumUser && (
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span>Video introduction active and visible to employers</span>
              </div>
            )}
          </div>
        </div>

        {/* Career & Job Preferences */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            Career Preferences
          </h3>
          
          <div className="space-y-6">
            {/* Job Location Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Job Location Preference
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-4 border-2 border-blue-600 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-900 mb-1">Local Only</div>
                  <div className="text-xs text-blue-700">Stay in {profileData.location}</div>
                </div>
                <div className="p-4 border-2 border-gray-200 rounded-lg opacity-50">
                  <div className="font-semibold text-gray-700 mb-1">Regional</div>
                  <div className="text-xs text-gray-600">CNMI, FSM, Guam, Hawaii, Marshall Islands, Palau</div>
                </div>
                <div className="p-4 border-2 border-gray-200 rounded-lg opacity-50">
                  <div className="font-semibold text-gray-700 mb-1">Anywhere</div>
                  <div className="text-xs text-gray-600">Open to relocation</div>
                </div>
              </div>
            </div>

            {/* For 18-year-old graduates */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-green-600" />
                Transportation & Availability
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Transportation Status</div>
                  <div className="font-semibold text-gray-900">Own Vehicle</div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    Has access to public transportation
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Fall School Plans</div>
                  <div className="font-semibold text-gray-900">Part-time Student</div>
                  <div className="text-sm text-gray-600 mt-1">Available for part-time work</div>
                </div>
              </div>
            </div>

            {/* Class Schedule */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Current Semester Schedule
              </h4>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-3">
                  This helps employers understand your availability for part-time jobs and internships.
                </p>
                
                {/* Sample schedule - In production, show actual schedule */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                    <div>
                      <div className="font-semibold text-gray-900">Monday & Wednesday</div>
                      <div className="text-sm text-gray-600">Computer Science 101</div>
                    </div>
                    <div className="text-sm text-gray-600">9:00 AM - 11:00 AM</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                    <div>
                      <div className="font-semibold text-gray-900">Tuesday & Thursday</div>
                      <div className="text-sm text-gray-600">Business Management</div>
                    </div>
                    <div className="text-sm text-gray-600">1:00 PM - 3:00 PM</div>
                  </div>
                </div>
                
                {isEditing && (
                  <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-semibold">
                    + Add or Edit Schedule
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Documents & Certifications */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-green-600" />
            Documents & Certifications
          </h3>
          
          {!isEditing ? (
            <div>
              {/* Display uploaded documents by category */}
              <div className="space-y-4 mb-4">
                {/* Training Certificates */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <h4 className="font-semibold text-sm text-gray-700">Training Certificates (2)</h4>
                  </div>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">CPR Certification - Valid until 2026</p>
                        <p className="text-xs text-gray-500">CPR_Cert.pdf • 245 KB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">Food Handler Card</p>
                        <p className="text-xs text-gray-500">FoodHandler.pdf • 189 KB</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Projects & Portfolio */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-sm text-gray-700">Projects & Portfolio (1)</h4>
                  </div>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">Web Design Portfolio</p>
                        <p className="text-xs text-gray-500">Portfolio.pdf • 3.2 MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span>3 documents uploaded</span>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <DocumentUpload 
                onDocumentsChange={(docs) => {
                  console.log('Documents updated:', docs);
                }}
                required={false}
                studentLocation={profileData.location}
                showFoodComplianceGuide={true}
              />
            </div>
          )}
        </div>

        {/* Resume Upload */}
        <AIResumeBuilder 
          onNavigate={onNavigate}
          studentData={{
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            phone: profileData.phone,
            location: profileData.location,
            school: 'Northern Marianas College', // In production, get from profile
            major: profileData.major,
            gpa: '3.5', // In production, get from profile
            skills: profileData.skills,
            experience: [] // In production, get from profile
          }}
        />

        {/* Verified References */}
        <VerifiedReferences
          isPremium={isPremiumUser}
          onUpgrade={() => onNavigate('pricing')}
          onNavigate={onNavigate}
        />

        {/* Transcript Upload - Ultra Premium Feature */}
        <TranscriptUpload 
          isPremium={isPremiumUser} 
          onUpgrade={() => onNavigate('pricing')} 
        />

        {/* Skills Assessment Games - Ultra Premium Feature */}
        <div className="mt-6">
          <SkillsAssessment 
            isPremium={isPremiumUser} 
            onUpgrade={() => onNavigate('pricing')}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* Zee Assistant Bot */}
      <ZalphaBot onNavigate={onNavigate} userName={profileData.firstName} />

      {/* Premium Modal */}
      <StudentPremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onUpgrade={() => onNavigate('pricing')}
      />
    </div>
  );
}