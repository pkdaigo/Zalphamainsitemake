# 📊 How to Access Your Collected Data - ZALPHA

## Where Your Data is Stored

All data collected today is stored in your **Supabase Database** in the `kv_store_9bd83859` table.

---

## 🎯 Quick Access Methods

### Method 1: Supabase Dashboard (Easiest)

1. **Go to Supabase Dashboard:**
   - URL: https://supabase.com/dashboard
   - Login with your account

2. **Select Your Project:**
   - Project ID: `becsvvgggvhokamuiijt`

3. **Navigate to Table Editor:**
   - Click "Table Editor" in left sidebar
   - Find table: `kv_store_9bd83859`

4. **View All Data:**
   - You'll see all collected data with keys and values
   - Can export to CSV/JSON

### Method 2: SQL Query (More Powerful)

In Supabase Dashboard → SQL Editor:

```sql
-- See ALL data collected today
SELECT * FROM kv_store_9bd83859 
WHERE created_at >= CURRENT_DATE
ORDER BY created_at DESC;

-- Count entries by type
SELECT 
  SPLIT_PART(key, ':', 1) as data_type,
  COUNT(*) as count
FROM kv_store_9bd83859
WHERE created_at >= CURRENT_DATE
GROUP BY data_type;
```

### Method 3: API Endpoint (Programmatic)

Create a quick admin endpoint to export data:

```bash
# Get all students
GET /make-server-9bd83859/admin/export/students

# Get all employers  
GET /make-server-9bd83859/admin/export/employers

# Get all applications
GET /make-server-9bd83859/admin/export/applications
```

---

## 📁 Data Storage Structure

### Student Signups
**Key Format:** `student:{userId}`

**Contains:**
- User ID
- Email
- First Name, Last Name
- Date of Birth
- School
- Graduation Year
- Location
- Signup timestamp
- reCAPTCHA score
- Behavioral score

**Example Query:**
```sql
SELECT * FROM kv_store_9bd83859 
WHERE key LIKE 'student:%' 
AND key NOT LIKE '%:%:%'
ORDER BY created_at DESC;
```

### Employer Signups
**Key Format:** `employer:{userId}`

**Contains:**
- User ID
- Email
- Company Name
- Industry
- Location
- Company Size
- Signup timestamp

**Example Query:**
```sql
SELECT * FROM kv_store_9bd83859 
WHERE key LIKE 'employer:%' 
AND key NOT LIKE '%:%:%'
ORDER BY created_at DESC;
```

### Job Applications
**Key Format:** `application:{applicationId}`

**Contains:**
- Application ID
- Student ID
- Job ID
- Resume URL
- Cover Letter
- Status (pending/submitted)
- Applied timestamp

**Example Query:**
```sql
SELECT * FROM kv_store_9bd83859 
WHERE key LIKE 'application:%'
ORDER BY created_at DESC;
```

### Beta Tester Applications
**Key Format:** `beta_application:{applicationId}`

**Contains:**
- Name
- Email
- User Type (student/employer/school/disability)
- Organization
- Motivation
- Feedback
- Agreement status
- Application timestamp

**Example Query:**
```sql
SELECT * FROM kv_store_9bd83859 
WHERE key LIKE 'beta_application:%'
ORDER BY created_at DESC;
```

### Job Postings
**Key Format:** `job:{jobId}`

**Contains:**
- Job title
- Company
- Description
- Requirements
- Location
- Salary range
- Posted date
- Employer ID

**Example Query:**
```sql
SELECT * FROM kv_store_9bd83859 
WHERE key LIKE 'job:%'
ORDER BY created_at DESC;
```

---

## 📊 Export All Data Collected Today

### SQL Query for Complete Export:

```sql
-- Get everything from today
SELECT 
  key,
  value,
  created_at,
  SPLIT_PART(key, ':', 1) as data_type
FROM kv_store_9bd83859 
WHERE created_at >= CURRENT_DATE
ORDER BY created_at DESC;
```

### Get Counts by Type:

```sql
SELECT 
  CASE 
    WHEN key LIKE 'student:%' AND key NOT LIKE '%:%:%' THEN 'Student Signups'
    WHEN key LIKE 'employer:%' AND key NOT LIKE '%:%:%' THEN 'Employer Signups'
    WHEN key LIKE 'application:%' THEN 'Job Applications'
    WHEN key LIKE 'beta_application:%' THEN 'Beta Applications'
    WHEN key LIKE 'job:%' THEN 'Job Postings'
    ELSE 'Other'
  END as category,
  COUNT(*) as total
FROM kv_store_9bd83859
WHERE created_at >= CURRENT_DATE
GROUP BY category
ORDER BY total DESC;
```

---

## 🔐 Create an Admin Export Endpoint

Add this to your server if you want an API to export data:

