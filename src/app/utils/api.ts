import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859`;

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('zalpha_access_token');
};

// Helper function to retry failed requests (for mobile network issues)
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries === 0 || error.message.includes('timed out')) {
      throw error;
    }
    
    // Retry for network issues
    if (!navigator.onLine || error.message.includes('Failed to fetch')) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
    
    throw error;
  }
}

// Helper function to make API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  return retryWithBackoff(async () => {
    const token = getAuthToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || publicAnonKey}`,
      ...options.headers,
    };

    // Add timeout for mobile networks (30 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please check your internet connection and try again.');
      }
      
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }
      
      throw error;
    }
  });
}

// Authentication APIs
export const auth = {
  async studentSignup(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    school: string;
    graduationYear: string;
    location: string;
    recaptchaToken: string;
    behavioralScore: number;
  }) {
    const result = await apiRequest<{ success: boolean; userId: string; message: string }>('/auth/student/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return result;
  },

  async employerSignup(data: {
    email: string;
    password: string;
    companyName: string;
    industry: string;
    location: string;
    plan: string;
    recaptchaToken: string;
    behavioralScore: number;
  }) {
    const result = await apiRequest<{ success: boolean; userId: string; message: string }>('/auth/employer/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return result;
  },

  async signIn(email: string, password: string) {
    const result = await apiRequest<{ 
      success: boolean; 
      accessToken: string; 
      user: {
        id: string;
        email: string;
        userType: string;
        profile: any;
      }
    }>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (result.success && result.accessToken) {
      localStorage.setItem('zalpha_access_token', result.accessToken);
      localStorage.setItem('zalpha_user', JSON.stringify(result.user));
    }
    
    return result;
  },

  async getSession() {
    try {
      const result = await apiRequest<{ 
        success: boolean;
        user: {
          id: string;
          email: string;
          userType: string;
          profile: any;
        }
      }>('/auth/session');
      return result;
    } catch (error) {
      // Clear invalid session
      localStorage.removeItem('zalpha_access_token');
      localStorage.removeItem('zalpha_user');
      throw error;
    }
  },

  signOut() {
    localStorage.removeItem('zalpha_access_token');
    localStorage.removeItem('zalpha_user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('zalpha_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!getAuthToken();
  },
};

// Jobs APIs
export const jobs = {
  async create(jobData: any) {
    return apiRequest('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  async getAll() {
    return apiRequest<{ success: boolean; jobs: any[] }>('/jobs');
  },

  async getEmployerJobs() {
    return apiRequest<{ success: boolean; jobs: any[] }>('/employer/jobs');
  },
};

// Applications APIs
export const applications = {
  async submit(jobId: string, coverLetter: string) {
    return apiRequest('/applications', {
      method: 'POST',
      body: JSON.stringify({ jobId, coverLetter }),
    });
  },

  async getStudentApplications() {
    return apiRequest<{ success: boolean; applications: any[] }>('/student/applications');
  },
};

// Profile APIs
export const profiles = {
  async updateStudent(data: any) {
    return apiRequest('/student/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async updateEmployer(data: any) {
    return apiRequest('/employer/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async getStudents() {
    return apiRequest<{ success: boolean; students: any[] }>('/students');
  },
};

// File Upload APIs
export const uploads = {
  async uploadFile(endpoint: string, file: File, additionalData?: Record<string, string>) {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token || publicAnonKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error || `Upload error! status: ${response.status}`);
    }

    return response.json();
  },

  async uploadIDVerification(file: File) {
    return this.uploadFile('/upload/id-verification', file);
  },

  async uploadResume(file: File) {
    return this.uploadFile('/upload/resume', file);
  },

  async uploadTranscript(file: File, visibility: 'public' | 'private' = 'private') {
    return this.uploadFile('/upload/transcript', file, { visibility });
  },

  async uploadVideoIntro(file: File) {
    return this.uploadFile('/upload/video-intro', file);
  },

  async uploadProfilePhoto(file: File) {
    return this.uploadFile('/upload/profile-photo', file);
  },

  async uploadDocument(file: File, type: string = 'general') {
    return this.uploadFile('/upload/document', file, { type });
  },
};

// FERPA APIs
export const ferpa = {
  async saveConsent(consentData: any) {
    return apiRequest('/ferpa/consent', {
      method: 'POST',
      body: JSON.stringify(consentData),
    });
  },

  async getConsent() {
    return apiRequest<{ success: boolean; consent: any }>('/ferpa/consent');
  },

  async getAccessLogs(limit: number = 100) {
    return apiRequest<{ success: boolean; logs: any[] }>(`/ferpa/access-logs?limit=${limit}`);
  },

  async exportData() {
    return apiRequest('/ferpa/export', { method: 'POST' });
  },

  async requestDeletion(deletionData: any) {
    return apiRequest('/ferpa/delete-account', {
      method: 'POST',
      body: JSON.stringify({ deletionData }),
    });
  },

  async updatePrivacySettings(settings: any) {
    return apiRequest('/ferpa/privacy-settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },

  async getPrivacySettings() {
    return apiRequest<{ success: boolean; privacySettings: any }>('/ferpa/privacy-settings');
  },
};

// ATS Integration APIs
export const atsIntegration = {
  async testConnection() {
    return apiRequest('/integrations/manatal/test');
  },

  async getJobs(status?: string, limit: number = 50) {
    const query = new URLSearchParams();
    if (status) query.append('status', status);
    query.append('limit', limit.toString());
    return apiRequest(`/integrations/manatal/jobs?${query}`);
  },

  async syncJobs() {
    return apiRequest('/integrations/manatal/sync-jobs', { method: 'POST' });
  },
};

// Wix Integration APIs
export const wixIntegration = {
  async testConnection() {
    return apiRequest('/integrations/wix/test');
  },

  async getContacts(limit: number = 50, offset: number = 0) {
    return apiRequest(`/integrations/wix/contacts?limit=${limit}&offset=${offset}`);
  },

  async syncSubmissions() {
    return apiRequest('/integrations/wix/sync-submissions', { method: 'POST' });
  },
};

export default {
  auth,
  jobs,
  applications,
  profiles,
  uploads,
  ferpa,
  atsIntegration,
  wixIntegration,
};