import React, { useState, useEffect, useRef } from 'react';
import * as did from "@d-id/client-sdk";
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Loader2, Video, VideoOff, Send, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface DIDAgentSDKProps {
  agentId?: string;
  agentType?: 'zee' | 'recruiter' | 'career-fair' | 'custom';
  companyName?: string;
  boothInfo?: {
    organizationName: string;
    description: string;
    opportunities: string[];
  };
  onClose?: () => void;
  className?: string;
}

export function DIDAgentSDK({
  agentId: initialAgentId,
  agentType = 'zee',
  companyName,
  boothInfo,
  onClose,
  className = '',
}: DIDAgentSDKProps) {
  const [agentId, setAgentId] = useState<string | null>(initialAgentId || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<string>('disconnected');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent'; content: string }>>([]);
  const [clientKey, setClientKey] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const agentManagerRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859`;

  // Load client key on mount
  useEffect(() => {
    loadClientKey();
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (agentManagerRef.current) {
        agentManagerRef.current.disconnect();
      }
    };
  }, []);

  const loadClientKey = async () => {
    try {
      const response = await fetch(`${API_BASE}/did/client-key`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          allowedDomains: [window.location.origin],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get client key');
      }

      const data = await response.json();
      setClientKey(data.clientKey);
    } catch (err: any) {
      console.error('Error loading client key:', err);
      setError('Failed to initialize D-ID. Please configure your D-ID API key.');
      toast.error('Failed to load client key');
    }
  };

  const createOrGetAgentId = async (): Promise<string> => {
    // If we already have an agent ID, use it
    if (agentId) return agentId;

    // Otherwise, create a new agent via backend
    try {
      const response = await fetch(`${API_BASE}/did/agents/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentType,
          companyName,
          boothInfo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create agent');
      }

      const data = await response.json();
      const newAgentId = data.agent.id;
      setAgentId(newAgentId);
      return newAgentId;
    } catch (err: any) {
      console.error('Error creating agent:', err);
      throw err;
    }
  };

  const connectToAgent = async () => {
    if (!clientKey) {
      toast.error('Client key not loaded. Please try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get or create agent ID
      const currentAgentId = await createOrGetAgentId();

      if (!videoRef.current) {
        throw new Error('Video element not ready');
      }

      // D-ID SDK callbacks
      const callbacks = {
        onSrcObjectReady: (srcObject: MediaStream) => {
          console.log('Video stream ready');
          if (videoRef.current) {
            videoRef.current.srcObject = srcObject;
          }
        },
        onConnectionStateChange: (state: string) => {
          console.log('Connection state:', state);
          setConnectionState(state);
          
          if (state === 'connected') {
            setIsConnected(true);
            toast.success('Connected to agent!');
          } else if (state === 'disconnected') {
            setIsConnected(false);
          } else if (state === 'failed') {
            setError('Connection failed');
            toast.error('Failed to connect to agent');
          }
        },
        onNewMessage: (newMessages: any[], type: string) => {
          console.log('New messages:', newMessages, 'Type:', type);
          
          // Add agent responses to chat
          if (type === 'agent' && newMessages.length > 0) {
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.content) {
              setMessages((prev) => [...prev, { 
                role: 'agent', 
                content: lastMessage.content 
              }]);
            }
          }
        },
      };

      // Create agent manager with D-ID SDK
      const auth = { 
        type: 'key' as const, 
        clientKey 
      };

      console.log('Creating agent manager for agent:', currentAgentId);
      const agentManager = await did.createAgentManager(currentAgentId, { 
        auth, 
        callbacks 
      });

      agentManagerRef.current = agentManager;

      // Connect to the agent
      await agentManager.connect();
      
    } catch (err: any) {
      console.error('Error connecting to agent:', err);
      setError(err.message);
      toast.error('Failed to connect: ' + err.message);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!message.trim() || !agentManagerRef.current || !isConnected) return;

    const userMessage = message.trim();
    setMessage('');
    
    // Add user message to chat immediately
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Send message to D-ID agent
      await agentManagerRef.current.chat(userMessage);
    } catch (err: any) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message: ' + err.message);
    }
  };

  const disconnect = async () => {
    if (agentManagerRef.current) {
      try {
        await agentManagerRef.current.disconnect();
        agentManagerRef.current = null;
      } catch (err) {
        console.error('Error disconnecting:', err);
      }
    }
    setIsConnected(false);
    setConnectionState('disconnected');
    setMessages([]);
    toast.info('Disconnected from agent');
  };

  const getAgentTitle = () => {
    switch (agentType) {
      case 'zee':
        return 'Zee - Your AI Career Assistant';
      case 'recruiter':
        return `${companyName || 'Recruiter'} AI Assistant`;
      case 'career-fair':
        return `${boothInfo?.organizationName || 'Virtual Booth'} Representative`;
      default:
        return 'AI Agent';
    }
  };

  const getAgentDescription = () => {
    switch (agentType) {
      case 'zee':
        return 'Ask me anything about jobs, careers, or the ZALPHA platform!';
      case 'recruiter':
        return 'Learn about our company and available opportunities';
      case 'career-fair':
        return 'Welcome to our virtual booth! Ask me about our organization.';
      default:
        return 'AI-powered virtual assistant';
    }
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto ${className}`}>
      <CardHeader className="bg-gradient-to-r from-ocean-500 to-ocean-600 text-white">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Video className="h-6 w-6" />
              {getAgentTitle()}
            </CardTitle>
            <CardDescription className="text-ocean-50">
              {getAgentDescription()}
            </CardDescription>
            {connectionState !== 'disconnected' && (
              <div className="mt-2 text-sm text-ocean-100">
                Status: {connectionState}
              </div>
            )}
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-ocean-700"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Connection Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {!clientKey && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
            <p className="font-semibold">D-ID Not Configured</p>
            <p className="text-sm">Please configure your D-ID API key in the settings.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Video Section */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 text-ocean-500 animate-spin mx-auto mb-4" />
                    <p className="text-white text-sm">Connecting to agent...</p>
                  </div>
                </div>
              )}
              
              <video
                ref={videoRef}
                id="agent-video"
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />

              {!isConnected && !loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white p-8 text-center">
                  <div>
                    <Video className="h-16 w-16 mx-auto mb-4 text-ocean-400" />
                    <p className="text-lg mb-4">Ready to connect</p>
                    <Button 
                      onClick={connectToAgent} 
                      disabled={loading || !clientKey}
                      className="bg-ocean-500 hover:bg-ocean-600"
                    >
                      Start Video Chat
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="flex items-center justify-center gap-2">
              {isConnected && (
                <Button variant="destructive" size="sm" onClick={disconnect}>
                  Disconnect
                </Button>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex flex-col h-[400px]">
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg"
            >
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>Start a conversation with the agent</p>
                  <p className="text-sm mt-2">Connect to the video chat and send a message!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-ocean-500 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder={isConnected ? "Type your message..." : "Connect to start chatting"}
                disabled={!isConnected}
                className="flex-1"
              />
              <Button
                onClick={sendChatMessage}
                disabled={!isConnected || !message.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DIDAgentSDK;
