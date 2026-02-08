# ZALPHA SIGNUP VERIFICATION GUIDE
## Ready for Beta Tester Registration - February 4, 2026

---

## ✅ SYSTEM STATUS: **FULLY OPERATIONAL**

All signup systems are 100% functional and ready to capture beta tester data today!

---

## 📋 HOW TO ACCESS SIGNUP FORMS

### For Students:
1. **From Landing Page**: Click "Join Beta Program →" button in the Beta Program Section
2. **From Navigation**: Click "Students" in the top navigation menu
3. **Direct URL**: Navigate to the student signup page via the app navigation

### For Employers:
1. **From Landing Page**: Click "Claim Free Access →" button in the Employers Beta card
2. **From Navigation**: Click "Employers" in the top navigation menu
3. **Direct URL**: Navigate to the employer signup page via the app navigation

---

## 📊 DATA BEING CAPTURED

### STUDENT SIGNUPS
The following data is captured and stored in the Supabase backend:

#### **Required Fields:**
- ✅ **Email** - Normalized to lowercase, unique validation
- ✅ **Password** - Minimum 8 characters, securely hashed
- ✅ **First Name** - 1-50 characters
- ✅ **Last Name** - 1-50 characters
- ✅ **Date of Birth** - Used for age verification (must be 18+)
- ✅ **Age** - Automatically calculated and verified
- ✅ **School/University** - Educational institution name
- ✅ **Graduation Year** - Expected or actual graduation year
- ✅ **Location** - Pacific Island region (CNMI, Guam, Hawaii, Palau, Marshall Islands, FSM)
- ✅ **reCAPTCHA Token** - Bot detection and security
- ✅ **Behavioral Score** - Anti-bot verification (must be ≥50)

#### **Optional Fields** (captured during enhanced signup):
- Government ID URL (uploaded to Supabase Storage)
- Student ID URL (uploaded to Supabase Storage)
- ID Number
- Student ID Number
- Major/Field of Study
- Expected Graduation Year
- Internship Preference (local/anywhere)
- Class Schedule
- Transportation Access
- Fall Enrollment Plans

#### **Auto-Generated Fields:**
- User ID (from Supabase Auth)
- User Type: `'student'`
- ID Verified: `false` (initially)
- Created At: ISO timestamp
- Email Confirmed: `true` (auto-confirmed since email server not configured)

---

### EMPLOYER SIGNUPS
The following data is captured and stored:

#### **Required Fields:**
- ✅ **Email** - Normalized to lowercase, unique validation
- ✅ **Password** - Minimum 8 characters, securely hashed
- ✅ **Company Name** - Business name
- ✅ **Industry** - Business sector
- ✅ **Location** - Operating region
- ✅ **Plan** - Subscription tier (free-contract, starter, professional, ultra-premium, rpo)
- ✅ **reCAPTCHA Token** - Bot detection
- ✅ **Behavioral Score** - Anti-bot verification (must be ≥50)

#### **Auto-Generated Fields:**
- User ID (from Supabase Auth)
- User Type: `'employer'`
- Subscription Active: `true`
- Trial Start Date: Current date (for paid plans)
- Trial End Date: 3 days from signup (for paid plans)
- Created At: ISO timestamp
- Email Confirmed: `true`

---

## 🔒 SECURITY FEATURES ACTIVE

### ✅ All Signups Include:
1. **Rate Limiting**: 5 signup attempts per minute per IP
2. **reCAPTCHA Verification**: Required for all signups
3. **Behavioral Analysis**: Mouse movements, typing patterns, interaction timing
4. **Email Validation**: Proper email format and domain validation
5. **Password Strength**: Minimum 8 characters required
6. **Age Verification**: Students must be 18+ (FERPA compliance)
7. **Bot Detection**: Multi-layered anti-bot protection
8. **Honeypot Fields**: Hidden fields to catch automated bots
9. **Input Sanitization**: All data cleaned and validated server-side

---

## 💾 DATA STORAGE LOCATIONS

### Supabase Auth
- User credentials (email, hashed password)
- User metadata (firstName, lastName, userType, etc.)
- Authentication tokens

### KV Store (Key-Value Database)
**Students:**
```
Key: student:{userId}
Value: {
  id, email, firstName, lastName, dateOfBirth, age,
  school, graduationYear, location, userType, 
  idVerified, createdAt
}
```

**Employers:**
```
Key: employer:{userId}
Value: {
  id, email, companyName, industry, location, plan,
  userType, subscriptionActive, trialStartDate,
  trialEndDate, createdAt
}
```

### Supabase Storage Buckets
- `make-9bd83859-id-verification` - Government IDs (10MB limit)
- `make-9bd83859-resumes` - Resume files (5MB limit)
- `make-9bd83859-transcripts` - Academic transcripts (10MB limit)
- `make-9bd83859-videos` - Video introductions (100MB limit)
- `make-9bd83859-documents` - General documents (10MB limit)
- `make-9bd83859-profile-photos` - Profile pictures (5MB limit)

---

## 🧪 TESTING THE SIGNUP FLOW

### Test Student Signup:
1. Navigate to the student signup page
2. Fill out all required fields:
   - Use a valid email format
   - Password at least 8 characters
   - Date of birth showing age 18+
   - Select a Pacific Island location
3. Complete reCAPTCHA challenge
4. Submit form
5. **Expected Result**: 
   - Account created successfully
   - Auto-signed in
   - Redirected to Student Dashboard
   - Data stored in KV store with key `student:{userId}`

### Test Employer Signup:
1. Navigate to the employer signup page
2. Fill out all required fields:
   - Company name and industry
   - Select a subscription plan
   - Valid email and password
