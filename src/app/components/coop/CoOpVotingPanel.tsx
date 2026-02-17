import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Star,
  Trophy,
  Users,
  Building2,
  GraduationCap,
  Vote,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Crown,
  Medal,
  TrendingUp,
} from 'lucide-react';

interface CoOpVotingPanelProps {
  userType: 'student' | 'employer';
  cohortName?: string;
}

export function CoOpVotingPanel({ userType, cohortName = 'Spring 2026' }: CoOpVotingPanelProps) {
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Mock data for student voting (employers)
  const employerNominees = [
    {
      id: '1',
      name: 'Kalaayan Inc.',
      votes: 23,
      description: 'Excellent mentorship and hands-on learning opportunities',
      rating: 4.9,
      category: 'Food Service',
    },
    {
      id: '2',
      name: 'Pacific Development Inc.',
      votes: 18,
      description: 'Professional environment with great career guidance',
      rating: 4.8,
      category: 'Business Services',
    },
    {
      id: '3',
      name: 'Saipan Grand Hotel',
      votes: 15,
      description: 'Welcoming team and valuable hospitality experience',
      rating: 4.7,
      category: 'Hospitality',
    },
    {
      id: '4',
      name: 'Marianas Visitors Authority',
      votes: 12,
      description: 'Innovative projects and supportive supervisors',
      rating: 4.6,
      category: 'Tourism & Marketing',
    },
  ];

  // Mock data for employer voting (students)
  const studentNominees = [
    {
      id: '1',
      name: 'Maria Santos',
      school: 'Saipan Southern High School',
      votes: 20,
      description: 'Outstanding work ethic, reliable, and eager to learn',
      rating: 4.9,
      hoursCompleted: 120,
    },
    {
      id: '2',
      name: 'John Reyes',
      school: 'Marianas High School',
      votes: 17,
      description: 'Excellent communication skills and professional attitude',
      rating: 4.8,
      hoursCompleted: 118,
    },
    {
      id: '3',
      name: 'Emily Chen',
      school: 'Saipan Southern High School',
      votes: 14,
      description: 'Quick learner with great problem-solving abilities',
      rating: 4.7,
      hoursCompleted: 115,
    },
    {
      id: '4',
      name: 'David Cabrera',
      school: 'Marianas High School',
      votes: 11,
      description: 'Creative thinker with strong initiative',
      rating: 4.6,
      hoursCompleted: 112,
    },
  ];

  const nominees = userType === 'student' ? employerNominees : studentNominees;
  const maxVotes = Math.max(...nominees.map((n) => n.votes));

  const handleVote = (id: string) => {
    setSelectedVote(id);
  };

  const submitVote = () => {
    if (selectedVote) {
      setHasVoted(true);
      // Here would be API call to submit vote
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Vote for Best {userType === 'student' ? 'Co-Op Employer' : 'Co-Op Student'}
              <Sparkles className="w-5 h-5 text-yellow-600" />
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {cohortName} Cohort • Voting closes in 5 days
            </p>
          </div>
        </div>
      </div>

      {hasVoted ? (
        <motion.div
          className="p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Vote Submitted!</h3>
          <p className="text-slate-600 mb-6">
            Thank you for participating in the {cohortName} cohort awards. Results will be announced soon!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold">
            <Award className="w-4 h-4" />
            Winners announced at Cohort Ceremony
          </div>
        </motion.div>
      ) : (
        <>
          <div className="p-6 space-y-4">
            {nominees.map((nominee, index) => {
              const isSelected = selectedVote === nominee.id;
              const votePercentage = (nominee.votes / maxVotes) * 100;

              return (
                <motion.div
                  key={nominee.id}
                  className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                    isSelected
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-slate-200 bg-white hover:border-yellow-300 hover:bg-yellow-50/50'
                  }`}
                  onClick={() => handleVote(nominee.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {userType === 'student' ? (
                          <Building2 className="w-6 h-6" />
                        ) : (
                          nominee.name.charAt(0)
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 mb-1">{nominee.name}</h4>
                        {userType === 'employer' && 'school' in nominee && (
                          <p className="text-sm text-slate-600 mb-2">{nominee.school}</p>
                        )}
                        {userType === 'student' && 'category' in nominee && (
                          <p className="text-sm text-slate-600 mb-2">{nominee.category}</p>
                        )}
                        <p className="text-sm text-slate-700">{nominee.description}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-slate-900">{nominee.rating}</span>
                    </div>
                    {userType === 'employer' && 'hoursCompleted' in nominee && (
                      <div className="text-sm text-slate-600">
                        {nominee.hoursCompleted} hrs completed
                      </div>
                    )}
                    <div className="ml-auto text-sm text-slate-600">
                      {nominee.votes} votes
                    </div>
                  </div>

                  <div className="relative w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${votePercentage}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <button
              onClick={submitVote}
              disabled={!selectedVote}
              className={`w-full py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 ${
                selectedVote
                  ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Vote className="w-5 h-5" />
              Submit My Vote
            </button>
            {!selectedVote && (
              <p className="text-center text-sm text-slate-500 mt-2">
                Select a nominee to cast your vote
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

interface RegionalNominationsPanelProps {
  region: 'CNMI' | 'Guam' | 'FSM' | 'Palau' | 'RMI' | 'Hawaii';
}

export function RegionalNominationsPanel({ region }: RegionalNominationsPanelProps) {
  const [activeCategory, setActiveCategory] = useState<'employer' | 'teacher' | 'student'>('employer');

  const categories = [
    {
      id: 'employer' as const,
      title: 'Top Employer of the Year',
      icon: Building2,
      description: 'Outstanding co-op employer providing exceptional opportunities',
    },
    {
      id: 'teacher' as const,
      title: 'Top Co-Op Teacher of the Year',
      icon: GraduationCap,
      description: 'Dedicated educator supporting student success in co-op programs',
    },
    {
      id: 'student' as const,
      title: 'Top Student of the Year',
      icon: Users,
      description: 'Exemplary co-op student demonstrating excellence and leadership',
    },
  ];

  // Mock regional nominees
  const regionalNominees = {
    employer: [
      { id: '1', name: 'Kalaayan Inc.', votes: 156, region: 'CNMI' },
      { id: '2', name: 'Pacific Islands Club', votes: 142, region: 'Guam' },
      { id: '3', name: 'FSM Development Bank', votes: 98, region: 'FSM' },
    ],
    teacher: [
      { id: '1', name: 'Ms. Rodriguez', school: 'Saipan Southern HS', votes: 134, region: 'CNMI' },
      { id: '2', name: 'Mr. Johnson', school: 'JFK High School', votes: 128, region: 'Guam' },
      { id: '3', name: 'Ms. Panuelo', school: 'Pohnpei Island HS', votes: 87, region: 'FSM' },
    ],
    student: [
      { id: '1', name: 'Maria Santos', school: 'Saipan Southern HS', votes: 187, region: 'CNMI' },
      { id: '2', name: 'John Cruz', school: 'Okkodo High School', votes: 165, region: 'Guam' },
      { id: '3', name: 'Emily Saimon', school: 'Palau High School', votes: 112, region: 'Palau' },
    ],
  };

  const currentNominees = regionalNominees[activeCategory];
  const maxVotes = Math.max(...currentNominees.map((n) => n.votes));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold flex items-center gap-2">
              ZALPHA Recruit Western Region Awards
              <Sparkles className="w-5 h-5" />
            </h3>
            <p className="text-purple-100 text-sm mt-1">
              Annual High School Co-Op Excellence Awards • Pacific-Wide Voting
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                  activeCategory === category.id
                    ? 'bg-white text-purple-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.id === 'employer' ? 'Employer' : category.id === 'teacher' ? 'Teacher' : 'Student'}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-1">
                {categories.find((c) => c.id === activeCategory)?.title}
              </h4>
              <p className="text-sm text-slate-600">
                {categories.find((c) => c.id === activeCategory)?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {currentNominees.map((nominee, index) => {
            const votePercentage = (nominee.votes / maxVotes) * 100;
            const position = index + 1;

            return (
              <motion.div
                key={nominee.id}
                className="p-4 rounded-lg border border-slate-200 bg-gradient-to-r from-white to-slate-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl ${
                      position === 1
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                        : position === 2
                        ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white'
                        : 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                    }`}
                  >
                    {position === 1 ? (
                      <Crown className="w-7 h-7" />
                    ) : position === 2 ? (
                      <Medal className="w-7 h-7" />
                    ) : (
                      <Award className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900">{nominee.name}</h4>
                        {'school' in nominee && (
                          <p className="text-sm text-slate-600">{nominee.school}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-slate-900">{nominee.votes}</div>
                        <div className="text-xs text-slate-500">votes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          nominee.region === 'CNMI'
                            ? 'bg-blue-100 text-blue-700'
                            : nominee.region === 'Guam'
                            ? 'bg-green-100 text-green-700'
                            : nominee.region === 'FSM'
                            ? 'bg-purple-100 text-purple-700'
                            : nominee.region === 'Palau'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {nominee.region}
                      </span>
                      {position === 1 && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">
                          🏆 Leading
                        </span>
                      )}
                    </div>
                    <div className="relative w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`absolute inset-y-0 left-0 rounded-full ${
                          position === 1
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            : position === 2
                            ? 'bg-gradient-to-r from-slate-400 to-slate-600'
                            : 'bg-gradient-to-r from-orange-400 to-orange-600'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${votePercentage}%` }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-sm font-semibold text-slate-900">Voting Progress</div>
                <div className="text-xs text-slate-600">346 total votes across Pacific region</div>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 transition">
              Submit Nomination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CollegeSchoolAwardsProps {
  region: string;
}

export function CollegeSchoolAwards({ region }: CollegeSchoolAwardsProps) {
  const schools = [
    {
      id: '1',
      name: 'Northern Marianas College',
      location: 'CNMI',
      votes: 234,
      coOpStudents: 45,
      completionRate: 96,
      employerRating: 4.8,
    },
    {
      id: '2',
      name: 'University of Guam',
      location: 'Guam',
      votes: 198,
      coOpStudents: 67,
      completionRate: 94,
      employerRating: 4.7,
    },
    {
      id: '3',
      name: 'College of Micronesia-FSM',
      location: 'FSM',
      votes: 156,
      coOpStudents: 38,
      completionRate: 92,
      employerRating: 4.6,
    },
  ];

  const maxVotes = Math.max(...schools.map((s) => s.votes));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              Top College/School of the Year
              <Sparkles className="w-5 h-5" />
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              ZALPHA Recruit Excellence in Co-Op Education Award
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {schools.map((school, index) => {
          const votePercentage = (school.votes / maxVotes) * 100;
          const position = index + 1;

          return (
            <motion.div
              key={school.id}
              className="p-5 rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-blue-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center font-black text-2xl ${
                    position === 1
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                      : position === 2
                      ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white'
                      : 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                  }`}
                >
                  {position === 1 ? (
                    <Crown className="w-9 h-9" />
                  ) : (
                    <span>#{position}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 mb-1">{school.name}</h4>
                  <p className="text-sm text-slate-600 mb-3">{school.location}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-black text-blue-600">{school.votes}</div>
                      <div className="text-xs text-slate-600">Votes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-green-600">{school.completionRate}%</div>
                      <div className="text-xs text-slate-600">Completion</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-yellow-600 flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-600" />
                        {school.employerRating}
                      </div>
                      <div className="text-xs text-slate-600">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`absolute inset-y-0 left-0 rounded-full ${
                    position === 1
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${votePercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
