import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";
import { Hono } from "npm:hono@4";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as manatalIntegration from "./manatal-integration.tsx";
import * as wixIntegration from "./wix-integration.tsx";
import { Security } from "./security.tsx";
import * as ferpaAudit from "./ferpa-audit.tsx";
import * as ferpaDataRights from "./ferpa-data-rights.tsx";
import * as plaidIntegration from "./plaid-integration.tsx";
import * as heygenIntegration from "./heygen-integration.tsx";
import * as heygenRoutes from "./heygen-routes.tsx";
import * as heygenConfig from "./heygen-config.tsx";

const app = new Hono();

// Validate environment variables on startup
Security.validateEnvironment();

// Initialize Supabase clients
const getServiceClient = () => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const getAnonClient = () => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

// Initialize Supabase Storage bucket on startup
(async () => {
  const supabase = getServiceClient();
  
  // Create all required storage buckets
  const buckets = [
    { name: 'make-9bd83859-id-verification', size: 10485760 }, // 10MB for IDs
    { name: 'make-9bd83859-resumes', size: 5242880 }, // 5MB for resumes
    { name: 'make-9bd83859-transcripts', size: 10485760 }, // 10MB for transcripts
    { name: 'make-9bd83859-videos', size: 104857600 }, // 100MB for video intros
    { name: 'make-9bd83859-documents', size: 10485760 }, // 10MB for general documents
    { name: 'make-9bd83859-profile-photos', size: 5242880 }, // 5MB for profile photos
  ];
  
  const { data: existingBuckets } = await supabase.storage.listBuckets();
  
  for (const bucket of buckets) {
    const bucketExists = existingBuckets?.some(b => b.name === bucket.name);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucket.name, {
        public: false,
        fileSizeLimit: bucket.size,
      });
      console.log(`Created storage bucket: ${bucket.name}`);
    }
  }
  
  console.log('Storage initialization complete');
})();

// Enable logger
app.use('*', logger(console.log));

// Apply security headers to all routes
app.use('*', Security.securityHeaders());

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-9bd83859/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== AUTHENTICATION ENDPOINTS ====================

// Student Signup - with rate limiting to prevent spam
app.post(
  "/make-server-9bd83859/auth/student/signup",
  Security.rateLimit({ windowMs: 60000, maxRequests: 5, message: 'Too many signup attempts. Please try again in 1 minute.' }),
  Security.validateInput({
    email: { required: true, type: 'email' },
    password: { required: true, type: 'string', minLength: 8 },
    firstName: { required: true, type: 'string', minLength: 1, maxLength: 50 },
    lastName: { required: true, type: 'string', minLength: 1, maxLength: 50 },
    dateOfBirth: { required: true, type: 'string' },
    school: { required: true, type: 'string', minLength: 1 },
    graduationYear: { required: true, type: 'string' },
    location: { required: true, type: 'string' },
  }),
  async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, firstName, lastName, dateOfBirth, school, graduationYear, location, recaptchaToken, behavioralScore } = body;

    // AGE VERIFICATION: Students must be 18+ to register
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      console.error('Age verification failed during student signup: User is under 18 years old');
      return c.json({ 
        error: 'You must be 18 years or older to register for ZALPHA. If you are under 18, please have a parent or guardian contact us at support@zalpharecruit.com for alternative access options.' 
      }, 400);
    }

    // Server-side bot detection validation
    // Note: In production, you would verify the reCAPTCHA token with Google's API
    if (!recaptchaToken || recaptchaToken === '') {
      console.error('Bot detection error during student signup: Missing reCAPTCHA token');
      return c.json({ 
        error: 'Security verification failed. Please complete the CAPTCHA challenge.' 
      }, 400);
    }
    
    // Validate behavioral score (should be >= 50 for human behavior)
    if (typeof behavioralScore !== 'number' || behavioralScore < 50) {
      console.error('Bot detection error during student signup: Invalid behavioral score:', behavioralScore);
      return c.json({ 
        error: 'Automated behavior detected. Please verify you are human.' 
      }, 400);
    }

    const supabase = getServiceClient();
    
    // Normalize email to lowercase
    const normalizedEmail = email.trim().toLowerCase();
    
    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: {
        firstName,
        lastName,
        dateOfBirth,
        age,
        userType: 'student',
      }
    });

    if (authError) {
      console.error('Student signup auth error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store student profile in KV store
    await kv.set(`student:${authData.user.id}`, {
      id: authData.user.id,
      email,
      firstName,
      lastName,
      dateOfBirth,
      age,
      school,
      graduationYear,
      location,
      userType: 'student',
      idVerified: false,
      createdAt: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      userId: authData.user.id,
      message: 'Student account created successfully' 
    });
  } catch (error) {
    console.error('Student signup error:', error);
    return c.json({ error: 'Failed to create student account' }, 500);
  }
});

// Employer Signup
app.post("/make-server-9bd83859/auth/employer/signup", 
  Security.rateLimit({ windowMs: 60000, maxRequests: 5, message: 'Too many signup attempts. Please try again in 1 minute.' }),
  async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, companyName, industry, location, plan, recaptchaToken, behavioralScore } = body;

    // Server-side bot detection validation
    if (!recaptchaToken || recaptchaToken === '') {
      console.error('Bot detection error during employer signup: Missing reCAPTCHA token');
      return c.json({ 
        error: 'Security verification failed. Please complete the CAPTCHA challenge.' 
      }, 400);
    }
    
    // Validate behavioral score (should be >= 50 for human behavior)
    if (typeof behavioralScore !== 'number' || behavioralScore < 50) {
      console.error('Bot detection error during employer signup: Invalid behavioral score:', behavioralScore);
      return c.json({ 
        error: 'Automated behavior detected. Please verify you are human.' 
      }, 400);
    }

    const supabase = getServiceClient();
    
    // Normalize email to lowercase
    const normalizedEmail = email.trim().toLowerCase();
    
    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: {
        companyName,
        userType: 'employer',
      }
    });

    if (authError) {
      console.error('Employer signup auth error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store employer profile in KV store
    await kv.set(`employer:${authData.user.id}`, {
      id: authData.user.id,
      email: normalizedEmail,
      companyName,
      industry,
      location,
      plan,
      userType: 'employer',
      subscriptionActive: true,
      trialStartDate: plan !== 'free-contract' ? new Date().toISOString() : null,
      trialEndDate: plan !== 'free-contract' ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() : null,
      createdAt: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      userId: authData.user.id,
      message: 'Employer account created successfully' 
    });
  } catch (error) {
    console.error('Employer signup error:', error);
    return c.json({ error: 'Failed to create employer account' }, 500);
  }
});

// Sign In
app.post("/make-server-9bd83859/auth/signin", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const supabase = getAnonClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      
      // Provide user-friendly error messages
      if (error.message.includes('Invalid login credentials')) {
        return c.json({ 
          error: 'Invalid email or password. Please check your credentials and try again.' 
        }, 401);
      }
      
      if (error.message.includes('Email not confirmed')) {
        return c.json({ 
          error: 'Please verify your email address before signing in.' 
        }, 401);
      }
      
      return c.json({ error: error.message }, 401);
    }

    if (!data.user || !data.session) {
      return c.json({ error: 'Sign in failed. Please try again.' }, 401);
    }

    // Get user profile from KV store
    const studentProfile = await kv.get(`student:${data.user.id}`);
    const employerProfile = await kv.get(`employer:${data.user.id}`);
    
    const profile = studentProfile || employerProfile;

    if (!profile) {
      console.error('Profile not found for user:', data.user.id);
      return c.json({ 
        error: 'User profile not found. Please contact support.' 
      }, 404);
    }

    return c.json({ 
      success: true,
      accessToken: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        userType: profile?.userType || 'student',
        profile,
      }
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return c.json({ error: 'Failed to sign in. Please try again.' }, 500);
  }
});

// Get Current Session
app.get("/make-server-9bd83859/auth/session", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const supabase = getServiceClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Invalid session' }, 401);
    }

    // Get user profile from KV store
    const studentProfile = await kv.get(`student:${user.id}`);
    const employerProfile = await kv.get(`employer:${user.id}`);
    
    const profile = studentProfile || employerProfile;

    return c.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        userType: profile?.userType || 'student',
        profile,
      }
    });
  } catch (error) {
    console.error('Session check error:', error);
    return c.json({ error: 'Failed to verify session' }, 500);
  }
});

// ==================== JOB ENDPOINTS ====================

