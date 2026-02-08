import { useState } from 'react';
import { FileText, Upload, MessageCircle, CheckCircle, Clock, Download, Send, Paperclip, AlertCircle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface ProjectWorkspaceProps {
  projectId: string;
  projectTitle: string;
  userType: 'student' | 'employer';
  currentMilestone: number;
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  sender: 'student' | 'employer';
  senderName: string;
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
}

interface Attachment {
  id: string;
  name: string;
  size: number;
  url: string;
  type: string;
}

interface Submission {
  id: string;
  milestoneNumber: number;
  description: string;
  files: Attachment[];
  submitDate: Date;
  status: 'pending_review' | 'approved' | 'revision_requested' | 'disputed';
  feedback?: string;
}

export function ProjectWorkspace({ projectId, projectTitle, userType, currentMilestone, onNavigate }: ProjectWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'files' | 'messages' | 'submissions'>('overview');
  const [messageText, setMessageText] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [revisionFeedback, setRevisionFeedback] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      sender: 'employer',
      senderName: 'TechStart Inc',
      content: 'Hi! Thanks for accepting this project. I\'ve attached the design mockups and brand guidelines. Let me know if you have any questions!',
      timestamp: new Date('2025-01-25T10:00:00'),
      attachments: [
        { id: 'file_1', name: 'mockups.xd', size: 2400000, url: '#', type: 'design' },
        { id: 'file_2', name: 'brand-guidelines.pdf', size: 1200000, url: '#', type: 'pdf' }
      ]
    },
    {
      id: 'msg_2',
      sender: 'student',
      senderName: 'Sarah Johnson',
      content: 'Great! I\'ve reviewed the mockups and they look perfect. I\'ll start working on the HTML structure today. Should have the first milestone ready for review by end of week.',
      timestamp: new Date('2025-01-25T14:30:00'),
    },
  ]);

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 'sub_1',
      milestoneNumber: 1,
      description: 'Initial HTML structure and responsive layout completed. All pages are mobile-responsive and follow the design system.',
      files: [
        { id: 'file_3', name: 'project-files.zip', size: 5600000, url: '#', type: 'zip' },
        { id: 'file_4', name: 'demo-link.txt', size: 1200, url: '#', type: 'txt' }
      ],
      submitDate: new Date('2025-01-27T16:00:00'),
      status: 'pending_review',
    },
  ]);

  const projectInfo = {
    employer: 'TechStart Inc',
    freelancer: 'Sarah Johnson',
    startDate: new Date('2025-01-25'),
    deadline: new Date('2025-02-10'),
    totalMilestones: 3,
    currentMilestone: currentMilestone,
    budget: 800,
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: userType,
      senderName: userType === 'student' ? projectInfo.freelancer : projectInfo.employer,
      content: messageText,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const handleSubmitWork = () => {
    if (!submissionNotes.trim()) {
      alert('Please add submission notes');
      return;
    }

    const newSubmission: Submission = {
      id: `sub_${Date.now()}`,
      milestoneNumber: currentMilestone,
      description: submissionNotes,
      files: [], // In production: Handle file uploads
      submitDate: new Date(),
      status: 'pending_review',
    };

    setSubmissions([...submissions, newSubmission]);
    setSubmissionNotes('');
    alert('Work submitted successfully!');
  };

  const handleApproveSubmission = (submissionId: string) => {
    setSubmissions(submissions.map(sub =>
      sub.id === submissionId ? { ...sub, status: 'approved' as const } : sub
    ));
  };

  const handleRequestRevision = (submissionId: string) => {
    if (!revisionFeedback.trim()) {
      alert('Please provide revision feedback');
      return;
    }

    setSubmissions(submissions.map(sub =>
      sub.id === submissionId ? { 
        ...sub, 
        status: 'revision_requested' as const,
        feedback: revisionFeedback
      } : sub
    ));
    setRevisionFeedback('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const daysRemaining = Math.ceil((projectInfo.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Dashboard" />
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{projectTitle}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span><strong>Employer:</strong> {projectInfo.employer}</span>
                <span>•</span>
                <span><strong>Freelancer:</strong> {projectInfo.freelancer}</span>
                <span>•</span>
                <span><strong>Milestone:</strong> {projectInfo.currentMilestone}/{projectInfo.totalMilestones}</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${daysRemaining > 3 ? 'text-green-600' : 'text-red-600'}`}>
                {daysRemaining} days left
              </div>
              <p className="text-sm text-gray-600">Until deadline</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Project Progress</span>
              <span>{Math.round((projectInfo.currentMilestone / projectInfo.totalMilestones) * 100)}% Complete</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all"
                style={{ width: `${(projectInfo.currentMilestone / projectInfo.totalMilestones) * 100}%` }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-blue-600 mb-1">Start Date</p>
              <p className="font-semibold text-gray-900">{projectInfo.startDate.toLocaleDateString()}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-green-600 mb-1">Budget</p>
              <p className="font-semibold text-gray-900">${projectInfo.budget}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-xs text-purple-600 mb-1">Messages</p>
              <p className="font-semibold text-gray-900">{messages.length}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-orange-600 mb-1">Submissions</p>
              <p className="font-semibold text-gray-900">{submissions.length}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow p-2 mb-6 flex gap-2">
          {(['overview', 'submissions', 'messages', 'files'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Milestone */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Current Milestone</h2>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-purple-900">Milestone #{currentMilestone}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                    IN PROGRESS
                  </span>
                </div>
                <p className="text-sm text-purple-800 mb-3">
                  Initial HTML structure and responsive layout
                </p>
                <div className="flex items-center gap-4 text-sm text-purple-700">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>7 days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>$300</span>
                  </div>
                </div>
              </div>

              {userType === 'student' && (
                <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-bold">
                  Submit Work for Review
                </button>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Work submitted for Milestone #1</p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">New message from {userType === 'student' ? 'employer' : 'freelancer'}</p>
                    <p className="text-xs text-gray-600">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Project started</p>
                    <p className="text-xs text-gray-600">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {/* Submit Work Form (Student) */}
            {userType === 'student' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Submit Work</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Submission Notes
                    </label>
                    <textarea
                      value={submissionNotes}
                      onChange={(e) => setSubmissionNotes(e.target.value)}
                      placeholder="Describe what you've completed, any challenges faced, and what the employer should review..."
                      className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Upload Files
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Click to upload</strong> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        ZIP, PDF, images, or any project files (Max 100MB)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitWork}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-bold flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Submit for Review
                  </button>
                </div>
              </div>
            )}

            {/* Submissions List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">All Submissions</h2>
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900">Milestone #{submission.milestoneNumber}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            submission.status === 'pending_review' ? 'bg-yellow-100 text-yellow-800' :
                            submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                            submission.status === 'revision_requested' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {submission.status.toUpperCase().replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{submission.description}</p>
                        <p className="text-xs text-gray-600">
                          Submitted on {submission.submitDate.toLocaleDateString()} at {submission.submitDate.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* Files */}
                    {submission.files.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Attached Files:</p>
                        <div className="space-y-2">
                          {submission.files.map((file) => (
                            <div key={file.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-purple-600" />
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{file.name}</p>
                                  <p className="text-xs text-gray-600">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                              <button className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm font-semibold flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Feedback */}
                    {submission.feedback && (
                      <div className="mb-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <p className="text-sm font-bold text-orange-900 mb-1">Revision Requested:</p>
                        <p className="text-sm text-orange-800">{submission.feedback}</p>
                      </div>
                    )}

                    {/* Actions for Employer */}
                    {userType === 'employer' && submission.status === 'pending_review' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Feedback (Optional):
                          </label>
                          <textarea
                            value={revisionFeedback}
                            onChange={(e) => setRevisionFeedback(e.target.value)}
                            placeholder="Provide feedback if requesting revisions..."
                            className="w-full h-24 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none text-sm"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleRequestRevision(submission.id)}
                            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                          >
                            Request Revision
                          </button>
                          <button
                            onClick={() => handleApproveSubmission(submission.id)}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve & Release Payment
                          </button>
                        </div>
                      </div>
                    )}

                    {submission.status === 'approved' && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Approved - Payment released</span>
                      </div>
                    )}
                  </div>
                ))}

                {submissions.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Submissions Yet</h3>
                    <p className="text-gray-600">
                      {userType === 'student' 
                        ? 'Submit your work when ready for review'
                        : 'Waiting for freelancer to submit work'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Project Messages</h2>
            
            {/* Messages List */}
            <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === userType ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-lg ${message.sender === userType ? 'bg-purple-600 text-white' : 'bg-white border-2 border-gray-200'} rounded-lg p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className={`text-sm font-bold ${message.sender === userType ? 'text-white' : 'text-gray-900'}`}>
                        {message.senderName}
                      </p>
                      <p className={`text-xs ${message.sender === userType ? 'text-purple-200' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <p className={`text-sm ${message.sender === userType ? 'text-white' : 'text-gray-700'}`}>
                      {message.content}
                    </p>
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.attachments.map((file) => (
                          <div key={file.id} className={`flex items-center gap-2 p-2 rounded ${message.sender === userType ? 'bg-purple-700' : 'bg-gray-100'}`}>
                            <Paperclip className="w-4 h-4" />
                            <span className="text-sm flex-1">{file.name}</span>
                            <Download className="w-4 h-4 cursor-pointer" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </div>
          </div>
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Project Files</h2>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">All Project Files</h3>
              <p className="text-gray-600">Files from messages and submissions will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}