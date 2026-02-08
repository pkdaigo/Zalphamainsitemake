# D-ID Agents API Integration - Complete Guide

## Overview

ZALPHA has successfully integrated D-ID's Agents API to provide AI-powered video avatars throughout the platform. This integration enables realistic, conversational AI agents that can engage with students, employers, and educational institutions through video interactions.

## What is D-ID?

D-ID is a leading AI video generation platform that creates realistic digital humans capable of:
- Natural facial expressions and lip-sync
- Real-time conversational interactions
- Customizable avatars and voices
- Multi-language support
- Streaming video delivery via WebRTC

## Integration Components

### 1. Backend Integration (`/supabase/functions/server/did-integration.tsx`)

**Core Functions:**
- `createAgent()` - Creates a new D-ID agent with custom configuration
- `getAgent()` - Retrieves agent details by ID
- `deleteAgent()` - Removes an agent
- `startAgentChat()` - Initiates a chat session with an agent
- `sendAgentMessage()` - Sends messages to an agent in a chat session
- `listAgents()` - Lists all agents with pagination

**Pre-configured Agent Types:**
- `createZeeAgent()` - ZALPHA's career assistant
- `createRecruiterAgent()` - Employer recruiting agents
- `createCareerFairAgent()` - Virtual career fair booth representatives

### 2. API Endpoints (`/supabase/functions/server/index.tsx`)

All endpoints are prefixed with `/make-server-9bd83859/did/`

**Endpoints:**
```
POST   /agents/create                          - Create new agent
GET    /agents/:agentId                        - Get agent details
DELETE /agents/:agentId                        - Delete agent
POST   /agents/:agentId/chat/start            - Start chat session
POST   /agents/:agentId/chat/:sessionId/message - Send message
GET    /agents                                 - List all agents
```

### 3. Frontend Components

#### `DIDAgent.tsx`
Main component for rendering and interacting with D-ID agents.

**Props:**
- `agentId` - Existing agent ID (optional)
- `agentType` - Type: 'zee', 'recruiter', 'career-fair', or 'custom'
- `agentConfig` - Custom configuration object
- `companyName` - Company name for recruiter agents
- `boothInfo` - Organization info for career fair agents
- `onClose` - Callback for closing the agent
- `className` - Additional CSS classes

**Features:**
- Video streaming with WebRTC
- Text chat interface
- Audio/video controls
- Session management
- Responsive design

#### `VirtualBoothAgent.tsx`
Wrapper component for embedding D-ID agents in virtual career fair booths.

#### `ZeeBotWrapper.tsx` (Updated)
Enhanced to include both text-based and video-based Zee interactions.

### 4. Pages

#### `DIDAgentDemo.tsx`
Demonstration page showcasing all agent types:
- Zee Career Assistant demo
- Virtual Recruiter demo
- Career Fair Booth demo

#### `EmployerAIAgents.tsx`
Employer dashboard for managing recruiting agents:
- Create and configure AI agents
- View agent analytics
- Test agents
- Manage agent lifecycle

#### `DIDConfiguration.tsx`
Admin configuration page for:
- Setting up D-ID API credentials
- Integration status monitoring
- Setup instructions
- Feature documentation

## Setup Instructions

### 1. Get D-ID API Key