// Create Job Posting
app.post("/make-server-9bd83859/jobs", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const jobId = crypto.randomUUID();
    
    const job = {
      id: jobId,
      employerId: user.id,
      ...body,
      applications: [],
      createdAt: new Date().toISOString(),
    };

    await kv.set(`job:${jobId}`, job);
    
    // Add to employer's jobs list
    const employerJobs = await kv.get(`employer:${user.id}:jobs`) || [];
    employerJobs.push(jobId);
    await kv.set(`employer:${user.id}:jobs`, employerJobs);

    return c.json({ success: true, job });
  } catch (error) {
    console.error('Create job error:', error);
    return c.json({ error: 'Failed to create job posting' }, 500);
  }
});

// Get All Jobs
app.get("/make-server-9bd83859/jobs", async (c) => {
  try {
    const jobs = await kv.getByPrefix('job:');
    return c.json({ success: true, jobs });
  } catch (error) {
    console.error('Get jobs error:', error);
    return c.json({ error: 'Failed to fetch jobs' }, 500);
  }
});

// Get Employer's Jobs
app.get("/make-server-9bd83859/employer/jobs", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const jobIds = await kv.get(`employer:${user.id}:jobs`) || [];
    const jobs = await Promise.all(
      jobIds.map(async (id: string) => await kv.get(`job:${id}`))
    );

    return c.json({ success: true, jobs: jobs.filter(Boolean) });
  } catch (error) {
    console.error('Get employer jobs error:', error);
    return c.json({ error: 'Failed to fetch employer jobs' }, 500);
  }
});

// ==================== APPLICATION ENDPOINTS ====================

// Submit Application
app.post("/make-server-9bd83859/applications", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { jobId, coverLetter } = body;
    
    const applicationId = crypto.randomUUID();
    const studentProfile = await kv.get(`student:${user.id}`);
    
    const application = {
      id: applicationId,
      jobId,
      studentId: user.id,
      studentProfile,
      coverLetter,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };

    await kv.set(`application:${applicationId}`, application);
    
    // Add to student's applications
    const studentApps = await kv.get(`student:${user.id}:applications`) || [];
    studentApps.push(applicationId);
    await kv.set(`student:${user.id}:applications`, studentApps);

    // Add to job's applications
    const job = await kv.get(`job:${jobId}`);
    if (job) {
      job.applications = job.applications || [];
      job.applications.push(applicationId);
      await kv.set(`job:${jobId}`, job);
    }

    return c.json({ success: true, application });
  } catch (error) {
    console.error('Submit application error:', error);
    return c.json({ error: 'Failed to submit application' }, 500);
  }
});

// Get Student Applications
app.get("/make-server-9bd83859/student/applications", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const appIds = await kv.get(`student:${user.id}:applications`) || [];
    const applications = await Promise.all(
      appIds.map(async (id: string) => await kv.get(`application:${id}`))
    );

    return c.json({ success: true, applications: applications.filter(Boolean) });
  } catch (error) {
    console.error('Get student applications error:', error);
    return c.json({ error: 'Failed to fetch applications' }, 500);
  }
});

// ==================== PROFILE ENDPOINTS ====================

// Update Student Profile
app.put("/make-server-9bd83859/student/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const profile = await kv.get(`student:${user.id}`);
    
    const updatedProfile = { ...profile, ...body, updatedAt: new Date().toISOString() };
    await kv.set(`student:${user.id}`, updatedProfile);

    return c.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error('Update student profile error:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// Update Employer Profile
app.put("/make-server-9bd83859/employer/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const profile = await kv.get(`employer:${user.id}`);
    
    const updatedProfile = { ...profile, ...body, updatedAt: new Date().toISOString() };
    await kv.set(`employer:${user.id}`, updatedProfile);

    return c.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error('Update employer profile error:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// Get All Students (for candidate search)
app.get("/make-server-9bd83859/students", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const students = await kv.getByPrefix('student:');
    // Filter out keys that end with :applications
    const profiles = students.filter((s: any) => s && !s.id?.includes(':applications'));
    
    return c.json({ success: true, students: profiles });
  } catch (error) {
    console.error('Get students error:', error);
    return c.json({ error: 'Failed to fetch students' }, 500);
  }
});

// ==================== ZALPHA ATS INTEGRATION ====================

// Test ZALPHA ATS Connection
app.get("/make-server-9bd83859/integrations/manatal/test", async (c) => {
  try {
    const result = await manatalIntegration.testConnection();
    return c.json(result);
  } catch (error) {
    console.error('ZALPHA ATS connection test error:', error);
    return c.json({ connected: false, message: error.message }, 500);
  }
});

// Get Jobs from ZALPHA ATS
app.get("/make-server-9bd83859/integrations/manatal/jobs", async (c) => {
  try {
    const status = c.req.query('status') as 'open' | 'closed' | 'draft' | undefined;
    const limit = parseInt(c.req.query('limit') || '50');
    
    const jobs = await manatalIntegration.getJobs({ status, limit });
    return c.json({ success: true, jobs: jobs.results, count: jobs.count });
  } catch (error) {
    console.error('Get ZALPHA ATS jobs error:', error);
    return c.json({ error: 'Failed to fetch jobs from ZALPHA ATS' }, 500);
  }
});

// Sync Jobs from ZALPHA ATS
app.post("/make-server-9bd83859/integrations/manatal/sync-jobs", async (c) => {
  try {
    const result = await manatalIntegration.syncJobsToZALPHA(kv);
    return c.json({ success: true, ...result });
  } catch (error) {
    console.error('ZALPHA ATS job sync error:', error);
    return c.json({ error: 'Failed to sync jobs from ZALPHA ATS' }, 500);
  }
});

// Submit Application to ZALPHA ATS
app.post("/make-server-9bd83859/integrations/manatal/submit-application", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { jobId, atsJobId, coverLetter } = body;
    
    const student = await kv.get(`student:${user.id}`);
    if (!student) {
      return c.json({ error: 'Student profile not found' }, 404);
    }

    // Submit to ZALPHA ATS
    const result = await manatalIntegration.submitApplicationToZALPHA(
      {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        resumeUrl: student.resumeUrl,
        location: student.location,
        skills: student.skills || [],
      },
      atsJobId,
      coverLetter
    );

    // Store application in ZALPHA
    const applicationId = crypto.randomUUID();
    const application = {
      id: applicationId,
      jobId,
      atsJobId,
      atsCandidateId: result.candidate.id,
      atsApplicationId: result.application.id,
      studentId: user.id,
      studentProfile: student,
      coverLetter,
      status: 'submitted',
      appliedAt: new Date().toISOString(),
    };

    await kv.set(`application:${applicationId}`, application);
    
    const studentApps = await kv.get(`student:${user.id}:applications`) || [];
    studentApps.push(applicationId);
    await kv.set(`student:${user.id}:applications`, studentApps);

    return c.json({ success: true, application, atsResult: result });
  } catch (error) {
    console.error('Submit application to ZALPHA ATS error:', error);
    return c.json({ error: 'Failed to submit application to ZALPHA ATS' }, 500);
  }
});

// Sync Student to ZALPHA ATS as Candidate
app.post("/make-server-9bd83859/integrations/manatal/sync-student", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { studentId } = body;
    
    const student = await kv.get(`student:${studentId}`);
    if (!student) {
      return c.json({ error: 'Student not found' }, 404);
    }

    // Sync to ZALPHA ATS
    const atsCandidate = await manatalIntegration.createCandidate({
      first_name: student.firstName,
      last_name: student.lastName,
      email: student.email,
      phone: student.phone,
      position: student.desiredPosition,
      location: student.location,
      linkedin_url: student.linkedinUrl,
      tags: ['ZALPHA', student.location, student.school],
    });

    // Store ATS ID in student profile
    student.atsId = atsCandidate.id;
    await kv.set(`student:${studentId}`, student);

    return c.json({ success: true, atsCandidate });
  } catch (error) {
    console.error('ZALPHA ATS sync error:', error);
    return c.json({ error: 'Failed to sync student to ZALPHA ATS' }, 500);
  }
});

// Sync Job to ZALPHA ATS
app.post("/make-server-9bd83859/integrations/manatal/sync-job", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { jobId } = body;
    
    const job = await kv.get(`job:${jobId}`);
    if (!job) {
      return c.json({ error: 'Job not found' }, 404);
    }

    // Sync to ZALPHA ATS
    const atsJob = await manatalIntegration.createJob({
      title: job.title,
      description: job.description,
      location: job.location,
      employment_type: job.employmentType,
      salary_min: job.salaryMin,
      salary_max: job.salaryMax,
    });

    // Store ATS ID in job
    job.atsId = atsJob.id;
    await kv.set(`job:${jobId}`, job);

    return c.json({ success: true, atsJob });
  } catch (error) {
    console.error('ZALPHA ATS job sync error:', error);
    return c.json({ error: 'Failed to sync job to ZALPHA ATS' }, 500);
  }
});

// ==================== ZALPHA WEBSITE INTEGRATION ====================

