import React, { useState, useEffect, useRef } from 'react';
import * as did from "@d-id/client-sdk";
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Loader2, Mic, MicOff, Video, VideoOff, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface DIDAgentProps {
  agentId?: string;
  agentType?: 'zee' | 'recruiter' | 'career-fair' | 'custom' | 'interviewer';
  agentConfig?: any;
  companyName?: string;
  boothInfo?: {
    organizationName: string;
    description: string;
    opportunities: string[];
  };
  onClose?: () => void;
  className?: string;
  standalone?: boolean;
}

export function DIDAgent({
  agentId: initialAgentId,
  agentType = 'zee',
  agentConfig,
  companyName,
  boothInfo,
  onClose,
  className = '',
  standalone = false,
}: DIDAgentProps) {
  const [agentId, setAgentId] = useState<string | null>(initialAgentId || null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent'; content: string }>>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859`;

  // Initialize agent if not provided
  useEffect(() => {
    if (!agentId) {
      createAgent();
    }
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const createAgent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/did/agents/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentType,
          config: agentConfig,
          companyName,
          boothInfo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create agent');
      }

      const data = await response.json();
      setAgentId(data.agent.id);
      toast.success('Agent created successfully!');
    } catch (err: any) {
      console.error('Error creating agent:', err);
      setError(err.message);
      toast.error('Failed to create agent: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const startChat = async () => {
    if (!agentId) {
      toast.error('No agent available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/did/agents/${agentId}/chat/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start chat');
      }

      const data = await response.json();
      setSessionId(data.sessionId);
      
      // Set up WebRTC connection for video streaming
      if (data.chatSession?.stream_url) {
        await setupWebRTC(data.chatSession.stream_url, data.chatSession.ice_servers);
      }
      
      setIsConnected(true);
      toast.success('Connected to agent!');
    } catch (err: any) {
      console.error('Error starting chat:', err);
      setError(err.message);
      toast.error('Failed to start chat: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const setupWebRTC = async (streamUrl: string, iceServers: any[]) => {
    try {
      // Create RTCPeerConnection
      const peerConnection = new RTCPeerConnection({
        iceServers: iceServers || [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      peerConnectionRef.current = peerConnection;

      // Handle incoming video stream
      peerConnection.ontrack = (event) => {
        if (videoRef.current && event.streams[0]) {
          videoRef.current.srcObject = event.streams[0];
        }
      };

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('ICE candidate:', event.candidate);
          // Send ICE candidate to D-ID server if needed
        }
      };

      // Create offer and set local description
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      console.log('WebRTC connection established');
    } catch (err) {
      console.error('WebRTC setup error:', err);
      toast.error('Failed to establish video connection');
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !agentId || !sessionId) return;

    const userMessage = message.trim();
    setMessage('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch(
        `${API_BASE}/did/agents/${agentId}/chat/${sessionId}/message`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      
      // Add agent response to messages
      if (data.response?.content) {
        setMessages((prev) => [...prev, { role: 'agent', content: data.response.content }]);
      }
    } catch (err: any) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message: ' + err.message);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Implement audio muting logic
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    if (videoRef.current) {
      videoRef.current.style.display = isVideoEnabled ? 'none' : 'block';
    }
  };

  const disconnect = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setIsConnected(false);
    setSessionId(null);
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
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Video Section */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
                  <Loader2 className="h-12 w-12 text-ocean-500 animate-spin" />
                </div>
              )}
              
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                style={{ display: isVideoEnabled ? 'block' : 'none' }}
              />
              
              {/* Hide D-ID watermark - overlay bottom right corner */}
              <div className="absolute bottom-0 right-0 w-32 h-16 bg-gray-900 z-10" />

              {!isVideoEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-20">
                  <VideoOff className="h-16 w-16 text-gray-500" />
                </div>
              )}

              {!isConnected && !loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white p-8 text-center z-20">
                  <div>
                    <Video className="h-16 w-16 mx-auto mb-4 text-ocean-400" />
                    <p className="text-lg mb-4">Ready to connect</p>
                    <Button onClick={startChat} disabled={!agentId || loading}>
                      Start Video Chat
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
                disabled={!isConnected}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleVideo}
                disabled={!isConnected}
              >
                {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
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
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                disabled={!isConnected}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
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

export default DIDAgent;