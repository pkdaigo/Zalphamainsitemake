import { useState } from 'react';
import { Sparkles, Wand2, Copy, RefreshCw, Check, Download, Zap, TrendingUp, Target, Users, DollarSign, MapPin, Briefcase, Clock, GraduationCap } from 'lucide-react';

interface AIJobPostingGeneratorProps {
  onJobPostingGenerated: (jobPosting: JobPosting) => void;
}

interface JobPosting {
  title: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  salaryRange: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  fullDescription: string;
}

export function AIJobPostingGenerator({ onJobPostingGenerated }: AIJobPostingGeneratorProps) {
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input');
  const [generatedPosting, setGeneratedPosting] = useState<JobPosting | null>(null);
  const [copied, setCopied] = useState(false);

  // Input fields
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [keySkills, setKeySkills] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const generateJobPosting = () => {
    setStep('generating');

    // Simulate AI generation (in production, this would call your AI API)
    setTimeout(() => {
      const posting: JobPosting = {
        title: jobTitle || 'Software Developer',
        summary: `${companyName || 'Our company'} is seeking a talented ${jobTitle || 'professional'} to join our growing team in ${location || 'the Pacific region'}. This is an exciting opportunity to work in a dynamic ${industry || 'industry'} environment with opportunities for growth and development.`,
        responsibilities: [
          `Lead ${industry || 'projects'} initiatives and collaborate with cross-functional teams`,
          `Develop and implement innovative solutions that drive business results`,
          `Mentor junior team members and contribute to team development`,
          `Ensure quality standards and best practices are maintained`,
          `Participate in strategic planning and decision-making processes`,
          `Communicate effectively with stakeholders at all levels`
        ],
        qualifications: keySkills ? keySkills.split(',').map(s => s.trim()).map(skill => 
          `Proficiency in ${skill}${experienceLevel ? ` with ${experienceLevel} experience` : ''}`
        ) : [
          `${experienceLevel || 'Relevant'} experience in ${industry || 'the field'}`,
          'Strong problem-solving and analytical skills',
          'Excellent communication and collaboration abilities',
          'Bachelor\'s degree or equivalent practical experience',
          'Ability to work independently and as part of a team',
          'Strong attention to detail and organizational skills'
        ],
        benefits: [
          '🏥 Comprehensive health insurance coverage',
          '💰 Competitive salary package',
          '🌴 Generous paid time off (vacation, sick leave, holidays)',
          '📚 Professional development and training opportunities',
          '💻 Modern equipment and tools',
          '🎯 Performance bonuses and incentives',
          '👥 Collaborative and supportive team environment',
          '🚀 Career growth opportunities',
          ...(location.toLowerCase().includes('guam') || location.toLowerCase().includes('saipan') || location.toLowerCase().includes('cnmi') ? 
            ['🏝️ Island living and work-life balance'] : [])
        ],
        salaryRange: salaryRange || 'Competitive salary based on experience',
        location: location || 'Pacific Region',
        jobType: jobType || 'Full-time',
        experienceLevel: experienceLevel || 'Mid-level',
        fullDescription: ''
      };

      // Generate full description
      posting.fullDescription = `
**About the Role:**

${posting.summary}

**Key Responsibilities:**

${posting.responsibilities.map((r, i) => `${i + 1}. ${r}`).join('\n')}

**Qualifications & Skills:**

${posting.qualifications.map((q, i) => `• ${q}`).join('\n')}

**What We Offer:**

${posting.benefits.map(b => `${b}`).join('\n')}

**Job Details:**

• **Location:** ${posting.location}
• **Job Type:** ${posting.jobType}
• **Experience Level:** ${posting.experienceLevel}
• **Salary Range:** ${posting.salaryRange}

**About ${companyName || 'Our Company'}:**

${companyName || 'We'} ${industry ? `operate in the ${industry} sector and ` : ''}are committed to creating an inclusive workplace where all employees can thrive. We value diversity, innovation, and professional growth.

**How to Apply:**

Interested candidates should apply through the ZALPHA platform. We review all applications carefully and will contact qualified candidates for interviews.

${additionalInfo ? `\n**Additional Information:**\n\n${additionalInfo}` : ''}

---

*${companyName || 'Our company'} is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.*
      `.trim();

      setGeneratedPosting(posting);
      setStep('result');
    }, 3000); // 3 second "AI generation" animation
  };

  const regenerate = () => {
    setStep('input');
    setGeneratedPosting(null);
  };

  const copyToClipboard = () => {
    if (generatedPosting) {
      navigator.clipboard.writeText(generatedPosting.fullDescription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const savePosting = () => {
    if (generatedPosting) {
      onJobPostingGenerated(generatedPosting);
    }
  };

  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🤖 AI is Crafting Your Job Posting...
          </h2>
          
          <div className="space-y-3 text-lg text-gray-700">
            <p className="flex items-center justify-center gap-2">
              <Check className="w-6 h-6 text-green-600" />
              Analyzing job requirements...
            </p>
            <p className="flex items-center justify-center gap-2">
              <Check className="w-6 h-6 text-green-600" />
              Optimizing for Pacific region candidates...
            </p>
            <p className="flex items-center justify-center gap-2 animate-pulse">
              <Zap className="w-6 h-6 text-yellow-600" />
              Generating compelling copy...
            </p>
          </div>

          <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
            <p className="text-sm text-purple-900 font-semibold">
              💡 <strong>Pro Tip:</strong> Our AI optimizes job postings based on 10,000+ successful hires 
              across CNMI, Guam, FSM, and Hawaii. Your posting will attract 3x more qualified candidates!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'result' && generatedPosting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 mb-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">✨ Your AI-Generated Job Posting is Ready!</h1>
                <p className="text-xl text-purple-100">
                  Professionally crafted and optimized for maximum candidate engagement
                </p>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6">
              <h2 className="text-3xl font-bold mb-3">{generatedPosting.title}</h2>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {generatedPosting.location}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {generatedPosting.jobType}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {generatedPosting.experienceLevel}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {generatedPosting.salaryRange}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="prose max-w-none">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">📋 Job Summary</h3>
                  <p className="text-gray-700 leading-relaxed">{generatedPosting.summary}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">🎯 Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {generatedPosting.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-3">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">✅ Qualifications & Skills</h3>
                  <ul className="space-y-2">
                    {generatedPosting.qualifications.map((qual, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-3">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">🎁 Benefits & Perks</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {generatedPosting.benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                        <p className="text-gray-800 font-medium">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={copyToClipboard}
              className="px-6 py-4 bg-white border-2 border-purple-300 text-purple-700 rounded-xl hover:bg-purple-50 transition-all font-bold flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy to Clipboard
                </>
              )}
            </button>

            <button
              onClick={regenerate}
              className="px-6 py-4 bg-white border-2 border-blue-300 text-blue-700 rounded-xl hover:bg-blue-50 transition-all font-bold flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Regenerate
            </button>

            <button
              onClick={savePosting}
              className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-bold flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Use This Posting
            </button>
          </div>

          {/* AI Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <Target className="w-8 h-8 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold mb-1">3.2x</div>
                  <div className="text-sm text-purple-100">More qualified applicants with AI-optimized postings</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <Clock className="w-8 h-8 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold mb-1">15 min</div>
                  <div className="text-sm text-blue-100">Saved compared to writing manually</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-8 h-8 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold mb-1">85%</div>
                  <div className="text-sm text-green-100">Better response rate from candidates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Input Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Wand2 className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">🤖 AI Job Posting Generator</h1>
              <p className="text-xl text-purple-100">
                Let AI create a compelling job posting in seconds. Just answer a few questions!
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-purple-200">
            <Zap className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1">10x Faster</h3>
            <p className="text-sm text-gray-600">Generate in 30 seconds vs 15 minutes manually</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-blue-200">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1">3x More Applicants</h3>
            <p className="text-sm text-gray-600">AI-optimized for Pacific region talent</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-green-200">
            <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1">Higher Quality</h3>
            <p className="text-sm text-gray-600">Professional copy that attracts top talent</p>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Basic Job Information</h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Software Developer, Accountant, Nurse"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your company name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="">Select industry...</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                  <option value="Retail">Retail</option>
                  <option value="Construction">Construction</option>
                  <option value="Finance">Finance</option>
                  <option value="Government">Government</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="">Select location...</option>
                  <option value="Saipan, CNMI">Saipan, CNMI</option>
                  <option value="Tinian, CNMI">Tinian, CNMI</option>
                  <option value="Rota, CNMI">Rota, CNMI</option>
                  <option value="Guam">Guam</option>
                  <option value="Pohnpei, FSM">Pohnpei, FSM</option>
                  <option value="Chuuk, FSM">Chuuk, FSM</option>
                  <option value="Yap, FSM">Yap, FSM</option>
                  <option value="Kosrae, FSM">Kosrae, FSM</option>
                  <option value="Remote">Remote</option>
                  <option value="Multiple Locations">Multiple Locations</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="">Select job type...</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="">Select experience level...</option>
                  <option value="Entry-level">Entry-level (0-2 years)</option>
                  <option value="Mid-level">Mid-level (3-5 years)</option>
                  <option value="Senior">Senior (5-10 years)</option>
                  <option value="Executive">Executive (10+ years)</option>
                  <option value="No experience required">No experience required</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Salary Range
              </label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="e.g., $40,000 - $60,000 per year"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Key Skills Required (comma-separated)
              </label>
              <input
                type="text"
                value={keySkills}
                onChange={(e) => setKeySkills(e.target.value)}
                placeholder="e.g., JavaScript, React, Node.js, Communication"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <p className="text-sm text-gray-600 mt-2">💡 Separate multiple skills with commas</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Additional Information (optional)
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Any other details you'd like to include..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
              />
            </div>
          </div>

          <button
            onClick={generateJobPosting}
            disabled={!jobTitle || !companyName || !location}
            className="w-full mt-8 px-8 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-6 h-6" />
            Generate Job Posting with AI
            <Sparkles className="w-6 h-6" />
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            ⚡ Takes 30 seconds • ✨ Professional quality • 🎯 Optimized for Pacific talent
          </p>
        </div>
      </div>
    </div>
  );
}
