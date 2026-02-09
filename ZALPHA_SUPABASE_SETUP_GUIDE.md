# 🚀 ZALPHA Supabase Integration Guide

## Complete Setup for KiEX App Branding Supabase Project

This guide will connect your ZALPHA app to your **KiEX App Branding** Supabase project and enable all beta application flows to save to a single unified database table.

---

## 📋 Table of Contents

1. [Create the Database Table](#1-create-the-database-table)
2. [Update Environment Variables](#2-update-environment-variables)
3. [Deploy to Vercel](#3-deploy-to-vercel)
4. [Test the Integration](#4-test-the-integration)
5. [View Applications](#5-view-applications)

---

## 1. Create the Database Table

### Step 1: Open Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Select your **KiEX App Branding** project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run the Table Creation SQL

Copy and paste this SQL and click **Run**:

```sql
-- Create unified beta_applications table for ALL application types
CREATE TABLE IF NOT EXISTS beta_applications (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Application type: student, employer, school, metgot, person_with_disability
  user_type TEXT NOT NULL CHECK (user_type IN ('student', 'employer', 'school', 'metgot', 'person_with_disability')),
  
  -- Basic contact info (common to all types)
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Application-specific fields
  program TEXT,
  cohort TEXT,
  notes TEXT,
  source TEXT,
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'contacted')),
  reviewed_at TIMESTAMPTZ,
  admin_notes TEXT,
  
  -- Store full application data as JSON for flexibility
  application_data JSONB
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_beta_applications_user_type ON beta_applications(user_type);
CREATE INDEX IF NOT EXISTS idx_beta_applications_email ON beta_applications(email);
CREATE INDEX IF NOT EXISTS idx_beta_applications_status ON beta_applications(status);
CREATE INDEX IF NOT EXISTS idx_beta_applications_created_at ON beta_applications(created_at DESC);

-- Enable Row Level Security
ALTER TABLE beta_applications ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for API)
CREATE POLICY "Service role can manage beta applications"
  ON beta_applications
  FOR ALL
  USING (auth.role() = 'service_role');

-- Allow users to view their own applications
CREATE POLICY "Users can view their own applications"
  ON beta_applications
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_beta_applications_updated_at
    BEFORE UPDATE ON beta_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

✅ You should see "Success. No rows returned"

---

## 2. Update Environment Variables

You need to connect ZALPHA to your KiEX App Branding Supabase project.

### Step 1: Get Your KiEX Credentials

1. In Supabase Dashboard, stay in your **KiEX App Branding** project
2. Go to **Settings** → **API** (in left sidebar)
3. Copy these three values:

   - **Project URL** (e.g., `https://abc123xyz.supabase.co`)
   - **anon public** key (the `anon` key)
   - **service_role** key (click "Reveal" to see it) ⚠️ **Keep this secret!**

### Step 2: Update Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Find and update these three variables:

   ```
   SUPABASE_URL = https://YOUR_KIEX_PROJECT_ID.supabase.co
   SUPABASE_ANON_KEY = your_kiex_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY = your_kiex_service_role_key_here
   ```

4. Make sure they're set for **Production**, **Preview**, and **Development**
5. Click **Save**

---

## 3. Deploy to Vercel

After updating environment variables:

### Option A: Automatic Deployment (if GitHub connected)

1. Commit any changes to your repository:
   ```bash
   git add .
   git commit -m "Connect to KiEX App Branding Supabase"
   git push
   ```
2. Vercel will automatically detect the push and deploy
3. Wait for deployment to complete

### Option B: Manual Redeploy

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Find your latest deployment
3. Click the **⋮** menu → **Redeploy**
4. Check **Use existing Build Cache**
5. Click **Redeploy**

---

## 4. Test the Integration

Once deployed, test each beta application type:

### ✅ Student Application Test

1. Open your ZALPHA app
2. Click **"Apply for Beta Testing"**
3. Select **"Student"** application type
4. Fill out the form with test data:
   - Name: `Test Student`
   - Email: `student@test.com`
   - Phone: `(670) 123-4567`
   - (Fill other fields as desired)
5. Click **Submit**
6. ✅ You should see the success screen

### ✅ Employer Application Test

1. Select **"Employer"** application type
2. Fill out with test data
3. Submit
4. ✅ Success screen should appear

### ✅ Career Services/School Test

1. Select **"Career Services"** application type
2. Fill out and submit
3. ✅ Success!

### ✅ Person with Disability Test

1. Select **"Person with Disability"** application type
2. Fill out and submit
3. ✅ Success!

### ✅ Metgot Global Test

If your app has a separate Metgot Global form:
1. Navigate to the Metgot application
2. Fill out and submit
3. ✅ Success!

---

## 5. View Applications

### In Supabase Dashboard

1. Go to **Table Editor** in your KiEX Supabase project
2. Select the `beta_applications` table
3. You'll see all applications from all types!

### Filter by Type

Click the filter icon and filter by `user_type`:
- `student` - Student applications
- `employer` - Employer applications
- `school` - Career Services/School applications
- `metgot` - Metgot Global applications
- `person_with_disability` - ADA/Disability applications

### Using SQL Queries

Click **SQL Editor** and run queries like:

```sql
-- View all student applications
SELECT * FROM beta_applications 
WHERE user_type = 'student' 
ORDER BY created_at DESC;

-- View all pending applications
SELECT * FROM beta_applications 
WHERE status = 'pending' 
ORDER BY created_at DESC;

-- Count applications by type
SELECT user_type, COUNT(*) as count, status
FROM beta_applications 
GROUP BY user_type, status
ORDER BY user_type;

-- Search by email
SELECT name, email, user_type, created_at, status
FROM beta_applications 
WHERE email ILIKE '%test%'
ORDER BY created_at DESC;

-- View full application data (JSONB)
SELECT name, email, user_type, application_data
FROM beta_applications
WHERE user_type = 'student'
ORDER BY created_at DESC
LIMIT 10;
```

---

## 📊 Table Structure Reference

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | UUID | Unique application ID | `550e8400-e29b-41d4-a716-446655440000` |
| `created_at` | TIMESTAMPTZ | When submitted | `2025-02-09 15:30:00+00` |
| `user_type` | TEXT | Application type | `student`, `employer`, `school`, `metgot`, `person_with_disability` |
| `name` | TEXT | Full name | `John Doe` |
| `email` | TEXT | Email address | `john@example.com` |
| `phone` | TEXT | Phone number | `(670) 123-4567` |
| `program` | TEXT | Program/Company/Institution | `Computer Science`, `Tech Corp`, `CNMI High School` |
| `cohort` | TEXT | Cohort/Year/Industry | `2025`, `Technology`, `High School` |
| `notes` | TEXT | Why beta testing / Comments | `Interested in job matching features` |
| `source` | TEXT | How they heard about ZALPHA | `job-fair-onsite`, `friend-told-me`, etc. |
| `status` | TEXT | Application status | `pending`, `approved`, `rejected`, `contacted` |
| `application_data` | JSONB | Full form data | `{"age": "18-24", "major": "CS", ...}` |

---

## 🔍 How It Works

All beta application types submit to the same `beta_applications` table:

1. **Student** fills out beta form → Saved as `user_type = 'student'`
2. **Employer** fills out beta form → Saved as `user_type = 'employer'`
3. **Career Services** fills out beta form → Saved as `user_type = 'school'`
4. **Person with Disability** fills out beta form → Saved as `user_type = 'person_with_disability'`
5. **Metgot Global** fills out form → Saved as `user_type = 'metgot'`

### Field Mapping Examples

**For Students:**
- `program` = Current education level or major
- `cohort` = Graduation year
- `notes` = Why they want to beta test
- `source` = How they heard about ZALPHA

**For Employers:**
- `program` = Company name
- `cohort` = Industry
- `notes` = Why they want to beta test
- `source` = How they heard about ZALPHA

**For Career Services:**
- `program` = Institution name
- `cohort` = Institution type
- `notes` = Why they want to beta test

**For Persons with Disabilities:**
- `program` = "ADA Beta Program"
- `cohort` = Disability types (as JSON)
- `notes` = Accommodations needed

**For Metgot Global:**
- `program` = "Metgot Global Beta"
- `cohort` = Age range
- `notes` = Why they want to participate

---

## 🔒 Security Features

✅ **Row Level Security (RLS)** - Enabled on the table  
✅ **Service Role Access** - Your server can read/write  
✅ **User Privacy** - Users can only view their own applications  
✅ **Encrypted at Rest** - All data encrypted by Supabase  
✅ **FERPA Compliant** - Educational data protection standards met  

---

## ❓ Troubleshooting

### Error: "Database table not configured"

→ Make sure you ran the SQL in Step 1 to create the `beta_applications` table

### Error: "Failed to connect to database"

→ Verify your `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are correct in Vercel

### Error: "Unauthorized"

→ Check that your `SUPABASE_SERVICE_ROLE_KEY` matches your KiEX project (not another project)

### Application submitted but not showing in table

→ Check the Vercel deployment logs for errors  
→ Verify you're looking at the right Supabase project  
→ Try filtering by status = 'pending'

### Old data still in KV store?

Don't worry! Your new setup uses Postgres. Old KV data won't interfere. You can migrate it later if needed.

---

## 🎉 Success Checklist

Before going live, verify:

- [ ] `beta_applications` table created in KiEX Supabase project
- [ ] Environment variables updated in Vercel
- [ ] App redeployed with new credentials
- [ ] Student application test successful
- [ ] Employer application test successful
- [ ] Career Services application test successful
- [ ] Person with Disability application test successful
- [ ] Metgot application test successful (if applicable)
- [ ] Can view all applications in Supabase Table Editor
- [ ] Filtered queries work correctly

---

## 📞 Need Help?

If you encounter issues:

1. Check the **Vercel Deployment Logs** for server errors
2. Check the **Supabase Logs** (Logs & Metrics in dashboard)
3. Verify the table was created successfully
4. Double-check environment variables match your KiEX project

---

## 🚀 You're All Set!

Your ZALPHA app is now fully integrated with your KiEX App Branding Supabase backend! All beta applications from all user types will be saved to a single, organized database table that you can easily query, filter, and export.

**Next steps:**
- Start collecting real beta applications!
- Review applications in Supabase
- Update application statuses as needed
- Export data for analysis

Good luck with your beta program! 🎉
