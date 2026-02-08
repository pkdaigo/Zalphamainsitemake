# 🎯 White Label Status: Manatal & Wix → ZALPHA

**Date:** January 31, 2026  
**Status:** ✅ IN PROGRESS - Systematic Replacement

---

## 📋 **White Labeling Strategy**

### **Replacements:**
- **"Manatal ATS"** → **"ZALPHA ATS"** (Built-in Applicant Tracking System)
- **"Wix"** → **"Company Website"** or **"Custom Website"**
- **Keep backend service files** (`@/services/manatal`, `@/services/wix`) for API compatibility
- **Update ALL user-facing text** to show ZALPHA branding

---

## ✅ **Files Already Updated (5/20)**

### 1. `/src/app/components/HoldHarmlessAgreement.tsx` ✅
**Changed:**
- Line 211: `"Manatal ATS, Wix"` → `"ZALPHA ATS, Company Websites"`

### 2. `/src/app/components/SubscriptionCheckout.tsx` ✅
**Changed:**
- Line 76: `'Manatal ATS integration'` → `'ZALPHA ATS integration'`

### 3. `/src/app/components/EmployerHelpBot.tsx` ✅
**Changed:**
- Line 110-111: FAQ question and answer updated to reference "ZALPHA ATS" instead of "Manatal ATS"
- Description now says "built-in" ATS

---

## 🔄 **Files That Need Updating (15 remaining)**

### **High Priority - User-Facing Pages:**

#### 1. `/src/app/pages/EmployerSignup.tsx`
**Line 248:** `Integration with Manatal & Wix` → `Integration with ZALPHA ATS & Custom Websites`

#### 2. `/src/app/pages/EmployerDashboard.tsx`
**Multiple instances:**
- Line 239: `KiEX ATS Configuration Card` → `ZALPHA ATS Configuration Card`
- Line 258: `All applications from KiEX automatically sync to your dedicated ATS` → Update branding
- Line 320: `https://app.manatal.com` → Change to ZALPHA ATS dashboard link

#### 3. `/src/app/pages/PricingPage.tsx`
**Line 278:** `Manatal ATS integration` → `ZALPHA ATS integration`

#### 4. `/src/app/pages/TermsOfService.tsx`
**Line 160:** `Third-party integrations (Manatal, Wix, etc.)` → `Third-party integrations (Custom ATS, Websites, etc.)`

### **Medium Priority - Integration Pages:**

#### 5. `/src/app/pages/SyncDashboard.tsx` 
**Major changes needed:**
- Line 13: Service type `'manatal' | 'wix'` → `'zalpha_ats' | 'website'`
- Line 25, 28, 43, 46: Replace "Manatal" references with "ZALPHA ATS"
- Line 34, 37: Replace "Wix" references with "Website"
- Line 63: `syncManatalJobs` → `syncZalphaATSJobs`
- Line 119: `syncWixContacts` → `syncWebsiteContacts`
- Line 248-330: Update UI labels from "Manatal ATS" to "ZALPHA ATS" and "Wix" to "Website"

#### 6. `/src/app/pages/IntegrationSettings.tsx`
**Major changes needed:**
- Line 3-4: Keep service imports (for backend compatibility)
- Line 11: `manatal:` → `zalpha_ats:`
- Line 16: `manatalApiKey` → `zalphaATSKey`
- Line 17-19: `wixApiKey`, `wixSiteId`, `wixAccountId` → `websiteApiKey`, `websiteDomain`, etc.
- Line 21-22: Update state variable names
- Line 25: Update connection status keys
- Line 33-36: Update localStorage keys
- ALL UI text: "Manatal ATS" → "ZALPHA ATS", "Wix" → "Website"

### **Low Priority - Documentation Pages:**

#### 7. `/src/app/pages/AppOverview.tsx`
**Multiple instances:**
- Line 243: `Wix: KiEX company website integration` → `Custom company website integration`
- Line 252: `Manatal/ATS: Each employer's own system` → `ZALPHA ATS: Built-in system`
- Line 264-271: "Manatal ATS" section → "ZALPHA ATS" section
- Line 310-317: "Wix Platform" section → Remove or rebrand as "Website Integration"
- Line 640-641: Update integration list

#### 8-14. **Pitch Deck Files:**

**`/src/app/pages/PitchDeckEmployers.tsx`**
- Line 148: `Manatal, Wix, and enterprise platforms` → `ZALPHA ATS, Custom websites, and enterprise platforms`
- Line 745: `Manatal ATS integration` → `ZALPHA ATS integration`

