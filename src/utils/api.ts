import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859`;

// Helper to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('zalpha_access_token');
};

// Helper to make authenticated requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token || publicAnonKey}`,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({ error: 'Invalid response from server' }));

    if (!response.ok) {
      // Provide user-friendly error messages based on status code
      if (response.status === 400) {
        throw new Error(data.error || 'Invalid request. Please check your information and try again.');
      } else if (response.status === 401) {
        throw new Error(data.error || 'Your session has expired. Please sign in again.');
      } else if (response.status === 403) {
        throw new Error(data.error || 'You do not have permission to perform this action.');
      } else if (response.status === 404) {
        throw new Error(data.error || 'The requested resource was not found.');
      } else if (response.status === 429) {
        throw new Error(data.error || 'Too many requests. Please wait a moment and try again.');
      } else if (response.status >= 500) {
        throw new Error('Server error. Our team has been notified. Please try again later.');
      } else {
        throw new Error(data.error || `Request failed: ${response.statusText}`);
      }
    }

    return data;
  } catch (error: any) {
    // Log detailed error for debugging
    console.error('API Request Error:', {
      endpoint,
      url: `${API_BASE_URL}${endpoint}`,
      error: error.message,
      type: error.name,
      stack: error.stack
    });
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to ZALPHA servers. The server may still be starting up. Please wait a moment and try refreshing.');
    }
    // Re-throw other errors
    throw error;
  }
}

// ==================== AUTHENTICATION ====================

export async function studentSignup(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  school: string;
  graduationYear: string;
  location: string;
  dateOfBirth?: string;
  age?: number;
  governmentIdUrl?: string;
  studentIdUrl?: string;
  idNumber?: string;
  studentIdNumber?: string;
  recaptchaToken?: string;
  behavioralScore?: number;
}) {
  return apiRequest('/auth/student/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function employerSignup(data: {
  email: string;
  password: string;
  companyName: string;
  industry: string;
  location: string;
  plan: string;
  recaptchaToken?: string;
  behavioralScore?: number;
}) {
  return apiRequest('/auth/employer/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function signIn(email: string, password: string) {
  const result = await apiRequest('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  // Store access token
  if (result.accessToken) {
    localStorage.setItem('zalpha_access_token', result.accessToken);
    localStorage.setItem('zalpha_user', JSON.stringify(result.user));
  }
  
  return result;
}

export async function getSession() {
  try {
    const result = await apiRequest('/auth/session');
    if (result.user) {
      localStorage.setItem('zalpha_user', JSON.stringify(result.user));
    }
    return result;
  } catch (error) {
    // Clear invalid session
    localStorage.removeItem('zalpha_access_token');
    localStorage.removeItem('zalpha_user');
    throw error;
  }
}

export function signOut() {
  localStorage.removeItem('zalpha_access_token');
  localStorage.removeItem('zalpha_user');
}

export function getCurrentUser() {
  const userJson = localStorage.getItem('zalpha_user');
  return userJson ? JSON.parse(userJson) : null;
}

// ==================== JOBS ====================

export async function createJob(jobData: {
  title: string;
  company: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  salaryMin?: number;
  salaryMax?: number;
}) {
  return apiRequest('/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData),
  });
}

export async function getAllJobs() {
  return apiRequest('/jobs');
}

export async function getEmployerJobs() {
  return apiRequest('/employer/jobs');
}

// ==================== APPLICATIONS ====================

export async function submitApplication(jobId: string, coverLetter: string) {
  return apiRequest('/applications', {
    method: 'POST',
    body: JSON.stringify({ jobId, coverLetter }),
  });
}

export async function getStudentApplications() {
  return apiRequest('/student/applications');
}

// ==================== PROFILES ====================

export async function updateStudentProfile(profileData: any) {
  return apiRequest('/student/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
}

export async function updateEmployerProfile(profileData: any) {
  return apiRequest('/employer/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
}

// ==================== INTEGRATIONS ====================

export async function syncStudentToManatal(studentId: string) {
  return apiRequest('/integrations/manatal/sync-student', {
    method: 'POST',
    body: JSON.stringify({ studentId }),
  });
}

export async function syncJobToManatal(jobId: string) {
  return apiRequest('/integrations/manatal/sync-job', {
    method: 'POST',
    body: JSON.stringify({ jobId }),
  });
}

export async function syncStudentToWix(studentId: string) {
  return apiRequest('/integrations/wix/sync-student', {
    method: 'POST',
    body: JSON.stringify({ studentId }),
  });
}

export async function syncEmployerToWix() {
  return apiRequest('/integrations/wix/sync-employer', {
    method: 'POST',
  });
}

// ==================== ADMIN ENDPOINTS ====================

export async function getAdminStats() {
  return apiRequest('/admin/stats');
}

export async function getAllStudents() {
  return apiRequest('/admin/students');
}

export async function getAllEmployersAdmin() {
  return apiRequest('/admin/employers');
}

export async function getAllBetaApplications() {
  return apiRequest('/admin/beta-applications');
}

export async function submitBetaApplication(type: string, data: any) {
  return apiRequest('/beta/submit', {
    method: 'POST',
    body: JSON.stringify({ type, data }),
  });
}

export async function submitMetgotBetaApplication(data: any) {
  return apiRequest('/beta/metgot-submit', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}

export async function updateBetaApplicationStatus(id: string, status: string, notes?: string) {
  return apiRequest(`/admin/beta-applications/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, notes }),
  });
}

export async function getAllJobsAdmin() {
  return apiRequest('/admin/jobs');
}

export async function getAllApplicationsAdmin() {
  return apiRequest('/admin/applications');
}