// ZALPHA Platform Server Integration
// Internal Website/CMS Integration - Keeps API credentials secure on server-side

// ZALPHA Website credentials from environment variables for security
const ZALPHA_WEBSITE_API_KEY = Deno.env.get('WIX_API_KEY') ?? '';
const ZALPHA_WEBSITE_SITE_ID = Deno.env.get('WIX_SITE_ID') ?? '';
const ZALPHA_WEBSITE_ACCOUNT_ID = Deno.env.get('WIX_ACCOUNT_ID') ?? '';

const ZALPHA_WEBSITE_BASE_URL = 'https://www.wixapis.com';

interface ZalphaContact {
  id?: string;
  firstName?: string;
  lastName?: string;
  emails?: string[];
  phones?: string[];
  labels?: string[];
  company?: string;
  jobTitle?: string;
  source?: string;
  createdDate?: string;
  updatedDate?: string;
}

interface ZalphaFormSubmission {
  id: string;
  formId: string;
  namespace: string;
  submissions: any[];
  submittedAt: string;
  viewedByOwner?: boolean;
}

interface ZalphaBlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  categoryIds?: string[];
  status?: 'PUBLISHED' | 'DRAFT' | 'SCHEDULED';
  slug?: string;
  publishedDate?: string;
  featured?: boolean;
}

async function zalphaRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${ZALPHA_WEBSITE_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  // Add authorization if API key is available
  if (ZALPHA_WEBSITE_API_KEY) {
    headers['Authorization'] = ZALPHA_WEBSITE_API_KEY;
  }

  // Add site context if site ID is available
  if (ZALPHA_WEBSITE_SITE_ID) {
    headers['wix-site-id'] = ZALPHA_WEBSITE_SITE_ID;
  }

  if (ZALPHA_WEBSITE_ACCOUNT_ID) {
    headers['wix-account-id'] = ZALPHA_WEBSITE_ACCOUNT_ID;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`ZALPHA Website API Error (${response.status}): ${error.message || response.statusText}`);
  }

  return response.json();
}

// ========== EXPORTED FUNCTIONS ==========

