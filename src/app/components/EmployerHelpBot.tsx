import { useState, useRef, useEffect } from 'react';
import { X, Send, HelpCircle, ChevronDown, ChevronUp, Sparkles, Minus, Maximize2, Minimize2 } from 'lucide-react';

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

interface EmployerHelpBotProps {
  onClose: () => void;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Getting Started',
    question: 'How do I post my first job?',
    answer: 'To post your first job, go to your Employer Dashboard and click the "Post New Job" button. Fill in the job details including title, description, requirements, salary range, and location. Your job will be visible to verified students immediately after posting.'
  },
  {
    id: '1b',
    category: 'Getting Started',
    question: 'How does AI talent matching work?',
    answer: 'Our AI analyzes your job requirements and automatically matches candidates based on skills, location, education, certifications, and job type preferences. You can view AI match scores (0-100%) for each candidate to quickly identify top talent.'
  },
  {
    id: '1c',
    category: 'Getting Started',
    question: 'How do AI video interviews work?',
    answer: 'Enable AI interviews when posting a job. Candidates complete a 15-30 minute video interview with our AI interviewer. The AI analyzes communication skills, technical knowledge, cultural fit, and enthusiasm. Passing candidates (4.0+ score) are automatically recommended for human interviews with your hiring team.'
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'What subscription plan should I choose?',
    answer: 'We offer three plans: Starter ($99/month) for basic job posting, Professional ($249/month) with advanced analytics and priority support, and Ultra Premium ($499/month) with full access to skills assessments, unlimited job posts, and dedicated account manager.'
  },
  {
    id: '3',
    category: 'Subscription & Billing',
    question: 'How do I upgrade my subscription?',
    answer: 'Navigate to Settings > Subscription and click "Upgrade Plan". You can switch between plans at any time. Upgrades take effect immediately, and you\'ll be charged the prorated difference.'
  },
  {
    id: '4',
    category: 'Subscription & Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept Stripe (credit/debit cards), PayPal, and cryptocurrency payments. All transactions are secure and encrypted.'
  },
  {
    id: '5',
    category: 'Candidates',
    question: 'How are students verified?',
    answer: 'All students undergo dual ID verification (government ID + student ID) and age verification (18+ years, graduated within 1 year). This ensures you\'re connecting with legitimate, qualified candidates from the Western Pacific region.'
  },
  {
    id: '6',
    category: 'Candidates',
    question: 'Can I access student skills assessments?',
    answer: 'Yes! Ultra Premium subscribers have full access to our gamified skills assessment results. This helps you identify top talent based on verified skills rather than just resumes.'
  },
  {
    id: '6b',
    category: 'AI Interviews',
    question: 'What is the AI interview process?',
    answer: 'When you enable AI interviews for a job posting, candidates are invited to complete Round 1 (AI Interview). Our AI interviewer asks job-specific questions and evaluates responses. Candidates who score 4.0+ are automatically flagged as "Recommended for Round 2" and you can schedule live interviews with your hiring team.'
  },
  {
    id: '6c',
    category: 'AI Interviews',
    question: 'How accurate is the AI interview scoring?',
    answer: 'Our AI interviewer has 95% accuracy compared to human recruiters. It evaluates: Communication Skills (clarity, professionalism), Technical Knowledge (job-specific), Cultural Fit (values alignment), Enthusiasm (motivation level), and identifies Red Flags (concerning responses). Scores range from 0-5.'
  },
  {
    id: '6d',
    category: 'AI Interviews',
    question: 'Can I schedule automatic Round 2 interviews?',
    answer: 'Yes! In your Video Interviews dashboard, candidates who pass AI screening show a "Schedule Round 2 Interview" button. You can set up automatic calendar invites for live interviews with your hiring managers. Integration with Google Calendar, Outlook, and Zoom available.'
  },
  {
    id: '6e',
    category: 'AI Interviews',
    question: 'What questions does the AI interviewer ask?',
    answer: 'The AI customizes questions based on your job posting. For example: Customer Service roles = situational questions, conflict resolution scenarios. Construction = safety knowledge, physical fitness confirmation. IT roles = technical problem-solving, software experience. You can also add custom questions.'
  },
  {
    id: '6f',
    category: 'AI Interviews',
    question: 'Can I allow candidates to retake AI interviews?',
    answer: 'Yes! You control the retake policy when scheduling AI interviews. Options: (1) No retakes - one attempt only, (2) 1-3 retakes allowed, or (3) Unlimited retakes. Retakes require 24-hour wait between attempts, AI asks different questions each time, and only the highest score counts for Round 2 advancement. Pro Tip: Allowing retakes reduces bias and helps discover hidden talent!'
  },
  {
    id: '7',
    category: 'Features',
    question: 'What is the company review system?',
    answer: 'Students can leave verified reviews about their experience working with your company. Only students who have been hired through ZALPHA can leave reviews, ensuring authenticity. Good reviews help attract top talent!'
  },
  {
    id: '8',
    category: 'Features',
    question: 'How does ZALPHA ATS integration work?',
    answer: 'ZALPHA has a built-in Applicant Tracking System (ATS) that automatically syncs with your account. You can track candidates, manage applications, and organize your hiring pipeline all in one place. Advanced features available on Professional and Ultra Premium plans.'
  },
  {
    id: '9',
    category: 'Legal & Compliance',
    question: 'What are the non-discrimination policies?',
    answer: 'All employers must agree to our non-discrimination policy. You cannot discriminate based on gender, sex, age, physical characteristics, race, religion, or any protected class. Violations result in immediate account suspension.'
  },
  {
    id: '10',
    category: 'Legal & Compliance',
    question: 'What is the hold harmless agreement?',
    answer: 'By using ZALPHA, you agree to hold KI Executive Group and its subsidiaries harmless from any claims, damages, or disputes arising from your use of the platform or interactions with candidates.'
  },
  {
    id: '11',
    category: 'Support',
    question: 'How do I contact support?',
    answer: 'Professional and Ultra Premium subscribers have access to priority support via email, chat, and phone. Starter plan users can email support@zalpharecruit.com. Ultra Premium subscribers get a dedicated account manager.'
  },
  {
    id: '12',
    category: 'Support',
    question: 'What are your business hours?',
    answer: 'Our support team is available Monday-Friday, 8 AM - 6 PM Pacific Time. Ultra Premium subscribers have 24/7 emergency support access.'
  }
];

