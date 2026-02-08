import { useState, useEffect } from 'react';
import { Sparkles, X, Send, Wand2, MessageCircle } from 'lucide-react';

interface ZeeOrchidBotProps {
  onSuggestion?: (suggestion: AssessmentSuggestion) => void;
  jobTitle?: string;
  jobCategory?: string;
}

interface AssessmentSuggestion {
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  questions: Array<{
    type: string;
    question: string;
    options?: string[];
    correctAnswer?: number;
    points: number;
  }>;
}

export function ZeeOrchidBot({ onSuggestion, jobTitle, jobCategory }: ZeeOrchidBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{ role: 'zee' | 'user'; text: string }>>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [eyeBlink, setEyeBlink] = useState(false);

  // Eyelash batting animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 200);
    }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  // Welcome message when opened
  useEffect(() => {
    if (isOpen && conversation.length === 0) {
      setConversation([{
        role: 'zee',
        text: `Hi there! 🌺 I'm Zee, your AI assessment helper! I'm here to make creating tests super easy and fun! 

I noticed you're creating ${jobTitle ? `a "${jobTitle}"` : 'a job posting'}. Would you like me to help you create a custom assessment that's perfect for entry-level Pacific Island students?

Just tell me what skills you want to test, and I'll create awesome questions for you! 💜✨`
      }]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = message;
    setConversation(prev => [...prev, { role: 'user', text: userMessage }]);
    setMessage('');
    setIsThinking(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateZeeResponse(userMessage, jobTitle, jobCategory);
      setConversation(prev => [...prev, { role: 'zee', text: response.text }]);
      
      if (response.suggestion) {
        onSuggestion?.(response.suggestion);
      }
      
      setIsThinking(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Floating Zee Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-[45] flex items-center justify-center group animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          {/* Orchid Character */}
          <div className="relative scale-75 sm:scale-90 md:scale-100">
            {/* Petals */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <svg width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-lg w-10 h-10 sm:w-12 sm:h-12 md:w-[60px] md:h-[60px]">
                {/* Top petal */}
                <ellipse cx="30" cy="15" rx="12" ry="18" fill="#E879F9" transform="rotate(-10 30 15)" className="animate-pulse" style={{ animationDuration: '2s' }} />
                {/* Left petal */}
                <ellipse cx="15" cy="25" rx="12" ry="18" fill="#F0ABFC" transform="rotate(-50 15 25)" className="animate-pulse" style={{ animationDuration: '2.3s' }} />
                {/* Right petal */}
                <ellipse cx="45" cy="25" rx="12" ry="18" fill="#F0ABFC" transform="rotate(50 45 25)" className="animate-pulse" style={{ animationDuration: '2.1s' }} />
                {/* Bottom left petal */}
                <ellipse cx="20" cy="35" rx="10" ry="16" fill="#DDA0DD" transform="rotate(-30 20 35)" className="animate-pulse" style={{ animationDuration: '2.4s' }} />
                {/* Bottom right petal */}
                <ellipse cx="40" cy="35" rx="10" ry="16" fill="#DDA0DD" transform="rotate(30 40 35)" className="animate-pulse" style={{ animationDuration: '2.2s' }} />
                
                {/* Center (face) */}
                <circle cx="30" cy="28" r="14" fill="#FFF" className="drop-shadow-md" />
                
                {/* Eyes with batting lashes */}
                <g className={`transition-transform duration-200 ${eyeBlink ? 'scale-y-0' : 'scale-y-100'}`} style={{ transformOrigin: '30px 26px' }}>
                  {/* Left eye */}
                  <circle cx="24" cy="26" r="3.5" fill="#1F2937" />
                  <circle cx="25" cy="25" r="1.5" fill="#FFF" className="animate-pulse" />
                  
                  {/* Right eye */}
                  <circle cx="36" cy="26" r="3.5" fill="#1F2937" />
                  <circle cx="37" cy="25" r="1.5" fill="#FFF" className="animate-pulse" />
                  
                  {/* Eyelashes - Left Eye */}
                  <path d="M 21 23 Q 20 21 19 22" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  <path d="M 22 22 Q 21 20 20 21" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  <path d="M 23 22 Q 22.5 19.5 22 20.5" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  <path d="M 25 22 Q 25 19.5 25.5 20.5" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  <path d="M 26 22.5 Q 26.5 20 27 21" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  
                  {/* Eyelashes - Right Eye */}
                  <path d="M 33 22.5 Q 32.5 20 32 21" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  <path d="M 35 22 Q 35 19.5 34.5 20.5" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  <path d="M 37 22 Q 37.5 19.5 38 20.5" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  <path d="M 38 22 Q 39 20 40 21" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  <path d="M 39 23 Q 40 21 41 22" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                </g>
                
                {/* Smile */}
                <path d="M 24 32 Q 30 35 36 32" stroke="#E879F9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                
                {/* Blush */}
                <circle cx="19" cy="30" r="2.5" fill="#FCA5A5" opacity="0.5" />
                <circle cx="41" cy="30" r="2.5" fill="#FCA5A5" opacity="0.5" />
              </svg>
            </div>
          </div>
          
          {/* Sparkles */}
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Hi! I'm Zee 🌺 Click me for help!
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-w-md h-[70vh] sm:h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border-4 border-purple-300 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mini Zee */}
              <div className="relative w-12 h-12">
                <svg width="48" height="48" viewBox="0 0 60 60">
                  {/* Simplified petals */}
                  <ellipse cx="30" cy="15" rx="10" ry="15" fill="#E879F9" transform="rotate(-10 30 15)" />
                  <ellipse cx="15" cy="25" rx="10" ry="15" fill="#F0ABFC" transform="rotate(-50 15 25)" />
                  <ellipse cx="45" cy="25" rx="10" ry="15" fill="#F0ABFC" transform="rotate(50 45 25)" />
                  <circle cx="30" cy="28" r="12" fill="#FFF" />
                  
                  {/* Batting eyes */}
                  <g className={`transition-transform duration-200 ${eyeBlink ? 'scale-y-0' : 'scale-y-100'}`} style={{ transformOrigin: '30px 26px' }}>
                    <circle cx="24" cy="26" r="3" fill="#1F2937" />
                    <circle cx="25" cy="25" r="1.2" fill="#FFF" className="animate-pulse" />
                    <circle cx="36" cy="26" r="3" fill="#1F2937" />
                    <circle cx="37" cy="25" r="1.2" fill="#FFF" className="animate-pulse" />
                    
                    {/* Simplified lashes */}
                    <path d="M 21 23 Q 20 21 19 22 M 26 22.5 Q 26.5 20 27 21" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                    <path d="M 33 22.5 Q 32.5 20 32 21 M 39 23 Q 40 21 41 22" stroke="#1F2937" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  </g>
                  
                  <path d="M 24 32 Q 30 34 36 32" stroke="#E879F9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              
              <div>
                <h3 className="font-bold text-white text-lg">Zee 🌺</h3>
                <p className="text-purple-100 text-xs">Your AI Assessment Helper</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-purple-50 to-pink-50">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {msg.role === 'zee' && (
                  <div className="w-8 h-8 flex-shrink-0">
                    <svg width="32" height="32" viewBox="0 0 60 60">
                      <ellipse cx="30" cy="20" rx="8" ry="12" fill="#E879F9" />
                      <circle cx="30" cy="28" r="10" fill="#FFF" />
                      <circle cx="26" cy="26" r="2.5" fill="#1F2937" />
                      <circle cx="34" cy="26" r="2.5" fill="#1F2937" />
                      <path d="M 26 32 Q 30 34 34 32" stroke="#E879F9" strokeWidth="1.2" fill="none" />
                    </svg>
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-900 shadow-md border-2 border-purple-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isThinking && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 flex-shrink-0 animate-bounce">
                  <svg width="32" height="32" viewBox="0 0 60 60">
                    <ellipse cx="30" cy="20" rx="8" ry="12" fill="#E879F9" />
                    <circle cx="30" cy="28" r="10" fill="#FFF" />
                    <circle cx="26" cy="26" r="2.5" fill="#1F2937" />
                    <circle cx="34" cy="26" r="2.5" fill="#1F2937" />
                    <path d="M 26 32 Q 30 34 34 32" stroke="#E879F9" strokeWidth="1.2" fill="none" />
                  </svg>
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md border-2 border-purple-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {conversation.length <= 1 && !isThinking && (
            <div className="px-4 py-2 bg-purple-50 border-t-2 border-purple-200">
              <p className="text-xs text-purple-700 font-semibold mb-2">✨ Quick Actions:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickAction('Create a basic 5-question assessment')}
                  className="px-3 py-1.5 bg-white text-purple-700 text-xs rounded-full hover:bg-purple-100 transition-all border border-purple-300 font-semibold"
                >
                  🎯 Basic Test (5Q)
                </button>
                <button
                  onClick={() => handleQuickAction('Create a skills assessment for graphic design')}
                  className="px-3 py-1.5 bg-white text-purple-700 text-xs rounded-full hover:bg-purple-100 transition-all border border-purple-300 font-semibold"
                >
                  🎨 Design Skills
                </button>
                <button
                  onClick={() => handleQuickAction('Create a writing assessment')}
                  className="px-3 py-1.5 bg-white text-purple-700 text-xs rounded-full hover:bg-purple-100 transition-all border border-purple-300 font-semibold"
                >
                  ✍️ Writing Test
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t-2 border-purple-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask Zee for help... 🌺"
                className="flex-1 px-4 py-2 border-2 border-purple-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                disabled={isThinking}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isThinking}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// AI Response Generator
function generateZeeResponse(userMessage: string, jobTitle?: string, jobCategory?: string): {
  text: string;
  suggestion?: AssessmentSuggestion;
} {
  const msg = userMessage.toLowerCase();
  
  // Graphic Design
  if (msg.includes('design') || msg.includes('graphic') || msg.includes('photoshop') || msg.includes('illustrator')) {
    return {
      text: `Perfect! 🎨✨ I'll create a Graphic Design assessment that tests their Adobe Creative Suite skills!

This assessment will have:
• 5 multiple choice questions about design tools
• 1 short answer about design principles
• 1 file upload for a portfolio sample

It's designed for entry-level students, so it's beginner-friendly but still tests real skills! The passing score is 70%, and they'll have 30 minutes.

Should I add these questions to your assessment now? 💜`,
      suggestion: {
        title: 'Graphic Design Skills Assessment',
        description: 'Test candidates on Adobe Creative Suite and basic design principles',
        timeLimit: 30,
        passingScore: 70,
        questions: [
          {
            type: 'multiple-choice',
            question: 'Which Adobe tool is primarily used for photo editing and manipulation?',
            options: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Adobe XD'],
            correctAnswer: 1,
            points: 10
          },
          {
            type: 'multiple-choice',
            question: 'What does RGB stand for in color theory?',
            options: ['Red, Green, Blue', 'Red, Gray, Black', 'Real Good Beautiful', 'Retro Gradient Bright'],
            correctAnswer: 0,
            points: 10
          },
          {
            type: 'multiple-choice',
            question: 'Which file format is best for logos that need to scale without losing quality?',
            options: ['JPG', 'PNG', 'SVG', 'GIF'],
            correctAnswer: 2,
            points: 10
          },
          {
            type: 'multiple-choice',
            question: 'What is the purpose of layers in Photoshop?',
            options: [
              'To make the file bigger',
              'To organize and edit different elements separately',
              'To add more colors',
              'To print faster'
            ],
            correctAnswer: 1,
            points: 10
          },
          {
            type: 'multiple-choice',
            question: 'Which tool would you use to remove a background from an image?',
            options: ['Brush Tool', 'Magic Wand / Quick Selection', 'Text Tool', 'Blur Tool'],
            correctAnswer: 1,
            points: 10
          },
          {
            type: 'short-answer',
            question: 'In 2-3 sentences, explain what "visual hierarchy" means in graphic design.',
            points: 20
          },
          {
            type: 'file-upload',
            question: 'Please upload a sample of your design work (logo, social media graphic, or any design project)',
            points: 30
          }
        ]
      }
    };
  }
  
  // Writing/Content
  if (msg.includes('writing') || msg.includes('content') || msg.includes('blog') || msg.includes('seo')) {
    return {
      text: `Awesome! ✍️✨ I'll create a Writing & Content assessment perfect for testing their writing skills!

This assessment includes:
• Grammar and writing fundamentals
• SEO knowledge
• A short writing sample

It's beginner-friendly for Pacific Island students but tests real-world skills they'll need! 30 minutes, 70% passing score.

Ready to add these questions? 💜`,
      suggestion: {
        title: 'Writing & Content Skills Assessment',
        description: 'Test writing ability, grammar, and basic SEO knowledge',
        timeLimit: 30,
        passingScore: 70,
        questions: [
          {
            type: 'multiple-choice',
            question: 'Which sentence is grammatically correct?',
            options: [
              'Me and Sarah went to the store',
              'Sarah and I went to the store',
              'Sarah and me went to the store',
              'I and Sarah went to the store'
            ],
            correctAnswer: 1,
            points: 10
          },
          {
            type: 'multiple-choice',
            question: 'What does SEO stand for?',
            options: [
              'Social Engine Optimization',
              'Search Engine Optimization',
              'Site Easy Operations',
              'Simple Email Outreach'
            ],
            correctAnswer: 1,
            points: 10
          },
          {
            type: 'multiple-choice',
            question: 'Which is an example of active voice (preferred in most writing)?',
            options: [
              'The ball was thrown by the player',
              'The player threw the ball',
              'The ball had been thrown',
              'A ball was being thrown'
            ],
            correctAnswer: 1,
            points: 10
          },
          {
            type: 'true-false',
            question: 'A blog post should typically be at least 300 words for good SEO.',
            correctAnswer: 0, // True
            points: 10
          },
          {
            type: 'essay',
            question: 'Write a short blog introduction (150-200 words) about "The Best Tourist Spots in the Pacific Islands". Make it engaging and SEO-friendly.',
            points: 60
          }
        ]
      }
    };
  }
  
  // Basic/General
  if (msg.includes('basic') || msg.includes('simple') || msg.includes('5') || msg.includes('general')) {
    return {
      text: `Got it! 🎯✨ I'll create a simple but effective 5-question assessment!

This will test:
• Basic communication skills
• Attention to detail
• Problem-solving
• Professionalism

Super beginner-friendly, perfect for entry-level students! 20 minutes, 60% passing score (nice and achievable).

Should I add it now? 💜`,
      suggestion: {
        title: 'Basic Skills Assessment',
        description: 'General assessment for entry-level positions',
        timeLimit: 20,
        passingScore: 60,
        questions: [
          {
            type: 'multiple-choice',
            question: 'A client emails you at 5 PM asking for a project update. What should you do?',
            options: [
              'Ignore it until tomorrow',
              'Reply acknowledging the email and let them know when you can provide the update',
              'Send a one-word response',
              'Mark it as spam'
            ],
            correctAnswer: 1,
            points: 20
          },
          {
            type: 'multiple-choice',
            question: 'You don\'t understand a task your employer assigned. What should you do?',
            options: [
              'Guess and hope you get it right',
              'Ask questions to clarify before starting',
              'Skip it and do something else',
              'Wait for them to notice'
            ],
            correctAnswer: 1,
            points: 20
          },
          {
            type: 'true-false',
            question: 'It\'s okay to miss deadlines as long as you let your employer know in advance.',
            correctAnswer: 1, // False
            points: 20
          },
          {
            type: 'short-answer',
            question: 'Describe a time when you had to learn something new quickly. How did you approach it?',
            points: 20
          },
          {
            type: 'short-answer',
            question: 'Why are you interested in this position? (2-3 sentences)',
            points: 20
          }
        ]
      }
    };
  }
  
  // Social Media
  if (msg.includes('social') || msg.includes('media') || msg.includes('instagram') || msg.includes('facebook')) {
    return {
      text: `Perfect for social media! 📱✨ I'll create an assessment testing their social media skills!

This includes:
• Platform knowledge
• Content strategy
• Engagement tactics
• A creative challenge

Great for finding students who understand social media! 25 minutes, 70% passing.

Ready to add it? 💜`,
      suggestion: {
        title: 'Social Media Management Assessment',
        description: 'Test knowledge of social media platforms and content strategy',
        timeLimit: 25,
        passingScore: 70,
        questions: [
          {
            type: 'multiple-choice',
            question: 'What is the recommended image size for Instagram posts?',
            options: ['800x800px', '1080x1080px', '1200x1200px', '500x500px'],
            correctAnswer: 1,
            points: 15
          },
          {
            type: 'multiple-choice',
            question: 'What is "engagement rate" in social media?',
            options: [
              'Number of followers only',
              'Likes, comments, shares divided by total followers',
              'Just the number of likes',
              'How many posts you make per day'
            ],
            correctAnswer: 1,
            points: 15
          },
          {
            type: 'true-false',
            question: 'Using hashtags can help increase the reach of social media posts.',
            correctAnswer: 0, // True
            points: 10
          },
          {
            type: 'short-answer',
            question: 'Write a creative Instagram caption for a beach resort in Guam (include relevant hashtags).',
            points: 30
          },
          {
            type: 'essay',
            question: 'Describe a 1-week social media content strategy for a local Pacific Island restaurant.',
            points: 30
          }
        ]
      }
    };
  }
  
  // Default helpful response
  return {
    text: `I'd love to help you create the perfect assessment! 🌺✨

I can help you create tests for:
• 🎨 Graphic Design (Adobe, Canva, etc.)
• ✍️ Writing & Content (blogs, SEO, grammar)
• 📱 Social Media Management
• 💻 Web Development (HTML, CSS, WordPress)
• 📊 Data Entry & Admin Skills
• 🎯 General/Basic Skills Assessment

Just tell me what kind of job this is for, and I'll create custom questions that are perfect for entry-level Pacific Island students!

What skills do you want to test? 💜`
  };
}