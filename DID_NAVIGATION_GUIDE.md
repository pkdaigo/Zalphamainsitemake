# How to Access D-ID Features in ZALPHA

## For Administrators

### Step 1: Configure D-ID API
Navigate to the configuration page to set up your D-ID API credentials.

**How to Access:**
- Go to Settings → Integrations → D-ID Configuration
- Or directly navigate to: `/did-configuration`

**What to Do:**
1. Get your API key from https://studio.d-id.com
2. Enter the API key in the configuration page
3. Click "Save & Verify API Key"
4. Wait for confirmation

### Step 2: Test the Integration
Once configured, test that everything is working.

**How to Access:**
- Navigate to: `/did-agent-demo`
- Or go through Platform Features → D-ID Agent Demo

**What to Try:**
1. Click on any agent type (Zee, Recruiter, or Career Fair)
2. Click "Start Video Chat"
3. Send a test message
4. Verify video and audio work correctly

## For Employers

### Managing AI Recruiting Agents
Employers can create and manage their own AI recruiting agents.

**How to Access:**
- Log in as an employer
- Go to Dashboard → AI Agents
- Or navigate to: `/employer-ai-agents`

**What You Can Do:**
1. Create new AI recruiting agents
2. Configure agent personality and instructions
3. Test your agents before deploying
4. View interaction analytics
5. Manage multiple agents

### Creating Your First Agent
1. Click "Create New Agent"
2. Fill in:
   - Agent name (e.g., "Primary Recruiter")
   - Company name
   - Description
   - Custom instructions (optional)
   - Voice preference
3. Click "Create Agent"
4. Wait 2-5 seconds for agent creation
5. Click "Test Agent" to try it out

## For Students

### Talking to Zee (Video Mode)
Students can now interact with Zee via video chat!

**How to Access:**
1. Look for the Zee button (floating purple button in bottom-right)
2. Hover over it to see options
3. Click "Video Chat" button that appears
4. Start talking to Zee via video!

**Alternative Text Mode:**
- Click the main Zee button for traditional text chat
- Both modes have the same AI capabilities

### Virtual Career Fairs
D-ID agents are integrated into virtual career fair booths.

**How to Access:**
1. Navigate to Events → Virtual Career Fairs
2. Browse upcoming fairs
3. Enter a fair
4. Visit an employer or school booth
5. Look for "Talk to AI Representative" button
6. Click to start video interaction

## For Career Services / Schools

### Virtual Fair Booth Agents
Educational institutions can have AI representatives at virtual fairs.

**How it Works:**
1. When you create a virtual booth at a career fair
2. ZALPHA automatically creates a D-ID agent for your booth
3. The agent uses your organization info and opportunities
4. Students can interact with your AI representative 24/7

**Configuration:**
- Booth info is configured when registering for a fair
- Agent automatically created with your details
- No additional setup required

## Quick Navigation Map

```
ZALPHA Platform
│
├── For Admins
│   ├── /did-configuration (Setup & Config)
│   └── /did-agent-demo (Test & Demo)
│
├── For Employers
│   └── /employer-ai-agents (Manage AI Recruiting Agents)
│
├── For Students
│   ├── Zee Button → Video Chat (Bottom-right floating button)
│   └── Virtual Career Fairs → Booth Agents
│
└── For Everyone
    └── /did-agent-demo (See demos of all agent types)
```

## Common Navigation Paths

### "I want to set up D-ID for the first time"
1. `/did-configuration` → Enter API key
2. `/did-agent-demo` → Test it works
3. Done!

### "I'm an employer and want to create an AI recruiter"
1. Login as employer
2. `/employer-ai-agents`
3. Click "Create New Agent"
4. Configure and test

### "I'm a student and want to try video chat with Zee"
1. Look for purple Zee button (bottom-right)
2. Hover to see options
3. Click "Video Chat"
4. Start talking!

### "I want to see what D-ID can do"
1. `/did-agent-demo`
2. Try all three agent types
3. Explore features

## Integration Status

✅ **Backend**: Fully integrated with 6 API endpoints
✅ **Frontend**: Components created and ready
✅ **Zee Bot**: Enhanced with video option
✅ **Employer Dashboard**: AI agent management ready
✅ **Career Fairs**: Booth agents integrated
✅ **Configuration**: Admin setup page ready
✅ **Demo**: Showcase page complete
✅ **Documentation**: Complete guides available

## Need Help?

**Configuration Issues:**
- Check `/did-configuration` for status
- Verify API key is correctly set
- Ensure D-ID account has credits

**Technical Questions:**
- See `DID_INTEGRATION_GUIDE.md` for full details
- See `DID_QUICK_REFERENCE.md` for quick answers

**D-ID Support:**
- Visit https://docs.d-id.com
- Email support@d-id.com
- Check https://status.d-id.com for service status

---

**Ready to get started?**
1. Go to `/did-configuration` to set up your API key
2. Test at `/did-agent-demo`
3. Start using AI agents across ZALPHA!