// Test ZALPHA Website Connection
app.get("/make-server-9bd83859/integrations/wix/test", async (c) => {
  try {
    const result = await wixIntegration.testConnection();
    return c.json(result);
  } catch (error) {
    console.error('ZALPHA Website connection test error:', error);
    return c.json({ connected: false, message: error.message }, 500);
  }
});

// Get Contacts from ZALPHA Website
app.get("/make-server-9bd83859/integrations/wix/contacts", async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');
    
    const result = await wixIntegration.getContacts({ limit, offset });
    return c.json({ success: true, contacts: result.contacts, count: result.total });
  } catch (error) {
    console.error('Get ZALPHA Website contacts error:', error);
    return c.json({ error: 'Failed to fetch contacts from ZALPHA Website' }, 500);
  }
});

// Get Form Submissions from ZALPHA Website
app.get("/make-server-9bd83859/integrations/wix/submissions", async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '50');
    
    const result = await wixIntegration.getFormSubmissions({ limit });
    return c.json({ success: true, submissions: result.submissions, count: result.total });
  } catch (error) {
    console.error('Get ZALPHA Website form submissions error:', error);
    return c.json({ error: 'Failed to fetch form submissions from ZALPHA Website' }, 500);
  }
});

// Sync Form Submissions from ZALPHA Website
app.post("/make-server-9bd83859/integrations/wix/sync-submissions", async (c) => {
  try {
    const result = await wixIntegration.syncFormSubmissionsToZALPHA(kv);
    return c.json({ success: true, ...result });
  } catch (error) {
    console.error('ZALPHA Website submission sync error:', error);
    return c.json({ error: 'Failed to sync submissions from ZALPHA Website' }, 500);
  }
});

// Sync Jobs to ZALPHA Website Blog
app.post("/make-server-9bd83859/integrations/wix/sync-jobs-to-blog", async (c) => {
  try {
    const result = await wixIntegration.syncJobsToZalphaWebsite(kv);
    return c.json({ success: true, ...result });
  } catch (error) {
    console.error('Sync jobs to ZALPHA Website blog error:', error);
    return c.json({ error: 'Failed to sync jobs to ZALPHA Website blog' }, 500);
  }
});

// Sync Student to ZALPHA Website Contact
app.post("/make-server-9bd83859/integrations/wix/sync-student", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const student = await kv.get(`student:${user.id}`);
    if (!student) {
      return c.json({ error: 'Student not found' }, 404);
    }

    // Sync to ZALPHA Website as Contact
    const websiteContact = await wixIntegration.syncStudentToZalphaContact({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      school: student.school,
      graduationYear: student.graduationYear,
      location: student.location,
    });

    // Store Website Contact ID in student profile
    student.websiteContactId = websiteContact.id;
    await kv.set(`student:${user.id}`, student);

    return c.json({ success: true, websiteContact });
  } catch (error) {
    console.error('ZALPHA Website student sync error:', error);
    return c.json({ error: 'Failed to sync student to ZALPHA Website' }, 500);
  }
});

// Sync Employer to ZALPHA Website Contact
app.post("/make-server-9bd83859/integrations/wix/sync-employer", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const employer = await kv.get(`employer:${user.id}`);
    if (!employer) {
      return c.json({ error: 'Employer not found' }, 404);
    }

    // Sync to ZALPHA Website as Contact
    const websiteContact = await wixIntegration.syncEmployerToZalphaContact({
      companyName: employer.companyName,
      contactName: employer.contactName || 'Team',
      email: employer.email,
      phone: employer.phone,
      industry: employer.industry,
    });

    // Store Website Contact ID in employer profile
    employer.websiteContactId = websiteContact.id;
    await kv.set(`employer:${user.id}`, employer);

    return c.json({ success: true, websiteContact });
  } catch (error) {
    console.error('ZALPHA Website employer sync error:', error);
    return c.json({ error: 'Failed to sync employer to ZALPHA Website' }, 500);
  }
});

// ==================== FILE UPLOAD ENDPOINTS ====================

// Upload ID Verification Document
app.post("/make-server-9bd83859/upload/id-verification", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const bucketName = 'make-9bd83859-id-verification';
    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('File upload error:', uploadError);
      return c.json({ error: 'Failed to upload file' }, 500);
    }

    // Create signed URL (valid for 1 year)
    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000); // 1 year in seconds

    // Update student profile with ID verification info
    const profile = await kv.get(`student:${user.id}`);
    if (profile) {
      profile.idVerificationDocument = fileName;
      profile.idVerificationUrl = signedUrlData?.signedUrl;
      profile.idVerified = true;
      await kv.set(`student:${user.id}`, profile);
    }

    return c.json({ 
      success: true, 
      fileName,
      url: signedUrlData?.signedUrl,
    });
  } catch (error) {
    console.error('Upload ID verification error:', error);
    return c.json({ error: 'Failed to upload ID verification document' }, 500);
  }
});

// Upload Resume
app.post("/make-server-9bd83859/upload/resume", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const bucketName = 'make-9bd83859-resumes';
    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Resume upload error:', uploadError);
      return c.json({ error: 'Failed to upload resume' }, 500);
    }

    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000);

    // Update student profile
    const profile = await kv.get(`student:${user.id}`);
    if (profile) {
      profile.resumeUrl = signedUrlData?.signedUrl;
      profile.resumeFileName = file.name;
      profile.resumeUpdatedAt = new Date().toISOString();
      await kv.set(`student:${user.id}`, profile);
    }

    return c.json({ 
      success: true, 
      fileName,
      url: signedUrlData?.signedUrl,
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    return c.json({ error: 'Failed to upload resume' }, 500);
  }
});

// Upload Transcript
app.post("/make-server-9bd83859/upload/transcript", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const visibility = formData.get('visibility') as string;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const bucketName = 'make-9bd83859-transcripts';
    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Transcript upload error:', uploadError);
      return c.json({ error: 'Failed to upload transcript' }, 500);
    }

    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000);

    // Store transcript info
    const transcriptId = crypto.randomUUID();
    const transcript = {
      id: transcriptId,
      studentId: user.id,
      fileName: file.name,
      filePath: fileName,
      url: signedUrlData?.signedUrl,
      visibility: visibility || 'private',
      uploadedAt: new Date().toISOString(),
    };

    const transcripts = await kv.get(`student:${user.id}:transcripts`) || [];
    transcripts.push(transcript);
    await kv.set(`student:${user.id}:transcripts`, transcripts);

    return c.json({ 
      success: true, 
      transcript,
    });
  } catch (error) {
    console.error('Upload transcript error:', error);
    return c.json({ error: 'Failed to upload transcript' }, 500);
  }
});

// Upload Video Introduction
app.post("/make-server-9bd83859/upload/video-intro", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const bucketName = 'make-9bd83859-videos';
    const fileName = `${user.id}/intro-${Date.now()}.webm`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Video upload error:', uploadError);
      return c.json({ error: 'Failed to upload video' }, 500);
    }

    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000);

    // Update student profile
    const profile = await kv.get(`student:${user.id}`);
    if (profile) {
      profile.videoIntroUrl = signedUrlData?.signedUrl;
      profile.hasVideoIntro = true;
      profile.videoUpdatedAt = new Date().toISOString();
      await kv.set(`student:${user.id}`, profile);
    }

    return c.json({ 
      success: true, 
      fileName,
      url: signedUrlData?.signedUrl,
    });
  } catch (error) {
    console.error('Upload video error:', error);
    return c.json({ error: 'Failed to upload video introduction' }, 500);
  }
});

// Upload Profile Photo
app.post("/make-server-9bd83859/upload/profile-photo", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const bucketName = 'make-9bd83859-profile-photos';
    const fileName = `${user.id}/profile-${Date.now()}.${file.name.split('.').pop()}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Photo upload error:', uploadError);
      return c.json({ error: 'Failed to upload profile photo' }, 500);
    }

    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000);

    // Update profile
    const profile = await kv.get(`student:${user.id}`) || await kv.get(`employer:${user.id}`);
    if (profile) {
      profile.profilePhotoUrl = signedUrlData?.signedUrl;
      profile.photoUpdatedAt = new Date().toISOString();
      const key = profile.userType === 'student' ? `student:${user.id}` : `employer:${user.id}`;
      await kv.set(key, profile);
    }

    return c.json({ 
      success: true, 
      fileName,
      url: signedUrlData?.signedUrl,
    });
  } catch (error) {
    console.error('Upload photo error:', error);
    return c.json({ error: 'Failed to upload profile photo' }, 500);
  }
});

// Upload General Document
app.post("/make-server-9bd83859/upload/document", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const documentType = formData.get('type') as string || 'general';
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const bucketName = 'make-9bd83859-documents';
    const fileName = `${user.id}/${documentType}/${Date.now()}-${file.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Document upload error:', uploadError);
      return c.json({ error: 'Failed to upload document' }, 500);
    }

    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000);

    // Store document info
    const documentId = crypto.randomUUID();
    const document = {
      id: documentId,
      userId: user.id,
      type: documentType,
      fileName: file.name,
      filePath: fileName,
      url: signedUrlData?.signedUrl,
      uploadedAt: new Date().toISOString(),
    };

    const documents = await kv.get(`user:${user.id}:documents`) || [];
    documents.push(document);
    await kv.set(`user:${user.id}:documents`, documents);

    return c.json({ 
      success: true, 
      document,
    });
  } catch (error) {
    console.error('Upload document error:', error);
    return c.json({ error: 'Failed to upload document' }, 500);
  }
});

