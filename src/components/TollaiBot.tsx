import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Home, Briefcase, User, Search, FileText, Star, Heart, Smile } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  suggestions?: string[];
}

interface ZalphaBotProps {
  onNavigate?: (page: string) => void;
  userName?: string;
}

export function TollaiBot({ onNavigate, userName = 'there' }: ZalphaBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    console.log('Close button clicked!');
    setIsOpen(false);
    setMessages([]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when first opened
      setTimeout(() => {
        addBotMessage(
          `Hiii ${userName}! 💙✨ I'm Zee, your super friendly ZALPHA assistant! 🌺 Think of me as your job-hunting bestie who's here 24/7! 🎉 I LOVE helping Pacific Island students like you find amazing opportunities! What adventure should we start with today? 🚀`,
          [
            '✨ Find my dream job!',
            '🎯 Make my profile awesome!',
            '💡 How does ZALPHA work?',
            '⭐ Check out companies',
          ]
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, suggestions?: string[]) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      suggestions,
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const addUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const getBotResponse = (userInput: string): { text: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();

    // Job search related
    if (input.includes('job') || input.includes('find') || input.includes('search')) {
      if (onNavigate) {
        setTimeout(() => onNavigate('job-search'), 1000);
        return {
          text: "Yaaaay! 🎉✨ Let's find you an AMAZING job! I'm taking you to our job search page right now! Pro tip: Companies with 🌟 ratings are student favorites! You've got this! 💪🌺",
          suggestions: ['🎨 Update profile first', '💼 Tell me job tips!', '⭐ What makes a good job?'],
        };
      }
      return {
        text: "Ooooh, job hunting time! 🎯💙 I LOVE this part! Head over to 'Find Jobs' and you'll see tons of opportunities across the beautiful Pacific islands! 🌺 Filter by location, salary, whatever you want! The world is your oyster! 🐚✨",
        suggestions: ['🎯 How to apply?', '⭐ What jobs are trending?', '💡 Give me job tips!'],
      };
    }

    // How it works
    if (input.includes('how') && (input.includes('work') || input.includes('zalpha'))) {
      return {
        text: "OMG, great question! 💙✨ ZALPHA is like magic for job hunting! Here's the scoop: ✨ Step 1: Make your profile sparkle! ✨ Step 2: Browse awesome local jobs! ✨ Step 3: Apply with one click! ✨ Step 4: Get hired and celebrate! 🎉 Best part? It's 100% FREE because employers pay us! You're basically getting VIP treatment! 👑",
        suggestions: ['🎯 Find jobs now!', '✨ Complete my profile', '💰 Wait, really free?'],
      };
    }

    // Profile related
    if (input.includes('profile') || input.includes('update')) {
      if (onNavigate) {
        setTimeout(() => onNavigate('student-profile'), 1000);
        return {
          text: "Let's make your profile SHINE! ✨💫 Did you know? Profiles with photos get 5x more views! And complete profiles? They get 3x more job offers! Let's turn you into a superstar! 🌟 Taking you there now!",
          suggestions: ['📸 Profile photo tips?', '💼 What else should I add?', '🎯 Find jobs after!'],
        };
      }
      return {
        text: "Your profile is your time to SHINE! ✨ Think of it as your personal highlight reel! Add your skills (even the cool ones!), experience, education, and don't forget a smiling photo! 😊 Employers LOVE seeing the real you! 💙",
        suggestions: ['🎨 Go to my profile!', '💡 Give me profile tips!', '📸 Photo ideas?'],
      };
    }

    // Company reviews
    if (input.includes('review') || input.includes('company') || input.includes('employer')) {
      return {
        text: "Yesss! Company reviews are SO important! 💙⭐ When you share your honest experience, you're helping your fellow Pacific Island students make awesome choices! Think of it as paying it forward! 🌺 Plus, employers actually READ these and improve based on YOUR feedback! How cool is that?! 🎉",
        suggestions: ['⭐ How do I review?', '👀 See company reviews', '💼 Find jobs instead'],
      };
    }

    // Pricing
    if (input.includes('price') || input.includes('cost') || input.includes('free') || input.includes('pay')) {
      return {
        text: "Wait for it... ZALPHA is 100% FREE for students! 🎉🎊 Like, completely free! No credit card, no surprise fees, no catch! EVER! 💙 Why? Because we believe EVERY Pacific Island student deserves equal opportunities! Employers pay us so you don't have to! You're welcome! 😊✨",
        suggestions: ['🎯 Find jobs now!', '💡 Tell me more!', '⭐ This sounds too good!'],
      };
    }

    // Location/region specific
    if (input.includes('where') || input.includes('location') || input.includes('guam') || input.includes('cnmi') || input.includes('saipan') || input.includes('hawaii') || input.includes('fsm')) {
      return {
        text: "We cover the ENTIRE beautiful Pacific! 🌊✨ From Guam to CNMI, Hawaii to FSM, Palau to Marshall Islands - we've got jobs EVERYWHERE! 🗺️💙 You can stay close to home, near family, and still find amazing opportunities! Island life + dream job = perfection! 🌺🎉",
        suggestions: ['🗺️ Filter by my island!', '💼 Jobs near me?', '🎯 Start searching!'],
      };
    }

    // Help/support
    if (input.includes('help') || input.includes('support') || input.includes('stuck') || input.includes('confused')) {
      return {
        text: "Awww, don't worry! I'm RIGHT here for you! 💙🤗 Think of me as your 24/7 job-hunting buddy! We can: Search for your dream job ✨ Upgrade your profile 🎯 Review companies ⭐ Or explore training! Whatever you need, I'm here! What sounds good? 😊",
        suggestions: ['💼 Find jobs!', '✨ Fix my profile', '⭐ Review companies', '📚 Training stuff'],
      };
    }

    // Thank you / positive feedback
    if (input.includes('thank') || input.includes('thanks') || input.includes('awesome') || input.includes('great') || input.includes('cool')) {
      return {
        text: "Awwww, you're so sweet! 💙🥰 You just made my day! I'm here whenever you need me! Now go get that dream job and show the world how amazing you are! You've got this! 🌟✨🎉",
        suggestions: ['💼 Find more jobs!', '✨ Update something else?', '👋 Chat later!'],
      };
    }

    // Fallback response
    return {
      text: "Hmm, I want to make sure I help you with EXACTLY what you need! 💙✨ Could you tell me a bit more? Or pick one of these super helpful options below! I'm all ears! 😊🌺",
      suggestions: ['💼 Find dream jobs!', '✨ Update my profile', '⭐ Review companies', '💡 How ZALPHA works'],
    };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    addUserMessage(userText);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      setIsTyping(false);
      const response = getBotResponse(userText);
      addBotMessage(response.text, response.suggestions);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getBotResponse(suggestion);
      addBotMessage(response.text, response.suggestions);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Chat Bot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group z-[100] animate-pulse hover:animate-none"
          aria-label="Open ZALPHA Assistant"
        >
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-180 transition-transform duration-500" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-white flex items-center justify-center text-xs animate-bounce">
            💙
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 h-[380px] sm:h-[420px] max-w-md bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl shadow-2xl flex flex-col z-[100] border-4 border-white">
          {/* Close Button - Absolutely Positioned */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-xl z-10 flex items-center justify-center transition-all hover:scale-110"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-3 sm:p-4 rounded-t-2xl flex items-center justify-between relative overflow-hidden">
            {/* Sparkle animation background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className="absolute top-2 left-4 w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="absolute bottom-3 right-8 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
            </div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-pink-300 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  Zee 
                  <Heart className="w-4 h-4 text-pink-200 fill-pink-200 animate-pulse" />
                </h3>
                <p className="text-xs text-white/90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  Your BFF in job hunting! 💙
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-purple-50/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white text-slate-800 border-2 border-purple-200 shadow-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  {message.suggestions && (
                    <div className="mt-2 space-y-1.5">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left px-3 py-2 text-xs bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 border-2 border-purple-300 text-purple-700 font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-md"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-purple-200 rounded-2xl px-4 py-3 shadow-md">
                  <div className="flex gap-1.5 items-center">
                    <span className="text-sm text-purple-600 mr-2">Zee is typing</span>
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t-2 border-purple-200 bg-white rounded-b-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Chat with Zee... ✨"
                className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-purple-50/50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-purple-500 mt-2 text-center font-medium flex items-center justify-center gap-1">
              <Smile className="w-3 h-3" />
              Zee is powered by AI & love! 💙✨
            </p>
          </div>
        </div>
      )}
    </>
  );
}