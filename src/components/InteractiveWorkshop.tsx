import { useState } from 'react';
import { Video, MessageSquare, Users, Award, Download, CheckCircle, Clock, Calendar, Mic, MicOff, VideoOff, Share2, ThumbsUp, Hand } from 'lucide-react';

interface WorkshopParticipant {
  id: string;
  name: string;
  role: 'instructor' | 'participant';
  avatar: string;
  speaking: boolean;
  handRaised: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

interface Poll {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
  totalVotes: number;
}

interface InteractiveWorkshopProps {
  workshopTitle: string;
  instructor: string;
  duration: string;
  onComplete: () => void;
  onExit: () => void;
}

export function InteractiveWorkshop({ workshopTitle, instructor, duration, onComplete, onExit }: InteractiveWorkshopProps) {
  const [view, setView] = useState<'lobby' | 'session' | 'complete'>('lobby');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'qa' | 'poll'>('chat');

  const [participants] = useState<WorkshopParticipant[]>([
    { id: '1', name: instructor, role: 'instructor', avatar: '👨‍🏫', speaking: true, handRaised: false },
    { id: '2', name: 'Maria Santos', role: 'participant', avatar: '👩', speaking: false, handRaised: false },
    { id: '3', name: 'John Nakamura', role: 'participant', avatar: '👨', speaking: false, handRaised: false },
    { id: '4', name: 'Lisa Chen', role: 'participant', avatar: '👩‍💼', speaking: false, handRaised: false },
    { id: '5', name: 'You', role: 'participant', avatar: '🙋', speaking: false, handRaised: false }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'System', message: 'Welcome to the workshop! Please introduce yourself in the chat.', timestamp: '2:00 PM' },
    { id: '2', sender: instructor, message: 'Hello everyone! Thank you for joining today\'s cultural sensitivity training.', timestamp: '2:01 PM' },
    { id: '3', sender: 'Maria Santos', message: 'Excited to learn about Pacific Island workplace culture!', timestamp: '2:02 PM' }
  ]);

  const [poll] = useState<Poll>({
    id: '1',
    question: 'Have you worked with Pacific Island colleagues before?',
    options: [
      { text: 'Yes, extensively', votes: 8 },
      { text: 'Yes, a little', votes: 15 },
      { text: 'No, this is new to me', votes: 9 },
      { text: 'I am from the Pacific Islands', votes: 12 }
    ],
    totalVotes: 44
  });

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'You',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  if (view === 'lobby') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{workshopTitle}</h1>
            <div className="flex items-center gap-4 text-purple-100">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {instructor}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {duration}
              </span>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Workshop Lobby</h2>
            
