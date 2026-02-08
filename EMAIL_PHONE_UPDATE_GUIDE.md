# EMAIL AND PHONE NUMBER UPDATE SUMMARY

## 🎯 TASK OVERVIEW
Replace ALL instances of:
1. **@zalpha.com** → **@zalpharecruit.com**
2. **All ZALPHA phone numbers** → **670-286-3010**

---

## ✅ COMPLETED UPDATES

### **Component Files - DONE** ✅
- ✅ `/src/app/components/VerificationStatus.tsx` - support@zalpharecruit.com
- ✅ `/src/app/components/NonDiscriminationPolicy.tsx` - compliance@zalpharecruit.com
- ✅ `/src/app/components/ErrorBoundary.tsx` - support@zalpharecruit.com
- ✅ `/src/app/components/EmployerHelpBot.tsx` - support@zalpharecruit.com (line 129)

### **Remaining Component Files - TODO** ⏳
- ⏳ `/src/app/components/EmployerHelpBot.tsx` - line 311 (support@zalpha.com)
- ⏳ `/src/app/components/AntiTraffickingPolicy.tsx` - safety@zalpha.com, 1-670-ZALPHA-911
- ⏳ `/src/app/components/DisputeRefundPolicy.tsx` - disputes@zalpha.com, payments@zalpha.com, 1-670-ZALPHA-PAY
- ⏳ `/src/app/components/ZalphaBot.tsx` - 3 instances of support@zalpha.com
- ⏳ `/src/app/components/GeofenceProtection.tsx` - 2 instances of support@zalpha.com
- ⏳ `/src/app/components/FAQ4Skepticism.tsx` - support@zalpha.com

---

## 📝 DETAILED FILE LIST

### **Page Files (src/app/pages/)**
1. `/src/app/pages/Landing.tsx`
   - partnerships@zalpha.com (line 635)
   - (670) 555-ZLPH (line 661)
   - accessibility@zalpha.com (line 777)
   - (670) 555-ACCESS (line 777)

2. `/src/app/pages/TermsOfService.tsx`
   - compliance@zalpha.com (line 149)
   - legal@zalpha.com (lines 373, 416, 431)
   - compliance@zalpha.com (lines 417, 432)
   - support@zalpha.com (lines 418, 433)

3. `/src/app/pages/EmployerDashboard.tsx`
   - contact@zalpha.com (lines 528, 541, 556, 560)

4. `/src/app/pages/PitchDeckEmployers.tsx`
   - contact@zalpha.com (line 1664)
   - 670-286-3010 (already correct!)

5. `/src/app/pages/PitchDeckSchools.tsx`
   - contact@zalpha.com (line 1374)
   - 670-286-3010 (already correct!)

6. `/src/app/pages/PitchDeckInvestors.tsx`
   - contact@zalpha.com (line 1581)
   - 670-286-3010 (already correct!)

7. `/src/app/pages/PitchDeckAdvertisers.tsx`
   - advertise@zalpha.com (line 571)
   - (671) 555-0199 → 670-286-3010

8. `/src/app/pages/KickstarterCampaign.tsx`
   - contact@zalpha.com (line 685)
   - 670-286-3010 (already correct!)

9. `/src/app/pages/SchoolBDGuide.tsx`
   - [your.email@zalpha.com] (line 369)
   - contact@zalpha.com (lines 663, 728, 732)
   - 1-670-286-3010 (lines 664, 665, 735, 739) (already correct!)

10. `/src/app/pages/SchoolLogin.tsx`
    - schools@zalpha.com (line 180)

11. `/src/app/pages/SchoolDashboard.tsx`
    - schools@zalpha.com (lines 331, 335)
    - (671) 735-0100 (lines 338, 342) → 670-286-3010

12. `/src/app/pages/EmployerBDGuide.tsx`
    - contact@zalpha.com (line 702)
    - 1-670-286-3010 (already correct!)

13. `/src/app/pages/InvestorBDGuide.tsx`
    - founder@zalpha.com (line 616)
    - contact@zalpha.com (line 676)
    - 1-670-286-3010 (already correct!)

14. `/src/app/pages/PrivacyDashboard.tsx`
    - privacy@zalpha.com (line 672)
    - 1-800-ZALPHA-1 → 670-286-3010

15. `/src/app/pages/PrivacyPolicy.tsx`
    - privacy@zalpharecruit.com (line 118) - ALREADY UPDATED! ✅
    - (671) 555-0199 (lines 118, 214) → 670-286-3010

16. `/src/app/pages/LegalDocumentRepository.tsx`
    - legal@zalpha.com (line 866)

17. `/src/app/pages/MarketingMaterialsRepository.tsx`
    - marketing@zalpha.com (line 984)

18. `/src/app/pages/BusinessDevelopmentRepository.tsx`
    - bd@zalpha.com (line 1072)

19. `/src/app/pages/SchoolPartnershipGuide.tsx`
    - schools@zalpha.com (lines 242, 529)
    - 1-800-ZALPHA-1 (line 529) → 670-286-3010

---

### **Utility Files**
20. `/src/app/utils/comprehensiveContentExpander.ts`
    - support@zalpha.com (line 136)
    - ops@zalpha.com (lines 137, 284, 335, 364, 398)
    - techsupport@zalpha.com (lines 138, 336)
    - ada@zalpha.com (lines 139, 210, 337)
    - legal@zalpha.com (lines 181, 338)
    - security@zalpha.com (line 339)
    - success@zalpha.com (line 340)
    - +1-670-483-JOBS (line 136) → 670-286-3010

