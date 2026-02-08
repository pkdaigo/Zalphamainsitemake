import { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Maximize2, Minus, MessageSquare, Heart, Sparkles, Star, ChevronDown, ChevronUp, HelpCircle, Settings } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface ZalphaBotProps {
  onNavigate?: (page: string) => void;
  userName?: string;
  onClose?: () => void;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Getting Started',
    question: 'How do I create my student profile?',
    answer: 'Go to your Student Dashboard and click "Complete Your Profile". Add your education, skills, work experience, and upload your ID for verification. Completed profiles get 5x more employer views!'
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'How does ZALPHA work?',
    answer: 'ZALPHA connects Pacific Island students (ages 18+, graduated within 1 year) with local employers! It\'s 100% FREE for students. Complete your profile → Search jobs → Apply → Get hired! Employers pay subscription fees, so you never pay anything.'
  },
  {
    id: '3',
    category: 'Getting Started',
    question: 'Is ZALPHA really free for students?',
    answer: 'YES! 100% FREE forever! 🎉 No subscriptions, no hidden fees, nothing. Employers pay to access our platform, which keeps it free for you. We believe every Pacific student deserves equal access to opportunities!'
  },
  {
    id: '4',
    category: 'Job Search',
    question: 'How do I find jobs?',
    answer: 'Go to Job Search and filter by location, industry, salary range, and job type. You can save jobs to apply later, and see your AI match score (0-100%) for each position. Higher match scores = better fit!'
  },
  {
    id: '5',
    category: 'Job Search',
    question: 'What is the AI match score?',
    answer: 'Our AI analyzes your profile and scores how well you match each job (0-100%). It considers your skills, education, location, certifications, and experience. Focus on jobs with 70%+ match scores for best results!'
  },
  {
    id: '6',
    category: 'Job Search',
    question: 'How do I apply for jobs?',
    answer: 'Click any job posting and hit "Apply Now". Your profile info is automatically sent to the employer. Some jobs may require additional steps like skills assessments or video interviews. Track all applications in your dashboard!'
  },
  {
    id: '7',
    category: 'Skills & Assessments',
    question: 'What are skills assessments?',
    answer: 'Gamified tests that prove your abilities to employers! Take assessments in customer service, IT, construction, hospitality, and more. Pass the tests to unlock "Verified Skills" badges that appear on your profile. Employers love these!'
  },
  {
    id: '8',
    category: 'Skills & Assessments',
    question: 'How do I take a skills assessment?',
    answer: 'Go to Student Dashboard → Skills Assessments → Choose a category. Each test is 15-30 minutes with multiple choice, scenarios, and practical questions. You need 70%+ to pass and earn your verified badge!'
  },
  {
    id: '9',
    category: 'Skills & Assessments',
    question: 'Can I retake failed assessments?',
    answer: 'Yes! You can retake assessments after 7 days. We recommend reviewing the material and practicing before retaking. Your highest score counts, and employers only see your passed assessments.'
  },
  {
    id: '10',
    category: 'Privacy & Safety',
    question: 'What if I have a problem with an employer?',
    answer: 'Use our Dispute Resolution system! Go to Settings → Report Issue and describe the problem. Our team investigates within 48 hours. For urgent safety concerns, contact support@zalpharecruit.com immediately or call our hotline.'
  },
  {
    id: '11',
    category: 'Support',
    question: 'How do I contact support?',
    answer: 'Email support@zalpharecruit.com or use the in-app chat (bottom right corner). We respond within 24 hours. For urgent issues, Premium students get priority support. You can also check our Help Center for instant answers!'
  },
  {
    id: '12',
    category: 'Support',
    question: 'What are your support hours?',
    answer: 'Email support is available 24/7. Live chat is Monday-Friday, 8 AM - 6 PM Pacific Time. Premium students have 24/7 live chat access. We\'re here to help!'
  }
];

