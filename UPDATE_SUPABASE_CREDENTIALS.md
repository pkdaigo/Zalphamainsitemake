# 🔧 Update Supabase Credentials for KiEX App Branding

Your ZALPHA app is currently connected to a different Supabase project. You need to update the environment variables to point to your **KiEX App Branding** Supabase project.

## Steps to Update Credentials

### Option 1: Update via Vercel Dashboard (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Update these three variables with your **KiEX App Branding** project credentials:

   ```
   SUPABASE_URL=https://YOUR_KIEX_PROJECT_ID.supabase.co
   SUPABASE_ANON_KEY=your_kiex_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_kiex_service_role_key_here
   ```

4. Click **Save**
5. Go to **Deployments** and redeploy the latest deployment

### Option 2: Update via Vercel CLI

```bash
vercel env add SUPABASE_URL
# Enter: https://YOUR_KIEX_PROJECT_ID.supabase.co

vercel env add SUPABASE_ANON_KEY
# Paste your KiEX anon key

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste your KiEX service role key
```

Then redeploy:
```bash
vercel --prod
```

---

## Where to Find Your KiEX App Branding Credentials

1. Go to https://supabase.com/dashboard
2. Select your **KiEX App Branding** project
3. Go to **Settings** → **API**
4. You'll find:
   - **Project URL** → Use this for `SUPABASE_URL`
   - **anon public** key → Use this for `SUPABASE_ANON_KEY`
   - **service_role** key (click "Reveal" to see it) → Use this for `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **IMPORTANT**: Keep your `service_role` key secret! Never commit it to git or share it publicly.

---

## After Updating Credentials

Once you've updated the environment variables and redeployed:

1. ✅ Your ZALPHA app will connect to your KiEX App Branding Supabase project
2. ✅ Student beta applications will be saved to the `student_beta_applications` table
3. ✅ All data will be stored in your KiEX project database

---

## Verifying the Connection

After redeploying, test the connection:

1. Open your ZALPHA app
2. Go to "Apply for Beta Testing"
3. Fill out a test student application
4. Submit the form
5. Go to your Supabase Dashboard (KiEX App Branding project)
6. Check the `student_beta_applications` table
7. Your test application should appear there!

---

## Troubleshooting

### Error: "Database table not configured"
→ Make sure you've created the `student_beta_applications` table using the SQL from `SUPABASE_TABLE_SETUP.md`

### Error: "Failed to connect to database"
→ Double-check that all three environment variables are correctly set in Vercel

### Error: "Unauthorized"
→ Verify your `SUPABASE_SERVICE_ROLE_KEY` is correct and hasn't been regenerated

---

## Current vs New Configuration

**Current (Figma Make default):**
- Project ID: `becsvvgggvhokamuiijt`
- Data stored in: KV store (key-value)

**New (Your KiEX App Branding):**
- Project ID: Your KiEX project ID
- Data stored in: Postgres table `student_beta_applications`

This gives you proper relational database capabilities and easier data management! 🎉
