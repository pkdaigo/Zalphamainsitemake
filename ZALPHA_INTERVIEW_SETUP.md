# Zal Interview Integration Setup Guide

## ✅ Code Status: READY
The React app code in `/src/app/pages/CandidateSearch.tsx` is already configured and waiting for your Make.com webhook URL.

---

## 📋 Step 1: Create Make.com Scenario

### Module 1: Custom Webhook
1. Go to Make.com → Create new scenario
2. Add module: **Webhooks** → **Custom webhook**
3. Name it: **`Zal_First_Interview`**
4. Click "Create webhook"
5. **📋 COPY THE WEBHOOK URL** 
   - Example: `https://hook.us1.make.com/abc123xyz456`

### Module 2: Supabase → Create a row
- **App:** Supabase
- **Action:** Create a row
- **Connection:** Your KiEX Supabase project
- **Table:** `agent_jobs`

#### Field Mapping:
Type these values directly:
```
agent_type = first_interview
status = idle
priority = medium
```

For `input_data`, click into the field and paste this JSON template:
```json
{
  "candidate_id": "{{1.candidate_id}}",
  "candidate_name": "{{1.candidate_name}}",
  "email": "{{1.email}}",
  "job_id": "{{1.job_id}}",
  "job_title": "{{1.job_title}}",
  "source": "zalpha_recruit"
}
```

Then use Make's mapper UI to replace each `{{1.xxx}}` with the actual webhook fields:
- `{{1.candidate_id}}` → Select `candidate_id` from webhook
- `{{1.candidate_name}}` → Select `candidate_name` from webhook
- `{{1.email}}` → Select `email` from webhook
- `{{1.job_id}}` → Select `job_id` from webhook
- `{{1.job_title}}` → Select `job_title` from webhook

**Leave empty** (Supabase auto-fills):
- `id`
- `created_at`
- `updated_at`

### Save & Activate
1. Click **Save**
2. Click **Run once** (scenario will wait for webhook)

---

## 📋 Step 2: Update React App

### File: `/src/app/pages/CandidateSearch.tsx`

Find **line ~110** and replace:

```typescript
const MAKE_WEBHOOK_URL = 'YOUR_MAKE_WEBHOOK_URL_HERE';
```

With your actual webhook URL:

```typescript
const MAKE_WEBHOOK_URL = 'https://hook.us1.make.com/YOUR_ACTUAL_WEBHOOK_URL';
```

### ✅ Already Implemented:
The `handleSendZalInterview` function already sends the correct payload:
```typescript
{
  candidate_id: candidate.id,        // e.g., 1
  candidate_name: candidate.name,    // e.g., "Sarah Johnson"
  email: candidate.email,            // e.g., "sarah.johnson@email.com"
  job_id: candidate.jobId,           // e.g., "JOB-001"
  job_title: candidate.jobTitle      // e.g., "Junior Software Developer"
}
```

The button is already wired up to call `handleSendZalInterview(candidate)`.

---

## 🧪 Step 3: Test the Integration

### Test Procedure:
1. **In Make:** Ensure scenario is on "Run once" (waiting status)
2. **In your app:**
   - Navigate to candidate search page
   - Click "View Profile" on any candidate
   - Click **"Send Zal Interview Link"** button
3. **Verify in Make:**
   - Should show "1 successful execution" ✅
   - Click execution to see data flow
4. **Verify in Supabase** → `agent_jobs` table:
   - New row exists with:
     - `agent_type` = `"first_interview"`
     - `status` = `"idle"`
     - `priority` = `"medium"`
     - `input_data` = JSON with candidate info + source

### Expected `agent_jobs` Row:
```json
{
  "id": "auto-generated-uuid",
  "created_at": "2026-02-13T...",
  "updated_at": "2026-02-13T...",
  "agent_type": "first_interview",
  "status": "idle",
  "priority": "medium",
  "input_data": {
    "candidate_id": 1,
    "candidate_name": "Sarah Johnson",
    "email": "sarah.johnson@email.com",
    "job_id": "JOB-001",
    "job_title": "Junior Software Developer",
    "source": "zalpha_recruit"
  }
}
```

---

## ✅ Success Criteria

If these 2 checks pass, the enqueue path is complete:

1. ✅ Make scenario shows **1 successful execution**
2. ✅ Supabase `agent_jobs` has new row with correct data

---

## 🔧 Troubleshooting

### Alert: "⚠️ Make webhook URL not configured"
→ You haven't updated the `MAKE_WEBHOOK_URL` constant in code

### Make shows no execution
→ Check browser console for network errors
→ Verify webhook URL is correct (no typos)
→ Ensure scenario is on "Run once" status

### Row not appearing in Supabase
→ Check Make execution logs for errors
→ Verify Supabase connection is active
→ Confirm table name is exactly `agent_jobs`
→ Check if Supabase has required permissions

### Button does nothing
→ Check browser console for JavaScript errors
→ Verify candidate has all required fields (id, name, email, jobId, jobTitle)

---

## 📊 Data Flow Diagram

```
User clicks "Send Zal Interview Link"
         ↓
handleSendZalInterview(candidate)
         ↓
POST to Make Webhook with candidate data
         ↓
Make receives webhook
         ↓
Make inserts row into Supabase agent_jobs
         ↓
Success! Zal agent job enqueued
```

---

## 🎯 What's Next (After This Works)

Once the test passes, the enqueue path is fully functional:
- ✅ Button → Make → Supabase ✅
- Next: Build the agent worker that processes jobs from `agent_jobs` table
- Next: Implement email sending with personalized interview link
- Next: Create interview landing page for candidates

---

**Last Updated:** February 13, 2026
**Status:** Code ready, awaiting Make.com webhook URL
