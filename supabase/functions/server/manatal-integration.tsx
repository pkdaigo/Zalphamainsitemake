// ZALPHA ATS Server Integration
// Internal Applicant Tracking System - Keeps API data secure on server-side

const ZALPHA_ATS_API_KEY = '0c1afe45a6b4f911a2a26935391fabdd9f8681fe';
const ZALPHA_ATS_BASE_URL = 'https://api.manatal.com/open/v3';

interface ZalphaJob {
  id: string;
  position_name: string;
  description: string;
  location: string;
  employment_type: string;
  salary_min?: number;
  salary_max?: number;
  status: 'open' | 'closed' | 'draft';
  created_at: string;
  updated_at: string;
  department?: string;
  requirements?: string[];
  benefits?: string[];
}

interface ZalphaCandidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  resume_url?: string;
  linkedin_url?: string;
  location?: string;
  tags?: string[];
  stage?: string;
  rating?: number;
  created_at: string;
  updated_at: string;
}

async function manatalRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${ZALPHA_ATS_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${ZALPHA_ATS_API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`Manatal API Error (${response.status}): ${error.message || response.statusText}`);
  }

  return response.json();
}

// ========== EXPORTED FUNCTIONS ==========

export async function testConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    await manatalRequest('/jobs?limit=1');
    return { connected: true, message: 'Successfully connected to ZALPHA ATS' };
  } catch (error) {
    return { 
      connected: false, 
      message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

export async function getJobs(filters?: {
  status?: 'open' | 'closed' | 'draft';
  limit?: number;
  offset?: number;
}): Promise<{ results: ZalphaJob[]; count: number }> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.limit) params.append('limit', filters.limit.toString());
  if (filters?.offset) params.append('offset', filters.offset.toString());

  return manatalRequest(`/jobs?${params.toString()}`);
}

export async function getJob(jobId: string): Promise<ZalphaJob> {
  return manatalRequest(`/jobs/${jobId}`);
}

export async function createJob(jobData: Partial<ZalphaJob>): Promise<ZalphaJob> {
  return manatalRequest('/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData),
  });
}

export async function updateJob(jobId: string, jobData: Partial<ZalphaJob>): Promise<ZalphaJob> {
  return manatalRequest(`/jobs/${jobId}`, {
    method: 'PATCH',
    body: JSON.stringify(jobData),
  });
}

export async function deleteJob(jobId: string): Promise<void> {
  await manatalRequest(`/jobs/${jobId}`, {
    method: 'DELETE',
  });
}

export async function getCandidates(filters?: {
  search?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}): Promise<{ results: ZalphaCandidate[]; count: number }> {
  const params = new URLSearchParams();
  if (filters?.search) params.append('search', filters.search);
  if (filters?.tags) params.append('tags', filters.tags.join(','));
  if (filters?.limit) params.append('limit', filters.limit.toString());
  if (filters?.offset) params.append('offset', filters.offset.toString());

  return manatalRequest(`/candidates?${params.toString()}`);
}

export async function getCandidate(candidateId: string): Promise<ZalphaCandidate> {
  return manatalRequest(`/candidates/${candidateId}`);
}

export async function createCandidate(candidateData: {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  resume_url?: string;
  location?: string;
  tags?: string[];
}): Promise<ZalphaCandidate> {
  return manatalRequest('/candidates', {
    method: 'POST',
    body: JSON.stringify(candidateData),
  });
}

export async function updateCandidate(candidateId: string, candidateData: Partial<ZalphaCandidate>): Promise<ZalphaCandidate> {
  return manatalRequest(`/candidates/${candidateId}`, {
    method: 'PATCH',
    body: JSON.stringify(candidateData),
  });
}

export async function createApplication(applicationData: {
  candidate_id: string;
  job_id: string;
  stage?: string;
  notes?: string;
}): Promise<any> {
  return manatalRequest('/applications', {
    method: 'POST',
    body: JSON.stringify(applicationData),
  });
}

export async function syncJobsToZALPHA(kvStore: any): Promise<{
  synced: number;
  failed: number;
  jobs: ZalphaJob[];
}> {
  try {
    const { results: jobs } = await getJobs({ status: 'open', limit: 100 });
    
    // Store jobs in KV store
    for (const job of jobs) {
      await kvStore.set(`zalpha:job:${job.id}`, {
        id: job.id,
        title: job.position_name,
        description: job.description,
        location: job.location,
        type: job.employment_type,
        salary: job.salary_min && job.salary_max 
          ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
          : undefined,
        department: job.department,
        requirements: job.requirements,
        benefits: job.benefits,
        status: job.status,
        postedDate: job.created_at,
        source: 'zalpha_ats',
        lastSynced: new Date().toISOString(),
      });
    }

    // Store sync metadata
    await kvStore.set('zalpha:last_sync', {
      timestamp: new Date().toISOString(),
      jobCount: jobs.length,
      status: 'success',
    });

    return {
      synced: jobs.length,
      failed: 0,
      jobs,
    };
  } catch (error) {
    console.error('ZALPHA ATS job sync error:', error);
    throw error;
  }
}

export async function submitApplicationToZALPHA(
  candidateInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    resumeUrl?: string;
    location?: string;
    skills?: string[];
  },
  jobId: string,
  notes?: string
): Promise<{ candidate: ZalphaCandidate; application: any }> {
  try {
    // Create or find candidate
    const candidate = await createCandidate({
      first_name: candidateInfo.firstName,
      last_name: candidateInfo.lastName,
      email: candidateInfo.email,
      phone: candidateInfo.phone,
      resume_url: candidateInfo.resumeUrl,
      location: candidateInfo.location,
      tags: candidateInfo.skills || [],
    });

    // Create application
    const application = await createApplication({
      candidate_id: candidate.id,
      job_id: jobId,
      stage: 'Applied',
      notes: notes || `Application submitted via ZALPHA platform on ${new Date().toISOString()}`,
    });

    return { candidate, application };
  } catch (error) {
    console.error('Application submission error:', error);
    throw error;
  }
}