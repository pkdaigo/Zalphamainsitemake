/**
 * D-ID Agents API Integration
 * Provides AI-powered video avatars for ZALPHA platform
 * Documentation: https://docs.d-id.com/reference/agents-overview
 */

const DID_USERNAME = Deno.env.get('DID_USERNAME') || Deno.env.get('DID_API_KEY')?.split(':')[0];
const DID_PASSWORD = Deno.env.get('DID_PASSWORD') || Deno.env.get('DID_API_KEY')?.split(':')[1];
const D_ID_BASE_URL = 'https://api.d-id.com';

/**
 * Helper function to get authorization header
 * D-ID requires Basic auth: Authorization: Basic base64(username:password)
 */
function getAuthHeader(): string {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }
  
  // D-ID expects: Authorization: Basic <base64(username:password)>
  try {
    const credentials = `${DID_USERNAME}:${DID_PASSWORD}`;
    const base64Credentials = btoa(credentials);
    return `Basic ${base64Credentials}`;
  } catch (error) {
    console.error('Error encoding D-ID credentials:', error);
    throw new Error('Failed to encode D-ID credentials. Please check DID_USERNAME and DID_PASSWORD format.');
  }
}

/**
 * Generates a client key for D-ID with whitelisted domains
 * Required for client-side D-ID integration
 */
export async function createClientKey(allowedDomains: string[]): Promise<{ clientKey: string }> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    console.warn('⚠️ D-ID credentials not configured. D-ID features will be disabled.');
    throw new Error('D-ID credentials not configured. Please add your D-ID API key to continue.');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/agents/client-key`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        allowed_domains: allowedDomains,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      console.error('D-ID client key creation error:', errorData);
      
      if (response.status === 401) {
        throw new Error('D-ID API key is invalid or expired. Please check your DID_API_KEY environment variable.');
      }
      
      throw new Error(`Failed to create D-ID client key: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ D-ID client key created successfully for domains:', allowedDomains);
    return { clientKey: data.client_key || data.clientKey || data.key };
  } catch (error) {
    console.error('❌ Error creating D-ID client key:', error);
    throw error;
  }
}

export interface CreateAgentRequest {
  presenter: {
    type: string;
    source_url?: string;
    voice?: {
      type: string;
      voice_id?: string;
    };
  };
  llm?: {
    type: string;
    provider: string;
    model?: string;
    instructions?: string;
  };
  knowledge?: Array<{
    type: string;
    content: string;
  }>;
}

export interface AgentResponse {
  id: string;
  status: string;
  presenter: any;
  created_at: string;
  stream_url?: string;
  ice_servers?: any[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Creates a new D-ID agent with specified configuration
 */
export async function createAgent(config: CreateAgentRequest): Promise<AgentResponse> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/agents`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID agent creation error:', errorData);
      throw new Error(`Failed to create D-ID agent: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('D-ID agent created successfully:', data.id);
    return data;
  } catch (error) {
    console.error('Error creating D-ID agent:', error);
    throw error;
  }
}

/**
 * Gets agent details by ID
 */
export async function getAgent(agentId: string): Promise<AgentResponse> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/agents/${agentId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get D-ID agent: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching D-ID agent:', error);
    throw error;
  }
}

/**
 * Deletes an agent by ID
 */
export async function deleteAgent(agentId: string): Promise<void> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/agents/${agentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete D-ID agent: ${errorData.message || response.statusText}`);
    }

    console.log('D-ID agent deleted successfully:', agentId);
  } catch (error) {
    console.error('Error deleting D-ID agent:', error);
    throw error;
  }
}

/**
 * Starts a chat session with an agent
 */
export async function startAgentChat(agentId: string, sessionId: string): Promise<any> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/agents/${agentId}/chat`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to start agent chat: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error starting agent chat:', error);
    throw error;
  }
}

/**
 * Sends a message to an agent in a chat session
 */
export async function sendAgentMessage(
  agentId: string,
  sessionId: string,
  message: string
): Promise<any> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/agents/${agentId}/chat/${sessionId}`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to send message to agent: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message to agent:', error);
    throw error;
  }
}

/**
 * Creates a ZALPHA-specific Zee agent
 */
export async function createZeeAgent(config?: Partial<CreateAgentRequest>): Promise<AgentResponse> {
  const defaultConfig: CreateAgentRequest = {
    presenter: {
      type: 'talk',
      voice: {
        type: 'microsoft',
        voice_id: 'en-US-JennyNeural', // Professional female voice
      },
      ...config?.presenter,
    },
    llm: {
      type: 'openai',
      provider: 'openai',
      model: 'gpt-4',
      instructions: `You are Zee, ZALPHA's friendly AI career assistant. Your role is to help college students and high school graduates in the Pacific Islands find jobs, prepare for interviews, and build their careers.

