# KiEX Platform - Complete Navigation Map
**Last Updated:** January 29, 2026

---

## All Pages (37 Total)

### Public Pages (5)
1. **landing** - Landing page
2. **signin** - Sign in page
3. **privacy-policy** - Privacy Policy
4. **terms-of-service** - Terms of Service ✅ Updated (added Section 7.3)
5. **pricing** - Pricing page

### Demo & Showcase (3)
6. **demo-showcase** - Main demo hub (default page)
7. **app-overview** - App overview
8. **install-guide** - PWA installation guide

### Student Pages (8)
9. **student-signup** - Student registration
10. **student-dashboard** - Student home
11. **student-profile** - Student profile management
12. **job-search** - Job search interface
13. **student-privacy-settings** - Privacy settings
14. **student-ai-courses** - AI course platform ✅ Verified
15. **training-hub** - Training hub
16. **basic-skills-demo** - Basic skills test demo

### Employer Pages (6)
17. **employer-signup** - Employer registration
18. **employer-dashboard** - Employer home
19. **employer-assessments** - Custom assessment builder
20. **cultural-training** - Cultural sensitivity training ✅ Updated (now optional)
21. **company-review-demo** - Company review system
22. **admin-moderation** - Admin moderation panel

### Contract/Freelance Work (2)
23. **contract-marketplace** - Contract marketplace ✅ Updated (added on-platform policy, fixed userType)
24. **contract-work-portal** - Contract work portal

### School/Revenue Pages (4)
25. **school-revenue-dashboard** - School revenue dashboard
26. **transaction-tracker** - Transaction tracker
27. **payout-system** - Payout system
28. **coach-dashboard** - Coach dashboard

### Pitch Decks (6)
29. **pitch-deck-employers** - Employer pitch deck ✅ Updated
30. **pitch-deck-students** - Student pitch deck ✅ Updated
31. **pitch-deck-schools** - School pitch deck ✅ Updated
32. **pitch-deck-investors** - Investor pitch deck ✅ Updated
33. **pitch-deck-internal** - Internal pitch deck ✅ Updated
34. **pitch-deck-advertisers** - Advertiser pitch deck

### Virtual Fairs (2)
35. **virtual-college-fairs** - Virtual College Fairs (v1)
36. **virtual-college-fairs2** - Virtual College Fairs (v2)

### Integrations & Advanced (3)
37. **integration-settings** - Integration settings (Manatal, Wix)
38. **sync-dashboard** - Data sync dashboard
39. **custom-integrations** - Custom integrations

### Other (4)
40. **qr-code** - QR code generator
41. **kickstarter-campaign** - Kickstarter campaign page
42. **legal-checklist** - Legal compliance checklist

---

## Navigation Flows

### Main User Journeys

#### Student Journey
```
landing 
  → student-signup 
    → student-dashboard 
      → job-search
      → student-profile
      → student-ai-courses
      → contract-marketplace (userType: 'student') ✅
      → basic-skills-demo
```

#### Employer Journey
```
landing 
  → employer-signup 
    → employer-dashboard 
      → employer-assessments
      → cultural-training (optional) ✅
      → contract-marketplace (userType: 'employer') ✅
      → company-review-demo
```

#### Demo Showcase Journey
```
demo-showcase
  → pitch-deck-employers ✅
  → pitch-deck-students ✅
  → pitch-deck-schools ✅
  → pitch-deck-investors ✅
  → pitch-deck-internal ✅
  → pitch-deck-advertisers
  → cultural-training ✅
  → contract-marketplace ✅
  → basic-skills-demo
  → virtual-college-fairs
  → app-overview
```

---

## Updated Pages (This Session)

### Critical Update
- ✅ **App.tsx** - Fixed ContractMarketplace userType prop passing

### Content Updates (10 files)
1. ✅ **PitchDeckEmployers.tsx** - Cultural training optional, equipment logistics clarified
2. ✅ **PitchDeckStudents.tsx** - Equipment logistics clarified
3. ✅ **PitchDeckSchools.tsx** - Equipment logistics clarified
4. ✅ **PitchDeckInvestors.tsx** - Cultural training optional, equipment logistics clarified
5. ✅ **PitchDeckInternal.tsx** - Cultural training optional, equipment logistics clarified
6. ✅ **CulturalSensitivityTraining.tsx** - Updated subtitle to mention "optional"
7. ✅ **DemoShowcase.tsx** - Updated cultural training description
8. ✅ **ContractMarketplace.tsx** - Added on-platform work policy banner
9. ✅ **TermsOfService.tsx** - Added Section 7.3 on-platform requirement
10. ✅ **StudentPaymentPreferences.tsx** - Clarified KiEX handles equipment logistics

---

## Navigation Props Verification

### Pages Using `onNavigate` Only
- ✅ Landing, SignIn, StudentSignup, EmployerSignup
- ✅ StudentDashboard, EmployerDashboard
- ✅ JobSearch, StudentProfile, TrainingHub
- ✅ All 5 pitch decks
- ✅ CulturalSensitivityTraining
- ✅ BasicSkillsDemo
- ✅ ContractWorkPortal
- ✅ And 20+ more pages

### Pages Using `onNavigate` + `userType`
- ✅ **ContractMarketplace** (userType: 'student' | 'employer' | null)

### Pages Using Other Props
- TransactionTracker (userType: "school", schoolId)
- SchoolRevenueDashboard (schoolId)
- PayoutSystem (schoolId)

---

## External Links

### From StudentDashboard
- → contract-marketplace (line 144)

### From EmployerDashboard
- → contract-marketplace (line 182)

### From DemoShowcase
- → cultural-training (line 953)
- → All pitch decks
- → contract-marketplace

---

## Critical Navigation Requirements

### UserType Management
The `userType` state is set in App.tsx based on which dashboard the user navigates to:
- 'student' - when navigating to student-dashboard
- 'employer' - when navigating to employer-dashboard  
- 'school' - when navigating to school-revenue-dashboard, transaction-tracker, or payout-system
- null - when navigating to landing or other public pages

### ContractMarketplace Special Handling
ContractMarketplace REQUIRES userType to determine:
- Which tabs to show (Browse Jobs vs Post Jobs)
- Which dashboard to return to (student-dashboard vs employer-dashboard)
- Whether to show EmploymentDisclosure and DisputeRefundPolicy

---

## All Routes Connected ✅

Every page in the application:
1. ✅ Has a route in App.tsx
2. ✅ Has proper imports
3. ✅ Receives correct props
4. ✅ Has working navigation back to origin

**Navigation System Status: FULLY OPERATIONAL** 🟢