            {/* Audio/Video Check */}
            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Audio & Video Check</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mic className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Microphone</span>
                  </div>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      isMuted ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}
                  >
                    {isMuted ? 'Muted' : 'Active'}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Camera</span>
                  </div>
                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      isVideoOff ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}
                  >
                    {isVideoOff ? 'Off' : 'On'}
                  </button>
                </div>
              </div>
            </div>

            {/* Workshop Guidelines */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Workshop Guidelines</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Keep your microphone muted unless speaking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Use the "Raise Hand" feature to ask questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Participate in polls and group discussions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Respect diverse perspectives and experiences</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Complete the entire session to earn your certificate</span>
                </li>
              </ul>
            </div>

            {/* Join Button */}
            <div className="flex gap-4">
              <button
                onClick={() => setView('session')}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold text-lg shadow-lg"
              >
                Join Workshop
              </button>
              <button
                onClick={onExit}
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white text-center">
            <Award className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
            <p className="text-green-100">You've completed the workshop</p>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate of Completion</h2>
              <p className="text-gray-600">{workshopTitle}</p>
            </div>

            {/* Certificate Preview */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border-4 border-purple-300 mb-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🏆</div>
                <p className="text-sm text-gray-600 mb-2">This certifies that</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">Your Name</p>
                <p className="text-sm text-gray-600 mb-2">has successfully completed</p>
                <p className="text-lg font-semibold text-purple-700 mb-4">{workshopTitle}</p>
                <p className="text-sm text-gray-600 mb-2">Presented by {instructor}</p>
                <p className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                
                <div className="mt-6 pt-6 border-t border-purple-200">
                  <div className="flex items-center justify-center gap-8">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="font-semibold text-gray-900">{duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Skills Verified</p>
                      <p className="font-semibold text-gray-900">Cultural Competence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Certificate (PDF)
              </button>
              <button
                className="w-full px-8 py-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Add to LinkedIn Profile
              </button>
              <button
                onClick={onComplete}
                className="w-full px-8 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Return to Training Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Workshop Session View
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-lg">{workshopTitle}</h1>
            <p className="text-gray-400 text-sm">{instructor}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-semibold">LIVE</span>
            </div>
            <div className="text-gray-400 text-sm">
              <Clock className="w-4 h-4 inline mr-1" />
              45:30 / {duration}
            </div>
            <button
              onClick={() => setView('complete')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              End Session
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className={`relative bg-gray-800 rounded-lg overflow-hidden aspect-video ${
                  participant.speaking ? 'ring-4 ring-green-500' : ''
                }`}
              >
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  {participant.avatar}
                </div>
                
                {/* Participant Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-sm">{participant.name}</span>
                    <div className="flex items-center gap-2">
                      {participant.handRaised && (
                        <Hand className="w-4 h-4 text-yellow-400" />
                      )}
                      {participant.role === 'instructor' && (
                        <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">Instructor</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Presentation Slide Area */}
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Understanding "Inafa'maolek" in the Workplace
              </h2>
              <p className="text-xl text-gray-700">
                The CHamoru concept of interdependence and making things right for the collective good
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Key Principles:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Harmony over individual achievement</p>
                      <p className="text-gray-700 text-sm">Decisions prioritize group welfare and maintaining relationships</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Indirect communication to preserve face</p>
                      <p className="text-gray-700 text-sm">Avoiding direct confrontation or criticism in public settings</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Collective responsibility</p>
                      <p className="text-gray-700 text-sm">Success and failures are shared by the entire team</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Workplace Applications:</h3>
                <p className="text-gray-700 mb-3">
                  When giving feedback, frame it in terms of how it benefits the team rather than criticizing individual performance. 
                  Allow time for consensus-building rather than forcing quick decisions. Recognize team achievements publicly while 
                  addressing individual concerns privately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Chat/Q&A/Polls */}
        {showChat && (
          <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 px-4 py-3 font-semibold transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-5 h-5 inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab('poll')}
                className={`flex-1 px-4 py-3 font-semibold transition-colors ${
                  activeTab === 'poll'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Poll
              </button>
            </div>

            {/* Chat Messages */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white text-sm">{msg.sender}</span>
                        <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Poll */}
            {activeTab === 'poll' && (
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-white font-bold mb-4">{poll.question}</h3>
                <div className="space-y-3">
                  {poll.options.map((option, index) => {
                    const percentage = Math.round((option.votes / poll.totalVotes) * 100);
                    return (
                      <button
                        key={index}
                        className="w-full bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors text-left"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold text-sm">{option.text}</span>
                          <span className="text-gray-400 text-sm">{percentage}%</span>
                        </div>
                        <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-600 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="text-gray-400 text-sm mt-4">{poll.totalVotes} total votes</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-lg transition-colors ${
                isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
            </button>
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-lg transition-colors ${
                isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5 text-white" /> : <Video className="w-5 h-5 text-white" />}
            </button>
            <button
              onClick={() => setHandRaised(!handRaised)}
              className={`p-3 rounded-lg transition-colors ${
                handRaised ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Hand className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowChat(!showChat)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              {showChat ? 'Hide' : 'Show'} Chat
            </button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2"
            >
              <ThumbsUp className="w-5 h-5" />
              React
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
