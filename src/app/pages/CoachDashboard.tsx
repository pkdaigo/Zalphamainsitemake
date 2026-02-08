import { Calendar, MessageCircle, Video, FileText, Target, ArrowLeft, Clock, CheckCircle, Award } from 'lucide-react';
import { useState } from 'react';
import { JobCoaching } from '@/app/components/JobCoaching';
import { BackButton } from '@/app/components/BackButton';

interface CoachDashboardProps {
  onNavigate: (page: string) => void;
}

export function CoachDashboard({ onNavigate }: CoachDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'messages' | 'resources'>('overview');

  const coachInfo = {
    name: 'Dr. Maria Pangelinan',
    title: 'Senior Career Coach',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    nextSession: 'Feb 5, 2026 at 2:00 PM CNMI'
  };

  const availableTimeSlots = [
    { day: 'Monday', date: 'Feb 5', slots: ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'] },
    { day: 'Tuesday', date: 'Feb 6', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '4:00 PM'] },
    { day: 'Wednesday', date: 'Feb 7', slots: ['10:00 AM', '2:00 PM', '3:30 PM'] },
    { day: 'Thursday', date: 'Feb 8', slots: ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'] },
    { day: 'Friday', date: 'Feb 9', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
  ];

  const sessionTypes = [
    {
      id: 'interview',
      title: 'Interview Preparation',
      description: 'Practice common interview questions, body language, and strategies',
      duration: '60 minutes',
      icon: '🎤'
    },
    {
      id: 'resume',
      title: 'Resume Review',
      description: 'Get professional feedback on your resume and cover letter',
      duration: '45 minutes',
      icon: '📄'
    },
    {
      id: 'career',
      title: 'Career Planning',
      description: 'Map out your career path and set achievable goals',
      duration: '60 minutes',
      icon: '🎯'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Optimization',
      description: 'Build a professional online presence and network effectively',
      duration: '45 minutes',
      icon: '🌐'
    },
    {
      id: 'salary',
      title: 'Salary Negotiation',
      description: 'Learn tactics to negotiate the best compensation package',
      duration: '45 minutes',
      icon: '💰'
    },
    {
      id: 'general',
      title: 'General Coaching',
      description: 'Open discussion about any career-related topic',
      duration: '30-60 minutes',
      icon: '💬'
    }
  ];

  const messages = [
    {
      id: 1,
      from: 'coach',
      text: "Hi! I reviewed your resume. Great progress! Let's discuss a few improvements in our next session.",
      timestamp: '2 hours ago',
      read: true
    },
    {
      id: 2,
      from: 'student',
      text: 'Thank you! I have an interview next week. Can we do a mock interview?',
      timestamp: '1 hour ago',
      read: true
    },
    {
      id: 3,
      from: 'coach',
      text: "Absolutely! I've sent you some time slots. Pick what works best for you. We'll do a full mock interview for that specific role.",
      timestamp: '45 minutes ago',
      read: true
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Interview Questions Database',
      description: '100+ common interview questions with sample answers',
      type: 'PDF',
      icon: '📚'
    },
    {
      id: 2,
      title: 'Resume Templates (5 Styles)',
      description: 'ATS-friendly resume templates for various industries',
      type: 'DOCX',
      icon: '📄'
    },
    {
      id: 3,
      title: 'STAR Method Guide',
      description: 'Master the STAR technique for behavioral questions',
      type: 'PDF',
      icon: '⭐'
    },
    {
      id: 4,
      title: 'Salary Negotiation Scripts',
      description: 'Proven scripts and tactics for negotiating compensation',
      type: 'PDF',
      icon: '💰'
    },
    {
      id: 5,
      title: 'LinkedIn Optimization Checklist',
      description: '25-point checklist to optimize your LinkedIn profile',
      type: 'PDF',
      icon: '✅'
    },
    {
      id: 6,
      title: 'Career Planning Worksheet',
      description: 'Interactive worksheet to map your career goals',
      type: 'XLSX',
      icon: '🎯'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <BackButton onNavigate={onNavigate} destination="demo-showcase" />
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <BackButton
            onClick={() => onNavigate('student-dashboard')}
            className="flex items-center gap-2 text-purple-100 hover:text-white mb-6 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </BackButton>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <Calendar className="w-12 h-12 text-white" />
            </div>
            <div>
              <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">
                ⭐ ULTRA PREMIUM
              </div>
              <h1 className="text-4xl font-bold mb-2">Coaching Dashboard</h1>
              <p className="text-xl text-purple-200">1-on-1 Sessions with {coachInfo.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 font-semibold border-b-4 transition-all ${
                activeTab === 'overview'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-4 px-2 font-semibold border-b-4 transition-all ${
                activeTab === 'schedule'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Schedule Session
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-2 font-semibold border-b-4 transition-all ${
                activeTab === 'messages'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-2 font-semibold border-b-4 transition-all ${
                activeTab === 'resources'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Resources
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <JobCoaching 
              variant="full" 
              isPremium={true} 
              onNavigate={onNavigate}
            />
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">📅 Schedule Your Next Session</h2>
              
              {/* Session Type Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Step 1: Choose Session Type</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {sessionTypes.map((type) => (
                    <button
                      key={type.id}
                      className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-300 hover:border-purple-500 hover:shadow-lg transition-all text-left"
                    >
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <h4 className="font-bold text-slate-900 mb-2">{type.title}</h4>
                      <p className="text-sm text-slate-600 mb-3">{type.description}</p>
                      <div className="flex items-center gap-2 text-sm text-purple-700">
                        <Clock className="w-4 h-4" />
                        {type.duration}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Time Slots */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Step 2: Pick a Time Slot</h3>
                <div className="space-y-4">
                  {availableTimeSlots.map((daySlots) => (
                    <div key={daySlots.day} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                      <div className="font-bold text-slate-900 mb-4">
                        {daySlots.day}, {daySlots.date}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {daySlots.slots.map((slot) => (
                          <button
                            key={slot}
                            className="px-4 py-3 bg-white border-2 border-purple-300 text-purple-700 rounded-lg font-semibold hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all"
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">Booking Confirmation</h4>
                    <p className="text-blue-800 text-sm">
                      After selecting your time slot, you'll receive a calendar invite and video call link via email. Your coach will also send you a preparation guide for the session.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-200 overflow-hidden">
              {/* Messages Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={coachInfo.imageUrl} 
                    alt={coachInfo.name}
                    className="w-16 h-16 rounded-full border-4 border-white object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{coachInfo.name}</h2>
                    <p className="text-indigo-200">{coachInfo.title}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.from === 'student' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md rounded-2xl p-4 ${
                        message.from === 'student'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      <p className="mb-2">{message.text}</p>
                      <div
                        className={`text-xs ${
                          message.from === 'student' ? 'text-purple-200' : 'text-slate-500'
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-slate-200 p-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your message to your coach..."
                    className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-purple-500"
                  />
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all">
                    Send
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  💬 Your coach typically responds within 24 hours. For urgent matters, schedule a quick call.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <button className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl p-6 hover:shadow-xl transition-all">
                <Video className="w-8 h-8 mx-auto mb-3" />
                <div className="font-bold">Request Video Call</div>
                <div className="text-xs text-purple-200 mt-1">Schedule quick 15-min call</div>
              </button>
              <button className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-xl p-6 hover:shadow-xl transition-all">
                <FileText className="w-8 h-8 mx-auto mb-3" />
                <div className="font-bold">Upload Document</div>
                <div className="text-xs text-indigo-200 mt-1">Share resume or cover letter</div>
              </button>
              <button className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6 hover:shadow-xl transition-all">
                <Target className="w-8 h-8 mx-auto mb-3" />
                <div className="font-bold">Update Goals</div>
                <div className="text-xs text-blue-200 mt-1">Share career objectives</div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-cyan-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">📚 Coaching Resources</h2>
              <p className="text-slate-700 mb-8">
                Your coach has shared these exclusive resources to help you succeed in your job search.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-300 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{resource.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-2">{resource.title}</h3>
                        <p className="text-sm text-slate-600 mb-4">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-semibold">
                            {resource.type}
                          </span>
                          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-all text-sm">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">🎓 ZALPHA Training Program Integration</h3>
              <p className="text-purple-100 mb-6">
                Your coach recommends completing these free ZALPHA training sessions to complement your 1-on-1 coaching:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-bold mb-1">🎤 Interview Mastery</div>
                  <div className="text-sm text-purple-200">Next: Feb 5, 6:00 PM</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-bold mb-1">📄 Resume Building</div>
                  <div className="text-sm text-purple-200">Next: Feb 8, 5:00 PM</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-bold mb-1">🌐 LinkedIn Optimization</div>
                  <div className="text-sm text-purple-200">Next: Feb 12, 6:30 PM</div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('training-hub')}
                className="w-full mt-6 px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all"
              >
                Browse All Training Sessions →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}