export async function testConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    if (!ZALPHA_WEBSITE_API_KEY) {
      return { connected: false, message: 'ZALPHA_WEBSITE_API_KEY environment variable not set' };
    }
    if (!ZALPHA_WEBSITE_SITE_ID) {
      return { connected: false, message: 'ZALPHA_WEBSITE_SITE_ID environment variable not set' };
    }

    // Test with a simple API call (get contacts with limit 1)
    await zalphaRequest('/v1/contacts?limit=1');
    return { connected: true, message: 'Successfully connected to ZALPHA Website' };
  } catch (error) {
    return { 
      connected: false, 
      message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

// ========== CONTACTS API ==========

export async function getContacts(filters?: {
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<{ contacts: ZalphaContact[]; total: number }> {
  const params = new URLSearchParams();
  if (filters?.limit) params.append('limit', filters.limit.toString());
  if (filters?.offset) params.append('offset', filters.offset.toString());
  if (filters?.search) params.append('search', filters.search);

  const result = await zalphaRequest(`/v1/contacts?${params.toString()}`);
  return {
    contacts: result.contacts || [],
    total: result.totalResults || 0,
  };
}

export async function createContact(contactData: ZalphaContact): Promise<ZalphaContact> {
  const result = await zalphaRequest('/v1/contacts', {
    method: 'POST',
    body: JSON.stringify({ contact: contactData }),
  });
  return result.contact;
}

export async function updateContact(contactId: string, contactData: Partial<ZalphaContact>): Promise<ZalphaContact> {
  const result = await zalphaRequest(`/v1/contacts/${contactId}`, {
    method: 'PATCH',
    body: JSON.stringify({ contact: contactData }),
  });
  return result.contact;
}

// ========== FORM SUBMISSIONS API ==========

export async function getFormSubmissions(filters?: {
  formId?: string;
  limit?: number;
  offset?: number;
}): Promise<{ submissions: ZalphaFormSubmission[]; total: number }> {
  const params = new URLSearchParams();
  if (filters?.formId) params.append('formId', filters.formId);
  if (filters?.limit) params.append('limit', filters.limit.toString());
  if (filters?.offset) params.append('offset', filters.offset.toString());

  const result = await zalphaRequest(`/v1/form-submissions?${params.toString()}`);
  return {
    submissions: result.submissions || [],
    total: result.totalResults || 0,
  };
}

export async function syncFormSubmissionsToZALPHA(kvStore: any): Promise<{
  synced: number;
  failed: number;
  submissions: ZalphaFormSubmission[];
}> {
  try {
    const { submissions } = await getFormSubmissions({ limit: 100 });
    
    // Store submissions in KV store
    for (const submission of submissions) {
      await kvStore.set(`zalpha:submission:${submission.id}`, {
        id: submission.id,
        formId: submission.formId,
        data: submission.submissions,
        submittedAt: submission.submittedAt,
        viewed: submission.viewedByOwner,
        source: 'zalpha_website',
        lastSynced: new Date().toISOString(),
      });
    }

    // Store sync metadata
    await kvStore.set('zalpha:last_sync', {
      timestamp: new Date().toISOString(),
      submissionCount: submissions.length,
      status: 'success',
    });

    return {
      synced: submissions.length,
      failed: 0,
      submissions,
    };
  } catch (error) {
    console.error('ZALPHA Website form submission sync error:', error);
    throw error;
  }
}

// ========== BLOG API ==========

export async function getBlogPosts(filters?: {
  limit?: number;
  offset?: number;
  status?: 'PUBLISHED' | 'DRAFT' | 'SCHEDULED';
}): Promise<{ posts: ZalphaBlogPost[]; total: number }> {
  const params = new URLSearchParams();
  if (filters?.limit) params.append('limit', filters.limit.toString());
  if (filters?.offset) params.append('offset', filters.offset.toString());
  if (filters?.status) params.append('status', filters.status);

  try {
    const result = await zalphaRequest(`/v3/posts?${params.toString()}`);
    return {
      posts: result.posts || [],
      total: result.totalResults || 0,
    };
  } catch (error) {
    // Blog API might not be available on all plans
    console.log('ZALPHA Website Blog API not available or not configured');
    return { posts: [], total: 0 };
  }
}

export async function createBlogPost(postData: ZalphaBlogPost): Promise<ZalphaBlogPost> {
  const result = await zalphaRequest('/v3/posts', {
    method: 'POST',
    body: JSON.stringify({ post: postData }),
  });
  return result.post;
}

export async function updateBlogPost(postId: string, postData: Partial<ZalphaBlogPost>): Promise<ZalphaBlogPost> {
  const result = await zalphaRequest(`/v3/posts/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify({ post: postData }),
  });
  return result.post;
}

// ========== SYNC JOBS TO ZALPHA WEBSITE ==========

export async function syncJobsToZalphaWebsite(kvStore: any): Promise<{
  synced: number;
  failed: number;
  posts: ZalphaBlogPost[];
}> {
  try {
    // Get active jobs from ZALPHA
    const jobsData = await kvStore.getByPrefix('job:');
    const activeJobs = jobsData.filter((j: any) => j.status === 'active');

    const createdPosts: ZalphaBlogPost[] = [];
    let failed = 0;

    for (const job of activeJobs) {
      try {
        // Check if already synced to ZALPHA Website
        const existingSync = await kvStore.get(`zalpha:blog:job:${job.id}`);
        if (existingSync) {
          console.log(`Job ${job.id} already synced to ZALPHA Website blog`);
          continue;
        }

        // Create blog post for job
        const postData: ZalphaBlogPost = {
          title: `${job.title} - ${job.company}`,
          content: `
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Type:</strong> ${job.type}</p>
            ${job.salary ? `<p><strong>Salary:</strong> ${job.salary}</p>` : ''}
            
            <h3>Description</h3>
            <p>${job.description}</p>
            
            ${job.requirements?.length ? `
              <h3>Requirements</h3>
              <ul>
                ${job.requirements.map((req: string) => `<li>${req}</li>`).join('')}
              </ul>
            ` : ''}
            
            <p><em>Apply now through ZALPHA platform!</em></p>
          `,
          excerpt: job.description.substring(0, 200) + '...',
          tags: ['job-posting', job.type, job.location],
          status: 'PUBLISHED',
          publishedDate: new Date().toISOString(),
          featured: job.featured || false,
        };

        const post = await createBlogPost(postData);
        createdPosts.push(post);

        // Store sync reference
        await kvStore.set(`zalpha:blog:job:${job.id}`, {
          jobId: job.id,
          postId: post.id,
          syncedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error(`Failed to sync job ${job.id} to ZALPHA Website:`, error);
        failed++;
      }
    }

    return {
      synced: createdPosts.length,
      failed,
      posts: createdPosts,
    };
  } catch (error) {
    console.error('ZALPHA Website job sync error:', error);
    throw error;
  }
}

// ========== SYNC STUDENT TO ZALPHA CONTACT ==========

export async function syncStudentToZalphaContact(studentData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  school?: string;
  graduationYear?: string;
  location?: string;
}): Promise<ZalphaContact> {
  try {
    const contactData: ZalphaContact = {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      emails: [studentData.email],
      phones: studentData.phone ? [studentData.phone] : [],
      labels: ['ZALPHA Student', `Class of ${studentData.graduationYear}`],
      company: studentData.school,
      source: 'ZALPHA Platform',
    };

    const contact = await createContact(contactData);
    return contact;
  } catch (error) {
    console.error('Sync student to ZALPHA contact error:', error);
    throw error;
  }
}

// ========== SYNC EMPLOYER TO ZALPHA CONTACT ==========

export async function syncEmployerToZalphaContact(employerData: {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  industry?: string;
}): Promise<ZalphaContact> {
  try {
    const contactData: ZalphaContact = {
      firstName: employerData.contactName.split(' ')[0] || '',
      lastName: employerData.contactName.split(' ').slice(1).join(' ') || '',
      emails: [employerData.email],
      phones: employerData.phone ? [employerData.phone] : [],
      labels: ['ZALPHA Employer', employerData.industry || 'Business'],
      company: employerData.companyName,
      source: 'ZALPHA Platform',
    };

    const contact = await createContact(contactData);
    return contact;
  } catch (error) {
    console.error('Sync employer to ZALPHA contact error:', error);
    throw error;
  }
}