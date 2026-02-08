import { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { DIDAgent } from '../components/DIDAgent';
import { Video, Settings, Users, MessageSquare, BarChart, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface RecruiterAgent {
  id: string;
  name: string;
  companyName: string;
  didAgentId?: string;
  description: string;
  status: 'active' | 'inactive' | 'creating';
  interactions: number;
  createdAt: string;
}

export function EmployerAIAgents() {
  const [agents, setAgents] = useState<RecruiterAgent[]>([
    {
      id: '1',
      name: 'Primary Recruiter',
      companyName: 'Pacific Tech Solutions',
      didAgentId: 'agent_12345',
      description: 'Main recruiting agent for all positions',
      status: 'active',
      interactions: 247,
      createdAt: '2026-01-15',
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    description: '',
    instructions: '',
    voiceId: 'en-US-GuyNeural',
  });

  const handleCreateAgent = async () => {
    if (!formData.name || !formData.companyName) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newAgent: RecruiterAgent = {
      id: Date.now().toString(),
      name: formData.name,
      companyName: formData.companyName,
      description: formData.description,
      status: 'creating',
      interactions: 0,
      createdAt: new Date().toISOString(),
    };

    setAgents([...agents, newAgent]);
    setShowCreateForm(false);
    toast.success('Creating AI agent...');

    // Reset form
    setFormData({
      name: '',
      companyName: '',
      description: '',
      instructions: '',
      voiceId: 'en-US-GuyNeural',
    });

    // Simulate agent creation (in production, this would call the backend)
    setTimeout(() => {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === newAgent.id
            ? { ...agent, status: 'active' as const, didAgentId: 'agent_' + newAgent.id }
            : agent
        )
      );
      toast.success('AI agent created successfully!');
    }, 2000);
  };

  const handleDeleteAgent = (agentId: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      setAgents(agents.filter((a) => a.id !== agentId));
      toast.success('Agent deleted');
    }
  };

  const agent = agents.find((a) => a.id === selectedAgent);

  if (selectedAgent && agent) {
    return (
      <PageContainer>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setSelectedAgent(null)}>
              ← Back to Agents
            </Button>
          </div>
          <DIDAgent
            agentType="recruiter"
            companyName={agent.companyName}
            agentConfig={{
              llm: {
                instructions: `You are a recruitment assistant for ${agent.companyName}. ${agent.description}`,
              },
            }}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Recruiting Agents</h1>
              <p className="text-gray-600">
                Automate candidate engagement with AI-powered video agents
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-gradient-to-r from-ocean-500 to-ocean-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Agent
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Total Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{agents.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Active Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {agents.filter((a) => a.status === 'active').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Total Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-ocean-600">
                  {agents.reduce((sum, a) => sum + a.interactions, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Avg. Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">4.8/5</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Create Agent Form */}
        {showCreateForm && (
          <Card className="mb-8 border-2 border-ocean-300">
            <CardHeader className="bg-gradient-to-r from-ocean-50 to-purple-50">
              <CardTitle>Create New AI Agent</CardTitle>
              <CardDescription>
                Set up an AI-powered recruiter to engage with candidates 24/7
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Agent Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Primary Recruiter"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g., Pacific Tech Solutions"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of this agent's purpose"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="instructions">Custom Instructions (Optional)</Label>
                  <Textarea
                    id="instructions"
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    placeholder="Add specific instructions for how this agent should interact with candidates..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="voiceId">Voice</Label>
                  <select
                    id="voiceId"
                    value={formData.voiceId}
                    onChange={(e) => setFormData({ ...formData, voiceId: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="en-US-GuyNeural">Male (Guy - US English)</option>
                    <option value="en-US-JennyNeural">Female (Jenny - US English)</option>
                    <option value="en-US-AriaNeural">Female (Aria - US English)</option>
                    <option value="en-GB-RyanNeural">Male (Ryan - UK English)</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateAgent} className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Agent
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Agents List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your AI Agents</h2>

          {agents.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first AI recruiting agent to start engaging with candidates
                </p>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Agent
                </Button>
              </CardContent>
            </Card>
          ) : (
            agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Agent Avatar */}
                    <div className="w-20 h-20 bg-gradient-to-br from-ocean-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Video className="h-10 w-10 text-white" />
                    </div>

                    {/* Agent Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                          <p className="text-gray-600">{agent.companyName}</p>
                        </div>
                        <Badge
                          variant={agent.status === 'active' ? 'default' : 'secondary'}
                          className={
                            agent.status === 'active'
                              ? 'bg-green-500'
                              : agent.status === 'creating'
                              ? 'bg-yellow-500'
                              : 'bg-gray-500'
                          }
                        >
                          {agent.status}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4">{agent.description}</p>

                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {agent.interactions} interactions
                        </div>
                        <div>Created {new Date(agent.createdAt).toLocaleDateString()}</div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setSelectedAgent(agent.id)}
                          disabled={agent.status !== 'active'}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Test Agent
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-1" />
                          Settings
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteAgent(agent.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Benefits Section */}
        <Card className="mt-8 bg-gradient-to-r from-ocean-50 to-purple-50">
          <CardHeader>
            <CardTitle>Why Use AI Recruiting Agents?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Increase Engagement</h4>
                <p className="text-gray-600 text-sm">
                  Candidates are 3x more likely to engage with video interactions than text-only forms
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">24/7 Availability</h4>
                <p className="text-gray-600 text-sm">
                  Your AI agent never sleeps - candidates can interact any time, anywhere
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Scale Effortlessly</h4>
                <p className="text-gray-600 text-sm">
                  Handle hundreds of candidate conversations simultaneously without adding staff
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Consistent Experience</h4>
                <p className="text-gray-600 text-sm">
                  Every candidate gets the same high-quality, professional interaction
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

export default EmployerAIAgents;
