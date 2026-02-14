import { useState } from 'react';
import { Sparkles, FileText, Download, Eye, Wand2, CheckCircle, Clock, Star, AlertCircle, Zap } from 'lucide-react';

interface AIResumeBuilderProps {
  onNavigate?: (page: string) => void;
  studentData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    school: string;
    major: string;
    gpa: string;
    skills: string[];
    experience: any[];
  };
}

export function AIResumeBuilder({ onNavigate, studentData }: AIResumeBuilderProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeGenerated, setResumeGenerated] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [resumeStyle, setResumeStyle] = useState('traditional');

  const templates = [
    { 
      id: 'professional', 
      name: 'Professional', 
      icon: '💼',
      description: 'Clean and formal - Perfect for corporate roles',
      industries: ['Finance', 'Healthcare', 'Government']
    },
    { 
      id: 'modern', 
      name: 'Modern', 
      icon: '✨',
      description: 'Contemporary design - Great for tech & startups',
      industries: ['Technology', 'Startups', 'Creative']
    },
    { 
      id: 'pacific', 
      name: 'Pacific Islands', 
      icon: '🌺',
      description: 'Island-themed - Highlights Pacific heritage',
      industries: ['Hospitality', 'Tourism', 'Government']
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      icon: '🎨',
      description: 'Bold and artistic - Stand out in creative fields',
      industries: ['Design', 'Marketing', 'Media']
    },
  ];

  const handleGenerateResume = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setResumeGenerated(true);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
        <div className="w-full">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex flex-wrap items-center gap-2 mb-1">
                <span>AI Resume Builder</span>
                <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                  FREE
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">Create a professional resume in minutes with AI</p>
            </div>
          </div>
        </div>
      </div>

      {!resumeGenerated ? (
        <>
          {/* AI Benefits Banner */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 mb-6 border-2 border-purple-200">
            <div className="flex items-start gap-3 mb-4">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-purple-900 text-base sm:text-lg mb-3">
                  Why Use ZALPHA's AI Resume Builder?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      <strong>Auto-formatted:</strong> Perfect layout every time
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      <strong>ATS-optimized:</strong> Passes employer screening systems
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      <strong>AI-powered:</strong> Smart bullet points & descriptions
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      <strong>Pacific-focused:</strong> Highlights island experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 mb-4">
              Choose Your Resume Template
            </label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedTemplate === template.id
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-2">{template.icon}</div>
                  <div className="font-bold text-gray-900 mb-1">{template.name}</div>
                  <div className="text-xs text-gray-600 mb-2">{template.description}</div>
                  <div className="flex flex-wrap gap-1">
                    {template.industries.slice(0, 2).map((industry) => (
                      <span key={industry} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-700">
                        {industry}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Generation Options */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 mb-4">
              Resume Style
            </label>
            <div className="grid sm:grid-cols-3 gap-4">
              <button
                onClick={() => setResumeStyle('traditional')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  resumeStyle === 'traditional'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <FileText className="w-6 h-6 text-purple-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm mb-1">Traditional</div>
                <div className="text-xs text-gray-600">Conservative, proven format</div>
              </button>
              <button
                onClick={() => setResumeStyle('achievement')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  resumeStyle === 'achievement'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Star className="w-6 h-6 text-purple-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm mb-1">Achievement-Focused</div>
                <div className="text-xs text-gray-600">Emphasizes accomplishments</div>
              </button>
              <button
                onClick={() => setResumeStyle('skills')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  resumeStyle === 'skills'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Zap className="w-6 h-6 text-purple-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm mb-1">Skills-Based</div>
                <div className="text-xs text-gray-600">Highlights competencies</div>
              </button>
            </div>
          </div>

          {/* What AI Will Include */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              What Our AI Will Generate For You:
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <strong>Professional Summary:</strong> Compelling opening paragraph
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <strong>Work Experience:</strong> Action-oriented bullet points
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <strong>Skills Section:</strong> Organized by category
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <strong>Education:</strong> Properly formatted credentials
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateResume}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <Clock className="w-6 h-6 animate-spin" />
                AI is crafting your resume...
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                Generate My Resume with AI
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            ⚡ Takes 30-45 seconds • You can edit after generation
          </p>
        </>
      ) : (
        <>
          {/* Resume Generated Success */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-300">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-green-900 text-lg mb-2">
                  🎉 Your Resume is Ready!
                </h4>
                <p className="text-green-800 mb-4">
                  Our AI has created a professional resume tailored to Pacific Island employers. 
                  Review it, make any edits, and download when ready!
                </p>
              </div>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-gray-200">
            <div className="bg-white rounded-lg p-8 shadow-inner">
              <h3 className="text-center text-2xl font-bold text-gray-900 mb-1">
                {studentData?.firstName} {studentData?.lastName}
              </h3>
              <div className="text-center text-sm text-gray-600 mb-6">
                {studentData?.email} • {studentData?.phone} • {studentData?.location}
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2 border-b-2 border-purple-600 pb-1">
                  PROFESSIONAL SUMMARY
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Motivated {studentData?.major} graduate from {studentData?.school} with strong 
                  foundation in Pacific Island business practices. Proven ability to adapt quickly 
                  and deliver results in fast-paced environments. Seeking to leverage my skills 
                  and cultural understanding to contribute to organizational success.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2 border-b-2 border-purple-600 pb-1">
                  EDUCATION
                </h4>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{studentData?.school}</div>
                  <div className="text-gray-700">{studentData?.major}</div>
                  <div className="text-gray-600">GPA: {studentData?.gpa}</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2 border-b-2 border-purple-600 pb-1">
                  SKILLS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {studentData?.skills?.slice(0, 8).map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center text-xs text-gray-500 italic">
                ... Preview truncated - Full resume includes all sections ...
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-3 gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <Eye className="w-5 h-5" />
              Preview Full
            </button>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              Edit Resume
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          <div className="mt-4 bg-purple-50 rounded-xl p-4 border border-purple-200">
            <p className="text-sm text-purple-900 text-center">
              💡 <strong>Pro Tip:</strong> Your AI-generated resume is automatically saved to your profile 
              and visible to employers when you apply for jobs!
            </p>
          </div>
        </>
      )}

      {/* Upload Traditional Resume Option */}
      {!resumeGenerated && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Already have a resume? Upload it instead
            </p>
            <label className="cursor-pointer inline-block px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all font-semibold">
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
              Upload Existing Resume
            </label>
          </div>
        </div>
      )}
    </div>
  );
}