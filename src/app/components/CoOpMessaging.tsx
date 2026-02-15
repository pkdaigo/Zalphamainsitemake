/**
 * ZALPHA Co-Op Messaging System
 * Mobile-first direct messaging for Student-Employer-Admin communication
 */

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent } from '@/app/components/ui/card';
import { Textarea } from '@/app/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/app/components/ui/dialog';
import {
  ArrowLeft,
  Bell,
  MoreVertical,
  Clock,
  Calendar,
  X as XIcon,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  AlertCircle,
  Shield,
  User,
  Building,
  GraduationCap,
} from 'lucide-react';
import { toast } from 'sonner';

// Types
interface Placement {
  id: string;
  studentName: string;
  studentAvatar: string;
  employerName: string;
  employerAvatar: string;
  adminName: string;
  adminAvatar: string;
  role: string;
  schedule: string;
  todayShift: {
    start: string;
    end: string;
  } | null;
}

interface Message {
  id: string;
  senderId: string;
  senderRole: 'student' | 'employer' | 'admin';
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  ccAdmin: boolean;
  status?: 'pending' | 'acknowledged' | 'approved' | 'denied' | 'follow-up';
  attachments?: string[];
}

type TemplateType = 'late' | 'time-off' | 'cannot-attend' | null;

// Sample data
const SAMPLE_PLACEMENT: Placement = {
  id: 'pl-001',
  studentName: 'Maya Santos',
  studentAvatar: 'MS',
  employerName: 'Paradise Hotel',
  employerAvatar: 'PH',
  adminName: 'Admin Garcia',
  adminAvatar: 'AG',
  role: 'Front Desk Assistant',
  schedule: 'Mon-Fri 9:00 AM - 2:00 PM',
  todayShift: {
    start: '9:00 AM',
    end: '2:00 PM',
  },
};

const SAMPLE_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'admin-1',
    senderRole: 'admin',
    senderName: 'Admin Garcia',
    senderAvatar: 'AG',
    content: 'Welcome to your co-op messaging channel! I\'m here to help if you need anything.',
    timestamp: new Date('2024-02-14T09:45:00'),
    ccAdmin: false,
    status: 'acknowledged',
  },
];

