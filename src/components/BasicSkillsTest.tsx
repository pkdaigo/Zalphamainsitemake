import { useState } from 'react';
import { CheckCircle, Clock, Award, ArrowRight, X, BookOpen, Calculator, Brain, ClipboardCheck } from 'lucide-react';

interface BasicSkillsTestProps {
  onComplete: (score: number) => void;
  onSkip?: () => void;
}

type TestSection = 'intro' | 'reading' | 'math' | 'problem-solving' | 'instructions' | 'results';

export function BasicSkillsTest({ onComplete, onSkip }: BasicSkillsTestProps) {
  const [currentSection, setCurrentSection] = useState<TestSection>('intro');
  const [scores, setScores] = useState({
    reading: 0,
    math: 0,
    problemSolving: 0,
    instructions: 0,
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Reading Comprehension Questions
  const readingQuestions = [
    {
      passage: "ZALPHA is a job platform that connects students in the Pacific region with local employers. Students create profiles, showcase their skills, and apply to jobs. Employers can search for qualified candidates and post job opportunities.",
      question: "What is the main purpose of ZALPHA?",
      options: [
        "To help students find housing",
        "To connect students with jobs",
        "To provide online courses",
        "To sell products to students"
      ],
      correct: 1
    },
    {
      passage: "Your shift starts at 8:00 AM. You should arrive 10 minutes early to clock in and prepare. The manager will assign your tasks for the day during the morning briefing at 8:15 AM.",
      question: "What time should you arrive for your shift?",
      options: [
        "8:00 AM",
        "8:15 AM",
        "7:50 AM",
        "7:45 AM"
      ],
      correct: 2
    },
    {
      passage: "Customer service representatives must remain professional at all times. If a customer is upset, listen carefully, apologize for any inconvenience, and work to find a solution. Never argue with customers.",
      question: "What should you do if a customer is upset?",
      options: [
        "Argue back to defend yourself",
        "Ignore them and walk away",
        "Listen and work to find a solution",
        "Call the police immediately"
      ],
      correct: 2
    }
  ];

  // Basic Math Questions
  const mathQuestions = [
    {
      question: "A customer buys 3 items at $12 each. What is the total?",
      options: ["$24", "$30", "$36", "$42"],
      correct: 2
    },
    {
      question: "You work 8 hours per day, 5 days per week. How many hours do you work in a week?",
      options: ["35 hours", "40 hours", "45 hours", "50 hours"],
      correct: 1
    },
    {
      question: "If you earn $15 per hour and work 6 hours, how much do you earn?",
      options: ["$75", "$80", "$90", "$100"],
      correct: 2
    },
    {
      question: "A restaurant bill is $50. If you want to leave a 20% tip, how much is the tip?",
      options: ["$5", "$8", "$10", "$12"],
      correct: 2
    }
  ];

  // Problem Solving Questions
  const problemQuestions = [
    {
      scenario: "🏪 You're working at a store. A customer wants to return an item but doesn't have a receipt. Your manager is on break.",
      question: "What's the best action?",
      options: [
        "Refuse the return immediately",
        "Accept the return without checking",
        "Politely explain the policy and offer to wait for the manager",
        "Tell the customer to leave"
      ],
      correct: 2
    },
    {
      scenario: "⏰ You realize you'll be 15 minutes late to work due to traffic.",
      question: "What should you do?",
      options: [
        "Don't say anything and just show up late",
        "Call your manager immediately to let them know",
        "Skip work for the day",
        "Wait until you arrive to explain"
      ],
      correct: 1
    },
    {
      scenario: "🤝 Two coworkers are arguing loudly in front of customers.",
      question: "What's the most professional response?",
      options: [
        "Join the argument to give your opinion",
        "Politely suggest they discuss it privately",
        "Record them on your phone",
        "Ignore it completely"
      ],
      correct: 1
    }
  ];

  // Following Instructions Questions
  const instructionQuestions = [
    {
      instruction: "Read the following steps carefully: (1) Click the blue button, (2) Wait for the confirmation, (3) Click 'Submit'",
      question: "Which button should you click first?",
      options: [
        "The red button",
        "The blue button",
        "The submit button",
        "No button"
      ],
      correct: 1
    },
    {
      instruction: "Safety rule: Always wear gloves when handling cleaning chemicals. Gloves are located in the storage closet.",
      question: "What must you do before handling cleaning chemicals?",
      options: [
        "Ask permission",
        "Read the label",
        "Wear gloves",
        "Open windows"
      ],
      correct: 2
    },
    {
      instruction: "Closing procedure: (1) Turn off all equipment, (2) Lock all doors, (3) Set the alarm, (4) Exit through the back door",
      question: "What's the last step in the closing procedure?",
      options: [
        "Turn off equipment",
        "Lock doors",
        "Set the alarm",
        "Exit through the back door"
      ],
      correct: 3
    }
  ];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const allQuestions = {
      'reading': readingQuestions,
      'math': mathQuestions,
      'problem-solving': problemQuestions,
      'instructions': instructionQuestions,
    };

    const currentQuestions = allQuestions[currentSection as keyof typeof allQuestions];
    const isCorrect = selectedAnswer === currentQuestions[currentQuestion].correct;

    // Update score
    if (isCorrect) {
      setScores(prev => ({
        ...prev,
        [currentSection === 'problem-solving' ? 'problemSolving' : currentSection]: prev[currentSection === 'problem-solving' ? 'problemSolving' : currentSection as keyof typeof scores] + 1
      }));
    }

    // Move to next question or section
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      moveToNextSection();
    }
  };

  const moveToNextSection = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);

    const sectionOrder: TestSection[] = ['intro', 'reading', 'math', 'problem-solving', 'instructions', 'results'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    
    if (currentIndex < sectionOrder.length - 1) {
      setCurrentSection(sectionOrder[currentIndex + 1]);
    }
  };

  const calculateTotalScore = () => {
    const total = scores.reading + scores.math + scores.problemSolving + scores.instructions;
    const maxScore = readingQuestions.length + mathQuestions.length + problemQuestions.length + instructionQuestions.length;
    return Math.round((total / maxScore) * 100);
  };

  const getTotalQuestions = () => {
    return readingQuestions.length + mathQuestions.length + problemQuestions.length + instructionQuestions.length;
  };

  const getTotalCorrect = () => {
    return scores.reading + scores.math + scores.problemSolving + scores.instructions;
  };

  if (currentSection === 'intro') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              🎓 Basic Skills Assessment
            </h2>
            <p className="text-gray-600 text-lg">
              Required for all high school graduates entering the workforce
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">This test will assess:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">Reading Comprehension</span>
              </div>
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">Basic Math</span>
              </div>
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-600" />
                <span className="text-gray-700">Problem Solving</span>
              </div>
              <div className="flex items-center gap-3">
                <ClipboardCheck className="w-6 h-6 text-orange-600" />
                <span className="text-gray-700">Following Instructions</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  <strong>Time:</strong> ~10 minutes • <strong>Questions:</strong> {getTotalQuestions()} • <strong>Pass Score:</strong> 70%
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Employers will see your results to help match you with the right jobs.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setCurrentSection('reading')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
            {onSkip && (
              <button
                onClick={onSkip}
                className="px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-all"
              >
                Skip for Now
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === 'results') {
    const totalScore = calculateTotalScore();
    const passed = totalScore >= 70;
    const totalCorrect = getTotalCorrect();
    const totalQuestions = getTotalQuestions();

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className={`w-24 h-24 ${passed ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-orange-500 to-red-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {passed ? (
                <CheckCircle className="w-12 h-12 text-white" />
              ) : (
                <X className="w-12 h-12 text-white" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {passed ? '🎉 Assessment Complete!' : '📝 Assessment Complete'}
            </h2>
            <p className="text-gray-600 text-lg">
              {passed ? 'Great job! You passed the basic skills test.' : 'You can retake this assessment to improve your score.'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-6xl font-bold text-blue-600 mb-2">{totalScore}%</div>
              <p className="text-gray-700">Your Score: {totalCorrect} out of {totalQuestions} correct</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Reading</span>
                </div>
                <p className="text-2xl font-bold text-gray-700">{scores.reading}/{readingQuestions.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Math</span>
                </div>
                <p className="text-2xl font-bold text-gray-700">{scores.math}/{mathQuestions.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Problem Solving</span>
                </div>
                <p className="text-2xl font-bold text-gray-700">{scores.problemSolving}/{problemQuestions.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-gray-900">Instructions</span>
                </div>
                <p className="text-2xl font-bold text-gray-700">{scores.instructions}/{instructionQuestions.length}</p>
              </div>
            </div>
          </div>

          {passed ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
              <p className="text-green-800 text-center">
                ✅ <strong>Certification Earned!</strong> Your profile will show that you've completed the Basic Skills Assessment.
              </p>
            </div>
          ) : (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-6">
              <p className="text-orange-800 text-center">
                You need 70% or higher to pass. Review the areas above and try again when ready!
              </p>
            </div>
          )}

          <button
            onClick={() => onComplete(totalScore)}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            {passed ? 'Continue to Dashboard' : 'Return to Profile'}
          </button>
        </div>
      </div>
    );
  }

  // Question display for each section
  const getSectionData = () => {
    switch (currentSection) {
      case 'reading':
        return {
          icon: <BookOpen className="w-8 h-8 text-blue-600" />,
          title: 'Reading Comprehension',
          color: 'from-blue-500 to-cyan-500',
          questions: readingQuestions,
        };
      case 'math':
        return {
          icon: <Calculator className="w-8 h-8 text-green-600" />,
          title: 'Basic Math',
          color: 'from-green-500 to-emerald-500',
          questions: mathQuestions,
        };
      case 'problem-solving':
        return {
          icon: <Brain className="w-8 h-8 text-purple-600" />,
          title: 'Problem Solving',
          color: 'from-purple-500 to-pink-500',
          questions: problemQuestions,
        };
      case 'instructions':
        return {
          icon: <ClipboardCheck className="w-8 h-8 text-orange-600" />,
          title: 'Following Instructions',
          color: 'from-orange-500 to-red-500',
          questions: instructionQuestions,
        };
      default:
        return null;
    }
  };

  const sectionData = getSectionData();
  if (!sectionData) return null;

  const currentQ = sectionData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / sectionData.questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${sectionData.color} rounded-2xl flex items-center justify-center`}>
            {sectionData.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900">{sectionData.title}</h3>
            <p className="text-gray-600">Question {currentQuestion + 1} of {sectionData.questions.length}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className={`bg-gradient-to-r ${sectionData.color} h-3 rounded-full transition-all duration-300`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question Content */}
        <div className="mb-6">
          {currentSection === 'reading' && 'passage' in currentQ && (
            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700 leading-relaxed">{currentQ.passage}</p>
            </div>
          )}
          {currentSection === 'problem-solving' && 'scenario' in currentQ && (
            <div className="bg-purple-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700 leading-relaxed text-lg">{currentQ.scenario}</p>
            </div>
          )}
          {currentSection === 'instructions' && 'instruction' in currentQ && (
            <div className="bg-orange-50 rounded-xl p-4 mb-4 border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-medium">{currentQ.instruction}</p>
            </div>
          )}
          <p className="text-xl font-semibold text-gray-900 mb-4">{currentQ.question}</p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
            selectedAnswer === null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : `bg-gradient-to-r ${sectionData.color} text-white hover:shadow-xl`
          }`}
        >
          {currentQuestion < sectionData.questions.length - 1 ? 'Next Question' : 'Continue'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}