Key responsibilities:
- Provide career advice and job search guidance
- Help students with resume building and interview preparation
- Answer questions about ZALPHA platform features
- Guide users through the job application process
- Provide encouragement and support

Personality:
- Friendly, supportive, and professional
- Patient and understanding
- Culturally sensitive to Pacific Island communities
- Encouraging and motivating

Always be helpful, concise, and actionable in your responses. Keep the focus on helping students achieve their career goals.`,
      ...config?.llm,
    },
    knowledge: config?.knowledge || [],
  };

  return createAgent(defaultConfig);
}

/**
 * Creates a recruiter/employer assistant agent
 */
export async function createRecruiterAgent(
  companyName: string,
  config?: Partial<CreateAgentRequest>
): Promise<AgentResponse> {
  const defaultConfig: CreateAgentRequest = {
    presenter: {
      type: 'talk',
      voice: {
        type: 'microsoft',
        voice_id: 'en-US-GuyNeural', // Professional male voice
      },
      ...config?.presenter,
    },
    llm: {
      type: 'openai',
      provider: 'openai',
      model: 'gpt-4',
      instructions: `You are an AI recruitment assistant for ${companyName} on the ZALPHA platform. Your role is to help candidates learn about the company and guide them through the application process.

Key responsibilities:
- Answer questions about ${companyName} and available positions
- Guide candidates through the application process
- Provide information about company culture and benefits
- Schedule interviews and answer pre-screening questions
- Represent the company professionally

Personality:
- Professional and welcoming
- Clear and informative
- Enthusiastic about the company
- Respectful and inclusive

Always maintain confidentiality and professionalism. Guide candidates positively while representing ${companyName}'s values.`,
      ...config?.llm,
    },
    knowledge: config?.knowledge || [],
  };

  return createAgent(defaultConfig);
}

/**
 * Creates a virtual career fair booth agent
 */
export async function createCareerFairAgent(
  boothInfo: {
    organizationName: string;
    description: string;
    opportunities: string[];
  },
  config?: Partial<CreateAgentRequest>
): Promise<AgentResponse> {
  const defaultConfig: CreateAgentRequest = {
    presenter: {
      type: 'talk',
      voice: {
        type: 'microsoft',
        voice_id: 'en-US-AriaNeural',
      },
      ...config?.presenter,
    },
    llm: {
      type: 'openai',
      provider: 'openai',
      model: 'gpt-4',
      instructions: `You are a virtual career fair representative for ${boothInfo.organizationName}. 

Organization: ${boothInfo.organizationName}
Description: ${boothInfo.description}
Opportunities: ${boothInfo.opportunities.join(', ')}

Your role is to:
- Welcome visitors to the virtual booth
- Provide information about ${boothInfo.organizationName}
- Discuss available opportunities
- Answer questions about application requirements
- Collect interest and schedule follow-ups

Be engaging, informative, and help visitors understand how they can benefit from opportunities with ${boothInfo.organizationName}.`,
      ...config?.llm,
    },
    knowledge: config?.knowledge || [],
  };

  return createAgent(defaultConfig);
}

/**
 * Lists all agents (with pagination)
 */
export async function listAgents(limit: number = 20, offset: number = 0): Promise<any> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/agents?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to list D-ID agents: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error listing D-ID agents:', error);
    throw error;
  }
}

/**
 * Creates a tutorial video agent for ZALPHA educational content
 */
