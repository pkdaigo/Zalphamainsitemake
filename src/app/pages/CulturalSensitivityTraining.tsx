import { useState } from 'react';
import { Globe, Users, Heart, BookOpen, Award, CheckCircle, Clock, Video, MessageSquare, Calendar, Star } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  region: 'CNMI' | 'FSM' | 'Guam' | 'Hawaii' | 'All';
  duration: string;
  format: 'video' | 'interactive' | 'workshop' | 'reading';
  completed: boolean;
  topics: string[];
  learningObjectives: string[];
}

interface Workshop {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  capacity: number;
  enrolled: number;
  region: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  topics: string[];
}

interface CulturalSensitivityTrainingProps {
  onNavigate: (page: string) => void;
}

export function CulturalSensitivityTraining({ onNavigate }: CulturalSensitivityTrainingProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [view, setView] = useState<'modules' | 'workshops'>('modules');

  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      title: 'Understanding Pacific Island Workplace Culture',
      description: 'Learn the fundamental cultural values, communication styles, and workplace expectations across the Western Pacific region',
      region: 'All',
      duration: '45 minutes',
      format: 'interactive',
      completed: true,
      topics: ['Respect & Hierarchy', 'Collectivism vs. Individualism', 'Indirect Communication', 'Family Values'],
      learningObjectives: [
        'Understand the importance of family and community in Pacific cultures',
        'Recognize different communication styles and adapt accordingly',
        'Navigate hierarchical workplace structures with cultural sensitivity',
        'Balance individual performance with collective harmony'
      ]
    },
    {
      id: '2',
      title: 'CNMI: Chamorro & Carolinian Heritage',
      description: 'Deep dive into the cultural traditions, values, and workplace etiquette specific to the Commonwealth of the Northern Mariana Islands',
      region: 'CNMI',
      duration: '60 minutes',
      format: 'video',
      completed: true,
      topics: ['Inafa\'maolek (Interdependence)', 'Chenchule\' (Reciprocity)', 'Respect for Elders', 'Language Considerations'],
      learningObjectives: [
        'Understand Inafa\'maolek and its impact on workplace relationships',
        'Practice Chenchule\' in professional contexts',
        'Show appropriate respect for elder employees and community leaders',
        'Navigate bilingual workplace environments (English/Chamorro/Carolinian)'
      ]
    },
    {
      id: '3',
      title: 'FSM: Four States, Four Cultures',
      description: 'Navigate the cultural diversity of Yap, Chuuk, Pohnpei, and Kosrae with understanding and respect',
      region: 'FSM',
      duration: '75 minutes',
      format: 'interactive',
      completed: false,
      topics: ['Island-Specific Customs', 'Traditional Leadership', 'Conflict Resolution', 'Gift-Giving Etiquette'],
      learningObjectives: [
        'Recognize cultural differences between FSM\'s four states',
        'Respect traditional leadership and authority structures',
        'Apply culturally appropriate conflict resolution methods',
        'Understand the significance of gift-giving and reciprocity'
      ]
    },
    {
      id: '4',
      title: 'Guam: CHamoru Culture in the Workplace',
      description: 'Explore Guamanian cultural values, professional expectations, and the importance of "Inafa\'maolek" in business relationships',
      region: 'Guam',
      duration: '50 minutes',
      format: 'video',
      completed: false,
      topics: ['CHamoru Core Values', 'Island Time vs. Business Time', 'Community Engagement', 'Fiesta Culture'],
      learningObjectives: [
        'Balance cultural concepts of time with business deadlines',
        'Engage respectfully with the local CHamoru community',
        'Understand the role of fiestas and celebrations in building relationships',
        'Navigate multi-generational workplace dynamics'
      ]
    },
    {
      id: '5',
      title: 'Hawaii: Aloha Spirit in Business',
      description: 'Integrate Hawaiian values of Aloha, Ohana, and Kuleana into your workplace leadership and management approach',
      region: 'Hawaii',
      duration: '55 minutes',
      format: 'workshop',
      completed: false,
      topics: ['Aloha Spirit', 'Ohana (Family)', 'Kuleana (Responsibility)', 'Pono (Righteousness)'],
      learningObjectives: [
        'Practice the Aloha Spirit in daily workplace interactions',
        'Build Ohana-style team cultures that honor family values',
        'Understand Kuleana as shared responsibility and stewardship',
        'Apply Pono (doing what is right) in business decisions'
      ]
    },
    {
      id: '6',
      title: 'Effective Cross-Cultural Communication',
      description: 'Master communication strategies that bridge cultural differences and prevent misunderstandings in the Pacific workplace',
      region: 'All',
      duration: '40 minutes',
      format: 'interactive',
      completed: true,
      topics: ['Active Listening', 'Non-Verbal Cues', 'Indirect vs. Direct Communication', 'Feedback Delivery'],
      learningObjectives: [
        'Practice active listening across cultural contexts',
        'Interpret non-verbal communication accurately',
        'Adapt communication style to match cultural preferences',
        'Deliver feedback in culturally sensitive ways'
      ]
    },
    {
      id: '7',
      title: 'Avoiding Cultural Missteps & Microaggressions',
      description: 'Recognize and prevent common cultural mistakes, stereotypes, and microaggressions in Pacific workplaces',
      region: 'All',
      duration: '30 minutes',
      format: 'reading',
      completed: false,
      topics: ['Common Stereotypes', 'Unconscious Bias', 'Microaggressions', 'Apology & Repair'],
      learningObjectives: [
        'Identify common stereotypes about Pacific Islanders',
        'Recognize your own unconscious biases',
        'Avoid microaggressions in language and behavior',
        'Repair relationships when cultural mistakes occur'
      ]
    },
    {
      id: '8',
      title: 'Building Inclusive Pacific Workplaces',
      description: 'Create workplace policies, practices, and cultures that honor Pacific Island values while meeting business objectives',
      region: 'All',
      duration: '65 minutes',
      format: 'workshop',
      completed: false,
      topics: ['Inclusive Policies', 'Cultural Celebrations', 'Flexibility & Family', 'Language Access'],
      learningObjectives: [
        'Develop policies that accommodate cultural and family obligations',
        'Create space for cultural celebrations and observances',
        'Balance flexibility with business needs',
        'Ensure language accessibility for all employees'
      ]
    }
  ];

  const upcomingWorkshops: Workshop[] = [
    {
      id: 'w1',
      title: 'Live Workshop: Understanding Pacific Island Business Etiquette',
      instructor: 'Dr. Maria Santos, Cultural Anthropologist',
      date: '2026-02-05',
      time: '2:00 PM - 4:00 PM ChST',
      duration: '2 hours',
      capacity: 50,
      enrolled: 32,
      region: 'All Regions',
      status: 'upcoming',
      topics: ['Greetings & Introductions', 'Meeting Protocols', 'Gift-Giving', 'Dress Code']
    },
    {
      id: 'w2',
      title: 'Interactive Session: Navigating Hierarchy in Pacific Workplaces',
      instructor: 'Peter Nakamura, HR Consultant',
      date: '2026-02-12',
      time: '10:00 AM - 12:00 PM ChST',
      duration: '2 hours',
      capacity: 40,
      enrolled: 28,
      region: 'CNMI & Guam',
      status: 'upcoming',
      topics: ['Respect for Authority', 'Decision-Making Styles', 'Team Dynamics', 'Feedback Culture']
    },
    {
      id: 'w3',
      title: 'Cultural Immersion: FSM Traditions & Workplace Applications',
      instructor: 'Chief John Apis, Cultural Ambassador',
      date: '2026-02-18',
      time: '1:00 PM - 3:30 PM ChST',
      duration: '2.5 hours',
      capacity: 30,
      enrolled: 15,
      region: 'FSM',
      status: 'upcoming',
      topics: ['Traditional Values', 'Community Relations', 'Conflict Resolution', 'Leadership Styles']
    },
    {
      id: 'w4',
      title: 'Aloha in Action: Hawaiian Workplace Values',
      instructor: 'Kumu Leilani Wong, Cultural Educator',
      date: '2026-02-25',
      time: '9:00 AM - 11:30 AM HST',
      duration: '2.5 hours',
      capacity: 60,
      enrolled: 45,
      region: 'Hawaii',
      status: 'upcoming',
      topics: ['Aloha Spirit', 'Ohana Culture', 'Land & Sustainability', 'Local vs. Newcomer Dynamics']
    }
  ];

  const regions = [
    { id: 'All', name: 'All Regions', flag: '🌏' },
    { id: 'CNMI', name: 'CNMI', flag: '🇲🇵' },
    { id: 'FSM', name: 'FSM', flag: '🇫🇲' },
    { id: 'Guam', name: 'Guam', flag: '🇬🇺' },
    { id: 'Hawaii', name: 'Hawaii', flag: '🌺' }
  ];

  const filteredModules = trainingModules.filter(module => 
    selectedRegion === 'All' || module.region === 'All' || module.region === selectedRegion
  );

  const completedModules = trainingModules.filter(m => m.completed).length;
  const totalModules = trainingModules.length;
  const progressPercentage = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <BackButton onNavigate={onNavigate} destination="training-hub" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Globe className="w-10 h-10 text-green-600" />
                Cultural Sensitivity Training
              </h1>
              <p className="text-xl text-gray-600">
                Optional training to master Western Pacific workplace culture and improve hiring success
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-600">{progressPercentage}%</div>
              <div className="text-sm text-gray-600">Training Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-900">Your Progress</span>
              </div>
              <span className="text-sm text-gray-600">{completedModules} of {totalModules} modules completed</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setView('modules')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                view === 'modules'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-600'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Training Modules
            </button>
            <button
              onClick={() => setView('workshops')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                view === 'workshops'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-600'
              }`}
            >
              <Users className="w-5 h-5" />
              Live Workshops
            </button>
          </div>

          {/* Region Filter (for modules view) */}
          {view === 'modules' && (
            <div className="flex flex-wrap gap-3">
              {regions.map(region => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedRegion === region.id
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
                  }`}
                >
                  {region.flag} {region.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Training Modules View */}
        {view === 'modules' && (
          <div className="space-y-6">
            {filteredModules.map((module) => (
              <div key={module.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {module.completed && (
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-gray-900">{module.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{module.description}</p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          {module.region}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </span>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center gap-2 ${
                          module.format === 'video' ? 'bg-purple-100 text-purple-700' :
                          module.format === 'interactive' ? 'bg-orange-100 text-orange-700' :
                          module.format === 'workshop' ? 'bg-pink-100 text-pink-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {module.format === 'video' && <Video className="w-4 h-4" />}
                          {module.format === 'interactive' && <MessageSquare className="w-4 h-4" />}
                          {module.format === 'workshop' && <Users className="w-4 h-4" />}
                          {module.format === 'reading' && <BookOpen className="w-4 h-4" />}
                          {module.format.charAt(0).toUpperCase() + module.format.slice(1)}
                        </span>
                      </div>

                      {/* Topics */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Key Topics:</p>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Learning Objectives */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Learning Objectives:</p>
                        <ul className="space-y-1">
                          {module.learningObjectives.map((objective, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-green-600 mt-1">✓</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                      module.completed
                        ? 'bg-gray-100 text-gray-700 hover:bg-green-600 hover:text-white'
                        : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-lg'
                    }`}
                  >
                    {module.completed ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Review Module
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-5 h-5" />
                        Start Learning
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Workshops View */}
        {view === 'workshops' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Live Interactive Workshops</h3>
                  <p className="text-gray-700">
                    Join expert-led sessions with cultural ambassadors, anthropologists, and local leaders. 
                    Limited seats available - register early!
                  </p>
                </div>
              </div>
            </div>

            {upcomingWorkshops.map((workshop) => (
              <div key={workshop.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{workshop.title}</h3>
                      
                      {/* Instructor */}
                      <div className="flex items-center gap-2 text-gray-700 mb-3">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="font-semibold">{workshop.instructor}</span>
                      </div>

                      {/* Date & Time */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span>{new Date(workshop.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-5 h-5 text-purple-600" />
                          <span>{workshop.time} ({workshop.duration})</span>
                        </div>
                      </div>

                      {/* Region & Capacity */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                          {workshop.region}
                        </span>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          workshop.enrolled / workshop.capacity > 0.8
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {workshop.enrolled} / {workshop.capacity} seats filled
                        </span>
                      </div>

                      {/* Topics */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Workshop Topics:</p>
                        <div className="flex flex-wrap gap-2">
                          {workshop.topics.map((topic, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-600">Enrollment</span>
                          <span className="text-xs font-bold text-green-600">
                            {Math.round((workshop.enrolled / workshop.capacity) * 100)}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                            style={{ width: `${(workshop.enrolled / workshop.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    disabled={workshop.enrolled >= workshop.capacity}
                    className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                      workshop.enrolled >= workshop.capacity
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-lg'
                    }`}
                  >
                    {workshop.enrolled >= workshop.capacity ? (
                      <>
                        Workshop Full
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Register for Workshop
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feature Highlight */}
        <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                🌟 Why Cultural Training Sets ZALPHA Apart
              </h3>
              <p className="text-gray-700 mb-4">
                Unlike Indeed, LinkedIn, or other mainland-focused job platforms, ZALPHA understands that successful hiring in the Western Pacific requires cultural competence:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Region-Specific Training:</strong> Dedicated modules for CNMI, FSM, Guam, and Hawaii with local cultural experts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Live Expert Workshops:</strong> Interactive sessions with cultural anthropologists and community leaders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Practical Application:</strong> Real workplace scenarios and case studies from Pacific businesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Certification Badge:</strong> Display your cultural competence on your ZALPHA employer profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Reduced Turnover:</strong> Build inclusive workplaces that attract and retain local Pacific talent</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}