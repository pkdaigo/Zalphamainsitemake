# 🚀 ZALPHA Agent Dashboard - Complete Setup Guide

## 📦 Step 1: Install Dependencies

Run this in your terminal:

```bash
npm install @supabase/supabase-js date-fns @radix-ui/react-label @radix-ui/react-scroll-area
```

---

## 🗄️ Step 2: Set Up Supabase Database

### 2.1 Go to Supabase SQL Editor

1. Open your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your ZALPHA project
3. Click **SQL Editor** in the sidebar
4. Click **New Query**

### 2.2 Run Database Schema

Copy and paste the contents of `supabase-schema.sql` and click **Run**.

This creates:
- ✅ `agent_jobs` table
- ✅ `agent_logs` table
- ✅ `agent_config` table
- ✅ Indexes and functions
- ✅ Default config for First Interview Agent

### 2.3 Verify Installation

Run this query to verify:

```sql
SELECT * FROM agent_config WHERE agent_type = 'first_interview';
```

You should see one row with `is_enabled: true`.

---

## 🔑 Step 3: Add Environment Variables

Create or update your `.env` file:

```env
# Supabase (required)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# D-ID API (for AI interviews - optional for now)
VITE_DID_API_KEY=your_did_api_key

# Email Service (optional for now)
VITE_SENDGRID_API_KEY=your_sendgrid_key

# Slack Notifications (optional)
VITE_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

### Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

---

## 🛣️ Step 4: Update App.tsx (Add Route)

The agent dashboard route has been added to your `App.tsx`. You can access it at:

```
/admin/agents
```

To navigate from your app:

```typescript
onNavigate('agent-dashboard')
```

---

## 🎨 Step 5: Add Navigation Link (Optional)

Update your admin navigation to include the agent dashboard:

```typescript
// In your Navigation component or admin menu
<Button onClick={() => onNavigate('agent-dashboard')}>
  <Activity className="w-4 h-4 mr-2" />
  Agent Dashboard
</Button>
```

---

## 🧪 Step 6: Test the Dashboard

### 6.1 Start Development Server

```bash
npm run dev
```

### 6.2 Navigate to Dashboard

Go to: `http://localhost:5173` and navigate to:
- Admin section → Agent Dashboard
- Or directly: manually update URL to trigger navigation

### 6.3 Trigger Your First Interview

1. Click **Trigger** tab
2. Select **First Interview Agent**
3. Fill in:
   - Candidate ID: `test_001`
   - Candidate Name: `John Doe`
   - Candidate Email: `john@test.com`
   - Job ID: `job_001`
   - Job Title: `Software Engineer`
4. Click **Trigger Agent**
5. You'll see a success message with Job ID
6. Switch to **Monitor** tab to see the job running

---

## 🔌 Step 7: Configure D-ID (AI Interviews)

### 7.1 Get D-ID API Key

1. Go to [D-ID Studio](https://studio.d-id.com/)
2. Sign up or log in
3. Navigate to **API** section
4. Create new API key
5. Copy key to `.env`: `VITE_DID_API_KEY=your_key`

### 7.2 Customize Zal Avatar

Update `src/services/agent/agents/FirstInterviewAgent.ts` line 145:

```typescript
source_url: 'https://your-cdn.com/zal-avatar.jpg' // Your custom avatar
```

### 7.3 Test D-ID Integration

Trigger an interview and check logs for D-ID API calls.

---

## 📧 Step 8: Configure Email (Optional)

### Using SendGrid:

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create API key
3. Add to `.env`: `VITE_SENDGRID_API_KEY=your_key`
4. Update `src/services/integrations/EmailService.ts` with SendGrid integration

### Using Another Provider:

Modify `EmailService.ts` to use your preferred email API (Postmark, AWS SES, etc.)

---

## 🔐 Step 9: Set Up Admin Authentication

To protect the agent dashboard:

### 9.1 Create Admin Login

Add this to your admin login handler:

```typescript
// After successful admin authentication
sessionStorage.setItem('zalpha_admin', 'true')
```

### 9.2 Add Logout Handler

```typescript
const handleAdminLogout = () => {
  sessionStorage.removeItem('zalpha_admin')
  onNavigate('landing')
}
```

---

## 🎯 Step 10: Production Deployment

### 10.1 Update Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your ZALPHA project
3. Go to **Settings** → **Environment Variables**
4. Add all variables from your `.env` file
5. Redeploy

### 10.2 Start Agent Engine (Background Worker)

Create a separate worker process to run the agent engine:

```typescript
// worker.ts
import { agentEngine } from './services/agent/init'

// Start processing jobs
agentEngine.start()

console.log('Agent engine running...')
```

Deploy this as a background service on:
- **Vercel**: Use Cron Jobs or Background Functions
- **Railway**: Deploy as separate service
- **Heroku**: Deploy as worker dyno

---

## ✅ Verification Checklist

- [ ] Dependencies installed
- [ ] Supabase tables created
- [ ] Environment variables set
- [ ] Agent dashboard accessible
- [ ] Can trigger first interview
- [ ] Jobs appear in monitor
- [ ] Logs are visible
- [ ] D-ID integration working (optional)
- [ ] Email sending working (optional)
- [ ] Admin authentication enabled
- [ ] Production deployment complete

---

## 🆘 Troubleshooting

### "Cannot find module '@/components/ui/...'" 

Missing UI components. Run:

```bash
npx shadcn-ui@latest add card button badge tabs input select textarea
```

### "Supabase connection failed"

Check:
1. `.env` file has correct credentials
2. Supabase project is active
3. Database tables exist

### "Agent not triggering"

Check:
1. Agent engine is running
2. Job appears in `agent_jobs` table
3. Agent type is registered in `AgentEngine.ts`

### "D-ID API error"

Check:
1. API key is valid
2. Key is in `.env` as `VITE_DID_API_KEY`
3. D-ID account has credits

---

## 📚 Next Steps

1. **Build More Agents**: Create custom agents for resume screening, email follow-ups, etc.
2. **Add Scheduling**: Use cron jobs to run agents automatically
3. **Build Analytics**: Add charts and reports for agent performance
4. **Integrate with ZALPHA Recruit**: Connect to your main recruitment platform

---

## 🤝 Need Help?

If you run into issues:

1. Check the browser console for errors
2. Check Supabase logs in dashboard
3. Review agent logs in the Logs tab
4. Ask me for help!

---

**Ready to revolutionize recruitment with AI! 🚀**