export function ZalphaBot({ onNavigate, userName = 'there', onClose }: ZalphaBotProps) {
  // Assistant selection state - load from localStorage
  const [selectedAssistant, setSelectedAssistant] = useState<'zee' | 'zal'>(() => {
    const saved = localStorage.getItem('zalpha-assistant-preference');
    return (saved === 'zal' ? 'zal' : 'zee') as 'zee' | 'zal';
  });
  const [showAssistantSelector, setShowAssistantSelector] = useState(false);

  // Update localStorage when assistant changes
  useEffect(() => {
    localStorage.setItem('zalpha-assistant-preference', selectedAssistant);
  }, [selectedAssistant]);

  // Assistant details
  const assistantDetails = {
    zee: {
      name: 'Zee',
      emoji: '🌺',
      description: 'Your friendly orchid assistant',
      personality: 'warm, encouraging, and supportive',
      greeting: `Hey ${userName}! 👋 I'm Zee, your ZALPHA student assistant! 🌺 ZALPHA connects Gen Z and Alpha Gen Pacific Island students with amazing opportunities! I'm here to help you find jobs, update your profile, or answer any questions. What can I help you with today?`
    },
    zal: {
      name: 'Zal',
      emoji: '🌊',
      description: 'Your professional wave assistant',
      personality: 'focused, efficient, and direct',
      greeting: `Hello ${userName}! I'm Zal, your ZALPHA career assistant. 🌊 I'm here to help you navigate your professional journey efficiently. Whether you need job search assistance, profile optimization, or answers to your questions, I'm ready to help. What would you like to accomplish today?`
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: assistantDetails[selectedAssistant].greeting,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showFAQ, setShowFAQ] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Track window width for responsive behavior
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Zee's orchid animation states
  const [eyeBlink, setEyeBlink] = useState(false);
  const [petalPulse, setPetalPulse] = useState(0);

  // Petal pulse animation
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPetalPulse(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(pulseInterval);
  }, []);

  // Eye blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Dragging state
  const [chatPos, setChatPos] = useState({ 
    x: window.innerWidth / 2 - 512, 
    y: window.innerHeight / 2 - 400 
  });
  const [isDraggingChat, setIsDraggingChat] = useState(false);
  const [chatDragOffset, setChatDragOffset] = useState({ x: 0, y: 0 });

  // Resizing state
  const [chatSize, setChatSize] = useState({ width: 1024, height: 700 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 1024, height: 700 });

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Dragging and resizing handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingChat) {
        setChatPos({
          x: Math.max(0, Math.min(window.innerWidth - chatSize.width, e.clientX - chatDragOffset.x)),
          y: Math.max(0, Math.min(window.innerHeight - chatSize.height, e.clientY - chatDragOffset.y))
        });
      }
      if (isResizing) {
        const newWidth = Math.max(600, Math.min(1400, resizeStart.width + (e.clientX - resizeStart.x)));
        const newHeight = Math.max(500, Math.min(900, resizeStart.height + (e.clientY - resizeStart.y)));
        setChatSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingChat(false);
      setIsResizing(false);
    };

    if (isDraggingChat || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingChat, isResizing, chatDragOffset, chatSize, resizeStart]);

  const handleChatHeaderMouseDown = (e: React.MouseEvent) => {
    setIsDraggingChat(true);
    setChatDragOffset({
      x: e.clientX - chatPos.x,
      y: e.clientY - chatPos.y
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: chatSize.width,
      height: chatSize.height
    });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // Check for FAQ matches
    const matchingFAQ = faqs.find(faq => 
      lowerQuestion.includes(faq.question.toLowerCase().substring(0, 20)) ||
      faq.question.toLowerCase().includes(lowerQuestion.substring(0, 15))
    );

    if (matchingFAQ) {
      return matchingFAQ.answer;
    }

    // Keyword-based responses
    if (lowerQuestion.includes('job') || lowerQuestion.includes('find')) {
      if (onNavigate) onNavigate('job-search');
      return 'Perfect! Let me take you to the job search page where you can browse all available positions. You can filter by location, industry, and salary range! 🎯';
    }
    if (lowerQuestion.includes('profile') || lowerQuestion.includes('update')) {
      if (onNavigate) onNavigate('student-profile');
      return 'Great! I\'m taking you to your profile page. Make sure to complete all sections - employers love detailed profiles! Add your skills, education, and work experience. 📝';
    }
    if (lowerQuestion.includes('how') && (lowerQuestion.includes('work') || lowerQuestion.includes('zalpha'))) {
      return 'ZALPHA connects Pacific students with amazing local employers! 🌺 Here\'s how it works: Complete your profile → Search & apply for jobs → Get hired! Employers pay us, so it\'s 100% free for you. Plus, you can review companies to help other students!';
    }
    if (lowerQuestion.includes('price') || lowerQuestion.includes('cost') || lowerQuestion.includes('free')) {
      return 'ZALPHA is 100% FREE for students! 🎉 No subscriptions, no hidden fees, nothing. Employers pay subscription fees to access our platform, which keeps it free for you forever. We believe every Pacific student deserves equal access to opportunities!';
    }
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('test') || lowerQuestion.includes('assessment')) {
      return 'Skills assessments help you stand out! Take our gamified tests to show employers your abilities. It\'s fun and helps prove your skills! Pass with 70%+ to earn verified badges on your profile! 🎮';
    }
    if (lowerQuestion.includes('review')) {
      return 'Company reviews help other students! You can review companies you\'ve worked for (hired through ZALPHA only). Your reviews are verified and help keep employers accountable. Be honest and help the community! 💪';
    }
    if (lowerQuestion.includes('verify') || lowerQuestion.includes('id')) {
      return 'ID verification protects you and proves you\'re a real student! Upload your government ID + student ID. We verify within 24-48 hours. Verified students get 10x more employer views! Your IDs are encrypted and secure. 🔒';
    }
    if (lowerQuestion.includes('interview') || lowerQuestion.includes('video')) {
      return 'Some jobs require AI video interviews (Round 1)! Answer questions on camera, and our AI scores your communication and skills. If you pass (4.0+), you advance to Round 2 (live interview with employer). Practice makes perfect! 🎥';
    }
    if (lowerQuestion.includes('support') || lowerQuestion.includes('help')) {
      return 'I\'m here to help! You can also email support@zalpharecruit.com or check our FAQ section on the right. For urgent issues, we respond within 24 hours. Premium students get priority support! 📧';
    }

    return 'I\'d love to help with that! 😊 Could you tell me more about what you\'re looking for? Or check out the FAQ section on the right for quick answers!';
  };

  const handleFAQClick = (faq: FAQ) => {
    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id);
  };

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  // Zee Orchid Character Component
  const ZeeOrchidCharacter = () => {
    const scale = 1 + Math.sin(petalPulse * Math.PI / 180) * 0.05;
    
    return (
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="drop-shadow-lg">
          {/* Petals - pulsing animation */}
          <g transform={`scale(${scale})`} style={{ transformOrigin: '50px 50px' }}>
            {/* Top petal */}
            <ellipse cx="50" cy="25" rx="14" ry="20" fill="#c084fc" className="drop-shadow-md" />
            {/* Left petal */}
            <ellipse cx="25" cy="40" rx="14" ry="20" fill="#d8b4fe" transform="rotate(-60 25 40)" className="drop-shadow-md" />
            {/* Right petal */}
            <ellipse cx="75" cy="40" rx="14" ry="20" fill="#d8b4fe" transform="rotate(60 75 40)" className="drop-shadow-md" />
            {/* Bottom left petal */}
            <ellipse cx="35" cy="65" rx="12" ry="18" fill="#e9d5ff" transform="rotate(-30 35 65)" className="drop-shadow-md" />
            {/* Bottom right petal */}
            <ellipse cx="65" cy="65" rx="12" ry="18" fill="#e9d5ff" transform="rotate(30 65 65)" className="drop-shadow-md" />
          </g>
          
          {/* Center (face) */}
          <circle cx="50" cy="50" r="18" fill="#FFF" className="drop-shadow-lg" />
          
          {/* Eyes - BIG and animated */}
          <g className={`transition-transform duration-200 ${eyeBlink ? 'scale-y-0' : 'scale-y-100'}`} style={{ transformOrigin: '50px 48px' }}>
            {/* Left eye white */}
            <ellipse cx="42" cy="48" rx="6" ry="8" fill="white" />
            {/* Left eye pupil */}
            <circle cx="42" cy="48" r="4" fill="#1e293b" />
            {/* Left eye shine */}
            <circle cx="43" cy="46" r="1.5" fill="white" opacity="0.9" />
            <circle cx="41" cy="49" r="0.8" fill="white" opacity="0.7" />
            
            {/* Right eye white */}
            <ellipse cx="58" cy="48" rx="6" ry="8" fill="white" />
            {/* Right eye pupil */}
            <circle cx="58" cy="48" r="4" fill="#1e293b" />
            {/* Right eye shine */}
            <circle cx="59" cy="46" r="1.5" fill="white" opacity="0.9" />
            <circle cx="57" cy="49" r="0.8" fill="white" opacity="0.7" />
            
            {/* Eyelashes */}
            <path d="M 37 43 L 35 40" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
            <path d="M 40 42 L 39 39" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
            <path d="M 42 41 L 42 38" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
            <path d="M 44 42 L 45 39" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
            <path d="M 47 43 L 49 40" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
            
            <path d="M 53 43 L 51 40" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
            <path d="M 56 42 L 55 39" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
            <path d="M 58 41 L 58 38" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
            <path d="M 60 42 L 61 39" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
            <path d="M 63 43 L 65 40" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
          </g>
          
          {/* Smile */}
          <path
            d="M 40 56 Q 50 62 60 56"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Blush */}
          <circle cx="35" cy="54" r="3" fill="#FCA5A5" opacity="0.4" />
          <circle cx="65" cy="54" r="3" fill="#FCA5A5" opacity="0.4" />
          
          {/* Sparkles around orchid */}
          <circle cx="25" cy="25" r="1.5" fill="#c084fc" opacity="0.6" className="animate-pulse" />
          <circle cx="75" cy="25" r="2" fill="#a78bfa" opacity="0.5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="20" cy="50" r="1" fill="#d8b4fe" opacity="0.4" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
          <circle cx="80" cy="50" r="1.5" fill="#c084fc" opacity="0.5" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
        </svg>
      </div>
    );
  };

  // Handle assistant change
  const handleAssistantChange = (assistant: 'zee' | 'zal') => {
    setSelectedAssistant(assistant);
    setShowAssistantSelector(false);
    
    // Update the first message with new greeting
    setMessages([{
      id: '1',
      text: assistantDetails[assistant].greeting,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Assistant Selector Modal */}
      {showAssistantSelector && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-slate-900">Choose Your AI Assistant</h2>
              <button
                onClick={() => setShowAssistantSelector(false)}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-slate-600 mb-8">
              Select the AI assistant that best fits your style. Your choice will be saved for future sessions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Zee Option */}
              <button
                onClick={() => handleAssistantChange('zee')}
                className={`relative p-6 rounded-2xl border-4 transition-all hover:scale-105 ${
                  selectedAssistant === 'zee' 
                    ? 'border-purple-500 bg-purple-50 shadow-lg' 
                    : 'border-slate-200 bg-white hover:border-purple-300'
                }`}
              >
                {selectedAssistant === 'zee' && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                
                <div className="flex flex-col items-center text-center">
                  <div className="text-6xl mb-4">🌺</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Zee</h3>
                  <p className="text-sm text-purple-600 font-semibold mb-3">{assistantDetails.zee.description}</p>
                  <p className="text-xs text-slate-600 mb-4">
                    Personality: <span className="font-medium">{assistantDetails.zee.personality}</span>
                  </p>
                  <div className="bg-purple-100 rounded-lg p-3 text-xs text-slate-700 italic">
                    "Hey there! 👋 I'm here to make your job search fun and exciting! Let's find you the perfect opportunity together! 🌺"
                  </div>
                </div>
              </button>

              {/* Zal Option */}
              <button
                onClick={() => handleAssistantChange('zal')}
                className={`relative p-6 rounded-2xl border-4 transition-all hover:scale-105 ${
                  selectedAssistant === 'zal' 
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                {selectedAssistant === 'zal' && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                
                <div className="flex flex-col items-center text-center">
                  <div className="text-6xl mb-4">🌊</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Zal</h3>
                  <p className="text-sm text-blue-600 font-semibold mb-3">{assistantDetails.zal.description}</p>
                  <p className="text-xs text-slate-600 mb-4">
                    Personality: <span className="font-medium">{assistantDetails.zal.personality}</span>
                  </p>
                  <div className="bg-blue-100 rounded-lg p-3 text-xs text-slate-700 italic">
                    "Hello. I'm here to help you achieve your career goals efficiently. Let's focus on results."
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">
                💡 You can change your assistant anytime by clicking the settings icon (⚙️) in the chat header
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          left: isMobile ? '0' : `${chatPos.x}px`,
          top: isMobile ? '0' : `${chatPos.y}px`,
          width: isMobile ? '100%' : `${chatSize.width}px`,
          height: isMobile ? '100%' : (isMinimized ? 'auto' : `${chatSize.height}px`),
          cursor: isDraggingChat ? 'grabbing' : 'default'
        }}
        className="absolute bg-white rounded-3xl sm:rounded-3xl rounded-none shadow-2xl flex flex-col border border-slate-200/60 max-w-full max-h-full"
      >
        {/* Header - Purple Orchid Gradient */}
        <div
          onMouseDown={handleChatHeaderMouseDown}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 sm:p-6 rounded-t-3xl flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-1 sm:p-2 flex items-center justify-center">
              <ZeeOrchidCharacter />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
                Zee - Student Assistant
                <span className="text-base sm:text-lg">🌺</span>
              </h2>
              <p className="text-xs sm:text-sm text-purple-100">Your friendly AI helper!</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAssistantSelector(true);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all flex items-center justify-center"
              title="Choose AI Assistant"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {!isMobile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (chatSize.width === 1024 && chatSize.height === 700) {
                    setChatSize({ width: 800, height: 600 });
                  } else {
                    setChatSize({ width: 1024, height: 700 });
                  }
                }}
                onMouseDown={(e) => e.stopPropagation()}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all flex items-center justify-center"
                title="Toggle Size"
              >
                {chatSize.width === 1024 ? <Minimize2 className="w-4 h-4 sm:w-6 sm:h-6" /> : <Maximize2 className="w-4 h-4 sm:w-6 sm:h-6" />}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) {
                  onClose();
                } else {
                  onNavigate?.('student-dashboard');
                }
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all flex items-center justify-center"
              title="Close"
            >
              <X className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content - only show when not minimized */}
        {!isMinimized && (
          <div className="flex-1 flex overflow-hidden">
            {/* Chat Section */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-purple-50 to-white">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-slate-900 border-2 border-purple-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-purple-100' : 'text-slate-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 sm:p-4 border-t border-slate-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Zee anything..."
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50/50 text-sm sm:text-base"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 font-semibold text-sm sm:text-base"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
                <div className="hidden sm:flex items-center justify-end mt-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="px-3 py-1 text-xs text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all flex items-center gap-1 font-medium"
                    title={isMinimized ? "Maximize" : "Minimize"}
                  >
                    <Minus className="w-3 h-3" />
                    Minimize
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ Section - Hidden on mobile */}
            <div className="hidden lg:flex w-96 border-l-2 border-purple-200 flex-col bg-gradient-to-b from-purple-50 to-pink-50">
              <div className="p-4 border-b-2 border-purple-200 bg-white">
                <button
                  onClick={() => setShowFAQ(!showFAQ)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-gray-900">Frequently Asked Questions</h3>
                  </div>
                  {showFAQ ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {showFAQ && (
                <>
                  {/* Category Filter */}
                  <div className="p-4 border-b-2 border-purple-200 bg-white">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* FAQ List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {filteredFAQs.map((faq) => (
                      <div key={faq.id} className="bg-white rounded-xl border-2 border-purple-200 overflow-hidden hover:shadow-lg transition-all">
                        <button
                          onClick={() => handleFAQClick(faq)}
                          className="w-full p-4 text-left flex items-start justify-between gap-2 hover:bg-purple-50 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">{faq.question}</p>
                            <p className="text-xs text-purple-600 mt-1">{faq.category}</p>
                          </div>
                          {expandedFAQ === faq.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFAQ === faq.id && (
                          <div className="px-4 pb-4 text-sm text-gray-700 bg-purple-50/50 border-t-2 border-purple-100">
                            <p className="pt-3">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Resize Handle - only show when not minimized */}
        {!isMinimized && (
          <div
            onMouseDown={handleResizeMouseDown}
            className="absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize group z-10"
            title="Resize"
          >
            <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-purple-400 group-hover:border-purple-600 transition-colors"></div>
          </div>
        )}
      </div>
    </div>
  );
}