// Components
function PlacementSummaryCard({ placement }: { placement: Placement }) {
  return (
    <Card className="mx-4 mb-3 border-slate-200">
      <CardContent className="p-4 space-y-3">
        {/* Student and Employer */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold">
            {placement.studentAvatar}
          </div>
          <span className="font-semibold text-slate-900">{placement.studentName}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">{placement.employerName}</span>
        </div>

        {/* Role */}
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Building className="w-4 h-4 text-slate-400" />
          <span>{placement.role}</span>
        </div>

        {/* Schedule */}
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>{placement.schedule}</span>
        </div>

        {/* Today's Shift */}
        {placement.todayShift && (
          <div className="flex items-center gap-2 text-sm bg-blue-50 border border-blue-200 rounded-lg p-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">
              Today's Shift: {placement.todayShift.start} - {placement.todayShift.end}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ComplianceBanner() {
  return (
    <div className="mx-4 mb-3 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3">
      <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-xs">
        <p className="font-semibold text-amber-900 mb-0.5">Recorded Channel</p>
        <p className="text-amber-700">All messages stored for attendance & compliance tracking</p>
      </div>
    </div>
  );
}

function MessageBubble({ message, currentRole }: { message: Message; currentRole: 'student' | 'employer' | 'admin' }) {
  const isOwnMessage = message.senderRole === currentRole;
  
  const getRoleIcon = () => {
    switch (message.senderRole) {
      case 'student': return <User className="w-3 h-3" />;
      case 'employer': return <Building className="w-3 h-3" />;
      case 'admin': return <GraduationCap className="w-3 h-3" />;
    }
  };

  const getRoleColor = () => {
    switch (message.senderRole) {
      case 'student': return 'blue';
      case 'employer': return 'emerald';
      case 'admin': return 'violet';
    }
  };

  const getRoleLabel = () => {
    switch (message.senderRole) {
      case 'student': return 'Student';
      case 'employer': return 'Employer';
      case 'admin': return 'School Co-Op Admin';
    }
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'acknowledged': return <Check className="w-3 h-3" />;
      case 'approved': return <CheckCheck className="w-3 h-3" />;
      case 'follow-up': return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const getStatusColor = () => {
    switch (message.status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'acknowledged': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'denied': return 'bg-red-100 text-red-700 border-red-200';
      case 'follow-up': return 'bg-red-100 text-red-700 border-red-200';
      default: return '';
    }
  };

  return (
    <div className={`flex flex-col mb-4 px-4 ${isOwnMessage ? 'items-end' : 'items-start'}`}>
      {/* Avatar and Role Label */}
      {!isOwnMessage && (
        <div className="flex items-center gap-2 mb-1">
          <div 
            className={`w-6 h-6 rounded-full bg-${getRoleColor()}-500 text-white flex items-center justify-center text-xs font-semibold`}
            style={{
              background: message.senderRole === 'student' ? '#3b82f6' : 
                          message.senderRole === 'employer' ? '#10b981' : '#8b5cf6'
            }}
          >
            {message.senderAvatar}
          </div>
          <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
            {getRoleIcon()}
            {getRoleLabel()}
          </span>
        </div>
      )}

      {/* Message Content */}
      <div
        className={`max-w-[280px] rounded-2xl p-3 ${
          isOwnMessage
            ? 'bg-blue-500 text-white rounded-br-sm'
            : message.senderRole === 'employer'
            ? 'bg-emerald-50 text-slate-900 border border-emerald-200 rounded-bl-sm'
            : 'bg-violet-50 text-slate-900 border border-violet-200 rounded-bl-sm'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 pt-2 border-t border-white/20">
            {message.attachments.map((att, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs opacity-90">
                <Paperclip className="w-3 h-3" />
                <span className="truncate">{att}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timestamp and Status */}
      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
        <span>{message.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        {message.status && (
          <>
            <span>•</span>
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase ${getStatusColor()}`}>
              {getStatusIcon()}
              <span>{message.status}</span>
            </div>
          </>
        )}
      </div>

      {/* CC Indicator */}
      {message.ccAdmin && isOwnMessage && (
        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
          <Paperclip className="w-3 h-3" />
          <span>Shared with School Co-Op Admin</span>
        </div>
      )}
    </div>
  );
}

function QuickTemplates({ onSelectTemplate }: { onSelectTemplate: (type: TemplateType) => void }) {
  return (
    <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
      <p className="text-xs font-medium text-slate-600 mb-2">Quick Templates:</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectTemplate('late')}
          className="flex-shrink-0 text-sm"
        >
          <Clock className="w-4 h-4 mr-1.5" />
          I'll be late
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectTemplate('time-off')}
          className="flex-shrink-0 text-sm"
        >
          <Calendar className="w-4 h-4 mr-1.5" />
          Time off
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectTemplate('cannot-attend')}
          className="flex-shrink-0 text-sm"
        >
          <XIcon className="w-4 h-4 mr-1.5" />
          Cannot attend
        </Button>
      </div>
    </div>
  );
}

