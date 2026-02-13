# ZALPHA Fullstack Agent System

## 🚀 Overview

A complete autonomous agent framework for automating recruitment workflows. The system includes:

- **Agent Engine**: Core execution system with job queue
- **First Interview Agent**: AI-powered first-round candidate interviews
- **Database Schema**: PostgreSQL tables for jobs, logs, and config
- **Integration Services**: Email, Slack, Webhooks
- **Type Safety**: Full TypeScript support

---

## 📁 Architecture

```
src/services/agent/
├── AgentEngine.ts           # Core orchestration engine
├── JobQueue.ts              # Job management system
├── AgentLogger.ts           # Logging infrastructure
├── types.ts                 # TypeScript interfaces
├── agents/
│   ├── BaseAgent.ts         # Abstract base class
│   └── FirstInterviewAgent.ts  # AI interview automation
└── integrations/
    ├── EmailService.ts      # Email notifications
    ├── SlackService.ts      # Slack alerts
    └── WebhookService.ts    # Webhook triggers
```

---

## 🗄️ Database Setup

### Step 1: Run SQL Schema

1. Go to your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase-schema.sql`
4. Execute the script

This creates:
- `agent_jobs` - Job queue and execution tracking
- `agent_logs` - Detailed execution logs
- `agent_config` - Agent configuration

### Step 2: Verify Tables

```sql
SELECT * FROM agent_config;
-- Should show 'first_interview' agent enabled
```

---

## 🔧 Usage

### Initialize the Agent Engine

```typescript
import { createClient } from '@supabase/supabase-js'
import { AgentEngine } from './services/agent/AgentEngine'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const engine = new AgentEngine(supabase)

// Start processing jobs
await engine.start()
```

### Trigger a First Interview

```typescript
// Create a job for the First Interview Agent
const jobId = await engine.triggerAgent('first_interview', {
  candidate_id: 'cand_123',
  candidate_name: 'John Doe',
  candidate_email: 'john@example.com',
  job_id: 'job_456',
  job_title: 'Software Engineer',
})

console.log('Interview scheduled:', jobId)
```

### Check Job Status

```typescript
const job = await engine.jobQueue.getJobById(jobId)
console.log('Status:', job.status) // 'idle', 'running', 'completed', 'failed'
console.log('Output:', job.output_data)
```

### View Logs

```typescript
const { data: logs } = await supabase
  .from('agent_logs')
  .select('*')
  .eq('job_id', jobId)
  .order('created_at', { ascending: true })

console.log('Logs:', logs)
```

---

## 🤖 First Interview Agent

### What It Does

1. **Generates interview questions** based on job requirements
2. **Creates D-ID AI session** for video interview
3. **Sends invitation email** to candidate
4. **Schedules follow-up** to check completion
5. **Analyzes responses** (optional)

### Input Schema

```typescript
{
  candidate_id: string       // Your internal candidate ID
  candidate_name: string     // Full name
  candidate_email: string    // Email address
  job_id: string            // Job posting ID
  job_title: string         // e.g., 'Software Engineer'
  questions?: string[]      // Optional custom questions
}
```

### Output Schema

```typescript
{
  candidate_id: string
  interview_id: string      // Unique interview session ID
  status: 'scheduled' | 'completed' | 'failed'
  scheduled_at: string      // ISO timestamp
  video_url: string         // Link for candidate
  transcript?: string       // Available after completion
  analysis?: {              // AI-generated insights
    overall_score: number
    communication_score: number
    enthusiasm_score: number
    qualification_score: number
    red_flags: string[]
    highlights: string[]
    recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no'
  }
}
```

---

## 🔌 Integration Services

### Email Service

```typescript
import { EmailService } from './services/integrations/EmailService'

const emailService = new EmailService('YOUR_API_KEY')

await emailService.sendInterviewInvitation({
  candidateName: 'John Doe',
  candidateEmail: 'john@example.com',
  jobTitle: 'Software Engineer',
  interviewUrl: 'https://zalpha.ai/interview/int_123',
})
```

### Slack Service

```typescript
import { SlackService } from './services/integrations/SlackService'

const slack = new SlackService('WEBHOOK_URL')

await slack.notifyInterviewCompleted({
  candidateName: 'John Doe',
  jobTitle: 'Software Engineer',
  score: 85,
  dashboardUrl: 'https://zalpha.ai/dashboard/interviews/int_123',
})
```

### Webhook Service

```typescript
import { WebhookService } from './services/integrations/WebhookService'

const webhook = new WebhookService()

await webhook.triggerInterviewCompleted('https://your-api.com/webhook', {
  interview_id: 'int_123',
  candidate_id: 'cand_456',
  status: 'completed',
})
```

---

## 🛠️ Building Custom Agents

### 1. Create Agent Class

```typescript
import { BaseAgent } from '../BaseAgent'
import { AgentContext, AgentResult } from '../types'

export class MyCustomAgent extends BaseAgent {
  name = 'My Custom Agent'
  description = 'Does something awesome'

  async execute(context: AgentContext): Promise<AgentResult> {
    try {
      context.logger.info('Starting custom agent')
      
      // Your logic here
      const result = await this.doSomething(context.input)
      
      return this.success(result)
    } catch (error) {
      return this.handleError(error, context)
    }
  }
}
```

### 2. Register Agent

```typescript
import { MyCustomAgent } from './agents/MyCustomAgent'

engine.registerAgent('my_custom_agent', new MyCustomAgent())
```

### 3. Trigger Agent

```typescript
const jobId = await engine.triggerAgent('my_custom_agent', {
  // your input data
})
```

---

## 📊 Monitoring

### Dashboard Queries

```sql
-- Jobs by status (last 24 hours)
SELECT status, COUNT(*) as count
FROM agent_jobs
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY status;

-- Failed jobs with errors
SELECT agent_type, error_message, created_at
FROM agent_jobs
WHERE status = 'failed'
ORDER BY created_at DESC
LIMIT 10;

-- Average execution time by agent type
SELECT 
  agent_type,
  AVG(EXTRACT(EPOCH FROM (completed_at - started_at))) as avg_seconds
FROM agent_jobs
WHERE status = 'completed'
GROUP BY agent_type;
```

---

## 🚦 Next Steps

1. **Set up Supabase tables** (run `supabase-schema.sql`)
2. **Configure D-ID integration** for AI interviews
3. **Add email service credentials** (SendGrid, Postmark, etc.)
4. **Build frontend dashboard** (optional)
5. **Deploy agent engine** as background worker

---

## 🤝 Support

Questions? Issues? Let me know and I'll help you extend this system!
