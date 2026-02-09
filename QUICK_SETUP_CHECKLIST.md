# ⚡ ZALPHA → KiEX Quick Setup Checklist

## 🎯 3-Step Setup (10 minutes)

> **Note:** Your Supabase Edge Functions are already deployed! You just need to create the database table and update credentials.

### ✅ STEP 1: Create Database Table (2 minutes)

1. Go to https://supabase.com/dashboard
2. Open **KiEX App Branding** project
3. Click **SQL Editor** → **New Query**
4. Copy SQL from `/BETA_APPLICATIONS_TABLE_SETUP.md`
5. Click **Run**
6. ✅ Success!

---

### ✅ STEP 2: Update Environment Variables (3 minutes)

1. In Supabase: **Settings** → **API**
2. Copy these 3 values:
   - Project URL
   - anon key
   - service_role key (click "Reveal")

3. In Vercel: **Settings** → **Environment Variables**
4. Update:
   ```
   SUPABASE_URL = https://YOUR_KIEX_PROJECT.supabase.co
   SUPABASE_ANON_KEY = eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY = eyJhbGci...
   ```
5. Click **Save**

---

### ✅ STEP 3: Redeploy App (5 minutes)

**Option A - Auto (if GitHub connected):**
```bash
git add .
git commit -m "Connect to KiEX Supabase"
git push
```
Wait for auto-deploy ✅

**Option B - Manual:**
1. Vercel Dashboard → **Deployments**
2. Click **⋮** on latest → **Redeploy**
3. Wait for completion ✅

---

## ✅ Test It! (5 minutes)

1. Open your ZALPHA app
2. Go to "Apply for Beta Testing"
3. Select "Student"
4. Fill form with test data
5. Click Submit
6. ✅ Success screen appears!

7. Go to Supabase → **Table Editor** → `beta_applications`
8. ✅ See your test application!

---

## 📊 What Gets Saved

All 5 application types → Same `beta_applications` table:

| Form Type | user_type Value |
|-----------|----------------|
| Student | `student` |
| Employer | `employer` |
| Career Services | `school` |
| Person with Disability | `person_with_disability` |
| Metgot Global | `metgot` |

---

## 🆘 Quick Troubleshooting

**Error: "Database table not configured"**  
→ Run the SQL from Step 1 again

**Error: "Database error"**  
→ Check env vars are for KiEX project (not another project)

**Form submits but no data in Supabase**  
→ Check Vercel logs for errors  
→ Verify you're looking at KiEX project, not default project

**Still having issues?**  
→ Read the full guide: `/ZALPHA_SUPABASE_SETUP_GUIDE.md`

---

## ✅ Done!

You now have:
- ✅ Unified database table
- ✅ All 5 beta flows connected
- ✅ Data saved to your KiEX Supabase project
- ✅ Easy querying and filtering

🎉 Start collecting beta applications!