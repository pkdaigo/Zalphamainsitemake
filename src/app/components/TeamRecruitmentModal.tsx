import { useState } from 'react';
import { X, Users, DollarSign, Clock, Target, Briefcase, Award, Send, Shield } from 'lucide-react';

interface TeamRecruitmentModalProps {
  onClose: () => void;
  onSubmit: (requestData: TeamRequestData) => void;
}

export interface TeamRequestData {
  projectName: string;
  teamSize: string;
  duration: string;
  budget: number;
  currency: string;
  roles: string[];
  projectDescription: string;
  timeline: string;
  companyName: string;
  contactEmail: string;
  preferredLocations: string[];
  skillsRequired: string;
  recruitmentFee?: number;
}

export function TeamRecruitmentModal({ onClose, onSubmit }: TeamRecruitmentModalProps) {
  const [projectName, setProjectName] = useState('');
  const [teamSize, setTeamSize] = useState('3-5');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [projectDescription, setProjectDescription] = useState('');
  const [timeline, setTimeline] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['CNMI']);
  const [skillsRequired, setSkillsRequired] = useState('');

  const availableRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full-Stack Developer',
    'Mobile Developer',
    'UI/UX Designer',
    'Graphic Designer',
    'Project Manager',
    'Content Writer',
    'Social Media Manager',
    'Video Editor',
    'Data Analyst',
    'QA Tester',
    'DevOps Engineer',
    'Marketing Specialist'
  ];

  const locations = ['CNMI', 'Guam', 'Hawaii', 'FSM', 'Remote'];

  const toggleRole = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const calculateRecruitmentFee = () => {
    const teamSizeNum = parseInt(teamSize.split('-')[0]) || 3;
    const baseFee = 499; // Base fee per person
    const total = baseFee * teamSizeNum;
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      projectName,
      teamSize,
      duration,
      budget: parseFloat(budget),
      currency,
      roles: selectedRoles,
      projectDescription,
      timeline,
      companyName,
      contactEmail,
      preferredLocations: selectedLocations,
      skillsRequired,
      recruitmentFee: calculateRecruitmentFee()
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Request Dedicated Recruiter</h2>
              <p className="text-purple-100">Let ZALPHA assemble your perfect team from verified Pacific Island talent</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Service Benefits Banner */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-bold text-purple-900 mb-4 text-lg">🎯 Why Use ZALPHA Dedicated Recruiters?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Pre-Vetted Talent</p>
                  <p className="text-xs text-gray-600">All candidates are ID-verified + skills-tested</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Perfect Match</p>
                  <p className="text-xs text-gray-600">We match skills to your exact needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Fast Assembly</p>
                  <p className="text-xs text-gray-600">Teams ready in 5-7 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Quality Guarantee</p>
                  <p className="text-xs text-gray-600">100% satisfaction or free replacement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., E-commerce Platform Launch"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Your company name"
              />
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="your.email@company.com"
            />
          </div>

          {/* Team Size & Duration */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Size Needed *
              </label>
              <select
                required
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option value="2-3">2-3 people</option>
                <option value="3-5">3-5 people</option>
                <option value="5-8">5-8 people</option>
                <option value="8-12">8-12 people</option>
                <option value="12-20">12-20 people</option>
                <option value="20+">20+ people (Enterprise)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Duration *
              </label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., 3 months, 6 months, 1 year"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Project Budget *
              </label>
              <input
                type="number"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                step="100"
                min="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="25000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency *
              </label>
              <select
                required
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option value="USD">USD ($)</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDC">USDC</option>
              </select>
            </div>
          </div>

          {/* Roles Needed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Roles Needed * (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {availableRoles.map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedRoles.includes(role)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected: {selectedRoles.length} role{selectedRoles.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Preferred Locations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Locations * (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-3">
              {locations.map(location => (
                <button
                  key={location}
                  type="button"
                  onClick={() => toggleLocation(location)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedLocations.includes(location)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              required
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Describe your project, goals, deliverables, and any specific requirements..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {projectDescription.length}/2000 characters
            </p>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Skills or Technologies Required
            </label>
            <input
              type="text"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="e.g., React, Node.js, AWS, Adobe Suite, Canva"
            />
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desired Start Date *
            </label>
            <input
              type="text"
              required
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="e.g., Immediately, Within 2 weeks, February 15th"
            />
          </div>

          {/* Pricing Summary */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Recruitment Service Fee
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Team Size:</span>
                <span className="font-semibold text-gray-900">{teamSize} people</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recruitment Fee per Person:</span>
                <span className="font-semibold text-gray-900">$499</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Number of Roles Selected:</span>
                <span className="font-semibold text-gray-900">{selectedRoles.length}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-green-300">
                <span className="font-bold text-gray-900">Estimated Service Fee:</span>
                <span className="font-bold text-2xl text-green-600">
                  ${calculateRecruitmentFee().toLocaleString()}
                </span>
              </div>
              <div className="bg-white/50 rounded-lg p-3 mt-3">
                <p className="text-xs text-gray-700">
                  💡 <strong>What's Included:</strong> Talent sourcing, vetting, skill testing, interview coordination, 
                  onboarding support, and 30-day satisfaction guarantee. Payment due upon team assembly approval.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3 text-sm">📋 What Happens Next?</h4>
            <ol className="text-xs text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[20px]">1.</span>
                <span>ZALPHA recruiter reviews your requirements (within 24 hours)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[20px]">2.</span>
                <span>We source and vet candidates from our verified talent pool</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[20px]">3.</span>
                <span>You receive 3-5 candidate profiles per role (within 5-7 days)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[20px]">4.</span>
                <span>We coordinate interviews and facilitate the hiring process</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[20px]">5.</span>
                <span>Team assembly complete! Payment processed and work begins</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Team Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}