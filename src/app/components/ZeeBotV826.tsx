/**
 * ZALPHA Zee Bot v826 - AI Assistant with Google NotebookLM Integration
 * Features: /search (OpenAI), /notebook (NotebookLM), Upload PDFs, Audio Podcasts, Study Guides
 */

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  MessageCircle,
  X,
  Upload,
  Search,
  BookOpen,
  Sparkles,
  FileText,
  Play,
  Pause,
  Download,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Copy,
  Volume2,
  Zap,
  Users,
  Briefcase,
  GraduationCap,
  ChevronRight,
  FileUp,
  Loader2,
  CheckCircle,
  Share2,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'zee' | 'system';
  content: string;
  mode?: 'search' | 'notebook';
  sources?: Source[];
  audioUrl?: string;
  timestamp: Date;
}

interface Source {
  title: string;
  page?: number;
  url?: string;
}

interface NotebookOutput {
  type: 'summary' | 'guide' | 'quiz' | 'podcast' | 'flashcards';
  content: string;
  audioUrl?: string;
  duration?: number;
}

interface ZeeBotV826Props {
  userRole: 'student' | 'employer' | 'coordinator' | 'dol-admin';
  userName: string;
  onClose?: () => void;
}

export function ZeeBotV826({ userRole, userName, onClose }: ZeeBotV826Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'zee',
      content: `Hey ${userName}! 👋 I'm Zee, your AI assistant. I can help with:\n\n• 🔍 /search - Web search & quick answers\n• 📚 /notebook - Upload PDFs for study guides, podcasts & more\n\nWhat would you like to do?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<'search' | 'notebook'>('search');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const roleHelpers = {
    student: [
      { icon: GraduationCap, label: 'Homework Helper', color: 'bg-blue-500' },
      { icon: BookOpen, label: 'Study Guide', color: 'bg-purple-500' },
      { icon: Briefcase, label: 'Job Prep', color: 'bg-green-500' },
    ],
    employer: [
      { icon: Users, label: 'Co-op Admin', color: 'bg-green-500' },
      { icon: FileText, label: 'Compliance', color: 'bg-blue-500' },
      { icon: Briefcase, label: 'Talent Match', color: 'bg-purple-500' },
    ],
    coordinator: [
      { icon: Users, label: 'Career Services', color: 'bg-indigo-500' },
      { icon: FileText, label: 'WIOA Reports', color: 'bg-blue-500' },
      { icon: GraduationCap, label: 'College Advisor', color: 'bg-purple-500' },
    ],
    'dol-admin': [
      { icon: FileText, label: 'Compliance', color: 'bg-blue-500' },
      { icon: Briefcase, label: 'Workforce Analytics', color: 'bg-green-500' },
      { icon: Users, label: 'Regional Reports', color: 'bg-purple-500' },
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
      handleUpload(Array.from(files));
    }
  };

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }

    setIsUploading(false);
    setShowUploadZone(false);

    // Add system message
    const uploadMsg: Message = {
      id: Date.now().toString(),
      role: 'system',
      content: `✅ Uploaded ${files.length} file(s): ${files.map(f => f.name).join(', ')}`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, uploadMsg]);

    // Simulate processing
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);

    // Add notebook response
    const response: Message = {
      id: (Date.now() + 1).toString(),
      role: 'zee',
      content: generateNotebookResponse(files[0].name),
      mode: 'notebook',
      sources: [{ title: files[0].name, page: 2 }],
      audioUrl: 'mock-audio-url',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, response]);
  };

  const generateNotebookResponse = (filename: string) => {
    if (filename.toLowerCase().includes('chem') || filename.toLowerCase().includes('chemistry')) {
      return `📚 **Study Guide Generated!**

**Topic**: Chemical Bonding & Reactions

**Key Concepts**:
1. Ionic vs Covalent Bonds
   - Ionic: Transfer of electrons (Na+ Cl-)
   - Covalent: Sharing of electrons (H2O)

2. Reaction Types
   - Synthesis: A + B → AB
   - Decomposition: AB → A + B
   - Single Replacement: A + BC → AC + B

3. Balancing Equations
   - Law of conservation of mass
   - Same # atoms on each side

**Practice Quiz**: 5 questions ready
**Podcast**: 5-min audio summary ready to play ▶️

📄 Source: ${filename} [pg:2-8]`;
    } else if (filename.toLowerCase().includes('log') || filename.toLowerCase().includes('report')) {
      return `📊 **Compliance Report Generated**

**WIOA Youth Program Analysis**

**Key Findings**:
✅ 94% compliance rate
✅ All time logs approved
✅ No regulatory issues

**Action Items**:
1. Review 3 pending approvals
2. Update Q2 metrics
3. Export final report

**Charts Available**: 
- Student progress tracking
- Hours distribution
- Compliance trends

📄 Source: ${filename} [pg:1-12]`;
    } else {
      return `📄 **Document Summary**

I've analyzed your document and created:

✅ Text summary
✅ Key points extraction
✅ Audio podcast (5 min)
✅ Practice questions

What would you like to explore first?

📄 Source: ${filename}`;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Check for commands
    if (inputValue.startsWith('/notebook')) {
      setMode('notebook');
      setShowUploadZone(true);
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'zee',
        content: '📚 Notebook Mode activated! Upload your PDFs, notes, or syllabi to get started.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
      return;
    }

    if (inputValue.startsWith('/search')) {
      setMode('search');
      const query = inputValue.replace('/search', '').trim();
      await handleSearch(query);
      return;
    }

    if (inputValue.startsWith('/alerts')) {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'zee',
        content: '🚨 **Current Alerts**: No active emergencies in your area. Stay safe! 🌴',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
      return;
    }

    // Default search
    await handleSearch(inputValue);
  };

  const handleSearch = async (query: string) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);

    let responseContent = '';
    if (query.toLowerCase().includes('wioa')) {
      responseContent = `🔍 **WIOA Grant Information**

**Latest Updates**:
• WIOA Youth Formula Grants for 2026 are open
• Pacific Islands receive $2.4M allocation
• Focus areas: Work-based learning, job readiness

**Eligibility**:
- Ages 16-24
- Low-income or barriers to employment
- Pacific Islands residents

**Resources**:
🔗 Apply at DOL.gov/WIOA
📄 Local contact: NMC Career Services

🌐 Sources: DOL.gov, Pacific WIOA Office`;
    } else if (query.toLowerCase().includes('job') || query.toLowerCase().includes('cnmi')) {
      responseContent = `💼 **CNMI Job Opportunities**

**Top Openings**:
1. Medical Records Assistant - Pacific Islands Hospital
2. IT Support Technician - CUC
3. Tourism Coordinator - Marianas Visitors Authority

**Remote Opportunities**:
🌏 Virtual Assistant - TechCorp Manila ($10-12/hr)
🌏 Customer Support - Global BPO ($8-10/hr)

**Next Steps**:
✅ Update your ZALPHA profile
✅ Sync with Handshake
✅ Apply directly through platform

📍 All positions verified & local to CNMI`;
    } else {
      responseContent = `I found some helpful information about "${query}". Would you like me to:\n\n1. Search for specific resources\n2. Upload documents to analyze with /notebook\n3. Connect you with a career counselor\n\nLet me know how I can help! 😊`;
    }

    const response: Message = {
      id: (Date.now() + 1).toString(),
      role: 'zee',
      content: responseContent,
      mode: 'search',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, response]);
  };

  const handlePlayAudio = (messageId: string) => {
    if (audioPlaying === messageId) {
      setAudioPlaying(null);
    } else {
      setAudioPlaying(messageId);
      // Simulate audio playback
      setTimeout(() => setAudioPlaying(null), 5000);
    }
  };

  return (
    <>
      {/* Zee Bubble - Bottom Right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-40 group"
        >
          <div className="relative">
            {/* Pulsing Ring */}
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" />
            
            {/* Avatar */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
              Z
            </div>

            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
              1
            </div>
          </div>

          {/* Label */}
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <p className="text-sm font-semibold text-gray-900">Ask Zee 💬</p>
            <p className="text-xs text-gray-600">/notebook /search</p>
          </div>
        </button>
      )}

      {/* Full-Screen Chat Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-[390px] mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
                  Z
                </div>
                <div>
                  <h2 className="font-bold text-lg">Zee Assistant</h2>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Mode Toggle */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setMode('search')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  mode === 'search'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Search className="w-4 h-4 inline mr-1" />
                /search
                {mode === 'search' && (
                  <Sparkles className="w-3 h-3 inline ml-1 animate-pulse" />
                )}
              </button>
              <button
                onClick={() => {
                  setMode('notebook');
                  setShowUploadZone(true);
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  mode === 'notebook'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-1" />
                /notebook
                {mode === 'notebook' && (
                  <Sparkles className="w-3 h-3 inline ml-1 animate-pulse" />
                )}
              </button>
            </div>

            {/* Role Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {roleHelpers[userRole].map((helper, idx) => (
                <Badge
                  key={idx}
                  className={`${helper.color} text-white flex-shrink-0 px-3 py-1 text-xs`}
                >
                  <helper.icon className="w-3 h-3 mr-1" />
                  {helper.label}
                </Badge>
              ))}
            </div>

            {/* Pay-As-You-Go Badge */}
            <div className="mt-2 bg-yellow-400 text-yellow-900 rounded-lg px-3 py-1 text-xs font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Premium: $0.05 per notebook generation
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.role === 'system'
                      ? 'bg-green-100 text-green-900 text-sm'
                      : 'bg-white text-gray-900 shadow-md'
                  }`}
                >
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {message.content}
                  </div>

                  {/* Audio Player */}
                  {message.audioUrl && (
                    <div className="mt-3 bg-purple-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Volume2 className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-900">5-min Podcast</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handlePlayAudio(message.id)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          {audioPlaying === message.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <div className="flex-1">
                          <Progress
                            value={audioPlaying === message.id ? 60 : 0}
                            className="h-2"
                          />
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Sources:</p>
                      {message.sources.map((source, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs mr-1">
                          {source.title}
                          {source.page && ` [pg:${source.page}]`}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  {message.role === 'zee' && (
                    <div className="mt-3 flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-7 px-2">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 px-2">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 px-2">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 px-2">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Generating Indicator */}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600">
                      {mode === 'notebook' ? 'Generating study guide...' : 'Searching...'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Zone */}
            {showUploadZone && !isUploading && (
              <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-dashed border-blue-300">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <FileUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Upload Your Files</p>
                    <p className="text-sm text-gray-600">PDFs, notes, syllabi, or logs</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Uploading files...</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-gray-500 mt-2">{uploadProgress}% complete</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            {/* Quick Actions */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0"
              >
                <Upload className="w-4 h-4 mr-1" />
                Upload
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputValue('/search ')}
                className="flex-shrink-0"
              >
                <Search className="w-4 h-4 mr-1" />
                Search
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputValue('/notebook ')}
                className="flex-shrink-0"
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Notebook
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputValue('/alerts')}
                className="flex-shrink-0"
              >
                🚨 Alerts
              </Button>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Zee anything..."
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Hints */}
            <p className="text-xs text-gray-500 mt-2 text-center">
              Try: "/notebook study guide" or "/search WIOA grants"
            </p>
          </div>
        </div>
      )}
    </>
  );
}