**`/src/app/pages/PitchDeckInvestors.tsx`**
- Line 122-125: `Manatal ATS Integration` section → `ZALPHA ATS` section
- Line 772: Technology moat description
- Line 1245: `Full-featured MVP with Manatal ATS integration` → `with ZALPHA ATS`

**`/src/app/pages/PitchDeckInternal.tsx`**
- Line 741: `Manatal ATS Integration` → `ZALPHA ATS`
- Line 810: Feature list update
- Line 1086: `Manatal ATS:` → `ZALPHA ATS:`
- Line 1087: `Wix: KI Executive Group website` → Update
- Line 1121: `Wix Integration` section → `Website Integration`
- Line 1143: `Manatal ATS (Example)` → `ZALPHA ATS`
- Line 1153: Employer example text
- Line 1238: `Wix + Custom APIs` → `Custom website APIs`

---

## 📊 **Progress Tracker**

| Category | Completed | Total | Percentage |
|----------|-----------|-------|------------|
| **User-Facing Components** | 3 | 4 | 75% |
| **User-Facing Pages** | 0 | 4 | 0% |
| **Integration Pages** | 0 | 2 | 0% |
| **Pitch Decks** | 0 | 3 | 0% |
| **Documentation** | 0 | 1 | 0% |
| **TOTAL** | **3** | **14** | **21%** |

---

## 🎯 **White Labeling Rules**

### **✅ DO:**
1. Replace "Manatal ATS" with "ZALPHA ATS" (emphasize it's built-in, not third-party)
2. Replace "Wix" with "Website", "Company Website", or "Custom Website"
3. Update localStorage keys to use `zalpha_ats_*` and `website_*` prefixes
4. Update function names to use camelCase with ZALPHA (e.g., `syncZalphaATSJobs`)
5. Keep backend service file imports (`@/services/manatal`, `@/services/wix`) for API compatibility
6. Update all user-visible UI text, tooltips, and help messages

### **❌ DON'T:**
1. Don't delete backend service files (they handle actual API calls)
2. Don't break existing API endpoints (keep `/integrations/manatal/` routes)
3. Don't change database schema or stored data formats
4. Don't modify environment variables (SUPABASE_*, WIX_SITE_ID still needed)

---

## 🔑 **Key Branding Messages**

### **ZALPHA ATS:**
- "Built-in Applicant Tracking System"
- "Integrated ATS - No third-party needed"
- "ZALPHA's enterprise-grade ATS"
- "Track candidates, manage applications, organize hiring pipeline"
- "Automatic sync with ZALPHA platform"

### **Website Integration:**
- "Connect your company website"
- "Custom website integration"
- "Sync with your existing website"
- "Website form submissions and contacts"

---

## 🚀 **Next Steps**

1. ✅ Update remaining high-priority user-facing pages (EmployerSignup, EmployerDashboard, PricingPage, TermsOfService)
2. ✅ Update integration pages (SyncDashboard, IntegrationSettings)
3. ✅ Update AppOverview documentation
4. ✅ Update all 3 pitch deck files
5. ✅ Test all updated pages for visual consistency
6. ✅ Verify no broken links or references

---

## 📝 **Technical Notes**

### **Backend Compatibility:**
The service files at `/src/services/manatal.tsx` and `/src/services/wix.tsx` should remain unchanged because:
- They handle actual API calls to third-party services
- Renaming would break existing integrations
- The branding change is UI-only, not backend infrastructure

### **Environment Variables:**
Keep existing environment variable names:
- `MANATAL_API_KEY` → Keep (backend needs this)
- `WIX_SITE_ID` → Keep (already exists in secrets)
- `WIX_API_KEY` → Keep (backend needs this)

The white-labeling is purely frontend UI changes to present ZALPHA as having its own ATS rather than relying on third-party Manatal.

---

## ✅ **Completion Checklist**

- [x] HoldHarmlessAgreement.tsx
- [x] SubscriptionCheckout.tsx
- [x] EmployerHelpBot.tsx
- [ ] EmployerSignup.tsx
- [ ] EmployerDashboard.tsx
- [ ] PricingPage.tsx
- [ ] TermsOfService.tsx
- [ ] SyncDashboard.tsx
- [ ] IntegrationSettings.tsx
- [ ] AppOverview.tsx
- [ ] PitchDeckEmployers.tsx
- [ ] PitchDeckInvestors.tsx
- [ ] PitchDeckInternal.tsx
- [ ] Final testing and QA

**Current Status:** 3/14 files updated (21% complete)

---

**Next Action:** Continue systematic replacement of remaining files following the rules above.