// ==================== FERPA COMPLIANCE ENDPOINTS ====================

// Save FERPA Consent
app.post("/make-server-9bd83859/ferpa/consent", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { studentConsent, parentalConsent, directoryInfoOptIn, thirdPartyDisclosure, consentDate, studentSignature, parentSignature, parentEmail, parentName } = body;

    await ferpaAudit.saveFERPAConsent(kv, user.id, {
      studentConsent,
      parentalConsent,
      directoryInfoOptIn,
      thirdPartyDisclosure,
      consentDate,
      studentSignature,
      parentSignature,
      parentEmail,
      parentName,
    });

    return c.json({ success: true, message: 'FERPA consent saved successfully' });
  } catch (error) {
    console.error('Save FERPA consent error:', error);
    return c.json({ error: 'Failed to save FERPA consent' }, 500);
  }
});

// Get FERPA Consent
app.get("/make-server-9bd83859/ferpa/consent", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const consent = await ferpaAudit.getFERPAConsent(kv, user.id);
    return c.json({ success: true, consent });
  } catch (error) {
    console.error('Get FERPA consent error:', error);
    return c.json({ error: 'Failed to retrieve FERPA consent' }, 500);
  }
});

// Get Student Access Logs
app.get("/make-server-9bd83859/ferpa/access-logs", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const limit = parseInt(c.req.query('limit') || '100');
    const logs = await ferpaAudit.getStudentAccessLogs(kv, user.id, limit);

    return c.json({ success: true, logs });
  } catch (error) {
    console.error('Get access logs error:', error);
    return c.json({ error: 'Failed to retrieve access logs' }, 500);
  }
});

// Export Student Data (FERPA Right to Inspect)
app.post("/make-server-9bd83859/ferpa/export", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Create export request
    const exportRequest = await ferpaDataRights.createDataExportRequest(kv, user.id);
    
    // Process export immediately
    const result = await ferpaDataRights.processDataExport(kv, exportRequest.id);

    if (!result.success) {
      return c.json({ error: result.error }, 500);
    }

    return c.json({ 
      success: true, 
      exportRequest,
      data: result.data,
      message: 'Your education records have been exported as required by FERPA'
    });
  } catch (error) {
    console.error('Export data error:', error);
    return c.json({ error: 'Failed to export student data' }, 500);
  }
});

// Request Account Deletion
app.post("/make-server-9bd83859/ferpa/delete-account", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { deletionData } = body;

    const deletionRequest = await ferpaDataRights.createDeletionRequest(kv, user.id, deletionData);

    return c.json({ 
      success: true, 
      deletionRequest,
      message: 'Account deletion request created. You will receive a confirmation email. Deletion will be executed in 30 days unless cancelled.'
    });
  } catch (error) {
    console.error('Delete account request error:', error);
    return c.json({ error: 'Failed to create deletion request' }, 500);
  }
});

// Confirm Account Deletion
app.post("/make-server-9bd83859/ferpa/confirm-deletion/:requestId", async (c) => {
  try {
    const requestId = c.req.param('requestId');
    const body = await c.req.json();
    const { confirmationToken } = body;

    const result = await ferpaDataRights.confirmDeletionRequest(kv, requestId, confirmationToken);

    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return c.json({ success: true, message: 'Deletion request confirmed' });
  } catch (error) {
    console.error('Confirm deletion error:', error);
    return c.json({ error: 'Failed to confirm deletion' }, 500);
  }
});

// Cancel Account Deletion
app.post("/make-server-9bd83859/ferpa/cancel-deletion/:requestId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const requestId = c.req.param('requestId');
    const result = await ferpaDataRights.cancelDeletionRequest(kv, requestId, user.id);

    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return c.json({ success: true, message: 'Deletion request cancelled' });
  } catch (error) {
    console.error('Cancel deletion error:', error);
    return c.json({ error: 'Failed to cancel deletion' }, 500);
  }
});

// Request Amendment to Education Records
app.post("/make-server-9bd83859/ferpa/request-amendment", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { recordType, currentValue, requestedValue, reason } = body;

    const amendmentRequest = await ferpaDataRights.createAmendmentRequest(
      kv,
      user.id,
      recordType,
      currentValue,
      requestedValue,
      reason
    );

    return c.json({ 
      success: true, 
      amendmentRequest,
      message: 'Amendment request submitted. You will be notified of the decision within 45 days as required by FERPA.'
    });
  } catch (error) {
    console.error('Request amendment error:', error);
    return c.json({ error: 'Failed to submit amendment request' }, 500);
  }
});

// Update Privacy Settings
app.put("/make-server-9bd83859/ferpa/privacy-settings", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { directoryInfoVisible, thirdPartySharing, employerMessaging, showEmail, showPhone, showAddress } = body;

    // Update consent record
    const consent = await ferpaAudit.getFERPAConsent(kv, user.id);
    if (consent) {
      await ferpaAudit.saveFERPAConsent(kv, user.id, {
        ...consent,
        directoryInfoOptIn: directoryInfoVisible,
        thirdPartyDisclosure: thirdPartySharing,
      });
    }

    // Save detailed privacy settings
    const privacySettings = {
      directoryInfoVisible,
      thirdPartySharing,
      employerMessaging,
      showEmail,
      showPhone,
      showAddress,
      lastUpdated: new Date().toISOString(),
    };

    await kv.set(`student:${user.id}:privacy_settings`, privacySettings);

    return c.json({ success: true, privacySettings });
  } catch (error) {
    console.error('Update privacy settings error:', error);
    return c.json({ error: 'Failed to update privacy settings' }, 500);
  }
});

// Get Privacy Settings
app.get("/make-server-9bd83859/ferpa/privacy-settings", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const privacySettings = await kv.get(`student:${user.id}:privacy_settings`);
    return c.json({ success: true, privacySettings });
  } catch (error) {
    console.error('Get privacy settings error:', error);
    return c.json({ error: 'Failed to retrieve privacy settings' }, 500);
  }
});

// FERPA Compliance Report (Admin Only)
app.get("/make-server-9bd83859/ferpa/compliance-report", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Check if user is admin (you would implement proper admin check)
    const startDate = c.req.query('startDate');
    const endDate = c.req.query('endDate');

    const report = await ferpaAudit.generateFERPAComplianceReport(kv, startDate, endDate);

    return c.json({ success: true, report });
  } catch (error) {
    console.error('Compliance report error:', error);
    return c.json({ error: 'Failed to generate compliance report' }, 500);
  }
});

// ==================== ADMIN ENDPOINTS ====================

// Helper to verify internal admin access
const verifyInternalAdmin = async (c: any) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  const supabase = getServiceClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

  if (authError || !user) {
    return { authorized: false, error: 'Unauthorized' };
  }

  // Check if user is an internal admin user
  const internalUser = await kv.get(`internal:${user.id}`);
  if (!internalUser || !['administrator', 'manager'].includes(internalUser.role)) {
    return { authorized: false, error: 'Admin access required' };
  }

  return { authorized: true, user: internalUser };
};