function TemplateModal({ 
  type, 
  onClose, 
  onSend 
}: { 
  type: TemplateType; 
  onClose: () => void; 
  onSend: (message: string) => void;
}) {
  const [reason, setReason] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const getTitle = () => {
    switch (type) {
      case 'late': return 'I\'ll be late';
      case 'time-off': return 'Request time off';
      case 'cannot-attend': return 'Cannot attend shift';
      default: return '';
    }
  };

  const getMessage = () => {
    switch (type) {
      case 'late':
        return `Hi, I will be late to my shift today.

Expected arrival time: ${time}

Reason: ${reason || 'Not specified'}

Sorry for the inconvenience.`;
      case 'time-off':
        return `Hi, I would like to request time off on:

Date: ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

Reason: ${reason}

Please let me know if this works. Thank you!`;
      case 'cannot-attend':
        return `Hi, I am unable to attend my shift today (${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}).

Reason: ${reason}

I apologize for the short notice.`;
      default:
        return '';
    }
  };

  const handleSend = () => {
    if (type === 'time-off' && !reason.trim()) {
      toast.error('Please provide a reason for time off');
      return;
    }
    if (type === 'cannot-attend' && !reason.trim()) {
      toast.error('Please provide a reason for absence');
      return;
    }
    onSend(getMessage());
    onClose();
  };

  return (
    <Dialog open={!!type} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'late' && <Clock className="w-5 h-5" />}
            {type === 'time-off' && <Calendar className="w-5 h-5" />}
            {type === 'cannot-attend' && <XIcon className="w-5 h-5" />}
            {getTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {type === 'late' && (
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">
                Expected arrival time:
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          )}

          {type === 'time-off' && (
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">
                Date:
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Reason {type === 'late' ? '(optional)' : '(required)'}:
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm resize-none"
              rows={3}
              maxLength={150}
            />
            <p className="text-xs text-slate-500 mt-1">{reason.length}/150</p>
          </div>

          {/* Preview */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-xs font-medium text-slate-600 mb-2">Message preview:</p>
            <p className="text-xs text-slate-700 whitespace-pre-wrap">{getMessage()}</p>
          </div>

          {/* CC Notice */}
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800">
              This message will be shared with your School Co-Op Admin for records
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600">
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MessageInput({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <div className="border-t border-slate-200 bg-white p-4 space-y-3">
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 resize-none"
          rows={2}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-blue-500 hover:bg-blue-600 h-auto"
          size="icon"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
        <Paperclip className="w-4 h-4" />
        <span>Attach file/photo</span>
      </button>
    </div>
  );
}

export function CoOpMessaging() {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentRole = 'student'; // In real app, this comes from auth

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      senderId: 'student-1',
      senderRole: 'student',
      senderName: SAMPLE_PLACEMENT.studentName,
      senderAvatar: SAMPLE_PLACEMENT.studentAvatar,
      content,
      timestamp: new Date(),
      ccAdmin: true,
      status: 'pending',
    };

    setMessages([...messages, newMessage]);

    // Show success toast
    toast.success('Message sent!', {
      description: 'Shared with School Co-Op Admin',
    });

    // Simulate employer response after 3 seconds
    setTimeout(() => {
      const response: Message = {
        id: `m${messages.length + 2}`,
        senderId: 'employer-1',
        senderRole: 'employer',
        senderName: SAMPLE_PLACEMENT.employerName,
        senderAvatar: SAMPLE_PLACEMENT.employerAvatar,
        content: 'Thank you for letting me know. I\'ve noted this.',
        timestamp: new Date(),
        ccAdmin: false,
        status: 'acknowledged',
      };
      setMessages(prev => [...prev, response]);
    }, 3000);
  };

  return (
    <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Co-Op Messages</h1>
            <p className="text-xs text-slate-500">With {SAMPLE_PLACEMENT.employerName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-slate-600 hover:text-slate-900">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-slate-600 hover:text-slate-900">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Placement Summary */}
      <div className="pt-3">
        <PlacementSummaryCard placement={SAMPLE_PLACEMENT} />
        <ComplianceBanner />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pb-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full px-4">
            <div className="text-center max-w-xs">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Send className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium mb-2">Start a conversation</p>
              <p className="text-sm text-slate-500">
                Use quick templates below to message your employer
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                currentRole={currentRole}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Quick Templates */}
      <QuickTemplates onSelectTemplate={setSelectedTemplate} />

      {/* Message Input */}
      <MessageInput onSend={handleSendMessage} />

      {/* Template Modal */}
      <TemplateModal
        type={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        onSend={handleSendMessage}
      />
    </div>
  );
}
