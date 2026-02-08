import { useState } from 'react';
import { Plus, X, Check, AlertCircle, Sparkles } from 'lucide-react';

interface CustomSkill {
  id: string;
  name: string;
  category: string;
  description: string;
  required: boolean;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface CustomSkillsManagerProps {
  existingSkills?: CustomSkill[];
  onSkillsChange: (skills: CustomSkill[]) => void;
  maxSkills?: number;
}

export function CustomSkillsManager({ 
  existingSkills = [], 
  onSkillsChange,
  maxSkills = 20
}: CustomSkillsManagerProps) {
  const [skills, setSkills] = useState<CustomSkill[]>(existingSkills);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Technical',
    description: '',
    required: false,
    proficiencyLevel: 'intermediate' as const
  });

  const categories = [
    'Technical',
    'Software',
    'Design',
    'Marketing',
    'Communication',
    'Languages',
    'Business',
    'Creative',
    'Data',
    'Other'
  ];

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      return;
    }

    if (skills.length >= maxSkills) {
      alert(`Maximum ${maxSkills} custom skills allowed.`);
      return;
    }

    const skill: CustomSkill = {
      id: `custom-${Date.now()}`,
      ...newSkill
    };

    const updatedSkills = [...skills, skill];
    setSkills(updatedSkills);
    onSkillsChange(updatedSkills);
    
    // Reset form
    setNewSkill({
      name: '',
      category: 'Technical',
      description: '',
      required: false,
      proficiencyLevel: 'intermediate'
    });
    setShowAddForm(false);
  };

  const handleRemoveSkill = (id: string) => {
    const updatedSkills = skills.filter(s => s.id !== id);
    setSkills(updatedSkills);
    onSkillsChange(updatedSkills);
  };

  const handleToggleRequired = (id: string) => {
    const updatedSkills = skills.map(s => 
      s.id === id ? { ...s, required: !s.required } : s
    );
    setSkills(updatedSkills);
    onSkillsChange(updatedSkills);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-purple-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Custom Skills Requirements
          </h3>
          <p className="text-sm text-gray-600">
            Add specific skills you need for this position. Candidates will see these in the job posting.
          </p>
        </div>
        {!showAddForm && skills.length < maxSkills && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        )}
      </div>

      {/* Current Skills List */}
      {skills.length > 0 && (
        <div className="mb-6 space-y-3">
          <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Required Skills ({skills.length}/{maxSkills})
          </h4>
          {skills.map(skill => (
            <div
              key={skill.id}
              className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="font-bold text-gray-900">{skill.name}</h5>
                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded-full font-semibold">
                      {skill.category}
                    </span>
                    <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full font-semibold capitalize">
                      {skill.proficiencyLevel}
                    </span>
                    {skill.required && (
                      <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full font-semibold">
                        Required
                      </span>
                    )}
                  </div>
                  {skill.description && (
                    <p className="text-sm text-gray-700">{skill.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleRequired(skill.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      skill.required
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill.required ? 'Required' : 'Optional'}
                  </button>
                  <button
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="w-8 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Skill Form */}
      {showAddForm && (
        <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-300">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900">Add New Skill</h4>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Skill Name *
              </label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="e.g., Adobe Photoshop, Python Programming, SEO Writing"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Required Proficiency Level
                </label>
                <select
                  value={newSkill.proficiencyLevel}
                  onChange={(e) => setNewSkill({ ...newSkill, proficiencyLevel: e.target.value as any })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={newSkill.description}
                onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                rows={2}
                placeholder="Describe what you expect for this skill..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newSkill.required}
                  onChange={(e) => setNewSkill({ ...newSkill, required: e.target.checked })}
                  className="w-5 h-5 accent-purple-600"
                />
                <span className="text-sm font-semibold text-gray-700">
                  This is a required skill (candidates must have this to apply)
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddSkill}
                disabled={!newSkill.name.trim()}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Add Skill
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {skills.length === 0 && !showAddForm && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">No custom skills added yet</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all inline-flex items-center gap-2 font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Your First Skill
          </button>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">💡 Pro Tip:</p>
            <p>
              Be specific about the skills you need! Instead of "Design," specify "Adobe Photoshop," 
              "Adobe XD," or "Logo Design." This helps students understand exactly what you're looking for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}