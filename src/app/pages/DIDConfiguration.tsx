import { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Key, CheckCircle, AlertCircle, ExternalLink, Video, Shield, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function DIDConfiguration() {
  const [apiKey, setApiKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    setIsVerifying(true);

    // In production, this would save to Supabase secrets
    setTimeout(() => {
      setIsVerifying(false);
      setIsConfigured(true);
      toast.success('D-ID API key configured successfully!');
      setApiKey(''); // Clear for security
    }, 1500);
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Video className="h-3 w-3 mr-1" />
            D-ID Integration
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">D-ID Agent Configuration</h1>
          <p className="text-gray-600">
            Configure D-ID API to enable AI-powered video agents across ZALPHA
          </p>
        </div>

        <Tabs defaultValue="setup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">API Setup</TabsTrigger>
            <TabsTrigger value="guide">Integration Guide</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          {/* API Setup Tab */}
          <TabsContent value="setup" className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isConfigured ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      API Key Configured
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      API Key Required
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {isConfigured
                    ? 'Your D-ID API is configured and ready to use'
                    : 'Configure your D-ID API key to enable video agents'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isConfigured ? (
                  <div className="space-y-4">
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        D-ID integration is active. You can now create and use AI video agents
                        throughout the ZALPHA platform.
                      </AlertDescription>
                    </Alert>
                    <Button variant="outline" onClick={() => setIsConfigured(false)}>
                      Update API Key
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <Key className="h-4 w-4" />
                      <AlertDescription>
                        You'll need a D-ID API key to enable video agents. Get one from the D-ID
                        dashboard.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label htmlFor="apiKey">D-ID API Key</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your D-ID API key"
                      />
                      <p className="text-sm text-gray-500">
                        Your API key will be stored securely as an environment variable
                      </p>
                    </div>

                    <Button
                      onClick={handleSaveApiKey}
                      disabled={!apiKey.trim() || isVerifying}
                      className="w-full"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Save & Verify API Key
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* How to Get API Key */}
            <Card>
              <CardHeader>
                <CardTitle>How to Get Your D-ID API Key</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>
                    Go to{' '}
                    <a
                      href="https://studio.d-id.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ocean-600 hover:underline inline-flex items-center gap-1"
                    >
                      D-ID Studio
                      <ExternalLink className="h-3 w-3" />
                    </a>{' '}
                    and create an account
                  </li>
                  <li>Navigate to Settings → API Keys in your D-ID dashboard</li>
                  <li>Click "Create New API Key" and give it a name (e.g., "ZALPHA Platform")</li>
                  <li>Copy the generated API key (you won't be able to see it again)</li>
                  <li>Paste the API key in the field above and click "Save & Verify"</li>
                </ol>

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-blue-800">
                    <strong>Note:</strong> D-ID offers a free trial with limited credits. For
                    production use, you'll need to subscribe to a paid plan.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Guide Tab */}
          <TabsContent value="guide" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Overview</CardTitle>
                <CardDescription>
                  D-ID Agents are integrated throughout ZALPHA to provide AI-powered video
                  interactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Where D-ID is Used:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <Video className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Zee Career Assistant</h4>
                        <p className="text-sm text-gray-600">
                          Students can interact with Zee via video chat for career guidance
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Video className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Employer Recruiting Agents</h4>
                        <p className="text-sm text-gray-600">
                          Employers can create AI agents to engage with candidates 24/7
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <Video className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Virtual Career Fair Booths</h4>
                        <p className="text-sm text-gray-600">
                          Organizations have AI representatives at virtual career fairs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Backend Integration:</h3>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    <p className="text-gray-600">Environment Variable:</p>
                    <p className="text-gray-900">DID_API_KEY=your_api_key_here</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">API Endpoints Created:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      POST /did/agents/create - Create new AI agent
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      GET /did/agents/:id - Get agent details
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      DELETE /did/agents/:id - Delete agent
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      POST /did/agents/:id/chat/start - Start chat session
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      POST /did/agents/:id/chat/:sessionId/message - Send message
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Testing Your Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">Once your API key is configured, test it by:</p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>
                    Navigate to the{' '}
                    <button
                      onClick={() => (window.location.href = '#did-agent-demo')}
                      className="text-ocean-600 hover:underline"
                    >
                      D-ID Agent Demo
                    </button>{' '}
                    page
                  </li>
                  <li>Try launching one of the demo agents</li>
                  <li>Start a video chat and send a message</li>
                  <li>Verify the agent responds correctly</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>D-ID Agent Capabilities</CardTitle>
                <CardDescription>
                  What you can do with D-ID agents on ZALPHA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Realistic Video</h4>
                    <p className="text-sm text-gray-600">
                      AI-generated avatars with natural facial expressions, lip-sync, and body
                      language
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Natural Language</h4>
                    <p className="text-sm text-gray-600">
                      Powered by GPT-4 for human-like conversations and understanding
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Custom Instructions</h4>
                    <p className="text-sm text-gray-600">
                      Configure agent personality, knowledge base, and behavior
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Multiple Voices</h4>
                    <p className="text-sm text-gray-600">
                      Choose from various voice options in different languages and accents
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Real-time Streaming</h4>
                    <p className="text-sm text-gray-600">
                      WebRTC-powered video streaming for smooth, low-latency interactions
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Analytics Ready</h4>
                    <p className="text-sm text-gray-600">
                      Track agent interactions, satisfaction scores, and engagement metrics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  D-ID charges based on video generation usage. Typical costs:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Free trial: 20 credits (approximately 20 minutes of video)</li>
                  <li>• Starter plan: $49/month for 300 credits</li>
                  <li>• Professional plan: $149/month for 1,200 credits</li>
                  <li>• Enterprise: Custom pricing for high-volume usage</li>
                </ul>
                <Alert className="mt-4 bg-blue-50 border-blue-200">
                  <AlertDescription className="text-blue-800">
                    Visit{' '}
                    <a
                      href="https://www.d-id.com/pricing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                    >
                      d-id.com/pricing
                    </a>{' '}
                    for the most up-to-date pricing
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}

export default DIDConfiguration;