export async function createTutorialAgent(
  tutorialInfo: {
    title: string;
    category: string;
    script: string;
    keyTakeaways: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  },
  config?: Partial<CreateAgentRequest>
): Promise<AgentResponse> {
  const defaultConfig: CreateAgentRequest = {
    presenter: {
      type: 'talk',
      voice: {
        type: 'microsoft',
        voice_id: 'en-US-JennyNeural', // Clear, instructional voice
      },
      ...config?.presenter,
    },
    llm: {
      type: 'openai',
      provider: 'openai',
      model: 'gpt-4',
      instructions: `You are a ZALPHA educational instructor presenting a tutorial video.

Tutorial Title: ${tutorialInfo.title}
Category: ${tutorialInfo.category}
Difficulty Level: ${tutorialInfo.difficulty}

Tutorial Script:
${tutorialInfo.script}

Key Takeaways:
${tutorialInfo.keyTakeaways.map((point, i) => `${i + 1}. ${point}`).join('\n')}

Your role is to:
- Present the tutorial content clearly and engagingly
- Answer questions about the tutorial material
- Provide additional examples and clarifications when asked
- Help viewers understand the concepts being taught
- Encourage viewers to practice what they've learned

Personality:
- Clear and instructional
- Patient and thorough
- Encouraging and supportive
- Professional yet friendly

When presenting, speak as if you're teaching the tutorial directly. Reference specific steps and examples from the script. Always be helpful and ensure learners understand the material before moving forward.`,
      ...config?.llm,
    },
    knowledge: [
      {
        type: 'text',
        content: tutorialInfo.script,
      },
      ...tutorialInfo.keyTakeaways.map(takeaway => ({
        type: 'text' as const,
        content: takeaway,
      })),
      ...(config?.knowledge || []),
    ],
  };

  return createAgent(defaultConfig);
}

/**
 * ============================================================================
 * KNOWLEDGE BASE MANAGEMENT
 * ============================================================================
 */

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  status: string;
  created: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  documentType: string;
  status: string;
  created: string;
}

/**
 * Creates a new knowledge base for agent training
 */
export async function createKnowledgeBase(
  name: string,
  description: string
): Promise<KnowledgeBase> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/knowledge`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID knowledge base creation error:', errorData);
      throw new Error(`Failed to create knowledge base: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Knowledge base created successfully:', data.id);
    return data;
  } catch (error) {
    console.error('Error creating knowledge base:', error);
    throw error;
  }
}

/**
 * Lists all knowledge bases
 */
export async function listKnowledgeBases(): Promise<KnowledgeBase[]> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/knowledge`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to list knowledge bases: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data.knowledge || [];
  } catch (error) {
    console.error('Error listing knowledge bases:', error);
    throw error;
  }
}

/**
 * Gets a specific knowledge base by ID
 */
export async function getKnowledgeBase(knowledgeId: string): Promise<KnowledgeBase> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/knowledge/${knowledgeId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get knowledge base: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching knowledge base:', error);
    throw error;
  }
}

/**
 * Deletes a knowledge base
 */
export async function deleteKnowledgeBase(knowledgeId: string): Promise<void> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/knowledge/${knowledgeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete knowledge base: ${errorData.message || response.statusText}`);
    }

    console.log('Knowledge base deleted successfully:', knowledgeId);
  } catch (error) {
    console.error('Error deleting knowledge base:', error);
    throw error;
  }
}

/**
 * Uploads a document to a knowledge base
 * Supports: PDF, TXT, DOCX, and other text formats
 */
export async function uploadDocumentToKnowledge(
  knowledgeId: string,
  title: string,
  content: string | Blob,
  documentType: 'pdf' | 'txt' | 'docx' = 'txt'
): Promise<KnowledgeDocument> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const formData = new FormData();
    
    if (typeof content === 'string') {
      // Text content
      const blob = new Blob([content], { type: 'text/plain' });
      formData.append('file', blob, `${title}.${documentType}`);
    } else {
      // Binary content (PDF, DOCX, etc.)
      formData.append('file', content, `${title}.${documentType}`);
    }
    
    formData.append('title', title);

    const response = await fetch(`${D_ID_BASE_URL}/knowledge/${knowledgeId}/documents`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID document upload error:', errorData);
      throw new Error(`Failed to upload document: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Document uploaded successfully:', data.id);
    return data;
  } catch (error) {
    console.error('Error uploading document to knowledge base:', error);
    throw error;
  }
}

/**
 * Lists documents in a knowledge base
 */
export async function listKnowledgeDocuments(knowledgeId: string): Promise<KnowledgeDocument[]> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/knowledge/${knowledgeId}/documents`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to list documents: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data.documents || [];
  } catch (error) {
    console.error('Error listing knowledge documents:', error);
    throw error;
  }
}

/**
 * Deletes a document from a knowledge base
 */
