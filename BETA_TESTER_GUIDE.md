# 🎉 ZALPHA Platform - Beta Tester Guide

## Welcome to ZALPHA! 

Your comprehensive job connection platform for Pacific Islands students and employers is now **FULLY FUNCTIONAL** and ready for beta testing!

---

## ✅ What's Working (Everything!)

### 🔐 **Authentication System**
- ✅ Student signup with age verification (18+)
- ✅ Employer signup with company details  
- ✅ Secure login/logout
- ✅ Session management
- ✅ Bot detection & reCAPTCHA validation

### 💼 **Job Management**
- ✅ Employers can post jobs
- ✅ Students can browse all jobs
- ✅ Job listings persist in database
- ✅ Applications tracked end-to-end

### 📝 **Applications System**
- ✅ Students can apply to jobs
- ✅ Cover letters saved
- ✅ Application status tracking
- ✅ Employers can view applications

### 👤 **Profile Management**
- ✅ Student profiles (education, skills, location)
- ✅ Employer profiles (company info, industry)
- ✅ Profile updates persist
- ✅ Candidate search for employers

### 📁 **File Uploads (NEW!)**
All file uploads now save to secure Supabase Storage:
- ✅ ID verification documents
- ✅ Resumes (PDF, DOCX)
- ✅ Transcripts
- ✅ Video introductions
- ✅ Profile photos
- ✅ General documents

### 🔒 **FERPA Compliance**
- ✅ Consent management
- ✅ Privacy settings
- ✅ Access logs
- ✅ Data export (student rights)
- ✅ Account deletion requests

### 🔗 **Integrations**
- ✅ Manatal ATS integration
- ✅ Wix website sync
- ✅ Job posting sync
- ✅ Candidate sync

---

## 🚀 How to Get Started

### For Students:

1. **Sign Up**
   - Go to `/student-signup`
   - Enter your personal information
   - Must be 18+ years old
   - Complete bot verification
   - Account created instantly!

2. **Complete Your Profile**
   - Upload your resume
   - Add your skills and education
   - Upload optional video introduction
   - Set privacy preferences

3. **Browse & Apply**
   - Browse jobs at `/student-dashboard`
   - Click "Apply" on any job
   - Write cover letter
   - Submit application
   - Track status in dashboard

### For Employers:

1. **Sign Up**
   - Go to `/employer-signup`
   - Enter company information
   - Choose subscription plan
   - Account created with 3-day trial!

2. **Post Jobs**
   - Go to `/employer-dashboard`
   - Click "Post New Job"
   - Fill in job details
   - Publish instantly

3. **Review Applications**
   - View applicants
   - Review student profiles
   - Access resumes & videos
   - Track hiring progress

---

## 🛠️ Backend Integration (For Developers)

### API Client Usage

All backend operations are accessible via the API client at `/src/app/utils/api.ts`:

```typescript
import api from '@/app/utils/api';

// Authentication
const result = await api.auth.studentSignup({
  email: 'student@example.com',
  password: 'SecurePass123!',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '2000-01-01',
  school: 'Northern Marianas College',
  graduationYear: '2026',
  location: 'Saipan, CNMI',
  recaptchaToken: 'token-here',
  behavioralScore: 85,
});

// Sign in
const auth = await api.auth.signIn('email@example.com', 'password');

// Create job posting
const job = await api.jobs.create({
  title: 'Software Developer',
  description: 'Join our team...',
  location: 'Guam',
  salary: '$50,000-$70,000',
  employmentType: 'full-time',
});

// Upload resume
const resume = await api.uploads.uploadResume(fileObject);

// Upload ID verification
const id = await api.uploads.uploadIDVerification(fileObject);

// Submit job application
const app = await api.applications.submit(jobId, coverLetter);
```

### Available APIs

#### Authentication (`api.auth`)
- `studentSignup(data)` - Create student account
- `employerSignup(data)` - Create employer account
- `signIn(email, password)` - Login
- `getSession()` - Check current session
- `signOut()` - Logout
- `getCurrentUser()` - Get user from localStorage
- `isAuthenticated()` - Check if logged in

#### Jobs (`api.jobs`)
- `create(jobData)` - Post new job
- `getAll()` - Get all jobs
- `getEmployerJobs()` - Get employer's jobs

#### Applications (`api.applications`)
- `submit(jobId, coverLetter)` - Apply to job
- `getStudentApplications()` - Get student's applications

#### Profiles (`api.profiles`)
- `updateStudent(data)` - Update student profile
- `updateEmployer(data)` - Update employer profile
- `getStudents()` - Search candidates

