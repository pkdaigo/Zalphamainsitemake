import { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, Building2, Star, Bookmark, Filter } from 'lucide-react';
import { ZalphaBot } from '@/app/components/ZalphaBot';
import { BackButton } from '@/app/components/BackButton';

interface JobSearchProps {
  onNavigate: (page: string) => void;
}

const allJobs = [
  {
    id: 1,
    title: 'Software Developer',
    company: 'Pacific Tech Solutions',
    location: 'Guam',
    type: 'Full-time',
    salary: '$50,000 - $70,000',
    posted: '2 days ago',
    description: 'We are seeking a talented Software Developer to join our growing team...',
    tags: ['JavaScript', 'React', 'Node.js'],
  },
  {
    id: 2,
    title: 'Marketing Coordinator',
    company: 'Island Tourism Board',
    location: 'CNMI',
    type: 'Full-time',
    salary: '$40,000 - $55,000',
    posted: '3 days ago',
    description: 'Join our marketing team to promote tourism across the Pacific islands...',
    tags: ['Marketing', 'Social Media', 'Content'],
  },
  {
    id: 3,
    title: 'Registered Nurse',
    company: 'Pacific Medical Center',
    location: 'Hawaii',
    type: 'Full-time',
    salary: '$65,000 - $85,000',
    posted: '5 days ago',
    description: 'Looking for compassionate RNs to provide quality patient care...',
    tags: ['Healthcare', 'Nursing', 'Patient Care'],
  },
  {
    id: 4,
    title: 'Hotel Manager',
    company: 'Oceanview Resort',
    location: 'Guam',
    type: 'Full-time',
    salary: '$55,000 - $75,000',
    posted: '1 week ago',
    description: 'Lead our hospitality team at a premier beachfront resort...',
    tags: ['Hospitality', 'Management', 'Tourism'],
  },
  {
    id: 5,
    title: 'Graphic Designer',
    company: 'Creative Pacific Agency',
    location: 'FSM',
    type: 'Part-time',
    salary: '$30,000 - $45,000',
    posted: '1 week ago',
    description: 'Create stunning visual designs for our diverse client base...',
    tags: ['Design', 'Adobe Creative', 'Branding'],
  },
  {
    id: 6,
    title: 'Elementary Teacher',
    company: 'Pacific Island School',
    location: 'CNMI',
    type: 'Full-time',
    salary: '$42,000 - $58,000',
    posted: '2 weeks ago',
    description: 'Inspire young minds in our multicultural learning environment...',
    tags: ['Education', 'Teaching', 'K-12'],
  },
];

export function JobSearch({ onNavigate }: JobSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesLocation && matchesType;
  });

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Dashboard" />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Opportunity</h1>
          <p className="text-gray-600">{filteredJobs.length} jobs available across the Pacific</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 justify-center"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="all">All Locations</option>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedLocation('all');
                      setSelectedType('all');
                      setSearchTerm('');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-gray-600 font-medium">{job.company}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium whitespace-nowrap">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.posted}
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-3 lg:w-40">
                  <button className="flex-1 lg:w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Apply Now
                  </button>
                  <button 
                    onClick={() => toggleSaveJob(job.id)}
                    className={`flex-1 lg:w-full px-4 py-2 border rounded-lg transition-colors font-semibold ${
                      savedJobs.includes(job.id)
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {savedJobs.includes(job.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="bg-white rounded-xl p-12 shadow-lg text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find more opportunities
              </p>
              <button
                onClick={() => {
                  setSelectedLocation('all');
                  setSelectedType('all');
                  setSearchTerm('');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Zee Assistant Bot */}
      <ZalphaBot onNavigate={onNavigate} userName="John" />
    </div>
  );
}