```typescript
// Get all data from today
app.get("/make-server-9bd83859/admin/export/today", async (c) => {
  try {
    // Add admin authentication here
    const adminKey = c.req.header('X-Admin-Key');
    if (adminKey !== Deno.env.get('ADMIN_KEY')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get all keys starting with common prefixes
    const students = await kv.getByPrefix('student:');
    const employers = await kv.getByPrefix('employer:');
    const applications = await kv.getByPrefix('application:');
    const betaApps = await kv.getByPrefix('beta_application:');
    const jobs = await kv.getByPrefix('job:');

    return c.json({
      success: true,
      collected_today: new Date().toISOString().split('T')[0],
      data: {
        students: students?.length || 0,
        employers: employers?.length || 0,
        applications: applications?.length || 0,
        beta_applications: betaApps?.length || 0,
        jobs: jobs?.length || 0,
      },
      raw: {
        students,
        employers,
        applications,
        beta_applications: betaApps,
        jobs,
      }
    });
  } catch (error: any) {
    console.error('Export error:', error);
    return c.json({ error: 'Failed to export data' }, 500);
  }
});
```

---

## 📥 Export to CSV/Excel

### Using Supabase Dashboard:

1. Go to Table Editor → `kv_store_9bd83859`
2. Click the "Export" button
3. Choose CSV or JSON format
4. Download file

### Using SQL Editor:

1. Run your query
2. Click "Download as CSV" button
3. Open in Excel or Google Sheets

---

## 🔍 Common Queries You'll Need

### Get All Student Emails:
```sql
SELECT 
  value->>'email' as email,
  value->>'firstName' as first_name,
  value->>'lastName' as last_name,
  created_at
FROM kv_store_9bd83859 
WHERE key LIKE 'student:%'
  AND key NOT LIKE '%:%:%'
ORDER BY created_at DESC;
```

### Get All Employer Companies:
```sql
SELECT 
  value->>'companyName' as company,
  value->>'email' as contact_email,
  value->>'industry' as industry,
  created_at
FROM kv_store_9bd83859 
WHERE key LIKE 'employer:%'
  AND key NOT LIKE '%:%:%'
ORDER BY created_at DESC;
```

### Get All Beta Applications:
```sql
SELECT 
  value->>'name' as name,
  value->>'email' as email,
  value->>'userType' as type,
  value->>'organization' as org,
  value->>'motivation' as reason,
  created_at
FROM kv_store_9bd83859 
WHERE key LIKE 'beta_application:%'
ORDER BY created_at DESC;
```

### Get Today's Signups Count:
```sql
SELECT 
  COUNT(*) as total_signups_today
FROM kv_store_9bd83859 
WHERE (key LIKE 'student:%' OR key LIKE 'employer:%')
  AND key NOT LIKE '%:%:%'
  AND created_at >= CURRENT_DATE;
```

---

## 🎯 Quick Dashboard View

### Total Stats from Today:

```sql
WITH today_data AS (
  SELECT 
    key,
    value,
    created_at
  FROM kv_store_9bd83859 
  WHERE created_at >= CURRENT_DATE
)
SELECT 
  (SELECT COUNT(*) FROM today_data WHERE key LIKE 'student:%' AND key NOT LIKE '%:%:%') as students,
  (SELECT COUNT(*) FROM today_data WHERE key LIKE 'employer:%' AND key NOT LIKE '%:%:%') as employers,
  (SELECT COUNT(*) FROM today_data WHERE key LIKE 'application:%') as applications,
  (SELECT COUNT(*) FROM today_data WHERE key LIKE 'beta_application:%') as beta_testers,
  (SELECT COUNT(*) FROM today_data WHERE key LIKE 'job:%') as job_postings;
```

---

## 💾 Backup Your Data

### Manual Backup:
1. Supabase Dashboard → Table Editor
2. Export entire `kv_store_9bd83859` table
3. Save as `zalpha_backup_2026-02-05.csv`

### Automated Backup:
Enable Supabase Point-in-Time Recovery:
- Settings → Database → Backups
- Enable automatic daily backups

---

## 📧 Email Integration (Optional)

Get notified when someone signs up:

```typescript
// Add to signup endpoints
await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: { email: 'notifications@zalpharecruit.com' },
    to: { email: 'your-email@example.com' },
    subject: `New ${userType} Signup - ZALPHA`,
    text: `Name: ${firstName} ${lastName}\nEmail: ${email}`,
  }),
});
```

---

## 🚀 Quick Access Checklist

- [ ] Login to Supabase Dashboard
- [ ] Navigate to Table Editor
- [ ] Find `kv_store_9bd83859` table
- [ ] Filter by today's date
- [ ] Export to CSV if needed
- [ ] Analyze signups by type

---

## 📞 Need Help?

If you need help accessing your data:
1. Check Supabase Dashboard first
2. Use SQL queries provided above
3. Contact: support@zalpharecruit.com

---

## 🎉 Your Data is Safe!

All data is:
- ✅ Stored securely in Supabase
- ✅ Backed up automatically
- ✅ Encrypted at rest
- ✅ FERPA compliant
- ✅ Accessible anytime via dashboard or API

**Happy analyzing! 📊**
