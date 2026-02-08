# D-ID Integration - Quick Reference

## API Key Setup
1. Get API key from https://studio.d-id.com
2. Add to Supabase: `DID_API_KEY=your_key`
3. Test at `/did-configuration`

## New Pages Added
- `/did-configuration` - API setup and configuration
- `/did-agent-demo` - Interactive demos of all agent types
- `/employer-ai-agents` - Employer dashboard for managing AI agents

## New Components
- `DIDAgent.tsx` - Main video agent component
- `VirtualBoothAgent.tsx` - Career fair booth wrapper
- `ZeeBotWrapper.tsx` - Updated with video option

## Backend Files
- `/supabase/functions/server/did-integration.tsx` - D-ID API integration
- Backend endpoints added to `/supabase/functions/server/index.tsx`

## API Endpoints
All prefixed with `/make-server-9bd83859/did/`:
- `POST /agents/create` - Create agent
- `GET /agents/:id` - Get agent
- `DELETE /agents/:id` - Delete agent
- `POST /agents/:id/chat/start` - Start chat
- `POST /agents/:id/chat/:sessionId/message` - Send message
- `GET /agents` - List agents

## Usage Examples

### Zee Agent
```tsx
<DIDAgent agentType="zee" />
```

### Recruiter Agent
```tsx
<DIDAgent 
  agentType="recruiter" 
  companyName="Your Company" 
/>
```

### Career Fair Agent
```tsx
<DIDAgent 
  agentType="career-fair"
  boothInfo={{
    organizationName: "University Name",
    description: "About the university",
    opportunities: ["Programs", "Scholarships"]
  }}
/>
```

## Features
✅ Real-time video streaming (WebRTC)
✅ Natural language conversations (GPT-4)
✅ Text chat interface
✅ Audio/video controls
✅ Multiple agent types
✅ Session management
✅ Analytics ready

## Pricing
- Free trial: 20 credits (~20 min video)
- Starter: $49/mo - 300 credits
- Pro: $149/mo - 1,200 credits
- Enterprise: Custom pricing

## Where D-ID is Used
1. **Zee Bot** - Video option in floating Zee button
2. **Virtual Career Fairs** - Booth representatives
3. **Employer Dashboard** - Recruiting agents
4. **Demo Page** - Showcasing capabilities

## Testing
1. Navigate to `/did-configuration`
2. Enter your D-ID API key
3. Go to `/did-agent-demo`
4. Try each agent type
5. Verify video and chat work correctly

## Troubleshooting
- **No video**: Check API key and WebRTC support
- **Slow responses**: Check network and D-ID status
- **Credits exhausted**: Add credits to D-ID account
- **Agent not creating**: Verify API key in environment

## Support
- D-ID Docs: https://docs.d-id.com
- Agents API: https://docs.d-id.com/reference/agents-overview
- ZALPHA Config: `/did-configuration`