21. `/src/app/data/operationalDocumentContent.ts`
    - support@zalpha.com (lines 389, 506)
    - ops@zalpha.com (line 521)
    - success@zalpha.com (line 1200)
    - +1-670-483-JOBS (line 506) → 670-286-3010

22. `/src/app/hooks/useSecurityTracking.tsx`
    - beta-support@zalpha.com (line 364)
    - (670) 555-BETA → 670-286-3010

---

### **Backend Files**
23. `/supabase/functions/server/index.tsx`
    - support@zalpha.com (line 101)

---

### **Documentation Files (.md files)**
- Multiple .md files have outdated contact info
- Most documentation uses old phone numbers
- These are less critical but should be updated for consistency

---

## 🔧 SYSTEMATIC REPLACEMENT GUIDE

### **Email Pattern Replacements:**
```
support@zalpha.com → support@zalpharecruit.com
compliance@zalpha.com → compliance@zalpharecruit.com
legal@zalpha.com → legal@zalpharecruit.com
contact@zalpha.com → contact@zalpharecruit.com
partnerships@zalpha.com → partnerships@zalpharecruit.com
schools@zalpha.com → schools@zalpharecruit.com
safety@zalpha.com → safety@zalpharecruit.com
disputes@zalpha.com → disputes@zalpharecruit.com
payments@zalpha.com → payments@zalpharecruit.com
advertise@zalpha.com → advertise@zalpharecruit.com
privacy@zalpha.com → privacy@zalpharecruit.com
marketing@zalpha.com → marketing@zalpharecruit.com
bd@zalpha.com → bd@zalpharecruit.com
ops@zalpha.com → ops@zalpharecruit.com
techsupport@zalpha.com → techsupport@zalpharecruit.com
ada@zalpha.com → ada@zalpharecruit.com
security@zalpha.com → security@zalpharecruit.com
success@zalpha.com → success@zalpharecruit.com
founder@zalpha.com → founder@zalpharecruit.com
beta-support@zalpha.com → beta-support@zalpharecruit.com
```

### **Phone Number Replacements:**
```
(670) 555-* → 670-286-3010
(671) 555-* → 670-286-3010
1-670-ZALPHA-* → 670-286-3010
1-800-ZALPHA-* → 670-286-3010
(670) 555-ZLPH → 670-286-3010
(670) 555-ACCESS → 670-286-3010
(670) 555-BETA → 670-286-3010
1-670-ZALPHA-911 → 670-286-3010
1-670-ZALPHA-PAY → 670-286-3010
(671) 735-0100 → 670-286-3010
+1-670-483-JOBS → 670-286-3010
```

### **DO NOT REPLACE (Government/External Numbers):**
```
❌ (670) 664-4870 - CHCC
❌ (691) 350-2115 - Yap Hospital
❌ (691) 330-2216 - Chuuk Hospital
❌ (691) 320-2213 - Pohnpei Hospital
❌ (691) 370-3199 - Kosrae Hospital
❌ (671) 735-7143 - Guam DPHSS
❌ (808) 586-8000 - Hawaii Healthdepartment
❌ (680) 488-2552 - Palau Hospital
❌ (692) 625-3355 - Majuro Hospital
❌ (671) 735-5531 - Guam DOL
❌ (808) 586-8844 - HIOSH
❌ (670) 664-3000 - CNMI Commerce
❌ (670) 322-7171 - Law firm
❌ (670) 234-5678 - Law firm
❌ 1-888-373-7888 - Human Trafficking Hotline
❌ 233733 - Crisis Text Line
❌ 1-800-786-9199 - USPTO
```

---

## 📊 PROGRESS TRACKER

**Total Files to Update:** ~50+ files
**Email Instances:** ~100+ instances
**Phone Number Instances:** ~50+ instances

**Completed:** 4 files ✅
**Remaining:** 46+ files ⏳

---

## ⚡ PRIORITY LIST

### **HIGH PRIORITY (User-Facing):**
1. Landing page contact info
2. Support emails in error messages
3. Terms of Service contact
4. Privacy Policy contact
5. Help bots (ZalphaBot, EmployerHelpBot)

### **MEDIUM PRIORITY:**
6. Pitch decks
7. Dashboard pages
8. BD guides
9. Legal repositories

### **LOW PRIORITY:**
10. Utility files
11. Backend files (already working)
12. Documentation (.md files)

---

## 🚀 RECOMMENDED APPROACH

**Option 1: Manual (Safest)**
- Go through each file one by one
- Use fast_apply_tool for each update
- Verify changes after each file

**Option 2: Semi-Automated**
- Use file_search to find all instances
- Group similar files together
- Batch update by file type

**Option 3: Fully Automated (Risky)**
- Write a script to do mass replacements
- Higher risk of errors
- Would need extensive testing

**RECOMMENDED: Option 2** - Semi-automated with verification at each step

---

## ✅ COMPLETION CHECKLIST

- [ ] Update all component files
- [ ] Update all page files
- [ ] Update utility files
- [ ] Update backend files
- [ ] Update documentation files
- [ ] Search for any remaining @zalpha.com instances
- [ ] Search for any remaining old phone numbers
- [ ] Test all contact links
- [ ] Test all mailto: links
- [ ] Test all tel: links
- [ ] Verify in browser console (no errors)

---

## 🎯 NEXT STEPS

1. Continue with remaining component files (6 files)
2. Update all page files (19 files)
3. Update utility files (2 files)
4. Update backend file (1 file)
5. Final verification search
6. Test in browser

**Estimated Time Remaining:** 1-2 hours for all files

---

*Document created: February 3, 2026*
*Last updated by: AI Assistant*