// Get Platform Statistics
app.get("/make-server-9bd83859/admin/stats", async (c) => {
  try {
    // For now, allow without auth for demo purposes
    // In production, uncomment the auth check:
    // const authCheck = await verifyInternalAdmin(c);
    // if (!authCheck.authorized) {
    //   return c.json({ error: authCheck.error }, 401);
    // }

    // Get all keys by prefix
    const students = await kv.getByPrefix('student:');
    const employers = await kv.getByPrefix('employer:');
    const jobs = await kv.getByPrefix('job:');
    const applications = await kv.getByPrefix('application:');
    const betaApplications = await kv.getByPrefix('beta_application:');

    // Calculate statistics
    const totalStudents = students.length;
    const totalEmployers = employers.length;
    const totalJobs = jobs.length;
    const totalApplications = applications.length;
    const totalBetaApplications = betaApplications.length;

    // Count verified students
    const verifiedStudents = students.filter((s: any) => s.idVerified).length;

    // Count active employers (with active subscriptions)
    const activeEmployers = employers.filter((e: any) => e.subscriptionActive).length;

    // Count beta applications by status
    const betaStats = {
      pending: betaApplications.filter((b: any) => b.status === 'pending').length,
      approved: betaApplications.filter((b: any) => b.status === 'approved').length,
      waitlist: betaApplications.filter((b: any) => b.status === 'waitlist').length,
      rejected: betaApplications.filter((b: any) => b.status === 'rejected').length,
    };

    // Count beta applications by type
    const betaByType = {
      student: betaApplications.filter((b: any) => b.type === 'student').length,
      employer: betaApplications.filter((b: any) => b.type === 'employer').length,
      'career-services': betaApplications.filter((b: any) => b.type === 'career-services').length,
      ada: betaApplications.filter((b: any) => b.type === 'ada').length,
    };

    return c.json({
      success: true,
      stats: {
        students: {
          total: totalStudents,
          verified: verifiedStudents,
          unverified: totalStudents - verifiedStudents,
        },
        employers: {
          total: totalEmployers,
          active: activeEmployers,
          inactive: totalEmployers - activeEmployers,
        },
        jobs: {
          total: totalJobs,
        },
        applications: {
          total: totalApplications,
        },
        betaApplications: {
          total: totalBetaApplications,
          byStatus: betaStats,
          byType: betaByType,
        },
      },
    });
  } catch (error: any) {
    console.error('Admin stats error:', error);
    return c.json({ error: 'Failed to fetch platform statistics' }, 500);
  }
});

// Get All Students
app.get("/make-server-9bd83859/admin/students", async (c) => {
  try {
    // For now, allow without auth for demo purposes
    // In production, uncomment the auth check:
    // const authCheck = await verifyInternalAdmin(c);
    // if (!authCheck.authorized) {
    //   return c.json({ error: authCheck.error }, 401);
    // }

    // Get all student records directly from database
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('kv_store_9bd83859')
      .select('key, value')
      .like('key', 'student:%');

    if (error) throw error;

    // Filter to only main student profiles (student:uuid format, not student:uuid:something)
    const students = data
      ?.filter((item: any) => {
        const parts = item.key.split(':');
        return parts.length === 2; // Only student:{uuid}, not student:{uuid}:{other}
      })
      .map((item: any) => item.value) || [];
    
    // Sort by creation date (newest first)
    students.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    return c.json({
      success: true,
      students: students,
      count: students.length,
    });
  } catch (error: any) {
    console.error('Admin get students error:', error);
    return c.json({ error: 'Failed to fetch students' }, 500);
  }
});

// Get All Employers
app.get("/make-server-9bd83859/admin/employers", async (c) => {
  try {
    // For now, allow without auth for demo purposes
    // In production, uncomment the auth check:
    // const authCheck = await verifyInternalAdmin(c);
    // if (!authCheck.authorized) {
    //   return c.json({ error: authCheck.error }, 401);
    // }

    // Get all employer records directly from database
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('kv_store_9bd83859')
      .select('key, value')
      .like('key', 'employer:%');

    if (error) throw error;

    // Filter to only main employer profiles (employer:uuid format, not employer:uuid:something)
    const employers = data
      ?.filter((item: any) => {
        const parts = item.key.split(':');
        return parts.length === 2; // Only employer:{uuid}, not employer:{uuid}:{other}
      })
      .map((item: any) => item.value) || [];
    
    // Sort by creation date (newest first)
    employers.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    return c.json({
      success: true,
      employers: employers,
      count: employers.length,
    });
  } catch (error: any) {
    console.error('Admin get employers error:', error);
    return c.json({ error: 'Failed to fetch employers' }, 500);
  }
});

// Submit Beta Application
app.post("/make-server-9bd83859/beta/submit", async (c) => {
  try {
    const body = await c.req.json();
    const { type, data } = body;

    // Validate required fields
    if (!type || !data || !data.fullName || !data.email) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Validate type
    if (!['student', 'employer', 'career-services', 'ada'].includes(type)) {
      return c.json({ error: 'Invalid application type' }, 400);
    }

    // Generate unique ID
    const applicationId = crypto.randomUUID();

    // Create beta application record
    const betaApplication = {
      id: applicationId,
      type,
      ...data,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      adminNotes: '',
    };

    // Save to database with verification
    await kv.set(`beta_application:${applicationId}`, betaApplication);
    
    // CRITICAL: Verify the data was actually saved
    const verification = await kv.get(`beta_application:${applicationId}`);
    if (!verification) {
      console.error(`CRITICAL ERROR: Failed to verify storage of application ${applicationId}`);
      throw new Error('Failed to verify application was saved. Please try again.');
    }

    console.log(`✅ Beta application VERIFIED and SAVED: ${type} - ${data.email} (ID: ${applicationId})`);
    console.log(`✅ Storage verification passed for: ${applicationId}`);
    
    // BACKUP: Log complete application data for manual recovery if needed
    console.log('📋 BACKUP DATA LOG:', JSON.stringify({
      id: applicationId,
      type,
      email: data.email,
      name: data.fullName,
      timestamp: new Date().toISOString(),
      allData: betaApplication
    }));

    return c.json({
      success: true,
      applicationId,
      message: 'Beta application submitted successfully',
      verified: true,
    });
  } catch (error: any) {
    console.error('Beta application submission error:', error);
    return c.json({ error: error.message || 'Failed to submit beta application' }, 500);
  }
});

// Submit Metgot Global Beta Application
app.post("/make-server-9bd83859/beta/metgot-submit", async (c) => {
  try {
    const body = await c.req.json();
    const { data } = body;

    // Validate required fields
    if (!data || !data.fullName || !data.email) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Validate age requirement (25+)
    if (data.age && ['under-18', '18-24'].includes(data.age)) {
      return c.json({ 
        error: 'This program is for participants age 25 and older. Thank you for your interest.' 
      }, 400);
    }

    // Generate unique ID
    const applicationId = crypto.randomUUID();

    // Create Metgot beta application record
    const metgotApplication = {
      id: applicationId,
      type: 'metgot-global',
      ...data,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      adminNotes: '',
    };

    // Save to database with different prefix and verification
    await kv.set(`metgot_application:${applicationId}`, metgotApplication);
    
    // CRITICAL: Verify the data was actually saved
    const verification = await kv.get(`metgot_application:${applicationId}`);
    if (!verification) {
      console.error(`CRITICAL ERROR: Failed to verify storage of Metgot application ${applicationId}`);
      throw new Error('Failed to verify application was saved. Please try again.');
    }

    console.log(`✅ Metgot Global application VERIFIED and SAVED: ${data.email} (ID: ${applicationId})`);
    console.log(`✅ Storage verification passed for: ${applicationId}`);
    
    // BACKUP: Log complete application data for manual recovery if needed
    console.log('📋 BACKUP DATA LOG (METGOT):', JSON.stringify({
      id: applicationId,
      type: 'metgot-global',
      email: data.email,
      name: data.fullName,
      timestamp: new Date().toISOString(),
      allData: metgotApplication
    }));

    return c.json({
      success: true,
      applicationId,
      message: 'Metgot Global beta application submitted successfully',
      verified: true,
    });
  } catch (error: any) {
    console.error('Metgot beta application submission error:', error);
    return c.json({ error: error.message || 'Failed to submit Metgot beta application' }, 500);
  }
});

// Get All Beta Applications (including Metgot)
app.get("/make-server-9bd83859/admin/beta-applications", async (c) => {
  try {
    // For now, allow without auth for demo purposes
    // In production, uncomment the auth check:
    // const authCheck = await verifyInternalAdmin(c);
    // if (!authCheck.authorized) {
    //   return c.json({ error: authCheck.error }, 401);
    // }

    // Fetch both regular beta applications and Metgot applications
    const betaApplications = await kv.getByPrefix('beta_application:');
    const metgotApplications = await kv.getByPrefix('metgot_application:');
    
    // Combine all applications
    const allApplications = [...betaApplications, ...metgotApplications];
    
    // Sort by submission date (newest first)
    allApplications.sort((a: any, b: any) => {
      const dateA = new Date(a.submittedAt || 0).getTime();
      const dateB = new Date(b.submittedAt || 0).getTime();
      return dateB - dateA;
    });

    console.log(`Fetched ${betaApplications.length} beta apps + ${metgotApplications.length} Metgot apps = ${allApplications.length} total`);

    return c.json({
      success: true,
      applications: allApplications,
      count: allApplications.length,
    });
  } catch (error: any) {
    console.error('Admin get beta applications error:', error);
    return c.json({ error: 'Failed to fetch beta applications' }, 500);
  }
});