1. Go to [D-ID Studio](https://studio.d-id.com)
2. Create an account or sign in
3. Navigate to Settings → API Keys
4. Create a new API key
5. Copy the key (save it securely - you won't see it again)

### 2. Configure API Key in Supabase

The D-ID API key must be stored as an environment variable in your Supabase project:

```bash
DID_API_KEY=your_api_key_here
```

**To set this up:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → Edge Functions → Secrets
3. Add a new secret named `DID_API_KEY`
4. Paste your D-ID API key as the value

### 3. Deploy Backend Changes

The backend integration is already deployed. The D-ID integration file is located at:
```
/supabase/functions/server/did-integration.tsx
```

### 4. Test the Integration

1. Navigate to `/did-configuration` in ZALPHA
2. Enter your D-ID API key
3. Save and verify
4. Go to `/did-agent-demo` to test different agent types

## Usage Examples

### Creating Zee Agent (Career Assistant)

```typescript
import { DIDAgent } from './components/DIDAgent';

<DIDAgent
  agentType="zee"
  onClose={() => console.log('Agent closed')}
/>
```

### Creating Recruiter Agent

```typescript
<DIDAgent
  agentType="recruiter"
  companyName="Pacific Tech Solutions"
  agentConfig={{
    llm: {
      instructions: "Focus on software engineering positions..."
    }
  }}
/>
```

### Creating Career Fair Booth Agent

```typescript
<DIDAgent
  agentType="career-fair"
  boothInfo={{
    organizationName: "University of Guam",
    description: "Leading university in the Pacific",
    opportunities: ["Undergraduate Programs", "Scholarships", "Research"]
  }}
/>
```

## Use Cases in ZALPHA

### 1. Student Experience
- **Zee Career Assistant**: Students can talk to Zee via video for career guidance
- **Virtual Career Fairs**: Interact with employer booths through AI representatives
- **Interview Practice**: Practice with AI interviewers

### 2. Employer Experience
- **24/7 Candidate Engagement**: AI agents answer questions anytime
- **Pre-screening**: Initial candidate screening through conversational AI
- **Career Fair Presence**: Automated booth representatives at virtual fairs
- **Scale Recruitment**: Handle multiple conversations simultaneously

### 3. Educational Institutions
- **Virtual Advisors**: AI-powered academic and career advisors
- **Event Representation**: Automated presence at virtual events
- **Student Support**: 24/7 availability for common questions

## Technical Architecture

### WebRTC Video Streaming
D-ID agents use WebRTC for real-time video streaming:

1. Agent creation returns stream URL and ICE servers
2. Frontend establishes RTCPeerConnection
3. Video stream displays in HTML5 video element
4. Two-way audio communication enabled

### Chat Session Management
- Each chat session has a unique ID
- Sessions stored in KV store for tracking
- Messages sent via REST API
- Responses include both text and video

### Security
- API key stored as environment variable (not in code)
- All endpoints require authentication
- Agent IDs tracked and associated with users
- Rate limiting on agent creation

## Pricing & Credits

D-ID charges based on video generation usage:

**Free Trial:**
- 20 credits (≈20 minutes of video)
- Great for testing

**Paid Plans:**
- **Starter**: $49/month - 300 credits
- **Professional**: $149/month - 1,200 credits
- **Enterprise**: Custom pricing for high volume

**Credit Usage:**
- 1 credit ≈ 1 minute of generated video
- Streaming uses credits based on active video time
- Idle time (no talking) doesn't consume credits

**Current Pricing:** Visit [d-id.com/pricing](https://www.d-id.com/pricing) for latest information

## Performance Considerations

1. **Agent Creation**: Takes 2-5 seconds per agent
2. **Session Start**: Typically 1-2 seconds
3. **Response Time**: 500ms - 2 seconds depending on message complexity
4. **Concurrent Sessions**: D-ID supports multiple simultaneous sessions
5. **Bandwidth**: Video streaming requires ~1-2 Mbps per session

## Best Practices

### Agent Configuration
1. Provide clear, specific instructions for agent behavior
2. Keep instructions concise (under 1000 characters)
3. Define agent personality and tone
4. Include relevant knowledge base content

### User Experience
1. Show loading states during agent creation and connection
2. Provide clear error messages
3. Allow users to mute/unmute audio
4. Support both video and text interactions
5. Auto-scroll chat messages

### Cost Optimization
1. Reuse agents instead of creating new ones
2. Set session timeouts to avoid abandoned sessions
3. Monitor credit usage through D-ID dashboard
4. Consider text-only mode for simple interactions

## Troubleshooting

### Common Issues

**Agent Not Creating:**
- Verify API key is correct
- Check DID_API_KEY environment variable is set
- Ensure D-ID account has available credits

**Video Not Streaming:**
- Check browser WebRTC support
- Verify ICE servers configuration
- Check network/firewall settings

**Slow Response Times:**
- Monitor D-ID service status
- Check network latency
- Consider geographic server location

**Credit Usage Higher Than Expected:**
- Review active sessions
- Check for abandoned sessions
- Monitor video generation time

## Future Enhancements

Potential improvements for the D-ID integration:

1. **Avatar Customization**: Allow users to select different avatars
2. **Voice Selection**: Multiple voice options per agent type
3. **Analytics Dashboard**: Detailed usage and engagement metrics
4. **Multi-language Support**: Agents in different Pacific Island languages
5. **Mobile Optimization**: Enhanced mobile video experience
6. **Sentiment Analysis**: Track conversation sentiment
7. **Custom Avatars**: Upload custom avatar images
8. **Recording**: Save and replay agent interactions

## Support & Resources

**D-ID Resources:**
- [D-ID Documentation](https://docs.d-id.com)
- [Agents API Reference](https://docs.d-id.com/reference/agents-overview)
- [D-ID Community](https://community.d-id.com)
- [Support Email](mailto:support@d-id.com)

**ZALPHA Integration:**
- Configuration: `/did-configuration`
- Demo: `/did-agent-demo`
- Employer Agents: `/employer-ai-agents`

## Summary

The D-ID integration is fully implemented and ready for use once the API key is configured. The system provides:

✅ Complete backend API integration
✅ Frontend components for all agent types
✅ Configuration and management pages
✅ Demo showcase
✅ Employer agent dashboard
✅ Enhanced Zee chatbot with video
✅ Virtual career fair booth agents
✅ Comprehensive documentation

**Next Steps:**
1. Obtain D-ID API key
2. Configure key in Supabase secrets
3. Test integration on demo page
4. Deploy to production
5. Train users on new video agent features

---

**Document Version:** 1.0
**Last Updated:** February 4, 2026
**Maintained By:** ZALPHA Development Team
