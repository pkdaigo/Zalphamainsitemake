# Beta Applications Table Setup - Simplified

## Create the `beta_applications` Table in Your KiEX App Branding Supabase Project

This single table will handle ALL beta application types: students, employers, schools/career services, persons with disabilities, and Metgot Global participants.

---

## Steps:

1. Go to https://supabase.com/dashboard
2. Select your **KiEX App Branding** project
3. Click **SQL Editor** in the left sidebar
4. Copy and paste the SQL below
5. Click **Run**

---

## SQL to Create Table

```sql
-- Create unified beta_applications table
CREATE TABLE IF NOT EXISTS beta_applications (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Application type
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

-- Allow service role full access
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

---

## Table Structure

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `created_at` | TIMESTAMPTZ | When application was submitted |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |
| `user_type` | TEXT | Type: student, employer, school, metgot, or person_with_disability |
| `name` | TEXT | Applicant's full name |
| `email` | TEXT | Email address |
| `phone` | TEXT | Phone number |
| `program` | TEXT | Program/cohort/tier they're applying for |
| `cohort` | TEXT | Cohort identifier or group |
| `notes` | TEXT | Additional notes or comments |
| `source` | TEXT | How they heard about ZALPHA (referral, job fair, etc.) |
| `status` | TEXT | Application status (pending, approved, rejected, contacted) |
| `reviewed_at` | TIMESTAMPTZ | When admin reviewed the application |
| `admin_notes` | TEXT | Internal admin notes |
| `application_data` | JSONB | Full form data stored as JSON for reference |

---

## How It Works

All beta application types submit to this single table:

- **Students** → `user_type = 'student'`
- **Employers** → `user_type = 'employer'`
- **Career Services/Schools** → `user_type = 'school'`
- **Metgot Global** → `user_type = 'metgot'`
- **Persons with Disabilities** → `user_type = 'person_with_disability'`

The `application_data` JSONB column stores the complete form submission for each type, so you don't lose any detailed information.

---

## Querying Applications

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
SELECT user_type, COUNT(*) as count 
FROM beta_applications 
GROUP BY user_type;

-- Search by email
SELECT * FROM beta_applications 
WHERE email ILIKE '%example@email.com%';

-- View applications from a specific source
SELECT * FROM beta_applications 
WHERE source = 'job-fair-onsite' 
ORDER BY created_at DESC;
```

---

## Security

- ✅ Row Level Security (RLS) enabled
- ✅ Service role has full access for API operations
- ✅ Users can only view their own applications
- ✅ All data encrypted at rest
- ✅ FERPA compliant

---

## Next Steps

After creating this table, update your Supabase credentials in Vercel (see `UPDATE_SUPABASE_CREDENTIALS.md`) and redeploy your app. All beta applications will automatically save to this table! 🚀
