import { useState } from 'react';
import { X, Send, AlertCircle, User, Building2, Shield } from 'lucide-react';

type CoOpUserRole = 'STUDENT' | 'EMPLOYER' | 'ADMIN';

type CoOpMessage = {
  id: string;
  threadId: string;
  senderRole: CoOpUserRole;
  senderName: string;
  body: string;
  createdAt: string;
  isAttendanceRelated?: boolean;
};

type CoOpMessageThread = {
  id: string;
  studentId: string;
  employerId: string;
  adminId: string;
  placementId: string;
  subject: string;
  lastUpdatedAt: string;
  unreadForStudent: boolean;
  unreadForEmployer: boolean;
  unreadForAdmin: boolean;
};

type CoOpMessageThreadModalProps = {
  open: boolean;
  onClose: () => void;
  currentRole: CoOpUserRole;
  thread: CoOpMessageThread;
  messages: CoOpMessage[];
  onSendMessage: (body: string, isAttendanceRelated?: boolean) => void;
  onUseTemplate: (templateKey: string) => void;
};

const MESSAGE_TEMPLATES = {
  STUDENT: [
    { key: 'running_late', label: 'Running late', text: "Hi, I'm running about 15 minutes late today. I apologize for the inconvenience." },
    { key: 'sick', label: 'Calling in sick', text: "I'm not feeling well today and won't be able to come in. I'll keep you updated on when I can return." },
    { key: 'question', label: 'Have a question', text: "I have a question about today's deliverables. Could we discuss when you have a moment?" },
  ],
  EMPLOYER: [
    { key: 'good_work', label: 'Praise student', text: "Great work today! I'm impressed with your progress and attention to detail." },
    { key: 'reminder', label: 'Reminder', text: "Just a friendly reminder about tomorrow's shift. Looking forward to seeing you!" },
    { key: 'concern', label: 'Raise concern', text: "I'd like to discuss something that came up today. Can we schedule a quick check-in?" },
  ],
  ADMIN: [
    { key: 'check_in', label: 'Check in', text: "Checking in to see how the placement is going. Let me know if you need any support!" },
    { key: 'resolve', label: 'Help resolve', text: "I'm here to help resolve this. Let's work together to find a solution that works for everyone." },
  ],
};

function getRoleIcon(role: CoOpUserRole) {
  switch (role) {
    case 'STUDENT':
      return <User className="w-4 h-4" />;
    case 'EMPLOYER':
      return <Building2 className="w-4 h-4" />;
    case 'ADMIN':
      return <Shield className="w-4 h-4" />;
  }
}

function getRoleColor(role: CoOpUserRole) {
  switch (role) {
    case 'STUDENT':
      return 'bg-blue-500';
    case 'EMPLOYER':
      return 'bg-green-500';
    case 'ADMIN':
      return 'bg-purple-500';
  }
}

function getRoleLabel(role: CoOpUserRole) {
  switch (role) {
    case 'STUDENT':
      return 'Student';
    case 'EMPLOYER':
      return 'Employer';
    case 'ADMIN':
      return 'Co-op Admin';
  }
}

export function CoOpMessageThreadModal(props: CoOpMessageThreadModalProps) {
  const [messageBody, setMessageBody] = useState('');
  const [isAttendanceRelated, setIsAttendanceRelated] = useState(false);

  if (!props.open) return null;

  const handleSend = () => {
    if (!messageBody.trim()) return;
    props.onSendMessage(messageBody.trim(), isAttendanceRelated);
    setMessageBody('');
    setIsAttendanceRelated(false);
  };

  const handleUseTemplate = (templateKey: string) => {
    const templates = MESSAGE_TEMPLATES[props.currentRole] || [];
    const template = templates.find(t => t.key === templateKey);
    if (template) {
      setMessageBody(template.text);
    }
    props.onUseTemplate(templateKey);
  };

  const currentTemplates = MESSAGE_TEMPLATES[props.currentRole] || [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border-2 border-slate-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-6 rounded-t-3xl">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h2 className="text-2xl font-black mb-2">{props.thread.subject}</h2>
              <p className="text-sm text-purple-100">
                3-way conversation: Student ↔ Employer ↔ Co-op Admin
              </p>
            </div>
            <button
              onClick={props.onClose}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getRoleColor('STUDENT')} text-white text-xs font-bold`}>
              {getRoleIcon('STUDENT')}
              <span>Student</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getRoleColor('EMPLOYER')} text-white text-xs font-bold`}>
              {getRoleIcon('EMPLOYER')}
              <span>Employer</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getRoleColor('ADMIN')} text-white text-xs font-bold`}>
              {getRoleIcon('ADMIN')}
              <span>Co-op Admin</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {props.messages.map((msg) => {
            const isCurrentUser = msg.senderRole === props.currentRole;
            return (
              <div
                key={msg.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-6 h-6 ${getRoleColor(msg.senderRole)} rounded-full flex items-center justify-center text-white`}>
                      {getRoleIcon(msg.senderRole)}
                    </div>
                    <span className="text-xs font-bold text-slate-300">
                      {msg.senderName} · {getRoleLabel(msg.senderRole)}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className={`rounded-2xl p-4 ${
                    isCurrentUser 
                      ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white' 
                      : 'bg-slate-800 text-slate-100'
                  }`}>
                    {msg.isAttendanceRelated && (
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/20">
                        <AlertCircle className="w-4 h-4 text-orange-300" />
                        <span className="text-xs font-bold text-orange-300">Attendance Related</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Templates */}
        {currentTemplates.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-700 bg-slate-900/50">
            <p className="text-xs font-bold text-slate-400 mb-2">Quick Templates:</p>
            <div className="flex flex-wrap gap-2">
              {currentTemplates.map((template) => (
                <button
                  key={template.key}
                  onClick={() => handleUseTemplate(template.key)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-all"
                >
                  {template.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 border-t border-slate-700 bg-slate-900/50">
          <div className="mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAttendanceRelated}
                onChange={(e) => setIsAttendanceRelated(e.target.checked)}
                className="w-5 h-5 rounded accent-orange-500"
              />
              <span className="text-sm font-semibold text-orange-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Mark as attendance-related (flags for admin review)
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <textarea
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Type your message... (Press Enter to send, Shift+Enter for new line)`}
              rows={3}
              className="flex-1 px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none"
            />
            <button
              onClick={handleSend}
              disabled={!messageBody.trim()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
