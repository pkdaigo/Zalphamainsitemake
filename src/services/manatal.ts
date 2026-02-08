// Manatal ATS Integration Service
// API Documentation: https://www.manatal.com/api

interface ManatalConfig {
  apiKey: string;
  baseUrl: string;
}

interface ManatalJob {
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

interface ManatalCandidate {
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

interface ManatalApplication {
  id: string;
  candidate_id: string;
  job_id: string;
  stage: string;
  status: string;
  applied_at: string;
  notes?: string;
}

class ManatalService {
  private config: ManatalConfig;

  constructor(apiKey: string) {
    this.config = {
      apiKey,
      baseUrl: 'https://api.manatal.com/open/v3',
    };
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`Manatal API Error: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  // ========== JOB MANAGEMENT ==========

  async getJobs(filters?: {
    status?: 'open' | 'closed' | 'draft';
    limit?: number;
    offset?: number;
  }): Promise<{ results: ManatalJob[]; count: number }> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    return this.request(`/jobs?${params.toString()}`);
  }

  async getJob(jobId: string): Promise<ManatalJob> {
    return this.request(`/jobs/${jobId}`);
  }

  async createJob(jobData: Partial<ManatalJob>): Promise<ManatalJob> {
    return this.request('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(jobId: string, jobData: Partial<ManatalJob>): Promise<ManatalJob> {
    return this.request(`/jobs/${jobId}`, {
      method: 'PATCH',
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(jobId: string): Promise<void> {
    await this.request(`/jobs/${jobId}`, {
      method: 'DELETE',
    });
  }

  // ========== CANDIDATE MANAGEMENT ==========

  async getCandidates(filters?: {
    search?: string;
    tags?: string[];
    limit?: number;
    offset?: number;
  }): Promise<{ results: ManatalCandidate[]; count: number }> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.tags) params.append('tags', filters.tags.join(','));
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    return this.request(`/candidates?${params.toString()}`);
  }

  async getCandidate(candidateId: string): Promise<ManatalCandidate> {
    return this.request(`/candidates/${candidateId}`);
  }

  async createCandidate(candidateData: Partial<ManatalCandidate>): Promise<ManatalCandidate> {
    return this.request('/candidates', {
      method: 'POST',
      body: JSON.stringify(candidateData),
    });
  }

  async updateCandidate(candidateId: string, candidateData: Partial<ManatalCandidate>): Promise<ManatalCandidate> {
    return this.request(`/candidates/${candidateId}`, {
      method: 'PATCH',
      body: JSON.stringify(candidateData),
    });
  }

  async deleteCandidate(candidateId: string): Promise<void> {
    await this.request(`/candidates/${candidateId}`, {
      method: 'DELETE',
    });
  }

  // ========== APPLICATION MANAGEMENT ==========

  async getApplications(filters?: {
    job_id?: string;
    candidate_id?: string;
    stage?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ results: ManatalApplication[]; count: number }> {
    const params = new URLSearchParams();
    if (filters?.job_id) params.append('job_id', filters.job_id);
    if (filters?.candidate_id) params.append('candidate_id', filters.candidate_id);
    if (filters?.stage) params.append('stage', filters.stage);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    return this.request(`/applications?${params.toString()}`);
  }

  async createApplication(applicationData: {
    candidate_id: string;
    job_id: string;
    stage?: string;
    notes?: string;
  }): Promise<ManatalApplication> {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async updateApplicationStage(applicationId: string, stage: string): Promise<ManatalApplication> {
    return this.request(`/applications/${applicationId}`, {
      method: 'PATCH',
      body: JSON.stringify({ stage }),
    });
  }

  // ========== SYNC OPERATIONS ==========

  async syncJobsToKiEX(): Promise<{
    synced: number;
    failed: number;
    jobs: ManatalJob[];
  }> {
    try {
      const { results: jobs } = await this.getJobs({ status: 'open', limit: 100 });
      
      // Transform Manatal jobs to KiEX format
      const kiexJobs = jobs.map(job => ({
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
        source: 'manatal',
      }));

      // Store in KiEX database (via server endpoint)
      const response = await fetch('/api/sync/manatal/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobs: kiexJobs }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync jobs to KiEX');
      }

      return {
        synced: jobs.length,
        failed: 0,
        jobs,
      };
    } catch (error) {
      console.error('Manatal job sync error:', error);
      throw error;
    }
  }

  async syncCandidateFromKiEX(kiexCandidate: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    resumeUrl?: string;
    location?: string;
    skills?: string[];
  }): Promise<ManatalCandidate> {
    try {
      const candidateData = {
        first_name: kiexCandidate.firstName,
        last_name: kiexCandidate.lastName,
        email: kiexCandidate.email,
        phone: kiexCandidate.phone,
        resume_url: kiexCandidate.resumeUrl,
        location: kiexCandidate.location,
        tags: kiexCandidate.skills || [],
      };

      return await this.createCandidate(candidateData);
    } catch (error) {
      console.error('Candidate sync error:', error);
      throw error;
    }
  }

  async syncApplicationFromKiEX(kiexApplication: {
    candidateId: string;
    jobId: string;
    notes?: string;
  }): Promise<ManatalApplication> {
    try {
      return await this.createApplication({
        candidate_id: kiexApplication.candidateId,
        job_id: kiexApplication.jobId,
        stage: 'Applied',
        notes: kiexApplication.notes,
      });
    } catch (error) {
      console.error('Application sync error:', error);
      throw error;
    }
  }

  // ========== WEBHOOK HANDLERS ==========

  async setupWebhook(webhookUrl: string, events: string[]): Promise<void> {
    // Manatal webhook configuration
    await this.request('/webhooks', {
      method: 'POST',
      body: JSON.stringify({
        url: webhookUrl,
        events,
        active: true,
      }),
    });
  }

  async handleWebhook(payload: any): Promise<void> {
    const { event, data } = payload;

    switch (event) {
      case 'job.created':
      case 'job.updated':
        await this.syncJobsToKiEX();
        break;
      case 'application.created':
      case 'application.updated':
        // Handle application updates
        console.log('Application webhook received:', data);
        break;
      case 'candidate.updated':
        // Handle candidate updates
        console.log('Candidate webhook received:', data);
        break;
      default:
        console.log('Unknown webhook event:', event);
    }
  }

  // ========== HEALTH CHECK ==========

  async testConnection(): Promise<{ connected: boolean; message: string }> {
    try {
      await this.request('/jobs?limit=1');
      return { connected: true, message: 'Successfully connected to Manatal ATS' };
    } catch (error) {
      return { 
        connected: false, 
        message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }
}

export default ManatalService;
export type { ManatalJob, ManatalCandidate, ManatalApplication };
