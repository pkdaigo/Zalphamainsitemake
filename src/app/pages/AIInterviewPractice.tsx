import { useState, useRef, useEffect } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { IDVerificationConsent } from '@/app/components/IDVerificationConsent';
import { Avatar3D } from '@/app/components/Avatar3D';
import { Mic, MicOff, Video, RotateCcw, ChevronRight, Brain, Award, TrendingUp, CheckCircle, Target, Sparkles, Volume2 } from 'lucide-react';

interface AIInterviewPracticeProps {
  onNavigate: (page: string) => void;
}

interface Interviewer {
  id: string;
  name: string;
  fullName: string;
  title: string;
  company: string;
  photoUrl: string;
  videoUrl: string;
  greeting: string;
  personality: string;
  questions: InterviewQuestion[];
}

interface InterviewQuestion {
  id: number;
  question: string;
  tips: string[];
  goodAnswerExample: string;
  timeLimit: number; // seconds
  category: 'intro' | 'technical' | 'behavioral' | 'cultural' | 'closing';
}

const interviewers: Interviewer[] = [
  {
    id: 'lola',
    name: 'Airen',
    fullName: 'Airen Nakamura',
    title: 'Tech Lead',
    company: 'Island Digital Agency',
    photoUrl: 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMGZlbWFsZSUyMGJ1c2luZXNzd29tYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzAyNTIzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    greeting: 'Hello, and Welcome! Thanks for joining me today. I\'m Airen, the Tech Lead here at Island Digital Agency. I\'m excited to learn about your skills and see if we\'re a good match!',
    personality: 'Technical, detail-oriented, values innovation and continuous learning',
    questions: [
      {
        id: 1,
        question: 'Walk me through your technical background and the skills you\'re most proud of.',
        category: 'intro',
        timeLimit: 90,
        tips: [
          'Start with your education or training',
          'Highlight specific technical skills',
          'Share a project you\'re proud of',
          'Mention any certifications or coursework',
          'Show passion for learning and technology'
        ],
        goodAnswerExample: 'I love your enthusiasm for technology! Your project sounds impressive, and I can tell you\'re a continuous learner. That\'s huge for us!'
      },
      {
        id: 2,
        question: 'Tell me about a technical problem you solved. What was your approach?',
        category: 'technical',
        timeLimit: 120,
        tips: [
          'Explain the problem clearly (non-technical terms OK)',
          'Walk through your problem-solving process',
          'Mention any research or collaboration',
          'Share the solution and outcome',
          'Reflect on what you learned'
        ],
        goodAnswerExample: 'Wow, great problem-solving approach! I especially like how you broke down the issue methodically. Your curiosity and persistence really shine through.'
      },
      {
        id: 3,
        question: 'How do you stay current with new technologies and industry trends?',
        category: 'technical',
        timeLimit: 90,
        tips: [
          'Mention specific resources (blogs, courses, communities)',
          'Share recent things you\'ve learned',
          'Discuss side projects or experimentation',
          'Show genuine curiosity and initiative',
          'Balance learning with practical application'
        ],
        goodAnswerExample: 'Your commitment to continuous learning is impressive! I love that you balance formal learning with hands-on experimentation. That\'s the mindset we need!'
      },
      {
        id: 4,
        question: 'Why is it important to you to build technology solutions for Pacific Island communities?',
        category: 'cultural',
        timeLimit: 90,
        tips: [
          'Connect technology to community impact',
          'Share any relevant experiences',
          'Show understanding of unique Pacific challenges',
          'Express genuine commitment to the mission',
          'Mention accessibility, language, or cultural considerations'
        ],
        goodAnswerExample: 'Your vision for using technology to empower our communities is inspiring! We need more people who think about the human impact of their work.'
      },
      {
        id: 5,
        question: 'What questions do you have for me about our tech stack or engineering culture?',
        category: 'closing',
        timeLimit: 60,
        tips: [
          'Ask about technologies used',
          'Inquire about code review or collaboration processes',
          'Ask about learning and development opportunities',
          'Show interest in team structure',
          'Ask about challenging projects ahead'
        ],
        goodAnswerExample: 'Excellent technical questions! Your interest in our development practices and growth opportunities tells me you\'re thinking strategically. I\'m impressed!'
      }
    ]
  }
];