export function EmployerHelpBot({ onClose }: EmployerHelpBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey there! 👋🌊 I\'m Zal, your super friendly ZALPHA Employer Assistant! Think of me as your hiring sidekick who\'s here to help you find the BEST Pacific Island talent! 🌺 I can answer questions about posting jobs, AI interviews, subscriptions, and more! What can I help you with today? 🚀',
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

  // Zal's wave animation states
  const [eyeBlink, setEyeBlink] = useState(false);
  const [wavePhase, setWavePhase] = useState(0);

  // Wave animation
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWavePhase(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(waveInterval);
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
    x: Math.max(0, window.innerWidth / 2 - 400), 
    y: Math.max(0, window.innerHeight / 2 - 300) 
  });
  const [isDraggingChat, setIsDraggingChat] = useState(false);
  const [chatDragOffset, setChatDragOffset] = useState({ x: 0, y: 0 });

  // Resizing state
  const [chatSize, setChatSize] = useState({ width: 800, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 800, height: 600 });

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
    if (lowerQuestion.includes('post') && lowerQuestion.includes('job')) {
      return 'To post a job, go to your dashboard and click "Post New Job". Fill in the details and your job will be live immediately!';
    }
    if (lowerQuestion.includes('ai') && (lowerQuestion.includes('interview') || lowerQuestion.includes('match'))) {
      return 'AI Interviews: Enable when posting jobs. Candidates complete video interviews with our AI, which scores them on communication, technical skills, cultural fit, and enthusiasm. Passing candidates (4.0+) are recommended for Round 2 live interviews. AI Matching: Our system automatically matches candidates to your jobs with scores 0-100% based on skills, location, and qualifications.';
    }
    if (lowerQuestion.includes('round 2') || lowerQuestion.includes('second interview') || lowerQuestion.includes('live interview')) {
      return 'After candidates pass AI screening (Round 1), you can schedule Round 2 live interviews. Go to Video Interviews dashboard, click on passing candidates, and select "Schedule Round 2 Interview". You can sync with your calendar and send automatic Zoom/Teams invites.';
    }
    if (lowerQuestion.includes('talent match') || lowerQuestion.includes('find candidate')) {
      return 'Our AI talent matching analyzes your job requirements and scores candidates 0-100% based on skills match, location fit, education level, certifications, and work history. Higher scores = better matches. You can filter candidates by match score to find top talent quickly.';
    }
    if (lowerQuestion.includes('price') || lowerQuestion.includes('cost') || lowerQuestion.includes('subscription')) {
      return 'We offer three plans: Starter ($99/month), Professional ($249/month), and Ultra Premium ($499/month). Each plan offers different features to meet your hiring needs.';
    }
    if (lowerQuestion.includes('candidate') || lowerQuestion.includes('student')) {
      return 'All students on ZALPHA are verified with dual ID checks and age verification. You can search candidates, view their profiles, and invite them to apply to your jobs.';
    }
    if (lowerQuestion.includes('support') || lowerQuestion.includes('help')) {
      return 'Professional and Ultra Premium subscribers get priority support. You can contact us at support@zalpharecruit.com or use the in-app chat. Ultra Premium subscribers have 24/7 access.';
    }

    return 'I\'m here to help! Could you please provide more details about your question? You can also browse our FAQ section below for common topics.';
  };

  const handleFAQClick = (faq: FAQ) => {
    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id);
  };

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  // Zal Wave Character Component
  const ZalWaveCharacter = () => {
    const waveOffset = Math.sin(wavePhase * Math.PI / 180) * 5;
    
    return (
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="drop-shadow-lg">
          {/* Wave body - animated ocean wave */}
          <path
            d={`M 20 ${50 + waveOffset} Q 30 ${40 + waveOffset} 40 ${50 + waveOffset * 0.8} T 60 ${50 + waveOffset * 0.6} T 80 ${50 + waveOffset * 0.4} L 80 ${70 + waveOffset} Q 70 ${75 + waveOffset * 0.5} 60 ${70 + waveOffset * 0.6} T 40 ${70 + waveOffset * 0.8} T 20 ${70 + waveOffset} Z`}
            fill="url(#waveGradient)"
            className="drop-shadow-md"
          />
          
          {/* Wave crest - foam/white cap */}
          <path
            d={`M 22 ${52 + waveOffset} Q 32 ${42 + waveOffset} 42 ${52 + waveOffset * 0.8} T 62 ${52 + waveOffset * 0.6} T 78 ${52 + waveOffset * 0.4}`}
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
          
          {/* Second wave crest layer for depth */}
          <path
            d={`M 25 ${55 + waveOffset} Q 35 ${48 + waveOffset} 45 ${55 + waveOffset * 0.8}`}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#0e7490" />
            </linearGradient>
          </defs>
          
          {/* Eyes - BIG and animated */}
          <g className={`transition-transform duration-200 ${eyeBlink ? 'scale-y-0' : 'scale-y-100'}`} style={{ transformOrigin: '50px 55px' }}>
            {/* Left eye white */}
            <ellipse cx="35" cy="55" rx="12" ry="14" fill="white" />
            {/* Left eye pupil */}
            <circle cx="35" cy="55" r="7" fill="#1e293b" />
            {/* Left eye shine */}
            <circle cx="37" cy="52" r="3" fill="white" opacity="0.9" />
            <circle cx="33" cy="57" r="1.5" fill="white" opacity="0.7" />
            
            {/* Right eye white */}
            <ellipse cx="65" cy="55" rx="12" ry="14" fill="white" />
            {/* Right eye pupil */}
            <circle cx="65" cy="55" r="7" fill="#1e293b" />
            {/* Right eye shine */}
            <circle cx="67" cy="52" r="3" fill="white" opacity="0.9" />
            <circle cx="63" cy="57" r="1.5" fill="white" opacity="0.7" />
            
            {/* Eyelashes */}
            <path d="M 24 48 L 22 45" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 28 46 L 27 43" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 33 45 L 33 42" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 38 46 L 39 43" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 42 48 L 44 45" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            
            <path d="M 58 48 L 56 45" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 62 46 L 61 43" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 67 45 L 67 42" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 72 46 L 73 43" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 76 48 L 78 45" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          
          {/* Smile - animated curve */}
          <path
            d={`M 30 ${68 + waveOffset * 0.3} Q 50 ${75 + waveOffset * 0.5} 70 ${68 + waveOffset * 0.3}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Smile highlight/shine */}
          <path
            d={`M 32 ${68 + waveOffset * 0.3} Q 50 ${74 + waveOffset * 0.5} 68 ${68 + waveOffset * 0.3}`}
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.4"
          />
          
          {/* Water droplets for extra personality */}
          <circle cx="15" cy={`${45 + waveOffset * 1.2}`} r="2" fill="#67e8f9" opacity="0.7" className="animate-pulse" />
          <circle cx="85" cy={`${48 + waveOffset * 0.8}`} r="2.5" fill="#67e8f9" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="50" cy={`${35 + waveOffset * 1.5}`} r="1.5" fill="#67e8f9" opacity="0.8" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
        </svg>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] flex items-center justify-center p-4 md:p-0">
      <div
        style={{
          left: `${chatPos.x}px`,
          top: `${chatPos.y}px`,
          width: `${chatSize.width}px`,
          height: isMinimized ? 'auto' : `${chatSize.height}px`,
          cursor: isDraggingChat ? 'grabbing' : 'default'
        }}
        className="absolute bg-white rounded-3xl shadow-2xl flex flex-col border border-slate-200/60 max-w-[95vw]"
      >
        {/* Header - Ocean Wave Gradient */}
        <div
          onMouseDown={handleChatHeaderMouseDown}
          className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-white p-6 rounded-t-3xl flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2 flex items-center justify-center">
              <ZalWaveCharacter />
            </div>
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                Zal - Employer Assistant
                <span className="text-lg">🌊</span>
              </h2>
              <p className="text-sm text-cyan-100">Your friendly AI helper!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (chatSize.width === 800 && chatSize.height === 600) {
                  setChatSize({ width: 1024, height: 700 });
                } else {
                  setChatSize({ width: 800, height: 600 });
                }
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all flex items-center justify-center"
              title="Toggle Size"
            >
              {chatSize.width === 800 ? <Maximize2 className="w-6 h-6" /> : <Minimize2 className="w-6 h-6" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all flex items-center justify-center"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content - only show when not minimized */}
        {!isMinimized && (
          <div className="flex-1 flex overflow-hidden">
            {/* Chat Section */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-cyan-50 to-white">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                          : 'bg-white text-slate-900 border-2 border-cyan-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-cyan-100' : 'text-slate-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Zal anything..."
                    className="flex-1 px-4 py-3 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-cyan-50/50"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 font-semibold"
                  >
                    <Send className="w-5 h-5" />
                    Send
                  </button>
                </div>
                <div className="flex items-center justify-end mt-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="px-3 py-1 text-xs text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all flex items-center gap-1 font-medium"
                    title={isMinimized ? "Maximize" : "Minimize"}
                  >
                    <Minus className="w-3 h-3" />
                    Minimize
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="w-96 border-l-2 border-cyan-200 flex flex-col bg-gradient-to-b from-cyan-50 to-blue-50">
              <div className="p-4 border-b-2 border-cyan-200 bg-white">
                <button
                  onClick={() => setShowFAQ(!showFAQ)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-cyan-600" />
                    <h3 className="font-bold text-gray-900">Frequently Asked Questions</h3>
                  </div>
                  {showFAQ ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {showFAQ && (
                <>
                  {/* Category Filter */}
                  <div className="p-4 border-b-2 border-cyan-200 bg-white">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
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
                      <div key={faq.id} className="bg-white rounded-xl border-2 border-cyan-200 overflow-hidden hover:shadow-lg transition-all">
                        <button
                          onClick={() => handleFAQClick(faq)}
                          className="w-full p-4 text-left flex items-start justify-between gap-2 hover:bg-cyan-50 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">{faq.question}</p>
                            <p className="text-xs text-cyan-600 mt-1">{faq.category}</p>
                          </div>
                          {expandedFAQ === faq.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFAQ === faq.id && (
                          <div className="px-4 pb-4 text-sm text-gray-700 bg-cyan-50/50 border-t-2 border-cyan-100">
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
            <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-cyan-400 group-hover:border-cyan-600 transition-colors"></div>
          </div>
        )}
      </div>
    </div>
  );
}