import { useState } from 'react';
import { FileText, Upload, GraduationCap, Award, Calendar, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface InternshipApplicationProps {
  internship: {
    id: string;
    title: string;
    company: string;
    duration: string;
    requirements: {
      minGPA?: number;
      yearInSchool: string[];
      majors?: string[];
      skills: string[];
    };
  };
  onSubmit: (application: ApplicationData) => void;
  onCancel: () => void;
}

interface ApplicationData {
  personalInfo: {
    school: string;
    major: string;
    yearInSchool: string;
    gpa: number;
    graduationDate: string;
  };
  motivation: string;
  relevantExperience: string;
  learningGoals: string;
  availability: string;
  references: Reference[];
  resume: File | null;
  transcript: File | null;
  coverLetter: string;
  academicCreditNeeded: boolean;
}

interface Reference {
  name: string;
  title: string;
  organization: string;
  email: string;
  phone: string;
}

export function InternshipApplication({ internship, onSubmit, onCancel }: InternshipApplicationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Step 1: Academic Information
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [yearInSchool, setYearInSchool] = useState('');
  const [gpa, setGPA] = useState('');
  const [graduationDate, setGraduationDate] = useState('');

  // Step 2: Application Essays
  const [coverLetter, setCoverLetter] = useState('');
  const [motivation, setMotivation] = useState('');
  const [relevantExperience, setRelevantExperience] = useState('');
  const [learningGoals, setLearningGoals] = useState('');

  // Step 3: References
  const [references, setReferences] = useState<Reference[]>([
    { name: '', title: '', organization: '', email: '', phone: '' }
  ]);

  // Step 4: Documents & Final
  const [availability, setAvailability] = useState('');
  const [academicCreditNeeded, setAcademicCreditNeeded] = useState(false);

  const addReference = () => {
    if (references.length < 3) {
      setReferences([...references, { name: '', title: '', organization: '', email: '', phone: '' }]);
    }
  };

  const removeReference = (index: number) => {
    setReferences(references.filter((_, i) => i !== index));
  };

  const updateReference = (index: number, field: keyof Reference, value: string) => {
    const updated = [...references];
    updated[index][field] = value;
    setReferences(updated);
  };

  const validateStep1 = () => {
    if (!school || !major || !yearInSchool || !gpa || !graduationDate) {
      alert('Please fill in all academic information');
      return false;
    }
    if (internship.requirements.minGPA && parseFloat(gpa) < internship.requirements.minGPA) {
      alert(`This internship requires a minimum GPA of ${internship.requirements.minGPA}`);
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!coverLetter.trim() || !motivation.trim() || !relevantExperience.trim() || !learningGoals.trim()) {
      alert('Please complete all application essays');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (references.length === 0) {
      alert('Please add at least one reference');
      return false;
    }
    for (const ref of references) {
      if (!ref.name || !ref.email) {
        alert('Please complete all reference information');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!availability.trim()) {
      alert('Please confirm your availability');
      return;
    }

    const applicationData: ApplicationData = {
      personalInfo: {
        school,
        major,
        yearInSchool,
        gpa: parseFloat(gpa),
        graduationDate,
      },
      motivation,
      relevantExperience,
      learningGoals,
      availability,
      references,
      resume: null,
      transcript: null,
      coverLetter,
      academicCreditNeeded,
    };

    onSubmit(applicationData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Internship Application</h2>
          <p className="text-gray-600">
            <strong>{internship.title}</strong> at {internship.company}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          
          {/* Step Labels */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {['Academic Info', 'Essays', 'References', 'Review'].map((label, idx) => (
              <div key={idx} className={`text-center ${idx + 1 <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${
                  idx + 1 < currentStep ? 'bg-blue-600 text-white' :
                  idx + 1 === currentStep ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {idx + 1 < currentStep ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                </div>
                <p className="text-xs font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Academic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  School/University <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="University of Guam"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Major <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="Computer Science"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Year in School <span className="text-red-500">*</span>
                </label>
                <select
                  value={yearInSchool}
                  onChange={(e) => setYearInSchool(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select...</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Current GPA <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  value={gpa}
                  onChange={(e) => setGPA(e.target.value)}
                  placeholder="3.5"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
                {internship.requirements.minGPA && (
                  <p className="text-xs text-gray-600 mt-1">
                    Minimum required: {internship.requirements.minGPA}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Expected Graduation <span className="text-red-500">*</span>
                </label>
                <input
                  type="month"
                  value={graduationDate}
                  onChange={(e) => setGraduationDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {internship.requirements.minGPA && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This internship requires a minimum GPA of {internship.requirements.minGPA}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Application Essays */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Application Essays</h3>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Introduce yourself and explain why you're interested in this internship
              </p>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Dear Hiring Manager,

I am writing to express my strong interest in the [Position] internship...

[Your experience and qualifications]

[Why you're interested in this company/role]

[What you hope to learn]

Thank you for considering my application."
                className="w-full h-48 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{coverLetter.length} / 1500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Why do you want this internship? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Explain what motivates you to apply for this specific internship..."
                className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{motivation.length} / 500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Relevant Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                value={relevantExperience}
                onChange={(e) => setRelevantExperience(e.target.value)}
                placeholder="Describe your relevant coursework, projects, or previous experience..."
                className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{relevantExperience.length} / 500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Learning Goals <span className="text-red-500">*</span>
              </label>
              <textarea
                value={learningGoals}
                onChange={(e) => setLearningGoals(e.target.value)}
                placeholder="What do you hope to learn and achieve during this internship?"
                className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{learningGoals.length} / 500 characters</p>
            </div>
          </div>
        )}

        {/* Step 3: References */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">References</h3>
              {references.length < 3 && (
                <button
                  type="button"
                  onClick={addReference}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  + Add Reference
                </button>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Provide 1-3 professional or academic references who can speak to your qualifications
            </p>

            {references.map((reference, idx) => (
              <div key={idx} className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900">Reference {idx + 1}</h4>
                  {references.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeReference(idx)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={reference.name}
                      onChange={(e) => updateReference(idx, 'name', e.target.value)}
                      placeholder="Dr. Jane Smith"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Title/Position
                    </label>
                    <input
                      type="text"
                      value={reference.title}
                      onChange={(e) => updateReference(idx, 'title', e.target.value)}
                      placeholder="Professor"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={reference.organization}
                      onChange={(e) => updateReference(idx, 'organization', e.target.value)}
                      placeholder="University of Guam"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={reference.email}
                      onChange={(e) => updateReference(idx, 'email', e.target.value)}
                      placeholder="jane.smith@uog.edu"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={reference.phone}
                      onChange={(e) => updateReference(idx, 'phone', e.target.value)}
                      placeholder="(671) 555-0123"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Review & Submit</h3>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Availability Confirmation <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Confirm you're available for {internship.duration}
              </p>
              <textarea
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="Yes, I confirm I am available for the full duration of this internship from [start date] to [end date]. I understand the commitment is [X] hours per week."
                className="w-full h-24 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={academicCreditNeeded}
                  onChange={(e) => setAcademicCreditNeeded(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold text-gray-900">
                  I need academic credit for this internship
                </span>
              </label>
              <p className="text-xs text-gray-600 ml-7 mt-1">
                Check this if you'll be receiving academic credit from your school
              </p>
            </div>

            {/* Upload Documents */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Upload Documents</h4>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Upload Resume</strong> (Required)
                  </p>
                  <p className="text-xs text-gray-500">PDF or DOCX (Max 5MB)</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Upload Transcript</strong> (Optional)
                  </p>
                  <p className="text-xs text-gray-500">PDF (Max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Application Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-blue-900 mb-3">Application Summary</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p><strong>School:</strong> {school}</p>
                <p><strong>Major:</strong> {major}</p>
                <p><strong>Year:</strong> {yearInSchool}</p>
                <p><strong>GPA:</strong> {gpa}</p>
                <p><strong>References:</strong> {references.length} provided</p>
                <p><strong>Academic Credit:</strong> {academicCreditNeeded ? 'Yes' : 'No'}</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>✓ Ready to submit!</strong> Your application will be reviewed by the employer. 
                You'll receive an email notification about next steps.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6 mt-6 border-t border-gray-200">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Previous
            </button>
          )}
          <button
            onClick={onCancel}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
