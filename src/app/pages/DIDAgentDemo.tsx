import { useState, useEffect } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { DIDAgentSDK } from '../components/DIDAgentSDK';
import { Video, Users, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export function DIDAgentDemo() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [agentLoaded, setAgentLoaded] = useState(false);

  // Load D-ID agent script when demo is selected
  useEffect(() => {
    if (selectedDemo === 'zee' && !agentLoaded) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://agent.d-id.com/v2/index.js';
      script.setAttribute('data-mode', 'full');
      script.setAttribute('data-client-key', 'Z29vZ2xlLW9hdXRoMnwxMDYxMzg4MTEwOTY5MzcyMzIyNzg6d2puM2h6T1RZU0p1WEpTdmlmZVRP');
      script.setAttribute('data-agent-id', 'v2_agt_JVnX5fkj');
      script.setAttribute('data-name', 'did-agent');
      script.setAttribute('data-monitor', 'true');
      script.setAttribute('data-target-id', 'zal-agent');
      
      document.body.appendChild(script);
      setAgentLoaded(true);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [selectedDemo, agentLoaded]);

  const demoOptions = [
    {
      id: 'zee',
      title: 'Zee - Career Assistant',
      description: 'Experience ZALPHA\'s AI career coach helping students with job search and career guidance',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      agentType: 'zee' as const,
    },
    {
      id: 'recruiter',
      title: 'Virtual Recruiter',
      description: 'See how employers can use AI agents to screen candidates and answer questions 24/7',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
      agentType: 'recruiter' as const,
      companyName: 'Pacific Tech Solutions',
    },
    {
      id: 'career-fair',
      title: 'Career Fair Booth',
      description: 'Virtual booth representative engaging with students at digital career fairs',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      agentType: 'career-fair' as const,
      boothInfo: {
        organizationName: 'Pacific Island University',
        description: 'A leading university offering programs in technology, business, and marine science',
        opportunities: ['Undergraduate Programs', 'Scholarships', 'Research Positions', 'Graduate Studies'],
      },
    },
  ];

  if (selectedDemo) {
    const demo = demoOptions.find((d) => d.id === selectedDemo);
    
    // If Zee agent is selected, show the D-ID embed
    if (selectedDemo === 'zee') {
      return (
        <PageContainer>
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Button variant="outline" onClick={() => {
                setSelectedDemo(null);
                setAgentLoaded(false);
              }}>
                ← Back to Demos
              </Button>
            </div>
            
            {/* D-ID Agent Embed */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Meet Zee - Your AI Career Assistant 🌺
                </h2>
                <p className="text-gray-600">
                  Ask Zee about job opportunities, career advice, resume tips, and more! 
                  Zee is here to help Pacific Island students navigate their career journey.
                </p>
              </div>
              
              <div
                id="zal-agent"
                style={{
                  width: '100%',
                  height: '80vh',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              />
            </div>
          </div>
        </PageContainer>
      );
    }
    
    // For other demos, use the existing DIDAgentSDK component
    return (
      <PageContainer>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setSelectedDemo(null)}>
              ← Back to Demos
            </Button>
          </div>
          <DIDAgentSDK
            agentType={demo?.agentType}
            companyName={demo?.companyName}
            boothInfo={demo?.boothInfo}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Video className="h-3 w-3 mr-1" />
            D-ID AI Agents
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered Video Agents
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience next-generation AI interactions with realistic video avatars powered by D-ID technology
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Video className="h-8 w-8 text-ocean-500 mb-2" />
              <CardTitle className="text-lg">Realistic Video</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                AI-generated video avatars with natural facial expressions and lip-sync
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Sparkles className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle className="text-lg">Natural Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Advanced language models for human-like conversations and responses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-lg">24/7 Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Always available to help students and employers, any time of day
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Options */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Try Our AI Agents</h2>
          
          {demoOptions.map((demo) => (
            <Card
              key={demo.id}
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-ocean-300"
              onClick={() => setSelectedDemo(demo.id)}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${demo.color}`}>
                    <demo.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{demo.title}</CardTitle>
                    <CardDescription className="text-base">{demo.description}</CardDescription>
                  </div>
                  <Button>
                    Launch Demo
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-r from-ocean-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why D-ID AI Agents?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">For Students</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Get instant career guidance and job search help</li>
                <li>• Practice interview skills with AI agents</li>
                <li>• Learn about companies and opportunities interactively</li>
                <li>• Access support 24/7 in your timezone</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">For Employers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Engage candidates with personalized video interactions</li>
                <li>• Answer common questions automatically</li>
                <li>• Scale your recruitment without increasing staff</li>
                <li>• Create memorable virtual career fair experiences</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About D-ID Technology</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            <p className="mb-4">
              D-ID is a leading AI video generation platform that creates realistic digital humans.
              Their Agents API combines:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Advanced facial animation and lip-sync technology</li>
              <li>Natural language processing for conversational AI</li>
              <li>Real-time video streaming capabilities</li>
              <li>Customizable avatars and voices</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              ZALPHA integrates D-ID to provide cutting-edge AI interactions that feel natural and engaging.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

export default DIDAgentDemo;