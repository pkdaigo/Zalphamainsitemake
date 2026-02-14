import { useState, useEffect, useRef } from 'react';
import { Send, AlertTriangle, Shield, X, FileText, Paperclip, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { moderateMessage, logViolation, type ModerationResult } from '@/app/utils/contentModeration';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'student' | 'employer';
  content: string;
  originalContent?: string; // Store original if redacted
  timestamp: string;
  moderated: boolean;
  violations?: string[];
  riskLevel?: ModerationResult['riskLevel'];
}

interface SecureChatProps {
  currentUserId: string;
  currentUserName: string;
  currentUserType: 'student' | 'employer';
  recipientId: string;
  recipientName: string;
  recipientType: 'student' | 'employer';
  jobTitle?: string;
  onClose: () => void;
}

export function SecureChat({
  currentUserId,
  currentUserName,
  currentUserType,
  recipientId,
  recipientName,
  recipientType,
  jobTitle,
  onClose
}: SecureChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [violationCount, setViolationCount] = useState(0);
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationId = `${currentUserId}-${recipientId}`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load messages (in production, fetch from backend)
  useEffect(() => {
    // Mock loading messages
    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: recipientId,
        senderName: recipientName,
        senderType: recipientType,
        content: `Hi ${currentUserName}! Thanks for your interest in ${jobTitle || 'our position'}. I'd love to learn more about you!`,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        moderated: false
      }
    ];
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return;

    setIsSending(true);

    // Run AI moderation
    const moderation = moderateMessage(inputMessage);

    // If violations detected, show warning
    if (!moderation.isClean) {
      setShowWarning(true);
      setViolationCount(prev => prev + 1);
      
      // Log violation to backend
      await logViolation(
        currentUserId,
        currentUserType,
        inputMessage,
        moderation.violations,
        conversationId
      );

      // Construct warning message
      let warningText = '⚠️ Your message was flagged:\n\n';
      moderation.violations.forEach(v => {
        warningText += `• ${v}\n`;
      });
      warningText += '\n🔒 All communication must stay on-platform.\n';
      warningText += 'Violation count: ' + violationCount + '/3\n';
      
      if (violationCount >= 2) {
        warningText += '\n⚠️ WARNING: One more violation will result in account suspension!';
      }

      setWarningMessage(warningText);

      // Critical violations = block message entirely
      if (moderation.riskLevel === 'critical') {
        setInputMessage('');
        setIsSending(false);
        return;
      }
    }

    // Send message (redacted version if needed)
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderType: currentUserType,
      content: moderation.redactedMessage,
      originalContent: !moderation.isClean ? inputMessage : undefined,
      timestamp: new Date().toISOString(),
      moderated: !moderation.isClean,
      violations: moderation.violations,
      riskLevel: moderation.riskLevel
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsSending(false);

    // In production, send to backend
    // await sendMessageToBackend(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
                  {recipientName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{recipientName}</h2>
                  <p className="text-sm text-blue-100">
                    {recipientType === 'employer' ? '🏢 Employer' : '🎓 Student'}
                    {jobTitle && ` • ${jobTitle}`}
                  </p>
                </div>
              </div>
              
              {/* Security Notice */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mt-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-semibold mb-1">🔒 Secure Platform Chat</p>
                    <p className="text-blue-100">
                      All messages are monitored by AI. Sharing contact information or attempting to 
                      move conversations off-platform is prohibited and will result in account suspension.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="ml-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Warning Modal */}
        {showWarning && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 m-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-red-900 mb-2">Policy Violation Detected</h3>
                <pre className="text-sm text-red-800 whitespace-pre-wrap font-sans">{warningMessage}</pre>
                <button
                  onClick={() => setShowWarning(false)}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
                >
                  I Understand
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map(message => {
            const isOwnMessage = message.senderId === currentUserId;
            
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-xs font-semibold text-gray-600">
                      {message.senderName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      isOwnMessage
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white text-gray-900 border-2 border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    
                    {/* Show moderation notice */}
                    {message.moderated && (
                      <div className={`mt-2 pt-2 border-t ${isOwnMessage ? 'border-white/30' : 'border-gray-300'} text-xs`}>
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          <span className={isOwnMessage ? 'text-blue-100' : 'text-gray-600'}>
                            Message automatically moderated
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Show violations for own messages */}
                  {isOwnMessage && message.violations && message.violations.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-800">
                      <p className="font-semibold mb-1">⚠️ Your message contained:</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        {message.violations.map((v, i) => (
                          <li key={i}>{v}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Contract Work Notice */}
        <div className="bg-amber-50 border-t-2 border-amber-200 p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <p className="font-semibold mb-1">💼 All Contract Work Must Use ZALPHA Platform</p>
              <p>
                If you agree to work together, you must create a contract through ZALPHA's freelance 
                marketplace. Payment protection and dispute resolution are only available for on-platform work.
              </p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t-2 border-gray-200 rounded-b-2xl">
          <div className="flex gap-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (All messages are monitored by AI)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                rows={3}
                disabled={isSending}
              />
              <p className="text-xs text-gray-500 mt-2">
                ⚠️ DO NOT share: phone numbers, emails, social media, external links
              </p>
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isSending}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed h-fit flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