// Update Beta Application Status
app.put("/make-server-9bd83859/admin/beta-applications/:id/status", async (c) => {
  try {
    // For now, allow without auth for demo purposes
    // In production, uncomment the auth check:
    // const authCheck = await verifyInternalAdmin(c);
    // if (!authCheck.authorized) {
    //   return c.json({ error: authCheck.error }, 401);
    // }

    const { id } = c.req.param();
    const body = await c.req.json();
    const { status, notes } = body;

    // Validate status
    if (!['pending', 'approved', 'waitlist', 'rejected'].includes(status)) {
      return c.json({ error: 'Invalid status' }, 400);
    }

    // Get existing application - check both prefixes
    let application = await kv.get(`beta_application:${id}`);
    let keyPrefix = 'beta_application:';
    
    if (!application) {
      // Try Metgot prefix
      application = await kv.get(`metgot_application:${id}`);
      keyPrefix = 'metgot_application:';
    }
    
    if (!application) {
      return c.json({ error: 'Beta application not found' }, 404);
    }

    // Update application
    const updatedApplication = {
      ...application,
      status,
      adminNotes: notes || application.adminNotes,
      reviewedAt: new Date().toISOString(),
    };

    await kv.set(`${keyPrefix}${id}`, updatedApplication);

    return c.json({
      success: true,
      application: updatedApplication,
    });
  } catch (error: any) {
    console.error('Admin update beta application status error:', error);
    return c.json({ error: 'Failed to update beta application status' }, 500);
  }
});

// Get All Jobs (Admin View)
app.get("/make-server-9bd83859/admin/jobs", async (c) => {
  try {
    // For now, allow without auth for demo purposes
    // In production, uncomment the auth check:
    // const authCheck = await verifyInternalAdmin(c);
    // if (!authCheck.authorized) {
    //   return c.json({ error: authCheck.error }, 401);
    // }

    const jobs = await kv.getByPrefix('job:');
    
    // Sort by creation date (newest first)
    jobs.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    return c.json({
      success: true,
      jobs: jobs,
      count: jobs.length,
    });
  } catch (error: any) {
    console.error('Admin get jobs error:', error);
    return c.json({ error: 'Failed to fetch jobs' }, 500);
  }
});

// Get All Applications (Admin View)
app.get("/make-server-9bd83859/admin/applications", async (c) => {
  try {
    // For now, allow without auth for demo purposes
    // In production, uncomment the auth check:
    // const authCheck = await verifyInternalAdmin(c);
    // if (!authCheck.authorized) {
    //   return c.json({ error: authCheck.error }, 401);
    // }

    const applications = await kv.getByPrefix('application:');
    
    // Sort by submission date (newest first)
    applications.sort((a: any, b: any) => {
      const dateA = new Date(a.submittedAt || 0).getTime();
      const dateB = new Date(b.submittedAt || 0).getTime();
      return dateB - dateA;
    });

    return c.json({
      success: true,
      applications: applications,
      count: applications.length,
    });
  } catch (error: any) {
    console.error('Admin get applications error:', error);
    return c.json({ error: 'Failed to fetch applications' }, 500);
  }
});

// ==================== PLAID VERIFICATION ENDPOINTS ====================

// Create Plaid Link Token
app.post("/make-server-9bd83859/plaid/link-token", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized - Please sign in to access verification' }, 401);
    }

    // Get user info from KV store
    const userProfile = await kv.get(`student:${user.id}`);
    const userName = userProfile?.firstName || 'User';

    const linkTokenData = await plaidIntegration.createLinkToken(user.id, userName);

    return c.json({
      success: true,
      ...linkTokenData,
    });
  } catch (error: any) {
    console.error('Plaid create link token error:', error);
    return c.json({ error: 'Failed to create Plaid link token: ' + error.message }, 500);
  }
});

// Exchange Public Token and Store Verification Data
app.post("/make-server-9bd83859/plaid/exchange-token", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized - Please sign in to complete verification' }, 401);
    }

    const body = await c.req.json();
    const { public_token } = body;

    if (!public_token) {
      return c.json({ error: 'Public token is required' }, 400);
    }

    // Exchange public token for access token
    const plaidAccessToken = await plaidIntegration.exchangePublicToken(public_token);

    // Fetch all verification data
    const [identityData, authData] = await Promise.allSettled([
      plaidIntegration.getIdentityData(plaidAccessToken),
      plaidIntegration.getAuthData(plaidAccessToken),
    ]);

    // Store verification data
    const verificationPromises = [];

    if (identityData.status === 'fulfilled') {
      verificationPromises.push(
        plaidIntegration.storeVerificationData(user.id, 'identity', identityData.value)
      );
    }

    if (authData.status === 'fulfilled') {
      verificationPromises.push(
        plaidIntegration.storeVerificationData(user.id, 'bank', authData.value)
      );
    }

    // Try to get income data (may not be available for all accounts)
    try {
      const incomeData = await plaidIntegration.getIncomeData(plaidAccessToken);
      verificationPromises.push(
        plaidIntegration.storeVerificationData(user.id, 'income', incomeData)
      );
    } catch (error) {
      console.log('Income data not available (this is normal for many accounts)');
    }

    await Promise.all(verificationPromises);

    // Update user profile with verification status
    const userProfile = await kv.get(`student:${user.id}`);
    if (userProfile) {
      const verificationStatus = await plaidIntegration.checkVerificationStatus(user.id);
      await kv.set(`student:${user.id}`, {
        ...userProfile,
        verificationStatus,
        lastVerified: new Date().toISOString(),
      });
    }

    return c.json({
      success: true,
      message: 'Verification completed successfully',
      verifications: {
        identity: identityData.status === 'fulfilled',
        bank: authData.status === 'fulfilled',
      },
    });
  } catch (error: any) {
    console.error('Plaid exchange token error:', error);
    return c.json({ error: 'Failed to complete verification: ' + error.message }, 500);
  }
});

// Get User Verification Status
app.get("/make-server-9bd83859/plaid/verification-status", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const status = await plaidIntegration.checkVerificationStatus(user.id);

    return c.json({
      success: true,
      ...status,
    });
  } catch (error: any) {
    console.error('Get verification status error:', error);
    // Return default unverified status instead of error for better UX
    return c.json({
      success: true,
      identity: false,
      bank: false,
      income: false,
      completedCount: 0,
    });
  }
});

// Get User Verification Details (Admin or Self)
app.get("/make-server-9bd83859/plaid/verification-details", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getServiceClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const verifications = await plaidIntegration.getVerificationData(user.id);

    return c.json({
      success: true,
      verifications: verifications || [],
    });
  } catch (error: any) {
    console.error('Get verification details error:', error);
    return c.json({ error: 'Failed to fetch verification details' }, 500);
  }
});

// Admin: Get All Verified Users
app.get("/make-server-9bd83859/admin/plaid/verified-users", async (c) => {
  try {
    // For now, allow without auth for demo purposes
    // In production, uncomment the auth check:
    // const authCheck = await verifyInternalAdmin(c);
    // if (!authCheck.authorized) {
    //   return c.json({ error: authCheck.error }, 401);
    // }

    const verifiedUsers = await plaidIntegration.getAllVerifiedUsers();

    // Enrich with user profile data
    const enrichedUsers = await Promise.all(
      verifiedUsers.map(async (verifiedUser) => {
        const profile = await kv.get(`student:${verifiedUser.userId}`);
        return {
          ...verifiedUser,
          profile: profile || null,
        };
      })
    );

    return c.json({
      success: true,
      users: enrichedUsers,
      count: enrichedUsers.length,
    });
  } catch (error: any) {
    console.error('Admin get verified users error:', error);
    return c.json({ error: 'Failed to fetch verified users' }, 500);
  }
});

