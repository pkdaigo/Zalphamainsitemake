import { useState } from 'react';
import { Lightbulb, Heart, Target, Home, Users, Sparkles } from 'lucide-react';

interface StudentBetaQuestionnaireProps {
  onComplete: (data: any) => void;
}

export function StudentBetaQuestionnaire({ onComplete }: StudentBetaQuestionnaireProps) {
  const [responses, setResponses] = useState({
    // Career & Goals
    dreamJob: '',
    careerMotivation: '',
    successLooksLike: '',
    biggestChallenge: '',
    
    // Cultural & Regional
    culturalBackground: '',
    importantValues: [] as string[],
    stayOrLeave: '',
    communityRole: '',
    
    // Background & Context (non-intrusive)
    educationPath: '',
    workExperience: '',
    supportSystem: [] as string[],
    learningStyle: '',
    
    // Platform Feedback
    mostExcitedFeature: '',
    wouldMakeZalphaSuccessful: '',
    concernsOrFears: '',
    additionalThoughts: ''
  });

  const handleChange = (field: string, value: any) => {
    setResponses({ ...responses, [field]: value });
  };

  const handleMultiSelect = (field: string, value: string) => {
    const current = responses[field as keyof typeof responses] as string[];
    if (current.includes(value)) {
      handleChange(field, current.filter(v => v !== value));
    } else {
      handleChange(field, [...current, value]);
    }
  };

  const handleSubmit = () => {
    onComplete(responses);
  };

  return (
    <div className="space-y-8 max-h-[70vh] overflow-y-auto px-2">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">Welcome to the Beta Team! 🎉</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          You're not just signing up—you're helping us build ZALPHA! Your voice shapes our platform. 
          These questions help us understand what YOU need to succeed. There are no wrong answers, just honest ones. 
          <strong className="text-blue-700"> Skip anything you're not comfortable sharing!</strong>
        </p>
      </div>

      {/* Section 1: Career Dreams & Goals */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-pink-600" />
          <h4 className="text-lg font-bold text-gray-900">Your Career Journey</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            If you could have ANY job in the Pacific Islands, what would it be? 💭
          </label>
          <input
            type="text"
            value={responses.dreamJob}
            onChange={(e) => handleChange('dreamJob', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Dream big! Hotel manager? Marine biologist? Business owner? Teacher?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What drives you? Why do you want to work? (Be real—money, family, passion, all valid!)
          </label>
          <textarea
            value={responses.careerMotivation}
            onChange={(e) => handleChange('careerMotivation', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Support my family, save for college, gain independence, follow my passion..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Picture yourself 5 years from now—what does success look like?
          </label>
          <textarea
            value={responses.successLooksLike}
            onChange={(e) => handleChange('successLooksLike', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Financial stability, helping my community, running my own business..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's the BIGGEST challenge stopping you from getting the job you want?
          </label>
          <textarea
            value={responses.biggestChallenge}
            onChange={(e) => handleChange('biggestChallenge', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="No experience, no connections, don't know where to start, transportation..."
          />
        </div>
      </div>

      {/* Section 2: Cultural Background & Values */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-red-600" />
          <h4 className="text-lg font-bold text-gray-900">Your Roots & Values</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tell us about your background! Where are you from? What's your story? 🏝️
          </label>
          <textarea
            value={responses.culturalBackground}
            onChange={(e) => handleChange('culturalBackground', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Born and raised in Saipan, Chamorro heritage, moved from FSM, multicultural family..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What values matter most to you? (Choose all that apply) ✨
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Family first', 'Community', 'Respect for elders', 'Island culture', 'Financial security', 'Education', 'Hard work', 'Giving back', 'Independence', 'Faith/spirituality'].map(value => (
              <label key={value} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={responses.importantValues.includes(value)}
                  onChange={() => handleMultiSelect('importantValues', value)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Long-term: Do you want to stay in the Pacific Islands or move to the mainland?
          </label>
          <select
            value={responses.stayOrLeave}
            onChange={(e) => handleChange('stayOrLeave', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="definitely-stay">I want to stay here—this is home</option>
            <option value="prefer-stay">I'd prefer to stay if there are good opportunities</option>
            <option value="open-to-both">Open to either—depends on opportunities</option>
            <option value="prefer-mainland">I want to move to the mainland</option>
            <option value="undecided">Not sure yet</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How do you see yourself contributing to your community?
          </label>
          <textarea
            value={responses.communityRole}
            onChange={(e) => handleChange('communityRole', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Mentoring younger students, supporting local businesses, volunteering..."
          />
        </div>
      </div>

      {/* Section 3: Your Background & Support */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-5 h-5 text-green-600" />
          <h4 className="text-lg font-bold text-gray-900">Your Journey So Far</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your education path been like?
          </label>
          <textarea
            value={responses.educationPath}
            onChange={(e) => handleChange('educationPath', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Public high school, planning community college, trade school, straight to work..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any work experience? (Formal jobs, helping family business, volunteering—it ALL counts!)
          </label>
          <textarea
            value={responses.workExperience}
            onChange={(e) => handleChange('workExperience', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Worked at family restaurant, retail part-time, volunteered at school events..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Who's in your corner? (Select all that apply) 👥
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Parents/guardians', 'Extended family', 'Friends', 'Teachers/mentors', 'Community leaders', 'Church/faith community', 'Mostly on my own'].map(option => (
              <label key={option} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={responses.supportSystem.includes(option)}
                  onChange={() => handleMultiSelect('supportSystem', option)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How do you learn best?
          </label>
          <select
            value={responses.learningStyle}
            onChange={(e) => handleChange('learningStyle', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select one...</option>
            <option value="hands-on">Hands-on/doing it myself</option>
            <option value="watching">Watching someone else first</option>
            <option value="reading">Reading instructions/guides</option>
            <option value="videos">Videos and tutorials</option>
            <option value="mix">A mix of everything</option>
          </select>
        </div>
      </div>

      {/* Section 4: Help Us Build ZALPHA */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <h4 className="text-lg font-bold text-gray-900">Help Us Build Something Great</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What feature are you MOST excited about trying on ZALPHA?
          </label>
          <input
            type="text"
            value={responses.mostExcitedFeature}
            onChange={(e) => handleChange('mostExcitedFeature', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="AI interview practice, skills games, job matching, resume builder..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            If you could add ONE thing to ZALPHA that would make it absolutely successful, what would it be?
          </label>
          <textarea
            value={responses.wouldMakeZalphaSuccessful}
            onChange={(e) => handleChange('wouldMakeZalphaSuccessful', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your honest feedback helps us build features YOU actually need!"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any concerns or fears about using ZALPHA? (We want to address them!)
          </label>
          <textarea
            value={responses.concernsOrFears}
            onChange={(e) => handleChange('concernsOrFears', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Privacy concerns, not tech-savvy, worried employers won't respond..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anything else you want us to know? (Totally optional!)
          </label>
          <textarea
            value={responses.additionalThoughts}
            onChange={(e) => handleChange('additionalThoughts', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Share your story, hopes, dreams, feedback—we're listening!"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6 border-t border-gray-200">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong className="text-blue-700">🔒 Your Privacy Matters:</strong> This information helps our team understand 
            your needs better. It's never shared with employers unless you choose to share it. Skip any questions you're 
            not comfortable answering—no judgment!
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
        >
          Complete Beta Sign-Up & Continue 🚀
        </button>
      </div>
    </div>
  );
}
