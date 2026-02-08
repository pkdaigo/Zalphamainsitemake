# 🎯 KiEX Integration Architecture

## Clarification: Two Types of Integrations

### 🏢 **Platform Admin Integrations** (KI Executive Group Only)

**Wix Website Integration**
- **Purpose:** Connect KiEX's own company website (Ki Executive Group's website)
- **Scope:** Admin/platform-level only
- **Who uses it:** KI Executive Group administrators
- **What it does:**
  - Syncs form submissions from KiEX website to platform
  - Manages contact submissions
  - Auto-posts job listings to company blog
  - Manages marketing content
- **Configuration:** Single setup for the entire platform
- **Status:** 🟡 Configured (needs environment variables)

---

### 💼 **Employer Integrations** (Per-Employer)

**Manatal ATS / Other ATS Systems**
- **Purpose:** Each employer connects THEIR OWN ATS system
- **Scope:** Per-employer configuration
- **Who uses it:** Individual employers who subscribe to KiEX
- **What it does:**
  - Employer A connects their Manatal account
  - Employer B connects their Greenhouse account
  - Employer C connects their Workday account
  - Each employer's jobs sync to KiEX
  - Candidate applications from KiEX sent to employer's ATS
- **Configuration:** Each employer sets up their own API keys
- **Status:** ✅ Manatal LIVE (demo with your API key)

---

## Integration Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│           KI EXECUTIVE GROUP (Platform Admin)           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🌐 Wix Website (YOUR company site)                    │
│     ↓                                                   │
│     └─→ Form submissions → KiEX Platform               │
│     └─→ Contact sync → KiEX CRM                        │
│     └─→ Job posts → Company blog                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
                            │
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  KiEX PLATFORM (Core)                   │
│                 Job Connection Platform                 │
└─────────────────────────────────────────────────────────┘
                            │
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ EMPLOYER A   │  │ EMPLOYER B   │  │ EMPLOYER C   │
├──────────────┤  ├──────────────┤  ├──────────────┤
│              │  │              │  │              │
│ Manatal ATS  │  │ Greenhouse   │  │ Workday      │
│ (Their own)  │  │ (Their own)  │  │ (Their own)  │
│              │  │              │  │              │
│ API Key: XXX │  │ API Key: YYY │  │ API Key: ZZZ │
│              │  │              │  │              │
│ ✅ Connected │  │ ✅ Connected │  │ ✅ Connected │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## Who Connects What?

### **KI Executive Group (You)**
✅ Wix Integration (your company website)
- Single configuration
- Platform-level admin access
- Environment variables stored in Supabase

### **Employers (Your Customers)**
✅ Their own ATS system (Manatal, Greenhouse, etc.)
- Per-employer configuration
- Each employer has their own settings
- API keys stored securely per employer account

---

## Current Implementation

### **Integration Settings Page**
Now clearly shows:
1. **🎯 Two Types of Integrations** banner at the top
   - Platform Admin section (Wix)
   - Employer Integrations section (ATS)

2. **Wix Card** (Orange)
   - For KI Executive Group only
   - Admin platform configuration
   - Manages company website integration

3. **Manatal Card** (Purple)
   - Example of employer ATS integration
   - Each employer would have their own setup
   - Currently showing demo with your API key

---

## Implementation Notes

### **For Production:**

1. **Wix Integration** (Platform Admin)
   - Should be in an "Admin Settings" page
   - Only accessible to KI Executive Group staff
   - Not visible to employers or students
   - Uses environment variables in Supabase

2. **Employer ATS Integration** (Per-Employer)
   - Each employer sees this in THEIR dashboard
   - Employer A only sees their own ATS connection
   - Employer B only sees their own ATS connection
   - Stored in database: `employer_integrations` table
   - Schema: `{ employer_id, ats_type, api_key, site_id, status }`

### **Database Schema for Employer Integrations:**

```sql
-- Each employer has their own ATS configuration
CREATE TABLE employer_integrations (
  id UUID PRIMARY KEY,
  employer_id UUID REFERENCES employers(id),
  integration_type VARCHAR(50), -- 'manatal', 'greenhouse', 'workday', etc.
  api_key VARCHAR(255) ENCRYPTED,
  site_id VARCHAR(255),
  account_id VARCHAR(255),
  status VARCHAR(20), -- 'connected', 'disconnected', 'error'
  last_sync TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## What Gets Synced?

### **Wix Integration (Platform Admin)**
- ✅ Form submissions from KiEX website
- ✅ Contact form entries
- ✅ Newsletter signups
- ✅ Job posts to company blog
- ✅ Marketing content

### **Employer ATS Integration (Per-Employer)**
- ✅ Job postings (bi-directional)
- ✅ Candidate applications
- ✅ Application status updates
- ✅ Interview schedules
- ✅ Candidate profiles

---

## Security

### **Platform Integrations (Wix)**
- Stored in Supabase environment variables
- Only accessible by platform admins
- `WIX_API_KEY`, `WIX_SITE_ID`, `WIX_ACCOUNT_ID`

### **Employer Integrations (ATS)**
- Stored in database, encrypted at rest
- Each employer can only access their own
- API keys never exposed to frontend
- Server-side proxy for all ATS calls

---

## Summary

✅ **Wix = KI Executive Group's website** (admin only)
✅ **Manatal/ATS = Each employer's own system** (per-employer)

The Integration Settings page now clearly explains this with a prominent banner showing the two types of integrations!