// Plaid Webhook Handler
app.post("/make-server-9bd83859/plaid/webhook", async (c) => {
  try {
    const body = await c.req.json();
    console.log('Plaid webhook received:', body);

    // Handle different webhook types
    const { webhook_type, webhook_code, item_id } = body;

    // Log webhook for debugging
    const webhookLog = {
      id: crypto.randomUUID(),
      type: webhook_type,
      code: webhook_code,
      itemId: item_id,
      data: body,
      receivedAt: new Date().toISOString(),
    };

    await kv.set(`plaid_webhook:${webhookLog.id}`, JSON.stringify(webhookLog));

    return c.json({ success: true, message: 'Webhook received' });
  } catch (error: any) {
    console.error('Plaid webhook error:', error);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

// ==================== HEYGEN AI VIDEO AVATARS API ENDPOINTS ====================

// Create a new HeyGen video
app.post("/make-server-9bd83859/heygen/videos/create", heygenRoutes.createVideo);

// Get video status
app.get("/make-server-9bd83859/heygen/videos/:videoId/status", heygenRoutes.getVideoStatus);

// Create talking photo
app.post("/make-server-9bd83859/heygen/talking-photo/create", heygenRoutes.createTalkingPhoto);

// Create streaming avatar session
app.post("/make-server-9bd83859/heygen/streaming/create", heygenRoutes.createStreamingSession);

// Send message to streaming avatar
app.post("/make-server-9bd83859/heygen/streaming/:sessionId/message", heygenRoutes.sendStreamingMessage);

// Stop streaming avatar session
app.post("/make-server-9bd83859/heygen/streaming/:sessionId/stop", heygenRoutes.stopStreamingSession);

// List available avatars
app.get("/make-server-9bd83859/heygen/avatars", heygenRoutes.listAvatars);

// List available voices
app.get("/make-server-9bd83859/heygen/voices", heygenRoutes.listVoices);

// Get recommended avatars and voices
app.get("/make-server-9bd83859/heygen/recommended", heygenRoutes.getRecommended);

// HeyGen webhook handler
app.post("/make-server-9bd83859/heygen/webhook", heygenRoutes.handleWebhook);

// HeyGen configuration endpoints
app.post("/make-server-9bd83859/heygen/config/set-api-key", heygenConfig.setApiKey);
app.get("/make-server-9bd83859/heygen/config/status", heygenConfig.getConfigStatus);

// ==================== D-ID AGENTS API ENDPOINTS (LEGACY - DEPRECATED) ====================

// Create a new D-ID agent
app.post("/make-server-9bd83859/did/agents/create", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { agentType, config } = body;

    let agent;
    
    // Create different types of agents based on use case
    switch (agentType) {
      case 'zee':
        agent = await didIntegration.createZeeAgent(config);
        break;
      case 'recruiter':
        const { companyName } = body;
        if (!companyName) {
          return c.json({ error: 'Company name required for recruiter agent' }, 400);
        }
        agent = await didIntegration.createRecruiterAgent(companyName, config);
        break;
      case 'career-fair':
        const { boothInfo } = body;
        if (!boothInfo) {
          return c.json({ error: 'Booth info required for career fair agent' }, 400);
        }
        agent = await didIntegration.createCareerFairAgent(boothInfo, config);
        break;
      default:
        agent = await didIntegration.createAgent(config);
    }

    // Store agent info in KV store for tracking
    await kv.set(`did_agent:${agent.id}`, {
      id: agent.id,
      type: agentType || 'custom',
      createdAt: new Date().toISOString(),
      config: body,
    });

    return c.json({ success: true, agent });
  } catch (error: any) {
    // Provide user-friendly error messages
    if (error.message?.includes('Unauthorized') || error.message?.includes('invalid') || error.message?.includes('expired')) {
      console.warn('⚠️ D-ID API key issue. Please verify your DID_API_KEY environment variable is valid.');
      return c.json({ 
        error: 'D-ID service unavailable. Please contact support or use alternative features.', 
        details: 'The D-ID API key may be invalid or expired.' 
      }, 503);
    }
    
    console.error('❌ D-ID agent creation error:', error.message);
    return c.json({ 
      error: 'Failed to create D-ID agent. Please try again later.', 
      details: error.message 
    }, 500);
  }
});

// Get agent details
app.get("/make-server-9bd83859/did/agents/:agentId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const agentId = c.req.param('agentId');
    const agent = await didIntegration.getAgent(agentId);

    return c.json({ success: true, agent });
  } catch (error: any) {
    console.error('D-ID agent fetch error:', error);
    return c.json({ error: error.message || 'Failed to fetch D-ID agent' }, 500);
  }
});

// Delete agent
app.delete("/make-server-9bd83859/did/agents/:agentId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const agentId = c.req.param('agentId');
    await didIntegration.deleteAgent(agentId);

    // Remove from KV store
    await kv.del(`did_agent:${agentId}`);

    return c.json({ success: true, message: 'Agent deleted successfully' });
  } catch (error: any) {
    console.error('D-ID agent deletion error:', error);
    return c.json({ error: error.message || 'Failed to delete D-ID agent' }, 500);
  }
});

// Start agent chat session
app.post("/make-server-9bd83859/did/agents/:agentId/chat/start", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const agentId = c.req.param('agentId');
    const sessionId = crypto.randomUUID();

    const chatSession = await didIntegration.startAgentChat(agentId, sessionId);

    // Store session info
    await kv.set(`did_session:${sessionId}`, {
      sessionId,
      agentId,
      startedAt: new Date().toISOString(),
      active: true,
    });

    return c.json({ success: true, sessionId, chatSession });
  } catch (error: any) {
    console.error('D-ID chat start error:', error);
    return c.json({ error: error.message || 'Failed to start chat session' }, 500);
  }
});

// Send message to agent
app.post("/make-server-9bd83859/did/agents/:agentId/chat/:sessionId/message", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const agentId = c.req.param('agentId');
    const sessionId = c.req.param('sessionId');
    const { message } = await c.req.json();

    if (!message) {
      return c.json({ error: 'Message is required' }, 400);
    }

    const response = await didIntegration.sendAgentMessage(agentId, sessionId, message);

    return c.json({ success: true, response });
  } catch (error: any) {
    console.error('D-ID message send error:', error);
    return c.json({ error: error.message || 'Failed to send message' }, 500);
  }
});

// List all agents
app.get("/make-server-9bd83859/did/agents", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const limit = parseInt(c.req.query('limit') || '20');
    const offset = parseInt(c.req.query('offset') || '0');

    const agents = await didIntegration.listAgents(limit, offset);

    return c.json({ success: true, agents });
  } catch (error: any) {
    console.error('D-ID agents list error:', error);
    return c.json({ error: error.message || 'Failed to list agents' }, 500);
  }
});

// ==================== TUTORIAL VIDEO MANAGEMENT ====================

// Get D-ID client key for frontend integration
app.post("/make-server-9bd83859/did/client-key", async (c) => {
  try {
    const body = await c.req.json();
    const { allowedDomains } = body;

    if (!allowedDomains || !Array.isArray(allowedDomains) || allowedDomains.length === 0) {
      return c.json({ error: 'Missing or invalid allowedDomains array' }, 400);
    }

    // Create client key with whitelisted domains
    const result = await didIntegration.createClientKey(allowedDomains);

    return c.json({
      success: true,
      clientKey: result.clientKey,
      allowedDomains,
    });
  } catch (error: any) {
    console.error('D-ID client key creation error:', error);
    return c.json({ error: error.message || 'Failed to create D-ID client key' }, 500);
  }
});

// Create tutorial video agent
app.post("/make-server-9bd83859/did/tutorials/create", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { tutorialId, title, category, script, keyTakeaways, difficulty } = body;

    if (!tutorialId || !title || !category || !script || !keyTakeaways || !difficulty) {
      return c.json({ error: 'Missing required tutorial information' }, 400);
    }

    // Create the D-ID agent
    const agent = await didIntegration.createTutorialAgent({
      title,
      category,
      script,
      keyTakeaways,
      difficulty,
    });

    // Store the mapping in KV store
    await kvStore.set(`tutorial_agent_${tutorialId}`, {
      tutorialId,
      agentId: agent.id,
      title,
      category,
      difficulty,
      createdAt: new Date().toISOString(),
      status: agent.status,
    });

    console.log(`Tutorial video agent created for tutorial ${tutorialId}: ${agent.id}`);

    return c.json({
      success: true,
      tutorialId,
      agent: {
        id: agent.id,
        status: agent.status,
        createdAt: agent.created_at,
      },
    });
  } catch (error: any) {
    console.error('Tutorial agent creation error:', error);
    return c.json({ error: error.message || 'Failed to create tutorial agent' }, 500);
  }
});

// Get tutorial video agent by tutorial ID
app.get("/make-server-9bd83859/did/tutorials/:tutorialId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const tutorialId = c.req.param('tutorialId');
    const tutorialData = await kvStore.get(`tutorial_agent_${tutorialId}`);

    if (!tutorialData) {
      return c.json({ error: 'Tutorial video not found' }, 404);
    }

    // Get latest agent status from D-ID
    const agent = await didIntegration.getAgent(tutorialData.agentId);

    return c.json({
      success: true,
      tutorial: {
        ...tutorialData,
        agentStatus: agent.status,
        streamUrl: agent.stream_url,
      },
    });
  } catch (error: any) {
    console.error('Tutorial agent fetch error:', error);
    return c.json({ error: error.message || 'Failed to fetch tutorial agent' }, 500);
  }
});

// List all tutorial videos
app.get("/make-server-9bd83859/did/tutorials", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get all tutorial agents from KV store
    const tutorials = await kvStore.getByPrefix('tutorial_agent_');

    return c.json({
      success: true,
      tutorials: tutorials || [],
    });
  } catch (error: any) {
    console.error('Tutorial list error:', error);
    return c.json({ error: error.message || 'Failed to list tutorials' }, 500);
  }
});

