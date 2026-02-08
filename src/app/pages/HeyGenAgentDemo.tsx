import { ArrowLeft, ExternalLink, Play, Lock, Sparkles, Video, MessageSquare, Zap } from 'lucide-react';

interface HeyGenAgentDemoProps {
  onNavigate: (page: string) => void;
}

export function HeyGenAgentDemo({ onNavigate }: HeyGenAgentDemoProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-700 via-blue-700 to-cyan-800 text-white py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('employer-dashboard')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                AI Interview Assistant
              </h1>
              <p className="text-cyan-100 text-lg">
                Revolutionary Interactive AI Agent Technology
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl p-8 mb-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-12 h-12 animate-pulse" />
              <h2 className="text-4xl font-bold">Coming Soon!</h2>
              <Sparkles className="w-12 h-12 animate-pulse" />
            </div>
            <p className="text-2xl font-semibold mb-2">
              Interactive AI Interview Agents
            </p>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              We're finalizing the integration of HeyGen's cutting-edge interactive avatar technology. 
              This revolutionary feature will be available exclusively to Ultra Premium subscribers.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <Lock className="w-5 h-5" />
              <span className="font-semibold">Launching in Beta Phase 2</span>
            </div>
          </div>
        </div>

        {/* Video Preview Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-cyan-200 mb-8">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Preview: What's Coming
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Watch this demo video to see how AI interview agents will transform your hiring process
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border-4 border-slate-300" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/lcI_g3_PfF4"
                title="ZALPHA AI Interview Agent Demo"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          </div>

          <div className="bg-cyan-50 border-2 border-cyan-300 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <h4 className="font-bold text-cyan-900 mb-1">About This Feature</h4>
                <p className="text-cyan-800 text-sm">
                  When launched, this will be a fully interactive AI agent that candidates can have real-time voice conversations with. 
                  The demo video shows the technology in action, but the live version will allow two-way communication!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What This Will Do */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-3">🎯 What Interactive AI Agents Will Do</h2>
          <p className="text-white/90 mb-4">
            Once launched, your AI interview agents will be able to:
          </p>
          <ul className="space-y-2 text-white/90">
            <li className="flex items-start gap-2">
              <span className="text-xl">✅</span>
              <span>Conduct natural voice conversations with candidates in real-time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">✅</span>
              <span>Ask customized interview questions based on your job requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">✅</span>
              <span>Provide intelligent follow-up questions based on candidate responses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">✅</span>
              <span>Create a more engaging and human-like interview experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">✅</span>
              <span>Generate detailed interview transcripts and analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">✅</span>
              <span>Screen hundreds of candidates 24/7 without human intervention</span>
            </li>
          </ul>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Natural Conversations
            </h3>
            <p className="text-slate-600 text-sm">
              AI agents use advanced speech recognition and natural language processing to have fluid, natural conversations with candidates.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Intelligent Responses
            </h3>
            <p className="text-slate-600 text-sm">
              Powered by GPT-4, agents understand context, ask relevant follow-up questions, and provide meaningful feedback.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Real-Time Interaction
            </h3>
            <p className="text-slate-600 text-sm">
              Instant responses with lifelike avatar animations and synchronized lip movements for a truly immersive experience.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200 mb-8">
          <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">⚙️</span>
            <span>How It Will Work</span>
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <h5 className="font-bold text-slate-900 mb-1">Create Your AI Agent</h5>
                <p className="text-slate-600 text-sm">Customize your agent's appearance, voice, and interview questions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <h5 className="font-bold text-slate-900 mb-1">Share with Candidates</h5>
                <p className="text-slate-600 text-sm">Send candidates a link to meet with your AI interviewer</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <h5 className="font-bold text-slate-900 mb-1">AI Conducts Interview</h5>
                <p className="text-slate-600 text-sm">The agent has natural conversations and asks intelligent follow-ups</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-pink-500 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold">4</div>
              <div>
                <h5 className="font-bold text-slate-900 mb-1">Review Results</h5>
                <p className="text-slate-600 text-sm">Get transcripts, scoring, and AI-powered candidate analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ultra Premium CTA */}
        <div className="bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-700 rounded-2xl p-8 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-8 h-8" />
            <h3 className="text-2xl font-bold">
              Ultra Premium Exclusive Feature
            </h3>
          </div>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
            Interactive AI Interview Agents will be available exclusively to Ultra Premium subscribers. 
            Automate your first-round interviews, save countless hours, and provide a cutting-edge candidate experience 
            that sets your company apart.
          </p>
          <button
            onClick={() => onNavigate('employer-signup')}
            className="px-8 py-4 bg-white text-cyan-700 rounded-xl font-bold text-lg hover:bg-cyan-50 transition-colors shadow-lg"
          >
            Upgrade to Ultra Premium - $499/month
          </button>
          <p className="text-white/70 text-sm mt-3">
            Limited-time beta pricing • Normally $799/month • AI Agents launching soon!
          </p>
        </div>

        {/* Notify Me Section */}
        <div className="mt-8 bg-white rounded-2xl p-6 border-2 border-purple-200 text-center">
          <h4 className="text-xl font-bold text-slate-900 mb-2">
            🔔 Be the First to Know
          </h4>
          <p className="text-slate-600 mb-4">
            Ultra Premium subscribers will receive early access when AI Interview Agents launch
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-600 font-semibold">
            <Sparkles className="w-5 h-5" />
            <span>Coming in Beta Phase 2</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}