export async function deleteKnowledgeDocument(
  knowledgeId: string,
  documentId: string
): Promise<void> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/knowledge/${knowledgeId}/documents/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete document: ${errorData.message || response.statusText}`);
    }

    console.log('Document deleted successfully:', documentId);
  } catch (error) {
    console.error('Error deleting knowledge document:', error);
    throw error;
  }
}

/**
 * Updates an agent to use a knowledge base with RAG
 * @param agentId - The agent ID to update
 * @param knowledgeId - The knowledge base ID to attach
 * @param ragTemplate - 'rag-grounded' (strict) or 'rag-ungrounded' (flexible)
 */
export async function attachKnowledgeToAgent(
  agentId: string,
  knowledgeId: string,
  ragTemplate: 'rag-grounded' | 'rag-ungrounded' = 'rag-ungrounded'
): Promise<AgentResponse> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/agents/${agentId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        knowledge: {
          id: knowledgeId,
        },
        llm: {
          template: ragTemplate,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID agent update error:', errorData);
      throw new Error(`Failed to attach knowledge to agent: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log(`Knowledge ${knowledgeId} attached to agent ${agentId} with ${ragTemplate}`);
    return data;
  } catch (error) {
    console.error('Error attaching knowledge to agent:', error);
    throw error;
  }
}

/**
 * ============================================================================
 * CHAT EXPORT & ANALYTICS
 * ============================================================================
 */

export interface ChatExport {
  export_id: string;
  status: 'pending' | 'completed' | 'failed';
  download_url?: string;
}

/**
 * Exports chat history for analytics and training
 * @param agentId - Agent ID (optional, exports all chats if not provided)
 * @param from - Start date (ISO 8601 format)
 * @param to - End date (ISO 8601 format)
 */