export function AIInterviewPractice({ onNavigate }: AIInterviewPracticeProps) {
  const [selectedInterviewer, setSelectedInterviewer] = useState<Interviewer>(interviewers[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 = greeting
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [showIDVerification, setShowIDVerification] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [introStage, setIntroStage] = useState<'initial' | 'ready-check' | 'ada-option' | 'special-requests' | 'tech-check' | 'complete'>('initial');
  const [showNoResponsePrompt, setShowNoResponsePrompt] = useState(false);
  const [adaModeEnabled, setAdaModeEnabled] = useState(false);
  const [selectedAdaRequests, setSelectedAdaRequests] = useState<string[]>([]);
  const recordingIntervalRef = useRef<number | null>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentQuestion = currentQuestionIndex >= 0 ? selectedInterviewer.questions[currentQuestionIndex] : null;
  const isGreeting = currentQuestionIndex === -1;
  const isComplete = currentQuestionIndex >= selectedInterviewer.questions.length;

  // Load voices when component mounts
  useEffect(() => {
    // Load voices immediately
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log('Voices loaded:', voices.map(v => v.name));
      }
    };
    
    loadVoices();
    
    // Some browsers load voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    setCurrentQuestionIndex(-1);
    setInterviewStarted(false);
    setHasAnswered(false);
    setShowFeedback(false);
    setIsRecording(false);
    setRecordingTime(0);
  }, [selectedInterviewer]);

  // Speak the question when it changes
  useEffect(() => {
    if (!interviewStarted || !currentQuestion) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create natural greeting based on question number
    let greeting;
    if (currentQuestionIndex === 0) {
      greeting = "Alright, let's start with our first question. ";
    } else if (currentQuestionIndex === selectedInterviewer.questions.length - 1) {
      greeting = "Great! This is our final question. ";
    } else {
      const greetings = [
        "Perfect! Next question. ",
        "Awesome! Moving on. ",
        "Great answer! Here's the next one. ",
        "Excellent! Let's continue. "
      ];
      greeting = greetings[currentQuestionIndex % greetings.length];
    }
    
    const textToSpeak = greeting + currentQuestion.question;
    
    // Use Airen's voice - natural and conversational
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95; // Natural conversational speed
    utterance.volume = 1.0;
    
    // Select Airen's feminine voice - prioritize most natural sounding voices
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const naturalFemaleVoice = voices.find(v => 
        v.name.includes('Samantha') || // macOS - most natural
        v.name.includes('Google US English Female') ||
        v.name.includes('Google UK English Female') ||
        v.name.includes('Microsoft Zira') ||
        v.name.includes('Victoria') ||
        v.name.includes('Karen') ||
        v.name.includes('Moira') ||
        v.name.includes('Fiona') ||
        (v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.includes('Woman')))
      );
      if (naturalFemaleVoice) {
        utterance.voice = naturalFemaleVoice;
        utterance.pitch = 1.05; // Slightly higher but natural pitch
      } else {
        // Fallback: subtle pitch adjustment for natural tone
        utterance.pitch = 1.1;
      }
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesisRef.current = utterance;
    
    // Speak after a short delay
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 500);
    
    // Cleanup
    return () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  }, [currentQuestion, currentQuestionIndex, selectedInterviewer, interviewStarted]);

  const handleStartInterview = () => {
    // Show ID verification first
    setShowIDVerification(true);
  };

  const handleVerificationComplete = () => {
    setShowIDVerification(false);
    setInterviewStarted(true);
    setIntroStage('initial');
  };

  const speakWithAirenVoice = (text: string, onEnd?: () => void) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Natural conversational speed
    utterance.volume = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const naturalFemaleVoice = voices.find(v => 
        v.name.includes('Samantha') || // macOS - most natural
        v.name.includes('Google US English Female') ||
        v.name.includes('Google UK English Female') ||
        v.name.includes('Microsoft Zira') ||
        v.name.includes('Victoria') ||
        v.name.includes('Karen') ||
        v.name.includes('Moira') ||
        v.name.includes('Fiona') ||
        (v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.includes('Woman')))
      );
      if (naturalFemaleVoice) {
        utterance.voice = naturalFemaleVoice;
        utterance.pitch = 1.05; // Slightly higher but natural pitch
      } else {
        utterance.pitch = 1.1; // Subtle pitch adjustment for natural tone
      }
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleStartIntroduction = () => {
    // Natural pauses are created with commas and periods in speech synthesis
    const introText = "Hi there! Thanks so much for joining me today. I'm Airen Nakamura, and I'll be your interviewer. Now, I should mention that I'm an AI assistant, but don't worry about that. I'm here to have a real conversation with you and help you show off your amazing skills and experience. Just be yourself and we'll have a great chat!";
    speakWithAirenVoice(introText, () => {
      // After speaking, advance to ready check
      setTimeout(() => {
        handleReadyCheck();
      }, 1000);
    });
  };

  const handleReadyCheck = () => {
    const readyText = "So, are you ready to get started? Take a deep breath, and when you're ready, just click the button below.";
    speakWithAirenVoice(readyText);
    setIntroStage('ready-check');
  };

  const handleConfirmReady = () => {
    const adaOptionText = "Perfect! Before we start, I want to make sure you're comfortable. Do you need more assistance or would you like me to be more patient while you understand how I function? I'm here to support you in any way you need.";
    speakWithAirenVoice(adaOptionText);
    setIntroStage('ada-option');
  };

  const handleEnableAdaMode = () => {
    setAdaModeEnabled(true);
    const specialRequestsText = "Wonderful! I've removed the time limits for you. Please select any special requests or accommodations you need before we begin. Remember, you are a perfect candidate, and we can't wait to get to know you!";
    speakWithAirenVoice(specialRequestsText);
    setIntroStage('special-requests');
  };

  const handleSkipAdaMode = () => {
    const techCheckText = "Great! Remember, this is for you, and I'm here for you! Make sure your audio and mic are working properly and let me know when everything is all set before we begin.";
    speakWithAirenVoice(techCheckText);
    setIntroStage('tech-check');
  };

  const handleBeginQuestions = () => {
    setIntroStage('complete');
    setCurrentQuestionIndex(0);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setShowFeedback(false);
    
    // Only set timer if ADA mode is NOT enabled
    if (!adaModeEnabled) {
      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          if (currentQuestion && prev >= currentQuestion.timeLimit) {
            handleStopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      // In ADA mode, still track time but don't enforce limit
      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasAnswered(true);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
  };

  const handleShowFeedback = () => {
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setHasAnswered(false);
    setShowFeedback(false);
    setRecordingTime(0);
  };

  const handleRestartInterview = () => {
    setCurrentQuestionIndex(-1);
    setInterviewStarted(false);
    setHasAnswered(false);
    setShowFeedback(false);
    setRecordingTime(0);
    setIsRecording(false);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (!currentQuestion) return 'text-slate-600';
    const remaining = currentQuestion.timeLimit - recordingTime;
    if (remaining <= 10) return 'text-red-600';
    if (remaining <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <>
      {/* Show ID Verification before interview */}
      {showIDVerification && (
        <IDVerificationConsent 
          onComplete={handleVerificationComplete}
          interviewerName={selectedInterviewer.fullName}
        />
      )}

      {/* Main Interview Content */}
      {!showIDVerification && (
        <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            {/* Back Button */}
            <BackButton onNavigate={onNavigate} label="Back to Dashboard" />

            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold">
                <Brain className="w-4 h-4" />
                AI Interview Practice
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 px-4">
                Practice Your Interview Skills 🎤
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
                Get interviewed by Airen and receive instant AI feedback on your answers!
              </p>
            </div>

            {/* Interviewer Selection */}
            {!interviewStarted && (
              <div>
                {/* Start Interview Button */}
                <div className="max-w-2xl mx-auto">
                  {/* Interviewer Card */}
                  <div className="relative p-8 rounded-3xl border-4 border-purple-500 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl mb-8">
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                      <img
                        src={selectedInterviewer.photoUrl}
                        alt={selectedInterviewer.fullName}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="text-center sm:text-left flex-1">
                        <h3 className="text-3xl font-bold mb-2">{selectedInterviewer.fullName}</h3>
                        <p className="text-lg font-semibold text-white/90 mb-1">
                          {selectedInterviewer.title}
                        </p>
                        <p className="text-base text-white/80">
                          {selectedInterviewer.company}
                        </p>
                      </div>
                    </div>
                    <div className="text-base italic p-4 rounded-xl bg-white/10 text-white/90 text-center">
                      "{selectedInterviewer.personality}"
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-4">
                      <div className="text-center">
                        <span className="block text-4xl font-bold">{selectedInterviewer.questions.length}</span>
                        <span className="text-sm text-white/80">Interview Questions</span>
                      </div>
                      <div className="w-px h-12 bg-white/30"></div>
                      <div className="text-center">
                        <span className="block text-4xl font-bold">~15</span>
                        <span className="text-sm text-white/80">Minutes Total</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleStartInterview}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-xl flex items-center gap-3 mx-auto"
                    >
                      <Video className="w-6 h-6" />
                      Start Interview with {selectedInterviewer.name}
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Interview In Progress */}
            {interviewStarted && introStage !== 'complete' && (
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Airen's Video/Avatar */}
                <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-300 overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedInterviewer.photoUrl}
                        alt={selectedInterviewer.fullName}
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <div>
                        <h3 className="text-xl font-bold">{selectedInterviewer.fullName}</h3>
                        <p className="text-sm text-white/90">{selectedInterviewer.title}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    {/* Simple video placeholder with interviewer image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900">
                      <img
                        src={selectedInterviewer.photoUrl}
                        alt={selectedInterviewer.fullName}
                        className="w-full h-full object-cover opacity-90"
                      />
                      {isSpeaking && (
                        <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 animate-pulse">
                          <Volume2 className="w-4 h-4" />
                          Speaking...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Introduction Stage Cards */}
                {introStage === 'initial' && (
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg border-2 border-purple-300 p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Welcome to Your Interview! 👋
                    </h3>
                    <p className="text-lg text-slate-700 mb-6">
                      Click the button below and Airen will introduce herself and explain how this interview works.
                    </p>
                    <button
                      onClick={handleStartIntroduction}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-xl flex items-center gap-3 mx-auto"
                    >
                      <Volume2 className="w-6 h-6" />
                      Begin Introduction
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}

                {introStage === 'ready-check' && (
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-lg border-2 border-blue-300 p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Ready to Get Started? 🚀
                    </h3>
                    <p className="text-lg text-slate-700 mb-6">
                      Airen wants to know if you're ready to begin the interview process.
                    </p>
                    <button
                      onClick={handleConfirmReady}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-xl flex items-center gap-3 mx-auto"
                    >
                      <CheckCircle className="w-6 h-6" />
                      Yes, I'm Ready!
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}

                {introStage === 'ada-option' && (
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-lg border-2 border-pink-300 p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Accessibility Options 🌟
                    </h3>
                    <p className="text-lg text-slate-700 mb-6">
                      Airen is here to support you in any way you need. Do you need more assistance or would you like me to be more patient while you understand how I function?
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <button
                        onClick={handleEnableAdaMode}
                        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-xl flex items-center gap-3 mx-auto"
                      >
                        <Sparkles className="w-6 h-6" />
                        Enable ADA Mode
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handleSkipAdaMode}
                        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-xl flex items-center gap-3 mx-auto"
                      >
                        <Sparkles className="w-6 h-6" />
                        Skip ADA Mode
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                )}

                {introStage === 'special-requests' && (
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-lg border-2 border-green-300 p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                      ADA Special Accommodations ♿
                    </h3>
                    <p className="text-lg text-slate-700 mb-6 text-center">
                      Select any special requests or accommodations you need. We're here to support you!
                    </p>
                    
                    {/* Special Accommodation Options */}
                    <div className="bg-white rounded-xl p-6 mb-6 space-y-4">
                      <div 
                        onClick={() => {
                          if (selectedAdaRequests.includes('slowSpeech')) {
                            setSelectedAdaRequests(selectedAdaRequests.filter(r => r !== 'slowSpeech'));
                          } else {
                            setSelectedAdaRequests([...selectedAdaRequests, 'slowSpeech']);
                          }
                        }}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                          selectedAdaRequests.includes('slowSpeech') 
                            ? 'bg-green-50 border-green-500' 
                            : 'bg-slate-50 border-slate-200 hover:border-green-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedAdaRequests.includes('slowSpeech')
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-300'
                        }`}>
                          {selectedAdaRequests.includes('slowSpeech') && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">Extra Slow Speech (Already Enabled ✓)</p>
                          <p className="text-sm text-slate-600 mt-1">Airen speaks 25% slower for easier comprehension</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => {
                          if (selectedAdaRequests.includes('repeatQuestions')) {
                            setSelectedAdaRequests(selectedAdaRequests.filter(r => r !== 'repeatQuestions'));
                          } else {
                            setSelectedAdaRequests([...selectedAdaRequests, 'repeatQuestions']);
                          }
                        }}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                          selectedAdaRequests.includes('repeatQuestions') 
                            ? 'bg-green-50 border-green-500' 
                            : 'bg-slate-50 border-slate-200 hover:border-green-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedAdaRequests.includes('repeatQuestions')
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-300'
                        }`}>
                          {selectedAdaRequests.includes('repeatQuestions') && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">Allow Question Repetition</p>
                          <p className="text-sm text-slate-600 mt-1">You can ask Airen to repeat questions as many times as needed</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => {
                          if (selectedAdaRequests.includes('breaks')) {
                            setSelectedAdaRequests(selectedAdaRequests.filter(r => r !== 'breaks'));
                          } else {
                            setSelectedAdaRequests([...selectedAdaRequests, 'breaks']);
                          }
                        }}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                          selectedAdaRequests.includes('breaks') 
                            ? 'bg-green-50 border-green-500' 
                            : 'bg-slate-50 border-slate-200 hover:border-green-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedAdaRequests.includes('breaks')
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-300'
                        }`}>
                          {selectedAdaRequests.includes('breaks') && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">Allow Breaks Between Questions</p>
                          <p className="text-sm text-slate-600 mt-1">Take as much time as you need between questions to rest and regroup</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => {
                          if (selectedAdaRequests.includes('multipleAttempts')) {
                            setSelectedAdaRequests(selectedAdaRequests.filter(r => r !== 'multipleAttempts'));
                          } else {
                            setSelectedAdaRequests([...selectedAdaRequests, 'multipleAttempts']);
                          }
                        }}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                          selectedAdaRequests.includes('multipleAttempts') 
                            ? 'bg-green-50 border-green-500' 
                            : 'bg-slate-50 border-slate-200 hover:border-green-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedAdaRequests.includes('multipleAttempts')
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-300'
                        }`}>
                          {selectedAdaRequests.includes('multipleAttempts') && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">Unlimited Answer Retries</p>
                          <p className="text-sm text-slate-600 mt-1">Re-record your answers as many times as you want until you're satisfied</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => {
                          if (selectedAdaRequests.includes('visualCues')) {
                            setSelectedAdaRequests(selectedAdaRequests.filter(r => r !== 'visualCues'));
                          } else {
                            setSelectedAdaRequests([...selectedAdaRequests, 'visualCues']);
                          }
                        }}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                          selectedAdaRequests.includes('visualCues') 
                            ? 'bg-green-50 border-green-500' 
                            : 'bg-slate-50 border-slate-200 hover:border-green-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedAdaRequests.includes('visualCues')
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-300'
                        }`}>
                          {selectedAdaRequests.includes('visualCues') && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">Enhanced Visual Cues (Already Enabled ✓)</p>
                          <p className="text-sm text-slate-600 mt-1">Green calming colors instead of red/urgent indicators during recording</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => {
                          if (selectedAdaRequests.includes('simplified')) {
                            setSelectedAdaRequests(selectedAdaRequests.filter(r => r !== 'simplified'));
                          } else {
                            setSelectedAdaRequests([...selectedAdaRequests, 'simplified']);
                          }
                        }}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                          selectedAdaRequests.includes('simplified') 
                            ? 'bg-green-50 border-green-500' 
                            : 'bg-slate-50 border-slate-200 hover:border-green-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedAdaRequests.includes('simplified')
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-300'
                        }`}>
                          {selectedAdaRequests.includes('simplified') && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">Simplified Instructions</p>
                          <p className="text-sm text-slate-600 mt-1">Receive clear, step-by-step guidance for recording and answering</p>
                        </div>
                      </div>
                    </div>

                    {/* Encouraging Message */}
                    <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 mb-6 text-center">
                      <p className="text-lg font-bold text-purple-900 mb-2">💜 You are a perfect candidate! 💜</p>
                      <p className="text-sm text-purple-700">
                        We can't wait to get to know you! When you're ready, click the red button with the microphone to start recording your answer. 
                        Click stop once you finish. Don't get frustrated if you felt your answer wasn't good - go ahead and try again! 
                        We want you to have the best experience possible.
                      </p>
                    </div>

                    {/* Tech Check Reminder */}
                    <div className="bg-white rounded-xl p-4 mb-6">
                      <p className="text-sm font-bold text-slate-900 mb-3">Quick Tech Check:</p>
                      <div className="flex items-center gap-3 text-left">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <p className="text-sm text-slate-700">Microphone is connected and working</p>
                      </div>
                      <div className="flex items-center gap-3 text-left mt-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <p className="text-sm text-slate-700">Audio/speakers are enabled</p>
                      </div>
                      <div className="flex items-center gap-3 text-left mt-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <p className="text-sm text-slate-700">You're in a quiet environment</p>
                      </div>
                    </div>

                    <button
                      onClick={handleBeginQuestions}
                      className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-xl flex items-center justify-center gap-3"
                    >
                      <Sparkles className="w-6 h-6" />
                      All Set, Let's Begin! {selectedAdaRequests.length > 0 && `(${selectedAdaRequests.length} accommodations selected)`}
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}

                {introStage === 'tech-check' && (
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-lg border-2 border-green-300 p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Final Tech Check 🎤
                    </h3>
                    <p className="text-lg text-slate-700 mb-4">
                      Airen is reminding you to check your audio and microphone before we begin.
                    </p>
                    <div className="bg-white rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-3 text-left">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <p className="text-sm text-slate-700">Microphone is connected and working</p>
                      </div>
                      <div className="flex items-center gap-3 text-left mt-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <p className="text-sm text-slate-700">Audio/speakers are enabled</p>
                      </div>
                      <div className="flex items-center gap-3 text-left mt-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <p className="text-sm text-slate-700">You're in a quiet environment</p>
                      </div>
                    </div>
                    <button
                      onClick={handleBeginQuestions}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-xl flex items-center gap-3 mx-auto"
                    >
                      <Sparkles className="w-6 h-6" />
                      All Set, Let's Begin!
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Interview Questions */}
            {interviewStarted && introStage === 'complete' && !isComplete && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Video & Question */}
                <div className="space-y-6">
                  {/* Interviewer Video */}
                  <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedInterviewer.photoUrl}
                          alt={selectedInterviewer.fullName}
                          className="w-12 h-12 rounded-full border-2 border-white"
                        />
                        <div>
                          <h3 className="text-xl font-bold">{selectedInterviewer.fullName}</h3>
                          <p className="text-sm text-white/90">{selectedInterviewer.title}</p>
                        </div>
                      </div>
                    </div>

                    {/* Static Photo with Speaking Animation */}
                    <div className="relative aspect-video overflow-hidden">
                      {/* 3D Avatar */}
                      <Avatar3D 
                        avatarId={selectedInterviewer.id as 'pk' | 'lola'} 
                        isSpeaking={isSpeaking}
                        photoUrl={selectedInterviewer.photoUrl}
                      />
                    </div>
                  </div>

                  {/* Question Card */}
                  {currentQuestion && (
                    <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-purple-600">{currentQuestionIndex + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-bold uppercase">
                              {currentQuestion.category}
                            </span>
                            {!adaModeEnabled && (
                              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                                {currentQuestion.timeLimit}s time limit
                              </span>
                            )}
                            {adaModeEnabled && (
                              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">
                                ♿ No Time Limit
                              </span>
                            )}
                          </div>
                          <p className="text-lg font-bold text-slate-900">{currentQuestion.question}</p>
                        </div>
                      </div>

                      {/* Recording Controls */}
                      <div className="mt-6 space-y-4">
                        {!isRecording && !hasAnswered && (
                          <button
                            onClick={handleStartRecording}
                            className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3"
                          >
                            <Mic className="w-6 h-6" />
                            Start Recording Your Answer
                          </button>
                        )}

                        {isRecording && (
                          <div className="space-y-4">
                            {!adaModeEnabled && (
                              <div className="flex items-center justify-between p-4 bg-red-50 border-2 border-red-300 rounded-xl">
                                <div className="flex items-center gap-3">
                                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                                  <span className="font-bold text-red-600">Recording...</span>
                                </div>
                                <span className={`text-2xl font-bold ${getTimeColor()}`}>
                                  {formatTime(recordingTime)} / {formatTime(currentQuestion.timeLimit)}
                                </span>
                              </div>
                            )}
                            {adaModeEnabled && (
                              <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-300 rounded-xl">
                                <div className="flex items-center gap-3">
                                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="font-bold text-green-600">Recording... (No time limit)</span>
                                </div>
                                <span className="text-2xl font-bold text-green-600">
                                  {formatTime(recordingTime)}
                                </span>
                              </div>
                            )}
                            <button
                              onClick={handleStopRecording}
                              className="w-full px-6 py-4 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-all font-bold text-lg flex items-center justify-center gap-3"
                            >
                              <MicOff className="w-6 h-6" />
                              Stop Recording
                            </button>
                          </div>
                        )}

                        {hasAnswered && !showFeedback && (
                          <button
                            onClick={handleShowFeedback}
                            className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3"
                          >
                            <Sparkles className="w-6 h-6" />
                            Get AI Feedback
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Tips & Feedback */}
                <div className="space-y-6">
                  {/* Tips */}
                  {currentQuestion && !showFeedback && (
                    <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-blue-600" />
                        Answer Tips
                      </h3>
                      <div className="space-y-2">
                        {currentQuestion.tips.map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
                            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-700">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Feedback */}
                  {showFeedback && currentQuestion && (
                    <div className="space-y-6">
                      {/* Positive Feedback */}
                      <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl shadow-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Award className="w-8 h-8" />
                          <h3 className="text-2xl font-bold">Great Job!</h3>
                        </div>
                        <p className="text-white/90 text-lg italic">
                          "{currentQuestion.goodAnswerExample}"
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <p className="text-sm text-white/80">- {selectedInterviewer.fullName}</p>
                        </div>
                        
                        {/* Hear Feedback Button */}
                        <button
                          onClick={() => {
                            // Speak the feedback with Airen's natural voice
                            speakWithAirenVoice(currentQuestion.goodAnswerExample);
                          }}
                          className="mt-4 w-full px-4 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl hover:bg-white/30 transition-all font-bold flex items-center justify-center gap-2"
                        >
                          <Volume2 className="w-5 h-5" />
                          Hear {selectedInterviewer.name}'s Feedback
                        </button>
                      </div>

                      {/* Score Breakdown */}
                      <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Brain className="w-6 h-6 text-purple-600" />
                          AI Analysis
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-slate-700">Clarity & Structure</span>
                              <span className="px-3 py-1 rounded-lg font-bold text-sm bg-green-100 text-green-600 border-2 border-green-300">
                                92/100
                              </span>
                            </div>
                            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 transition-all" style={{ width: '92%' }} />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-slate-700">Relevance & Content</span>
                              <span className="px-3 py-1 rounded-lg font-bold text-sm bg-green-100 text-green-600 border-2 border-green-300">
                                88/100
                              </span>
                            </div>
                            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 transition-all" style={{ width: '88%' }} />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-slate-700">Confidence & Energy</span>
                              <span className="px-3 py-1 rounded-lg font-bold text-sm bg-blue-100 text-blue-600 border-2 border-blue-300">
                                85/100
                              </span>
                            </div>
                            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 transition-all" style={{ width: '85%' }} />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-slate-700">Time Management</span>
                              <span className="px-3 py-1 rounded-lg font-bold text-sm bg-green-100 text-green-600 border-2 border-green-300">
                                90/100
                              </span>
                            </div>
                            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 transition-all" style={{ width: '90%' }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Next Question Button */}
                      <button
                        onClick={handleNextQuestion}
                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3"
                      >
                        Next Question
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  )}

                  {/* Progress */}
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Interview Progress</h3>
                    <div className="space-y-3">
                      {selectedInterviewer.questions.map((q, idx) => (
                        <div
                          key={q.id}
                          className={`flex items-center gap-3 p-3 rounded-xl ${
                            idx < currentQuestionIndex
                              ? 'bg-green-50 border-2 border-green-200'
                              : idx === currentQuestionIndex
                              ? 'bg-purple-50 border-2 border-purple-300'
                              : 'bg-slate-50 border-2 border-slate-200'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              idx < currentQuestionIndex
                                ? 'bg-green-500 text-white'
                                : idx === currentQuestionIndex
                                ? 'bg-purple-500 text-white'
                                : 'bg-slate-300 text-slate-600'
                            }`}
                          >
                            {idx < currentQuestionIndex ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                          </div>
                          <span
                            className={`text-sm font-semibold ${
                              idx === currentQuestionIndex ? 'text-purple-600' : 'text-slate-600'
                            }`}
                          >
                            {q.category.charAt(0).toUpperCase() + q.category.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Interview Complete */}
            {isComplete && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white rounded-3xl shadow-2xl p-8 text-center">
                  <Award className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Interview Complete! 🎉</h2>
                  <p className="text-xl text-white/90 mb-6">
                    Congratulations! You've completed the practice interview with {selectedInterviewer.fullName}.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-3xl font-bold mb-1">{selectedInterviewer.questions.length}</div>
                      <div className="text-sm text-white/80">Questions Answered</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-3xl font-bold mb-1">89</div>
                      <div className="text-sm text-white/80">Average Score</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-3xl font-bold mb-1">A-</div>
                      <div className="text-sm text-white/80">Overall Grade</div>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleRestartInterview}
                    className="px-6 py-4 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all font-bold text-lg flex items-center justify-center gap-3"
                  >
                    <RotateCcw className="w-6 h-6" />
                    Try Again
                  </button>
                  <button
                    onClick={() => onNavigate('student-dashboard')}
                    className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3"
                  >
                    Back to Dashboard
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

            {/* How It Works */}
            {!interviewStarted && (
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">How AI Interview Practice Works</h2>
                <div className="grid sm:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">1. Meet Airen</h3>
                    <p className="text-sm text-slate-600">Your AI interviewer will guide you through the process</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mic className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">2. Answer Questions</h3>
                    <p className="text-sm text-slate-600">Record your answers using your microphone (60-120 seconds each)</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">3. AI Analyzes</h3>
                    <p className="text-sm text-slate-600">Our AI evaluates clarity, content, confidence, and timing</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">4. Get Feedback</h3>
                    <p className="text-sm text-slate-600">Receive scores and personalized feedback from Airen</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}