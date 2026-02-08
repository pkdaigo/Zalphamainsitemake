// Wix Integration Service
// API Documentation: https://dev.wix.com/api/rest/getting-started

interface WixConfig {
  apiKey: string;
  siteId: string;
  accountId: string;
  baseUrl: string;
}

interface WixContact {
  id: string;
  firstName?: string;
  lastName?: string;
  emails?: string[];
  phones?: string[];
  company?: string;
  jobTitle?: string;
  location?: {
    city?: string;
    country?: string;
  };
  customFields?: Record<string, any>;
  createdDate?: string;
  updatedDate?: string;
}

interface WixFormSubmission {
  id: string;
  formId: string;
  submissions: Record<string, any>;
  submittedDate: string;
  namespace?: string;
}

interface WixMember {
  id: string;
  loginEmail?: string;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  profilePhoto?: string;
  status: 'ACTIVE' | 'BLOCKED' | 'OFFLINE';
  createdDate?: string;
}

class WixService {
  private config: WixConfig;

  constructor(apiKey: string, siteId: string, accountId?: string) {
    // Get environment variable if available
    const envSiteId = typeof process !== 'undefined' && process.env?.WIX_SITE_ID;
    
    this.config = {
      apiKey,
      siteId: siteId || envSiteId || '',
      accountId: accountId || '',
      baseUrl: 'https://www.wixapis.com',
    };
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': this.config.apiKey,
        'wix-site-id': this.config.siteId,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`Wix API Error: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  // ========== CONTACT MANAGEMENT ==========

  async getContacts(filters?: {
    email?: string;
    phone?: string;
    limit?: number;
    cursor?: string;
  }): Promise<{ contacts: WixContact[]; cursor?: string }> {
    const params = new URLSearchParams();
    if (filters?.email) params.append('email', filters.email);
    if (filters?.phone) params.append('phone', filters.phone);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.cursor) params.append('cursor', filters.cursor);

    const data = await this.request(`/contacts/v4/contacts?${params.toString()}`);
    return {
      contacts: data.contacts || [],
      cursor: data.pagingMetadata?.cursors?.next,
    };
  }

  async getContact(contactId: string): Promise<WixContact> {
    const data = await this.request(`/contacts/v4/contacts/${contactId}`);
    return data.contact;
  }

  async createContact(contactData: Partial<WixContact>): Promise<WixContact> {
    const data = await this.request('/contacts/v4/contacts', {
      method: 'POST',
      body: JSON.stringify({ contact: contactData }),
    });
    return data.contact;
  }

  async updateContact(contactId: string, contactData: Partial<WixContact>): Promise<WixContact> {
    const data = await this.request(`/contacts/v4/contacts/${contactId}`, {
      method: 'PATCH',
      body: JSON.stringify({ contact: contactData }),
    });
    return data.contact;
  }

  async deleteContact(contactId: string): Promise<void> {
    await this.request(`/contacts/v4/contacts/${contactId}`, {
      method: 'DELETE',
    });
  }

  // ========== FORM SUBMISSIONS ==========

  async getFormSubmissions(formId?: string, limit: number = 50): Promise<WixFormSubmission[]> {
    const params = new URLSearchParams();
    if (formId) params.append('formId', formId);
    params.append('limit', limit.toString());

    const data = await this.request(`/form-submissions/v1/submissions?${params.toString()}`);
    return data.submissions || [];
  }

  async getFormSubmission(submissionId: string): Promise<WixFormSubmission> {
    const data = await this.request(`/form-submissions/v1/submissions/${submissionId}`);
    return data.submission;
  }

  // ========== MEMBER MANAGEMENT ==========

  async getMembers(filters?: {
    limit?: number;
    cursor?: string;
  }): Promise<{ members: WixMember[]; cursor?: string }> {
    const params = new URLSearchParams();
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.cursor) params.append('cursor', filters.cursor);

    const data = await this.request(`/members/v1/members?${params.toString()}`);
    return {
      members: data.members || [],
      cursor: data.pagingMetadata?.cursors?.next,
    };
  }

  async getMember(memberId: string): Promise<WixMember> {
    const data = await this.request(`/members/v1/members/${memberId}`);
    return data.member;
  }

  async createMember(memberData: {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<WixMember> {
    const data = await this.request('/members/v1/members', {
      method: 'POST',
      body: JSON.stringify({ member: memberData }),
    });
    return data.member;
  }

  // ========== SYNC OPERATIONS ==========

  async syncContactsToKiEX(): Promise<{
    synced: number;
    failed: number;
    contacts: WixContact[];
  }> {
    try {
      const { contacts } = await this.getContacts({ limit: 100 });
      
      // Transform Wix contacts to KiEX format
      const kiexContacts = contacts.map(contact => ({
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.emails?.[0],
        phone: contact.phones?.[0],
        company: contact.company,
        jobTitle: contact.jobTitle,
        location: contact.location?.city 
          ? `${contact.location.city}${contact.location.country ? ', ' + contact.location.country : ''}`
          : undefined,
        customFields: contact.customFields,
        createdDate: contact.createdDate,
        source: 'wix',
      }));

      // Store in KiEX database (via server endpoint)
      const response = await fetch('/api/sync/wix/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts: kiexContacts }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync contacts to KiEX');
      }

      return {
        synced: contacts.length,
        failed: 0,
        contacts,
      };
    } catch (error) {
      console.error('Wix contact sync error:', error);
      throw error;
    }
  }

  async syncFormSubmissionsToKiEX(formId?: string): Promise<{
    synced: number;
    failed: number;
    submissions: WixFormSubmission[];
  }> {
    try {
      const submissions = await this.getFormSubmissions(formId, 100);
      
      // Transform Wix form submissions to KiEX format
      const kiexSubmissions = submissions.map(submission => ({
        id: submission.id,
        formId: submission.formId,
        data: submission.submissions,
        submittedAt: submission.submittedDate,
        source: 'wix',
      }));

      // Store in KiEX database (via server endpoint)
      const response = await fetch('/api/sync/wix/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissions: kiexSubmissions }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync form submissions to KiEX');
      }

      return {
        synced: submissions.length,
        failed: 0,
        submissions,
      };
    } catch (error) {
      console.error('Wix form sync error:', error);
      throw error;
    }
  }

  async syncMemberToKiEX(kiexUser: {
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
  }): Promise<WixMember> {
    try {
      return await this.createMember({
        email: kiexUser.email,
        firstName: kiexUser.firstName,
        lastName: kiexUser.lastName,
        password: kiexUser.password,
      });
    } catch (error) {
      console.error('Member sync error:', error);
      throw error;
    }
  }

  async syncEmployerToWix(employer: {
    companyName: string;
    email: string;
    contactPerson: string;
    phone?: string;
    location?: string;
  }): Promise<WixContact> {
    try {
      const [firstName, ...lastNameParts] = employer.contactPerson.split(' ');
      const lastName = lastNameParts.join(' ');

      return await this.createContact({
        firstName,
        lastName,
        emails: [employer.email],
        phones: employer.phone ? [employer.phone] : undefined,
        company: employer.companyName,
        location: employer.location ? {
          city: employer.location,
        } : undefined,
        customFields: {
          'custom.kiex_employer': true,
          'custom.kiex_company': employer.companyName,
        },
      });
    } catch (error) {
      console.error('Employer sync error:', error);
      throw error;
    }
  }

  async syncStudentToWix(student: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    school?: string;
    location?: string;
  }): Promise<WixContact> {
    try {
      return await this.createContact({
        firstName: student.firstName,
        lastName: student.lastName,
        emails: [student.email],
        phones: student.phone ? [student.phone] : undefined,
        location: student.location ? {
          city: student.location,
        } : undefined,
        customFields: {
          'custom.kiex_student': true,
          'custom.kiex_school': student.school,
        },
      });
    } catch (error) {
      console.error('Student sync error:', error);
      throw error;
    }
  }

  // ========== JOB POSTINGS TO WIX SITE ==========

  async syncJobToWixBlog(job: {
    title: string;
    description: string;
    location: string;
    type: string;
    salary?: string;
    requirements?: string[];
    benefits?: string[];
  }): Promise<any> {
    try {
      // Create a blog post for the job listing on Wix site
      const blogPost = await this.request('/blog/v3/posts', {
        method: 'POST',
        body: JSON.stringify({
          post: {
            title: `${job.title} - ${job.location}`,
            excerpt: job.description.substring(0, 200),
            content: `
              <h2>${job.title}</h2>
              <p><strong>Location:</strong> ${job.location}</p>
              <p><strong>Type:</strong> ${job.type}</p>
              ${job.salary ? `<p><strong>Salary:</strong> ${job.salary}</p>` : ''}
              
              <h3>Description</h3>
              <p>${job.description}</p>
              
              ${job.requirements?.length ? `
                <h3>Requirements</h3>
                <ul>
                  ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
              ` : ''}
              
              ${job.benefits?.length ? `
                <h3>Benefits</h3>
                <ul>
                  ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
              ` : ''}
              
              <p><strong>Apply now through KiEX!</strong></p>
            `,
            coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
            categoryIds: ['jobs'],
          },
        }),
      });

      return blogPost;
    } catch (error) {
      console.error('Job to Wix blog sync error:', error);
      throw error;
    }
  }

  // ========== WEBHOOK HANDLERS ==========

  async handleWebhook(payload: any): Promise<void> {
    const { eventType, data } = payload;

    switch (eventType) {
      case 'contact/created':
      case 'contact/updated':
        await this.syncContactsToKiEX();
        break;
      case 'form/submitted':
        await this.syncFormSubmissionsToKiEX();
        break;
      case 'member/created':
        console.log('New Wix member created:', data);
        break;
      default:
        console.log('Unknown webhook event:', eventType);
    }
  }

  // ========== HEALTH CHECK ==========

  async testConnection(): Promise<{ connected: boolean; message: string }> {
    try {
      await this.getContacts({ limit: 1 });
      return { connected: true, message: 'Successfully connected to Wix' };
    } catch (error) {
      return { 
        connected: false, 
        message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }
}

export default WixService;
export type { WixContact, WixFormSubmission, WixMember };