#### File Uploads (`api.uploads`)
- `uploadIDVerification(file)` - Upload ID
- `uploadResume(file)` - Upload resume
- `uploadTranscript(file, visibility)` - Upload transcript
- `uploadVideoIntro(file)` - Upload video
- `uploadProfilePhoto(file)` - Upload photo
- `uploadDocument(file, type)` - Upload general document

#### FERPA Compliance (`api.ferpa`)
- `saveConsent(data)` - Save FERPA consent
- `getConsent()` - Get consent status
- `getAccessLogs()` - View access logs
- `exportData()` - Export all student data
- `requestDeletion(data)` - Request account deletion
- `updatePrivacySettings(settings)` - Update privacy
- `getPrivacySettings()` - Get current settings

---

## 🔒 Security Features

### ✅ Bot Protection
- reCAPTCHA verification
- Behavioral analysis scoring
- Rate limiting on signups (5 per minute)

### ✅ Age Verification
- Server-side age calculation
- Must be 18+ to register
- Clear error messages for underage users

### ✅ Authentication
- Supabase Auth integration
- JWT session tokens
- Secure password hashing
- Auto-confirm emails (for beta)

### ✅ Data Protection
- All files in private Supabase Storage buckets
- Signed URLs with 1-year expiry
- User-specific file access
- FERPA-compliant data handling

---

## 📊 Storage Buckets

All files are organized in these Supabase Storage buckets:

| Bucket | Purpose | Max Size | Public |
|--------|---------|----------|--------|
| `make-9bd83859-id-verification` | ID documents | 10 MB | No |
| `make-9bd83859-resumes` | Student resumes | 5 MB | No |
| `make-9bd83859-transcripts` | School transcripts | 10 MB | No |
| `make-9bd83859-videos` | Video introductions | 100 MB | No |
| `make-9bd83859-profile-photos` | Profile pictures | 5 MB | No |
| `make-9bd83859-documents` | General documents | 10 MB | No |

---

## 🧪 Testing Checklist

### Student Flow
- [ ] Sign up as new student
- [ ] Upload resume
- [ ] Upload ID verification
- [ ] Browse available jobs
- [ ] Apply to a job with cover letter
- [ ] Check application status
- [ ] Update profile information
- [ ] Upload video introduction
- [ ] Update privacy settings
- [ ] Export your data (FERPA)

### Employer Flow
- [ ] Sign up as new employer
- [ ] Post a new job
- [ ] View all posted jobs
- [ ] Search for candidates
- [ ] View student applications
- [ ] Access student resumes
- [ ] Watch student video intros
- [ ] Update company profile

### Integration Testing
- [ ] File uploads persist across sessions
- [ ] Applications show in both student & employer dashboards
- [ ] Privacy settings prevent unauthorized access
- [ ] Session persists after page reload
- [ ] Logout clears session properly

---

## 🐛 Known Limitations (Beta)

1. **Email Confirmations**: Currently auto-confirmed for testing. Production will require email verification.

2. **Password Reset**: Not yet implemented. Will be added in next release.

3. **Payment Processing**: Subscription payments are tracked but not charged (test mode).

4. **Real-time Updates**: Dashboard updates on page refresh, not real-time.

5. **Mobile Video Upload**: Some browsers may have limitations on video recording.

---

## 📞 Support & Feedback

### Found a Bug?
1. Note the exact steps to reproduce
2. Include your user type (student/employer)
3. Screenshot any error messages
4. Email: support@zalpharecruit.com

### Feature Requests?
We want to hear them! Share your ideas at: feedback@zalpharecruit.com

### Need Help?
- Check the FAQ at `/faq`
- Visit Help Center at `/help-center`
- Contact support at support@zalpharecruit.com

---

## 🎯 Beta Testing Goals

Help us test:
1. **User Experience**: Is the signup/login process intuitive?
2. **File Uploads**: Do all file types upload smoothly?
3. **Job Applications**: Is the apply-to-job flow clear?
4. **Performance**: Does everything load quickly?
5. **Mobile**: Does the platform work well on phones/tablets?
6. **Accessibility**: Can you use keyboard navigation and screen readers?

---

## 🌟 What's Next?

Coming soon:
- Real-time notifications
- Chat/messaging between employers and students
- Advanced candidate filtering
- Skills assessment integration
- Virtual job fair platform
- Mobile app (iOS/Android)
- Government loan application integration
- Partnership dashboard for schools

---

## 💪 Thank You!

Your participation in this beta test is invaluable. Together, we're building something that will transform career opportunities across the Pacific Islands!

**Let's make ZALPHA amazing! 🌺**

---

Last Updated: February 3, 2026
Version: 1.0.0-beta