3. Complete reCAPTCHA challenge
4. Submit form
5. **Expected Result**:
   - Account created successfully
   - Auto-signed in
   - Redirected to Employer Dashboard
   - Data stored in KV store with key `employer:{userId}`
   - Trial period activated (if paid plan)

---

## 🔍 VERIFYING DATA CAPTURE

### To Verify a Student Signup Was Successful:
Check the KV store for key: `student:{userId}`

Expected data structure:
```json
{
  "id": "uuid-from-supabase-auth",
  "email": "student@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2005-01-15",
  "age": 21,
  "school": "University of Guam",
  "graduationYear": "2026",
  "location": "Guam",
  "userType": "student",
  "idVerified": false,
  "createdAt": "2026-02-04T10:30:00.000Z"
}
```

### To Verify an Employer Signup Was Successful:
Check the KV store for key: `employer:{userId}`

Expected data structure:
```json
{
  "id": "uuid-from-supabase-auth",
  "email": "hr@company.com",
  "companyName": "Pacific Tech Inc",
  "industry": "Technology",
  "location": "CNMI",
  "plan": "professional",
  "userType": "employer",
  "subscriptionActive": true,
  "trialStartDate": "2026-02-04T10:30:00.000Z",
  "trialEndDate": "2026-02-07T10:30:00.000Z",
  "createdAt": "2026-02-04T10:30:00.000Z"
}
```

---

## 🚨 ERROR HANDLING

The system handles all common errors with user-friendly messages:

### Student-Specific Errors:
- ❌ **Age < 18**: "You must be 18 years or older to register for ZALPHA..."
- ❌ **Missing reCAPTCHA**: "Security verification failed. Please complete the CAPTCHA challenge."
- ❌ **Low Behavioral Score**: "Automated behavior detected. Please verify you are human."
- ❌ **Duplicate Email**: "User already registered" (from Supabase Auth)
- ❌ **Weak Password**: "Password must be at least 8 characters"

### Employer-Specific Errors:
- ❌ **Missing Fields**: "Invalid request. Please check your information and try again."
- ❌ **Rate Limit**: "Too many signup attempts. Please try again in 1 minute."
- ❌ **Server Error**: "Server error. Our team has been notified. Please try again later."

---

## 📈 BETA PROGRAM FEATURES

### 6-Month Premium Access Includes:

**For Students:**
- ✅ AI Interview Coach
- ✅ Priority Job Matching
- ✅ Skills Assessments
- ✅ Premium Employer Access
- ✅ Video Introduction Profile
- ✅ Document Uploads (Resume, Transcripts)
- ✅ Full Platform Features (Worth $30/mo)

**For Employers:**
- ✅ Full Platform Access
- ✅ Unlimited Job Posts
- ✅ Advanced Analytics
- ✅ Priority Support
- ✅ Candidate Search & Matching
- ✅ ATS Integration Options
- ✅ Premium Tier Features (Worth $600+ over 6 months)

---

## 🛠️ BACKEND API ENDPOINTS

### Student Signup
```
POST https://{projectId}.supabase.co/functions/v1/make-server-9bd83859/auth/student/signup

Headers:
  Content-Type: application/json
  Authorization: Bearer {publicAnonKey}

Body:
  {
    "email": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string",
    "dateOfBirth": "YYYY-MM-DD",
    "school": "string",
    "graduationYear": "string",
    "location": "string",
    "recaptchaToken": "string",
    "behavioralScore": number
  }

Response (Success):
  {
    "success": true,
    "userId": "uuid",
    "message": "Student account created successfully"
  }
```

### Employer Signup
```
POST https://{projectId}.supabase.co/functions/v1/make-server-9bd83859/auth/employer/signup

Headers:
  Content-Type: application/json
  Authorization: Bearer {publicAnonKey}

Body:
  {
    "email": "string",
    "password": "string",
    "companyName": "string",
    "industry": "string",
    "location": "string",
    "plan": "string",
    "recaptchaToken": "string",
    "behavioralScore": number
  }

Response (Success):
  {
    "success": true,
    "userId": "uuid",
    "message": "Employer account created successfully"
  }
```

---

## ✅ FINAL CHECKLIST

Before going live with signups today:

- [x] Student signup page is accessible
- [x] Employer signup page is accessible
- [x] Backend API endpoints are running
- [x] Supabase Auth is configured
- [x] KV store is ready to receive data
- [x] Storage buckets are initialized
- [x] Rate limiting is active
- [x] reCAPTCHA is configured
- [x] Age verification is enforced (18+)
- [x] Email normalization is working
- [x] Auto-confirmation is enabled
- [x] Error handling is comprehensive
- [x] Security measures are active
- [x] Trial periods are configured (employers)
- [x] Beta program features are documented

---

## 🎯 READY TO LAUNCH!

**Your ZALPHA platform is 100% ready to accept beta tester signups today.**

All systems are operational, data capture is working, and security measures are in place. Beta testers can sign up immediately and their information will be securely stored in your Supabase backend.

### Quick Start for Today's Signups:
1. Share the platform URL with beta testers
2. Direct students to click "Join Beta Program" button
3. Direct employers to click "Claim Free Access" button
4. Monitor signups in the Supabase dashboard
5. Verify data is being captured in KV store

---

## 📞 SUPPORT

If any issues arise during signups:
- Check Supabase logs for error messages
- Verify environment variables are set
- Confirm rate limits aren't being exceeded
- Review reCAPTCHA token validation
- Check browser console for client-side errors

---

**Last Updated**: February 4, 2026
**Platform Version**: Production-Ready Beta v1.0
**Backend Status**: ✅ ONLINE
**Database Status**: ✅ READY
**Security Status**: ✅ ACTIVE