export async function exportChats(
  agentId?: string,
  from?: string,
  to?: string
): Promise<ChatExport> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const body: any = {};
    if (agentId) body.agent_id = agentId;
    if (from) body.from = from;
    if (to) body.to = to;

    const response = await fetch(`${D_ID_BASE_URL}/agents/chats/exports`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID chat export error:', errorData);
      throw new Error(`Failed to export chats: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Chat export initiated:', data.export_id);
    return data;
  } catch (error) {
    console.error('Error exporting chats:', error);
    throw error;
  }
}

/**
 * Gets the status of a chat export
 */
export async function getChatExportStatus(exportId: string): Promise<ChatExport> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/agents/chats/exports/${exportId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get export status: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching export status:', error);
    throw error;
  }
}

/**
 * Downloads chat export file
 * @param downloadUrl - URL from the export status response
 */
export async function downloadChatExport(downloadUrl: string): Promise<Blob> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(downloadUrl, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download chat export: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error('Error downloading chat export:', error);
    throw error;
  }
}

/**
 * ============================================================================
 * VIDEO GENERATION - EXPRESSIVES (Emotional Talking Heads)
 * ============================================================================
 */

export interface ExpressiveVideo {
  id: string;
  object: string;
  status: 'created' | 'processing' | 'done' | 'error';
  created_at: string;
  result_url?: string;
  duration?: number;
}

/**
 * Creates an expressive video with emotional avatars
 * Perfect for: Tutorial videos, welcome messages, announcements
 */
export async function createExpressiveVideo(
  avatarId: string,
  sentimentId: string,
  script: string
): Promise<ExpressiveVideo> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/expressives`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar_id: avatarId,
        sentiment_id: sentimentId,
        script: {
          type: 'text',
          input: script,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID expressive video creation error:', errorData);
      throw new Error(`Failed to create expressive video: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Expressive video created:', data.id);
    return data;
  } catch (error) {
    console.error('Error creating expressive video:', error);
    throw error;
  }
}

/**
 * Gets the status of an expressive video
 */
export async function getExpressiveVideo(expressiveId: string): Promise<ExpressiveVideo> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/expressives/${expressiveId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get expressive video: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching expressive video:', error);
    throw error;
  }
}

/**
 * ============================================================================
 * VIDEO GENERATION - CLIPS (V3 Pro Avatars)
 * ============================================================================
 */

export interface ClipVideo {
  id: string;
  object: string;
  status: 'created' | 'processing' | 'done' | 'error';
  created_at: string;
  result_url?: string;
}

/**
 * Creates a V3 Pro Avatar video clip (highest quality)
 * Perfect for: Professional presentations, high-quality content
 */
export async function createClipVideo(
  presenterId: string,
  script: string
): Promise<ClipVideo> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/clips`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        presenter_id: presenterId,
        script: {
          type: 'text',
          input: script,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID clip video creation error:', errorData);
      throw new Error(`Failed to create clip video: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Clip video created:', data.id);
    return data;
  } catch (error) {
    console.error('Error creating clip video:', error);
    throw error;
  }
}

/**
 * Gets the status of a clip video
 */
export async function getClipVideo(clipId: string): Promise<ClipVideo> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/clips/${clipId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get clip video: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching clip video:', error);
    throw error;
  }
}

/**
 * ============================================================================
 * CUSTOM AVATARS - Create Your Own AI Avatars
 * ============================================================================
 */

export interface Consent {
  id: string;
  text: string;
  created_at: string;
}

export interface SceneAvatar {
  id: string;
  object: string;
  status: 'validating' | 'processing' | 'done' | 'error';
  created_at: string;
  voice_id?: string;
  thumbnail_url?: string;
}

export interface Scene {
  id: string;
  object: string;
  status: 'created' | 'processing' | 'done' | 'error';
  created_at: string;
  result_url?: string;
}

/**
 * Creates a consent form for custom avatar creation
 * User must record themselves reading this text
 */
export async function createConsent(language: string = 'english'): Promise<Consent> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/consents`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID consent creation error:', errorData);
      throw new Error(`Failed to create consent: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Consent created:', data.id);
    return data;
  } catch (error) {
    console.error('Error creating consent:', error);
    throw error;
  }
}

/**
 * Verifies consent video
 */
export async function verifyConsent(
  consentId: string,
  name: string,
  sourceUrl: string
): Promise<void> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/consents/${consentId}`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        source_url: sourceUrl,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to verify consent: ${errorData.message || response.statusText}`);
    }

    console.log('Consent verified for:', name);
  } catch (error) {
    console.error('Error verifying consent:', error);
    throw error;
  }
}

/**
 * Creates a custom avatar from a training video
 * Requires verified consent
 */
export async function createSceneAvatar(
  name: string,
  consentId: string,
  sourceUrl: string,
  persist: boolean = true
): Promise<SceneAvatar> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/scenes/avatars`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        consent_id: consentId,
        source_url: sourceUrl,
        persist,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID scene avatar creation error:', errorData);
      throw new Error(`Failed to create scene avatar: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Scene avatar created:', data.id);
    return data;
  } catch (error) {
    console.error('Error creating scene avatar:', error);
    throw error;
  }
}

/**
 * Gets the status of a scene avatar
 */
export async function getSceneAvatar(avatarId: string): Promise<SceneAvatar> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/scenes/avatars/${avatarId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get scene avatar: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching scene avatar:', error);
    throw error;
  }
}

/**
 * Creates a scene video using a custom avatar
 */
export async function createScene(
  avatarId: string,
  script: string
): Promise<Scene> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/scenes`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar_id: avatarId,
        script: {
          type: 'text',
          input: script,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID scene creation error:', errorData);
      throw new Error(`Failed to create scene: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Scene created:', data.id);
    return data;
  } catch (error) {
    console.error('Error creating scene:', error);
    throw error;
  }
}

/**
 * Gets the status of a scene
 */
export async function getScene(sceneId: string): Promise<Scene> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/scenes/${sceneId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get scene: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching scene:', error);
    throw error;
  }
}

/**
 * ============================================================================
 * TALKS API - Classic Talking Avatar Videos
 * ============================================================================
 */

export interface Talk {
  id: string;
  created_at: string;
  status: 'created' | 'processing' | 'done' | 'error';
  object: string;
  result_url?: string;
  duration?: number;
}

export interface TalkScript {
  type: 'text' | 'audio';
  input?: string;
  audio_url?: string;
  provider?: {
    type: 'microsoft' | 'elevenlabs' | 'amazon';
    voice_id?: string;
  };
}

/**
 * Creates a talking avatar video from a static image
 * Perfect for: Quick talking head videos, announcements, simple content
 * 
 * @param sourceUrl - URL of the image to animate (can be D-ID presenter or custom image)
 * @param script - Text to speak or audio URL
 * @param voiceProvider - Voice synthesis provider (microsoft, elevenlabs, amazon)
 * @param voiceId - Specific voice ID
 */
export async function createTalk(
  sourceUrl: string,
  script: string | { audioUrl: string },
  voiceProvider: 'microsoft' | 'elevenlabs' | 'amazon' = 'microsoft',
  voiceId?: string
): Promise<Talk> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const scriptConfig: TalkScript = typeof script === 'string'
      ? {
          type: 'text',
          input: script,
          provider: {
            type: voiceProvider,
            voice_id: voiceId || 'en-US-JennyNeural',
          },
        }
      : {
          type: 'audio',
          audio_url: script.audioUrl,
        };

    const response = await fetch(`${D_ID_BASE_URL}/talks`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_url: sourceUrl,
        script: scriptConfig,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID talk creation error:', errorData);
      throw new Error(`Failed to create talk: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Talk created:', data.id);
    return data;
  } catch (error) {
    console.error('Error creating talk:', error);
    throw error;
  }
}

/**
 * Gets the status of a talk
 */
export async function getTalk(talkId: string): Promise<Talk> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/talks/${talkId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get talk: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching talk:', error);
    throw error;
  }
}

/**
 * Deletes a talk
 */
export async function deleteTalk(talkId: string): Promise<void> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/talks/${talkId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete talk: ${errorData.message || response.statusText}`);
    }

    console.log('Talk deleted successfully:', talkId);
  } catch (error) {
    console.error('Error deleting talk:', error);
    throw error;
  }
}

/**
 * Creates a talking avatar using ElevenLabs premium voices
 * ElevenLabs provides the highest quality, most natural-sounding voices
 */
export async function createTalkWithElevenLabs(
  sourceUrl: string,
  script: string,
  voiceId: string = '21m00Tcm4TlvDq8ikWAM' // Default: Rachel (ElevenLabs)
): Promise<Talk> {
  return createTalk(sourceUrl, script, 'elevenlabs', voiceId);
}

/**
 * ============================================================================
 * TRANSLATIONS API - Multi-Language Video Translation
 * ============================================================================
 */

export interface Translation {
  id: string;
  name: string;
  status: 'validating' | 'processing' | 'done' | 'error';
  group_id: string;
  result_url?: string;
  created_at?: string;
}

export interface TranslationGroup {
  translations: Translation[];
}

/**
 * Translates a video into multiple languages
 * Perfect for: Global reach, Pacific Islander languages, accessibility
 * 
 * @param sourceUrl - URL of the original video
 * @param languages - Array of target languages (e.g., ['French', 'Spanish', 'Japanese'])
 */
export async function createTranslations(
  sourceUrl: string,
  languages: string[]
): Promise<TranslationGroup> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/translations`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_url: sourceUrl,
        languages: languages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('D-ID translation creation error:', errorData);
      throw new Error(`Failed to create translations: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log(`Translations created for ${languages.length} languages`);
    return data;
  } catch (error) {
    console.error('Error creating translations:', error);
    throw error;
  }
}

/**
 * Gets the status of a translation
 */
export async function getTranslation(translationId: string): Promise<Translation> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/translations/${translationId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get translation: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching translation:', error);
    throw error;
  }
}

/**
 * Deletes a translation
 */
export async function deleteTranslation(translationId: string): Promise<void> {
  if (!DID_USERNAME || !DID_PASSWORD) {
    throw new Error('D-ID credentials not configured. Please set DID_USERNAME and DID_PASSWORD environment variables, or DID_API_KEY in format "username:password"');
  }

  try {
    const response = await fetch(`${D_ID_BASE_URL}/translations/${translationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete translation: ${errorData.message || response.statusText}`);
    }

    console.log('Translation deleted successfully:', translationId);
  } catch (error) {
    console.error('Error deleting translation:', error);
    throw error;
  }
}

/**
 * Helper: Translates a video into common Pacific Islander languages
 */
export async function translateToPacificLanguages(
  sourceUrl: string
): Promise<TranslationGroup> {
  const pacificLanguages = [
    'Filipino', // Philippines (Tagalog)
    'Japanese', // Large Pacific Islander community
    'Korean', // CNMI has Korean community
    'Chinese', // Business language in Pacific
  ];

  return createTranslations(sourceUrl, pacificLanguages);
}

/**
 * Helper: Translates a video into major world languages
 */
export async function translateToGlobalLanguages(
  sourceUrl: string
): Promise<TranslationGroup> {
  const globalLanguages = [
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Japanese',
    'Korean',
    'Chinese',
  ];

  return createTranslations(sourceUrl, globalLanguages);
}