// Delete tutorial video agent
app.delete("/make-server-9bd83859/did/tutorials/:tutorialId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const tutorialId = c.req.param('tutorialId');
    const tutorialData = await kvStore.get(`tutorial_agent_${tutorialId}`);

    if (!tutorialData) {
      return c.json({ error: 'Tutorial video not found' }, 404);
    }

    // Delete the D-ID agent
    await didIntegration.deleteAgent(tutorialData.agentId);

    // Remove from KV store
    await kvStore.del(`tutorial_agent_${tutorialId}`);

    console.log(`Tutorial video agent deleted for tutorial ${tutorialId}`);

    return c.json({ success: true, message: 'Tutorial video deleted successfully' });
  } catch (error: any) {
    console.error('Tutorial deletion error:', error);
    return c.json({ error: error.message || 'Failed to delete tutorial video' }, 500);
  }
});

// ==================== D-ID KNOWLEDGE BASE MANAGEMENT ====================

// Create knowledge base
app.post("/make-server-9bd83859/did/knowledge", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) return c.json({ error: 'Unauthorized' }, 401);

    const body = await c.req.json();
    const { name, description } = body;

    if (!name || !description) {
      return c.json({ error: 'Missing name or description' }, 400);
    }

    const knowledgeBase = await didIntegration.createKnowledgeBase(name, description);
    await kvStore.set(`knowledge_base_${knowledgeBase.id}`, {
      id: knowledgeBase.id,
      name,
      description,
      createdAt: new Date().toISOString(),
    });

    console.log(`Knowledge base created: ${knowledgeBase.id}`);
    return c.json({ success: true, knowledgeBase });
  } catch (error: any) {
    console.error('Knowledge base creation error:', error);
    return c.json({ error: error.message || 'Failed to create knowledge base' }, 500);
  }
});

// List knowledge bases
app.get("/make-server-9bd83859/did/knowledge", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) return c.json({ error: 'Unauthorized' }, 401);

    const knowledgeBases = await didIntegration.listKnowledgeBases();
    return c.json({ success: true, knowledgeBases });
  } catch (error: any) {
    console.error('Knowledge base list error:', error);
    return c.json({ error: error.message || 'Failed to list knowledge bases' }, 500);
  }
});

// Upload document to knowledge base
app.post("/make-server-9bd83859/did/knowledge/:knowledgeId/documents", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) return c.json({ error: 'Unauthorized' }, 401);

    const knowledgeId = c.req.param('knowledgeId');
    const body = await c.req.json();
    const { title, content, documentType } = body;

    if (!title || !content) {
      return c.json({ error: 'Missing title or content' }, 400);
    }

    const document = await didIntegration.uploadDocumentToKnowledge(
      knowledgeId,
      title,
      content,
      documentType || 'txt'
    );

    console.log(`Document uploaded to KB ${knowledgeId}: ${document.id}`);
    return c.json({ success: true, document });
  } catch (error: any) {
    console.error('Document upload error:', error);
    return c.json({ error: error.message || 'Failed to upload document' }, 500);
  }
});

// Attach knowledge to agent
app.post("/make-server-9bd83859/did/agents/:agentId/knowledge", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) return c.json({ error: 'Unauthorized' }, 401);

    const agentId = c.req.param('agentId');
    const body = await c.req.json();
    const { knowledgeId, ragTemplate } = body;

    if (!knowledgeId) {
      return c.json({ error: 'Missing knowledgeId' }, 400);
    }

    const updatedAgent = await didIntegration.attachKnowledgeToAgent(
      agentId,
      knowledgeId,
      ragTemplate || 'rag-ungrounded'
    );

    console.log(`Knowledge ${knowledgeId} attached to agent ${agentId}`);
    return c.json({ success: true, agent: updatedAgent });
  } catch (error: any) {
    console.error('Knowledge attachment error:', error);
    return c.json({ error: error.message || 'Failed to attach knowledge' }, 500);
  }
});

// ==================== D-ID CHAT EXPORT & ANALYTICS ====================

// Export chats
app.post("/make-server-9bd83859/did/chats/export", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) return c.json({ error: 'Unauthorized' }, 401);

    const body = await c.req.json();
    const { agentId, from, to } = body;

    const exportData = await didIntegration.exportChats(agentId, from, to);
    await kvStore.set(`chat_export_${exportData.export_id}`, {
      exportId: exportData.export_id,
      agentId,
      from,
      to,
      requestedAt: new Date().toISOString(),
      status: 'pending',
    });

    console.log(`Chat export initiated: ${exportData.export_id}`);
    return c.json({ success: true, export: exportData });
  } catch (error: any) {
    console.error('Chat export error:', error);
    return c.json({ error: error.message || 'Failed to export chats' }, 500);
  }
});

// Get export status
app.get("/make-server-9bd83859/did/chats/export/:exportId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) return c.json({ error: 'Unauthorized' }, 401);

    const exportId = c.req.param('exportId');
    const exportStatus = await didIntegration.getChatExportStatus(exportId);

    return c.json({ success: true, export: exportStatus });
  } catch (error: any) {
    console.error('Export status error:', error);
    return c.json({ error: error.message || 'Failed to get status' }, 500);
  }
});

// ==================== ADMIN DATA ACCESS ENDPOINTS ====================

// Admin endpoint to view all collected data
app.get("/make-server-9bd83859/admin/view-all-data", async (c) => {
  try {
    // Get raw table data
    const supabase = getServiceClient();
    const { data: rawData, error } = await supabase
      .from('kv_store_9bd83859')
      .select('key, value')
      .order('key', { ascending: true });

    if (error) {
      console.error('Error fetching raw data:', error);
      throw error;
    }

    // Filter and categorize data
    const students: any[] = [];
    const employers: any[] = [];
    const applications: any[] = [];
    const betaApplications: any[] = [];
    const jobs: any[] = [];

    rawData?.forEach((item: any) => {
      const parts = item.key.split(':');
      
      // Only get main profile records, not nested data
      if (parts[0] === 'student' && parts.length === 2) {
        students.push(item.value);
      } else if (parts[0] === 'employer' && parts.length === 2) {
        employers.push(item.value);
      } else if (parts[0] === 'application') {
        applications.push(item.value);
      } else if (parts[0] === 'beta_application') {
        betaApplications.push(item.value);
      } else if (parts[0] === 'job') {
        jobs.push(item.value);
      }
    });

    return c.json({
      success: true,
      summary: {
        total_students: students.length,
        total_employers: employers.length,
        total_applications: applications.length,
        total_beta_applications: betaApplications.length,
        total_jobs: jobs.length,
        total_records: rawData?.length || 0,
      },
      data: {
        students: students,
        employers: employers,
        applications: applications,
        beta_applications: betaApplications,
        jobs: jobs,
      },
      raw_keys: rawData?.map(d => d.key) || [],
      raw_data: rawData || [],
    });
  } catch (error: any) {
    console.error('Admin view all data error:', error);
    return c.json({ error: error.message || 'Failed to retrieve data' }, 500);
  }
});

// Admin endpoint to get data by type
app.get("/make-server-9bd83859/admin/data/:type", async (c) => {
  try {
    const type = c.req.param('type');
    const prefix = `${type}:`;
    
    const supabase = getServiceClient();
    const { data: rawData, error } = await supabase
      .from('kv_store_9bd83859')
      .select('key, value')
      .like('key', `${prefix}%`);

    if (error) throw error;

    // Filter to only main records if it's student or employer
    let filteredData = rawData || [];
    if (type === 'student' || type === 'employer') {
      filteredData = rawData?.filter((item: any) => {
        const parts = item.key.split(':');
        return parts.length === 2; // Only main profiles
      }) || [];
    }

    const data = filteredData.map((item: any) => item.value);
    
    return c.json({
      success: true,
      type,
      count: data.length,
      data: data,
    });
  } catch (error: any) {
    console.error(`Admin get ${c.req.param('type')} data error:`, error);
    return c.json({ error: error.message || 'Failed to retrieve data' }, 500);
  }
});

// Admin endpoint to search all keys
app.get("/make-server-9bd83859/admin/search-keys", async (c) => {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('kv_store_9bd83859')
      .select('key')
      .order('key', { ascending: true });

    if (error) throw error;

    // Group by type
    const grouped: Record<string, number> = {};
    data?.forEach((item: { key: string }) => {
      const type = item.key.split(':')[0];
      grouped[type] = (grouped[type] || 0) + 1;
    });

    return c.json({
      success: true,
      total_keys: data?.length || 0,
      keys: data?.map((d: { key: string }) => d.key) || [],
      grouped_by_type: grouped,
    });
  } catch (error: any) {
    console.error('Admin search keys error:', error);
    return c.json({ error: error.message || 'Failed to search keys' }, 500);
  }
});

Deno.serve(app.fetch);