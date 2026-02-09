# 🏗️ ZALPHA Deployment Architecture

## Two-Part Deployment System

Your ZALPHA app uses a **split deployment architecture**:

1. **Frontend** → Deployed to **Vercel** (Static Vite app)
2. **Backend** → Deployed to **Supabase** (Edge Functions)

---

## 📦 Part 1: Frontend (Vercel)

### What Gets Deployed:
- React/Vite application from `/src/`
- Static assets and public files
- Built output in `/dist/` directory

### Deployment Process:
1. Push to GitHub → Vercel auto-deploys
2. Or manually redeploy in Vercel Dashboard

### Configuration:
- `/vercel.json` - Simple static site config (no serverless functions)
- `vite.config.ts` - Build configuration

### What Vercel Does:
✅ Builds the Vite app  
✅ Serves static files  
✅ Routes all paths to `/index.html` (SPA)  
❌ Does NOT deploy serverless functions (that's Supabase's job)

---

## 🔧 Part 2: Backend (Supabase Edge Functions)

### What Gets Deployed:
- Supabase Edge Functions from `/supabase/functions/server/`
- These are Deno-based serverless functions running on Supabase's edge network

### Your Backend Files:
```
/supabase/functions/server/
  ├── index.tsx                    # Main Hono server
  ├── kv_store.tsx                # KV database utilities
  ├── did-integration.tsx         # D-ID API integration
  ├── heygen-integration.tsx      # HeyGen API integration
  ├── heygen-routes.tsx           # HeyGen routes
  ├── heygen-config.tsx           # HeyGen config
  ├── manatal-integration.tsx     # Manatal ATS integration
  ├── plaid-integration.tsx       # Plaid financial verification
  ├── wix-integration.tsx         # Wix integration
  ├── security.tsx                # Security utilities
  ├── ferpa-audit.tsx             # FERPA compliance audit
  └── ferpa-data-rights.tsx       # FERPA data rights
```

### How to Deploy Supabase Functions:

#### Option 1: Via Supabase CLI (Recommended for updates)
```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your KiEX project
supabase link --project-ref YOUR_KIEX_PROJECT_ID

# Deploy all functions
supabase functions deploy

# Or deploy a specific function
supabase functions deploy server
```

#### Option 2: Via Supabase Dashboard (Initial setup)
Your Supabase Edge Functions are already deployed! They were deployed when you first created your KiEX App Branding project in Supabase.

**To verify:**
1. Go to https://supabase.com/dashboard
2. Select **KiEX App Branding** project
3. Click **Edge Functions** in sidebar
4. You should see your `server` function listed

---

## 🔗 How They Communicate

### Frontend → Backend Calls:

```typescript
// Frontend makes API calls to Supabase Edge Functions
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/beta/submit`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type, data })
  }
);
```

### Backend → Database:

```typescript
// Backend uses Supabase Client to access Postgres
const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);

await supabase.from('beta_applications').insert([...]);
```

---

## 🚀 Complete Deployment Checklist

### ✅ Frontend (Vercel)
- [ ] `/vercel.json` configured correctly (no functions config)
- [ ] Connected to GitHub for auto-deployment
- [ ] Environment variables set:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - (Service role key NOT needed on frontend)
- [ ] Push to GitHub triggers automatic build and deploy
- [ ] Site accessible at your Vercel URL

### ✅ Backend (Supabase)
- [ ] Edge Functions deployed to Supabase
- [ ] Environment variables set in Supabase:
  - `SUPABASE_URL` (auto-set)
  - `SUPABASE_ANON_KEY` (auto-set)
  - `SUPABASE_SERVICE_ROLE_KEY` (auto-set)
  - `SUPABASE_DB_URL` (auto-set)
  - `WIX_SITE_ID` (if using Wix)
  - `PLAID_CLIENT_ID` (if using Plaid)
  - `PLAID_SECRET` (if using Plaid)
  - `DID_API_KEY` (if using D-ID)
  - `HEYGEN_API_KEY` (if using HeyGen)
- [ ] Functions accessible at: `https://YOUR_PROJECT.supabase.co/functions/v1/make-server-9bd83859/*`
- [ ] Database table `beta_applications` created

---

## 🔍 How to Verify Everything Works

### 1. Check Frontend Deployment
```
✅ Visit your Vercel URL
✅ App loads without errors
✅ Can navigate to different pages
```

### 2. Check Backend Connection
```
✅ Submit a beta application form
✅ Check browser console - no CORS errors
✅ See success message after submission
```

### 3. Check Database
```
✅ Go to Supabase → Table Editor → beta_applications
✅ See your test submission
```

---

## 🐛 Common Issues

### Issue: "Failed to fetch" or CORS errors
**Cause:** Frontend can't reach Supabase Edge Functions  
**Fix:** 
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct in Vercel
- Check Edge Functions are deployed in Supabase
- Verify the function URL is correct

### Issue: "Database table not configured"
**Cause:** `beta_applications` table doesn't exist  
**Fix:** Run the SQL from `/BETA_APPLICATIONS_TABLE_SETUP.md`

### Issue: Vercel build fails with "api/**/*.js not found"
**Cause:** Old vercel.json had incorrect functions config  
**Fix:** ✅ ALREADY FIXED - `/vercel.json` now has correct static site config

### Issue: "Unauthorized" or "Invalid API key"
**Cause:** Wrong Supabase credentials  
**Fix:** 
- Make sure you're using KiEX App Branding project credentials
- Check for typos in environment variables
- Redeploy after updating env vars

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    USER BROWSER                      │
└───────────────────┬─────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│              VERCEL (Frontend)                       │
│  ┌─────────────────────────────────────────────┐   │
│  │  React/Vite App (Static Site)               │   │
│  │  - /src/app/                                │   │
│  │  - UI Components                            │   │
│  │  - Client-side routing                      │   │
│  └─────────────────────────────────────────────┘   │
└───────────────────┬─────────────────────────────────┘
                    │ API Calls
                    ▼
┌─────────────────────────────────────────────────────┐
│          SUPABASE (Backend + Database)               │
│  ┌─────────────────────────────────────────────┐   │
│  │  Edge Functions (Deno/Hono)                 │   │
│  │  - /supabase/functions/server/              │   │
│  │  - POST /beta/submit                        │   │
│  │  - POST /beta/metgot-submit                 │   │
│  │  - GET /admin/beta-applications             │   │
│  └──────────────────┬──────────────────────────┘   │
│                     │                               │
│  ┌──────────────────▼──────────────────────────┐   │
│  │  PostgreSQL Database                        │   │
│  │  - beta_applications table                  │   │
│  │  - kv_store_9bd83859 table (KV store)      │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## ✅ Current Status

Your setup is now correct:

✅ `/vercel.json` - Fixed to deploy as static site only  
✅ Supabase Edge Functions - Already deployed  
✅ Database schema - Ready to create with SQL  
✅ API endpoints - Configured to use unified `beta_applications` table  

---

## 🚀 Next Steps

1. **Create the database table** (see `/BETA_APPLICATIONS_TABLE_SETUP.md`)
2. **Update Vercel environment variables** (see `/UPDATE_SUPABASE_CREDENTIALS.md`)
3. **Redeploy frontend** (push to GitHub or manual redeploy)
4. **Test beta application submission**
5. **Verify data appears in Supabase**

Done! 🎉
