/**
 * D-ID Service Integration
 * Handles AI avatar video generation and interview sessions
 */

interface DIDConfig {
  apiKey: string
  apiUrl?: string
}

interface CreateTalkParams {
  source_url?: string
  script: {
    type: 'text' | 'audio'
    input: string
    provider?: {
      type: string
      voice_id: string
    }
  }
  config?: {
    stitch?: boolean
    result_format?: 'mp4' | 'gif' | 'wav'
  }
}

interface CreateTalkResponse {
  id: string
  created_at: string
  status: 'created' | 'started' | 'done' | 'error'
  result_url?: string
}

interface CreateAgentParams {
  presenter: {
    type: 'clip' | 'talk'
    source_url?: string
    voice: {
      type: string
      voice_id: string
    }
  }
  knowledge?: {
    provider: string
    knowledge_base: string
  }
  preview_name?: string
}

interface CreateAgentResponse {
  id: string
  presenter_id: string
  created_at: string
  agent_url?: string
}

export class DIDService {
  private apiKey: string
  private apiUrl: string

  constructor(config: DIDConfig) {
    this.apiKey = config.apiKey
    this.apiUrl = config.apiUrl || 'https://api.d-id.com'
  }

  /**
   * Create a talking avatar video
   */
  async createTalk(params: CreateTalkParams): Promise<CreateTalkResponse> {
    const response = await fetch(`${this.apiUrl}/talks`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`D-ID API error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get status of a talk video
   */
  async getTalk(talkId: string): Promise<CreateTalkResponse> {
    const response = await fetch(`${this.apiUrl}/talks/${talkId}`, {
      headers: {
        'Authorization': `Basic ${this.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(`D-ID API error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Create an AI agent for interviews
   */
  async createAgent(params: CreateAgentParams): Promise<CreateAgentResponse> {
    const response = await fetch(`${this.apiUrl}/agents`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`D-ID API error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Create interview session with Zal (your AI interviewer)
   */
  async createInterviewSession(params: {
    candidateName: string
    jobTitle: string
    questions: string[]
  }): Promise<{ sessionId: string; agentUrl: string }> {
    // Create agent with interview script
    const script = this.generateInterviewScript(params.questions)

    const agent = await this.createAgent({
      presenter: {
        type: 'talk',
        source_url: 'https://d-id-public-bucket.s3.amazonaws.com/alice.jpg', // Use your Zal avatar
        voice: {
          type: 'microsoft',
          voice_id: 'en-US-JennyNeural', // Professional female voice
        },
      },
      preview_name: `Interview - ${params.candidateName}`,
    })

    return {
      sessionId: agent.id,
      agentUrl: agent.agent_url || `https://agents.d-id.com/${agent.id}`,
    }
  }

  /**
   * Generate interview script from questions
   */
  private generateInterviewScript(questions: string[]): string {
    const intro = "Hi! I'm Zal, your AI interviewer. I'll be asking you a few questions today. Please answer each question clearly and take your time. Let's get started!\n\n"
    const questionsList = questions.map((q, i) => `Question ${i + 1}: ${q}`).join('\n\n')
    const outro = "\n\nThank you for completing the interview! We'll review your responses and get back to you soon."

    return intro + questionsList + outro
  }

  /**
   * Poll for video completion
   */
  async waitForCompletion(talkId: string, maxAttempts: number = 30): Promise<string> {
    for (let i = 0; i < maxAttempts; i++) {
      const talk = await this.getTalk(talkId)

      if (talk.status === 'done' && talk.result_url) {
        return talk.result_url
      }

      if (talk.status === 'error') {
        throw new Error('Video generation failed')
      }

      // Wait 2 seconds before next check
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    throw new Error('Video generation timeout')
  }
}

// Export singleton instance
export const didService = new DIDService({
  apiKey: import.meta.env.VITE_DID_API_KEY || '',
})
